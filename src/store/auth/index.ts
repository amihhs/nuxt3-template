import { defineStore } from 'pinia'
import { useApiFetch } from '~~/src/server/request'
import type { FetchResponseType } from '~~/src/server/request/type'
import { sleep } from '~~/src/utils'

export const useAuth = defineStore('WEB_AUTH', () => {
  const USER_TOKEN = ref('')
  const USER_INFO = ref({})
  const IS_LOGIN = computed(() => !!USER_TOKEN.value)

  function setUserInfo(data?: any) {
    USER_INFO.value = data || {}
  }
  /**
   * 获取用户信息
   */
  function getUserInfo() {

  }
  /**
   * 账号登录
   */
  async function accountLogin() {
    const loadingToast = vantToast.loading({
      duration: 0,
      message: '正在登录...',
      forbidClick: true,
    })
    try {
      await sleep(300)
      // setUserInfo(data)
      vantToast.success({
        duration: 1500,
        message: '登录成功',
      })
    }
    catch (error) {
      vantToast.fail({
        duration: 1500,
        message: '登录失败',
      })
    }
    finally {
      loadingToast.clear()
    }
  }

  /**
   * 退出登录
   */
  function logout() {
    USER_TOKEN.value = ''
  }

  return {
    USER_TOKEN,
    USER_INFO,
    IS_LOGIN,

    getUserInfo, /* 获取用户信息 */
    accountLogin, /* 账号登录 */
    logout, /* 退出登录 */
  }
}, {
  persist: true,
})
