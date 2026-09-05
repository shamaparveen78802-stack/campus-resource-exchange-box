import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { SkillSwapItem } from '../types';
import {
  ArrowLeftRight,
  Sparkles,
  Search,
  PlusCircle,
  ShieldCheck,
  Star,
  Clock,
  Laptop,
  CheckCircle2,
  Users,
  Send,
  Zap
} from 'lucide-react';

interface SkillSwapViewProps {
  onOpenOfferSkillModal: () => void;
  onOpenWishModal: () => void;
  onSelectSkill: (skill: SkillSwapItem) => void;
}

export const SkillSwapView: React.FC<SkillSwapViewProps> = ({
  onOpenOfferSkillModal,
  onOpenWishModal,
  onSelectSkill
}) => {
  const { skills, currentUser, requestSkillSwap } = useCampus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'Coding', label: '💻 Coding' },
    { id: 'Math & Science', label: '🔬 Math & Science' },
    { id: 'Design', label: '🎨 Design' },
    { id: 'Academics', label: '📚 Academics' },
    { id: 'Languages', label: '🗣️ Languages' }
  ];

  const filteredSkills = skills.filter((item) => {
    if (selectedCategory !== 'all' && item.skillOfferedCategory !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchOffered = item.skillOffered.toLowerCase().includes(q);
      const matchWanted = item.skillWanted.toLowerCase().includes(q);
      const matchName = item.studentName.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchOffered && !matchWanted && !matchName && !matchDesc) return false;
    }
    return true;
  });

  // Find Mutual Match Synergy: E.g., current user can teach Excel and needs Python, Priya offers Python and wants Excel!
  const mutualMatch = skills.find(
    (s) =>
      s.studentId !== currentUser?.id &&
      (s.skillWanted.toLowerCase().includes('excel') || s.skillWanted.toLowerCase().includes('data')) &&
      s.skillOffered.toLowerCase().includes('python')
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold mb-2 uppercase tracking-wider">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Peer Skill Sharing
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            SkillSwap
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Exchange skills with other students. Teach what you know, learn what you need — 100% free and peer-guided.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="skillswap-offer-btn"
            onClick={onOpenOfferSkillModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs border border-indigo-700/30 transition"
          >
            <PlusCircle className="w-4 h-4" />
            Offer a Skill
          </button>
          <button
            id="skillswap-request-btn"
            onClick={onOpenWishModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition"
          >
            Request a Skill
          </button>
        </div>
      </div>

      {/* 2. Intelligent Mutual Match Suggestion Highlight */}
      {mutualMatch && (
        <div className="p-5 sm:p-6 bg-slate-900 rounded-xl text-white shadow-xs border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider border border-indigo-500/30">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Mutual Synergy Match
            </div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              “You can teach Excel to {mutualMatch.studentName.split(' ')[0]}, and {mutualMatch.studentName.split(' ')[0]} can help you with Python.”
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our campus AI detected complementary learning objectives. You both have matching availability for weekday evenings!
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              id="initiate-mutual-swap-btn"
              onClick={() => onSelectSkill(mutualMatch)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-lg transition shadow-xs border border-indigo-500 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              Initiate Mutual Swap
            </button>
          </div>
        </div>
      )}

      {/* 3. Category Filter & Search */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold shadow-xs border border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill name (Python, Calculus, Figma, SQL, Excel) or student..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-sans shadow-xs transition"
          />
        </div>
      </div>

      {/* 4. Skills Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((skill) => {
          const isOwn = skill.studentId === currentUser.id;

          return (
            <div
              key={skill.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5">
                {/* Student header with verified badge and rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={skill.studentAvatar}
                      alt={skill.studentName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        {skill.studentName}
                        {skill.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-500">{skill.studentDepartment}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    {skill.rating}
                  </div>
                </div>

                {/* Skill Offered & Skill Wanted Box */}
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100/80">
                    <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                      Can Teach
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {skill.skillOffered}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Level: {skill.skillOfferedLevel}
                    </span>
                  </div>

                  <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100/80">
                    <div className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                      Looking For
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">
                      {skill.skillWanted}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>

                {/* Details Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{skill.availability}</span>
                  </div>
                  <span className="text-[11px] bg-slate-100 border border-slate-200/70 px-2 py-0.5 rounded-md text-slate-600 font-medium">
                    {skill.format}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-3 bg-slate-50/80 border-t border-slate-100">
                <button
                  disabled={isOwn}
                  onClick={() => onSelectSkill(skill)}
                  className={`w-full py-2 text-xs font-semibold rounded-lg shadow-xs transition flex items-center justify-center gap-1.5 border ${
                    isOwn
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700/30'
                  }`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  {isOwn ? 'Your Own Offering' : 'Request Skill Swap'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
