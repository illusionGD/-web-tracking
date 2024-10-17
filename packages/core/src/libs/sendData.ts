/*
 * @Author: IT-hollow
 * @Date: 2024-10-07 14:42:26
 * @LastEditors: hollow
 * @LastEditTime: 2024-10-17 15:33:38
 * @FilePath: \web-tracking\packages\core\src\libs\sendData.ts
 * @Description: 上报数据
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import { Http } from '../http'
import { LifeCycleEnum, SendDataType } from '../interfaces'
import { getCurrentTimestamp, getUUid, getWebTracking } from '../utils'
import { getClientId, getDeviceInfo, getSessionId } from './device'
import { eventManager } from './eventManager'

/** 创建全局数据队列操作 */
function createGlobalDataQueueOptions() {
    const globalData: Partial<SendDataType>[] =
        window['_webTrackingGlobalData_'] || []

    const get = (): SendDataType[] => {
        return window._webTrackingGlobalData_
    }

    const size = () => {
        return get().length
    }

    const out = (limit?: number): SendDataType[] => {
        if (limit === 0) {
            return []
        }

        const list = get()
        if (!limit) {
            return list.splice(0, limit)
        }

        return list.splice(0)
    }

    const add = (data: Partial<SendDataType>) => {
        const defaultData = getDefaultSendData()
        const queue = get()
        queue.push(Object.assign(defaultData, data))
        // 如果配置了立刻上传
        if (isMeetSendData()) {
            sendTrackingData()
        }
    }

    const isMeetSendData = () => {
        const webTracking = getWebTracking()
        const { sendDataConfig } = webTracking.options
        const { threshold, atOnce } = sendDataConfig
        const queue = get()
        return atOnce || (threshold && queue.length >= threshold)
    }

    window['_webTrackingGlobalData_'] = globalData.map((item) => {
        const defaultData = getDefaultSendData()
        return Object.assign(defaultData, item)
    })

    return {
        /** 大小 */
        size,
        /** 入队 */
        add,
        /** 出队列 */
        out,
        /** 是否满足上传数据条件 */
        isMeetSendData,
    }
}

/**初始化上报数据队列 */
export function initSendDataQueue() {
    const webTracking = getWebTracking()

    if (!webTracking.dataQueue) {
        webTracking.dataQueue = createGlobalDataQueueOptions()
    }

    if (webTracking.dataQueue.isMeetSendData()) {
        sendTrackingData()
    }
}

/** 获取默认的上报数据 */
export function getDefaultSendData(): SendDataType {
    const deviceInfo = getDeviceInfo()

    return {
        deviceInfo,
        url: window.location.href,
        clientId: getClientId(),
        timestamp: getCurrentTimestamp(),
        sessionId: getSessionId(),
        id: getUUid(),
        type: '',
        eventInfo: {},
    }
}

/** 上报埋点数据 */
export async function sendTrackingData() {
    const webTracking = getWebTracking()
    const { sendDataConfig, on } = webTracking.options
    const { customSendData, requestConfigs } = sendDataConfig
    const dataQueue = webTracking.dataQueue
    const list = dataQueue.out()
    if (!list.length) {
        return
    }
    eventManager.emitter(LifeCycleEnum.BEFORE_SEND_DATA, list)
    if (customSendData) {
        await customSendData(list)
        eventManager.emitter(LifeCycleEnum.AFTER_SEND_DATA)
        return
    }
    if (requestConfigs.length) {
        const reqList = []
        const httpReq = new Http()
        for (let index = 0; index < requestConfigs.length; index++) {
            const { method, url, headers, interceptor } = requestConfigs[index]
            const mth = method.toLocaleLowerCase()
            const params = { data: list }
            if (mth === 'get') {
                reqList.push(httpReq.get(url, params))
            } else {
                reqList.push(
                    httpReq.post(url, params, headers ? { headers } : null)
                )
            }
        }
        await Promise.all(reqList)
    }
    eventManager.emitter(LifeCycleEnum.AFTER_SEND_DATA, list)
}

export type DataQueueReturnType = ReturnType<
    typeof createGlobalDataQueueOptions
>
