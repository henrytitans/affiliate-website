import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: 'Compare Casinos',
  description: 'Compare your selected casinos side-by-side to find the best option for you.',
  alternates: {
    canonical: `${siteUrl}/compare`,
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
