import { darkTheme, lightTheme } from 'naive-ui'
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import type { Numeric } from 'vant/es/utils'
import { vantDarkTheme, vantLightTheme } from './vant'
import { darkThemeThemeOverrides, lightThemeThemeOverrides } from './naive'

export function useTheme() {
  const theme = useColorMode()
  const vantTheme = computed<Record<string, Numeric> | null>(() => theme.value === 'dark' ? vantDarkTheme : vantLightTheme)
  const naiveTheme = computed<GlobalTheme | null>(() => theme.value === 'dark' ? darkTheme : lightTheme)
  const naiveThemeOverrides = computed<GlobalThemeOverrides | null>(() => theme.value === 'dark' ? darkThemeThemeOverrides : lightThemeThemeOverrides)

  return {
    naiveTheme,
    naiveThemeOverrides,
    vantTheme,
  }
}
