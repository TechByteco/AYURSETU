'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Filter, 
  FlaskConical, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Layers,
  Award,
  ChevronRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface FormularyEntry {
  id: string;
  code: string;
  name: string;
  classicalNameSanskrit: string;
  stream: 'Ayurveda' | 'Unani' | 'Siddha' | 'Homeopathy';
  category: 'Asava / Arishta' | 'Churna' | 'Taila / Ghrita' | 'Vati / Gutika' | 'Awaleha / Lehya' | 'Kshara' | 'Khamira' | 'Kudineer' | 'Potency Dilution';
  referenceText: string;
  shlokaOrCitation: string;
  ingredients: { name: string; botanical: string; part: string }[];
  indications: string[];
  anupana: string;
  therapeuticDose: string;
  nsqfLevel: string;
  doapProcedureLink: string;
}

const FORMULARY_DATABASE: FormularyEntry[] = [
  {
    id: 'form_kshar_01',
    code: 'AFI-VOL-II-KSHARA-03',
    name: 'Ksharasutra (Standard Apamarga Snatched Thread)',
    classicalNameSanskrit: 'अपामार्ग क्षारसूत्र',
    stream: 'Ayurveda',
    category: 'Kshara',
    referenceText: 'Sushruta Samhita, Chikitsa Sthana 17 (Bhagandara Chikitsa)',
    shlokaOrCitation: 'क्षारसूत्रेण संछिन्द्याद् भगन्दरगतिं भिषक् । (सु.चि. १७/२९)',
    ingredients: [
      { name: 'Apamarga Kshara', botanical: 'Achyranthes aspera', part: 'Water-soluble alkaline ash' },
      { name: 'Snuhi Ksheera', botanical: 'Euphorbia neriifolia', part: 'Latex exudate' },
      { name: 'Haridra Churna', botanical: 'Curcuma longa', part: 'Rhizome powder' },
      { name: 'Surgical Barbour Thread #20', botanical: 'Linen thread base', part: '21 layered coatings' }
    ],
    indications: ['Bhagandara (Fistula-in-Ano)', 'Arsha (Hemorrhoids)', 'Pilonidal Sinus (Nadi Vrana)'],
    anupana: 'External mechanical & chemical ligation under aseptic surgical field',
    therapeuticDose: 'Single sterile medicated thread replaced weekly under DOAP supervision',
    nsqfLevel: 'NSQF Level 7 (Specialized Surgical Competency)',
    doapProcedureLink: 'Shalya Tantra Anorectal Procedure Unit'
  },
  {
    id: 'form_triphala_02',
    code: 'AFI-PART-I-07:14',
    name: 'Triphala Churna',
    classicalNameSanskrit: 'त्रिफला चूर्ण',
    stream: 'Ayurveda',
    category: 'Churna',
    referenceText: 'Charaka Samhita, Chikitsa Sthana 1/2 (Rasayana Adhyaya)',
    shlokaOrCitation: 'हरीतकी बिभीतकं धात्री च त्रिफला मता । चक्षुष्या दीपिनी मेध्या कफपित्तविनाशिनी ॥',
    ingredients: [
      { name: 'Haritaki', botanical: 'Terminalia chebula', part: 'Pericarp fruit' },
      { name: 'Bibhitaki', botanical: 'Terminalia bellirica', part: 'Pericarp fruit' },
      { name: 'Amalaki', botanical: 'Phyllanthus emblica', part: 'Pericarp fruit' }
    ],
    indications: ['Anaha (Constipation)', 'Prameha (Metabolic Disorders)', 'Netra Roga (Ocular wash)', 'Vrana Shodhana (Wound cleansing)'],
    anupana: 'Warm water (Ushnodaka), Madhu (Honey), or Ghrita (Ghee)',
    therapeuticDose: '3 to 6 grams twice daily before meals',
    nsqfLevel: 'NSQF Level 5-6 (Basic Formulation & Clinical Dispensing)',
    doapProcedureLink: 'Kayachikitsa & Panchakarma Purvakarma'
  },
  {
    id: 'form_mahanarayan_03',
    code: 'AFI-PART-I-08:42',
    name: 'Mahanarayana Taila',
    classicalNameSanskrit: 'महानारायण तैल',
    stream: 'Ayurveda',
    category: 'Taila / Ghrita',
    referenceText: 'Bhaishajya Ratnavali, Vatavyadhi Chikitsa 26/327-353',
    shlokaOrCitation: 'नारायणमिदं तैलं वातव्याधिनिबर्हणम् । पङ्गुत्वे खञ्जभावे च हनुस्तम्भे च शस्यते ॥',
    ingredients: [
      { name: 'Bilva', botanical: 'Aegle marmelos', part: 'Root/stem bark' },
      { name: 'Ashwagandha', botanical: 'Withania somnifera', part: 'Root' },
      { name: 'Bala', botanical: 'Sida cordifolia', part: 'Whole plant' },
      { name: 'Tila Taila', botanical: 'Sesamum indicum', part: 'Seed oil matrix' },
      { name: 'Godugdha', botanical: 'Cow Milk', part: 'Liquid medium' }
    ],
    indications: ['Vatavyadhi (Neuromusculoskeletal disorders)', 'Sandhigata Vata (Osteoarthritis)', 'Manyastambha (Cervical Spondylosis)'],
    anupana: 'Abhyanga (External massage) followed by Swedana; or Anuvasana Basti',
    therapeuticDose: 'Adequate quantity for localized/whole body Abhyanga; 60ml for Matra Basti',
    nsqfLevel: 'NSQF Level 6 (Panchakarma Protocol Execution)',
    doapProcedureLink: 'Panchakarma Snehana & Basti Unit'
  },
  {
    id: 'form_khamira_04',
    code: 'NFUM-PART-I-12:08',
    name: 'Khamira Marwareed (Pearl Electuary)',
    classicalNameSanskrit: 'خمیرہ مروارید',
    stream: 'Unani',
    category: 'Khamira',
    referenceText: 'Al-Qarabadin Al-Kabir (Hakim Muhammad Azam Khan)',
    shlokaOrCitation: 'مفرح و مقوی قلب و دماغ و ازالہ خفقان (Tonic for heart & vital spirits)',
    ingredients: [
      { name: 'Marwareed (Pearl)', botanical: 'Margarita / Mytilus margaritiferus', part: 'Micro-triturated calcined powder' },
      { name: 'Yashab Sabz (Green Jade)', botanical: 'Silicate of magnesia', part: 'Purified mineral paste' },
      { name: 'Arq Gulab', botanical: 'Rosa damascena', part: 'Distilled rose hydrosol' },
      { name: 'Qand Safaid', botanical: 'Saccharum officinarum', part: 'Sugar syrup base' }
    ],
    indications: ['Zof-e-Qalb (Cardiac weakness)', 'Khafqan (Palpitations)', 'Zof-e-Dimagh (Mental exhaustion)'],
    anupana: 'Arq Gaozaban (Borage hydrosol) or lukewarm milk in early morning',
    therapeuticDose: '3 to 5 grams once daily on empty stomach',
    nsqfLevel: 'NSQF Level 6 (Unani Pharmacy & Regimen Therapy)',
    doapProcedureLink: 'Ilaj-bit-Tadbeer & Muqawwi Regimens'
  },
  {
    id: 'form_nilavembu_05',
    code: 'SFI-PART-I-KUDINEER-04',
    name: 'Nilavembu Kudineer (Decoction)',
    classicalNameSanskrit: 'நிலவேம்பு குடிநீர்',
    stream: 'Siddha',
    category: 'Kudineer',
    referenceText: 'Siddha Vaidya Thirattu (Gunapadam Thathu Jeevam)',
    shlokaOrCitation: 'சுரங்கள் அனைத்தும் தீர்க்கும் நிலவேம்பு குடிநீர் முறைமை (All fevers subsiding decoction)',
    ingredients: [
      { name: 'Nilavembu', botanical: 'Andrographis paniculata', part: 'Whole plant' },
      { name: 'Vettiver', botanical: 'Vetiveria zizanioides', part: 'Root' },
      { name: 'Vilamichai Ver', botanical: 'Plectranthus vettiveroides', part: 'Root fibrous' },
      { name: 'Chukku', botanical: 'Zingiber officinale', part: 'Dried rhizome' },
      { name: 'Milagu', botanical: 'Piper nigrum', part: 'Dried berries' }
    ],
    indications: ['Pitha Suram (Febrile illnesses)', 'Viral polyarthralgia', 'Dengue fevers & immune suppression'],
    anupana: 'Administered warm; 1:8 water reduced to 1:4 decoction',
    therapeuticDose: '30 to 60 ml twice daily after food',
    nsqfLevel: 'NSQF Level 6 (Siddha Preventive & Clinical Protocol)',
    doapProcedureLink: 'Siddha Maruthuvam OPD & Kudineer Dispensing'
  },
  {
    id: 'form_arnica_06',
    code: 'HPI-VOL-I-HOM-18',
    name: 'Arnica Montana (Mountain Daisy Mother Tincture / 30C)',
    classicalNameSanskrit: 'आर्निका मोंटाना',
    stream: 'Homeopathy',
    category: 'Potency Dilution',
    referenceText: 'Organon of Medicine & Materia Medica Pura (Dr. Samuel Hahnemann)',
    shlokaOrCitation: 'Similia Similibus Curentur — Specific trauma, contusion, and blunt force extravasation.',
    ingredients: [
      { name: 'Arnica Montana Root & Whole Plant', botanical: 'Arnica montana L.', part: 'Fresh whole plant with root' },
      { name: 'Dispensing Alcohol 90% v/v', botanical: 'Ethanol IP/HP', part: 'Extra-neutral menstruum' }
    ],
    indications: ['Traumatic ecchymosis & contusion', 'Myalgia from over-exertion', 'Post-surgical soft tissue trauma'],
    anupana: 'Direct sublingual globules or diluted in 1 teaspoon pure water',
    therapeuticDose: '4 globules of 30C potency every 4 hours in acute trauma phase',
    nsqfLevel: 'NSQF Level 6 (Homeopathic Materia Medica & Repertorization)',
    doapProcedureLink: 'Homeopathic Acute Prescription & Case Taking'
  }
];

