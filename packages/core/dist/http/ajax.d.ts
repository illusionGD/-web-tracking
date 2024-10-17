import { BaseRequestOptionsType, ResponseResultType } from '../interfaces';
declare function ajax<T>(url: string, options: Partial<BaseRequestOptionsType>, interceptor?: {
    req?: Function[];
    res?: Function[];
}): Promise<ResponseResultType<T>>;
export default ajax;
