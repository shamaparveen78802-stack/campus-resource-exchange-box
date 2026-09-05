import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  ResourceItem,
  SkillSwapItem,
  DonationItem,
  WishlistItem,
  ResourceChain,
  Review,
  CampusStats,
  PageRoute
} from '../types';
import {
  CURRENT_USER,
  DEMO_PERSONAS,
  INITIAL_RESOURCES,
  INITIAL_SKILLS,
  INITIAL_DONATIONS,
  INITIAL_WISHLISTS,
  INITIAL_RESOURCE_CHAINS,
  INITIAL_REVIEWS,
  CAMPUS_STATS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning';
}

interface CampusContextType {
  activePage: PageRoute;
  setActivePage: (page: PageRoute) => void;
  currentUser: StudentProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<StudentProfile>>;
  demoPersonas: StudentProfile[];
  switchPersona: (personaId: string) => void;
  resources: ResourceItem[];
  skills: SkillSwapItem[];
  donations: DonationItem[];
  wishlists: WishlistItem[];
  chains: ResourceChain[];
  reviews: Review[];
  campusStats: CampusStats;
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  
  // Actions
  addResource: (item: Omit<ResourceItem, 'id' | 'createdAt' | 'status' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'ownerReputation' | 'ownerVerified'>) => void;
  deleteResource: (itemId: string) => void;
  requestResource: (itemId: string, note?: string) => void;
  updateProfile: (data: Partial<StudentProfile>) => void;
  allStudents: StudentProfile[];
  addSkillSwap: (skill: Omit<SkillSwapItem, 'id' | 'studentId' | 'studentName' | 'studentAvatar' | 'studentDepartment' | 'isVerified' | 'rating' | 'reviewsCount'>) => void;
  requestSkillSwap: (targetSkillId: string, offeredSkill: string) => void;
  addDonation: (donation: Omit<DonationItem, 'id' | 'status' | 'date' | 'donorName' | 'donorAvatar'>) => void;
  claimDonation: (donationId: string) => void;
  addWishlist: (wish: Omit<WishlistItem, 'id' | 'createdAt' | 'requesterId' | 'requesterName' | 'requesterAvatar' | 'status'>) => void;
  fulfillWishlist: (wishId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'fromStudentName' | 'fromStudentAvatar'>) => void;
  addStepToChain: (chainId: string, note: string) => void;
  resetDemoData: () => void;
  
  // Search transfer from dashboard to AI Match
  aiMatchQuery: string;
  setAiMatchQuery: (q: string) => void;
  executeAIMatch: (query: string) => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'campus_user_v1',
  RESOURCES: 'campus_resources_v1',
  SKILLS: 'campus_skills_v1',
  DONATIONS: 'campus_donations_v1',
  WISHLISTS: 'campus_wishlists_v1',
  CHAINS: 'campus_chains_v1',
  REVIEWS: 'campus_reviews_v1',
  STATS: 'campus_stats_v1'
};
const getEstimatedSaving = (estimatedValue: number) => {
  return Math.round(estimatedValue * 0.6);
};

