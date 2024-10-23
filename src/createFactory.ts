import { BaseOptions } from './types/BaseOptions';
import { Method } from './types';
import { Options } from './types/Options';

function decodeParams(params: any) {
    if (!params) {
        return '';
    }
    if (typeof params === 'object' && !Array.isArray(params)) { // 确保params不是数组
        return JSON.stringify(params);
    }
    return String(params); // 确保返回的是字符串类型
}

export function createFactory(config: BaseOptions) {
    function createInterface<ReturnType, Params = any>(method: Method, url: string, currentConfig?: Options) { // 允许Params为任意类型
        return async function _createInterface(params: Params): Promise<ReturnType> {
            // 准备 fetch 的选项
            const fetchOptions: RequestInit = {
                method: method,
                headers: (currentConfig?.headers ?? config?.headers),
                ...config,
                ...currentConfig,
            };

            let fetchUrl = `${config.protocol}://${config.host}/${url}`;

            // 如果方法不是 GET 或 HEAD，则添加 body
            if (method !== 'GET' && method !== 'HEAD') {
                fetchOptions.body = decodeParams(params);
                fetchOptions.headers = {
                    ...fetchOptions?.headers,
                    ...currentConfig?.headers,
                };
            } else if (params) {
                // 如果是 GET 或 HEAD 请求，并且有参数，通常将参数拼接到 URL 上
                fetchUrl += '?' + new URLSearchParams(params as Record<string, string>).toString();
            }

            // 封装fetch请求，以便重试
            const fetchData = async () => {
                try {
                    const res = await fetch(fetchUrl, fetchOptions);
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    const data: any = await res.json(); // 等待并解析JSON数据
                    return data[config.responseKey ?? 'data'] as ReturnType; // 返回指定键的数据或默认'data'键的数据
                } catch (error) {
                    throw error; // 重新抛出错误以便外部捕获
                }
            };

            try {
                const result = await fetchData(); // 尝试执行fetch请求
                return result; // 返回结果
            } catch (error) {
                const retry = currentConfig?.retry ?? config.retry; // 获取重试次数
                if (retry && retry > 0) { // 检查是否配置了重试次数，并且次数大于0
                    for (let i = 0; i < retry; i++) { // 重试指定的次数
                        try {
                            setTimeout(async () => {
                                const onTimeout = currentConfig?.onTimeout ?? config.onTimeout;
                                if (onTimeout) {
                                    await onTimeout(); // 执行超时回调
                                }
                                const result = await fetchData(); // 尝试重新执行fetch请求
                                return result; // 如果成功，返回结果并中断循环
                            }, currentConfig?.retryInterval ?? config.retryInterval)
                        } catch (retryError) {
                            if (i === retry - 1) { // 如果是最后一次重试仍然失败，则抛出错误
                                throw retryError; // 抛出最后一次重试的错误以便外部捕获处理
                            }
                            // 否则，继续下一次重试（不抛出错误）
                        }
                    }
                } else {
                    throw error; // 如果没有配置重试，或者重试次数为0，直接抛出错误以便外部捕获处理
                }
            }
            return fetchData();
        };
    }
    return {
        createInterface, // 返回创建接口的函数，以便外部使用它来创建具体的接口实例（带有特定方法和URL的）
    };
}