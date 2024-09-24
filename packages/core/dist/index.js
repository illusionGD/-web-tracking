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
    function __generator(thisArg, body) {
      var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
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
    var BASE_REQUEST_OPTIONS = {
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
    var TIMESTAMP_NUMBER = {
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
    var DEFAULT_COOKIE_EXPIRE_TIME = 1000 * 60 * 60 * 8;
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
        var keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (var i = 0; i < keys.length; i++) {
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
        var arrStr = document.cookie.split('; ');
        for (var i = arrStr.length - 1; i >= 0; i--) {
            var temp = arrStr[i].split('=');
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
        var expireTime = isInvalidVal(timestamp)
            ? DEFAULT_COOKIE_EXPIRE_TIME
            : timestamp;
        var str = key + '=' + encodeURIComponent(val);
        if (expireTime && expireTime > 0) {
            // 为时不设定过期时间，浏览器关闭时cookie自动消失，默认为30天
            var date = new Date();
            var ms = expireTime;
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
        var date = timestamp ? new Date(timestamp) : new Date();
        var years = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var formatNum = function (num) {
            return String(num).padStart(2, '0');
        };
        var dateStr = "".concat(years, "-").concat(formatNum(month), "-").concat(formatNum(day));
        if (format === 'YYYY-MM-DD hh:mm:ss') {
            var hour = date.getHours();
            var min = date.getMinutes();
            var second = date.getSeconds();
            dateStr += " ".concat(formatNum(hour), ":").concat(formatNum(min), ":").concat(formatNum(second));
        }
        return dateStr;
    }

    /**
     * 根据key获取localStorage
     * @param key
     * @returns
     */
    function getLocalStorage(key) {
        var val = localStorage.getItem(key) || '';
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
        var currentTime = new Date().getTime();
        var expire = currentTime + expireTime;
        var data = {
            value: value,
            expire: expire,
            date: getFormatDate(expire),
        };
        setLocalStorage(key, data);
    }
    /**
     * 获取localStorage（自带命名空间+自动过期时间）
     * @param key
     */
    function getLocalItemWithExpire(key) {
        var data = getLocalStorage(key);
        if (!data) {
            return '';
        }
        if (isWidthExpireVal(key)) {
            var currentTime = getCurrentTimeStamp();
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
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i) || '';
            console.log('🚀 ~ key:', key);
            if (isWidthExpireVal(key)) {
                var currentTime = getCurrentTimeStamp();
                var expire = getLocalStorage(key).expire;
                if (expire && currentTime > expire) {
                    removeLocalStorage(key);
                }
            }
        }
    }
    /**是否有超时设置的val */
    function isWidthExpireVal(key) {
        var data = getLocalStorage(key);
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
    function qsString(obj, isEncode) {
        if (isEncode === void 0) { isEncode = true; }
        if (obj instanceof Object) {
            var str_1 = '';
            Object.keys(obj).forEach(function (key, index) {
                str_1 += "".concat(index ? '&' : '').concat(key, "=").concat(isEncode ? encodeURIComponent(obj[key]) : obj[key]);
            });
            return str_1;
        }
        else if (typeof obj === 'string') {
            return obj;
        }
        else if (typeof obj === 'number') {
            return "".concat(obj);
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
        var proto, Ctor;
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
    var defaultOptions = BASE_REQUEST_OPTIONS;
    function ajax(url, options) {
        var _a = Object.assign({}, defaultOptions, options), method = _a.method, params = _a.params, body = _a.body, headers = _a.headers;
        var xhr = new XMLHttpRequest();
        var paramStr = qsString(params);
        //启动并发送一个请求
        if ((method === null || method === void 0 ? void 0 : method.toLocaleLowerCase()) === 'get') {
            xhr.open('GET', "".concat(url).concat(url.includes('?') ? '' : '?').concat(paramStr), true);
            xhr.send(null);
        }
        else {
            xhr.open('post', url, true);
            for (var key in headers) {
                if (Object.prototype.hasOwnProperty.call(headers, key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
            xhr.send(formatPostBody(body, headers['Content-Type']));
        }
        return new Promise(function (resolve, reject) {
            var result = {
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
                var status = xhr.status;
                var statusText = xhr.statusText;
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

    var inital = BASE_REQUEST_OPTIONS;
    function fetchRequest(url, config) {
        return __awaiter(this, void 0, void 0, function () {
            var options, method, params, body, headers, cache, credentials, responseType, paramsStr, bodyInit, req, status_1, statusText, result, data, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof url !== 'string')
                            throw new TypeError('url must be required and of string type');
                        options = deepCloneObj(inital);
                        Object.assign(options, config || {});
                        method = options.method, params = options.params, body = options.body, headers = options.headers, cache = options.cache, credentials = options.credentials, responseType = options.responseType;
                        if (params != null) {
                            paramsStr = qsString(params);
                            url += "".concat(url.includes('?') ? '' : '?').concat(paramsStr);
                        }
                        bodyInit = {
                            method: method === null || method === void 0 ? void 0 : method.toUpperCase(),
                            headers: headers,
                            credentials: credentials,
                            cache: cache,
                        };
                        if (/^(POST|PUT|PATCH)$/i.test(method) && body != null) {
                            if (isPlainObject(body)) {
                                bodyInit['body'] = formatPostBody(body, headers['Content-Type']);
                            }
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 12, , 13]);
                        return [4 /*yield*/, fetch(url, bodyInit)];
                    case 2:
                        req = _b.sent();
                        status_1 = req.status, statusText = req.statusText;
                        result = {
                            status: status_1,
                            statusText: statusText,
                            headers: {},
                        };
                        data = null;
                        if (!(status_1 >= 200 && status_1 < 400)) return [3 /*break*/, 11];
                        _a = responseType.toUpperCase();
                        switch (_a) {
                            case exports.ResponseType.JSON: return [3 /*break*/, 3];
                            case exports.ResponseType.TEXT: return [3 /*break*/, 5];
                            case exports.ResponseType.BLOB: return [3 /*break*/, 7];
                            case exports.ResponseType.ARRAYBUFFER: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 3: return [4 /*yield*/, req.json()];
                    case 4:
                        data = _b.sent();
                        return [3 /*break*/, 11];
                    case 5: return [4 /*yield*/, req.text()];
                    case 6:
                        data = _b.sent();
                        return [3 /*break*/, 11];
                    case 7: return [4 /*yield*/, req.blob()];
                    case 8:
                        data = _b.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, req.arrayBuffer()];
                    case 10:
                        data = _b.sent();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/, Object.assign({
                            data: data,
                        }, result)];
                    case 12:
                        error_1 = _b.sent();
                        console.log('fetch请求错误:', error_1);
                        return [2 /*return*/, error_1];
                    case 13: return [2 /*return*/];
                }
            });
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
    var defaultConfig = {
        timeout: 60000,
        params: {},
    };
    var count = 0;
    function jsonp(url, opts) {
        if (!window) {
            return Promise.reject('it is not browser env!');
        }
        // 实现Promise化
        return new Promise(function (resolve, reject) {
            //设置默认参数
            var _a = Object.assign({}, defaultConfig, opts), timeout = _a.timeout, params = _a.params;
            var name = 'jsonpcallback' + new Date().getTime() + count;
            var timer = null;
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
                timer = setTimeout(function () {
                    cleanup();
                    reject('timeout');
                }, timeout);
            }
            // 注册全局函数，等待执行中...
            window[name] = function (res) {
                // 只要这个函数一执行，就表示请求成功，可以使用清除函数了
                if (window[name]) {
                    cleanup();
                }
                // 将请求到的数据扔给then
                resolve(res);
            };
            // 以下将params对象格式的参数拼接到url的后面
            var str = '';
            if (isPlainObject(params)) {
                for (var key in params) {
                    var value = params[key] || '';
                    str += "&".concat(key, "=").concat(encodeURIComponent(value));
                }
            }
            url = url + (url.indexOf('?') > 0 ? '' : '?') + str.substr(1);
            // 最后加上与服务端协商的jsonp请求字段
            url = "".concat(url, "&callback=").concat(name);
            var script = document.createElement('script');
            script.src = url;
            // 以下这条执行且成功后，全局等待函数就会被执行
            document.head.appendChild(script);
        });
    }

    var Http = /** @class */ (function () {
        function Http() {
            /** 是否支持fetch */
            this.supportFetch = true;
            this.jsonp = jsonp;
            this.supportFetch = !!window.fetch;
        }
        Http.prototype.get = function (url, params) {
            return __awaiter(this, void 0, void 0, function () {
                var method, data, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            method = 'GET';
                            if (!this.supportFetch) return [3 /*break*/, 2];
                            return [4 /*yield*/, fetchRequest(url, {
                                    method: method,
                                    params: params,
                                })];
                        case 1:
                            data = (_a.sent()).data;
                            return [2 /*return*/, data];
                        case 2: return [4 /*yield*/, ajax(url, {
                                method: method,
                                params: params,
                            })];
                        case 3:
                            data = (_a.sent()).data;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        Http.prototype.post = function (url, body, opts) {
            return __awaiter(this, void 0, void 0, function () {
                var method, headers, options, data, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            method = 'POST';
                            headers = {
                                'Content-Type': 'application/json;charset=utf-8',
                            };
                            options = {
                                method: method,
                                headers: headers,
                                body: body,
                            };
                            if (opts) {
                                Object.assign(options, opts);
                            }
                            if (!this.supportFetch) return [3 /*break*/, 2];
                            return [4 /*yield*/, fetchRequest(url, options)];
                        case 1:
                            data = (_a.sent()).data;
                            return [2 /*return*/, data];
                        case 2: return [4 /*yield*/, ajax(url, options)];
                        case 3:
                            data = (_a.sent()).data;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        return Http;
    }());
    var http = new Http();

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
