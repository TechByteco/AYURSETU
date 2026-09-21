import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/saali/.gemini/antigravity/brain/967a2c64-5440-4259-972a-3785bece8c53';

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  const targets = [
    { url: 'http://localhost:3000', name: 'preview_landing.png' },
    { url: 'http://localhost:3000/ayursetu', name: 'preview_ayursetu.png' },
    { url: 'http://localhost:3000/opportunities', name: 'preview_opportunities.png' },
    { url: 'http://localhost:3000/verify?id=AYUR-2026-AIIA-0042', name: 'preview_verify.png' },
    { url: 'http://localhost:3000/dept/dashboard', name: 'preview_dept_dashboard.png' }
  ];

  for (const t of targets) {
    console.log(`Navigating to ${t.url}...`);
    try {
      await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 20000 });
      await new Promise((r) => setTimeout(r, 2000));
      const dest = path.join(ARTIFACT_DIR, t.name);
      await page.screenshot({ path: dest, fullPage: false });
      console.log(`Saved screenshot to ${dest}`);
    } catch (e) {
      console.error(`Error on ${t.url}:`, e.message);
    }
  }

  await browser.close();
  console.log('Done capturing screenshots.');
}

capture().catch(console.error);
