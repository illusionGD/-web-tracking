import { ResponseType } from '../interfaces';
/**基本请求配置 */
export declare const BASE_REQUEST_OPTIONS: {
    method: string;
    headers: {
        'Content-Type': string;
    };
    cache: string;
    credentials: string;
    responseType: ResponseType;
    timeout: number;
};
/**timestamp数 */
export declare const TIMESTAMP_NUMBER: {
    /**秒 */
    second: number;
    /**分 */
    min: number;
    /**小时 */
    hour: number;
    /**天 */
    day: number;
    /**周 */
    week: number;
    /**月(30天) */
    month: number;
};
