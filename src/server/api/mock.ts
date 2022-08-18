import { queryString, sleep } from '~~/src/utils'

// mock
/**
 * 请求 -> 请求是否发送
 *  -> 未发送 -> requestError
 *  -> 发送 -> requestError
 * 响应
 *  -> 超时
 *  -> 中断
 *  -> 成功
 */

export default defineEventHandler(async (_ctx) => {
  if (_ctx.req.method === 'GET') {
    await sleep(10)
    const query = queryString(_ctx.req.url || '')
    return {
      code: query.code ? Number(query.code) : 200,
      data: 'data',
      msg: '成功',
    }
  }
  return {
    code: 200,
    data: 'data',
    msg: '成功',
  }
})
