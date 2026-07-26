---
title:: How to Fix "Too Many Redirects" Error (Redirect Loop) in WordPress and Beyond
description:: Diagnose and resolve redirect loop errors caused by .htaccess conflicts, SSL issues, CDN misconfigurations, and plugin conflicts that break site accessibility.
focus_keyword:: fix too many redirects error
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix "Too Many Redirects" Error (Redirect Loop) in WordPress and Beyond

> **Quick Summary**
> - **What this covers:** Diagnose and resolve redirect loop errors caused by .htaccess conflicts, SSL issues, CDN misconfigurations, and plugin conflicts that break site accessibility.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Redirect Loops Break SEO Immediately](#why-redirect-loops-break-seo-immediately)
- [Diagnosing the Redirect Loop](#diagnosing-the-redirect-loop)
- [Fixing HTTPS/HTTP Redirect Loops](#fixing-https-http-redirect-loops)
- [Fixing WWW vs. Non-WWW Loops](#fixing-www-vs-non-www-loops)
- [Fixing WordPress Plugin Conflicts](#fixing-wordpress-plugin-conflicts)
- [Fixing CDN and Proxy Loops](#fixing-cdn-and-proxy-loops)
- [Fixing Server Configuration Loops](#fixing-server-configuration-loops)
- [Clearing Browser and Server Cache](#clearing-browser-and-server-cache)
- [WordPress Database URL Fix](#wordpress-database-url-fix)
- [Preventing Future Redirect Loops](#preventing-future-redirect-loops)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


The **"Too Many Redirects"** error (ERR_TOO_MANY_REDIRECTS in Chrome, "Page isn't redirecting properly" in Firefox) occurs when URL A redirects to URL B, which redirects back to URL A, creating an infinite loop. Browsers abort after 5-10 redirects to prevent crashes. The site becomes completely inaccessible. **Googlebot** can't crawl, users can't visit, and rankings plummet within days.

Common causes: **HTTPS/HTTP mismatches** (site forces HTTPS but server redirects back to HTTP), **.htaccess conflicts** (multiple redirect rules fighting), **WordPress URL settings** (site URL ≠ home URL), **CDN/proxy issues** (Cloudflare forwarding loops), and **plugin conflicts** (SEO plugins with conflicting redirect rules). This guide systematically isolates and fixes each trigger.

## Why Redirect Loops Break SEO Immediately

**Googlebot** follows redirects but terminates after detecting loops. **Search Console** reports the affected URLs as "Redirect error" under **Pages > Why pages aren't indexed**. These pages disappear from search results within 24-48 hours of the error appearing.

**Crawl budget** gets wasted on failed redirect attempts. If your homepage loops, **Googlebot** burns its daily crawl allotment trying to access one URL instead of discovering new content. Sites with redirect loops see **70-90% crawl rate drops** in Search Console's **Crawl Stats** report.

**User experience** craters, bounce rate becomes 100% because no one can load the page. If the loop affects the homepage or category archives, traffic stops completely. E-commerce sites lose revenue instantly. Every hour the error persists costs conversions and rankings.

## Diagnosing the Redirect Loop

Before fixing, identify where the loop originates.

### Check the Redirect Chain

Use **curl** with headers follow:

```bash
curl -I -L https://example.com
```

The `-L` flag follows redirects. Output shows each hop:

```
HTTP/2 301
Location: https://www.example.com

HTTP/2 301
Location: https://example.com

HTTP/2 301
Location: https://www.example.com
...
```

This reveals a WWW ↔ non-WWW loop. The site redirects https://example.com → https://www.example.com → https://example.com infinitely.

### Test HTTP vs. HTTPS

Redirect loops often stem from protocol conflicts:

```bash
curl -I http://example.com
curl -I https://example.com
```

If **HTTP** redirects to **HTTPS**, then **HTTPS** redirects back to **HTTP**, you have an SSL configuration issue.

### Use Redirect Checker Tools

**Redirect Detective** (redirectdetective.com) visualizes chains:

1. Enter your URL
2. Click **Check Redirects**
3. See the redirect path and loop detection

**HTTPStatus** (httpstatus.io) provides similar analysis.

### WordPress-Specific Loop Detection

If you can't access wp-admin, check from the command line:

```bash
curl -I https://example.com/wp-admin/
```

If wp-admin loops but the frontend doesn't, the issue is WordPress-specific (plugin or settings).

## Fixing HTTPS/HTTP Redirect Loops

The most common cause: forcing HTTPS incorrectly.

### Check .htaccess HTTPS Rules

Conflicting HTTPS rules create loops. Open `.htaccess`:

```bash
nano /var/www/html/.htaccess
```

**Bad configuration**:

```apache
# Rule 1: Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [L,R=301]

# Rule 2: Force HTTPS (duplicate)
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Two rules fighting each other. **Fix**: Keep only one rule.

**Correct configuration**:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Save and test.

### Fix Server-Level SSL Redirect

If `.htaccess` looks clean, check **Apache** virtual host config:

```bash
sudo nano /etc/apache2/sites-available/example.com.conf
```

Look for conflicting redirects:

```apache
<VirtualHost *:80>
  ServerName example.com
  Redirect permanent / https://example.com/
</VirtualHost>

<VirtualHost *:443>
  ServerName example.com
  # SSL config
</VirtualHost>
```

This forces HTTP → HTTPS. If your `.htaccess` also forces HTTPS, loops occur when proxies or CDNs forward requests as HTTP internally.

### Cloudflare SSL/TLS Settings

**Cloudflare** proxies traffic, often causing SSL loops.

1. Go to **Cloudflare Dashboard > SSL/TLS**
2. Check the setting:
   - **Off**: No encryption (rarely used)
   - **Flexible**: Encrypts visitor ↔ Cloudflare, but Cloudflare ↔ origin is HTTP
   - **Full**: Encrypts visitor ↔ Cloudflare ↔ origin (self-signed cert OK)
   - **Full (Strict)**: Encrypts visitor ↔ Cloudflare ↔ origin (valid cert required)

If set to **Flexible** and your server forces HTTPS, loops occur:

1. Visitor requests https://example.com
2. **Cloudflare** forwards as http://origin-server
3. Origin redirects to https://origin-server
4. **Cloudflare** sees HTTPS request, forwards as HTTP
5. Loop

**Fix**: Change to **Full** or **Full (Strict)** if you have a valid SSL cert.

## Fixing WWW vs. Non-WWW Loops

Inconsistent canonical domain settings create loops.

### Standardize in .htaccess

**Force non-WWW**:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.example\.com$ [NC]
RewriteRule ^(.*)$ https://example.com/$1 [L,R=301]
```

**Force WWW**:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^example\.com$ [NC]
RewriteRule ^(.*)$ https://www.example.com/$1 [L,R=301]
```

Choose one. Don't use both.

### WordPress Settings Match

Go to **Settings > General** (if accessible):

- **WordPress Address (URL)**: https://example.com
- **Site Address (URL)**: https://example.com

Both must match exactly (same protocol, same WWW/non-WWW). Mismatches cause loops.

If locked out of wp-admin, edit via **wp-config.php**:

```php
define('WP_HOME', 'https://example.com');
define('WP_SITEURL', 'https://example.com');
```

Add these above `/* That's all, stop editing! */`.

### Search Console Canonical Domain

Set your preferred domain in **Search Console > Settings > Property**. If you chose non-WWW but your server redirects to WWW, fix the server config to match.

## Fixing WordPress Plugin Conflicts

Redirect plugins can conflict with `.htaccess` rules or each other.

### Deactivate All Plugins

If locked out, rename the plugins folder via FTP:

```bash
mv /wp-content/plugins /wp-content/plugins-disabled
```

Try accessing the site. If it loads, a plugin caused the loop. Rename back:

```bash
mv /wp-content/plugins-disabled /wp-content/plugins
```

Then deactivate plugins one-by-one via **phpMyAdmin**:

```sql
UPDATE wp_options
SET option_value = ''
WHERE option_name = 'active_plugins';
```

This deactivates all plugins. Reactivate individually in wp-admin to find the culprit.

### Common Plugin Culprits

**Really Simple SSL**: Misconfigured SSL settings cause loops. Deactivate, fix `.htaccess`, then reconfigure.

**Yoast SEO / RankMath**: Redirect features can conflict with `.htaccess`. Disable redirect modules in plugin settings.

**Redirection**: Custom redirects that create circular chains. Check **Tools > Redirection > Log** to see redirect chains.

### Delete Problematic Redirects

In **Redirection plugin**:

1. Go to **Tools > Redirection > Redirects**
2. Sort by **Hits** to find active redirects
3. Delete any that form loops (e.g., `/page-a/` → `/page-b/`, `/page-b/` → `/page-a/`)

## Fixing CDN and Proxy Loops

**Cloudflare**, **Cloudfront**, and other proxies introduce complexity.

### Disable Cloudflare Temporarily

**Cloudflare > DNS** → Toggle the proxy icon to **DNS Only** (gray cloud). This bypasses Cloudflare's proxy, revealing whether the loop originates from Cloudflare or the origin server.

If the loop disappears, the issue is Cloudflare configuration (SSL/TLS mode, page rules, redirects).

### Check Cloudflare Page Rules

**Cloudflare > Rules > Page Rules**:

Look for conflicting forwarding rules:

- Rule 1: `http://example.com/*` → `https://example.com/$1`
- Rule 2: `https://example.com/*` → `https://www.example.com/$1`

These create WWW/non-WWW + HTTPS loops. Consolidate into a single rule.

### AWS CloudFront Forwarding

**CloudFront** can forward HTTP headers incorrectly, causing loops. Check **Behaviors > Viewer Protocol Policy**:

- Set to **Redirect HTTP to HTTPS** if your origin expects HTTPS
- Set to **HTTP and HTTPS** if your origin handles redirects

If set to **Redirect HTTP to HTTPS** and your origin also redirects, loops occur.

## Fixing Server Configuration Loops

**Nginx** and **Apache** virtual host misconfigurations cause loops.

### Nginx Redirect Loop Fix

Check `/etc/nginx/sites-available/example.com`:

**Bad**:

```nginx
server {
  listen 80;
  server_name example.com www.example.com;
  return 301 https://example.com$request_uri;
}

server {
  listen 443 ssl;
  server_name example.com www.example.com;
  return 301 https://example.com$request_uri; # Loop!
}
```

The HTTPS block redirects to itself.

**Fix**:

```nginx
server {
  listen 80;
  server_name example.com www.example.com;
  return 301 https://example.com$request_uri;
}

server {
  listen 443 ssl;
  server_name www.example.com;
  return 301 https://example.com$request_uri;
}

server {
  listen 443 ssl;
  server_name example.com;

  # SSL config
  # Site content
}
```

Separate blocks for WWW redirect and canonical domain.

### Apache Virtual Host Loop Fix

Check `/etc/apache2/sites-available/example.com.conf`:

**Bad**:

```apache
<VirtualHost *:443>
  ServerName example.com
  Redirect permanent / https://example.com/
</VirtualHost>
```

Redirects to itself.

**Fix**: Remove the redirect from the HTTPS block. HTTPS block should serve content, not redirect.

## Clearing Browser and Server Cache

Caches store old redirect rules.

### Clear Browser Cache

**Chrome**: Cmd+Shift+Delete → **Cached images and files** → Clear

**Firefox**: Cmd+Shift+Delete → **Cache** → Clear Now

Or use Incognito/Private mode to bypass cache.

### Clear WordPress Cache Plugins

**WP Rocket**: **WP Rocket > Clear Cache**

**W3 Total Cache**: **Performance > Dashboard > Empty All Caches**

**LiteSpeed Cache**: **LiteSpeed Cache > Toolbox > Purge All**

### Clear Server-Side Cache

**Varnish**:

```bash
sudo varnishadm "ban req.url ~ ."
```

**Nginx FastCGI Cache**:

```bash
sudo rm -rf /var/cache/nginx/*
sudo systemctl restart nginx
```

### Clear CDN Cache

**Cloudflare**: **Caching > Configuration > Purge Everything**

**Cloudfront**: **Invalidations > Create Invalidation** → enter `/*` to purge all paths

## WordPress Database URL Fix

Direct database edits fix locked-out sites.

### Update Site URL via phpMyAdmin

1. Access **phpMyAdmin**
2. Select your WordPress database
3. Open **wp_options** table
4. Find rows where `option_name` = `'siteurl'` and `'home'`
5. Edit **option_value** to match your canonical URL (e.g., `https://example.com`)
6. Save

### SQL Query for Bulk Update

```sql
UPDATE wp_options SET option_value = 'https://example.com' WHERE option_name = 'siteurl';
UPDATE wp_options SET option_value = 'https://example.com' WHERE option_name = 'home';
```

Run in **phpMyAdmin > SQL** tab.

## Preventing Future Redirect Loops

### .htaccess Version Control

Keep a backup of working `.htaccess`:

```bash
cp .htaccess .htaccess.backup
```

Before making changes, test locally or on staging. Never edit `.htaccess` directly on production without a backup.

### Monitor Redirect Chains

Set up **UptimeRobot** to monitor your site:

1. Add a monitor at uptimerobot.com
2. Set **Monitor Type** to **HTTP(s)**
3. Set **URL** to your homepage
4. Enable **Alert when down**

**UptimeRobot** detects redirect loops and emails alerts.

### Test After SSL Changes

Every time you modify SSL settings:

1. Clear all caches (browser, server, CDN)
2. Test in multiple browsers
3. Use `curl -I -L` to verify redirect chains
4. Check mobile separately (mobile networks sometimes cache differently)


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Redirect Loops Break SEO Immediately:** Before fixing, identify where the loop originates.
* **Diagnosing the Redirect Loop:** Before fixing, identify where the loop originates.
* **Fixing HTTPS/HTTP Redirect Loops:** The most common cause: forcing HTTPS incorrectly.
* **Fixing WWW vs. Non-WWW Loops:** Inconsistent canonical domain settings create loops.
* **Fixing WordPress Plugin Conflicts:** Redirect plugins can conflict with .htaccess rules or each other.
* **Fixing CDN and Proxy Loops:** If the loop disappears, the issue is Cloudflare configuration (SSL/TLS mode, page rules, redirects).

## FAQ

**Q: Can redirect loops fix themselves?**
No. Loops persist until you change server configuration or plugin settings.

**Q: Why does the loop affect only some browsers?**
Browser cache. One browser cached old redirect rules. Clear cache or test in Incognito.

**Q: Can I fix redirect loops without FTP/SSH access?**
If you have **cPanel** or hosting dashboard access, use **File Manager** to edit `.htaccess` and **phpMyAdmin** to update database. If not, contact your host.

**Q: How long do redirect loops take to fix rankings?**
Once fixed, **Googlebot** recrawls within 24-48 hours. Rankings typically recover within 7 days if the loop was brief.

**Q: Do redirect loops trigger penalties?**
No, but **Google** treats looped pages as inaccessible. They drop from the index until fixed.

**Q: Can malware cause redirect loops?**
Yes. Malware injects malicious redirects. Scan with **Wordfence** or **Sucuri** if loops appear suddenly without configuration changes.

**Q: Should I use 301 or 302 for HTTPS redirects?**
**301 (permanent)**. This tells browsers and search engines to always use HTTPS.

**Q: Why does curl show different results than the browser?**
Browsers cache redirects and handle cookies differently. `curl` shows raw server responses.

**Q: Can multiple CDNs cause loops?**
Yes. If you stack **Cloudflare** and **CloudFront**, conflicting redirect rules cause loops. Use one CDN per site.

**Q: What's the fastest way to diagnose the exact loop cause?**
Disable Cloudflare (DNS only mode), deactivate all plugins, remove .htaccess rules. Test after each step to isolate the culprit.

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

