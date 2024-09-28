/*
 * @Author: IT-hollow
 * @Date: 2024-05-10 21:10:40
 * @LastEditors: hollow
 * @LastEditTime: 2024-09-28 23:37:07
 * @Description: 常量文件
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import { ResponseType, WebInitOptionsType } from '../interfaces'

/**基本请求配置 */
export const BASE_REQUEST_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    cache: 'no-cache',
    credentials: 'include',
    responseType: ResponseType.JSON,
    timeout: 60000,
}

/**timestamp数 */
export const TIMESTAMP_NUMBER = {
    /**秒 */
    second: 1000,
    /**分 */
    min: 60 * 1000,
    /**小时 */
    hour: 60 * 60 * 1000,
    /**天 */
    day: 24 * 60 * 60 * 1000,
    /**周 */
    week: 7 * 24 * 60 * 60 * 1000,
    /**月(30天) */
    month: 30 * 24 * 60 * 60 * 1000,
}


/** 默认初始化配置 */
export const WEB_TRACKING_DEFAULT_CONFIGS: WebInitOptionsType = {
    on: {},
    sendDataConfig: {
        requestConfigs: [],
        threshold: 10,
    },
}

/** 默认性能监控数据 */
export const DEFAULT_PERFORMANCE_INFO = {
    /** 白屏时间 */
    white_time: 0,
    /** 加载时间 */
    load_time: 0,
    /** 页面停留时间 */
    stop_time: 0,
    /** 重定向时间 */
    redirect_time: 0,
    /** dns解析时间 */
    dns_time: 0,
    /** tcp链接时间 */
    tcp_time: 0,
    /** 向服务器请求时间 */
    request_time: 0,
    /** 服务器响应时间 */
    response_time: 0,
    /** 首屏渲染时间 */
    fcp_time: 0,
    /** 最大内容渲染时间 */
    lcp_time: 0,
    /** 第一次交换响应时间 */
    fid_time: 0,
    /** 页面布局偏移分数 */
    cls_score: 0,
}

/** 默认webTracking状态 */
export const DEFAULT_WEB_TRACKING_STATE = {
    /** 是否初始化web-vitals */
    WEB_VITALS_INITD: 0
}
