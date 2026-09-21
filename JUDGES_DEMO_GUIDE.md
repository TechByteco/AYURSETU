# AyushSkillBridge — Hackathon Judges' Live Demonstration Script
### Smart India Hackathon 2026 — Problem Statement SIH26044
**"Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement"**  
*Ministry of Ayush — All India Institute of Ayurveda (AIIA)*

---

## ⏱ 2-Minute Elevator Pitch (Opening Statement)

> *"Respected Judges, India has over 500 Ayush colleges graduating more than 50,000 doctors annually. Yet, pharmaceutical leaders like Dabur, Himalaya, and Patanjali report severe difficulty hiring candidates with verified clinical competencies and industry-readiness. Traditional portals like LinkedIn and Internshala fail because Ayush education is fundamentally competency-based and governed by NCISM CBME regulations.*
>
> *We present **AyushSkillBridge** — India's first unified platform connecting Ayush Students, Industry, and Academic Institutions. With our **W3C Verifiable Skill Passport**, **NCISM DOAP Competency e-Logbook**, **AI Semantic Opportunity Matcher**, and **Automated NAAC/NBA Curriculum Modernization Alerts**, we transform Ayush talent from unverified paper resumes into cryptographically authenticated healthcare professionals."*

---

## 🎭 Persona Switcher Cheat Sheet

Our top navigation bar features a live **Persona Switcher** allowing you to experience the platform from all four stakeholder viewpoints without logging in and out:

| Switcher Button | Persona & Role | Key Screen to Test | Highlight / What to Show |
|---|---|---|---|
| **Aarav** | Aarav Sharma (BAMS 4th Yr) | `/gap-analysis` & `/passport` | Radar comparison, 85% match score, tamper-proof W3C QR code. |
| **Diya** | Diya Patel (MD Dravyaguna) | `/opportunities` | Research/Pharma opportunities, high HPLC match. |
| **Recruiter** | Vikram Malhotra (Dabur) | `/org/opportunities` | NSQF posting, applicant pool ranked by AI match score. |
| **Faculty** | Prof. Rajesh Sharma (AIIA) | `/dept/dashboard` & `/logbook` | DOAP 1-click approvals, >40% curriculum gap alert & NAAC report. |
| **Admin** | Ministry Admin | `/admin/organizations` | Industry accreditation queue & AI skill extraction from syllabi. |

---

## 🎬 Step-by-Step Live Demo Scripts

### Flow 1: Student Onboarding, Skill Mapping & AI Job Matching
*Demonstrating Student Persona (Aarav Sharma - BAMS 4th Year)*

1. **Navigate to Landing Page** (`/`):
   - Highlight the **SIH26044 Problem Statement banner** at the top.
   - Point out live platform counters: 75 Verified Ayush Skills, 16 Role Ontologies, 20 Verified Industry Partners.
   - Show the interactive **Skill Passport preview card** directly on the hero.

2. **Onboarding & ABHA Integration** (`/onboard`):
   - Select **Aarav** in the navbar.
   - Show Step 1: 14-digit ABHA ID (`91-4521-8890-1234`) with instant validation and OTP verification (`123456`).
   - Show Step 2: Academic details pre-filled for All India Institute of Ayurveda (AIIA).
   - Show Step 3: **DPDP Act 2023 Consent Controls** (Granular toggles for institutional sharing, skill analytics, and anonymized research).

3. **Adaptive Skill Assessment** (`/assessment`):
   - Walk through the 10-question adaptive assessment spanning Clinical, Pharmacognosy, Panchakarma, Research Methodology, and Ayush Informatics.
   - Show how answers dynamically recommend target industry roles (e.g., *Ayurvedic Clinical Specialist*, *Panchakarma Therapist*).
   - Click **Submit Assessment**.

