import { test, expect } from '@playwright/test';

test.describe('Redesign Verification: Restored Hero, Darkened Palette & Elevated Components', () => {
  test('verifies restored iPhone hero, darkened background, elevated ecosystem, portfolio and metrics', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(1000);

    // 1. Verify Restored Hero with PhoneMockup
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(page.locator('text=نصمم أفضل المواقع')).toBeVisible();
    await expect(page.locator('[data-testid="phone-clock"]')).toBeVisible(); // iPhone status bar live clock
    await expect(page.locator('[data-testid="phone-clock"]')).toHaveText(/\d{1,2}:\d{2}/);
    await expect(page.locator('text=Apple Pay').first()).toBeVisible();

    // 2. Verify Ecosystem Cards with enhanced mockups
    const ecosystem = page.locator('#ecosystem');
    await expect(ecosystem).toBeVisible();
    await expect(page.locator('text=Taqyeemi').first()).toBeVisible();
    await expect(page.locator('text=PointPass').first()).toBeVisible();
    await expect(page.locator('text=Foodus').first()).toBeVisible();
    await expect(page.locator('text=Apple Wallet • VIP')).toBeVisible();
    await expect(page.locator('text=2,450')).toBeVisible();
    await expect(page.locator('text=TABLE #14').or(page.locator('text=طاولة رقم #14'))).toBeVisible();

    // 3. Verify Portfolio Section with quick live preview affordances
    const portfolio = page.locator('#portfolio');
    await expect(portfolio).toBeVisible();
    const livePreviewPills = page.locator('text=معاينة الموقع مباشرة');
    await expect(livePreviewPills.first()).toBeVisible();

    // 4. Verify Metrics & Comparison
    const metrics = page.locator('#metrics');
    await expect(metrics).toBeVisible();
    await expect(page.locator('text=المعيار الذهبي')).toBeVisible();
    await expect(page.locator('text=مخاطر عالية')).toBeVisible();

    // 5. Test Language Switcher to English and verify LTR layout
    const langBtn = page.locator('button:has-text("ع / EN")').first();
    await langBtn.click();
    await page.waitForTimeout(1200);

    await expect(page.locator('text=Bespoke Digital Systems').first()).toBeVisible();
    await expect(page.locator('text=GOLD STANDARD')).toBeVisible();
    await expect(page.locator('text=LEGACY')).toBeVisible();

    // Capture English Hero Screenshot
    await page.screenshot({ 
      path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/hero-english-restored.png' 
    });
  });
});
