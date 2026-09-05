import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { MONTHLY_IMPACT_DATA } from '../data/mockData';
import {
  BarChart3,
  TrendingUp,
  Coins,
  Recycle,
  Leaf,
  Users,
  Award,
  Download,
  Share2,
  Calendar,
  Building,
  CheckCircle2
} from 'lucide-react';

export const ImpactView: React.FC = () => {
  const { campusStats, currentUser, addToast } = useCampus();

  const [activeMetric, setActiveMetric] = useState<'savings' | 'resources'>('savings');

  const maxSavings = Math.max(...MONTHLY_IMPACT_DATA.map((d) => d.savings));
  const maxResources = Math.max(...MONTHLY_IMPACT_DATA.map((d) => d.resources));

  const handleShareCertificate = () => {
    addToast(
      'Impact Summary Copied!',
      `You have contributed to diverting ${currentUser.donationsCount + 2}kg of waste and saving ₹${currentUser.moneySaved}.`,
      'success'
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold mb-2 uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Social, Financial & Ecological Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            Campus Impact Dashboard
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
            Real-time aggregate data on money saved by students, carbon and landfill waste prevented, and peer knowledge exchanges.
          </p>
        </div>

        <button
          onClick={handleShareCertificate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition flex-shrink-0"
        >
          <Share2 className="w-4 h-4 text-slate-500" />
          Share Impact Certificate
        </button>
      </div>

      {/* 2. Three Impact Categories: Financial, Environmental, Community */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* FINANCIAL IMPACT */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Financial Impact
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              💰
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900 font-display tracking-tight">
              ₹{campusStats.moneySaved.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              Estimated Total Student Money Saved
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Avg per student</span>
              <span className="font-bold text-slate-800">
  ₹{campusStats.activeStudents > 0
    ? Math.round(campusStats.moneySaved / campusStats.activeStudents).toLocaleString()
    : 0} / student
</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Zero-interest peer value</span>
              <span className="font-bold text-emerald-600">
  Peer-to-Peer
</span>
            </div>
          </div>
        </div>

        {/* ENVIRONMENTAL IMPACT */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Environmental Impact
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              ♻️
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900 font-display tracking-tight">
              {campusStats.wasteAvoidedKg} kg
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              Diverted from Landfills & Incineration
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Items Reused</span>
              <span className="font-bold text-slate-800">{campusStats.resourcesReused} active items</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Paper & Trees Saved</span>
              <span className="font-bold text-emerald-700">
  ~{Math.max(1, Math.round(campusStats.wasteAvoidedKg / 21))} Trees
</span>
            </div>
          </div>
        </div>

        {/* COMMUNITY IMPACT */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Community Impact
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 flex items-center justify-center font-bold">
              🤝
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900 font-display tracking-tight">
              {campusStats.skillsExchanged} Sessions
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              Peer Mentorship & Skill Swaps
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Students Connected</span>
              <span className="font-bold text-slate-800">{campusStats.activeStudents}+ students</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Mutual Swaps</span>
              <span className="font-bold text-purple-700">
  {campusStats.skillsExchanged} Skill Swaps
</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Monthly Trend Chart Visualization */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">
              Monthly Trend Analytics
            </h2>
            <p className="text-xs text-slate-500">
              Progression over recent semester academic cycles
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-lg border border-slate-200/70">
            <button
              onClick={() => setActiveMetric('savings')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeMetric === 'savings'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Money Saved (₹)
            </button>
            <button
              onClick={() => setActiveMetric('resources')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeMetric === 'resources'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Resources Reused
            </button>
          </div>
        </div>

        {/* Clean CSS/SVG Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-2 pt-6 px-2 sm:px-6 border-b border-slate-100">
          {MONTHLY_IMPACT_DATA.map((item, idx) => {
            const heightPercent =
              activeMetric === 'savings'
                ? Math.round((item.savings / maxSavings) * 100)
                : Math.round((item.resources / maxResources) * 100);

            const displayValue =
              activeMetric === 'savings' ? `₹${item.savings.toLocaleString()}` : `${item.resources}`;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded shadow-2xs pointer-events-none mb-1">
                  {displayValue}
                </div>
                <div
                  style={{ height: `${Math.max(12, heightPercent)}%` }}
                  className={`w-full max-w-[48px] rounded-t-md transition-all duration-300 group-hover:brightness-95 ${
                    activeMetric === 'savings'
                      ? 'bg-indigo-600'
                      : 'bg-emerald-600'
                  }`}
                ></div>
                <span className="text-xs font-semibold text-slate-500 mt-2">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Leaderboards & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 font-display mb-4">
            Exchange Category Distribution
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>📚 Academic Textbooks & Notes</span>
                <span>42%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-md overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-md" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>💻 Electronics & Calculators</span>
                <span>26%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-md overflow-hidden">
                <div className="bg-blue-600 h-full rounded-md" style={{ width: '26%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>🛏️ Hostel & Living Essentials</span>
                <span>18%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-md overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-md" style={{ width: '18%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>✏️ Engineering Stationery & Kits</span>
                <span>14%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-md overflow-hidden">
                <div className="bg-amber-600 h-full rounded-md" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Hostel Sustainable Leaderboard */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 font-display mb-4 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-indigo-600" />
            Hostel Sustainability Leaderboard
          </h3>
          <div className="space-y-2.5">
            {[
              { rank: 1, name: 'Hostel Block C', items: 112, savings: '₹48,200', badge: '🥇 Top Sharing Hostel' },
              { rank: 2, name: 'Hostel Block B', items: 89, savings: '₹37,400', badge: '🥈 High Tutor Volume' },
              { rank: 3, name: 'Hostel Block D', items: 74, savings: '₹31,100', badge: '🥉 Lab Equipment Hub' },
              { rank: 4, name: 'Hostel Block A', items: 67, savings: '₹28,800', badge: 'Fresher Support' }
            ].map((hostel) => (
              <div
                key={hostel.rank}
                className="p-3 bg-slate-50/70 rounded-lg border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center">
                    {hostel.rank}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900">{hostel.name}</div>
                    <div className="text-[11px] text-slate-500">{hostel.badge}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{hostel.savings}</div>
                  <div className="text-[10px] text-slate-400">{hostel.items} items reused</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
