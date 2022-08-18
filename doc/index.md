# formwork

- 响应式(web/H5)
- 主题(dark/light)
- 监控(错误/性能)
- 测试`Vitesse`
- 部署`docker`

## unocss

> 从 v0.7.0 开始，Vite 插件现在附带一个开发检查器 ( @unocss/inspector )，供您查看、播放和分析您的自定义规则和设置。访问<http://localhost:3000/__unocss>您的 Vite 开发服务器以查看它。

- 动态连接

```vue
<div class="p-${size}"></div> <!-- this won't work! -->

<!-- need config add -->
/*
safelist: [
  ...Array.from({ length: 4 }, (_, i) => `p-${i + 1}`),
]
*/
```

### icon 的使用

> 基于[unocss/icon](https://github.com/unocss/unocss/tree/main/packages/preset-icons)

- 关于自定义图标

文件目录 `/src/assets/icons` ，需要对 `svg` 文件进行处理，将颜色修改成 `currentColor` ；如果有特殊情况也可不修改（`icon` 颜色将不会随 `color` 变化）
