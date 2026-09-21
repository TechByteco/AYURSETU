"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ShieldCheck,
  Building2,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BorderTrail } from "@/components/core/border-trail";
import { Spotlight } from "@/components/core/spotlight";
import { SlidingNumber } from "@/components/core/sliding-number";
import { DynamicStreamConvergence, DynamicDotMatrix, DynamicConstellationField } from "@/components/threeui/ThreeUIWrappers";

// Mock Opportunities
const OPPORTUNITIES = [
  {
    id: "opp-1",
    title: "Clinical Panchakarma Fellow",
    organization: "All India Institute of Ayurveda (AIIA)",
    type: "Clinical Fellowship",
    location: "New Delhi",
    stipend: "₹45,000/mo",
    matchScore: 96,
    tags: ["Virechana", "Snehana", "NABH Clinical Audit"],
    category: "clinical"
  },
  {
    id: "opp-2",
    title: "Ayurvedic Formulation QC Specialist",
    organization: "Dabur Research & Development",
    type: "Industry Placement",
    location: "Ghaziabad, UP",
    stipend: "₹38,000/mo",
    matchScore: 92,
    tags: ["HPLC Standardization", "Pharmacognosy", "GMP"],
    category: "pharma"
  },
  {
    id: "opp-3",
    title: "Integrative Clinical Trial Coordinator",
    organization: "CCRAS Central Council",
    type: "Research Internship",
    location: "New Delhi / Remote",
    stipend: "₹32,000/mo",
    matchScore: 89,
    tags: ["ICMR Ethical Protocols", "GCP", "Patient Cohorts"],
    category: "trials"
  },
  {
    id: "opp-4",
    title: "Resident Ayurvedic Medical Officer",
    organization: "Kottakkal Arya Vaidya Sala",
    type: "Hospital Residency",
    location: "Malappuram, Kerala",
    stipend: "₹50,000/mo",
    matchScore: 94,
    tags: ["Inpatient Management", "Pinda Sweda", "Kerala Ayurveda"],
    category: "clinical"
  }
];

// Sparkline data for DOAP competency growth (Watermelon bento-1 style)
const SPARKLINE_BARS = [
  { month: "Jan", val: 35, top: 40, bottom: 5 },
  { month: "Feb", val: 48, top: 55, bottom: 7 },
  { month: "Mar", val: 62, top: 70, bottom: 8 },
  { month: "Apr", val: 55, top: 65, bottom: 10 },
  { month: "May", val: 78, top: 85, bottom: 7 },
  { month: "Jun", val: 82, top: 90, bottom: 8 },
  { month: "Jul", val: 70, top: 80, bottom: 10 },
  { month: "Aug", val: 88, top: 95, bottom: 7 },
  { month: "Sep", val: 94, top: 100, bottom: 6 },
  { month: "Oct", val: 91, top: 98, bottom: 7 },
  { month: "Nov", val: 96, top: 100, bottom: 4 },
  { month: "Dec", val: 100, top: 100, bottom: 0 },
];

