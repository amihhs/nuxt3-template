import type { FetchOptions } from 'ohmyfetch'
/**
 * fetch响应数据类型
 */
export type ResponseType = 'blob' | 'text' | 'arrayBuffer' | 'json'

export interface ServerRequestOptions extends FetchOptions {
  url?: string
}
/**
 * 接口响应数据体
 */
export interface FetchResponseType<T = unknown> {
  code: number
  data: T
  msg: string
}
