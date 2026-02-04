'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCompareContext } from '@/lib/hooks/useCompareContext'
import { urlFor } from '@/lib/sanity/image'
import { Rating } from '@/components/ui/Rating'

export default function ComparePage() {
  const { casinos, removeFromCompare, clearCompare } = useCompareContext()

  if (casinos.length === 0) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto text-text-muted mb-4"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <h1 className="text-2xl font-bold text-foreground mb-2">No Casinos to Compare</h1>
          <p className="text-text-secondary mb-6">
            Add casinos to your compare list from the casino listings.
          </p>
          <Link
            href="/casinos"
            className="inline-block px-6 py-3 bg-gradient-gold text-background font-bold rounded-lg hover:shadow-glow-accent transition-all"
          >
            Browse Casinos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Compare Casinos</h1>
          <p className="text-text-secondary">
            Side-by-side comparison of {casinos.length} casinos
          </p>
        </div>
        <button
          onClick={clearCompare}
          className="px-4 py-2 text-sm text-text-secondary hover:text-danger border border-border rounded-lg hover:border-danger/50 transition-all"
        >
          Clear All
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header with casino logos */}
            <thead>
              <tr className="border-b border-border">
                <th className="p-6 text-left bg-elevated w-48">
                  <span className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                    Casino
                  </span>
                </th>
                {casinos.map((casino) => (
                  <th key={casino._id} className="p-6 text-center min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(casino._id)}
                        className="absolute -top-2 right-0 w-6 h-6 bg-danger text-white rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors text-xs"
                      >
                        ×
                      </button>
                      <div className="flex flex-col items-center">
                        {casino.logo ? (
                          <Image
                            src={urlFor(casino.logo).width(80).height(80).url()}
                            alt={casino.name}
                            width={80}
                            height={80}
                            className="rounded-xl mb-3"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-elevated rounded-xl flex items-center justify-center mb-3">
                            <span className="text-2xl font-bold text-primary">
                              {casino.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <Link
                          href={`/casinos/${casino.slug.current}`}
                          className="font-bold text-foreground hover:text-primary transition-colors"
                        >
                          {casino.name}
                        </Link>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Rating row */}
              <tr className="border-b border-border">
                <td className="p-6 bg-elevated">
                  <span className="font-medium text-foreground">Rating</span>
                </td>
                {casinos.map((casino) => (
                  <td key={casino._id} className="p-6 text-center">
                    {casino.rating !== undefined ? (
                      <div className="flex flex-col items-center gap-1">
                        <Rating value={casino.rating} size="sm" />
                        <span className="text-lg font-bold text-foreground">
                          {casino.rating.toFixed(1)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Min Deposit row */}
              <tr className="border-b border-border">
                <td className="p-6 bg-elevated">
                  <span className="font-medium text-foreground">Min Deposit</span>
                </td>
                {casinos.map((casino) => (
                  <td key={casino._id} className="p-6 text-center">
                    {casino.minDeposit ? (
                      <span className="text-lg font-semibold text-foreground">
                        ${casino.minDeposit}
                      </span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Withdrawal Time row */}
              <tr className="border-b border-border">
                <td className="p-6 bg-elevated">
                  <span className="font-medium text-foreground">Withdrawal Time</span>
                </td>
                {casinos.map((casino) => (
                  <td key={casino._id} className="p-6 text-center">
                    {casino.withdrawalTime ? (
                      <span className="text-foreground">{casino.withdrawalTime}</span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Established row */}
              <tr className="border-b border-border">
                <td className="p-6 bg-elevated">
                  <span className="font-medium text-foreground">Established</span>
                </td>
                {casinos.map((casino) => (
                  <td key={casino._id} className="p-6 text-center">
                    {casino.established ? (
                      <span className="text-foreground">{casino.established}</span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Featured row */}
              <tr className="border-b border-border">
                <td className="p-6 bg-elevated">
                  <span className="font-medium text-foreground">Featured</span>
                </td>
                {casinos.map((casino) => (
                  <td key={casino._id} className="p-6 text-center">
                    {casino.featured ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Yes
                      </span>
                    ) : (
                      <span className="text-text-muted">No</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* CTA row */}
              <tr>
                <td className="p-6 bg-elevated">
                  <span className="font-medium text-foreground">Visit</span>
                </td>
                {casinos.map((casino) => (
                  <td key={casino._id} className="p-6 text-center">
                    <a
                      href={`/go/${casino.slug.current}`}
                      className="inline-block px-6 py-3 bg-gradient-gold text-background font-bold rounded-lg hover:shadow-glow-accent hover:scale-105 transition-all"
                    >
                      Visit Casino
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          href="/casinos"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          ← Back to All Casinos
        </Link>
      </div>
    </main>
  )
}
