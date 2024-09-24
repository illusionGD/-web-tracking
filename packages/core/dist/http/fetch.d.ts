import { BaseRequestOptionsType, ResponseResultType } from '../interfaces';
export default function fetchRequest<T>(url: string, config?: Partial<BaseRequestOptionsType>): Promise<ResponseResultType<T>>;
