<script setup lang="ts">
import { useTheme } from '~/common/theme'

const { naiveTheme, naiveThemeOverrides, vantTheme } = useTheme()
</script>

<template>
  <div>
    <Head>
      <Title>Vitesse Nuxt 3</Title>
      <Meta name="description" content="nuxt test" />
      <Meta name="keywords" content="nuxt" />
      <Link rel="icon" type="image/png" href="/nuxt.png" />
    </Head>
    <van-config-provider :theme-vars="vantTheme">
      <NConfigProvider :theme="naiveTheme" :theme-overrides="naiveThemeOverrides">
        <NMessageProvider>
          <NNotificationProvider>
            <NLoadingBarProvider>
              <NDialogProvider>
                <UtilsMessage />
                <NuxtLayout>
                  <NuxtLoadingIndicator />
                  <NuxtPage />
                </NuxtLayout>
              </NDialogProvider>
            </NLoadingBarProvider>
          </NNotificationProvider>
        </NMessageProvider>
      </NConfigProvider>
    </van-config-provider>
  </div>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
