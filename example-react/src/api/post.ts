import { createInterface } from ".";

interface PostTestData {
    name: string;
    age: number;
}
export const apiPost = createInterface<string, PostTestData>('POST','api/post');