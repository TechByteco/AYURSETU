'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Sparkles
} from 'lucide-react';

const COMMON_COMPETENCIES = [
  { code: 'AY-PK-01', name: 'Shirodhara Medicated Oil Flow & Temperature Standardization', domain: 'CLINICAL' },
  { code: 'AY-PK-02', name: 'Niruha Basti Drug Emulsification & Administration Assistance', domain: 'CLINICAL' },
  { code: 'AY-PK-03', name: 'Nadi Pariksha Radial Pulse Gati & Vegam Assessment', domain: 'CLINICAL' },
  { code: 'AY-PK-04', name: 'Jalaukavacharana (Leech Therapy) in Dushta Vrana', domain: 'CLINICAL' },
  { code: 'AY-PK-09', name: 'Marma Stimulation for Neuromuscular Rehabilitation', domain: 'CLINICAL' },
  { code: 'AY-PH-01', name: 'HPLC Quantification of Active Markers in ASU Extracts', domain: 'PHARMA' },
  { code: 'AY-PH-02', name: 'HPTLC Fingerprinting of Triphala / Classical Formulations', domain: 'PHARMA' },
  { code: 'AY-DH-01', name: 'Ayush Grid NAMASTE Morbidity Coding & EMR Entry', domain: 'DIGITAL_HEALTH' }
];

export default function NewLogbookEntryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    competencyCode: 'AY-PK-01',
    competencyName: 'Shirodhara Medicated Oil Flow & Temperature Standardization',
    domain: 'CLINICAL',
    level: 'PE', // DO, OA, AP, PE
    count: 1,
    notes: 'Conducted 45 min Shirodhara procedure maintaining uniform temperature at 39°C with Ksheerabala taila.',
    attachmentUrl: 'https://storage.ayushbridge.gov.in/logbook/procedure_log_01.pdf',
    noPatientIdentifiableInfo: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCompetencySelect = (code: string) => {
    const comp = COMMON_COMPETENCIES.find((c) => c.code === code);
    if (comp) {
      setFormData((prev) => ({
        ...prev,
        competencyCode: comp.code,
        competencyName: comp.name,
        domain: comp.domain
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.noPatientIdentifiableInfo) {
      setErrorMsg('You must declare that no patient-identifiable data is included.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/logbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr_student_aarav',
          competencyCode: formData.competencyCode,
          competencyName: formData.competencyName,
          domain: formData.domain,
          level: formData.level,
          count: parseInt(formData.count.toString()),
          notes: formData.notes,
          attachments: formData.attachmentUrl ? [formData.attachmentUrl] : [],
          noPatientIdentifiableInfo: true
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit log entry');

      router.push('/logbook');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6 relative">
      <div className="mb-2">
        <Link
          href="/logbook"
          className="text-xs font-bold text-zinc-400 hover:text-emerald-300 flex items-center space-x-1.5 mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to e-Logbook</span>
        </Link>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>NCISM CBME Clinical Procedure Logging</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Log Clinical / Laboratory Case</h1>
        <p className="text-xs text-zinc-300 mt-1">
          Record procedure cases under the CBME DOAP framework for faculty mentor review and digital sign-off.
        </p>
      </div>

      <div className="watermelon-card p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Preset Competency Select */}
          <div>
            <label className="block font-semibold text-zinc-300 mb-1.5">
              Select Standard Competency (or custom code)
            </label>
            <select
              value={formData.competencyCode}
              onChange={(e) => handleCompetencySelect(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
            >
              {COMMON_COMPETENCIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                  [{c.code}] {c.name} ({c.domain})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="comp-code" className="block font-semibold text-zinc-300 mb-1.5">
                Competency Code *
              </label>
              <input
                id="comp-code"
                type="text"
                required
                value={formData.competencyCode}
                onChange={(e) => setFormData({ ...formData, competencyCode: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white font-mono focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="comp-domain" className="block font-semibold text-zinc-300 mb-1.5">
                Domain *
              </label>
              <select
                id="comp-domain"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                <option value="CLINICAL">CLINICAL</option>
                <option value="PHARMA">PHARMA</option>
                <option value="RESEARCH">RESEARCH</option>
                <option value="WELLNESS">WELLNESS</option>
                <option value="DIGITAL_HEALTH">DIGITAL_HEALTH</option>
                <option value="EMPLOYABILITY">EMPLOYABILITY</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="comp-name" className="block font-semibold text-zinc-300 mb-1.5">
              Competency / Procedure Title *
            </label>
            <input
              id="comp-name"
              type="text"
              required
              value={formData.competencyName}
              onChange={(e) => setFormData({ ...formData, competencyName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

          {/* DOAP Level & Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="comp-level" className="block font-semibold text-zinc-300 mb-1.5">
                DOAP Competency Level *
              </label>
              <select
                id="comp-level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-emerald-500/40 rounded-xl text-emerald-300 font-bold focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                <option value="DO">DO: Demonstrate (Presented / Modeled)</option>
                <option value="OA">OA: Observe (Observed with structured notes)</option>
                <option value="AP">AP: Assist (Assisted senior preceptor)</option>
                <option value="PE">PE: Perform (Independently executed)</option>
              </select>
            </div>

            <div>
              <label htmlFor="comp-count" className="block font-semibold text-zinc-300 mb-1.5">
                Number of Cases / Trials Completed *
              </label>
              <input
                id="comp-count"
                type="number"
                min="1"
                required
                value={formData.count}
                onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white font-mono focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="comp-notes" className="block font-semibold text-zinc-300 mb-1.5">
              Clinical Reflection & Procedural Notes
            </label>
            <textarea
              id="comp-notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-400 outline-none"
              placeholder="Detail instruments used, flow curves, temperatures, or observation..."
            />
          </div>

          {/* Mandatory Privacy Checkbox */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                id="privacy-consent-checkbox"
                type="checkbox"
                checked={formData.noPatientIdentifiableInfo}
                onChange={(e) => setFormData({ ...formData, noPatientIdentifiableInfo: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded bg-black/50 border-white/20 text-emerald-500 focus:ring-emerald-500"
              />
              <div>
                <p className="font-bold text-amber-300">
                  Mandatory Privacy & Ethical Compliance Declaration
                </p>
                <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                  I confirm that no patient-identifiable information (PHI), names, or confidential case identifiers are included in this log. Only counts, standardized parameters, and procedural observations are recorded.
                </p>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex justify-end gap-3">
            <Link
              href="/logbook"
              className="px-4 py-2.5 border border-white/15 rounded-xl text-zinc-400 font-semibold hover:bg-white/5 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              id="btn-save-log-entry"
              disabled={isSubmitting}
              className="threeui-tactile-btn px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40"
            >
              {isSubmitting ? 'Logging...' : 'Submit to Faculty Mentor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
