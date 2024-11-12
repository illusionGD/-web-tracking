# web-tracking

网页埋点工具

# 使用

## 安装

```
npm i @web-tracking
```

## 初始化

```ts
import {
    initWebTracking,
    WebTrackingType,
    WebInitOptionsType,
} from '@web-tracking/core'

initWebTracking({} as WebInitOptionsType) as WebTrackingType
```

WebInitOptionsType

```ts
interface WebInitOptionsType {
    /** sessionId过期时间 */
    sessionIdCacheTime?: number
    /** 生命周期回调 */
    on?: {
        /** 初始化前 */
        beforeInit?: () => void
        /** 初始化后 */
        afterInit?: () => void
        pageView?: () => void
        pageHide?: () => void
        pageShow?: () => void
        /** 发送数据前 */
        beforeSend?: (data?: SendDataType[]) => void
        /** 发送数据后 */
        afterSend?: (data?: SendDataType[]) => void
    }
    /** 发送数据配置 */
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
            headers?: HeadersInit
            /** 拦截器 */
            interceptor?: {
                /** 请求拦截器 */
                request?: []
                /** 响应拦截器 */
                response?: []
            }
        }[]
        /**自定义请求，配置后-requestConfigs失效 */
        customSendData?: (data: SendDataType[]) => void
    }
}
```

# 发包流程

## 仅更新git代码

执行：`npm run push`

# git打tag

1. 先提交更改（commit）：`npm run commit`
2. git打tag&push：`npm run build-publish`
