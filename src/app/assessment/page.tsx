'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  Award,
  ArrowRight,
  TrendingUp,
  Layers,
  Activity,
  AlertCircle
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '@/lib/bhashini';

interface Question {
  id: string;
  skillId: string;
  skillName: string;
  domain: string;
  question: string;
  options: Array<{ level: string; label: string; desc: string }>;
}

const ASSESSMENT_QUESTIONS: Question[] = [
  // CLINICAL
  {
    id: 'q1',
    skillId: 'sk_pk_01',
    skillName: 'Panchakarma Procedures & Purvakarma',
    domain: 'CLINICAL',
    question: 'How experienced are you in calculating Snehapana dosage and monitoring Samyak Snigdha Lakshana?',
    options: [
      { level: 'NONE', label: 'No Exposure', desc: 'Theoretical only' },
      { level: 'BASIC', label: 'Basic (Observed)', desc: 'Observed clinical faculty perform it' },
      { level: 'INTERMEDIATE', label: 'Intermediate (Assisted)', desc: 'Assisted in preparation and monitoring' },
      { level: 'ADVANCED', label: 'Advanced (Supervised)', desc: 'Managed cases under preceptor supervision' },
      { level: 'EXPERT', label: 'Expert (Mastery)', desc: 'Can independently formulate and monitor' }
    ]
  },
  {
    id: 'q2',
    skillId: 'sk_pk_02',
    skillName: 'Shirodhara & Murdhni Taila',
    domain: 'CLINICAL',
    question: 'Can you calibrate Shirodhara oil temperature (38-40°C) and control steady oscillating flow rate?',
    options: [
      { level: 'NONE', label: 'No Exposure', desc: 'Have not set up Shirodhara apparatus' },
      { level: 'BASIC', label: 'Basic (Observed)', desc: 'Seen demonstrations in hospital OPD' },
      { level: 'INTERMEDIATE', label: 'Intermediate (Assisted)', desc: 'Set up dhara pot, prepared oil' },
      { level: 'ADVANCED', label: 'Advanced (Supervised)', desc: 'Conducted full 45-min Shirodhara protocol' },
      { level: 'EXPERT', label: 'Expert (Mastery)', desc: 'Handled post-dhara complications and standardization' }
    ]
  },
  {
    id: 'q3',
    skillId: 'sk_pk_07',
    skillName: 'Nadi Pariksha (Pulse Diagnosis)',
    domain: 'CLINICAL',
    question: 'How proficient are you in identifying Sarpa, Manduka, and Hamsa Gati on the radial artery?',
    options: [
      { level: 'NONE', label: 'No Exposure', desc: 'Cannot distinguish subtle pulse gati' },
      { level: 'BASIC', label: 'Basic (Observed)', desc: 'Familiar with 3 finger positions' },
      { level: 'INTERMEDIATE', label: 'Intermediate (Assisted)', desc: 'Can reliably detect dominant dosha gati' },
      { level: 'ADVANCED', label: 'Advanced (Supervised)', desc: 'Correlates pulse with Manas and sub-doshas' },
      { level: 'EXPERT', label: 'Expert (Mastery)', desc: 'High diagnostic repeatability in clinical trials' }
    ]
  },
  {
    id: 'q4',
    skillId: 'sk_pk_08',
    skillName: 'Prakriti & Vikriti Evaluation',
    domain: 'CLINICAL',
    question: 'How do you determine a patient’s Sharirika and Manasika Prakriti using standardized questionnaires?',
    options: [
      { level: 'NONE', label: 'No Exposure', desc: 'Basic textbook knowledge' },
      { level: 'BASIC', label: 'Basic (Observed)', desc: 'Administered paper checklists' },
      { level: 'INTERMEDIATE', label: 'Intermediate (Assisted)', desc: 'Evaluated Tridosha traits in OPD patients' },
      { level: 'ADVANCED', label: 'Advanced (Supervised)', desc: 'Accurately differentiates Prakriti vs current Vikriti' },
      { level: 'EXPERT', label: 'Expert (Mastery)', desc: 'Validated bio-typing in research cohorts' }
    ]
  },
  {
    id: 'q5',
    skillId: 'sk_pk_04',
    skillName: 'Basti Karma (Niruha & Anuvasana)',
    domain: 'CLINICAL',
    question: 'What is your competence in emulsifying Niruha Basti (Makshika, Lavana, Sneha, Kalka, Kwatha)?',
    options: [
      { level: 'NONE', label: 'No Exposure', desc: 'Never prepared Basti dravya' },
      { level: 'BASIC', label: 'Basic (Observed)', desc: 'Observed Panchakarma staff mixing order' },
      { level: 'INTERMEDIATE', label: 'Intermediate (Assisted)', desc: 'Mixed ingredients and checked homogenous emulsion' },
      { level: 'ADVANCED', label: 'Advanced (Supervised)', desc: 'Administered Basti and monitored retention times' },
      { level: 'EXPERT', label: 'Expert (Mastery)', desc: 'Designed custom Yoga Basti schedules' }
    ]
  },
  // PHARMA & QUALITY CONTROL
  {
    id: 'q6',
    skillId: 'sk_ph_01',
    skillName: 'HPLC & Analytical Phytochemistry',
    domain: 'PHARMA',
    question: 'How familiar are you with HPLC mobile phase degassing, C18 column equilibration, and peak integration?',
    options: [
      { level: 'NONE', label: 'No Exposure', desc: 'Never used an HPLC system' },
      { level: 'BASIC', label: 'Basic (Observed)', desc: 'Seen demonstrations in college lab' },
      { level: 'INTERMEDIATE', label: 'Intermediate (Assisted)', desc: 'Prepared standards and injected samples' },
      { level: 'ADVANCED', label: 'Advanced (Supervised)', desc: 'Calibrated curves and quantified marker peaks' },
      { level: 'EXPERT', label: 'Expert (Mastery)', desc: 'Method development & validation under cGMP' }
    ]
  },
  {
    id: 'q7',
    skillId: 'sk_ph_02',
    skillName: 'HPTLC Fingerprinting & Standardization',
    domain: 'PHARMA',
    question: 'Can you develop silica plates using CAMAG chambers and scan Rf values at 254nm and 366nm?',
    options: [
      { level: 'NONE', label: 'No Exposure', desc: 'TLC theory only' },
      { level: 'BASIC', label: 'Basic (Observed)', desc: 'Observed manual TLC spotting' },
      { level: 'INTERMEDIATE', label: 'Intermediate (Assisted)', desc: 'Prepared tank saturation and spotted bands' },
      { level: 'ADVANCED', label: 'Advanced (Supervised)', desc: 'Densitometric scanning and Rf comparative analysis' },
      { level: 'EXPERT', label: 'Expert (Mastery)', desc: 'Standardized polyherbal ASU pharmacopoeia monographs' }
    ]
  },
  // DIGITAL HEALTH & RESEARCH
  {
    id: 'q8',
    skillId: 'sk_dh_01',
    skillName: 'Ayush Grid & NAMASTE Portal Morbidity Coding',
    domain: 'DIGITAL_HEALTH',
    question: 'Are you trained in entering clinical diagnoses using National Ayush Morbidity Codes (NAMASTE)?',
    options: [
      { level: 'NONE', label: 'No Exposure', desc: 'Never used Ayush EMR' },
      { level: 'BASIC', label: 'Basic (Observed)', desc: 'Heard of Ayush Grid / ABDM integration' },
      { level: 'INTERMEDIATE', label: 'Intermediate (Assisted)', desc: 'Logged OPD cases under faculty supervision' },
      { level: 'ADVANCED', label: 'Advanced (Supervised)', desc: 'Maps classical terms to dual ICD-11 / NAMASTE' },
      { level: 'EXPERT', label: 'Expert (Mastery)', desc: 'Hospital Ayush EMR coordinator and auditor' }
    ]
  }
];

