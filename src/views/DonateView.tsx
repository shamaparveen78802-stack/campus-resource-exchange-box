import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { DonationItem } from '../types';
import {
  HeartHandshake,
  Gift,
  PlusCircle,
  MapPin,
  CheckCircle2,
  Sparkles,
  Heart,
  ArrowRight,
  ShieldCheck,
  Recycle
} from 'lucide-react';

interface DonateViewProps {
  onOpenDonateModal: () => void;
}

export const DonateView: React.FC<DonateViewProps> = ({ onOpenDonateModal }) => {
  const { donations, claimDonation, currentUser } = useCampus();

  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Donated Items' },
    { id: 'books', label: '📚 Books' },
    { id: 'electronics', label: '💻 Electronics' },
    { id: 'stationery', label: '✏️ Stationery' },
    { id: 'hostel', label: '🛏️ Hostel Items' },
    { id: 'clothes', label: '👕 Clothes' }
  ];

  const filtered = donations.filter((item) => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    return true;
  });

  const dropOffLocations = [
    {
      title: 'Central Library Drop-Box',
      desc: 'Ground floor atrium beside circulation desk. Open 24/7.',
      icon: '📚'
    },
    {
      title: 'Student Welfare Center (Room 12)',
      desc: 'Drop off electronics, lab supplies, and textbooks. 9 AM - 6 PM.',
      icon: '🏛️'
    },
    {
      title: 'Hostel Block D Warden Office',
      desc: 'For hostel furniture, curtains, blankets, and heaters.',
      icon: '🛏️'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            Campus Give-Back Program
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-slate-900">
            Give What You Don't Need
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Pass on unused textbooks, calculators, lab coats, and hostel fixtures. Ensure nothing goes to waste and support fellow students in financial need.
          </p>
        </div>

        <button
          id="donate-open-modal-btn"
          onClick={onOpenDonateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs border border-emerald-700/30 transition flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Donate an Item
        </button>
      </div>

      {/* 2. Official Drop-off Locations */}
      <section>
        <h2 className="text-base font-bold text-slate-900 tracking-tight font-display mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          Campus Designated Drop-Off Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dropOffLocations.map((loc, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex items-start gap-3 hover:border-slate-300 transition"
            >
              <div className="text-2xl p-2 bg-emerald-50 border border-emerald-100/60 rounded-lg">{loc.icon}</div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{loc.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{loc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Category Filter & Donated Items Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  filterCategory === cat.id
                    ? 'bg-slate-900 text-white font-semibold border border-slate-900'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {filtered.length} items donated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filtered.map((item) => {
            const isClaimed = item.status === 'claimed';

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm transition p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-2xl">
                        {item.imageEmoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {item.condition}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-1">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                      isClaimed
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                    }`}>
                      {isClaimed ? 'Claimed' : 'Available Free'}
                    </span>
                  </div>

                  {/* Impact Story / Quote */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Community Impact Story
                    </div>
                    <p className="text-slate-700 italic leading-relaxed">
                      “{item.impactStory}”
                    </p>
                  </div>

                  {/* Donor & Drop-off details */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.donorAvatar}
                        alt={item.donorName}
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <span className="font-medium text-slate-700">Donated by {item.donorName}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
                  </div>

                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{item.dropoffSpot}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  {isClaimed ? (
                    <div className="text-xs text-slate-500 text-center bg-slate-50 py-2 rounded-lg border border-slate-200/60">
                      ✓ Claimed by {item.claimedBy || 'a student'} ({item.claimedAt || 'recently'})
                    </div>
                  ) : (
                    <button
                      id={`claim-donation-${item.id}`}
                      onClick={() => claimDonation(item.id)}
                      className="w-full py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs border border-emerald-700/30 transition flex items-center justify-center gap-1.5"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      Claim This Free Item
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
