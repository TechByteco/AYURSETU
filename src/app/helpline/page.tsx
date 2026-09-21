'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Volume2,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Shield,
  Users,
  Building2
} from 'lucide-react';

interface GrievanceForm {
  fullName: string;
  mobileNumber: string;
  ausid: string;
  category: string;
  description: string;
  preferAudio: boolean;
}

const FAQ_ITEMS = [
  {
    q: 'How do I register and get my Unique Ayush Student ID (AUSID)?',
    a: 'Visit the ABHA Registration portal at /onboard. Link your ABHA Health ID, fill in your institution details, and your AUSID will be instantly generated and cryptographically sealed. It is valid for lifetime and portable across all Ayush institutions.'
  },
  {
    q: 'My college is not listed in the Verified Colleges directory. What should I do?',
    a: 'Contact your college administration to apply for NCISM affiliation verification through the Ministry of Ayush portal. The verification process takes 7-10 working days. You may also submit a grievance below with your institution details for expedited review.'
  },
  {
    q: 'I am a senior Vaidya / Professor. How do I digitally sign CRRI intern logbook entries?',
    a: 'Log in to the Preceptor Desk at /preceptor. You will see all pending DOAP case submissions from your rotating interns. Each entry can be approved or sent for revision with your digital signature using your registered faculty credentials.'
  },
  {
    q: 'Can employers and hospitals verify my credentials without accessing my personal data?',
    a: 'Yes. The AyushSkillBridge National Verification Ledger at /verify is a public read-only portal. Employers enter your AUSID and instantly receive cryptographically verified academic data — no personal health information (PHI) is ever shared. This complies with the DPDP Act 2023.'
  },
  {
    q: 'My Panchakarma procedure logs are not showing as approved. What do I do?',
    a: 'Your clinical preceptor must digitally approve each entry. Request them to log into the Preceptor Desk. If approval remains pending beyond 7 days after submission, use the grievance form below to escalate. Our helpdesk team will contact your institution directly.'
  },
  {
    q: 'How is my personal and clinical data protected on this platform?',
    a: 'All personal and clinical data is encrypted at rest using AES-256 and in transit using TLS 1.3. The platform is compliant with the Digital Personal Data Protection (DPDP) Act 2023. Your ABHA-linked health data requires explicit consent for every disclosure. No data is shared with third parties without your written consent.'
  },
  {
    q: 'What is the NExT exam and how does this platform help me prepare?',
    a: 'The National Exit Test (NExT) is mandated by the National Medical Commission (NMC/NCISM) as the licensing exam for all Ayush graduates. The AyushSkillBridge NExT Readiness Analyzer maps your verified DOAP competencies against the NExT competency blueprint and identifies your preparation gaps with a personalized study roadmap.'
  }
];

const GRIEVANCE_CATEGORIES = [
  'AUSID Registration Issue',
  'College Verification / Affiliation',
  'Preceptor Logbook Approval Delay',
  'Technical Error on Platform',
  'Data Privacy Concern',
  'Credential Not Visible',
  'Job Application Status',
  'Other'
];

