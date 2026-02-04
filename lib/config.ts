import type { FormatKey } from '@/components/formats'

export const siteConfig = {
  name: 'Casino Guide',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  format: (process.env.SITE_FORMAT || 'default') as FormatKey,
}

// Helper to get format from URL params or config
export function getFormatKey(searchParams?: { format?: string }): FormatKey {
  // URL param takes precedence
  if (searchParams?.format === 'comparison') {
    return 'comparison'
  }
  if (searchParams?.format === 'default') {
    return 'default'
  }
  // Fall back to env config
  return siteConfig.format
}
