/**
 * 根据传入的key删除对应的cookie
 * @param key
 */
export declare function delCookie(key: string): void;
/**
 * 清除全部cookie
 */
export declare function clearCookie(): void;
/**
 * 根据传入的key获取cookie
 * @param key
 * @returns
 */
export declare function getCookie(key: string): string;
/**
 * 添加cookie
 * @param objName
 * @param objValue
 * @param objHours 过期时间，单位h
 */
export declare function setCookie(key: string, val: string, timestamp?: number, domain?: string): void;
