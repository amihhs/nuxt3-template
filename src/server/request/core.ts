/**
 * 对于fetch请求的封装
 */
/**
 * nuxt封装方法
 * useFetch()
 * useLazyFetch()
 * useAsyncData()
 * useLazyAsyncData()
 * $fetch
 */

// TODO:cache
// TODO:取消重复请求
// TODO:请求拦截对数据处理
import qs from 'qs'
import type { $Fetch, FetchContext, FetchOptions, FetchResponse } from 'ohmyfetch'
import { $fetch as _ } from 'ohmyfetch'
import type { NitroFetchRequest, TypedInternalResponse } from 'nitropack'
import type { ResponseType, ServerRequestOptions } from './type'
import { useAbort } from './abort'
import { isString } from '~~/src/utils'
// 该类如果请求 /server/api的数据会出现 Invalid URL
// 原因是使用的是包ohmyfetch的$fetch,不是nuxt的导致的
export class ClientRequest<FetchResponseType = any> {
  instance: $Fetch
  options: FetchOptions

  constructor(options: FetchOptions) {
    this.options = options
    this.instance = _.create(this.options)
  }

  request<R = FetchResponseType, T extends ResponseType = 'json'>(url: string, options: FetchOptions<T>) {
    return this.instance<R, T>(url, options)
  }

  get<P = any, R = FetchResponseType, T extends ResponseType = 'json'>(url: string, params?: P, options?: FetchOptions<T>) {
    return this.instance<R, T>(url, { method: 'GET', params, ...options })
  }

  post<P = any, R = FetchResponseType, T extends ResponseType = 'json'>(url: string, data?: P, options?: FetchOptions<T>) {
    return this.instance<R, T>(url, { method: 'POST', body: data, ...options })
  }
}

// 使用nuxt的$fetch
export function ServerRequest(options: FetchOptions) {
  function get<T = Record<string, string | number>, R = unknown>(url: string, query?: T, opt?: FetchOptions) {
    // Object.assign会修改target(也就是第一个参数)，所以使用一个空对象
    // 如果不使用一个空对象会导致 option 的原值被覆盖
    const _opt: FetchOptions = opt ? Object.assign({}, options, opt) : options
    return $fetch<R>(url, {
      ..._opt,
      method: 'GET',
      params: query,
    })
  }
  function post<T = Record<string, string | number>, R = unknown>(url: string, data?: T, opt?: FetchOptions) {
    const _opt: FetchOptions = opt ? Object.assign({}, options, opt) : options
    return $fetch<R>(url, {
      ..._opt,
      method: 'POST',
      body: data,
    })
  }

  function instance<R = unknown>(opt: ServerRequestOptions): Promise<TypedInternalResponse<NitroFetchRequest, R>>
  function instance<R = unknown>(url: string, opt?: ServerRequestOptions): Promise<TypedInternalResponse<NitroFetchRequest, R>>
  function instance<R = unknown>(arg1: string | ServerRequestOptions, arg2?: ServerRequestOptions) {
    const _url = isString(arg1) ? arg1 : arg1?.url
    const _opt = isString(arg1) ? arg2 : arg1
    const _config: FetchOptions = _opt ? Object.assign({}, options, _opt) : options

    if (!_url)
      throw new Error('Request url cannot be empty')

    return $fetch<R>(_url, {
      ..._config,
    })
  }
  /**
   * 如果需要获取原响应
   */
  function raw<R = unknown>(url: string, opt?: FetchOptions) {
    const _opt: FetchOptions = opt ? Object.assign({}, options, opt) : options

    return $fetch.raw<R>(url, {
      ..._opt,
    })
  }

  async function asyncData<R = unknown>(url: string, opt?: FetchOptions) {
    const _opt: FetchOptions = opt ? Object.assign({}, options, opt) : options
    return useFetch<R>(url, _opt)
  }

  instance.get = get
  instance.post = post
  instance.raw = raw
  instance.asyncData = asyncData

  return instance
}

