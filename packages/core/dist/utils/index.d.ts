export * from './cookie';
export * from './storage';
export * from './date';
import { AnyObject } from '../interfaces';
/**
 * 将对象转成参数
 * @param obj 对象
 * @param isEncode 是否encode
 * @returns a=1&b=2...
 */
export declare function qsString(obj: any, isEncode?: boolean): string;
/**
 * 校验是否为纯粹的对象
 * @param obj
 */
export declare function isPlainObject(obj: any): boolean;
/**
 * 格式化post请求的body
 * @param body
 * @param contentType
 */
export declare function formatPostBody(body?: AnyObject, contentType?: string): string;
export declare function deepCloneObj<T>(obj: AnyObject): T;
/**是否为无效值 */
export declare function isInvalidVal(val: any): boolean;
