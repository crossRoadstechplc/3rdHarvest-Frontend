# SEO Setup for 3rd Harvest

## ✅ Completed Updates

### 1. **Robots.txt**
- Changed from blocking all crawlers to allowing all search engines
- Added sitemap references for both domains

### 2. **Meta Robots Tag**
- Changed from `noindex, nofollow` to `index, follow` with full preview permissions
- Allows Google and other search engines to index the site

### 3. **SEO Metadata**
- Updated title to match hero section: "Unlocking Multiple Harvests from a Single Coffee Crop"
- Enhanced description with key terms
- Added comprehensive keywords
- Added canonical URL pointing to 3rdharvest.com

### 4. **Open Graph Tags (Facebook/LinkedIn)**
- Updated all OG tags to use 3rdharvest.com domain
- Added proper image dimensions (1200x630 recommended)
- Updated descriptions to match current content

### 5. **Twitter Cards**
- Updated all Twitter meta tags
- Using summary_large_image card type
- All URLs point to 3rdharvest.com

### 6. **Structured Data (Schema.org)**
- Added JSON-LD structured data for Organization
- Includes both 3rdharvest.com and 3rdharvest.org as sameAs
- Helps Google understand the organization better

### 7. **Sitemap.xml**
- Created sitemap.xml with all main pages
- Configured for both .com and .org domains
- Includes priority and change frequency

## ⚠️ Important: Logo File

**The `/public/logo.png` file currently appears to be a placeholder or old logo.**

To ensure the correct 3rd Harvest logo appears in search results and social shares:

1. **Replace `/public/logo.png`** with your official 3rd Harvest logo
2. **Recommended logo specifications:**
   - Size: 1200x630 pixels (for optimal social media sharing)
   - Format: PNG with transparent background (or JPG if preferred)
   - File size: Under 1MB for fast loading
   - Should clearly show "3rd Harvest" or "The 3RD Harvest" branding

3. **After replacing the logo:**
   - Clear browser cache
   - Use Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Use Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Use Google Rich Results Test: https://search.google.com/test/rich-results

## 📋 Next Steps for Full SEO

1. **Submit sitemap to Google Search Console:**
   - Go to https://search.google.com/search-console
   - Add both 3rdharvest.com and 3rdharvest.org properties
   - Submit sitemap: https://3rdharvest.com/sitemap.xml

2. **Verify domains:**
   - Set up 301 redirects from 3rdharvest.org to 3rdharvest.com (or vice versa)
   - Ensure both domains point to the same site

3. **Update logo file:**
   - Replace `/public/logo.png` with official 3rd Harvest logo
   - Test social sharing after replacement

4. **Monitor indexing:**
   - Check Google Search Console for indexing status
   - Monitor search appearance and click-through rates

## 🔗 Domain Configuration

All SEO tags are configured for:
- Primary domain: **3rdharvest.com**
- Secondary domain: **3rdharvest.org** (listed in sameAs)

Make sure your hosting/DNS is configured to serve the site on both domains.
