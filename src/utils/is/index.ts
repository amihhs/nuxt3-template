const toString = Object.prototype.toString

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

export const isNumber = (val: any): val is number => typeof val === 'number'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

export const isFunction = <T extends Function> (val: any): val is T => typeof val === 'function'

export const isArray = Array.isArray

export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'

export const isEmptyArray = (val: unknown): boolean => isArray(val) && !!val.length

export const isEmptyObject = (val: unknown): boolean => isObject(val) && !!Object.keys(val).length

export const isValKey = <T>(val: unknown, key: string): val is T => {
  if (val && key && Object.prototype.hasOwnProperty.call(val, key))
    return true
  return false
}

export const isClient = typeof window !== 'undefined'

export const isWindow = (val: any): val is Window =>
  typeof window !== 'undefined' && toString.call(val) === '[object Window]'

export const isIOS = /* #__PURE__ */ isClient && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent)

