import { BaseRequestOptionsType, ResponseResultType } from '../interfaces';
export default function fetchRequest<T>(url: string, config?: Partial<BaseRequestOptionsType>, interceptor?: {
    req?: Function[];
    res?: Function[];
}): Promise<ResponseResultType<T>>;
