/*
 * @Author: IT-hollow
 * @Date: 2024-09-25 23:05:37
 * @LastEditors: hollow
 * @LastEditTime: 2024-09-26 00:45:59
 * @FilePath: \web-tracking\packages\core\src\queue\index.ts
 * @Description: 任务队列
 *
 * Copyright (c) 2024 by efun, All Rights Reserved.
 */

import { getUUid } from '../utils'

type QueueType = {
    id: string
    done: () => void
    onBefore?: (id?: string) => void
    onAfter?: (id?: string) => void
}

export class Queue {
    /**队列锁 */
    private lock = false
    /** 队列 */
    private queueList: QueueType[] = []

    /** 缓存队列 */
    private temQueueList = []

    constructor(
        public config?: {
            onStart?: () => void
            onFinish?: () => void
        }
    ) {}

    /**
     * 加入任务队列
     * @param task 任务
     * @returns 任务id
     */
    add(task: Omit<QueueType, 'id'>) {
        const id = getUUid()
        const newTask = Object.assign(task, {
            id,
        })
        // 如果正在执行队列，则存入缓存队列
        if (this.lock) {
            this.temQueueList.push(newTask)
            return
        }
        this.queueList.push(newTask)

        return id
    }

    /**执行任务队列 */
    async done() {
        // 锁
        this.lock = true
        const len = this.queueList.length
        const config = this.config || {}
        const { onStart, onFinish } = config
        onStart && onStart()

        for (let index = 0; index < len; index++) {
            const { onBefore, onAfter, done, id } = this.queueList.shift()

            onBefore && onBefore(id)

            await done()

            onAfter && onAfter(id)
        }

        // 取缓存队列的任务
        if (this.temQueueList.length) {
            this.queueList.push(...this.temQueueList.splice(0))
        }

        // 继续执行任务队列
        if (this.queueList.length) {
            await this.done()
        }

        onFinish && onFinish()
        // 解锁
        this.lock = false
    }
}
