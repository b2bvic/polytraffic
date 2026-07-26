---
title:: Site Migration Post-Launch Audit: Complete Technical Checklist
description:: Ensure your site migration succeeded with this comprehensive post-launch audit checklist. Verify redirects, indexing, rankings, and technical health after going live.
focus_keyword:: site migration post-launch audit
category:: Technical SEO
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Site Migration Post-Launch Audit: Complete Technical Checklist

> **Quick Summary**
> - **What this covers:** Ensure your site migration succeeded with this comprehensive post-launch audit checklist. Verify redirects, indexing, rankings, and technical health after going live.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Post-Launch Audits Matter More Than Pre-Migration Planning](#why-post-launch-audits-matter-more-than-pre-migration-planning)
- [Redirect Chain Validation and Mapping Verification](#redirect-chain-validation-and-mapping-verification)
- [Indexing Status and Google Search Console Monitoring](#indexing-status-and-google-search-console-monitoring)
- [Rankings and Traffic Pattern Analysis](#rankings-and-traffic-pattern-analysis)
- [Internal Linking Architecture Verification](#internal-linking-architecture-verification)
- [Canonical Tag and Meta Directives Audit](#canonical-tag-and-meta-directives-audit)
- [Core Web Vitals and Performance Degradation](#core-web-vitals-and-performance-degradation)
- [Structured Data and Rich Results Retention](#structured-data-and-rich-results-retention)
- [Security Configuration and Trust Signals](#security-configuration-and-trust-signals)
- [Backlink Profile and External Reference Updates](#backlink-profile-and-external-reference-updates)
- [Mobile Usability and Multi-Device Testing](#mobile-usability-and-multi-device-testing)
- [Content Integrity and Quality Preservation](#content-integrity-and-quality-preservation)
- [Local SEO Elements for Multi-Location Businesses](#local-seo-elements-for-multi-location-businesses)
- [E-commerce Specific Migration Checks](#e-commerce-specific-migration-checks)
- [Analytics and Tracking Verification](#analytics-and-tracking-verification)
- [Ongoing Monitoring Schedule Post-Audit](#ongoing-monitoring-schedule-post-audit)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


A **site migration post-launch audit** verifies that your website transition preserved search visibility, technical integrity, and user experience. Within 48 hours of launching a domain change, platform switch, or structural overhaul, systematically test redirects, monitor indexing rates, and validate that Google recognizes your new configuration without hemorrhaging organic traffic.

Site migrations fail silently. Traffic erosion manifests weeks after launch when rankings decay from broken redirects, orphaned pages, or canonical conflicts. This audit catches migration failures while recovery remains straightforward, before **Google Search Console** flags crawl errors across thousands of URLs and before users encounter 404 walls that convert visits into bounces.

## Why Post-Launch Audits Matter More Than Pre-Migration Planning

Pre-migration testing occurs in staging environments that approximate production but cannot replicate real crawl behavior, DNS propagation delays, or CDN caching interactions. The post-launch audit operates on live infrastructure where **Googlebot** encounters actual server responses, redirect chains resolve through production DNS, and third-party integrations expose compatibility gaps invisible during staging.

Migration risks compound across multiple dimensions simultaneously. A redirect mapped correctly in your migration spreadsheet may execute as a 302 temporary redirect due to server configuration, signaling to Google that the old URL remains canonical. A robots.txt rule that permitted staging crawlers may block production indexing if deployment scripts overwrite the file. SSL certificates may validate in browsers but trigger mixed content warnings that degrade crawl efficiency.

The audit timeline matters critically. Within the first 72 hours post-launch, Google recrawls migrated URLs at elevated frequency, attempting to understand the new site structure. Errors caught during this window can be corrected before Google's index stabilizes around incorrect interpretations. After two weeks, correction requires more aggressive measures, sitemaps, manual reindexing requests, and potentially months of waiting for Google to re-evaluate pages it classified as soft 404s or duplicate content.

## Redirect Chain Validation and Mapping Verification

Begin by crawling your entire old domain through a tool like **Screaming Frog SEO Spider** configured to follow redirects. Export all URLs that returned 3XX status codes, then systematically verify that each resolves to the correct new destination in a single hop. Redirect chains, where URL A redirects to URL B which redirects to URL C, dissipate link equity and slow crawl efficiency. Google's algorithms treat multi-hop redirects as soft signals that the destination may not be the intended target.

Test redirects from multiple user agents. Some migrations implement device-specific redirects or serve different responses to Googlebot versus desktop browsers. Use Chrome DevTools to inspect response headers, confirming that 301 permanent redirects appear for all migrated URLs rather than 302 temporary redirects which preserve ranking signals on the old domain rather than transferring them to the new one.

Validate wildcard and pattern-based redirects separately. If your migration mapped `/blog/category/post-name/` to `/articles/post-name/`test edge cases: URLs with trailing slashes versus without, uppercase versus lowercase variations, and query parameters appended to old URLs. Redirect rules implemented via regular expressions often fail on edge cases that represent small URL volumes but disproportionate ranking value, high-authority pages with unusual URL structures.

Check that redirect targets exist and return 200 status codes. A redirect chain terminating in a 404 error wastes the redirect entirely from Google's perspective. The old URL passes no authority to the new domain, and users clicking cached search results encounter dead ends. Cross-reference your redirect map against a fresh crawl of the new site to identify mismatches where old URLs redirect to new URLs that themselves redirect elsewhere or return errors.

Document redirect coverage percentage. Calculate the ratio of old URLs with valid 301 redirects versus old URLs returning 404 errors. Industry benchmarks suggest 95%+ redirect coverage for successful migrations, with the remaining 5% representing genuinely obsolete content intentionally retired. If your coverage falls below 90%, prioritize implementing redirects for high-authority pages identified through historical analytics data or backlink profiles. The [301-vs-302-redirects-seo](301-vs-302-redirects-seo.html) guide explains status code implications in detail.

## Indexing Status and Google Search Console Monitoring

Submit both old and new XML sitemaps to **Google Search Console** immediately post-launch, even if pre-migration planning included sitemap submission. GSC's Index Coverage report reveals how Google interprets your migration, whether it recognizes redirects as permanent moves, whether it discovered new URLs at expected rates, and whether technical errors block indexing.

Monitor the "Page Indexing" report daily for the first week. New errors appearing post-launch indicate migration-related issues: redirect chains, canonical conflicts, or robots.txt blocks that weren't present in staging. Google's crawl budget allocation shifts during migrations, it attempts to recrawl old URLs to confirm redirects while simultaneously discovering new URLs on the new domain. Errors during this transition window may represent temporary issues resolving as DNS propagates, or systemic problems requiring immediate correction.

Compare indexed page counts between old and new properties. If your old domain had 5,000 indexed pages and your new domain shows only 1,200 indexed after two weeks, investigate coverage gaps. Common culprits include pagination implementation changes, category pages blocked by noindex tags added during migration, or subdirectories accidentally excluded from the new sitemap.

Check the "Crawled – currently not indexed" status. Pages in this category were discovered by Googlebot but deemed unworthy of indexing, often due to thin content, duplication, or quality signals. If significant volumes of previously indexed pages appear here post-migration, the migration may have introduced technical issues that degrade perceived quality: slower page speed, increased JavaScript rendering requirements, or mobile usability problems.

Validate that Google recognizes your domain change through the "Change of Address" tool in GSC. After verifying ownership of both old and new properties, submit the change of address request. Google uses this signal to accelerate redirect recognition and transfer ranking signals. The tool displays processing status, if Google rejects the request, error messages indicate specific validation failures like redirect coverage below thresholds or canonical conflicts. The [why-google-wont-index-new-pages](why-google-wont-index-new-pages.html) troubleshooting guide covers advanced indexing diagnostics.

## Rankings and Traffic Pattern Analysis

Export pre-migration ranking data for your top 500 keywords from your rank tracking tool, whether **Ahrefs**, **SEMrush**, or **Google Search Console** performance reports. Establish a baseline spanning at least 30 days before launch to account for normal ranking volatility. Post-launch, track these keywords daily for two weeks, then weekly for the following six weeks.

Ranking drops of 1-3 positions across multiple keywords indicate normal volatility as Google recrawls and reassesses pages. Drops of 5+ positions concentrated on specific pages or keyword clusters signal migration issues affecting those sections, possible redirect problems, content changes during migration, or internal linking structure alterations that reduced topical authority.

Segment traffic analysis by landing page. Identify pages that lost 30%+ traffic post-migration and prioritize investigation. Cross-reference traffic drops against redirect maps, page speed changes, and content modifications. A page losing traffic despite an apparently correct redirect may have lost internal links during migration, reducing its prominence in site architecture and diminishing topical authority signals.

Monitor branded versus non-branded traffic separately. Branded keyword traffic typically recovers within days post-migration as users adapt to the new domain. Non-branded traffic recovery extends over weeks or months as Google recrawls, re-evaluates rankings, and transfers authority. If branded traffic remains suppressed beyond one week, users may be encountering technical issues, broken redirects, certificate errors, or usability problems not detected in pre-launch testing.

Analyze mobile versus desktop traffic trends independently. Some migrations improve desktop experience while degrading mobile performance through increased JavaScript requirements, layout shifts, or interaction delays. If mobile traffic drops disproportionately, run **Google PageSpeed Insights** on key landing pages and compare mobile performance scores pre- versus post-migration.

## Internal Linking Architecture Verification

Crawl the new site with **Screaming Frog** to generate a comprehensive internal link graph. Export the data to analyze link distribution, orphaned pages, and anchor text patterns. Migrations frequently disrupt internal linking through template changes, menu restructuring, or footer modifications that remove important contextual links.

Identify orphaned pages. URLs present in your sitemap but receiving zero internal links from other pages. Google discovers most pages through internal links rather than sitemaps; orphaned pages receive diminished crawl priority and weaker topical authority signals. If your migration created orphaned pages that previously received substantial internal links, implement navigation changes or contextual links to reintegrate them into site architecture.

Compare internal link counts per page between old and new sites. High-authority pages should maintain or increase internal link volumes post-migration. A cornerstone page that dropped from 150 internal links to 40 internal links lost significant topical authority signals, likely explaining ranking drops for related keyword clusters.

Audit anchor text distribution. Effective internal linking uses descriptive anchor text that signals page topics to Google. If your migration replaced descriptive anchor text with generic "click here" or "read more" variations, you've diluted topical signals. Review template changes and restore descriptive anchor text for important internal links. The [anchor-text-internal-links-best-practices](anchor-text-internal-links-best-practices.html) resource provides implementation strategies.

Check that breadcrumb navigation persists across all pages and implements structured data correctly. Breadcrumbs provide hierarchical context and distribute link authority through category layers. The [breadcrumb-schema-markup-guide](breadcrumb-schema-markup-guide.html) covers validation methods for breadcrumb schema implementation.

## Canonical Tag and Meta Directives Audit

Systematically verify canonical tags across the new site. Incorrect canonicals represent one of the most common post-migration failures. URLs unintentionally pointing to old domain canonicals, HTTP canonicals on HTTPS pages, or self-referencing canonicals using relative URLs that resolve incorrectly when parameters are appended.

Crawl the site and export canonical URLs, then cross-reference against actual URL structure. Each page's canonical should point to itself (for primary content) or to the preferred version (for duplicate or near-duplicate content). Canonicals pointing to the old domain signal to Google that migration is incomplete, dramatically slowing ranking transfer.

Validate hreflang tags if your site targets multiple languages or regions. Migrations often break hreflang implementations through domain changes, URL structure modifications, or template errors that omit hreflang tags from specific page types. Incorrect hreflang configurations cause Google to display wrong-language versions in search results, degrading user experience and click-through rates.

Check robots meta tags and X-Robots-Tag headers. Some migrations accidentally deploy staging configurations that include "noindex, nofollow" directives intended to keep staging sites out of search results. If large sections of your new site show noindex tags, deployment scripts may have promoted staging .htaccess rules or template configurations to production.

Review pagination implementation, particularly rel="next" and rel="prev" tags if you use them (though Google no longer officially supports these, they remain best practice for user agents). Pagination changes during migration often create duplicate content issues or orphan paginated content that previously contributed to rankings through internal linking.

## Core Web Vitals and Performance Degradation

Run **Lighthouse** audits on 20-30 representative pages spanning different templates, homepage, category pages, product pages, blog posts. Compare post-migration scores against pre-migration baselines for Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift.

Platform migrations frequently degrade Core Web Vitals through increased JavaScript dependencies, unoptimized images, or third-party scripts loaded synchronously. A migration from WordPress to a JavaScript framework may improve administrative capabilities while doubling page load times if server-side rendering isn't implemented correctly.

Test page speed from multiple geographic locations using **WebPageTest**. CDN configuration changes during migration may improve performance for users near new server locations while degrading experience for other regions. If your primary audience concentrates in specific geographies, prioritize optimizing performance for those locations.

Monitor crawl speed in Google Search Console. The "Crawl Stats" report displays pages crawled per day, kilobytes downloaded per day, and time spent downloading a page. Post-migration performance degradation manifests as increased download times and decreased daily crawl volumes. Google allocates crawl budget based partly on site speed, so slower sites receive less frequent crawling.

Validate that performance optimizations from the old site carried forward. If you used lazy loading, image compression, or critical CSS techniques pre-migration, confirm these persist on the new platform. Migration teams focused on functionality sometimes overlook performance optimizations, assuming new platforms automatically match old performance levels. The [wordpress-speed-optimization-guide](wordpress-speed-optimization-guide.html) contains platform-agnostic performance principles.

## Structured Data and Rich Results Retention

Use **Google's Rich Results Test** to validate structured data on key pages. Migrations often break structured data through template changes, plugin conflicts, or manual implementation errors when moving from automated schema generators to hand-coded JSON-LD.

Focus testing on page types that previously earned rich results: FAQ pages with FAQ schema, product pages with Product schema, local business pages with LocalBusiness schema, and articles with Article schema. If these pages lost rich result eligibility post-migration, they'll lose the visibility and click-through rate advantages that rich results provide.

Compare rich result appearance in search results pre- versus post-migration. Even if structured data validates technically, Google may suppress rich results due to quality issues, policy violations, or reduced page authority. Search for your top-ranking pages by title and observe whether FAQ accordions, product ratings, or article metadata display in snippets.

Check that organization-level schema persists sitewide, particularly logo, social profile links, and contact information embedded in JSON-LD on every page. This foundational structured data helps Google understand brand identity and may influence knowledge panel information. The [test-schema-markup-rich-results](test-schema-markup-rich-results.html) guide provides validation workflows.

## Security Configuration and Trust Signals

Verify that SSL certificate installation completed correctly across all subdomains and URL variations. Use **SSL Labs** to test certificate validity, checking for common misconfigurations: certificate-hostname mismatches, incomplete certificate chains, or weak cipher suites that trigger browser warnings.

Test HTTPS enforcement through HTTP-to-HTTPS redirects. Load old HTTP URLs directly and confirm they redirect to HTTPS equivalents in a single hop without redirect chains. Mixed content warnings occur when HTTPS pages load images, scripts, or stylesheets over HTTP, these degrade security indicators in browsers and may impact rankings. The [ssl-certificate-errors-seo-fix](ssl-certificate-errors-seo-fix.html) troubleshooting guide addresses common certificate problems.

Validate that security headers propagated correctly in migration: Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security. Some platforms implement these headers by default, while others require manual configuration. Missing security headers don't immediately impact rankings but represent security vulnerabilities that could lead to future penalties if exploited.

Check that XML sitemaps, robots.txt, and key pages remain accessible after implementing security measures. Overly restrictive security configurations sometimes block Googlebot or prevent access to critical resources needed for rendering JavaScript-heavy pages.

## Backlink Profile and External Reference Updates

Export your backlink profile from **Ahrefs** or **Moz** and identify your top 100 highest-authority backlinks by Domain Rating or Page Authority. Manually check a sample of these backlinks to confirm they still point to your old domain (expected immediately post-migration) and that redirects transfer users to the correct new pages.

Prioritize updating backlinks where you control the source: company directory listings, partner pages, guest posts with author bios, and social media profiles. Each manually updated backlink reduces redirect dependency and signals to Google that your new domain is the canonical destination.

Monitor referral traffic in **Google Analytics** post-migration. Traffic from major referral sources should persist, passing through redirects transparently. If referral traffic from specific sources drops to zero, investigate whether those sources implemented their own redirects or updated old links to point elsewhere.

Contact webmasters of your highest-value backlinks explaining the domain change and requesting link updates. While 301 redirects preserve most link equity, direct links to the new domain provide slightly stronger signals and eliminate redirect-dependent traffic flow. The [backlink-audit-analyze-link-profile](backlink-audit-analyze-link-profile.html) resource covers backlink quality assessment.

## Mobile Usability and Multi-Device Testing

Run **Google's Mobile-Friendly Test** on representative pages, particularly if your migration involved responsive design changes or separate mobile URL implementations. Mobile usability errors like text too small, clickable elements too close, or viewport misconfiguration prevent mobile indexing and rankings since Google uses mobile-first indexing for all sites.

Test the site on actual mobile devices across iOS and Android. Browser testing tools approximate mobile experiences but miss device-specific issues: Safari rendering differences, Chrome mobile interaction delays, or Android-specific touch target problems. Handle through critical user paths, homepage to category to product to checkout, on mobile devices to identify usability friction that increases bounce rates.

Compare mobile versus desktop indexing in Google Search Console. Check whether Google indexes mobile or desktop versions of your pages by inspecting individual URLs through the URL Inspection tool. If Google indexes mobile versions but your migration prioritized desktop experience, rankings may suffer from mobile usability issues invisible during desktop testing.

Validate that mobile page speed meets acceptable thresholds. Mobile users on cellular connections experience different performance characteristics than desktop users on broadband. Test mobile performance through real-world conditions, throttled connections, varied device capabilities, rather than solely through desktop simulations of mobile experiences.

## Content Integrity and Quality Preservation

Manually review 50-100 pages across different templates, comparing rendered content on the new site against archived versions of the old site. Content migrations sometimes truncate text, strip formatting, lose images, or corrupt special characters, degradations that reduce content quality and comprehensiveness signals.

Verify that content hierarchy remains intact. If your old site used H1, H2, H3 tags appropriately and the new site flattened everything to H2 tags, you've lost semantic structure that helps Google understand content organization. Check heading tag distribution through a crawl and compare against old site patterns.

Confirm that media elements, images, videos, infographics, embedded in content still function correctly with proper alt text, captions, and responsive sizing. Missing images or broken video embeds create poor user experience and may trigger quality algorithm penalties if widespread across the site. The [alt-text-seo-guide](alt-text-seo-guide.html) covers image optimization best practices.

Review supplementary content elements: author bios, related articles, calls-to-action, and navigation elements. These components contribute to engagement metrics and user satisfaction. If your migration stripped sidebars or footer content, pages may appear less comprehensive or useful compared to pre-migration versions.

## Local SEO Elements for Multi-Location Businesses

If your site represents a local business or multi-location enterprise, verify that **NAP (Name, Address, Phone)** information displays consistently across all location pages and matches data in Google Business Profile listings. Inconsistent NAP data confuses local ranking algorithms and dilutes local search visibility.

Check that location pages maintained their URL structure or implement proper redirects. Local pages often accumulate authority through citations and local backlinks. If migration altered location page URLs without redirects, you've orphaned valuable local search equity.

Validate that LocalBusiness structured data persists on location pages with complete information: business name, address, phone, hours, geographic coordinates, and service areas. Local structured data helps Google populate local pack results and knowledge panels.

Test location page rankings through localized searches. Use tools like **BrightLocal** or manually search from different geographic locations to verify that location pages appear for "near me" queries and city-specific keyword variations. Local ranking drops post-migration often trace to NAP inconsistencies or lost local backlinks.

## E-commerce Specific Migration Checks

For e-commerce sites, verify that product pages maintained URL structure or have proper redirects from old product URLs. Product pages typically have longer URLs including product names, SKUs, or category paths, each variation needs explicit redirect mapping.

Check that product schema remains intact: price, availability, review ratings, and images. Missing or incorrect product schema prevents product rich results and Google Shopping feed functionality. Validate schema on multiple product pages, including out-of-stock products and products with variants.

Test shopping cart and checkout functionality across multiple browsers and devices. Some migrations introduce JavaScript errors that prevent cart operations on specific browser versions or break checkout on mobile devices. Broken e-commerce functionality drives immediate revenue loss and increases bounce rates that signal quality problems to Google.

Validate that review content and ratings persisted through migration. Product reviews contribute substantially to conversion rates and provide user-generated content that improves topical comprehensiveness. If reviews were lost or display incorrectly, urgently restore them from backups or data exports.

## Analytics and Tracking Verification

Confirm that **Google Analytics** tracking fires correctly on all page types and records page views, events, and conversions accurately. Tag manager migrations sometimes break event tracking through variable name changes or trigger misconfigurations. Test critical conversion events, form submissions, purchases, downloads, to verify tracking continuity.

Compare traffic patterns in the first week post-migration against the week prior. Traffic should remain stable within normal weekly variation ranges (±15%). Dramatic traffic drops indicate technical issues blocking users or Googlebot. DNS problems, redirect errors, or server capacity failures.

Set up custom alerts in Analytics for anomalous traffic patterns: sudden drops exceeding 30%, increases in bounce rates above 75%, or referral traffic from unexpected sources that may indicate scraping or hotlinking issues.

Validate that UTM parameter handling works correctly if you use campaign tracking extensively. Some redirect rules strip query parameters, breaking campaign attribution and preventing accurate ROI measurement for paid traffic.

## Ongoing Monitoring Schedule Post-Audit

Establish a monitoring cadence post-migration: daily checks for the first week, twice weekly for the following three weeks, then weekly for three months. Most migration issues surface within the first month, but delayed effects, gradual ranking decay, accumulating crawl errors, or seasonal traffic pattern disruptions, require extended monitoring.

Create a migration scorecard tracking key metrics weekly: total indexed pages, average ranking position for top 100 keywords, organic traffic volume, Core Web Vitals performance, and crawl error counts. Plot these metrics over time to identify trends and establish when migration effects stabilize.

Document all issues discovered and corrections implemented. Future migrations benefit from understanding failure modes, what broke, why, and how fixes were applied. This institutional knowledge reduces risk for subsequent relaunches, platform changes, or domain consolidations. The [weekly-seo-health-check-audit](weekly-seo-health-check-audit.html) provides ongoing monitoring frameworks.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Post-Launch Audits Matter More Than Pre-Migration Planning:** Pre-migration testing occurs in staging environments that approximate production but cannot replicate real crawl behavior, DNS propagation delays, or CDN caching interactions.
* **Redirect Chain Validation and Mapping Verification:** Begin by crawling your entire old domain through a tool like Screaming Frog SEO Spider configured to follow redirects.
* **Indexing Status and Google Search Console Monitoring:** Submit both old and new XML sitemaps to Google Search Console immediately post-launch, even if pre-migration planning included sitemap submission.
* **Rankings and Traffic Pattern Analysis:** Export pre-migration ranking data for your top 500 keywords from your rank tracking tool, whether Ahrefs, SEMrush, or Google Search Console performance reports.
* **Internal Linking Architecture Verification:** Crawl the new site with Screaming Frog to generate a comprehensive internal link graph.
* **Canonical Tag and Meta Directives Audit:** Systematically verify canonical tags across the new site.

## Frequently Asked Questions

### How long does it take for Google to fully process a site migration?

Google typically recrawls and reassesses migrated URLs over a 4-8 week period for medium-sized sites (under 10,000 pages). Large sites with millions of pages may require 3-6 months for complete migration recognition. Ranking recovery often lags behind indexing, even after Google indexes all new URLs, rankings may take additional weeks to stabilize as the algorithm recalculates authority scores and topical relevance. Submit a change of address in Google Search Console and maintain redirects indefinitely to accelerate the process.

### Should I keep redirects active permanently or can I remove them after rankings recover?

Maintain 301 redirects indefinitely. While most link equity transfers within weeks, users continue clicking old URLs from bookmarks, external sites that never updated links, and archived content. Removing redirects eventually converts these into 404 errors, creating poor user experience and wasting residual traffic. The server overhead for maintaining redirects is minimal compared to the ongoing value they provide. Only remove redirects for URLs that genuinely represent retired content with no ongoing traffic or backlink value. The [audit-cleanup-old-redirects](audit-cleanup-old-redirects.html) guide covers redirect lifecycle management.

### What percentage of traffic loss is normal during a site migration?

Well-executed migrations typically experience 5-15% temporary traffic fluctuation during the first two weeks post-launch, recovering to baseline or better within 30-60 days. Traffic drops exceeding 20% indicate migration issues requiring immediate investigation. Drops above 40% represent severe technical problems, broken redirects, indexing blocks, or catastrophic performance degradation. Normal volatility stems from Google recrawling and reassessing pages; abnormal drops trace to technical failures preventing successful crawling, indexing, or ranking.

### How do I know if my migration failed versus normal ranking volatility?

Distinguish migration failures from normal volatility through pattern analysis. Normal volatility affects random subsets of keywords with rankings fluctuating 1-3 positions up and down. Migration failures manifest as systematic drops across keyword clusters, specific page types, or entire site sections, all product pages losing rankings, all blog posts dropping, or brand keywords disappearing. Use crawl data to correlate ranking drops with technical issues like broken redirects, missing canonicals, or noindex tags. If technical health remains strong but rankings dropped, content quality or internal linking changes during migration may be responsible.

### Can I migrate without losing any rankings at all?

Perfect migrations preserving 100% of rankings are rare but achievable for small sites with meticulous execution. Realistic expectations: 90-95% ranking preservation through the transition window, with full recovery to pre-migration performance within 60 days. Large, complex sites inevitably experience some ranking fluctuation as Google recrawls millions of pages, reassesses content quality on a new platform, and adjusts authority distributions across altered internal linking structures. Focus on minimizing duration and magnitude of ranking drops rather than eliminating them entirely.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
