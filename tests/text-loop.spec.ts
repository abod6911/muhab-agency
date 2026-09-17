import { test, expect } from '@playwright/test';

test.describe('React Bits TextLoop Component Integration', () => {
  test('renders wave ribbon and animated text with zero console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('http://localhost:5173/#text-loop-wave');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click({ force: true });
      await page.waitForTimeout(800);
    }

    const waveSection = page.locator('#text-loop-wave');
    await expect(waveSection).toBeVisible();

    // Verify SVG and text elements
    const svgs = waveSection.locator('.text-loop-svg');
    await expect(svgs).toHaveCount(2);

    await expect(svgs.first()).toBeVisible();
    await expect(svgs.last()).toBeVisible();

    const firstTextPath = svgs.nth(0).locator('textPath').first();
    await expect(firstTextPath).toBeVisible();
    await expect(firstTextPath).toContainText('معمارية برمجية سيادية');

    const secondTextPath = svgs.nth(1).locator('textPath').first();
    await expect(secondTextPath).toBeVisible();
    await expect(secondTextPath).toContainText('مضاعفة المبيعات');

    // Filter out expected autoplay audio warnings
    const realErrors = consoleErrors.filter(e => !e.includes('AudioContext'));
    expect(realErrors.length).toBe(0);

    // Capture desktop screenshot of the dual ribbons
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(1200);
    await waveSection.screenshot({ path: 'tests/screenshots/text-loop-wave-desktop.png' });
    await waveSection.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/text-loop-wave-desktop.png' });
  });

  test('responsive on mobile viewport (iPhone 14)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/#text-loop-wave');

    const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
    if (await skipBtn.isVisible()) {
      await skipBtn.click({ force: true });
      await page.waitForTimeout(800);
    }

    const waveSection = page.locator('#text-loop-wave');
    await expect(waveSection).toBeVisible();

    const badge = waveSection.locator('text=منظومة التميز الحركي المزدوج');
    await expect(badge).toBeVisible();

    const svgs = waveSection.locator('.text-loop-svg');
    await expect(svgs).toHaveCount(2);

    await page.waitForTimeout(1200);
    await waveSection.screenshot({ path: 'tests/screenshots/text-loop-wave-mobile.png' });
    await waveSection.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/text-loop-wave-mobile.png' });
  });
});