const getEstimatedWeight = (category: ResourceItem['category']) => {
  switch (category) {
    case 'books':
      return 0.7;
    case 'electronics':
      return 0.4;
    case 'hostel':
      return 2.0;
    case 'stationery':
      return 0.3;
    case 'clothes':
      return 0.8;
    default:
      return 0.5;
  }
};
export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageRoute>('dashboard');
  const [aiMatchQuery, setAiMatchQuery] = useState<string>('I need an engineering mathematics book and calculus help');

  // Load state from localStorage or initial with safe fallback merge
  const [currentUser, setCurrentUser] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? { ...CURRENT_USER, ...JSON.parse(saved) } : CURRENT_USER;
    } catch {
      return CURRENT_USER;
    }
  });

  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [skills, setSkills] = useState<SkillSwapItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [donations, setDonations] = useState<DonationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  const [wishlists, setWishlists] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLISTS);
    return saved ? JSON.parse(saved) : INITIAL_WISHLISTS;
  });

  const [chains, setChains] = useState<ResourceChain[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHAINS);
    return saved ? JSON.parse(saved) : INITIAL_RESOURCE_CHAINS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [campusStats, setCampusStats] = useState<CampusStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : CAMPUS_STATS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLISTS, JSON.stringify(wishlists));
  }, [wishlists]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHAINS, JSON.stringify(chains));
  }, [chains]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(campusStats));
  }, [campusStats]);

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchPersona = (personaId: string) => {
    const found = DEMO_PERSONAS.find(p => p.id === personaId);
    if (found) {
      setCurrentUser(found);
      addToast('Persona Switched', `Logged in as ${found.name} (${found.department})`, 'info');
    }
  };

  const executeAIMatch = (query: string) => {
    setAiMatchQuery(query);
    setActivePage('ai-match');
  };

  const addResource = (itemData: Omit<ResourceItem, 'id' | 'createdAt' | 'status' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'ownerReputation' | 'ownerVerified'>) => {
    const newItem: ResourceItem = {
      ...itemData,
      id: 'res-' + Date.now(),
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerAvatar: currentUser.avatar,
      ownerReputation: currentUser.reputation,
      ownerVerified: currentUser.isVerified,
      createdAt: 'Just now',
      status: 'available'
    };

    setResources(prev => [newItem, ...prev]);
    
    addToast('Resource Listed!', `"${newItem.title}" is now visible to the campus.`, 'success');
  };

  const deleteResource = (itemId: string) => {
    setResources(prev => prev.filter(r => r.id !== itemId));
    addToast('Resource Removed', 'Listing has been deleted from campus exchange.', 'info');
  };

  const updateProfile = (data: Partial<StudentProfile>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...data
    }));
    addToast('Profile Updated', 'Your profile details have been saved successfully.', 'success');
  };

  const requestResource = (itemId: string, note?: string) => {
    setResources(prev =>
      prev.map(r => (r.id === itemId ? { ...r, status: 'requested' } : r))
    );

    const target = resources.find(r => r.id === itemId);
    const value = target?.estimatedValue || 450;
const saving = getEstimatedSaving(value);
const waste = target ? getEstimatedWeight(target.category) : 0.5;

setCampusStats(prev => ({
  ...prev,
  resourcesReused: prev.resourcesReused + 1,
  moneySaved: prev.moneySaved + saving,
  wasteAvoidedKg: Number((prev.wasteAvoidedKg + waste).toFixed(1))
}));

setCurrentUser(prev => ({
  ...prev,
  moneySaved: prev.moneySaved + saving,
  successfulExchanges: prev.successfulExchanges + 1
}));

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // safe fallback
    }

    addToast(
      'Request Sent!',
      `Handover request sent to ${target?.ownerName || 'owner'}. Check your notifications for rendezvous coordinates.`,
      'success'
    );
  };

  const addSkillSwap = (skillData: Omit<SkillSwapItem, 'id' | 'studentId' | 'studentName' | 'studentAvatar' | 'studentDepartment' | 'isVerified' | 'rating' | 'reviewsCount'>) => {
    const newSkill: SkillSwapItem = {
      ...skillData,
      id: 'skill-' + Date.now(),
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      studentDepartment: currentUser.department,
      isVerified: currentUser.isVerified,
      rating: 5.0,
      reviewsCount: 1
    };

    setSkills(prev => [newSkill, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      skillsShared: prev.skillsShared + 1
    }));

    addToast('Skill Offered!', `Your offering "${newSkill.skillOffered}" is listed on SkillSwap.`, 'success');
  };

  const requestSkillSwap = (targetSkillId: string, offeredSkill: string) => {
    const target = skills.find(s => s.id === targetSkillId);
    setCampusStats(prev => ({
  ...prev,
  skillsExchanged: prev.skillsExchanged + 1
}));

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 }
      });
    } catch {}

    addToast(
      'Skill Swap Proposed!',
      `You proposed to swap "${offeredSkill}" with ${target?.studentName || 'peer'} for "${target?.skillOffered}".`,
      'success'
    );
  };

  const addDonation = (donationData: Omit<DonationItem, 'id' | 'status' | 'date' | 'donorName' | 'donorAvatar'>) => {
    const newDonation: DonationItem = {
      ...donationData,
      id: 'don-' + Date.now(),
      donorName: currentUser.name,
      donorAvatar: currentUser.avatar,
      status: 'available',
      date: 'Just now'
    };

    setDonations(prev => [newDonation, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      donationsCount: prev.donationsCount + 1
    }));
    

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    addToast('Thank You for Donating!', `Item registered for drop-off at ${newDonation.dropoffSpot}.`, 'success');
  };

  const claimDonation = (donationId: string) => {
    setDonations(prev =>
      prev.map(d =>
        d.id === donationId
          ? { ...d, status: 'claimed', claimedBy: currentUser.name, claimedAt: 'Just now' }
          : d
      )
    );

    const donation = donations.find(d => d.id === donationId);

const categoryWeight: Record<string, number> = {
  books: 0.7,
  electronics: 0.4,
  clothes: 0.8,
  stationery: 0.3,
  hostel: 2.0,
  other: 0.5
};

const categoryValue: Record<string, number> = {
  books: 450,
  electronics: 800,
  clothes: 600,
  stationery: 250,
  hostel: 900,
  other: 400
};

const estimatedValue = donation
  ? categoryValue[donation.category] ?? 400
  : 400;

const saving = getEstimatedSaving(estimatedValue);

const waste = donation
  ? categoryWeight[donation.category] ?? 0.5
  : 0.5;

setCampusStats(prev => ({
  ...prev,
  resourcesReused: prev.resourcesReused + 1,
  moneySaved: prev.moneySaved + saving,
  wasteAvoidedKg: Number((prev.wasteAvoidedKg + waste).toFixed(1))
}));

    try {
      confetti({
        particleCount: 40,
        spread: 50
      });
    } catch {}

    addToast('Donation Claimed!', 'Pickup details have been recorded. Pass it forward when you finish!', 'success');
  };

  const addWishlist = (wishData: Omit<WishlistItem, 'id' | 'createdAt' | 'requesterId' | 'requesterName' | 'requesterAvatar' | 'status'>) => {
    // Check if there is an automatic match in available resources
    const matched = resources.find(r => 
      r.title.toLowerCase().includes(wishData.title.toLowerCase().split(' ')[0]) ||
      r.tags.some(t => wishData.title.toLowerCase().includes(t))
    );

    const newWish: WishlistItem = {
      ...wishData,
      id: 'wish-' + Date.now(),
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requesterAvatar: currentUser.avatar,
      createdAt: 'Just now',
      status: 'open',
      matchedItemId: matched ? matched.id : undefined,
      matchedItemTitle: matched ? `Match found: ${matched.title}` : undefined
    };

    setWishlists(prev => [newWish, ...prev]);
    addToast('Wish Posted!', 'Campus students will be alerted if they have a matching resource.', 'success');
  };

  const fulfillWishlist = (wishId: string) => {
    setWishlists(prev =>
      prev.map(w => (w.id === wishId ? { ...w, status: 'fulfilled' } : w))
    );

    const wish = wishlists.find(w => w.id === wishId);

const matchedResource = wish?.matchedItemId
  ? resources.find(r => r.id === wish.matchedItemId)
  : undefined;

const estimatedValue = matchedResource?.estimatedValue || 500;
const saving = getEstimatedSaving(estimatedValue);
const waste = matchedResource
  ? getEstimatedWeight(matchedResource.category)
  : 0.5;

setCampusStats(prev => ({
  ...prev,
  resourcesReused: prev.resourcesReused + 1,
  moneySaved: prev.moneySaved + saving,
  wasteAvoidedKg: Number((prev.wasteAvoidedKg + waste).toFixed(1))
}));
    try {
      confetti({
        particleCount: 50,
        spread: 60
      });
    } catch {}

    addToast('Wishlist Fulfilled!', 'You connected with the requester to provide what they needed.', 'success');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'fromStudentName' | 'fromStudentAvatar'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      fromStudentName: currentUser.name,
      fromStudentAvatar: currentUser.avatar,
      date: 'Just now'
    };

    setReviews(prev => [newRev, ...prev]);
    addToast('Review Submitted!', 'Reputation updated for student peer.', 'success');
  };

  const addStepToChain = (chainId: string, note: string) => {
    setChains(prev =>
      prev.map(chain => {
        if (chain.id === chainId) {
          const nextStepNum = chain.steps.length + 1;
          const newStep = {
            stepNumber: nextStepNum,
            studentName: currentUser.name,
            studentAvatar: currentUser.avatar,
            role: 'Subsequent Handover',
            period: 'Current Semester',
            action: 'Passed resource to next student batch',
            notes: note || 'Maintained in prime usable condition.',
            location: currentUser.hostel
          };
          return {
            ...chain,
            totalStudentsHelped: chain.totalStudentsHelped + 1,
            combinedSavings: chain.combinedSavings + 1100,
            wasteSavedKg: Number((chain.wasteSavedKg + 0.5).toFixed(1)),
            steps: [...chain.steps, newStep]
          };
        }
        return chain;
      })
    );

    addToast('Resource Chain Extended!', `You added a new link to the handover history!`, 'success');
  };

  const resetDemoData = () => {
    localStorage.clear();
    setCurrentUser(CURRENT_USER);
    setResources(INITIAL_RESOURCES);
    setSkills(INITIAL_SKILLS);
    setDonations(INITIAL_DONATIONS);
    setWishlists(INITIAL_WISHLISTS);
    setChains(INITIAL_RESOURCE_CHAINS);
    setReviews(INITIAL_REVIEWS);
    setCampusStats(CAMPUS_STATS);
    addToast('Demo Data Reset', 'Original sample data has been cleanly restored.', 'info');
  };

  return (
    <CampusContext.Provider
      value={{
        activePage,
        setActivePage,
        currentUser,
        setCurrentUser,
        demoPersonas: DEMO_PERSONAS,
        switchPersona,
        resources,
        skills,
        donations,
        wishlists,
        chains,
        reviews,
        campusStats,
        toasts,
        addToast,
        removeToast,
        addResource,
        deleteResource,
        requestResource,
        updateProfile,
        allStudents: DEMO_PERSONAS,
        addSkillSwap,
        requestSkillSwap,
        addDonation,
        claimDonation,
        addWishlist,
        fulfillWishlist,
        addReview,
        addStepToChain,
        resetDemoData,
        aiMatchQuery,
        setAiMatchQuery,
        executeAIMatch
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
