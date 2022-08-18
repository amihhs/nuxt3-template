import type { EventType } from 'mitt'
import mitt from 'mitt'
import { defineNuxtPlugin } from '#app'

interface Events extends Record<EventType, unknown> {
  foo: string
  bar?: number
}
const emitter = mitt<Events>()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('bus', {
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit,
  })
})
