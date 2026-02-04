import { groq } from 'next-sanity'
import { client } from '../client'
import type { BlogPost } from '../types'

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(
      groq`*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
        _id, _type, title, slug, excerpt, coverImage, author, publishedAt
      }`
    )
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(
      groq`*[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
        _id, _type, title, slug, excerpt, body, coverImage, author, publishedAt
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getBlogPostSlugs(): Promise<{ slug: { current: string } }[]> {
  try {
    return await client.fetch(
      groq`*[_type == "blogPost" && !(_id in path("drafts.**"))] { slug }`
    )
  } catch (error) {
    console.error('Error fetching blog post slugs:', error)
    return []
  }
}
