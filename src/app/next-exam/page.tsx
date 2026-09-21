'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Brain,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Target,
  BarChart3,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Trophy
} from 'lucide-react';

interface MCQQuestion {
  id: number;
  domain: string;
  difficulty: 'Basic' | 'Applied' | 'Reasoning';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referenceText: string;
  ncismCompetency: string;
}

const NEXT_MOCK_BANK: MCQQuestion[] = [
  {
    id: 1,
    domain: 'Ashtavidha Pariksha (Eightfold Examination)',
    difficulty: 'Applied',
    question: 'A 45-year-old male presents with Nadi showing Mandagati (slow speed), Sheetala (cold), and Sthula (broad) pulse. Which Dosha predominance is most likely?',
    options: ['Vataja Nadi', 'Pittaja Nadi', 'Kaphaja Nadi', 'Sannipata Nadi'],
    correctIndex: 2,
    explanation: 'Kaphaja Nadi is described in classical texts as: Manda (slow), Sheeta (cold), Sthira (stable), and Sthula (broad) — resembling the movement of a tortoise or pigeon. These findings are consistent with a Kapha predominant constitution and pathology.',
    referenceText: 'Madhava Nidana / Nadi Pariksha Prakarana; Sharngadhara Samhita 1st Sthana',
    ncismCompetency: 'AY/PA/2.1 — Nadi Pariksha in Roga Nidana'
  },
  {
    id: 2,
    domain: 'Panchakarma Clinical Protocol',
    difficulty: 'Applied',
    question: 'During Virechana Karma, a patient achieves 25 Vegas with Pittanta (bile-yellow) stool. The preceptor notes slight abdominal cramping, complete evacuation, and subjective lightness. This represents:',
    options: ['Avara Shuddhi (Inadequate purification)', 'Madhyama Shuddhi (Adequate purification)', 'Pravara Shuddhi (Excellent purification)', 'Atishuddhi (Excessive purification)'],
    correctIndex: 1,
    explanation: 'Madhyama Shuddhi criteria (16-20 Vegas, Pittanta finish, minimal cramping, subjective lightness, no extreme debilitation) is the optimal clinical endpoint. Pravara Shuddhi would show 20+ Vegas with Kaphanta and complete purification of all three doshas.',
    referenceText: 'Charaka Samhita Kalpa Sthana 1/12; Ashtanga Hridayam Suthrasthana 18',
    ncismCompetency: 'AY/PC/3.3 — Shuddhi Lakshana Assessment in Virechana'
  },
  {
    id: 3,
    domain: 'Dravyaguna & Pharmacology',
    difficulty: 'Basic',
    question: 'Guduchi (Tinospora cordifolia) is described as having all of the following properties EXCEPT:',
    options: ['Tikta Rasa (Bitter taste)', 'Laghu Guna (Light quality)', 'Ushna Veerya (Hot potency)', 'Snigdha Guna (Unctuous quality)'],
    correctIndex: 1,
    explanation: 'Guduchi (Amrita) possesses Tikta-Kashaya Rasa, Guru (Heavy) and Snigdha Guna, Ushna Veerya, and Madhura Vipaka. It is NOT Laghu — it is Guru (Heavy). This distinguishes it from other bitter drugs and is the basis for its Rasayana (rejuvenating) properties.',
    referenceText: 'Dravyaguna Vijnana (Dr. J.L.N. Shastri); Charaka Samhita Sutrasthana 23',
    ncismCompetency: 'AY/DG/1.4 — Panchavidha Kashaya Guna Karma'
  },
  {
    id: 4,
    domain: 'Shalya Tantra (Surgery)',
    difficulty: 'Reasoning',
    question: 'A 32-year-old patient presents with recurrent Bhagandara (Fistula-in-Ano). After probing, the tract is found to be supra-levator in position. According to Sushruta Samhita, the most appropriate Ayurvedic management for this high-complexity case is:',
    options: ['Direct Ksharasutra ligation without grading', 'Sapta Dhatu Chikitsa using internal Kshara', 'Staged Ksharasutra application with LIFT (Ligation of Intersphincteric Fistula Tract) in specialist centre', 'Agnikarma (Cauterization) of the entire fistulous tract'],
    correctIndex: 2,
    explanation: 'Supra-levator fistulae are complex and require staged approach. Contemporary NCISM guidelines recommend staged Ksharasutra combined with modern sphincter-preserving techniques like LIFT for high fistulae to minimize incontinence risk while preserving Ayurvedic principles.',
    referenceText: 'Sushruta Samhita Chikitsa Sthana 17; NCISM CBME Shalya Tantra Guidelines 2022',
    ncismCompetency: 'AY/ST/3.5 — Anorectal Surgical Decision Making'
  },
  {
    id: 5,
    domain: 'Prasuti Tantra (OB-GYN)',
    difficulty: 'Applied',
    question: 'During a 28-week pregnant patient\'s antenatal visit, classical Garbhini Paricharya (antenatal care regimen) for the 7th month (Saptama Masa) mandates primary use of:',
    options: ['Vata-alleviating Basti (medicated enema) with Dashmoola oil', 'Milk processed with Priyala and Shringataka with Ghrita', 'Yonipichu with Shatavari Ghrita', 'Sarvanga Abhyanga with Bala Taila'],
    correctIndex: 1,
    explanation: 'Saptama Masa Garbhini Paricharya specifically prescribes Payasa (rice cooked in milk) processed with Priyala (Buchanania lanzan), Shringataka (Trapa bispinosa), and Ghrita. This provides essential fatty acids and neuroprotective nutrients for fetal brain development (Saptama Masa is the period of Buddhi development).',
    referenceText: 'Charaka Samhita Sharirasthana 8; Ashtanga Hridayam Sharirasthana 1',
    ncismCompetency: 'AY/PT/2.2 — Masa Anukrama Garbhini Paricharya'
  },
  {
    id: 6,
    domain: 'Rasashastra & Bhaishajya Kalpana',
    difficulty: 'Reasoning',
    question: 'A batch of Tamra Bhasma (Copper Calcinate) fails the Rekhapurnata (linear suspension) quality control test. Which step in classical Shodhana-Marana process is most likely deficient?',
    options: ['Samanya Shodhana with Tamarind juice alone', 'Insufficient repetitions of Puta (Calcination cycles) using Gaja Puta', 'Incomplete Nirmala Shodhana with Cow urine', 'Excessive Bhavana (trituration) with Kumari Swarasa'],
    correctIndex: 1,
    explanation: 'Rekhapurnata — the ability of the Bhasma particle to enter skin creases — is achieved through sufficient Marana (calcination) cycles. Each Gaja Puta (800°C equivalent calcination) reduces particle size and increases surface reactivity. Insufficient Puta cycles results in coarse particles that fail this standardization test. Multiple Puta (minimum 3-7 cycles) with Bhavana between each are required.',
    referenceText: 'Rasa Tarangini; Ayurvedic Pharmacopoeia of India (API) Vol. 2; Sharangadhara Samhita',
    ncismCompetency: 'AY/RS/4.1 — Bhasma Pariksha & Quality Standards'
  },
  {
    id: 7,
    domain: 'Yoga & Naturopathy',
    difficulty: 'Basic',
    question: 'Bhramari Pranayama (Humming Bee breath) is contraindicated in which of the following conditions?',
    options: ['Hypertension (Raktagata Vata)', 'Otitis Media (active ear infection)', 'Anxiety and Insomnia', 'Migraine headache'],
    correctIndex: 1,
    explanation: 'Bhramari creates internal vibrations and pressure changes within the skull and ear cavities through the humming sound. Active otitis media (ear infection) creates a contraindication as the pressure changes can worsen inflammation and risk tympanic membrane rupture. It is actually beneficial for anxiety, insomnia, and migraine.',
    referenceText: 'Hatha Yoga Pradipika 2/68; Ministry of AYUSH Yoga Protocol Standards',
    ncismCompetency: 'YN/YT/1.5 — Pranayama Indications & Contraindications'
  },
  {
    id: 8,
    domain: 'Samhita & Siddhanta',
    difficulty: 'Reasoning',
    question: 'The Tridosha theory and its pathological manifestations are explained through six classical Kriya Kalas (stages of disease evolution). Which Kriya Kala correctly matches Stage 3 (Prasara)?',
    options: ['Dosha accumulation in their own seats only (Koshtha)', 'Dosha overflow from Koshtha into channels (Srotamsi)', 'Dosha localization in a distant Durbala Dhatu (weak tissue)', 'Manifestation of Vyakta symptoms of disease'],
    correctIndex: 1,
    explanation: 'Prasara (3rd Kriya Kala) is the stage of Dosha overflow/spread from their primary sites (Koshtha — gut) into the Srotas (body channels/microchannels). This is a critical juncture where timely Shodhana (cleansing therapy) can prevent disease progression. Stage 4 (Sthana Samshraya) involves localization in Durbala Dhatu.',
    referenceText: 'Sushruta Samhita Sutrasthana 21; Charaka Samhita Sutra 17',
    ncismCompetency: 'AY/SS/1.3 — Kriya Kala and Therapeutic Windows'
  }
];

