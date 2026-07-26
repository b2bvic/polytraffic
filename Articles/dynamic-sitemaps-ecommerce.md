---
title:: Dynamic Sitemaps for E-Commerce: Auto-Generate Product XML Sitemaps
description:: Build dynamic XML sitemaps for e-commerce sites that auto-update when products change. Handle 100K+ SKUs with database-driven sitemap generation.
focus_keyword:: dynamic sitemaps ecommerce
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Dynamic Sitemaps for E-Commerce: Auto-Generate Product XML Sitemaps

> **Quick Summary**
> - **What this covers:** Build dynamic XML sitemaps for e-commerce sites that auto-update when products change. Handle 100K+ SKUs with database-driven sitemap generation.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why E-Commerce Sites Need Dynamic Sitemaps](#why-e-commerce-sites-need-dynamic-sitemaps)
- [Phase 1: Design Database-Driven Sitemap Architecture](#phase-1-design-database-driven-sitemap-architecture)
- [Phase 2: Implement Dynamic Sitemap Generation (PHP)](#phase-2-implement-dynamic-sitemap-generation-php)
- [Phase 3: Implement Pagination for Large Catalogs](#phase-3-implement-pagination-for-large-catalogs)
- [Phase 4: Optimize with Caching](#phase-4-optimize-with-caching)
- [Phase 5: WooCommerce Dynamic Sitemaps](#phase-5-woocommerce-dynamic-sitemaps)
- [Phase 6: Include Product Images](#phase-6-include-product-images)
- [Phase 7: Automate Sitemap Submission](#phase-7-automate-sitemap-submission)
- [Advanced: Product Variants and SKUs](#advanced-product-variants-and-skus)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Dynamic sitemaps** query product databases on-demand to generate XML sitemaps, eliminating manual sitemap regeneration when inventory changes and ensuring accurate `lastmod` dates reflecting actual product updates. E-commerce sites with 10,000+ SKUs, daily price changes, and frequent stock updates face stale static sitemaps that list out-of-stock products with outdated modification dates, wasting [crawl budget](crawl-budget-optimization-large-sites.html) while **Googlebot** misses new releases. Database-driven sitemap generation connects directly to product tables, filters by status (published/in-stock), and streams sitemap XML responses without writing files to disk, scaling to millions of products without memory exhaustion. Static sitemap approaches, manually exporting CSVs, cron jobs writing XML files hourly, or plugins generating sitemaps that don't reflect database timestamps, lag behind inventory reality and hit memory limits above 50,000 products. This guide implements real-time dynamic sitemaps with PHP/MySQL, WordPress WooCommerce, and automated submission to **Google Search Console**.

## Why E-Commerce Sites Need Dynamic Sitemaps

**Product inventory changes constantly:**
- New products added daily
- Prices updated hourly
- Stock status changes (in-stock → out-of-stock)
- Product descriptions edited
- Products discontinued

**Static sitemaps can't keep pace.** Problems:
- Out-of-stock products listed (wasted crawl budget)
- New products missing (delayed indexing)
- Inaccurate `lastmod` dates (Google recrawls unchanged products)

**Dynamic sitemaps solve this:**
- Query database in real-time
- Include only published, in-stock products
- Accurate `lastmod` from `updated_at` timestamps
- No manual regeneration

## Phase 1: Design Database-Driven Sitemap Architecture

**Connect sitemap generation directly to product database.**

### Database Schema Requirements

**Products table must include:**
```sql
CREATE TABLE products (
  id INT PRIMARY KEY,
  slug VARCHAR(255),
  status ENUM('published', 'draft', 'discontinued'),
  created_at DATETIME,
  updated_at DATETIME, -- Critical for lastmod
  INDEX idx_status (status),
  INDEX idx_updated (updated_at)
);
```

**Index on `status` and `updated_at`** for fast sitemap queries.

### Sitemap URL Structure

**Single sitemap (small sites <50K products):**
```
/sitemap.xml
```

**Sitemap index (large sites >50K products):**
```
/sitemap-index.xml
  ├── /sitemap-products-1.xml (products 1-50,000)
  ├── /sitemap-products-2.xml (products 50,001-100,000)
  └── /sitemap-categories.xml (category pages)
```

**Pagination parameter:**
```
/sitemap-products.xml?page=1
/sitemap-products.xml?page=2
```

See [large site sitemap creation](create-xml-sitemap-large-site.html) for architecture strategies.

## Phase 2: Implement Dynamic Sitemap Generation (PHP)

**Serve sitemap directly from database query.**

### Basic Product Sitemap (PHP + MySQL)

```php
<?php
header('Content-Type: application/xml; charset=utf-8');

// Database connection
$pdo = new PDO('mysql:host=localhost;dbname=ecommerce', 'user', 'pass');

// Query published products
$stmt = $pdo->query('
  SELECT slug, updated_at
  FROM products
  WHERE status = "published"
  ORDER BY updated_at DESC
  LIMIT 50000
');

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

while ($row = $stmt->fetch()) {
  $url = 'https://example.com/products/' . htmlspecialchars($row['slug']);
  $lastmod = date('c', strtotime($row['updated_at']));

  echo '<url>';
  echo '<loc>' . $url . '</loc>';
  echo '<lastmod>' . $lastmod . '</lastmod>';
  echo '<changefreq>weekly</changefreq>';
  echo '<priority>0.8</priority>';
  echo '</url>';
}

echo '</urlset>';
?>
```

**Save as `/sitemap-products.php`.**

**Access:** `https://example.com/sitemap-products.php`

### Add URL Rewriting

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteRule ^sitemap-products\.xml$ /sitemap-products.php [L]
```

**Nginx:**
```nginx
location = /sitemap-products.xml {
  rewrite ^(.*)$ /sitemap-products.php last;
}
```

**Access:** `https://example.com/sitemap-products.xml` (clean URL)

## Phase 3: Implement Pagination for Large Catalogs

**50,000 URL limit** requires pagination.

### Paginated Sitemap (PHP)

```php
<?php
header('Content-Type: application/xml; charset=utf-8');

$pdo = new PDO('mysql:host=localhost;dbname=ecommerce', 'user', 'pass');

// Get page number from query string
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$perPage = 50000;
$offset = ($page - 1) * $perPage;

// Query products with pagination
$stmt = $pdo->prepare('
  SELECT slug, updated_at
  FROM products
  WHERE status = "published"
  ORDER BY id ASC
  LIMIT :limit OFFSET :offset
');
$stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

while ($row = $stmt->fetch()) {
  $url = 'https://example.com/products/' . htmlspecialchars($row['slug']);
  $lastmod = date('c', strtotime($row['updated_at']));

  echo '<url>';
  echo '<loc>' . $url . '</loc>';
  echo '<lastmod>' . $lastmod . '</lastmod>';
  echo '</url>';
}

echo '</urlset>';
?>
```

**Access pages:**
- `sitemap-products.xml?page=1`
- `sitemap-products.xml?page=2`

### Generate Dynamic Sitemap Index

**Sitemap index links to paginated sitemaps:**
```php
<?php
header('Content-Type: application/xml; charset=utf-8');

$pdo = new PDO('mysql:host=localhost;dbname=ecommerce', 'user', 'pass');

// Count total products
$stmt = $pdo->query('SELECT COUNT(*) FROM products WHERE status = "published"');
$total = $stmt->fetchColumn();
$perPage = 50000;
$pages = ceil($total / $perPage);

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

for ($i = 1; $i <= $pages; $i++) {
  echo '<sitemap>';
  echo '<loc>https://example.com/sitemap-products.xml?page=' . $i . '</loc>';
  echo '<lastmod>' . date('c') . '</lastmod>';
  echo '</sitemap>';
}

echo '</sitemapindex>';
?>
```

**Submit index to Search Console:**
```
https://example.com/sitemap-index.xml
```

## Phase 4: Optimize with Caching

**Database queries on every sitemap request** slow response times.

### Implement Redis Caching

**Cache sitemap for 1 hour:**
```php
<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$cacheKey = 'sitemap-products-page-' . $page;

// Check cache
$cached = $redis->get($cacheKey);
if ($cached) {
  header('Content-Type: application/xml; charset=utf-8');
  echo $cached;
  exit;
}

// Generate sitemap (database query as above)
ob_start();
// ... sitemap XML generation code ...
$sitemap = ob_get_clean();

// Cache for 1 hour
$redis->setex($cacheKey, 3600, $sitemap);

header('Content-Type: application/xml; charset=utf-8');
echo $sitemap;
?>
```

### Invalidate Cache on Product Updates

**Clear cache when products change:**
```php
// After updating product in database
$redis->del('sitemap-products-page-1');
$redis->del('sitemap-products-page-2');
// ... clear all pages
```

**Or use wildcard deletion:**
```php
$keys = $redis->keys('sitemap-products-page-*');
foreach ($keys as $key) {
  $redis->del($key);
}
```

## Phase 5: WooCommerce Dynamic Sitemaps

**WooCommerce** stores products in custom post types.

### WooCommerce Sitemap with WP_Query

```php
<?php
header('Content-Type: application/xml; charset=utf-8');

$args = [
  'post_type' => 'product',
  'post_status' => 'publish',
  'posts_per_page' => 50000,
  'meta_query' => [
    [
      'key' => '_stock_status',
      'value' => 'instock', // Only in-stock products
    ],
  ],
];

$products = new WP_Query($args);

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

while ($products->have_posts()) {
  $products->the_post();
  $url = get_permalink();
  $lastmod = get_the_modified_date('c');

  echo '<url>';
  echo '<loc>' . esc_url($url) . '</loc>';
  echo '<lastmod>' . $lastmod . '</lastmod>';
  echo '</url>';
}

wp_reset_postdata();
echo '</urlset>';
?>
```

**Save as theme file or plugin.**

### Exclude Out-of-Stock Products

**Modify meta_query to include only in-stock:**
```php
'meta_query' => [
  [
    'key' => '_stock_status',
    'value' => 'instock',
  ],
],
```

**Benefits:**
- Google doesn't crawl out-of-stock products
- Saves [crawl budget](crawl-budget-optimization-large-sites.html)
- Better user experience (search results show available products)

## Phase 6: Include Product Images

**Image sitemaps** help images rank in Google Images.

### Add Image Sitemap Extension

```php
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
             xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

while ($row = $stmt->fetch()) {
  $url = 'https://example.com/products/' . htmlspecialchars($row['slug']);
  $imageUrl = 'https://example.com/images/' . htmlspecialchars($row['image']);

  echo '<url>';
  echo '<loc>' . $url . '</loc>';
  echo '<image:image>';
  echo '<image:loc>' . $imageUrl . '</image:loc>';
  echo '<image:title>' . htmlspecialchars($row['name']) . '</image:title>';
  echo '</image:image>';
  echo '</url>';
}

echo '</urlset>';
```

**Note:** Each URL can contain multiple `<image:image>` blocks for product galleries.

## Phase 7: Automate Sitemap Submission

**Notify Google when sitemap updates.**

### Ping Google After Product Updates

**PHP function:**
```php
function ping_google_sitemap() {
  $sitemapUrl = 'https://example.com/sitemap.xml';
  $pingUrl = 'https://www.google.com/ping?sitemap=' . urlencode($sitemapUrl);

  $ch = curl_init($pingUrl);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_exec($ch);
  curl_close($ch);
}

// Call after bulk product update
ping_google_sitemap();
```

### Schedule Periodic Pings (Cron)

**Even with dynamic sitemaps, ping Google periodically:**
```bash
# Cron job: ping Google every 6 hours
0 */6 * * * curl "https://www.google.com/ping?sitemap=https://example.com/sitemap.xml"
```

### Use Google Indexing API (Real-Time)

**For urgent product launches:**
```python
from oauth2client.service_account import ServiceAccountCredentials
import httplib2
import json

SCOPES = ["https://www.googleapis.com/auth/indexing"]
credentials = ServiceAccountCredentials.from_json_keyfile_name('service-account.json', scopes=SCOPES)
http = credentials.authorize(httplib2.Http())

ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
content = {
  "url": "https://example.com/products/new-product",
  "type": "URL_UPDATED"
}

response, content = http.request(ENDPOINT, method="POST", body=json.dumps(content))
print(response, content)
```

**Limit:** 200 URLs/day (request quota increase for high-volume stores).

## Advanced: Product Variants and SKUs

**Products with variants** (color/size options) create sitemap complexity.

### Strategy 1: Parent Product Only

**Include only parent product URL:**
```php
SELECT DISTINCT parent_id, slug, updated_at
FROM products
WHERE parent_id IS NULL AND status = "published"
```

**Variants accessible via parent page** (users select color/size on product page).

### Strategy 2: Each Variant as Separate URL

**E-commerce with unique URLs per variant:**
```
/products/tshirt-red-small
/products/tshirt-red-medium
/products/tshirt-blue-small
```

**Include all variants in sitemap:**
```php
SELECT slug, updated_at
FROM products
WHERE status = "published" -- includes parent and variants
```

**Use [canonical tags](dynamic-canonical-tags-faceted-navigation.html)** to consolidate variants to parent if needed.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why E-Commerce Sites Need Dynamic Sitemaps:** See large site sitemap creation for architecture strategies.
* **Phase 1: Design Database-Driven Sitemap Architecture:** See large site sitemap creation for architecture strategies.
* **Phase 2: Implement Dynamic Sitemap Generation (PHP):** // Database connection
$pdo = new PDO('mysql:host=localhost;dbname=ecommerce', 'user', 'pass');
* **Phase 3: Implement Pagination for Large Catalogs:** $pdo = new PDO('mysql:host=localhost;dbname=ecommerce', 'user', 'pass');
* **Phase 5: WooCommerce Dynamic Sitemaps:** $args = [
  'posttype' => 'product',
  'poststatus' => 'publish',
  'postsperpage' => 50000,
  'metaquery' => [
    [
      'key' => 'stockstatus',
      'value

## Frequently Asked Questions

### How often should dynamic sitemaps update?

**Dynamic sitemaps query database on every request**, always current. Use **caching** (1-6 hours) to balance freshness and performance. Invalidate cache after product updates. For real-time updates, skip caching but ensure database queries are fast (<100ms). See [crawl budget optimization](crawl-budget-optimization-large-sites.html).

### Should I include out-of-stock products in sitemaps?

**No.** Exclude out-of-stock products to prevent wasting [crawl budget](crawl-budget-optimization-large-sites.html) on unavailable inventory. If product will restock soon (1-2 weeks), keep in sitemap. If discontinued permanently, remove and return 410 Gone status. See [404 page guide](custom-404-page-seo-guide.html) for handling deleted products.

### Do dynamic sitemaps slow down my site?

**Only if uncached.** Database queries on every request add 100-500ms latency. **Implement caching** (Redis, Memcached) to serve sitemaps from memory. Google and bots don't request sitemaps frequently, typically once per day. Performance impact on user-facing pages is zero (users don't access sitemaps). See [database optimization](database-query-optimization-wordpress.html).

### Can I use dynamic sitemaps with static site generators?

**Hybrid approach:** Generate static sitemaps at build time (Gatsby, Next.js), then use serverless function for dynamic updates. Example: Netlify Function queries product API, returns XML. Best of both: fast static base + real-time updates for new products. Pure static sitemaps work if build/deploy happens after every product change.

### Should I split sitemaps by product category or update frequency?

**Both strategies work.** Split by category for easier management (electronics, apparel, home goods). Split by update frequency for crawl efficiency (new products daily, evergreen products monthly). See [large site sitemap architecture](create-xml-sitemap-large-site.html). For >100K products, use hybrid: category sitemaps with pagination.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
