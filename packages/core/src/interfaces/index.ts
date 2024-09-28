export interface BaseRequestOptionsType {
    method: string
    headers: HeadersInit
    responseType: ResponseType
    params?: AnyObject
    body?: AnyObject
    cache?: RequestCache
    credentials?: RequestCredentials
    timeout?: number
}

export interface BaseResponseType<T> {
    code: string
    data?: T
    message?: string
}

export interface ResponseResultType<T> {
    data: T
    status: number
    headers: AnyObject
    statusText: string
}

export enum ResponseType {
    JSON = 'JSON',
    TEXT = 'TEXT',
    BLOB = 'BLOB',
    ARRAYBUFFER = 'ARRAYBUFFER',
}
export enum LocalStorageKeyEnum {
    CLIENT_ID = 'web_tracking_client_id',
}
export interface AnyObject {
    [key: string]: any
}

export interface LocalStorageWithExpireValType {
    value: any
    expire: number
}

export enum CycleTypeEnum {
    /** 初始化前 */
    BEFORE_INIT = 'BEFORE_INIT',
    /** 初始化后 */
    AFTER_INIT = 'AFTER_INIT',
    /** 用户pv */
    PAGE_VIEW = 'PAGE_VIEW',
    /** 页面隐藏 */
    PAGE_SHOW = 'PAGE_SHOW',
    /** 页面隐藏 */
    PAGE_HIDE = 'PAGE_HIDE',
    /** 页面关闭 */
    BEFORE_UNLOADED = 'BEFORE_UNLOADED',
    /** 发生数据之前 */
    BEFORE_SEND_DATA = 'BEFORE_SEND_DATA',
    /** 发生数据之后 */
    AFTER_SEND_DATA = 'AFTER_SEND_DATA',
}

export interface SendDataType {
    performance: AnyObject // 性能监控信息（可选）
    deviceInfo: AnyObject // 设备信息：设备id、浏览器信息、and ios等
    userInfo: AnyObject // 用户信息（自定义）
    eventInfo: AnyObject // 事件信息：类型、操作、dom等等，可以自定义
    type: string // 类型：global、track、click等等
    id: string // uuid
    timestamp: number // 时间戳
    sessionId: string // 会话id
    url: string
}

export interface WebInitOptionsType {
    /** 生命周期回调 */
    on?: {
        /** 初始化前 */
        beforeInit?: () => void
        /** 初始化后 */
        afterInit?: () => void
        pageView?: () => void
        pageHide?: () => void
        pageShow?: () => void
        /** 发生数据前 */
        sendBefore?: () => void
        /** 发生数据后 */
        sendAfter?: () => void
    }
    /** 发生数据配置 */
    sendDataConfig?: {
        /** 上报阈值，多少条数据一起上报 */
        threshold?: number
        /** 上报时间间隔，到时间就上报 */
        interval?: number
        /** 是否有数据就立刻上报，true的话threshold&interval无效 */
        atOnce?: boolean
        /** 请求配置，可配置多个不同服务请求 */
        requestConfigs?: {
            /** 上报接口 */
            url: string
            /** http请求方法 */
            method: string
            /** http请求头配置 */
            headers: HeadersInit
            /** 拦截器 */
            interceptor: {
                /** 请求拦截器 */
                request: []
                /** 响应拦截器 */
                response: []
            }
        }[]
        /**自定义请求，requestConfigs失效 */
        customSendData?: (data: SendDataType[]) => void
    }
}

export interface WebTrackingType {
    /** 设备id，uuid */
    clientId: string
    options: WebInitOptionsType
}
