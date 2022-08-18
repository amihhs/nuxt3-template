<!-- 为了在setup之外使用message，将相关实例挂载到window上 -->
<!-- https://www.naiveui.com/zh-CN/os-theme/components/message#%E5%9C%A8-setup-%E5%A4%96%E4%BD%BF%E7%94%A8 -->
<script setup lang='ts'>
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'
import { isClient } from '~/utils'
if (isClient) {
  window.$message = useMessage()
  window.$dialog = useDialog()
  window.$loadingBar = useLoadingBar()
  window.$notification = useNotification()
}
</script>

<template>
  <div />
</template>
