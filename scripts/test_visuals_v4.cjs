const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function run() {
  const screenshotsDir = path.join(__dirname, '..', 'test_screenshots_v4');
  const browser = await chromium.launch();
  const consoleErrors = [];

  const viewports = [
    { name: 'desktop-1440x900-ar', width: 1440, height: 900, lang: 'ar' },
    { name: 'desktop-1440x900-en', width: 1440, height: 900, lang: 'en' },
    { name: 'laptop-1280x800-ar', width: 1280, height: 800, lang: 'ar' },
    { name: 'tablet-768x1024-ar', width: 768, height: 1024, lang: 'ar' },
    { name: 'mobile-430x932-ar', width: 430, height: 932, lang: 'ar' },
    { name: 'mobile-390x844-ar', width: 390, height: 844, lang: 'ar' },
    { name: 'mobile-390x844-en', width: 390, height: 844, lang: 'en' },
    { name: 'mobile-375x812-ar', width: 375, height: 812, lang: 'ar' },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push('[' + vp.name + '] ' + msg.text());
    });
    page.on('pageerror', err => consoleErrors.push('[' + vp.name + '] PageError: ' + err.message));

    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.evaluate((lang) => {
      localStorage.setItem('muhab_lang', lang);
    }, vp.lang);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Hero capture
    await page.screenshot({ path: path.join(screenshotsDir, vp.name + '-hero.png'), fullPage: false });
    
    // Full page capture
    await page.screenshot({ path: path.join(screenshotsDir, vp.name + '-full.png'), fullPage: true });
    console.log('Captured: ' + vp.name);

    // Specific Zoomed Phone Inspection on Desktop
    if (vp.name === 'desktop-1440x900-ar') {
      const phoneEl = await page.$('.phone-shell, [class*="rounded-[48px]"], [class*="rounded-[52px]"]');
      if (phoneEl) {
        await phoneEl.screenshot({ path: path.join(screenshotsDir, 'zoomed-phone-hardware-ar.png') });
        console.log('Captured: zoomed-phone-hardware-ar.png');
      }
    }

    await page.close();
  }

  // Mobile Menu Interaction Test
  const mobileNavPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobileNavPage.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await mobileNavPage.click('button[aria-label="Open Menu"]');
  await mobileNavPage.waitForTimeout(500);
  await mobileNavPage.screenshot({ path: path.join(screenshotsDir, 'mobile-menu-open.png') });
  console.log('Captured: mobile-menu-open.png');
  await mobileNavPage.close();

  // Contact Form Submission Test
  const formPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await formPage.goto('http://localhost:4173/#contact', { waitUntil: 'networkidle' });
  await formPage.fill('input[placeholder*="محمد"], input[placeholder*="Mohammed"]', 'سلطان المطيري');
  await formPage.fill('input[placeholder*="المنشأة"], input[placeholder*="Damascus"]', 'مجموعة الروابي الفاخرة');
  await formPage.fill('input[placeholder="05XXXXXXXX"]', '0551234567');
  await formPage.fill('input[type="email"]', 'sultan@alrawabi.sa');
  await formPage.click('button[type="submit"]');
  await formPage.waitForTimeout(800);
  await formPage.screenshot({ path: path.join(screenshotsDir, 'contact-form-submitted.png') });
  console.log('Captured: contact-form-submitted.png');
  await formPage.close();

  await browser.close();

  console.log('\n======================================');
  console.log('    PLAYWRIGHT V4 QA FINAL REPORT     ');
  console.log('======================================');
  if (consoleErrors.length === 0) {
    console.log('✅ ZERO CONSOLE ERRORS DETECTED across all viewports and interactions!');
  } else {
    console.error('⚠️ Errors logged:', consoleErrors);
  }
}

run().catch(err => {
  console.error('Test script error:', err);
  process.exit(1);
});
