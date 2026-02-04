import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Sanity webhook payload types
interface SanityWebhookPayload {
  _type: string
  _id: string
  slug?: {
    current: string
  }
}

export async function POST(request: NextRequest) {
  // Verify secret token
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    const body: SanityWebhookPayload = await request.json()
    const { _type, slug } = body

    // Track which paths were revalidated
    const revalidatedPaths: string[] = []

    // Revalidate based on content type
    switch (_type) {
      case 'casino':
        revalidatePath('/casinos')
        revalidatedPaths.push('/casinos')
        revalidatePath('/')
        revalidatedPaths.push('/')
        if (slug?.current) {
          revalidatePath(`/casinos/${slug.current}`)
          revalidatedPaths.push(`/casinos/${slug.current}`)
        }
        break

      case 'bonus':
        revalidatePath('/bonuses')
        revalidatedPaths.push('/bonuses')
        if (slug?.current) {
          revalidatePath(`/bonuses/${slug.current}`)
          revalidatedPaths.push(`/bonuses/${slug.current}`)
        }
        break

      case 'country':
        revalidatePath('/countries')
        revalidatedPaths.push('/countries')
        if (slug?.current) {
          revalidatePath(`/countries/${slug.current}`)
          revalidatedPaths.push(`/countries/${slug.current}`)
        }
        break

      case 'paymentMethod':
        revalidatePath('/payment-methods')
        revalidatedPaths.push('/payment-methods')
        if (slug?.current) {
          revalidatePath(`/payment-methods/${slug.current}`)
          revalidatedPaths.push(`/payment-methods/${slug.current}`)
        }
        break

      case 'blogPost':
        revalidatePath('/blog')
        revalidatedPaths.push('/blog')
        if (slug?.current) {
          revalidatePath(`/blog/${slug.current}`)
          revalidatedPaths.push(`/blog/${slug.current}`)
        }
        break

      case 'page':
        if (slug?.current) {
          revalidatePath(`/${slug.current}`)
          revalidatedPaths.push(`/${slug.current}`)
        }
        // Also revalidate sitemap
        revalidatePath('/sitemap.xml')
        revalidatedPaths.push('/sitemap.xml')
        break

      default:
        // For unknown types, revalidate homepage
        revalidatePath('/')
        revalidatedPaths.push('/')
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error parsing request body' },
      { status: 400 }
    )
  }
}
