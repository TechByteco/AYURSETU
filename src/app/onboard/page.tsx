'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  UserCheck,
  Lock,
  Building,
  GraduationCap
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '@/lib/bhashini';

export default function OnboardPage() {
  const router = useRouter();
  const [lang, setLang] = useState<SupportedLanguage>('en');

  // Step control: 1 = Basic Info & Stream, 2 = ABHA Identity, 3 = Ayush Grid Consents
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@aiia.student.gov.in',
    phone: '+91-9876543210',
    stream: 'BAMS',
    year: '4',
    locationCity: 'New Delhi',
    locationState: 'Delhi',
    availability: 'Immediate (Full-Time)',
    interests: 'Panchakarma, Clinical Neuro-Ayurveda, Ayush Grid Tech',
    abhaId: '91-4521-8890-1234',
    otp: '123456',
    consentFlags: {
      shareProfileWithInstitutions: true,
      shareSkillData: true,
      allowAnonymizedAnalytics: true,
    }
  });

  const [abhaVerified, setAbhaVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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

  const handleAbhaVerify = () => {
    if (!formData.abhaId || formData.abhaId.length < 10) {
      setErrorMsg('Please enter a valid 14-digit ABHA ID.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
  };

  const handleOtpConfirm = () => {
    if (formData.otp === '123456' || formData.otp.length === 6) {
      setAbhaVerified(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid OTP. Please enter 123456 for mock verification.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const interestsArray = formData.interests
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch('/api/auth/mock-abha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interests: interestsArray,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete onboarding');
      }

      // Switch persona to Aarav
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaKey: 'aarav' }),
      });

      router.push('/assessment');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Ayush Grid & ABDM Consent Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">{t('onboard_title')}</h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto">{t('onboard_subtitle')}</p>
      </div>

      {/* Multi-Step Indicator */}
      <nav aria-label="Onboarding Progress">
        <ol className="flex items-center justify-between relative max-w-lg mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-white/10 -z-10" />

          {/* Step 1 */}
          <li className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                step >= 1
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white ring-4 ring-emerald-500/20'
                  : 'bg-black/50 border border-white/20 text-zinc-500'
              }`}
            >
              1
            </button>
            <span className="text-[11px] font-semibold text-zinc-300 mt-2">Profile & Stream</span>
          </li>

          {/* Step 2 */}
          <li className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                step >= 2
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white ring-4 ring-emerald-500/20'
                  : 'bg-black/50 border border-white/20 text-zinc-500'
              }`}
            >
              2
            </button>
            <span className="text-[11px] font-semibold text-zinc-300 mt-2">ABHA Identity</span>
          </li>

          {/* Step 3 */}
          <li className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                step === 3
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white ring-4 ring-emerald-500/20'
                  : 'bg-black/50 border border-white/20 text-zinc-500'
              }`}
            >
              3
            </button>
            <span className="text-[11px] font-semibold text-zinc-300 mt-2">Privacy Consents</span>
          </li>
        </ol>
      </nav>

      {/* Form Container (Watermelon Glass) */}
      <div className="watermelon-card p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Basic Information & Ayush Stream */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center space-x-2 font-display">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Academic & Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="student-name" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t('label_fullname')} *
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="student-email" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t('label_email')} *
                  </label>
                  <input
                    id="student-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="student-stream" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t('label_stream')} *
                  </label>
                  <select
                    id="student-stream"
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  >
                    <option value="BAMS">BAMS (Ayurveda)</option>
                    <option value="BHMS">BHMS (Homeopathy)</option>
                    <option value="BSMS">BSMS (Siddha)</option>
                    <option value="BUMS">BUMS (Unani)</option>
                    <option value="BYMS">BYMS (Yoga & Naturopathy)</option>
                    <option value="PHARMA">Ayush Pharmacy & QC</option>
                    <option value="RESEARCH">Ayush Research / Bio-Sciences</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="student-year" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t('label_year')} *
                  </label>
                  <select
                    id="student-year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  >
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4 (Final Professional)</option>
                    <option value="5">Intern / Post-Graduate</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="student-phone" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t('label_phone')}
                  </label>
                  <input
                    id="student-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="student-city" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t('label_city')}
                  </label>
                  <input
                    id="student-city"
                    type="text"
                    value={formData.locationCity}
                    onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="student-state" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t('label_state')}
                  </label>
                  <input
                    id="student-state"
                    type="text"
                    value={formData.locationState}
                    onChange={(e) => setFormData({ ...formData, locationState: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="student-interests" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Interests & Specialization Tags (comma separated)
                </label>
                <input
                  id="student-interests"
                  type="text"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  id="btn-step1-next"
                  onClick={() => setStep(2)}
                  className="threeui-tactile-btn px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/40"
                >
                  <span>Next: Verify ABHA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Mock ABHA Verification */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center space-x-2 font-display">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Ayushman Bharat Health Account (ABHA) Linkage</span>
              </h2>

              <p className="text-xs text-zinc-300">
                AyushSkillBridge integrates with ABDM standards to create a tamper-proof professional health identity.
              </p>

              <div>
                <label htmlFor="abha-id" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  {t('label_abha_id')}
                </label>
                <div className="flex gap-2">
                  <input
                    id="abha-id"
                    type="text"
                    placeholder={t('abha_placeholder')}
                    value={formData.abhaId}
                    onChange={(e) => setFormData({ ...formData, abhaId: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl font-mono text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                  <button
                    type="button"
                    id="btn-verify-abha"
                    onClick={handleAbhaVerify}
                    className="threeui-tactile-btn px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md"
                  >
                    {t('abha_verify_btn')}
                  </button>
                </div>
              </div>

              {otpSent && !abhaVerified && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                  <p className="text-xs font-bold text-amber-300">
                    Mock OTP Sent to registered mobile (Demo OTP: <span className="font-mono text-white">123456</span>)
                  </p>
                  <div className="flex gap-2">
                    <input
                      id="otp-input"
                      type="text"
                      maxLength={6}
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      placeholder="Enter 6-digit OTP"
                      className="w-36 px-3 py-2 text-xs bg-black/60 border border-amber-400/40 rounded-xl font-mono text-center tracking-widest text-white outline-none"
                    />
                    <button
                      type="button"
                      id="btn-confirm-otp"
                      onClick={handleOtpConfirm}
                      className="threeui-tactile-btn px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md border border-emerald-400/30"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}

              {abhaVerified && (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center space-x-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>ABHA ID 91-4521-8890-1234 successfully verified with Ayush Grid Authority!</span>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-white/15 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-white/5"
                >
                  Back
                </button>
                <button
                  type="button"
                  id="btn-step2-next"
                  onClick={() => setStep(3)}
                  className="threeui-tactile-btn px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/40"
                >
                  <span>Next: Privacy Consents</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Privacy & Data Sharing Consents */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center space-x-2 font-display">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>{t('consent_section_title')}</span>
              </h2>

              <p className="text-xs text-zinc-300">
                In compliance with the Digital Personal Data Protection (DPDP) Act and Ministry of Ayush Data Sharing Policy, you hold granular control over your profile and skills.
              </p>

              <div className="space-y-3">
                {/* Toggle 1 */}
                <label className="flex items-start space-x-3 p-4 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.consentFlags.shareProfileWithInstitutions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consentFlags: {
                          ...formData.consentFlags,
                          shareProfileWithInstitutions: e.target.checked,
                        },
                      })
                    }
                    className="mt-0.5 h-4 w-4 rounded bg-black/50 border-white/20 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-white">{t('consent_share_profile')}</p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">
                      Allows verified partners (AIIA, Dabur, Arya Vaidya Sala) to view your academic credentials.
                    </p>
                  </div>
                </label>

                {/* Toggle 2 */}
                <label className="flex items-start space-x-3 p-4 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.consentFlags.shareSkillData}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consentFlags: {
                          ...formData.consentFlags,
                          shareSkillData: e.target.checked,
                        },
                      })
                    }
                    className="mt-0.5 h-4 w-4 rounded bg-black/50 border-white/20 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-white">{t('consent_share_skills')}</p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">
                      Enables AI matching of your procedural e-logbook competencies to paid internship postings.
                    </p>
                  </div>
                </label>

                {/* Toggle 3 */}
                <label className="flex items-start space-x-3 p-4 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.consentFlags.allowAnonymizedAnalytics}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consentFlags: {
                          ...formData.consentFlags,
                          allowAnonymizedAnalytics: e.target.checked,
                        },
                      })
                    }
                    className="mt-0.5 h-4 w-4 rounded bg-black/50 border-white/20 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-white">{t('consent_analytics')}</p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">
                      Helps the Ministry identify national shortages in Panchakarma and HPLC capabilities.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-white/15 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-white/5"
                >
                  Back
                </button>
                <button
                  type="submit"
                  id="btn-complete-onboarding"
                  disabled={isSubmitting}
                  className="threeui-tactile-btn px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/40"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>{t('btn_save_continue')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