export function WatermelonBento() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedOpp, setSelectedOpp] = useState<any | null>(null);
  const [appliedOpps, setAppliedOpps] = useState<string[]>([]);
  const [verifyInput, setVerifyInput] = useState<string>("AYUR-2026-AIIA-0042");

  const filteredOpportunities = activeCategory === "all"
    ? OPPORTUNITIES
    : OPPORTUNITIES.filter(o => o.category === activeCategory);

  const handleApply = (opp: any) => {
    if (!appliedOpps.includes(opp.id)) {
      setAppliedOpps(prev => [...prev, opp.id]);
    }
    setSelectedOpp(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Bento Grid Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Watermelon Bento Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mt-1.5">
            Real-Time Ayush Placement & Credential Matrix
          </h2>
        </div>
        <p className="text-zinc-300 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
          Live synchronized telemetry across Ministry-accredited institutions, NABH hospitals, and student DOAP clinical logs.
        </p>
      </div>

      {/* Main Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BENTO CARD 1: Live Opportunity Marketplace (Span 7) */}
        <div className="lg:col-span-7 rounded-[2.5rem] watermelon-card border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.8)] relative flex flex-col justify-between overflow-hidden group preserve-3d">
          {/* Top Specular Hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          {/* Mouse Spotlight */}
          <Spotlight
            size={400}
            className="from-emerald-400/25 via-teal-400/10 to-transparent"
          />

          {/* Neon BorderTrail */}
          <BorderTrail
            size={120}
            className="bg-gradient-to-l from-emerald-400 via-teal-300 to-amber-300 shadow-[0_0_24px_rgba(52,211,153,0.9)]"
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          />

          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header & Track Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
              <div>
                <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Vetted Vacancies
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  Industry & Hospital Postings
                </h3>
              </div>

              {/* Filter Pills with ThreeUI tactile keycap feel */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 text-xs backdrop-blur-md">
                {["all", "clinical", "pharma", "trials"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl font-semibold capitalize transition-all threeui-tactile-btn",
                      activeCategory === cat
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/60 ring-1 ring-emerald-400/40"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Opportunity Cards List */}
            <div className="mt-4 space-y-3">
              {filteredOpportunities.map((opp) => {
                const isApplied = appliedOpps.includes(opp.id);

                return (
                  <motion.div
                    key={opp.id}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="p-4 rounded-2xl glass-3d-subcard hover:border-emerald-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group/item"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold font-display text-white group-hover/item:text-emerald-300 transition-colors">
                          {opp.title}
                        </h4>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-0.5 shadow-sm">
                          <SlidingNumber value={opp.matchScore} />% Match
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300/90 flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-zinc-100">{opp.organization}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="flex items-center gap-1 text-zinc-300">
                          <MapPin className="w-3 h-3 text-emerald-400" /> {opp.location}
                        </span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-amber-300 font-bold">{opp.stipend}</span>
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {opp.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-zinc-200 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                      {isApplied ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedOpp(opp)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950/60 transition-all flex items-center gap-1 threeui-tactile-btn border border-emerald-400/30 hover:scale-105"
                        >
                          <span>Fast Apply</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
            <span className="text-xs text-zinc-300/80">
              Showing {filteredOpportunities.length} of 420+ accredited national vacancies
            </span>
            <Link
              href="/opportunities"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* BENTO CARD 2: Competency Growth Sparklines (Span 5) */}
        <div className="lg:col-span-5 rounded-[2.5rem] watermelon-card border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.8)] flex flex-col justify-between relative overflow-hidden group preserve-3d">
          {/* Top Specular Hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          {/* Mouse Spotlight */}
          <Spotlight
            size={320}
            className="from-amber-400/20 via-emerald-400/10 to-transparent"
          />

          {/* Neon BorderTrail */}
          <BorderTrail
            size={90}
            className="bg-gradient-to-r from-amber-400 via-emerald-400 to-transparent shadow-[0_0_18px_rgba(251,191,36,0.8)]"
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  DOAP Growth Engine
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  1-Year CRRI Velocity
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> +<SlidingNumber value={28.4} />% MoM
              </span>
            </div>

            <p className="text-xs text-zinc-300/80 leading-relaxed">
              Cumulative clinical procedures logged (Demonstrate → Observe → Assist → Perform) across all rotations.
            </p>

            {/* Watermelon bento-1 style vertical sparkline bars with ThreeUI kinetic stream */}
            <div className="p-4 rounded-2xl glass-3d-subcard relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <DynamicStreamConvergence speed={0.5} opacity={0.35} hue={135} fidelity={0.5} />
              </div>
              <div className="flex items-end justify-between h-32 gap-1.5 px-1 relative z-10">
                {SPARKLINE_BARS.map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end group/bar relative">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.val}%` }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.04 }}
                      className="w-full max-w-[14px] rounded-full bg-gradient-to-t from-emerald-600 via-teal-400 to-emerald-300 group-hover/bar:from-emerald-400 group-hover/bar:to-amber-300 transition-colors shadow-sm"
                    />
                    <span className="text-xs text-zinc-400 font-medium">{bar.month}</span>

                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-950/95 border border-white/20 text-white text-xs font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                      {bar.val}% velocity
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competency Level Distribution */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl glass-3d-subcard">
                <span className="text-xs uppercase text-zinc-300 font-bold tracking-wider">Perform (Solo)</span>
                <p className="text-xl sm:text-2xl font-black font-display text-white mt-1 flex items-center gap-1.5">
                  <SlidingNumber value={240} /> <span className="text-xs font-medium text-emerald-400">Procedures</span>
                </p>
              </div>
              <div className="p-3.5 rounded-2xl glass-3d-subcard">
                <span className="text-xs uppercase text-zinc-300 font-bold tracking-wider">Assist (Supervised)</span>
                <p className="text-xl sm:text-2xl font-black font-display text-white mt-1 flex items-center gap-1.5">
                  <SlidingNumber value={485} /> <span className="text-xs font-medium text-teal-400">Procedures</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
            <span className="text-xs text-zinc-300/80">NCISM Reg 15 (2022) Compliant</span>
            <Link
              href="/logbook"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>View e-Logbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* BENTO CARD 3: Instant Non-QR AUSID Verifier (Span 6) */}
        <div className="lg:col-span-6 rounded-[2.5rem] watermelon-card border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.8)] flex flex-col justify-between relative overflow-hidden group preserve-3d">
          {/* Top Specular Hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />

          {/* Mouse Spotlight */}
          <Spotlight
            size={340}
            className="from-teal-400/25 via-emerald-400/10 to-transparent"
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Zero-Friction Authentication
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  Instant AUSID Verifier Terminal
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300/80 mt-3 leading-relaxed">
              Direct verification of student credentials without requiring camera or QR scanner. Validates HMAC-SHA256 signature against Ministry ledger.
            </p>

            {/* Verification Input Box with ThreeUI DotMatrix interactive radar grid */}
            <div className="mt-4 p-5 rounded-2xl glass-3d-subcard relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <DynamicDotMatrix gridScale={32} mouseAmount={0.05} pulseSpeed={0.3} radius={0.12} opacity={0.35} hue={140} />
              </div>
              <div className="relative z-10">
                <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider block mb-2">
                  Enter Unique Ayush Student ID (AUSID)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={verifyInput}
                    onChange={(e) => setVerifyInput(e.target.value)}
                    placeholder="AYUR-2026-AIIA-0042"
                    className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-emerald-300 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 shadow-inner"
                  />
                  <Link
                    href={`/verify?id=${encodeURIComponent(verifyInput)}`}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 transition-all shrink-0 threeui-tactile-btn border border-emerald-400/30 hover:scale-105"
                  >
                    Verify Now
                  </Link>
                </div>

                {/* Quick Sample IDs with ThreeUI tactile keys */}
                <div className="mt-3.5 flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-zinc-400 font-medium">Quick Test:</span>
                  <button
                    type="button"
                    onClick={() => setVerifyInput("AYUR-2026-AIIA-0042")}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 transition-colors threeui-tactile-btn"
                  >
                    Aarav (AIIA)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerifyInput("AYUR-2026-NIA-0108")}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 transition-colors threeui-tactile-btn"
                  >
                    Diya (NIA)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerifyInput("AYUR-2026-NIH-0215")}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 transition-colors threeui-tactile-btn"
                  >
                    Rohan (NIH)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
            <span className="text-xs text-zinc-300/80">ABDM & Ayush Grid Compatible</span>
            <Link
              href="/verify"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Open Full Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* BENTO CARD 4: Accredited Ayush Colleges Network (Span 6) */}
        <div className="lg:col-span-6 rounded-[2.5rem] watermelon-card border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.8)] flex flex-col justify-between relative overflow-hidden group preserve-3d">
          {/* Top Specular Hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />

          {/* Mouse Spotlight */}
          <Spotlight
            size={340}
            className="from-teal-400/20 via-emerald-400/10 to-transparent"
          />

          {/* ThreeUI Constellation Network Background */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 pointer-events-none overflow-hidden opacity-25 rounded-full blur-[1px]">
            <DynamicConstellationField variant="constellation-field" speed={0.6} density={0.8} opacity={0.35} hue={160} />
          </div>

          <div className="relative z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
                    Accredited Institutions
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                    Institutional Graduate Registry
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-md">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300/80 mt-3 leading-relaxed">
                Government-verified colleges upload eligible graduates to mint tamper-proof Unique Ayush IDs with academic merit and internship rotations.
              </p>

              <div className="mt-4 space-y-2.5">
                {[
                  { name: "All India Institute of Ayurveda (AIIA)", city: "New Delhi", code: "AIIA-ND-01", count: 120, href: "/colleges/inst_aiia_001" },
                  { name: "National Institute of Ayurveda (NIA)", city: "Jaipur, Rajasthan", code: "NIA-JP-02", count: 95, href: "/colleges/inst_nia_002" },
                  { name: "Institute of Teaching & Research in Ayurveda", city: "Jamnagar, Gujarat", code: "ITRA-GJ-03", count: 85, href: "/colleges" },
                ].map((c, i) => (
                  <Link
                    key={i}
                    href={c.href}
                    className="p-3.5 rounded-2xl glass-3d-subcard hover:border-teal-400/40 transition-all flex items-center justify-between group threeui-tactile-btn"
                  >
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold font-display text-white group-hover:text-teal-300 transition-colors">
                        {c.name}
                      </h5>
                      <p className="text-xs text-zinc-400 mt-0.5">{c.city} • Code: <span className="font-mono text-zinc-300">{c.code}</span></p>
                    </div>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-xl flex items-center gap-1 shadow-sm shrink-0">
                      <SlidingNumber value={c.count} /> Graduates
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-300/80">850+ Accredited Institutions</span>
              <Link
                href="/colleges"
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors"
              >
                <span>Explore All Colleges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* 1-Click Fast Apply Modal */}
      <AnimatePresence>
        {selectedOpp && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full max-w-lg rounded-[2rem] bg-zinc-950 border border-emerald-500/30 p-6 sm:p-7 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Instant AI Placement Application
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedOpp.title}</h3>
                  <p className="text-xs text-zinc-400">{selectedOpp.organization} • {selectedOpp.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOpp(null)}
                  className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Applicant:</span>
                  <strong className="text-white">Dr. Aarav Sharma (AYUR-2026-AIIA-0042)</strong>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Graduation Merit:</span>
                  <strong className="text-amber-400">84.8% Marks • AIIA Rank 4/120</strong>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Calculated AI Match Score:</span>
                  <strong className="text-emerald-400 font-bold">{selectedOpp.matchScore}% Vector Match</strong>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed">
                By clicking submit, your cryptographically signed Ayush Skill Passport and DOAP e-logbook summary will be shared with the recruiter under ABDM data consent rules.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOpp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleApply(selectedOpp)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/40"
                >
                  Confirm & Transmit Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
