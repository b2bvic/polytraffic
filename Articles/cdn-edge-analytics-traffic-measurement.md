---
title:: CDN and Edge Analytics: Measuring Traffic Before JavaScript Loads
description:: JavaScript analytics miss 8-18% of traffic—bot blockers, privacy tools, slow connections prevent client-side tracking. CDN edge analytics capture server-side reality.
focus_keyword:: CDN edge analytics traffic
category:: analytics
author:: Victor Valentine Romo
date:: 2026.02.07
---

# CDN and Edge Analytics: Measuring Traffic Before JavaScript Loads

Client-side analytics are blind to 12-22% of traffic.

**Google Analytics 4**, **Plausible**, **Fathom**, and most analytics platforms rely on **JavaScript** that executes in user's browser. JavaScript loads → fires tracking beacon → data recorded.

**The gap:** Not all visitors allow JavaScript to execute.

**Who's invisible:**
- Users with JavaScript disabled (1-3% of traffic, privacy-conscious or corporate networks)
- Bot blockers and ad blockers (8-15% of traffic, blocks analytics scripts)
- Slow connections where page loads but JavaScript times out (2-5%, mobile users in low-bandwidth areas)
- Privacy browser extensions that strip tracking pixels (3-8%, **Brave**, **Firefox** + privacy add-ons)
- Users who close tab before JavaScript loads (4-9%, high bounce rate pages)

**Combined:** 18-30% of actual HTTP requests never appear in client-side analytics.

**The solution:** Measure traffic at the edge—server-side, before content reaches browser. **CDN** (Content Delivery Network) logs capture every HTTP request, regardless of JavaScript execution. Edge analytics expose true traffic volume.

**Use cases:**
- Validate GA4 numbers (if GA4 shows 80k visits, edge logs show 95k → 16% undercounting)
- Measure bot traffic accurately (differentiate good bots vs malicious)
- Track performance before JavaScript loads (measure server response time independent of client rendering)
- Detect analytics blockers (compare edge requests to GA4 sessions, gap = blocked percentage)

**CDN edge analytics** = ground truth. Client-side analytics = sample of engaged users.

Links: [server-side-analytics-accurate-traffic](server-side-analytics-accurate-traffic.html), [direct-traffic-measurement-analytics](direct-traffic-measurement-analytics.html), [ga4-setup-multi-channel-tracking](ga4-setup-multi-channel-tracking.html)

---

## CDN Edge Logs vs Client-Side Analytics: Understanding the Gap

Two measurement layers capture different realities.

### What CDN Edge Logs Capture

**Edge logs = server-side records of HTTP requests.**

**CDN** (Cloudflare, Fastly, AWS CloudFront, Akamai) sits between user and origin server. Every request passes through CDN edge nodes.

**Edge logs record:**

| Field | Example | Use |
|-------|---------|-----|
| Request timestamp | 2026-02-07 14:32:18 UTC | Traffic timing analysis |
| Client IP | 192.0.2.146 | Geographic analysis, bot detection |
| User agent | Mozilla/5.0... Chrome/120.0 | Browser/device identification |
| Request URL | /blog/article-title | Page-level traffic |
| HTTP status | 200, 404, 500 | Success rate, error tracking |
| Bytes transferred | 124,583 bytes | Bandwidth consumption |
| Referrer | google.com, twitter.com | Traffic source |
| Cache status | HIT, MISS | Performance optimization |
| TLS version | TLS 1.3 | Security analysis |

**Crucially:** Edge logs capture **every HTTP request**, even if:
- Browser blocks JavaScript
- User closes tab before page loads
- Connection times out
- Bot makes request

**This is raw traffic reality.**

### What Client-Side Analytics Miss

**GA4** and similar tools require JavaScript execution + network beacon success.

**Failure points:**

**1. JavaScript load failure**
- Slow connection → user closes page before `gtag.js` loads
- Edge log: Request recorded (200 status, content served)
- GA4: No session (JavaScript never executed)

**2. Analytics blocker interference**
- User has **uBlock Origin**, **Privacy Badger**, **AdGuard**
- Blocker prevents `google-analytics.com` beacon
- Edge log: Request recorded
- GA4: No session

**3. Browser privacy settings**
- **Safari** Intelligent Tracking Prevention (ITP) limits cookies
- **Firefox** Enhanced Tracking Protection blocks GA4
- **Brave** blocks all analytics by default
- Edge log: Request recorded
- GA4: No session or severely limited data

