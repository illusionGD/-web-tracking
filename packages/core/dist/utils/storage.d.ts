/**
 * 根据key获取localStorage
 * @param key
 * @returns
 */
export declare function getLocalStorage<T>(key: string): T;
/**
 * 设置localStorage
 * @param key
 * @param json
 */
export declare function setLocalStorage(key: string, json: Record<string, any> | string | number): void;
/**
 * 根据key清除对应的localStorage
 * @param key
 */
export declare function removeLocalStorage(key: string): void;
/**
 * 清除全部localStorage
 */
export declare function clearLocalStorage(): void;
/**
 * 设置localStorage（自带命名空间+自动过期时间）
 * @param key
 * @param value
 * @param expireTime 过期时间，单位ms
 */
export declare function setLocalItemWithExpire(key: string, value: string, expireTime: number): void;
/**
 * 获取localStorage（自带命名空间+自动过期时间）
 * @param key
 */
export declare function getLocalItemWithExpire<T>(key: string): T | string;
/**
 * 清除已到过期时间的localStorage
 */
export declare function clearExpiredLocalStorage(): void;
/**是否有超时设置的val */
export declare function isWidthExpireVal(key: string): boolean;
