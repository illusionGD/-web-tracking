(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    exports.ResponseType = void 0;
    (function (ResponseType) {
        ResponseType["JSON"] = "JSON";
        ResponseType["TEXT"] = "TEXT";
        ResponseType["BLOB"] = "BLOB";
        ResponseType["ARRAYBUFFER"] = "ARRAYBUFFER";
    })(exports.ResponseType || (exports.ResponseType = {}));

    /*
     * @Author: IT-hollow
     * @Date: 2024-05-10 21:10:40
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-12 15:12:27
     * @Description: 常量文件
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    /**基本请求配置 */
    const BASE_REQUEST_OPTIONS = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        cache: 'no-cache',
        credentials: 'include',
        responseType: exports.ResponseType.JSON,
        timeout: 60000,
    };
    /**timestamp数 */
    const TIMESTAMP_NUMBER = {
        /**秒 */
        second: 1000,
        /**分 */
        min: 60 * 1000,
        /**小时 */
        hour: 60 * 60 * 1000,
        /**天 */
        day: 24 * 60 * 60 * 1000,
        /**周 */
        week: 7 * 24 * 60 * 60 * 1000,
        /**月(30天) */
        month: 30 * 24 * 60 * 60 * 1000,
    };

    /** cookie有效期-8小时 */
    const DEFAULT_COOKIE_EXPIRE_TIME = 1000 * 60 * 60 * 8;
    /**
     * 根据传入的key删除对应的cookie
     * @param key
     */
    function delCookie(key) {
        setCookie(key, '', -1);
    }
    /**
     * 清除全部cookie
     */
    function clearCookie() {
        const keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].indexOf('_') === 0)
                    continue;
                delCookie(keys[i]);
            }
        }
    }
    /**
     * 根据传入的key获取cookie
     * @param key
     * @returns
     */
    function getCookie(key) {
        const arrStr = document.cookie.split('; ');
        for (let i = arrStr.length - 1; i >= 0; i--) {
            const temp = arrStr[i].split('=');
            if (temp[0].trim() === key) {
                try {
                    return decodeURIComponent(temp[1]);
                }
                catch (e) {
                    return unescape(temp[1]);
                }
            }
        }
        return '';
    }
    /**
     * 添加cookie
     * @param objName
     * @param objValue
     * @param objHours 过期时间，单位h
     */
    function setCookie(key, val, timestamp, domain) {
        const expireTime = isInvalidVal(timestamp)
            ? DEFAULT_COOKIE_EXPIRE_TIME
            : timestamp;
        let str = key + '=' + encodeURIComponent(val);
        if (expireTime && expireTime > 0) {
            // 为时不设定过期时间，浏览器关闭时cookie自动消失，默认为30天
            const date = new Date();
            const ms = expireTime;
            date.setTime(date.getTime() + ms);
            str += '; expires=' + date.toUTCString();
        }
        if (domain) {
            str += '; domain=' + domain;
        }
        str += '; path=/';
        document.cookie = str;
    }

    /**
     * 获取当前时间戳
     */
    function getCurrentTimeStamp() {
        return new Date().getTime();
    }
    /**
     * 获取格式时间
     * @param format
     * @param timestamp
     */
    function getFormatDate(timestamp, format) {
        const date = timestamp ? new Date(timestamp) : new Date();
        const years = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formatNum = (num) => {
            return String(num).padStart(2, '0');
        };
        let dateStr = `${years}-${formatNum(month)}-${formatNum(day)}`;
        if (format === 'YYYY-MM-DD hh:mm:ss') {
            const hour = date.getHours();
            const min = date.getMinutes();
            const second = date.getSeconds();
            dateStr += ` ${formatNum(hour)}:${formatNum(min)}:${formatNum(second)}`;
        }
        return dateStr;
    }

    /**
     * 根据key获取localStorage
     * @param key
     * @returns
     */
    function getLocalStorage(key) {
        const val = localStorage.getItem(key) || '';
        return val ? JSON.parse(val) : val;
    }
    /**
     * 设置localStorage
     * @param key
     * @param json
     */
    function setLocalStorage(key, json) {
        localStorage.setItem(key, JSON.stringify(json));
    }
    /**
     * 根据key清除对应的localStorage
     * @param key
     */
    function removeLocalStorage(key) {
        localStorage.removeItem(key);
    }
    /**
     * 清除全部localStorage
     */
    function clearLocalStorage() {
        localStorage.clear();
    }
    /**
     * 设置localStorage（自带命名空间+自动过期时间）
     * @param key
     * @param value
     * @param expireTime 过期时间，单位ms
     */
    function setLocalItemWithExpire(key, value, expireTime) {
        const currentTime = new Date().getTime();
        const expire = currentTime + expireTime;
        const data = {
            value,
            expire,
            date: getFormatDate(expire),
        };
        setLocalStorage(key, data);
    }
    /**
     * 获取localStorage（自带命名空间+自动过期时间）
     * @param key
     */
    function getLocalItemWithExpire(key) {
        const data = getLocalStorage(key);
        if (!data) {
            return '';
        }
        if (isWidthExpireVal(key)) {
            const currentTime = getCurrentTimeStamp();
            if (currentTime > data.expire) {
                removeLocalStorage(key);
                return '';
            }
            return data.value;
        }
        else {
            return data;
        }
    }
    /**
     * 清除已到过期时间的localStorage
     */
    function clearExpiredLocalStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i) || '';
            console.log('🚀 ~ key:', key);
            if (isWidthExpireVal(key)) {
                const currentTime = getCurrentTimeStamp();
                const { expire } = getLocalStorage(key);
                if (expire && currentTime > expire) {
                    removeLocalStorage(key);
                }
            }
        }
    }
    /**是否有超时设置的val */
    function isWidthExpireVal(key) {
        const data = getLocalStorage(key);
        if (!data) {
            return false;
        }
        if (data instanceof Object && !isInvalidVal(data.expire)) {
            return true;
        }
        return false;
    }

    /**
     * 将对象转成参数
     * @param obj 对象
     * @param isEncode 是否encode
     * @returns a=1&b=2...
     */
    function qsString(obj, isEncode = true) {
        if (obj instanceof Object) {
            let str = '';
            Object.keys(obj).forEach((key, index) => {
                str += `${index ? '&' : ''}${key}=${isEncode ? encodeURIComponent(obj[key]) : obj[key]}`;
            });
            return str;
        }
        else if (typeof obj === 'string') {
            return obj;
        }
        else if (typeof obj === 'number') {
            return `${obj}`;
        }
        else {
            return '';
        }
    }
    /**
     * 校验是否为纯粹的对象
     * @param obj
     */
    function isPlainObject(obj) {
        let proto, Ctor;
        if (!obj || typeof obj !== 'object')
            return false;
        proto = Object.getPrototypeOf(obj);
        if (!proto)
            return true;
        Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
        return typeof Ctor === 'function' && Ctor === Object;
    }
    /**
     * 格式化post请求的body
     * @param body
     * @param contentType
     */
    function formatPostBody(body, contentType) {
        if (!body) {
            return '';
        }
        if (!contentType || contentType.includes('urlencoded'))
            return qsString(body);
        if (contentType.includes('json'))
            return typeof body === 'string' ? body : JSON.stringify(body);
    }
    function deepCloneObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /**是否为无效值 */
    function isInvalidVal(val) {
        return [NaN, undefined, null, 'null', 'undefined', 'NaN'].indexOf(val) >= 0;
    }

    /*
     * @Author: IT-hollow
     * @Date: 2024-05-14 21:42:51
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-21 15:27:51
     * @Description: xhr ajax请求封装
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    const defaultOptions = BASE_REQUEST_OPTIONS;
    function ajax(url, options) {
        const { method, params, body, headers } = Object.assign({}, defaultOptions, options);
        const xhr = new XMLHttpRequest();
        const paramStr = qsString(params);
        //启动并发送一个请求
        if ((method === null || method === void 0 ? void 0 : method.toLocaleLowerCase()) === 'get') {
            xhr.open('GET', `${url}${url.includes('?') ? '' : '?'}${paramStr}`, true);
            xhr.send(null);
        }
        else {
            xhr.open('post', url, true);
            for (const key in headers) {
                if (Object.prototype.hasOwnProperty.call(headers, key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
            xhr.send(formatPostBody(body, headers['Content-Type']));
        }
        return new Promise((resolve, reject) => {
            const result = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: {},
            };
            xhr.ontimeout = function () {
                result.status = xhr.status;
                reject(result);
            };
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                const status = xhr.status;
                const statusText = xhr.statusText;
                result.status = status;
                result.statusText = statusText;
                if (status >= 200 && status < 400) {
                    resolve(Object.assign({
                        data: JSON.parse(xhr.response)
                    }, result));
                }
                else {
                    reject(result);
                }
            };
        });
    }

    const inital = BASE_REQUEST_OPTIONS;
    function fetchRequest(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof url !== 'string')
                throw new TypeError('url must be required and of string type');
            const options = deepCloneObj(inital);
            Object.assign(options, config || {});
            const { method, params, body, headers, cache, credentials, responseType } = options;
            if (params != null) {
                const paramsStr = qsString(params);
                url += `${url.includes('?') ? '' : '?'}${paramsStr}`;
            }
            const bodyInit = {
                method: method === null || method === void 0 ? void 0 : method.toUpperCase(),
                headers,
                credentials,
                cache,
            };
            if (/^(POST|PUT|PATCH)$/i.test(method) && body != null) {
                if (isPlainObject(body)) {
                    bodyInit['body'] = formatPostBody(body, headers['Content-Type']);
                }
            }
            try {
                const req = yield fetch(url, bodyInit);
                const { status, statusText } = req;
                const result = {
                    status,
                    statusText,
                    headers: {},
                };
                let data = null;
                if (status >= 200 && status < 400) {
                    switch (responseType.toUpperCase()) {
                        case exports.ResponseType.JSON:
                            data = yield req.json();
                            break;
                        case exports.ResponseType.TEXT:
                            data = yield req.text();
                            break;
                        case exports.ResponseType.BLOB:
                            data = yield req.blob();
                            break;
                        case exports.ResponseType.ARRAYBUFFER:
                            data = yield req.arrayBuffer();
                            break;
                    }
                }
                return Object.assign({
                    data,
                }, result);
            }
            catch (error) {
                console.log('fetch请求错误:', error);
                return error;
            }
        });
    }

    /*
     * @Author: IT-hollow
     * @Date: 2024-05-10 23:06:28
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-21 15:30:22
     * @Description: jsonp封装
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    const defaultConfig = {
        timeout: 60000,
        params: {},
    };
    const count = 0;
    function jsonp(url, opts) {
        if (!window) {
            return Promise.reject('it is not browser env!');
        }
        // 实现Promise化
        return new Promise((resolve, reject) => {
            //设置默认参数
            const { timeout, params } = Object.assign({}, defaultConfig, opts);
            const name = 'jsonpcallback' + new Date().getTime() + count;
            let timer = null;
            //清除script标签以及注册的全局函数以及超时定时器
            function cleanup() {
                // 清除函数
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                    window[name] = null;
                    if (timer) {
                        clearTimeout(timer);
                    }
                }
            }
            if (!isInvalidVal(timeout)) {
                // 超时
                timer = setTimeout(() => {
                    cleanup();
                    reject('timeout');
                }, timeout);
            }
            // 注册全局函数，等待执行中...
            window[name] = (res) => {
                // 只要这个函数一执行，就表示请求成功，可以使用清除函数了
                if (window[name]) {
                    cleanup();
                }
                // 将请求到的数据扔给then
                resolve(res);
            };
            // 以下将params对象格式的参数拼接到url的后面
            let str = '';
            if (isPlainObject(params)) {
                for (const key in params) {
                    const value = params[key] || '';
                    str += `&${key}=${encodeURIComponent(value)}`;
                }
            }
            url = url + (url.indexOf('?') > 0 ? '' : '?') + str.substr(1);
            // 最后加上与服务端协商的jsonp请求字段
            url = `${url}&callback=${name}`;
            const script = document.createElement('script');
            script.src = url;
            // 以下这条执行且成功后，全局等待函数就会被执行
            document.head.appendChild(script);
        });
    }

    class Http {
        constructor() {
            /** 是否支持fetch */
            this.supportFetch = true;
            this.jsonp = jsonp;
            this.supportFetch = !!window.fetch;
        }
        get(url, params) {
            return __awaiter(this, void 0, void 0, function* () {
                const method = 'GET';
                if (this.supportFetch) {
                    const { data } = yield fetchRequest(url, {
                        method,
                        params,
                    });
                    return data;
                }
                else {
                    const { data } = yield ajax(url, {
                        method,
                        params,
                    });
                    return data;
                }
            });
        }
        post(url, body, opts) {
            return __awaiter(this, void 0, void 0, function* () {
                const method = 'POST';
                const headers = {
                    'Content-Type': 'application/json;charset=utf-8',
                };
                const options = {
                    method,
                    headers,
                    body,
                };
                if (opts) {
                    Object.assign(options, opts);
                }
                if (this.supportFetch) {
                    const { data } = yield fetchRequest(url, options);
                    return data;
                }
                else {
                    const { data } = yield ajax(url, options);
                    return data;
                }
            });
        }
    }
    const http = new Http();

    exports.BASE_REQUEST_OPTIONS = BASE_REQUEST_OPTIONS;
    exports.Http = Http;
    exports.TIMESTAMP_NUMBER = TIMESTAMP_NUMBER;
    exports.clearCookie = clearCookie;
    exports.clearExpiredLocalStorage = clearExpiredLocalStorage;
    exports.clearLocalStorage = clearLocalStorage;
    exports.deepCloneObj = deepCloneObj;
    exports.delCookie = delCookie;
    exports.formatPostBody = formatPostBody;
    exports.getCookie = getCookie;
    exports.getCurrentTimeStamp = getCurrentTimeStamp;
    exports.getFormatDate = getFormatDate;
    exports.getLocalItemWithExpire = getLocalItemWithExpire;
    exports.getLocalStorage = getLocalStorage;
    exports.http = http;
    exports.isInvalidVal = isInvalidVal;
    exports.isPlainObject = isPlainObject;
    exports.isWidthExpireVal = isWidthExpireVal;
    exports.qsString = qsString;
    exports.removeLocalStorage = removeLocalStorage;
    exports.setCookie = setCookie;
    exports.setLocalItemWithExpire = setLocalItemWithExpire;
    exports.setLocalStorage = setLocalStorage;

}));
//# sourceMappingURL=index.js.map
