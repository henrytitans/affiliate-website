# Architecture — Casino Affiliate Website

> Technical architecture reference. Read this before writing any code.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USERS                                       │
│                    (Visitors seeking casino info)                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         VERCEL EDGE NETWORK                              │
│                     (CDN + Edge Functions + SSL)                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
            │ Static HTML │  │  ISR Pages  │  │Edge Functions│
            │   (SSG)     │  │ (Revalidate)│  │  (/go/*)    │
            │             │  │             │  │             │
            │ - Detail    │  │ - Index     │  │ - Redirects │
            │   pages     │  │   pages     │  │ - Logging   │
            └─────────────┘  └─────────────┘  └─────────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           NEXT.JS APP                                    │
│                      (App Router + React 18)                             │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Layouts    │  │    Pages     │  │  Components  │  │     Lib      │ │
│  │              │  │              │  │              │  │              │ │
│  │ - Root       │  │ - /casinos   │  │ - UI         │  │ - Sanity     │ │
│  │ - Content    │  │ - /bonuses   │  │ - Blocks     │  │ - SEO        │ │
│  │              │  │ - /blog      │  │ - Formats    │  │ - Utils      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
            │   SANITY    │  │  POSTGRES   │  │   REDIS     │
            │   (CMS)     │  │  (Clicks)   │  │   (Cache)   │
            │             │  │             │  │             │
            │ - Content   │  │ - Analytics │  │ - Sessions  │
            │ - Media     │  │ - A/B tests │  │ - Geo data  │
            │ - Studio    │  │             │  │             │
            └─────────────┘  └─────────────┘  └─────────────┘
                 MVP            Phase 10         Future
```

---

## Folder Structure

```
ds-web/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (HTML shell)
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Global styles
│   ├── sitemap.ts                    # Dynamic sitemap
│   ├── robots.ts                     # Robots.txt
│   │
│   ├── (content)/                    # Route group for content pages
│   │   ├── casinos/
│   │   │   ├── page.tsx              # GET /casinos
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # GET /casinos/:slug
│   │   ├── bonuses/
│   │   │   ├── page.tsx              # GET /bonuses
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # GET /bonuses/:slug
│   │   ├── countries/
│   │   │   ├── page.tsx              # GET /countries
│   │   │   └── [code]/
│   │   │       └── page.tsx          # GET /countries/:code
│   │   ├── payment-methods/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── reviews/
│   │       └── [slug]/
│   │           └── page.tsx
│   │
│   ├── go/
│   │   └── [slug]/
│   │       └── route.ts              # Affiliate redirect (Edge)
│   │
│   ├── api/
│   │   ├── revalidate/
│   │   │   └── route.ts              # Sanity webhook
│   │   └── health/
│   │       └── route.ts              # Health check
│   │
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx              # Embedded Sanity Studio
│   │
│   └── [...slug]/
│       └── page.tsx                  # Catch-all for CMS pages
│
├── components/
│   ├── ui/                           # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Rating.tsx
│   │   └── index.ts                  # Barrel export
│   │
│   ├── layout/                       # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   ├── MobileMenu.tsx
│   │   └── index.ts
│   │
│   ├── blocks/                       # CMS block components
│   │   ├── Hero.tsx
│   │   ├── CasinoList.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── RichText.tsx
│   │   ├── ProsCons.tsx
│   │   ├── CTA.tsx
│   │   ├── FAQ.tsx
│   │   ├── InfoBox.tsx
│   │   ├── BlockRenderer.tsx         # Block type router
│   │   └── index.ts
│   │
│   ├── content/                      # Content type components
│   │   ├── CasinoCard.tsx
│   │   ├── CasinoDetail.tsx
│   │   ├── BonusCard.tsx
│   │   ├── BonusDetail.tsx
│   │   ├── CountryCard.tsx
│   │   ├── BlogCard.tsx
│   │   └── index.ts
│   │
│   └── formats/                      # Format variants
│       ├── default/
│       │   ├── CasinoCard.tsx
│       │   ├── CasinoList.tsx
│       │   ├── BonusCard.tsx
│       │   └── index.ts
│       ├── comparison/
│       │   ├── CasinoCard.tsx        # Table row version
│       │   ├── CasinoList.tsx        # Full table
│       │   └── index.ts
│       └── index.ts                  # Format registry
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts                 # Sanity client
│   │   ├── image.ts                  # Image URL builder
│   │   ├── queries/
│   │   │   ├── casino.ts             # Casino queries
│   │   │   ├── bonus.ts              # Bonus queries
│   │   │   ├── country.ts
│   │   │   ├── page.ts               # Generic page queries
│   │   │   └── index.ts
│   │   └── types.ts                  # TypeScript types
│   │
│   ├── seo/
│   │   ├── metadata.ts               # generateMetadata helpers
│   │   └── schema.ts                 # JSON-LD generators
│   │
│   ├── affiliate/
│   │   ├── links.ts                  # Link generation
│   │   └── tracking.ts               # Click tracking
│   │
│   ├── config.ts                     # Site configuration
│   └── utils.ts                      # Utility functions
│
├── sanity/
│   ├── schemas/
│   │   ├── documents/
│   │   │   ├── casino.ts
│   │   │   ├── bonus.ts
│   │   │   ├── country.ts
│   │   │   ├── paymentMethod.ts
│   │   │   ├── blogPost.ts
│   │   │   ├── review.ts
│   │   │   └── page.ts               # Generic page
│   │   ├── objects/
│   │   │   ├── seo.ts
│   │   │   ├── affiliateLink.ts
│   │   │   ├── rating.ts
│   │   │   ├── prosCons.ts
│   │   │   └── blocks/               # Block type schemas
│   │   │       ├── heroBlock.ts
│   │   │       ├── casinoListBlock.ts
│   │   │       ├── richTextBlock.ts
│   │   │       └── ...
│   │   └── index.ts                  # Schema registry
│   ├── sanity.config.ts
│   └── sanity.cli.ts
│
├── public/
│   └── images/
│
├── CLAUDE.md                         # AI instructions & rules
├── ARCHITECTURE.md                   # This file
├── EXECUTION_STEPS.md                # Build plan
├── .env.local                        # Environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Data Flow

### 1. Content Creation Flow

```
Editor creates/edits content in Sanity Studio
                    │
                    ▼
        Sanity stores in database
                    │
                    ▼
    Webhook triggers /api/revalidate
                    │
                    ▼
    Next.js revalidates affected paths
                    │
                    ▼
        New content served to users
```

### 2. Page Render Flow (SSG/ISR)

```
User requests /casinos/jackpot-city
                    │
                    ▼
    Vercel serves cached HTML (if exists)
            │               │
         (cache hit)    (cache miss or stale)
            │               │
            ▼               ▼
    Return HTML      Next.js page.tsx
                            │
                            ▼
                    getCasinoBySlug(slug)
                            │
                            ▼
                    Sanity GROQ query
                            │
                            ▼
                    Return data
                            │
                            ▼
                    Render components
                            │
                            ▼
                    Return HTML + cache
```

### 3. Affiliate Click Flow

```
User clicks "Visit Casino" button
            │
            ▼
    Link: /go/jackpot-city
            │
            ▼
    Edge function (route.ts)
            │
            ├── Log click data
            │   - casino slug
            │   - timestamp
            │   - referrer page
            │   - country (from IP)
            │
            ▼
    Fetch affiliateUrl from Sanity
            │
            ▼
    302 Redirect to casino
            │
            ▼
    User lands on casino site
    (with your tracking ID)
```

---

## Component Architecture

### Component Hierarchy

```
app/layout.tsx
└── Header
└── {children}                    # Page content
└── Footer

app/casinos/page.tsx
└── Container
    └── PageHeader
    └── IndexFilters              # Client component
    └── CasinoList
        └── CasinoCard[]
            └── Card
            └── Rating
            └── Button (CTA)
    └── Pagination

app/casinos/[slug]/page.tsx
└── Container
    └── CasinoDetail
        └── CasinoHeader
        └── ProsCons
        └── BonusTable
            └── BonusCard[]
        └── RichText (description)
        └── Button (main CTA)
```

### Component Rules

| Rule | Why |
|------|-----|
| Props over hardcoded values | Enables reuse |
| Server components by default | Better performance |
| Client components marked explicitly | Only when needed |
| No fetching in components | Fetch in page, pass as props |
| Types for all props | Catches errors early |

### Component Template

```tsx
// components/content/ExampleCard.tsx
import { Card } from '@/components/ui'
import type { Example } from '@/lib/sanity/types'

interface ExampleCardProps {
  example: Example
  variant?: 'default' | 'compact'
}

export function ExampleCard({ example, variant = 'default' }: ExampleCardProps) {
  return (
    <Card>
      <h3>{example.name}</h3>
      {/* Render based on data, never hardcode */}
    </Card>
  )
}
```

---

## Sanity Schema Patterns

### Document Type Template

```ts
// sanity/schemas/documents/example.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'example',
  title: 'Example',
  type: 'document',
  fields: [
    // Required fields
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),

    // Content fields
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    // References
    defineField({
      name: 'relatedItems',
      title: 'Related Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'otherType' }] }],
    }),

    // SEO (always include)
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
```

### Block Type Template

```ts
// sanity/schemas/objects/blocks/exampleBlock.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'exampleBlock',
  title: 'Example Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // Block-specific fields
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Example Block',
      subtitle: 'Example Block',
    }),
  },
})
```

---

## Query Patterns

### Standard Query File Structure

```ts
// lib/sanity/queries/example.ts
import { groq } from 'next-sanity'
import { client } from '../client'
import type { Example } from '../types'

