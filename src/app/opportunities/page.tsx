'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  IndianRupee,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Send,
  X,
  TrendingUp,
  Percent,
  Check
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '@/lib/bhashini';
import { DynamicEmeraldHorizon } from '@/components/threeui/ThreeUIWrappers';

export default function OpportunitiesPage() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterRemote, setFilterRemote] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Apply Modal State
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState(
    'I am keen to apply my clinical and pharmacopoeial competencies in this role, backed by my verified e-Logbook procedures.'
  );
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);

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

  const fetchOpportunities = () => {
    setLoading(true);
    let url = `/api/opportunities?userId=usr_student_aarav`;
    if (filterType !== 'ALL') url += `&type=${filterType}`;
    if (filterRemote) url += `&remote=true`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.opportunities) setOpportunities(data.opportunities);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOpportunities();
  }, [filterType, filterRemote]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOpportunities();
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;
    setIsApplying(true);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: selectedOpp.id,
          userId: 'usr_student_aarav',
          coverLetter,
          resumeUrl: 'https://storage.ayushbridge.gov.in/resumes/aarav_sharma_cv.pdf'
        })
      });
      const data = await res.json();
      if (data.success) {
        setApplySuccess(selectedOpp.id);
        setOpportunities((prev) =>
          prev.map((o) => (o.id === selectedOpp.id ? { ...o, hasApplied: true, applicationStatus: 'APPLIED' } : o))
        );
        setTimeout(() => setSelectedOpp(null), 1500);
      } else {
        alert(data.error || 'Failed to submit application');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      
      {/* ThreeUI WebGL Horizon Ambient Top */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl p-6 sm:p-8 watermelon-card">
        <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 overflow-hidden">
          <DynamicEmeraldHorizon speed={0.4} waveScale={0.65} glow={1} />
        </div>

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Match Ranked Opportunities</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Ayush Industry & Hospital Placements
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Discover verified hospital residencies, ASU pharma QC roles, and clinical CRO research posts matched by your academic merit and clinical skill vector.
            </p>
          </div>

          <Link
            href="/applications"
            className="threeui-tactile-btn self-start sm:self-auto px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2 transition-all"
          >
            <span>Track My Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar (Watermelon Glass) */}
      <div className="watermelon-card p-5 border border-white/10 shadow-xl space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role, keyword, plant, or hospital (e.g., Panchakarma, HPLC, Dabur, AIIA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-sans"
            />
          </div>
          <button
            type="submit"
            className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md border border-emerald-400/40"
          >
            Search
          </button>
        </form>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: t('filter_all') },
              { id: 'INTERNSHIP', label: t('filter_internship') },
              { id: 'MICRO_INTERNSHIP', label: t('filter_micro') },
              { id: 'FACULTY_TRAINING', label: t('filter_faculty') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === tab.id
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 font-bold shadow-sm'
                    : 'bg-black/30 text-zinc-400 border border-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <label className="flex items-center space-x-2 text-zinc-300 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={filterRemote}
              onChange={(e) => setFilterRemote(e.target.checked)}
              className="rounded bg-black/40 border-white/20 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="font-semibold">{t('filter_remote')}</span>
          </label>
        </div>
      </div>

      {/* Opportunities List */}
      {loading ? (
        <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
          Loading AI match ranked opportunities...
        </div>
      ) : opportunities.length === 0 ? (
        <div className="watermelon-card p-12 text-center text-zinc-400 space-y-3">
          <Briefcase className="w-10 h-10 text-zinc-600 mx-auto" />
          <p className="text-base font-bold text-white">No opportunities found matching your filters.</p>
          <p className="text-xs">Try clearing search terms or selecting All Opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="watermelon-card p-6 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                      {opp.type.replace('_', ' ')}
                    </span>
                    {opp.nsqfLevel && (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                        NSQF Level {opp.nsqfLevel}
                      </span>
                    )}
                    {opp.minGraduationMarks && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-950/70 text-amber-300 border border-amber-500/30">
                        Min. {opp.minGraduationMarks}% Marks
                      </span>
                    )}
                    {opp.organization?.verified && (
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Ayush Grid Verified</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mt-2 font-display">{opp.title}</h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center space-x-1 font-semibold text-zinc-200">
                      <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{opp.organization?.name}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{opp.remote ? 'Remote' : opp.location}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{opp.durationWeeks} {t('duration_weeks')}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-0.5 font-bold text-amber-300">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>{opp.stipend > 0 ? `${opp.stipend.toLocaleString()} ${t('stipend_per_month')}` : 'Academic Fellowship'}</span>
                    </span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                  <div className="text-right bg-black/40 px-3 py-2 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      {t('match_score')}
                    </span>
                    <span
                      className={`text-2xl font-extrabold font-display ${
                        opp.matchPercentage >= 80
                          ? 'text-emerald-400'
                          : opp.matchPercentage >= 50
                          ? 'text-amber-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      {opp.matchPercentage}%
                    </span>
                  </div>

                  <div className="w-24 bg-black/50 h-1.5 rounded-full overflow-hidden mt-2 border border-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        opp.matchPercentage >= 80 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400'
                      }`}
                      style={{ width: `${opp.matchPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">{opp.description}</p>

              {/* Required Skills Tags */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Required Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {opp.requiredSkills?.map((s: any, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-black/40 text-zinc-300 text-[11px] font-medium border border-white/10"
                    >
                      {s.name || s.skillId} ({s.minLevel})
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentor Info & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="text-xs text-zinc-400">
                  Mentor: <span className="font-semibold text-zinc-200">{opp.mentorName}</span> ({opp.mentorTitle})
                </div>

                <div className="flex gap-2">
                  {opp.hasApplied ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-default"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t('btn_applied')} ({opp.applicationStatus})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedOpp(opp)}
                      className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-md border border-emerald-400/40 flex items-center space-x-2 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t('btn_apply')}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Apply Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="watermelon-card max-w-lg w-full p-6 border-2 border-emerald-500/40 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base font-display">Confirm Application</h3>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="text-zinc-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-300">
              Applying for <strong className="text-emerald-300 font-bold">{selectedOpp.title}</strong> at{' '}
              <strong className="text-white">{selectedOpp.organization?.name}</strong>.
            </p>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Candidate Statement
                </label>
                <textarea
                  rows={3}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOpp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-submit-application"
                  disabled={isApplying}
                  className="threeui-tactile-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center space-x-2 shadow-lg border border-emerald-400/40 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isApplying ? 'Submitting...' : 'Confirm Submission'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
