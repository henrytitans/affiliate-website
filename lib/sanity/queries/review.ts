import { groq } from 'next-sanity'
import { client } from '../client'
import type { PortableTextBlock } from '../types'

export interface Review {
  _id: string
  slug: { current: string }
  headline: string
  body?: PortableTextBlock[]
  author?: string
  verdict?: string
  lastTested?: string
  ratings?: {
    overall?: number
    games?: number
    support?: number
    payout?: number
    mobile?: number
  }
  pros?: string[]
  cons?: string[]
  publishedAt?: string
  casino: {
    _id: string
    name: string
    slug: { current: string }
    logo?: { asset: { _ref: string } }
    rating?: number
    affiliateUrl?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

const reviewFields = groq`
  _id,
  slug,
  headline,
  body,
  author,
  verdict,
  lastTested,
  ratings,
  pros,
  cons,
  publishedAt,
  seo,
  "casino": casino->{
    _id,
    name,
    slug,
    logo,
    rating,
    affiliateUrl
  }
`

export async function getReviews(): Promise<Review[]> {
  try {
    return await client.fetch(
      groq`*[_type == "review" && defined(casino)] | order(publishedAt desc) {
        ${reviewFields}
      }`
    )
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  try {
    return await client.fetch(
      groq`*[_type == "review" && slug.current == $slug][0] {
        ${reviewFields}
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching review:', error)
    return null
  }
}

export async function getReviewByCasinoSlug(casinoSlug: string): Promise<Review | null> {
  try {
    return await client.fetch(
      groq`*[_type == "review" && casino->slug.current == $casinoSlug][0] {
        ${reviewFields}
      }`,
      { casinoSlug }
    )
  } catch (error) {
    console.error('Error fetching review by casino:', error)
    return null
  }
}

export async function getReviewSlugs(): Promise<{ slug: { current: string } }[]> {
  try {
    return await client.fetch(
      groq`*[_type == "review" && defined(slug.current)] { slug }`
    )
  } catch (error) {
    console.error('Error fetching review slugs:', error)
    return []
  }
}
