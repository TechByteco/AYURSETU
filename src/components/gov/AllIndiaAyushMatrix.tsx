'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Stethoscope, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Search,
  Filter,
  ArrowUpRight
} from 'lucide-react';

interface StateAyushData {
  stateCode: string;
  stateName: string;
  collegesCount: number;
  internsCount: number;
  doapLogsCount: number;
  placementRate: number;
  primaryStream: 'Ayurveda' | 'Yoga' | 'Unani' | 'Siddha' | 'Homeopathy';
  topInstitutes: string[];
  nabhHospitals: number;
  nsqfAlignment: string;
}

const ALL_INDIA_DATA: StateAyushData[] = [
  {
    stateCode: 'DL',
    stateName: 'Delhi (NCT)',
    collegesCount: 18,
    internsCount: 2850,
    doapLogsCount: 42100,
    placementRate: 96.5,
    primaryStream: 'Ayurveda',
    topInstitutes: ['All India Institute of Ayurveda (AIIA)', 'Ayurvedic & Unani Tibbia College', 'Nehru Homoeopathic Medical College'],
    nabhHospitals: 32,
    nsqfAlignment: 'NSQF Level 7-9 (Postgrad & Super-specialty)'
  },
  {
    stateCode: 'KL',
    stateName: 'Kerala',
    collegesCount: 34,
    internsCount: 4890,
    doapLogsCount: 68400,
    placementRate: 98.1,
    primaryStream: 'Ayurveda',
    topInstitutes: ['Vaidyaratnam P.S. Varier Arya Vaidya Sala (Kottakkal)', 'Govt. Ayurveda College Thiruvananthapuram', 'VPSV Ayurveda College Kottakkal'],
    nabhHospitals: 54,
    nsqfAlignment: 'NSQF Level 6-8 (Panchakarma & Clinical Immersion)'
  },
  {
    stateCode: 'MH',
    stateName: 'Maharashtra',
    collegesCount: 68,
    internsCount: 9420,
    doapLogsCount: 112000,
    placementRate: 94.2,
    primaryStream: 'Ayurveda',
    topInstitutes: ['R.A. Podar Ayurvedic Medical College (Mumbai)', 'Tilak Ayurved Mahavidyalaya (Pune)', 'Govt. Ayurved College Nanded'],
    nabhHospitals: 61,
    nsqfAlignment: 'NSQF Level 6-7 (Roga Nidana & Clinical QC)'
  },
  {
    stateCode: 'KA',
    stateName: 'Karnataka',
    collegesCount: 74,
    internsCount: 10200,
    doapLogsCount: 124500,
    placementRate: 92.8,
    primaryStream: 'Ayurveda',
    topInstitutes: ['SDM College of Ayurveda (Udupi & Hassan)', 'Govt. Ayurveda Medical College (Bengaluru)', 'Alva\'s Ayurveda Medical College'],
    nabhHospitals: 48,
    nsqfAlignment: 'NSQF Level 6-8 (Shalya Tantra & Dravyaguna)'
  },
  {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    collegesCount: 92,
    internsCount: 12400,
    doapLogsCount: 138000,
    placementRate: 89.4,
    primaryStream: 'Ayurveda',
    topInstitutes: ['Faculty of Ayurveda, IMS, BHU (Varanasi)', 'State Ayurvedic College & Hospital (Lucknow)', 'Central Council for Research in Ayurvedic Sciences'],
    nabhHospitals: 45,
    nsqfAlignment: 'NSQF Level 6-7 (Classical Kaya Chikitsa)'
  },
  {
    stateCode: 'GJ',
    stateName: 'Gujarat',
    collegesCount: 42,
    internsCount: 6100,
    doapLogsCount: 82000,
    placementRate: 93.6,
    primaryStream: 'Ayurveda',
    topInstitutes: ['Institute of Teaching and Research in Ayurveda (ITRA Jamnagar - INI)', 'Govt. Akhandanand Ayurved College (Ahmedabad)'],
    nabhHospitals: 39,
    nsqfAlignment: 'NSQF Level 7-9 (National Importance Clinical R&D)'
  },
  {
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
    collegesCount: 38,
    internsCount: 5300,
    doapLogsCount: 71500,
    placementRate: 95.2,
    primaryStream: 'Siddha',
    topInstitutes: ['National Institute of Siddha (NIS Chennai)', 'Govt. Siddha Medical College (Palayamkottai)', 'Govt. Homoeopathic Medical College'],
    nabhHospitals: 41,
    nsqfAlignment: 'NSQF Level 6-8 (Varmam Therapy & Gunapadam QC)'
  },
  {
    stateCode: 'WB',
    stateName: 'West Bengal',
    collegesCount: 24,
    internsCount: 3450,
    doapLogsCount: 48200,
    placementRate: 91.0,
    primaryStream: 'Homeopathy',
    topInstitutes: ['National Institute of Homoeopathy (NIH Kolkata)', 'J.B. Roy State Ayurvedic Medical College', 'Calcutta Homoeopathic Medical College'],
    nabhHospitals: 27,
    nsqfAlignment: 'NSQF Level 6-8 (Repertory & Constitutional Homeopathy)'
  },
  {
    stateCode: 'RJ',
    stateName: 'Rajasthan',
    collegesCount: 36,
    internsCount: 5100,
    doapLogsCount: 69000,
    placementRate: 92.3,
    primaryStream: 'Ayurveda',
    topInstitutes: ['National Institute of Ayurveda (NIA Jaipur - Deemed to be Univ)', 'Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University (Jodhpur)'],
    nabhHospitals: 35,
    nsqfAlignment: 'NSQF Level 7-8 (Rasashastra & Bhasma Standardization)'
  },
  {
    stateCode: 'UK',
    stateName: 'Uttarakhand',
    collegesCount: 28,
    internsCount: 3900,
    doapLogsCount: 52000,
    placementRate: 94.8,
    primaryStream: 'Yoga',
    topInstitutes: ['Rishikul Govt. Ayurvedic College (Haridwar)', 'Patanjali Ayurved College (Haridwar)', 'Gurukul Kangri Vishwavidyalaya'],
    nabhHospitals: 31,
    nsqfAlignment: 'NSQF Level 6-7 (Patanjali Classical Yoga & Herbal Extracts)'
  }
];

