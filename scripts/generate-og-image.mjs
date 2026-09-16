import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generateOgImage() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ 
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1
  });

  const logoPath = path.resolve('public/muhab-logo.png');
  const logoBase64 = fs.existsSync(logoPath) ? fs.readFileSync(logoPath).toString('base64') : '';

  const html = `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl" style="margin:0;padding:0;width:1200px;height:630px;overflow:hidden;background:#020a06;">
  <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      #canvas {
        width: 1200px;
        height: 630px;
        background-color: #020a06;
        color: #f8fafc;
        font-family: 'IBM Plex Sans Arabic', 'Cairo', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 50px 65px;
        position: relative;
        overflow: hidden;
      }
      .bg-grid {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to right, rgba(166, 255, 46, 0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(166, 255, 46, 0.05) 1px, transparent 1px);
        background-size: 40px 40px;
        pointer-events-none;
      }
      .glow-1 {
        position: absolute;
        top: -100px;
        right: -80px;
        width: 550px;
        height: 550px;
        background: radial-gradient(circle, rgba(166, 255, 46, 0.16) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(80px);
        pointer-events-none;
      }
      .glow-2 {
        position: absolute;
        bottom: -150px;
        left: -80px;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(90px);
        pointer-events-none;
      }
      .header {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .brand-box {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .brand-logo {
        height: 56px;
        object-fit: contain;
      }
      .badge-saudi {
        padding: 9px 22px;
        border-radius: 9999px;
        background: rgba(166, 255, 46, 0.1);
        border: 1px solid rgba(166, 255, 46, 0.35);
        color: #a6ff2e;
        font-size: 15px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .beacon {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #a6ff2e;
        box-shadow: 0 0 10px #a6ff2e;
      }
      .content {
        position: relative;
        z-index: 10;
        width: 100%;
      }
      .eyebrow {
        font-size: 16px;
        font-weight: 700;
        color: #a6ff2e;
        letter-spacing: 2px;
        margin-bottom: 12px;
        text-transform: uppercase;
      }
      .headline {
        font-size: 52px;
        font-weight: 900;
        line-height: 1.2;
        margin-bottom: 16px;
        color: #ffffff;
      }
      .gradient-text {
        background: linear-gradient(90deg, #ffffff 0%, #a6ff2e 60%, #34d399 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .subline {
        font-size: 19px;
        color: #94a3b8;
        line-height: 1.55;
        max-width: 950px;
      }
      .footer {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 20px;
        border-top: 1px solid rgba(16, 185, 129, 0.2);
      }
      .pills {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .pill {
        padding: 7px 16px;
        border-radius: 12px;
        background: rgba(3, 21, 14, 0.85);
        border: 1px solid rgba(166, 255, 46, 0.25);
        font-size: 13px;
        font-weight: 700;
        color: #e2e8f0;
        white-space: nowrap;
      }
      .pill-accent {
        color: #a6ff2e;
      }
      .domain {
        font-family: monospace;
        font-size: 15px;
        font-weight: 700;
        color: #64748b;
        letter-spacing: 1px;
      }
    </style>
  </head>
  <body>
    <div id="canvas">
      <div class="bg-grid"></div>
      <div class="glow-1"></div>
      <div class="glow-2"></div>

      <div class="header">
        <div class="brand-box">
          ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" class="brand-logo" alt="MUHAB Logo" />` : '<h2 style="color:#a6ff2e;font-weight:900;">MUHAB STUDIO</h2>'}
        </div>
        <div class="badge-saudi">
          <span class="beacon"></span>
          <span>المملكة العربية السعودية • جدة والرياض</span>
        </div>
      </div>

      <div class="content">
        <div class="eyebrow">// استوديو النظم والبرمجيات الفاخرة</div>
        <h1 class="headline">
          صُنّاع المواقع السعودية<br>
          <span class="gradient-text">والأنظمة الرقمية المخصصة</span>
        </h1>
        <p class="subline">
          استوديو تقني متخصص في هندسة المواقع المخصصة، منصات التجارة الإلكترونية، والحلول السحابية فائقة السرعة لدعم نمو العلامات التجارية في المملكة.
        </p>
      </div>

      <div class="footer">
        <div class="pills">
          <div class="pill"><span class="pill-accent">⚡ سرعة قياسية</span> &lt; 0.8 ثانية</div>
          <div class="pill"><span class="pill-accent">🏆 Lighthouse</span> 100/100</div>
          <div class="pill"><span class="pill-accent">🛡️ بوابات دفع</span> Mada & Apple Pay</div>
          <div class="pill"><span class="pill-accent">🔒 جاهزية</span> 99.99% SLA</div>
        </div>
        <div class="domain">MUHAB.SA // BESPOKE</div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(600);

  const outputPath = path.resolve('public/og-image.png');
  const canvasElement = page.locator('#canvas');
  await canvasElement.screenshot({ path: outputPath });
  console.log('✅ Generated high-resolution OG image at:', outputPath);

  await browser.close();
}

generateOgImage().catch(console.error);
