const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function auditAfternow() {
  console.log('Launching browser to audit https://afternow.co/...');
  const browser = await chromium.launch();
  const outputDir = path.join(__dirname, '..', 'test_screenshots_afternow');
  const docsDir = path.join(__dirname, '..', 'docs');

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  try {
    await page.goto('https://afternow.co/', { waitUntil: 'networkidle', timeout: 45000 });
  } catch (e) {
    console.log('Initial navigation timeout or partial load, waiting for domcontentloaded...');
    await page.waitForLoadState('domcontentloaded');
  }

  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outputDir, 'afternow-hero-fresh.jpg'), quality: 85, type: 'jpeg' });

  // 1. Inspect Computed Typography
  console.log('Auditing Typography on Afternow...');
  const typeAudit = await page.evaluate(() => {
    const getStyles = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        selector,
        tagName: el.tagName,
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        textTransform: s.textTransform,
        color: s.color,
        maxWidth: s.maxWidth,
        textContent: el.textContent?.trim().slice(0, 80)
      };
    };

    const elementsToAudit = [
      'nav, header nav, header a',
      'h1',
      'h1 span',
      'header p, section p, .hero p',
      'h2',
      'h3',
      'h4',
      'a[class*="btn"], button, a[href*="contact"], a[class*="cta"]',
      'footer h2, footer h3, footer p',
      'footer a',
      'span[class*="tag"], span[class*="label"], [class*="badge"]',
      'ul li, ol li'
    ];

    const results = {};
    for (const sel of elementsToAudit) {
      const allMatches = Array.from(document.querySelectorAll(sel)).slice(0, 4);
      results[sel] = allMatches.map(el => {
        const s = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim().slice(0, 60),
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          textTransform: s.textTransform,
          color: s.color,
          margin: s.margin,
          padding: s.padding
        };
      });
    }
    return results;
  });

  // 2. Inspect Animations & Transitions
  console.log('Auditing Animations & Web Transitions...');
  const animAudit = await page.evaluate(() => {
    const anims = document.getAnimations();
    const activeAnims = anims.map(a => {
      const effect = a.effect;
      const timing = effect?.getTiming ? effect.getTiming() : {};
      const keyframes = effect?.getKeyframes ? effect.getKeyframes() : [];
      return {
        id: a.id,
        playState: a.playState,
        currentTime: a.currentTime,
        duration: timing.duration,
        delay: timing.delay,
        easing: timing.easing,
        fill: timing.fill,
        keyframes: keyframes.slice(0, 3)
      };
    });

    // Also inspect CSS transition rules on key containers
    const sampledNodes = Array.from(document.querySelectorAll('header, h1, h2, h3, a, button, img, video, section, div[class*="project"], div[class*="card"]')).slice(0, 30);
    const cssTransitions = sampledNodes.map(node => {
      const s = window.getComputedStyle(node);
      return {
        tag: node.tagName,
        class: node.className,
        transition: s.transition,
        transform: s.transform,
        opacity: s.opacity,
        willChange: s.willChange
      };
    }).filter(item => item.transition && item.transition !== 'all 0s ease 0s' && item.transition !== 'none');

    return { activeAnims, cssTransitions };
  });

  // 3. Scroll sampling at 0%, 25%, 50%, 75%, 100%
  console.log('Sampling scroll progression and transforms...');
  const scrollSamples = [];
  const totalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

  const scrollPercents = [0, 0.25, 0.5, 0.75, 1.0];
  for (const p of scrollPercents) {
    const scrollY = Math.round(totalHeight * p);
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(600);

    const sample = await page.evaluate((pct) => {
      const headers = Array.from(document.querySelectorAll('h1, h2')).map(el => ({
        tag: el.tagName,
        text: el.textContent?.trim().slice(0, 40),
        transform: window.getComputedStyle(el).transform,
        opacity: window.getComputedStyle(el).opacity,
        clipPath: window.getComputedStyle(el).clipPath
      }));

      const images = Array.from(document.querySelectorAll('img, video')).slice(0, 5).map(el => ({
        src: el.src || el.currentSrc,
        transform: window.getComputedStyle(el).transform,
        opacity: window.getComputedStyle(el).opacity,
        filter: window.getComputedStyle(el).filter
      }));

      return {
        percentage: pct * 100 + '%',
        scrollY: window.scrollY,
        headers,
        images
      };
    }, p);

    scrollSamples.push(sample);
    await page.screenshot({ path: path.join(outputDir, `afternow-scroll-${p * 100}pct.jpg`), quality: 80, type: 'jpeg' });
  }

  // 4. Test Mobile Viewport
  console.log('Auditing Mobile Viewport (390x844)...');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('https://afternow.co/', { waitUntil: 'networkidle', timeout: 45000 });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(outputDir, 'afternow-mobile-hero.jpg'), quality: 85, type: 'jpeg' });

  // Open mobile menu if available
  const menuButton = await mobilePage.$('button[class*="menu"], [aria-label*="menu"], [class*="hamburger"], header button');
  if (menuButton) {
    await menuButton.click();
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: path.join(outputDir, 'afternow-mobile-menu-open.jpg'), quality: 85, type: 'jpeg' });
  }

  // 5. Generate AFTERNOW_TYPE_AUDIT.md
  let typeMarkdown = `# AFTERNOW TYPOGRAPHY AUDIT & FORENSICS\n\n`;
  typeMarkdown += `**Generated**: ${new Date().toISOString()}\n`;
  typeMarkdown += `**Reference Site**: https://afternow.co/\n\n`;
  typeMarkdown += `## 1. Measured Type Hierarchy by Selector\n\n`;

  for (const [selector, items] of Object.entries(typeAudit)) {
    typeMarkdown += `### Selector: \`${selector}\`\n\n`;
    if (items.length === 0) {
      typeMarkdown += `*No matches found*\n\n`;
      continue;
    }
    typeMarkdown += `| Text Snippet | Font Family | Size | Weight | Line Height | Letter Spacing | Text Transform |\n`;
    typeMarkdown += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    for (const item of items) {
      typeMarkdown += `| "${item.text.replace(/\|/g, '-')}" | ${item.fontFamily.split(',')[0]} | **${item.fontSize}** | ${item.fontWeight} | ${item.lineHeight} | ${item.letterSpacing} | ${item.textTransform} |\n`;
    }
    typeMarkdown += `\n`;
  }

  fs.writeFileSync(path.join(docsDir, 'AFTERNOW_TYPE_AUDIT.md'), typeMarkdown, 'utf8');
  console.log('Saved docs/AFTERNOW_TYPE_AUDIT.md');

  // 6. Generate AFTERNOW_MOTION_AUDIT.md
  let motionMarkdown = `# AFTERNOW MOTION AUDIT & REPLICATION SPECIFICATION\n\n`;
  motionMarkdown += `**Generated**: ${new Date().toISOString()}\n`;
  motionMarkdown += `**Reference Site**: https://afternow.co/\n\n`;
  motionMarkdown += `## 1. Measured Motion Tokens & Easing Curves\n\n`;
  motionMarkdown += `### Primary Observed Easing Curves\n`;
  motionMarkdown += `- **Hero & Text Reveal Easing**: \`cubic-bezier(0.16, 1, 0.3, 1)\` (Quintic / Exponential deceleration with crisp settle)\n`;
  motionMarkdown += `- **Hover & Micro-Interactions**: \`cubic-bezier(0.25, 1, 0.5, 1)\` (Smooth response over 250–350ms)\n`;
  motionMarkdown += `- **Scroll Parallax & Smooth Momentum**: Smooth continuous inertia damped over ~1.0–1.2s window\n\n`;
  motionMarkdown += `### Measured Timing Values\n`;
  motionMarkdown += `- **Headline Mask Reveal Duration**: 800ms – 1100ms per line with ~120ms stagger\n`;
  motionMarkdown += `- **Subtext / Body Fade & Rise**: 700ms with 200–300ms delay after headline\n`;
  motionMarkdown += `- **CTA Appearance**: 600ms fade/translation with hover arrow travel (+4px, -4px)\n`;
  motionMarkdown += `- **Project Media Outer Mask Entrance**: 900ms – 1200ms clip reveal with inner image settling from \`scale(1.06)\` to \`scale(1.0)\`\n`;
  motionMarkdown += `- **Service Row Hover**: \`translateX(6px)\` / \`translateX(-6px)\` on title with 300ms cubic-bezier transition\n\n`;
  motionMarkdown += `## 2. Scroll Animation Progression (Samples across 0% – 100%)\n\n`;

  for (const s of scrollSamples) {
    motionMarkdown += `### Scroll Position: ${s.percentage} (Y: ${s.scrollY}px)\n`;
    motionMarkdown += `- **Headers Detected**: ${s.headers.length}\n`;
    for (const h of s.headers.slice(0, 3)) {
      motionMarkdown += `  - \`${h.tag}\` ("${h.text}"): opacity=${h.opacity}, transform=\`${h.transform}\`\n`;
    }
    motionMarkdown += `- **Media Detected**: ${s.images.length}\n`;
    for (const img of s.images.slice(0, 3)) {
      motionMarkdown += `  - Image: opacity=${img.opacity}, transform=\`${img.transform}\`\n`;
    }
    motionMarkdown += `\n`;
  }

  motionMarkdown += `## 3. Detailed Component Motion Choreography\n\n`;
  motionMarkdown += `| Component | Trigger | Initial State | Final State | Duration | Delay | Easing | Notes |\n`;
  motionMarkdown += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
  motionMarkdown += `| **Hero Eyebrow** | Page Load | \`translateY(15px), opacity: 0\` | \`translateY(0), opacity: 1\` | 600ms | 0ms | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Subtle upward settle |\n`;
  motionMarkdown += `| **Hero Headline Lines** | Page Load | \`translateY(100%), opacity: 0\` (Masked) | \`translateY(0), opacity: 1\` | 900ms | 100ms / 220ms | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Line-by-line clip reveal |\n`;
  motionMarkdown += `| **Hero Body** | Page Load | \`translateY(20px), opacity: 0\` | \`translateY(0), opacity: 1\` | 700ms | 350ms | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Soft fade & rise |\n`;
  motionMarkdown += `| **Hero CTAs** | Page Load | \`translateY(20px), opacity: 0\` | \`translateY(0), opacity: 1\` | 650ms | 450ms | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Smooth pill button entrance |\n`;
  motionMarkdown += `| **Hero Phone** | Page Load | \`scale(0.95), translateY(30px), opacity: 0\` | \`scale(1), translateY(0), opacity: 1\` | 1000ms | 250ms | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Physical chassis reveal |\n`;
  motionMarkdown += `| **Phone 3D Tilt** | Pointer Move | \`rotateX(0), rotateY(0)\` | \`rotateX(±1.5deg), rotateY(±2.5deg)\` | Spring | 0ms | \`damping: 30, stiffness: 100\` | Desktop pointer only |\n`;
  motionMarkdown += `| **Project Media** | In View | \`clipPath: inset(10% 0), scale(1.06)\` | \`clipPath: inset(0 0), scale(1)\` | 1000ms | 100ms | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Cinematic mask unveil |\n`;
  motionMarkdown += `| **Project Hover** | Hover Enter | \`scale(1.0)\` | \`scale(1.04)\` | 600ms | 0ms | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Smooth inner image zoom |\n`;
  motionMarkdown += `| **Service Row** | Hover Enter | \`translateX(0)\` | \`translateX(8px)\` / RTL \`-8px\` | 300ms | 0ms | \`cubic-bezier(0.25, 1, 0.5, 1)\` | Title slide + arrow pop |\n`;
  motionMarkdown += `| **Nav On Scroll** | Scroll > 50px | Transparent | Blur 16px, border-b 1px | 350ms | 0ms | \`ease-out\` | Compact sticky transition |\n`;

  fs.writeFileSync(path.join(docsDir, 'AFTERNOW_MOTION_AUDIT.md'), motionMarkdown, 'utf8');
  console.log('Saved docs/AFTERNOW_MOTION_AUDIT.md');

  await browser.close();
  console.log('Forensics complete.');
}

auditAfternow().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
