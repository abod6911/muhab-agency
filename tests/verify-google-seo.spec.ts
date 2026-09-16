import { test, expect } from '@playwright/test';

test.describe('Google SEO, Indexing & Structured Data Verification Suite', () => {
  const baseURL = 'http://localhost:5173';

  test('1. robots.txt is accessible and permits Googlebot crawling', async ({ request }) => {
    const response = await request.get(`${baseURL}/robots.txt`);
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('User-agent: Googlebot');
    expect(body).toContain('Allow: /');
    expect(body).toContain('Sitemap:');
  });

  test('2. sitemap.xml is valid XML with URLs and multilingual tags', async ({ request }) => {
    const response = await request.get(`${baseURL}/sitemap.xml`);
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(body).toContain('<urlset');
    expect(body).toContain('<loc>https://');
    expect(body).toContain('hreflang="ar"');
    expect(body).toContain('hreflang="en"');
  });

  test('3. site.webmanifest is valid PWA manifest JSON', async ({ request }) => {
    const response = await request.get(`${baseURL}/site.webmanifest`);
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.name).toContain('MUHAB STUDIO');
    expect(json.display).toBe('standalone');
    expect(json.icons.length).toBeGreaterThan(0);
  });

  test('4. og-image.png social preview image loads with HTTP 200', async ({ request }) => {
    const response = await request.get(`${baseURL}/og-image.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('5. Homepage metadata and Schema.org structured data are fully compliant', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('domcontentloaded');

    // Title & Meta Description
    const title = await page.title();
    expect(title).toContain('استوديو مهاب');
    expect(title).toContain('صُنّاع المواقع السعودية');

    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription?.length).toBeGreaterThan(50);
    expect(metaDescription).toContain('السعودية');

    // Robots & Googlebot
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');
    expect(robots).toContain('follow');

    const googlebot = await page.locator('meta[name="googlebot"]').getAttribute('content');
    expect(googlebot).toContain('index');

    // Canonical link
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();

    // OpenGraph
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('استوديو مهاب');

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('og-image.png');

    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('website');

    // Twitter Card
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    // Schema.org JSON-LD
    const jsonLdContent = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLdContent).toBeTruthy();
    const parsedSchema = JSON.parse(jsonLdContent!);
    expect(parsedSchema['@context']).toBe('https://schema.org');
    expect(Array.isArray(parsedSchema['@graph'])).toBe(true);

    const types = parsedSchema['@graph'].map((item: any) => item['@type']);
    expect(types).toContain('Organization');
    expect(types).toContain('ProfessionalService');
    expect(types).toContain('WebSite');

    console.log('✅ All Google SEO & Rich Schema Validations Passed Successfully!');
  });
});
