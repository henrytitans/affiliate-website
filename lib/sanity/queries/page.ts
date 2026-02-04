import { groq } from 'next-sanity'
import { client } from '../client'
import type { Page, Casino } from '../types'

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    return await client.fetch(
      groq`*[_type == "page" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
        _id,
        _type,
        title,
        slug,
        blocks[] {
          _key,
          _type,

          // richTextBlock
          _type == "richTextBlock" => {
            content
          },

          // ctaBlock
          _type == "ctaBlock" => {
            text,
            url,
            variant,
            size,
            centered
          },

          // infoBoxBlock
          _type == "infoBoxBlock" => {
            title,
            content,
            variant
          },

          // prosConsBlock
          _type == "prosConsBlock" => {
            title,
            pros,
            cons
          },

          // heroBlock
          _type == "heroBlock" => {
            title,
            subtitle,
            image,
            imagePosition,
            cta,
            overlay
          },

          // faqBlock
          _type == "faqBlock" => {
            title,
            items[] {
              _key,
              question,
              answer
            }
          },

          // casinoListBlock
          _type == "casinoListBlock" => {
            title,
            subtitle,
            displayMode,
            filter,
            limit,
            columns,
            showViewAllLink,
            manualCasinos[]-> {
              _id,
              _type,
              name,
              slug,
              logo,
              description,
              rating,
              affiliateUrl,
              featured
            }
          },

          // comparisonTableBlock
          _type == "comparisonTableBlock" => {
            title,
            columns,
            highlightWinner,
            casinos[]-> {
              _id,
              _type,
              name,
              slug,
              logo,
              description,
              rating,
              affiliateUrl,
              featured
            }
          }
        },
        seo {
          metaTitle,
          metaDescription,
          ogImage,
          noIndex
        },
        publishedAt
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching page by slug:', error)
    return null
  }
}

export async function getPageSlugs(): Promise<{ slug: { current: string }; updatedAt: string }[]> {
  try {
    return await client.fetch(
      groq`*[_type == "page" && !(_id in path("drafts.**"))] {
        slug,
        "updatedAt": _updatedAt
      }`
    )
  } catch (error) {
    console.error('Error fetching page slugs:', error)
    return []
  }
}

export async function getCasinosForBlock(
  filter: 'all' | 'featured' | 'top-rated' | 'newest',
  limit: number
): Promise<Casino[]> {
  const sortMap = {
    all: 'name asc',
    featured: 'rating desc',
    'top-rated': 'rating desc',
    newest: 'publishedAt desc',
  }

  const conditions = ['_type == "casino"', '!(_id in path("drafts.**"))']
  if (filter === 'featured') {
    conditions.push('featured == true')
  }

  const filterStr = conditions.join(' && ')

  try {
    return await client.fetch(
      groq`*[${filterStr}] | order(${sortMap[filter]}) [0...${limit}] {
        _id,
        _type,
        name,
        slug,
        logo,
        description,
        rating,
        affiliateUrl,
        featured
      }`
    )
  } catch (error) {
    console.error('Error fetching casinos for block:', error)
    return []
  }
}
