<script setup lang='ts'>
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <client-only>
      <utils-wang-editor />
    </client-only>
  </div>
</template>

<style lang='scss' scoped>

</style>
