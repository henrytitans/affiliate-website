'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCompareContext } from '@/lib/hooks/useCompareContext'
import { urlFor } from '@/lib/sanity/image'
import { clsx } from 'clsx'

export function CompareDrawer() {
  const { casinos, count, isOpen, setIsOpen, removeFromCompare, clearCompare } = useCompareContext()

  if (count === 0) return null

  return (
    <>
      {/* Floating button when drawer is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-full shadow-glow-primary hover:scale-105 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span className="font-semibold">Compare ({count})</span>
        </button>
      )}

      {/* Drawer */}
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-foreground">Compare Casinos</h3>
            <span className="text-sm text-text-secondary">({count}/4 selected)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-sm text-text-secondary hover:text-danger transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-elevated transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Casino cards */}
        <div className="p-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {casinos.map((casino) => (
              <div
                key={casino._id}
                className="flex-shrink-0 relative bg-elevated rounded-xl p-4 min-w-[180px]"
              >
                <button
                  onClick={() => removeFromCompare(casino._id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-danger text-white rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="flex items-center gap-3">
                  {casino.logo ? (
                    <Image
                      src={urlFor(casino.logo).width(48).height(48).url()}
                      alt={casino.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                      <span className="font-bold text-primary">{casino.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground text-sm">{casino.name}</p>
                    {casino.rating !== undefined && (
                      <p className="text-xs text-accent">{casino.rating.toFixed(1)} / 5</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 4 - count }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex-shrink-0 bg-elevated/30 border-2 border-dashed border-border rounded-xl p-4 min-w-[180px] h-[76px] flex items-center justify-center"
              >
                <span className="text-sm text-text-muted">Add casino</span>
              </div>
            ))}
          </div>

          {/* Compare button */}
          {count >= 2 && (
            <div className="mt-4 flex justify-center">
              <Link
                href="/compare"
                className="px-8 py-3 bg-gradient-gold text-background font-bold rounded-lg hover:shadow-glow-accent hover:scale-105 transition-all"
              >
                Compare {count} Casinos
              </Link>
            </div>
          )}
          {count < 2 && (
            <p className="mt-4 text-center text-sm text-text-secondary">
              Select at least 2 casinos to compare
            </p>
          )}
        </div>
      </div>
    </>
  )
}
