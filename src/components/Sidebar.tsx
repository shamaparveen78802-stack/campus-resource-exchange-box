import React from 'react';
import { useCampus } from '../context/CampusContext';
import { PageRoute } from '../types';
import {
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  ArrowLeftRight,
  HeartHandshake,
  Heart,
  GitBranch,
  BarChart3,
  UserCircle,
  X,
  Leaf,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  isOpenMobile?: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, isOpenMobile, onCloseMobile }) => {
  const isDrawerOpen = isOpenMobile ?? mobileOpen ?? false;
  const { 
    activePage, 
    setActivePage, 
    resources, 
    skills, 
    wishlists, 
    campusStats,
    currentUser 
  } = useCampus();

  const availableCount = resources.filter(r => r.status === 'available').length;
  const activeWishes = wishlists.filter(w => w.status === 'open').length;

  const navItems: Array<{
    route: PageRoute;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
    highlight?: boolean;
  }> = [
    { route: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { route: 'ai-match', label: 'AI Match', icon: Sparkles, badge: 'AI', badgeColor: 'bg-indigo-600 text-white', highlight: true },
    { route: 'exchange', label: 'Exchange', icon: ShoppingBag, badge: availableCount, badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200' },
    { route: 'skillswap', label: 'SkillSwap', icon: ArrowLeftRight, badge: skills.length, badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' },
    { route: 'donate', label: 'Donate', icon: HeartHandshake },
    { route: 'wishlist', label: 'Wishlist', icon: Heart, badge: activeWishes, badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200/60' },
    { route: 'resource-chain', label: 'Resource Chain', icon: GitBranch },
    { route: 'impact', label: 'Impact Dashboard', icon: BarChart3 },
    { route: 'profile', label: 'My Profile', icon: UserCircle }
  ];

  const handleNavClick = (route: PageRoute) => {
    setActivePage(route);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/90 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
        <div 
          onClick={() => handleNavClick('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs border border-indigo-700/30 group-hover:bg-indigo-700 transition">
            CR
          </div>
          <div>
            <h1 className="font-display font-bold text-slate-900 text-sm leading-snug tracking-tight">
              Campus Exchange
            </h1>
            <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Verified Student Network
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          id="close-sidebar-btn"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-3 px-3 overflow-y-auto space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-sans">
          Navigation
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.route;

          return (
            <button
              key={item.route}
              id={`nav-${item.route}`}
              onClick={() => handleNavClick(item.route)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group border ${
                isActive
                  ? item.highlight
                    ? 'bg-indigo-600 text-white font-semibold border-indigo-700/40 shadow-xs'
                    : 'bg-indigo-50/90 text-indigo-700 font-semibold border-indigo-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent hover:border-slate-200/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? item.highlight
                        ? 'text-white'
                        : 'text-indigo-600'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                    isActive && item.highlight
                      ? 'bg-white/20 text-white'
                      : item.badgeColor || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mini Campus Sustainability Impact pill */}
      <div className="p-3 m-3 bg-slate-50 rounded-xl border border-slate-200/90">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-3 h-3" />
            </div>
            <div className="text-xs font-bold text-slate-800">Campus Eco Tracker</div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">Live</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="bg-white p-2 rounded-lg border border-slate-200/80">
            <div className="text-[10px] text-slate-500 font-medium">Money Saved</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">₹{campusStats.moneySaved.toLocaleString()}</div>
          </div>
          <div className="bg-white p-2 rounded-lg border border-slate-200/80">
            <div className="text-[10px] text-slate-500 font-medium">Diverted Waste</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">{campusStats.wasteAvoidedKg} kg</div>
          </div>
        </div>
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-slate-200/80">
        <button
          id="sidebar-profile-card"
          onClick={() => handleNavClick('profile')}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-left transition border border-transparent hover:border-slate-200/80"
        >
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'Student'}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-900 truncate flex items-center gap-1">
              {currentUser?.name || 'Student'}
              {currentUser?.isVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              )}
            </div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">
              {(currentUser?.department || 'Campus').split(' ')[0]} · {currentUser?.year || 'Student'}
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0">
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </div>
    </>
  );
};