export default function FormularyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeEntry, setActiveEntry] = useState<FormularyEntry>(FORMULARY_DATABASE[0]);

  const filteredEntries = FORMULARY_DATABASE.filter((entry) => {
    const matchesSearch = 
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.classicalNameSanskrit.includes(searchQuery) ||
      entry.indications.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      entry.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()) || ing.botanical.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStream = selectedStream === 'ALL' || entry.stream === selectedStream;
    const matchesCategory = selectedCategory === 'ALL' || entry.category === selectedCategory;

    return matchesSearch && matchesStream && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">
      
      {/* Official Government Header Banner */}
      <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <FlaskConical className="w-3.5 h-3.5 text-amber-300" />
              <span>Pharmacopoeial Commission for Indian Medicine & Homoeopathy (PCIM&H)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              National Ayush Pharmacopoeia & Classical Formulary Explorer
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
              Official reference ledger aligning classical manuscripts (Charaka, Sushruta, Al-Qanun, Siddha Thirattu) with modern NCISM CBME Competencies, standard dosages, and therapeutic guidelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/logbook/new"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-lg flex items-center space-x-2 border border-emerald-400/30"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Log Procedure with Reference</span>
            </Link>
            <Link
              href="/verify"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Standards</span>
            </Link>
          </div>
        </div>

        {/* Pharmacopoeia Stream Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">Ayurvedic Formulary (AFI)</span>
            <span className="text-lg font-black text-amber-400 font-mono">1,120+ Monographed Formulations</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">National Formulary Unani (NFUM)</span>
            <span className="text-lg font-black text-emerald-400 font-mono">680+ Pharmacopoeial Standards</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">Siddha Formulary (SFI)</span>
            <span className="text-lg font-black text-teal-300 font-mono">450+ Gunapadam Formulations</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">Homoeopathic (HPI)</span>
            <span className="text-lg font-black text-blue-300 font-mono">920+ Monographed Tinctures</span>
          </div>
        </div>
      </div>

      {/* Search & Stream Filter Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search formulation by Sanskrit / Botanical name, indication (Bhagandara, Prameha), or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-emerald-500/30 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['ALL', 'Ayurveda', 'Unani', 'Siddha', 'Homeopathy'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStream(st)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStream === st
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-900 text-zinc-300 hover:bg-slate-800 border border-white/5'
              }`}
            >
              {st === 'ALL' ? 'All Pharmacopoeias' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: List & Active Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Formulary List (Left 5 Cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-700 pr-1">
          {filteredEntries.map((entry) => {
            const isSelected = activeEntry.id === entry.id;
            return (
              <div
                key={entry.id}
                onClick={() => setActiveEntry(entry)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/80 border-amber-400 shadow-lg ring-1 ring-amber-400/40'
                    : 'bg-slate-900/80 border-white/10 hover:border-emerald-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-amber-500/30">
                      {entry.code}
                    </span>
                    <h3 className="text-sm font-bold text-white font-display mt-1">
                      {entry.name}
                    </h3>
                    <p className="text-xs text-emerald-300 font-serif">
                      {entry.classicalNameSanskrit}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-zinc-300 border border-white/10 flex-shrink-0">
                    {entry.stream}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 border-t border-white/5 pt-2">
                  <span className="truncate max-w-[200px]">Ref: {entry.referenceText}</span>
                  <span className="text-amber-400 font-semibold flex items-center">
                    Inspect <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            );
          })}

          {filteredEntries.length === 0 && (
            <div className="bg-slate-900/60 p-8 rounded-xl border border-white/10 text-center text-zinc-400 text-xs">
              No classical formulations found matching your query.
            </div>
          )}
        </div>

        {/* Detailed Pharmacopoeial Monograph Viewer (Right 7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/95 rounded-2xl border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          
          {/* Top Title & Metadata */}
          <div className="border-b border-white/10 pb-4 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/40">
                {activeEntry.code}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                {activeEntry.stream} Pharmacopoeia Standard
              </span>
            </div>

            <h2 className="text-2xl font-black text-white font-display">
              {activeEntry.name}
            </h2>
            <p className="text-base text-emerald-300 font-serif">
              {activeEntry.classicalNameSanskrit}
            </p>
          </div>

          {/* Classical Citation & Shloka Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Classical Authority Reference</span>
            </div>
            <p className="text-xs text-zinc-300 font-mono font-semibold">
              {activeEntry.referenceText}
            </p>
            <blockquote className="text-xs text-amber-200/90 font-serif italic border-l-2 border-amber-400 pl-3 py-1">
              "{activeEntry.shlokaOrCitation}"
            </blockquote>
          </div>

          {/* Formula Ingredients Table */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Standard Botanical & Mineral Ingredients:
            </span>
            <div className="bg-slate-950 rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 border-b border-white/10 text-zinc-400 text-[10px] uppercase font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Classical Name</th>
                    <th className="py-2.5 px-3">Botanical / Chemical Name</th>
                    <th className="py-2.5 px-3">Part Used / State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activeEntry.ingredients.map((ing, i) => (
                    <tr key={i} className="hover:bg-slate-900/50">
                      <td className="py-2.5 px-3 font-semibold text-white">{ing.name}</td>
                      <td className="py-2.5 px-3 italic text-emerald-300 font-mono text-[11px]">{ing.botanical}</td>
                      <td className="py-2.5 px-3 text-zinc-300">{ing.part}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clinical Directives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Therapeutic Indications:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {activeEntry.indications.map((ind, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-200 text-[10px] font-semibold border border-emerald-500/20">
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Standard Dosage & Anupana:</span>
              <p className="text-xs font-semibold text-white mt-1">{activeEntry.therapeuticDose}</p>
              <p className="text-[11px] text-zinc-400">Carrier: {activeEntry.anupana}</p>
            </div>
          </div>

          {/* NCISM CBME Competency Linkage */}
          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-amber-300 font-bold uppercase flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>NCISM Competency Framework Mapping</span>
              </span>
              <p className="text-xs font-semibold text-white">
                Linked Procedure: <span className="text-emerald-300">{activeEntry.doapProcedureLink}</span>
              </p>
              <p className="text-[11px] text-zinc-400">
                Alignment: {activeEntry.nsqfLevel}
              </p>
            </div>

            <Link
              href={`/logbook/new`}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md flex-shrink-0 transition-all"
            >
              <span>Cite in e-Logbook Entry</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
