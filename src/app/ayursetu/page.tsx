'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  GraduationCap,
  Building2,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Layers,
  Activity,
  Send,
  Check,
  FileCheck,
  Percent,
  TrendingUp,
  MapPin,
  Clock,
  Copy,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Zap,
  Flame,
  FileText
} from 'lucide-react';
import { DynamicOrbitalSphere } from '@/components/threeui/ThreeUIWrappers';

export default function AyurSetuPage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state for vacancies
  const [filterTrack, setFilterTrack] = useState<string>('ALL');

  // Application modal state
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [coverNote, setCoverNote] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  const fetchAyurSetuProfile = () => {
    setLoading(true);
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((sess) => {
        const userId = sess.user?.id || 'usr_student_aarav';
        return fetch(`/api/ayursetu/profile?userId=${userId}`);
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.student) setProfileData(data.student);
        if (data.aiRecommendations) setRecommendations(data.aiRecommendations);
        if (data.applications) setApplications(data.applications);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load AyurSetu profile:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAyurSetuProfile();
  }, []);

  const handleCopyId = () => {
    if (profileData?.ayurId) {
      navigator.clipboard.writeText(profileData.ayurId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;
    setIsApplying(true);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: selectedOpp.id,
          userId: profileData?.id || 'usr_student_aarav',
          coverLetter: coverNote || `Application submitted with Unique Ayush Student ID ${profileData?.ayurId} (Graduation: ${profileData?.graduationMarks}%).`
        })
      });

      const data = await res.json();
      if (data.success) {
        setApplySuccess(`Successfully applied to ${selectedOpp.title}! Your Unique ID and verified credentials have been transmitted to the recruiter.`);
        setTimeout(() => {
          setSelectedOpp(null);
          setApplySuccess('');
          fetchAyurSetuProfile();
        }, 1500);
      } else {
        alert(data.error || 'Application failed');
      }
    } catch (err: any) {
      alert(err.message || 'Error applying');
    } finally {
      setIsApplying(false);
    }
  };

  const filteredRecs = recommendations.filter((opp) => {
    if (filterTrack === 'ALL') return true;
    return opp.hiringTrack === filterTrack;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative">
      
      {/* ThreeUI Ambient Sphere Canvas */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none opacity-20 -z-10 overflow-hidden">
        <DynamicOrbitalSphere speed={0.4} scale={0.8} particleOpacity={0.5} orbitOpacity={0.25} />
      </div>

      {/* ========================================================================= */}
      {/* 1. AYURSETU NATIONAL IDENTITY HEADER (Watermelon Glass)                   */}
      {/* ========================================================================= */}
      <div className="watermelon-card p-6 sm:p-8 relative overflow-hidden border border-emerald-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30 uppercase tracking-wider flex items-center space-x-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>आयुर्वेद सेतु • AYURSETU</span>
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Ministry of Ayush Verified Graduate Node</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Personalized Career & Placement Portal
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Welcome, <strong className="text-emerald-300 font-bold">{profileData?.name || 'Aarav Sharma'}</strong>.
              Your academic merit, NCISM e-logbook procedure quotas, and verified skills are cryptographically unified under your official Unique Ayush Student ID.
            </p>
          </div>

          {/* Quick Stats Bento Pill */}
          <div className="shrink-0 bg-black/40 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-5 flex items-center space-x-6 text-center shadow-lg">
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Graduation Marks</p>
              <p className="text-3xl font-extrabold text-amber-400 font-display">
                {profileData?.graduationMarks ? `${profileData.graduationMarks}%` : '84.5%'}
              </p>
              <p className="text-[11px] text-emerald-400 font-semibold">{profileData?.cgpa || '8.8'} CGPA</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">National Rank</p>
              <p className="text-3xl font-extrabold text-white font-display">
                #{profileData?.meritRank || 3}
              </p>
              <p className="text-[11px] text-zinc-400">Top 3% Cohort</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. UNIQUE AYUSH STUDENT ID (AUSID) 3D HOLOGRAPHIC CREDENTIAL CARD         */}
      {/* ========================================================================= */}
      <div className="perspective-1000">
        <div className="watermelon-card p-7 relative overflow-hidden border-2 border-emerald-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.15)] group transition-all duration-300 hover:border-emerald-300/60 preserve-3d">
          {/* Subtle gold/emerald holographic light ribbon */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-amber-400/15 to-teal-500/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Card Left: Identity & AUSID */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 text-white flex items-center justify-center font-extrabold shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-300/40">
                  <Fingerprint className="w-7 h-7 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 block">
                    Official Unique Ayush Student ID (AUSID)
                  </span>
                  <div className="flex items-center space-x-2.5 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-tight drop-shadow">
                      {profileData?.ayurId || 'AYUR-2026-AIIA-0042'}
                    </span>
                    <button
                      onClick={handleCopyId}
                      className="threeui-tactile-btn px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900/80 text-emerald-300 text-xs flex items-center space-x-1"
                      title="Copy Unique Ayush ID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">{copiedId ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
                  {profileData?.stream || 'BAMS'} • Year {profileData?.year || 4}
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 text-zinc-300 border border-white/10 font-semibold text-xs font-mono">
                  Roll: {profileData?.collegeRollNo || 'AIIA/BAMS/2022/042'}
                </span>
                <span className="px-3 py-1 rounded-lg bg-amber-950/70 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Class Merit Rank #{profileData?.meritRank || 3}</span>
                </span>
              </div>
            </div>

            {/* Card Middle: Verified College Details */}
            <div className="lg:border-l lg:border-r border-white/10 lg:px-8 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                Graduating Institution (Verified)
              </span>
              <p className="font-bold text-white text-sm">
                {profileData?.college?.name || 'All India Institute of Ayurveda (AIIA)'}
              </p>
              <p className="text-zinc-400 font-mono text-[11px]">
                Affiliation: <span className="text-emerald-300">{profileData?.college?.ayushAffiliationNo || 'AYUSH-NCISM-DL-001'}</span>
              </p>
              <p className="text-emerald-400 font-semibold text-[11px] flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profileData?.college?.accreditationGrade || 'NCISM Category-1 / NAAC A++'}</span>
              </p>
            </div>

            {/* Card Right: Direct Public Dossier Link */}
            <div className="space-y-3 lg:text-right shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 inline-flex items-center space-x-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>GOVERNMENT AUTHENTICATED</span>
              </span>
              <div>
                <Link
                  href={`/verify?id=${profileData?.ayurId || 'AYUR-2026-AIIA-0042'}`}
                  className="threeui-tactile-btn inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/60 transition-all border border-emerald-400/40"
                >
                  <span>Public Verified Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BACKGROUND AI VACANCY RECOMMENDATION CENTER                            */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Personalized Vacancy Recommendations (AI Engine)
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Matched automatically by our background intelligence model comparing your <strong className="text-amber-300">Graduation Marks ({profileData?.graduationMarks || 84.5}%)</strong> and verified DOAP clinical competencies against active vacancies.
            </p>
          </div>

          {/* Hiring Track Filters */}
          <div className="inline-flex p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-semibold backdrop-blur-md">
            {[
              { id: 'ALL', label: 'All Tracks' },
              { id: 'CLINICAL', label: 'Clinical Hospital' },
              { id: 'PHARMA', label: 'ASU Pharma QC' },
              { id: 'RESEARCH', label: 'Clinical Research CRO' }
            ].map((track) => (
              <button
                key={track.id}
                onClick={() => setFilterTrack(track.id)}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  filterTrack === track.id
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vacancies Grid */}
        {loading ? (
          <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
            Running background AI cosine match against active hospital & corporate postings...
          </div>
        ) : filteredRecs.length === 0 ? (
          <div className="watermelon-card p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-zinc-500 mx-auto" />
            <p className="text-base font-bold text-white">No vacancies found for this track.</p>
            <p className="text-xs text-zinc-400">Switch track filter to browse other sectors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRecs.map((opp) => (
              <div
                key={opp.id}
                className="watermelon-card p-6 flex flex-col justify-between space-y-5 border border-white/10 hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                          {opp.type}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10 font-semibold text-[10px]">
                          NSQF Level {opp.nsqfLevel || 6}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] border ${
                          opp.hiringTrack === 'CLINICAL'
                            ? 'bg-blue-950/70 text-blue-300 border-blue-500/30'
                            : opp.hiringTrack === 'PHARMA'
                            ? 'bg-purple-950/70 text-purple-300 border-purple-500/30'
                            : 'bg-amber-950/70 text-amber-300 border-amber-500/30'
                        }`}>
                          {opp.hiringTrack}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug">{opp.title}</h3>
                      <p className="text-xs text-zinc-400 font-medium mt-0.5">{opp.organization?.name}</p>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-right shrink-0 bg-black/40 px-3 py-2 rounded-xl border border-white/10">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                        AI Fit
                      </span>
                      <span className="text-2xl font-extrabold text-emerald-400 font-display">
                        {opp.matchPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Academic Cutoff Eligibility Alert */}
                  <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    opp.meetsMeritCutoff
                      ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-200'
                      : 'bg-amber-950/50 border-amber-500/30 text-amber-200'
                  }`}>
                    <span className="font-semibold flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Academic Cutoff: {opp.minGraduationMarks}% Required</span>
                    </span>
                    <span className="font-bold text-[11px] px-2 py-0.5 rounded bg-black/40">
                      {opp.meetsMeritCutoff ? 'Eligible (Exceeds Cutoff)' : 'Review Required'}
                    </span>
                  </div>

                  {/* Vacancy Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 pt-1">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{opp.location || 'New Delhi / AIIA Campus'}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 font-bold text-amber-300">
                      <span>Stipend: ₹{opp.stipend ? opp.stipend.toLocaleString() : '35,000'}/mo</span>
                    </div>
                  </div>

                  {/* Matched Competencies */}
                  {opp.requiredSkills && opp.requiredSkills.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">
                        Required Clinical Competencies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.requiredSkills.map((sk: any, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 text-[11px]"
                          >
                            {sk.skill?.name || sk.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Deadline: {opp.deadline ? new Date(opp.deadline).toLocaleDateString() : 'Rolling 2026'}
                  </span>
                  <button
                    onClick={() => setSelectedOpp(opp)}
                    className="threeui-tactile-btn px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-950/40 border border-emerald-400/30"
                  >
                    <span>Apply Now (AUSID)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. APPLICATION SUBMISSION MODAL                                           */}
      {/* ========================================================================= */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="watermelon-card max-w-lg w-full p-6 border-2 border-emerald-500/40 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Direct Application Transmission</h3>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="text-zinc-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-zinc-300">
                You are applying to <strong className="text-emerald-300 font-bold">{selectedOpp.title}</strong> at{' '}
                <strong className="text-white">{selectedOpp.organization?.name}</strong>.
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1 font-mono text-[11px]">
                <p className="text-emerald-400 font-bold">Transmitted Credentials:</p>
                <p className="text-zinc-300">• Unique Ayush ID: {profileData?.ayurId}</p>
                <p className="text-zinc-300">• Graduation Merit: {profileData?.graduationMarks}% ({profileData?.cgpa} CGPA)</p>
                <p className="text-zinc-300">• Institution: {profileData?.college?.name}</p>
                <p className="text-zinc-300">• Accreditation: {profileData?.college?.accreditationGrade}</p>
              </div>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Candidate Statement / Cover Note (Optional)
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Highlight specific Panchakarma or clinical experience relevant to this posting..."
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {applySuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold">
                  {applySuccess}
                </div>
              )}

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
                  disabled={isApplying}
                  className="threeui-tactile-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/40 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isApplying ? 'Transmitting...' : 'Apply Now'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
