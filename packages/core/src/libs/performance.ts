import logger from './logger'
import { onCLS, onINP, onLCP, onFCP, onTTFB, onFID, Metric } from 'web-vitals'
import {
    getWebTracking,
    isSupportPerformance,
    isSupportWebTracking,
} from '../utils'
import { PerformanceInfoType } from '../interfaces'
import { DEFAULT_PERFORMANCE_INFO } from '../constants'
import { getStateByName, setStateByName } from './state'

export function initPerformance() {
    initWebVitals()
    if (!isSupportWebTracking()) {
        return
    }
    const webTracking = getWebTracking()
    webTracking.performanceInfo = getPerformanceInfo()
}
/** 初始化web-vitals监听 */
function initWebVitals() {
    if (getStateByName('WEB_VITALS_INITD')) {
        return
    }
    const webTracking = getWebTracking()
    const onVital = (type: string, e: Metric) => {
        webTracking.performanceInfo[`${type}_time`] = e.delta
    }
    onFCP((e) => {
        onVital('fcp', e)
        onVital('white', e)
    })
    onCLS((e) => {
        onVital('cls', e)
    })
    onINP((e) => {
        onVital('inp', e)
    })
    onTTFB((e) => {
        onVital('ttfb', e)
    })
    onFID((e) => {
        onVital('fid', e)
    })
    onLCP(
        (e) => {
            onVital('lcp', e)
        },
        {
            reportAllChanges: true, // 每次变化都更新数据
        }
    )

    setStateByName('WEB_VITALS_INITD', 1)
}

/**
 * 获取性能监控数据
 */
export function getPerformanceInfo(): PerformanceInfoType {
    const webTracking = getWebTracking()
    const info =
        webTracking.performanceInfo ||
        Object.assign({}, DEFAULT_PERFORMANCE_INFO)
    if (!isSupportPerformance()) {
        return info
    }

    if (performance.getEntries) {
        Object.assign(info, getTimesByNavigationTiming())
    }
    // 兼容
    else if (performance.timing) {
        Object.assign(info, getTimesByTiming())
    }

    return info
}

function getTimesByNavigationTiming(): Partial<PerformanceInfoType> {
    const timing = performance.getEntries()[0] as PerformanceNavigationTiming
    return {
        load_time: timing.loadEventStart,
        dns_time: timing.domainLookupEnd - timing.domainLookupStart,
        redirect_time: timing.redirectEnd - timing.redirectStart,
        tcp_time: timing.connectEnd - timing.connectStart,
        request_time: timing.responseStart - timing.requestStart,
        response_time: timing.responseEnd - timing.responseStart,
        stop_time: performance.now(),
    }
}

function getTimesByTiming(): Partial<PerformanceInfoType> {
    const timing = performance.timing
    return {
        load_time: timing.loadEventStart - timing.navigationStart,
        dns_time: timing.domainLookupEnd - timing.domainLookupStart,
        redirect_time: timing.redirectEnd - timing.redirectStart,
        tcp_time: timing.connectEnd - timing.connectStart,
        request_time: timing.responseStart - timing.requestStart,
        response_time: timing.responseEnd - timing.responseStart,
        stop_time: performance.now(),
    }
}
