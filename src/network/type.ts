import type { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios'
export interface RequestInterceptors {
    // 请求拦截
    requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestInterceptorsCatch?: (err: any) => any
    // 响应拦截
    responseInterceptors?: <T = AxiosResponse>(config: T) => T
    responseInterceptorsCatch?: (err: any) => any
}
// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
    interceptors?: RequestInterceptors
}

export type Data<T = any> = {
    data: T,
    msg: string,
    code: number
}

export interface BaseConfig {
    baseURL: string,
    timeout: number
}