import { ApiRequest, ClientRequest, ServerRequest } from './core'
import { ApiInterceptor } from './interceptors'
import type { FetchResponseType } from './type'

const interceptors = new ApiInterceptor()
const { onRequest, onRequestError, onResponse, onResponseError } = interceptors

export const clientFetch = new ClientRequest<FetchResponseType>({
  retry: 1, // automatically retries the request
  onRequest,
  onRequestError,
  onResponse: onResponse<FetchResponseType>,
  onResponseError: onResponseError<FetchResponseType>,
})

export const serverFetch = ServerRequest({
  retry: 2, // automatically retries the request
  headers: {
    'Accept': 'application/json',
    'Cache-Control': 'max-age=60',
  },
  onRequest,
  onRequestError,
  onResponse: onResponse<FetchResponseType>,
  onResponseError: onResponseError<FetchResponseType>,
})

export const useApiFetch = ApiRequest({
  retry: 2, // automatically retries the request
  headers: {
    'Accept': 'application/json',
    'Cache-Control': 'max-age=60',
  },
  onRequest,
  onRequestError,
  onResponse: onResponse<FetchResponseType>,
  onResponseError: onResponseError<FetchResponseType>,
})
