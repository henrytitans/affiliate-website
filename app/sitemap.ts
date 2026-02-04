import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

async function getSlugs(type: string, slugField = 'slug.current') {
  try {
    return await client.fetch<{ slug: string; updatedAt: string }[]>(
      groq`*[_type == $type && !(_id in path("drafts.**"))] {
        "slug": ${slugField},
        "updatedAt": _updatedAt
      }`,
      { type }
    )
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [casinos, bonuses, countries, paymentMethods, blogPosts, pages, reviews] = await Promise.all([
    getSlugs('casino'),
    getSlugs('bonus'),
    getSlugs('country', 'code'),
    getSlugs('paymentMethod'),
    getSlugs('blogPost'),
    getSlugs('page'),
    getSlugs('review'),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/casinos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/bonuses`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/countries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/payment-methods`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${siteUrl}/favorites`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/responsible-gambling`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]

  const casinoPages = casinos.map((c) => ({
    url: `${siteUrl}/casinos/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const bonusPages = bonuses.map((b) => ({
    url: `${siteUrl}/bonuses/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const countryPages = countries.map((c) => ({
    url: `${siteUrl}/countries/${c.slug.toLowerCase()}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const paymentPages = paymentMethods.map((p) => ({
    url: `${siteUrl}/payment-methods/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const blogPages = blogPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const cmsPages = pages.map((p) => ({
    url: `${siteUrl}/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const reviewPages = reviews.map((r) => ({
    url: `${siteUrl}/reviews/${r.slug}`,
    lastModified: new Date(r.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...casinoPages,
    ...bonusPages,
    ...countryPages,
    ...paymentPages,
    ...blogPages,
    ...cmsPages,
    ...reviewPages,
  ]
}
