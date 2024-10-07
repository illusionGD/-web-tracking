/*
 * @Author: IT-hollow
 * @Date: 2024-10-07 14:42:26
 * @LastEditors: hollow
 * @LastEditTime: 2024-10-07 16:48:04
 * @FilePath: \web-tracking\packages\core\src\libs\sendData.ts
 * @Description: 上报数据
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import { SendDataType } from '../interfaces'
import {
    getCurrentTimestamp,
    getUUid,
    getWebTracking,
    isInvalidVal,
} from '../utils'
import { getClientId, getDeviceInfo, getSessionId } from './device'
import logger from './logger'

function getQueueOptions() {
    const globalData: Partial<SendDataType>[] =
        window['_webTrackingGlobalData_'] || []
    const get = (): SendDataType[] => {
        return window._webTrackingGlobalData_
    }

    const add = (data: Partial<SendDataType>) => {
        const defaultData = getDefaultSendData()
        const queue = get()
        queue.push(Object.assign(defaultData, data))
        // 如果配置了立刻上传
        if (isSendData()) {
            sendTrackingData()
        }
    }

    const isSendData = () => {
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
        get,
        add,
        isSendData,
    }
}

/**初始化上报数据队列 */
export function initSendDataQueue() {
    const webTracking = getWebTracking()
    if (!webTracking.dataQueue) {
        webTracking.dataQueue = getQueueOptions()
    }

    if (webTracking.dataQueue.isSendData()) {
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
export function sendTrackingData() {
    const webTracking = getWebTracking()
    const { sendDataConfig } = webTracking.options
    const { customSendData, requestConfigs } = sendDataConfig
    const dataQueue = webTracking.dataQueue
    const list = dataQueue.get().splice(0)
    if (!list.length) {
        return
    }
    if (customSendData) {
        customSendData(list)
        return
    }
    // const reqList = []
    // if (requestConfigs.length) {
    //     for (let index = 0; index < requestConfigs.length; index++) {
    //         const config = requestConfigs[index];

    //     }
    // }
}

export type DataQueueReturnType = ReturnType<typeof getQueueOptions>
