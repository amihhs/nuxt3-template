import { expect, test } from 'vitest'
import { isString } from '@/utils/index'

test('isString test', () => {
  expect(isString(2)).toBe(false)
  expect(isString(undefined)).toBe(false)
  expect(isString(null)).toBe(false)
  expect(isString({})).toBe(false)
  expect(isString([])).toBe(false)
  expect(isString('2')).toBe(true)
  expect(isString('')).toBe(true)
})
