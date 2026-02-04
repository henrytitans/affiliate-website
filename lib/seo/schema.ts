import type { Casino, Bonus } from '@/lib/sanity/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
const siteName = 'Casino Guide'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/casinos?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateCasinoSchema(casino: Casino) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/casinos/${casino.slug.current}#organization`,
    name: casino.name,
    url: `${siteUrl}/casinos/${casino.slug.current}`,
    description: casino.description,
    aggregateRating: casino.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: casino.rating,
          bestRating: 5,
          worstRating: 0,
          ratingCount: 1,
        }
      : undefined,
  }
}

export function generateReviewSchema(casino: Casino) {
  if (!casino.rating) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: casino.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: casino.rating,
      bestRating: 5,
      worstRating: 0,
    },
    author: {
      '@type': 'Organization',
      name: siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
    },
  }
}

export function generateBonusSchema(bonus: Bonus) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: bonus.title,
    description: bonus.description,
    url: `${siteUrl}/bonuses/${bonus.slug.current}`,
    seller: {
      '@type': 'Organization',
      name: bonus.casino?.name,
    },
    priceSpecification: bonus.value
      ? {
          '@type': 'PriceSpecification',
          price: 0,
          priceCurrency: 'USD',
          description: bonus.value,
        }
      : undefined,
  }
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

export function generateWebPageSchema(page: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `${siteUrl}${page.url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
  }
}
