import { test, expect } from '@playwright/test';

test.describe('Curved Navigation Menu Integration', () => {
  test('opens drawer on magnetic button click, morphs curve, and displays navigation items', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Dismiss intro splash screen if active
    const skipBtn = page.getByRole('button', { name: /تخطي|ادخل التحفة/i });
    if (await skipBtn.isVisible({ timeout: 2500 }).catch(() => false)) {
      await skipBtn.click();
      await page.waitForTimeout(600);
    }

    // Scroll slightly so the floating magnetic menu button reveals
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(400);

    // Confirm initial state: menu drawer should not be visible
    const drawer = page.locator('aside');
    await expect(drawer).toHaveCount(0);

    // Click the floating magnetic button to open
    const menuButton = page.getByRole('button', { name: /Open Navigation Menu|القائمة/i }).first();
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Drawer should open and be visible
    await page.waitForSelector('aside');
    await expect(page.locator('aside')).toBeVisible();

    // Verify SVG curve path exists
    const curveSvg = page.locator('aside svg').first();
    await expect(curveSvg).toBeVisible();

    // Verify navigation links are visible inside drawer
    await expect(page.locator('aside').getByText('الرئيسية')).toBeVisible();
    await expect(page.locator('aside').getByText('مشاريعنا')).toBeVisible();
    await expect(page.locator('aside').getByText('منظومتنا الرقمية')).toBeVisible();
    await expect(page.locator('aside').getByText('خدماتنا')).toBeVisible();
    await expect(page.locator('aside').getByText('النتائج والسرعة')).toBeVisible();

    // Verify location badge & CTA button in drawer
    await expect(page.locator('aside').getByText('جدة - المملكة العربية السعودية')).toBeVisible();

    // Wait for entrance animation to settle, then take a screenshot of the open RTL curved drawer
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'curved-nav-rtl.png' });

    // Test Language switch inside drawer
    const langBtn = page.locator('aside').getByRole('button', { name: /English/i });
    if (await langBtn.isVisible()) {
      await langBtn.dispatchEvent('click');
      await page.waitForTimeout(800);

      // Verify language switched
      await expect(page.locator('aside').getByRole('button', { name: /العربية/i })).toBeVisible({ timeout: 5000 });
    }

    // Take screenshot of open LTR curved drawer
    await page.screenshot({ path: 'curved-nav-ltr.png' });

    // Press Escape to verify close transition
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);

    // Drawer should be removed or closing
    await expect(page.locator('aside')).toHaveCount(0);
  });
});
