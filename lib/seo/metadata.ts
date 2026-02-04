import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
const siteName = 'Casino Guide'

interface SEOInput {
  title: string
  description: string
  path: string
  ogImage?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
  type = 'website',
}: SEOInput): Metadata {
  const url = `${siteUrl}${path}`
  const defaultOgImage = `${siteUrl}/og-default.png`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type,
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage || defaultOgImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
