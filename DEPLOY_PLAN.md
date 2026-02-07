# Deployment Plan: Sanity + Vercel + Namecheap

## Overview

Deploy `ds-web` casino affiliate site with:
- **Sanity** — CMS backend (project ID: `l0odyljs`, already created)
- **Vercel** — Hosting (connected to GitHub: `henrytitans/affiliate-website`)
- **Namecheap** — Domain (purchase + DNS configuration)

---

## Pre-Deployment Checklist

- [ ] GitHub repo is up to date (`henrytitans/affiliate-website`, branch: `main`)
- [ ] `npm run build` passes locally
- [ ] Sanity project exists at sanity.io/manage (project `l0odyljs`)

---

## STEP 1: Sanity — Configure Project & CORS

**Goal:** Ensure the Sanity project is properly configured with CORS origins for both Vercel and the custom domain.

### 1.1 — Login to Sanity
1. Navigate to `https://sanity.io/manage`
2. Login (or create account if needed)
3. Select project `l0odyljs` ("Casino Affiliate" or similar)

### 1.2 — Verify Dataset
1. Go to **Datasets** tab
2. Confirm `production` dataset exists
3. If not, create it (name: `production`, visibility: public)

### 1.3 — Create API Token
1. Go to **API** tab > **Tokens**
2. Click **Add API Token**
3. Name: `Vercel Production`
4. Permissions: **Editor** (needed for revalidation webhook)
5. **Save the token** — copy it, we'll need it for Vercel env vars