// List query with filters
export async function getExamples(options?: {
  filter?: string
  sort?: 'name' | 'newest'
  page?: number
  perPage?: number
}): Promise<{ items: Example[]; total: number }> {
  const { filter, sort = 'name', page = 1, perPage = 12 } = options || {}

  const start = (page - 1) * perPage
  const end = start + perPage

  const conditions = ['_type == "example"', '!(_id in path("drafts.**"))']
  if (filter) conditions.push(filter)

  const filterStr = conditions.join(' && ')
  const sortStr = sort === 'newest' ? 'publishedAt desc' : 'name asc'

  const query = groq`{
    "items": *[${filterStr}] | order(${sortStr}) [${start}...${end}] {
      _id,
      name,
      slug,
      // ... fields needed for list view
    },
    "total": count(*[${filterStr}])
  }`

  return client.fetch(query)
}

// Single item query
export async function getExampleBySlug(slug: string): Promise<Example | null> {
  const query = groq`*[_type == "example" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    // ... all fields for detail view
    seo
  }`

  return client.fetch(query, { slug })
}

// For sitemap
export async function getAllExampleSlugs(): Promise<string[]> {
  const query = groq`*[_type == "example" && !(_id in path("drafts.**"))].slug.current`
  return client.fetch(query)
}
```

---

## Page Patterns

### Index Page Template

```tsx
// app/examples/page.tsx
import { getExamples } from '@/lib/sanity/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { ExampleCard } from '@/components/content'
import { Container } from '@/components/layout'