4. **Interactive Radar Gap Analysis** (`/gap-analysis`):
   - Switch target role to **"Ayurvedic Clinical Specialist"**.
   - Show the **Visual Radar Chart** contrasting student's current proficiency against benchmark role requirements.
   - Point out the **Overall Match Score (85%)** and computed **Delta (+15% required)**.
   - Review the **Personalized Milestone Roadmap**:
     - *Milestone 1: Panchakarma Clinical Mastery* (Completed - 85%)
     - *Milestone 2: Good Clinical Practice (GCP) in Ayush Trials* (Gap - 30 hrs recommended)
   - Click **"Add to Career Plan"** to confirm interactive engagement.

5. **AI Opportunity Recommendation & 1-Click Apply** (`/opportunities`):
   - Show opportunity listings sorted by AI match score with color-coded badges:
     - *Resident Ayurvedic Doctor - Patanjali Yogpeeth* (**88% Match - Excellent**)
     - *Clinical Trial Associate - Dabur Research Foundation* (**82% Match - Good**)
   - Filter by **Panchakarma** domain or **NSQF Level 7**.
   - Click on an opportunity card (`/opportunities/opp_001`), view required skills breakdown, and click **"1-Click Apply with Skill Passport"**.
   - Navigate to `/applications` to show the real-time application tracking timeline (**APPLIED → SHORTLISTED → INTERVIEW → OFFERED**).

---

### Flow 2: CBME Competency e-Logbook & Faculty Verification
*Demonstrating NCISM CBME DOAP Tracking & Patient Privacy Safeguards*

1. **View Student e-Logbook** (`/logbook` with persona **Aarav**):
   - Point out the **NCISM DOAP Breakdown**:
     - **Demonstrate (D)**: 4 procedures
     - **Observe (O)**: 3 procedures
     - **Assist (A)**: 5 procedures
     - **Perform (P)**: 8 procedures
   - Show the **Domain Heatmap** across Panchakarma, Shalya Tantra, and Kayachikitsa.

2. **Log a New Clinical Procedure** (`/logbook/new`):
   - Fill in:
     - Procedure: *Vamana Karma (Therapeutic Emesis)*
     - Domain: *Panchakarma*
     - Level: **Perform (P)** — Candidate performed under supervision
     - Pseudonymous Patient ID: `PT-2026-089` (No personal names allowed!)
     - Clinical Diagnosis: *Tamaka Shwasa (Bronchial Asthma)*
   - Point out the mandatory **PHI Privacy Declaration** checkbox: *"I certify that no personally identifiable patient information (PHI) has been entered in compliance with DPDP Act 2023."*
   - Click **Submit for Faculty Review**. Entry immediately appears as `PENDING_APPROVAL`.

3. **Faculty 1-Click Verification** (`/logbook` with persona **Faculty: Prof. Sharma**):
   - Switch persona to **Faculty** in the navbar.
   - The pending procedure is displayed with candidate verification details.
   - Click **"Approve Procedure"**.
   - The status transitions immediately to green **APPROVED** with faculty digital signing timestamp.

---

### Flow 3: Tamper-Proof Skill Passport & Public QR Verification
*Demonstrating W3C Digital Credentials & HMAC-SHA256 Cryptography*

1. **View Digital Skill Passport** (`/passport` with persona **Aarav**):
   - Show the official W3C Credential card featuring:
     - Issuing Authority: *All India Institute of Ayurveda (AIIA)*
     - Candidate Name: *Aarav Sharma* | ABHA: `91-4521-8890-1234`
     - Verified Competency Tags: *Panchakarma Therapy (Level 4/5)*, *Nadi Pariksha (Level 4/5)*, *Ayush Informatics (Level 3/5)*.
     - Dynamic high-resolution QR code.
   - Click **"Download Verified PDF / Badge"** (triggers celebration confetti).

2. **Test Public Verifier** (`/passport/verify`):
   - Click **"Verify Authenticity"** or navigate directly to `/passport/verify?token=...`.
   - The verifier executes cryptographic HMAC-SHA256 validation against the system master key.
   - Displays a prominent green **"VALID W3C VERIFIABLE CREDENTIAL"** badge with verification timestamp and issuing metadata.

