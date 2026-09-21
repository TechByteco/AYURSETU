'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Users,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  Send,
  ExternalLink,
  ShieldCheck,
  Award,
  Stethoscope,
  FileCheck2,
  Check,
  AlertTriangle,
  QrCode,
  Scale
} from 'lucide-react';

export default function OpportunityApplicantsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [oppData, setOppData] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Status & Feedback modal state
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<string>('SHORTLISTED');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<string>('');

  const fetchApplicants = () => {
    setLoading(true);
    fetch(`/api/opportunities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.opportunity) setOppData(data.opportunity);
        if (data.applicants) setApplicants(data.applicants);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) fetchApplicants();
  }, [id]);

  const openStatusDialog = (app: any) => {
    setSelectedApp(app);
    setNewStatus(app.status || 'SHORTLISTED');
    setFeedbackText(
      app.feedback ||
        'Candidate verified against NCISM CRRI clinical standards and Schedule T requirements. Shortlisted for technical interview.'
    );
    setUpdateSuccess('');
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/applications/${selectedApp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          feedback: feedbackText
        })
      });
      const data = await res.json();
      if (data.success) {
        setUpdateSuccess(`Status updated to ${newStatus}!`);
        // Update local applicants list
        setApplicants((prev) =>
          prev.map((a) =>
            a.id === selectedApp.id
              ? { ...a, status: newStatus, feedback: feedbackText }
              : a
          )
        );
        setTimeout(() => setSelectedApp(null), 1200);
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      <div>
        <Link
          href="/org/opportunities"
          className="text-xs font-bold text-zinc-400 hover:text-emerald-300 flex items-center space-x-1.5 mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Posted Opportunities</span>
        </Link>
        <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                {oppData?.type?.replace('_', ' ') || 'OPPORTUNITY'}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30">
                NSQF Level {oppData?.nsqfLevel || 6}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Applicant Dossiers: {oppData?.title || 'Loading...'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300">
              {oppData?.organization?.name} • Multi-Dimensional Ayush Candidate Screening Funnel
            </p>
          </div>

          <div className="text-xs text-zinc-300 text-left sm:text-right watermelon-card p-4 border border-white/10 shrink-0">
            <span>Total Candidates: <strong className="text-white text-base font-display">{applicants.length}</strong></span>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Ranked by Cosine & DOAP Quota</p>
          </div>
        </div>
      </div>

      {/* 4-STAGE RECRUITER REGULATORY AUDIT CHECKLIST BAR */}
      <div className="watermelon-card p-5 text-white rounded-2xl text-xs border border-emerald-500/20 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-zinc-200">Official Ayush Department Screening Pipeline:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-300">
            <span className="flex items-center space-x-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-bold">1</span>
              <span>CRRI Licensure Gate</span>
            </span>
            <span className="text-zinc-600">→</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-bold">2</span>
              <span>DOAP Procedure Quota</span>
            </span>
            <span className="text-zinc-600">→</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-bold">3</span>
              <span>Schedule T / GCP Score</span>
            </span>
            <span className="text-zinc-600">→</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-bold">4</span>
              <span>W3C QR Verification</span>
            </span>
          </div>
        </div>
      </div>

      {/* Applicants List */}
      {loading ? (
        <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
          Loading ranked applicants...
        </div>
      ) : applicants.length === 0 ? (
        <div className="watermelon-card p-12 text-center space-y-3 border border-white/10 shadow-2xl">
          <Users className="w-10 h-10 text-zinc-500 mx-auto" />
          <p className="text-base font-bold text-white font-display">No applicants yet for this position.</p>
          <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
            Once students apply, their verified e-logbook competencies and AI vector match will rank them here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((app, idx) => (
            <div
              key={app.id}
              className="watermelon-card p-6 border border-white/10 shadow-xl space-y-4 hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30">
                      Rank #{idx + 1}
                    </span>
                    <span className="text-base font-bold text-white font-display">{app.candidateName}</span>
                    <span className="text-xs text-zinc-400">
                      ({app.stream} Year-{app.year || 4})
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-mono">{app.candidateEmail}</p>

                  {/* Regulatory & Competency Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center space-x-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>CRRI Eligible</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center space-x-1">
                      <Stethoscope className="w-3 h-3 text-emerald-400" />
                      <span>20+ Level P Cases Logged</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 font-semibold flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      <span>Schedule T / GCP Cleared</span>
                    </span>
                  </div>

                  {app.coverLetter && (
                    <p className="text-xs text-zinc-300 italic bg-black/40 p-3 rounded-xl border border-white/10 mt-2 leading-relaxed">
                      &quot;{app.coverLetter}&quot;
                    </p>
                  )}
                </div>

                {/* Score & Pipeline Status */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      AI Vector Match
                    </span>
                    <span className="text-3xl font-extrabold text-emerald-400 font-display">
                      {app.matchPercentage}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                        app.status === 'OFFER'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-400'
                          : app.status === 'SHORTLISTED'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-400'
                          : app.status === 'INTERVIEW'
                          ? 'bg-amber-950 text-amber-300 border border-amber-400'
                          : 'bg-white/10 text-zinc-300 border border-white/15'
                      }`}
                    >
                      Status: {app.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feedback display if present */}
              {app.feedback && (
                <div className="p-3.5 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-emerald-300 text-[11px] block">
                    Recorded Recruiter Feedback:
                  </span>
                  <p className="text-zinc-200 leading-relaxed">{app.feedback}</p>
                </div>
              )}

              {/* Actions & Verification Links */}
              <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center space-x-3 text-xs">
                  <Link
                    href="/passport/verify?token=vc_tok_ayush_2026_001"
                    className="font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Verify W3C Skill Passport</span>
                  </Link>
                  <span className="text-zinc-600">•</span>
                  <a
                    href={app.resumeUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-zinc-300 hover:text-white flex items-center space-x-1.5 transition-colors"
                  >
                    <span>View Clinical Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <button
                  id={`btn-evaluate-candidate-${app.id}`}
                  onClick={() => openStatusDialog(app)}
                  className="threeui-tactile-btn px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md border border-emerald-400/30 transition-all"
                >
                  Update Status & Decision
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Evaluate Candidate Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="watermelon-card rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-emerald-500/40 bg-zinc-950/95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white font-display">
                Evaluate: {selectedApp.candidateName}
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40">
                {selectedApp.matchPercentage}% Match
              </span>
            </div>

            {updateSuccess ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center space-x-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{updateSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleStatusUpdate} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="select-app-status" className="block font-semibold text-zinc-300 mb-1.5">
                    Candidate Hiring Decision
                  </label>
                  <select
                    id="select-app-status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 font-bold text-emerald-300 bg-zinc-900 outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="APPLIED" className="bg-zinc-900 text-white">APPLIED (Pending Screening)</option>
                    <option value="SHORTLISTED" className="bg-zinc-900 text-white">SHORTLISTED (CRRI & Quota Cleared)</option>
                    <option value="INTERVIEW" className="bg-zinc-900 text-white">INTERVIEW SCHEDULED (Technical / Clinical OSCE)</option>
                    <option value="OFFER" className="bg-zinc-900 text-white">OFFER EXTENDED (Placement / Internship Confirmed)</option>
                    <option value="REJECTED" className="bg-zinc-900 text-white">REJECTED (Skill Gap Identified)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="feedback-input" className="block font-semibold text-zinc-300 mb-1.5">
                    Formal Candidate Feedback (Grounded in NCISM / Schedule T)
                  </label>
                  <textarea
                    id="feedback-input"
                    rows={3}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/40 text-white focus:ring-2 focus:ring-emerald-400 outline-none leading-relaxed"
                    placeholder="Enter technical interview details, CRRI requirements, or onboarding date..."
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2.5 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="px-4 py-2 border border-white/15 rounded-xl text-zinc-300 font-semibold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="btn-save-evaluation"
                    disabled={isUpdating}
                    className="threeui-tactile-btn px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-md border border-emerald-400/40"
                  >
                    {isUpdating ? 'Saving...' : 'Confirm Decision'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
