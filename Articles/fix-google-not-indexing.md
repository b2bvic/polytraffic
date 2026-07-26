---

---
title:: Why Google Won't Index Your Pages (And 12 Fixes to Force It)
description:: Google found your pages but won't index them. Here are 12 specific causes and the exact fix for each one. Includes the URL Inspection walkthrough and indexing API.
focus_keyword:: fix Google not indexing
category:: indexing
author:: Victor Valentine Romo
date:: 2026.03.20

# Why Google Won't Index Your Pages (And 12 Fixes to Force It)

> **Quick Summary**
> - **What this covers:** fix-google-not-indexing
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Understanding the Two Statuses](#understanding-the-two-statuses)
- [Fix 1: Resolve Thin Content](#fix-1-resolve-thin-content)
- [Fix 2: Eliminate Duplicate Content Signals](#fix-2-eliminate-duplicate-content-signals)
- [Fix 3: Check for Conflicting Noindex Signals](#fix-3-check-for-conflicting-noindex-signals)
- [Fix 4: Fix Canonical Tag Issues](#fix-4-fix-canonical-tag-issues)
- [Fix 5: Strengthen Internal Linking](#fix-5-strengthen-internal-linking)
- [Fix 6: Improve Crawl Budget Allocation](#fix-6-improve-crawl-budget-allocation)
- [Fix 7: Add the Page to Your XML Sitemap](#fix-7-add-the-page-to-your-xml-sitemap)
- [Fix 8: Request Indexing via URL Inspection](#fix-8-request-indexing-via-url-inspection)
- [Fix 9: Build External Signals](#fix-9-build-external-signals)
- [Fix 10: Improve Page Quality Signals](#fix-10-improve-page-quality-signals)
- [Fix 11: Check for Manual Actions or Security Issues](#fix-11-check-for-manual-actions-or-security-issues)
- [Fix 12: Use the Google Indexing API (For Bulk or Urgent Needs)](#fix-12-use-the-google-indexing-api-for-bulk-or-urgent-needs)
- [Indexing Troubleshooting Decision Tree](#indexing-troubleshooting-decision-tree)
- [Understanding Google's Indexing Capacity](#understanding-google-s-indexing-capacity)
- [Indexing Fix Priority Matrix](#indexing-fix-priority-matrix)
- [Advanced: When Nothing Else Works](#advanced-when-nothing-else-works)
- [Make Google Want Your Pages](#make-google-want-your-pages)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


"Discovered - currently not indexed" and "Crawled - currently not indexed" are the two most frustrating statuses in **Google Search Console**. Google found your page. In the second case, Google even read your page. Then Google decided your page wasn't worth remembering. No error message. No explanation. rejection.

This isn't random. Google makes explicit decisions about what to index based on quality signals, technical configuration, and crawl priority. Each of the 12 causes below has a specific, actionable fix.

## Understanding the Two Statuses

### "Discovered - Currently Not Indexed"

Google knows the URL exists (found it in your sitemap or through a link) but hasn't bothered to crawl it yet. Your page is in the crawl queue but not prioritized.

**Root cause:** Google doesn't think the page is worth crawling, or your site's crawl budget is too limited to reach it.

### "Crawled - Currently Not Indexed"

Google crawled the page, read the content, and actively decided not to add it to the index. This is worse, it's a quality judgment, not a queue issue.

**Root cause:** Google evaluated the page and found it insufficient for indexing, thin content, duplication, low perceived value, or conflicting signals.

## Fix 1: Resolve Thin Content

**Diagnosis:** Open the affected URL. If the page has under 300 words of unique body content, Google may consider it too thin to provide standalone search value.

**Fix:**
- Expand the content to comprehensively cover the topic (1,500+ words for informational content)
- Add original analysis, data, examples, or step-by-step instructions
- Include FAQ sections, tables, and structured data that add depth
- Ensure the content provides value a searcher can't easily find on competing indexed pages

See [fixing thin content](/articles/fix-thin-content.html) for the complete expansion framework.

**Before:** 200-word stub page, "Crawled - currently not indexed"
**After:** 2,000-word comprehensive guide, indexed within 2 weeks

## Fix 2: Eliminate Duplicate Content Signals

**Diagnosis:** Check if your unindexed page's content substantially overlaps with another page on your site or a page on another site.

**Tools:**
- **Copyscape**. Check for external duplication
- **Siteliner**. Check for internal duplication
- Search a unique sentence from your page in Google (in quotes), if another page appears, Google chose that page over yours

**Fix:**
- If it's a duplicate of your own content, consolidate the pages (301 redirect weaker to stronger)
- If external content duplicates yours, add unique depth your version doesn't share with the other
- Ensure each page has a correct self-referencing canonical tag

See [fixing duplicate content](/articles/fix-duplicate-content.html) for the full audit process.

## Fix 3: Check for Conflicting Noindex Signals

**Diagnosis:** Use the **URL Inspection tool** in **Google Search Console**. Under "Indexing," check for:

- `noindex` in the HTML meta tag
- `noindex` in the HTTP response header (`X-Robots-Tag: noindex`)
- robots.txt blocking that prevents Google from seeing the page

**Fix:**
- Remove `noindex` meta tags from pages you want indexed
- Check HTTP headers: `curl -sI https://yoursite.com/page | grep -i x-robots`
- Verify your robots.txt doesn't block the URL ([robots.txt guide](/articles/fix-robots-txt-mistakes.html))
- Check for plugin conflicts, some caching or security plugins inject noindex headers

## Fix 4: Fix Canonical Tag Issues

**Diagnosis:** View the page source and find the canonical tag. If it points to a DIFFERENT URL, Google will index the canonical target instead of your page.

```html
<!-- This tells Google to index the other page, not this one -->
<link rel="canonical" href="https://yoursite.com/different-page">
```

**Fix:**
- If this page should be indexed, set the canonical to self-reference:

```html
<link rel="canonical" href="https://yoursite.com/this-page">
```

- If the canonical is intentionally pointing elsewhere, the correct behavior is that THIS page won't be indexed (by design)
- Check for plugins auto-generating incorrect canonicals

## Fix 5: Strengthen Internal Linking

**Diagnosis:** Check how many internal links point to the unindexed page using **Screaming Frog** or **Google Search Console > Links > Internal Links**.

Pages with zero or few internal links receive minimal crawl priority and authority. Google interprets link isolation as a signal of low importance.

**Fix:**
- Add 3-5 contextual internal links from topically related pages
- Link from high-authority pages (homepage, popular blog posts, category pages)
- Ensure the link anchor text is descriptive and includes the target keyword

See [fixing internal linking](/articles/fix-internal-linking.html) for the full strategy.

## Fix 6: Improve Crawl Budget Allocation

**Diagnosis:** If your site has thousands of pages and many are indexed while specific pages aren't, crawl budget may be the bottleneck. Google allocates limited crawling resources to each domain.

**Fix:**
- Reduce [index bloat](/articles/fix-index-bloat.html) by noindexing junk pages, this frees crawl budget for valuable pages
- Fix [crawl errors](/articles/fix-crawl-errors-fast.html) that waste crawl budget
- Flatten [redirect chains](/articles/fix-redirect-chains.html) that consume multiple crawl requests per URL
- Submit an updated XML sitemap with accurate `<lastmod>` dates
- Improve server response time so Google can crawl more pages per session

## Fix 7: Add the Page to Your XML Sitemap

**Diagnosis:** Check if the unindexed page appears in your sitemap. If not, Google has one fewer discovery signal.

**Fix:**
- Add the URL to your XML sitemap
- Set an accurate `<lastmod>` date
- Resubmit the sitemap in **Google Search Console > Indexing > Sitemaps**

A sitemap doesn't guarantee indexing, but it ensures Google is aware of the page and considers it for crawling. See [fixing sitemap errors](/articles/fix-xml-sitemap-errors.html).

## Fix 8: Request Indexing via URL Inspection

**Diagnosis:** You've made improvements but Google hasn't re-crawled yet.

**Fix:**
1. Open **Google Search Console**
2. Enter the URL in the **URL Inspection** bar
3. Click **Request Indexing**
4. Google will recrawl the page within 24-48 hours (usually faster)

**Limitation:** You can request indexing for a limited number of URLs per day (the exact limit fluctuates). For bulk indexing needs, use the Google Indexing API (Fix 12).

## Fix 9: Build External Signals

**Diagnosis:** Pages with zero backlinks and no social signals are lowest priority for indexing. Google has limited index capacity and prioritizes pages with external validation.

**Fix:**
- Share the URL on social media platforms to generate referral traffic signals
- Build 1-2 quality backlinks through outreach, guest posts, or resource page inclusion
- Submit the URL to relevant directories or aggregators in your niche
- Internal linking (Fix 5) can partially compensate but external signals carry more weight for indexing decisions

## Fix 10: Improve Page Quality Signals

**Diagnosis:** Google evaluates E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) when deciding what to index. Pages that appear anonymous, unvetted, or generic may not meet the quality bar.

**Fix:**
- Add author information (name, bio, credentials)
- Add publication date and "last updated" date
- Include original data, research, or first-hand experience
- Ensure the page design looks professional and trustworthy (not template-default or broken)
- Add schema markup (**Article**, **FAQ**, **HowTo**) to provide structured data signals

## Fix 11: Check for Manual Actions or Security Issues

**Diagnosis:** In **Google Search Console**, go to **Security & Manual Actions**. If there's an active manual action, Google may be suppressing indexing across parts or all of your site.

**Fix:**
- Read the manual action notice carefully, it describes the specific issue
- Fix the identified problem (often thin content, spammy links, or cloaking)
- Submit a reconsideration request through GSC
- For security issues (malware, hacked content), clean the infection and request a review

## Fix 12: Use the Google Indexing API (For Bulk or Urgent Needs)

**Diagnosis:** You have many pages that need indexing attention and the URL Inspection tool's daily limits are insufficient.

**Fix:** The **Google Indexing API** was designed for job posting and broadcast event pages, but Google has informally expanded its effectiveness. Many SEOs report faster indexing for general content submitted through the API.

**Setup:**
1. Create a project in **Google Cloud Console**
2. Enable the Indexing API
3. Create a service account with indexing permissions
4. Add the service account email as an owner in **Google Search Console**
5. Use a tool like **IndexNow** (for Bing/Yandex) or a WordPress plugin like **Instant Indexing for Google** to automate submissions

**WordPress plugin approach:**
Install **Rank Math** (which includes Instant Indexing) or the standalone **Instant Indexing for Google** plugin. Configure with your service account credentials and submit URLs directly from the WordPress dashboard.

## Indexing Troubleshooting Decision Tree

```
Page not indexed
├── Check URL Inspection in GSC
│   ├── "Discovered - not indexed" → Fix crawl budget (6) + internal links (5) + sitemap (7)
│   ├── "Crawled - not indexed" → Fix content quality (1, 10) + duplicates (2) + canonical (4)
│   ├── "Excluded by noindex" → Fix 3 (remove noindex)
│   ├── "Alternate page with canonical" → Fix 4 (correct canonical)
│   └── "Blocked by robots.txt" → Fix robots.txt (see robots.txt guide)
└── None of the above → Fix 8 (request indexing) + Fix 9 (external signals)
```

## Understanding Google's Indexing Capacity

Google doesn't index every page on the internet. It has finite index capacity and must prioritize. Understanding this helps explain why your pages might not make the cut.

**Google's John Mueller** has stated that Google doesn't index everything it crawls. The decision to index considers:

- **Content uniqueness:** Does this page add something to Google's index that isn't already there?
- **Site authority:** Established, trusted domains get more generous indexing than new or low-authority sites
- **Content freshness:** Recently published or updated content gets priority over stale content
- **User demand:** Is anyone likely to search for what this page covers?
- **Page quality:** Does the page demonstrate E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)?

For new or small sites, this means you need to over-deliver on quality to earn indexing. A 500-word page that barely covers a topic won't be indexed when Google already has 50 comprehensive pages on the same topic from established domains. Your content needs to be genuinely better or genuinely different.

## Indexing Fix Priority Matrix

| Fix | Effort | Impact | Try First If... |
|-----|--------|--------|-----------------|
| Request indexing (8) | 1 min | Immediate | Page is new or recently updated |
| Remove noindex (3) | 2 min | High | URL Inspection shows noindex |
| Fix canonical (4) | 2 min | High | Canonical points elsewhere |
| Add to sitemap (7) | 5 min | Medium | Page not in sitemap |
| Strengthen content (1) | 30-60 min | High | Content is under 500 words |
| Add internal links (5) | 10 min | Medium-High | Page has <3 internal links |
| Fix duplicates (2) | 15-30 min | High | Similar page already ranks |
| Reduce bloat (6) | 30-60 min | Sitewide | Many pages have this problem |


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Understanding the Two Statuses:** Google knows the URL exists (found it in your sitemap or through a link) but hasn't bothered to crawl it yet.
* **Fix 1: Resolve Thin Content:** See fixing thin content for the complete expansion framework.
* **Fix 2: Eliminate Duplicate Content Signals:** See fixing duplicate content for the full audit process.
* **Fix 3: Check for Conflicting Noindex Signals:** Pages with zero or few internal links receive minimal crawl priority and authority.
* **Fix 4: Fix Canonical Tag Issues:** Pages with zero or few internal links receive minimal crawl priority and authority.
* **Fix 5: Strengthen Internal Linking:** Pages with zero or few internal links receive minimal crawl priority and authority.

## FAQ

### How long should I wait before declaring a page "not indexed"?

New pages on established sites typically get indexed within 2-14 days. On new sites, it can take 4-8 weeks. If a page hasn't been indexed after 4 weeks on an established site despite being in the sitemap and having internal links, start troubleshooting with the fixes above.

### Does the "Request Indexing" button guarantee indexing?

No. It guarantees Google will re-crawl the page, but Google still makes an independent decision about whether to index it. If the page has quality or technical issues, re-crawling won't help until those issues are fixed.

### Can I force Google to index a page?

You can't truly force indexing. But you can maximize the signals that influence Google's decision: strong content, proper technical configuration, internal/external links, sitemap inclusion, and direct indexing requests. If all signals are strong and Google still won't index the page, the content may not meet Google's quality threshold for the competitive landscape of that topic.

### Why does Google index some thin pages but not mine?

Google's indexing decisions consider the site's overall authority, the competitive landscape for the topic, and the relative quality of the page compared to what's already indexed. A thin page on a highly authoritative domain may get indexed where the same content on a newer site won't.

### Is "Discovered - not indexed" worse than "Crawled - not indexed"?

"Crawled - not indexed" is worse because it's an active quality rejection. "Discovered - not indexed" is a prioritization issue. Google hasn't gotten to it yet. Both need fixing, but "Crawled - not indexed" requires content improvement, while "Discovered - not indexed" requires improving crawl priority signals.

## Advanced: When Nothing Else Works

If you've exhausted all 12 fixes above and pages still won't index, consider these deeper interventions:

### Site Quality Reassessment

Google may have classified your entire domain as low-quality through the **Helpful Content System**. If this is the case, individual page fixes won't be enough, you need sitewide quality improvement.

**Signs of a Helpful Content System demotion:**
- New pages consistently go to "Crawled - currently not indexed" regardless of quality
- Previously indexed pages gradually drop from the index
- Traffic decline coincides with a known Helpful Content update date
- The pattern affects the entire site, not specific pages

**Recovery requires:**
1. Audit ALL content on the site for genuine helpfulness
2. Remove or noindex at least 30-50% of the lowest-quality pages ([index bloat guide](/articles/fix-index-bloat.html))
3. Substantially improve remaining content with original data, expert perspective, and comprehensive coverage
4. Wait for Google to reassess, this takes 3-6 months of sustained improvement

### Content Freshness Signals

For time-sensitive topics, Google may refuse to index content it considers stale. If your page discusses "best SEO tools" with data from 2023, Google has fresher alternatives.

**Fix:** Update content with current-year data, recent statistics, and contemporary references. Include a visible "Last Updated: [date]" on the page and update the `<lastmod>` in your sitemap.

### Server-Side Rendering for JavaScript-Heavy Sites

If your site renders content primarily through client-side JavaScript (React, Vue, Angular single-page applications), Google may fail to see the actual content during crawling. Google renders JavaScript, but not always successfully.

**Diagnosis:** In **GSC URL Inspection**, click "Test Live URL" and then "View Tested Page > Screenshot." If the screenshot shows a blank page or loading spinner, Google isn't rendering your JavaScript content.

**Fix:**
- Implement **Server-Side Rendering (SSR)** or **Static Site Generation (SSG)**
- Use **Next.js** (for React) or **Nuxt** (for Vue) which provide SSR out of the box
- As a fallback, implement **Dynamic Rendering**, serve pre-rendered HTML to Google while serving the SPA to users (Google has said this is acceptable)

### Structured Data for Indexing Signals

While structured data doesn't directly cause indexing, it provides additional signals about page type and content:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "datePublished": "2026-02-07",
  "dateModified": "2026-02-07",
  "author": {
    "@type": "Person",
    "name": "Victor Valentine Romo"
  }
}
</script>
```

Pages with valid structured data give Google more confidence about the page's purpose and quality, which can tip indexing decisions in borderline cases.

## Make Google Want Your Pages

Google indexes pages that it believes will satisfy searchers. Every fix in this guide either improves the quality signal of your page (making it more worth indexing) or removes technical barriers that prevent Google from seeing that quality.

Start with the **URL Inspection tool** in **GSC** to diagnose the specific reason. Apply the corresponding fix. Request re-indexing. Then wait. Google's response time varies, but properly configured, high-quality pages on healthy sites rarely stay unindexed for long.

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