3. **Demonstrate Tamper Detection (The Wow Factor!)**:
   - In the URL or token input box, modify a single character in the token string.
   - Click **Verify**.
   - System immediately displays a red alert: **"CRYPTOGRAPHIC VERIFICATION FAILED: Signature mismatch or altered payload. This credential cannot be trusted."**
   - *This proves to judges that the system is cryptographically secure and cannot be faked!*

---

### Flow 4: Industry & Hospital Recruiter Experience
*Demonstrating Recruiter Persona (Vikram Malhotra - Dabur Research Foundation)*

1. **Switch Persona to Recruiter**:
   - Notice the navigation bar adapts to industry recruiter actions: *Post Opportunity*, *Manage Applicants*, *Candidate Search*.

2. **Manage Applicants Pipeline** (`/org/opportunities`):
   - View posted listings: *Ayush Clinical Research Associate (NSQF Level 7)*.
   - Click **"View Applicants (4 Candidates)"**.
   - Show candidates ranked automatically by **AI Match Score**:
     - *Aarav Sharma* — **88% Match** (Panchakarma: Proficient, GCP: Intermediate)
     - *Diya Patel* — **94% Match** (Herbal Standardization: Advanced, HPLC: Proficient)
   - Click **"Verify Skill Passport"** on Diya's card to instantly inspect her authenticated credentials.
   - Click **"Shortlist Candidate"** to advance the application to the interview stage.

3. **Post New NSQF-Aligned Opportunity** (`/org/opportunities/new`):
   - Show job creation form with mandatory fields:
     - Title, Domain (Ayurveda/Yoga/Unani/Siddha/Homeopathy)
     - **NSQF Level Selection** (Level 4: Technician to Level 8: Senior Research Fellow)
     - Stipend range, location type (On-site / Hybrid / Remote)
     - Multi-select required skill vector with weighting.

---

### Flow 5: Academic HOD Curriculum Modernization & NAAC Report
*Demonstrating Institutional HOD Persona (Prof. Rajesh Sharma - AIIA)*

1. **Switch Persona to Faculty**:
   - Navigate to `/dept/dashboard`.

2. **Inspect Cohort Skill Deficiency Heatmap**:
   - Shows aggregate competency metrics across 120 BAMS 4th Year students.
   - Point out the red critical alert banner:
     > **⚠️ CURRICULUM DEFICIENCY DETECTED**: 64% of cohort students are deficient in **"Good Clinical Practice (GCP) in Ayush Trials"** and 48% in **"Ayush Informatics & NAMASTE Portal"**, while regional clinical employers report high demand.

3. **Automated Syllabus Amendment Recommendation**:
   - The system automatically drafts a formal curriculum update proposal:
     - *Module Title*: Hands-on GCP & Ayush Health Data Systems (15 Hours Practical)
     - *Target Year*: BAMS 4th Year / Internship Phase
     - *NCISM Alignment*: Compulsory elective under Clinical Research guidelines.

4. **1-Click NAAC / NBA Accreditation Evidence Export**:
   - Scroll to **"Accreditation Compliance Report (NAAC Criteria 1 & 2 / NBA Criterion 3)"**.
   - Displays real-time metrics for:
     - *Criterion 1.1*: Curriculum relevance and industry alignment score (88.4%)
     - *Criterion 1.3*: Value-added experiential learning courses (12 verified)
     - *Criterion 2.6*: Student performance and learning outcomes (DOAP procedure completion rate: 91.2%)
   - Click **"Print / Export NAAC Audit Evidence"** to trigger formatted audit documentation.

---

### Flow 6: Ministry Moderation & AI Ontology Expansion
*Demonstrating Ministry Admin Persona*

1. **Switch Persona to Admin**:
   - Navigate to `/admin/organizations`.
   - Show the **Industry Verification Queue**: verify new healthcare providers and pharmaceutical manufacturers with CIN/GSTIN checks before they can post internships.

