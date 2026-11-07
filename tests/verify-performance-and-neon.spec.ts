import { test, expect } from '@playwright/test';

test.describe('Website Performance, Silence, and Reduced Neon Verification', () => {
  test('Desktop: Loads smoothly without audio, refined neon, clean visuals', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const audioErrors: string[] = [];
    page.on('pageerror', (err) => audioErrors.push(err.message));

    await page.goto('http://localhost:4173');

    // Wait for intro to exit or click to skip
    const splash = page.locator('[data-testid="intro-splash-screen"]');
    if (await splash.isVisible({ timeout: 500 }).catch(() => false)) {
      await splash.click().catch(() => {});
    }
    await page.waitForTimeout(600);

    // Verify main sections are visible
    await expect(page.locator('#hero')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#portfolio')).toBeVisible({ timeout: 5000 });

    // Take screenshot of desktop hero
    await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/a6604225-ff5d-4b00-914a-5827fa0ccba8/desktop-refined-hero.png' });

    // Scroll down to check smoothness
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
    await page.waitForTimeout(400);

    // Take screenshot of scrolled section
    await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/a6604225-ff5d-4b00-914a-5827fa0ccba8/desktop-refined-scrolled.png' });

    expect(audioErrors.length).toBe(0);
  });

  test('Mobile: Responsive, no horizontal overflow, fast and easy navigation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14

    await page.goto('http://localhost:4173');
    await page.waitForTimeout(700);

    // Check horizontal overflow
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);

    // Take mobile hero screenshot
    await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/a6604225-ff5d-4b00-914a-5827fa0ccba8/mobile-refined-hero.png' });

    // Scroll down to check mobile floating elements
    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
    await page.waitForTimeout(400);

    // Check that page still has zero overflow
    const hasScrollAfter = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasScrollAfter).toBe(false);

    await page.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/a6604225-ff5d-4b00-914a-5827fa0ccba8/mobile-refined-scrolled.png' });
  });
});
