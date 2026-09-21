'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Award,
  Search,
  ArrowRight,
  GraduationCap,
  Building2,
  Users,
  CheckCircle2,
  Stethoscope,
  FileCheck2,
  Sparkles,
  Scale,
  BrainCircuit,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Trophy
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '@/lib/bhashini';
import AllIndiaAyushMatrix from '@/components/gov/AllIndiaAyushMatrix';

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [verifySearchId, setVerifySearchId] = useState('');
  const [activeStreamTab, setActiveStreamTab] = useState<'ayurveda' | 'yoga' | 'unani' | 'siddha' | 'homeopathy'>('ayurveda');

  useEffect(() => {
    const savedLang = localStorage.getItem('ayush_lang') as SupportedLanguage;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'ta')) {
      setLang(savedLang);
    }
    const onLangChange = () => {
      const l = localStorage.getItem('ayush_lang') as SupportedLanguage;
      if (l) setLang(l);
    };
    window.addEventListener('languageChange', onLangChange);
    return () => window.removeEventListener('languageChange', onLangChange);
  }, []);

  const t = (key: string) => getTranslation(lang, key);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = verifySearchId.trim() || 'AYUR-2026-AIIA-0042';
    router.push(`/verify?id=${encodeURIComponent(id)}`);
  };

  const ayushStreams = {
    ayurveda: {
      name: 'Ayurveda (आयुर्वेद)',
      sanskrit: 'आयुषो वेदः आयुर्वेदः',
      focus: 'Tridosha Balance, Panchakarma, Dravyaguna, Rasashastra',
      roles: ['Panchakarma Clinical Specialist', 'ASU Drug Quality Analyst', 'Ayurvedic Medical Officer'],
      stats: '320+ Accredited Colleges • 65,000+ Annual Graduates',
      color: 'border-emerald-500 bg-emerald-950/20'
    },
    yoga: {
      name: 'Yoga & Naturopathy (योग व प्राकृतिक चिकित्सा)',
      sanskrit: 'योगश्चित्तवृत्तिनिरोधः',
      focus: 'Therapeutic Asana, Pranayama, Hydrotherapy, Dietetics',
      roles: ['Clinical Yoga Therapist', 'Wellness Medical Officer', 'Mind-Body Rehabilitation Lead'],
      stats: '85+ Accredited Institutes • 14,000+ Certified Practitioners',
      color: 'border-amber-500 bg-amber-950/20'
    },
    unani: {
      name: 'Unani Medicine (طب یونانی)',
      sanskrit: 'Ilm-ul-Advia & Mizaj',
      focus: 'Humoral Pathology (Akhlat), Ilaj-bit-Tadbeer, Regimenal Therapies',
      roles: ['Unani Medical Consultant', 'Regimenal Therapy Specialist', 'Herbal Formulation Chemist'],
      stats: '55+ Government & Private Colleges • 8,500+ Registrations',
      color: 'border-cyan-500 bg-cyan-950/20'
    },
    siddha: {
      name: 'Siddha System (சித்த மருத்துவம்)',
      sanskrit: 'Muppini & Varma Kalai',
      focus: 'Varma Therapy, Thokkanam, Kayakarpam, Mineral Chemistry',
      roles: ['Varma Trauma Specialist', 'Siddha Pharmacognosist', 'Clinical Research Officer'],
      stats: '20+ Specialized Institutions • 4,200+ Active Students',
      color: 'border-teal-500 bg-teal-950/20'
    },
    homeopathy: {
      name: 'Homeopathy (होम्योपैथी)',
      sanskrit: 'Similia Similibus Curentur',
      focus: 'Individualized Repertorization, Materia Medica, High Dilution Pharmacology',
      roles: ['Consultant Homeopath', 'Clinical Repertory Specialist', 'QC Pharmacist'],
      stats: '240+ Accredited Colleges • 36,000+ Annual Licensure Candidates',
      color: 'border-blue-500 bg-blue-950/20'
    }
  };

  return (
    <div className="min-h-screen text-slate-100 relative pb-20">
      
      {/* 1. National Circulars & Official Announcements Ribbon */}
      <div className="bg-[#022c22] border-b border-emerald-800 text-xs py-2 px-4 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
              LATEST CIRCULARS
            </span>
          </div>

          <div className="overflow-hidden whitespace-nowrap flex-1 text-[11px] text-zinc-300">
            <div className="inline-block animate-marquee hover:pause">
              <span className="inline-block mr-12 font-medium">
                📢 <strong>NCISM Guidelines 2026:</strong> Mandatory DOAP Clinical Case Logbook validation active for all CRRI rotating interns across accredited Ayush colleges.
              </span>
              <span className="inline-block mr-12 font-medium">
                🏛️ <strong>Ayush Grid National Verification:</strong> Instant Unique Student ID (AUSID) verification ledger enabled for state medical councils & NAAC inspection.
              </span>
              <span className="inline-block mr-12 font-medium">
                💼 <strong>Placement Exchange:</strong> 1,820+ verified clinical fellowships, hospital residencies, and ASU manufacturing roles accepting applications.
              </span>
            </div>
          </div>

          <div className="shrink-0 hidden md:flex items-center space-x-3 text-[11px] text-emerald-400 font-semibold">
            <Link href="/verify" className="hover:underline flex items-center space-x-1">
              <span>Public Verification Ledger</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Official Government Hero Section */}
      <section className="relative py-12 md:py-20 border-b border-emerald-900/60 bg-gradient-to-b from-[#022018]/90 via-[#032d22]/80 to-[#021c15]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: National Motto & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 shadow-sm text-xs font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Government of India • Problem Statement SIH26044</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] font-display">
                  {lang === 'hi'
                    ? 'राष्ट्रीय आयुष कौशल, क्लिनिकल ई-लॉगबुक व रोजगार सेतु'
                    : 'National Ayush Academia–Industry Skill Bridge & Placement Exchange'}
                </h1>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-normal">
                  {lang === 'hi'
                    ? 'आयुष चिकित्सा शिक्षा, एनसीआईएसएम सीबीएमई क्लिनिकल लॉगबुक, और उद्योग आवश्यकताओं को जोड़ने वाला आधिकारिक राष्ट्रीय डिजिटल मंच।'
                    : 'The Ministry of Ayush official digital platform bridging medical curricula, NCISM CBME clinical e-logbooks, W3C cryptographic credentials, and real-time hospital placements.'}
                </p>
              </div>

              {/* Instant Citizen Verification Search Bar (GIGW Trust Pillar) */}
              <div className="bg-black/50 p-3 sm:p-4 rounded-2xl border border-emerald-500/40 shadow-xl space-y-2">
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                  🔍 Instant Public Verification Ledger (Check Any Ayush Doctor / Student ID)
                </label>
                <form onSubmit={handleVerifySubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={verifySearchId}
                      onChange={(e) => setVerifySearchId(e.target.value)}
                      placeholder="Enter Unique Ayush ID (e.g. AYUR-2026-AIIA-0042)..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 shrink-0"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Verify Authenticity</span>
                  </button>
                </form>
                <p className="text-[10px] text-zinc-400">
                  Backed by W3C Verifiable Credentials & HMAC-SHA256 digital seals to prevent unaccredited practitioner fraud.
                </p>
              </div>

              {/* Primary Gateway CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/ayursetu"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-950/60 border border-emerald-400/30 flex items-center space-x-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student AYURSETU Portal</span>
                </Link>

                <Link
                  href="/opportunities"
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-zinc-100 text-xs sm:text-sm font-bold border border-zinc-700 flex items-center space-x-2 transition-all shadow-md"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Browse Internships & Jobs</span>
                </Link>

                <Link
                  href="/colleges"
                  className="px-4 py-3 rounded-xl bg-black/40 hover:bg-black/60 text-zinc-300 text-xs sm:text-sm font-semibold border border-white/10 flex items-center space-x-1.5 transition-all"
                >
                  <span>Colleges Directory</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Column: Interactive Digital Identification Card Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-emerald-950/90 via-slate-900 to-emerald-950/90 border-2 border-amber-400/40 p-6 shadow-2xl space-y-5 relative overflow-hidden backdrop-blur-xl">
                
                {/* Government Card Top Header */}
                <div className="flex items-center justify-between border-b border-white/15 pb-3.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center">
                      <span className="text-[10px] font-black text-slate-950 font-serif">GoI</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">
                        MINISTRY OF AYUSH
                      </span>
                      <span className="text-xs font-bold text-white font-serif">
                        UNIQUE AYUSH STUDENT ID (AUSID)
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                    AUTHENTICATED
                  </span>
                </div>

                {/* Candidate Information & Holographic Seal */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">Student Name</span>
                    <h3 className="text-base font-extrabold text-white font-display">Aarav Sharma</h3>
                    <p className="text-xs text-emerald-400 font-semibold">BAMS (Ayurvedacharya) • Year 4</p>
                    <p className="text-[11px] text-zinc-300">All India Institute of Ayurveda (AIIA), New Delhi</p>
                  </div>

                  <div className="w-20 h-20 rounded-xl bg-white p-1.5 flex flex-col items-center justify-center text-slate-950 shrink-0 shadow-md">
                    <div className="w-full h-full border border-slate-300 rounded flex flex-col items-center justify-center text-center p-1">
                      <span className="text-[7px] font-bold font-mono">QR VERIFIED</span>
                      <span className="text-[14px]">📱</span>
                      <span className="text-[7px] text-emerald-800 font-bold">HMAC-256</span>
                    </div>
                  </div>
                </div>

                {/* Academic & Clinical Credentials */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                  <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[9px] text-zinc-400 block">Graduation Marks</span>
                    <span className="text-sm font-bold text-amber-300 font-display">84.5%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[9px] text-zinc-400 block">DOAP Clinical</span>
                    <span className="text-sm font-bold text-emerald-400 font-display">48 Cases</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[9px] text-zinc-400 block">ABHA Linked</span>
                    <span className="text-sm font-bold text-cyan-300 font-display">Active</span>
                  </div>
                </div>

                {/* Unique ID String & Action */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-zinc-400 block uppercase font-mono">Unique Identifier</span>
                    <span className="text-xs font-mono font-bold text-amber-300 tracking-wider">
                      AYUR-2026-AIIA-0042
                    </span>
                  </div>
                  <Link
                    href="/verify?id=AYUR-2026-AIIA-0042"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-colors"
                  >
                    Verify Card
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Live National Telemetry Ribbon */}
      <section className="bg-[#0f172a] border-b border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">1,28,450+</span>
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">Registered Ayush Students</p>
              <span className="text-[10px] text-emerald-400 font-mono">Across 28 States & 8 UTs</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">450+</span>
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">Accredited Ayush Colleges</p>
              <span className="text-[10px] text-emerald-400 font-mono">NCISM & NCH Affiliated</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">1,820+</span>
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">Hospital & Industry Openings</p>
              <span className="text-[10px] text-emerald-400 font-mono">NSQF & Schedule T Mapped</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-display">99.8%</span>
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">Tamper-Proof Audit Rate</p>
              <span className="text-[10px] text-emerald-400 font-mono">HMAC-SHA256 Verified</span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Four Stakeholder Gateways (Accessible to Old & Young Alike) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Universal Stakeholder Gateways</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Built for Every Citizen & Ayush Professional
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            From revered senior Vaidyas and Hakims to graduating medical interns and international research labs,
            each participant accesses high-contrast, role-specific public infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Gateway 1: Students & Interns (Youth) */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-black/80 border border-emerald-500/30 p-6 space-y-4 hover:border-emerald-400 transition-all shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">Youth & Graduates</span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">Students & Interns</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Obtain your Unique Ayush ID (AUSID), maintain your NCISM DOAP clinical logbook, view your AI skill-gap radar, and 1-click apply to verified hospital residencies.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/ayursetu"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <span>Launch AYURSETU Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Gateway 2: Senior Vaidyas & Faculty (Elders) */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-black/80 border border-amber-500/30 p-6 space-y-4 hover:border-amber-400 transition-all shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-900/60 border border-amber-500/40 text-amber-300 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">Elders & Preceptors</span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">Vaidyas, Hakims & Faculty</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Streamlined, high-contrast review console to verify student Panchakarma, Shirodhara, and clinical case entries with single-click preceptor sign-off and zero paperwork.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/logbook"
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <span>Review & Sign DOAP Logs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Gateway 3: Hospitals & ASU Industry */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-black/80 border border-cyan-500/30 p-6 space-y-4 hover:border-cyan-400 transition-all shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">Healthcare Recruiters</span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">Hospitals & ASU Pharma</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Post clinical fellowships and industrial QA roles mapped to NSQF levels. Screen candidates filtered by real hands-on procedure counts and Schedule T compliance.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/org/opportunities"
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <span>Industry Recruiter Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Gateway 4: Regulatory Councils & Citizens */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-black/80 border border-blue-500/30 p-6 space-y-4 hover:border-blue-400 transition-all shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-500/40 text-blue-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">Citizens & Regulators</span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">Public Trust & Ledger</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Patients, state licensing councils, and recruiters can instantly verify the authenticity of any Ayush doctor or candidate to prevent unaccredited practitioner fraud.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/verify"
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <span>Public Verification Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Featured National Initiatives: NExT Exam, Preceptor Desk, Pharmacopoeia & Helpline */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Link
            href="/next-exam"
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/70 to-slate-900 border border-amber-500/40 hover:border-amber-400 shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-mono">
                  NCISM Mandate
                </span>
              </div>
              <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors font-display">
                NExT Mock Readiness
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Practice clinical MCQs mapped to NCISM Part 1 blueprint with instant classical Samhita rationale.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center text-xs font-bold text-amber-300 space-x-1 mt-3">
              <span>Launch Mock Test</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/preceptor"
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">
                  Audio-Enabled
                </span>
              </div>
              <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors font-display">
                Senior Preceptor Desk
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Dedicated high-contrast console for senior Vaidyas with Text-to-Speech audio and 1-click DOAP sign-off.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center text-xs font-bold text-emerald-300 space-x-1 mt-3">
              <span>Open Preceptor Console</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/formulary"
            className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/70 to-slate-900 border border-teal-500/40 hover:border-teal-400 shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/40 font-mono">
                  PCIM&H Standards
                </span>
              </div>
              <h3 className="text-base font-black text-white group-hover:text-teal-300 transition-colors font-display">
                Classical Pharmacopoeia
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Search AFI, NFUM, and SFI botanical monographs with classical references and therapeutic indications.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center text-xs font-bold text-teal-300 space-x-1 mt-3">
              <span>Explore Formulations</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/helpline"
            className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/70 to-slate-900 border border-blue-500/40 hover:border-blue-400 shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/40 font-mono">
                  1800-11-22-02
                </span>
              </div>
              <h3 className="text-base font-black text-white group-hover:text-blue-300 transition-colors font-display">
                Sanjivani Helpline & Grievance
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Toll-free voice support, interactive FAQ with speech synthesizer, and 24-hr citizen grievance redressal.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center text-xs font-bold text-blue-300 space-x-1 mt-3">
              <span>Access Helpdesk</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* 5. The 5 Classical Ayush Streams Interactive Explorer */}
      <section className="py-12 bg-black/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                Multidisciplinary Indian Knowledge Systems
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                The 5 Accredited Ayush Disciplines
              </h2>
              <p className="text-xs text-zinc-300">
                Explore standardized competency matrices aligned with the National Ayush Skill Ontology.
              </p>
            </div>

            {/* Stream Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-zinc-700">
              {(Object.keys(ayushStreams) as Array<keyof typeof ayushStreams>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveStreamTab(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    activeStreamTab === key
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stream Showcase Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${ayushStreams[activeStreamTab].color} backdrop-blur-xl space-y-6 shadow-2xl`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-serif text-amber-300 italic">
                  &quot;{ayushStreams[activeStreamTab].sanskrit}&quot;
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
                  {ayushStreams[activeStreamTab].name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                {ayushStreams[activeStreamTab].stats}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  Curriculum Competency Focus
                </span>
                <p className="text-sm font-semibold text-zinc-200">
                  {ayushStreams[activeStreamTab].focus}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  Matched Industry & Hospital Career Roles
                </span>
                <div className="flex flex-wrap gap-2">
                  {ayushStreams[activeStreamTab].roles.map((r, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/colleges"
                className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center space-x-1"
              >
                <span>View Accredited {activeStreamTab.toUpperCase()} Colleges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Real-Time All-India State/UT Clinical Training & Placement Telemetry */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AllIndiaAyushMatrix />
      </section>

      {/* 6. Four Core Innovation Pillars (NCISM, AI Matching, W3C, NAAC) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
            Ministry of Ayush Innovation Matrix
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
            Built on 4 Pillars of Digital Public Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">NCISM DOAP e-Logbook</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Standardized digital case logging across 6 CRRI rotations (Kayachikitsa, Shalya, Shalakya, Prasuti, Kaumarbhritya, Panchakarma) with preceptor digital approvals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">AI Skill Ontology Radar</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Real-time cosine match calculation comparing student clinical mastery against ASU manufacturing and hospital clinical requirements to prescribe actionable micro-courses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">W3C Verifiable Credentials</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Cryptographic HMAC-SHA256 signatures generated for every qualified graduate, creating a tamper-evident digital skill passport portable worldwide.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-display">NAAC / NIRF Evidence Matrix</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Automated institutional reporting for colleges to export verifiable evidence of clinical competencies, preceptor supervision, and placement success.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
