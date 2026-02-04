import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { getCasinos } from '@/lib/sanity/queries/casino'
import { CasinoCard } from '@/components/CasinoCard'

// Trust badge component
function TrustBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-elevated rounded-full border border-border">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium text-text-secondary">{text}</span>
    </div>
  )
}

// Feature card component
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="group text-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300">
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow-primary transition-shadow">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-text-secondary text-sm">
        {description}
      </p>
    </div>
  )
}

// Step component for How It Works
function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-gradient-gold text-background font-bold text-xl rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
        {number}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  )
}

export default async function Home() {
  // Fetch featured casinos
  const { casinos } = await getCasinos({ featured: true, sort: 'rating' })
  const featuredCasinos = casinos.slice(0, 6)

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <Container className="relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-light">Trusted by 10,000+ players</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                Online Casino
              </span>
            </h1>

            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Expert reviews, exclusive bonuses, and trusted ratings to help you
              discover the best online casinos for real money gaming.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/casinos"
                className="px-8 py-4 bg-gradient-gold text-background font-bold rounded-lg transition-all duration-300 hover:shadow-glow-accent transform hover:scale-[1.02] text-lg"
              >
                View All Casinos
              </Link>
              <Link
                href="/bonuses"
                className="px-8 py-4 bg-card border border-border hover:border-primary text-foreground font-semibold rounded-lg transition-all duration-300 text-lg"
              >
                Browse Bonuses
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <TrustBadge icon="🔒" text="256-bit SSL" />
              <TrustBadge icon="🏛️" text="Licensed Casinos" />
              <TrustBadge icon="✓" text="Verified Reviews" />
              <TrustBadge icon="⚡" text="Fast Payouts" />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Casinos Section */}
      {featuredCasinos.length > 0 && (
        <section className="py-16 bg-card/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Top Rated Casinos
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Hand-picked casinos with the best bonuses, fastest payouts, and highest player ratings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredCasinos.map((casino, index) => (
                <CasinoCard key={casino._id} casino={casino} rank={index + 1} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/casinos"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                View All Casinos
                <span>→</span>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Casino Guide?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We do the research so you can focus on playing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🔍"
              title="Expert Reviews"
              description="In-depth analysis of every casino by experienced players who test deposits, games, and withdrawals."
            />
            <FeatureCard
              icon="🎁"
              title="Exclusive Bonuses"
              description="Access special welcome offers and no-deposit bonuses you won't find anywhere else."
            />
            <FeatureCard
              icon="🛡️"
              title="Safe & Licensed"
              description="Only regulated casinos with proven track records make our recommended list."
            />
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-card/50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Finding your perfect casino is easy with our simple 3-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-6 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

            <Step
              number={1}
              title="Browse Casinos"
              description="Explore our curated list of top-rated online casinos with detailed reviews."
            />
            <Step
              number={2}
              title="Compare Bonuses"
              description="Find the best welcome offers, free spins, and promotional deals."
            />
            <Step
              number={3}
              title="Start Playing"
              description="Sign up through our links and enjoy exclusive bonuses and rewards."
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Find Your Casino?
              </h2>
              <p className="text-text-secondary mb-8">
                Join thousands of players who trust Casino Guide to find the best online gambling experience.
              </p>
              <Link
                href="/casinos"
                className="inline-block px-8 py-4 bg-gradient-gold text-background font-bold rounded-lg transition-all duration-300 hover:shadow-glow-accent transform hover:scale-[1.02] text-lg animate-pulse-glow"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Responsible Gambling Notice */}
      <section className="py-8 border-t border-border">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <span className="text-3xl">🔞</span>
            <p className="text-sm text-text-muted max-w-2xl">
              <strong className="text-text-secondary">Gamble Responsibly.</strong> Gambling should be entertaining.
              Remember that you always risk losing the money you bet, so do not spend more than you can afford to lose.
              If you think you may have a problem, click <Link href="/responsible-gambling" className="text-primary hover:underline">here</Link>.
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
