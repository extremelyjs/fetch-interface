import { BaseOptions } from "./BaseOptions";

export type Options = Omit<BaseOptions, "protocol", "host"> ;
