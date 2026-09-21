'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  MessageSquare,
  Building2,
  MapPin,
  IndianRupee,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const STATUS_STEPS = ['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'OFFER'];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/applications?userId=usr_student_aarav')
      .then((res) => res.json())
      .then((data) => {
        if (data.applications) setApplications(data.applications);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStepIndex = (status: string) => {
    if (status === 'REJECTED') return -1;
    return STATUS_STEPS.indexOf(status);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Real-Time Application Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            My Internship & Job Applications
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
            Track evaluation status, recruiter feedback, and offer releases from accredited hospitals and labs.
          </p>
        </div>

        <Link
          href="/opportunities"
          className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2 self-start sm:self-auto shrink-0 transition-all"
        >
          <span>Find More Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
          Loading application status timeline...
        </div>
      ) : applications.length === 0 ? (
        <div className="watermelon-card p-12 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-zinc-600 mx-auto" />
          <p className="text-base font-bold text-white">You have not applied to any opportunities yet.</p>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Browse verified postings matching your Ayush skill vector and apply in 1-click.
          </p>
          <Link
            href="/opportunities"
            className="threeui-tactile-btn inline-flex px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-md border border-emerald-400/30 mt-2"
          >
            Explore Opportunities
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const stepIdx = getStepIndex(app.status);
            const isRejected = app.status === 'REJECTED';

            return (
              <div
                key={app.id}
                className="watermelon-card p-6 border border-white/10 shadow-xl space-y-6"
              >
                {/* Top Details */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                        {app.type.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        Applied on {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white font-display">{app.title}</h2>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center space-x-1.5 font-semibold text-zinc-200">
                        <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{app.organizationName}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{app.remote ? 'Remote' : app.location}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-0.5 font-semibold text-amber-300">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>{app.stipend > 0 ? `${app.stipend.toLocaleString()}/mo` : 'Fellowship'}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 shrink-0">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      AI Match Score
                    </span>
                    <span className="text-xl font-extrabold text-emerald-400 font-display">
                      {app.matchPercentage}%
                    </span>
                  </div>
                </div>

                {/* Status Timeline Progress Bar */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                    Evaluation Stage
                  </span>

                  {isRejected ? (
                    <div className="p-3 bg-rose-950/80 border border-rose-500/40 rounded-xl text-rose-200 text-xs font-semibold">
                      Status: Application Reviewed & Not Shortlisted for this cohort.
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-between">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-black/50 border border-white/10 -z-10" />
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-400 -z-10 transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                        style={{
                          width:
                            stepIdx === 0 ? '12%' : stepIdx === 1 ? '38%' : stepIdx === 2 ? '68%' : '100%'
                        }}
                      />

                      {STATUS_STEPS.map((s, idx) => {
                        const isCurrent = s === app.status;
                        const isDone = idx <= stepIdx;

                        return (
                          <div key={s} className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                                isCurrent
                                  ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white ring-4 ring-emerald-500/30 scale-110'
                                  : isDone
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-black/60 border border-white/20 text-zinc-500'
                              }`}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span
                              className={`text-[10px] font-bold mt-2 ${
                                isCurrent
                                  ? 'text-emerald-300 font-extrabold'
                                  : isDone
                                  ? 'text-zinc-200'
                                  : 'text-zinc-500'
                              }`}
                            >
                              {s}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Recruiter Feedback Box if available */}
                {app.feedback && (
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1 text-xs">
                    <div className="flex items-center space-x-2 text-amber-300 font-bold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Recruiter Feedback & Next Steps</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed pl-5">{app.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
