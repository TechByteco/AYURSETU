export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'INDUSTRY' | 'ACADEMICIAN' | 'ADMIN';
  stream?: string;
  year?: number;
  abhaId?: string;
  institutionId?: string;
  locationCity?: string;
  locationState?: string;
}

export const DEMO_PERSONAS: Record<string, AuthUser> = {
  aarav: {
    id: 'usr_student_aarav',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@aiia.student.gov.in',
    role: 'STUDENT',
    stream: 'BAMS',
    year: 4,
    abhaId: '91-4521-8890-1234',
    institutionId: 'inst_aiia_001',
    locationCity: 'New Delhi',
    locationState: 'Delhi'
  },
  diya: {
    id: 'usr_student_diya',
    name: 'Diya Patel',
    email: 'diya.patel@pharma.ayush.edu',
    role: 'STUDENT',
    stream: 'PHARMA',
    year: 3,
    abhaId: '91-4521-8890-5678',
    locationCity: 'Ahmedabad',
    locationState: 'Gujarat'
  },
  recruiter_dabur: {
    id: 'usr_ind_dabur',
    name: 'Vikramaditya Verma (Dabur QA)',
    email: 'recruiter@dabur.com',
    role: 'INDUSTRY',
    institutionId: 'inst_dabur_002',
    locationCity: 'Ghaziabad',
    locationState: 'Uttar Pradesh'
  },
  recruiter_kottakkal: {
    id: 'usr_ind_kottakkal',
    name: 'Dr. Suresh Warrier (Arya Vaidya Sala)',
    email: 'chief_physician@aryavaidyasala.com',
    role: 'INDUSTRY',
    institutionId: 'inst_kottakkal_003',
    locationCity: 'Malappuram',
    locationState: 'Kerala'
  },
  prof_sharma: {
    id: 'usr_acad_sharma',
    name: 'Prof. Dr. Arvind Sharma',
    email: 'arvind.sharma@aiia.ac.in',
    role: 'ACADEMICIAN',
    institutionId: 'inst_aiia_001',
    locationCity: 'New Delhi',
    locationState: 'Delhi'
  },
  admin: {
    id: 'usr_admin_ministry',
    name: 'Shri Rajesh Kotecha (Director General / Admin)',
    email: 'admin.ayushbridge@gov.in',
    role: 'ADMIN',
    locationCity: 'New Delhi',
    locationState: 'Delhi'
  }
};

export function getDefaultUser(): AuthUser {
  return DEMO_PERSONAS.aarav;
}

export function verifyMockAbha(abhaId: string): { valid: boolean; mockName?: string; mobileLast4?: string } {
  const cleanId = abhaId.replace(/[^0-9]/g, '');
  if (cleanId.length === 14 || abhaId.includes('-')) {
    return {
      valid: true,
      mockName: 'Ayush Verified Candidate',
      mobileLast4: '3210'
    };
  }
  return { valid: false };
}
