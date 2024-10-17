/*
 * @Author: IT-hollow
 * @Date: 2024-09-26 12:24:08
 * @LastEditors: hollow
 * @LastEditTime: 2024-09-28 22:51:12
 * @FilePath: \web-tracking\packages\core\src\utils\env.ts
 * @Description: 判断运行环境 or 条件
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import { WebTrackingType } from "../interfaces"

/**
 * 判断是否为ipad
 * @returns
 */
export function isIPad(): boolean {
    if (!isBrowser()) return false
    const { platform, maxTouchPoints } = window.navigator
    return platform === 'MacIntel' && maxTouchPoints > 1 /* iPad OS 13 */
}

/**
 * 是否为前端浏览器环境
 * @returns
 */
export function isBrowser() {
    return typeof window !== 'undefined'
}

/**
 * 判断是否为移动端设备（兼容前端&服务端）
 */
export function isMb(): boolean {
    if (!isBrowser()) {
        return false
    }
    const ua = navigator.userAgent

    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
        ua
    )
}

/**
 * 判断是否为安卓设备
 */
export function isAndroid(): boolean {
    const ua = navigator.userAgent
    return ua.includes('Android') || ua.includes('Linux')
}

/**
 * 判断是否为苹果设备，包含mac
 * @returns
 */
export function isIOS(): boolean {
    return (
        !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || isIPad()
    )
}

/**
 * 判断是否为微信webview浏览器环境
 */
export function isWechatBrowser(): boolean {
    return /micromessenger/i.test(navigator.userAgent)
}

/**
 * 是否支持webTracking，检查是否有注入埋点工具
 */
export function isSupportWebTracking() {
    if (isBrowser()) {
        return !!window._webTracking_
    }
}
/**
 * 获取webTracking对象
 * @returns
 */
export function getWebTracking(): Partial<WebTrackingType> {
    return isSupportWebTracking() ? window._webTracking_ : {}
}

/** 是否支持性能监控 */
export function isSupportPerformance() {
    return !!window.performance
}
