'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFavoritesContext } from '@/lib/hooks/useFavoritesContext'
import { urlFor } from '@/lib/sanity/image'
import { Rating } from '@/components/ui/Rating'
import { FavoriteButton } from '@/components/FavoriteButton'

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavoritesContext()

  if (favorites.length === 0) {
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <h1 className="text-2xl font-bold text-foreground mb-2">No Favorites Yet</h1>
          <p className="text-text-secondary mb-6">
            Save your favorite casinos for quick access later.
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Favorites</h1>
          <p className="text-text-secondary">
            {favorites.length} casino{favorites.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <button
          onClick={clearFavorites}
          className="px-4 py-2 text-sm text-text-secondary hover:text-danger border border-border rounded-lg hover:border-danger/50 transition-all"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((casino) => (
          <div
            key={casino._id}
            className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover"
          >
            {/* Favorite button */}
            <div className="absolute top-4 right-4 z-10">
              <FavoriteButton casino={casino} />
            </div>

            <Link href={`/casinos/${casino.slug.current}`} className="block">
              <div className="relative p-6">
                <div className="flex items-start gap-4 mb-4">
                  {/* Logo with glow on hover */}
                  <div className="relative w-20 h-20 rounded-xl bg-elevated p-2 flex-shrink-0 group-hover:shadow-glow-primary transition-shadow duration-300">
                    {casino.logo ? (
                      <Image
                        src={urlFor(casino.logo).width(80).height(80).url()}
                        alt={`${casino.name} logo`}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {casino.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {casino.name}
                    </h3>
                    {casino.rating !== undefined && (
                      <Rating value={casino.rating} size="sm" />
                    )}
                  </div>
                </div>

                {casino.description && (
                  <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                    {casino.description}
                  </p>
                )}
              </div>
            </Link>

            {/* CTA Button */}
            <div className="px-6 pb-6">
              <a
                href={`/go/${casino.slug.current}`}
                className="block w-full text-center py-3 bg-gradient-gold text-background font-bold rounded-lg transition-all duration-300 hover:shadow-glow-accent transform hover:scale-[1.02]"
              >
                Visit Casino
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          href="/casinos"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          ← Browse More Casinos
        </Link>
      </div>
    </main>
  )
}
