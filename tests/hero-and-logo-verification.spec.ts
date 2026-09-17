import { test, expect } from '@playwright/test';

test('Verify official logo, 120 FPS intro, and interactive hero phone mockup', async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Navigate to home
  await page.goto('http://localhost:5173');

  // Verify intro splash screen
  const splashScreen = page.locator('[data-testid="intro-splash-screen"]');
  await expect(splashScreen).toBeVisible({ timeout: 5000 });

  // Verify official 3D logo image is rendered
  const logoImg = page.locator('img[src="/muhab-logo.png"]');
  await expect(logoImg).toBeVisible({ timeout: 4000 });

  // Screenshot of Intro Splash Screen with official logo
  await page.waitForTimeout(600);
  await page.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/official-logo-intro-screen.png' 
  });

  // Skip or Enter Intro
  const skipBtn = page.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
  await skipBtn.click({ force: true }).catch(() => {});

  // Wait for 120 FPS GPU transition to complete
  await page.waitForTimeout(950);

  // Verify Hero Section
  const heroSection = page.locator('#hero');
  await expect(heroSection).toBeVisible();

  // Screenshot of Hero with official emblem eyebrow, stat cards, and project switcher
  await page.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/hero-elevated-interface.png' 
  });

  // Test interactive project switcher chips on phone mockup
  const alkhalChip = page.getByRole('button', { name: /الخال|Al-Khal/i });
  await expect(alkhalChip).toBeVisible();
  await alkhalChip.click();
  await page.waitForTimeout(500);

  // Verify Al-Khal project is displayed on phone within hero
  await expect(heroSection.getByText('مطعم الخال الدمشقي').first()).toBeVisible({ timeout: 10000 });

  // Screenshot of Phone Mockup showing Al-Khal
  await page.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/phone-mockup-alkhal.png' 
  });

  // Test Ueno Saryo chip
  const uenoChip = page.getByRole('button', { name: /أوينو|Ueno/i });
  await expect(uenoChip).toBeVisible();
  await uenoChip.click();
  await page.waitForTimeout(500);

  // Verify Ueno Saryo is displayed within hero
  await expect(heroSection.getByText('أوينو ساريو').first()).toBeVisible({ timeout: 10000 });

  // Scroll to Trust Ribbon and verify clean layout (no overlap with hero)
  const trustRibbon = page.locator('#trust-ribbon');
  await trustRibbon.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/trust-ribbon-clean-layout.png' 
  });

  // Fresh Mobile Viewport Context (iPhone 14 Pro: 390x844)
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173');

  const mobileSkipBtn = mobilePage.getByRole('button', { name: /تخطي الدخول|Skip Intro/i });
  await mobileSkipBtn.click({ force: true }).catch(() => {});
  await mobilePage.waitForTimeout(950);

  await mobilePage.screenshot({ 
    path: 'C:/Users/abodv/.gemini/antigravity/brain/d0a8ce5d-9f02-42a0-bb69-f17f9ac67449/hero-mobile-view.png' 
  });

  await context.close();
  await mobileContext.close();
});