export default function HelplinePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [form, setForm] = useState<GrievanceForm>({
    fullName: '',
    mobileNumber: '',
    ausid: '',
    category: GRIEVANCE_CATEGORIES[0],
    description: '',
    preferAudio: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const id = 'GRV-' + Date.now().toString(36).toUpperCase();
    setTicketId(id);
    setSubmitted(true);
    setSubmitting(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.85;
        u.onend = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(u);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative">

      {/* Official Helpline Masthead */}
      <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md text-white space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Ministry of Ayush · National Citizen Helpline</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight">
              आयुष सहायता केंद्र<br/>
              <span className="text-2xl sm:text-3xl text-amber-300">Ayush Sanjivani Support Centre</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Accessible support for Ayush students, revered senior Vaidyas, patients, industry partners, and regulators. 
              All services available in English, हिन्दी, and தமிழ்.
            </p>
          </div>

          {/* Large high-contrast phone number for elders */}
          <div className="bg-gradient-to-br from-emerald-700 to-teal-800 p-6 rounded-2xl border border-amber-400/40 shadow-xl text-center min-w-[220px]">
            <span className="text-xs font-bold text-amber-200 uppercase tracking-widest block mb-1">Toll-Free Helpline</span>
            <a href="tel:18001122202" className="text-3xl font-black text-white font-mono block hover:text-amber-300 transition-colors">
              1800-11-22-02
            </a>
            <span className="text-xs text-emerald-200 font-semibold mt-1 block">Mon–Sat · 9 AM – 6 PM IST</span>
            <button
              onClick={() => speakText('Ayush Sanjivani Helpline. Toll free number: 1800 11 22 02. Monday to Saturday, 9 AM to 6 PM Indian Standard Time.')}
              className="mt-3 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-bold flex items-center space-x-1.5 mx-auto"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
          </div>
        </div>

        {/* Quick Contact Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          {[
            { icon: PhoneCall, label: 'Voice Call', desc: '1800-11-22-02', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-500/30' },
            { icon: MessageSquare, label: 'WhatsApp Helpdesk', desc: '+91-11-2430-3604', color: 'text-green-400', bg: 'bg-green-950/60 border-green-500/30' },
            { icon: Send, label: 'Email Support', desc: 'helpdesk@ayushgrid.gov.in', color: 'text-blue-400', bg: 'bg-blue-950/60 border-blue-500/30' },
            { icon: Building2, label: 'Ministry Office', desc: 'New Delhi · 10002', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-500/30' }
          ].map((item, i) => (
            <div key={i} className={`${item.bg} p-4 rounded-xl border text-center space-y-2`}>
              <item.icon className={`w-5 h-5 ${item.color} mx-auto`} />
              <span className="text-xs font-bold text-white block">{item.label}</span>
              <span className="text-[10px] text-zinc-400 block font-mono">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Notice for Elderly Users */}
      <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-5 flex items-start space-x-4 text-white">
        <Volume2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-black text-amber-300 font-display">Accessibility Feature: Audio Support</h3>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            This page includes <strong>text-to-speech audio reading</strong> for senior Vaidyas and elders who find screen reading difficult. 
            Click the <strong>🔊 Listen</strong> button on any section to have the content read aloud clearly. 
            All FAQ answers are available in spoken audio format.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-black text-white font-display">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-emerald-950/60 border-amber-400/50 shadow-lg'
                    : 'bg-slate-900/80 border-white/10 hover:border-emerald-500/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="text-sm font-bold text-white leading-snug pr-2">{item.q}</span>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); speakText(item.q + '. ' + item.a); }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-400 hover:text-amber-300 transition-colors"
                      title="Listen to answer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {isOpen ? (
                      <ChevronDown className="w-5 h-5 text-amber-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-zinc-300 leading-relaxed border-t border-white/10 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grievance Submission Form */}
      <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-black text-white font-display flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Submit a Grievance / Complaint</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              All grievances are acknowledged within 24 hours and resolved within 7 working days as per Government of India Citizen Charter.
            </p>
          </div>
          <span className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <Shield className="w-3 h-3" />
            <span>End-to-End Encrypted</span>
          </span>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
            <div>
              <h3 className="text-xl font-black text-white font-display">Grievance Registered Successfully!</h3>
              <p className="text-sm text-zinc-300 mt-2">Your ticket number is:</p>
              <p className="text-2xl font-mono font-black text-amber-300 mt-1">{ticketId}</p>
            </div>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Save this ticket ID. Our helpdesk team will contact you within 24 hours on your registered mobile number.
              You can track status by calling the toll-free helpline and quoting this ID.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ fullName: '', mobileNumber: '', ausid: '', category: GRIEVANCE_CATEGORIES[0], description: '', preferAudio: false }); }}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold mt-2 transition-colors"
            >
              Submit Another Grievance
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="As per ABHA / Aadhaar records"
                  className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Mobile Number <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  type="tel"
                  value={form.mobileNumber}
                  onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                  placeholder="+91 XXXXXX XXXX"
                  className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Unique Ayush ID (AUSID) — if registered
                </label>
                <input
                  type="text"
                  value={form.ausid}
                  onChange={(e) => setForm({ ...form, ausid: e.target.value })}
                  placeholder="e.g. AYUR-2026-AIIA-0042"
                  className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 appearance-none"
                >
                  {GRIEVANCE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Describe Your Issue <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Please describe your issue in detail. In Hindi or Tamil is also acceptable. (कृपया अपनी समस्या विस्तार से बताएं।)"
                className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* Accessibility: prefer callback call for senior vaidyas */}
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div
                onClick={() => setForm({ ...form, preferAudio: !form.preferAudio })}
                className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                  form.preferAudio ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  form.preferAudio ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">I prefer a phone call-back (for senior Vaidyas)</span>
                <span className="text-xs text-zinc-400">Our support agent will call you at your registered mobile number instead of email.</span>
              </div>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-sm font-black shadow-lg flex items-center justify-center space-x-2 border border-emerald-400/30 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Grievance</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/verify', icon: Shield, label: 'Verify AUSID', desc: 'Instantly verify any Ayush credential', color: 'border-emerald-500/30 hover:border-emerald-400' },
          { href: '/onboard', icon: Users, label: 'Register (ABHA)', desc: 'Get your Unique Ayush Student ID', color: 'border-amber-500/30 hover:border-amber-400' },
          { href: '/formulary', icon: Building2, label: 'Pharmacopoeia', desc: 'Classical formulation reference', color: 'border-blue-500/30 hover:border-blue-400' }
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`bg-slate-900/80 p-5 rounded-xl border ${item.color} transition-all flex items-center space-x-4 group`}
          >
            <item.icon className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-sm font-black text-white block group-hover:text-amber-300 transition-colors">{item.label}</span>
              <span className="text-xs text-zinc-400">{item.desc}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500 ml-auto flex-shrink-0 group-hover:text-amber-400 transition-colors" />
          </Link>
        ))}
      </div>

    </div>
  );
}
