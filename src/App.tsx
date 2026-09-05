import React, { useState } from 'react';
import { CampusProvider, useCampus } from './context/CampusContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import {
  ResourceDetailModal,
  ListResourceModal,
  PostWishModal,
  OfferSkillModal,
  ProposeSwapModal,
  DonateModal,
  ReviewModal
} from './components/Modals';

import { DashboardView } from './views/DashboardView';
import { AIMatchView } from './views/AIMatchView';
import { ExchangeView } from './views/ExchangeView';
import { SkillSwapView } from './views/SkillSwapView';
import { DonateView } from './views/DonateView';
import { WishlistView } from './views/WishlistView';
import { ResourceChainView } from './views/ResourceChainView';
import { ImpactView } from './views/ImpactView';
import { ProfileView } from './views/ProfileView';

import { ResourceItem, SkillSwapItem } from './types';

const MainLayout: React.FC = () => {
  const { activePage } = useCampus();

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal active states & payloads
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillSwapItem | null>(null);

  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [isOfferSkillModalOpen, setIsOfferSkillModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Header */}
      <Header
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onOpenListModal={() => setIsListModalOpen(true)}
        onOpenWishModal={() => setIsWishModalOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Responsive Sidebar */}
        <Sidebar
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activePage === 'dashboard' && (
            <DashboardView
              onOpenListModal={() => setIsListModalOpen(true)}
              onOpenWishModal={() => setIsWishModalOpen(true)}
              onSelectResource={(item) => setSelectedResource(item)}
              onSelectSkill={(skill) => setSelectedSkill(skill)}
            />
          )}

          {activePage === 'ai-match' && (
            <AIMatchView
              onSelectResource={(item) => setSelectedResource(item)}
              onSelectSkill={(skill) => setSelectedSkill(skill)}
            />
          )}

          {activePage === 'exchange' && (
            <ExchangeView
              onOpenListModal={() => setIsListModalOpen(true)}
              onSelectResource={(item) => setSelectedResource(item)}
            />
          )}

          {activePage === 'skillswap' && (
            <SkillSwapView
              onOpenOfferSkillModal={() => setIsOfferSkillModalOpen(true)}
              onOpenWishModal={() => setIsWishModalOpen(true)}
              onSelectSkill={(skill) => setSelectedSkill(skill)}
            />
          )}

          {activePage === 'donate' && (
            <DonateView onOpenDonateModal={() => setIsDonateModalOpen(true)} />
          )}

          {activePage === 'wishlist' && (
            <WishlistView onOpenWishModal={() => setIsWishModalOpen(true)} />
          )}

          {activePage === 'resource-chain' && <ResourceChainView />}

          {activePage === 'impact' && <ImpactView />}

          {activePage === 'profile' && (
            <ProfileView onOpenReviewModal={() => setIsReviewModalOpen(true)} />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <ResourceDetailModal
        item={selectedResource}
        onClose={() => setSelectedResource(null)}
      />

      <ListResourceModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
      />

      <PostWishModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
      />

      <OfferSkillModal
        isOpen={isOfferSkillModalOpen}
        onClose={() => setIsOfferSkillModalOpen(false)}
      />

      <ProposeSwapModal
        targetSkill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />

      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      {/* Global Toast Feedback */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CampusProvider>
      <MainLayout />
    </CampusProvider>
  );
}
