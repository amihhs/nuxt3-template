import type { FetchOptions } from 'ohmyfetch'
declare module 'ohmyfetch' {
  interface FetchOptions extends FetchOptions {
    setting?: {
      // 是否展示dialog true:任何情况都展示，fail:error时展示
      dialog?: boolean | 'fail'
      // 是否展示message true:任何情况都展示，fail:error时展示
      message?: boolean | 'fail'
      /**
       * 重复时如何处理
       * abort: 取消之前请求
       * pre: 返回之前请求
       * default: 重复请求
       */
      repetition?: 'abort' | 'pre' | 'default'
      // cancelMessage 取消重复请求的提示语
      cancelMessage?: string
      // splicingParameters 请求key是否拼接params 
      splicingParameters?: boolean
    }
  }
}