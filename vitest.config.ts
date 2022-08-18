import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    alias: {
      '@': '/src',
      '~': '/src',
      '@@': '/src',
      '~~': '/src',
      'assets': '/src/assets',
      'public': '/src/public',
    },
    // ...
  },
})