interface DomainScore {
  domain: string;
  correct: number;
  total: number;
}

export default function NExTExamPage() {
  const [examStarted, setExamStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(NEXT_MOCK_BANK.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [examComplete, setExamComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes (1 min per Q)
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) {
      setExamComplete(true);
      setTimerActive(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timerActive, timeLeft]);

  const question = NEXT_MOCK_BANK[currentQ];
  const selected = selectedAnswers[currentQ];

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    const updated = [...selectedAnswers];
    updated[currentQ] = idx;
    setSelectedAnswers(updated);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQ < NEXT_MOCK_BANK.length - 1) {
      setCurrentQ((p) => p + 1);
    } else {
      setExamComplete(true);
      setTimerActive(false);
    }
  };

  const score = selectedAnswers.filter((a, i) => a === NEXT_MOCK_BANK[i].correctIndex).length;
  const pct = Math.round((score / NEXT_MOCK_BANK.length) * 100);

  const domainScores = NEXT_MOCK_BANK.reduce<DomainScore[]>((acc, q, i) => {
    const existing = acc.find((d) => d.domain === q.domain);
    const isCorrect = selectedAnswers[i] === q.correctIndex;
    if (existing) {
      existing.total++;
      if (isCorrect) existing.correct++;
    } else {
      acc.push({ domain: q.domain, correct: isCorrect ? 1 : 0, total: 1 });
    }
    return acc;
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!examStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-8 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 text-xs font-bold border border-amber-500/40">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            <span>NCISM NExT National Exit Test · Mock Readiness Module</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              NExT Exam Readiness
            </h1>
            <p className="text-sm text-zinc-300 mt-2">AI-Curated MCQ Bank aligned with NCISM Competency Blueprint 2023</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Questions', value: `${NEXT_MOCK_BANK.length} MCQs`, color: 'text-emerald-400' },
              { label: 'Duration', value: `${NEXT_MOCK_BANK.length} minutes`, color: 'text-amber-400' },
              { label: 'Difficulty', value: 'Mixed', color: 'text-blue-400' },
              { label: 'Domains', value: '6 Subjects', color: 'text-teal-400' }
            ].map((item) => (
              <div key={item.label} className="bg-slate-950/60 p-3 rounded-xl border border-white/10">
                <span className={`text-xl font-black block font-mono ${item.color}`}>{item.value}</span>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 text-left text-xs text-amber-200 space-y-1">
            <p className="font-bold text-amber-300">Instructions:</p>
            <p>• Each question has one correct answer. Select the best option.</p>
            <p>• Instant AI explanation with classical text reference is shown after each answer.</p>
            <p>• Your domain-wise score and NCISM competency gap report is generated at the end.</p>
            <p>• This mock is aligned to the NCISM NExT Part 1 (Theory) Competency Framework.</p>
          </div>

          <button
            onClick={() => { setExamStarted(true); setTimerActive(true); }}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-base font-black shadow-xl flex items-center space-x-3 mx-auto transition-all"
          >
            <Brain className="w-5 h-5" />
            <span>Start NExT Mock Exam</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (examComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-8 shadow-2xl space-y-8">
          {/* Score Header */}
          <div className="text-center space-y-4">
            <Trophy className={`w-16 h-16 mx-auto ${pct >= 70 ? 'text-amber-400' : pct >= 50 ? 'text-yellow-500' : 'text-zinc-500'}`} />
            <div>
              <h2 className="text-3xl font-black text-white font-display">NExT Readiness Report</h2>
              <p className="text-zinc-400 text-sm mt-1">Based on {NEXT_MOCK_BANK.length} NCISM Competency-mapped Questions</p>
            </div>

            <div className={`inline-block px-6 py-3 rounded-2xl border-2 ${
              pct >= 70 ? 'border-emerald-500 bg-emerald-950/60' : pct >= 50 ? 'border-amber-500 bg-amber-950/60' : 'border-red-500 bg-red-950/60'
            }`}>
              <span className={`text-5xl font-black font-display ${pct >= 70 ? 'text-emerald-300' : pct >= 50 ? 'text-amber-300' : 'text-red-300'}`}>
                {score}/{NEXT_MOCK_BANK.length}
              </span>
              <span className="text-2xl font-black text-white ml-2">({pct}%)</span>
              <p className={`text-sm font-bold mt-1 ${pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                {pct >= 70 ? '✓ NExT Ready — Excellent Preparation' : pct >= 50 ? '△ Moderate — Targeted Revision Needed' : '✗ More Practice Required Before NExT'}
              </p>
            </div>
          </div>

          {/* Domain-wise Report */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-zinc-300 uppercase tracking-wider">Domain-wise Performance Analysis</h3>
            <div className="space-y-3">
              {domainScores.map((d) => {
                const pctD = Math.round((d.correct / d.total) * 100);
                return (
                  <div key={d.domain} className="bg-slate-950/60 p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate max-w-[70%]">{d.domain}</span>
                      <span className={`font-mono font-black ${pctD >= 70 ? 'text-emerald-400' : pctD >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        {d.correct}/{d.total} ({pctD}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${pctD >= 70 ? 'bg-emerald-500' : pctD >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${pctD}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review wrong answers */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-zinc-300 uppercase tracking-wider">Questions for Review</h3>
            {NEXT_MOCK_BANK.map((q, i) => {
              const isCorrect = selectedAnswers[i] === q.correctIndex;
              if (isCorrect) return null;
              return (
                <div key={q.id} className="bg-red-950/30 border border-red-500/30 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-bold text-red-300">{q.domain}</p>
                  <p className="text-sm text-white font-medium">{q.question}</p>
                  <p className="text-xs text-emerald-300">
                    <strong>Correct:</strong> {q.options[q.correctIndex]}
                  </p>
                  <p className="text-xs text-zinc-400 italic leading-relaxed">{q.explanation}</p>
                  <p className="text-[10px] font-mono text-zinc-500">Ref: {q.referenceText}</p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setCurrentQ(0);
                setSelectedAnswers(Array(NEXT_MOCK_BANK.length).fill(null));
                setShowExplanation(false);
                setExamComplete(false);
                setTimeLeft(8 * 60);
                setTimerActive(true);
              }}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center space-x-2 border border-white/10"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Mock Exam</span>
            </button>
            <Link
              href="/gap-analysis"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm flex items-center justify-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>View Full Gap Analysis</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

      {/* Exam Header Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-zinc-400">Q {currentQ + 1}/{NEXT_MOCK_BANK.length}</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-zinc-300 text-[10px] font-bold border border-white/10">
            {question.domain}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            question.difficulty === 'Reasoning' ? 'bg-red-950 text-red-300 border border-red-500/30' :
            question.difficulty === 'Applied' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
            'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
          }`}>
            {question.difficulty}
          </span>
        </div>

        {/* Timer */}
        <div className={`flex items-center space-x-1.5 font-mono font-black text-sm ${timeLeft < 60 ? 'text-red-400' : 'text-amber-300'}`}>
          <Clock className="w-4 h-4" />
          <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${((currentQ + 1) / NEXT_MOCK_BANK.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/95 rounded-2xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            let style = 'bg-slate-950/80 border-white/10 text-zinc-200 hover:border-emerald-500/40 hover:bg-slate-900 cursor-pointer';
            if (selected !== null) {
              if (idx === question.correctIndex) {
                style = 'bg-emerald-950/80 border-emerald-500 text-white cursor-default';
              } else if (idx === selected && selected !== question.correctIndex) {
                style = 'bg-red-950/80 border-red-500 text-white cursor-default';
              } else {
                style = 'bg-slate-950/40 border-white/5 text-zinc-400 cursor-default opacity-60';
              }
            }
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm font-medium flex items-center space-x-3 ${style}`}
              >
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 text-[11px] font-black">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
                {selected !== null && idx === question.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />
                )}
                {selected === idx && idx !== question.correctIndex && (
                  <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Panel */}
        {showExplanation && (
          <div className={`p-5 rounded-xl border text-sm leading-relaxed space-y-3 animate-in fade-in ${
            selected === question.correctIndex
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-100'
              : 'bg-red-950/60 border-red-500/50 text-red-100'
          }`}>
            <div className="flex items-center space-x-2 font-bold">
              {selected === question.correctIndex ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span className="text-emerald-300">Correct! Well done.</span></>
              ) : (
                <><XCircle className="w-4 h-4 text-red-400" /><span className="text-red-300">Incorrect. Study the explanation below.</span></>
              )}
            </div>
            <p className="text-white/90">{question.explanation}</p>
            <div className="text-xs space-y-1 pt-2 border-t border-white/10">
              <p className="text-zinc-300 font-mono"><strong>Reference:</strong> {question.referenceText}</p>
              <p className="text-amber-300 font-bold"><strong>NCISM Competency:</strong> {question.ncismCompetency}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        {showExplanation && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm flex items-center space-x-2 shadow-lg transition-all"
            >
              <span>{currentQ < NEXT_MOCK_BANK.length - 1 ? 'Next Question' : 'View Results'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
