import { AnyObject, BaseRequestOptionsType } from '../interfaces';
import jsonp from './jsonp';
export * from './ajax';
export * from './fetch';
export * from './jsonp';
export declare class Http {
    /** 是否支持fetch */
    supportFetch: boolean;
    /** 请求拦截器 */
    requestInterceptor: Set<Function>;
    /** 响应拦截器 */
    responseInterceptor: Set<Function>;
    constructor();
    interceptor(type: 'req' | 'res'): {
        /** 添加拦截器 */
        add: (fn: Function | Function[]) => void;
        /** 删除拦截器 */
        del: (fn: Function) => void;
    };
    get<T>(url: string, params?: AnyObject): Promise<T>;
    post<T>(url: string, body: AnyObject, opts?: Partial<BaseRequestOptionsType>): Promise<T>;
    jsonp: typeof jsonp;
}
