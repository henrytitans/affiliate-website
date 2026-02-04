import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Favorites',
  description: 'View and manage your favorite casinos.',
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
