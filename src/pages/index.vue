<script lang="ts" setup>
import type { MessageReactive } from 'naive-ui'
import { useApiFetchTest } from '../server/request/__test__'
import { rejectError } from '../test/error'
import { ERROR_CODE } from '../types/error'
import { useApiFetch } from '../server/request'
import { useAuth } from '../store'
import { isClient } from '../utils'
import type { SiteConfig } from '~/composables/useSite'
// 一些接口和错误测试
// useApiFetchTest()
// rejectError()
const { timeFrom, timeStamp } = useTime()
const siteMeta = useState<SiteConfig>('siteMeta', () => HOME_SITE_META)

// 同步渲染异步数据请求（）
// TODO: loadingTry function
const c = ref<any>()
const d = ref<any>()
async function init() {
  let messageReactive: MessageReactive | null = null
  if (isClient)
    messageReactive = window.$message.loading('请求中...', { duration: 0 })
  try {
    const res = await useApiFetch.get('/api/mock', { code:209 }, {
      setting: {
        repetition: 'pre',
      },
    })
    return res
  }
  catch (error) {
    console.error('error', error)
  }
  finally {
    messageReactive && messageReactive.destroy()
    messageReactive = null
  }
}

function two() {
  init().then((res) => {
    c.value = res
  })
  init().then((res) => {
    d.value = res
  })
}

const { data } = useAsyncData('/api/mock?code=203', async () => {
  const res = await useApiFetch('/api/mock?code=203')
  // async set meta
  siteMeta.value.title = 'async home title'
  siteMeta.value.description = 'async home description'
  siteMeta.value.keywords = ['async home keywords']
  return res
})

const authStore = useAuth()
</script>

<template>
  <div layout-default-container h-200vh>
    <utils-site-head :site-meta="siteMeta" />
    <div flex gap-4 mb-4 justify-center flex-wrap>
      <n-button type="info" @click="authStore.accountLogin">
        登录
      </n-button>
      <n-button type="error" @click="authStore.logout">
        退出登录
      </n-button>
      <n-button @click="two">
        init
      </n-button>
      <NuxtLink to="/ui/editor">
        <n-button type="primary">
          editor
        </n-button>
      </NuxtLink>
      <NuxtLink to="/ui/wangEditor">
        <n-button>
          wangEditor
        </n-button>
      </NuxtLink>
    </div>
    <div flex gap-4 justify-center ptb-10>
      <NuxtLink to="/ui">
        <n-button type="warning">
          ui
        </n-button>
      </NuxtLink>
      <NuxtLink to="/ui/naive">
        <n-button type="success">
          naive
        </n-button>
      </NuxtLink>
      <NuxtLink to="/ui/vant">
        <n-button type="error">
          vant
        </n-button>
      </NuxtLink>
    </div>
    <div>
      <div>
        {{ timeFrom('2022-08-09') }}
      </div>
      <div>{{ timeStamp('2022-02-29', 1, 'subtract', 'D', 'YYYY-MM-DD') }}</div>
      <div>
        data:{{ data }}
      </div>
      <div flex>
        <div class="w-50%">
          <div>
            c:
          </div>
          <div />
          {{ c }}
        </div>
        <div class="w-50%">
          <div>
            d:
          </div>
          <div>
            {{ d }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
