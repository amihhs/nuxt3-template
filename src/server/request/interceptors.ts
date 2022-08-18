import type { FetchContext, FetchResponse } from 'ohmyfetch'
import { storeToRefs } from 'pinia'
import { isClient } from '~/utils'
import { useAuth } from '~/store'

export class ApiInterceptor {
  // 成功code
  successCode: number[]
  // 失败code
  errorCode: number[]
  // 需要展示提示的code
  showModel: number[]

  constructor() {
    this.successCode = [200, 201, 202]
    this.errorCode = [400, 401, 402]
    this.showModel = []
  }

  /**
   * 请求拦截器
   * @param _ctx FetchContext
   */
  onRequest = async (_ctx: FetchContext): Promise<void> => {
    // console.log('onRequest:', _ctx)

    const { USER_TOKEN } = storeToRefs(useAuth())

    // 设置token
    if (USER_TOKEN.value)
      _ctx.options.headers = { Authorization: USER_TOKEN.value, ...(_ctx.options.headers || {}) }
  }

  /**
   * 请求错误拦截
   * ❗不知道什么情况触发onRequestError
   * 已知触发条件👇：
   * 1.请求中断时会被触发
   * @param _ctx FetchContext
 */
  onRequestError = async (_ctx: FetchContext & { error: Error }): Promise<void> => {
    // console.log('onRequestError', _ctx)
  }

  /**
   * 响应拦截器
   * @param _ctx FetchContext
   */
  onResponse = async <R = any>(_ctx: FetchContext & { response: FetchResponse<R> }): Promise<void> => {
    // console.log('onResponse', _ctx)

    // 设置token
    this.setToken(_ctx.response.headers)

    // 对响应数据进行处理
    if (_ctx.options.setting?.dialog && isClient) {
      // console.log('dialog', _ctx)

    }
    if (_ctx.options.setting?.message && isClient) {
      // 有概率出现 document is not defined

    }
  }

  /**
   * 响应错误拦截
   * statusCode 不是重定向并且大于 299时触发
   * @param _ctx FetchContext
   */
  onResponseError = async <R = any>(_ctx: FetchContext & { response: FetchResponse<R> }): Promise<void> => {
    // console.log('onResponseError', _ctx)
    // 对响应错误进行处理
  }

  setToken(headers: Headers) {
    const { USER_TOKEN } = storeToRefs(useAuth())
    // 设置token
    if (headers.has('Authorization') || headers.has('authorization'))
      USER_TOKEN.value = headers.get('Authorization') || headers.get('authorization') || ''
  }
}

const interceptors = new ApiInterceptor()
export const { onRequest, onRequestError, onResponse, onResponseError } = interceptors
