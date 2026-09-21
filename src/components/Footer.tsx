import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, ExternalLink, GraduationCap, Building2, PhoneCall, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto relative z-20 bg-[#0f172a] text-zinc-300 border-t-4 border-[#044e3b]">
      
      {/* Top Section: Quick Government Services Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Official Ministry Identity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm">
                <span className="text-xs font-black text-slate-900 font-serif">GoI</span>
              </div>
              <div>
                <span className="text-xs text-amber-400 font-semibold block uppercase tracking-wider">
                  भारत सरकार | Government of India
                </span>
                <span className="text-base font-bold text-white tracking-tight font-serif">
                  आयुष मंत्रालय | Ministry of Ayush
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-md pt-1">
              <strong>AyushSkillBridge / AYURSETU (आयुर्वेद सेतु)</strong> is India's official digital public platform connecting Ayush medical colleges, clinical hospitals, ASU manufacturing industries, and research institutions under Problem Statement <strong>SIH26044</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-zinc-300">
              <span className="flex items-center space-x-1.5 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ayush Grid & ABDM Consent Compliant</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-500/40 text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>NCISM & NCH Aligned CBME Standards</span>
              </span>
            </div>

            <div className="pt-2 text-xs text-zinc-400 space-y-1">
              <p className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Toll Free Helpline: <strong className="text-white font-mono">1800-11-22-02 (24x7)</strong></span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email Support: <strong className="text-white font-mono">support@ayushgrid.gov.in</strong></span>
              </p>
            </div>
          </div>

          {/* Col 2: Student & Academic Gateways */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5 border-b border-zinc-800 pb-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Student & Colleges</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ayursetu" className="text-zinc-300 hover:text-amber-300 transition-colors flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>AYURSETU Digital ID (AUSID)</span>
                </Link>
              </li>
              <li>
                <Link href="/colleges" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  Accredited Ayush Colleges Directory
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  Instant Verification Ledger
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  Hospital & Industry Opportunities
                </Link>
              </li>
              <li>
                <Link href="/logbook" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  NCISM DOAP Clinical e-Logbook
                </Link>
              </li>
              <li>
                <Link href="/passport" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  W3C Digital Skill Passport
                </Link>
              </li>
              <li>
                <Link href="/next-exam" className="text-amber-300 hover:text-amber-200 transition-colors font-semibold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>NExT Exam Mock Readiness</span>
                </Link>
              </li>
              <li>
                <Link href="/formulary" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  National Ayush Pharmacopoeia (API/PCIM&H)
                </Link>
              </li>
              <li>
                <Link href="/helpline" className="text-emerald-300 hover:text-emerald-200 transition-colors font-semibold">
                  Ayush Sanjivani Support & Grievance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industry & National Portals */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5 border-b border-zinc-800 pb-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Industry & Governance</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/org/opportunities" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  Hospital & Pharma Recruiter Hub
                </Link>
              </li>
              <li>
                <Link href="/dept/dashboard" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  Ministry Intelligence & NAAC Matrix
                </Link>
              </li>
              <li>
                <Link href="/admin/organizations" className="text-zinc-300 hover:text-amber-300 transition-colors">
                  Institutional Moderation Queue
                </Link>
              </li>
              <li>
                <a href="https://ayush.gov.in" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-300 transition-colors flex items-center space-x-1">
                  <span>Ministry of Ayush Portal</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://ncismindia.org" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-300 transition-colors flex items-center space-x-1">
                  <span>NCISM Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-300 transition-colors flex items-center space-x-1">
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Mandatory GIGW Government Policy Bar */}
      <div className="bg-[#0b1120] border-t border-zinc-800 text-[11px] text-zinc-400 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          
          {/* Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Website Policies</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white transition-colors">Terms of Use</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white transition-colors">Hyperlinking Policy</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white transition-colors">Copyright Policy</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white transition-colors">Disclaimer</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white transition-colors">Help & Grievances</Link>
          </div>

          <div className="text-[10px] text-zinc-500 font-mono">
            Security Audit: Certified • GIGW 3.0 Compliant
          </div>
        </div>
      </div>

      {/* Official Bottom Attribution Strip */}
      <div className="bg-[#060a12] py-3 text-[10px] text-zinc-500 text-center border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <p>
            Website Content Managed by <strong>Ministry of Ayush, Government of India</strong>. Designed, Developed & Hosted by <strong>National Informatics Centre (NIC) / Ayush Grid</strong>.
          </p>
          <p className="text-zinc-600">
            Last Updated: 21 September 2026 • Best viewed in modern browsers (Chrome, Edge, Firefox, Safari) at 1024x768 or higher.
          </p>
        </div>
      </div>

    </footer>
  );
}
