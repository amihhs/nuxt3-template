<script setup lang='ts'>
import type { EditorInterface } from '@aomao/engine'
import { isClient } from '~/utils'
const isMounted = ref(false)
const containerRef = ref()
const engine = shallowRef()
const items = ref([
  ['collapse'],
  ['undo', 'redo', 'paintformat', 'removeformat'],
  ['heading', 'fontfamily', 'fontsize'],
  ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
  ['fontcolor', 'backcolor'],
  ['alignment'],
  ['unorderedlist', 'orderedlist', 'tasklist', 'indent', 'line-height'],
  ['link', 'quote', 'hr'],
])
const html = ref('')
if (isClient) {
  const time = Date.now()
  const Engine = (await import('@aomao/engine')).default
  /* 工具栏 */
  const Toolbar = (await import('@aomao/toolbar-vue'))
  const { ToolbarPlugin, ToolbarComponent } = Toolbar
  /* 插件：卡片 */
  const Codeblock = (await import('@aomao/plugin-codeblock-vue'))
  const { CodeBlockComponent } = Codeblock
  /* 插件：加粗 */
  const Bold = (await import('@aomao/plugin-bold')).default
  /* 插件：斜体 */
  const Italic = (await import('@aomao/plugin-italic')).default
  /* 插件：对齐 */
  const Alignment = (await import('@aomao/plugin-alignment')).default
  /* 插件：背景颜色 */
  const Backcolor = (await import('@aomao/plugin-backcolor')).default
  /* 插件：行内代码样式 */
  const Code = (await import('@aomao/plugin-code')).default
  /* 插件：Embed URL */
  const Embed = (await import('@aomao/plugin-embed'))
  const { EmbedComponent } = Embed
  /* 插件：链接 */
  const Link = (await import('@aomao/plugin-link')).default
  /* 插件：标题 */
  const Heading = (await import('@aomao/plugin-heading')).default
  /* 插件：字体大小 */
  const Fontsize = (await import('@aomao/plugin-fontsize')).default
  /* 插件：字体 */
  const Fontfamily = (await import('@aomao/plugin-fontfamily')).default
  /* 插件：字体 */
  const Lineheight = (await import('@aomao/plugin-line-height')).default
  /* 插件：字体 */
  const Fontcolor = (await import('@aomao/plugin-fontcolor')).default
  /* 插件：删除线 */
  const Strikethrough = (await import('@aomao/plugin-strikethrough')).default
  /* 插件：下划线 */
  const Underline = (await import('@aomao/plugin-underline')).default

  /* 插件：分割线 */
  const Hr = (await import('@aomao/plugin-hr'))
  const { HrComponent } = Hr
  /* 插件：缩进 */
  const Indent = (await import('@aomao/plugin-indent')).default
  /* 插件：图片 */
  const Image = (await import('@aomao/plugin-image'))
  const { ImageComponent, ImageUploader } = Image
  /* 插件：视频 */
  const Video = (await import('@aomao/plugin-video'))
  const { VideoComponent, VideoUploader } = Video
  /* 插件：视频 */
  const File = (await import('@aomao/plugin-file'))
  const { FileComponent, FileUploader } = File
  /* 插件：有序列表 */
  const Orderedlist = (await import('@aomao/plugin-orderedlist')).default
  /* 插件：无序列表 */
  const Unorderedlist = (await import('@aomao/plugin-unorderedlist')).default
  /* 插件：下标 */
  const Sub = (await import('@aomao/plugin-sub')).default
  /* 插件：上标 */
  const Sup = (await import('@aomao/plugin-sup')).default
  /* 插件：全选 */
  const Selectall = (await import('@aomao/plugin-selectall')).default

  /* 插件：重做历史 */
  const Redo = (await import('@aomao/plugin-redo')).default
  /* 插件：撤销历史 */
  const Undo = (await import('@aomao/plugin-undo')).default
  /* 插件：引用样式 */
  const Quote = (await import('@aomao/plugin-quote')).default
  /* 插件：格式刷 */
  const Paintformat = (await import('@aomao/plugin-paintformat')).default
  /* 插件：移除样式 */
  const Removeformat = (await import('@aomao/plugin-removeformat')).default
  /* 插件：任务列表 */
  const Tasklist = (await import('@aomao/plugin-tasklist'))
  const { CheckboxComponent } = Tasklist
  /* 插件：表格列表 */
  const Table = (await import('@aomao/plugin-table'))
  const { TableComponent } = Table
  /* 插件：状态列表 */
  const Status = (await import('@aomao/plugin-status'))
  const { StatusComponent } = Status

  const nuxtApp = useNuxtApp()
  const components = nuxtApp.vueApp?._context?.components || {}
  if (!Object.keys(components).includes('AomaoToolbar'))
    nuxtApp.vueApp.component('AomaoToolbar', Toolbar.default)

  isMounted.value = true
  function editorInitHandle() {
    engine.value = new Engine(
      containerRef.value,
      {
        lang: 'zh-CN',
        placeholder: '请输入内容',
        cards: [
          ToolbarComponent,
          CodeBlockComponent,
          ImageComponent,
          VideoComponent,
          FileComponent,
          HrComponent,
          EmbedComponent,
          TableComponent,
          StatusComponent,
          CheckboxComponent,
        ],
        plugins: [
          ToolbarPlugin,
          Codeblock.default,
          Bold,
          Italic,
          Alignment,
          Backcolor,
          Code,
          Embed.default,
          Link,
          Heading,
          Fontsize,
          Fontfamily,
          Lineheight,
          Fontcolor,
          Strikethrough,
          Underline,
          Hr.default,
          Indent,
          Image.default,
          ImageUploader,
          Video.default,
          VideoUploader,
          File.default,
          FileUploader,
          Orderedlist,
          Unorderedlist,
          Redo,
          Undo,
          Quote,
          Paintformat,
          Removeformat,
          Sub,
          Sup,
          Tasklist.default,
          Table.default,
          Status.default,
          Selectall,
        ],
        config: {
          [Fontsize.pluginName]: {
            defaultSize: '16px',
          },
          [Image.default.pluginName]: {
            onBeforeRender: (status: 'uploading' | 'done', src: string, editor: EditorInterface) => {
              if (src.includes('http') || src.includes('base64') || src.includes('blob'))
                return src
              else
                return `https://host.com${src}`
            },
          },
          [ImageUploader.pluginName]: {
            file: {
              action: 'api/file/qcts/upload',
              crossOrigin: true,
              headers: {},
              type: 'json',
              data: { code: 'OTHER' },
              name: 'file',
              contentType: 'multipart/form-data',
            },
            parse: (response: any) => {
              if (response?.data) {
                return {
                  result: true,
                  data: response.data,
                }
              }
              else {
                return {
                  result: false,
                  data: response.msg,
                }
              }
            },

          },
        },
      },
    )
    engine.value.on('change', (value: string) => {
      // 打印当前变更的值
      html.value = engine.value.getHtml()
    })
    const change = engine.value.change
  }

  watchEffect(() => {
    if (!isMounted.value || !containerRef.value)
      return
    if (isClient)
      editorInitHandle()
  })
}
</script>

<template>
  <div class="ant-design">
    <AomaoToolbar v-if="engine" :engine="engine" :items="items" />
    <div ref="containerRef" class="editor p-4" />
    <!-- <div v-html="html" /> -->
  </div>
</template>

<style lang='scss' scoped>
.editor{
  min-height: 300px;
  border: 1px solid #e1e2e3;
}
</style>
