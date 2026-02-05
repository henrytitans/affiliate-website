import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Casino Guide team. Questions, feedback, partnership inquiries, or content corrections — we respond within 24-48 hours.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Us | Casino Guide',
    description: 'Get in touch with the Casino Guide team for questions, feedback, or partnerships.',
    url: `${siteUrl}/contact`,
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
