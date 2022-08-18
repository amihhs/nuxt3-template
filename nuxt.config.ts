import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt'
import Components from 'unplugin-vue-components/vite'
import PrefixWrap from 'postcss-prefixwrap'
/**
 * VantResolver error:is not supported resolving ES modules
 */
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  srcDir: 'src/',
  alias: {
    '~': resolve(__dirname, 'src'),
    '@': resolve(__dirname, 'src'),
    'assets': resolve(__dirname, 'src/assets'),
    'public': resolve(__dirname, 'src/public'),
    'css-render': 'css-render/esm/index.js',
    '@css-render/plugin-bem': '@css-render/plugin-bem/esm/index.js',
  },
  css: [
    '@/assets/styles/reset.scss',
    '@/assets/styles/theme/index.scss',
  ],
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nathanchase/nuxt-dayjs-module',
  ],
  /**
   * 实验性功能
   */
  experimental: {
    reactivityTransform: false,
    viteNode: false,
  },
  /**
   * unocss设置
   * preflight预设样式
   */
  unocss: {
    preflight: false,
  },
  colorMode: {
    classSuffix: '',
  },
  /**
   * 自动导入
   */
  autoImports: {
    dirs: [
      'vitest',
    ],
    imports: [
      { name: 'Dialog', as: 'vantDialog', from: 'vant/es' },
      { name: 'Toast', as: 'vantToast', from: 'vant/es' },
    ],
  },
  /**
   * @nathanchase/nuxt-dayjs-module
   */
  dayjs: {
    locales: ['zh-cn.js'],
    defaultLocale: 'zh-cn',
    plugins: [
      'duration',
      'relativeTime',
      'advancedFormat',
      'weekday',
    ],
  },
  nitro: {
    externals: {
      inline: ['date-fns', '@babel/runtime', 'date-fns-tz', 'dayjs'],
    },
  },
  build: {
    transpile: process.env.NODE_ENV === 'production'
      ? [
          'css-render',
          '@css-render/plugin-bem',
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@juggle/resize-observer',
          'vant',
          'ant-design-vue', /* AoMao Editor toolbar */
        ]
      : [],
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'vueuc', 'vant'],
    },
    // devBundler: 'legacy',
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    optimizeDeps: {
      // include: ['naive-ui/es', 'vueuc/es', 'date-fns-tz/esm/formatInTimeZone', 'vant', 'dayjs'],
      include: process.env.NODE_ENV === 'development'
        ? ['dayjs']
        : [],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [
          PrefixWrap('.ant-design', {
            prefixRootTags: false,
            nested: '&',
            whitelist: [
              /* 使antd的reset css只在.ant-design下有效 */
              'antd/es/style/default.less',
              'antd/lib/style/default.less',
              'antd/es/style/default.css',
              'antd/lib/style/default.css',
              'antd/es/style/index.less',
              'antd/lib/style/index.less',
              'antd/es/style/index.css',
              'antd/lib/style/index.css',
              'ant-design-vue/lib/style/default.less',
              'ant-design-vue/es/style/default.less',
              'ant-design-vue/lib/style/index.less',
              'ant-design-vue/es/style/index.less',
              'ant-design-vue/lib/style/default.css',
              'ant-design-vue/es/style/default.css',
              'ant-design-vue/lib/style/index.css',
              'ant-design-vue/es/style/index.css',
              'ant-design-vue/dist/antd.css',
            ],
          }),
        ],
      },
    },

  },
  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  hooks: {
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },
})
