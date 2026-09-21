'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Search,
  Users,
  Award,
  ArrowRight,
  Plus,
  ExternalLink,
  BookOpen,
  Sparkles,
  MapPin
} from 'lucide-react';
import { DynamicConstellationField } from '@/components/threeui/ThreeUIWrappers';

export default function CollegesDirectoryPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/colleges')
      .then((res) => res.json())
      .then((data) => {
        if (data.colleges) setColleges(data.colleges);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch colleges:', err);
        setLoading(false);
      });
  }, []);

  const filteredColleges = colleges.filter((col) => {
    const matchesSearch =
      col.name.toLowerCase().includes(search.toLowerCase()) ||
      (col.ayushAffiliationNo && col.ayushAffiliationNo.toLowerCase().includes(search.toLowerCase())) ||
      (col.city && col.city.toLowerCase().includes(search.toLowerCase()));

    const matchesState = selectedState === 'ALL' || col.state?.toLowerCase() === selectedState.toLowerCase();
    return matchesSearch && matchesState;
  });

  const uniqueStates = Array.from(new Set(colleges.map((c) => c.state).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">
      
      {/* ThreeUI Ambient Constellation Network Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden -z-10">
        <DynamicConstellationField variant="connectivity-graph" speed={0.6} density={0.8} opacity={0.35} hue={160} />
      </div>

      {/* Page Header (Watermelon Card) */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ministry of Ayush • National Institutional Register</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Government-Verified Ayush Colleges Directory
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Official repository of accredited Ayurveda, Siddha, Unani, and Homeopathy institutions authorized under NCISM & NCH regulations to upload qualified graduating batches into the AYURSETU ecosystem.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link
              href="/colleges/inst_aiia_001/upload"
              className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Qualified Students</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search & State Filter Bar (Watermelon Glass) */}
      <div className="watermelon-card p-4 sm:p-5 border border-white/10 shadow-xl flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search verified colleges by name, NCISM code, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-sans"
          />
        </div>

        <div className="sm:w-56">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
          >
            <option value="ALL">All States (Pan-India)</option>
            {uniqueStates.map((st: any) => (
              <option key={st} value={st} className="bg-zinc-900 text-white">
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Colleges Grid */}
      {loading ? (
        <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
          Fetching official Ayush institutional registry...
        </div>
      ) : filteredColleges.length === 0 ? (
        <div className="watermelon-card p-12 text-center space-y-3">
          <Building2 className="w-10 h-10 text-zinc-500 mx-auto" />
          <p className="text-base font-bold text-white">No verified colleges match your search filter.</p>
          <p className="text-xs text-zinc-400">Try resetting your state filter or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((col) => (
            <div
              key={col.id}
              className="watermelon-card p-6 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shrink-0 shadow-md ring-1 ring-emerald-400/30">
                    <GraduationCap className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] flex items-center space-x-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>NCISM VERIFIED</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug font-display">{col.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{col.city}, {col.state}</span>
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Affiliation Code:</span>
                    <span className="font-mono font-bold text-emerald-300">{col.ayushAffiliationNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Accreditation:</span>
                    <span className="font-semibold text-amber-300 text-[11px]">{col.accreditationGrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Sanctioned Intake:</span>
                    <span className="font-bold text-white">{col.sanctionedIntake} Seats / Batch</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Dean / Principal:</span>
                    <span className="text-zinc-300 text-[11px] font-medium">{col.principalName}</span>
                  </div>
                </div>

                {/* Uploaded Students Stat */}
                <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-zinc-300">Graduating Students Uploaded:</span>
                  <span className="font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                    {col.qualifiedStudentsCount} Qualified
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <Link
                  href={`/colleges/${col.id}/upload`}
                  className="threeui-tactile-btn flex-1 py-2 text-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-md border border-emerald-400/30 transition-all"
                >
                  Upload Students
                </Link>
                <Link
                  href={`/colleges/${col.id}/upload`}
                  className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 hover:bg-white/5 text-zinc-300 font-semibold text-xs transition-colors"
                >
                  Roster
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
