import React from 'react';
import { useCampus } from '../context/CampusContext';
import { WishlistItem } from '../types';
import {
  Heart,
  PlusCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Flame,
  ArrowRight,
  HandHeart
} from 'lucide-react';

interface WishlistViewProps {
  onOpenWishModal: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({ onOpenWishModal }) => {
  const { wishlists, fulfillWishlist, currentUser, setActivePage } = useCampus();

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold mb-2 uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Campus Wishlist
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            “I Need This”
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Can’t find what you need on the exchange? Post it here. Fellow campus peers and our automated match engine will connect you.
          </p>
        </div>

        <button
          id="wishlist-post-btn"
          onClick={onOpenWishModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs border border-rose-700/30 transition flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Post a Need
        </button>
      </div>

      {/* 2. Wishlist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {wishlists.map((wish) => {
          const isFulfilled = wish.status === 'fulfilled';
          const isOwn = wish.requesterId === currentUser?.id;

          let urgencyColor = 'bg-slate-100 text-slate-700 border-slate-200';
          let UrgencyIcon = Clock;

          if (wish.urgency === 'Exam Tomorrow!') {
            urgencyColor = 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
            UrgencyIcon = Flame;
          } else if (wish.urgency === 'Urgent') {
            urgencyColor = 'bg-amber-50 text-amber-800 border-amber-200 font-semibold';
            UrgencyIcon = AlertTriangle;
          }

          return (
            <div
              key={wish.id}
              className={`bg-white rounded-xl border p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between ${
                isFulfilled ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200/90'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center font-bold">
                      <Heart className="w-5 h-5 fill-rose-100 text-rose-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {wish.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                        {wish.title}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-[11px] px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${urgencyColor}`}>
                    <UrgencyIcon className="w-3 h-3" />
                    {wish.urgency}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  {wish.description}
                </p>

                {/* Possible Match Found Banner */}
                {wish.matchedItemTitle && (
                  <div className="mt-3 p-2.5 bg-indigo-50/60 border border-indigo-200/60 rounded-lg text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-indigo-900 font-medium">
                      <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span className="truncate">{wish.matchedItemTitle}</span>
                    </div>
                    <button
                      onClick={() => setActivePage('ai-match')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 whitespace-nowrap flex items-center gap-1"
                    >
                      View <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Requester & Location */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <img
                      src={wish.requesterAvatar}
                      alt={wish.requesterName}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="font-semibold text-slate-700">{wish.requesterName}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{wish.preferredLocation}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                {isFulfilled ? (
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 py-2 rounded-lg border border-emerald-200/60 text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Wish Fulfilled by Community
                  </div>
                ) : (
                  <button
                    id={`fulfill-wish-${wish.id}`}
                    disabled={isOwn}
                    onClick={() => fulfillWishlist(wish.id)}
                    className={`w-full py-2 text-xs font-semibold rounded-lg shadow-xs transition flex items-center justify-center gap-1.5 border ${
                      isOwn
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-rose-600 hover:bg-rose-700 text-white border-rose-700/30'
                    }`}
                  >
                    <HandHeart className="w-4 h-4" />
                    {isOwn ? 'Your Active Wish' : 'I Have This! Connect with Peer'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
