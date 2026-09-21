'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building2,
  GraduationCap,
  Award,
  Stethoscope,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  FileCheck,
  BadgeCheck,
  Fingerprint,
  Cpu,
  Lock,
  Printer,
  QrCode
} from 'lucide-react';
import { DynamicDotMatrix } from '@/components/threeui/ThreeUIWrappers';
import DigiLockerCertificateModal from '@/components/gov/DigiLockerCertificateModal';

interface VerificationResult {
  valid: boolean;
  verificationStatus: string;
  seal: string;
  cryptographicSignature?: string;
  tamperProofCheck?: string;
  verifiedAt: string;
  student: {
    name: string;
    ayurId: string;
    stream: string;
    year: string;
    graduationMarks: number;
    cgpa: number;
    meritRank: number;
    collegeRollNo: string;
    passingYear: number;
    isCollegeVerified: boolean;
    college: {
      name: string;
      ayushAffiliationNo: string;
      accreditationGrade: string;
      principalName: string;
    } | null;
    verifiedProceduresLogged: number;
    verifiedCompetencies: Array<{
      name: string;
      domain: string;
      level: number;
    }>;
  };
  error?: string;
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [searchId, setSearchId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  useEffect(() => {
    if (initialId) {
      handleLookup(initialId);
    }
  }, [initialId]);

  const handleLookup = async (idToSearch?: string) => {
    const targetId = (idToSearch || searchId).trim();
    if (!targetId) {
      setError('Please enter a valid Unique Ayush Student ID (e.g. AYUR-2026-AIIA-0042)');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/verify/' + encodeURIComponent(targetId));
      const data = await res.json();

      if (!res.ok || !data.valid) {
        setError(data.error || 'No verified student record found for this ID.');
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Ayush Verification Gateway.');
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = () => {
    if (typeof window !== 'undefined' && result) {
      const url = window.location.origin + '/verify?id=' + result.student.ayurId;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative">
      {/* ThreeUI Dynamic Dot Matrix Scanfield */}
      <div className="fixed inset-0 pointer-events-none opacity-15 overflow-hidden -z-10">
        <DynamicDotMatrix gridScale={35} pulseSpeed={0.3} radius={0.12} opacity={0.35} hue={140} />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold tracking-wide uppercase shadow-lg border border-emerald-500/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Ayush National Verification Ledger</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Unique Ayush Student ID Verification Console
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Hospitals, research laboratories, and corporate recruiters can authenticate academic merit, graduation percentage, institutional affiliation, and clinical competency directly against the Ministry of Ayush directory.
          </p>
        </div>

        {/* Search Bar Terminal (Watermelon Glass) */}
        <div className="watermelon-card p-5 sm:p-7 border border-emerald-500/30 shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-400/80" />
              </div>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Unique Ayush ID (e.g. AYUR-2026-AIIA-0042)"
                className="block w-full pl-10 pr-4 py-3.5 bg-black/50 border border-emerald-500/30 rounded-xl text-sm sm:text-base text-white font-mono placeholder:font-sans placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="threeui-tactile-btn px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-950/60 border border-emerald-400/40 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shrink-0"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scanning Registry...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  <span>Verify Credential</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-sets */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-400 font-medium flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Test AUSIDs:</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchId('AYUR-2026-AIIA-0042');
                handleLookup('AYUR-2026-AIIA-0042');
              }}
              className="px-3 py-1 bg-emerald-950/70 text-emerald-300 hover:bg-emerald-900/80 font-mono rounded-lg border border-emerald-500/30 transition-colors"
            >
              AYUR-2026-AIIA-0042 (Aarav • AIIA)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchId('AYUR-2026-AIIA-0089');
                handleLookup('AYUR-2026-AIIA-0089');
              }}
              className="px-3 py-1 bg-teal-950/70 text-teal-300 hover:bg-teal-900/80 font-mono rounded-lg border border-teal-500/30 transition-colors"
            >
              AYUR-2026-AIIA-0089 (Diya • Rank 1)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchId('AYUR-2026-BHMS-0104');
                handleLookup('AYUR-2026-BHMS-0104');
              }}
              className="px-3 py-1 bg-indigo-950/70 text-indigo-300 hover:bg-indigo-900/80 font-mono rounded-lg border border-indigo-500/30 transition-colors"
            >
              AYUR-2026-BHMS-0104 (Rohan • NIH)
            </button>
          </div>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="p-5 bg-rose-950/80 border border-rose-500/40 rounded-2xl flex items-start space-x-3 text-rose-200 shadow-xl">
            <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="font-bold text-sm">Credential Verification Failed</p>
              <p className="text-xs sm:text-sm text-rose-300">{error}</p>
              <p className="text-xs text-rose-400 mt-1">
                Please confirm the ID was correctly uploaded by an authorized college authority in the{' '}
                <Link href="/colleges" className="underline font-semibold hover:text-white">
                  Ayush Colleges Directory
                </Link>.
              </p>
            </div>
          </div>
        )}

        {/* Success Verified Dossier Card (3D Watermelon Style) */}
        {result && result.student && (
          <div className="watermelon-card border-2 border-emerald-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.2)] overflow-hidden transition-all duration-300">
            
            {/* Dossier Header Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border-b border-emerald-500/30 text-white p-6 sm:p-8 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    <span>Government Authenticated Dossier</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                    {result.student.name}
                  </h2>
                  <p className="text-emerald-200/90 text-xs sm:text-sm flex flex-wrap items-center gap-2">
                    <span>{result.student.stream} Graduate</span>
                    <span>•</span>
                    <span>Batch of {result.student.passingYear}</span>
                    <span>•</span>
                    <span className="font-mono">Roll #{result.student.collegeRollNo}</span>
                  </p>
                </div>

                {/* Unique ID Badge & Actions */}
                <div className="flex flex-col items-start sm:items-end space-y-2">
                  <div className="bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-xl border border-emerald-500/30 text-left sm:text-right">
                    <span className="text-[10px] uppercase font-semibold text-emerald-400 block tracking-wider">
                      Unique Ayush ID
                    </span>
                    <span className="font-mono text-base sm:text-lg font-extrabold text-amber-300">
                      {result.student.ayurId}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={copyShareLink}
                      className="threeui-tactile-btn inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-xs font-semibold text-emerald-200 transition-colors border border-emerald-500/40"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setCertModalOpen(true)}
                      className="threeui-tactile-btn inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs font-black text-slate-950 transition-colors shadow"
                    >
                      <Award className="w-3.5 h-3.5 text-slate-950" />
                      <span>DigiLocker Certificate</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="threeui-tactile-btn inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-xs font-semibold text-zinc-300 transition-colors border border-white/15"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptographic Proof Ribbon */}
            {result.cryptographicSignature && (
              <div className="bg-black/60 border-b border-emerald-500/20 px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Immutable HMAC-SHA256 Signature:</span>
                  <span className="text-zinc-300 truncate max-w-xs">{result.cryptographicSignature}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-amber-300">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Tamper-Proof: PASS</span>
                </div>
              </div>
            )}

            {/* Academic Merit & College Seal Grid */}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 text-center space-y-1">
                  <div className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                    Graduation Marks
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display">
                    {result.student.graduationMarks}%
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium">Verified by Dean</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-teal-500/30 text-center space-y-1">
                  <div className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">
                    Cumulative CGPA
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-display">
                    {result.student.cgpa} / 10
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium">NCISM Grade Scale</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30 text-center space-y-1">
                  <div className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
                    Institutional Rank
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-300 font-display">
                    #{result.student.meritRank}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium">Cohort Standing</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-indigo-500/30 text-center space-y-1">
                  <div className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">
                    Clinical Procedures
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-display">
                    {result.student.verifiedProceduresLogged}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium">DOAP Faculty Signed</div>
                </div>
              </div>

              {/* Institution Details */}
              {result.student.college && (
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shrink-0 shadow-md ring-1 ring-emerald-400/40">
                      <Building2 className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                        Conferring Accredited Institution
                      </div>
                      <h4 className="font-bold text-white text-base">
                        {result.student.college.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        Principal/Dean: {result.student.college.principalName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-right">
                      <div className="text-[9px] text-zinc-400 font-semibold uppercase">Affiliation No.</div>
                      <div className="font-mono font-bold text-emerald-300 text-[11px]">
                        {result.student.college.ayushAffiliationNo}
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-300">
                      Grade {result.student.college.accreditationGrade}
                    </div>
                  </div>
                </div>
              )}

              {/* Verified Competency Matrix */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Verified Practical Competencies (CBME Mapped)</span>
                  </h3>
                  <span className="text-xs text-zinc-400">
                    {result.student.verifiedCompetencies.length} Competencies Certified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.student.verifiedCompetencies.map((comp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-white/10 bg-black/30 hover:border-emerald-500/30 transition-colors flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold text-xs sm:text-sm text-white">{comp.name}</p>
                        <span className="inline-block text-[10px] font-medium text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                          {comp.domain}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <div
                            key={lvl}
                            className={`w-2.5 h-2.5 rounded-full ${
                              lvl <= comp.level
                                ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                                : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Digitally validated by Ministry of Ayush Academic Credential Registry under National Ayush Grid standards.
                  </span>
                </div>
                <div className="font-mono text-[11px] text-zinc-500">
                  Verified at: {new Date(result.verifiedAt).toLocaleString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                <Link
                  href="/ayursetu"
                  className="threeui-tactile-btn px-4 py-2 text-xs font-bold text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900 rounded-xl border border-emerald-500/40 transition-colors flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open AYURSETU Student Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* DigiLocker Official Government Certificate Modal */}
        {result && (
          <DigiLockerCertificateModal
            isOpen={certModalOpen}
            onClose={() => setCertModalOpen(false)}
            student={result.student}
            signature={result.cryptographicSignature}
            verifiedAt={result.verifiedAt}
          />
        )}

      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
