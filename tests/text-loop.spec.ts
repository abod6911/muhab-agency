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

    // Verify single SVG and text elements
    const svgs = waveSection.locator('.text-loop-svg');
    await expect(svgs).toHaveCount(1);
    await expect(svgs.first()).toBeVisible();

    const textPath = svgs.first().locator('textPath').first();
    await expect(textPath).toBeVisible();
    await expect(textPath).toContainText('معمارية برمجية سيادية');

    // Filter out expected autoplay audio warnings
    const realErrors = consoleErrors.filter(e => !e.includes('AudioContext'));
    expect(realErrors.length).toBe(0);

    // Verify continuous motion
    const initialOffset = await textPath.getAttribute('startOffset');
    await page.waitForTimeout(1200);
    const updatedOffset = await textPath.getAttribute('startOffset');
    console.log(`[TextLoop Test] Initial startOffset: ${initialOffset}, After 1.2s: ${updatedOffset}`);
    expect(parseFloat(updatedOffset || '0')).not.toBe(parseFloat(initialOffset || '0'));

    // Verify pointer drag interactivity
    const waveBox = await waveSection.boundingBox();
    if (waveBox) {
      const startX = waveBox.x + waveBox.width / 2;
      const startY = waveBox.y + waveBox.height / 2;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + 180, startY, { steps: 5 });
      const draggedOffset = await textPath.getAttribute('startOffset');
      await page.mouse.up();
      console.log(`[TextLoop Test] Dragged startOffset: ${draggedOffset}`);
      expect(parseFloat(draggedOffset || '0')).not.toBe(parseFloat(updatedOffset || '0'));
    }

    // Capture desktop screenshot of the sleek single ribbon
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(600);
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

    const badge = waveSection.locator('text=منظومة الانسيابية الحركية');
    await expect(badge).toBeVisible();

    const svgs = waveSection.locator('.text-loop-svg');
    await expect(svgs).toHaveCount(1);

    await page.waitForTimeout(1000);
    await waveSection.screenshot({ path: 'tests/screenshots/text-loop-wave-mobile.png' });
    await waveSection.screenshot({ path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/text-loop-wave-mobile.png' });
  });
});
