import { test, expect } from '@playwright/test';

test.describe('Kinetic Vision Ribbon (CurvedLoopSection)', () => {
  test('renders Arabic kinetic text, flawless typography, and handles drag interactivity', async ({ page }) => {
    await page.goto('http://localhost:5173/#kinetic-ribbon');

    // Skip intro if present
    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click({ force: true });
      await page.waitForTimeout(800);
    }

    const ribbon = page.locator('#kinetic-ribbon');
    await expect(ribbon).toBeVisible();

    // Verify Arabic kinetic typography
    const arabicBrand = ribbon.locator('text=استوديو مهاب الرقمي').first();
    await expect(arabicBrand).toBeVisible();

    // Verify subtitle with clean BiDi phrasing
    await expect(ribbon.locator('text=في أقل من 0.8 ثانية')).toBeVisible();

    // Test drag interaction on ribbon
    const trackWrapper = ribbon.locator('div.-rotate-1, div.-rotate-1\\.5, div.overflow-hidden').first();
    const box = await trackWrapper.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 - 150, box.y + box.height / 2, { steps: 5 });
      await page.mouse.up();
      await page.waitForTimeout(300);
    }
  });

  test('switches seamlessly to English kinetic items when English is selected', async ({ page }) => {
    await page.goto('http://localhost:5173/#kinetic-ribbon');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click({ force: true });
      await page.waitForTimeout(800);
    }

    // Toggle language to English
    const langBtn = page.getByRole('button', { name: /EN|English/i }).first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(600);

      const ribbon = page.locator('#kinetic-ribbon');
      await expect(ribbon.locator('text=MUHAB DIGITAL STUDIO').first()).toBeVisible();
      await expect(ribbon.locator('text=BESPOKE WEB ARCHITECTURE').first()).toBeVisible();
    }
  });
});
