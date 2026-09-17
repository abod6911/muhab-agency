import { test, expect } from '@playwright/test';

test('Verify luxury consultation banner and capture validation screenshots', async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:5173');

  // Skip intro
  const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
  await skipBtn.click({ force: true }).catch(() => {});
  await page.waitForTimeout(950);

  // Scroll to consultation section
  const consultation = page.locator('#consultation');
  await expect(consultation).toBeVisible();
  await consultation.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Capture desktop screenshot of the luxury consultation banner
  await consultation.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/consultation-banner-elevated.png'
  });

  // Also capture surrounding context
  await page.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/consultation-banner-full-context.png'
  });

  // Test mobile context (390x844)
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173');

  const mobileSkipBtn = mobilePage.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
  await mobileSkipBtn.click({ force: true }).catch(() => {});
  await mobilePage.waitForTimeout(950);

  const mobileCard = mobilePage.locator('#consultation > div > div');
  await mobileCard.scrollIntoViewIfNeeded();
  await mobilePage.evaluate(() => window.scrollBy(0, 160));
  await mobilePage.waitForTimeout(600);

  await mobilePage.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/consultation-banner-mobile.png'
  });

  await context.close();
  await mobileContext.close();
});

