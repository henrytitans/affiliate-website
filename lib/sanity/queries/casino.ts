import { groq } from 'next-sanity'
import { client } from '../client'
import type { Casino } from '../types'

const PER_PAGE = 12

export interface CasinoFilters {
  featured?: boolean
  sort?: 'rating' | 'name' | 'newest'
  page?: number
}

export interface CasinosResult {
  casinos: Casino[]
  total: number
  page: number
  totalPages: number
}

export async function getCasinos(filters: CasinoFilters = {}): Promise<CasinosResult> {
  const { featured, sort = 'rating', page = 1 } = filters
  const start = (page - 1) * PER_PAGE
  const end = start + PER_PAGE

  const conditions = ['_type == "casino"', '!(_id in path("drafts.**"))']
  if (featured) {
    conditions.push('featured == true')
  }

  const filter = conditions.join(' && ')

  const sortMap = {
    rating: 'rating desc, name asc',
    name: 'name asc',
    newest: 'publishedAt desc',
  }

  try {
    const result = await client.fetch<{ casinos: Casino[]; total: number }>(
      groq`{
        "casinos": *[${filter}] | order(${sortMap[sort]}) [${start}...${end}] {
          _id,
          _type,
          name,
          slug,
          logo,
          description,
          rating,
          affiliateUrl,
          featured,
          publishedAt
        },
        "total": count(*[${filter}])
      }`
    )

    return {
      casinos: result.casinos,
      total: result.total,
      page,
      totalPages: Math.ceil(result.total / PER_PAGE),
    }
  } catch (error) {
    console.error('Error fetching casinos:', error)
    return { casinos: [], total: 0, page: 1, totalPages: 0 }
  }
}

export async function getCasinoBySlug(slug: string): Promise<Casino | null> {
  try {
    return await client.fetch(
      groq`*[_type == "casino" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
        _id,
        _type,
        name,
        slug,
        logo,
        description,
        rating,
        affiliateUrl,
        featured,
        publishedAt
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching casino by slug:', error)
    return null
  }
}

export async function getCasinoSlugs(): Promise<{ slug: { current: string } }[]> {
  try {
    return await client.fetch(
      groq`*[_type == "casino" && !(_id in path("drafts.**"))] {
        slug
      }`
    )
  } catch (error) {
    console.error('Error fetching casino slugs:', error)
    return []
  }
}

export async function getCasinosByCountry(countryCode: string): Promise<Casino[]> {
  try {
    return await client.fetch(
      groq`*[_type == "casino" && !(_id in path("drafts.**")) && $countryCode in countries[]->code] | order(rating desc) {
        _id,
        _type,
        name,
        slug,
        logo,
        description,
        rating,
        affiliateUrl,
        featured,
        publishedAt
      }`,
      { countryCode: countryCode.toUpperCase() }
    )
  } catch (error) {
    console.error('Error fetching casinos by country:', error)
    return []
  }
}

export async function getCasinosByPaymentMethod(paymentMethodSlug: string): Promise<Casino[]> {
  try {
    return await client.fetch(
      groq`*[_type == "casino" && !(_id in path("drafts.**")) && $slug in paymentMethods[]->slug.current] | order(rating desc) {
        _id,
        _type,
        name,
        slug,
        logo,
        description,
        rating,
        affiliateUrl,
        featured,
        publishedAt
      }`,
      { slug: paymentMethodSlug }
    )
  } catch (error) {
    console.error('Error fetching casinos by payment method:', error)
    return []
  }
}
