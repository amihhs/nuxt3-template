import { storeToRefs } from 'pinia'
import { useAuth } from '../store'

export default defineNuxtRouteMiddleware((_to, _from) => {
  const { IS_LOGIN } = storeToRefs(useAuth())
  if (!IS_LOGIN.value) {
    vantDialog({
      message: '还未登录，请先登录',
    })
    return abortNavigation()
  }
})
