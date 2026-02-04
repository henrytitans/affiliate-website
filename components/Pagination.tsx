'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface PaginationProps {
  basePath: string
  currentPage: number
  totalPages: number
}

export function Pagination({ basePath, currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    const query = params.toString()
    return `${basePath}${query ? `?${query}` : ''}`
  }

  const pages: (number | 'ellipsis')[] = []

  // Always show first page
  pages.push(1)

  // Show ellipsis if needed
  if (currentPage > 3) {
    pages.push('ellipsis')
  }

  // Show pages around current
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pages.includes(i)) {
      pages.push(i)
    }
  }

  // Show ellipsis if needed
  if (currentPage < totalPages - 2) {
    pages.push('ellipsis')
  }

  // Always show last page
  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages)
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-foreground bg-card border border-border rounded-lg hover:border-primary transition-all"
        >
          ← Previous
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-text-muted bg-card border border-border rounded-lg opacity-50">
          ← Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-text-muted">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                page === currentPage
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'text-text-secondary hover:text-foreground hover:bg-elevated'
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-foreground bg-card border border-border rounded-lg hover:border-primary transition-all"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-text-muted bg-card border border-border rounded-lg opacity-50">
          Next →
        </span>
      )}
    </nav>
  )
}
