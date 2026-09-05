import React from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Sparkles, 
  RotateCcw, 
  UserCheck, 
  Menu, 
  PlusCircle, 
  HelpCircle,
  Search,
  Bell
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onToggleMobileMenu?: () => void;
  onOpenListModal: () => void;
  onOpenWishModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onToggleMobileMenu,
  onOpenListModal,
  onOpenWishModal
}) => {
  const handleToggleMenu = onToggleMobileMenu || onOpenMobileMenu || (() => {});
  const { 
    currentUser, 
    demoPersonas, 
    switchPersona, 
    resetDemoData, 
    setActivePage,
    executeAIMatch,
    campusStats
  } = useCampus();

  const [headerSearch, setHeaderSearch] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      executeAIMatch(headerSearch.trim());
      setHeaderSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Mobile menu button and quick branding */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            id="mobile-menu-btn"
            onClick={handleToggleMenu}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div 
            onClick={() => setActivePage('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-indigo-700/40">
              CR
            </div>
            <span className="font-display font-bold text-slate-900 text-base tracking-tight">Campus Exchange</span>
          </div>
        </div>

        {/* Global Search / AI Bar in desktop header */}
        <div className="hidden lg:flex flex-1 max-w-lg items-center">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="header-global-search"
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Ask campus AI: 'I need calculus help or a lab coat'..."
              className="w-full pl-10 pr-24 py-2 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl outline-none transition font-sans placeholder:text-slate-400"
            />
            <button
              type="submit"
              id="header-search-submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-indigo-200" />
              Match
            </button>
          </form>
        </div>

        {/* Core Question & Demo bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tagline reminder pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-100/90 text-slate-700 text-xs font-medium rounded-lg border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>“What do you need today?”</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              id="quick-list-btn"
              onClick={onOpenListModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.75 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs border border-indigo-700/30 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List Resource</span>
            </button>
            {onOpenWishModal && (
              <button
                id="quick-wish-btn"
                onClick={onOpenWishModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.75 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 shadow-xs transition"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Post Need</span>
              </button>
            )}
          </div>

          <div className="h-5 w-px bg-slate-200 mx-0.5 hidden sm:block"></div>

          {/* Demo Mode switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-lg border border-slate-200">
            <span className="hidden md:inline text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1.5">
              Demo:
            </span>
            <select
              id="demo-persona-select"
              value={currentUser?.id || ''}
              onChange={(e) => switchPersona(e.target.value)}
              className="text-xs font-medium bg-white text-slate-800 border border-slate-200 rounded px-2 py-1 outline-none cursor-pointer hover:border-slate-300"
              title="Switch demo student persona"
            >
              {(demoPersonas || []).map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {(persona.name || 'Student').split(' ')[0]} ({(persona.department || '').includes('Computer') ? 'CS' : (persona.department || '').includes('Bio') ? 'Bio' : 'Mech'})
                </option>
              ))}
            </select>
            <button
              id="reset-demo-data-btn"
              onClick={resetDemoData}
              title="Reset sample demo data"
              className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-white rounded transition"
              aria-label="Reset demo data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Current profile quick pill */}
          <button
            id="header-profile-btn"
            onClick={() => setActivePage('profile')}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full hover:bg-slate-100 transition border border-slate-200/60"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'Student'}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/30"
            />
            <div className="text-left hidden lg:block">
              <div className="text-xs font-semibold text-slate-800 leading-none flex items-center gap-1">
                {currentUser?.name || 'Student'}
                <UserCheck className="w-3 h-3 text-emerald-500 inline" />
              </div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                ★ {currentUser?.reputation ?? 5.0} · {(currentUser?.department || 'Student').split(' ')[0]}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
