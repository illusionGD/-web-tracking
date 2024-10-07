import {
    getDeviceInfo,
    getPerformanceInfo,
    initWebTracking,
    TIMESTAMP_NUMBER,
} from '@web-tracking/core'
$(function () {
    setTimeout(() => {
        $('.test').addClass('section-1')
        console.log(getPerformanceInfo())
    }, 1000)
    console.log(getDeviceInfo())

    $('.btn').on('click', () => {
        $('.test').css('margin-top', '200px')
    })

    const list = initWebTracking({
        sessionIdCacheTime: TIMESTAMP_NUMBER.min * 30,
        on: {
            beforeInit: () => {
                console.log('beforeInit')
            },
            afterInit: () => {
                console.log('afterInit')
            },
            pageView: () => {
                console.log('pageView')
            },
            pageShow: () => {
                console.log('pageShow')
            },
            pageHide: () => {
                console.log('pageHide')
            },
        },
        sendDataConfig: {
            atOnce: false,
            threshold: 1,
            customSendData: (data) => {
                console.log('🚀 ~ data:', data)
            },
        },
    }).dataQueue.get()
})
