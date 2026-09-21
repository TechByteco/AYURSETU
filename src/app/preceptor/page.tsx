'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Stethoscope, 
  Award, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Sparkles,
  ChevronRight,
  AlertCircle,
  Building2,
  Filter
} from 'lucide-react';

interface PendingCaseEntry {
  id: string;
  studentName: string;
  studentAusid: string;
  institution: string;
  rotation: string;
  procedureTitle: string;
  doapStage: 'DEMONSTRATES' | 'OBSERVES' | 'ASSISTS' | 'PERFORMS';
  patientAgeGender: string;
  primaryDiagnosis: string;
  clinicalObservations: string;
  submittedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REQUIRES_REVISION';
  evaluationGrade?: 'PRAVARA' | 'MADHYAMA' | 'AVARA';
}

const INITIAL_PENDING_CASES: PendingCaseEntry[] = [
  {
    id: 'case_entry_01',
    studentName: 'Aarav Sharma',
    studentAusid: 'AYUR-2026-AIIA-0042',
    institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
    rotation: 'Panchakarma Unit 3 (Bio-Cleansing)',
    procedureTitle: 'Virechana Karma Purvakarma & Vegiki Assessment',
    doapStage: 'PERFORMS',
    patientAgeGender: '46 / Male',
    primaryDiagnosis: 'Kaphaja Kushtha (Chronic Plaque Psoriasis)',
    clinicalObservations: 'Samyak Snigdha lakshana observed on Day 5 with Triphala Ghrita 120ml. Administered Abhyanga and Sarvanga Swedana. Administered Trivrit Lehya 40g with warm water. Patient achieved 18 Vegas (Madhyama Shuddhi) with Pittanta finish. Vital signs remained stable throughout.',
    submittedAt: 'Today at 09:30 AM',
    status: 'PENDING'
  },
  {
    id: 'case_entry_02',
    studentName: 'Diya Verma',
    studentAusid: 'AYUR-2026-AIIA-0089',
    institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
    rotation: 'Shalya Tantra Unit 1 (Anorectal OPD)',
    procedureTitle: 'Ksharasutra Ligation in High Anal Fistula',
    doapStage: 'ASSISTS',
    patientAgeGender: '38 / Male',
    primaryDiagnosis: 'Bhagandara (Inter-sphincteric Fistula-in-Ano)',
    clinicalObservations: 'Assisted in lithotomy positioning under aseptic protocol. Probed fistulous tract gently from external opening at 7 o\'clock position. Guided Apamarga Ksharasutra thread through internal opening without false passage creation. Secured snugly with 3 surgeon knots.',
    submittedAt: 'Today at 11:15 AM',
    status: 'PENDING'
  },
  {
    id: 'case_entry_03',
    studentName: 'Rohan Banerjee',
    studentAusid: 'AYUR-2026-BHMS-0104',
    institution: 'National Institute of Homoeopathy (NIH), Kolkata',
    rotation: 'OPD Clinical Repertorization',
    procedureTitle: 'Acute Polyarthritis Constitutional Repertorization',
    doapStage: 'PERFORMS',
    patientAgeGender: '52 / Female',
    primaryDiagnosis: 'Amavata / Rheumatoid Polyarthritis',
    clinicalObservations: 'Detailed repertorial chart constructed using Kent Repertory. Modality: Marked aggravation with movement, relief from firm pressure and dry warm wraps. Prescribed Bryonia Alba 200C in split water doses with dietetic restriction.',
    submittedAt: 'Yesterday at 04:45 PM',
    status: 'PENDING'
  }
];

