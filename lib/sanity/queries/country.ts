import { groq } from 'next-sanity'
import { client } from '../client'
import type { Country } from '../types'

export async function getCountries(): Promise<Country[]> {
  try {
    return await client.fetch(
      groq`*[_type == "country" && !(_id in path("drafts.**"))] | order(name asc) {
        _id, _type, name, code, flag, legalStatus, overview
      }`
    )
  } catch (error) {
    console.error('Error fetching countries:', error)
    return []
  }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  try {
    return await client.fetch(
      groq`*[_type == "country" && code == $code && !(_id in path("drafts.**"))][0] {
        _id, _type, name, code, flag, legalStatus, overview
      }`,
      { code: code.toUpperCase() }
    )
  } catch (error) {
    console.error('Error fetching country:', error)
    return null
  }
}

export async function getCountryCodes(): Promise<{ code: string }[]> {
  try {
    return await client.fetch(
      groq`*[_type == "country" && !(_id in path("drafts.**"))] { code }`
    )
  } catch (error) {
    console.error('Error fetching country codes:', error)
    return []
  }
}
