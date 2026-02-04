import { groq } from 'next-sanity'
import { client } from '../client'
import type { Bonus } from '../types'

const bonusFields = groq`
  _id,
  _type,
  title,
  slug,
  casino->{
    _id,
    name,
    slug,
    logo,
    rating,
    affiliateUrl
  },
  type,
  value,
  wageringRequirement,
  minDeposit,
  code,
  description,
  terms,
  featured,
  publishedAt
`

export async function getBonuses(): Promise<Bonus[]> {
  try {
    return await client.fetch(
      groq`*[_type == "bonus" && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc) {
        ${bonusFields}
      }`
    )
  } catch (error) {
    console.error('Error fetching bonuses:', error)
    return []
  }
}

export async function getBonusBySlug(slug: string): Promise<Bonus | null> {
  try {
    return await client.fetch(
      groq`*[_type == "bonus" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
        ${bonusFields}
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching bonus by slug:', error)
    return null
  }
}

export async function getBonusSlugs(): Promise<{ slug: { current: string } }[]> {
  try {
    return await client.fetch(
      groq`*[_type == "bonus" && !(_id in path("drafts.**"))] {
        slug
      }`
    )
  } catch (error) {
    console.error('Error fetching bonus slugs:', error)
    return []
  }
}

export async function getBonusesByCasino(casinoId: string): Promise<Bonus[]> {
  try {
    return await client.fetch(
      groq`*[_type == "bonus" && casino._ref == $casinoId && !(_id in path("drafts.**"))] | order(featured desc) {
        ${bonusFields}
      }`,
      { casinoId }
    )
  } catch (error) {
    console.error('Error fetching bonuses by casino:', error)
    return []
  }
}
