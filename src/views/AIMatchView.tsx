import React, { useState, useEffect } from 'react';
import { useCampus } from '../context/CampusContext';
import { analyzeCampusNeed, AIMatchAnalysis } from '../services/aiMatcher';
import { ResourceItem, SkillSwapItem } from '../types';
import {
  Sparkles,
  Search,
  BookOpen,
  Users,
  Brain,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Coins,
  Send,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Info
} from 'lucide-react';

interface AIMatchViewProps {
  onSelectResource: (item: ResourceItem) => void;
  onSelectSkill: (skill: SkillSwapItem) => void;
}

export const AIMatchView: React.FC<AIMatchViewProps> = ({
  onSelectResource,
  onSelectSkill
}) => {
  const {
    resources,
    skills,
    aiMatchQuery,
    setAiMatchQuery,
    requestResource,
    requestSkillSwap,
    addToast
  } = useCampus();

  const [query, setQuery] = useState(aiMatchQuery);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIMatchAnalysis | null>(null);

  const sampleQueries = [
    'I need a second-hand engineering mathematics book and someone who can help me understand calculus.',
    'I need a calculator for tomorrow’s exam and quick formula review',
    'I want someone to teach me Python in exchange for Excel data analysis',
    'Looking for an electric kettle or desk riser for hostel room'
  ];

  // Run matching
  const runMatching = (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) return;
    setIsAnalyzing(true);

    // Simulate pleasant micro-delay for realistic AI reasoning UI
    setTimeout(() => {
      const result = analyzeCampusNeed(textToAnalyze, resources, skills);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 450);
  };

  // Run on mount or when context aiMatchQuery changes
  useEffect(() => {
    setQuery(aiMatchQuery);
    runMatching(aiMatchQuery);
  }, [aiMatchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAiMatchQuery(query);
    runMatching(query);
  };

  const handleChipClick = (q: string) => {
    setQuery(q);
    setAiMatchQuery(q);
    runMatching(q);
  };

  const handleConnectPerson = (personName: string) => {
    addToast(
      'Peer Connection Request Sent',
      `Notification sent to ${personName}. They will receive your campus handle to arrange a meetup.`,
      'success'
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & AI Explanation - Geometric Balance */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Intelligent Campus Semantic Engine
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            AI Match
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            “Tell us what you need. We'll find the best solution in your campus community.”
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative">
              <textarea
                id="ai-match-query-input"
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your needs in plain words (e.g. 'I need a second-hand engineering mathematics book and someone who can help me understand calculus')..."
                className="w-full p-4 pr-32 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-indigo-600 bg-slate-50/60 focus:bg-white outline-none text-slate-800 text-sm sm:text-base resize-none shadow-xs transition font-sans"
              ></textarea>

              <button
                type="submit"
                id="ai-match-submit-btn"
                disabled={isAnalyzing}
                className="absolute right-3 bottom-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition flex items-center gap-1.5 shadow-xs border border-indigo-700/30 disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin text-indigo-200" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-indigo-200" />
                    <span>Find Best Match</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Example prompt pills */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-semibold">Try queries:</span>
            {sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(sample)}
                className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 hover:border-indigo-200 transition text-left truncate max-w-[280px] font-medium"
              >
                “{sample}”
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Analysis Overview & Combo Synergy */}
      {analysis && (
        <>
          {/* Analysis Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/90 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-500 uppercase tracking-wider">
                Needs Detected:
              </span>
              {analysis.extractedNeeds.map((need, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white text-indigo-700 font-semibold rounded-md border border-slate-200/80 shadow-2xs"
                >
                  {need}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Overall Match Confidence:</span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold rounded-md text-xs">
                {analysis.overallMatchScore}% Match
              </span>
            </div>
          </div>

          {/* Combo Synergy (When both physical resource & peer mentor match) */}
          {analysis.comboSynergy && (
            <div className="p-5 sm:p-6 bg-slate-900 rounded-xl text-white shadow-xs border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider border border-indigo-500/30">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Synergy Recommendation
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  {analysis.comboSynergy.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {analysis.comboSynergy.description}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="bg-white/10 px-4 py-2 rounded-lg text-center border border-white/10">
                  <div className="text-[10px] uppercase text-slate-300 font-semibold">
                    Combined Savings
                  </div>
                  <div className="text-lg font-bold text-white">
                    ₹{analysis.comboSynergy.combinedSavings}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. The Three Distinct Solution Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* COLUMN 1: 📚 Resources */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  📚 Resources
                </h2>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                  {analysis.resources.length} found
                </span>
              </div>

              {analysis.resources.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                  No direct material found. Post to Wishlist to notify students!
                </div>
              ) : (
                analysis.resources.map((mr) => (
                  <div
                    key={mr.item.id}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition p-4 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{mr.item.imageEmoji}</span>
                          <div>
                            <span className="text-[10px] font-semibold uppercase text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
                              {mr.item.category}
                            </span>
                            <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                              {mr.item.title}
                            </h3>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex-shrink-0">
                          {mr.matchScore}% Match
                        </span>
                      </div>

                      {/* Details specs */}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Available from</span>
                          <span className="font-semibold text-slate-800">{mr.item.ownerName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Condition</span>
                          <span className="font-semibold text-slate-800">{mr.item.condition}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Distance</span>
                          <span className="font-semibold text-slate-800 truncate block">
                            {mr.item.location}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Estimated saving</span>
                          <span className="font-bold text-emerald-700">₹{mr.item.estimatedValue}</span>
                        </div>
                      </div>

                      {/* Why relevant */}
                      <div className="mt-2.5 p-2 bg-indigo-50/60 rounded-lg text-[11px] text-indigo-900 leading-relaxed flex items-start gap-1.5 border border-indigo-100/60">
                        <Info className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>{mr.reason}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => onSelectResource(mr.item)}
                        className="flex-1 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => requestResource(mr.item.id)}
                        className="flex-1 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs border border-indigo-700/30 transition"
                      >
                        Request Item
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* COLUMN 2: 🤝 People */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Users className="w-5 h-5 text-indigo-600" />
                  🤝 People
                </h2>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                  {analysis.people.length} matches
                </span>
              </div>

              {analysis.people.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                  No verified peer matches yet. Check SkillSwap for open requests!
                </div>
              ) : (
                analysis.people.map((mp) => (
                  <div
                    key={mp.student.id}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition p-4 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={mp.student.avatar}
                            alt={mp.student.name}
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                              {mp.student.name}
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </h3>
                            <p className="text-[11px] text-slate-500">{mp.student.department}</p>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60 flex-shrink-0">
                          {mp.matchScore}% Match
                        </span>
                      </div>

                      {/* Key profile specs */}
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[10px]">Can help with:</span>
                          <span className="font-semibold text-indigo-950 truncate max-w-[170px]">
                            {mp.student.skills.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[10px]">Availability:</span>
                          <span className="font-medium text-slate-700">{mp.student.availability}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[10px]">Reputation:</span>
                          <span className="font-bold text-amber-700 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ★ {mp.student.reputation}
                          </span>
                        </div>
                      </div>

                      {/* Why relevant */}
                      <div className="mt-2.5 p-2 bg-indigo-50/60 rounded-lg text-[11px] text-indigo-900 leading-relaxed flex items-start gap-1.5 border border-indigo-100/60">
                        <Info className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>{mp.reason}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => handleConnectPerson(mp.student.name)}
                        className="w-full py-1.5 text-xs font-semibold text-slate-800 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg transition flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3 h-3 text-indigo-600" />
                        Connect with {mp.student.name.split(' ')[0]}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* COLUMN 3: 🧠 Skills */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  🧠 Skills
                </h2>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                  {analysis.skills.length} available
                </span>
              </div>

              {analysis.skills.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                  No matching skill swap offerings found.
                </div>
              ) : (
                analysis.skills.map((ms) => (
                  <div
                    key={ms.skillSwap.id}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition p-4 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold uppercase text-violet-700 bg-violet-50 border border-violet-200/60 px-2 py-0.5 rounded">
                            {ms.skillSwap.skillOfferedCategory}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {ms.skillSwap.skillOffered}
                          </h3>
                        </div>

                        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-violet-50 text-violet-700 border border-violet-200/60 flex-shrink-0">
                          {ms.matchScore}% Match
                        </span>
                      </div>

                      {/* Skill specs */}
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[10px]">Offered by:</span>
                          <span className="font-semibold text-slate-800">
                            {ms.skillSwap.studentName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[10px]">Format:</span>
                          <span className="font-medium text-slate-700">
                            Peer-to-peer ({ms.skillSwap.format})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[10px]">Availability:</span>
                          <span className="font-medium text-slate-700">
                            {ms.skillSwap.availability}
                          </span>
                        </div>
                      </div>

                      {/* Why relevant */}
                      <div className="mt-2.5 p-2 bg-indigo-50/60 rounded-lg text-[11px] text-indigo-900 leading-relaxed flex items-start gap-1.5 border border-indigo-100/60">
                        <Info className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>{ms.reason}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => onSelectSkill(ms.skillSwap)}
                        className="w-full py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs border border-indigo-700/30 transition flex items-center justify-center gap-1"
                      >
                        Book Peer Session / Swap
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

