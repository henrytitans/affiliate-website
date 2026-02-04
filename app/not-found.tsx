import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export default function NotFound() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 min-h-[60vh] flex items-center">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Page Not Found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/casinos"
              className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Browse Casinos
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
