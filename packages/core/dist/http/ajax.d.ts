import { BaseRequestOptionsType, ResponseResultType } from '../interfaces';
declare function ajax<T>(url: string, options: Partial<BaseRequestOptionsType>): Promise<ResponseResultType<T>>;
export default ajax;
