import { initWebTracking, logger } from '@web-tracking/core'
;(() => {
    logger.setAllowLog(false)
    window.initWebTracking = initWebTracking
})()
