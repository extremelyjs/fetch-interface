export type Protocol = "HTTP" | "HTTPS";

export interface BaseOptions extends RequestInit {
    // 请求协议
    protocol: Protocol;
    // 请求域名
    host: string;
    // 重试次数
    retry?: number;
    // 重试间隔
    retryInterval?: number;
    // 请求超时时间
    timeout?: number;
    // 请求头
    headers?: Record<string, string>;
    // 超时之后要做的事情
    onTimeout?: () => void;
    // 返回的数据里要拿做当value的key
    responseKey?: string;
}