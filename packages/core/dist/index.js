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
    exports.LocalStorageKeyEnum = void 0;
    (function (LocalStorageKeyEnum) {
        LocalStorageKeyEnum["CLIENT_ID"] = "web_tracking_client_id";
    })(exports.LocalStorageKeyEnum || (exports.LocalStorageKeyEnum = {}));
    exports.CycleTypeEnum = void 0;
    (function (CycleTypeEnum) {
        /** 初始化前 */
        CycleTypeEnum["BEFORE_INIT"] = "BEFORE_INIT";
        /** 初始化后 */
        CycleTypeEnum["AFTER_INIT"] = "AFTER_INIT";
        /** 用户pv */
        CycleTypeEnum["PAGE_VIEW"] = "PAGE_VIEW";
        /** 页面隐藏 */
        CycleTypeEnum["PAGE_SHOW"] = "PAGE_SHOW";
        /** 页面隐藏 */
        CycleTypeEnum["PAGE_HIDE"] = "PAGE_HIDE";
        /** 页面关闭 */
        CycleTypeEnum["BEFORE_UNLOADED"] = "BEFORE_UNLOADED";
        /** 发生数据之前 */
        CycleTypeEnum["BEFORE_SEND_DATA"] = "BEFORE_SEND_DATA";
        /** 发生数据之后 */
        CycleTypeEnum["AFTER_SEND_DATA"] = "AFTER_SEND_DATA";
    })(exports.CycleTypeEnum || (exports.CycleTypeEnum = {}));

    /*
     * @Author: IT-hollow
     * @Date: 2024-05-10 21:10:40
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-28 23:37:07
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
    /** 默认初始化配置 */
    const WEB_TRACKING_DEFAULT_CONFIGS = {
        on: {},
        sendDataConfig: {
            requestConfigs: [],
            threshold: 10,
        },
    };
    /** 默认性能监控数据 */
    const DEFAULT_PERFORMANCE_INFO = {
        /** 白屏时间 */
        white_time: 0,
        /** 加载时间 */
        load_time: 0,
        /** 页面停留时间 */
        stop_time: 0,
        /** 重定向时间 */
        redirect_time: 0,
        /** dns解析时间 */
        dns_time: 0,
        /** tcp链接时间 */
        tcp_time: 0,
        /** 向服务器请求时间 */
        request_time: 0,
        /** 服务器响应时间 */
        response_time: 0,
        /** 首屏渲染时间 */
        fcp_time: 0,
        /** 最大内容渲染时间 */
        lcp_time: 0,
        /** 第一次交换响应时间 */
        fid_time: 0,
        /** 页面布局偏移分数 */
        cls_score: 0,
    };
    /** 默认webTracking状态 */
    const DEFAULT_WEB_TRACKING_STATE = {
        /** 是否初始化web-vitals */
        WEB_VITALS_INITD: 0
    };

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */
    var byteToHex = [];
    for (var i$1 = 0; i$1 < 256; ++i$1) {
      byteToHex.push((i$1 + 0x100).toString(16).slice(1));
    }
    function unsafeStringify(arr, offset = 0) {
      // Note: Be careful editing this code!  It's been tuned for performance
      // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
      //
      // Note to future-self: No, you can't remove the `toLowerCase()` call.
      // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
      return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    }

    // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).

    var getRandomValues;
    var rnds8 = new Uint8Array(16);
    function rng() {
      // lazy load so that environments that need to polyfill have a chance to do so
      if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) {
          throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
      }
      return getRandomValues(rnds8);
    }

    var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var native = {
      randomUUID
    };

    function v4(options, buf, offset) {
      if (native.randomUUID && !buf && !options) {
        return native.randomUUID();
      }
      options = options || {};
      var rnds = options.random || (options.rng || rng)();

      // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80;

      // Copy bytes to buffer, if provided
      if (buf) {
        offset = offset || 0;
        for (var i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return unsafeStringify(rnds);
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
    /**
     * 获取uuid
     */
    function getUUid() {
        return v4();
    }

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

    /*
     * @Author: IT-hollow
     * @Date: 2024-09-26 12:24:08
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-28 22:51:12
     * @FilePath: \web-tracking\packages\core\src\utils\env.ts
     * @Description: 判断运行环境 or 条件
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    /**
     * 判断是否为ipad
     * @returns
     */
    function isIPad() {
        if (!isBrowser())
            return false;
        const { platform, maxTouchPoints } = window.navigator;
        return platform === 'MacIntel' && maxTouchPoints > 1; /* iPad OS 13 */
    }
    /**
     * 是否为前端浏览器环境
     * @returns
     */
    function isBrowser() {
        return typeof window !== 'undefined';
    }
    /**
     * 判断是否为移动端设备（兼容前端&服务端）
     */
    function isMb() {
        if (!isBrowser()) {
            return false;
        }
        const ua = navigator.userAgent;
        return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(ua);
    }
    /**
     * 判断是否为安卓设备
     */
    function isAndroid() {
        const ua = navigator.userAgent;
        return ua.includes('Android') || ua.includes('Linux');
    }
    /**
     * 判断是否为苹果设备，包含mac
     * @returns
     */
    function isIOS() {
        return (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || isIPad());
    }
    /**
     * 判断是否为微信webview浏览器环境
     */
    function isWechatBrowser() {
        return /micromessenger/i.test(navigator.userAgent);
    }
    /**
     * 是否支持webTracking，检查是否有注入埋点工具
     */
    function isSupportWebTracking() {
        if (isBrowser()) {
            return !!window._webTracking_;
        }
    }
    /**
     * 获取webTracking对象
     * @returns
     */
    function getWebTracking() {
        return isSupportWebTracking() ? window._webTracking_ : {};
    }
    /** 是否支持性能监控 */
    function isSupportPerformance() {
        return !!window.performance;
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

    /*
     * @Author: IT-hollow
     * @Date: 2024-09-25 23:29:58
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-28 23:51:17
     * @FilePath: \web-tracking\packages\core\src\libs\logger.ts
     * @Description: log
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    var LogTypeEnum;
    (function (LogTypeEnum) {
        LogTypeEnum["LOG"] = "LOG";
        LogTypeEnum["WARN"] = "WARN";
        LogTypeEnum["ERROR"] = "ERROR";
    })(LogTypeEnum || (LogTypeEnum = {}));
    class Logger {
        constructor(config) {
            this.config = {
                bandLogTye: [],
            };
            Object.assign(this.config, config);
        }
        warn(...arg) {
            this.logOut(LogTypeEnum.WARN, ...arg);
        }
        error(...arg) {
            this.logOut(LogTypeEnum.ERROR, ...arg);
        }
        log(...arg) {
            this.logOut(LogTypeEnum.LOG, ...arg);
        }
        logOut(type = LogTypeEnum.LOG, ...arg) {
            const { bandLogTye } = this.config;
            if (bandLogTye.includes(type)) {
                return;
            }
            switch (type) {
                case LogTypeEnum.LOG:
                    console.log(this.getDefaultPrefix(), ...arg);
                    break;
                case LogTypeEnum.WARN:
                    console.warn(this.getDefaultPrefix(), ...arg);
                    break;
                case LogTypeEnum.ERROR:
                    console.error(this.getDefaultPrefix(), ...arg);
                    break;
            }
        }
        /**
         * 是否打印日志
         * @param isLog true | false
         */
        setAllowLog(isLog) {
            if (isLog) {
                this.config.bandLogTye.length = 0;
            }
            else {
                this.config.bandLogTye.push(LogTypeEnum.ERROR, LogTypeEnum.LOG, LogTypeEnum.WARN);
            }
        }
        /**
         * 获取默认log前缀
         */
        getDefaultPrefix() {
            return `trackLog__${getFormatDate(NaN, 'YYYY-MM-DD hh:mm:ss')}__`;
        }
    }
    // 单例模式
    if (isBrowser() && !window._webTrackingLogger_) {
        const logger = new Logger();
        window._webTrackingLogger_ = logger;
    }
    var logger = window._webTrackingLogger_;

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
                logger.error('fetch error: ' + error);
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

    /*
     * @Author: IT-hollow
     * @Date: 2024-09-25 22:50:59
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-28 16:47:38
     * @FilePath: \web-tracking\packages\core\src\libs\eventManager.ts
     * @Description: 事件管理器
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    class EventManager {
        constructor() {
            /**事件容器 */
            this.eventMap = new Map();
        }
        /**
         * 事件监听
         */
        on(eventName, callBack) {
            if (!this.eventMap.has(eventName)) {
                this.eventMap.set(eventName, new Set());
            }
            if (!callBack) {
                return;
            }
            const fnSet = this.eventMap.get(eventName);
            fnSet.add(callBack);
        }
        /**
         * 取消事件监听
         * @param eventName 事件名称
         * @param callBack 回调函数
         */
        off(eventName, callBack) {
            if (!this.eventMap.has(eventName)) {
                return false;
            }
            const fnSet = this.eventMap.get(eventName);
            return fnSet.delete(callBack);
        }
        /**
         * 事件触发器
         */
        emitter(eventName) {
            if (!this.eventMap.has(eventName)) {
                return false;
            }
            const fnSet = this.eventMap.get(eventName);
            fnSet.forEach((fn) => fn());
        }
    }
    // 单例模式
    if (isBrowser() && !window._webTrackingEventManager_) {
        const eventManager = new EventManager();
        window._webTrackingEventManager_ = eventManager;
    }
    const eventManager = window._webTrackingEventManager_;

    var e,
      n,
      t,
      r,
      i,
      o = -1,
      a = function (e) {
        addEventListener("pageshow", function (n) {
          n.persisted && (o = n.timeStamp, e(n));
        }, !0);
      },
      c = function () {
        var e = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
        if (e && e.responseStart > 0 && e.responseStart < performance.now()) return e;
      },
      u = function () {
        var e = c();
        return e && e.activationStart || 0;
      },
      f = function (e, n) {
        var t = c(),
          r = "navigate";
        o >= 0 ? r = "back-forward-cache" : t && (document.prerendering || u() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : t.type && (r = t.type.replace(/_/g, "-")));
        return {
          name: e,
          value: void 0 === n ? -1 : n,
          rating: "good",
          delta: 0,
          entries: [],
          id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
          navigationType: r
        };
      },
      s = function (e, n, t) {
        try {
          if (PerformanceObserver.supportedEntryTypes.includes(e)) {
            var r = new PerformanceObserver(function (e) {
              Promise.resolve().then(function () {
                n(e.getEntries());
              });
            });
            return r.observe(Object.assign({
              type: e,
              buffered: !0
            }, t || {})), r;
          }
        } catch (e) {}
      },
      d = function (e, n, t, r) {
        var i, o;
        return function (a) {
          n.value >= 0 && (a || r) && ((o = n.value - (i || 0)) || void 0 === i) && (i = n.value, n.delta = o, n.rating = function (e, n) {
            return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good";
          }(n.value, t), e(n));
        };
      },
      l = function (e) {
        requestAnimationFrame(function () {
          return requestAnimationFrame(function () {
            return e();
          });
        });
      },
      p = function (e) {
        document.addEventListener("visibilitychange", function () {
          "hidden" === document.visibilityState && e();
        });
      },
      v = function (e) {
        var n = !1;
        return function () {
          n || (e(), n = !0);
        };
      },
      m = -1,
      h = function () {
        return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
      },
      g = function (e) {
        "hidden" === document.visibilityState && m > -1 && (m = "visibilitychange" === e.type ? e.timeStamp : 0, T());
      },
      y = function () {
        addEventListener("visibilitychange", g, !0), addEventListener("prerenderingchange", g, !0);
      },
      T = function () {
        removeEventListener("visibilitychange", g, !0), removeEventListener("prerenderingchange", g, !0);
      },
      E = function () {
        return m < 0 && (m = h(), y(), a(function () {
          setTimeout(function () {
            m = h(), y();
          }, 0);
        })), {
          get firstHiddenTime() {
            return m;
          }
        };
      },
      C = function (e) {
        document.prerendering ? addEventListener("prerenderingchange", function () {
          return e();
        }, !0) : e();
      },
      b = [1800, 3e3],
      S = function (e, n) {
        n = n || {}, C(function () {
          var t,
            r = E(),
            i = f("FCP"),
            o = s("paint", function (e) {
              e.forEach(function (e) {
                "first-contentful-paint" === e.name && (o.disconnect(), e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - u(), 0), i.entries.push(e), t(!0)));
              });
            });
          o && (t = d(e, i, b, n.reportAllChanges), a(function (r) {
            i = f("FCP"), t = d(e, i, b, n.reportAllChanges), l(function () {
              i.value = performance.now() - r.timeStamp, t(!0);
            });
          }));
        });
      },
      L = [.1, .25],
      w = function (e, n) {
        n = n || {}, S(v(function () {
          var t,
            r = f("CLS", 0),
            i = 0,
            o = [],
            c = function (e) {
              e.forEach(function (e) {
                if (!e.hadRecentInput) {
                  var n = o[0],
                    t = o[o.length - 1];
                  i && e.startTime - t.startTime < 1e3 && e.startTime - n.startTime < 5e3 ? (i += e.value, o.push(e)) : (i = e.value, o = [e]);
                }
              }), i > r.value && (r.value = i, r.entries = o, t());
            },
            u = s("layout-shift", c);
          u && (t = d(e, r, L, n.reportAllChanges), p(function () {
            c(u.takeRecords()), t(!0);
          }), a(function () {
            i = 0, r = f("CLS", 0), t = d(e, r, L, n.reportAllChanges), l(function () {
              return t();
            });
          }), setTimeout(t, 0));
        }));
      },
      A = 0,
      I = 1 / 0,
      P = 0,
      M = function (e) {
        e.forEach(function (e) {
          e.interactionId && (I = Math.min(I, e.interactionId), P = Math.max(P, e.interactionId), A = P ? (P - I) / 7 + 1 : 0);
        });
      },
      k = function () {
        return e ? A : performance.interactionCount || 0;
      },
      F = function () {
        "interactionCount" in performance || e || (e = s("event", M, {
          type: "event",
          buffered: !0,
          durationThreshold: 0
        }));
      },
      D = [],
      x = new Map(),
      R = 0,
      B = function () {
        var e = Math.min(D.length - 1, Math.floor((k() - R) / 50));
        return D[e];
      },
      H = [],
      q = function (e) {
        if (H.forEach(function (n) {
          return n(e);
        }), e.interactionId || "first-input" === e.entryType) {
          var n = D[D.length - 1],
            t = x.get(e.interactionId);
          if (t || D.length < 10 || e.duration > n.latency) {
            if (t) e.duration > t.latency ? (t.entries = [e], t.latency = e.duration) : e.duration === t.latency && e.startTime === t.entries[0].startTime && t.entries.push(e);else {
              var r = {
                id: e.interactionId,
                latency: e.duration,
                entries: [e]
              };
              x.set(r.id, r), D.push(r);
            }
            D.sort(function (e, n) {
              return n.latency - e.latency;
            }), D.length > 10 && D.splice(10).forEach(function (e) {
              return x.delete(e.id);
            });
          }
        }
      },
      O = function (e) {
        var n = self.requestIdleCallback || self.setTimeout,
          t = -1;
        return e = v(e), "hidden" === document.visibilityState ? e() : (t = n(e), p(e)), t;
      },
      N = [200, 500],
      j = function (e, n) {
        "PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype && (n = n || {}, C(function () {
          var t;
          F();
          var r,
            i = f("INP"),
            o = function (e) {
              O(function () {
                e.forEach(q);
                var n = B();
                n && n.latency !== i.value && (i.value = n.latency, i.entries = n.entries, r());
              });
            },
            c = s("event", o, {
              durationThreshold: null !== (t = n.durationThreshold) && void 0 !== t ? t : 40
            });
          r = d(e, i, N, n.reportAllChanges), c && (c.observe({
            type: "first-input",
            buffered: !0
          }), p(function () {
            o(c.takeRecords()), r(!0);
          }), a(function () {
            R = k(), D.length = 0, x.clear(), i = f("INP"), r = d(e, i, N, n.reportAllChanges);
          }));
        }));
      },
      _ = [2500, 4e3],
      z = {},
      G = function (e, n) {
        n = n || {}, C(function () {
          var t,
            r = E(),
            i = f("LCP"),
            o = function (e) {
              n.reportAllChanges || (e = e.slice(-1)), e.forEach(function (e) {
                e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - u(), 0), i.entries = [e], t());
              });
            },
            c = s("largest-contentful-paint", o);
          if (c) {
            t = d(e, i, _, n.reportAllChanges);
            var m = v(function () {
              z[i.id] || (o(c.takeRecords()), c.disconnect(), z[i.id] = !0, t(!0));
            });
            ["keydown", "click"].forEach(function (e) {
              addEventListener(e, function () {
                return O(m);
              }, !0);
            }), p(m), a(function (r) {
              i = f("LCP"), t = d(e, i, _, n.reportAllChanges), l(function () {
                i.value = performance.now() - r.timeStamp, z[i.id] = !0, t(!0);
              });
            });
          }
        });
      },
      J = [800, 1800],
      K = function e(n) {
        document.prerendering ? C(function () {
          return e(n);
        }) : "complete" !== document.readyState ? addEventListener("load", function () {
          return e(n);
        }, !0) : setTimeout(n, 0);
      },
      Q = function (e, n) {
        n = n || {};
        var t = f("TTFB"),
          r = d(e, t, J, n.reportAllChanges);
        K(function () {
          var i = c();
          i && (t.value = Math.max(i.responseStart - u(), 0), t.entries = [i], r(!0), a(function () {
            t = f("TTFB", 0), (r = d(e, t, J, n.reportAllChanges))(!0);
          }));
        });
      },
      U = {
        passive: !0,
        capture: !0
      },
      V = new Date(),
      W = function (e, i) {
        n || (n = i, t = e, r = new Date(), Z(removeEventListener), X());
      },
      X = function () {
        if (t >= 0 && t < r - V) {
          var e = {
            entryType: "first-input",
            name: n.type,
            target: n.target,
            cancelable: n.cancelable,
            startTime: n.timeStamp,
            processingStart: n.timeStamp + t
          };
          i.forEach(function (n) {
            n(e);
          }), i = [];
        }
      },
      Y = function (e) {
        if (e.cancelable) {
          var n = (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
          "pointerdown" == e.type ? function (e, n) {
            var t = function () {
                W(e, n), i();
              },
              r = function () {
                i();
              },
              i = function () {
                removeEventListener("pointerup", t, U), removeEventListener("pointercancel", r, U);
              };
            addEventListener("pointerup", t, U), addEventListener("pointercancel", r, U);
          }(n, e) : W(n, e);
        }
      },
      Z = function (e) {
        ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (n) {
          return e(n, Y, U);
        });
      },
      $ = [100, 300],
      ee = function (e, r) {
        r = r || {}, C(function () {
          var o,
            c = E(),
            u = f("FID"),
            l = function (e) {
              e.startTime < c.firstHiddenTime && (u.value = e.processingStart - e.startTime, u.entries.push(e), o(!0));
            },
            m = function (e) {
              e.forEach(l);
            },
            h = s("first-input", m);
          o = d(e, u, $, r.reportAllChanges), h && (p(v(function () {
            m(h.takeRecords()), h.disconnect();
          })), a(function () {
            var a;
            u = f("FID"), o = d(e, u, $, r.reportAllChanges), i = [], t = -1, n = null, Z(addEventListener), a = l, i.push(a), X();
          }));
        });
      };

    /*
     * @Author: IT-hollow
     * @Date: 2024-09-28 22:32:52
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-28 23:36:18
     * @FilePath: \web-tracking\packages\core\src\libs\state.ts
     * @Description: webTracking的全局状态管理
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    /**
     * 获取webTracking状态
     * @returns
     */
    function getState() {
        return getWebTracking().state || DEFAULT_WEB_TRACKING_STATE;
    }
    /**
     * 获取特定名称的状态
     * @param name
     */
    function getStateByName(name) {
        return getState()[name];
    }
    /**
     * 初始化webTracking状态
     */
    function initState() {
        const state = getState();
        getWebTracking().state = state;
    }
    /**
     * 设置特定名称状态
     * @param state
     */
    function setStateByName(name, val) {
        getState()[name] = val;
    }

    function initPerformance() {
        initWebVitals();
        if (!isSupportWebTracking()) {
            return;
        }
        const webTracking = getWebTracking();
        webTracking.performanceInfo = getPerformanceInfo();
    }
    /** 初始化web-vitals监听 */
    function initWebVitals() {
        if (getStateByName('WEB_VITALS_INITD')) {
            return;
        }
        const webTracking = getWebTracking();
        const onVital = (type, e) => {
            webTracking.performanceInfo[`${type}_time`] = e.delta;
        };
        S((e) => {
            onVital('fcp', e);
            onVital('white', e);
        });
        w((e) => {
            onVital('cls', e);
        });
        j((e) => {
            onVital('inp', e);
        });
        Q((e) => {
            onVital('ttfb', e);
        });
        ee((e) => {
            onVital('fid', e);
        });
        G((e) => {
            onVital('lcp', e);
        }, {
            reportAllChanges: true, // 每次变化都更新数据
        });
        setStateByName('WEB_VITALS_INITD', 1);
    }
    /**
     * 获取性能监控数据
     */
    function getPerformanceInfo() {
        const webTracking = getWebTracking();
        const info = webTracking.performanceInfo ||
            Object.assign({}, DEFAULT_PERFORMANCE_INFO);
        if (!isSupportPerformance()) {
            return info;
        }
        if (performance.getEntries) {
            Object.assign(info, getTimesByNavigationTiming());
        }
        // 兼容
        else if (performance.timing) {
            Object.assign(info, getTimesByTiming());
        }
        return info;
    }
    function getTimesByNavigationTiming() {
        const timing = performance.getEntries()[0];
        return {
            load_time: timing.loadEventStart,
            dns_time: timing.domainLookupEnd - timing.domainLookupStart,
            redirect_time: timing.redirectEnd - timing.redirectStart,
            tcp_time: timing.connectEnd - timing.connectStart,
            request_time: timing.responseStart - timing.requestStart,
            response_time: timing.responseEnd - timing.responseStart,
            stop_time: performance.now(),
        };
    }
    function getTimesByTiming() {
        const timing = performance.timing;
        return {
            load_time: timing.loadEventStart - timing.navigationStart,
            dns_time: timing.domainLookupEnd - timing.domainLookupStart,
            redirect_time: timing.redirectEnd - timing.redirectStart,
            tcp_time: timing.connectEnd - timing.connectStart,
            request_time: timing.responseStart - timing.requestStart,
            response_time: timing.responseEnd - timing.responseStart,
            stop_time: performance.now(),
        };
    }

    /*
     * @Author: IT-hollow
     * @Date: 2024-09-25 23:05:37
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-26 12:19:43
     * @FilePath: \web-tracking\packages\core\src\libs\queue.ts
     * @Description: 任务队列
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    class Queue {
        constructor(config) {
            this.config = config;
            /**队列锁 */
            this.lock = false;
            /** 队列 */
            this.queueList = [];
            /** 缓存队列 */
            this.temQueueList = [];
        }
        /**
         * 加入任务队列
         * @param task 任务
         * @returns 任务id
         */
        add(task) {
            const id = getUUid();
            const newTask = Object.assign(task, {
                id,
            });
            // 如果正在执行队列，则存入缓存队列
            if (this.lock) {
                this.temQueueList.push(newTask);
                return;
            }
            this.queueList.push(newTask);
            return id;
        }
        /**执行任务队列 */
        done() {
            return __awaiter(this, void 0, void 0, function* () {
                // 锁
                this.lock = true;
                const len = this.queueList.length;
                const config = this.config || {};
                const { onStart, onFinish } = config;
                onStart && onStart();
                for (let index = 0; index < len; index++) {
                    const { onBefore, onAfter, done, id } = this.queueList.shift();
                    onBefore && onBefore(id);
                    yield done();
                    onAfter && onAfter(id);
                }
                // 取缓存队列的任务
                if (this.temQueueList.length) {
                    this.queueList.push(...this.temQueueList.splice(0));
                }
                // 继续执行任务队列
                if (this.queueList.length) {
                    yield this.done();
                }
                onFinish && onFinish();
                // 解锁
                this.lock = false;
            });
        }
    }

    /*
     * @Author: IT-hollow
     * @Date: 2024-09-28 14:45:19
     * @LastEditors: hollow
     * @LastEditTime: 2024-09-28 17:11:25
     * @FilePath: \web-tracking\packages\core\src\libs\observer.ts
     * @Description: 监听回调
     *
     * Copyright (c) 2024 by efun, All Rights Reserved.
     */
    /** 监听页面pageView */
    function onPageView(fn) {
        eventManager.on(exports.CycleTypeEnum.PAGE_VIEW, fn);
    }
    /** 监听页面pageShow */
    function onPageShow(fn) {
        eventManager.on(exports.CycleTypeEnum.PAGE_SHOW, fn);
    }
    /** 监听页面pageHide */
    function onPageHide(fn) {
        eventManager.on(exports.CycleTypeEnum.PAGE_HIDE, fn);
    }
    /** 数据上报前回调 */
    function onBeforeSendData(fn) {
        eventManager.on(exports.CycleTypeEnum.BEFORE_SEND_DATA, fn);
    }
    /** 数据上报后回调 */
    function onAfterSendData(fn) {
        eventManager.on(exports.CycleTypeEnum.AFTER_SEND_DATA, fn);
    }

    function initWebTracking(options) {
        // 单例设计模式，已经初始化不再执行
        if (isSupportWebTracking()) {
            return;
        }
        const opts = Object.assign(deepCloneObj(WEB_TRACKING_DEFAULT_CONFIGS), options);
        const { beforeInit, afterInit } = opts.on;
        beforeInit && beforeInit();
        const clientId = getLocalStorage(exports.LocalStorageKeyEnum.CLIENT_ID) || getUUid();
        window._webTracking_ = {
            clientId,
            options: opts,
        };
        setLocalStorage(exports.LocalStorageKeyEnum.CLIENT_ID, clientId);
        initCycle(options);
        initState();
        initPerformance();
        afterInit && afterInit();
        eventManager.emitter(exports.CycleTypeEnum.PAGE_VIEW);
        logger.log(window._webTracking_);
    }
    /** 初始化生命周期函数 */
    function initCycle(options) {
        const { pageHide, pageView, sendAfter, sendBefore, pageShow } = options.on;
        onPageView(pageView);
        onPageShow(pageShow);
        onPageHide(pageHide);
        onBeforeSendData(sendBefore);
        onAfterSendData(sendAfter);
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                eventManager.emitter(exports.CycleTypeEnum.PAGE_HIDE);
            }
            if (document.visibilityState === 'visible') {
                eventManager.emitter(exports.CycleTypeEnum.PAGE_SHOW);
            }
        });
        window.addEventListener('load', () => {
            getWebTracking().performanceInfo = getPerformanceInfo();
        });
    }

    exports.BASE_REQUEST_OPTIONS = BASE_REQUEST_OPTIONS;
    exports.DEFAULT_PERFORMANCE_INFO = DEFAULT_PERFORMANCE_INFO;
    exports.DEFAULT_WEB_TRACKING_STATE = DEFAULT_WEB_TRACKING_STATE;
    exports.Http = Http;
    exports.Queue = Queue;
    exports.TIMESTAMP_NUMBER = TIMESTAMP_NUMBER;
    exports.WEB_TRACKING_DEFAULT_CONFIGS = WEB_TRACKING_DEFAULT_CONFIGS;
    exports.clearCookie = clearCookie;
    exports.clearExpiredLocalStorage = clearExpiredLocalStorage;
    exports.clearLocalStorage = clearLocalStorage;
    exports.deepCloneObj = deepCloneObj;
    exports.delCookie = delCookie;
    exports.eventManager = eventManager;
    exports.formatPostBody = formatPostBody;
    exports.getCookie = getCookie;
    exports.getCurrentTimeStamp = getCurrentTimeStamp;
    exports.getFormatDate = getFormatDate;
    exports.getLocalItemWithExpire = getLocalItemWithExpire;
    exports.getLocalStorage = getLocalStorage;
    exports.getPerformanceInfo = getPerformanceInfo;
    exports.getUUid = getUUid;
    exports.getWebTracking = getWebTracking;
    exports.http = http;
    exports.initPerformance = initPerformance;
    exports.initWebTracking = initWebTracking;
    exports.isAndroid = isAndroid;
    exports.isBrowser = isBrowser;
    exports.isIOS = isIOS;
    exports.isIPad = isIPad;
    exports.isInvalidVal = isInvalidVal;
    exports.isMb = isMb;
    exports.isPlainObject = isPlainObject;
    exports.isSupportPerformance = isSupportPerformance;
    exports.isSupportWebTracking = isSupportWebTracking;
    exports.isWechatBrowser = isWechatBrowser;
    exports.isWidthExpireVal = isWidthExpireVal;
    exports.qsString = qsString;
    exports.removeLocalStorage = removeLocalStorage;
    exports.setCookie = setCookie;
    exports.setLocalItemWithExpire = setLocalItemWithExpire;
    exports.setLocalStorage = setLocalStorage;

}));
//# sourceMappingURL=index.js.map
