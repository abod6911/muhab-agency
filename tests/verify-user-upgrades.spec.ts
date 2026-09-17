import { test, expect } from '@playwright/test';

test('Capture verified screenshots of live clock, phone enhancements, and luxury intro', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Visit home page
  await page.goto('http://localhost:5173');

  // Verify and capture luxury intro splash screen
  const splash = page.locator('[data-testid="intro-splash-screen"]');
  await expect(splash).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/intro-splash-luxury.png' 
  });

  // Skip or Enter into site
  const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
  await skipBtn.click({ force: true }).catch(() => {});
  await page.waitForTimeout(1000);

  // 2. Verify Hero & Phone Mockup with Live Clock
  const hero = page.locator('#hero');
  await expect(hero).toBeVisible();

  // Switch to Al-Khal to show Shawarma
  const alkhalTab = page.getByRole('button', { name: /الخال|Al-Khal/i });
  await alkhalTab.click();
  await page.waitForTimeout(500);

  // Assert Live Clock is present and valid time
  const clock = page.locator('[data-testid="phone-clock"]');
  await expect(clock).toBeVisible();
  await expect(clock).toHaveText(/\d{1,2}:\d{2}/);

  // Assert Prep & Nutrition Specs are visible in desktop view
  await expect(page.locator('.hidden.lg\\:block').getByText('التحضير')).toBeVisible();
  await expect(page.locator('.hidden.lg\\:block').getByText('السعرات')).toBeVisible();

  // Capture Desktop Phone Mockup in Hero
  await page.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/hero-phone-live-clock-desktop.png' 
  });

  // 3. Click "طلب الوجبة الآن" to trigger simulated order toast
  const orderBtn = page.getByRole('button', { name: /طلب الوجبة الآن|Order Platter Now/i });
  if (await orderBtn.isVisible()) {
    await orderBtn.click();
    await page.waitForTimeout(400);
    // Capture in-order state
    await page.screenshot({ 
      path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/hero-phone-order-toast.png' 
    });
  }

  await context.close();

  // 4. Mobile Context (iPhone 14 Pro: 390x844)
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173');

  const mobileSkip = mobilePage.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
  await mobileSkip.click({ force: true }).catch(() => {});
  await mobilePage.waitForTimeout(1000);

  const mobileCard = mobilePage.locator('.block.lg\\:hidden').first();
  await mobileCard.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);

  await mobilePage.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/8f70ae58-764e-47e6-a5a2-09361985db0d/hero-phone-mobile-card.png' 
  });

  await mobileContext.close();
});
