'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  QrCode,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Calendar,
  Building,
  User,
  Hash,
  Download,
  Share2,
  Sparkles,
  Lock,
  Cpu
} from 'lucide-react';

export default function PassportPage() {
  const [credentials, setCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/credentials/issue?userId=usr_student_aarav')
      .then((res) => res.json())
      .then((data) => {
        if (data.credentials) setCredentials(data.credentials);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>W3C Verifiable Credentials • Ayush Grid Anchor</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">Ayush Digital Skill Passport</h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
            Tamper-proof, cryptographically signed credentials for clinical milestones, internships, and micro-tasks anchored to your Unique Ayush ID.
          </p>
        </div>

        <Link
          href="/passport/verify?token=vc_tok_ayush_2026_001"
          className="threeui-tactile-btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2 self-start sm:self-auto shrink-0 transition-all"
        >
          <QrCode className="w-4 h-4" />
          <span>Open Public QR Verifier</span>
        </Link>
      </div>

      {/* Credentials Grid */}
      {loading ? (
        <div className="p-16 text-center text-xs text-zinc-400 watermelon-card animate-pulse">
          Loading Skill Passport credentials...
        </div>
      ) : credentials.length === 0 ? (
        <div className="watermelon-card p-12 text-center space-y-3">
          <Award className="w-10 h-10 text-zinc-600 mx-auto" />
          <p className="text-base font-bold text-white">No credentials issued yet.</p>
          <p className="text-xs text-zinc-400">
            Complete internships or reach 10+ advanced DOAP cases in your e-Logbook to unlock credentials.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="watermelon-card p-6 border-2 border-amber-400/30 hover:border-amber-400/60 shadow-xl flex flex-col justify-between space-y-5 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle gold shine aura */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40">
                    {cred.type.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center space-x-1 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cryptographically Signed</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mt-3 font-display">
                  {cred.metadata?.credentialSubject?.competencyTitle || 'Ayush Verified Credential'}
                </h3>

                <div className="mt-3.5 space-y-1.5 text-xs text-zinc-300">
                  <p className="flex items-center space-x-2">
                    <Building className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Issuer: <strong className="text-white">{cred.metadata?.issuer?.name}</strong></span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Candidate: <strong className="text-white">{cred.metadata?.credentialSubject?.name}</strong></span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Issued: {new Date(cred.issuedAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              {/* QR and Verification Block */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    QR Verification Token
                  </p>
                  <p className="font-mono text-xs font-bold text-amber-300">{cred.qrToken}</p>
                  <p className="text-[10px] text-zinc-500 font-mono truncate max-w-[180px]">
                    Hash: {cred.vcHash.slice(0, 16)}...
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-1.5 shrink-0">
                  {cred.qrDataUrl ? (
                    <img
                      src={cred.qrDataUrl}
                      alt="Credential QR Code"
                      className="w-16 h-16 rounded-xl border border-white/20 p-1 bg-white"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-black/50 border border-white/15 rounded-xl flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-zinc-500" />
                    </div>
                  )}

                  <Link
                    href={`/passport/verify?token=${cred.qrToken}`}
                    className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                  >
                    <span>Verify QR</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
