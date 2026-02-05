import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Best No ID Verification Online Casinos in Canada 2025',
  description: 'Discover the top no KYC verification casinos for Canadian players. Fast withdrawals, enhanced privacy, and instant registration without document uploads.',
}

// Casino data - in production, this would come from Sanity CMS
const featuredCasinos = [
  {
    name: 'TG Casino',
    bonus: '200% Rakeback up to 10 ETH + 50 Free Spins',
    highlight: 'Telegram Integration',
    pros: ['Seamless Telegram integration', 'Generous welcome bonus', 'Wide crypto support'],
    cons: ['Limited traditional payments', 'Requires Telegram familiarity'],
  },
  {
    name: 'WSM Casino',
    bonus: '200% Rakeback up to $25,000 + Free Spins',
    highlight: '5,000+ Games',
    pros: ['Massive game library', 'Comprehensive sportsbook', 'Multi-crypto support'],
    cons: ['No mobile app', 'Variable support response'],
  },
  {
    name: 'BC.Game',
    bonus: '120% First Deposit + Additional Bonuses',
    highlight: 'Community Driven',
    pros: ['8,000+ games', 'Active community features', 'Extensive crypto options'],
    cons: ['Complex interface', 'Detailed bonus terms'],
  },
  {
    name: 'Lucky Block',
    bonus: '200% up to €25,000 + 50 Free Spins',
    highlight: 'Sports & Casino',
    pros: ['Diverse game selection', 'Multi-crypto support', 'Substantial bonuses'],
    cons: ['No dedicated app', 'Variable support times'],
  },
  {
    name: 'Mega Dice',
    bonus: '200% up to 1 BTC + 50 Free Spins',
    highlight: 'Licensed Platform',
    pros: ['Wide game selection', 'Licensed & regulated', 'Crypto-friendly'],
    cons: ['No mobile app', 'Dense interface'],
  },
  {
    name: 'Wild.io',
    bonus: 'Up to 120% First Deposit + 75 Free Spins',
    highlight: 'Fast Payouts',
    pros: ['45+ game providers', '10-minute withdrawals', 'Mobile responsive'],
    cons: ['Crypto-only payments', 'Regional restrictions'],
  },
]

const paymentMethods = {
  deposits: [
    { category: 'Cryptocurrencies', methods: 'Bitcoin, Ethereum, Litecoin, USDT' },
    { category: 'E-Wallets', methods: 'Skrill, Interac, Instadebit' },
    { category: 'Cards', methods: 'Visa, MasterCard' },
    { category: 'Prepaid', methods: 'Paysafecard' },
  ],
  withdrawals: [
    { category: 'Cryptocurrencies', methods: 'Fast, secure, anonymous transactions' },
    { category: 'E-Wallets', methods: 'Quick processing, no verification' },
    { category: 'Bank Transfers', methods: 'Slower but widely accepted' },
  ],
}

const faqs = [
  {
    question: 'What is the KYC (Know Your Customer) process in casinos?',
    answer: 'KYC is a regulatory procedure used by casinos to verify player identities, prevent fraud, and ensure compliance with anti-money laundering laws.',
  },
  {
    question: 'Are No KYC Casinos legal in Canada?',
    answer: 'No KYC casinos operate in a legal grey area in Canada. While some provinces have strict regulations requiring verification, others have more relaxed policies. Always check your local regulations before playing.',
  },
  {
    question: 'How can I determine if a no ID casino is safe?',
    answer: 'Look for valid licensing from reputable authorities, positive user reviews, secure payment methods, and transparent terms and conditions.',
  },
  {
    question: 'Do no ID casinos in Canada offer bonuses?',
    answer: 'Yes, most no ID verification casinos offer competitive bonuses including welcome packages, deposit matches, and free spins.',
  },
  {
    question: 'What payment methods work best at no verification casinos?',
    answer: 'Cryptocurrencies are the preferred method as they offer inherent privacy and fast transactions. E-wallets like Skrill and Interac are also popular options.',
  },
]

