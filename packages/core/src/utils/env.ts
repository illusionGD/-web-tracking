/*
 * @Author: IT-hollow
 * @Date: 2024-09-26 12:24:08
 * @LastEditors: hollow
 * @LastEditTime: 2024-09-26 12:31:30
 * @FilePath: \web-tracking\packages\core\src\utils\env.ts
 * @Description: 判断运行环境 or 条件
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

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
