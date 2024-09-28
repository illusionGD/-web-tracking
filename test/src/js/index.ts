import { initWebTracking } from '@web-tracking/core'
$(function () {
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
