import { groq } from 'next-sanity'
import { client } from '../client'
import type { PaymentMethod } from '../types'

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    return await client.fetch(
      groq`*[_type == "paymentMethod" && !(_id in path("drafts.**"))] | order(name asc) {
        _id, _type, name, slug, logo, type, description, processingTime, fees
      }`
    )
  } catch (error) {
    console.error('Error fetching payment methods:', error)
    return []
  }
}

export async function getPaymentMethodBySlug(slug: string): Promise<PaymentMethod | null> {
  try {
    return await client.fetch(
      groq`*[_type == "paymentMethod" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
        _id, _type, name, slug, logo, type, description, processingTime, fees
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching payment method:', error)
    return null
  }
}

export async function getPaymentMethodSlugs(): Promise<{ slug: { current: string } }[]> {
  try {
    return await client.fetch(
      groq`*[_type == "paymentMethod" && !(_id in path("drafts.**"))] { slug }`
    )
  } catch (error) {
    console.error('Error fetching payment method slugs:', error)
    return []
  }
}
