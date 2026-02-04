import { NextRequest, NextResponse } from 'next/server'

// In production, you would integrate with an email service like:
// - Mailchimp
// - ConvertKit
// - Buttondown
// - Resend

// For now, we'll store in memory (replace with database in production)
const subscribers: Set<string> = new Set()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    if (subscribers.has(email.toLowerCase())) {
      return NextResponse.json(
        { message: 'Already subscribed', success: true },
        { status: 200 }
      )
    }

    // Add to subscribers
    subscribers.add(email.toLowerCase())

    // Log for debugging (in production, save to database or send to email service)
    console.log('Newsletter subscription:', email)

    return NextResponse.json(
      { message: 'Successfully subscribed', success: true },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return subscriber count (for admin purposes)
  return NextResponse.json({
    count: subscribers.size,
    message: 'Newsletter stats',
  })
}
