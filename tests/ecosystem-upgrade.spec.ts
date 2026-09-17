import { test, expect } from '@playwright/test';

test.describe('Ecosystem Product Cards Redesign & Smoothness Verification', () => {
  test('renders 3 elevated luxury product cards with mockups, badges, and visible CTAs', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/#ecosystem');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click({ force: true });
      await page.waitForTimeout(600);
    }

    const ecosystem = page.locator('#ecosystem');
    await expect(ecosystem).toBeVisible();

    // Verify all 3 products are rendered
    await expect(page.locator('text=Taqyeemi').first()).toBeVisible();
    await expect(page.locator('text=PointPass').first()).toBeVisible();
    await expect(page.locator('text=Foodus').first()).toBeVisible();

    // Verify mockups
    await expect(page.locator('text=NFC TAP ACTIVE')).toBeVisible();
    await expect(page.locator('text=Apple Wallet • VIP')).toBeVisible();
    await expect(page.locator('text=2,450')).toBeVisible();
    await expect(page.locator('text=TABLE #14').or(page.locator('text=طاولة رقم #14'))).toBeVisible();

    // Verify CTA buttons are present and visible
    await expect(page.locator('text=طلب باقة حوامل تقييمي الآن')).toBeVisible();
    await expect(page.locator('text=طلب تفعيل نظام بوينت باس لعلامتك')).toBeVisible();
    await expect(page.locator('text=طلب تجربة نظام فودس الآن')).toBeVisible();

    // Scroll slightly to perfectly center the ecosystem section
    await ecosystem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // Capture high-res desktop screenshot
    await ecosystem.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/ecosystem-redesign-desktop.png' });
  });

  test('responsive on mobile viewport (iPhone 14)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/#ecosystem');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click({ force: true });
      await page.waitForTimeout(600);
    }

    const ecosystem = page.locator('#ecosystem');
    await expect(ecosystem).toBeVisible();

    await page.waitForTimeout(800);
    await ecosystem.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/ecosystem-redesign-mobile.png' });
  });
});
