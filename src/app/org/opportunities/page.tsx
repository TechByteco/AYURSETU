'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Plus,
  Users,
  Clock,
  MapPin,
  IndianRupee,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function OrgOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/opportunities')
      .then((res) => res.json())
      .then((data) => {
        if (data.opportunities) {
          setOpportunities(data.opportunities);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Industry & Hospital Recruiter Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">Manage Published Opportunities</h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
            Publish structured internships with NSQF mapping and review candidates ranked by cosine match scores.
          </p>
        </div>

        <Link
          href="/org/opportunities/new"
          id="btn-post-new-opp"
          className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2 self-start sm:self-auto shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
          Loading published opportunities...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="watermelon-card p-6 border border-white/10 hover:border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all duration-300"
            >
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    {opp.type.replace('_', ' ')}
                  </span>
                  {opp.nsqfLevel && (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                      NSQF Level {opp.nsqfLevel}
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ACTIVE</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display">{opp.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-1">{opp.description}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 pt-1">
                  <span className="font-semibold text-zinc-200">{opp.organization?.name}</span>
                  <span>•</span>
                  <span>{opp.remote ? 'Remote' : opp.location}</span>
                  <span>•</span>
                  <span>{opp.durationWeeks} weeks</span>
                  <span>•</span>
                  <span className="font-bold text-amber-300">
                    {opp.stipend > 0 ? `₹${opp.stipend.toLocaleString()}/mo` : 'Fellowship'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/org/opportunities/${opp.id}/applicants`}
                  className="threeui-tactile-btn px-4 py-2.5 bg-black/50 hover:bg-black/70 text-white rounded-xl text-xs font-bold border border-white/15 flex items-center space-x-2 transition-colors"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>View Applicants</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
