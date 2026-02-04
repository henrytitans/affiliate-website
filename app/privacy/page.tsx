import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Casino Guide collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We collect information you provide directly to us, such as when you contact us or subscribe to our newsletter. This may include:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Email address (if you subscribe to our newsletter)</li>
                <li>Any information you provide in communications with us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                2. Automatically Collected Information
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>IP address and approximate location</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you updates and marketing communications (with your consent)</li>
                <li>Analyze website usage and trends</li>
                <li>Respond to your comments and questions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                4. Cookies and Tracking
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                5. Third-Party Links
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Our website contains links to third-party websites, including online casinos. We are not responsible for the privacy practices of these websites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                6. Affiliate Disclosure
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We participate in affiliate marketing programs. When you click on casino links on our website, we may earn a commission. This does not affect the information or recommendations we provide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                7. Data Security
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                8. Your Rights
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete your data. Contact us to exercise these rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                9. Contact Us
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                If you have questions about this Privacy Policy, please contact us through our website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
