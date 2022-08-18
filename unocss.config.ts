import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import presetRemToPx from '@unocss/preset-rem-to-px'
export default defineConfig({
  // 通过组合现有实用程序来创建新的实用程序
  // eg:['btn', 'px-4 py-1 rounded bg-teal-600'],
  shortcuts: [
    ['btn', 'px-4 py-1 rounded bg-teal-600'],
    ['layout-default-container', 'w-full max-w-1200px m-auto pt-12'],
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: (() => {
      const colors: any = {
        transparent: 'transparent',
        current: 'currentColor',
        default: 'var(--color-default)',
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        warn: 'var(--color-warn)',
        error: 'var(--color-error)',
        title: {},
      }
      for (let i = 9; i >= 1; i--)
        colors.title[String(i * 100)] = `var(--color-text-${i * 100})`

      return colors
    })(),
  },
  safelist: [
    ...Array.from(['primary', 'success', 'warn', 'error', 'default'], _ => `text-${_}`),
    ...Array.from({ length: 9 }, (_, i) => `text-title-${(i + 1) * 100}`),
  ],
  // 预设
  presets: [
    presetUno(),
    // rem转px
    presetRemToPx() as any,
    // 属性模式 <span i-custom:all text-24 />
    presetAttributify(),
    // 预设icon
    presetIcons({
      mode: 'mask', // 模式覆盖 i-carbon:list?bg
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
      collections: {
        custom: FileSystemIconLoader('./src/assets/icons'),
      },
    }),
    // 预设排版
    presetTypography(),
    // 预设web字体
    presetWebFonts({}),
  ],
  // 转换
  transformers: [
    // @apply用于和theme()指令的 UnoCSS 转换器
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
