'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Target,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Calendar,
  Briefcase,
  BookmarkPlus,
  Layers,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Check
} from 'lucide-react';

function GapAnalysisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleIdParam = searchParams.get('roleId') || 'role_pk_tech';

  const [roleId, setRoleId] = useState<string>(roleIdParam);
  const [allRoles, setAllRoles] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Fetch available roles
  useEffect(() => {
    fetch('/api/roles')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.roles) setAllRoles(resData.roles);
      })
      .catch(() => {});
  }, []);

  // Fetch gap analysis for selected role
  useEffect(() => {
    setLoading(true);
    fetch(`/api/gap-analysis?roleId=${roleId}&userId=usr_student_aarav`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setSavedSuccess(resData.isSavedToPlan || false);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [roleId]);

  const handleRoleChange = (newRoleId: string) => {
    setRoleId(newRoleId);
    router.push(`/gap-analysis?roleId=${newRoleId}`);
  };

  const handleAddToPlan = async () => {
    try {
      const res = await fetch('/api/gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr_student_aarav',
          roleId: data.role.id,
          gaps: data.gaps,
          roadmap: data.roadmap
        })
      });
      const resData = await res.json();
      if (resData.success) {
        setSavedSuccess(true);
      }
    } catch (e) {
      alert('Failed to save to plan');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
        Loading Ayush skill gap ontology...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header & Role Selector */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ayush Role Readiness & Skill Gap Analyzer</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">Career Competency Roadmap</h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl leading-relaxed">
            Compare your active e-Logbook & verified skills against industry benchmarks.
          </p>
        </div>

        <div className="w-full sm:w-72 shrink-0">
          <label htmlFor="role-select" className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
            Target Career Role
          </label>
          <select
            id="role-select"
            value={roleId}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs border border-white/15 rounded-xl font-semibold text-white bg-zinc-900 focus:ring-2 focus:ring-emerald-400 outline-none"
          >
            {allRoles.map((r) => (
              <option key={r.id} value={r.id} className="bg-zinc-900 text-white">
                {r.title} ({r.domain})
              </option>
            ))}
          </select>
        </div>
      </div>

      {data && (
        <>
          {/* Readiness Score Card (Watermelon Glass) */}
          <div className="watermelon-card p-6 border border-white/10 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  {data.role.domain} Sector
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 font-display">{data.role.title}</h2>
                <p className="text-xs text-zinc-300 max-w-xl mt-1 leading-relaxed">
                  {data.role.description}
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end bg-black/40 px-5 py-3 rounded-2xl border border-white/10">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-display">
                  {data.readinessPercentage}%
                </div>
                <span className="text-[11px] font-semibold text-zinc-400">Overall Role Match</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-black/50 h-2.5 rounded-full overflow-hidden border border-white/10">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                style={{ width: `${data.readinessPercentage}%` }}
              />
            </div>
          </div>

          {/* Skill-by-Skill Gap Matrix */}
          <div className="watermelon-card p-6 border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-display">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Skill Requirements & Proficiency Gaps</span>
              </h3>
              <span className="text-xs text-zinc-400">
                {data.comparisons.filter((c: any) => c.isMet).length} of {data.comparisons.length} Met
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {data.comparisons.map((c: any) => (
                <div key={c.skillId} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {c.isMet ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      )}
                      <span className="font-bold text-white">{c.skillName}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pl-6">Domain: {c.domain}</p>
                  </div>

                  <div className="flex items-center space-x-4 pl-6 sm:pl-0">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Your Level</span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded text-[11px] border ${
                          c.isMet ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' : 'bg-rose-950/80 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {c.currentLevel}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-zinc-500 block">Required</span>
                      <span className="font-semibold px-2 py-0.5 rounded bg-black/40 text-zinc-300 border border-white/10 text-[11px]">
                        {c.targetLevel}
                      </span>
                    </div>

                    <div className="w-28 text-right font-mono">
                      {c.isMet ? (
                        <span className="text-[11px] font-bold text-emerald-400">✓ Benchmark Met</span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-400">Gap: -{(c.gap * 100).toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Learning Roadmap */}
          <div className="watermelon-card p-6 border border-white/10 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-display">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Personalized Actionable Roadmap</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Micro-courses and DOAP clinical rotations tailored to close your verified gaps.
                </p>
              </div>

              {savedSuccess ? (
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved to My Plan</span>
                </span>
              ) : (
                <button
                  onClick={handleAddToPlan}
                  className="threeui-tactile-btn px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md border border-emerald-400/40 flex items-center space-x-1.5"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Save to Career Plan</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {data.roadmap?.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      Step {idx + 1} • {step.type}
                    </span>
                    <h4 className="font-bold text-white text-sm">{step.title}</h4>
                    <p className="text-zinc-300 leading-relaxed max-w-xl">{step.description}</p>
                    <div className="flex items-center space-x-3 text-[11px] text-zinc-400 pt-1">
                      <span>Provider: <strong className="text-zinc-200">{step.provider}</strong></span>
                      <span>•</span>
                      <span>Duration: {step.duration}</span>
                    </div>
                  </div>

                  <Link
                    href={step.actionUrl || '/opportunities'}
                    className="threeui-tactile-btn px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 flex items-center space-x-1.5 self-start sm:self-auto shrink-0"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function GapAnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <GapAnalysisContent />
    </Suspense>
  );
}
