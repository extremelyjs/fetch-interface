import {createFactory} from "@extremelyjs/fetch-interface/src"
import {BaseOptions} from "@extremelyjs/fetch-interface/src/types/BaseOptions"

// 测试环境配置
const options: BaseOptions = {
    protocol: 'HTTP',
    host: 'localhost:7777',
    headers: {
        'Content-Type': 'application/json',
    },
    retry: 3, // 重试次数
    retryInterval: 1000, // 重试间隔
    onTimeout: () => {
        console.log('重试')
    }, // 超时之后额外要做的事情
    responseKey: 'data', // 返回的数据里要拿做当value的key
}

export const {createInterface} = createFactory(options)