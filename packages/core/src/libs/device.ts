/*
 * @Author: IT-hollow
 * @Date: 2024-10-02 11:28:55
 * @LastEditors: hollow
 * @LastEditTime: 2024-10-07 15:12:03
 * @FilePath: \web-tracking\packages\core\src\libs\device.ts
 * @Description: 设备信息
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import UserAgent from 'ua-parser-js'
import {
    getLocalItemWithExpire,
    getLocalStorage,
    getUUid,
    isInvalidVal,
    isSupportWebTracking,
    setLocalItemWithExpire,
    setLocalStorage,
} from '../utils'
import { StorageKeyEnum } from '../interfaces'
import { TIMESTAMP_NUMBER } from '../constants'

/**
 * 获取设备信息
 */
export function getDeviceInfo() {
    const userAgent = new UserAgent()
    return userAgent.getResult()
}

/** 获取用户uuid */
export function getClientId() {
    // 查全局tracking对象的uid
    if (isSupportWebTracking() && window._webTracking_.clientId) {
        return window._webTracking_.clientId
    }

    // 查本地存储的uid
    let uid = getLocalStorage<string>(StorageKeyEnum.CLIENT_ID)

    // 生成新的uid
    if (!uid) {
        uid = getUUid()
        setLocalStorage(StorageKeyEnum.CLIENT_ID, uid)
    }

    return uid
}

/** 获取会话id，默认30分支自动刷新一个新id */
export function getSessionId() {
    // 查全局tracking对象的uid
    if (isSupportWebTracking() && window._webTracking_.sessionId) {
        return window._webTracking_.sessionId
    }

    let sid = getLocalItemWithExpire<string>(StorageKeyEnum.SESSION_ID)
    if (!sid) {
        sid = getUUid()
        setLocalItemWithExpire(
            StorageKeyEnum.SESSION_ID,
            sid,
            30 * TIMESTAMP_NUMBER.min
        )
    }
    return sid
}

/**
 * 重置sessionId的过期时间
 * @param timestamp 过期时间
 * @returns sessionId
 */
export function refreshSessionIdCacheTime(timestamp?: number) {
    let sid = getLocalItemWithExpire<string>(StorageKeyEnum.SESSION_ID)

    if (!sid) {
        sid = getUUid()
    }

    setLocalItemWithExpire(
        StorageKeyEnum.SESSION_ID,
        sid,
        !isInvalidVal(timestamp) ? timestamp : 30 * TIMESTAMP_NUMBER.min
    )
    return sid
}
