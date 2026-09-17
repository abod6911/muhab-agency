import { test } from '@playwright/test';
import path from 'path';

test.describe('Mobile Audit Real Sections', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });

  test('dismiss intro and capture all actual sections', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Click "تخطي الدخول" if visible to immediately dismiss splash
    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible({ timeout: 2000 })) {
      await skipBtn.click();
    } else {
      const enterBtn = page.locator('button:has-text("ادخل"), button:has-text("اكتشف")').first();
      if (await enterBtn.isVisible({ timeout: 4000 })) {
        await enterBtn.click();
      }
    }
    await page.waitForTimeout(1200);

    const artifactDir = 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449';

    // 1. Hero
    await page.screenshot({ path: path.join(artifactDir, 'mobile-real-hero.png') });

    // 2. Trust Ribbon
    const trustEl = page.locator('section').filter({ hasText: /دقة متناهية|أداء خارق|تصميم فاخر|حلول مخصصة/i }).first();
    if (await trustEl.isVisible()) {
      await trustEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-trust.png') });
    }

    // 3. Ecosystem / SaaS Products
    const ecoEl = page.locator('#ecosystem, section:has-text("المنظومة الرقمية")').first();
    if (await ecoEl.isVisible()) {
      await ecoEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-ecosystem.png') });
    }

    // 4. Portfolio
    const portEl = page.locator('#portfolio, section:has-text("أعمال نفتخر بها")').first();
    if (await portEl.isVisible()) {
      await portEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-portfolio.png') });
    }

    // 5. Services
    const servEl = page.locator('#services, section:has-text("حلول رقمية شاملة")').first();
    if (await servEl.isVisible()) {
      await servEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-services.png') });
    }

    // 6. Metrics
    const metEl = page.locator('section').filter({ hasText: /أرقام تتحدث عن تميزنا|أرقام وإحصائيات/i }).first();
    if (await metEl.isVisible()) {
      await metEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-metrics.png') });
    }

    // 7. Consultation Banner
    const consultEl = page.locator('section').filter({ hasText: /هل أنت جاهز لنقل عملك|احجز جلستك الاستشارية/i }).first();
    if (await consultEl.isVisible()) {
      await consultEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-consultation.png') });
    }

    // 8. Footer
    const footerEl = page.locator('footer').first();
    if (await footerEl.isVisible()) {
      await footerEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-footer.png') });
    }

    // 9. Curved Menu
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const menuBtn = page.locator('button[aria-label="Open Navigation Menu"], button:has-text("القائمة")').first();
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-menu.png') });
      // Close menu
      const closeBtn = page.locator('button[aria-label="Close Navigation Menu"], button:has-text("إغلاق")').first();
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await page.waitForTimeout(400);
      }
    }

    // 10. Contact Modal
    const heroContactBtn = page.locator('#hero-cta-contact, button:has-text("طلب استشارة مجانية")').first();
    if (await heroContactBtn.isVisible()) {
      await heroContactBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-real-contact-modal.png') });
    }
  });
});
