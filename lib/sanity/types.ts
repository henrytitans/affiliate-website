export interface Casino {
  _id: string
  _type: 'casino'
  name: string
  slug: { current: string }
  logo?: { asset: { _ref: string } }
  description?: string
  rating?: number
  established?: number
  minDeposit?: number
  withdrawalTime?: string
  licenses?: string[]
  affiliateUrl?: string
  featured?: boolean
  publishedAt?: string
}

export interface Bonus {
  _id: string
  _type: 'bonus'
  title: string
  slug: { current: string }
  casino: Casino
  type: 'welcome' | 'reload' | 'freespins' | 'no-deposit' | 'cashback'
  value?: string
  wageringRequirement?: number
  minDeposit?: number
  code?: string
  description?: string
  terms?: string
  featured?: boolean
  publishedAt?: string
}

export interface Country {
  _id: string
  _type: 'country'
  name: string
  code: string
  flag?: { asset: { _ref: string } }
  legalStatus?: 'legal' | 'restricted' | 'prohibited' | 'unregulated'
  overview?: string
}

export interface PaymentMethod {
  _id: string
  _type: 'paymentMethod'
  name: string
  slug: { current: string }
  logo?: { asset: { _ref: string } }
  type?: 'card' | 'ewallet' | 'crypto' | 'bank' | 'prepaid'
  description?: string
  processingTime?: string
  fees?: string
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: { current: string }
  excerpt?: string
  body?: PortableTextBlock[] // PortableText content
  coverImage?: { asset: { _ref: string } }
  author?: string
  publishedAt?: string
}

export interface Review {
  _id: string
  _type: 'review'
  slug: { current: string }
  headline: string
  body?: PortableTextBlock[]
  author?: string
  verdict?: string
  lastTested?: string
  ratings?: {
    overall?: number
    games?: number
    support?: number
    payout?: number
    mobile?: number
  }
  pros?: string[]
  cons?: string[]
  casino: Casino
  seo?: SEO
  publishedAt?: string
}

// Block Types
export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: string
  children: { _type: 'span'; text: string; marks?: string[] }[]
  markDefs?: { _key: string; _type: string; href?: string; openInNewTab?: boolean }[]
}

export interface RichTextBlock {
  _type: 'richTextBlock'
  _key: string
  content: PortableTextBlock[]
}

export interface CTABlock {
  _type: 'ctaBlock'
  _key: string
  text: string
  url: string
  variant?: 'primary' | 'accent' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
}

export interface InfoBoxBlock {
  _type: 'infoBoxBlock'
  _key: string
  title?: string
  content: string
  variant?: 'info' | 'warning' | 'success' | 'danger'
}

export interface ProsConsBlock {
  _type: 'prosConsBlock'
  _key: string
  title?: string
  pros: string[]
  cons: string[]
}

export interface HeroBlock {
  _type: 'heroBlock'
  _key: string
  title: string
  subtitle?: string
  image?: { asset: { _ref: string } }
  imagePosition?: 'background' | 'right' | 'left'
  cta?: {
    text: string
    url: string
  }
  overlay?: boolean
}

export interface FAQItem {
  _key: string
  question: string
  answer: string
}

export interface FAQBlock {
  _type: 'faqBlock'
  _key: string
  title?: string
  items: FAQItem[]
}

export interface CasinoListBlock {
  _type: 'casinoListBlock'
  _key: string
  title?: string
  subtitle?: string
  displayMode: 'automatic' | 'manual'
  manualCasinos?: Casino[]
  filter?: 'all' | 'featured' | 'top-rated' | 'newest'
  limit?: number
  columns?: 2 | 3 | 4
  showViewAllLink?: boolean
}

export interface ComparisonTableBlock {
  _type: 'comparisonTableBlock'
  _key: string
  title?: string
  casinos: Casino[]
  columns?: ('rating' | 'bonus' | 'minDeposit' | 'payoutSpeed' | 'license')[]
  highlightWinner?: boolean
}

export type PageBlock =
  | HeroBlock
  | RichTextBlock
  | CasinoListBlock
  | ComparisonTableBlock
  | ProsConsBlock
  | CTABlock
  | FAQBlock
  | InfoBoxBlock

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: { asset: { _ref: string } }
  noIndex?: boolean
}

export interface Page {
  _id: string
  _type: 'page'
  title: string
  slug: { current: string }
  blocks?: PageBlock[]
  seo?: SEO
  publishedAt?: string
}

export const bonusTypeLabels: Record<Bonus['type'], string> = {
  welcome: 'Welcome Bonus',
  reload: 'Reload Bonus',
  freespins: 'Free Spins',
  'no-deposit': 'No Deposit',
  cashback: 'Cashback',
}

export const legalStatusLabels: Record<NonNullable<Country['legalStatus']>, string> = {
  legal: 'Legal',
  restricted: 'Restricted',
  prohibited: 'Prohibited',
  unregulated: 'Unregulated',
}

export const paymentTypeLabels: Record<NonNullable<PaymentMethod['type']>, string> = {
  card: 'Credit/Debit Card',
  ewallet: 'E-Wallet',
  crypto: 'Cryptocurrency',
  bank: 'Bank Transfer',
  prepaid: 'Prepaid',
}
