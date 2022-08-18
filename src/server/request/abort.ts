import type { FetchContext } from 'ohmyfetch'
import qs from 'qs'
/**
 * 取消重复请求
 */
export function useAbort() {
  // 用于存储pending的请求
  const pendingRequest = new Map()

  // 生成request的唯一key
  function generateRequestKey(config: FetchContext) {
    // 通过url，method，params，data生成唯一key，用于判断是否重复请求
    // params为get请求参数，data为post请求参数
    const { method, body, params, setting } = config.options
    const url = config.request
    if (setting?.splicingParameters !== false)
      return [url, method, qs.stringify(params), qs.stringify(body)].join('&')
    else
      return [url, method].join('&')
  }

  function addPendingRequest(config: FetchContext) {
    const key = generateRequestKey(config)
    // 判断pendingRequest中是否存在key
    if (pendingRequest.has(key))
      return

    // https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController
    const controller = new AbortController()
    config.options.signal = controller.signal
    pendingRequest.set(key, controller)
  }

  // removePendingRequest 取消重复请求
  function removePendingRequest(config: FetchContext) {
    const key = generateRequestKey(config)
    if (!pendingRequest.has(key))
      return

    const controller = pendingRequest.get(key)
    controller.abort('Abort')
    pendingRequest.delete(key)// 请求对象中删除requestKey
  }

  return {
    pendingRequest,
    generateRequestKey,
    addPendingRequest,
    removePendingRequest,
  }
}

export class ApiAbort {
  pendingRequest: Map<string, AbortController>

  constructor() {
    this.pendingRequest = new Map()
  }

  // 生成request的唯一key
  generateRequestKey(config: FetchContext) {
    // 通过url，method，params，data生成唯一key，用于判断是否重复请求
    // params为get请求参数，data为post请求参数
    const { method, body, params, setting } = config.options
    const url = config.request
    if (setting?.splicingParameters !== false)
      return [url, method, qs.stringify(params), qs.stringify(body)].join('&')
    else
      return [url, method].join('&')
  }

  addPendingRequest(config: FetchContext) {
    const key = this.generateRequestKey(config)
    // 判断pendingRequest中是否存在key
    if (this.pendingRequest.has(key))
      return

    // https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController
    const controller = new AbortController()
    config.options.signal = controller.signal
    this.pendingRequest.set(key, controller)
  }

  // removePendingRequest 取消重复请求
  removePendingRequest(config: FetchContext) {
    const key = this.generateRequestKey(config)
    if (!this.pendingRequest.has(key))
      return

    const controller = this.pendingRequest.get(key)
    controller?.abort('Abort')
    this.pendingRequest.delete(key)// 请求对象中删除requestKey
  }
}
