import Link from 'next/link'
import { Container } from './Container'

const footerLinks = {
  casinos: [
    { href: '/casinos', label: 'All Casinos' },
    { href: '/bonuses', label: 'Bonuses' },
    { href: '/countries', label: 'By Country' },
    { href: '/payment-methods', label: 'Payment Methods' },
  ],
  info: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/responsible-gambling', label: 'Responsible Gambling' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 mt-auto">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl">🎰</span>
              <span className="text-xl font-bold text-primary">Casino</span>
              <span className="text-xl font-bold text-foreground">Guide</span>
            </Link>
            <p className="text-sm text-text-secondary mb-4">
              Your trusted guide to online casinos and bonuses.
            </p>
            {/* Trust badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <span>🔒</span>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <span>✓</span>
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Casinos */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Casinos</h3>
            <ul className="space-y-2">
              {footerLinks.casinos.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Responsible Gambling */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">🔞</span>
              <span className="text-sm text-text-muted">
                Gambling can be addictive. Please play responsibly.
              </span>
            </div>
            <p className="text-xs text-text-muted text-center md:text-right">
              © {new Date().getFullYear()} Casino Guide. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
