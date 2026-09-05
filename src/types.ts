export type CategoryType = 'books' | 'electronics' | 'stationery' | 'hostel' | 'other';
export type ExchangeType = 'Free' | 'Exchange' | 'Sell';
export type ItemCondition = 'Like New' | 'Good' | 'Fair' | 'Heavily Used';
export type UrgencyLevel = 'Normal' | 'Urgent' | 'Exam Tomorrow!';

export interface Badge {
  id: string;
  title: string;
  icon: string;
  desc: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  year: string;
  hostel: string;
  isVerified: boolean;
  reputation: number;
  reviewsCount: number;
  successfulExchanges: number;
  skillsShared: number;
  donationsCount: number;
  moneySaved: number;
  bio: string;
  badges: Badge[];
  phone?: string;
  preferredHandoverSpots: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: CategoryType;
  condition: ItemCondition;
  exchangeType: ExchangeType;
  estimatedValue: number; // in INR
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerReputation: number;
  ownerVerified: boolean;
  location: string;
  description: string;
  tags: string[];
  availability: string;
  status: 'available' | 'requested' | 'exchanged' | 'donated';
  createdAt: string;
  imageEmoji: string;
  chainId?: string;
}

export interface SkillSwapItem {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentDepartment: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  skillOffered: string;
  skillOfferedCategory: 'Coding' | 'Math & Science' | 'Design' | 'Languages' | 'Academics' | 'Music & Arts' | 'Exam Prep';
  skillOfferedLevel: 'Beginner' | 'Intermediate' | 'Expert';
  skillWanted: string;
  availability: string;
  description: string;
  format: '1-on-1 In-person' | 'Online/Discord' | 'Flexible';
}

export interface DonationItem {
  id: string;
  title: string;
  category: CategoryType | 'clothes';
  condition: ItemCondition;
  donorName: string;
  donorAvatar: string;
  dropoffSpot: string;
  impactStory: string;
  status: 'available' | 'claimed';
  claimedBy?: string;
  claimedAt?: string;
  date: string;
  imageEmoji: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  category: CategoryType;
  description: string;
  urgency: UrgencyLevel;
  preferredLocation: string;
  requesterName: string;
  requesterAvatar: string;
  requesterId: string;
  createdAt: string;
  matchedItemId?: string;
  matchedItemTitle?: string;
  status: 'open' | 'fulfilled';
}

export interface ChainStep {
  stepNumber: number;
  studentName: string;
  studentAvatar: string;
  role: string;
  period: string;
  action: string;
  notes: string;
  location: string;
}

export interface ResourceChain {
  id: string;
  resourceTitle: string;
  category: CategoryType;
  initialDonor: string;
  totalStudentsHelped: number;
  combinedSavings: number;
  semestersInUse: number;
  wasteSavedKg: number;
  icon: string;
  steps: ChainStep[];
}

export interface Review {
  id: string;
  fromStudentName: string;
  fromStudentAvatar: string;
  toStudentId: string;
  rating: number;
  comment: string;
  date: string;
  itemTitle: string;
}

export interface CampusStats {
  resourcesReused: number;
  skillsExchanged: number;
  moneySaved: number;
  wasteAvoidedKg: number;
  activeStudents: number;
}

export type PageRoute = 
  | 'dashboard'
  | 'ai-match'
  | 'exchange'
  | 'skillswap'
  | 'donate'
  | 'wishlist'
  | 'resource-chain'
  | 'impact'
  | 'profile';
