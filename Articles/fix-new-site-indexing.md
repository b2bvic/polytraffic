---

---
title:: How to Get a New Site Indexed by Google in 48 Hours
description:: New site stuck in Google's crawl queue? Skip the "just wait" advice. These 10 specific actions force discovery and indexing within 48 hours. Step-by-step.
focus_keyword:: fix new site indexing
category:: indexing
author:: Victor Valentine Romo
date:: 2026.03.20

# How to Get a New Site Indexed by Google in 48 Hours

> **Quick Summary**
> - **What this covers:** fix-new-site-indexing
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why New Sites Take So Long (And How to Skip the Queue)](#why-new-sites-take-so-long-and-how-to-skip-the-queue)
- [Pre-Launch Checklist (Do This Before Everything Else)](#pre-launch-checklist-do-this-before-everything-else)
- [Hour 1: Direct Google Notification](#hour-1-direct-google-notification)
- [Hour 2-6: Build Discovery Signals](#hour-2-6-build-discovery-signals)
- [Hour 6-24: Advanced Acceleration](#hour-6-24-advanced-acceleration)
- [Hour 24-48: Monitor and Troubleshoot](#hour-24-48-monitor-and-troubleshoot)
- [Timeline Expectations](#timeline-expectations)
- [Content Strategy for New Site Indexing](#content-strategy-for-new-site-indexing)
- [New Site Indexing Mistakes to Avoid](#new-site-indexing-mistakes-to-avoid)
- [Post-Indexing: Accelerate Full-Site Crawling](#post-indexing-accelerate-full-site-crawling)
- [48 Hours, Not 12 Weeks](#48-hours-not-12-weeks)
- [Indexing Speed by Platform](#indexing-speed-by-platform)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


You launched your site. You've published content. You searched for your own domain in Google and... nothing. Zero results. Your site doesn't exist in Google's eyes. Every generic guide tells you to "wait 4-12 weeks for Google to discover your site." That's not advice. That's surrender.

A new site can appear in Google's index within 48 hours, often faster, if you send the right signals through the right channels. The process below prioritizes the actions that trigger Google's discovery and indexing pipeline.

## Why New Sites Take So Long (And How to Skip the Queue)

Google discovers new sites through three mechanisms:

1. **Sitemaps submitted to Google Search Console**. Direct notification that your site exists
2. **Links from already-indexed sites**. Google follows links and discovers new domains
3. **Manual URL submission**. Direct request for crawling via the URL Inspection tool

Most new sites rely only on mechanism #1 and wait passively. The 48-hour approach activates all three simultaneously, creating multiple discovery signals that push your site to the front of Google's crawl queue.

### What Google Needs Before Indexing

Google won't index a domain that:
- Has no content worth indexing
- Returns server errors or is unstable
- Has no signals that it's a real, maintained website
- Is blocked by robots.txt or noindex directives
- Has no way for Google to discover it (no sitemap, no inbound links)

Address all five before you start the indexing push.

## Pre-Launch Checklist (Do This Before Everything Else)

Before requesting indexing, make sure your site is ready:

- [ ] At least 5-10 pages of substantial, unique content published
- [ ] XML sitemap generated and accessible at `/sitemap.xml`
- [ ] Robots.txt allows crawling (verify at `yoursite.com/robots.txt`)
- [ ] No `noindex` meta tags on pages you want indexed (view page source to confirm)
- [ ] All pages return 200 status codes (no broken pages)
- [ ] HTTPS enabled and working (not HTTP)
- [ ] Clean, crawlable site structure with internal links between pages
- [ ] Each page has a unique title tag and meta description
- [ ] A self-referencing canonical tag on every page

If any of these are missing, fix them first. Requesting indexing on a broken site wastes the limited daily submissions Google allows.

## Hour 1: Direct Google Notification

### Step 1: Set Up Google Search Console (10 Minutes)

If you haven't already:

1. Go to **Google Search Console** (search.google.com/search-console)
2. Click **Add Property**
3. Choose **Domain** verification (covers all subdomains and protocols) or **URL prefix** (simpler setup)
4. For Domain verification, add the TXT record to your DNS at your domain registrar or **Cloudflare**
5. Wait for verification (usually 5-15 minutes for DNS propagation)

### Step 2: Submit Your XML Sitemap (2 Minutes)

1. In **GSC**, go to **Indexing > Sitemaps**
2. Enter your sitemap URL (typically `sitemap.xml` or `sitemap_index.xml`)
3. Click **Submit**
4. Google will begin processing immediately

### Step 3: Request Indexing for Your Most Important Pages (10 Minutes)

1. In **GSC**, use the **URL Inspection** tool
2. Enter your homepage URL
3. Click **Request Indexing**
4. Repeat for your 5-10 most important pages

**Limit:** Google restricts the number of indexing requests per day (the exact number varies). Prioritize your homepage, key service/product pages, and your best content pages.

### Step 4: Ping Google Directly (2 Minutes)

Notify Google that your sitemap exists:

```bash
curl "https://www.google.com/ping?sitemap=https://yoursite.com/sitemap.xml"
```

Also ping Bing:

```bash
curl "https://www.bing.com/ping?sitemap=https://yoursite.com/sitemap.xml"
```

These HTTP pings are Google and Bing's official sitemap notification endpoints.

## Hour 2-6: Build Discovery Signals

Google's crawl priority increases with external signals. A new domain with zero connections to the existing web looks untrustworthy. These steps create legitimate connections.

### Step 5: Google Business Profile (15 Minutes)

If your site represents a business:

1. Create or claim your **Google Business Profile** (business.google.com)
2. Add your website URL
3. Complete all business information
4. This creates a Google-owned signal directly connecting your domain to Google's systems

### Step 6: Social Profile Creation (20 Minutes)

Create profiles on major platforms and add your website URL:

- **X (Twitter)**. Create account, add site URL in bio, post linking to your site
- **LinkedIn**. Company page with site URL
- **Facebook**. Business page with site URL
- **YouTube**. Channel with site URL in description (if applicable)
- **Pinterest**. Business account with claimed website (if applicable)

Each platform is regularly crawled by Google. Links from these profiles create discovery pathways.

### Step 7: Submit to Directories (15 Minutes)

Submit your site to legitimate directories that Google crawls frequently:

- **Google Business Profile** (already done in Step 5)
- **Bing Places for Business** (bingplaces.com)
- **Apple Maps** (mapsconnect.apple.com), if local business
- Industry-specific directories relevant to your niche

Don't waste time on low-quality web directories. Focus on platforms Google actively crawls and trusts.

### Step 8: Get an Inbound Link from an Indexed Site (30 Minutes)

The most powerful indexing signal is a link from an already-indexed page. Options:

**Fastest:** If you have an existing website, blog, or social profile that Google already indexes, add a link to your new site from that property.

**Business partners:** Ask a business partner, supplier, or collaborator with an existing indexed site to link to your new site (from a relevant page, not a random footer link).

**Guest content:** Publish a guest article or comment on an industry blog with a link back to your site. The link should be contextually relevant, not spammy.

**Forum or community participation:** Contribute genuinely helpful answers on platforms like **Reddit**, **Quora**, or niche forums with a relevant link to your site. Don't spam, one quality contribution with context is worth more than ten low-effort link drops.

**The mechanism:** When **Googlebot** crawls the linking page and discovers the link to your new domain, it follows that link and discovers your site. If your site has content worth indexing, it enters the crawl-to-index pipeline.

## Hour 6-24: Advanced Acceleration

### Step 9: Use IndexNow for Bing (5 Minutes)

**IndexNow** is a protocol that instantly notifies participating search engines when your content changes. Bing, Yandex, and other engines support it natively. Google doesn't officially support IndexNow yet, but Bing indexing often precedes Google indexing.

**WordPress:** Install the **IndexNow** plugin by Microsoft. It automatically pings Bing when you publish or update content.

**Manual submission:**
```bash
curl "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "yoursite.com",
    "key": "your-api-key",
    "urlList": [
      "https://yoursite.com/",
      "https://yoursite.com/about",
      "https://yoursite.com/services"
    ]
  }'
```

### Step 10: Google Indexing API (15 Minutes for Setup)

The **Google Indexing API** provides the fastest direct notification channel:

1. Create a project in **Google Cloud Console**
2. Enable the **Web Search Indexing API**
3. Create a service account with appropriate permissions
4. Download the JSON key file
5. Add the service account email as a **verified owner** in **Google Search Console**
6. Use a client library or plugin to submit URLs

**WordPress shortcut:** Install **Rank Math** and configure its Instant Indexing module with your service account credentials. Submit URLs directly from the WordPress admin.

The Indexing API was originally designed for structured data pages (job postings, live events), but SEOs report it accelerates indexing for all content types.

## Hour 24-48: Monitor and Troubleshoot

### Check Indexing Status

1. Search `site:yoursite.com` in Google, if results appear, you're indexed
2. In **GSC > Indexing > Pages**, check the "Indexed" count
3. Use the **URL Inspection tool** to check individual page status

### If Nothing Is Indexed After 48 Hours

Troubleshoot in this order:

1. **Verify GSC ownership**. Is the property properly verified?
2. **Check robots.txt**. Is anything blocking **Googlebot**? ([Robots.txt guide](/articles/fix-robots-txt-mistakes.html))
3. **Check for noindex**. View source on your pages, search for "noindex"
4. **Check server response**. Do your pages return 200 status codes?
5. **Check content quality**. Is there enough substantive content for Google to consider valuable?
6. **Check the sitemap**. Did GSC report any sitemap errors?

### Accelerating Specific Pages

If your homepage is indexed but inner pages aren't:

- Ensure strong internal links from the homepage to inner pages
- Request indexing individually for each important inner page via **URL Inspection**
- Verify inner pages appear in your XML sitemap
- Check that inner pages have unique, substantial content (not near-duplicates)

## Timeline Expectations

| Signal | Time to Impact |
|--------|---------------|
| GSC URL Inspection request | 4-48 hours |
| Sitemap submission | 24-72 hours |
| Google Indexing API | 4-24 hours |
| Social profile link | 24-72 hours |
| Link from indexed site | 24-72 hours (depends on that site's crawl frequency) |
| Google Business Profile | 24-72 hours |
| IndexNow (Bing) | Minutes to hours |

## Content Strategy for New Site Indexing

### What to Publish Before Requesting Indexing

Google indexes content it considers valuable. A new site with 3 thin pages is less likely to get indexed than one with 10 substantial pages. Your initial content portfolio should demonstrate:

**Topical depth:** Publish 5-10 pages on your core topic, each covering a distinct subtopic. This signals topical authority rather than a thin affiliate shell.

**Content quality:** Each page should be 1,500+ words with original perspective, data, or analysis. Google's quality threshold for new domains is higher than for established sites, you need to over-deliver initially.

**User-serving intent:** Every page should answer a genuine question or serve a real user need. Pages that exist solely for keyword targeting without providing substantive help won't meet the indexing bar.

### The 10-Page Minimum Launch Strategy

Before submitting to **Google Search Console**:

1. **Homepage**. Clear value proposition, internal links to all other pages
2. **About page**. E-E-A-T signals: who you are, credentials, experience
3. **Contact page**. Physical address (if applicable), email, phone, trust signals
4. **3-5 pillar content pages**. Comprehensive guides on your core topics (2,000+ words each)
5. **2-3 supporting content pages**. Specific subtopics that link to and from the pillar pages

This minimum viable content portfolio gives Google enough signal to justify indexing. Requesting indexing with fewer pages risks a "Crawled - currently not indexed" verdict that's harder to reverse than earning indexing from the start.

### Schema Markup for New Sites

Structured data gives Google additional signals about your site's legitimacy and content type:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Business Name",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "sameAs": [
    "https://twitter.com/youraccount",
    "https://linkedin.com/company/yourcompany"
  ]
}
</script>
```

Add Organization schema to your homepage and Article schema to content pages. These don't directly cause indexing, but they enrich Google's understanding of your site and can accelerate the quality evaluation.

## New Site Indexing Mistakes to Avoid

| Mistake | Why It Fails | Do This Instead |
|---------|-------------|----------------|
| Submitting a site with 1-2 pages | Insufficient content signal | Publish 10+ substantial pages first |
| Using "coming soon" placeholder pages | Google indexes thin placeholders, creating negative quality signal | Only publish pages with real content |
| Blocking staging with robots.txt then forgetting to remove it | Common cause of "why isn't my site indexed" | Verify robots.txt allows crawling before submitting |
| Submitting before DNS propagation completes | Google gets DNS errors, delays future crawl attempts | Wait for DNS to fully propagate (24-48 hours) before submitting |
| Buying hundreds of backlinks to force indexing | Triggers spam signals on a brand-new domain | Build 3-5 legitimate links from real, relevant sites |
| Installing every analytics and tracking tool immediately | Heavy JS payload on a new site signals low quality | Start with Google Analytics and GSC only, add tools as needed |

## Post-Indexing: Accelerate Full-Site Crawling

Once your first pages are indexed, maintain momentum:

1. **Publish consistently**. New content triggers regular crawling
2. **Internal link every new page**. Link from existing indexed pages to new content
3. **Update your sitemap**. Ensure new pages appear with accurate `<lastmod>` dates
4. **Build backlinks gradually**. Each new backlink increases your crawl priority
5. **Monitor GSC weekly**. Watch the "Indexed" count grow and catch any indexing issues early


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why New Sites Take So Long (And How to Skip the Queue):** Google discovers new sites through three mechanisms:
* **Pre-Launch Checklist (Do This Before Everything Else):** Before requesting indexing, make sure your site is ready:
* **Hour 2-6: Build Discovery Signals:** Google's crawl priority increases with external signals.
* **Hour 6-24: Advanced Acceleration:** The Google Indexing API provides the fastest direct notification channel:

## FAQ

### Why is my new site not showing up in Google at all?

The most common causes for a brand-new site: Google hasn't discovered it yet (no sitemap submitted, no inbound links), robots.txt is blocking crawling, or noindex tags are preventing indexing. Start with the Pre-Launch Checklist above and work through each step.

### Does buying a new domain hurt indexing speed?

New domains have zero trust signals, which makes Google more cautious about indexing. Expired or aged domains with clean history may index slightly faster due to existing trust. But for a brand-new domain, the steps in this guide close the gap to 48 hours regardless.

### Should I submit every page through URL Inspection?

For a new site with 10-20 pages, yes, submit every page individually. For larger sites (100+ pages), submit your most important pages individually and rely on the sitemap for the rest. Google limits daily URL Inspection submissions.

### Does domain age affect indexing?

Not directly. Google has stated that domain age is not a ranking factor. However, new domains take longer to build the trust signals that lead to prompt crawling and indexing. The techniques in this guide compensate for this by creating immediate external signals.

### Will social media links help with indexing?

Yes. Google crawls major social platforms regularly. A link from an active Twitter/X, LinkedIn, or Facebook page to your new site creates a discovery pathway. The SEO value of social links for ranking is debated, but for indexing specifically, they're effective.

## 48 Hours, Not 12 Weeks

The difference between a site that gets indexed in 48 hours and one that waits 12 weeks is signal density. Multiple simultaneous discovery pathways. GSC submission, sitemap pings, social profiles, directory listings, inbound links, Indexing API, create urgency in Google's crawl scheduler.

## Indexing Speed by Platform

Different platforms have built-in indexing advantages:

| Platform | Built-In Indexing Features | Typical Time to First Index |
|----------|--------------------------|---------------------------|
| **WordPress** | Auto-generated sitemap (Yoast/Rank Math), ping services | 2-7 days with GSC submission |
| **Shopify** | Auto-generated sitemap, Google channel app | 3-7 days with GSC submission |
| **Squarespace** | Auto-generated sitemap, built-in SEO tools | 3-10 days with GSC submission |
| **Wix** | Auto-generated sitemap, Wix SEO Wizard | 3-10 days with GSC submission |
| **Custom/Static** | No built-in features, manual setup required | 1-14 days depending on signal strength |
| **Next.js/Gatsby** | Sitemap plugins available, fast hosting on Vercel/Netlify | 2-7 days with GSC submission |

**WordPress** sites tend to get indexed fastest because the ecosystem of SEO plugins, ping services, and community backlinks creates multiple discovery signals automatically. Custom sites require more manual effort but can match WordPress speeds with proper setup.

Execute every step in this guide within the first 24 hours. Check results at 48 hours. For the vast majority of properly configured new sites with real content, you'll see your pages in Google's index by then. If not, the troubleshooting section above identifies the specific blocker.

Your site exists. Make sure Google knows it.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.

---

## Frequently Asked Questions

### How long does this fix take to implement?

Most fixes in this article can be implemented in under an hour. Some require a staging environment for testing before deploying to production. The article flags which changes are safe to deploy immediately versus which need QA review first.

### Will this fix work on WordPress, Shopify, and custom sites?

The underlying SEO principles are platform-agnostic. Implementation details differ. WordPress uses plugins and theme files, Shopify uses Liquid templates, custom sites use direct code changes. The article focuses on the what and why; platform-specific how-to links are provided where available.

### How do I verify the fix worked?

Each fix includes a verification step. For most technical SEO changes: check Google Search Console coverage report 48-72 hours after deployment, validate with a live URL inspection, and monitor the affected pages in your crawl tool. Ranking impact typically surfaces within 1-4 weeks depending on crawl frequency.

