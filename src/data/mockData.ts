import {
  StudentProfile,
  ResourceItem,
  SkillSwapItem,
  DonationItem,
  WishlistItem,
  ResourceChain,
  Review,
  CampusStats
} from '../types';

export const CURRENT_USER: StudentProfile = {
  id: 'user-aarav',
  name: 'Aarav Singh',
  email: 'aarav.singh@campus.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Computer Science & Engineering',
  year: '3rd Year (Semester 5)',
  hostel: 'Hostel Block C, Room 312',
  isVerified: true,
  reputation: 4.8,
  reviewsCount: 14,
  successfulExchanges: 12,
  skillsShared: 5,
  donationsCount: 3,
  moneySaved: 4850,
  bio: 'CS junior interested in Systems, ML, and sustainable campus living. Always open to peer tutoring and sharing course materials!',
  phone: '+91 98765 43210',
  preferredHandoverSpots: ['Central Library Courtyard', 'Block C Common Room', 'Student Activity Center'],
  badges: [
    { id: 'b1', title: 'Verified Student', icon: 'ShieldCheck', desc: 'Identity verified with university email' },
    { id: 'b2', title: 'Eco Guardian', icon: 'Leaf', desc: 'Diverted over 15kg of campus waste' },
    { id: 'b3', title: 'Top Skill Mentor', icon: 'Award', desc: '5+ peer skill swap sessions completed' },
    { id: 'b4', title: 'Prompt Handover', icon: 'Clock', desc: 'Consistently completes exchanges on time' }
  ]
};

