
import type { MessageApiInjection, DialogApiInjection, LoadingBarInst, NotificationApiInjection } from 'naive-ui'

declare global {
  interface Window {
    $message: MessageApiInjection
    $dialog: DialogApiInjection
    $loadingBar: LoadingBarInst
    $notification: NotificationApiInjection
  }
}