2. **AI Skill Ontology Ingestion** (`/admin/ontology`):
   - Paste a draft clinical guideline or NCISM notification text into the text area.
   - Click **"Extract Ayush Competencies"**.
   - The NLP microservice identifies new clinical procedures, classical formulations, and regulatory skills, calculating suggested NSQF levels and domain assignments.
   - Click **"Add to National Skill Catalog"** to expand the taxonomy.

---

### Flow 7: Trilingual Support & National Digital Architecture
*Demonstrating BHASHINI AI Localization*

1. **Switch Language in Navbar**:
   - Click **हिन्दी (Hindi)**: Notice all UI labels, procedure categories, and DOAP stages translate into authentic Ayush terminology (उदा. *पंचकर्म, वमन कर्म, नाड़ी परीक्षा, प्रमाणीकरण*).
   - Click **தமிழ் (Tamil)**: Seamlessly adapts for Siddha institutions and students across Tamil Nadu.
   - Switch back to **English** for continued evaluation.

---

## 💡 Anticipated Tough Questions from Judges & Winning Answers

### Q1: "How is this different from LinkedIn, Internshala, or standard job portals?"
> **Answer**:  
> *"Generic job portals rely on self-declared text on unverified PDF resumes. AyushSkillBridge has three key moats:*
> 1. *It maps to the **NCISM Competency-Based Medical Education (CBME)** framework with verified **DOAP levels (Demonstrate, Observe, Assist, Perform)** signed by college faculty.*
> 2. *It issues **W3C Verifiable Credentials** with cryptographic HMAC-SHA256 signatures that can be verified in 100ms via offline QR codes, eliminating resume fraud.*
> 3. *It feeds industry skill deficits back into the university syllabus, automatically generating **NAAC/NBA accreditation evidence**."*

### Q2: "How do you handle patient data privacy in the student e-Logbook?"
> **Answer**:  
> *"We strictly adhere to India's **Digital Personal Data Protection (DPDP) Act 2023** and **National Digital Health Guidelines**. The student e-Logbook completely forbids patient names, phone numbers, or Aadhaar numbers. Records use pseudonymous IDs (e.g., PT-2026-089) combined with clinical diagnoses and procedure codes. Furthermore, students must sign a mandatory legal PHI privacy declaration before submitting any entry."*

### Q3: "What if a student or college tries to forge a certificate or QR code?"
> **Answer**:  
> *(Offer to show the live tamper demo!)*  
> *"Every credential generated by AyushSkillBridge is digitally signed using an HMAC-SHA256 cryptographic signature tied to the student's unique ABHA ID, competency vector, and issuing timestamp. If a single character in the credential payload or QR token is modified, the public verifier (`/passport/verify`) instantly detects the mathematical signature mismatch and rejects it with a critical fraud alert."*

### Q4: "How does the AI matching algorithm work, and what if the AI microservice goes down?"
> **Answer**:  
> *"Our matching engine computes normalized multi-dimensional competency vectors for candidates and opportunities across 6 Ayush domains, applying cosine similarity with penalty terms for critical required skills. To ensure zero-downtime Hackathon resilience, our Next.js architecture features **resilient dual-engine architecture**: if the Python FastAPI microservice is offline, the Next.js server seamlessly executes our embedded mathematical vector matcher without any interruption to the user experience."*

### Q5: "How does this scale to all 500+ Ayush colleges across India?"
> **Answer**:  
> *"The system is built on a multi-tenant Next.js 14 architecture with Prisma ORM. While we demo on high-performance SQLite for zero-config portability, our codebase includes a complete production **PostgreSQL schema (`schema.postgres.prisma`)**, Docker containerization, and is ready for national cloud hosting on NIC MeghRaj or AWS GovCloud with ABHA API gateway integration."*

---

## 🏆 Summary of Automated Test Verification

You can invite the judges to run or inspect our automated test suites:

- **13 of 13 REST API Tests Passed** (`node test-api.mjs`) — 100% coverage of all core endpoints.
- **11 of 11 Puppeteer Browser Journeys Passed** (`node test-e2e.mjs`) — 100% verification of real user clicks, form submissions, and page navigations.
