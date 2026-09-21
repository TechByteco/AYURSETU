'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  CheckCircle2,
  Clock,
  Award,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  Stethoscope,
  GraduationCap,
  Calendar,
  FileCheck,
  Building2,
  Check
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '@/lib/bhashini';

export default function LogbookPage() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [entries, setEntries] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [domainStats, setDomainStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<string>('STUDENT');
  const [issuingCred, setIssuingCred] = useState(false);
  const [credIssuedMsg, setCredIssuedMsg] = useState('');

  // NCISM CRRI Clinical Department Rotation State
  const [activeRotation, setActiveRotation] = useState<string>('PANCHAKARMA');

  const fetchLogbook = () => {
    setLoading(true);
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((sessData) => {
        const role = sessData.user?.role || 'STUDENT';
        setActiveRole(role);

        const url = role === 'ACADEMICIAN' ? '/api/logbook?role=ACADEMICIAN' : '/api/logbook?userId=usr_student_aarav';
        return fetch(url);
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.entries) setEntries(data.entries);
        if (data.summary) setSummary(data.summary);
        if (data.domainStats) setDomainStats(data.domainStats);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogbook();
  }, []);

  const handleApproveEntry = async (entryId: string) => {
    try {
      const res = await fetch(`/api/logbook/${entryId}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mentorId: 'usr_acad_sharma' })
      });
      const data = await res.json();
      if (data.success) {
        setEntries((prev) =>
          prev.map((e) => (e.id === entryId ? { ...e, approved: true, approvedAt: new Date() } : e))
        );
      }
    } catch (err) {
      alert('Approval failed');
    }
  };

  const handleClaimMilestoneCredential = async () => {
    setIssuingCred(true);
    try {
      const res = await fetch('/api/credentials/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr_student_aarav',
          type: 'LOGBOOK_MILESTONE',
          competencyTitle: 'Panchakarma Clinical Mastery Milestone (Level PE)',
          verifiedProcedures: summary?.advancedProcedureCount || 10
        })
      });
      const data = await res.json();
      if (data.success) {
        setCredIssuedMsg('Milestone Verifiable Credential issued to your Skill Passport with tamper-proof QR code!');
      }
    } catch (err) {
      alert('Failed to issue credential');
    } finally {
      setIssuingCred(false);
    }
  };

  const t = (key: string) => getTranslation(lang, key);

  // NCISM Regulation 15 (2022) 1-Year CRRI Rotations
  const crriRotations = [
    {
      id: 'KAYACHIKITSA',
      name: 'Kayachikitsa (Internal Medicine)',
      days: '60 Days',
      status: 'COMPLETED',
      proceduresLogged: 14,
      targetQuota: 15,
      preceptor: 'Prof. S. N. Tripathi',
      description: 'Ashtavidha Pariksha, Nadi Pariksha, Roga Nidana, and classical Shamana Chikitsa management in OPD/IPD.'
    },
    {
      id: 'PANCHAKARMA',
      name: 'Panchakarma (Bio-Cleansing)',
      days: '60 Days',
      status: 'ACTIVE',
      proceduresLogged: 26,
      targetQuota: 25,
      preceptor: 'Prof. Dr. Arvind Sharma (HOD)',
      description: 'Vamana Karma, Virechana Karma, Basti (Anuvasana & Niruha), Nasya, and Raktamokshana supervision.'
    },
    {
      id: 'SHALYA',
      name: 'Shalya Tantra (Surgery & Anorectal)',
      days: '60 Days',
      status: 'COMPLETED',
      proceduresLogged: 18,
      targetQuota: 15,
      preceptor: 'Dr. Manoj Kumar',
      description: 'Ksharasutra preparation and ligation, Jalaukavacharana (Leech Therapy), wound asepsis, and minor surgical dressings.'
    },
    {
      id: 'SHALAKYA',
      name: 'Shalakya Tantra (ENT & Ophthalmology)',
      days: '45 Days',
      status: 'IN_PROGRESS',
      proceduresLogged: 9,
      targetQuota: 12,
      preceptor: 'Dr. V. K. Joshi',
      description: 'Netra Kriya Kalpa (Tarpana, Putapaka, Anjana), Karna Purana, Shirodhara, and Kavala/Gandusha therapies.'
    },
    {
      id: 'PRASUTI',
      name: 'Prasuti & Stri Roga (OB-GYN)',
      days: '45 Days',
      status: 'COMPLETED',
      proceduresLogged: 15,
      targetQuota: 12,
      preceptor: 'Dr. Sunita Rani',
      description: 'Garbhini Paricharya antenatal care, Yonidhavana, Yoni Pichu, and normal delivery observation.'
    },
    {
      id: 'KAUMARBHRITYA',
      name: 'Kaumarbhritya (Pediatrics)',
      days: '30 Days',
      status: 'COMPLETED',
      proceduresLogged: 10,
      targetQuota: 10,
      preceptor: 'Dr. Ananya Sen',
      description: 'Swarnaprashana administration, pediatric developmental milestones, and classical pediatric formulations.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      
      {/* Header (Watermelon Glass) */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>NCISM CBME Competency e-Logbook (DOAP)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">{t('logbook_title')}</h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            Standardized daily clinical duty tracking governed by NCISM 2022 Regulations with mandatory preceptor digital signatures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/logbook/new"
            id="btn-new-logbook-entry"
            className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('btn_log_procedure')}</span>
          </Link>
          <Link
            href="/passport"
            className="threeui-tactile-btn px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-md flex items-center space-x-1.5 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Skill Passport</span>
          </Link>
        </div>
      </div>

      {/* NCISM CRRI ROTATION & REGULATORY LICENSURE COMPLIANCE DASHBOARD */}
      <div className="watermelon-card p-6 border border-emerald-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center font-bold text-white shadow-md ring-1 ring-emerald-400/30">
              <Stethoscope className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                NCISM CRRI Rotational Posting Dashboard (Regulation 15)
              </h2>
              <p className="text-xs text-zinc-400">
                Compulsory Rotatory Residential Internship • All India Institute of Ayurveda
              </p>
            </div>
          </div>

          {/* Compliance Status Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-bold border border-emerald-500/40 flex items-center space-x-1">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>SHISHIKSHA: VERIFIED</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 text-[10px] font-bold border border-amber-500/40 flex items-center space-x-1">
              <Check className="w-3 h-3 text-amber-400" />
              <span>NExT Readiness: 88%</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 text-[10px] font-bold border border-blue-500/40 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>DPDP Act: Protected</span>
            </span>
          </div>
        </div>

        {/* 6 Clinical Department Rotation Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {crriRotations.map((dept) => {
            const isSelected = activeRotation === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveRotation(dept.id)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-lg scale-[1.02] ring-1 ring-emerald-400/50'
                    : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                  <span className={dept.status === 'COMPLETED' ? 'text-emerald-400' : dept.status === 'ACTIVE' ? 'text-amber-400' : 'text-blue-400'}>
                    {dept.status}
                  </span>
                  <span className="text-zinc-500">{dept.days}</span>
                </div>
                <p className="text-xs font-bold text-white truncate">{dept.name.split(' ')[0]}</p>
                <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                  {dept.proceduresLogged} / {dept.targetQuota} Cases
                </p>
                <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden mt-2 border border-white/10">
                  <div
                    className={`h-full ${
                      dept.proceduresLogged >= dept.targetQuota ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400'
                    }`}
                    style={{ width: `${Math.min(100, (dept.proceduresLogged / dept.targetQuota) * 100)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Department Details Card */}
        {(() => {
          const dept = crriRotations.find((d) => d.id === activeRotation) || crriRotations[1];
          return (
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-emerald-300">{dept.name}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-300">Supervising Faculty: {dept.preceptor}</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">{dept.description}</p>
              </div>
              <div className="shrink-0 flex items-center space-x-3 text-right">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">Logbook Quota Progress</p>
                  <p className="text-sm font-extrabold text-amber-400 font-display">
                    {dept.proceduresLogged} of {dept.targetQuota} Cases Completed
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Milestone Notification Banner if eligible */}
      {summary?.milestoneEligible && (
        <div className="watermelon-card p-6 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <h3 className="font-bold text-sm text-white font-display">
                Logbook Milestone Reached: 10+ Advanced Procedures Logged!
              </h3>
            </div>
            <p className="text-xs text-zinc-300">
              You have accumulated {summary.advancedProcedureCount} cases at Assist (AP) and Perform (PE) levels. Claim your W3C-compliant digital milestone credential.
            </p>
          </div>

          {credIssuedMsg ? (
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-2 rounded-xl">
              ✓ Credential Minted!
            </span>
          ) : (
            <button
              onClick={handleClaimMilestoneCredential}
              disabled={issuingCred}
              className="threeui-tactile-btn px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>{issuingCred ? 'Minting Credential...' : 'Claim Verifiable Credential'}</span>
            </button>
          )}
        </div>
      )}

      {/* Domain Competency Coverage Heatmap */}
      <div className="watermelon-card p-6 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-display">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Competency Coverage Heatmap by Domain</span>
          </h2>
          <span className="text-xs text-zinc-400 font-medium">
            Total Logged: <strong className="text-white">{summary?.totalCasesLogged || 0} cases</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(domainStats).map(([domain, stats]: [string, any]) => {
            const count = stats.totalCases;
            const bgClass =
              count >= 10
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                : count >= 5
                ? 'bg-black/50 border-emerald-500/30 text-emerald-300'
                : count > 0
                ? 'bg-black/40 border-white/15 text-zinc-300'
                : 'bg-black/20 border-white/5 text-zinc-600';

            return (
              <div key={domain} className={`p-4 rounded-xl space-y-2 border transition-all ${bgClass}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider truncate">
                  {domain.replace('_', ' ')}
                </p>
                <p className="text-2xl font-extrabold font-display">{count}</p>
                <div className="text-[10px] space-y-0.5 opacity-80 font-mono">
                  <p>DO: {stats.doapBreakdown.DO} • OA: {stats.doapBreakdown.OA}</p>
                  <p>AP: {stats.doapBreakdown.AP} • PE: {stats.doapBreakdown.PE}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DOAP Legend Bar */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <span className="font-bold text-white">NCISM DOAP Framework:</span>
        <span className="flex items-center space-x-1.5">
          <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30 font-bold text-[10px]">DO</span>
          <span>Demonstrate (Demo)</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 font-bold text-[10px]">OA</span>
          <span>Observe (Rounds)</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30 font-bold text-[10px]">AP</span>
          <span>Assist (Supervised)</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">PE</span>
          <span>Perform (Independent)</span>
        </span>
      </div>

      {/* Entries Table */}
      <div className="watermelon-card border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-display">Recorded Procedures & Preceptor Sign-offs</h3>
          <span className="text-xs text-zinc-400">{entries.length} recorded entries</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-zinc-400 animate-pulse">Loading entries...</div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center text-xs text-zinc-400">No procedures logged yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/50 text-zinc-400 border-b border-white/10 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">{t('th_code')}</th>
                  <th className="px-4 py-3">{t('th_competency')}</th>
                  <th className="px-4 py-3">{t('th_domain')}</th>
                  <th className="px-4 py-3">{t('th_doap_level')}</th>
                  <th className="px-4 py-3 text-center">{t('th_count')}</th>
                  <th className="px-4 py-3">{t('th_status')}</th>
                  {activeRole === 'ACADEMICIAN' && <th className="px-4 py-3 text-right">Faculty Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-400">{entry.competencyCode}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-white">{entry.competencyName}</p>
                      {entry.notes && (
                        <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{entry.notes}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10 text-[10px] font-semibold">
                        {entry.domain}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] border ${
                          entry.level === 'PE'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                            : entry.level === 'AP'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                            : entry.level === 'OA'
                            ? 'bg-purple-950/80 text-purple-300 border-purple-500/30'
                            : 'bg-blue-950/80 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        {entry.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-white font-mono">{entry.count}</td>
                    <td className="px-4 py-3">
                      {entry.approved ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-400 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t('status_approved')}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-amber-400 font-semibold text-[11px]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{t('status_pending')}</span>
                        </span>
                      )}
                    </td>
                    {activeRole === 'ACADEMICIAN' && (
                      <td className="px-4 py-3 text-right">
                        {!entry.approved ? (
                          <button
                            onClick={() => handleApproveEntry(entry.id)}
                            className="threeui-tactile-btn px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-lg text-[11px] font-bold shadow-sm"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono">Verified</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