**4. Corporate network filtering**
- Enterprise firewalls block analytics domains
- VPN configurations strip tracking
- Edge log: Request recorded
- GA4: No session

**5. Bot traffic**
- Search engine crawlers (**Googlebot**, **Bingbot**)
- Monitoring bots (**Pingdom**, **UptimeRobot**)
- Malicious scrapers
- Edge log: All requests recorded
- GA4: Typically filters bots (but not always accurately)

**Measurement comparison:**

**Example site:**
- Edge logs: 127,000 requests/month
- GA4 sessions: 94,000/month
- **Gap: 26%** (33,000 requests invisible to GA4)

**Gap breakdown:**
- Analytics blockers: 12,000 requests (38% of gap)
- Bot traffic: 15,000 requests (45%)
- JavaScript load failures: 4,000 requests (12%)
- Other: 2,000 requests (5%)

### Validating Client-Side Data with Edge Metrics

Cross-reference GA4 against edge logs to detect undercounting.

**Method 1: Total request comparison**

**Edge logs (Cloudflare Analytics):**
- Navigate to **Analytics → Traffic**
- Filter: Status code 200 (successful requests)
- Exclude: `/admin`, `/wp-login` (non-content pages)
- Total: 127,000 requests

**GA4:**
- Navigate to **Reports → Engagement → Pages and screens**
- Total pageviews: 102,000

**Discrepancy: 20%** (edge captures 25,000 more requests)

**Conclusion:** GA4 undercounts by ~20%. Either analytics blockers prevalent in audience or bot traffic higher than expected.

**Method 2: User-agent matching**

Edge logs contain user-agent strings. Extract and compare to GA4 browser distribution.

**Edge log browser breakdown:**
- Chrome: 68%
- Safari: 18%
- Firefox: 8%
- Edge: 4%
- Bots: 2%

**GA4 browser breakdown:**
- Chrome: 72%
- Safari: 19%
- Firefox: 7%
- Edge: 2%

**Discrepancy:** Edge shows 4% Edge browser, GA4 shows 2%. Suggests Edge users have higher analytics blocking rate (50% blocked).

**Action:** If targeting Edge users (enterprise audience), GA4 severely undercounts this segment.

**Method 3: Geographic validation**

Edge logs include client IP → GeoIP lookup.

**Edge geographic distribution:**
- US: 62%
- UK: 12%
- Canada: 8%
- Germany: 6%
- Other: 12%

**GA4 geographic distribution:**
- US: 64%
- UK: 13%
- Canada: 8%
- Germany: 5%
- Other: 10%

**Discrepancy:** Germany underrepresented in GA4 (6% edge vs 5% GA4). Possible higher privacy-tool adoption in Germany (GDPR-aware users).

---

## Implementing CDN Analytics Across Major Providers

Each CDN offers edge analytics. Setup varies.

### Cloudflare Analytics Setup and Interpretation

**Cloudflare** provides edge analytics natively (available on all plans, including Free).

**Access:**
1. Log in to Cloudflare dashboard
2. Select domain
3. Navigate to **Analytics & Logs**

**Key metrics:**

**Requests:**
- Total HTTP requests (includes cached + uncached)
- Breakdown: Cached vs uncached (cache HIT ratio)

**Bandwidth:**
- Total bytes served
- Saved bandwidth (via caching)

**Threats:**
- Blocked requests (firewall rules, rate limiting)
- Challenge served (CAPTCHAs)

**Performance:**
- Origin response time
- Edge response time (CDN processing)

**Traffic sources:**
- By country
- By referrer
- By user agent

**Custom filtering:**

**Cloudflare Logpush** (Business+ plans):
- Push raw edge logs to external analytics (Google BigQuery, AWS S3, Splunk)
- Custom analysis (SQL queries against log data)

**Example query (BigQuery):**

```sql
SELECT
  ClientRequestURI,
  COUNT(*) as requests,
  SUM(EdgeResponseBytes) as total_bytes
FROM edge_logs
WHERE EdgeResponseStatus = 200
  AND ClientRequestURI NOT LIKE '%/admin%'
GROUP BY ClientRequestURI
ORDER BY requests DESC
LIMIT 100
```

**Result:** Top 100 pages by edge request volume (true traffic, not GA4-filtered).

**Bot detection:**

Cloudflare classifies traffic:
- **Automated:** Bots (verified crawlers, monitoring tools)
- **Human:** Real users

