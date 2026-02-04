import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getReviewBySlug, getReviewSlugs } from '@/lib/sanity/queries/review'
import { Container } from '@/components/layout/Container'
import { Rating } from '@/components/ui/Rating'
import { RichText } from '@/components/blocks/RichText'
import { urlFor } from '@/lib/sanity/image'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const reviews = await getReviewSlugs()
  return reviews.map((r) => ({ slug: r.slug.current }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const review = await getReviewBySlug(slug)
  if (!review) return { title: 'Review Not Found' }

  return {
    title: review.seo?.metaTitle || `${review.casino.name} Review`,
    description: review.seo?.metaDescription || review.verdict || `Read our detailed review of ${review.casino.name}.`,
  }
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params
  const review = await getReviewBySlug(slug)

  if (!review) notFound()

  const { casino, ratings } = review

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Casino Logo */}
              <div className="flex-shrink-0">
                {casino.logo ? (
                  <Image
                    src={urlFor(casino.logo).width(120).height(120).url()}
                    alt={casino.name}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center text-4xl font-bold text-zinc-400">
                    {casino.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Title & Meta */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  {review.headline}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  {review.author && <span>By {review.author}</span>}
                  {review.lastTested && (
                    <span>Last tested: {new Date(review.lastTested).toLocaleDateString()}</span>
                  )}
                </div>
                {ratings?.overall && (
                  <div className="flex items-center gap-2 mt-3">
                    <Rating value={ratings.overall} />
                    <span className="font-bold text-zinc-900 dark:text-zinc-50">
                      {ratings.overall.toFixed(1)}/5
                    </span>
                  </div>
                )}
              </div>

              {/* CTA */}
              {casino.affiliateUrl && (
                <Link
                  href={`/go/${casino.slug.current}`}
                  className="px-6 py-3 bg-accent hover:bg-accent-dark text-zinc-900 font-semibold rounded-lg transition-colors text-center"
                >
                  Visit {casino.name}
                </Link>
              )}
            </div>
          </div>

          {/* Detailed Ratings */}
          {ratings && (
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Detailed Ratings
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {ratings.overall !== undefined && (
                  <RatingItem label="Overall" value={ratings.overall} />
                )}
                {ratings.games !== undefined && (
                  <RatingItem label="Games" value={ratings.games} />
                )}
                {ratings.support !== undefined && (
                  <RatingItem label="Support" value={ratings.support} />
                )}
                {ratings.payout !== undefined && (
                  <RatingItem label="Payouts" value={ratings.payout} />
                )}
                {ratings.mobile !== undefined && (
                  <RatingItem label="Mobile" value={ratings.mobile} />
                )}
              </div>
            </div>
          )}

          {/* Verdict */}
          {review.verdict && (
            <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Our Verdict
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300">{review.verdict}</p>
            </div>
          )}

          {/* Pros & Cons */}
          {(review.pros?.length || review.cons?.length) && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {review.pros && review.pros.length > 0 && (
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-success mb-4 flex items-center gap-2">
                    <span className="text-xl">✓</span> Pros
                  </h3>
                  <ul className="space-y-2">
                    {review.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                        <span className="text-success mt-1">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {review.cons && review.cons.length > 0 && (
                <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-danger mb-4 flex items-center gap-2">
                    <span className="text-xl">✗</span> Cons
                  </h3>
                  <ul className="space-y-2">
                    {review.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                        <span className="text-danger mt-1">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Review Body */}
          {review.body && (
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 shadow-sm mb-8">
              <RichText value={review.body} />
            </div>
          )}

          {/* Bottom CTA */}
          {casino.affiliateUrl && (
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 shadow-sm text-center">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Ready to Play at {casino.name}?
              </h2>
              <Link
                href={`/go/${casino.slug.current}`}
                className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-zinc-900 font-semibold rounded-lg transition-colors text-lg"
              >
                Visit Casino Now
              </Link>
            </div>
          )}
        </article>
      </Container>
    </div>
  )
}

function RatingItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value.toFixed(1)}</div>
      <div className="text-sm text-zinc-500">{label}</div>
      <div className="mt-1">
        <Rating value={value} size="sm" />
      </div>
    </div>
  )
}
