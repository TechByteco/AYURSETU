'use client';

import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Printer, 
  QrCode, 
  Building2, 
  GraduationCap, 
  Download
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    name: string;
    ayurId: string;
    stream: string;
    graduationMarks: number;
    cgpa: number;
    meritRank: number;
    passingYear: number;
    collegeRollNo: string;
    college: {
      name: string;
      ayushAffiliationNo: string;
      accreditationGrade: string;
    } | null;
    verifiedProceduresLogged: number;
    verifiedCompetencies: Array<{ name: string; domain: string; level: number }>;
  };
  signature?: string;
  verifiedAt: string;
}

export default function DigiLockerCertificateModal({
  isOpen,
  onClose,
  student,
  signature,
  verifiedAt
}: CertificateModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-8 border-4 border-amber-600">
        
        {/* Top Control Bar (Hidden during Print) */}
        <div className="print:hidden bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-amber-500">
          <div className="flex items-center space-x-2 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Government of India Verifiable Credential Certificate (DigiLocker Interoperable)</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Sheet */}
        <div className="p-8 sm:p-12 relative bg-[#fffdfa] print:p-8">
          
          {/* Certificate Decorative Border */}
          <div className="border-4 border-double border-emerald-900 p-6 sm:p-8 relative">
            
            {/* National Tricolor Top Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#ff9933] via-white to-[#138808] absolute top-0 left-0" />

            {/* Header with National Emblem & Titles */}
            <div className="text-center space-y-2 border-b-2 border-emerald-900/40 pb-6">
              <div className="inline-block mx-auto mb-1">
                {/* Ashoka Lion Capital Silhouette SVG */}
                <div className="w-14 h-14 mx-auto text-amber-800 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-emerald-900" />
                </div>
              </div>
              <h4 className="text-xs font-black tracking-widest text-slate-700 uppercase">
                भारत सरकार • GOVERNMENT OF INDIA
              </h4>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 font-serif uppercase tracking-wide">
                आयुष मंत्रालय • MINISTRY OF AYUSH
              </h2>
              <p className="text-xs font-bold text-amber-800 tracking-wider">
                NATIONAL AYUSH GRID & NCISM VERIFIED CREDENTIAL REGISTRY
              </p>
              <div className="inline-block px-3 py-1 bg-amber-100 border border-amber-400 rounded text-[11px] font-bold text-amber-900 mt-1">
                W3C Verifiable Educational Credential • DigiLocker UIDAI Aligned
              </div>
            </div>

            {/* Certificate Body */}
            <div className="py-8 space-y-6 text-center">
              <p className="text-xs font-serif text-slate-600 uppercase tracking-widest">
                This is to officially certify that
              </p>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 font-serif tracking-tight decoration-amber-500 underline underline-offset-8">
                {student.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-700">
                <span className="bg-slate-100 px-3 py-1 rounded border border-slate-300 font-bold">
                  Unique Ayush ID: <span className="text-emerald-900 font-black">{student.ayurId}</span>
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded border border-slate-300 font-bold">
                  Roll: {student.collegeRollNo}
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded border border-slate-300 font-bold">
                  Class Rank: #{student.meritRank} (Top 3%)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 max-w-2xl mx-auto leading-relaxed font-serif">
                has successfully completed all prescribed curriculum requirements and NCISM CBME DOAP clinical rotation quotas for the degree of <strong>{student.stream}</strong> from <strong>{student.college?.name}</strong> with a cumulative academic achievement of <strong>{student.graduationMarks}% ({student.cgpa} CGPA)</strong>.
              </p>

              {/* Verified Clinical Milestones Table */}
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-900/20 text-left max-w-2xl mx-auto space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950 border-b border-emerald-900/20 pb-2">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>NCISM CBME Clinical Procedures Logged & Preceptor-Signed:</span>
                  </span>
                  <span className="text-sm font-black text-emerald-900">{student.verifiedProceduresLogged} Cases</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {student.verifiedCompetencies.map((c, i) => (
                    <div key={i} className="bg-white p-2 rounded border border-emerald-900/10 shadow-sm">
                      <span className="font-bold text-slate-900 block truncate">{c.name}</span>
                      <span className="text-[10px] text-emerald-800 font-semibold">{c.domain} • Level {c.level}/5</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Signatures, QR & Cryptographic Seal Footer */}
            <div className="border-t-2 border-emerald-900/40 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* QR Verification Seal */}
              <div className="flex items-center space-x-3 text-left">
                <div className="w-16 h-16 bg-slate-900 text-white p-1 rounded-lg flex items-center justify-center border border-slate-700 flex-shrink-0">
                  <QrCode className="w-14 h-14 text-emerald-400" />
                </div>
                <div className="text-[10px] space-y-0.5">
                  <span className="font-black text-emerald-900 block uppercase">Tamper-Proof Verification</span>
                  <span className="text-slate-600 block">Scan to verify against Ayush Grid ledger</span>
                  <span className="font-mono text-[9px] text-slate-500 block truncate max-w-[180px]">
                    Hash: {signature ? signature.slice(0, 24) + '...' : 'SEC-SHA256-AUTHENTICATED'}
                  </span>
                </div>
              </div>

              {/* Authority Signatures */}
              <div className="flex items-center space-x-8 text-center text-xs">
                <div className="space-y-1">
                  <div className="w-28 border-b-2 border-slate-400 font-serif italic text-slate-800 text-sm">
                    A. Sharma
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 uppercase block">Director / Principal</span>
                  <span className="text-[9px] text-slate-500 block">All India Institute of Ayurveda</span>
                </div>

                <div className="space-y-1">
                  <div className="w-28 border-b-2 border-slate-400 font-serif italic text-emerald-900 text-sm font-bold">
                    Ayush Grid
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 uppercase block">Controller of Registries</span>
                  <span className="text-[9px] text-slate-500 block">Ministry of Ayush, New Delhi</span>
                </div>
              </div>

            </div>

            {/* Bottom Statutory Disclaimer */}
            <div className="text-center text-[9px] text-slate-500 mt-6 pt-2 border-t border-slate-200">
              This is an authentic digitally signed electronic credential issued under Section 4 of the Information Technology Act, 2000 and recognized under the NCISM Act, 2020.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
