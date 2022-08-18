export interface SiteConfig {
  title: string
  description: string
  keywords: string[]
}

export const DEFAULT_TITLE = 'title'
export const DEFAULT_DESCRIPTION = 'description'
export const DEFAULT_KEYWORDS = ['keywords']

// 首页
export const HOME_SITE_META: SiteConfig = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: [...DEFAULT_KEYWORDS],
}

export function useSite(config: Partial<SiteConfig> = HOME_SITE_META) {
  const siteMeta = useState('siteMeta', () => ({
    title: config?.title || DEFAULT_TITLE,
    description: config?.description || DEFAULT_DESCRIPTION,
    keywords: config?.keywords || DEFAULT_KEYWORDS,
  }))

  siteMeta.value.title = config?.title || DEFAULT_TITLE
  siteMeta.value.description = config?.description || DEFAULT_DESCRIPTION
  siteMeta.value.keywords = config?.keywords || DEFAULT_KEYWORDS

  function changeMeta(config: Partial<SiteConfig>) {
    siteMeta.value.title = config?.title || DEFAULT_TITLE
    siteMeta.value.description = config?.description || DEFAULT_DESCRIPTION
    siteMeta.value.keywords = config?.keywords || DEFAULT_KEYWORDS
  }
  // 如果只是静态不变
  try {
    useHead(computed(() => ({
      title: siteMeta.value.title,
      meta: [
        {
          name: 'description',
          content: siteMeta.value.description?.slice(0, 200),
        },
        {
          name: 'keywords',
          content: siteMeta.value.keywords.join(','),
        },
      ],
    })))
  }
  catch (err) {
    console.error('useHead error', err)
  }

  // 初始化，useState不一定能初始化
  changeMeta(config)

  return {
    siteMeta,
    changeMeta,
  }
}