export default function PreceptorReviewDesk() {
  const [cases, setCases] = useState<PendingCaseEntry[]>(INITIAL_PENDING_CASES);
  const [activeCase, setActiveCase] = useState<PendingCaseEntry>(INITIAL_PENDING_CASES[0]);
  const [selectedGrade, setSelectedGrade] = useState<'PRAVARA' | 'MADHYAMA' | 'AVARA'>('PRAVARA');
  const [remarks, setRemarks] = useState<string>('Clinical technique and aseptic precautions executed satisfactorily as per NCISM protocol.');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [signedSuccessMsg, setSignedSuccessMsg] = useState<string>('');

  const handleSpeakNotes = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToRead = `${activeCase.procedureTitle}. Patient Diagnosis: ${activeCase.primaryDiagnosis}. Observations: ${activeCase.clinicalObservations}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Text-to-speech is not supported in this browser environment.');
    }
  };

  const handleSignAndApprove = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === activeCase.id
          ? { ...c, status: 'APPROVED', evaluationGrade: selectedGrade }
          : c
      )
    );
    setSignedSuccessMsg(`Digitally Signed & Approved entry for ${activeCase.studentName} with Grade: ${selectedGrade}!`);
    setTimeout(() => setSignedSuccessMsg(''), 4000);
  };

  const handleRequestRevision = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === activeCase.id
          ? { ...c, status: 'REQUIRES_REVISION' }
          : c
      )
    );
    setSignedSuccessMsg(`Revision requested from ${activeCase.studentName}.`);
    setTimeout(() => setSignedSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">
      
      {/* Official Preceptor Masthead */}
      <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>NCISM Faculty Clinical Preceptor Sign-off Desk</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
              Senior Vaidya & Professor Clinical Review Console
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
              Designed with high-contrast accessibility and audio assistance for revered Vaidyas, Hakims, and Senior Clinical Preceptors to authenticate daily CRRI intern procedure records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-white/10 text-right">
              <span className="text-[10px] text-zinc-400 font-bold block">Preceptor Identity</span>
              <span className="text-xs font-black text-amber-300">Prof. Dr. Arvind Sharma (HOD)</span>
              <span className="text-[10px] text-emerald-400 block">AIIA New Delhi • Reg #DL-AY-1988</span>
            </div>
          </div>
        </div>

        {signedSuccessMsg && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{signedSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Pending List & Case Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Pending Case Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Pending Case Logs ({cases.filter(c => c.status === 'PENDING').length})
            </span>
            <span className="text-[10px] text-amber-400 font-semibold">NCISM Reg 15 Compliant</span>
          </div>

          <div className="space-y-3 max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-700 pr-1">
            {cases.map((c) => {
              const isSelected = activeCase.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setActiveCase(c)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/80 border-amber-400 shadow-xl ring-2 ring-amber-400/40'
                      : 'bg-slate-900/80 border-white/10 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-black text-white block font-display">
                        {c.studentName}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {c.studentAusid}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'APPROVED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : c.status === 'REQUIRES_REVISION'
                        ? 'bg-red-950 text-red-300 border border-red-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-emerald-200 mt-2">
                    {c.procedureTitle}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {c.rotation}
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 text-amber-300 font-bold">
                      DOAP: {c.doapStage}
                    </span>
                    <span>{c.submittedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Clinical Dossier & 1-Click Evaluation Sign-off (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/95 rounded-2xl border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-4 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                DOAP Stage: {activeCase.doapStage}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Logged: {activeCase.submittedAt}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              {activeCase.procedureTitle}
            </h2>
            <p className="text-xs text-emerald-300">
              Student: <span className="font-bold text-white">{activeCase.studentName}</span> • {activeCase.studentAusid}
            </p>
          </div>

          {/* Clinical Case Metadata Box */}
          <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-white/10">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Patient Demographic</span>
              <p className="text-xs font-bold text-white mt-0.5">{activeCase.patientAgeGender}</p>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Clinical Roga Diagnosis</span>
              <p className="text-xs font-bold text-amber-300 mt-0.5">{activeCase.primaryDiagnosis}</p>
            </div>
            <div className="col-span-2 pt-2 border-t border-white/5">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Clinical Rotation Unit</span>
              <p className="text-xs text-zinc-200 mt-0.5">{activeCase.rotation} • {activeCase.institution}</p>
            </div>
          </div>

          {/* Clinical Procedure Notes with Speech Synthesis */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Intern Clinical Procedure & Observation Record</span>
              </span>

              {/* Accessible Text-to-Speech Button for Elder Vaidyas */}
              <button
                type="button"
                onClick={handleSpeakNotes}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-200 text-xs font-bold flex items-center space-x-1.5 border border-white/10 transition-colors"
                title="Listen to clinical notes aloud"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                    <span>Stop Reading</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Listen Aloud (Audio)</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 text-xs text-zinc-200 leading-relaxed font-sans">
              {activeCase.clinicalObservations}
            </div>
          </div>

          {/* Classical 3-Tier Grading Selector */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Classical Performance Grade (NCISM Rubric):
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'PRAVARA', label: 'प्रवर (Pravara)', desc: 'Distinction / Exemplary technique', color: 'border-emerald-500 text-emerald-300' },
                { key: 'MADHYAMA', label: 'मध्यम (Madhyama)', desc: 'Proficient / Competent standard', color: 'border-amber-500 text-amber-300' },
                { key: 'AVARA', label: 'अवर (Avara)', desc: 'Supervised Repetition Recommended', color: 'border-red-500 text-red-300' }
              ].map((g) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setSelectedGrade(g.key as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedGrade === g.key
                      ? 'bg-emerald-950 border-amber-400 ring-2 ring-amber-400/40'
                      : 'bg-slate-950 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs font-black block text-white">{g.label}</span>
                  <span className="text-[10px] text-zinc-400 block mt-1 leading-tight">{g.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preceptor Written Remarks */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Preceptor Observations / Remarks:
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleSignAndApprove}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-black shadow-lg flex items-center justify-center space-x-2 border border-emerald-400/30 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Digital Sign & Approve (HMAC-SHA256)</span>
            </button>

            <button
              type="button"
              onClick={handleRequestRevision}
              className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-bold border border-white/10 transition-colors"
            >
              Request Revision
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