**Filter:**
- View "Human traffic" only for comparison to GA4
- Compare "Human traffic" from Cloudflare to GA4 sessions
- Remaining gap = analytics blockers + JavaScript failures

**Validation workflow:**

1. Cloudflare total requests: 127,000
2. Filter out bot traffic: 112,000 (human requests)
3. GA4 sessions: 94,000
4. **Analytics blocking rate: 16%** (18,000 / 112,000)

### Fastly Real-Time Analytics Configuration

**Fastly** offers real-time edge analytics with granular filtering.

**Access:**
1. Log in to Fastly dashboard
2. Select service
3. Navigate to **Observability → Real-time analytics**

**Real-time dashboard:**

**Metrics updated every second:**
- Requests per second
- Bandwidth per second
- Cache hit ratio
- Error rate (4xx, 5xx)
- Origin latency

**Custom dimensions:**

Filter by:
- Geographic region (POP location)
- Device type (desktop, mobile, tablet)
- HTTP status code
- Content type (HTML, CSS, JS, images)

**Historical analysis:**

Navigate to **Observability → Historical stats**:
- Hourly aggregates for past 90 days
- Exportable to CSV
- Compare time periods (week-over-week, month-over-month)

**Advanced logging (Fastly Log Streaming):**

Send edge logs to:
- **Google Cloud Storage**
- **AWS S3**
- **Datadog**
- **Splunk**
- **Elasticsearch**

**Setup:**
1. Navigate to **Configure → Logging**
2. Select endpoint (e.g., S3)
3. Configure log format (JSON, Apache, custom)
4. Choose fields: `%{req.url}V %{resp.status}V %{client.geo.country_code}V`
5. Save, deploy

**Logs stream in real-time.**

**Comparing Fastly to GA4:**

**Fastly edge requests (HTML only):**

Filter: `Content-Type: text/html` (exclude CSS, JS, images)

- Total: 98,000 HTML requests

**GA4 pageviews:** 94,000

**Gap: 4%** (4,000 requests)

**Interpretation:** Low gap (4%) suggests minimal analytics blocking (audience less privacy-conscious or fewer bot requests).

### AWS CloudFront Logs and CloudWatch Metrics

**AWS CloudFront** separates real-time monitoring (CloudWatch) and detailed logs (access logs).

**CloudWatch Metrics (real-time):**

**Access:**
1. AWS Console → **CloudFront** → Select distribution
2. Navigate to **Monitoring** tab

**Metrics:**
- Requests (total HTTP requests)
- Bytes downloaded
- Bytes uploaded
- 4xx error rate
- 5xx error rate
- Cache hit rate

**Granularity:** 1-minute intervals

**Use case:** Real-time traffic spikes, performance monitoring.

**Access Logs (detailed historical):**

**Setup:**
1. CloudFront distribution settings
2. Enable **Standard Logging**
3. Specify S3 bucket for log storage
4. Logs delivered every ~1 hour

**Log format:** Tab-delimited text file

**Fields include:**
- Date, time
- Edge location
- Bytes sent
- Client IP
- HTTP method, path
- Status code
- Referrer
- User agent
- Query string

**Analysis:**

Upload logs to **AWS Athena** (SQL query engine):

**Athena table creation:**

```sql
CREATE EXTERNAL TABLE cloudfront_logs (
  request_date DATE,
  time STRING,
  location STRING,
  bytes BIGINT,
  request_ip STRING,
  method STRING,
  host STRING,
  uri STRING,
  status INT,
  referrer STRING,
  user_agent STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LOCATION 's3://your-bucket/cloudfront-logs/'
```

**Query example (top pages):**

```sql
SELECT
  uri,
  COUNT(*) as requests,
  COUNT(DISTINCT request_ip) as unique_ips
FROM cloudfront_logs
WHERE status = 200
  AND request_date >= DATE '2026-02-01'
GROUP BY uri
ORDER BY requests DESC
LIMIT 50
```

**Result:** True request volume per page (edge-level, pre-JavaScript).

**Comparing to GA4:**

Export GA4 page data, join with Athena results:

| Page | CloudFront Requests | GA4 Pageviews | Gap % |
|------|---------------------|---------------|-------|
| /homepage | 32,400 | 28,200 | 13% |
| /article-1 | 18,600 | 16,100 | 13% |
| /article-2 | 12,800 | 9,400 | 27% |

