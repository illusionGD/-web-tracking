interface JsonpConfigType {
    timeout?: number;
    params?: any;
}
export default function jsonp<T>(url: any, opts: JsonpConfigType): Promise<T>;
export {};
