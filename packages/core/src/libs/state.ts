/*
 * @Author: IT-hollow
 * @Date: 2024-09-28 22:32:52
 * @LastEditors: hollow
 * @LastEditTime: 2024-09-28 23:36:18
 * @FilePath: \web-tracking\packages\core\src\libs\state.ts
 * @Description: webTracking的全局状态管理
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import { DEFAULT_WEB_TRACKING_STATE } from '../constants'
import { WebTrackingStateType } from '../interfaces'
import { getWebTracking } from '../utils'

/**
 * 获取webTracking状态
 * @returns
 */
function getState(): WebTrackingStateType {
    return getWebTracking().state || DEFAULT_WEB_TRACKING_STATE
}

/**
 * 获取特定名称的状态
 * @param name
 */
export function getStateByName(name: keyof WebTrackingStateType) {
    return getState()[name]
}

/**
 * 初始化webTracking状态
 */
export function initState() {
    const state = getState()
    getWebTracking().state = state
}

/**
 * 设置状态
 * @param state
 */
export function setState(state: Partial<WebTrackingStateType>) {
    Object.assign(getWebTracking().state, state)
}

/**
 * 设置特定名称状态
 * @param state
 */
export function setStateByName(name: keyof WebTrackingStateType, val: any) {
    getState()[name] = val
}
