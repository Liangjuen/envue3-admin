import axios from 'axios'
import config from './config'
import type { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import type { BaseConfig, RequestInterceptors, RequestConfig, Data } from './type'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const baseURL = config.baseURL
export class Request {
    // axios 实例
    instance: AxiosInstance
    // 基础配置
    BaseConfig: BaseConfig = { baseURL, timeout: 5000 }
    // 拦截器对象
    interceptorsObj?: RequestInterceptors

    constructor(config: RequestConfig) {
        this.instance = axios.create(Object.assign(this.BaseConfig, config))
        this.interceptorsObj = config.interceptors

        // 全局请求拦截
        this.instance.interceptors.request.use(
            (req: InternalAxiosRequestConfig) => {
                // 请求前的处理在这里
                // ...
                NProgress.start()
                return req
            },
            (err: any) => err
        )

        // 使用实例拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch,
        )
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch,
        )

        // 全局响应拦截
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                NProgress.done()
                Request.handleGeneralError(res.data.code, res.data.msg)
                return res.data
            },
            (err: any) => {
                console.log(err)
                Request.handleNetworkError(err.response.status)
                return Promise.reject(err.response)
            }
        )
    }

    // 这里用来处理http常见错误，进行全局提示
    static handleNetworkError(status: number) {
        let message = "未知错误"
        switch (status) {
            case 400:
                message = "请求错误(400)"
                break;
            case 401:
                message = "未授权，请重新登录(401)"
                break;
            case 403:
                message = "拒绝访问(403)"
                break;
            case 404:
                message = "请求出错(404)"
                break;
            case 408:
                message = "请求超时(408)"
                break;
            case 500:
                message = "服务器错误(500)"
                break;
            case 501:
                message = "服务未实现(501)"
                break;
            case 502:
                message = "网络错误(502)"
                break;
            case 503:
                message = "服务不可用(503)"
                break;
            case 504:
                message = "网络超时(504)"
                break;
            case 505:
                message = "HTTP版本不受支持(505)"
                break;
            default:
                message = `连接出错(${status})!`
        }
        // 错误消息提示...
    }

    // 接口错误处理
    static handleGeneralError = (code: number, errmsg: string) => {
        if (code !== 0) {
            // 接口错误提示...
        }
    }

    public get<T = Data>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.instance.get(url, config)
    }

    public post<T = Data>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.instance.post(url, data, config)
    }

    public put<T = Data>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.instance.put(url, data, config)
    }

    public delete<T = Data>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.instance.delete(url, config)
    }
}

export default new Request({})