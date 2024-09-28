import { isBrowser } from '../utils'

/*
 * @Author: IT-hollow
 * @Date: 2024-09-25 22:50:59
 * @LastEditors: hollow
 * @LastEditTime: 2024-09-28 16:47:38
 * @FilePath: \web-tracking\packages\core\src\libs\eventManager.ts
 * @Description: 事件管理器
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */
class EventManager {
    /**事件容器 */
    private eventMap = new Map<string, Set<Function>>()

    constructor() {}

    /**
     * 事件监听
     */
    on(eventName: string, callBack: Function) {
        if (!this.eventMap.has(eventName)) {
            this.eventMap.set(eventName, new Set())
        }

        if (!callBack) {
            return
        }

        const fnSet = this.eventMap.get(eventName)

        fnSet.add(callBack)
    }

    /**
     * 取消事件监听
     * @param eventName 事件名称
     * @param callBack 回调函数
     */
    off(eventName: string, callBack: Function) {
        if (!this.eventMap.has(eventName)) {
            return false
        }
        const fnSet = this.eventMap.get(eventName)
        return fnSet.delete(callBack)
    }

    /**
     * 事件触发器
     */
    emitter(eventName: string) {
        if (!this.eventMap.has(eventName)) {
            return false
        }

        const fnSet = this.eventMap.get(eventName)

        fnSet.forEach((fn) => fn())
    }
}

// 单例模式
if (isBrowser() && !window._webTrackingEventManager_) {
    const eventManager = new EventManager()
    window._webTrackingEventManager_ = eventManager
}

export const eventManager = window._webTrackingEventManager_ as EventManager
