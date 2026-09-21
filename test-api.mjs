// test-api.mjs - Integration test for AyushSkillBridge API endpoints
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const results = [];

async function assert(testName, fn) {
  try {
    await fn();
    console.log(`✅ [PASS] ${testName}`);
    results.push({ name: testName, pass: true });
  } catch (err) {
    console.error(`❌ [FAIL] ${testName}:`, err.message);
    results.push({ name: testName, pass: false, error: err.message });
  }
}

async function runTests() {
  console.log('🧪 Starting AyushSkillBridge API Integration Suite...\n');

  // 1. Session & Persona
  await assert('GET /api/auth/session returns default persona', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/session`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.user || !data.user.role) throw new Error('Invalid user payload');
  });

  // 2. Onboarding & Mock ABHA
  await assert('POST /api/auth/mock-abha registers user with consent flags', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/mock-abha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student Ayush',
        email: 'test.student@aiia.edu.in',
        stream: 'BAMS',
        year: 3,
        abhaId: '91-4521-8890-1234',
        consentFlags: {
          shareProfileWithInstitutions: true,
          shareSkillData: true,
          allowAnonymizedAnalytics: true
        }
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to onboard');
  });

  // 3. Skills & Roles
  await assert('GET /api/skills returns Ayush skills across domains', async () => {
    const res = await fetch(`${BASE_URL}/api/skills`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.skills || data.skills.length < 50) throw new Error(`Expected >50 skills, got ${data.skills?.length}`);
  });

  await assert('GET /api/roles returns mapped roles with ontology', async () => {
    const res = await fetch(`${BASE_URL}/api/roles`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.roles || data.roles.length < 10) throw new Error(`Expected >10 roles, got ${data.roles?.length}`);
  });

  // 4. Assessment Submission & Readiness
  await assert('POST /api/assessment/submit computes role readiness scores', async () => {
    const res = await fetch(`${BASE_URL}/api/assessment/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'usr_student_aarav',
        answers: [
          { skillId: 'sk_pk_01', level: 'EXPERT' },
          { skillId: 'sk_pk_02', level: 'ADVANCED' },
          { skillId: 'sk_pk_07', level: 'ADVANCED' },
          { skillId: 'sk_ph_04', level: 'INTERMEDIATE' }
        ]
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.topRecommendedRoles || data.topRecommendedRoles.length === 0) {
      throw new Error('No role recommendations returned');
    }
  });

  // 5. Gap Analysis
  await assert('GET /api/gap-analysis returns delta matrix & actionable roadmap', async () => {
    const res = await fetch(`${BASE_URL}/api/gap-analysis?roleId=role_pk_tech&userId=usr_student_aarav`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.role || !data.roadmap || data.roadmap.length === 0) {
      throw new Error('Invalid gap analysis response');
    }
  });

  // 6. Opportunities & Applications
  let testOppId;
  await assert('GET /api/opportunities returns scored postings', async () => {
    const res = await fetch(`${BASE_URL}/api/opportunities?userId=usr_student_aarav`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.opportunities || data.opportunities.length === 0) throw new Error('No opportunities found');
    testOppId = data.opportunities[0].id;
  });

  await assert('POST /api/applications submits application with match score', async () => {
    const res = await fetch(`${BASE_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        opportunityId: testOppId,
        userId: 'usr_student_aarav',
        coverLetter: 'Test application for automated verification.'
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('Application submission failed');
  });

  // 7. e-Logbook & Mentor Approval
  let testLogbookId;
  await assert('POST /api/logbook creates procedure entry with privacy consent', async () => {
    const res = await fetch(`${BASE_URL}/api/logbook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'usr_student_aarav',
        competencyCode: 'AY-PK-01',
        competencyName: 'Shirodhara Medicated Oil Flow & Temperature Standardization',
        domain: 'CLINICAL',
        level: 'PE',
        count: 2,
        notes: 'Automated test procedure entry.',
        noPatientIdentifiableInfo: true
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.entry) throw new Error('Failed to create logbook entry');
    testLogbookId = data.entry.id;
  });

  await assert('PATCH /api/logbook/[id]/approve verifies entry by mentor', async () => {
    const res = await fetch(`${BASE_URL}/api/logbook/${testLogbookId}/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mentorId: 'usr_acad_sharma' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.entry?.approved) throw new Error('Entry was not approved');
  });

  // 8. Verifiable Credential QR Verification
  await assert('GET /api/credentials/verify validates HMAC-SHA256 signature', async () => {
    const res = await fetch(`${BASE_URL}/api/credentials/verify?token=vc_tok_ayush_2026_001`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.valid) throw new Error(data.error || 'Signature check failed');
    if (data.signatureIntegrity !== 'PASSED_HMAC_SHA256') throw new Error('Signature integrity not passed');
  });

  // 9. Department Stats & Syllabus Recommendations
  await assert('GET /api/dept/stats generates syllabus recommendations (lack > 40%)', async () => {
    const res = await fetch(`${BASE_URL}/api/dept/stats`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.syllabusRecommendations || !data.naacMetrics) {
      throw new Error('Missing syllabus recommendations or NAAC metrics');
    }
  });

  // 10. Admin Org Verification
  await assert('PATCH /api/admin/organizations verifies partner institution', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/organizations/inst_aiia_001`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verified: true, ayushGridId: 'AG-INST-DELHI-001' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.institution?.verified) throw new Error('Institution not verified');
  });

  // 11. Government-Verified Ayush Colleges Directory
  await assert('GET /api/colleges returns accredited Ayush institutions', async () => {
    const res = await fetch(`${BASE_URL}/api/colleges`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.colleges || data.colleges.length < 5) {
      throw new Error(`Expected >=5 colleges, got ${data.colleges?.length}`);
    }
    const aiia = data.colleges.find(c => c.id === 'inst_aiia_001');
    if (!aiia || aiia.ayushAffiliationNo !== 'AYUSH-NCISM-DL-001') {
      throw new Error('AIIA Delhi NCISM affiliation number mismatch');
    }
  });

  // 12. Institutional Student Roster Upload
  await assert('POST /api/colleges/inst_aiia_001/students registers graduates with Unique Ayush ID', async () => {
    const res = await fetch(`${BASE_URL}/api/colleges/inst_aiia_001/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        students: [
          {
            name: 'API Test Student',
            email: `api.test.student_${Date.now()}@aiia.edu.in`,
            stream: 'BAMS',
            graduationMarks: 86.5,
            cgpa: 8.9,
            meritRank: 4,
            collegeRollNo: 'AIIA-2026-TEST',
            passingYear: 2026,
            skills: ['Panchakarma (Vamana/Virechana)', 'Nadi Pariksha']
          }
        ]
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.enrolledStudents?.[0]?.ayurId) {
      throw new Error('Failed to mint Unique Ayush Student ID');
    }
    if (!data.enrolledStudents[0].ayurId.startsWith('AYUR-')) {
      throw new Error(`Invalid Ayur ID prefix: ${data.enrolledStudents[0].ayurId}`);
    }
  });

  // 13. AYURSETU Personalized Sub-Portal Profile & AI Matcher
  await assert('GET /api/ayursetu/profile returns student dossier and AI recommended vacancies', async () => {
    const res = await fetch(`${BASE_URL}/api/ayursetu/profile?userId=usr_student_aarav`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.student || data.student.ayurId !== 'AYUR-2026-AIIA-0042') {
      throw new Error('Invalid AYURSETU student profile or ID');
    }
    if (!data.recommendations || data.recommendations.length === 0) {
      throw new Error('No AI recommendations generated for AYURSETU');
    }
    const topRec = data.recommendations[0];
    if (typeof topRec.compositeScore !== 'number' || !topRec.ncismReadiness) {
      throw new Error('Recommendation missing composite score or NCISM readiness breakdown');
    }
  });

  // 14. Unique Ayush Student ID Public Verification Ledger
  await assert('GET /api/verify/AYUR-2026-AIIA-0042 verifies authenticated graduate dossier', async () => {
    const res = await fetch(`${BASE_URL}/api/verify/AYUR-2026-AIIA-0042`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.valid || data.verificationStatus !== 'GOVERNMENT_AUTHENTICATED') {
      throw new Error('Verification failed or status not GOVERNMENT_AUTHENTICATED');
    }
    if (data.student.graduationMarks !== 84.5 || data.student.cgpa !== 8.8) {
      throw new Error(`Graduation marks or CGPA mismatch: marks=${data.student.graduationMarks}, cgpa=${data.student.cgpa}`);
    }
    if (!data.student.college || data.student.college.ayushAffiliationNo !== 'AYUSH-NCISM-DL-001') {
      throw new Error('Affiliated college accreditation data missing');
    }
  });

  // 15. Verify ID Negative Test (Invalid ID)
  await assert('GET /api/verify/INVALID_ID_TEST correctly returns 404', async () => {
    const res = await fetch(`${BASE_URL}/api/verify/INVALID_ID_TEST`);
    if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
    const data = await res.json();
    if (data.valid !== false) throw new Error('Expected valid: false for invalid ID');
  });
  const passed = results.filter((r) => r.pass).length;
  console.log(`Test Results: ${passed} of ${results.length} PASSED`);
  console.log('==================================================\n');

  if (passed !== results.length) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