**Insight:** Article-2 has 27% gap (high analytics blocking). Possible causes:
- Shared on privacy-focused communities (**Hacker News**, **Reddit** privacy subs)
- Audience segment with high ad-blocker usage

---

## Analyzing Edge Data for Bot Traffic and Anomaly Detection

Edge logs expose non-human traffic client-side analytics miss.

### Distinguishing Good Bots from Malicious Scrapers

**Bot classification:**

**Good bots (allow):**
- **Googlebot** (search indexing)
- **Bingbot** (Bing indexing)
- **Slackbot** (link previews)
- **Facebot** (Facebook link previews)
- Monitoring services (**Pingdom**, **UptimeRobot**)

**Bad bots (block):**
- Content scrapers (steal articles)
- Credential stuffing bots
- Inventory hoarding bots (e-commerce)
- DDoS bots

**Neutral bots (evaluate):**
- **SEMrush** bot (competitor research)
- **Ahrefs** bot (backlink checking)
- Academic crawlers (research)

**Detection via user-agent:**

Edge logs include `User-Agent` header.

**Good bot user-agents:**

```
Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)
```

**Bad bot patterns:**
- Generic: `Mozilla/5.0` (no bot identifier, masquerading as browser)
- Outdated: `Mozilla/4.0` (ancient browser, likely bot)
- Suspicious: `python-requests`, `curl`, `wget` (scripting tools)

**Detection via request patterns:**

**Good bots:**
- Respect `robots.txt`
- Request rate: 1-5 requests/second (polite crawling)
- Follow links logically (homepage → category → article)

**Bad bots:**
- Ignore `robots.txt`
- Request rate: 20-200 requests/second (aggressive)
- Random URL access (direct deep-link requests without referrer)

**Cloudflare Bot Management:**

**Enable:**
1. **Security → Bots**
2. Select bot protection level:
   - **Off:** Allow all
   - **Essentially off:** Allow verified bots + humans
   - **Low:** Challenge suspicious bots
   - **Medium:** Challenge most bots (recommended)
   - **High:** Challenge all non-verified

**Bot Score:**

Cloudflare assigns score 1-99:
- **1-29:** Likely bot
- **30-55:** Possible bot
- **56-99:** Likely human

**Filter edge analytics:**

View traffic by Bot Score:
- Score 1-29: 8,200 requests (bots, consider blocking)
- Score 56-99: 104,000 requests (humans, compare to GA4)

**If GA4 shows 94,000 sessions and edge shows 104,000 human requests:**
- Analytics blocking rate: 9.6% (10,000 / 104,000)

### Detecting Analytics Blocker Prevalence

**Method: User-agent + edge log correlation**

**Step 1: Export edge logs**

Filter: Status 200, Content-Type `text/html`, Bot Score >56 (humans)

**Result:** 104,000 requests (verified human traffic)

**Step 2: Export GA4 user-agent data**

**GA4 → Explore → Free form**:
- Dimensions: Browser, Browser version
- Metrics: Sessions
- Export

**Result:** 94,000 sessions

**Step 3: Match distributions**

| Browser | Edge Requests | GA4 Sessions | Blocking Rate |
|---------|---------------|--------------|---------------|
| Chrome | 70,720 (68%) | 67,680 (72%) | 4.3% |
| Safari | 18,720 (18%) | 17,860 (19%) | 4.6% |
| Firefox | 8,320 (8%) | 6,580 (7%) | **20.9%** |
| Brave | 3,120 (3%) | 940 (1%) | **69.9%** |

**Insight:** **Firefox** users block analytics at 21% rate. **Brave** users (privacy browser) block at 70% rate.

**Audience implication:**

If targeting privacy-conscious users (developers, security professionals), expect 15-30% analytics undercounting.

### Rate Limiting and DDoS Detection

Edge analytics surface traffic spikes invisible to GA4.

**Anomaly: Request spike without session spike**

**Edge logs:**
- Feb 7, 14:00-15:00: 45,000 requests (30x normal)

**GA4:**
- Feb 7, 14:00-15:00: 3,200 sessions (normal)

**Discrepancy:** Edge spike not reflected in GA4 → automated traffic.

**Investigation:**

Filter edge logs for that hour:
- 42,000 requests from IP range `185.220.x.x`
- User-agent: `python-requests/2.28.1`
- Requested URLs: Random articles (no logical pattern)

**Diagnosis:** Scraper bot, likely harvesting content.

