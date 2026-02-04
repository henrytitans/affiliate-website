import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPaymentMethodBySlug, getPaymentMethodSlugs } from '@/lib/sanity/queries/paymentMethod'
import { getCasinosByPaymentMethod } from '@/lib/sanity/queries/casino'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { CasinoCard } from '@/components/CasinoCard'
import { urlFor } from '@/lib/sanity/image'
import { paymentTypeLabels } from '@/lib/sanity/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const methods = await getPaymentMethodSlugs()
  return methods.map((m) => ({ slug: m.slug.current }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const method = await getPaymentMethodBySlug(slug)
  if (!method) return { title: 'Payment Method Not Found' }
  return {
    title: `${method.name} Casinos`,
    description: `Find online casinos that accept ${method.name}.`,
  }
}

export default async function PaymentMethodPage({ params }: PageProps) {
  const { slug } = await params
  const [method, casinos] = await Promise.all([
    getPaymentMethodBySlug(slug),
    getCasinosByPaymentMethod(slug),
  ])

  if (!method) notFound()

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <div className="max-w-3xl mb-8">
          <div className="flex items-start gap-6 mb-6">
            {method.logo ? (
              <Image
                src={urlFor(method.logo).width(80).height(80).url()}
                alt={method.name}
                width={80}
                height={80}
                className="rounded-lg"
              />
            ) : (
              <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center text-2xl font-bold text-zinc-400">
                {method.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{method.name}</h1>
              {method.type && <Badge className="mt-2">{paymentTypeLabels[method.type]}</Badge>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {method.processingTime && (
              <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
                <div className="text-sm text-zinc-500">Processing Time</div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-50">{method.processingTime}</div>
              </div>
            )}
            {method.fees && (
              <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
                <div className="text-sm text-zinc-500">Fees</div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-50">{method.fees}</div>
              </div>
            )}
          </div>

          {method.description && (
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{method.description}</p>
          )}
        </div>

        {/* Casinos accepting this payment method */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Casinos Accepting {method.name}
          </h2>
          {casinos.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-zinc-800 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-400">
                No casinos currently accept {method.name}.
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
