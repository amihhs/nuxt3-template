/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expect, test } from 'vitest'
import { queryString } from '@/utils/index'

test('queryString test', () => {
  // @ts-expect-error
  expect(() => queryString()).toThrow(/queryString/)
  // @ts-expect-error
  expect(() => queryString(1)).toThrow(/queryString/)
  // @ts-expect-error
  expect(() => queryString({})).toThrow(/queryString/)

  expect(queryString('')).toEqual({})
  expect(queryString('/api/mock')).toEqual({})
  expect(queryString('/api/mock?code=200')).toEqual({ code: '200' })
  expect(queryString('/api/mock?code=200&type=list')).toEqual({ code: '200', type: 'list' })
  expect(queryString('/api/mock?code=200&code=201')).toEqual({ code: ['200', '201'] })
  expect(queryString('/api/mock?code=200&code=201&code=202')).toEqual({ code: ['200', '201', '202'] })
})
