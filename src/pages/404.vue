<script setup lang='ts'>
definePageMeta({
  layout: 'empty',
})
const errorText = '未找到相关页面'
</script>

<template>
  <div text-center layout-default-container>
    <div i-carbon:information-disabled text-warn text-15 />
    <div py-4>
      {{ errorText }}
    </div>
    <div flex gap-4 justify-center>
      <n-button type="default">
        返回首页
      </n-button>
      <n-button type="warning">
        返回上一页
      </n-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