export default function AllIndiaAyushMatrix() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('ALL');
  const [activeStateCode, setActiveStateCode] = useState<string>('DL');

  const filteredStates = ALL_INDIA_DATA.filter((item) => {
    const matchesSearch = item.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.topInstitutes.some(inst => inst.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStream = selectedStream === 'ALL' || item.primaryStream === selectedStream;
    return matchesSearch && matchesStream;
  });

  const activeState = ALL_INDIA_DATA.find((s) => s.stateCode === activeStateCode) || ALL_INDIA_DATA[0];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md text-white space-y-6">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-500/20 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 mb-2">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>National NCISM & Ayush Grid Geo-Telemetry Ledger</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
            All-India State/UT Clinical Training & Placement Matrix
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-1">
            Real-time synchronization across accredited Ayush colleges, rotating CRRI interns, DOAP case approvals, and industry recruitment absorption rates.
          </p>
        </div>

        {/* Aggregate Summary Badges */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-emerald-950/60 border border-emerald-500/40 px-3 py-2 rounded-xl text-center min-w-[100px]">
            <span className="block text-lg font-black text-amber-300">450+</span>
            <span className="text-[10px] text-zinc-300 uppercase font-bold">Colleges</span>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-500/40 px-3 py-2 rounded-xl text-center min-w-[100px]">
            <span className="block text-lg font-black text-emerald-300">68,450+</span>
            <span className="text-[10px] text-zinc-300 uppercase font-bold">CRRI Interns</span>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-500/40 px-3 py-2 rounded-xl text-center min-w-[100px]">
            <span className="block text-lg font-black text-teal-300">93.8%</span>
            <span className="text-[10px] text-zinc-300 uppercase font-bold">Placement Rate</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search state, UT, or premier institute (e.g. AIIA, Kottakkal, ITRA, NIA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Stream Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['ALL', 'Ayurveda', 'Yoga', 'Unani', 'Siddha', 'Homeopathy'].map((stream) => (
            <button
              key={stream}
              onClick={() => setSelectedStream(stream)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStream === stream
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-800 text-zinc-300 hover:bg-slate-700 hover:text-white border border-white/5'
              }`}
            >
              {stream === 'ALL' ? 'All Streams' : stream}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: State Selector List & Detailed State Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* State Selection Table (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950/70 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto max-h-[420px] scrollbar-thin scrollbar-thumb-emerald-700">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-slate-900 border-b border-white/10 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">State / UT</th>
                  <th className="py-3 px-3 text-center">Colleges</th>
                  <th className="py-3 px-3 text-center">Interns</th>
                  <th className="py-3 px-3 text-center">Placement</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredStates.map((st) => {
                  const isSelected = st.stateCode === activeStateCode;
                  return (
                    <tr
                      key={st.stateCode}
                      onClick={() => setActiveStateCode(st.stateCode)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-900/40 border-l-4 border-amber-400'
                          : 'hover:bg-slate-800/60'
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-white">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{st.stateName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-zinc-300 border border-white/10">
                            {st.primaryStream}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-300 font-bold">
                        {st.collegesCount}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-300">
                        {st.internsCount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`font-mono font-bold text-xs ${
                          st.placementRate >= 94 ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {st.placementRate}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-amber-300 text-[11px] font-bold border border-amber-400/30"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredStates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-zinc-400 text-xs">
                      No states found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active State Deep-Dive Dossier (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 rounded-xl border border-emerald-500/30 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                State Technical Profile
              </span>
              <h3 className="text-xl font-black text-white font-display flex items-center space-x-2">
                <span>{activeState.stateName}</span>
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              {activeState.primaryStream} Hub
            </span>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-white/5">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center space-x-1">
                <GraduationCap className="w-3 h-3 text-amber-400" />
                <span>Verified CRRI Interns</span>
              </span>
              <p className="text-base font-black text-white mt-1 font-mono">
                {activeState.internsCount.toLocaleString()}
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-white/5">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center space-x-1">
                <Stethoscope className="w-3 h-3 text-emerald-400" />
                <span>DOAP Cases Logged</span>
              </span>
              <p className="text-base font-black text-emerald-300 mt-1 font-mono">
                {activeState.doapLogsCount.toLocaleString()}
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-white/5">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-teal-400" />
                <span>Industry Placement</span>
              </span>
              <p className="text-base font-black text-amber-300 mt-1 font-mono">
                {activeState.placementRate}%
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-white/5">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center space-x-1">
                <Building2 className="w-3 h-3 text-blue-400" />
                <span>NABH Ayush Hospitals</span>
              </span>
              <p className="text-base font-black text-white mt-1 font-mono">
                {activeState.nabhHospitals} Centers
              </p>
            </div>
          </div>

          {/* Alignment Standard */}
          <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-500/20 text-xs">
            <span className="text-[10px] text-zinc-400 font-bold block mb-1">NCISM Curricular Alignment:</span>
            <p className="text-emerald-200 font-semibold">{activeState.nsqfAlignment}</p>
          </div>

          {/* Premier Institutes in this State */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Premier Accredited Institutions:
            </span>
            <div className="space-y-1.5">
              {activeState.topInstitutes.map((inst, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-200 bg-slate-900/60 p-2 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{inst}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Link */}
          <a
            href={`/colleges`}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg transition-all"
          >
            <span>Explore Accredited Colleges in {activeState.stateName}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

        </div>

      </div>

    </div>
  );
}
