import { Button, Cell, Col, ConfigProvider, Image } from 'vant/es'
import { defineNuxtPlugin } from '#app'
import '@vant/touch-emulator'
// 目前在 nuxt 中无法按需引入样式，因此采用手动引入的方式
import 'vant/lib/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ConfigProvider)
    .use(Button)
    .use(Image)
    .use(Col)
    .use(Cell)
})
