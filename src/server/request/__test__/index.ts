import { useApiFetch } from '..'

export function useApiFetchTest() {
  // const data = clientFetch.get('/api/mock')
  // 普通get, 展示Dialog
  useApiFetch('/api/mock', {
    setting: {
      dialog: true,
    },
  })
  // 重复请求会被中断
  useApiFetch('/api/mock', { params: { code: 200 }, setting: { repetition: 'abort' } })
  useApiFetch('/api/mock', { params: { code: 200 }, setting: { repetition: 'abort' } })

  // 重复请求等待上一个请求
  useApiFetch('/api/mock', { params: { code: 201 }, setting: { repetition: 'pre' } })
  useApiFetch('/api/mock', { params: { code: 201 }, setting: { repetition: 'pre' } })

  // 201
  useApiFetch('/api/mock', {
    params: {
      code: 201,
    },
    setting: {
      message: true,
    },
  })

  // raw
  useApiFetch.raw('/api/mock?type=row')
}
