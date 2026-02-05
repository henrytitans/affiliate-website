import Link from 'next/link'
import Image from 'next/image'
import { getPaymentMethods } from '@/lib/sanity/queries/paymentMethod'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { urlFor } from '@/lib/sanity/image'
import { paymentTypeLabels } from '@/lib/sanity/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata = {
  title: 'Payment Methods',
  description: 'Find casinos by payment method - cards, e-wallets, crypto, and more.',
  alternates: {
    canonical: `${siteUrl}/payment-methods`,
  },
  openGraph: {
    title: 'Payment Methods | Casino Guide',
    description: 'Find casinos by payment method - cards, e-wallets, crypto, and more.',
    url: `${siteUrl}/payment-methods`,
    type: 'website' as const,
  },
}

export default async function PaymentMethodsPage() {
  const methods = await getPaymentMethods()

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Payment Methods</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Find casinos by your preferred payment method.</p>

        {methods.length === 0 ? (
          <p className="text-zinc-500">No payment methods found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methods.map((method) => (
              <Link
                key={method._id}
                href={`/payment-methods/${method.slug.current}`}
                className="bg-white dark:bg-zinc-800 p-6 rounded-lg hover:shadow-md transition-shadow flex items-start gap-4"
              >
                {method.logo ? (
                  <Image
                    src={urlFor(method.logo).width(48).height(48).url()}
                    alt={method.name}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded flex items-center justify-center text-lg font-bold text-zinc-400">
                    {method.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-50">{method.name}</div>
                  {method.type && <Badge className="mt-1">{paymentTypeLabels[method.type]}</Badge>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
