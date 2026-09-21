'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, PhoneCall, Sparkles, User, Award, CheckCircle2, ChevronDown } from 'lucide-react';
import { SupportedLanguage, getTranslation } from '@/lib/bhashini';

interface PersonaUser {
  id: string;
  name: string;
  role: string;
  stream?: string;
}

export default function GovMasthead() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<PersonaUser | null>(null);
  const [activePersona, setActivePersona] = useState<string>('aarav');
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);
  const [lang, setLang] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('ayush_lang') as SupportedLanguage;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'ta')) {
      setLang(savedLang);
    }

    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
          setActivePersona(data.personaKey || 'aarav');
        }
      })
      .catch(() => {});

    const onLangChange = () => {
      const l = localStorage.getItem('ayush_lang') as SupportedLanguage;
      if (l) setLang(l);
    };
    window.addEventListener('languageChange', onLangChange);
    return () => window.removeEventListener('languageChange', onLangChange);
  }, []);

  const handlePersonaSwitch = async (key: string) => {
    try {
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaKey: key })
      });
      const data = await res.json();
      if (data.success) {
        setActivePersona(key);
        setCurrentUser(data.user);
        setPersonaMenuOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const personas = [
    { key: 'aarav', label: 'Aarav Sharma', role: 'BAMS Student / Intern', badge: 'Youth / Graduate' },
    { key: 'preceptor', label: 'Dr. Suresh Warrier', role: 'Chief Clinical Preceptor', badge: 'Elder / Faculty' },
    { key: 'recruiter', label: 'Dr. Ananya Sen', role: 'Hospital & Pharma Recruiter', badge: 'Industry' },
    { key: 'admin', label: 'Ministry Admin', role: 'Directorate of Ayush', badge: 'Government' }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Official State Emblem of India + Ministry of Ayush Identity */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3.5 group">
            {/* Ashoka Lion Capital Emblem Vector */}
            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-amber-50/60 border border-amber-200/80 shadow-sm">
              <svg
                viewBox="0 0 64 64"
                className="w-11 h-11 text-amber-800"
                fill="currentColor"
                aria-label="State Emblem of India"
              >
                {/* Stylized National Emblem of India */}
                <path d="M32 4c-3.5 0-6.5 2-8 5-1.5-3-4.5-5-8-5-5 0-9 4-9 9 0 7 8 13 17 21 9-8 17-14 17-21 0-5-4-9-9-9-3.5 0-6.5 2-8 5z" fill="#044e3b" opacity="0.15" />
                <circle cx="32" cy="22" r="14" fill="#044e3b" />
                <circle cx="32" cy="22" r="11" fill="#FFFFFF" />
                {/* Ashoka Chakra Wheel */}
                <circle cx="32" cy="22" r="8" fill="#000080" />
                <circle cx="32" cy="22" r="6" fill="#FFFFFF" />
                <circle cx="32" cy="22" r="2" fill="#000080" />
                {/* Pedestal with Satyameva Jayate */}
                <rect x="14" y="40" width="36" height="5" rx="1.5" fill="#92400e" />
                <rect x="10" y="47" width="44" height="6" rx="2" fill="#044e3b" />
                <rect x="8" y="55" width="48" height="4" rx="1" fill="#78350f" />
              </svg>
              <span className="text-[8px] font-black text-amber-900 tracking-tighter uppercase font-serif mt-0.5">
                सत्यमेव जयते
              </span>
            </div>

            {/* Ministry Bilingual Titles */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
                  आयुष मंत्रालय
                </span>
                <span className="text-xs text-slate-400 font-semibold">|</span>
                <span className="text-xs sm:text-sm font-bold text-[#044e3b] uppercase tracking-wider">
                  MINISTRY OF AYUSH
                </span>
              </div>

              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-base sm:text-xl font-black text-slate-900 tracking-tight font-display">
                  AyushSkillBridge
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-[#044e3b] text-white tracking-wide">
                  AYURSETU
                </span>
              </div>

              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight">
                National Academia–Industry Collaboration Platform for Skill Mapping & Verified Placement
              </p>
            </div>
          </Link>
        </div>

        {/* Right: Emergency Helpline + Partner Badges + Persona Switcher */}
        <div className="flex flex-wrap items-center gap-3.5 self-start md:self-auto">
          {/* Toll Free Helpline Badge */}
          <div className="hidden lg:flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider font-bold text-amber-800 block">
                Ayush Sanjivani Helpline
              </span>
              <span className="text-xs font-black tracking-wide text-slate-900 font-mono">
                1800-11-22-02 (Toll Free)
              </span>
            </div>
          </div>

          {/* Ayush Grid & NCISM Accredited Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <div className="text-[10px] leading-tight">
              <span className="font-bold block">Ayush Grid & NCISM</span>
              <span className="text-emerald-700 font-medium">CBME Aligned Standards</span>
            </div>
          </div>

          {/* Persona Switcher (For Interactive Testing / Role Sim) */}
          <div className="relative">
            <button
              type="button"
              id="persona-switcher-btn"
              onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all border border-slate-700"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <div className="text-left leading-tight hidden sm:block">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Simulate Role:</span>
                <span className="text-xs font-bold text-amber-300">
                  {currentUser ? currentUser.name : 'Aarav Sharma'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {personaMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Government Persona
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Test the portal from all stakeholder perspectives.
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  {personas.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => handlePersonaSwitch(p.key)}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors ${
                        activePersona === p.key ? 'bg-emerald-50/70 text-emerald-950 font-bold' : 'text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold">{p.label}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                            {p.badge}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
                          {p.role}
                        </span>
                      </div>
                      {activePersona === p.key && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
