import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Casino Guide and our mission to help players find the best online casinos.',
}

export default function AboutPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            About Casino Guide
          </h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Our Mission
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Casino Guide is dedicated to providing honest, comprehensive reviews of online casinos. Our goal is to help players make informed decisions about where to play by offering unbiased information, ratings, and comparisons.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                What We Do
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We thoroughly research and review online casinos, examining factors such as:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Licensing and regulation</li>
                <li>Game selection and software providers</li>
                <li>Bonus offers and wagering requirements</li>
                <li>Payment methods and withdrawal times</li>
                <li>Customer support quality</li>
                <li>Mobile compatibility</li>
                <li>Security and fair play measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Our Rating System
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We rate casinos on a scale of 1 to 5 stars, taking into account multiple factors including game variety, customer support, payment options, and overall user experience. Our ratings are updated regularly to reflect any changes in casino services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Independence and Transparency
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                While we have affiliate relationships with some casinos (meaning we may earn a commission when you sign up through our links), this never influences our reviews or ratings. We maintain editorial independence and always prioritize player interests.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Responsible Gambling
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We are committed to promoting responsible gambling. We encourage all visitors to gamble responsibly and within their means. If you or someone you know has a gambling problem, please seek help from professional organizations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Contact Us
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Have questions or feedback? We&apos;d love to hear from you. Visit our contact page to get in touch with our team.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