export const DEMO_PERSONAS: StudentProfile[] = [
  CURRENT_USER,
  {
    id: 'user-priya',
    name: 'Priya Sharma',
    email: 'priya.sharma@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'Biotechnology',
    year: '1st Year (Semester 2)',
    hostel: 'Hostel Block A, Room 104',
    isVerified: true,
    reputation: 4.9,
    reviewsCount: 8,
    successfulExchanges: 7,
    skillsShared: 4,
    donationsCount: 2,
    moneySaved: 3200,
    bio: 'First year biotech fresher passionate about Python for bio-computing and organic gardening.',
    phone: '+91 98123 45678',
    preferredHandoverSpots: ['BioTech Lab Foyer', 'Hostel Block A Gate'],
    badges: [
      { id: 'b1', title: 'Verified Student', icon: 'ShieldCheck', desc: 'Identity verified with university email' },
      { id: 'b2', title: 'Fast Learner', icon: 'Zap', desc: 'Active in 4 study circles' }
    ]
  },
  {
    id: 'user-rohan',
    name: 'Rohan Verma',
    email: 'rohan.verma@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Mechanical Engineering',
    year: 'Final Year (Semester 8)',
    hostel: 'Hostel Block D, Room 408',
    isVerified: true,
    reputation: 4.95,
    reviewsCount: 22,
    successfulExchanges: 19,
    skillsShared: 9,
    donationsCount: 6,
    moneySaved: 11400,
    bio: 'Graduating senior clearing out lab gear, textbooks, and hostel fixtures. Passing on resources to juniors!',
    phone: '+91 97531 86420',
    preferredHandoverSpots: ['Workshop complex', 'Main Canteen'],
    badges: [
      { id: 'b1', title: 'Verified Student', icon: 'ShieldCheck', desc: 'Identity verified with university email' },
      { id: 'b2', title: 'Campus Pillar', icon: 'Star', desc: 'Recognized campus exchange leader' },
      { id: 'b3', title: 'Generous Donor', icon: 'Heart', desc: 'Donated items to 5+ freshers' }
    ]
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Engineering Mathematics (Higher) – B.S. Grewal',
    category: 'books',
    condition: 'Good',
    exchangeType: 'Exchange',
    estimatedValue: 550,
    ownerId: 'user-aditi',
    ownerName: 'Aditi Kumar',
    ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    ownerReputation: 4.8,
    ownerVerified: true,
    location: 'Hostel Block B, 2nd Floor',
    description: 'Crisp copy with formulas and solved examples. No missing pages, slight pencil annotations in calculus chapters 3 & 4.',
    tags: ['calculus', 'math', 'engineering', 'textbook', 'grewal', 'semester 1', 'semester 2'],
    availability: 'Available weekdays after 5:30 PM',
    status: 'available',
    createdAt: '2 days ago',
    imageEmoji: '📚',
    chainId: 'chain-math-grewal'
  },
  {
    id: 'res-2',
    title: 'Casio Scientific Calculator fx-991EX ClassWiz',
    category: 'electronics',
    condition: 'Like New',
    exchangeType: 'Sell',
    estimatedValue: 900,
    ownerId: 'user-rahul',
    ownerName: 'Rahul Mehta',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ownerReputation: 4.7,
    ownerVerified: true,
    location: 'Central Library, 2nd Floor Study Area',
    description: 'Solar + battery dual power. Approved for all university sem examinations. Includes hard protective slip case and user reference card.',
    tags: ['calculator', 'casio', 'exam', 'electronics', 'math', 'scientific'],
    availability: 'Can handover today between 2 PM - 6 PM',
    status: 'available',
    createdAt: '1 day ago',
    imageEmoji: '🧮',
    chainId: 'chain-casio-fx'
  },
  {
    id: 'res-3',
    title: 'Data Structures and Algorithms in C++ – Adam Drozdek',
    category: 'books',
    condition: 'Like New',
    exchangeType: 'Exchange',
    estimatedValue: 480,
    ownerId: 'user-ananya',
    ownerName: 'Ananya Deshmukh',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ownerReputation: 4.9,
    ownerVerified: true,
    location: 'Hostel Block E, Room 210',
    description: 'Essential textbook for 2nd and 3rd year CS/IT students. Covers Trees, Graphs, Sorting algorithms with clear pseudocode.',
    tags: ['data structures', 'dsa', 'algorithms', 'c++', 'cs', 'textbook'],
    availability: 'Immediate handover at Block E lounge',
    status: 'available',
    createdAt: '3 days ago',
    imageEmoji: '💻'
  },
  {
    id: 'res-4',
    title: 'Ergonomic Wooden Study Desk Riser & Laptop Stand',
    category: 'hostel',
    condition: 'Good',
    exchangeType: 'Free',
    estimatedValue: 650,
    ownerId: 'user-rohan',
    ownerName: 'Rohan Verma',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ownerReputation: 4.95,
    ownerVerified: true,
    location: 'Hostel Block D, Room 408',
    description: 'Sturdy pine wood monitor and laptop stand with heat vents and keyboard stowaway beneath. Super helpful for hostel desk ergonomics.',
    tags: ['hostel', 'furniture', 'laptop stand', 'desk', 'ergonomic', 'study'],
    availability: 'Free for any student who picks up from Block D',
    status: 'available',
    createdAt: 'Just now',
    imageEmoji: '🛏️'
  },
  {
    id: 'res-5',
    title: 'Drafting Board (A2 Size) + Mini Drafter + T-Scale Kit',
    category: 'stationery',
    condition: 'Good',
    exchangeType: 'Exchange',
    estimatedValue: 1200,
    ownerId: 'user-vikram',
    ownerName: 'Vikram Patel',
    ownerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    ownerReputation: 4.6,
    ownerVerified: true,
    location: 'Mechanical Engineering Workshop Foyer',
    description: 'Full engineering graphics kit. Sturdy wooden drafting table, precision mini drafter with clamp, sheet clips, and dust cover.',
    tags: ['engineering graphics', 'drafting', 'stationery', 'drawing', 'mini drafter', 'first year'],
    availability: 'Flexible timing during weekdays',
    status: 'available',
    createdAt: '4 days ago',
    imageEmoji: '✏️',
    chainId: 'chain-drafting-kit'
  },
  {
    id: 'res-6',
    title: 'Raspberry Pi 4 Model B (4GB RAM) with Case & Power Supply',
    category: 'electronics',
    condition: 'Like New',
    exchangeType: 'Sell',
    estimatedValue: 3200,
    ownerId: 'user-aarav',
    ownerName: 'Aarav Singh',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ownerReputation: 4.8,
    ownerVerified: true,
    location: 'Hostel Block C, Room 312',
    description: 'Includes acrylic cooling case with quiet mini fan, 32GB MicroSD card with Raspberry Pi OS preloaded, and Micro-HDMI cable.',
    tags: ['iot', 'raspberry pi', 'electronics', 'hardware', 'embedded', 'robotics'],
    availability: 'Evenings after 6 PM or weekends',
    status: 'available',
    createdAt: '5 days ago',
    imageEmoji: '⚡'
  },
  {
    id: 'res-7',
    title: 'Pure Copper Electric Kettle (1.5L Auto Cut-off)',
    category: 'hostel',
    condition: 'Fair',
    exchangeType: 'Exchange',
    estimatedValue: 400,
    ownerId: 'user-sneha',
    ownerName: 'Sneha Roy',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ownerReputation: 4.8,
    ownerVerified: true,
    location: 'Hostel Block B Pantry',
    description: 'Reliable fast-boil kettle. Clean inside, descaled recently. Great for late night exam prep tea/coffee or instant ramen.',
    tags: ['kettle', 'hostel items', 'appliances', 'cooking', 'winter'],
    availability: 'Pick up from Block B reception',
    status: 'available',
    createdAt: '6 days ago',
    imageEmoji: '☕'
  },
  {
    id: 'res-8',
    title: 'University Chemistry & Biology Laboratory Coat (Size M)',
    category: 'other',
    condition: 'Like New',
    exchangeType: 'Free',
    estimatedValue: 350,
    ownerId: 'user-priya',
    ownerName: 'Priya Sharma',
    ownerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    ownerReputation: 4.9,
    ownerVerified: true,
    location: 'BioTech Department Front Office',
    description: 'Clean white 100% cotton lab apron with university logo patch. Worn only 3 times for bio-lab practicals.',
    tags: ['lab coat', 'chemistry', 'biology', 'fresher', 'apron', 'practical'],
    availability: 'Available immediately at department foyer',
    status: 'available',
    createdAt: '1 day ago',
    imageEmoji: '🥼'
  }
];

