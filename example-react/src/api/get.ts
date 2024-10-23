import {createInterface} from "./index"

export const apiGet = createInterface<string, void>('GET','api/get', {responseKey: 'msg'});

export const apiGetError = createInterface<string, void>('GET','api/error');