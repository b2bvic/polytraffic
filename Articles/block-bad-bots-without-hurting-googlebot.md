---
title:: How to Block Bad Bots Without Hurting Googlebot
description:: Bad bots waste server resources and crawl budget. Block them with robots.txt and server rules without accidentally blocking Googlebot or legitimate crawlers.
focus_keyword:: block bad bots robots.txt
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Block Bad Bots Without Hurting Googlebot

> **Quick Summary**
> - **What this covers:** Bad bots waste server resources and crawl budget. Block them with robots.txt and server rules without accidentally blocking Googlebot or legitimate crawlers.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [What Bad Bots Do](#what-bad-bots-do)
- [How to Identify Bad Bots](#how-to-identify-bad-bots)
- [How to Block Bad Bots with robots.txt](#how-to-block-bad-bots-with-robots-txt)
- [How to Block Bad Bots with .htaccess (Apache)](#how-to-block-bad-bots-with-htaccess-apache)
- [How to Block Bad Bots with Nginx](#how-to-block-bad-bots-with-nginx)
- [How to Verify You Didn't Block Googlebot](#how-to-verify-you-didn-t-block-googlebot)
- [Advanced Bot Blocking with Cloudflare](#advanced-bot-blocking-with-cloudflare)
- [Should You Block SEO Tool Bots (Ahrefs, Semrush)?](#should-you-block-seo-tool-bots-ahrefs-semrush)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Bad bots, scrapers, spam bots, vulnerability scanners, consume server resources, waste crawl budget, and skew analytics. They make hundreds of requests per minute, slowing down your site for real users and legitimate crawlers like **Googlebot**. Blocking them frees resources and protects your site from scraping, brute-force attacks, and DDoS attempts.

But aggressive bot blocking can backfire. Block the wrong user agent and you accidentally ban **Googlebot**, **Bingbot**, or other search engine crawlers, killing your organic traffic. This guide shows how to identify and block bad bots while preserving access for legitimate crawlers.

## What Bad Bots Do

### 1. Content Scraping

Bots copy your content to republish on scraper sites, diluting your SEO value and potentially outranking you with your own content.

### 2. Vulnerability Scanning

Automated security scanners probe your site for exploits, trying SQL injection, XSS attacks, and brute-force login attempts.

### 3. Spam Bot Activity

Comment spam bots, form spam bots, and fake account registration bots flood your site with junk submissions.

### 4. Resource Hogging

High-frequency bots make thousands of requests per hour, consuming bandwidth and server CPU. This slows down your site for real users.

### 5. Analytics Pollution

Bot traffic inflates pageview counts and skews user behavior metrics, making analytics data unreliable.

## How to Identify Bad Bots

### Step 1: Check Server Logs

Review server access logs to identify suspicious user agents.

**Apache:**
```bash
tail -1000 /var/log/apache2/access.log | grep -v "Googlebot" | grep -v "Bingbot" | awk '{print $14}' | sort | uniq -c | sort -rn | head -20
```

This shows the top 20 user agents excluding Googlebot and Bingbot.

**Nginx:**
```bash
tail -1000 /var/log/nginx/access.log | grep -v "Googlebot" | grep -v "Bingbot" | awk '{print $12}' | sort | uniq -c | sort -rn | head -20
```

Look for unfamiliar or generic user agents (e.g., `Mozilla/5.0`, `Python-requests`, `curl`).

### Step 2: Monitor Request Volume

Bad bots make far more requests than humans. Check request frequency:

```bash
awk '{print $1}' /var/log/apache2/access.log | sort | uniq -c | sort -rn | head -10
```

This shows the top 10 IP addresses by request count. If one IP has 1,000+ requests in a short period, it's likely a bot.

### Step 3: Analyze User Agent Strings

Common bad bot user agents:
- `Ahrefs Bot` (SEO tool bot, blocks are controversial; it helps your site get discovered via Ahrefs)
- `SemrushBot` (SEO tool bot)
- `MJ12bot` (Majestic bot)
- `DotBot` (scraper bot)
- `PetalBot` (Aspiegel bot)
- `Bytespider` (TikTok bot, aggressive crawler)
- `AhrefsBot`
- `SeznamBot`
- `YandexBot` (Russian search engine, block if you don't target Russia)

**Legitimate bots you should NOT block:**
- `Googlebot` (Google)
- `Bingbot` (Microsoft Bing)
- `Slurp` (Yahoo)
- `DuckDuckBot` (DuckDuckGo)
- `facebookexternalhit` (Facebook link previews)
- `LinkedInBot` (LinkedIn link previews)

### Step 4: Check for Scraping Patterns

Scraper bots often:
- Request pages in alphabetical order
- Request every page in your sitemap
- Ignore robots.txt rules
- Use generic user agents (`Python-requests`, `curl`, `Wget`)

## How to Block Bad Bots with robots.txt

The `robots.txt` file tells bots which pages they can and can't crawl. **Well-behaved bots** obey robots.txt. **Malicious bots** ignore it.

### Block Specific Bots

```
User-agent: BadBot
Disallow: /

User-agent: ScraperBot
Disallow: /

User-agent: AhrefsBot
Disallow: /
```

Replace `BadBot` and `ScraperBot` with actual user agent names from your logs.

### Block All Bots Except Legitimate Crawlers

```
User-agent: *
Disallow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /
```

This blocks everything by default, then explicitly allows **Googlebot**, **Bingbot**, and **DuckDuckBot**.

**Warning:** This is aggressive. Only use if you're facing a severe bot attack. Blocking all bots by default may exclude beneficial crawlers you haven't identified.

### Limitations of robots.txt

- **robots.txt is a request, not enforcement**. Malicious bots ignore it
- **Publicly visible**. Anyone can view your robots.txt, revealing which pages you're trying to hide
- **No IP-based blocking**, robots.txt can't block specific IP addresses

For enforcement, use server-level blocks (see below).

## How to Block Bad Bots with .htaccess (Apache)

`.htaccess` enforces bot blocks at the server level. Unlike robots.txt, bots can't ignore these rules.

### Block Specific User Agents

```apache
# Block bad bots by user agent
SetEnvIfNoCase User-Agent "BadBot" bad_bot
SetEnvIfNoCase User-Agent "ScraperBot" bad_bot
SetEnvIfNoCase User-Agent "AhrefsBot" bad_bot

Order Allow,Deny
Allow from all
Deny from env=bad_bot
```

### Block User Agents with Regex

```apache
SetEnvIfNoCase User-Agent "(bot|crawler|spider|scraper)" bad_bot
Order Allow,Deny
Allow from all
Deny from env=bad_bot
```

**Warning:** This blocks any user agent containing "bot," "crawler," "spider," or "scraper" including **Googlebot**. Don't use unless you whitelist legitimate bots first.

### Whitelist Googlebot, Then Block Everything Else

```apache
# Allow Googlebot
SetEnvIfNoCase User-Agent "Googlebot" good_bot

# Allow Bingbot
SetEnvIfNoCase User-Agent "Bingbot" good_bot

# Block everything else
SetEnvIfNoCase User-Agent ".*" bad_bot

Order Allow,Deny
Allow from env=good_bot
Deny from env=bad_bot
```

### Block by IP Address

If a bad bot uses a specific IP range:

```apache
Order Allow,Deny
Allow from all
Deny from 123.456.78.90
Deny from 98.765.43.21
```

To block an IP range:

```apache
Deny from 123.456.78.0/24
```

## How to Block Bad Bots with Nginx

### Block User Agents in nginx.conf

```nginx
# Block bad bots
if ($http_user_agent ~* (BadBot|ScraperBot|AhrefsBot) ) {
    return 403;
}
```

### Block Multiple User Agents

```nginx
map $http_user_agent $bad_bot {
    default 0;
    ~*BadBot 1;
    ~*ScraperBot 1;
    ~*AhrefsBot 1;
    ~*PetalBot 1;
}

server {
    if ($bad_bot) {
        return 403;
    }
}
```

### Block by IP Address

```nginx
deny 123.456.78.90;
deny 98.765.43.21;
allow all;
```

## How to Verify You Didn't Block Googlebot

### Test with Google Search Console

**Google Search Console > URL Inspection:**

1. Enter a URL from your site
2. Click **Test Live URL**
3. If Google can access the page, **Googlebot** isn't blocked

### Check robots.txt with Google's Tester

**Google Search Console > Legacy tools and reports > robots.txt Tester:**

1. Enter your site
2. Test a URL
3. Verify **Googlebot** can access it

### Use curl to Simulate Googlebot

```bash
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://yoursite.com
```

If you get a 200 response, **Googlebot** can access the page. If you get 403, you blocked it.

## Advanced Bot Blocking with Cloudflare

**Cloudflare** provides bot protection at the DNS/CDN level, blocking bots before they reach your server.

### Enable Bot Fight Mode (Free Plans)

1. **Cloudflare Dashboard > Security > Bots**
2. Enable **Bot Fight Mode**
3. Cloudflare automatically blocks known bad bots

### Use Firewall Rules (Paid Plans)

**Security > WAF > Firewall Rules:**

Create custom rules to block specific user agents or IP ranges:

**Block AhrefsBot:**
```
(http.user_agent contains "AhrefsBot") → Block
```

**Block traffic from specific countries:**
```
(ip.geoip.country in {"RU" "CN"}) → Block
```

**Challenge bots (CAPTCHA instead of block):**
```
(cf.bot_management.score < 30) → Challenge
```

## Should You Block SEO Tool Bots (Ahrefs, Semrush)?

**Controversial decision.** Arguments for both sides:

### Reasons to Allow SEO Tool Bots

- **They help others discover your site**. Ahrefs and Semrush help SEOs find your content via their tools
- **Backlink discovery**. Ahrefs indexes backlinks to your site, which helps you monitor your link profile
- **Competitive analysis**. Blocking them doesn't prevent competitors from analyzing your site (they can scrape directly)

### Reasons to Block SEO Tool Bots

- **Resource consumption**. These bots are aggressive crawlers, hitting your site hard
- **Competitive intelligence**. You may not want competitors analyzing your site structure or content strategy
- **Crawl budget waste**. On large sites, SEO tool bots consume crawl budget better spent on **Googlebot**

**Recommendation:** Allow them unless server load is a problem. If they're causing resource issues, rate-limit them via Cloudflare or robots.txt (use `Crawl-delay: 10` to slow them down).


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **What Bad Bots Do:** Bots copy your content to republish on scraper sites, diluting your SEO value and potentially outranking you with your own content.
* **How to Identify Bad Bots:** Review server access logs to identify suspicious user agents.
* **How to Block Bad Bots with robots.txt:** The robots.txt file tells bots which pages they can and can't crawl.
* **How to Block Bad Bots with .htaccess (Apache):** .htaccess enforces bot blocks at the server level.
* **How to Block Bad Bots with Nginx:** server {
    if ($badbot) {
        return 403;
    }
}

## Frequently Asked Questions

### How do I know if I accidentally blocked Googlebot?

Test with **Google Search Console > URL Inspection > Test Live URL**. If Google can't access the page, check your robots.txt and server rules for accidental blocks.

### Can I block bots by country?

Yes, using Cloudflare or server-level geo-blocking. Block by country code in Cloudflare Firewall Rules or use GeoIP modules in Apache/Nginx.

### What's the difference between blocking in robots.txt vs .htaccess?

**robots.txt** is a polite request that bots can ignore. **.htaccess** enforces the block at the server level, bots cannot bypass it.

### Should I block bots that ignore robots.txt?

Yes. If a bot ignores robots.txt, it's malicious or misconfigured. Block it via .htaccess or Nginx config.

### Will blocking bots improve my site speed?

Yes, if bots are consuming significant server resources. Blocking high-frequency bots reduces server load and can improve response times for real users.

## Next Steps

Review your server logs to identify high-frequency bots. Block malicious or unwanted bots via robots.txt and .htaccess. Test with **Google Search Console** to verify you didn't block **Googlebot**. Monitor server load after implementing blocks to confirm resource usage decreases. For related guidance, see [Robots.txt SEO Guide](/articles/robots-txt-seo-guide.html), [Googlebot Crawl Rate: Monitor and Control](/articles/googlebot-crawl-rate-monitor-control.html), and [Fix Crawl Budget Waste](/articles/fix-crawl-budget-waste.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