export const INITIAL_SKILLS: SkillSwapItem[] = [
  {
    id: 'skill-1',
    studentId: 'user-aditi',
    studentName: 'Aditi Kumar',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    studentDepartment: 'Mathematics & Computing',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 16,
    skillOffered: 'Engineering Mathematics & Multivariable Calculus',
    skillOfferedCategory: 'Math & Science',
    skillOfferedLevel: 'Expert',
    skillWanted: 'Python & Pandas basics',
    availability: 'Evenings (Tue, Thu, Sat after 6 PM)',
    description: 'Can guide you through differentiation, double/triple integrals, Fourier series, and exam numerical problem sets.',
    format: '1-on-1 In-person'
  },
  {
    id: 'skill-2',
    studentId: 'user-aarav',
    studentName: 'Aarav Singh',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studentDepartment: 'Computer Science',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 14,
    skillOffered: 'Advanced Excel & Financial Modeling',
    skillOfferedCategory: 'Academics',
    skillOfferedLevel: 'Expert',
    skillWanted: 'Machine Learning / PyTorch intro',
    availability: 'Weekends & Friday afternoons',
    description: 'Pivot tables, VLOOKUP/XLOOKUP, macros, dynamic dashboard design, and statistical data cleaning.',
    format: 'Flexible'
  },
  {
    id: 'skill-3',
    studentId: 'user-priya',
    studentName: 'Priya Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    studentDepartment: 'Biotechnology',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 8,
    skillOffered: 'Python for Beginners & Automation',
    skillOfferedCategory: 'Coding',
    skillOfferedLevel: 'Intermediate',
    skillWanted: 'Excel data analysis & formula mastery',
    availability: 'Weekdays after 4 PM',
    description: 'Learn Python syntax, loops, data structures, script automation, and file handling through hands-on exercises.',
    format: '1-on-1 In-person'
  },
  {
    id: 'skill-4',
    studentId: 'user-rahul',
    studentName: 'Rahul Mehta',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    studentDepartment: 'Electrical Engineering',
    isVerified: true,
    rating: 4.7,
    reviewsCount: 11,
    skillOffered: 'SQL & Database Queries (PostgreSQL / MySQL)',
    skillOfferedCategory: 'Coding',
    skillOfferedLevel: 'Expert',
    skillWanted: 'UI/UX Wireframing in Figma',
    availability: 'Sunday mornings or Wednesday evenings',
    description: 'Joins, subqueries, indexing, schema design, and query optimization. Perfect for database management courses and interview prep.',
    format: 'Online/Discord'
  },
  {
    id: 'skill-5',
    studentId: 'user-ananya',
    studentName: 'Ananya Deshmukh',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    studentDepartment: 'Information Technology',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 19,
    skillOffered: 'Figma UI/UX & Responsive Web Prototyping',
    skillOfferedCategory: 'Design',
    skillOfferedLevel: 'Expert',
    skillWanted: 'Public Speaking / Presentation coaching',
    availability: 'Flexible weekend slots',
    description: 'Design interactive mockups, mobile app wireframes, modern component design systems, and developer handoff in Figma.',
    format: 'Flexible'
  },
  {
    id: 'skill-6',
    studentId: 'user-vikram',
    studentName: 'Vikram Patel',
    studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    studentDepartment: 'Civil Engineering',
    isVerified: true,
    rating: 4.6,
    reviewsCount: 9,
    skillOffered: 'AutoCAD 2D & Architectural Floor Plans',
    skillOfferedCategory: 'Design',
    skillOfferedLevel: 'Intermediate',
    skillWanted: 'Guitar chords & fingerpicking basics',
    availability: 'Saturday 3 PM - 6 PM',
    description: 'Learn drafting commands, dimensioning, layers, and civil layout plotting from scratch.',
    format: '1-on-1 In-person'
  }
];

