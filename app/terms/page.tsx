import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Casino Guide website.',
}

export default function TermsPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                By accessing and using Casino Guide, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                2. Age Requirement
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                You must be at least 18 years old (or the legal gambling age in your jurisdiction, whichever is higher) to use this website. By using our services, you confirm that you meet this age requirement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                3. Information Purpose
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                The content on Casino Guide is for informational and entertainment purposes only. We provide reviews, comparisons, and information about online casinos, but we do not operate any gambling services ourselves.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                4. No Gambling Advice
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Nothing on this website constitutes gambling advice. Our reviews and ratings are based on our research and opinions. You should always conduct your own research before deciding to gamble at any online casino.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                5. Affiliate Relationships
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We have affiliate relationships with some of the casinos featured on our website. This means we may earn a commission when you click on links and register or make deposits. These relationships do not influence the honesty of our reviews.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                6. Third-Party Websites
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Our website contains links to third-party websites. We are not responsible for the content, accuracy, or practices of these websites. Your use of third-party websites is at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                7. Accuracy of Information
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy of all content. Casino terms, bonuses, and conditions change frequently. Always verify information directly with the casino before playing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Casino Guide shall not be liable for any losses, damages, or harm arising from your use of our website or your gambling activities at third-party casinos. Gambling involves risk, and you should only gamble with money you can afford to lose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                9. Intellectual Property
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                All content on this website, including text, graphics, logos, and images, is the property of Casino Guide or its content suppliers. You may not reproduce, distribute, or use our content without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                11. Governing Law
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved in the appropriate courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                12. Contact
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                If you have questions about these Terms of Service, please contact us through our website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
