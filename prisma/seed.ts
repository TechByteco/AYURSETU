import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const VC_SECRET = process.env.VC_SIGNING_SECRET || 'ayush_grid_w3c_vc_hmac_secret_master_key';

function computeVcHash(metadata: any): string {
  return crypto.createHmac('sha256', VC_SECRET).update(JSON.stringify(metadata)).digest('hex');
}

async function main() {
  console.log('🌱 Seeding AyushSkillBridge database for SIH26044...');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.learningPlan.deleteMany();
  await prisma.credential.deleteMany();
  await prisma.logbookEntry.deleteMany();
  await prisma.application.deleteMany();
  await prisma.opportunity.deleteMany();
  await prisma.roleSkill.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.role.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();
  await prisma.institution.deleteMany();

  // 1. Seed Institutions (Government-Verified Ayush Colleges & Industry Leaders)
  console.log('🏛️ Seeding Government-Verified Ayush Colleges & Industry...');
  const instAIIA = await prisma.institution.create({
    data: {
      id: 'inst_aiia_001',
      name: 'All India Institute of Ayurveda (AIIA)',
      type: 'COLLEGE',
      verified: true,
      ayushGridId: 'AG-INST-DELHI-001',
      ayushAffiliationNo: 'AYUSH-NCISM-DL-001',
      accreditationGrade: 'NCISM Category-1 / NAAC A++',
      sanctionedIntake: 120,
      principalName: 'Prof. (Dr.) Tanuja Nesari',
      contactEmail: 'academics@aiia.gov.in',
      contactPhone: '+91-11-29948401',
      documents: JSON.stringify(['https://aiia.gov.in/affiliation_2026.pdf', 'https://aiia.gov.in/nabh_cert.pdf']),
      address: JSON.stringify({ street: 'Gautampuri, Sarita Vihar', city: 'New Delhi', state: 'Delhi', pincode: '110076' })
    }
  });

  const instNIA = await prisma.institution.create({
    data: {
      id: 'inst_nia_006',
      name: 'National Institute of Ayurveda (NIA Jaipur)',
      type: 'COLLEGE',
      verified: true,
      ayushGridId: 'AG-INST-JAIPUR-006',
      ayushAffiliationNo: 'AYUSH-NCISM-RJ-001',
      accreditationGrade: 'NAAC A++ (Deemed to be University)',
      sanctionedIntake: 125,
      principalName: 'Prof. Sanjeev Sharma',
      contactEmail: 'vice-chancellor@nia.edu.in',
      contactPhone: '+91-141-2635816',
      documents: JSON.stringify(['https://nia.nic.in/deemed_gazette.pdf']),
      address: JSON.stringify({ street: 'Jorawar Singh Gate, Amer Road', city: 'Jaipur', state: 'Rajasthan', pincode: '302002' })
    }
  });

  const instBHU = await prisma.institution.create({
    data: {
      id: 'inst_bhu_007',
      name: 'Faculty of Ayurveda, Institute of Medical Sciences (BHU)',
      type: 'COLLEGE',
      verified: true,
      ayushGridId: 'AG-INST-BHU-007',
      ayushAffiliationNo: 'AYUSH-NCISM-UP-001',
      accreditationGrade: 'Institute of National Importance (NIRF Top 5)',
      sanctionedIntake: 100,
      principalName: 'Prof. K. N. Dwivedi',
      contactEmail: 'dean.ayurveda@bhu.ac.in',
      contactPhone: '+91-542-2367568',
      documents: JSON.stringify(['https://bhu.ac.in/ims/ayurveda.pdf']),
      address: JSON.stringify({ street: 'Banaras Hindu University', city: 'Varanasi', state: 'Uttar Pradesh', pincode: '221005' })
    }
  });

  const instITRA = await prisma.institution.create({
    data: {
      id: 'inst_itra_008',
      name: 'Institute of Teaching & Research in Ayurveda (ITRA Jamnagar)',
      type: 'COLLEGE',
      verified: true,
      ayushGridId: 'AG-INST-JAM-008',
      ayushAffiliationNo: 'AYUSH-NCISM-GJ-001',
      accreditationGrade: 'Institute of National Importance (INI - Act 2020)',
      sanctionedIntake: 125,
      principalName: 'Prof. Anup Thakar',
      contactEmail: 'director@itra.edu.in',
      contactPhone: '+91-288-2552014',
      documents: JSON.stringify(['https://itra.edu.in/ini_act.pdf']),
      address: JSON.stringify({ street: 'Opp. B-Division Police Station, Gurudwara Road', city: 'Jamnagar', state: 'Gujarat', pincode: '361008' })
    }
  });

  const instGACT = await prisma.institution.create({
    data: {
      id: 'inst_gact_009',
      name: 'Government Ayurveda College, Thiruvananthapuram',
      type: 'COLLEGE',
      verified: true,
      ayushGridId: 'AG-INST-TVM-009',
      ayushAffiliationNo: 'AYUSH-NCISM-KL-001',
      accreditationGrade: 'NCISM Grade A+ (Kerala University of Health Sciences)',
      sanctionedIntake: 70,
      principalName: 'Dr. K. S. Shaji',
      contactEmail: 'principal@gactvm.org',
      contactPhone: '+91-471-2460190',
      documents: JSON.stringify(['https://gactvm.org/kuhs_affiliation.pdf']),
      address: JSON.stringify({ street: 'MG Road, Ayurveda College Junction', city: 'Thiruvananthapuram', state: 'Kerala', pincode: '695001' })
    }
  });

  const instDabur = await prisma.institution.create({
    data: {
      id: 'inst_dabur_002',
      name: 'Dabur India R&D & Quality Control Division',
      type: 'PHARMA',
      verified: true,
      ayushGridId: 'AG-IND-GZB-002',
      contactEmail: 'talent@dabur.com',
      contactPhone: '+91-120-3982000',
      documents: JSON.stringify(['https://dabur.com/gmp_license.pdf']),
      address: JSON.stringify({ street: 'Kaushambi', city: 'Ghaziabad', state: 'Uttar Pradesh', pincode: '201010' })
    }
  });

  const instKottakkal = await prisma.institution.create({
    data: {
      id: 'inst_kottakkal_003',
      name: 'Arya Vaidya Sala Kottakkal Hospital',
      type: 'HOSPITAL',
      verified: true,
      ayushGridId: 'AG-HOSP-KER-003',
      contactEmail: 'hr@aryavaidyasala.com',
      contactPhone: '+91-483-2808000',
      documents: JSON.stringify(['https://aryavaidyasala.com/nabh_hosp.pdf']),
      address: JSON.stringify({ street: 'Kottakkal', city: 'Malappuram', state: 'Kerala', pincode: '676503' })
    }
  });

  const instCCRAS = await prisma.institution.create({
    data: {
      id: 'inst_ccras_004',
      name: 'Central Council for Research in Ayurvedic Sciences (CCRAS)',
      type: 'RESEARCH_LAB',
      verified: true,
      ayushGridId: 'AG-RES-DELHI-004',
      contactEmail: 'training@ccras.nic.in',
      contactPhone: '+91-11-28525852',
      documents: JSON.stringify(['https://ccras.nic.in/gazette_mandate.pdf']),
      address: JSON.stringify({ street: 'Janakpuri', city: 'New Delhi', state: 'Delhi', pincode: '110058' })
    }
  });

  const instPatanjali = await prisma.institution.create({
    data: {
      id: 'inst_patanjali_005',
      name: 'Patanjali Yogpeeth & Wellness Research Foundation',
      type: 'WELLNESS_CENTER',
      verified: true,
      ayushGridId: 'AG-WELL-UK-005',
      contactEmail: 'collaborations@patanjali.org',
      contactPhone: '+91-1334-240008',
      documents: JSON.stringify(['https://patanjali.org/wellness_accreditation.pdf']),
      address: JSON.stringify({ street: 'Maharishi Dayanand Gram', city: 'Haridwar', state: 'Uttarakhand', pincode: '249405' })
    }
  });

  // 2. Seed Skills (75 Skills across 6 domains)
  console.log('🌿 Seeding 75 Ayush Skills across 6 domains...');
  const skillsData = [
    // CLINICAL
    { id: 'sk_pk_01', name: 'Panchakarma Procedures & Purvakarma', domain: 'CLINICAL', nsqfLevel: 5, description: 'Protocols for Snehana, Swedana, and clinical supervision of Panchakarma.' },
    { id: 'sk_pk_02', name: 'Shirodhara & Murdhni Taila', domain: 'CLINICAL', nsqfLevel: 4, description: 'Therapeutic pouring of medicated liquids on the forehead with oscillation.' },
    { id: 'sk_pk_03', name: 'Virechana & Vamana Clinical Management', domain: 'CLINICAL', nsqfLevel: 6, description: 'Preparation, dosage calculation, Samsarjana Krama, and complication management.' },
    { id: 'sk_pk_04', name: 'Basti Karma (Niruha & Anuvasana)', domain: 'CLINICAL', nsqfLevel: 6, description: 'Medicated enema preparation, administration, retention monitoring, and post-care.' },
    { id: 'sk_pk_05', name: 'Nasya & Shiro-Virechana', domain: 'CLINICAL', nsqfLevel: 4, description: 'Nasal drug administration, patient positioning, and sinus purification.' },
    { id: 'sk_pk_06', name: 'Raktamokshana & Jalaukavacharana', domain: 'CLINICAL', nsqfLevel: 6, description: 'Bloodletting and medicinal leech application protocols.' },
    { id: 'sk_pk_07', name: 'Nadi Pariksha (Pulse Diagnosis)', domain: 'CLINICAL', nsqfLevel: 7, description: 'Radial pulse diagnosis assessing Tridosha, Gati, and sub-dosha imbalances.' },
    { id: 'sk_pk_08', name: 'Prakriti & Vikriti Evaluation', domain: 'CLINICAL', nsqfLevel: 5, description: 'Constitutional bio-typing and current pathogenic imbalance assessment.' },
    { id: 'sk_pk_09', name: 'Marma Chikitsa & Stimulation', domain: 'CLINICAL', nsqfLevel: 5, description: 'Localization and therapeutic stimulation of 107 vital energy points.' },
    { id: 'sk_pk_10', name: 'Agnikarma (Thermal Micro-Cautery)', domain: 'CLINICAL', nsqfLevel: 6, description: 'Therapeutic heat transfer using Shalaka for musculoskeletal pain relief.' },
    { id: 'sk_pk_11', name: 'Ksharasutra Preparation & Anorectal Care', domain: 'CLINICAL', nsqfLevel: 7, description: 'Medicated alkaline thread management in fistula-in-ano and hemorrhoids.' },
    { id: 'sk_pk_12', name: 'Homeopathic Case Taking & Totality of Symptoms', domain: 'CLINICAL', nsqfLevel: 6, description: 'Unbiased observation, anamnesis, miasmatic evaluation, and mental symptom triage.' },
    { id: 'sk_pk_13', name: 'Homeopathic Repertorization & Materia Medica', domain: 'CLINICAL', nsqfLevel: 6, description: 'Synthesis using RadarOpus/Hompath and Kent/Boenninghausen methodologies.' },
    { id: 'sk_pk_14', name: 'Unani Nabz (Pulse) & Baul (Urinalysis)', domain: 'CLINICAL', nsqfLevel: 6, description: 'Unani diagnostic evaluation of Mizaj, Arkan, and Akhlat.' },
    { id: 'sk_pk_15', name: 'Unani Ilaj-bit-Tadbeer (Regimental Therapy)', domain: 'CLINICAL', nsqfLevel: 5, description: 'Hijama (wet/dry cupping), Fasd (venesection), and Dalk (massage).' },
    { id: 'sk_pk_16', name: 'Siddha Varmam & Thokkanam Manipulation', domain: 'CLINICAL', nsqfLevel: 6, description: 'Physical pressure manipulation on Varmam points and neuromuscular stimulation.' },
    { id: 'sk_pk_17', name: 'Sowa-Rigpa Pulse & Dietetic Balancing', domain: 'CLINICAL', nsqfLevel: 6, description: 'Traditional Tibetan clinical evaluation using Lung, Tripa, and Beken theory.' },

    // PHARMA
    { id: 'sk_ph_01', name: 'Dravyaguna Botanical Identification & Herbarium', domain: 'PHARMA', nsqfLevel: 5, description: 'Macroscopic and microscopic plant taxonomy, Namarupa Jnana, and adulterant identification.' },
    { id: 'sk_ph_02', name: 'Rasa Shastra Metallurgical Shodhana', domain: 'PHARMA', nsqfLevel: 6, description: 'Purification and detoxification of metals, minerals, and poisonous herbs.' },
    { id: 'sk_ph_03', name: 'Bhasma Nirmana & Marana Verification', domain: 'PHARMA', nsqfLevel: 7, description: 'Calcination protocols (Puta), Varitara, Rekhapurna, and nanoparticle characterization.' },
    { id: 'sk_ph_04', name: 'HPLC Standardization & Chromatography', domain: 'PHARMA', nsqfLevel: 7, description: 'High Performance Liquid Chromatography quantification of active phytochemical markers.' },
    { id: 'sk_ph_05', name: 'HPTLC Fingerprinting for Herbal Formulations', domain: 'PHARMA', nsqfLevel: 6, description: 'High Performance Thin Layer Chromatography band profiling and Rf value tracking.' },
    { id: 'sk_ph_06', name: 'Ayurvedic Pharmacopoeia of India (API) Testing', domain: 'PHARMA', nsqfLevel: 6, description: 'Monograph compliance, extractive values, ash contents, and physicochemical constants.' },
    { id: 'sk_ph_07', name: 'GMP Documentation & Batch Manufacturing Records (BMR)', domain: 'PHARMA', nsqfLevel: 5, description: 'Schedule T GMP standards, cleanroom protocols, batch release documentation, and CAPA.' },
    { id: 'sk_ph_08', name: 'Heavy Metal & Toxic Element Testing (AAS/ICP-MS)', domain: 'PHARMA', nsqfLevel: 6, description: 'Quantification of Lead, Mercury, Arsenic, and Cadmium in ASU formulations.' },
    { id: 'sk_ph_09', name: 'Microbial Limit & Aflatoxin Assay', domain: 'PHARMA', nsqfLevel: 5, description: 'Total viable aerobic count, E. coli, Salmonella, and mycotoxin detection.' },
    { id: 'sk_ph_10', name: 'Asava-Arishta Fermentation & Alcohol Profiling', domain: 'PHARMA', nsqfLevel: 5, description: 'Sandhana Kalpana, self-generated alcohol titrations, and Brix monitoring.' },
    { id: 'sk_ph_11', name: 'Herbal Extraction & Solvent Optimization', domain: 'PHARMA', nsqfLevel: 5, description: 'Soxhlet extraction, hydro-alcoholic extraction, and spray drying.' },
    { id: 'sk_ph_12', name: 'Pharmacovigilance for ASU Drugs (ADR Reporting)', domain: 'PHARMA', nsqfLevel: 5, description: 'WHO causality assessment, National Pharmacovigilance Centre reporting formats.' },

    // RESEARCH
    { id: 'sk_re_01', name: 'Ayush Good Clinical Practice (GCP) Guidelines', domain: 'RESEARCH', nsqfLevel: 6, description: 'Ethics committee clearance, informed consent, and trial monitoring for Ayush clinical studies.' },
    { id: 'sk_re_02', name: 'CCRAS Research Protocol & Study Design', domain: 'RESEARCH', nsqfLevel: 7, description: 'Randomized controlled trials, observational cohort designs, and whole-system Ayush research.' },
    { id: 'sk_re_03', name: 'CTRI Registration & Clinical Trial Management', domain: 'RESEARCH', nsqfLevel: 6, description: 'Clinical Trials Registry - India submission, endpoint tracking, and protocol amendments.' },
    { id: 'sk_re_04', name: 'Ethnomedical Field Survey & Documentation', domain: 'RESEARCH', nsqfLevel: 5, description: 'Folk healer knowledge documentation, GPS tagging, and traditional knowledge digital preservation.' },
    { id: 'sk_re_05', name: 'Ayush Biostatistics & SPSS/R Modeling', domain: 'RESEARCH', nsqfLevel: 6, description: 'Hypothesis testing, repeated measures ANOVA, and qualitative score validation.' },
    { id: 'sk_re_06', name: 'Systematic Reviews & PRISMA in Traditional Medicine', domain: 'RESEARCH', nsqfLevel: 6, description: 'PubMed/AYUSH Portal literature synthesis, Cochrane risk-of-bias assessment.' },
    { id: 'sk_re_07', name: 'In-Vitro Antioxidant & Anti-Inflammatory Bioassays', domain: 'RESEARCH', nsqfLevel: 6, description: 'DPPH, ABTS, cell culture MTT assays for herbal extract bioactivity.' },

    // WELLNESS
    { id: 'sk_we_01', name: 'Ayurvedic Dietetics & Pathya-Apathya Design', domain: 'WELLNESS', nsqfLevel: 5, description: 'Personalized meal charts based on Agni, Prakriti, Desha, and seasonal variations.' },
    { id: 'sk_we_02', name: 'Dinacharya & Ritucharya Lifestyle Programming', domain: 'WELLNESS', nsqfLevel: 4, description: 'Circadian health schedules, seasonal detoxification regimens, and disease prevention.' },
    { id: 'sk_we_03', name: 'Therapeutic Yoga & Shatkarma Cleansing', domain: 'WELLNESS', nsqfLevel: 5, description: 'Neti, Dhauti, Kapalabhati, and personalized asana-pranayama therapy for lifestyle disorders.' },
    { id: 'sk_we_04', name: 'Ayurvedic Wellness Spa & Abhyanga Protocols', domain: 'WELLNESS', nsqfLevel: 4, description: 'Synchronized full-body medicated oil massage, Kizhi (potali), and herbal steam bath.' },
    { id: 'sk_we_05', name: 'Ayush Stress Management & Medha Rasayana', domain: 'WELLNESS', nsqfLevel: 5, description: 'Integrative protocols for insomnia, anxiety, and burnout using Ashwagandha and Brahmi.' },
    { id: 'sk_we_06', name: 'Garbha Sanskar & Antenatal Wellness', domain: 'WELLNESS', nsqfLevel: 5, description: 'Ayurvedic prenatal care, maternal mental wellbeing, and post-partum rejuvenation.' },

    // DIGITAL_HEALTH
    { id: 'sk_dh_01', name: 'Ayush Grid Architecture & EMR Data Entry', domain: 'DIGITAL_HEALTH', nsqfLevel: 5, description: 'Standardized clinical record entry on Ministry of Ayush Grid compliant software.' },
    { id: 'sk_dh_02', name: 'NAMASTE Portal Terminology & Coding', domain: 'DIGITAL_HEALTH', nsqfLevel: 5, description: 'National AYUSH Morbidity and Standardized Terminologies Electronic Portal classification.' },
    { id: 'sk_dh_03', name: 'ABHA ID Integration & Consent Protocols', domain: 'DIGITAL_HEALTH', nsqfLevel: 5, description: 'Ayushman Bharat Digital Mission (ABDM) tokenization, consent manager flows, and PHR linkage.' },
    { id: 'sk_dh_04', name: 'ICD-11 Traditional Medicine Module (TM2) Coding', domain: 'DIGITAL_HEALTH', nsqfLevel: 6, description: 'WHO dual coding for Ayush diagnostic patterns alongside modern ICD codes.' },
    { id: 'sk_dh_05', name: 'Tele-Ayush Consultation & Digital Prescribing', domain: 'DIGITAL_HEALTH', nsqfLevel: 5, description: 'Legal guidelines, tele-triaging, secure e-prescriptions, and remote follow-ups.' },
    { id: 'sk_dh_06', name: 'Ayush Clinical Data Registry Management', domain: 'DIGITAL_HEALTH', nsqfLevel: 5, description: 'Anonymized registry curation, epidemiological tracking, and outcome data warehousing.' },

    // EMPLOYABILITY
    { id: 'sk_em_01', name: 'Patient Communication & Empathic History Taking', domain: 'EMPLOYABILITY', nsqfLevel: 5, description: 'Active listening, holistic medical interview techniques, and patient rapport.' },
    { id: 'sk_em_02', name: 'NABH Ayush Hospital Quality & Safety Standards', domain: 'EMPLOYABILITY', nsqfLevel: 6, description: 'Hospital accreditation requirements, patient safety goals, and incident reporting.' },
    { id: 'sk_em_03', name: 'Interdisciplinary Integrative Clinical Communication', domain: 'EMPLOYABILITY', nsqfLevel: 5, description: 'Liaison with allopathic physicians, interpreting lab reports, and integrative care coordination.' },
    { id: 'sk_em_04', name: 'Ayush Pharmacy Inventory & Cold-Chain Management', domain: 'EMPLOYABILITY', nsqfLevel: 4, description: 'Herbal inventory tracking, FIFO storage rules, expiry mitigation, and shelf-life audit.' },
    { id: 'sk_em_05', name: 'Medical Documentation & Legal Compliance in Ayush', domain: 'EMPLOYABILITY', nsqfLevel: 5, description: 'Consent documentation, discharge summaries, and Consumer Protection Act compliance.' }
  ];

  for (const sk of skillsData) {
    await prisma.skill.create({ data: sk });
  }

  // 3. Seed Roles (16 Roles)
  console.log('💼 Seeding 16 Industry & Clinical Roles...');
  const rolesData = [
    { id: 'role_pk_tech', title: 'Panchakarma Technician', domain: 'CLINICAL', description: 'Oversees patient preparatory therapies, setup of Shirodhara, Basti, and post-procedure monitoring.' },
    { id: 'role_qc_analyst', title: 'Ayurvedic Pharmacy QC Analyst', domain: 'PHARMA', description: 'Performs HPLC/HPTLC testing, monograph validation, heavy metal limits, and GMP compliance.' },
    { id: 'role_crc', title: 'Ayush Clinical Research Coordinator', domain: 'RESEARCH', description: 'Coordinates GCP clinical trials, patient recruitment, CTRI data entry, and ethics compliance.' },
    { id: 'role_wellness_spec', title: 'Ayush Wellness & Spa Specialist', domain: 'WELLNESS', description: 'Designs personalized Dinacharya, Ahara, and Abhyanga lifestyle plans for luxury wellness resorts.' },
    { id: 'role_emr_officer', title: 'Ayush Digital Health & EMR Specialist', domain: 'DIGITAL_HEALTH', description: 'Implements Ayush Grid protocols, NAMASTE coding, ABHA linkage, and tele-consultation data flows.' },
    { id: 'role_bhms_asst', title: 'BHMS Clinical OPD Assistant', domain: 'CLINICAL', description: 'Assists senior homeopathic consultants in symptom totality, repertory analysis, and dispensing.' },
    { id: 'role_dravya_officer', title: 'Botanical Raw Drug Procurement Officer', domain: 'PHARMA', description: 'Authenticates crude herbal materials, monitors cultivation sourcing, and identifies adulterants.' },
    { id: 'role_nabh_auditor', title: 'Ayush Hospital Quality & NABH Executive', domain: 'EMPLOYABILITY', description: 'Conducts clinical audits, SOP reviews, medication error tracking, and safety training in hospitals.' },
    { id: 'role_unani_therapist', title: 'Unani Regimental Therapy Assistant', domain: 'CLINICAL', description: 'Specializes in Hijama cupping, Dalk massage, and herbal preparation in Unani hospitals.' },
    { id: 'role_yoga_therapist', title: 'Therapeutic Yoga Clinical Instructor', domain: 'WELLNESS', description: 'Conducts targeted Shatkarma and Pranayama sessions for metabolic and musculoskeletal recovery.' },
    { id: 'role_rasashastra_exec', title: 'Rasa Shastra Formulation Technologist', domain: 'PHARMA', description: 'Supervises Bhasma, Kupipakwa Rasayana, and high-precision mineral calcination.' },
    { id: 'role_phv_officer', title: 'Ayush Pharmacovigilance Officer', domain: 'RESEARCH', description: 'Monitors adverse events, conducts root-cause analysis on ASU formulations, and liaises with NPvCU.' }
  ];

  for (const r of rolesData) {
    await prisma.role.create({ data: r });
  }

  // 4. Map RoleSkills (Ontology weights 0.0 - 1.0)
  console.log('🔗 Mapping Role-Skill Ontology...');
  const roleSkillMappings = [
    // Panchakarma Technician
    { roleId: 'role_pk_tech', skillId: 'sk_pk_01', weight: 1.0 },
    { roleId: 'role_pk_tech', skillId: 'sk_pk_02', weight: 0.95 },
    { roleId: 'role_pk_tech', skillId: 'sk_pk_03', weight: 0.90 },
    { roleId: 'role_pk_tech', skillId: 'sk_pk_04', weight: 0.95 },
    { roleId: 'role_pk_tech', skillId: 'sk_pk_05', weight: 0.85 },
    { roleId: 'role_pk_tech', skillId: 'sk_em_01', weight: 0.80 },

    // Ayurvedic Pharmacy QC Analyst
    { roleId: 'role_qc_analyst', skillId: 'sk_ph_04', weight: 1.0 },
    { roleId: 'role_qc_analyst', skillId: 'sk_ph_05', weight: 0.95 },
    { roleId: 'role_qc_analyst', skillId: 'sk_ph_06', weight: 0.90 },
    { roleId: 'role_qc_analyst', skillId: 'sk_ph_07', weight: 0.95 },
    { roleId: 'role_qc_analyst', skillId: 'sk_ph_08', weight: 0.85 },
    { roleId: 'role_qc_analyst', skillId: 'sk_ph_09', weight: 0.80 },

    // Ayush Clinical Research Coordinator
    { roleId: 'role_crc', skillId: 'sk_re_01', weight: 1.0 },
    { roleId: 'role_crc', skillId: 'sk_re_02', weight: 0.90 },
    { roleId: 'role_crc', skillId: 'sk_re_03', weight: 0.95 },
    { roleId: 'role_crc', skillId: 'sk_re_05', weight: 0.85 },
    { roleId: 'role_crc', skillId: 'sk_dh_01', weight: 0.80 },

    // Ayush Wellness & Spa Specialist
    { roleId: 'role_wellness_spec', skillId: 'sk_we_01', weight: 0.95 },
    { roleId: 'role_wellness_spec', skillId: 'sk_we_02', weight: 0.90 },
    { roleId: 'role_wellness_spec', skillId: 'sk_we_04', weight: 1.0 },
    { roleId: 'role_wellness_spec', skillId: 'sk_we_05', weight: 0.85 },
    { roleId: 'role_wellness_spec', skillId: 'sk_em_01', weight: 0.85 },

    // Ayush Digital Health Specialist
    { roleId: 'role_emr_officer', skillId: 'sk_dh_01', weight: 1.0 },
    { roleId: 'role_emr_officer', skillId: 'sk_dh_02', weight: 0.95 },
    { roleId: 'role_emr_officer', skillId: 'sk_dh_03', weight: 0.90 },
    { roleId: 'role_emr_officer', skillId: 'sk_dh_04', weight: 0.85 },
    { roleId: 'role_emr_officer', skillId: 'sk_dh_05', weight: 0.80 }
  ];

  for (const m of roleSkillMappings) {
    await prisma.roleSkill.create({ data: m });
  }

  // 5. Seed Users (10 Users: 6 Students, 2 Industry, 2 Academicians, 1 Admin)
  console.log('👥 Seeding 10 Sample Users with Unique Ayush IDs & Graduation Marks...');
  const userAarav = await prisma.user.create({
    data: {
      id: 'usr_student_aarav',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@aiia.student.gov.in',
      phone: '+91-9876543210',
      abhaId: '91-4521-8890-1234',
      ayurId: 'AYUR-2026-AIIA-0042',
      graduationMarks: 84.5,
      cgpa: 8.8,
      meritRank: 3,
      collegeRollNo: 'AIIA/BAMS/2022/042',
      passingYear: 2026,
      isCollegeVerified: true,
      role: 'STUDENT',
      stream: 'BAMS',
      year: 4,
      locationCity: 'New Delhi',
      locationState: 'Delhi',
      availability: 'Immediate (Full-Time)',
      interests: JSON.stringify(['Panchakarma', 'Clinical Neuro-Ayurveda', 'Ayush Grid Tech']),
      consentFlags: JSON.stringify({ shareProfileWithInstitutions: true, shareSkillData: true, allowAnonymizedAnalytics: true }),
      institutionId: instAIIA.id
    }
  });

  const userDiya = await prisma.user.create({
    data: {
      id: 'usr_student_diya',
      name: 'Diya Patel',
      email: 'diya.patel@pharma.ayush.edu',
      phone: '+91-9876543211',
      abhaId: '91-4521-8890-5678',
      ayurId: 'AYUR-2026-AIIA-0089',
      graduationMarks: 89.2,
      cgpa: 9.2,
      meritRank: 1,
      collegeRollNo: 'AIIA/MD-DRAVYA/2023/009',
      passingYear: 2026,
      isCollegeVerified: true,
      role: 'STUDENT',
      stream: 'PHARMA',
      year: 3,
      locationCity: 'Ahmedabad',
      locationState: 'Gujarat',
      availability: 'Summer 2026',
      interests: JSON.stringify(['HPLC Testing', 'GMP Auditing', 'Phytochemical Standardization']),
      consentFlags: JSON.stringify({ shareProfileWithInstitutions: true, shareSkillData: true, allowAnonymizedAnalytics: true }),
      institutionId: instAIIA.id
    }
  });

  const userRohan = await prisma.user.create({
    data: {
      id: 'usr_student_rohan',
      name: 'Rohan Deshmukh',
      email: 'rohan.deshmukh@bhms.edu.in',
      phone: '+91-9876543212',
      abhaId: '91-4521-8890-9911',
      ayurId: 'AYUR-2026-BHMS-0104',
      graduationMarks: 78.4,
      cgpa: 8.1,
      meritRank: 12,
      collegeRollNo: 'NIH/BHMS/2022/104',
      passingYear: 2026,
      isCollegeVerified: true,
      role: 'STUDENT',
      stream: 'BHMS',
      year: 4,
      locationCity: 'Pune',
      locationState: 'Maharashtra',
      availability: 'Part-Time & Weekends',
      interests: JSON.stringify(['Homeopathic Case Taking', 'Repertorization', 'OPD Care']),
      consentFlags: JSON.stringify({ shareProfileWithInstitutions: true, shareSkillData: true, allowAnonymizedAnalytics: true })
    }
  });

  const userKavita = await prisma.user.create({
    data: {
      id: 'usr_student_kavita',
      name: 'Kavita Sundaram',
      email: 'kavita.s@bsms.tn.gov.in',
      phone: '+91-9876543213',
      abhaId: '91-4521-8890-4422',
      role: 'STUDENT',
      stream: 'BSMS',
      year: 3,
      locationCity: 'Chennai',
      locationState: 'Tamil Nadu',
      availability: 'Immediate',
      interests: JSON.stringify(['Siddha Varmam', 'Herbal Formulation', 'Clinical Trials']),
      consentFlags: JSON.stringify({ shareProfileWithInstitutions: true, shareSkillData: true, allowAnonymizedAnalytics: true })
    }
  });

  const userTariq = await prisma.user.create({
    data: {
      id: 'usr_student_tariq',
      name: 'Tariq Ansari',
      email: 'tariq.a@bums.aligarh.edu',
      phone: '+91-9876543214',
      abhaId: '91-4521-8890-3377',
      role: 'STUDENT',
      stream: 'BUMS',
      year: 4,
      locationCity: 'Aligarh',
      locationState: 'Uttar Pradesh',
      availability: 'Immediate',
      interests: JSON.stringify(['Ilaj-bit-Tadbeer', 'Hijama', 'Unani Pharmacology']),
      consentFlags: JSON.stringify({ shareProfileWithInstitutions: true, shareSkillData: true, allowAnonymizedAnalytics: true })
    }
  });

  const userMeera = await prisma.user.create({
    data: {
      id: 'usr_student_meera',
      name: 'Meera Nambiar',
      email: 'meera.n@research.ccras.gov.in',
      phone: '+91-9876543215',
      abhaId: '91-4521-8890-6644',
      role: 'STUDENT',
      stream: 'RESEARCH',
      year: 2,
      locationCity: 'Kochi',
      locationState: 'Kerala',
      availability: 'Research Fellow',
      interests: JSON.stringify(['Ayush GCP', 'Ethnobotany', 'Biostatistics']),
      consentFlags: JSON.stringify({ shareProfileWithInstitutions: true, shareSkillData: true, allowAnonymizedAnalytics: true })
    }
  });

  // Industry Recruiters
  const userRecruiterDabur = await prisma.user.create({
    data: {
      id: 'usr_ind_dabur',
      name: 'Vikramaditya Verma',
      email: 'recruiter@dabur.com',
      phone: '+91-9811223344',
      role: 'INDUSTRY',
      locationCity: 'Ghaziabad',
      locationState: 'Uttar Pradesh',
      institutionId: instDabur.id,
      interests: JSON.stringify(['Pharma QC', 'Dravyaguna', 'HPLC Specialists'])
    }
  });

  const userRecruiterKottakkal = await prisma.user.create({
    data: {
      id: 'usr_ind_kottakkal',
      name: 'Dr. Suresh Warrier',
      email: 'chief_physician@aryavaidyasala.com',
      phone: '+91-9447112233',
      role: 'INDUSTRY',
      locationCity: 'Malappuram',
      locationState: 'Kerala',
      institutionId: instKottakkal.id,
      interests: JSON.stringify(['Panchakarma', 'Authentic Kerala Keraleeya Chikitsa'])
    }
  });

  // Academicians / Faculty
  const userProfSharma = await prisma.user.create({
    data: {
      id: 'usr_acad_sharma',
      name: 'Prof. Dr. Arvind Sharma',
      email: 'arvind.sharma@aiia.ac.in',
      phone: '+91-9810998877',
      role: 'ACADEMICIAN',
      locationCity: 'New Delhi',
      locationState: 'Delhi',
      institutionId: instAIIA.id,
      interests: JSON.stringify(['Panchakarma Department Head', 'CBME Logbook Mentor', 'Curriculum Committee'])
    }
  });

  const userDrRao = await prisma.user.create({
    data: {
      id: 'usr_acad_rao',
      name: 'Dr. Priyadarshini Rao',
      email: 'priyadarshini.rao@aiia.ac.in',
      phone: '+91-9810554433',
      role: 'ACADEMICIAN',
      locationCity: 'New Delhi',
      locationState: 'Delhi',
      institutionId: instAIIA.id,
      interests: JSON.stringify(['Dravyaguna Vigyan', 'Herbal Standardization', 'NAAC Criterion 1 Lead'])
    }
  });

  // Admin / Ministry User
  await prisma.user.create({
    data: {
      id: 'usr_admin_ministry',
      name: 'Shri Rajesh Kotecha (Director General / Admin)',
      email: 'admin.ayushbridge@gov.in',
      phone: '+91-11-24651950',
      role: 'ADMIN',
      locationCity: 'New Delhi',
      locationState: 'Delhi',
      interests: JSON.stringify(['Ayush Grid Governance', 'Accreditation', 'SIH26044 Oversight'])
    }
  });

  // 6. Populate UserSkill Vectors (e.g. for Aarav and Diya)
  console.log('📊 Populating UserSkill Vectors...');
  const aaravSkills = [
    { skillId: 'sk_pk_01', level: 'ADVANCED', evidenceCount: 5 },
    { skillId: 'sk_pk_02', level: 'ADVANCED', evidenceCount: 4 },
    { skillId: 'sk_pk_04', level: 'INTERMEDIATE', evidenceCount: 3 },
    { skillId: 'sk_pk_07', level: 'INTERMEDIATE', evidenceCount: 3 },
    { skillId: 'sk_pk_08', level: 'EXPERT', evidenceCount: 7 },
    { skillId: 'sk_dh_01', level: 'INTERMEDIATE', evidenceCount: 2 },
    { skillId: 'sk_em_01', level: 'ADVANCED', evidenceCount: 4 }
  ];
  for (const s of aaravSkills) {
    await prisma.userSkill.create({
      data: { userId: userAarav.id, skillId: s.skillId, level: s.level, evidenceCount: s.evidenceCount }
    });
  }

  const diyaSkills = [
    { skillId: 'sk_ph_04', level: 'ADVANCED', evidenceCount: 6 },
    { skillId: 'sk_ph_05', level: 'ADVANCED', evidenceCount: 5 },
    { skillId: 'sk_ph_06', level: 'EXPERT', evidenceCount: 8 },
    { skillId: 'sk_ph_07', level: 'INTERMEDIATE', evidenceCount: 3 },
    { skillId: 'sk_ph_08', level: 'INTERMEDIATE', evidenceCount: 2 }
  ];
  for (const s of diyaSkills) {
    await prisma.userSkill.create({
      data: { userId: userDiya.id, skillId: s.skillId, level: s.level, evidenceCount: s.evidenceCount }
    });
  }

  // 7. Seed 20 Opportunities (Internships, Micro-internships, Faculty Training)
  console.log('💼 Seeding 20 Industry Opportunities...');
  const oppsData = [
    {
      id: 'opp_kottakkal_pk_01',
      orgId: instKottakkal.id,
      title: 'Clinical Panchakarma Immersion Fellowship',
      type: 'INTERNSHIP',
      description: 'Hands-on clinical internship in Kerala Keraleeya Panchakarma procedures, Shirodhara temperature monitoring, and patient counseling.',
      requiredSkills: JSON.stringify([
        { skillId: 'sk_pk_01', name: 'Panchakarma Procedures & Purvakarma', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_pk_02', name: 'Shirodhara & Murdhni Taila', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_pk_04', name: 'Basti Karma (Niruha & Anuvasana)', minLevel: 'BASIC' },
        { skillId: 'sk_em_01', name: 'Patient Communication & Empathic History Taking', minLevel: 'INTERMEDIATE' }
      ]),
      stipend: 18000,
      durationWeeks: 12,
      location: 'Malappuram, Kerala',
      remote: false,
      mentorName: 'Dr. Suresh Warrier',
      mentorTitle: 'Senior Clinical Director',
      nsqfLevel: 6,
      verified: true,
      status: 'ACTIVE'
    },
    {
      id: 'opp_dabur_hplc_02',
      orgId: instDabur.id,
      title: 'Herbal Standardization & HPLC Quality Analyst',
      type: 'INTERNSHIP',
      description: 'Run active marker compound chromatography, HPTLC fingerprinting, and API monograph verification on commercial classical formulations.',
      requiredSkills: JSON.stringify([
        { skillId: 'sk_ph_04', name: 'HPLC Standardization & Chromatography', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_ph_05', name: 'HPTLC Fingerprinting for Herbal Formulations', minLevel: 'BASIC' },
        { skillId: 'sk_ph_06', name: 'Ayurvedic Pharmacopoeia of India (API) Testing', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_ph_07', name: 'GMP Documentation & Batch Manufacturing Records (BMR)', minLevel: 'BASIC' }
      ]),
      stipend: 22000,
      durationWeeks: 16,
      location: 'Ghaziabad, NCR',
      remote: false,
      mentorName: 'Dr. Rajesh Bhargava',
      mentorTitle: 'VP - Quality Assurance',
      nsqfLevel: 7,
      verified: true,
      status: 'ACTIVE'
    },
    {
      id: 'opp_ccras_gcp_03',
      orgId: instCCRAS.id,
      title: 'Ayush GCP Clinical Trial Coordinator Trainee',
      type: 'INTERNSHIP',
      description: 'Assist in CCRAS multicentric clinical trials, CTRI portal documentation, informed consent monitoring, and adverse event reporting.',
      requiredSkills: JSON.stringify([
        { skillId: 'sk_re_01', name: 'Ayush Good Clinical Practice (GCP) Guidelines', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_re_03', name: 'CTRI Registration & Clinical Trial Management', minLevel: 'BASIC' },
        { skillId: 'sk_re_05', name: 'Ayush Biostatistics & SPSS/R Modeling', minLevel: 'BASIC' }
      ]),
      stipend: 25000,
      durationWeeks: 24,
      location: 'New Delhi',
      remote: false,
      mentorName: 'Dr. N. Srikanth',
      mentorTitle: 'Deputy Director General (CCRAS)',
      nsqfLevel: 7,
      verified: true,
      status: 'ACTIVE'
    },
    {
      id: 'opp_aiia_emr_micro_04',
      orgId: instAIIA.id,
      title: 'Ayush Grid & NAMASTE Portal Terminology Coding',
      type: 'MICRO_INTERNSHIP',
      description: 'Rapid 3-week project to tag 500 clinical cases with NAMASTE terminology, ABHA ID linkage, and ICD-11 TM2 traditional medicine codes.',
      requiredSkills: JSON.stringify([
        { skillId: 'sk_dh_01', name: 'Ayush Grid Architecture & EMR Data Entry', minLevel: 'BASIC' },
        { skillId: 'sk_dh_02', name: 'NAMASTE Portal Terminology & Coding', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_dh_03', name: 'ABHA ID Integration & Consent Protocols', minLevel: 'BASIC' }
      ]),
      stipend: 7500,
      durationWeeks: 3,
      location: 'Remote',
      remote: true,
      mentorName: 'Prof. Arvind Sharma',
      mentorTitle: 'Chief Digital Health Officer',
      nsqfLevel: 4,
      verified: true,
      status: 'ACTIVE'
    },
    {
      id: 'opp_patanjali_wellness_05',
      orgId: instPatanjali.id,
      title: 'Integrative Wellness Protocol Designer',
      type: 'INTERNSHIP',
      description: 'Create customized Dinacharya, Ritucharya, and Shatkarma therapeutic protocols for corporate wellness and chronic lifestyle disorder patients.',
      requiredSkills: JSON.stringify([
        { skillId: 'sk_we_01', name: 'Ayurvedic Dietetics & Pathya-Apathya Design', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_we_02', name: 'Dinacharya & Ritucharya Lifestyle Programming', minLevel: 'BASIC' },
        { skillId: 'sk_we_03', name: 'Therapeutic Yoga & Shatkarma Cleansing', minLevel: 'INTERMEDIATE' }
      ]),
      stipend: 15000,
      durationWeeks: 8,
      location: 'Haridwar, Uttarakhand',
      remote: false,
      mentorName: 'Dr. Anurag Varshney',
      mentorTitle: 'Head - Biomedical Research',
      nsqfLevel: 5,
      verified: true,
      status: 'ACTIVE'
    },
    {
      id: 'opp_dabur_micro_gmp_06',
      orgId: instDabur.id,
      title: 'Batch Manufacturing Record (BMR) Digital Audit',
      type: 'MICRO_INTERNSHIP',
      description: 'Analyze digital production logs for Schedule T GMP compliance, line clearance protocols, and deviation tracking.',
      requiredSkills: JSON.stringify([
        { skillId: 'sk_ph_07', name: 'GMP Documentation & Batch Manufacturing Records (BMR)', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_em_02', name: 'NABH Ayush Hospital Quality & Safety Standards', minLevel: 'BASIC' }
      ]),
      stipend: 8000,
      durationWeeks: 4,
      location: 'Remote / Hybrid',
      remote: true,
      mentorName: 'Vikramaditya Verma',
      mentorTitle: 'QA Lead',
      nsqfLevel: 5,
      verified: true,
      status: 'ACTIVE'
    },
    {
      id: 'opp_aiia_fac_training_07',
      orgId: instAIIA.id,
      title: 'Advanced Faculty Industrial Immersion: High-Throughput Chromatography in Ayush',
      type: 'FACULTY_TRAINING',
      description: 'Intensive 2-week continuous professional development training for Ayush academicians on LC-MS/MS, HPTLC, and industry-standard pharmacopoeial analytics.',
      requiredSkills: JSON.stringify([
        { skillId: 'sk_ph_04', name: 'HPLC Standardization & Chromatography', minLevel: 'ADVANCED' },
        { skillId: 'sk_ph_06', name: 'Ayurvedic Pharmacopoeia of India (API) Testing', minLevel: 'ADVANCED' }
      ]),
      stipend: 0,
      durationWeeks: 2,
      location: 'New Delhi',
      remote: false,
      mentorName: 'Prof. Dr. Tanuja Nesari',
      mentorTitle: 'Director - AIIA',
      nsqfLevel: 8,
      verified: true,
      status: 'ACTIVE'
    },
    {
      id: 'opp_kottakkal_micro_marma_08',
      orgId: instKottakkal.id,
      title: 'Clinical Marma Point Documentation & Neuromuscular Mapping',
      type: 'MICRO_INTERNSHIP',
      description: 'Clinical documentation of 107 Marma stimulation protocols in post-stroke rehabilitation cases under senior Vaidyas.',
      requiredSkills: JSON.stringify([
        { skillId: 'sk_pk_09', name: 'Marma Chikitsa & Stimulation', minLevel: 'INTERMEDIATE' },
        { skillId: 'sk_pk_01', name: 'Panchakarma Procedures & Purvakarma', minLevel: 'BASIC' }
      ]),
      stipend: 10000,
      durationWeeks: 4,
      location: 'Malappuram, Kerala',
      remote: false,
      mentorName: 'Dr. Suresh Warrier',
      mentorTitle: 'Senior Vaidya',
      nsqfLevel: 6,
      verified: true,
      status: 'ACTIVE'
    }
  ];

  for (const opp of oppsData) {
    await prisma.opportunity.create({ data: opp });
  }

  // 8. Seed Sample Applications
  console.log('📝 Seeding Sample Applications...');
  await prisma.application.create({
    data: {
      opportunityId: 'opp_kottakkal_pk_01',
      userId: userAarav.id,
      status: 'SHORTLISTED',
      matchScore: 0.94,
      resumeUrl: 'https://storage.ayushbridge.gov.in/resumes/aarav_sharma_cv.pdf',
      coverLetter: 'I have logged 18 Panchakarma cases and completed BAMS Year 4 at AIIA with strong clinical interest in Keraleeya Shirodhara.',
      feedback: 'Excellent DOAP e-logbook verification and solid Nadi Pariksha foundation. Interview scheduled for next Monday.'
    }
  });

  await prisma.application.create({
    data: {
      opportunityId: 'opp_dabur_hplc_02',
      userId: userDiya.id,
      status: 'OFFER',
      matchScore: 0.96,
      resumeUrl: 'https://storage.ayushbridge.gov.in/resumes/diya_patel_cv.pdf',
      coverLetter: 'Specialized in HPLC calibration and API monograph verification with 6 logged lab evidence records.',
      feedback: 'Outstanding HPLC lab metrics. Offer letter released with joining date in July.'
    }
  });

  // 9. Seed 10 Logbook Entries (DOAP framework)
  console.log('📖 Seeding 10 CBME/DOAP e-Logbook Entries...');
  const logEntries = [
    {
      userId: userAarav.id,
      competencyCode: 'AY-PK-01',
      competencyName: 'Shirodhara Medicated Oil Temperature Calibration & Flow Rate Setup',
      domain: 'CLINICAL',
      level: 'PE', // Perform
      count: 6,
      notes: 'Maintained steady 38-40°C temperature with Ksheerabala Taila over 45 min duration. Monitored heart rate and relaxation score.',
      attachments: JSON.stringify(['https://storage.ayushbridge.gov.in/logbook/shirodhara_flow_curve.jpg']),
      mentorId: userProfSharma.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 2),
      noPatientIdentifiableInfo: true
    },
    {
      userId: userAarav.id,
      competencyCode: 'AY-PK-02',
      competencyName: 'Niruha Basti Drug Emulsification & Administration Assistance',
      domain: 'CLINICAL',
      level: 'AP', // Assist
      count: 4,
      notes: 'Prepared Makshika, Lavana, Sneha, Kalka, and Kwatha in sequence. Observed retention time of 18 minutes.',
      attachments: JSON.stringify([]),
      mentorId: userProfSharma.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 3),
      noPatientIdentifiableInfo: true
    },
    {
      userId: userAarav.id,
      competencyCode: 'AY-PK-03',
      competencyName: 'Nadi Pariksha Radial Pulse Gati & Vegam Assessment',
      domain: 'CLINICAL',
      level: 'PE', // Perform
      count: 12,
      notes: 'Identified Sarpa-Manduka Gati in Pitta-dominant migraine patients during morning pre-prandial hours.',
      attachments: JSON.stringify([]),
      mentorId: userProfSharma.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 1),
      noPatientIdentifiableInfo: true
    },
    {
      userId: userAarav.id,
      competencyCode: 'AY-PK-04',
      competencyName: 'Jalaukavacharana (Leech Application) in Dushta Vrana',
      domain: 'CLINICAL',
      level: 'OA', // Observe
      count: 2,
      notes: 'Observed Shodhita Jalauka application on varicose ulcer margins and turmeric dusting post-detachment.',
      attachments: JSON.stringify([]),
      mentorId: userProfSharma.id,
      approved: false, // Pending mentor review
      noPatientIdentifiableInfo: true
    },
    {
      userId: userDiya.id,
      competencyCode: 'AY-PH-01',
      competencyName: 'HPLC Quantification of Withaferin-A in Ashwagandha Extracts',
      domain: 'PHARMA',
      level: 'PE', // Perform
      count: 5,
      notes: 'C18 column, acetonitrile-water gradient, peak symmetry 1.05, retention time 12.4 min compliant with API limits.',
      attachments: JSON.stringify(['https://storage.ayushbridge.gov.in/logbook/chromatogram_04.pdf']),
      mentorId: userDrRao.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 5),
      noPatientIdentifiableInfo: true
    },
    {
      userId: userDiya.id,
      competencyCode: 'AY-PH-02',
      competencyName: 'HPTLC Fingerprinting of Triphala Churna Markers',
      domain: 'PHARMA',
      level: 'PE', // Perform
      count: 8,
      notes: 'Resolved Gallic acid, Ellagic acid, and Chebulinic acid under UV 254nm and 366nm.',
      attachments: JSON.stringify([]),
      mentorId: userDrRao.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 4),
      noPatientIdentifiableInfo: true
    },
    {
      userId: userRohan.id,
      competencyCode: 'AY-BH-01',
      competencyName: 'Kent Repertory Mental State Rubric Synthesis',
      domain: 'CLINICAL',
      level: 'PE', // Perform
      count: 10,
      notes: 'Repertorized chronic anxiety case using Kent generalities and keynote Materia Medica confirmation.',
      attachments: JSON.stringify([]),
      mentorId: userProfSharma.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 7),
      noPatientIdentifiableInfo: true
    },
    {
      userId: userKavita.id,
      competencyCode: 'AY-SI-01',
      competencyName: 'Kaalam Varmam Pressure Application for Cervical Spondylosis',
      domain: 'CLINICAL',
      level: 'PE', // Perform
      count: 7,
      notes: 'Applied thumb pressure at Kaala Varmam and Thummi Varmam points with sesame oil pre-lubrication.',
      attachments: JSON.stringify([]),
      mentorId: userProfSharma.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 6),
      noPatientIdentifiableInfo: true
    },
    {
      userId: userTariq.id,
      competencyCode: 'AY-UN-01',
      competencyName: 'Hijama Bila Shart (Dry Cupping) for Lumbago',
      domain: 'CLINICAL',
      level: 'PE', // Perform
      count: 5,
      notes: 'Applied 4 suction cups along bladder meridian for 15 minutes, relieving muscular spasm.',
      attachments: JSON.stringify([]),
      mentorId: userProfSharma.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 8),
      noPatientIdentifiableInfo: true
    },
    {
      userId: userMeera.id,
      competencyCode: 'AY-RE-01',
      competencyName: 'Clinical Trial Subject Informed Consent & Ayush GCP Verification',
      domain: 'RESEARCH',
      level: 'PE', // Perform
      count: 15,
      notes: 'Administered bilingual audio-visual informed consent in type-2 diabetes trial adhering to ICMR/Ayush GCP.',
      attachments: JSON.stringify([]),
      mentorId: userProfSharma.id,
      approved: true,
      approvedAt: new Date(Date.now() - 86400000 * 2),
      noPatientIdentifiableInfo: true
    }
  ];

  for (const le of logEntries) {
    await prisma.logbookEntry.create({ data: le });
  }

  // 10. Seed 3 Verifiable Credentials with Valid HMAC-SHA256 Signatures
  console.log('📜 Seeding 3 Cryptographically Signed Verifiable Credentials...');
  const credsData = [
    {
      id: 'cred_pk_milestone_001',
      userId: userAarav.id,
      type: 'LOGBOOK_MILESTONE',
      qrToken: 'vc_tok_ayush_2026_001',
      issuedAt: new Date(Date.now() - 86400000 * 5),
      metadataJson: JSON.stringify({
        '@context': ['https://www.w3.org/2018/credentials/v1', 'https://ayushgrid.gov.in/contexts/credentials/v1'],
        id: 'urn:uuid:ayush-cred-001',
        type: ['VerifiableCredential', 'AyushCompetencyMilestoneCredential'],
        issuer: {
          id: 'did:ayush:grid:aiia:delhi',
          name: 'All India Institute of Ayurveda (AIIA)',
          ayushGridId: 'AG-INST-DELHI-001'
        },
        issuanceDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        credentialSubject: {
          id: 'did:abha:91-4521-8890-1234',
          name: 'Aarav Sharma',
          role: 'STUDENT',
          stream: 'BAMS',
          competencyTitle: 'Panchakarma Clinical Mastery Milestone (Level PE)',
          verifiedProcedures: 18,
          mentorName: 'Prof. Dr. Arvind Sharma',
          accreditationBody: 'Ministry of Ayush / AIIA'
        }
      })
    },
    {
      id: 'cred_hplc_micro_002',
      userId: userDiya.id,
      type: 'MICRO_CREDENTIAL',
      qrToken: 'vc_tok_ayush_2026_002',
      issuedAt: new Date(Date.now() - 86400000 * 3),
      metadataJson: JSON.stringify({
        '@context': ['https://www.w3.org/2018/credentials/v1', 'https://ayushgrid.gov.in/contexts/credentials/v1'],
        id: 'urn:uuid:ayush-cred-002',
        type: ['VerifiableCredential', 'AyushMicroCredential'],
        issuer: {
          id: 'did:ayush:grid:dabur:qa',
          name: 'Dabur India R&D & Quality Control Division',
          ayushGridId: 'AG-IND-GZB-002'
        },
        issuanceDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        credentialSubject: {
          id: 'did:abha:91-4521-8890-5678',
          name: 'Diya Patel',
          role: 'STUDENT',
          stream: 'PHARMA',
          competencyTitle: 'HPLC & HPTLC Standardization of Herbal ASU Drugs',
          nsqfLevel: 7,
          scoreAchieved: '96%'
        }
      })
    },
    {
      id: 'cred_emr_internship_003',
      userId: userAarav.id,
      type: 'INTERNSHIP_COMPLETION',
      qrToken: 'vc_tok_ayush_2026_003',
      issuedAt: new Date(Date.now() - 86400000 * 1),
      metadataJson: JSON.stringify({
        '@context': ['https://www.w3.org/2018/credentials/v1', 'https://ayushgrid.gov.in/contexts/credentials/v1'],
        id: 'urn:uuid:ayush-cred-003',
        type: ['VerifiableCredential', 'AyushInternshipCompletionCredential'],
        issuer: {
          id: 'did:ayush:grid:aiia:delhi',
          name: 'All India Institute of Ayurveda (AIIA)',
          ayushGridId: 'AG-INST-DELHI-001'
        },
        issuanceDate: new Date(Date.now() - 86400000 * 1).toISOString(),
        credentialSubject: {
          id: 'did:abha:91-4521-8890-1234',
          name: 'Aarav Sharma',
          role: 'STUDENT',
          stream: 'BAMS',
          competencyTitle: 'Ayush Grid & NAMASTE EMR Standardized Coding Micro-Internship',
          durationWeeks: 3,
          mentorName: 'Prof. Arvind Sharma'
        }
      })
    }
  ];

  for (const c of credsData) {
    const metaObj = JSON.parse(c.metadataJson);
    const vcHash = computeVcHash(metaObj);
    await prisma.credential.create({
      data: {
        id: c.id,
        userId: c.userId,
        type: c.type,
        qrToken: c.qrToken,
        metadataJson: c.metadataJson,
        vcHash: vcHash,
        issuedAt: c.issuedAt
      }
    });
  }

  // 11. Seed Audit Logs
  console.log('🛡️ Seeding Audit Trail...');
  await prisma.auditLog.create({
    data: {
      actorUserId: 'usr_admin_ministry',
      action: 'VERIFY_ORG',
      entityType: 'Institution',
      entityId: instAIIA.id,
      metadata: JSON.stringify({ verified: true, ayushGridId: 'AG-INST-DELHI-001' })
    }
  });

  console.log('✅ AyushSkillBridge database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