export const INITIAL_DONATIONS: DonationItem[] = [
  {
    id: 'don-1',
    title: 'Scientific Calculator fx-82MS',
    category: 'electronics',
    condition: 'Good',
    donorName: 'Rohan Verma',
    donorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    dropoffSpot: 'Library Ground Floor Donation Drop-Box',
    impactStory: 'Your old calculator helped a first-year student prepare for mid-semester exams with zero expense.',
    status: 'claimed',
    claimedBy: 'Priya Sharma (1st Year)',
    claimedAt: 'Yesterday',
    date: '3 days ago',
    imageEmoji: '🧮'
  },
  {
    id: 'don-2',
    title: 'Organic Chemistry Model Molecule Set (120 Pcs)',
    category: 'books',
    condition: 'Like New',
    donorName: 'Sneha Roy',
    donorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    dropoffSpot: 'Student Welfare Center, Room 12',
    impactStory: 'Used in Chemistry Lab study circles by 6 pre-med and biotech freshers.',
    status: 'available',
    date: '2 days ago',
    imageEmoji: '🧪'
  },
  {
    id: 'don-3',
    title: 'Warm Winter Quilt & Hostel Bed Sheet Set',
    category: 'clothes',
    condition: 'Good',
    donorName: 'Vikram Patel',
    donorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    dropoffSpot: 'Hostel Block D Warden Office',
    impactStory: 'Helped an out-of-state fresher settle into the hostel comfortably during sudden winter chills.',
    status: 'claimed',
    claimedBy: 'Farhan Ali (1st Year)',
    claimedAt: '4 days ago',
    date: '5 days ago',
    imageEmoji: '🛏️'
  },
  {
    id: 'don-4',
    title: 'Pack of 12 Unused Spiral Project Notebooks & Pilot Pens',
    category: 'stationery',
    condition: 'Like New',
    donorName: 'Aarav Singh',
    donorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    dropoffSpot: 'Central Library Courtyard Helpdesk',
    impactStory: 'Provided complete semester note-taking supplies to 3 students from the community scholarship fund.',
    status: 'available',
    date: 'Yesterday',
    imageEmoji: '📓'
  }
];

