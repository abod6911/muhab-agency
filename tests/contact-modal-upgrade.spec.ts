import { test, expect } from '@playwright/test';

test.describe('Contact Modal Visual Overhaul Verification', () => {
  test('verifies ContactModal luxury styling, zero close button overlap, and captures screenshots', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173');

    // Dismiss intro if present
    const enterBtn = page.locator('button:has-text("ادخل التحفة الرقمية")').or(page.locator('button:has-text("EXPLORE THE DIGITAL FLAGSHIP")'));
    try {
      await enterBtn.waitFor({ state: 'visible', timeout: 4000 });
      await enterBtn.click();
    } catch {
      // Auto-transitioned
    }
    await page.waitForTimeout(1000);

    // Open Contact Modal by clicking "ابدأ مشروعك الآن" in navbar or hero
    const openContactBtn = page.locator('button:has-text("ابدأ مشروعك الآن")').first();
    await openContactBtn.click();
    await page.waitForTimeout(600);

    // Verify modal is open and elements are visible
    const modalTitle = page.locator('h3:has-text("ابدأ مشروعك الرقمي القادم معنا")');
    await expect(modalTitle).toBeVisible();

    const vipBadge = page.locator('text=استشارة VIP مباشرة • متاح الآن');
    await expect(vipBadge).toBeVisible();

    // Verify close button is visible and NOT overlapping badge
    const closeBtn = page.getByRole('button', { name: 'Close modal' });
    await expect(closeBtn).toBeVisible();

    const badgeBox = await vipBadge.boundingBox();
    const closeBox = await closeBtn.boundingBox();
    expect(badgeBox).not.toBeNull();
    expect(closeBox).not.toBeNull();

    if (badgeBox && closeBox) {
      // Ensure horizontal distance between close button and badge is significant (no overlap)
      const hasHorizontalOverlap = Math.max(badgeBox.x, closeBox.x) < Math.min(badgeBox.x + badgeBox.width, closeBox.x + closeBox.width);
      expect(hasHorizontalOverlap).toBe(false);
    }

    // Verify quick suggestion tags
    await expect(page.locator('text=متجر إلكتروني وسلة مبيعات')).toBeVisible();

    // Verify Saudi prefix
    await expect(page.getByText('+966', { exact: true })).toBeVisible();

    // Capture Arabic modal screenshot
    await page.screenshot({
      path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/contact-modal-arabic.png',
    });

    // Close modal
    await closeBtn.click();
    await page.waitForTimeout(500);

    // Switch to English
    const langBtn = page.locator('button:has-text("ع / EN")').first();
    await langBtn.click();
    await page.waitForTimeout(800);

    // Open Contact Modal in English
    const openContactEnBtn = page.locator('button:has-text("Start Project Now")').or(page.locator('button:has-text("Start Your Project")')).first();
    await openContactEnBtn.click();
    await page.waitForTimeout(600);

    // Verify English modal
    await expect(page.locator('text=VIP DIRECT LINE • ONLINE')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close modal' })).toBeVisible();

    // Capture English modal screenshot
    await page.screenshot({
      path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/contact-modal-english.png',
    });
  });
});
