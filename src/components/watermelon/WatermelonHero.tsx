"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  User,
  GraduationCap
} from "lucide-react";
import { WatermelonAiInput } from "./WatermelonAiInput";
import { cn } from "@/lib/utils";
import { SlidingNumber } from "@/components/core/sliding-number";
import { Tilt } from "@/components/core/tilt";
import { DynamicStreamConvergence, DynamicOrbitalSphere } from "@/components/threeui/ThreeUIWrappers";

interface CandidatePersona {
  id: string;
  ausid: string;
  name: string;
  stream: string;
  college: string;
  marksPct: number;
  cgpa: number;
  rank: string;
  avatar: string;
  skills: string[];
  matchScore: number;
  doapLevel: string;
}

const CANDIDATES: CandidatePersona[] = [
  {
    id: "aarav",
    ausid: "AYUR-2026-AIIA-0042",
    name: "Dr. Aarav Sharma",
    stream: "BAMS (Ayurveda Medicine)",
    college: "All India Institute of Ayurveda (AIIA), New Delhi",
    marksPct: 84.8,
    cgpa: 8.9,
    rank: "Rank 4 / 120",
    avatar: "AS",
    skills: ["Panchakarma (Virechana)", "Dravyaguna Analysis", "Pulse Diagnosis (Nadi)", "Clinical Audits"],
    matchScore: 96,
    doapLevel: "Perform (Level 4 - Solo Clinician)"
  },
  {
    id: "diya",
    ausid: "AYUR-2026-NIA-0108",
    name: "Diya Nair",
    stream: "M.Pharm Ayush (QC & Standardisation)",
    college: "National Institute of Ayurveda (NIA), Jaipur",
    marksPct: 88.2,
    cgpa: 9.3,
    rank: "Rank 1 / 45",
    avatar: "DN",
    skills: ["HPLC Standardization", "Phytochemical Profiling", "Rasashastra GMP", "Heavy Metal Testing"],
    matchScore: 92,
    doapLevel: "Perform (Level 4 - Lead Analyst)"
  },
  {
    id: "rohan",
    ausid: "AYUR-2026-NIH-0215",
    name: "Dr. Rohan Sen",
    stream: "BHMS (Homoeopathic Medicine)",
    college: "National Institute of Homoeopathy (NIH), Kolkata",
    marksPct: 79.5,
    cgpa: 8.2,
    rank: "Rank 12 / 95",
    avatar: "RS",
    skills: ["Organon of Medicine", "Miasmatic Repertorization", "Clinical Trials", "Pediatric Homoeopathy"],
    matchScore: 89,
    doapLevel: "Perform (Level 4 - Senior Resident)"
  }
];

