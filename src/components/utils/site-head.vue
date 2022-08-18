<script setup lang='ts'>
import type { SiteConfig } from '~/composables/useSite'
const props = withDefaults(defineProps<{
  siteMeta: SiteConfig
}>(), {
  siteMeta: () => HOME_SITE_META,
})
</script>

<template>
  <Head>
    <Title>{{ siteMeta.title }}</Title>
    <Meta name="description" :content="siteMeta.description" />
    <Meta name="keywords" :content="siteMeta.keywords.join('')" />
    <slot />
  </Head>
</template>

<style lang='scss' scoped>

</style>
