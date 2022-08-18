// import api from '../request/api/http.api'

/**
 * 异常码
 * 1：self
 * 2：window error
 * 3: promise error
 * 4: self request error
 */
export enum ERROR_CODE {
  PUBLISH_SUCCESS = 10,
  WINDOW_ERROR = 20,
  PROMISE_ERROR = 30,
  REQUEST_ERROR = 40,
}
export declare namespace ErrorHandle {
  /**
   * 门户异常上报消息实体
   */
  export interface Params {
    /**
     * 状态码
     */
    code: ERROR_CODE
    /**
     * 响应信息
     */
    data: string
    /**
     * 异常信息
     */
    errorMsg: string
    /**
     * 备注信息
     */
    remark: string
    /**
     * http请求地址 / url地址
     */
    url: string
  }
}
