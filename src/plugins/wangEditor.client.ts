import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { defineNuxtPlugin } from '#app'
import '@wangeditor/editor/dist/css/style.css'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Editor', Editor)
  nuxtApp.vueApp.component('Toolbar', Toolbar)
})
