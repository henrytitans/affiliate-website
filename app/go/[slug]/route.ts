import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

export const runtime = 'edge'

interface ClickEvent {
  casino: string
  timestamp: string
  referrer: string
  page: string
  country: string
  userAgent: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Fetch casino affiliate URL
  let casino: { affiliateUrl: string | null } | null = null
  try {
    casino = await client.fetch(
      groq`*[_type == "casino" && slug.current == $slug][0]{ affiliateUrl }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching casino:', error)
  }

  // If no casino or no affiliate URL, redirect to homepage
  if (!casino?.affiliateUrl) {
    console.log('CLICK_ERROR:', JSON.stringify({
      casino: slug,
      error: 'Casino or affiliate URL not found',
      timestamp: new Date().toISOString(),
    }))
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Build click event data
  const referrer = request.headers.get('referer') || 'direct'
  let page = '/'
  try {
    if (referrer !== 'direct') {
      page = new URL(referrer).pathname
    }
  } catch {
    page = '/'
  }

  // Get country from header (set by Vercel/Cloudflare at edge)
  const country = request.headers.get('x-vercel-ip-country') ||
                  request.headers.get('cf-ipcountry') ||
                  'unknown'

  const clickEvent: ClickEvent = {
    casino: slug,
    timestamp: new Date().toISOString(),
    referrer,
    page,
    country,
    userAgent: request.headers.get('user-agent') || 'unknown',
  }

  // Log click (Phase 4: console, Phase 10: database)
  console.log('CLICK:', JSON.stringify(clickEvent))

  // Redirect to affiliate URL
  return NextResponse.redirect(casino.affiliateUrl)
}
