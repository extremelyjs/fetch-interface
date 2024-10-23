# fetch-interface

## 下载

```shell

npm i @extremelyjs/fetch-interface

```

## 使用

### 基本配置

```ts

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

```

### 使用

```ts

import {createInterface} from "./index"

export const apiGet = createInterface<string, void>('GET','api/get');

export const apiGetError = createInterface<string, void>('GET','api/error');

```

## TODO

- 单元测试
- 完善文档