**Response:**

**Cloudflare Firewall Rule:**
1. **Security → WAF → Firewall rules**
2. Create rule: `(ip.src eq 185.220.0.0/16) then Block`
3. Deploy

**Result:** Bot blocked at edge, doesn't reach origin server.

**Legitimate spike detection:**

**Edge logs:**
- Feb 10, 09:00-12:00: 18,000 requests (10x normal)

**GA4:**
- Feb 10, 09:00-12:00: 16,400 sessions (9x normal)

**Correlation:** Both spike → legitimate viral traffic (article shared on **Hacker News**).

**Referrer analysis (edge logs):**

- 14,200 requests with referrer `news.ycombinator.com`

**Confirmation:** Viral traffic, not attack.

---

## Building Hybrid Analytics: Combining Edge and Client-Side Data

Neither edge nor client-side analytics alone tell full story. Combine for accuracy.

### Creating Unified Dashboard with Edge + GA4 Metrics

**Goal:** Single view showing edge reality + user engagement.

**Architecture:**

1. **Edge data source:** Cloudflare, Fastly, or CloudFront logs
2. **Client-side data:** GA4
3. **Data warehouse:** Google BigQuery, AWS Redshift, or Snowflake
4. **Visualization:** Looker Studio, Tableau, or custom dashboard

**ETL pipeline:**

**Step 1: Export edge logs to BigQuery**

**Cloudflare Logpush:**
- Destination: Google BigQuery
- Dataset: `cdn_logs`
- Table: `edge_requests`

**Schema:**

| Field | Type |
|-------|------|
| timestamp | TIMESTAMP |
| client_ip | STRING |
| url | STRING |
| status | INTEGER |
| bytes | INTEGER |
| user_agent | STRING |
| referrer | STRING |

**Step 2: Export GA4 to BigQuery**

**GA4 → Admin → BigQuery Links:**
- Enable daily export
- Dataset: `analytics_XXXXXX`
- Table: `events_YYYYMMDD`

**Step 3: Join datasets**

**BigQuery SQL:**

```sql
WITH edge_traffic AS (
  SELECT
    DATE(timestamp) as date,
    url,
    COUNT(*) as edge_requests
  FROM `project.cdn_logs.edge_requests`
  WHERE status = 200
  GROUP BY date, url
),
ga4_traffic AS (
  SELECT
    event_date as date,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') as url,
    COUNT(DISTINCT user_pseudo_id) as ga4_sessions
  FROM `project.analytics_XXXXXX.events_*`
  WHERE event_name = 'page_view'
  GROUP BY date, url
)

SELECT
  e.date,
  e.url,
  e.edge_requests,
  COALESCE(g.ga4_sessions, 0) as ga4_sessions,
  e.edge_requests - COALESCE(g.ga4_sessions, 0) as gap,
  SAFE_DIVIDE(e.edge_requests - COALESCE(g.ga4_sessions, 0), e.edge_requests) * 100 as gap_percentage
FROM edge_traffic e
LEFT JOIN ga4_traffic g
  ON e.date = g.date AND e.url = g.url
ORDER BY e.date DESC, e.edge_requests DESC
```

**Output:**

| Date | URL | Edge Requests | GA4 Sessions | Gap | Gap % |
|------|-----|---------------|--------------|-----|-------|
| 2026-02-07 | /homepage | 3,240 | 2,890 | 350 | 10.8% |
| 2026-02-07 | /article-1 | 1,820 | 1,640 | 180 | 9.9% |
| 2026-02-07 | /privacy-guide | 980 | 720 | 260 | **26.5%** |

**Insight:** Privacy-guide article has 26.5% gap → audience blocking analytics (self-selection bias: privacy-interested readers use privacy tools).

**Dashboard visualization (Looker Studio):**

**Chart 1: Total traffic comparison**
- Metric 1: Edge requests (line chart, blue)
- Metric 2: GA4 sessions (line chart, orange)
- Date range: Last 30 days

**Chart 2: Analytics blocking rate**
- Metric: Gap % (line chart)
- Target line: 15% (acceptable threshold)

**Chart 3: Top pages by gap**
- Table: URL, Edge requests, GA4 sessions, Gap %
- Sort: Gap % descending

**Alert rules:**

- If gap % >25% for 3 consecutive days → Email alert ("Analytics blocking spike detected")
- If edge requests spike >5x but GA4 flat → Alert ("Possible bot attack")