### 1.4 — Add CORS Origins
1. Go to **API** tab > **CORS Origins**
2. Add these origins (we'll update the domain one after Namecheap setup):
   - `https://*.vercel.app` — Allow credentials: YES
   - `http://localhost:3000` — Allow credentials: YES
   - (After domain is known) `https://yourdomain.com` — Allow credentials: YES

### 1.5 — Set Up Webhook for Revalidation
1. Go to **API** tab > **Webhooks**
2. Click **Create Webhook**
3. Settings:
   - Name: `Vercel Revalidation`
   - URL: `https://<your-vercel-domain>/api/revalidate?secret=<REVALIDATION_SECRET>` (update after Vercel deploy)
   - Dataset: `production`
   - Trigger on: **Create**, **Update**, **Delete**
   - Filter: (leave empty for all document types)
   - Projection: `{_type, _id, slug}`
   - HTTP method: POST
   - API version: `2024-01-01`
   - Enabled: YES
4. NOTE: We'll come back to update the URL after getting the Vercel domain

---

## STEP 2: Vercel — Import & Deploy Project

**Goal:** Deploy the Next.js app on Vercel, configure environment variables, and get the production URL.

### 2.1 — Import Project
1. Navigate to `https://vercel.com/dashboard`
2. Login (use GitHub account for easiest setup)
3. Click **Add New** > **Project**
4. Select **Import Git Repository**
5. Find and select `henrytitans/affiliate-website`
6. Framework Preset: **Next.js** (should auto-detect)
7. Root Directory: `.` (default)
8. **Do NOT click Deploy yet** — configure env vars first

### 2.2 — Configure Environment Variables
Before deploying, add these environment variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `l0odyljs` | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
| `SANITY_API_TOKEN` | (token from Step 1.3) | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` (update after Namecheap) | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://<project>.vercel.app` | Preview |
| `REVALIDATION_SECRET` | (generate a strong random string, e.g. `openssl rand -hex 32`) | Production, Preview |
| `SITE_FORMAT` | `default` | Production, Preview, Development |

### 2.3 — Deploy
1. Click **Deploy**
2. Wait for build to complete
3. Note the production URL: `https://<project-name>.vercel.app`
4. Verify the site loads at the Vercel URL
5. Check these routes work:
   - `/` — Homepage
   - `/casinos` — Casino index
   - `/bonuses` — Bonus index
   - `/studio` — Sanity Studio (should load CMS interface)
   - `/sitemap.xml` — Should generate XML
   - `/robots.txt` — Should show crawl rules

### 2.4 — Verify Build Settings
In Vercel project settings, confirm:
- Build Command: `next build` (or `npm run build`)
- Output Directory: `.next`
- Install Command: `npm install`
- Node.js Version: 18.x or 20.x

---

## STEP 3: Namecheap — Purchase Domain & Configure DNS

**Goal:** Buy a domain and point it to Vercel.

### 3.1 — Purchase Domain
1. Navigate to `https://www.namecheap.com`
2. Search for desired domain name
3. Purchase the domain
4. Disable auto-renew add-ons (WhoisGuard is fine to keep free)

### 3.2 — Configure DNS for Vercel
There are two options. **Option A (Recommended): Use Vercel DNS**

#### Option A: Point Nameservers to Vercel
1. In Vercel: Go to project **Settings** > **Domains**
2. Add the custom domain (e.g., `yourdomain.com`)
3. Vercel will show nameservers or DNS records to configure
4. If Vercel provides nameservers, go to Namecheap:
   - Go to **Domain List** > click **Manage** on your domain
   - Under **Nameservers**, select **Custom DNS**
   - Enter Vercel's nameservers (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
   - Save changes

#### Option B: Use Namecheap DNS with CNAME/A Records
If keeping Namecheap DNS:
1. In Vercel: Go to project **Settings** > **Domains**
2. Add domain `yourdomain.com`
3. Vercel will show required DNS records
4. In Namecheap: Go to **Domain List** > **Manage** > **Advanced DNS**
5. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | Automatic |
| CNAME | www | `cname.vercel-dns.com.` | Automatic |

(Vercel may provide different values — use what they show)

### 3.3 — Add Domain in Vercel
1. Go to Vercel project > **Settings** > **Domains**
2. Add `yourdomain.com`
3. Add `www.yourdomain.com` (redirect to apex or vice versa)
4. Choose redirect preference:
   - Recommended: `www.yourdomain.com` redirects to `yourdomain.com`
5. Wait for DNS propagation (can take up to 48 hours, usually 5-30 minutes)
6. Vercel will auto-provision SSL certificate once DNS resolves

### 3.4 — Verify Domain
1. Wait for green checkmark next to domain in Vercel dashboard
2. Visit `https://yourdomain.com` — site should load
3. Visit `https://www.yourdomain.com` — should redirect to apex
4. Check SSL lock icon in browser

---

## STEP 4: Post-Deploy Configuration

**Goal:** Wire everything together with the final domain.

### 4.1 — Update Vercel Environment Variables
1. Go to Vercel project > **Settings** > **Environment Variables**
2. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com`
3. Trigger a redeploy (Settings > Deployments > Redeploy latest)

### 4.2 — Update Sanity CORS
1. Go to `https://sanity.io/manage` > project > **API** > **CORS Origins**
2. Add: `https://yourdomain.com` — Allow credentials: YES
3. Add: `https://www.yourdomain.com` — Allow credentials: YES (if applicable)

### 4.3 — Update Sanity Webhook URL
1. Go to Sanity manage > **API** > **Webhooks**
2. Edit the "Vercel Revalidation" webhook
3. Update URL to: `https://yourdomain.com/api/revalidate?secret=<REVALIDATION_SECRET>`
4. Save

### 4.4 — Test Sanity Studio on Production
1. Visit `https://yourdomain.com/studio`
2. Login to Sanity Studio
3. Verify you can see all content types: Casino, Bonus, Review, Country, Payment Method, Blog Post, Page
4. Create a test casino entry and verify it appears on the site after revalidation

### 4.5 — Verify Revalidation Webhook
1. In Sanity Studio, edit a casino entry (e.g., change a description)
2. Publish the change
3. Wait 5-10 seconds
4. Reload the casino's page on the live site
5. Verify the change appears (if ISR cache not yet expired)
6. Check Sanity webhook logs for successful delivery

---

## STEP 5: Final Verification Checklist

Run through each of these after deployment is complete:

### Pages Load
- [ ] `https://yourdomain.com` — Homepage
- [ ] `https://yourdomain.com/casinos` — Casino index
- [ ] `https://yourdomain.com/bonuses` — Bonus index
- [ ] `https://yourdomain.com/countries` — Country index
- [ ] `https://yourdomain.com/payment-methods` — Payment methods
- [ ] `https://yourdomain.com/blog` — Blog index
- [ ] `https://yourdomain.com/compare` — Compare page
- [ ] `https://yourdomain.com/favorites` — Favorites page
- [ ] `https://yourdomain.com/contact` — Contact page
- [ ] `https://yourdomain.com/about` — About page
- [ ] `https://yourdomain.com/privacy` — Privacy policy
- [ ] `https://yourdomain.com/terms` — Terms of service

### SEO & Technical
- [ ] `https://yourdomain.com/sitemap.xml` — Sitemap generates with correct domain
- [ ] `https://yourdomain.com/robots.txt` — Robots file shows correct sitemap URL
- [ ] Meta tags have correct canonical URLs (view source, search for `canonical`)
- [ ] OG tags show correct domain
- [ ] SSL certificate is active (green lock)
- [ ] HTTPS redirect works (http:// redirects to https://)
- [ ] www redirect works (www. redirects to apex or vice versa)

### Sanity CMS
- [ ] `https://yourdomain.com/studio` — Studio loads and can login
- [ ] Can create/edit/publish content
- [ ] Webhook fires on publish (check Sanity webhook logs)
- [ ] Content changes appear on live site after webhook

### Affiliate System
- [ ] `/go/[slug]` redirects work when casinos have affiliate URLs set

---

## STEP 6: Google Search Console (Optional but Recommended)

### 6.1 — Add Property
1. Go to `https://search.google.com/search-console`
2. Add property > **URL prefix** > `https://yourdomain.com`
3. Verify via **DNS TXT record** method:
   - Copy the TXT record value Google provides
   - If using Vercel DNS: Add TXT record in Vercel Domains settings
   - If using Namecheap DNS: Add TXT record in Namecheap Advanced DNS

### 6.2 — Submit Sitemap
1. In Search Console > **Sitemaps**
2. Enter `sitemap.xml`
3. Click **Submit**

---

## Environment Variables Summary

Final production `.env` values (set in Vercel dashboard, NOT in code):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=l0odyljs
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<from Sanity manage>
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
REVALIDATION_SECRET=<random 64-char hex string>
SITE_FORMAT=default
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on Vercel | Check build logs, ensure all env vars are set |
| Sanity Studio won't load | Check CORS origins include your domain |
| Content not updating | Check webhook URL and secret match, check Sanity webhook logs |
| Domain not resolving | Wait for DNS propagation (up to 48h), verify DNS records |
| SSL not working | Vercel auto-provisions SSL once DNS resolves — just wait |
| 404 on dynamic pages | Ensure Sanity has content published (not drafts) |
| Images not loading | Check `next.config.ts` has `cdn.sanity.io` in `remotePatterns` |
| Studio auth failing | Ensure CORS for your domain has credentials enabled |

---

## Order of Operations (Quick Reference)

```
1. Sanity: Verify project, create API token, add CORS origins
2. Vercel: Import repo, set env vars, deploy
3. Namecheap: Buy domain, configure DNS records
4. Vercel: Add custom domain, wait for SSL
5. Update: NEXT_PUBLIC_SITE_URL env var, Sanity CORS, Sanity webhook URL
6. Verify: All pages, SEO, Studio, webhooks
7. Optional: Google Search Console
```
