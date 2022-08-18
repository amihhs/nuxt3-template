<script lang="ts" setup>
// const controller = new AbortController();
// const signal = controller.signal;
// $fetch(url, { signal });

// controller.abort();


definePageMeta({
  layout: 'default',
})
// site meta
useSite({
  title: 'theme - test',
  description: 'welcome test nuxt3 theme',
  keywords: ['nuxt3', 'nuxt', 'test', 'theme'],
})
</script>

<template>
  <div layout-default-container>
    <div>
      <div my-4>
        icon
      </div>
      <span i-custom:all text-24 />
      <!-- 强制使用bg模式展示 -->
      <span class="i-carbon-list?bg" />
    </div>
    <div>
      <div my-4>
        主题
      </div>
      <div flex gap-5 justify-center flex-wrap>
        <!-- 如果要这个使用的话，休要在unocss.config.ts中配置safelist -->
        <div v-for="v in ['primary', 'success', 'warn', 'error', 'default']" :key="v" :class="[`text-${v}`]">
          {{ v }}
        </div>

        <div v-for="v in 9" :key="v" :class="[`text-title-${v * 100}`]">
          text-title-{{ v * 100 }}
        </div>
      </div>
    </div>
  </div>
</template>