export const INITIAL_WISHLISTS: WishlistItem[] = [
  {
    id: 'wish-1',
    title: 'Engineering Physics Vol 1 Textbook (G. Gaur & S.L. Gupta)',
    category: 'books',
    description: 'Need this urgently for upcoming end-sem optics and wave motion numericals.',
    urgency: 'Urgent',
    preferredLocation: 'Library or Hostel Block A/B',
    requesterName: 'Priya Sharma',
    requesterAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    requesterId: 'user-priya',
    createdAt: '1 day ago',
    matchedItemId: 'res-1',
    matchedItemTitle: 'Possible match found in Library Reserve!',
    status: 'open'
  },
  {
    id: 'wish-2',
    title: 'Original 65W USB-C Laptop Charger / Power Delivery Adapter',
    category: 'electronics',
    description: 'My OEM adapter cord snapped right before assignment submission. Need a spare for 3 days or to buy secondhand.',
    urgency: 'Exam Tomorrow!',
    preferredLocation: 'Hostel Block C or CS Dept Lounge',
    requesterName: 'Kabir Varma',
    requesterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    requesterId: 'user-kabir',
    createdAt: '5 hours ago',
    status: 'open'
  },
  {
    id: 'wish-3',
    title: 'Peer Tutor for SQL Database Joins and Group By queries',
    category: 'other',
    description: 'Need someone patient to review 4 problem sheets before the lab exam this Friday.',
    urgency: 'Urgent',
    preferredLocation: 'Central Library Cafe',
    requesterName: 'Aditi Kumar',
    requesterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    requesterId: 'user-aditi',
    createdAt: '2 days ago',
    matchedItemId: 'skill-4',
    matchedItemTitle: 'Rahul Mehta offers SQL & Database Queries!',
    status: 'open'
  },
  {
    id: 'wish-4',
    title: 'Single-door Mini Hostel Refrigerator or Table Fan',
    category: 'hostel',
    description: 'Room heats up in the afternoon; looking for a functioning table fan or small fridge to share in room 204.',
    urgency: 'Normal',
    preferredLocation: 'Hostel Block B',
    requesterName: 'Sneha Roy',
    requesterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    requesterId: 'user-sneha',
    createdAt: '3 days ago',
    status: 'open'
  }
];

