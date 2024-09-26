/*
 * @Author: IT-hollow
 * @Date: 2024-09-25 23:29:58
 * @LastEditors: hollow
 * @LastEditTime: 2024-09-26 12:19:08
 * @FilePath: \web-tracking\packages\core\src\libs\logger.ts
 * @Description: log
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */
import { getFormatDate } from '../utils'
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

    warn(msg: string) {
        this.log(msg, LogTypeEnum.WARN)
    }

    error(msg: string) {
        this.log(msg, LogTypeEnum.ERROR)
    }

    log(msg: string, type: LogTypeEnum = LogTypeEnum.LOG) {
        const str = this.getDefaultPrefix() + msg
        const { bandLogTye } = this.config
        if (bandLogTye.includes(type)) {
            return
        }
        switch (type) {
            case LogTypeEnum.LOG:
                console.log(str)
                break
            case LogTypeEnum.WARN:
                console.warn(str)
                break
            case LogTypeEnum.ERROR:
                console.error(str)
                break
            default:
                break
        }
    }

    /**
     * 获取默认log前缀
     */
    getDefaultPrefix() {
        return `trackLog ~ ${getFormatDate(NaN, 'YYYY-MM-DD hh:mm:ss')}: `
    }
}

if (window && !window.logger) {
    const logger = new Logger()
    window.logger = logger
}

export default window.logger as Logger
