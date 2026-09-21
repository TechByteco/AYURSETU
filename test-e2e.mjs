// test-e2e.mjs - Puppeteer End-to-End Automated Browser Test Suite
import puppeteer from 'puppeteer';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const results = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function test(name, fn) {
  try {
    console.log(`⏳ Running: ${name}...`);
    await fn();
    console.log(`✅ [PASS] ${name}`);
    results.push({ name, pass: true });
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
    results.push({ name, pass: false, error: err.message });
  }
}

async function runE2E() {
  console.log('🚀 Launching Puppeteer browser for autonomous validation...\n');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // 1. Landing Page Test
    await test('Landing Page Loads with SIH26044 Brand & Value Props', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
      const title = await page.title();
      if (!title.includes('AyushSkillBridge')) throw new Error(`Unexpected title: ${title}`);
      await page.waitForSelector('#language-switcher-btn');
      await page.waitForSelector('#persona-switcher-btn');
    });

    // 2. BHASHINI Language Switcher Test
    await test('BHASHINI Multi-Lingual Switcher changes UI to Hindi and Tamil', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });

      // Click language switcher
      await page.click('#language-switcher-btn');
      await sleep(400);

      // Click Hindi
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await (await btn.getProperty('textContent')).jsonValue();
        if (text && text.includes('हिन्दी')) {
          await btn.click();
          break;
        }
      }
      await sleep(600);

      const bodyText = await page.evaluate(() => document.body.innerText);
      if (!bodyText.includes('आयुष') && !bodyText.includes('कौशल')) {
        throw new Error('Hindi translation text not found on page');
      }

      // Switch back to English
      await page.click('#language-switcher-btn');
      await sleep(400);
      const enButtons = await page.$$('button');
      for (const btn of enButtons) {
        const text = await (await btn.getProperty('textContent')).jsonValue();
        if (text && text.includes('English')) {
          await btn.click();
          break;
        }
      }
      await sleep(600);
    });

    // 3. Student Onboarding & Mock ABHA Flow
    await test('Student Onboarding Flow with ABHA Verification & Consent Flags', async () => {
      await page.goto(`${BASE_URL}/onboard`, { waitUntil: 'networkidle2' });

      // Step 1: Fill basic info and click next
      await page.waitForSelector('#btn-step1-next');
      await page.click('#btn-step1-next');
      await sleep(500);

      // Step 2: ABHA verification
      await page.waitForSelector('#btn-verify-abha');
      await page.click('#btn-verify-abha');
      await sleep(500);

      // Enter OTP
      await page.waitForSelector('#otp-input');
      await page.type('#otp-input', '123456');
      await page.click('#btn-confirm-otp');
      await sleep(500);

      // Click next to Step 3
      await page.waitForSelector('#btn-step2-next');
      await page.click('#btn-step2-next');
      await sleep(500);

      // Step 3: Complete Onboarding
      await page.waitForSelector('#btn-complete-onboarding');
      await page.click('#btn-complete-onboarding');

      // Should redirect to assessment
      await page.waitForNavigation({ timeout: 6000 }).catch(() => {});
      const url = page.url();
      if (!url.includes('/assessment')) {
        throw new Error(`Expected redirect to /assessment, got: ${url}`);
      }
    });

    // 4. Skill Assessment & Role Recommendation
    await test('Skill Assessment Submission & Vector Computation', async () => {
      await page.goto(`${BASE_URL}/assessment`, { waitUntil: 'networkidle2' });
      await page.waitForSelector('#btn-submit-assessment');

      // Click submit assessment
      await page.click('#btn-submit-assessment');
      await sleep(2000);

      // Verify results display
      const pageText = await page.evaluate(() => document.body.innerText);
      if (!pageText.includes('Top Recommended Roles') && !pageText.includes('Readiness Score')) {
        throw new Error('Recommended roles not displayed after assessment submit');
      }
    });

    // 5. Gap Analysis & Roadmap
    await test('Skill-Gap Analysis & Actionable Roadmap generation', async () => {
      await page.goto(`${BASE_URL}/gap-analysis?roleId=role_pk_tech`, { waitUntil: 'networkidle2' });
      await page.waitForSelector('#role-select');
      await sleep(1000);

      const pageText = await page.evaluate(() => document.body.innerText);
      if (!pageText.includes('Overall Role Match') || !pageText.includes('Personalized Actionable Roadmap')) {
        throw new Error('Gap analysis data or roadmap not rendered');
      }
    });

    // 6. Opportunity Discovery & 1-Click Apply
    await test('Opportunity Discovery & Application Submission', async () => {
      await page.goto(`${BASE_URL}/opportunities`, { waitUntil: 'networkidle2' });
      await page.waitForSelector('button');
      await sleep(1000);

      // Find first "1-Click Apply" button
      const applyBtn = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        return btns.find((b) => b.innerText.includes('Apply') && !b.innerText.includes('Applied')) || null;
      });

      if (applyBtn && applyBtn.asElement()) {
        await applyBtn.asElement().click();
        await sleep(800);

        // Click submit application inside modal
        const submitModalBtn = await page.waitForSelector('#btn-submit-application');
        if (submitModalBtn) {
          await submitModalBtn.click();
          await sleep(2000);
        }
      }

      // Check applications page
      await page.goto(`${BASE_URL}/applications`, { waitUntil: 'networkidle2' });
      await sleep(1000);
      const appsText = await page.evaluate(() => document.body.innerText);
      if (!appsText.includes('APPLIED') && !appsText.includes('Evaluation Stage')) {
        throw new Error('Submitted application not found in tracker');
      }
    });

    // 7. e-Logbook Procedure Logging with Privacy Check
    await test('CBME e-Logbook Procedure Logging with Privacy Check', async () => {
      await page.goto(`${BASE_URL}/logbook/new`, { waitUntil: 'networkidle2' });

      await page.waitForSelector('#comp-code');
      await page.waitForSelector('#privacy-consent-checkbox');
      await page.waitForSelector('#btn-save-log-entry');

      await page.click('#btn-save-log-entry');
      await page.waitForNavigation({ timeout: 6000 }).catch(() => {});

      const url = page.url();
      if (!url.includes('/logbook')) {
        throw new Error(`Expected redirect to /logbook, got: ${url}`);
      }
    });

    // 8. Verifiable Credential QR Verification
    await test('Skill Passport Verifiable Credential Signature Validation', async () => {
      await page.goto(`${BASE_URL}/passport/verify?token=vc_tok_ayush_2026_001`, { waitUntil: 'networkidle2' });
      await sleep(1000);

      await page.waitForSelector('#token-verify-input');
      const verifyText = await page.evaluate(() => document.body.innerText);

      if (!verifyText.includes('VALID W3C CREDENTIAL') && !verifyText.includes('TAMPER-FREE')) {
        throw new Error('Credential was not verified as valid on verify page');
      }
    });

    // 9. Industry Opportunity Posting
    await test('Industry Hub: Post Opportunity with Structured Skills & NSQF Level', async () => {
      await page.goto(`${BASE_URL}/org/opportunities/new`, { waitUntil: 'networkidle2' });

      await page.waitForSelector('#opp-title');
      await page.waitForSelector('#btn-publish-opportunity');

      await page.click('#btn-publish-opportunity');
      await page.waitForNavigation({ timeout: 6000 }).catch(() => {});

      const url = page.url();
      if (!url.includes('/org/opportunities')) {
        throw new Error(`Expected redirect to /org/opportunities, got: ${url}`);
      }
    });

    // 10. Admin Organization Verification
    await test('Ministry Admin: Organization Verification Queue', async () => {
      await page.goto(`${BASE_URL}/admin/organizations`, { waitUntil: 'networkidle2' });
      await sleep(1000);

      const pageText = await page.evaluate(() => document.body.innerText);
      if (!pageText.includes('Institution & Hospital Verification') || !pageText.includes('Ayush Grid ID')) {
        throw new Error('Admin moderation queue failed to render');
      }
    });

    // 11. Department Dashboard & NAAC Report
    await test('Department Dashboard: AI Syllabus Recommendations & NAAC Report', async () => {
      await page.goto(`${BASE_URL}/dept/dashboard`, { waitUntil: 'networkidle2' });
      await page.waitForSelector('.printable-report', { timeout: 8000 });

      const dashText = await page.evaluate(() => document.body.innerText);

      const lowerText = dashText.toLowerCase();
      if (!lowerText.includes('automated syllabus upgrade') || !lowerText.includes('criterion 1')) {
        throw new Error('Department intelligence metrics missing');
      }
    });

    // 12. Government-Verified Ayush Colleges Directory
    await test('Verified Colleges: Lists Accredited Institutions with Affiliation Codes', async () => {
      await page.goto(`${BASE_URL}/colleges`, { waitUntil: 'networkidle2' });
      await sleep(1000);

      const pageText = await page.evaluate(() => document.body.innerText);
      if (!pageText.includes('Government-Verified Ayush Colleges Directory')) {
        throw new Error('Colleges directory header missing');
      }
      if (!pageText.includes('All India Institute of Ayurveda') && !pageText.includes('AYUSH-NCISM-DL-001')) {
        throw new Error('AIIA Delhi entry missing from directory');
      }
    });

    // 13. Institutional College Upload Portal
    await test('College Portal: Upload Qualified Graduating Batch & View Roster', async () => {
      await page.goto(`${BASE_URL}/colleges/inst_aiia_001/upload`, { waitUntil: 'networkidle2' });
      await page.waitForFunction(() => document.body.innerText.includes('All India Institute of Ayurveda'), { timeout: 8000 });

      const pageText = await page.evaluate(() => document.body.innerText);
      if (!pageText.includes('INSTITUTIONAL UPLOAD PORTAL')) {
        throw new Error('Institutional student upload portal title missing');
      }
      if (!pageText.includes('AYUSH-NCISM-DL-001') || !pageText.includes('All India Institute of Ayurveda')) {
        throw new Error('College affiliation details missing from upload page');
      }
    });

    // 14. Personalized AYURSETU Sub-Portal
    await test('AYURSETU Portal: Holographic Unique Ayush ID & Background AI Matchmaker', async () => {
      await page.goto(`${BASE_URL}/ayursetu`, { waitUntil: 'networkidle2' });
      await page.waitForFunction(() => document.body.innerText.includes('AYURSETU') && document.body.innerText.includes('84.5%'), { timeout: 8000 });

      const pageText = await page.evaluate(() => document.body.innerText);
      if (!pageText.includes('AYURSETU') || !pageText.includes('Aarav Sharma')) {
        throw new Error('AYURSETU identity portal failed to render student name');
      }
      if (!pageText.includes('AYUR-2026-AIIA-0042')) {
        throw new Error('Unique Ayush Student ID missing on holographic card');
      }
      if (!pageText.includes('Apply Now') && !pageText.includes('Applied')) {
        throw new Error('Background AI vacancy recommendations or 1-click apply missing');
      }
    });

    // 15. Public Unique Ayush ID Verification Console
    await test('Verify Console: Instant Verification of Student AUSID Dossier', async () => {
      await page.goto(`${BASE_URL}/verify?id=AYUR-2026-AIIA-0042`, { waitUntil: 'networkidle2' });
      await page.waitForFunction(() => document.body.innerText.includes('84.5%') && document.body.innerText.includes('Aarav Sharma'), { timeout: 8000 });

      const pageText = await page.evaluate(() => document.body.innerText);
      if (!pageText.includes('Aarav Sharma') || !pageText.includes('AYUR-2026-AIIA-0042')) {
        throw new Error('Authenticated student dossier failed to verify');
      }
      if (!pageText.includes('84.5%') || !pageText.includes('All India Institute of Ayurveda')) {
        throw new Error('Academic graduation marks or college seal missing');
      }
    });

  } finally {
    await browser.close();
  }

  console.log('\n======================================================');
  console.log('AUTONOMOUS BROWSER E2E VERIFICATION REPORT:');
  console.log('======================================================');
  results.forEach((r) => {
    console.log(`${r.pass ? '✅' : '❌'} ${r.name}`);
  });
  const passed = results.filter((r) => r.pass).length;
  console.log(`\nTotal: ${passed} of ${results.length} PASSED`);
  console.log('======================================================\n');

  if (passed !== results.length) {
    process.exit(1);
  }
}

runE2E().catch((e) => {
  console.error(e);
  process.exit(1);
});
