import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting (resets on server restart)
// For production, use Redis or Vercel KV
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

const RATE_LIMIT = 60 // requests per window
const RATE_WINDOW = 60 * 1000 // 1 minute in ms

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or forwarded header
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'
  return ip
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record) {
    rateLimitMap.set(key, { count: 1, timestamp: now })
    return false
  }

  // Reset if window has passed
  if (now - record.timestamp > RATE_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now })
    return false
  }

  // Increment count
  record.count++

  // Check if over limit
  if (record.count > RATE_LIMIT) {
    return true
  }

  return false
}

export function middleware(request: NextRequest) {
  // Only rate limit /go/ routes
  if (request.nextUrl.pathname.startsWith('/go/')) {
    const key = getRateLimitKey(request)

    if (isRateLimited(key)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/go/:path*',
}
