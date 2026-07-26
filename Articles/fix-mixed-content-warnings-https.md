---
title:: How to Fix Mixed Content Warnings on HTTPS Sites: Security Error Solutions
description:: Eliminate mixed content warnings that break HTTPS padlock icons and hurt SEO. Step-by-step fixes for scripts, images, and external resources loading over HTTP.
focus_keyword:: fix mixed content warnings https
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix Mixed Content Warnings on HTTPS Sites: Security Error Solutions

> **Quick Summary**
> - **What this covers:** Eliminate mixed content warnings that break HTTPS padlock icons and hurt SEO. Step-by-step fixes for scripts, images, and external resources loading over HTTP.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Understanding Mixed Content Types](#understanding-mixed-content-types)
- [Detecting Mixed Content Across Your Site](#detecting-mixed-content-across-your-site)
- [Fixing Mixed Content: Resource-Specific Solutions](#fixing-mixed-content-resource-specific-solutions)
- [Implementing Redirect Rules](#implementing-redirect-rules)
- [Testing Your Implementation](#testing-your-implementation)
- [Preventing Future Mixed Content](#preventing-future-mixed-content)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Mixed content warnings appear when an **HTTPS webpage** loads resources like images, scripts, or stylesheets through insecure HTTP connections. Browsers flag this as a security risk, breaking the padlock icon in the address bar and potentially blocking resources entirely. Google confirmed in 2014 that HTTPS serves as a ranking signal, making mixed content resolution critical for both security and SEO performance.

## Understanding Mixed Content Types

Browsers categorize mixed content into two severity levels that trigger different responses and require distinct approaches to fix.

### Passive Mixed Content

Passive mixed content includes resources that can't modify the page's core functionality. Images, video files, and audio elements fall into this category. When loaded over HTTP on an HTTPS page, they create warnings but typically don't get blocked automatically.

Chrome displays a shield icon in the address bar instead of the secure padlock when passive mixed content exists. Users can click this shield to allow the insecure resources, but most visitors won't investigate, they'll simply perceive your site as untrustworthy.

**Google Search Console** reports mixed content issues under the Security & Manual Actions section, specifically calling out pages with HTTP resources. Sites with persistent passive mixed content may experience gradual ranking erosion as user trust signals decline.

### Active Mixed Content

Active mixed content involves resources that can interact with and modify the page. JavaScript files, CSS stylesheets, iframe embeds, and XMLHttpRequest calls qualify as active content. Modern browsers like Chrome and Firefox automatically block active mixed content to prevent security exploits.

When a script gets blocked, any functionality depending on that script fails. Third-party analytics, payment processors, or interactive widgets may stop working entirely. Users encounter broken features without understanding the underlying cause.

**Lighthouse audits** flag blocked resources under the "Does not use HTTPS" diagnostic, directly impacting your Performance and Best Practices scores. Each blocked script represents both a security vulnerability and a functional failure.

## Detecting Mixed Content Across Your Site

Comprehensive detection requires multiple tools since mixed content can hide in dynamically loaded resources, cached templates, or third-party embeds.

### Browser Console Method

Chrome DevTools surfaces mixed content warnings in real time as pages load. Open DevTools (F12), go to the Console tab, then visit any HTTPS page on your site. Mixed content warnings appear highlighted in yellow with specific resource URLs.

The console distinguishes between blocked and allowed mixed content. Yellow warnings indicate passive content that loaded despite the HTTP protocol, while red errors show blocked active content. Note the exact URL and resource type for each instance.

Right-click any mixed content warning and select "Reveal in Network Panel" to see additional headers and timing information. This helps identify whether the resource originates from your CMS, a plugin, or a third-party service.

### Site-Wide Crawling

**Screaming Frog** detects mixed content during crawls when you enable JavaScript rendering. Configure the spider to execute JavaScript, then examine the Response Codes report filtering for "Mixed Content Warning" under the Status Code column.

The URI report shows which pages contain mixed content and lists specific HTTP resources on each page. Export this data to prioritize fixes starting with high-traffic pages.

**Sitebulb** provides visual mapping showing how mixed content distributes across your site architecture. The Hints section categorizes issues by type (images vs. scripts) and severity, making it easy to tackle the most impactful problems first.

### Search Console Reports

Google Search Console's Security Issues report explicitly calls out HTTPS pages with mixed content when Google encounters them during crawling. However, Search Console only reports issues Google discovers, it won't catch resources loaded client-side after initial page render.

Review the Security Issues report monthly even after implementing fixes, since new mixed content can appear when adding third-party tools or updating content management systems.

### Content Security Policy Headers

Implement **Content Security Policy (CSP)** headers that report mixed content violations without blocking them initially. Add this header to your site:

```
Content-Security-Policy-Report-Only: default-src https:; report-uri /csp-violation-report
```

Configure a logging endpoint at `/csp-violation-report` to collect violation data. This captures mixed content that might only appear for specific user segments or device types.

## Fixing Mixed Content: Resource-Specific Solutions

Different resource types require tailored approaches depending on whether you control the source and how the resource gets loaded.

### Hardcoded HTTP Links in HTML

The most straightforward mixed content involves HTTP URLs written directly into page templates or content. Search your codebase for `http://` strings appearing in image sources, script tags, and link elements.

Replace absolute HTTP URLs with protocol-relative URLs that inherit the parent page's protocol:

```html
<!-- Before -->
<img src="http://example.com/image.jpg">

<!-- After -->
<img src="//example.com/image.jpg">
```

Alternatively, if you control the external resource server, update all URLs to use HTTPS explicitly:

```html
<img src="https://example.com/image.jpg">
```

**WordPress** users can run database queries to replace HTTP references with HTTPS versions. The **Better Search Replace** plugin provides a safe interface for bulk URL updates, previewing changes before committing them.

### CMS-Generated URLs

Content management systems sometimes generate resource URLs based on site configuration settings. Check your **WordPress Settings > General** page to verify both "WordPress Address" and "Site Address" fields use HTTPS.

If your site recently migrated from HTTP to HTTPS, old posts may contain HTTP image URLs in the content body. Install the **Really Simple SSL** plugin to automatically rewrite HTTP resources to HTTPS on the fly without modifying stored data.

**Shopify** handles this automatically for internal resources, but custom themes may hardcode HTTP URLs in Liquid templates. Search theme files for `http://` and update to `https://` or use the `asset_url` filter which generates protocol-appropriate URLs.

### Third-Party Embeds and Widgets

External services like payment processors, chat widgets, and social media embeds often provide code snippets. Older embed codes may reference HTTP resources even when HTTPS versions exist.

Visit the third-party service's documentation to obtain updated embed codes. Most established services now default to HTTPS or protocol-relative URLs. For example, **Google Analytics** tracking codes should use:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

If a vendor doesn't offer HTTPS versions of their resources, consider whether the tool is essential. Sites relying on insecure third-party resources face ongoing security and compatibility risks.

### JavaScript-Loaded Resources

Scripts that dynamically construct URLs may inject HTTP references even when the initial script loads over HTTPS. Inspect your JavaScript files for URL construction patterns:

```javascript
// Problematic pattern
var imageUrl = 'http://' + domain + '/image.jpg';

// Secure alternative
var imageUrl = 'https://' + domain + '/image.jpg';

// Best practice: inherit from current page
var imageUrl = location.protocol + '//' + domain + '/image.jpg';
```

Use `location.protocol` to dynamically match the parent page's protocol, ensuring consistency regardless of how users access your site.

**AJAX requests** must explicitly specify HTTPS endpoints. Relative URLs work well for same-origin requests, but cross-origin calls need full HTTPS URLs to avoid mixed content.

### Content Delivery Networks

CDN configurations sometimes serve resources over HTTP when HTTPS is available. Check your CDN settings to verify HTTPS delivery is enabled and properly configured with valid SSL certificates.

**Cloudflare** users should enable "Automatic HTTPS Rewrites" under SSL/TLS > Edge Certificates. This feature automatically rewrites HTTP requests to HTTPS when secure versions exist.

**Amazon CloudFront** distributions require HTTPS-enabled behavior configurations. Edit distribution settings to set "Viewer Protocol Policy" to "Redirect HTTP to HTTPS" for all cache behaviors.

### Database Content Updates

For sites with extensive HTTP references embedded in database content, SQL queries enable bulk updates. Back up your database before running these commands.

WordPress MySQL example replacing HTTP with HTTPS in post content:

```sql
UPDATE wp_posts
SET post_content = REPLACE(post_content, 'http://yourdomain.com', 'https://yourdomain.com')
WHERE post_content LIKE '%http://yourdomain.com%';
```

Run similar queries for `wp_postmeta`, `wp_options`, and any custom tables storing serialized content that might contain URLs.

**Drupal** and **Joomla** require similar table-specific updates. Identify content tables through phpMyAdmin and modify queries to match your database structure and table prefixes.

## Implementing Redirect Rules

Server-level redirects ensure that even if HTTP URLs appear somewhere in your codebase, the server forces HTTPS delivery before browsers encounter mixed content warnings.

### Apache .htaccess Rules

Add these directives to your `.htaccess` file to redirect all HTTP traffic to HTTPS:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

This captures all HTTP requests and returns 301 redirects to their HTTPS equivalents, preserving path and query parameters.

For sites on **shared hosting**, verify that your host supports HTTPS and provides valid SSL certificates before implementing redirects, or users will encounter certificate errors.

### Nginx Configuration

Nginx requires server block modifications to redirect HTTP to HTTPS:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Rest of your configuration
}
```

Reload Nginx after configuration changes: `sudo systemctl reload nginx`

### HTTP Strict Transport Security

Once all mixed content is resolved, implement **HSTS headers** to instruct browsers to automatically upgrade HTTP requests to HTTPS before making network calls:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

This header tells browsers to enforce HTTPS for one year (31536000 seconds) across your entire domain including subdomains. After implementing HSTS, submit your domain to the [HSTS Preload List](https://hstspreload.org/) for inclusion in browser preload databases.

**Warning:** HSTS is difficult to reverse. Don't implement until you're certain all pages and subdomains support HTTPS correctly.

## Testing Your Implementation

After applying fixes, systematically verify that mixed content no longer appears and that all resources load correctly.

### Browser Testing Suite

Test your fixes across multiple browsers since mixed content handling varies:

- **Chrome:** Shows shield icon for passive mixed content, blocks active mixed content
- **Firefox:** Similar to Chrome with detailed console warnings
- **Safari:** Blocks mixed content more aggressively than Chrome
- **Edge:** Follows Chromium behavior for mixed content handling

Use **private/incognito windows** to bypass cached resources that might mask ongoing mixed content issues. Cache can serve HTTPS versions even when HTTP URLs still exist in code.

### Automated Monitoring

**Why No Padlock** (whynopadlock.com) provides free URL checks that identify mixed content and SSL configuration issues. Enter your homepage URL for an instant report showing specific HTTP resources.

**SSL Labs** (ssllabs.com/ssltest) grades SSL implementation and highlights mixed content problems as part of comprehensive security scoring. An A+ rating requires zero mixed content warnings.

Set up **Uptime Robot** or similar monitoring to alert you if mixed content reappears after updates or content changes. Configure monitors to check for the presence of secure padlock indicators.

### Search Console Verification

After fixing mixed content, request reindexing of affected pages through **Google Search Console**. Use the URL Inspection tool to check individual pages, then click "Request Indexing" for priority pages.

Monitor the Security Issues report for 2-3 weeks after fixes to confirm Google no longer detects mixed content during recrawls. The report updates as Google processes your pages.

## Preventing Future Mixed Content

Systematic safeguards prevent mixed content from reappearing as you add new features and content.

### Content Security Policy Enforcement

Upgrade from CSP reporting mode to enforcement mode after confirming no legitimate HTTPS resources get blocked:

```
Content-Security-Policy: default-src https:; img-src https: data:; script-src https: 'unsafe-inline'
```

This policy blocks all non-HTTPS resources except those explicitly allowed. The `'unsafe-inline'` exception for scripts should be removed once inline scripts are externalized.

Gradually tighten CSP policies over time, specifying exact domains rather than allowing all HTTPS sources. This protects against supply chain attacks through compromised third-party resources.

### Editorial Guidelines

Document standards requiring HTTPS URLs for all external resources. When content creators add images or embeds, they should verify protocol consistency.

**WordPress** users can configure the TinyMCE editor to strip HTTP protocols from pasted URLs, automatically converting them to protocol-relative format. Add this to your theme's `functions.php`:

```php
function force_https_in_editor($content) {
    return str_replace('src="http://', 'src="//', $content);
}
add_filter('content_save_pre', 'force_https_in_editor');
```

### Plugin and Theme Auditing

Before installing new WordPress plugins or themes, check for HTTP references in the code. Search downloaded files for `http://` patterns, excluding legitimate uses in comments or documentation.

**Theme Check** plugin flags HTTP resources during theme review. Run this before activating new themes to catch mixed content proactively.

Subscribe to security bulletins for your CMS platform. Mixed content vulnerabilities occasionally appear in core software, requiring prompt updates to maintain security.

### Third-Party Service Agreements

When contracting with external services that require embedding code (analytics, payments, customer support), specify HTTPS delivery as a requirement. Include this in vendor evaluation criteria.

Maintain an inventory of all third-party embeds with links to official documentation. When services announce updates, review whether new embed codes are available with improved security.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Understanding Mixed Content Types:** Browsers categorize mixed content into two severity levels that trigger different responses and require distinct approaches to fix.
* **Detecting Mixed Content Across Your Site:** Comprehensive detection requires multiple tools since mixed content can hide in dynamically loaded resources, cached templates, or third-party embeds.
* **Fixing Mixed Content: Resource-Specific Solutions:** Different resource types require tailored approaches depending on whether you control the source and how the resource gets loaded.
* **Implementing Redirect Rules:** Server-level redirects ensure that even if HTTP URLs appear somewhere in your codebase, the server forces HTTPS delivery before browsers encounter mixed content warnings.
* **Testing Your Implementation:** After applying fixes, systematically verify that mixed content no longer appears and that all resources load correctly.
* **Preventing Future Mixed Content:** Systematic safeguards prevent mixed content from reappearing as you add new features and content.

## Frequently Asked Questions

**Why does my site still show mixed content after I fixed all HTTP URLs?**

Browser cache may be serving old HTTP versions of resources. Clear your cache and test in an incognito window. Also check for HTTP references in CSS files loaded from CDNs, these can inject mixed content through background images or font URLs.

**Can I use protocol-relative URLs instead of HTTPS?**

Protocol-relative URLs (`//example.com/resource.js`) are acceptable but less explicit than HTTPS. They inherit the parent page's protocol, which could theoretically load HTTP versions if someone accesses your site via HTTP despite redirects. Explicit HTTPS is clearer and aligns with current best practices.

**Do mixed content warnings affect mobile rankings differently?**

Mobile browsers enforce mixed content blocking more strictly than desktop browsers, particularly for active content. Sites with unresolved mixed content may fail on mobile even if desktop users can load resources, directly impacting mobile ranking factors.

**How do I fix mixed content in iframe embeds?**

If you control the embedded content, update the iframe source to use HTTPS. If embedding third-party content, check if the provider offers HTTPS versions. Some services detect the parent page protocol and adjust automatically, but outdated embed codes may force HTTP.

**What's the difference between CSP report-only and enforcement mode?**

Report-only mode logs policy violations without blocking resources, useful during initial implementation to identify issues. Enforcement mode actively blocks violations, which can break functionality if configured incorrectly. Always test in report-only mode first.

**Can I fix mixed content with a plugin instead of manual code changes?**

WordPress plugins like Really Simple SSL automatically rewrite HTTP URLs to HTTPS at runtime without modifying stored data. This works well for sites with extensive HTTP references but adds processing overhead. Manual fixes are more performant long-term.

**Will fixing mixed content improve my Core Web Vitals?**

Indirectly, yes. Blocked scripts due to mixed content can delay rendering and interactivity. Resolving mixed content ensures all resources load efficiently, potentially improving Largest Contentful Paint (LCP) and First Input Delay (FID) if previously blocked resources were affecting these metrics.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