export const INITIAL_RESOURCE_CHAINS: ResourceChain[] = [
  {
    id: 'chain-casio-fx',
    resourceTitle: 'Casio Scientific Calculator fx-991EX',
    category: 'electronics',
    initialDonor: 'Rohan Verma (Graduated 2024)',
    totalStudentsHelped: 4,
    combinedSavings: 4200,
    semestersInUse: 4,
    wasteSavedKg: 0.8,
    icon: '🧮',
    steps: [
      {
        stepNumber: 1,
        studentName: 'Rohan Verma',
        studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        role: 'Original Owner',
        period: 'Sem 1 & 2 (2023)',
        action: 'Purchased new for Engineering Thermodynamics & Calculus',
        notes: 'Kept in immaculate condition with protective casing.',
        location: 'Hostel Block D'
      },
      {
        stepNumber: 2,
        studentName: 'Aarav Singh',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Exchanged & Reused',
        period: 'Sem 3 (Late 2024)',
        action: 'Borrowed via Campus Exchange for Probability & Discrete Math',
        notes: 'Replaced battery with new LR44 cell; saved ₹1,100.',
        location: 'Hostel Block C'
      },
      {
        stepNumber: 3,
        studentName: 'Priya Sharma',
        studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        role: 'Exchanged & Reused',
        period: 'Sem 1 (Early 2025)',
        action: 'Passed forward for Biotech Biostatistics midterm exams',
        notes: 'Utilized matrix and statistical regression mode daily.',
        location: 'Hostel Block A'
      },
      {
        stepNumber: 4,
        studentName: 'Rahul Mehta',
        studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        role: 'Current Active Custodian',
        period: 'Current Semester',
        action: 'Listed on Exchange to pass to next incoming engineering batch',
        notes: 'Calculator has completed 3 university exam cycles with zero waste!',
        location: 'Central Library Study Pods'
      }
    ]
  },
  {
    id: 'chain-math-grewal',
    resourceTitle: 'Higher Engineering Mathematics – B.S. Grewal',
    category: 'books',
    initialDonor: 'Alumni Batch 2023',
    totalStudentsHelped: 3,
    combinedSavings: 1650,
    semestersInUse: 3,
    wasteSavedKg: 3.2,
    icon: '📚',
    steps: [
      {
        stepNumber: 1,
        studentName: 'Vikram Patel',
        studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        role: 'First Recipient',
        period: 'Semester 1',
        action: 'Received from seniors via Freshers Book Drive',
        notes: 'Book had highlighted solutions in Differential Equations chapter.',
        location: 'Hostel Block D'
      },
      {
        stepNumber: 2,
        studentName: 'Sneha Roy',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Second Recipient',
        period: 'Semester 2',
        action: 'Exchanged in exchange for Chemistry lab apron',
        notes: 'Read during late-night exam prep at Block B lounge.',
        location: 'Hostel Block B'
      },
      {
        stepNumber: 3,
        studentName: 'Aditi Kumar',
        studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        role: 'Current Owner',
        period: 'Current Semester',
        action: 'Ready to exchange for advanced Python or numerical analysis book',
        notes: 'Hardcover reinforced with book tape. In great condition.',
        location: 'Hostel Block B'
      }
    ]
  },
  {
    id: 'chain-drafting-kit',
    resourceTitle: 'Engineering Graphics Drafting Board & Mini Drafter Kit',
    category: 'stationery',
    initialDonor: 'Dept. Senior Council',
    totalStudentsHelped: 5,
    combinedSavings: 6000,
    semestersInUse: 5,
    wasteSavedKg: 9.5,
    icon: '📐',
    steps: [
      {
        stepNumber: 1,
        studentName: 'Rohan Verma',
        studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        role: 'Original Owner',
        period: 'Year 2022',
        action: 'Used for Mechanical Isometric Projections course',
        notes: 'High grade laminate board with smooth brass clamp.',
        location: 'Mech Dept.'
      },
      {
        stepNumber: 2,
        studentName: 'Kabir Varma',
        studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        role: 'Exchanged',
        period: 'Year 2023',
        action: 'Completed Engineering Drawing sheets without buying new board',
        notes: 'Saved ₹1,200 retail cost.',
        location: 'Civil Annex'
      },
      {
        stepNumber: 3,
        studentName: 'Vikram Patel',
        studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        role: 'Active Custodian',
        period: 'Year 2024 - Present',
        action: 'Re-listed on Campus Exchange for incoming freshers',
        notes: 'Zero carbon footprint from manufacturing new acrylic scales.',
        location: 'Workshop Foyer'
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    fromStudentName: 'Priya Sharma',
    fromStudentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    toStudentId: 'user-aarav',
    rating: 5,
    comment: 'Aarav handed over the textbook within 20 minutes at Central Library. Extremely friendly and even shared his course lecture notes!',
    date: '3 days ago',
    itemTitle: 'Operating System Concepts (Silberschatz)'
  },
  {
    id: 'rev-2',
    fromStudentName: 'Rahul Mehta',
    fromStudentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    toStudentId: 'user-aarav',
    rating: 5,
    comment: 'Great peer tutoring session on Excel data visualization. Very patient and clear explanations.',
    date: '1 week ago',
    itemTitle: 'Excel Peer Tutoring Session'
  },
  {
    id: 'rev-3',
    fromStudentName: 'Aditi Kumar',
    fromStudentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    toStudentId: 'user-aarav',
    rating: 4.8,
    comment: 'Smooth swap at Block C lounge. Item condition matched description 100%. Highly recommended campus peer!',
    date: '2 weeks ago',
    itemTitle: 'Logitech Wireless Mouse'
  }
];

export const CAMPUS_STATS: CampusStats = {
  resourcesReused: 24,
  skillsExchanged: 18,
  moneySaved: 12450,
  wasteAvoidedKg: 31,
  activeStudents: 284
};

export const MONTHLY_IMPACT_DATA = [
  { month: 'Mar', resources: 8, savings: 3600, skills: 6, waste: 9 },
  { month: 'Apr', resources: 12, savings: 5400, skills: 9, waste: 14 },
  { month: 'May', resources: 15, savings: 7200, skills: 12, waste: 19 },
  { month: 'Jun', resources: 9, savings: 4100, skills: 7, waste: 11 },
  { month: 'Jul', resources: 18, savings: 8900, skills: 14, waste: 23 },
  { month: 'Aug', resources: 21, savings: 10800, skills: 16, waste: 27 },
  { month: 'Sep', resources: 24, savings: 12450, skills: 18, waste: 31 }
];
