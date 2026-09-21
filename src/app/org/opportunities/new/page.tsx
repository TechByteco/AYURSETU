'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Briefcase
} from 'lucide-react';

export default function NewOpportunityPage() {
  const router = useRouter();
  const [allSkills, setAllSkills] = useState<any[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: 'Panchakarma & Clinical Rehabilitation Fellowship',
    type: 'INTERNSHIP',
    description: 'Intensive hands-on internship in classical Keraleeya Panchakarma procedures, patient intake, Nadi Pariksha, and supervised Shirodhara execution.',
    stipend: 20000,
    durationWeeks: 12,
    location: 'Malappuram, Kerala',
    remote: false,
    mentorName: 'Dr. Suresh Warrier',
    mentorTitle: 'Chief Preceptor',
    nsqfLevel: 6,
    requiredSkills: [
      { skillId: 'sk_pk_01', name: 'Panchakarma Procedures & Purvakarma', minLevel: 'INTERMEDIATE' },
      { skillId: 'sk_pk_02', name: 'Shirodhara & Murdhni Taila', minLevel: 'INTERMEDIATE' },
      { skillId: 'sk_pk_07', name: 'Nadi Pariksha (Pulse Diagnosis)', minLevel: 'BASIC' },
      { skillId: 'sk_pk_08', name: 'Prakriti & Vikriti Evaluation', minLevel: 'INTERMEDIATE' },
      { skillId: 'sk_em_01', name: 'Patient Communication & Empathic History Taking', minLevel: 'INTERMEDIATE' }
    ]
  });

  const [selectedSkillToAdd, setSelectedSkillToAdd] = useState('');
  const [selectedLevelToAdd, setSelectedLevelToAdd] = useState('INTERMEDIATE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        if (data.skills) {
          setAllSkills(data.skills);
          if (data.skills.length > 0) {
            setSelectedSkillToAdd(data.skills[0].id);
          }
        }
        setLoadingSkills(false);
      })
      .catch(() => setLoadingSkills(false));
  }, []);

  const handleAddSkill = () => {
    const skillObj = allSkills.find((s) => s.id === selectedSkillToAdd);
    if (!skillObj) return;

    if (formData.requiredSkills.some((s) => s.skillId === skillObj.id)) {
      alert('Skill already added to requirement list.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      requiredSkills: [
        ...prev.requiredSkills,
        { skillId: skillObj.id, name: skillObj.name, minLevel: selectedLevelToAdd }
      ]
    }));
  };

  const handleRemoveSkill = (skillId: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s.skillId !== skillId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.requiredSkills.length === 0) {
      setErrorMsg('Please add at least 1 required competency.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgId: 'inst_kottakkal_003',
          ...formData
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post opportunity');

      router.push('/org/opportunities');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      <div>
        <Link
          href="/org/opportunities"
          className="text-xs font-bold text-zinc-400 hover:text-emerald-300 flex items-center space-x-1.5 mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Opportunities</span>
        </Link>
        <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Ayush Grid Industry Recruiter Console</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">Post New Industry Opening</h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
            Define competency prerequisites from the national Ayush ontology to enable automated AI candidate ranking and verification.
          </p>
        </div>
      </div>

      <div className="watermelon-card p-6 sm:p-8 border border-white/10 shadow-2xl">
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <div>
            <label htmlFor="opp-title" className="block font-semibold text-zinc-300 mb-1.5">
              Position / Program Title *
            </label>
            <input
              id="opp-title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all placeholder-zinc-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="opp-type" className="block font-semibold text-zinc-300 mb-1.5">
                Opportunity Type *
              </label>
              <select
                id="opp-type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
              >
                <option value="INTERNSHIP" className="bg-zinc-900 text-white">Internship</option>
                <option value="MICRO_INTERNSHIP" className="bg-zinc-900 text-white">Micro-Internship (NSQF)</option>
                <option value="JOB" className="bg-zinc-900 text-white">Full-Time Job</option>
                <option value="FACULTY_TRAINING" className="bg-zinc-900 text-white">Faculty Industrial Training</option>
              </select>
            </div>

            <div>
              <label htmlFor="opp-nsqf" className="block font-semibold text-zinc-300 mb-1.5">
                NSQF Alignment Level *
              </label>
              <select
                id="opp-nsqf"
                value={formData.nsqfLevel}
                onChange={(e) => setFormData({ ...formData, nsqfLevel: parseInt(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
              >
                <option value="3" className="bg-zinc-900 text-white">Level 3 (Certificate)</option>
                <option value="4" className="bg-zinc-900 text-white">Level 4 (Technician)</option>
                <option value="5" className="bg-zinc-900 text-white">Level 5 (Specialist)</option>
                <option value="6" className="bg-zinc-900 text-white">Level 6 (Professional)</option>
                <option value="7" className="bg-zinc-900 text-white">Level 7 (Mastery)</option>
                <option value="8" className="bg-zinc-900 text-white">Level 8 (Faculty / Lead)</option>
              </select>
            </div>

            <div>
              <label htmlFor="opp-duration" className="block font-semibold text-zinc-300 mb-1.5">
                Duration (Weeks) *
              </label>
              <input
                id="opp-duration"
                type="number"
                min="1"
                required
                value={formData.durationWeeks}
                onChange={(e) => setFormData({ ...formData, durationWeeks: parseInt(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="opp-desc" className="block font-semibold text-zinc-300 mb-1.5">
              Description & Clinical / Industrial Scope *
            </label>
            <textarea
              id="opp-desc"
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all leading-relaxed"
            />
          </div>

          {/* Structured Required Skills Multi-select */}
          <div className="space-y-3.5 pt-4 border-t border-white/10">
            <label className="block font-bold text-white text-sm font-display">
              Required Ayush Competencies & Minimum Proficiency (Ontology)
            </label>

            {/* Add Skill Row */}
            <div className="flex flex-col sm:flex-row gap-2.5 bg-black/40 p-3.5 rounded-xl border border-white/10">
              <select
                value={selectedSkillToAdd}
                onChange={(e) => setSelectedSkillToAdd(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {allSkills.map((s) => (
                  <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                    {s.name} ({s.domain})
                  </option>
                ))}
              </select>

              <select
                value={selectedLevelToAdd}
                onChange={(e) => setSelectedLevelToAdd(e.target.value)}
                className="w-44 px-3 py-2 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="BASIC" className="bg-zinc-900 text-white">Basic</option>
                <option value="INTERMEDIATE" className="bg-zinc-900 text-white">Intermediate</option>
                <option value="ADVANCED" className="bg-zinc-900 text-white">Advanced</option>
                <option value="EXPERT" className="bg-zinc-900 text-white">Expert</option>
              </select>

              <button
                type="button"
                id="btn-add-skill-req"
                onClick={handleAddSkill}
                className="threeui-tactile-btn px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl shadow-md border border-emerald-400/40 flex items-center justify-center space-x-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Selected Skills List */}
            <div className="space-y-2">
              {formData.requiredSkills.map((s) => (
                <div
                  key={s.skillId}
                  className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all"
                >
                  <div>
                    <span className="font-semibold text-white text-xs">{s.name}</span>
                    <span className="text-[10px] text-zinc-400 block font-mono mt-0.5">ID: {s.skillId}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 font-bold text-[10px] border border-emerald-500/40">
                      Min: {s.minLevel}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s.skillId)}
                      className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stipend, Location, Remote */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <label htmlFor="opp-stipend" className="block font-semibold text-zinc-300 mb-1.5">
                Monthly Stipend (INR)
              </label>
              <input
                id="opp-stipend"
                type="number"
                value={formData.stipend}
                onChange={(e) => setFormData({ ...formData, stipend: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="opp-loc" className="block font-semibold text-zinc-300 mb-1.5">
                Location
              </label>
              <input
                id="opp-loc"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remote}
                  onChange={(e) => setFormData({ ...formData, remote: e.target.checked })}
                  className="rounded bg-zinc-900 border-white/20 text-emerald-500 focus:ring-emerald-400 w-4 h-4"
                />
                <span className="font-semibold text-zinc-200 text-xs">Remote / Work-from-Home</span>
              </label>
            </div>
          </div>

          {/* Mentor info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mentor-name" className="block font-semibold text-zinc-300 mb-1.5">
                Designated Mentor Name
              </label>
              <input
                id="mentor-name"
                type="text"
                value={formData.mentorName}
                onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="mentor-title" className="block font-semibold text-zinc-300 mb-1.5">
                Mentor Designation / Title
              </label>
              <input
                id="mentor-title"
                type="text"
                value={formData.mentorTitle}
                onChange={(e) => setFormData({ ...formData, mentorTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-semibold focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <Link
              href="/org/opportunities"
              className="px-5 py-2.5 border border-white/15 rounded-xl text-zinc-300 font-semibold hover:bg-white/5 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              id="btn-publish-opportunity"
              disabled={isSubmitting}
              className="threeui-tactile-btn px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 transition-all"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Active Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
