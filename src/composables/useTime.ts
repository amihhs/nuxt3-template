import type { ManipulateType } from 'dayjs'
import type dayjs from 'dayjs'
/**
 * Y 年
 * M 月
 * D 日
 * H 是
 * m 分
 * s 秒
 */
/**
 * 时间格式化相关
 */
export function useTime() {
  const nuxtApp = useNuxtApp()
  const $dayjs = nuxtApp.$dayjs as typeof dayjs

  // 几天前
  function timeFrom(dateTime: number | string | null = null, format: string | false = 'YYYY-MM-DD') {
    if (!dateTime)
      return $dayjs().format(format || 'YYYY-MM-DD')
    if (!$dayjs(dateTime).isValid())
      return dateTime.toString()
    if ($dayjs().valueOf() - 259200000 < $dayjs(dateTime).valueOf() || format === false)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return $dayjs(dateTime).fromNow()

    else
      return timeFormat(dateTime, format as string)
  }

  function timeFormat(dateTime: number | string | null = null, fmt = 'YYYY-MM-DD') {
    if (!dateTime)
      return $dayjs().format(fmt)
    if (!$dayjs(dateTime).isValid())
      return dateTime.toString()
    return $dayjs(dateTime).format(fmt) // '25/01/2019'
  }

  /**
 * 获取时间戳
 * @param dateTime 时间字符串
 * @param num 与当前传入时间的差值
 * @param type 在当前传入时间的基础上加（add)还是减（subtract）
 * @param unit 计算单位，时分秒，年月日...
 * @param fmt 格式化
 * @returns
 */
  function timeStamp(dateTime: number | string, num = 0, type: 'add' | 'subtract' = 'add', unit: ManipulateType = 'day', fmt?: string) {
    let time = dateTime ? $dayjs(dateTime).valueOf() : $dayjs().valueOf()

    if (num && type === 'add')
      time = $dayjs(time).add(num, unit).valueOf()
    if (num && type === 'subtract')
      time = $dayjs(time).subtract(num, unit).valueOf()

    if (fmt)
      return timeFormat(time, fmt)
    else
      return time
  }

  function getCurrentTime(fmt = 'YYYY-MM-DD') {
    return $dayjs().format(fmt)
  }

  return {
    timeFrom,
    timeStamp,
    timeFormat,
    getCurrentTime,
  }
}
