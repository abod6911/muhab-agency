import { test, expect } from '@playwright/test';

test.describe('Mobile Hero & Showcase Layout Refinement Suite', () => {
  test.use({
    viewport: { width: 393, height: 852 },
    isMobile: true,
    hasTouch: true,
  });

  test('Verify mobile hero, showcase card, and zero collisions', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Skip intro splash screen if present
    const skipBtn = page.locator('text=تخطي الدخول');
    if (await skipBtn.count() > 0) {
      await skipBtn.click();
    }
    await page.waitForTimeout(1500);

    // 1. Check MagneticButton is NOT visible on mobile when drawer is closed
    const magneticBtn = page.locator('button[aria-label="Toggle navigation menu"]');
    // It should either be hidden or count 0
    if (await magneticBtn.count() > 0) {
      await expect(magneticBtn).toBeHidden();
    }

    // 2. Capture mobile top hero
    await page.screenshot({ 
      path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/mobile-fixed-top-hero.png' 
    });

    // 3. Switch to 'الخال' (the project from the user's screenshot)
    const alkhalBtn = page.locator('button:has-text("الخال")').first();
    await expect(alkhalBtn).toBeVisible();
    await alkhalBtn.click();
    await page.waitForTimeout(500);

    // 4. Scroll down to showcase card
    await page.evaluate(() => window.scrollTo({ top: 580, behavior: 'instant' }));
    await page.waitForTimeout(800);

    // 5. Verify the action button inside the showcase card is visible and clickable
    const ctaBtn = page.locator('button:has-text("طلب"), button:has-text("حجز")').first();
    await expect(ctaBtn).toBeVisible();

    // 6. Verify back-to-top button is NOT overlapping inside the hero (should not be visible at scroll 580)
    const backToTopBtn = page.locator('button[aria-label="Scroll to top"]');
    await expect(backToTopBtn).toHaveCount(0);

    // 7. Capture scrolled screenshot
    await page.screenshot({ 
      path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/mobile-fixed-showcase-alkhal.png' 
    });

    console.log('Mobile verification passed successfully!');
  });
});
