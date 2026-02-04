'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development, could send to error tracking service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 min-h-[60vh] flex items-center">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl font-bold text-primary mb-4">500</div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Something went wrong
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            We apologize for the inconvenience. Please try again or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Go Home
            </Link>
          </div>
          {error.digest && (
            <p className="mt-8 text-xs text-zinc-400">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </Container>
    </div>
  )
}
