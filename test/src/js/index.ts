import {
    getDeviceInfo,
    getPerformanceInfo,
    initWebTracking,
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

    initWebTracking({
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
    })
})
