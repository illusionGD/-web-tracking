/*
 * @Author: IT-hollow
 * @Date: 2024-09-28 14:45:19
 * @LastEditors: hollow
 * @LastEditTime: 2024-10-16 11:21:24
 * @FilePath: \web-tracking\packages\core\src\libs\observer.ts
 * @Description: 监听回调
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */
import { LifeCycleEnum, SendDataType } from '../interfaces'
import { eventManager } from './eventManager'

/** 埋点工具初始化前 */
export function onBeforeInit(fn: () => void) {
    eventManager.on(LifeCycleEnum.BEFORE_INIT, fn)
}

/** 埋点工具初始化后 */
export function onAfterInit(fn: () => void) {
    eventManager.on(LifeCycleEnum.AFTER_INIT, fn)
}

/** 监听页面pageView */
export function onPageView(fn: () => void) {
    eventManager.on(LifeCycleEnum.PAGE_VIEW, fn)
}

/** 监听页面pageShow */
export function onPageShow(fn: () => void) {
    eventManager.on(LifeCycleEnum.PAGE_SHOW, fn)
}

/** 监听页面pageHide */
export function onPageHide(fn: () => void) {
    eventManager.on(LifeCycleEnum.PAGE_HIDE, fn)
}

/** 数据上报前回调 */
export function onBeforeSendData(fn: (data?: SendDataType[]) => void) {
    eventManager.on(LifeCycleEnum.BEFORE_SEND_DATA, fn)
}

/** 数据上报后回调 */
export function onAfterSendData(fn: () => void) {
    eventManager.on(LifeCycleEnum.AFTER_SEND_DATA, fn)
}

/** 监听元素可见性 */
export function onElementVisible(
    element: Element,
    callback: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit
) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                callback(entry)
                observer.unobserve(element)
            }
        })
    }, options)

    observer.observe(element)

    return () => {
        observer.unobserve(element)
    }
}
