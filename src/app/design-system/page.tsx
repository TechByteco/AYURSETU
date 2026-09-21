'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Layers,
  Sparkles,
  ShieldCheck,
  Download,
  Copy,
  Check,
  Code,
  Sliders,
  Eye,
  ArrowRight,
  Sun,
  Moon,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Box
} from 'lucide-react';

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'figma'>('tokens');

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colorTokens = [
    { name: 'Ayush Forest 950', hex: '#030a06', desc: 'Universal Deep Obsidian Background', textClass: 'text-white' },
    { name: 'Ayush Emerald 500', hex: '#10b981', desc: 'Primary Interactive Brand Surface', textClass: 'text-white' },
    { name: 'Ayush Emerald 400', hex: '#34d399', desc: 'Verified Status Indicators & Glows', textClass: 'text-white' },
    { name: 'Ayush Saffron 400', hex: '#fbbf24', desc: 'National Emblem & Callout Accents', textClass: 'text-slate-900' },
    { name: 'Ayush Saffron 500', hex: '#f59e0b', desc: 'High-Priority Action Buttons', textClass: 'text-slate-900' },
    { name: 'Clinical Teal 700', hex: '#0f766e', desc: 'DOAP Procedure Badges & Clinical Logs', textClass: 'text-white' },
    { name: 'Surface Dark 900', hex: '#06170d', desc: 'Watermelon Frosted Glass Substrate', textClass: 'text-white' },
    { name: 'Card Border 500', hex: '#10b98133', desc: '3D Specular Sheen Rim Accent', textClass: 'text-white' }
  ];

  const typographyTokens = [
    { level: 'Display Hero (H1)', size: '48px - 64px', weight: '800 (Extrabold)', tracking: '-0.03em', font: 'Outfit / Plus Jakarta Sans' },
    { level: 'Section Headline (H2)', size: '28px - 36px', weight: '700 (Bold)', tracking: '-0.02em', font: 'Outfit / Plus Jakarta Sans' },
    { level: 'Card Title (H3)', size: '18px - 22px', weight: '700 (Bold)', tracking: '-0.01em', font: 'Outfit / Plus Jakarta Sans' },
    { level: 'Body Regular', size: '14px - 16px', weight: '400 (Normal)', tracking: 'Normal', font: 'Plus Jakarta Sans' },
    { level: 'Badge & Code Monospace', size: '11px - 13px', weight: '600 (Semibold)', tracking: '+0.05em', font: 'Fira Code / Geist Mono' }
  ];

  const w3cTokenPayload = {
    "$schema": "https://design-tokens.github.io/community-group/format/",
    "color": {
      "ayush": {
        "forest-950": { "$value": "#030a06", "$type": "color" },
        "forest-800": { "$value": "#064e3b", "$type": "color" },
        "emerald-500": { "$value": "#10b981", "$type": "color" },
        "saffron-400": { "$value": "#fbbf24", "$type": "color" },
        "saffron-500": { "$value": "#f59e0b", "$type": "color" },
        "teal-700": { "$value": "#0f766e", "$type": "color" }
      }
    },
    "borderRadius": {
      "card": { "$value": "24px", "$type": "dimension" },
      "pill": { "$value": "9999px", "$type": "dimension" }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8 relative">
      {/* Header Ribbon */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/40 shadow-sm">
            <Palette className="w-3.5 h-3.5" />
            <span>Design System & Token Studio</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            AyushDesign: High-Fidelity 3D UI System
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            Government of India digital service guidelines (GIGW) paired with 3D WebGL depth, tactile microinteractions, and W3C Design Tokens compatible with Figma, Penpot, and Style Dictionary.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => copyToClipboard(JSON.stringify(w3cTokenPayload, null, 2), 'all_tokens')}
            className="threeui-tactile-btn px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-lg border border-emerald-400/40"
          >
            {copiedToken === 'all_tokens' ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Tokens Copied!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export tokens.json</span>
              </>
            )}
          </button>
          <Link
            href="/"
            className="threeui-tactile-btn px-4 py-2.5 bg-black/40 hover:bg-black/60 text-zinc-300 border border-white/15 rounded-xl text-xs font-semibold transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('tokens')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'tokens'
              ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-sm font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Design Tokens (Color & Type)
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'components'
              ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-sm font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Live Component Showcase
        </button>
        <button
          onClick={() => setActiveTab('figma')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'figma'
              ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-sm font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Figma & Penpot Tool Integration
        </button>
      </div>

      {/* Tab 1: Design Tokens */}
      {activeTab === 'tokens' && (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center space-x-2 font-display">
                <Palette className="w-5 h-5 text-emerald-400" />
                <span>Official Color Tokens (W3C DTCG Format)</span>
              </h2>
              <span className="text-xs text-zinc-400">Click any card to copy HEX</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {colorTokens.map((t) => (
                <div
                  key={t.name}
                  onClick={() => copyToClipboard(t.hex, t.name)}
                  className="watermelon-card p-4 border border-white/10 hover:border-emerald-500/40 shadow-lg transition-all cursor-pointer group"
                >
                  <div
                    className={`w-full h-24 rounded-xl shadow-inner border border-white/10 flex items-end p-3 mb-3 ${t.textClass}`}
                    style={{ backgroundColor: t.hex }}
                  >
                    <span className="font-mono text-xs font-bold bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/15">
                      {t.hex}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-zinc-400">{t.desc}</p>
                    </div>
                    <span className="text-xs text-zinc-500">
                      {copiedToken === t.name ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 group-hover:text-zinc-300" />}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Tokens */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center space-x-2 font-display">
              <Box className="w-5 h-5 text-emerald-400" />
              <span>Typography Scale & Tracking Hierarchy</span>
            </h2>

            <div className="watermelon-card border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <table className="min-w-full divide-y divide-white/10 text-xs">
                <thead className="bg-black/50 font-bold text-zinc-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3 text-left">Level</th>
                    <th className="px-4 py-3 text-left">Size Scale</th>
                    <th className="px-4 py-3 text-left">Weight</th>
                    <th className="px-4 py-3 text-left">Tracking</th>
                    <th className="px-4 py-3 text-left">Font Stack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-medium text-zinc-300">
                  {typographyTokens.map((ty, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-bold text-white">{ty.level}</td>
                      <td className="px-4 py-3 font-mono text-amber-300">{ty.size}</td>
                      <td className="px-4 py-3">{ty.weight}</td>
                      <td className="px-4 py-3 font-mono text-emerald-400">{ty.tracking}</td>
                      <td className="px-4 py-3 text-zinc-400">{ty.font}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Components */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <h2 className="text-base font-bold text-white font-display">Live Component Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Holographic Card Variant */}
            <div className="watermelon-card p-6 border-2 border-emerald-400/40 shadow-2xl relative overflow-hidden group">
              <div className="space-y-4">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                  HOLOGRAPHIC COMPONENT
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white font-display">Ayush Holographic Card Variant</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Designed with multi-layered specular reflections, anti-aliased font metrics, and verified badge indicators.
                </p>
                <div className="p-3.5 bg-black/40 rounded-xl backdrop-blur-md border border-white/15 flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-300 font-bold">AYUR-2026-AIIA-0042</span>
                  <span className="text-emerald-400 font-bold">84.5% Merit</span>
                </div>
              </div>
            </div>

            {/* Status Pill Component */}
            <div className="watermelon-card p-6 border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Verification Pill Indicators
              </h3>
              <p className="text-xs text-zinc-400">
                Semantic status badges engineered for high accessibility contrast in medical applications.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3 py-1 bg-emerald-950/80 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/40 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Government Authenticated</span>
                </span>
                <span className="px-3 py-1 bg-amber-950/80 text-amber-300 text-xs font-bold rounded-full border border-amber-500/40">
                  DOAP Level PE (92%)
                </span>
                <span className="px-3 py-1 bg-teal-950/80 text-teal-300 text-xs font-bold rounded-full border border-teal-500/40">
                  NCISM Category-1
                </span>
                <span className="px-3 py-1 bg-indigo-950/80 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/40">
                  Schedule T GMP
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Figma & Penpot Guide */}
      {activeTab === 'figma' && (
        <div className="watermelon-card p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white font-display">Integrating with Open Design Tools</h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Connect our production UI with professional design environments using industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold">
                <ExternalLink className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Figma Tokens Studio</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Import our exported <code>tokens.json</code> directly into the Tokens Studio plugin in Figma to synchronize styles with developer code in real-time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold">
                <Laptop className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Penpot (Open Source)</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Penpot natively consumes our CSS variables, typography scales, and SVG icons without vendor lock-in.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold">
                <Code className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Tailwind CSS Pipeline</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All color variables map 1:1 to Tailwind utilities, giving developers instant access to the design system with zero manual conversion.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
