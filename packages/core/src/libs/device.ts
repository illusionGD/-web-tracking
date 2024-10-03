/*
 * @Author: IT-hollow
 * @Date: 2024-10-02 11:28:55
 * @LastEditors: hollow
 * @LastEditTime: 2024-10-03 14:02:41
 * @FilePath: \web-tracking\packages\core\src\libs\device.ts
 * @Description: 设备信息
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import UserAgent from 'ua-parser-js'

/**
 * 获取设备信息
 */
export function getDeviceInfo() {
    const userAgent = new UserAgent()
    return userAgent.getResult()
}
