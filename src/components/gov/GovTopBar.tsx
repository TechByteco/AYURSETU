'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Volume2, Eye, ChevronDown } from 'lucide-react';
import { SupportedLanguage } from '@/lib/bhashini';

export default function GovTopBar() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1: small, 0: default, 1: large
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('ayush_lang') as SupportedLanguage;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'ta')) {
      setLang(savedLang);
    }
    const savedContrast = localStorage.getItem('ayush_contrast');
    if (savedContrast === 'high') {
      setIsHighContrast(true);
      document.documentElement.classList.add('gov-high-contrast');
    }
  }, []);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    localStorage.setItem('ayush_lang', newLang);
    setLangDropdownOpen(false);
    window.dispatchEvent(new Event('languageChange'));
    window.dispatchEvent(new Event('storage'));
  };

  const adjustFontSize = (level: number) => {
    setFontSizeLevel(level);
    if (level === -1) {
      document.documentElement.style.fontSize = '14px';
    } else if (level === 1) {
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  };

  const toggleHighContrast = () => {
    const next = !isHighContrast;
    setIsHighContrast(next);
    if (next) {
      document.documentElement.classList.add('gov-high-contrast');
      localStorage.setItem('ayush_contrast', 'high');
    } else {
      document.documentElement.classList.remove('gov-high-contrast');
      localStorage.setItem('ayush_contrast', 'normal');
    }
  };

  return (
    <div className="w-full bg-[#111827] text-zinc-200 text-[11px] font-medium border-b border-zinc-800 select-none relative z-50">
      {/* Indian National Tricolor Ribbon */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-[#FFFFFF]" />
        <div className="bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official Government Credentials */}
        <div className="flex items-center space-x-3 divide-x divide-zinc-700">
          <div className="flex items-center space-x-2">
            {/* Small Flag of India Icon */}
            <span className="inline-block w-4 h-2.5 rounded-[1px] shadow-sm overflow-hidden flex-shrink-0" title="Flag of India">
              <span className="block h-1/3 bg-[#FF9933]" />
              <span className="block h-1/3 bg-white relative flex items-center justify-center">
                <span className="w-1 h-1 rounded-full border-[0.5px] border-[#000080]" />
              </span>
              <span className="block h-1/3 bg-[#138808]" />
            </span>
            <span className="font-bold tracking-wide text-white">भारत सरकार</span>
            <span className="text-zinc-400">|</span>
            <span className="text-zinc-300">Government of India</span>
          </div>

          <div className="pl-3 hidden md:flex items-center space-x-1.5 text-zinc-300">
            <span className="font-semibold text-emerald-400">आयुष मंत्रालय</span>
            <span className="text-zinc-500">|</span>
            <span>Ministry of Ayush</span>
          </div>
        </div>

        {/* Right: GIGW Accessibility & Language Toolbar */}
        <div className="flex items-center space-x-4 text-xs">
          {/* Skip to Main Content */}
          <a
            href="#main-content"
            className="hidden sm:inline-block text-zinc-400 hover:text-white transition-colors focus:ring-2 focus:ring-amber-400 rounded px-1"
          >
            Skip to Main Content
          </a>

          {/* Screen Reader Access Link */}
          <span className="hidden lg:inline-flex items-center space-x-1 text-zinc-400" title="Screen Reader Accessible">
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px]">Screen Reader</span>
          </span>

          {/* Font Resizer A- | A | A+ (Vital for Elderly Practitioners) */}
          <div className="flex items-center space-x-1 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700">
            <span className="text-[10px] text-zinc-400 pr-1">Text:</span>
            <button
              type="button"
              onClick={() => adjustFontSize(-1)}
              className={`px-1.5 py-0.5 rounded hover:bg-zinc-700 text-[10px] font-bold ${
                fontSizeLevel === -1 ? 'bg-amber-400 text-black' : 'text-zinc-300'
              }`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => adjustFontSize(0)}
              className={`px-1.5 py-0.5 rounded hover:bg-zinc-700 text-[11px] font-bold ${
                fontSizeLevel === 0 ? 'bg-amber-400 text-black' : 'text-zinc-300'
              }`}
              title="Default Font Size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => adjustFontSize(1)}
              className={`px-1.5 py-0.5 rounded hover:bg-zinc-700 text-[12px] font-bold ${
                fontSizeLevel === 1 ? 'bg-amber-400 text-black' : 'text-zinc-300'
              }`}
              title="Increase Font Size (Elderly Accessible)"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={toggleHighContrast}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded border transition-colors ${
              isHighContrast
                ? 'bg-amber-400 text-black font-bold border-amber-300'
                : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
            title="Toggle High Contrast for Vision Impairment"
          >
            <Eye className="w-3 h-3" />
            <span className="text-[10px]">{isHighContrast ? 'Contrast: ON' : 'High Contrast'}</span>
          </button>

          {/* Bhashini Language Switcher */}
          <div className="relative">
            <button
              type="button"
              id="language-switcher-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-zinc-200"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold uppercase tracking-wider text-[10px]">
                {lang === 'hi' ? 'हिन्दी' : lang === 'ta' ? 'தமிழ்' : 'English'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-32 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl py-1 z-50 text-xs font-semibold">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800 ${
                    lang === 'en' ? 'text-amber-400 font-bold' : 'text-zinc-200'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800 ${
                    lang === 'hi' ? 'text-amber-400 font-bold' : 'text-zinc-200'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
                <button
                  onClick={() => handleLanguageChange('ta')}
                  className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800 ${
                    lang === 'ta' ? 'text-amber-400 font-bold' : 'text-zinc-200'
                  }`}
                >
                  தமிழ் (Tamil)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