export default function AssessmentPage() {
  const router = useRouter();
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [answers, setAnswers] = useState<Record<string, string>>({
    sk_pk_01: 'ADVANCED',
    sk_pk_02: 'ADVANCED',
    sk_pk_07: 'INTERMEDIATE',
    sk_pk_08: 'ADVANCED',
    sk_pk_04: 'ADVANCED',
    sk_ph_01: 'INTERMEDIATE',
    sk_ph_02: 'INTERMEDIATE',
    sk_dh_01: 'ADVANCED'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const updateLang = () => {
      const savedLang = (localStorage.getItem('ayush_lang') as SupportedLanguage) || 'en';
      setLang(savedLang);
    };
    updateLang();
    window.addEventListener('languageChange', updateLang);
    return () => window.removeEventListener('languageChange', updateLang);
  }, []);

  const t = (key: string) => getTranslation(lang, key);

  const handleSelectOption = (skillId: string, level: string) => {
    setAnswers((prev) => ({ ...prev, [skillId]: level }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const answersPayload = Object.entries(answers).map(([skillId, level]) => ({
        skillId,
        level
      }));

      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr_student_aarav',
          answers: answersPayload
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to evaluate assessment');

      setResult(data);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
          <BrainCircuit className="w-4 h-4 text-emerald-400" />
          <span>CBME Outcome-Based Framework • AI Evaluation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">{t('assessment_title')}</h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {t('assessment_subtitle')} Your verified responses configure your Skill Passport vector and unlock matched internship opportunities.
        </p>
      </div>

      {/* When Results are Generated */}
      {result ? (
        <div className="space-y-6">
          <div className="watermelon-card p-6 border-2 border-emerald-400/50 shadow-2xl space-y-2">
            <div className="flex items-center space-x-2.5 text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <h2 className="text-lg font-bold font-display">Skill Assessment Successfully Computed!</h2>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Updated <span className="font-bold text-amber-300">{result.userSkillsCount} skill vectors</span> in your profile. Below are your top 3 recommended industry and hospital roles based on weighted ontology readiness scores.
            </p>
          </div>

          <h3 className="text-base font-bold text-white flex items-center space-x-2 font-display">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Top Recommended Roles & Readiness Scores</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {result.topRecommendedRoles?.map((rec: any, idx: number) => (
              <div key={rec.roleId} className="watermelon-card p-5 border border-white/10 shadow-lg space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                      Rank #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-zinc-400">{rec.domain}</span>
                  </div>

                  <h4 className="font-bold text-white text-base mt-2 font-display">{rec.title}</h4>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Readiness Score:</span>
                      <span className="font-bold text-emerald-400 font-display">{rec.readinessPercent}%</span>
                    </div>
                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                        style={{ width: `${rec.readinessPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <Link
                    href={`/gap-analysis?roleId=${rec.roleId}`}
                    className="threeui-tactile-btn w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md border border-emerald-400/30"
                  >
                    <span>View Gap Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <Link
              href="/opportunities"
              className="threeui-tactile-btn px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2"
            >
              <span>Browse Matched Internships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setResult(null)}
              className="px-5 py-2.5 border border-white/15 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-white/5"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      ) : (
        /* The Questionnaire Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {ASSESSMENT_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="watermelon-card p-6 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Question {idx + 1} of {ASSESSMENT_QUESTIONS.length} • {q.domain}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10 font-medium">
                  {q.skillName}
                </span>
              </div>

              <p className="text-sm sm:text-base font-bold text-white">{q.question}</p>

              {/* 5 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
                {q.options.map((opt) => {
                  const isSelected = answers[q.skillId] === opt.level;
                  return (
                    <button
                      type="button"
                      key={opt.level}
                      onClick={() => handleSelectOption(q.skillId, opt.level)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/80 ring-2 ring-emerald-500/40 text-white shadow-md scale-[1.02]'
                          : 'border-white/10 bg-black/40 text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[11px] font-bold ${
                              isSelected ? 'text-emerald-300' : 'text-white'
                            }`}
                          >
                            {opt.label}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-emerald-400 bg-emerald-500'
                                : 'border-white/20'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1.5 leading-tight">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Submit button */}
          <div className="sticky bottom-4 z-20 watermelon-card p-4 border border-emerald-500/40 shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">
                Answered {Object.keys(answers).length} of {ASSESSMENT_QUESTIONS.length} Questions
              </p>
              <p className="text-[11px] text-zinc-400">Ready to compute your Ayush role readiness index</p>
            </div>
            <button
              type="submit"
              id="btn-submit-assessment"
              disabled={isSubmitting}
              className="threeui-tactile-btn px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <span>Analyzing vectors...</span>
              ) : (
                <>
                  <span>{t('btn_submit_assessment')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