export const revalidate = 3600 // ISR: 1 hour

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Examples',
    description: 'Browse all examples',
    slug: 'examples',
  })
}

interface Props {
  searchParams: { sort?: string; page?: string }
}

export default async function ExamplesPage({ searchParams }: Props) {
  const { items, total } = await getExamples({
    sort: searchParams.sort as 'name' | 'newest',
    page: parseInt(searchParams.page || '1'),
  })

  return (
    <Container>
      <h1>Examples</h1>
      <div className="grid gap-4">
        {items.map((item) => (
          <ExampleCard key={item._id} example={item} />
        ))}
      </div>
    </Container>
  )
}
```

### Detail Page Template

```tsx
// app/examples/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getExampleBySlug, getAllExampleSlugs } from '@/lib/sanity/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { ExampleDetail } from '@/components/content'
import { Container } from '@/components/layout'

export async function generateStaticParams() {
  const slugs = await getAllExampleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await getExampleBySlug(params.slug)
  if (!item) return {}

  return generatePageMetadata({
    title: item.seo?.metaTitle || item.name,
    description: item.seo?.metaDescription || item.description,
    slug: `examples/${params.slug}`,
  })
}

export default async function ExamplePage({ params }: { params: { slug: string } }) {
  const item = await getExampleBySlug(params.slug)

  if (!item) {
    notFound()
  }

  return (
    <Container>
      <ExampleDetail example={item} />
    </Container>
  )
}
```

---

## Format Variant System

### How Formats Work

```ts
// components/formats/index.ts
import * as defaultFormat from './default'
import * as comparisonFormat from './comparison'

export const formats = {
  default: defaultFormat,
  comparison: comparisonFormat,
} as const

export type FormatKey = keyof typeof formats
export type Format = typeof formats[FormatKey]
```

### Using Formats

```tsx
// In a page or component
import { formats, FormatKey } from '@/components/formats'
import { siteConfig } from '@/lib/config'

