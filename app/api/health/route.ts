import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export const runtime = 'edge'

export async function GET() {
  const timestamp = new Date().toISOString()

  // Check Sanity connection
  let sanityStatus = 'healthy'
  try {
    await client.fetch('*[_type == "casino"][0]._id')
  } catch {
    sanityStatus = 'unhealthy'
  }

  const status = sanityStatus === 'healthy' ? 200 : 503

  return NextResponse.json(
    {
      status: status === 200 ? 'healthy' : 'degraded',
      timestamp,
      services: {
        sanity: sanityStatus,
      },
    },
    { status }
  )
}
