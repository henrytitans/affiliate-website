import { notFound } from 'next/navigation'
import { getCountryByCode, getCountryCodes } from '@/lib/sanity/queries/country'
import { getCasinosByCountry } from '@/lib/sanity/queries/casino'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { CasinoCard } from '@/components/CasinoCard'
import { legalStatusLabels } from '@/lib/sanity/types'

interface PageProps {
  params: Promise<{ code: string }>
}

export async function generateStaticParams() {
  const countries = await getCountryCodes()
  return countries.map((c) => ({ code: c.code.toLowerCase() }))
}

export async function generateMetadata({ params }: PageProps) {
  const { code } = await params
  const country = await getCountryByCode(code)
  if (!country) return { title: 'Country Not Found' }
  return {
    title: `Online Casinos in ${country.name}`,
    description: `Find the best online casinos accepting players from ${country.name}.`,
  }
}

export default async function CountryPage({ params }: PageProps) {
  const { code } = await params
  const [country, casinos] = await Promise.all([
    getCountryByCode(code),
    getCasinosByCountry(code),
  ])

  if (!country) notFound()

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <div className="max-w-3xl mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Online Casinos in {country.name}
          </h1>
          {country.legalStatus && (
            <Badge variant={country.legalStatus === 'legal' ? 'success' : 'warning'} className="mb-4">
              {legalStatusLabels[country.legalStatus]}
            </Badge>
          )}
          {country.overview && (
            <p className="text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">{country.overview}</p>
          )}
        </div>

        {/* Casinos accepting this country */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Casinos Accepting {country.name} Players
          </h2>
          {casinos.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-zinc-800 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-400">
                No casinos currently accept players from {country.name}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {casinos.map((casino) => (
                <CasinoCard key={casino._id} casino={casino} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  )
}
