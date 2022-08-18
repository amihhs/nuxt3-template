<script setup lang='ts'>
definePageMeta({
  middleware: ['auth'],
})
useSite({
  title: 'vantUI - test',
})
</script>

<template>
  <div layout-default-container text-title-900>
    <van-image
      class="user-poster"
      src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
    />
    <van-row class="user-links">
      <van-col span="6">
        待付款
      </van-col>
      <van-col span="6">
        待接单
      </van-col>
      <van-col span="6">
        待发货
      </van-col>
      <van-col span="6">
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group" />

    <van-cell-group />
  </div>
</template>

<style lang='scss' scoped>
.a{
  background-color: rgba($color: #000000, $alpha: 1.0);
}
</style>
