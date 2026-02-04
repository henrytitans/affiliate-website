import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Responsible Gambling',
  description: 'Information about responsible gambling practices and resources for help.',
}

export default function ResponsibleGamblingPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            Responsible Gambling
          </h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
              <p className="text-amber-800 dark:text-amber-200 font-medium mb-0">
                Gambling should be entertaining, not a way to make money. If gambling stops being fun, it&apos;s time to stop.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Tips for Safe Gambling
              </h2>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-3">
                <li><strong>Set a budget</strong> — Decide how much you can afford to lose before you start playing, and stick to it.</li>
                <li><strong>Set time limits</strong> — Decide how long you&apos;ll play and use casino tools to track your time.</li>
                <li><strong>Don&apos;t chase losses</strong> — If you&apos;re losing, don&apos;t try to win it back by betting more.</li>
                <li><strong>Don&apos;t gamble when emotional</strong> — Avoid gambling when you&apos;re stressed, depressed, or upset.</li>
                <li><strong>Take breaks</strong> — Step away regularly to maintain perspective.</li>
                <li><strong>Balance gambling with other activities</strong> — Ensure gambling doesn&apos;t become your only hobby.</li>
                <li><strong>Never borrow money to gamble</strong> — Only gamble with money you can afford to lose.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Signs of Problem Gambling
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                If you recognize any of these signs in yourself or someone you know, it may be time to seek help:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Spending more money or time on gambling than intended</li>
                <li>Feeling restless or irritable when trying to stop gambling</li>
                <li>Trying to win back money you&apos;ve lost (chasing losses)</li>
                <li>Lying to family or friends about gambling habits</li>
                <li>Borrowing money or selling possessions to gamble</li>
                <li>Neglecting work, school, or family responsibilities</li>
                <li>Gambling to escape problems or relieve feelings of helplessness</li>
                <li>Feeling anxious, depressed, or guilty about gambling</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Self-Exclusion Tools
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Most reputable online casinos offer tools to help you control your gambling:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li><strong>Deposit limits</strong> — Set daily, weekly, or monthly deposit limits</li>
                <li><strong>Loss limits</strong> — Cap the amount you can lose in a period</li>
                <li><strong>Session time limits</strong> — Get alerts after a set playing time</li>
                <li><strong>Reality checks</strong> — Receive reminders of how long you&apos;ve been playing</li>
                <li><strong>Self-exclusion</strong> — Block yourself from the casino for a set period</li>
                <li><strong>Cool-off periods</strong> — Take a short break from gambling</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Get Help
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                If you or someone you know needs help with problem gambling, these organizations provide free, confidential support:
              </p>

              <div className="grid gap-4 not-prose">
                <a
                  href="https://www.gamblersanonymous.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Gamblers Anonymous</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">International fellowship of people with gambling problems</p>
                </a>

                <a
                  href="https://www.ncpgambling.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">National Council on Problem Gambling (US)</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Call 1-800-522-4700 for 24/7 confidential help</p>
                </a>

                <a
                  href="https://www.begambleaware.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">BeGambleAware (UK)</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Free advice and support for anyone affected by gambling</p>
                </a>

                <a
                  href="https://www.gamblingtherapy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Gambling Therapy</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Global service offering free online support</p>
                </a>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Underage Gambling
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Online gambling is strictly for adults. The minimum age is typically 18 or 21 depending on your jurisdiction. We encourage parents to use parental control software to prevent minors from accessing gambling sites.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
