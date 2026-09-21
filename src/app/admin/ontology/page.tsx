'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  ArrowLeft
} from 'lucide-react';

export default function OntologyManagerPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('role_pk_tech');
  const [docName, setDocName] = useState<string>('CCRAS_Panchakarma_Clinical_Guidelines_2026.pdf');
  const [docText, setDocText] = useState<string>(
    'The trainee must demonstrate competence in Shirodhara medicated oil temperature stabilization at 38-40C, Nadi Pariksha pulse examination across Tridosha, and adhere to Schedule T GMP documentation with HPLC standardized herbal formulations for hospital safety.'
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [ontologyResult, setOntologyResult] = useState<any>(null);

  useEffect(() => {
    fetch('/api/roles')
      .then((res) => res.json())
      .then((data) => {
        if (data.roles) {
          setRoles(data.roles);
        }
      })
      .catch(() => {});
  }, []);

  const handleExtractAndIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch('/api/admin/ontology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: docText,
          roleId: selectedRoleId,
          documentName: docName
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ingestion failed');

      setOntologyResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
            <BrainCircuit className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Knowledge Graph & Curriculum Ingestion</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">National Ayush Skill Ontology Studio</h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
            Ingest CCRAS training protocols and curriculum revisions to automatically extract competencies and recalibrate Role-Skill ontology weights.
          </p>
        </div>

        <Link
          href="/admin/organizations"
          className="text-xs font-bold text-zinc-400 hover:text-emerald-300 flex items-center space-x-1.5 transition-colors self-start sm:self-auto shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Moderation</span>
        </Link>
      </div>

      {/* Ingestion Studio Form */}
      <div className="watermelon-card p-6 sm:p-8 border border-white/10 shadow-xl space-y-5">
        <form onSubmit={handleExtractAndIngest} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="select-target-role" className="block font-semibold text-zinc-300 mb-1.5">
                Target Role for Ontology Calibration *
              </label>
              <select
                id="select-target-role"
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id} className="bg-zinc-900 text-white">
                    {r.title} ({r.domain})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="input-doc-name" className="block font-semibold text-zinc-300 mb-1.5">
                Document File Name / Reference Code *
              </label>
              <input
                id="input-doc-name"
                type="text"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="input-doc-text" className="block font-semibold text-zinc-300 mb-1.5">
              Curriculum Excerpt / CCRAS Guideline Text *
            </label>
            <textarea
              id="input-doc-text"
              rows={4}
              required
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-sans leading-relaxed focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[11px] text-zinc-400">
              Triggers NLP pipeline & updates vector ontology weights in database.
            </span>

            <button
              type="submit"
              id="btn-run-ontology-extract"
              disabled={isProcessing}
              className="threeui-tactile-btn px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isProcessing ? 'Ingesting via AI...' : 'Extract & Calibrate Ontology'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Before / After Calibration Comparison Result */}
      {ontologyResult && (
        <div className="watermelon-card border-2 border-emerald-400/50 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center space-x-2 text-emerald-300 border-b border-white/10 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold font-display">
              Ontology Calibrated for: {ontologyResult.roleTitle}
            </h2>
          </div>

          {/* Newly extracted skills pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              AI-Extracted Competencies Identified in Document
            </span>
            <div className="flex flex-wrap gap-2">
              {ontologyResult.extractedSkills?.map((s: any, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{s.name}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">({(s.confidence * 100).toFixed(0)}%)</span>
                </span>
              ))}
            </div>
          </div>

          {/* Before vs After Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Before */}
            <div className="bg-black/40 rounded-xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-zinc-400 pb-2 border-b border-white/10">
                <span>Pre-Ingestion Ontology</span>
                <span>{ontologyResult.skillsBeforeCount} mapped skills</span>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto divide-y divide-white/5">
                {ontologyResult.roleSkillsBefore?.map((rs: any, i: number) => (
                  <div key={i} className="flex justify-between py-1.5 text-zinc-400">
                    <span className="truncate max-w-[200px]">{rs.name}</span>
                    <span className="font-mono font-semibold text-zinc-300">Weight: {rs.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="bg-emerald-950/40 rounded-xl p-4 border border-emerald-500/30 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-emerald-300 pb-2 border-b border-emerald-500/30">
                <span>Post-Ingestion Calibrated Ontology</span>
                <span className="text-emerald-400 font-bold">{ontologyResult.skillsAfterCount} mapped skills</span>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto divide-y divide-emerald-500/10">
                {ontologyResult.roleSkillsAfter?.map((rs: any, i: number) => (
                  <div key={i} className="flex justify-between py-1.5 text-emerald-200">
                    <span className="truncate max-w-[200px] font-semibold">{rs.name}</span>
                    <span className="font-mono font-bold text-emerald-400">Weight: {rs.weight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
