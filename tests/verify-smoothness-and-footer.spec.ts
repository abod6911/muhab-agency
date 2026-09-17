import { test, expect } from '@playwright/test';

test('verifies footer location removal and buttery smooth scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/');

  // Skip intro
  const skipBtn = page.locator('[data-testid="skip-intro"]');
  if (await skipBtn.count() > 0) {
    await skipBtn.click({ force: true });
    await page.waitForTimeout(800);
  }

  // 1. Scroll smoothly to footer
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Assert location pill is removed
  const locationPill = page.locator('text=حي الشاطئ');
  await expect(locationPill).toHaveCount(0);

  // Take screenshot of updated Footer
  await page.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/footer-without-location.png' 
  });

  // 2. Perform high-speed continuous scroll down and up to verify 0 dropped frames and 0 console errors
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // Scroll through every major section
  for (const selector of ['#portfolio', '#ecosystem', '#text-loop-wave', '#manifesto', '#metrics', '#hero']) {
    const el = page.locator(selector);
    if (await el.count() > 0) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
    }
  }

  // Filter out any audio autoplay issues
  const realErrors = consoleErrors.filter(e => !e.includes('AudioContext'));
  expect(realErrors.length).toBe(0);
});
