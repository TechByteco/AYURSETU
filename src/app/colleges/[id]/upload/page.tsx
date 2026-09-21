'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  GraduationCap,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Upload,
  Plus,
  Users,
  Award,
  ShieldCheck,
  FileCheck,
  AlertCircle,
  Fingerprint,
  Sparkles
} from 'lucide-react';

export default function CollegeUploadPage() {
  const params = useParams();
  const id = (params?.id as string) || 'inst_aiia_001';

  const [collegeData, setCollegeData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stream, setStream] = useState('BAMS');
  const [graduationMarks, setGraduationMarks] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [meritRank, setMeritRank] = useState('');
  const [collegeRollNo, setCollegeRollNo] = useState('');
  const [passingYear, setPassingYear] = useState('2026');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'sk_pk_01', // Panchakarma
    'sk_pk_08'  // Nadi Pariksha
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchCollegeRoster = () => {
    setLoading(true);
    fetch(`/api/colleges/${id}/students`)
      .then((res) => res.json())
      .then((data) => {
        if (data.college) setCollegeData(data.college);
        if (data.students) setStudents(data.students);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) fetchCollegeRoster();
  }, [id]);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !graduationMarks) {
      setErrorMsg('Please enter student name, email, and graduation marks percentage.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const skillsPayload = selectedSkills.map((skId) => ({
        skillId: skId,
        level: 'ADVANCED'
      }));

      const res = await fetch(`/api/colleges/${id}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          stream,
          graduationMarks: parseFloat(graduationMarks),
          cgpa: cgpa ? parseFloat(cgpa) : undefined,
          meritRank: meritRank ? parseInt(meritRank) : undefined,
          collegeRollNo,
          passingYear: parseInt(passingYear),
          skills: skillsPayload
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Student verified & registered! Issued Unique Ayush ID: ${data.student.ayurId}`);
        setName('');
        setEmail('');
        setPhone('');
        setGraduationMarks('');
        setCgpa('');
        setMeritRank('');
        setCollegeRollNo('');
        fetchCollegeRoster();
      } else {
        setErrorMsg(data.error || 'Failed to upload student.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      
      {/* Back link & College Header */}
      <div>
        <Link
          href="/colleges"
          className="text-xs font-bold text-zinc-400 hover:text-emerald-300 flex items-center space-x-1.5 mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Verified Colleges Directory</span>
        </Link>

        <div className="watermelon-card p-6 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                INSTITUTIONAL UPLOAD PORTAL
              </span>
              <span className="text-[10px] font-bold text-zinc-400 font-mono">
                Code: {collegeData?.ayushAffiliationNo || 'AYUSH-NCISM-DL-001'}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white font-display">
              {collegeData?.name || 'All India Institute of Ayurveda'}
            </h1>
            <p className="text-xs text-zinc-300">
              Accreditation: <strong className="text-amber-300">{collegeData?.accreditationGrade || 'NCISM Category-1 / NAAC A++'}</strong> • Sanctioned Intake: {collegeData?.sanctionedIntake || 120} Seats
            </p>
          </div>

          <div className="text-right shrink-0 bg-black/40 px-4 py-3 rounded-xl border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              Registered Graduates
            </span>
            <span className="text-2xl font-extrabold text-emerald-400 font-display">
              {students.length} Students
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload Form (Watermelon Glass) */}
        <div className="lg:col-span-5 watermelon-card p-6 border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold ring-1 ring-emerald-400/30">
              <Upload className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display">Register Qualified Graduate</h2>
              <p className="text-[11px] text-zinc-400">Mints Unique Ayush Student ID (AUSID)</p>
            </div>
          </div>

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="font-semibold leading-relaxed">{successMsg}</p>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="font-semibold">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Student Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Radhika Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  placeholder="student@aiia.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Contact Phone</label>
                <input
                  type="text"
                  placeholder="+91-9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Degree Stream</label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-900 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                >
                  <option value="BAMS">BAMS (Ayurveda)</option>
                  <option value="MD_PANCHAKARMA">MD (Panchakarma)</option>
                  <option value="MD_DRAVYAGUNA">MD (Dravyaguna)</option>
                  <option value="BHMS">BHMS (Homeopathy)</option>
                  <option value="BSMS">BSMS (Siddha)</option>
                  <option value="BUMS">BUMS (Unani)</option>
                  <option value="BNYS">BNYS (Naturopathy)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Passing Year</label>
                <input
                  type="number"
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
            </div>

            {/* Academic Merit & Graduation Marks */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3">
              <p className="font-bold text-amber-300 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Academic Merit Evaluation</span>
              </p>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-zinc-400 mb-1 text-[11px]">Grad Marks % *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="84.5"
                    value={graduationMarks}
                    onChange={(e) => setGraduationMarks(e.target.value)}
                    className="w-full px-2.5 py-2 bg-black/60 border border-emerald-500/40 rounded-lg font-bold text-amber-300 focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-400 mb-1 text-[11px]">CGPA (/10)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="8.8"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full px-2.5 py-2 bg-black/60 border border-white/15 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-400 mb-1 text-[11px]">Class Rank</label>
                  <input
                    type="number"
                    placeholder="3"
                    value={meritRank}
                    onChange={(e) => setMeritRank(e.target.value)}
                    className="w-full px-2.5 py-2 bg-black/60 border border-white/15 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-400 mb-1 text-[11px]">College Enrollment / Roll No.</label>
                <input
                  type="text"
                  placeholder="e.g. AIIA/BAMS/2022/048"
                  value={collegeRollNo}
                  onChange={(e) => setCollegeRollNo(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg font-mono text-white text-[11px] focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="threeui-tactile-btn w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'Registering & Minting Unique ID...' : 'Verify Student & Mint Unique ID'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: College Uploaded Roster */}
        <div className="lg:col-span-7 watermelon-card border border-white/10 rounded-2xl overflow-hidden shadow-xl space-y-4">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-display">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Accredited Graduates Roster</span>
            </h2>
            <span className="text-xs text-zinc-400">
              {students.length} Verified Records
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-zinc-400 animate-pulse">Loading student roster...</div>
          ) : students.length === 0 ? (
            <div className="p-12 text-center text-xs text-zinc-400">
              No students uploaded yet for this institution.
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {students.map((st) => (
                <div key={st.id} className="p-4 hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{st.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                        {st.stream}
                      </span>
                      {st.meritRank && (
                        <span className="px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/30 font-bold text-[10px]">
                          Rank #{st.meritRank}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 font-mono">
                      <span className="text-emerald-400 font-bold">ID: {st.ayurId || 'Pending'}</span>
                      <span>•</span>
                      <span>Roll: {st.collegeRollNo || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 text-right">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Graduation Marks</p>
                      <p className="text-base font-extrabold text-amber-400 font-display">
                        {st.graduationMarks ? `${st.graduationMarks}%` : 'N/A'}
                      </p>
                      {st.cgpa && <p className="text-[10px] text-emerald-400 font-semibold">{st.cgpa} CGPA</p>}
                    </div>

                    <Link
                      href={`/verify?id=${st.ayurId || st.id}`}
                      className="threeui-tactile-btn px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 hover:bg-white/10 text-zinc-200 font-semibold text-[11px]"
                    >
                      Dossier
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