export default function NoIdVerificationCasinosPage() {
  return (
    <div className="bg-background py-12">
      <Container>
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="premium" className="mb-4">Canada 2025</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Best No ID Verification Online Casinos
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Experience streamlined online gambling with enhanced privacy. Play instantly without
            lengthy document verification while enjoying fast withdrawals and anonymous transactions.
          </p>
        </section>

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The Rise of Privacy-Focused Gaming in Canada
            </h2>
            <p className="text-text-secondary mb-4">
              The Canadian online gambling landscape is evolving rapidly, with player convenience and privacy
              becoming paramount considerations. No ID verification casinos represent a significant shift in
              how players access online gaming platforms, offering immediate access without traditional
              documentation requirements.
            </p>
            <p className="text-text-secondary">
              These platforms have gained substantial popularity among Canadian players who value efficiency
              and discretion. By eliminating time-consuming verification procedures, players can focus on
              what matters most—enjoying their gaming experience with rapid access to winnings.
            </p>
          </div>
        </section>

        {/* Featured Casinos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Top-Rated No Verification Casinos for 2025
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCasinos.map((casino, index) => (
              <div
                key={casino.name}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-card-hover transition-all"
              >
                {index === 0 && (
                  <div className="absolute top-4 -right-8 bg-gradient-gold text-background text-xs font-bold px-10 py-1 rotate-45 shadow-lg z-10">
                    TOP PICK
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">{casino.name}</h3>
                    <Badge variant="default">{casino.highlight}</Badge>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
                    <p className="text-sm text-text-secondary mb-1">Welcome Bonus</p>
                    <p className="font-bold text-primary">{casino.bonus}</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-text-muted uppercase mb-2">Advantages</p>
                      <ul className="space-y-1">
                        {casino.pros.map((pro) => (
                          <li key={pro} className="text-sm text-text-secondary flex items-start gap-2">
                            <span className="text-success mt-0.5">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase mb-2">Considerations</p>
                      <ul className="space-y-1">
                        {casino.cons.map((con) => (
                          <li key={con} className="text-sm text-text-secondary flex items-start gap-2">
                            <span className="text-text-muted mt-0.5">−</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-gold text-background font-bold rounded-lg hover:shadow-glow-accent hover:scale-[1.02] transition-all">
                    Visit Casino
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Verification Exists */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Understanding Casino Verification Requirements
              </h2>
              <p className="text-text-secondary mb-4">
                Traditional online casinos implement Know Your Customer (KYC) and Anti-Money Laundering (AML)
                procedures as mandated by international regulatory frameworks. These protocols serve to prevent
                fraudulent activities and ensure platform integrity.
              </p>
              <p className="text-text-secondary mb-4">Standard verification typically requires:</p>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Government-issued identification (passport or national ID)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Proof of residence (utility bills or bank statements)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Payment method verification documentation
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                What Defines a No-Verification Casino?
              </h2>
              <p className="text-text-secondary mb-4">
                No-verification casinos allow players to register and participate without submitting
                identification documents. This streamlined approach appeals to privacy-conscious individuals
                who prefer not to share personal information with gaming platforms.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: 'Anonymity', desc: 'Play without exposing personal data' },
                  { label: 'Instant Access', desc: 'No document upload delays' },
                  { label: 'Fast Payouts', desc: 'Withdrawals processed quickly' },
                  { label: 'Accessibility', desc: 'Open to all eligible players' },
                ].map((item) => (
                  <div key={item.label} className="bg-elevated rounded-lg p-4">
                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Selection Criteria */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Our Evaluation Criteria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Security & Licensing',
                description: 'Valid licensing from reputable authorities and robust encryption technologies for secure transactions.',
                icon: '🔒',
              },
              {
                title: 'Game Selection',
                description: 'Extensive libraries featuring premium developers like NetEnt, Microgaming, and Evolution Gaming.',
                icon: '🎮',
              },
              {
                title: 'Bonus Quality',
                description: 'Competitive promotions with fair terms and reasonable wagering requirements.',
                icon: '🎁',
              },
              {
                title: 'Payment Options',
                description: 'Fast, secure methods including cryptocurrencies and e-wallets with minimal processing times.',
                icon: '💳',
              },
              {
                title: 'Reputation',
                description: 'Positive player reviews, transparent operations, and consistent customer satisfaction.',
                icon: '⭐',
              },
              {
                title: 'Support Quality',
                description: '24/7 customer assistance via multiple channels including live chat and email.',
                icon: '💬',
              },
            ].map((criteria) => (
              <div key={criteria.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                <div className="text-3xl mb-4">{criteria.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{criteria.title}</h3>
                <p className="text-sm text-text-secondary">{criteria.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Payment Methods at No Verification Casinos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="text-success">↓</span> Deposit Methods
              </h3>
              <div className="space-y-4">
                {paymentMethods.deposits.map((method) => (
                  <div key={method.category} className="bg-elevated rounded-lg p-4">
                    <p className="font-semibold text-foreground text-sm">{method.category}</p>
                    <p className="text-sm text-text-secondary">{method.methods}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="text-accent">↑</span> Withdrawal Methods
              </h3>
              <div className="space-y-4">
                {paymentMethods.withdrawals.map((method) => (
                  <div key={method.category} className="bg-elevated rounded-lg p-4">
                    <p className="font-semibold text-foreground text-sm">{method.category}</p>
                    <p className="text-sm text-text-secondary">{method.methods}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-danger/10 border border-danger/20 rounded-lg">
                <p className="text-sm text-text-secondary">
                  <strong className="text-danger">Note:</strong> Trustly, Zimpler, Swish, and Brite
                  are generally not available in Canada and require verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Game Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Popular Game Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Online Slots',
                description: 'Extensive slot libraries featuring titles like Starburst, Book of Dead, and Mega Moolah with diverse themes and jackpots.',
                games: '1000+ titles',
              },
              {
                title: 'Table Games',
                description: 'Classic casino favorites including blackjack, roulette, baccarat, and poker with multiple variations.',
                games: '100+ variants',
              },
              {
                title: 'Live Dealer',
                description: 'Immersive real-time gaming powered by Evolution Gaming with professional dealers and HD streaming.',
                games: '50+ tables',
              },
              {
                title: 'Instant Win',
                description: 'Quick-play options including scratch cards, lottery games, and crash games for immediate results.',
                games: '200+ games',
              },
            ].map((category) => (
              <div key={category.title} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all">
                <h3 className="text-lg font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{category.description}</p>
                <Badge variant="default">{category.games}</Badge>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Essential Guidelines for No Verification Gaming
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { tip: 'Verify Reputation', detail: 'Research player reviews and confirm valid licensing before registering.' },
                { tip: 'Use Secure Payments', detail: 'Opt for cryptocurrencies or established e-wallets for transactions.' },
                { tip: 'Review Bonus Terms', detail: 'Understand wagering requirements and game restrictions before claiming.' },
                { tip: 'Set Personal Limits', detail: 'Establish deposit and betting limits to maintain responsible gaming.' },
                { tip: 'Confirm Legality', detail: 'Ensure the casino operates legally in your province before playing.' },
                { tip: 'Protect Your Data', detail: 'Use strong passwords and enable two-factor authentication when available.' },
              ].map((item) => (
                <div key={item.tip} className="bg-card/50 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-foreground mb-1">{item.tip}</p>
                  <p className="text-sm text-text-secondary">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Advantages & Considerations
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-success/10 border border-success/30 rounded-xl p-8">
              <h3 className="text-xl font-bold text-success mb-6">Advantages</h3>
              <ul className="space-y-4">
                {[
                  { title: 'Instant Registration', desc: 'Begin playing immediately without document submission.' },
                  { title: 'Rapid Withdrawals', desc: 'Access winnings quickly without verification delays.' },
                  { title: 'Enhanced Privacy', desc: 'Maintain anonymity while enjoying your gaming experience.' },
                  { title: 'Streamlined Experience', desc: 'Eliminate bureaucratic procedures for seamless gameplay.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="text-success text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-danger/10 border border-danger/30 rounded-xl p-8">
              <h3 className="text-xl font-bold text-danger mb-6">Considerations</h3>
              <ul className="space-y-4">
                {[
                  { title: 'Limited Payment Options', desc: 'Some methods may be restricted without verification.' },
                  { title: 'Security Variations', desc: 'Platform security standards may differ from traditional casinos.' },
                  { title: 'Fewer Promotions', desc: 'Some bonuses may require verification to claim.' },
                  { title: 'Regulatory Uncertainty', desc: 'Legal status varies by province and jurisdiction.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="text-danger text-lg">!</span>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Experience Privacy-Focused Gaming?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Explore our curated selection of no verification casinos and enjoy instant access
              to thousands of games with enhanced privacy and rapid payouts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/casinos"
                className="px-8 py-4 bg-gradient-gold text-background font-bold rounded-lg hover:shadow-glow-accent hover:scale-105 transition-all"
              >
                Browse All Casinos
              </Link>
              <Link
                href="/bonuses"
                className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all"
              >
                View Latest Bonuses
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-12">
          <div className="bg-elevated rounded-xl p-6 text-center">
            <p className="text-sm text-text-muted">
              <strong>Disclaimer:</strong> Online gambling regulations vary by province in Canada.
              Please verify that online gambling is legal in your jurisdiction before participating.
              Always gamble responsibly and within your means. If you or someone you know has a
              gambling problem, please seek help from a professional organization.
            </p>
          </div>
        </section>
      </Container>
    </div>
  )
}
