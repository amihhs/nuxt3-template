import { isArray, isString } from '../is'

/**
 * 获url中的请求参数
 * @param url string
 * @returns Record<string, string | string[]> | TypeError
 */
export function queryString(url: string): Record<string, string | string[]> {
  if (!isString(url))
    throw new TypeError('Function queryString requires a string as an argument')
  if (!url.includes('?'))
    return {}
  const params = url.split('?').reverse()[0]
  const param = params.split('&')
  const query: Record<string, string | string[]> = {}

  for (const item of param) {
    const itemKeyValue = item.split('=')
    const key = itemKeyValue[0]
    const value = itemKeyValue[1] || ''
    if (Object.prototype.hasOwnProperty.call(query, key))
      query[key] = isArray(query[key]) ? [...query[key], value] : [query[key] as string, value]
    else
      query[key] = value
  }
  return query
}
