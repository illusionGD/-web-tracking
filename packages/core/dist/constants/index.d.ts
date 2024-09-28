import { ResponseType, WebInitOptionsType } from '../interfaces';
/**基本请求配置 */
export declare const BASE_REQUEST_OPTIONS: {
    method: string;
    headers: {
        'Content-Type': string;
    };
    cache: string;
    credentials: string;
    responseType: ResponseType;
    timeout: number;
};
/**timestamp数 */
export declare const TIMESTAMP_NUMBER: {
    /**秒 */
    second: number;
    /**分 */
    min: number;
    /**小时 */
    hour: number;
    /**天 */
    day: number;
    /**周 */
    week: number;
    /**月(30天) */
    month: number;
};
/** 默认初始化配置 */
export declare const WEB_TRACKING_DEFAULT_CONFIGS: WebInitOptionsType;
/** 默认性能监控数据 */
export declare const DEFAULT_PERFORMANCE_INFO: {
    /** 白屏时间 */
    white_time: number;
    /** 加载时间 */
    load_time: number;
    /** 页面停留时间 */
    stop_time: number;
    /** 重定向时间 */
    redirect_time: number;
    /** dns解析时间 */
    dns_time: number;
    /** tcp链接时间 */
    tcp_time: number;
    /** 向服务器请求时间 */
    request_time: number;
    /** 服务器响应时间 */
    response_time: number;
    /** 首屏渲染时间 */
    fcp_time: number;
    /** 最大内容渲染时间 */
    lcp_time: number;
    /** 第一次交换响应时间 */
    fid_time: number;
    /** 页面布局偏移分数 */
    cls_score: number;
};
/** 默认webTracking状态 */
export declare const DEFAULT_WEB_TRACKING_STATE: {
    /** 是否初始化web-vitals */
    WEB_VITALS_INITD: number;
};
