'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  QrCode,
  Award,
  Building,
  Calendar,
  User,
  Hash,
  Search,
  ExternalLink,
  Lock,
  Cpu,
  Sparkles
} from 'lucide-react';

function PassportVerifyContent() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token') || 'vc_tok_ayush_2026_001';

  const [inputToken, setInputToken] = useState(tokenParam);
  const [activeToken, setActiveToken] = useState(tokenParam);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = (tokenToVerify: string) => {
    setLoading(true);
    fetch(`/api/credentials/verify?token=${encodeURIComponent(tokenToVerify)}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        setResult({ valid: false, error: 'Network or verification error' });
        setLoading(false);
      });
  };

  useEffect(() => {
    if (activeToken) {
      verifyToken(activeToken);
    }
  }, [activeToken]);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputToken.trim()) {
      setActiveToken(inputToken.trim());
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official Public Verifier • Ministry of Ayush Grid</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          W3C Verifiable Credential Validator
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          Cryptographically verify digital credentials issued to Ayush medical graduates, hospital interns, and researchers.
        </p>
      </div>

      {/* Verification Query Bar (Watermelon Glass) */}
      <form onSubmit={handleManualSearch} className="watermelon-card p-3.5 border border-emerald-500/30 shadow-xl flex gap-2.5">
        <div className="relative flex-1">
          <QrCode className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="token-verify-input"
            type="text"
            placeholder="Scan or enter QR verification token (e.g., vc_tok_ayush_2026_001)..."
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-black/50 border border-white/15 rounded-xl font-mono text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-400 outline-none"
          />
        </div>
        <button
          type="submit"
          id="btn-run-verify"
          className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md border border-emerald-400/40"
        >
          Verify Credential
        </button>
      </form>

      {/* Verification Result Card */}
      {loading ? (
        <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
          Validating cryptographic HMAC-SHA256 signature...
        </div>
      ) : result?.valid ? (
        <div className="watermelon-card border-2 border-emerald-400/50 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Green Valid Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center flex-shrink-0 shadow-lg ring-1 ring-emerald-300/40">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-extrabold text-emerald-300 uppercase tracking-wider font-display">
                    VALID W3C CREDENTIAL
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/40">
                    TAMPER-FREE
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mt-0.5">
                  Cryptographic HMAC-SHA256 signature matches metadata digest. No modification detected.
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-[11px] text-zinc-300">
              <p>Security Audit: <strong className="text-emerald-400">PASSED</strong></p>
              <p className="font-mono text-[10px] text-zinc-400">Anchor: Ayush Grid Ledger</p>
            </div>
          </div>

          {/* Credential Metadata Details */}
          <div className="space-y-4 text-xs">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Credential Subject
              </span>
              <h2 className="text-xl font-bold text-white mt-1 font-display">
                {result.credential?.metadata?.credentialSubject?.competencyTitle}
              </h2>
              <p className="text-zinc-400">Type: {result.credential?.type?.replace('_', ' ')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Credential Holder
                </span>
                <p className="font-bold text-white text-sm">{result.credential?.holder?.name}</p>
                <p className="text-zinc-400 text-[11px]">
                  Stream: <strong className="text-emerald-300">{result.credential?.holder?.stream || 'BAMS'}</strong>
                </p>
                {result.credential?.holder?.abhaId && (
                  <p className="text-zinc-400 text-[11px] font-mono">
                    ABHA ID: {result.credential?.holder?.abhaId}
                  </p>
                )}
              </div>

              <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Issuing Organization
                </span>
                <p className="font-bold text-white text-sm">
                  {result.credential?.metadata?.issuer?.name}
                </p>
                <p className="text-emerald-400 font-semibold text-[11px]">
                  Ayush Grid ID: {result.credential?.metadata?.issuer?.ayushGridId || 'AG-VERIFIED'}
                </p>
                <p className="text-zinc-400 text-[11px]">
                  Issue Date: {new Date(result.credential?.issuedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Cryptographic Proof Details */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2 font-mono text-[11px] text-zinc-300">
              <div className="flex justify-between">
                <span>QR Token:</span>
                <span className="font-bold text-amber-300">{result.credential?.qrToken}</span>
              </div>
              <div className="flex justify-between truncate">
                <span>Signature Digest (HMAC):</span>
                <span className="text-emerald-400 font-bold">{result.credential?.vcHash}</span>
              </div>
              <div className="flex justify-between">
                <span>Verification Authority:</span>
                <span className="text-zinc-400">Ministry of Ayush – AIIA National Trust Registry</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="watermelon-card border-2 border-rose-500/50 p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center space-x-3 text-rose-300">
            <XCircle className="w-8 h-8 text-rose-400 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider font-display">Invalid or Unverified Credential</h3>
              <p className="text-xs text-rose-300 mt-0.5">
                {result?.error || 'The token signature could not be verified against the Ayush Grid ledger.'}
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-400">
            Ensure you have entered an active QR token issued via the AyushSkillBridge platform.
          </p>
        </div>
      )}

      {/* Sample Demo Tokens for Judges */}
      <div className="watermelon-card p-5 border border-white/10 space-y-2.5">
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Demo Tokens Available for Testing (SIH Judges):</span>
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => {
              setInputToken('vc_tok_ayush_2026_001');
              setActiveToken('vc_tok_ayush_2026_001');
            }}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 font-mono hover:border-emerald-500/40 text-zinc-200 transition-colors"
          >
            vc_tok_ayush_2026_001 (Panchakarma Milestone)
          </button>
          <button
            onClick={() => {
              setInputToken('vc_tok_ayush_2026_002');
              setActiveToken('vc_tok_ayush_2026_002');
            }}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 font-mono hover:border-emerald-500/40 text-zinc-200 transition-colors"
          >
            vc_tok_ayush_2026_002 (HPLC Micro-Credential)
          </button>
          <button
            onClick={() => {
              setInputToken('vc_tok_ayush_2026_003');
              setActiveToken('vc_tok_ayush_2026_003');
            }}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 font-mono hover:border-emerald-500/40 text-zinc-200 transition-colors"
          >
            vc_tok_ayush_2026_003 (Ayush Grid EMR)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PassportVerifyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-400">Loading verifier...</div>}>
      <PassportVerifyContent />
    </Suspense>
  );
}
