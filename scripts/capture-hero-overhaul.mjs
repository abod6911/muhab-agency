import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop Viewport (1440x960)
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();
  
  await page.goto('http://127.0.0.1:5173');
  
  // Click either skip button or enter button
  const enterBtn = page.getByRole('button', { name: /ادخل التحفة الرقمية|تخطي الدخول/i });
  await enterBtn.click({ force: true }).catch(() => {});
  
  // Wait for hero to be visible
  const heroSection = page.locator('#hero');
  await heroSection.waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1500);
  
  // Capture Full Hero Section
  await heroSection.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/b323507e-591d-4129-a0ff-400c459f9c5c/hero-overhaul-full.png'
  });
  console.log('Saved hero-overhaul-full.png');
  
  // Capture Editorial Column specifically
  const editorialCol = page.locator('#hero h1').locator('..');
  await editorialCol.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/b323507e-591d-4129-a0ff-400c459f9c5c/hero-editorial-column.png'
  });
  console.log('Saved hero-editorial-column.png');
  
  // 2. Mobile Viewport (iPhone 14 Pro: 390x844)
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://127.0.0.1:5173');
  
  const mobileBtn = mobilePage.getByRole('button', { name: /ادخل التحفة الرقمية|تخطي الدخول/i });
  await mobileBtn.click({ force: true }).catch(() => {});
  
  const mobileHero = mobilePage.locator('#hero');
  await mobileHero.waitFor({ state: 'visible', timeout: 8000 });
  await mobilePage.waitForTimeout(1500);
  
  await mobileHero.screenshot({
    path: 'C:/Users/abodv/.gemini/antigravity/brain/b323507e-591d-4129-a0ff-400c459f9c5c/hero-mobile-overhaul.png'
  });
  console.log('Saved hero-mobile-overhaul.png');
  
  await browser.close();
  console.log('Done capturing all views!');
})();
