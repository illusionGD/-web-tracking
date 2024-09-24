import { AnyObject, BaseRequestOptionsType } from '../interfaces';
import jsonp from './jsonp';
export * from './ajax';
export * from './fetch';
export * from './jsonp';
export declare class Http {
    /** 是否支持fetch */
    supportFetch: boolean;
    constructor();
    get<T>(url: string, params?: AnyObject): Promise<T>;
    post<T>(url: string, body: AnyObject, opts?: BaseRequestOptionsType): Promise<T>;
    jsonp: typeof jsonp;
}
export declare const http: Http;
