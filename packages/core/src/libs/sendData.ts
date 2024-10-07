/*
 * @Author: IT-hollow
 * @Date: 2024-10-07 14:42:26
 * @LastEditors: hollow
 * @LastEditTime: 2024-10-07 14:58:21
 * @FilePath: \web-tracking\packages\core\src\libs\sendData.ts
 * @Description: 上报数据
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import { getCurrentTimestamp } from '../utils'
import { getClientId, getDeviceInfo } from './device'
import { getPerformanceInfo } from './performance'

/** 获取默认的上报数据 */
export function getDefaultSendData() {
    const performanceInfo = getPerformanceInfo()
    const deviceInfo = getDeviceInfo()

    return {
        performanceInfo,
        deviceInfo,
        url: window.location.href,
        clientId: getClientId(),
        timestamp: getCurrentTimestamp(),
    }
}
