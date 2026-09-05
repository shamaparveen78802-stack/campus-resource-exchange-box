import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  User,
  ShieldCheck,
  Star,
  Mail,
  Building,
  Calendar,
  Gift,
  ArrowLeftRight,
  ShoppingBag,
  Coins,
  Recycle,
  Award,
  MessageSquarePlus,
  Trash2,
  CheckCircle2,
  Edit3,
  Heart,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Users,
  X,
  FileText,
  ChevronDown,
  Check
} from 'lucide-react';

interface ProfileViewProps {
  onOpenReviewModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenReviewModal }) => {
  const {
    currentUser,
    setCurrentUser,
    updateProfile,
    resources = [],
    skills = [],
    donations = [],
    wishlists = [],
    reviews = [],
    campusStats,
    deleteResource,
    demoPersonas = [],
    switchPersona
  } = useCampus();

  const [activeTab, setActiveTab] = useState<
    'listings' | 'skills' | 'donations' | 'wishlist' | 'history' | 'reviews'
  >('listings');

  // Student Switcher Dropdown state
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const switcherRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsSwitcherOpen(false);
      }
    };

    if (isSwitcherOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSwitcherOpen]);

  // Edit Profile Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editDept, setEditDept] = useState(currentUser?.department || '');
  const [editYear, setEditYear] = useState(currentUser?.year || '');
  const [editHostel, setEditHostel] = useState(currentUser?.hostel || '');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');

  // Safe fallback user data
  const user = currentUser || {
    id: 'user-default',
    name: 'Student',
    email: 'student@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering',
    year: 'Undergraduate',
    hostel: 'Campus Hostel',
    isVerified: true,
    reputation: 4.8,
    reviewsCount: 14,
    successfulExchanges: 12,
    skillsShared: 5,
    donationsCount: 3,
    moneySaved: 4850,
    bio: 'Campus student actively sharing resources, books, and study guides.',
    badges: [],
    phone: '+91 98765 43210',
    preferredHandoverSpots: ['Central Library', 'Student Center']
  };

  const userAvatar = user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  const userName = user.name || 'Student';
  const userDept = user.department || 'Undergraduate Department';
  const userYear = user.year || '3rd Year';
  const userHostel = user.hostel || 'Hostel Block';
  const userEmail = user.email || 'student@campus.edu';
  const userReputation = typeof user.reputation === 'number' ? user.reputation.toFixed(1) : '4.8';
  const successfulExchangesCount = user.successfulExchanges ?? 12;
  const skillsOfferedCount = user.skillsShared ?? 5;
  const donationsCount = user.donationsCount ?? 3;
  const moneySaved = user.moneySaved ?? 4850;
  const studentsHelpedCount = successfulExchangesCount + donationsCount + skillsOfferedCount;
  const resourcesReusedCount = campusStats?.resourcesReused ?? 24;

  // Safe filtering for user items
  const myResources = (resources || []).filter((r) => r && r.ownerId === user.id);
  const mySkills = (skills || []).filter((s) => s && s.studentId === user.id);
  const myDonations = (donations || []).filter(
    (d) => d && (d.donorName === userName || d.claimedBy === userName)
  );
  const myWishlists = (wishlists || []).filter(
    (w) => w && (w.requesterId === user.id || w.requesterName === userName)
  );
  const userReviews = (reviews || []).filter(
    (rev) => rev && (rev.toStudentId === user.id || !rev.toStudentId || rev.toStudentId === '')
  );

  // Exchange history (derived from user resources and mock transactions)
  const exchangeHistory = [
    {
      id: 'hist-1',
      title: 'Operating System Concepts (Silberschatz)',
      partner: 'Priya Sharma',
      type: 'Textbook Exchange',
      date: '3 days ago',
      status: 'Completed',
      value: '₹550 saved'
    },
    {
      id: 'hist-2',
      title: 'Python for Bio-computing Mentorship',
      partner: 'Priya Sharma',
      type: 'Skill Swap',
      date: '1 week ago',
      status: 'Completed',
      value: '1.5 hrs exchanged'
    },
    {
      id: 'hist-3',
      title: 'Casio fx-82MS Scientific Calculator',
      partner: 'Rohan Verma',
      type: 'Hostel Handover',
      date: '2 weeks ago',
      status: 'Completed',
      value: '₹850 saved'
    },
    {
      id: 'hist-4',
      title: 'Engineering Mechanics Drafter Stand',
      partner: 'Rahul Mehta',
      type: 'Resource Handover',
      date: '3 weeks ago',
      status: 'Completed',
      value: '₹1,200 saved'
    }
  ];

  // Recent activity feed items
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Handed over Operating Systems textbook to Priya Sharma',
      time: '3 days ago',
      icon: ShoppingBag,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200/60'
    },
    {
      id: 'act-2',
      title: 'Received 5-star review from Rahul Mehta for Excel peer session',
      time: '1 week ago',
      icon: Star,
      color: 'text-amber-600 bg-amber-50 border-amber-200/60'
    },
    {
      id: 'act-3',
      title: 'Donated Organic Chemistry lab glassware set at Central Library box',
      time: '2 weeks ago',
      icon: Gift,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/60'
    },
    {
      id: 'act-4',
      title: 'Agreed on SkillSwap for Financial Modeling & Python Scripts',
      time: '2 weeks ago',
      icon: ArrowLeftRight,
      color: 'text-purple-600 bg-purple-50 border-purple-200/60'
    }
  ];

  const handleOpenEdit = () => {
    setEditName(user.name || '');
    setEditDept(user.department || '');
    setEditYear(user.year || '');
    setEditHostel(user.hostel || '');
    setEditBio(user.bio || '');
    setEditPhone(user.phone || '');
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateProfile) {
      updateProfile({
        name: editName.trim() || user.name,
        department: editDept.trim() || user.department,
        year: editYear.trim() || user.year,
        hostel: editHostel.trim() || user.hostel,
        bio: editBio.trim() || user.bio,
        phone: editPhone.trim() || user.phone
      });
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        name: editName.trim() || prev.name,
        department: editDept.trim() || prev.department,
        year: editYear.trim() || prev.year,
        hostel: editHostel.trim() || prev.hostel,
        bio: editBio.trim() || prev.bio,
        phone: editPhone.trim() || prev.phone
      }));
    }
    setIsEditModalOpen(false);
  };

  const studentsList = demoPersonas && demoPersonas.length > 0 ? demoPersonas : [];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Profile Hero Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div className="flex items-start sm:items-center gap-4">
              <img
                src={userAvatar}
                alt={userName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover ring-2 ring-slate-200/80 shadow-xs bg-white flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    {userName}
                  </h1>
                  {user.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Student
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                  {userDept} • {userYear}
                </p>
              </div>
            </div>

            {/* Profile Action Buttons & Compact Student Switcher */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Compact Student Switcher Popover */}
              {studentsList.length > 0 && (
                <div className="relative" ref={switcherRef}>
                  <button
                    type="button"
                    id="profile-student-switcher-btn"
                    onClick={() => setIsSwitcherOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition"
                    aria-expanded={isSwitcherOpen}
                    aria-haspopup="true"
                  >
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>
                      Switch Student: <strong className="text-slate-900 font-bold">{userName.split(' ')[0]}</strong>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                        isSwitcherOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu directly below the button */}
                  {isSwitcherOpen && (
                    <div
                      id="profile-student-switcher-dropdown"
                      className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        Campus Demo Personas
                      </div>
                      <div className="py-1 max-h-56 overflow-y-auto">
                        {studentsList.map((student) => {
                          const isSelected = user.id === student.id;
                          return (
                            <button
                              key={student.id}
                              type="button"
                              id={`profile-switch-${student.id}`}
                              onClick={() => {
                                if (switchPersona) {
                                  switchPersona(student.id);
                                } else {
                                  setCurrentUser(student);
                                }
                                setIsSwitcherOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition ${
                                isSelected
                                  ? 'bg-indigo-50/80 text-indigo-900 font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  className="w-6 h-6 rounded-full object-cover flex-shrink-0 ring-1 ring-slate-200"
                                />
                                <div className="truncate">
                                  <div className="font-medium text-slate-900 truncate">{student.name}</div>
                                  <div className="text-[10px] text-slate-500 truncate">{student.department}</div>
                                </div>
                              </div>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                id="edit-profile-btn"
                onClick={handleOpenEdit}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                Edit Profile
              </button>
              <button
                id="write-review-btn"
                onClick={onOpenReviewModal}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-700/30 rounded-lg shadow-xs transition"
              >
                <MessageSquarePlus className="w-4 h-4 text-indigo-100" />
                Write Review
              </button>
            </div>
          </div>

          {/* Bio statement */}
          {user.bio && (
            <p className="text-xs sm:text-sm text-slate-600 mb-3 max-w-3xl leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Metadata badges */}
          <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>{userEmail}</span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-md">
                Verified Campus Domain
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{userHostel}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>⭐ {userReputation} Campus Reputation</span>
            </div>
          </div>

          {/* Badges Earned */}
          {user.badges && user.badges.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Badges:
              </span>
              {user.badges.map((badge) => (
                <span
                  key={badge.id}
                  title={badge.desc}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700"
                >
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  {badge.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Impact & Key Metric Scorecards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-left">
          <div className="text-xl">🤝</div>
          <div className="text-xl font-bold text-slate-900 font-display mt-1">
            {successfulExchangesCount}
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
            Successful Exchanges
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-left">
          <div className="text-xl">👥</div>
          <div className="text-xl font-bold text-slate-900 font-display mt-1">
            {studentsHelpedCount}
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
            Students Helped
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-left">
          <div className="text-xl">💰</div>
          <div className="text-xl font-bold text-slate-900 font-display mt-1">
            ₹{moneySaved.toLocaleString()}
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
            Money Saved
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-left">
          <div className="text-xl">♻️</div>
          <div className="text-xl font-bold text-slate-900 font-display mt-1">
            {resourcesReusedCount}
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
            Resources Reused
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-left">
          <div className="text-xl">💡</div>
          <div className="text-xl font-bold text-slate-900 font-display mt-1">
            {skillsOfferedCount}
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
            Skills Offered
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs text-left">
          <div className="text-xl">🎁</div>
          <div className="text-xl font-bold text-slate-900 font-display mt-1">
            {donationsCount}
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
            Items Donated
          </div>
        </div>
      </div>

      {/* 3. Tabbed Details Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <button
            id="tab-listings"
            onClick={() => setActiveTab('listings')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'listings'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Resources Listed ({myResources.length})
          </button>
          <button
            id="tab-skills"
            onClick={() => setActiveTab('skills')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'skills'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Skills Offered ({mySkills.length})
          </button>
          <button
            id="tab-donations"
            onClick={() => setActiveTab('donations')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'donations'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Donations ({myDonations.length})
          </button>
          <button
            id="tab-wishlist"
            onClick={() => setActiveTab('wishlist')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'wishlist'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Wishlist ({myWishlists.length})
          </button>
          <button
            id="tab-history"
            onClick={() => setActiveTab('history')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'history'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Exchange History ({exchangeHistory.length})
          </button>
          <button
            id="tab-reviews"
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Peer Reviews ({userReviews.length})
          </button>
        </div>

        <div className="p-6">
          {/* TAB 1: LISTINGS */}
          {activeTab === 'listings' && (
            <div>
              {myResources.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  You haven't listed any resources yet. Click 'List Resource' from the top header to share books, calculators, or hostel items!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myResources.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs flex items-start justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-slate-50 rounded-lg border border-slate-200 flex-shrink-0">
                          {item.imageEmoji || '📦'}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-md">
                              {item.category}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                              {item.status}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{item.title}</h4>
                          <span className="text-xs text-slate-500">
                            {item.exchangeType} • ₹{item.estimatedValue}
                          </span>
                        </div>
                      </div>

                      {deleteResource && (
                        <button
                          onClick={() => deleteResource(item.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SKILLS */}
          {activeTab === 'skills' && (
            <div>
              {mySkills.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  <ArrowLeftRight className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  You haven't posted any skills yet. Share what you can tutor or mentor on SkillSwap!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                          Can Teach: {skill.skillOffered}
                        </span>
                        <span className="text-xs text-slate-500">{skill.format}</span>
                      </div>
                      <div className="text-xs text-indigo-900 font-semibold">
                        Looking for: {skill.skillWanted}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{skill.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DONATIONS */}
          {activeTab === 'donations' && (
            <div>
              {myDonations.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  <Gift className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  No donations registered under this persona yet. You can donate lab gear or stationery via the Donate tab!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myDonations.map((don) => (
                    <div
                      key={don.id}
                      className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{don.imageEmoji || '🎁'}</span>
                          {don.title}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                          {don.status === 'claimed' ? 'Claimed by Fresher' : 'Available for Pick-up'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Drop-off: {don.dropoffSpot}
                      </div>
                      {don.impactStory && (
                        <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                          “{don.impactStory}”
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {myWishlists.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  <Heart className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  Your wishlist is currently clear. Need something for class or hostel? Post a need anytime!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myWishlists.map((wish) => (
                    <div
                      key={wish.id}
                      className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{wish.title}</span>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-md">
                          {wish.urgency}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{wish.description}</p>
                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                        <span>Preferred: {wish.preferredLocation}</span>
                        <span className="capitalize text-indigo-600 font-medium">{wish.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EXCHANGE HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {exchangeHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Exchanged with <span className="font-semibold text-slate-700">{item.partner}</span> • {item.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">
                      {item.value}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {userReviews.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  <Star className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  No reviews posted for this student yet. Click 'Write Review' above to leave peer feedback!
                </div>
              ) : (
                userReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            rev.fromStudentAvatar ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                          }
                          alt={rev.fromStudentName || 'Reviewer'}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {rev.fromStudentName || 'Student Peer'}
                          </div>
                          <div className="text-[10px] text-slate-400">{rev.date || 'Recent'}</div>
                        </div>
                      </div>

                      <div className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                        {typeof rev.rating === 'number' ? rev.rating.toFixed(1) : '5.0'}
                      </div>
                    </div>

                    <p className="mt-2.5 text-xs text-slate-700 leading-relaxed italic">
                      “{rev.comment}”
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. Recent Activity Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs text-left">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Recent Campus Activity</h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Verified Handover Log
          </span>
        </div>

        <div className="space-y-3">
          {recentActivities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${act.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-800">{act.title}</span>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">{act.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Student Profile</h3>
                  <p className="text-xs text-slate-500">Update your verified campus identity details</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-5 space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 text-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department / Major
                  </label>
                  <input
                    type="text"
                    required
                    value={editDept}
                    onChange={(e) => setEditDept(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Year / Semester
                  </label>
                  <input
                    type="text"
                    required
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    placeholder="e.g. 3rd Year (Sem 5)"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 text-sm bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hostel & Room
                  </label>
                  <input
                    type="text"
                    required
                    value={editHostel}
                    onChange={(e) => setEditHostel(e.target.value)}
                    placeholder="e.g. Block C, Room 312"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bio / Academic Interests
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Share a short bio about what you study and what you're open to tutoring..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none text-slate-800 text-sm resize-none bg-white"
                ></textarea>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 -mx-5 -mb-5 mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="save-profile-btn"
                  className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-700/30 rounded-lg shadow-xs transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
