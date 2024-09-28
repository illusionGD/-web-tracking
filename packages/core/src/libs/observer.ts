/*
 * @Author: IT-hollow
 * @Date: 2024-09-28 14:45:19
 * @LastEditors: hollow
 * @LastEditTime: 2024-09-28 17:11:25
 * @FilePath: \web-tracking\packages\core\src\libs\observer.ts
 * @Description: 监听回调
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */
import { CycleTypeEnum, SendDataType } from '../interfaces'
import { eventManager } from './eventManager'

/** 埋点工具初始化前 */
export function onBeforeInit(fn: () => void) {
    eventManager.on(CycleTypeEnum.BEFORE_INIT, fn)
}

/** 埋点工具初始化后 */
export function onAfterInit(fn: () => void) {
    eventManager.on(CycleTypeEnum.AFTER_INIT, fn)
}

/** 监听页面pageView */
export function onPageView(fn: () => void) {
    eventManager.on(CycleTypeEnum.PAGE_VIEW, fn)
}

/** 监听页面pageShow */
export function onPageShow(fn: () => void) {
    eventManager.on(CycleTypeEnum.PAGE_SHOW, fn)
}

/** 监听页面pageHide */
export function onPageHide(fn: () => void) {
    eventManager.on(CycleTypeEnum.PAGE_HIDE, fn)
}

/** 数据上报前回调 */
export function onBeforeSendData(fn: (data?: SendDataType[]) => void) {
    eventManager.on(CycleTypeEnum.BEFORE_SEND_DATA, fn)
}

/** 数据上报后回调 */
export function onAfterSendData(fn: () => void) {
    eventManager.on(CycleTypeEnum.AFTER_SEND_DATA, fn)
}
