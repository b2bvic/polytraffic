---
title:: How to Set Up a CDN for Speed Optimization
description:: CDNs cache your site globally and cut load times by 40-60%. But misconfigure one and you'll break caching, serve stale content, or leak origin server IPs.
focus_keyword:: CDN setup speed optimization
category:: speed
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Set Up a CDN for Speed Optimization

> **Quick Summary**
> - **What this covers:** CDNs cache your site globally and cut load times by 40-60%. But misconfigure one and you'll break caching, serve stale content, or leak origin server IPs.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why CDNs Improve Speed](#why-cdns-improve-speed)
- [CDN vs Origin Server: What Gets Cached](#cdn-vs-origin-server-what-gets-cached)
- [Step 1: Choose a CDN Provider](#step-1-choose-a-cdn-provider)
- [Step 2: Connect Your Site to the CDN](#step-2-connect-your-site-to-the-cdn)
- [Step 3: Configure Caching Rules](#step-3-configure-caching-rules)
- [Step 4: Enable Compression (Gzip and Brotli)](#step-4-enable-compression-gzip-and-brotli)
- [Step 5: Test CDN Delivery](#step-5-test-cdn-delivery)
- [Step 6: Purge Cache When Content Changes](#step-6-purge-cache-when-content-changes)
- [Step 7: Enable Origin Shielding](#step-7-enable-origin-shielding)
- [Step 8: Monitor CDN Performance](#step-8-monitor-cdn-performance)
- [Common Mistakes](#common-mistakes)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


A **Content Delivery Network (CDN)** caches your site's static assets (images, CSS, JavaScript) on servers distributed globally. When a user in Tokyo visits your site hosted in Virginia, they load assets from a Tokyo edge server instead of crossing the Pacific. Latency drops from 300ms to 20ms. Your **Time to First Byte (TTFB)** improves. Pages load faster.

But CDNs aren't plug-and-play. Misconfigure caching rules and you'll serve stale content. Skip origin shielding and you'll hammer your server with cache misses. Forget to update DNS and your CDN sits idle while users hit your origin directly.

This guide walks through setting up a CDN correctly, choosing a provider, configuring caching, testing edge delivery, and avoiding the mistakes that waste money or break your site.

## Why CDNs Improve Speed

### Latency Reduction

Distance kills speed. A server in Virginia takes 200-400ms to respond to a request from Australia. A CDN edge server in Sydney responds in 10-30ms. The farther users are from your origin, the more a CDN helps.

### Offloading Origin Server Load

Every request to your origin consumes server resources. A CDN caches static assets and serves them from edge servers, reducing origin requests by 70-90%. This lowers hosting costs and prevents server overload during traffic spikes.

### DDoS Protection and Uptime

Most CDNs include DDoS mitigation. Traffic floods hit the CDN's edge network, not your origin. Your server stays online even during attacks.

### HTTP/2 and HTTP/3 Support

Modern CDNs support **HTTP/2** (multiplexing, header compression) and **HTTP/3** (QUIC protocol, faster handshakes). Older hosting providers may not. Routing traffic through a CDN upgrades your protocol support automatically.

## CDN vs Origin Server: What Gets Cached

### What CDNs Cache

- **Static assets:** Images (JPG, PNG, WebP, SVG), CSS, JavaScript, fonts, PDFs
- **Media files:** Videos, audio files (if hosted on your domain)
- **HTML (optional):** Full-page caching for blogs or static sites

### What CDNs Don't Cache (By Default)

- **Dynamic content:** User-specific pages (account dashboards, shopping carts)
- **Authenticated content:** Pages behind login
- **API responses:** Unless explicitly configured

### How Caching Works

1. **User requests page** → CDN checks if it has a cached copy
2. **Cache hit** → CDN serves cached version from edge server (fast)
3. **Cache miss** → CDN fetches content from origin, caches it, then serves it (slower first time, fast for subsequent users)
4. **Cache expiration** → After TTL (Time to Live) expires, CDN refetches from origin

## Step 1: Choose a CDN Provider

### Top CDN Providers for SEO and Speed

| Provider | Best For | Pricing | Key Features |
|---|---|---|---|
| **Cloudflare** | Ease of use, free tier | Free - $200+/mo | DNS-based setup, firewall, DDoS protection, HTTP/3, Brotli compression |
| **Bunny CDN** | Cost-efficiency, pay-as-you-go | $0.01/GB | Pull zones, origin shielding, edge rules, perma-cache |
| **Fastly** | Enterprise, edge compute | $50+/mo | Real-time purging, edge logic (VCL), instant config changes |
| **KeyCDN** | Developer-friendly, API-first | $0.04/GB | Pull/push zones, raw logs, HTTP/2, Brotli |
| **Amazon CloudFront** | AWS ecosystem, scalability | Pay-as-you-go | Integrates with S3, Lambda@Edge, WAF |
| **StackPath** | Mid-market, managed | $10+/mo | Managed CDN + WAF, real-time analytics |

### Decision Criteria

- **Traffic volume:** High traffic → Cloudflare or CloudFront. Low traffic → Bunny or KeyCDN (cheaper per GB).
- **Technical skill:** Beginner → Cloudflare (DNS setup, automatic). Advanced → Fastly or KeyCDN (custom rules).
- **Budget:** Free → Cloudflare. Pay-per-use → Bunny. Enterprise → Fastly.
- **Features needed:** WAF + DDoS → Cloudflare or StackPath. Edge compute → Fastly or Lambda@Edge.

## Step 2: Connect Your Site to the CDN

CDNs integrate in two ways: **DNS-based (proxy)** or **origin pull (subdomain)**.

### Method 1: DNS-Based (Full Site Proxy). Cloudflare Example

**How it works:** You change your domain's nameservers to the CDN's. All traffic routes through the CDN.

**Steps:**

1. **Sign up for Cloudflare** → Add your domain
2. **Cloudflare scans DNS records** → Import existing A, CNAME, MX records
3. **Change nameservers at your registrar** → Replace GoDaddy/Namecheap nameservers with Cloudflare's
4. **Wait for propagation** → 1-24 hours for DNS to update globally
5. **Enable proxy (orange cloud)** → In Cloudflare dashboard, ensure DNS records have orange cloud icon (proxied) not grey (DNS-only)

**Pros:** Easiest setup. Caches entire site. Built-in firewall and analytics.
**Cons:** DNS change required. Can break email if MX records aren't configured correctly.

### Method 2: Origin Pull (Subdomain CNAME). Bunny CDN Example

**How it works:** You create a subdomain (`cdn.yoursite.com`) that points to the CDN. You rewrite asset URLs to load from the subdomain.

**Steps:**

1. **Sign up for Bunny CDN** → Create a Pull Zone
2. **Set origin URL** → Enter your site's URL (`https://yoursite.com`)
3. **Get CDN hostname** → Bunny provides a URL like `yourpullzone.b-cdn.net`
4. **Add CNAME record** → In your DNS, create a CNAME: `cdn.yoursite.com` → `yourpullzone.b-cdn.net`
5. **Rewrite asset URLs** → Change image/CSS/JS paths from `/images/photo.jpg` to `https://cdn.yoursite.com/images/photo.jpg`

**Pros:** No nameserver change. Fine-grained control over what's cached.
**Cons:** Requires URL rewriting (plugin or manual). Doesn't cache HTML by default.

## Step 3: Configure Caching Rules

### Set Cache TTL (Time to Live)

TTL determines how long assets stay cached before the CDN refetches from origin.

**Recommended TTLs:**

| Asset Type | TTL | Why |
|---|---|---|
| Images | 1 year | Rarely change |
| CSS/JS | 1 week - 1 month | Versioned with query strings or hashes |
| Fonts | 1 year | Static |
| HTML | 1 hour - 1 day | Dynamic content changes frequently |
| API responses | No cache or 1 minute | User-specific data |

**Example (Cloudflare Page Rules):**

```
URL: *yoursite.com/images/*
Cache Level: Cache Everything
Edge Cache TTL: 1 year
Browser Cache TTL: 1 year
```

**Example (Bunny CDN Edge Rules):**

```
If Request URL matches /images/*
Set Cache Expiry: 31536000 seconds (1 year)
```

### Cache-Control Headers (Origin Server)

Your origin server sends `Cache-Control` headers that tell the CDN how to cache:

```
Cache-Control: public, max-age=31536000
```

- **`public`**: Cacheable by CDN and browsers
- **`max-age=31536000`**: Cache for 1 year (31,536,000 seconds)
- **`no-cache`**: CDN must revalidate before serving cached copy
- **`no-store`**: Do not cache (for sensitive data)

**Apache (.htaccess):**

```apache
<IfModule mod_headers.c>
  <FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000"
  </FilesMatch>
</IfModule>
```

**Nginx:**

```nginx
location ~* \.(jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2)$ {
  add_header Cache-Control "public, max-age=31536000";
}
```

### Bypass Cache for Dynamic Content

Don't cache user-specific or authenticated pages:

**Cloudflare Page Rules:**
```
URL: *yoursite.com/account/*
Cache Level: Bypass
```

**Bunny CDN:**
```
If Request URL matches /account/*
Bypass Cache: Enabled
```

## Step 4: Enable Compression (Gzip and Brotli)

CDNs compress assets before serving them, reducing transfer size by 60-80%.

### Cloudflare

**Settings > Speed > Optimization:**
- **Auto Minify:** Enable CSS, JS, HTML (removes whitespace)
- **Brotli:** Enabled by default (check under Speed tab)

### Bunny CDN

**Pull Zone Settings > Optimizer:**
- **Enable Bunny Optimizer** → Compresses images on-the-fly
- **Brotli Compression** → Enabled by default

### Origin Server (Fallback)

If CDN doesn't compress, enable on origin:

**Apache (.htaccess):**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json
</IfModule>
```

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

## Step 5: Test CDN Delivery

### Verify Assets Load From CDN

1. **Open Chrome DevTools** → Network tab
2. **Load your site** → Filter by "Img" or "CSS"
3. **Check Response Headers** → Look for `CF-Cache-Status` (Cloudflare) or `X-Cache` (other CDNs)

**Cloudflare:**
```
CF-Cache-Status: HIT
```

**Bunny/KeyCDN:**
```
X-Cache: HIT
```

**If you see `MISS`:** Asset wasn't cached yet. Reload the page, second load should show `HIT`.

### Test Speed From Multiple Locations

Use **WebPageTest.org:**

1. Enter your URL
2. Select **multiple test locations** (Virginia, Tokyo, Sydney)
3. Compare TTFB and load times **before and after** CDN setup

**Expected improvement:** TTFB drops by 40-70% in distant locations.

### Use Pingdom or GTmetrix

Both tools test from global servers and report CDN performance:

- **Pingdom** → Tools > Website Speed Test → Select location
- **GTmetrix** → Analyze from multiple locations

**Red flags:**
- Assets still loading from origin IP → DNS not propagated or CNAME misconfigured
- TTFB still high → Origin shielding disabled or cache rules too conservative

## Step 6: Purge Cache When Content Changes

When you update a CSS file or swap an image, the CDN serves the old cached version until TTL expires. You need to **purge the cache** manually.

### Cloudflare Cache Purge

**Dashboard > Caching > Purge Cache:**
- **Purge Everything** → Clears entire cache (use sparingly, forces all users to fetch from origin)
- **Custom Purge** → Specify URLs to purge (e.g., `/style.css`)

### Bunny CDN Purge

**Pull Zone > Purge Cache:**
- Enter specific file URL or purge all

### Automate Purge (Advanced)

Use CDN APIs to purge on deployment:

**Cloudflare API:**
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

**Bunny CDN API:**
```bash
curl -X POST "https://api.bunny.net/pullzone/{pull_zone_id}/purgeCache" \
  -H "AccessKey: {api_key}"
```

## Step 7: Enable Origin Shielding

**Origin shielding** places a middle-tier cache between edge servers and your origin. Instead of 100 edge servers requesting an asset from origin (on cache miss), they request it from the shield server. Only the shield requests from origin.

**Benefit:** Reduces origin load by 90%.

**Enable in:**
- **Cloudflare:** Argo Tiered Caching ($5/mo)
- **Bunny CDN:** Origin Shield (free, enable in settings)
- **CloudFront:** Origin Shield ($0.01 per 10K requests)

## Step 8: Monitor CDN Performance

### Metrics to Track

1. **Cache hit ratio**. Percentage of requests served from cache vs origin
   - **Target:** 80-95% hit ratio
   - **Low hit ratio?** → TTL too short, cache rules too strict, or assets not cacheable
2. **Bandwidth savings**. Traffic offloaded from origin
3. **TTFB**. Should drop by 40-70% in distant locations
4. **Origin requests**. Should decrease by 70-90%

### Cloudflare Analytics

**Dashboard > Analytics > Performance:**
- Cache hit ratio
- Bandwidth saved
- Requests by country

### Bunny CDN Analytics

**Dashboard > Statistics:**
- Cache hit ratio
- Bandwidth usage by zone
- Top files by requests

## Common Mistakes

### Mistake 1: Not Enabling Cloudflare Proxy (Orange Cloud)

DNS records set to **DNS-only (grey cloud)**. Traffic bypasses CDN.

**Fix:** Click DNS record → Toggle to **Proxied (orange cloud)**.

### Mistake 2: Caching Dynamic Content

User dashboards, shopping carts, or login pages cached. Users see each other's data.

**Fix:** Bypass cache for `/account/*`, `/cart/*`, `/checkout/*`.

### Mistake 3: No Cache Headers on Origin

Origin doesn't send `Cache-Control` headers. CDN caches assets for only 2 hours (default).

**Fix:** Add `Cache-Control: public, max-age=31536000` headers for static assets.

### Mistake 4: Purging Cache Too Often

You purge cache after every edit. Users constantly fetch from origin. Speed gains disappear.

**Fix:** Version assets with query strings (`style.css?v=2`) or hashes. No need to purge, new version loads automatically.

### Mistake 5: Forgetting to Test Global Load Times

You test from your location only. International users still see slow load times.

**Fix:** Use WebPageTest or Pingdom with **multiple test locations**.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Step 1: Choose a CDN Provider:** CDNs integrate in two ways: DNS-based (proxy) or origin pull (subdomain).
* **Step 2: Connect Your Site to the CDN:** CDNs integrate in two ways: DNS-based (proxy) or origin pull (subdomain).
* **Step 3: Configure Caching Rules:** TTL determines how long assets stay cached before the CDN refetches from origin.
* **Step 4: Enable Compression (Gzip and Brotli):** CDNs compress assets before serving them, reducing transfer size by 60-80%.

## Frequently Asked Questions

### Do I need a CDN if my hosting is fast?

Yes, if you have **global traffic**. Even the fastest server in Virginia will be slow for users in Australia. CDNs reduce latency by serving content from edge servers closer to users.

### Does a CDN improve Core Web Vitals?

Yes. CDNs reduce **TTFB** (server response time), which improves **Largest Contentful Paint (LCP)**. They also compress assets, reducing download time.

### Can I use a CDN with WordPress?

Yes. Plugins like **WP Rocket**, **W3 Total Cache**, or **LiteSpeed Cache** integrate with Cloudflare, Bunny CDN, and others. They rewrite asset URLs automatically.

### What happens if the CDN goes down?

If CDN is down, traffic fails (unless you have failover DNS). **Cloudflare** has 99.99%+ uptime. Smaller CDNs may have outages. Use a CDN with strong SLAs.

### Should I cache HTML pages?

Yes for **static sites** (blogs, landing pages). No for **dynamic sites** (e-commerce, dashboards). If caching HTML, set short TTL (1 hour) and purge on updates.

## Next Steps

Set up your CDN. Test load times before and after using WebPageTest from multiple locations. Enable Brotli compression and origin shielding. Monitor cache hit ratio, aim for 80%+. For related guidance, see [Fix Slow Server Response Time (TTFB)](/articles/fix-slow-server-response-time-ttfb.html), [Cloudflare Speed Optimization Guide](/articles/cloudflare-speed-optimization-guide.html), and [How to Fix Slow Website](/articles/how-to-fix-slow-website.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
