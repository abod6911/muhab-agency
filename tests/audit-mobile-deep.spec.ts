import { test } from '@playwright/test';
import path from 'path';

test.describe('Mobile Deep Dive', () => {
  test('capture mobile phone mockup and contact modal and SE viewport', async ({ page }) => {
    // Test iPhone SE first (375x667)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173');

    // Skip intro
    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible({ timeout: 2000 })) {
      await skipBtn.click();
    }
    await page.waitForTimeout(1000);

    const artifactDir = 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449';

    // Capture iPhone SE hero
    await page.screenshot({ path: path.join(artifactDir, 'mobile-se-hero.png') });

    // Scroll to phone mockup in hero
    const phoneMockup = page.locator('#hero-phone-mockup, [aria-label*="iPhone"]').first();
    if (await phoneMockup.isVisible()) {
      await phoneMockup.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-phone-mockup.png') });
    } else {
      // scroll down 600px to see phone
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-phone-mockup-fallback.png') });
    }

    // Scroll to trust ribbon
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactDir, 'mobile-trust-ribbon.png') });

    // Open Contact Modal on 375x667
    const contactBtn = page.locator('button:has-text("ابدأ مشروعك الآن"), button:has-text("طلب استشارة مجانية")').first();
    if (await contactBtn.isVisible()) {
      await contactBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-contact-modal-se.png') });

      // Close modal
      const closeDialog = page.locator('button[aria-label="Close dialog"], button[aria-label="إغلاق"]').first();
      if (await closeDialog.isVisible()) {
        await closeDialog.click();
        await page.waitForTimeout(300);
      }
    }

    // Open Live Preview Modal on 375x667
    const previewBtn = page.locator('button:has-text("معاينة الموقع مباشرة")').first();
    if (await previewBtn.isVisible()) {
      await previewBtn.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await previewBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(artifactDir, 'mobile-live-preview-modal.png') });
    }
  });
});