// Get format from config or URL param
const formatKey: FormatKey = siteConfig.format
const { CasinoCard, CasinoList } = formats[formatKey]

// Use components normally
<CasinoList casinos={casinos} />
```

### Format Component Contract

Each format must export the same components with the same props:

```ts
// components/formats/[format]/index.ts
export { CasinoCard } from './CasinoCard'
export { CasinoList } from './CasinoList'
export { BonusCard } from './BonusCard'
export { Header } from './Header'
// ... etc

// Props must match across formats
interface CasinoCardProps {
  casino: Casino
  showRating?: boolean
  ctaText?: string
}
```

---

## Environment Variables

```bash
# .env.local

# Sanity (required)
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="sk-..."          # Server-only, for writes

# Site (required)
NEXT_PUBLIC_SITE_URL="https://yoursite.com"

# Format (optional)
SITE_FORMAT="default"              # or "comparison"

# Revalidation (required for webhooks)
REVALIDATION_SECRET="random-string"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-..."
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yoursite.com"

# Database (Phase 10+)
DATABASE_URL="postgres://..."
REDIS_URL="redis://..."
```

### Variable Naming Rules

| Prefix | Visibility | Use For |
|--------|------------|---------|
| `NEXT_PUBLIC_` | Client + Server | Public config, IDs |
| (none) | Server only | Secrets, tokens, URLs |

---

## SEO Implementation

### Metadata Generation

```ts
// lib/seo/metadata.ts
import { Metadata } from 'next'

interface SEOInput {
  title: string
  description: string
  slug: string
  ogImage?: string
  noIndex?: boolean
}

export function generatePageMetadata(input: SEOInput): Metadata {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${input.slug}`

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      type: 'website',
      images: input.ogImage ? [{ url: input.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
    },
    robots: input.noIndex ? { index: false } : undefined,
  }
}
```

### JSON-LD Schema

```ts
// lib/seo/schema.ts
export function generateCasinoSchema(casino: Casino) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: casino.name,
    url: casino.affiliateUrl,
    logo: casino.logo?.url,
    aggregateRating: casino.rating ? {
      '@type': 'AggregateRating',
      ratingValue: casino.rating.overall,
      bestRating: 5,
      worstRating: 0,
    } : undefined,
  }
}
```

---

## Performance Guidelines

### Caching Strategy

| Content Type | Strategy | Revalidate |
|--------------|----------|------------|
| Detail pages | SSG | On-demand (webhook) |
| Index pages | ISR | 1 hour |
| Homepage | ISR | 1 hour |
| Affiliate redirects | Edge, no cache | Never |
| API routes | No cache | Never |

### Image Optimization

```tsx
// Always use next/image
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

<Image
  src={urlFor(casino.logo).width(200).height(200).url()}
  alt={casino.name}
  width={200}
  height={200}
/>
```

### Bundle Size Rules

- No heavy libraries (moment.js, lodash full)
- Dynamic imports for non-critical components
- Analyze with `npm run build` output

---

## Security Checklist

| Item | Implementation |
|------|----------------|
| API keys server-only | No `NEXT_PUBLIC_` prefix for secrets |
| Input sanitization | Sanity handles, validate on forms |
| XSS prevention | React handles, no `dangerouslySetInnerHTML` |
| CSRF | Not applicable (no mutations from users) |
| Rate limiting | Vercel built-in + custom for /go/ |
| Content Security Policy | next.config.js headers |

---

## Quick Reference

### Add New Content Type

```
1. sanity/schemas/documents/[type].ts    # Schema
2. sanity/schemas/index.ts               # Register
3. lib/sanity/queries/[type].ts          # Queries
4. lib/sanity/types.ts                   # Types
5. app/[type]/page.tsx                   # Index
6. app/[type]/[slug]/page.tsx            # Detail
7. components/content/[Type]Card.tsx     # Card
8. app/sitemap.ts                        # Add to sitemap
```

### Add New Block Type

```
1. sanity/schemas/objects/blocks/[block].ts  # Schema
2. sanity/schemas/index.ts                   # Register
3. components/blocks/[Block].tsx             # Component
4. components/blocks/BlockRenderer.tsx       # Add case
```

### Add New Format

```
1. cp -r components/formats/default components/formats/[name]
2. Modify components in new folder
3. components/formats/index.ts           # Register
4. Test with SITE_FORMAT=[name]
```
