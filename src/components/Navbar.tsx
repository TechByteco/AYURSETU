'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Sparkles,
  Menu,
  X,
  GraduationCap,
  Building2,
  Award,
  BookOpen,
  FileCheck2,
  Search,
  ExternalLink
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '@/lib/bhashini';
import { cn } from '@/lib/utils';

interface PersonaUser {
  id: string;
  name: string;
  role: string;
  stream?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [activePersona, setActivePersona] = useState<string>('aarav');
  const [currentUser, setCurrentUser] = useState<PersonaUser | null>(null);
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const t = (key: string) => getTranslation(lang, key);

  const navLinks = [
    { href: '/', label: t('nav_home'), roles: ['ALL'] },
    { href: '/ayursetu', label: t('nav_ayursetu'), roles: ['STUDENT', 'ALL'] },
    { href: '/colleges', label: t('nav_colleges'), roles: ['ALL'] },
    { href: '/verify', label: t('nav_verify'), roles: ['ALL'] },
    { href: '/opportunities', label: t('nav_opportunities'), roles: ['STUDENT', 'INDUSTRY', 'ALL'] },
    { href: '/logbook', label: t('nav_logbook'), roles: ['STUDENT', 'ACADEMICIAN'] },
    { href: '/preceptor', label: 'Preceptor Desk', roles: ['ACADEMICIAN', 'ADMIN', 'ALL'] },
    { href: '/next-exam', label: 'NExT Readiness', roles: ['STUDENT', 'ACADEMICIAN', 'ALL'] },
    { href: '/formulary', label: 'Formulary & API', roles: ['ALL'] },
    { href: '/helpline', label: 'Helpdesk & Grievance', roles: ['ALL'] },
    { href: '/assessment', label: t('nav_assessment'), roles: ['STUDENT'] },
    { href: '/gap-analysis', label: t('nav_gap_analysis'), roles: ['STUDENT'] },
    { href: '/applications', label: t('nav_applications'), roles: ['STUDENT'] },
    { href: '/passport', label: t('nav_passport'), roles: ['STUDENT', 'ALL'] },
    { href: '/org/opportunities', label: t('nav_org_portal'), roles: ['INDUSTRY', 'ADMIN'] },
    { href: '/dept/dashboard', label: t('nav_dept_dashboard'), roles: ['ACADEMICIAN', 'ADMIN', 'ALL'] },
    { href: '/admin/organizations', label: t('nav_admin'), roles: ['ADMIN'] },
    { href: '/design-system', label: 'Design Tokens', roles: ['ALL'] }
  ];

  const currentRole = currentUser?.role || 'STUDENT';
  const visibleLinks = navLinks.filter(
    (item) => item.roles.includes('ALL') || item.roles.includes(currentRole)
  );

  return (
    <header className="sticky top-0 z-40 bg-[#044e3b] text-white border-b-2 border-amber-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Main Navigation Bar (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-0.5 overflow-x-auto scrollbar-none">
            {visibleLinks.slice(0, 9).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-xs font-bold transition-all whitespace-nowrap",
                    isActive
                      ? "bg-emerald-900 text-amber-300 border-b-2 border-amber-400"
                      : "text-zinc-100 hover:text-amber-200 hover:bg-emerald-800/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {visibleLinks.length > 9 && (
              <div className="relative group">
                <button
                  type="button"
                  className="px-3 py-2 text-xs font-bold text-zinc-200 hover:text-amber-200 hover:bg-emerald-800/80 flex items-center space-x-1"
                >
                  <span>More</span>
                  <span className="text-[10px]">▼</span>
                </button>
                <div className="absolute left-0 mt-0 w-52 bg-[#044e3b] border border-amber-500/40 rounded-b-xl shadow-2xl py-1 hidden group-hover:block z-50">
                  {visibleLinks.slice(9).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-xs text-zinc-100 hover:bg-emerald-800 hover:text-amber-300 font-semibold"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Quick Action Badges */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/verify"
              className="px-3 py-1 rounded bg-emerald-900/90 hover:bg-emerald-950 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center space-x-1 shadow-sm transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Verify AUSID</span>
            </Link>

            <Link
              href="/onboard"
              className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center space-x-1 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>ABHA Registration</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden space-x-2 py-1">
            <Link
              href="/verify"
              className="px-2.5 py-1 rounded bg-emerald-900 text-amber-300 text-[11px] font-bold border border-amber-400/30"
            >
              Verify
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white hover:bg-emerald-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#033c2e] border-t border-emerald-700/80 px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top-2">
          {visibleLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-emerald-800 text-amber-300 font-bold border-l-4 border-amber-400 pl-3"
                    : "text-zinc-200 hover:bg-emerald-800/60"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-emerald-700/80 flex flex-col gap-2">
            <Link
              href="/onboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-sm"
            >
              Register with ABHA (New Student)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
