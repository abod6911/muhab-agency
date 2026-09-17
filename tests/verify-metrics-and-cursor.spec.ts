import { test, expect } from '@playwright/test';

test('Verify extra cursor is removed and telemetry cards look stunning', async ({ page }) => {
  // Go to local dev server
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');

  // Skip splash if skip button is present
  const skipBtn = page.locator('text=تخطي الدخول').or(page.locator('text=تخطي'));
  if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await skipBtn.click();
  }
  await page.waitForTimeout(1000);

  // 1. Verify that CursorFollower element is NOT present in DOM
  const customCursorRing = page.locator('.fixed.top-0.left-0.rounded-full');
  const count = await customCursorRing.count();
  console.log('Custom cursor count:', count);
  expect(count).toBe(0);

  // 2. Scroll to #metrics section
  const metricsSection = page.locator('#metrics');
  await expect(metricsSection).toBeVisible();
  await metricsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Temporarily hide fixed header and floating menu button so cards are captured 100% cleanly
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.opacity = '0';
    const menuBtn = document.querySelector('button[aria-label="Toggle menu"]');
    if (menuBtn) (menuBtn as HTMLElement).style.opacity = '0';
  });
  await page.waitForTimeout(300);

  // Take screenshot of the 3 telemetry cards deck
  const telemetryDeck = metricsSection.locator('.grid.grid-cols-1.lg\\:grid-cols-3').first();
  await expect(telemetryDeck).toBeVisible();

  await telemetryDeck.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/telemetry-deck-redesigned.png'
  });

  // Restore header opacity
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.opacity = '1';
  });

  // Test clicking Galaxy tab
  const galaxyBtn = telemetryDeck.locator('button:has-text("Galaxy")');
  await galaxyBtn.click();
  await page.waitForTimeout(400);

  // Test clicking Desktop tab
  const desktopBtn = telemetryDeck.locator('button:has-text("Desktop")');
  await desktopBtn.click();
  await page.waitForTimeout(400);

  // Reset to iPhone
  const iphoneBtn = telemetryDeck.locator('button:has-text("iPhone")');
  await iphoneBtn.click();
  await page.waitForTimeout(400);

  // Full metrics section screenshot
  await metricsSection.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/metrics-section-full.png'
  });
});
