/* eslint-disable no-console */

// import { WriteLogs, formatError, formatPromiseRejection } from '../utils/logs'
import { cloneDeep, isClient } from '~~/src/utils'
import type { ErrorHandle } from '~~/src/types/error'
import { ERROR_CODE } from '~~/src/types/error'

export const DEFAULT_ERROR_PARAMS: ErrorHandle.Params = {
  code: ERROR_CODE.PROMISE_ERROR,
  data: '',
  errorMsg: '',
  remark: '',
  url: '',
}

/**
 * promise error
 */
export function rejectHandle(event: PromiseRejectionEvent) {
  const params = cloneDeep(DEFAULT_ERROR_PARAMS)

  // console.log('event', event, JSON.stringify(event))
  // console.log('event.reason', event.reason)
  // if (!isClient)
  //   WriteLogs(JSON.stringify(formatPromiseRejection(event)))

  // error code
  params.code = ERROR_CODE.PROMISE_ERROR
  // error url
  params.url = isClient ? window.location.href : useNuxtApp().ssrContext?.url || 'undefined url'
  // reason
  params.data = JSON.stringify(event.reason)?.replace?.(/\(.*\)/, '')
  params.errorMsg = event.reason?.stack || JSON.stringify(event.reason)
  params.remark = event.reason?.message || JSON.stringify(event.reason)

  console.log('rejectHandle params', params)
}

/**
 * window error
 */
export function windowHandle(event: ErrorEvent) {
  const params = cloneDeep(DEFAULT_ERROR_PARAMS)
  const { colno, error, filename, lineno, message } = event
  params.code = ERROR_CODE.WINDOW_ERROR
  params.url = filename || window.location.href
  params.data = JSON.stringify({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    col: colno || (window.event && window.event?.errorCharacter),
    filename,
    lineno,
    message,
  })
  if (error && error.stack) {
    // 如果浏览器有堆栈信息，直接使用
    params.errorMsg = error.stack.toString()
    params.remark = error.message.toString()
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  else if (event.target?.tagName === 'SCRIPT') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    params.url = event.target?.src
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    params.errorMsg = event.target?.outerHTML
    params.remark = 'js file load fail'
  }
}

/**
 * server uncaughtException
 */

export function uncaughtHandle(_error: Error) {
  // TODO:如果只在服务端，可以考虑写入log文件里
  // console.log(`------uncaughtHandle start ${getCurrentTime('YYYY-MM-DD HH:mm:ss')}------`)
  // console.log(error)
  // console.log('------uncaughtHandle end------')
  // if (!isClient)
  //   WriteLogs(JSON.stringify(formatError(error)))
}

const windowHandleFn = useDebounceFn((e) => {
  windowHandle(e)
})
const unhandledrejectionFn = useDebounceFn((e) => {
  rejectHandle(e)
})

export function useError(_?: any) {
  if (isClient) {
    window.removeEventListener('error', windowHandleFn, true)
    window.removeEventListener('unhandledrejection', unhandledrejectionFn, true)
    // 监听 window error
    window.addEventListener('error', windowHandleFn, true)
    // 监听未处理的promise错误
    window.addEventListener('unhandledrejection', unhandledrejectionFn, true)
  }
  else if (process) {
    process.off('unhandledRejection', unhandledrejectionFn)
    process.off('uncaughtException', uncaughtHandle)

    process.on('unhandledRejection', unhandledrejectionFn)
    process.on('uncaughtException', uncaughtHandle)
  }
}

// 全局错误处理
export default defineNuxtPlugin((nuxtApp) => {
  // Vue 渲染生命周期中的错误（SSR + SPA）
  // nuxtApp.vueApp.config.errorHandler = (error, context) => {
  //   console.log('vueApp errorHandler', error)
  //   console.log('vueApp errorHandler context', context)
  // }
  // Vue 渲染生命周期中的告警（SSR + SPA）
  // nuxtApp.vueApp.config.warnHandler = (msg, instance) => {
  //   console.log('vueApp warnHandler', msg)
  //   console.log('vueApp warnHandler context', instance)
  // }

  // error
  useError(nuxtApp)
})