### Reconciling Discrepancies Between Data Sources

Edge and client-side data will never match perfectly. Understand acceptable variance.

**Expected discrepancies:**

**Analytics blockers: 8-18%**
- Lower for general audience (8-12%)
- Higher for tech/privacy audience (15-25%)

**Bot traffic: 3-12%**
- Lower with good bot management (3-5%)
- Higher without filtering (10-20%)

**JavaScript load failures: 2-5%**
- Lower for fast sites (2-3%)
- Higher for slow sites or mobile-heavy traffic (4-8%)

**Total expected gap: 15-30%**

**Acceptable:** Edge requests 15-25% higher than GA4 sessions

**Investigate if:**
- Gap <10%: Possible undercounting in edge logs (incorrect filtering?)
- Gap >35%: High bot traffic or analytics blocking epidemic

**Reconciliation process:**

**Step 1: Filter edge logs to human traffic only**

Remove:
- Known bot user-agents (**Googlebot**, **Bingbot**, etc.)
- Status codes 4xx, 5xx (errors)
- Non-HTML requests (CSS, JS, images)

**Filtered edge requests:** 112,000 (from 127,000 total)

**Step 2: Compare to GA4**

GA4 sessions: 94,000

**Gap:** 16% (acceptable range)

**Step 3: Segment gap by traffic source**

| Source | Edge Requests | GA4 Sessions | Gap % |
|--------|---------------|--------------|-------|
| Organic search | 68,000 | 62,000 | 8.8% |
| Direct | 22,000 | 18,000 | 18.2% |
| Social | 15,000 | 10,500 | 30.0% |
| Referral | 7,000 | 3,500 | 50.0% |

**Insight:** Social and referral traffic have high gaps → shared in communities with privacy tools (**Reddit**, **Hacker News**).

---

## FAQ

### Do I need to pay for CDN analytics or are they included?

**Cloudflare:** Basic analytics free on all plans (Free, Pro, Business, Enterprise). Advanced features (Logpush, custom retention) require Business+ ($200+/month). **Fastly:** Real-time analytics included in all plans. Historical stats and log streaming available. **AWS CloudFront:** CloudWatch metrics free (basic). Access logs free (stored in S3, pay S3 storage costs ~$0.023/GB/month). **Vercel/Netlify:** Analytics add-on costs $10-20/month. Most CDNs include basic analytics; advanced features may cost extra.

### Can edge analytics completely replace GA4?

No. Edge analytics measure **requests** (server-side). GA4 measures **engagement** (client-side). Edge logs show page was requested but not if user read it, scrolled, clicked, or converted. Edge analytics validate **volume**. GA4 tracks **behavior**. Use both: Edge for accurate traffic counts + bot detection, GA4 for user journeys + conversions + attribution. Hybrid approach yields complete picture.

### How accurate is bot detection in edge analytics?

Cloudflare Bot Management: 95%+ accuracy (proprietary ML model). **AWS CloudFront:** No built-in bot detection (requires manual user-agent filtering, 70-85% accuracy). **Fastly:** Good (uses device detection + patterns, 85-92% accuracy). DIY bot filtering via user-agent matching: 60-75% accuracy (bots can spoof user-agents). Best accuracy: Combine CDN bot scoring + behavioral analysis (request rate, patterns, JavaScript execution). No solution is perfect—sophisticated bots evade detection.

### What's the performance impact of enabling detailed edge logging?

Negligible. Edge logs are generated server-side (CDN level) without affecting client page load. Logging adds <1ms latency (imperceptible). Storage costs depend on traffic volume: 100k requests/day ≈ 500MB logs/day ≈ $0.35/month (S3 storage). Network transfer costs (if streaming logs to external analytics): ~$0.01-0.09 per GB. For most sites, edge logging costs <$10/month. High-traffic sites (10M+ requests/day): $50-200/month for log storage + processing.

### How do I handle GDPR/privacy compliance with edge analytics?

Edge logs contain **IP addresses** (personal data under GDPR). Compliance options: (1) **Anonymize IPs** before storage (hash or truncate last octet). (2) **Set retention limits** (delete logs after 30-90 days). (3) **Exclude EU traffic** from detailed logging (Cloudflare allows geo-based rules). (4) **Use aggregated analytics** only (don't store raw logs). **GA4** anonymizes IPs by default (compliant). Edge logs require manual privacy configuration. If serving EU users, consult legal counsel on log retention policies.
