# site meta 设置

> [head-management](https://v3.nuxtjs.org/guide/features/head-management)

## 通过`useHead`设置

```vue
<script setup>
useHead({
  title: 'My App',
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test'
  }
})
</script>

```

## `Meta Components`设置

```vue
<script setup>
const title = ref('Hello World')
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
    </Head>

    <h1>{{ title }}</h1>
  </div>
</template>
```

## 当前解决方案

- 1. 使用`Meta Components`单独弄成一个组件，通过props传入`useState`对象，内容包括`title`,`description`,`keywords`
- 2. 通过`composables`中的`useSite`设置

- 关于选择哪个
  如果是需要使用异步数据，建议选择`1`，`2`可能对于异步数据有一定的延时性
  或者优化`2`使每次数据改变后都调用`useHead`(目前使通过computed)，未测试不一定有效
