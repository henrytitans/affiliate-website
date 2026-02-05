import Link from 'next/link'
import { getCountries } from '@/lib/sanity/queries/country'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { legalStatusLabels } from '@/lib/sanity/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata = {
  title: 'Countries',
  description: 'Find online casinos available in your country.',
  alternates: {
    canonical: `${siteUrl}/countries`,
  },
  openGraph: {
    title: 'Countries | Casino Guide',
    description: 'Find online casinos available in your country.',
    url: `${siteUrl}/countries`,
    type: 'website' as const,
  },
}

export default async function CountriesPage() {
  const countries = await getCountries()

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Countries</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Find casinos available in your country.</p>

        {countries.length === 0 ? (
          <p className="text-zinc-500">No countries found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((country) => (
              <Link
                key={country._id}
                href={`/countries/${country.code.toLowerCase()}`}
                className="bg-white dark:bg-zinc-800 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-50">{country.name}</div>
                <div className="text-sm text-zinc-500">{country.code}</div>
                {country.legalStatus && (
                  <Badge variant={country.legalStatus === 'legal' ? 'success' : 'default'} className="mt-2">
                    {legalStatusLabels[country.legalStatus]}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
