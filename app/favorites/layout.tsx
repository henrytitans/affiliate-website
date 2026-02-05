import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: 'Your Favorites',
  description: 'View and manage your favorite casinos.',
  alternates: {
    canonical: `${siteUrl}/favorites`,
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
