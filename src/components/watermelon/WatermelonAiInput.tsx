"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Search,
  Zap,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronDown,
  CheckCircle2,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIModel {
  id: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const AI_MODELS: AIModel[] = [
  {
    id: "ayush-llama",
    name: "Ayush-Match 3.1",
    badge: "Clinical Match",
    icon: Brain,
    description: "Evaluates clinical DOAP logs, competency vectors & hospital fit",
  },
  {
    id: "gemini-health",
    name: "Ministry Gemini Pro",
    badge: "NCISM Regulatory",
    icon: Sparkles,
    description: "Assesses NCISM Reg 15 compliance, marks % & NAAC weightage",
  },
  {
    id: "ncism-vector",
    name: "NCISM Vector Engine",
    badge: "Syllabus Ontology",
    icon: Cpu,
    description: "Performs TF-IDF embedding search across 420+ accredited roles",
  },
];

const SUGGESTED_PROMPTS = [
  "Find Panchakarma clinical internships in Kerala or Delhi",
  "Verify student ID: AYUR-2026-AIIA-0042",
  "Show Pharma QC & HPLC vacancies with Dabur / Kottakkal",
  "Match BAMS graduate with >80% marks to NABH hospitals",
];

export function WatermelonAiInput() {
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    // Simulate multi-dimensional background AI inference
    setTimeout(() => {
      setIsSearching(false);
      if (q.toLowerCase().includes("verify") || q.includes("AYUR-")) {
        setSearchResult({
          type: "verify",
          title: "Cryptographic Dossier Found",
          id: "AYUR-2026-AIIA-0042",
          name: "Dr. Aarav Sharma",
          institution: "All India Institute of Ayurveda (AIIA), New Delhi",
          score: "84.8% Marks • Rank 4/120",
          link: "/verify?id=AYUR-2026-AIIA-0042",
          buttonText: "Open Authenticated Dossier",
        });
      } else if (q.toLowerCase().includes("pharma") || q.toLowerCase().includes("qc")) {
        setSearchResult({
          type: "opportunity",
          title: "AI Opportunity Match: 96.4% Fit",
          role: "Ayurvedic Formulation Quality Control Specialist",
          org: "Dabur Research & Development Centre",
          stipend: "₹38,000 / month",
          matchedVector: "HPLC-MS • Rasashastra Standardization • GLP Compliance",
          link: "/ayursetu",
          buttonText: "View on AYURSETU Matchmaker",
        });
      } else {
        setSearchResult({
          type: "opportunity",
          title: "AI Opportunity Match: 94.8% Fit",
          role: "Senior Panchakarma Clinical Fellow",
          org: "AIIA New Delhi - Dept of Kayachikitsa",
          stipend: "₹45,000 / month",
          matchedVector: "Virechana Protocol • Snehana/Swedana • Clinical Audits",
          link: "/opportunities",
          buttonText: "Explore & Fast Apply",
        });
      }
    }, 650);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Watermelon AI Prompt Bar */}
      <div className="relative rounded-3xl bg-zinc-950/80 border border-white/10 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl ring-1 ring-emerald-500/20">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Model Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-emerald-500/40 text-xs font-semibold text-zinc-200 transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <selectedModel.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-zinc-100">{selectedModel.name}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            <AnimatePresence>
              {modelDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute left-0 mt-2 w-72 rounded-2xl bg-zinc-900/95 border border-white/10 shadow-2xl p-2 z-50 backdrop-blur-xl"
                >
                  <div className="px-3 py-1.5 border-b border-white/5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Select Ayush AI Inference Engine
                  </div>
                  {AI_MODELS.map((model) => {
                    const Icon = model.icon;
                    return (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => {
                          setSelectedModel(model);
                          setModelDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-xl transition-all flex items-start gap-2.5 my-1",
                          selectedModel.id === model.id
                            ? "bg-emerald-500/15 border border-emerald-500/30 text-white"
                            : "hover:bg-zinc-800/60 text-zinc-300"
                        )}
                      >
                        <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-zinc-100">{model.name}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-emerald-400 font-medium">
                              {model.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">
                            {model.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Input Field */}
          <div className="relative flex-1 flex items-center">
            <Search className="w-4 h-4 text-zinc-400 ml-2.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ask AYURSETU AI... (e.g. match BAMS graduate to Dabur, or enter AUSID)"
              className="w-full bg-transparent px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            />
          </div>

          {/* Submit Search Button */}
          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={isSearching}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/40 transition-all disabled:opacity-50 shrink-0"
          >
            {isSearching ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Inferring...</span>
              </>
            ) : (
              <>
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none px-1">
          <span className="text-zinc-400 font-medium shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Prompts:
          </span>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuery(prompt);
                handleSearch(prompt);
              }}
              className="px-2.5 py-1 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-emerald-500/30 text-zinc-300 hover:text-white transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time AI Inference Result Card */}
      <AnimatePresence>
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mt-4 p-5 rounded-3xl bg-zinc-950/90 border border-emerald-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl ring-1 ring-emerald-500/20"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      {searchResult.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-white/10">
                      Engine: {selectedModel.name}
                    </span>
                  </div>

                  {searchResult.type === "verify" ? (
                    <div className="mt-1">
                      <h4 className="text-base font-bold text-white">{searchResult.name}</h4>
                      <p className="text-xs text-zinc-400">{searchResult.institution}</p>
                      <p className="text-xs text-amber-400 font-semibold mt-0.5">{searchResult.score}</p>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <h4 className="text-base font-bold text-white">{searchResult.role}</h4>
                      <p className="text-xs text-zinc-300 font-medium">{searchResult.org} • <span className="text-emerald-400">{searchResult.stipend}</span></p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Matched Competencies: {searchResult.matchedVector}</p>
                    </div>
                  )}
                </div>
              </div>

              <Link
                href={searchResult.link}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-900/40 transition-all shrink-0"
              >
                <span>{searchResult.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