// 对重复请求处理进行封装
export function ApiRequest(options: FetchOptions) {
  const { addPendingRequest, removePendingRequest } = useAbort()

  /**
   * 中止请求在拦截器中实现
   */
  const onRequest = async (_ctx: FetchContext) => {
    // 处理重复请求
    if (_ctx.options?.setting?.repetition === 'abort') {
      removePendingRequest(_ctx)
      addPendingRequest(_ctx)
    }
    options.onRequest?.(_ctx)
  }
  const onRequestError = async (_ctx: FetchContext & { error: Error }) => {
    // 处理重复请求
    // 如果是中止请求，则不自动重试
    if (_ctx.error && _ctx.error?.name === 'AbortError')
      _ctx.options.retry = 0

    options.onRequestError?.(_ctx)
  }
  const onResponse = async <R = any>(_ctx: FetchContext & { response: FetchResponse<R> }) => {
    // 移除记录的请求
    if (_ctx.options?.setting?.repetition === 'abort')
      removePendingRequest(_ctx)

    options.onResponse?.(_ctx)
  }

  // 创建请求实例
  const request = ServerRequest({
    ...options,
    onRequest,
    onRequestError,
    onResponse,
  })

  const API_PROMISE_MAP = new Map()
  // 生成request的唯一key
  function generateRequestKey(url: string, options: FetchOptions, data?: Record<string, unknown>) {
    // 通过url，method，params，data生成唯一key，用于判断是否重复请求
    // params为get请求参数，data为post请求参数
    const { method, body, params, setting } = options
    if (setting?.splicingParameters !== false)
      return [url, method, qs.stringify(data), qs.stringify(params), qs.stringify(body)].join('&')
    else
      return [url, method, qs.stringify(data)].join('&')
  }

  /**
   * 代理请求，以在请求执行前进行一些操作
   */
  function requestPromiseHandle(self: any, args: any, target: any, requestKey: string) {
    // 是否有缓存对于的请求
    // 如果有则直接返回对应的promise
    if (API_PROMISE_MAP.has(requestKey))
      return API_PROMISE_MAP.get(requestKey)

    // 执行
    const requestPromise = target.apply(self, args).finally(() => {
      API_PROMISE_MAP.delete(requestKey)
    })

    // 保存对应请求promise
    API_PROMISE_MAP.set(requestKey, requestPromise)
    // 返回请求promise
    return requestPromise
  }
  function serverRequestProxyHandle(target: Function, that: unknown, args: [opt: ServerRequestOptions]): any
  function serverRequestProxyHandle(target: Function, that: unknown, args: [url: string, opt?: ServerRequestOptions]): any
  function serverRequestProxyHandle(this: any, target: Function, that: unknown, args: [arg1: string | ServerRequestOptions, arg2?: ServerRequestOptions, arg3?: ServerRequestOptions]): any {
    const _url = (isString(args[0]) ? args[0] : args[1]?.url) || ''
    const _opt = (isString(args[0]) ? args[1] : args[0]) || {}

    const requestKey = generateRequestKey(_url, _opt)

    // console.log('serverRequestProxyHandle:', _opt?.setting?.repetition, requestKey)
    if (_opt?.setting?.repetition !== 'pre')
      return target.apply(this, args)

    return requestPromiseHandle(this, args, target, requestKey)
  }

  function serverRequestMethodProxyHandle(this: any, target: Function, that: unknown, args: [url: string, data: Record<string, unknown>, opt?: ServerRequestOptions]): any {
    const _url = args[0]
    const _data = args[1]
    const _opt = args[2] || {}

    const requestKey = generateRequestKey(_url, _opt, _data)
    if (_opt?.setting?.repetition !== 'pre')
      return target.apply(this, args)

    return requestPromiseHandle(this, args, target, requestKey)
  }

  const instance = new Proxy(request, {
    apply: serverRequestProxyHandle,
  }) as typeof request

  instance.get = new Proxy(request.get, {
    apply: serverRequestMethodProxyHandle,
  }) as typeof request.get

  instance.post = new Proxy(request.post, {
    apply: serverRequestMethodProxyHandle,
  }) as typeof request.post

  instance.raw = new Proxy(request.raw, {
    apply: serverRequestProxyHandle,
  }) as typeof request.raw

  instance.asyncData = new Proxy(request.asyncData, {
    apply: serverRequestProxyHandle,
  }) as typeof request.asyncData

  return instance
}

