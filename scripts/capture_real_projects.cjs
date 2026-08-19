const { chromium } = require('playwright');
const path = require('path');

async function captureRealProjects() {
  const browser = await chromium.launch();
  const outputDir = path.join(__dirname, '..', 'public', 'assets', 'projects');

  const targets = [
    { name: 'lavoa-real', url: 'https://lavoa.hgendi3.workers.dev/' },
    { name: 'gotcha-real', url: 'https://gotcha-fresh-tea-jeddah-jwmw.vercel.app' },
    { name: 'damascene-real', url: 'https://damascene.vercel.app/#cat-chicken-shawarma' },
    { name: 'ueno-saryo-real', url: 'https://ueno-saryo.vercel.app/' },
  ];

  for (const target of targets) {
    try {
      console.log(`Opening ${target.url}...`);
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      
      const screenshotPath = path.join(outputDir, `${target.name}.jpg`);
      await page.screenshot({ path: screenshotPath, quality: 90, type: 'jpeg' });
      console.log(`Saved screenshot: ${screenshotPath}`);

      // Also capture mobile version
      const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await mobilePage.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 });
      await mobilePage.waitForTimeout(1000);
      const mobilePath = path.join(outputDir, `${target.name}-mobile.jpg`);
      await mobilePage.screenshot({ path: mobilePath, quality: 90, type: 'jpeg' });
      console.log(`Saved mobile screenshot: ${mobilePath}`);

      await page.close();
      await mobilePage.close();
    } catch (e) {
      console.error(`Error capturing ${target.name}:`, e.message);
    }
  }

  await browser.close();
}

captureRealProjects().catch(console.error);