export function WatermelonHero() {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidatePersona>(CANDIDATES[0]);

  return (
    <div className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Glows & ThreeUI Atmospheric Stream */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden -z-10">
        <DynamicStreamConvergence speed={0.4} opacity={0.3} hue={140} fidelity={0.4} />
      </div>

      {/* Top National Trust Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-emerald-500/30 shadow-lg backdrop-blur-xl text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-emerald-400">SIH26044</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300 font-medium">Ministry of Ayush & AIIA Approved</span>
          <span className="text-zinc-600">•</span>
          <span className="text-amber-400 font-bold">NCISM Reg 15 Compliant</span>
        </div>
      </motion.div>

      {/* Main Headline & Description */}
      <div className="text-center mt-7 max-w-4xl mx-auto space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight leading-[1.06] drop-shadow-xl"
        >
          AYURSETU <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            Academia–Industry Skill Bridge
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-200/95 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto drop-shadow-sm"
        >
          Connecting government-accredited Ayush colleges, verified graduates, and premier hospitals & pharma industries with tamper-proof <strong className="text-emerald-300 font-semibold">Unique Ayush IDs (AUSID)</strong> and background vector AI matching.
        </motion.p>
      </div>

      {/* Integrated Watermelon AI Prompt Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="mt-8"
      >
        <WatermelonAiInput />
      </motion.div>

      {/* Interactive Candidate Holographic Switcher Cockpit */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mt-14 max-w-4xl mx-auto"
      >
        {/* Candidate Selector Tabs with ThreeUI tactile keys */}
        <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl mb-4 overflow-x-auto scrollbar-none">
          {CANDIDATES.map((cand) => (
            <button
              key={cand.id}
              onClick={() => setSelectedCandidate(cand)}
              className={cn(
                "flex-1 min-w-[200px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-all threeui-tactile-btn",
                selectedCandidate.id === cand.id
                  ? "bg-gradient-to-r from-zinc-900 to-zinc-800/90 border border-emerald-500/50 shadow-lg text-white ring-1 ring-emerald-400/30"
                  : "hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 border border-transparent"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all",
                selectedCandidate.id === cand.id ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/50" : "bg-zinc-800 text-zinc-400"
              )}>
                {cand.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate text-zinc-100">{cand.name}</div>
                <div className="text-[10px] font-mono text-zinc-400 truncate">{cand.ausid}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Live 3D Holographic Card Display with Tilt Physics */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCandidate.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-full"
          >
            <Tilt rotationFactor={8} className="w-full">
              <div className="rounded-[2.5rem] watermelon-card border border-white/15 p-6 sm:p-9 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden preserve-3d">
                {/* Top specular highlight hairline */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                
                {/* ThreeUI 3D Orbital Sphere Hologram */}
                <div className="absolute -right-24 -top-24 w-80 h-80 pointer-events-none overflow-hidden opacity-25 rounded-full blur-[1px]">
                  <DynamicOrbitalSphere speed={0.7} scale={0.8} particleOpacity={0.5} orbitOpacity={0.25} />
                </div>

                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700 flex items-center justify-center text-white text-xl font-black shadow-xl shadow-emerald-950/60 ring-2 ring-emerald-400/40">
                      {selectedCandidate.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">{selectedCandidate.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold tracking-wide flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          VERIFIED AUSID
                        </span>
                      </div>
                      <p className="text-sm text-emerald-200/90 font-medium mt-1">{selectedCandidate.stream}</p>
                      <p className="text-xs text-zinc-300/80">{selectedCandidate.college}</p>
                    </div>
                  </div>

                  {/* ID & Verification Button with ThreeUI tactile styling */}
                  <div className="flex flex-col sm:items-end gap-2">
                    <span className="text-xs font-mono text-emerald-300 font-bold px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/40 shadow-inner">
                      {selectedCandidate.ausid}
                    </span>
                    <Link
                      href={`/verify?id=${selectedCandidate.ausid}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold threeui-tactile-btn border border-emerald-400/30 transition-all shadow-md"
                    >
                      <span>Instant Verification Console</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Candidate Metric 3D Badges */}
                <div 
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-6"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <div className="p-4 rounded-2xl glass-3d-subcard group">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300/90">Graduation Marks</span>
                    <div className="text-2xl sm:text-3xl font-black font-display text-amber-300 mt-1 flex items-center">
                      <SlidingNumber value={selectedCandidate.marksPct} />%
                    </div>
                    <span className="text-xs text-zinc-400">University Score</span>
                  </div>

                  <div className="p-4 rounded-2xl glass-3d-subcard group">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300/90">Institutional Rank</span>
                    <p className="text-2xl sm:text-3xl font-black font-display text-emerald-300 mt-1">{selectedCandidate.rank}</p>
                    <span className="text-xs text-zinc-400">Merit Ledger</span>
                  </div>

                  <div className="p-4 rounded-2xl glass-3d-subcard group">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300/90">DOAP Competency</span>
                    <p className="text-sm font-bold text-teal-300 mt-1.5 leading-snug">{selectedCandidate.doapLevel}</p>
                    <span className="text-xs text-zinc-400">Logged in e-Logbook</span>
                  </div>

                  <div className="p-4 rounded-2xl glass-3d-subcard group">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300/90">AI Match Score</span>
                    <div className="text-2xl sm:text-3xl font-black font-display text-emerald-300 mt-1 flex items-center">
                      <SlidingNumber value={selectedCandidate.matchScore} />%
                    </div>
                    <span className="text-xs text-zinc-400">Optimal Placement Fit</span>
                  </div>
                </div>

                {/* Skills & Action */}
                <div 
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/10"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-zinc-300 mr-1">Verified Clinical Skills:</span>
                    {selectedCandidate.skills.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-zinc-200 font-medium hover:border-emerald-400/40 transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/ayursetu"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-1.5 shrink-0 transition-all hover:scale-105"
                  >
                    <span>Enter AYURSETU Portal</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Trust & Scale Metrics Row */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          { label: "Accredited Ayush Colleges", num: 850, suffix: "+", sub: "NCISM / NCH Verified" },
          { label: "Qualified Graduates", num: 14200, suffix: "+", sub: "With Minted Unique IDs" },
          { label: "Hospitals & Pharma Labs", num: 420, suffix: "+", sub: "NABH / NABL Accredited" },
          { label: "AI Match Precision", num: 94.6, suffix: "%", sub: "Multi-Vector Fit Rate" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl glass-3d-subcard text-center hover:scale-[1.03] transition-all duration-300 shadow-xl border border-white/10"
          >
            <div className="text-3xl sm:text-4xl font-black font-display text-white flex items-center justify-center gap-0.5">
              <SlidingNumber value={stat.num} />
              <span>{stat.suffix}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">{stat.label}</p>
            <p className="text-xs text-zinc-300/80">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
