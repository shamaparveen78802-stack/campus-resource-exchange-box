import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { ResourceItem, SkillSwapItem } from '../types';
import {
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  BookOpen,
  Laptop,
  HeartHandshake,
  Recycle,
  Coins,
  Users,
  PlusCircle,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface DashboardViewProps {
  onOpenListModal: () => void;
  onOpenWishModal: () => void;
  onSelectResource: (item: ResourceItem) => void;
  onSelectSkill: (skill: SkillSwapItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenListModal,
  onOpenWishModal,
  onSelectResource,
  onSelectSkill
}) => {
  const {
    currentUser,
    campusStats,
    resources,
    skills,
    executeAIMatch,
    setActivePage,
    requestResource
  } = useCampus();

  const [inputQuery, setInputQuery] = useState('');

  const samplePrompts = [
    'I need a Data Structures textbook',
    'I need a calculator for tomorrow’s exam',
    'I want someone to teach me Python',
    'I have unused hostel items to donate'
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const queryToUse = inputQuery.trim() || 'I need engineering math book and calculus help';
    executeAIMatch(queryToUse);
  };

  const handlePromptClick = (prompt: string) => {
    setInputQuery(prompt);
    executeAIMatch(prompt);
  };

  // Recommended items from current active pool
  const recommendedResources = resources.filter(r => r.status === 'available').slice(0, 3);
  const recommendedSkills = skills.slice(0, 2);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcoming Hero & Search Box - Geometric Balance Layout */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            AI-Powered Campus Ecosystem
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-slate-900">
            Welcome back, {(currentUser?.name || 'Student').split(' ')[0]}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed max-w-2xl font-normal">
            What do you need today? Ask our campus AI to discover course textbooks, lab equipment, hostel essentials, or peer mentors across university hostels.
          </p>

          {/* Main CTA Search Input */}
          <form onSubmit={handleSearch} className="mt-6">
            <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-200 focus-within:border-indigo-600 focus-within:bg-white transition flex flex-col sm:flex-row items-stretch gap-2">
              <div className="flex-1 flex items-center gap-3 px-3">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  id="dashboard-main-search"
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="e.g. 'I need a Data Structures textbook' or 'Someone to teach Python'..."
                  className="w-full py-2 text-sm sm:text-base text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium font-sans"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  id="dashboard-find-match-btn"
                  className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition flex items-center justify-center gap-2 shadow-xs border border-indigo-700/30"
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  Find a Match
                </button>
                <button
                  type="button"
                  id="dashboard-post-need-btn"
                  onClick={onOpenWishModal}
                  className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-lg transition flex items-center justify-center gap-1.5 border border-slate-200 shadow-xs"
                >
                  <PlusCircle className="w-4 h-4 text-slate-500" />
                  Post a Need
                </button>
              </div>
            </div>
          </form>

          {/* Prompt sample chips */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">Try asking:</span>
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePromptClick(prompt)}
                className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 transition border border-slate-200 hover:border-indigo-200 text-left truncate max-w-[280px] font-medium"
              >
                “{prompt}”
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Campus Statistics Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Campus Community Impact
          </h2>
          <button
            onClick={() => setActivePage('impact')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            View Full Analytics <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1: Resources Reused */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🎒</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                +4 this week
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 font-display">
                {campusStats.resourcesReused}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                Resources Reused
              </div>
            </div>
          </div>

          {/* Stat 2: Skills Exchanged */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🤝</span>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-md">
                100% Free
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 font-display">
                {campusStats.skillsExchanged}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                Skills Exchanged
              </div>
            </div>
          </div>

          {/* Stat 3: Money Saved */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
            <div className="flex items-center justify-between">
              <span className="text-2xl">💰</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                Student wallets
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 font-display">
                ₹{campusStats.moneySaved.toLocaleString()}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                Estimated Saved
              </div>
            </div>
          </div>

          {/* Stat 4: Waste Avoided */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
            <div className="flex items-center justify-between">
              <span className="text-2xl">♻️</span>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-md">
                Zero Landfill
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 font-display">
                {campusStats.wasteAvoidedKg} kg
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                Diverted From Waste
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recommended For You (AI-Powered) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Recommended for You
            </h2>
            <p className="text-xs text-slate-500">
              Personalized based on {currentUser.department} syllabus and hostel vicinity
            </p>
          </div>
          <button
            onClick={() => setActivePage('exchange')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Browse All Marketplace <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedResources.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {item.imageEmoji}
                  </div>
                  <div className="text-right">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                      item.exchangeType === 'Free'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                        : item.exchangeType === 'Exchange'
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200/60'
                        : 'bg-amber-50 text-amber-700 border-amber-200/60'
                    }`}>
                      {item.exchangeType}
                    </span>
                    <div className="text-xs font-bold text-slate-900 mt-1">
                      Save ₹{item.estimatedValue}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Location & Custodian */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.ownerReputation}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectResource(item)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white bg-transparent rounded-lg border border-transparent hover:border-slate-200 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => requestResource(item.id)}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs border border-indigo-700/30 transition"
                >
                  Request Item
                </button>
              </div>
            </div>
          ))}

          {/* Skill Mentor Card in Recommendation */}
          {recommendedSkills.slice(0, 1).map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
                    🤝 Peer SkillSwap
                  </span>
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {skill.rating} Rating
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={skill.studentAvatar}
                    alt={skill.studentName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      {skill.studentName}
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </h3>
                    <p className="text-[11px] text-slate-500">{skill.studentDepartment}</p>
                  </div>
                </div>

                <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200/80 text-xs">
                  <div className="text-slate-500 font-medium">Teaches:</div>
                  <div className="font-bold text-indigo-950 mt-0.5">{skill.skillOffered}</div>
                  <div className="text-slate-500 font-medium mt-2">Looking for:</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{skill.skillWanted}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectSkill(skill)}
                  className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs border border-indigo-700/30 transition"
                >
                  Propose Swap with {skill.studentName.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* 4. Education & Peer Learning Hub */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Learning & Education Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Turn campus resources and student skills into real learning opportunities.
            </p>
          </div>

          <button
            onClick={() => setActivePage('ai-match')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Find Learning Help <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Learning Resource */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-indigo-200 hover:shadow-sm transition">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>

            <h3 className="font-bold text-slate-900 mt-4">
              Study Resources
            </h3>

            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Find affordable textbooks, calculators, lab equipment and other
              academic resources shared by students.
            </p>

            <button
              onClick={() => setActivePage('exchange')}
              className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Explore Resources <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Peer Learning */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-indigo-200 hover:shadow-sm transition">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>

            <h3 className="font-bold text-slate-900 mt-4">
              Peer-to-Peer Learning
            </h3>

            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Connect with students who can explain difficult topics, teach
              practical skills, or help you prepare for exams.
            </p>

            <button
              onClick={() => setActivePage('skillswap')}
              className="mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              Find a Peer Mentor <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Learning Path */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-indigo-200 hover:shadow-sm transition">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
            </div>

            <h3 className="font-bold text-slate-900 mt-4">
              Learn → Practice → Share
            </h3>

            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  1
                </span>
                Find the right learning resource
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  2
                </span>
                Learn with a peer mentor
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  3
                </span>
                Share your knowledge with others
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Quick Feature Banner: The Core Philosophy */}
      <section className="bg-slate-100/90 rounded-xl p-6 border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Campus Trust & Sustainability
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            “What do you need, and how can your campus community fulfill it?”
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Pass textbooks to juniors, swap programming help for presentation coaching, and track the multi-year journey of items via our Resource Chain.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setActivePage('resource-chain')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white border border-slate-200 rounded-lg shadow-xs transition"
          >
            Explore Resource Chain
          </button>
          <button
            onClick={() => setActivePage('donate')}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs border border-emerald-700/30 transition"
          >
            Donate Items
          </button>
        </div>
      </section>
    </div>
  );
};
