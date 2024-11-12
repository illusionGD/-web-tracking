import { WEB_TRACKING_DEFAULT_CONFIGS } from './constants/index'
import {
    LifeCycleEnum,
    WebInitOptionsType,
    WebTrackingType,
} from './interfaces/index'
import {
    getClientId,
    getSessionId,
    refreshSessionIdCacheTime,
} from './libs/device'
import { eventManager } from './libs/eventManager'
import { logger } from './libs/logger'
import {
    onAfterSendData,
    onBeforeSendData,
    onPageHide,
    onPageShow,
    onPageView,
} from './libs/observer'
import { getPerformanceInfo, initPerformance } from './libs/performance'
import { initSendDataQueue } from './libs/sendData'
import { deepCloneObj } from './utils/common'
import { getWebTracking, isSupportWebTracking } from './utils/env'

export * from './http/index'
export * from './utils/index'
export * from './constants/index'
export * from './interfaces/index'
export * from './libs/index'

export function initWebTracking(options: WebInitOptionsType): WebTrackingType {
    if (isSupportWebTracking()) {
        return
    }

    const opts = Object.assign(
        deepCloneObj(WEB_TRACKING_DEFAULT_CONFIGS),
        options
    )
    const { beforeInit, afterInit } = opts.on

    beforeInit && beforeInit()

    window._webTracking_ = {
        clientId: getClientId(),
        sessionId: getSessionId(),
        options: opts,
    }
    const sessionIdCacheTime = opts.sessionIdCacheTime

    if (
        sessionIdCacheTime !== null &&
        sessionIdCacheTime !== undefined &&
        typeof sessionIdCacheTime === 'number'
    ) {
        refreshSessionIdCacheTime(sessionIdCacheTime)
    }

    initCycle(options)
    initState()
    initPerformance()
    initSendDataQueue()

    afterInit && afterInit()

    eventManager.emitter(LifeCycleEnum.PAGE_VIEW)
    logger.log(window._webTracking_)
    return window._webTracking_ as WebTrackingType
}

/** 初始化生命周期函数 */
function initCycle(options: WebInitOptionsType) {
    if (options.on) {
        const { pageHide, pageView, afterSend, beforeSend, pageShow } =
            options.on
        onPageView(pageView)
        onPageShow(pageShow)
        onPageHide(pageHide)
        onBeforeSendData(afterSend)
        onAfterSendData(beforeSend)
    }

    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            eventManager.emitter(LifeCycleEnum.PAGE_HIDE)
        }

        if (document.visibilityState === 'visible') {
            eventManager.emitter(LifeCycleEnum.PAGE_SHOW)
        }
    })

    window.addEventListener('load', () => {
        getWebTracking().performanceInfo = getPerformanceInfo()
    })
}

function initState() {
    throw new Error('Function not implemented.')
}
