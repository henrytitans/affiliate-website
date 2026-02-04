import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Casinos',
  description: 'Compare your selected casinos side-by-side to find the best option for you.',
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
