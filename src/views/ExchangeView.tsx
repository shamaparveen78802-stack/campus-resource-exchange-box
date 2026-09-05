import React, { useState, useMemo } from 'react';
import { useCampus } from '../context/CampusContext';
import { ResourceItem, CategoryType, ExchangeType } from '../types';
import {
  ShoppingBag,
  Search,
  PlusCircle,
  Filter,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ArrowUpDown,
  Tag,
  CheckCircle2
} from 'lucide-react';

interface ExchangeViewProps {
  onOpenListModal: () => void;
  onSelectResource: (item: ResourceItem) => void;
}

export const ExchangeView: React.FC<ExchangeViewProps> = ({
  onOpenListModal,
  onSelectResource
}) => {
  const { resources, requestResource } = useCampus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ExchangeType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'value-low' | 'value-high' | 'rating'>('recent');

  const categories: Array<{ id: CategoryType | 'all'; label: string; icon: string }> = [
    { id: 'all', label: 'All Items', icon: '✨' },
    { id: 'books', label: 'Books', icon: '📚' },
    { id: 'electronics', label: 'Electronics', icon: '💻' },
    { id: 'stationery', label: 'Stationery', icon: '✏️' },
    { id: 'hostel', label: 'Hostel Items', icon: '🛏️' },
    { id: 'other', label: 'Other', icon: '🎒' }
  ];

  const filteredResources = useMemo(() => {
    return resources
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
        // Exchange type filter
        if (selectedType !== 'all' && item.exchangeType !== selectedType) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
          const matchLoc = item.location.toLowerCase().includes(q);
          const matchOwner = item.ownerName.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchTags && !matchLoc && !matchOwner) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'value-low') return a.estimatedValue - b.estimatedValue;
        if (sortBy === 'value-high') return b.estimatedValue - a.estimatedValue;
        if (sortBy === 'rating') return b.ownerReputation - a.ownerReputation;
        return 0; // recent/default
      });
  }, [resources, selectedCategory, selectedType, searchQuery, sortBy]);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header & List a Resource CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold mb-2 uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" />
            Verified Student Marketplace
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            Campus Resource Exchange
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Exchange course textbooks, lab instruments, drawing kits, and hostel essentials directly with peers.
          </p>
        </div>

        <button
          id="exchange-list-resource-btn"
          onClick={onOpenListModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs border border-indigo-700/30 transition flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          List a Resource
        </button>
      </div>

      {/* 2. Search, Filters, and Category Selector */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs font-semibold border border-slate-900'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Secondary Filters */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="exchange-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, author names, calculators, hostel items..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50/80 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition font-sans"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Exchange Type Filter */}
            <select
              id="exchange-type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium bg-slate-50/80 border border-slate-200 rounded-lg outline-none text-slate-700 hover:border-slate-300 transition"
            >
              <option value="all">All Types</option>
              <option value="Exchange">🔄 Exchange</option>
              <option value="Free">🎁 Free</option>
              <option value="Sell">💰 Sell</option>
            </select>

            {/* Sort Options */}
            <select
              id="exchange-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium bg-slate-50/80 border border-slate-200 rounded-lg outline-none text-slate-700 hover:border-slate-300 transition"
            >
              <option value="recent">Recently Added</option>
              <option value="value-low">Value: Low to High</option>
              <option value="value-high">Value: High to Low</option>
              <option value="rating">Top Owner Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Resource Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium px-1">
          <span>Showing {filteredResources.length} items on campus</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredResources.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-slate-200/90 shadow-xs text-center space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-base font-bold text-slate-900 font-display">No resources found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No current listing matches your search criteria. Post a request to the Wishlist so fellow campus peers know you need it!
            </p>
            <button
              onClick={onOpenListModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-xs border border-indigo-700/30 transition"
            >
              List an Item Yourself
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((item) => {
              const isRequested = item.status === 'requested';

              return (
                <div
                  key={item.id}
                  id={`resource-card-${item.id}`}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5">
                    {/* Top Row: Category + Exchange Badge + Emoji Icon */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        {item.imageEmoji}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                          item.exchangeType === 'Free'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            : item.exchangeType === 'Exchange'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200/60'
                            : 'bg-amber-50 text-amber-700 border-amber-200/60'
                        }`}>
                          {item.exchangeType}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          ₹{item.estimatedValue}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          Condition: <strong className="text-slate-700">{item.condition}</strong>
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Location & Tags */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">{item.createdAt}</span>
                    </div>

                    {/* Owner Card with Verification & Reputation */}
                    <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.ownerAvatar}
                          alt={item.ownerName}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div className="text-left">
                          <div className="text-xs font-semibold text-slate-800 flex items-center gap-1 leading-none">
                            {item.ownerName}
                            {item.ownerVerified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            ★ {item.ownerReputation} Reputation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons: View Details and Request Item */}
                  <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                    <button
                      id={`view-details-${item.id}`}
                      onClick={() => onSelectResource(item)}
                      className="flex-1 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition"
                    >
                      View Details
                    </button>
                    <button
                      id={`request-item-${item.id}`}
                      disabled={isRequested}
                      onClick={() => requestResource(item.id)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg shadow-xs transition flex items-center justify-center gap-1 border ${
                        isRequested
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700/30'
                      }`}
                    >
                      {isRequested ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Requested
                        </>
                      ) : (
                        'Request Item'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
