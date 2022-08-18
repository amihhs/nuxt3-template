# issue

> 已知问题和可能存在的问题

- 1`.nuxt config head`无效

- 2.`naive-ui` 下列组件在 `SSR` 场景中存在一些 `Bug`，使用时请尽量规避，我们会逐步修复。
  - n-scrollbar, n-data-table（vue 版本 >= 3.2.36 后没有问题)
  - n-anchor
  - n-avatar-group
  - n-watermark
  - n-affix
  - n-transfer

- 3.需要根节点

## linux下

- Failed to resolve import "dayjs/plugin/RelativeTime.js" from "src/utils/tools/time.ts". Does the file exist

```bash

# [vite] Internal server error: Failed to resolve import "dayjs/plugin/RelativeTime.js" from "app.vue". Does the file exist?
#  Plugin: vite:import-analysis
#  File: /home/projects/github-rervgt/app.vue

https://stackblitz.com/edit/github-rervgt?file=app.vue
```

```js
// import __vite__cjsImport1_dayjs from "/@fs/D:/job/zjh/qcwp/nuxt3-app/node_modules/.vite/deps/dayjs.js?v=89a01509";
```
