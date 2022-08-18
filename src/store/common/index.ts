import { defineStore } from 'pinia'
export const useCommonStore = defineStore('WEB_COMMON', () => {
  return {
    /**
     * 全局消息提示模块，naive-ui
     * 包括: message, notification, dialog, loadingBar
     * 简单使用:
     *  message.info('Message')
     *  notification.create({ title: 'Notification' })
     *  dialog.info({ title: 'Dialog' })
     *  { loadingBar.start() setTimeout(() => { loadingBar.finish() }, 1000) }
     */
  }
})
