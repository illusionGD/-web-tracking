/*
 * @Author: IT-hollow
 * @Date: 2024-09-25 23:29:58
 * @LastEditors: hollow
 * @LastEditTime: 2024-10-17 23:49:04
 * @FilePath: \web-tracking\packages\core\src\libs\logger.ts
 * @Description: log
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */
import { getFormatDate, isBrowser, isSupportWebTracking } from '../utils'
enum LogTypeEnum {
    LOG = 'LOG',
    WARN = 'WARN',
    ERROR = 'ERROR',
}
class Logger {
    config = {
        bandLogTye: [],
    }

    constructor(config?: { bandLogTye?: Array<LogTypeEnum> }) {
        Object.assign(this.config, config)
    }

    warn(...arg: any[]) {
        this.logOut(LogTypeEnum.WARN, ...arg)
    }

    error(...arg: any[]) {
        this.logOut(LogTypeEnum.ERROR, ...arg)
    }

    log(...arg: any[]) {
        this.logOut(LogTypeEnum.LOG, ...arg)
    }

    private logOut(type: LogTypeEnum = LogTypeEnum.LOG, ...arg: any[]) {
        const { bandLogTye } = this.config
        if (bandLogTye.includes(type)) {
            return
        }
        switch (type) {
            case LogTypeEnum.LOG:
                console.log(this.getDefaultPrefix(), ...arg)
                break
            case LogTypeEnum.WARN:
                console.warn(this.getDefaultPrefix(), ...arg)
                break
            case LogTypeEnum.ERROR:
                console.error(this.getDefaultPrefix(), ...arg)
                break
            default:
                break
        }
    }

    /**
     * 是否打印日志
     * @param isLog true | false
     */
    setAllowLog(isLog: boolean) {
        if (isLog) {
            this.config.bandLogTye.length = 0
        } else {
            this.config.bandLogTye.push(
                LogTypeEnum.ERROR,
                LogTypeEnum.LOG,
                LogTypeEnum.WARN
            )
        }
    }

    /**
     * 获取默认log前缀
     */
    getDefaultPrefix() {
        return `trackLog__${getFormatDate(NaN, 'YYYY-MM-DD hh:mm:ss')}__`
    }
}

// 单例模式
if (isBrowser() && !window._webTrackingLogger_) {
    const logger = new Logger()
    window._webTrackingLogger_ = logger
}

export const logger = window._webTrackingLogger_ as Logger
