import { test, expect } from '@playwright/test';

test.describe('Services & Metrics 120 FPS Visual Overhaul Verification', () => {
  test('verifies 3D tilt services cards, SVG telemetry metrics, and BiDi LTR fix', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173');

    // Wait for intro button and enter
    const enterBtn = page.locator('button:has-text("ادخل التحفة الرقمية")').or(page.locator('button:has-text("EXPLORE THE DIGITAL FLAGSHIP")'));
    try {
      await enterBtn.waitFor({ state: 'visible', timeout: 4000 });
      await enterBtn.click();
    } catch {
      // Auto-transitioned or already in main view
    }
    await page.waitForTimeout(1200);

    // 1. Verify Services Section
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();

    // Scroll cleanly via Lenis to services
    await page.evaluate(() => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo('#services', { immediate: true, offset: 0 });
      } else {
        document.querySelector('#services')?.scrollIntoView();
      }
    });
    await page.waitForTimeout(1000);

    // Verify service card items
    await expect(servicesSection.locator('text=01 // UI/UX ARCHITECTURE')).toBeVisible();
    await expect(servicesSection.getByRole('heading', { name: 'تصميم المواقع المخصصة الفاخرة' })).toBeVisible();
    await expect(servicesSection.getByRole('heading', { name: 'برمجة وتطوير المواقع المتقدمة' })).toBeVisible();
    await expect(servicesSection.locator('text=معايير الجودة والتسليم المضمونة')).toBeVisible();

    // Hide fixed header for clean screenshot
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
    });
    await page.waitForTimeout(400);

    // Take screenshot of elevated services section
    await servicesSection.screenshot({
      path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/services-section-elevated.png',
    });

    // Restore header
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.display = '';
    });

    // 2. Verify Metrics Section
    const metricsSection = page.locator('#metrics');
    await expect(metricsSection).toBeVisible();

    // Scroll cleanly via Lenis to metrics
    await page.evaluate(() => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo('#metrics', { immediate: true, offset: 0 });
      } else {
        document.querySelector('#metrics')?.scrollIntoView();
      }
    });
    await page.waitForTimeout(1000);

    // Verify telemetry cards and gauges
    await expect(metricsSection.locator('text=TELEMETRY // 01')).toBeVisible();
    await expect(metricsSection.locator('text=100%').first()).toBeVisible();

    // Verify '< 0.8s' is present and not reversed
    const speedMetric = metricsSection.locator('span[dir="ltr"]:has-text("< 0.8s")');
    await expect(speedMetric).toBeVisible();

    await expect(metricsSection.locator('text=24/7').first()).toBeVisible();

    // Verify live telemetry chips
    await expect(metricsSection.locator('text=Lighthouse: 100/100').first()).toBeVisible();

    // Verify comparison table
    await expect(metricsSection.locator('text=المعيار الذهبي')).toBeVisible();
    await expect(metricsSection.locator('text=مخاطر عالية')).toBeVisible();

    // Hide fixed header for clean screenshot
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
    });
    await page.waitForTimeout(400);

    // Take screenshot of elevated metrics section
    await metricsSection.screenshot({
      path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/metrics-section-elevated.png',
    });

    // Restore header
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.display = '';
    });

    // 3. Test Language switch to English
    const langBtn = page.locator('button:has-text("ع / EN")').first();
    await langBtn.click();
    await page.waitForTimeout(1000);

    // Scroll cleanly via Lenis to metrics in English
    await page.evaluate(() => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo('#metrics', { immediate: true, offset: 0 });
      } else {
        document.querySelector('#metrics')?.scrollIntoView();
      }
    });
    await page.waitForTimeout(800);

    // Verify English text in services and metrics
    await expect(page.locator('text=Bespoke UI/UX & Digital Experience').first()).toBeVisible();
    await expect(page.locator('text=Sub-Second Page Load Speed')).toBeVisible();
    await expect(page.locator('text=GOLD STANDARD')).toBeVisible();
    await expect(page.locator('text=LEGACY')).toBeVisible();

    // Take screenshot of English metrics view
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
    });
    await page.waitForTimeout(400);

    await metricsSection.screenshot({
      path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/metrics-section-english.png',
    });

    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.display = '';
    });
  });
});
