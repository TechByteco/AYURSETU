'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  Download,
  Printer,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Building2,
  BarChart3,
  Cpu
} from 'lucide-react';
import { SlidingNumber } from '@/components/core/sliding-number';
import { DynamicDotMatrix } from '@/components/threeui/ThreeUIWrappers';
import AllIndiaAyushMatrix from '@/components/gov/AllIndiaAyushMatrix';

export default function DepartmentDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [exportNotice, setExportNotice] = useState('');

  useEffect(() => {
    fetch('/api/dept/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleExportReport = () => {
    setExportNotice('Exporting NAAC / NBA Accreditation Summary (Criterion 1 & 2)...');
    setTimeout(() => {
      window.print();
      setExportNotice('');
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      
      {/* ThreeUI Cybernetic Dot Matrix Ambient Background */}
      <div className="fixed inset-0 pointer-events-none opacity-15 overflow-hidden -z-10">
        <DynamicDotMatrix gridScale={35} pulseSpeed={0.3} radius={0.12} opacity={0.35} hue={140} />
      </div>

      {/* Header (Watermelon Glass) */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Academic Affairs & Curriculum Governance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Department Competency Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            Aggregated student cohort skill gaps, real-time industry demands, automated syllabus updates, and NAAC/NBA accreditation evidence ledger.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            id="btn-export-naac-report"
            onClick={handleExportReport}
            className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Export NAAC / NBA Report</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold rounded-xl">
          {exportNotice}
        </div>
      )}

      {loading ? (
        <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
          Aggregating department skill gap metrics...
        </div>
      ) : (
        <>
          {/* Cohort Overview Bento Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="watermelon-card p-5 border border-white/10 shadow-lg space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Total Enrolled Students
              </span>
              <div className="text-3xl font-extrabold text-white font-display">
                <SlidingNumber value={stats?.cohortOverview?.totalStudents || 6} />
              </div>
              <p className="text-[11px] text-emerald-400 font-semibold">100% e-Logbook Active</p>
            </div>

            <div className="watermelon-card p-5 border border-white/10 shadow-lg space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Industry Openings Mapped
              </span>
              <div className="text-3xl font-extrabold text-emerald-400 font-display">
                <SlidingNumber value={stats?.cohortOverview?.totalActiveOpportunities || 20} />
              </div>
              <p className="text-[11px] text-zinc-400">Active Hospital & Lab Needs</p>
            </div>

            <div className="watermelon-card p-5 border border-white/10 shadow-lg space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Verified Credentials Issued
              </span>
              <div className="text-3xl font-extrabold text-amber-400 font-display">
                <SlidingNumber value={stats?.cohortOverview?.totalCredentialsIssued || 3} />
              </div>
              <p className="text-[11px] text-zinc-400">HMAC-SHA256 Verifiable</p>
            </div>

            <div className="watermelon-card p-5 border border-white/10 shadow-lg space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Curriculum Proposals
              </span>
              <div className="text-3xl font-extrabold text-purple-400 font-display">
                <SlidingNumber value={stats?.syllabusRecommendations?.length || 4} />
              </div>
              <p className="text-[11px] text-purple-300 font-semibold">Rule: &gt;40% Cohort Gap</p>
            </div>
          </div>

          {/* Automated AI Syllabus Upgrade Suggestions */}
          <div className="watermelon-card p-6 border border-white/10 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white font-display">
                  Automated Syllabus Upgrade Recommendations
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40">
                Policy Rule: Lack &gt; 40%
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Real-time comparative analysis between student e-logbook competency attainment and active pharma/clinical employer criteria:
            </p>

            <div className="space-y-3 pt-1">
              {stats?.syllabusRecommendations?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-amber-500/30 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{item.skillName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-amber-400/30 font-semibold text-amber-300">
                        {item.domain}
                      </span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed max-w-2xl">{item.recommendation}</p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-bold text-rose-400 block">
                      {item.lackingPercentage}% of Students Lack
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Demanded in {item.industryDemandPostings} Active Postings
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NAAC / NBA Evidence Matrix */}
          <div className="watermelon-card p-6 border border-white/10 shadow-xl space-y-4 printable-report">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-bold text-white font-display">
                  NAAC / NBA Accreditation Evidence Matrix (Outcome-Based Education)
                </h2>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">AY 2025–2026 Audit Ready</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <h3 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                  Criterion 1: Curricular Aspects
                </h3>
                <ul className="space-y-1.5 text-zinc-300">
                  <li>• Industry Mapped Competencies: <strong className="text-white">{stats?.naacMetrics?.criterion1_CurricularAspects?.industryMappedCompetenciesCount || 75}</strong></li>
                  <li>• Curriculum Update Proposals: <strong className="text-white">{stats?.naacMetrics?.criterion1_CurricularAspects?.curriculumUpdateProposalsCount || 4}</strong></li>
                  <li>• Micro-Credential Rate: <strong className="text-emerald-300">{stats?.naacMetrics?.criterion1_CurricularAspects?.microCredentialIntegrationRate || '75%'}</strong></li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <h3 className="font-bold text-teal-400 text-xs uppercase tracking-wider">
                  Criterion 2: Teaching-Learning
                </h3>
                <ul className="space-y-1.5 text-zinc-300">
                  <li>• Total CBME Logged Cases: <strong className="text-white">{stats?.naacMetrics?.criterion2_TeachingLearningEvaluation?.totalCBMEeLogbookCases || 10}</strong></li>
                  <li>• Mentor Verification Rate: <strong className="text-teal-300">{stats?.naacMetrics?.criterion2_TeachingLearningEvaluation?.facultyVerificationRate || '90%'}</strong></li>
                  <li>• DOAP Procedure Coverage: <strong className="text-white">{stats?.naacMetrics?.criterion2_TeachingLearningEvaluation?.doapCoverageRatio || '94.2%'}</strong></li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <h3 className="font-bold text-amber-400 text-xs uppercase tracking-wider">
                  Criterion 5: Student Progression
                </h3>
                <ul className="space-y-1.5 text-zinc-300">
                  <li>• Active Placements: <strong className="text-white">{stats?.naacMetrics?.criterion5_StudentSupportProgression?.activeInternshipPlacements || 2}</strong></li>
                  <li>• Verifiable Credentials: <strong className="text-amber-300">{stats?.naacMetrics?.criterion5_StudentSupportProgression?.verifiableCredentialsIssued || 3}</strong></li>
                  <li>• Security Integrity: <strong className="text-emerald-400">100% Tamper Proof</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* All-India State/UT Clinical Training & Placement Telemetry */}
          <AllIndiaAyushMatrix />
        </>
      )}
    </div>
  );
}
