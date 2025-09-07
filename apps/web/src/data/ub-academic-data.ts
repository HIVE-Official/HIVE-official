/**
 * University at Buffalo Academic Data
 * Comprehensive list of majors, programs, and student interests
 */

// UB Majors organized by college/school
export const UB_MAJORS = [
  // College of Arts and Sciences
  { value: 'african-american-studies', label: 'African American Studies', college: 'CAS' },
  { value: 'american-studies', label: 'American Studies', college: 'CAS' },
  { value: 'anthropology', label: 'Anthropology', college: 'CAS' },
  { value: 'art', label: 'Art', college: 'CAS' },
  { value: 'art-history', label: 'Art History', college: 'CAS' },
  { value: 'asian-studies', label: 'Asian Studies', college: 'CAS' },
  { value: 'biochemistry', label: 'Biochemistry', college: 'CAS' },
  { value: 'biological-sciences', label: 'Biological Sciences', college: 'CAS' },
  { value: 'biophysics', label: 'Biophysics', college: 'CAS' },
  { value: 'chemistry', label: 'Chemistry', college: 'CAS' },
  { value: 'classics', label: 'Classics', college: 'CAS' },
  { value: 'cognitive-science', label: 'Cognitive Science', college: 'CAS' },
  { value: 'communication', label: 'Communication', college: 'CAS' },
  { value: 'computational-physics', label: 'Computational Physics', college: 'CAS' },
  { value: 'dance', label: 'Dance', college: 'CAS' },
  { value: 'economics', label: 'Economics', college: 'CAS' },
  { value: 'english', label: 'English', college: 'CAS' },
  { value: 'environmental-geosciences', label: 'Environmental Geosciences', college: 'CAS' },
  { value: 'environmental-studies', label: 'Environmental Studies', college: 'CAS' },
  { value: 'film-studies', label: 'Film Studies', college: 'CAS' },
  { value: 'french', label: 'French', college: 'CAS' },
  { value: 'geography', label: 'Geography', college: 'CAS' },
  { value: 'geological-sciences', label: 'Geological Sciences', college: 'CAS' },
  { value: 'german', label: 'German', college: 'CAS' },
  { value: 'global-gender-studies', label: 'Global Gender and Sexuality Studies', college: 'CAS' },
  { value: 'history', label: 'History', college: 'CAS' },
  { value: 'italian', label: 'Italian', college: 'CAS' },
  { value: 'jewish-thought', label: 'Jewish Thought', college: 'CAS' },
  { value: 'linguistics', label: 'Linguistics', college: 'CAS' },
  { value: 'mathematics', label: 'Mathematics', college: 'CAS' },
  { value: 'mathematical-economics', label: 'Mathematical Economics', college: 'CAS' },
  { value: 'media-study', label: 'Media Study', college: 'CAS' },
  { value: 'music', label: 'Music', college: 'CAS' },
  { value: 'music-composition', label: 'Music Composition', college: 'CAS' },
  { value: 'music-performance', label: 'Music Performance', college: 'CAS' },
  { value: 'music-theatre', label: 'Music Theatre', college: 'CAS' },
  { value: 'philosophy', label: 'Philosophy', college: 'CAS' },
  { value: 'physics', label: 'Physics', college: 'CAS' },
  { value: 'political-science', label: 'Political Science', college: 'CAS' },
  { value: 'psychology', label: 'Psychology', college: 'CAS' },
  { value: 'romance-languages', label: 'Romance Languages and Literatures', college: 'CAS' },
  { value: 'russian', label: 'Russian', college: 'CAS' },
  { value: 'sociology', label: 'Sociology', college: 'CAS' },
  { value: 'spanish', label: 'Spanish', college: 'CAS' },
  { value: 'statistics', label: 'Statistics', college: 'CAS' },
  { value: 'theatre', label: 'Theatre', college: 'CAS' },
  { value: 'world-languages', label: 'World Languages', college: 'CAS' },

  // School of Engineering and Applied Sciences
  { value: 'aerospace-engineering', label: 'Aerospace Engineering', college: 'SEAS' },
  { value: 'biomedical-engineering', label: 'Biomedical Engineering', college: 'SEAS' },
  { value: 'chemical-engineering', label: 'Chemical Engineering', college: 'SEAS' },
  { value: 'civil-engineering', label: 'Civil Engineering', college: 'SEAS' },
  { value: 'computer-engineering', label: 'Computer Engineering', college: 'SEAS' },
  { value: 'computer-science', label: 'Computer Science', college: 'SEAS' },
  { value: 'data-science', label: 'Data Science', college: 'SEAS' },
  { value: 'electrical-engineering', label: 'Electrical Engineering', college: 'SEAS' },
  { value: 'engineering-physics', label: 'Engineering Physics', college: 'SEAS' },
  { value: 'environmental-engineering', label: 'Environmental Engineering', college: 'SEAS' },
  { value: 'industrial-engineering', label: 'Industrial Engineering', college: 'SEAS' },
  { value: 'materials-design-innovation', label: 'Materials Design and Innovation', college: 'SEAS' },
  { value: 'mechanical-engineering', label: 'Mechanical Engineering', college: 'SEAS' },

  // School of Management
  { value: 'accounting', label: 'Accounting', college: 'SOM' },
  { value: 'business-administration', label: 'Business Administration', college: 'SOM' },
  { value: 'financial-analysis', label: 'Financial Analysis', college: 'SOM' },
  { value: 'hotel-restaurant-management', label: 'Hotel and Restaurant Management', college: 'SOM' },
  { value: 'international-business', label: 'International Business', college: 'SOM' },
  { value: 'management-information-systems', label: 'Management Information Systems', college: 'SOM' },
  { value: 'marketing', label: 'Marketing', college: 'SOM' },
  { value: 'supply-chain', label: 'Supply Chain and Operations Management', college: 'SOM' },

  // School of Architecture and Planning
  { value: 'architecture', label: 'Architecture', college: 'AP' },
  { value: 'environmental-design', label: 'Environmental Design', college: 'AP' },
  { value: 'urban-planning', label: 'Urban Planning', college: 'AP' },

  // School of Public Health and Health Professions
  { value: 'biostatistics', label: 'Biostatistics', college: 'SPHHP' },
  { value: 'community-health', label: 'Community Health', college: 'SPHHP' },
  { value: 'exercise-science', label: 'Exercise Science', college: 'SPHHP' },
  { value: 'global-public-health', label: 'Global Public Health', college: 'SPHHP' },
  { value: 'health-human-services', label: 'Health and Human Services', college: 'SPHHP' },
  { value: 'kinesiology', label: 'Kinesiology', college: 'SPHHP' },
  { value: 'nutrition', label: 'Nutrition', college: 'SPHHP' },
  { value: 'occupational-therapy', label: 'Occupational Therapy', college: 'SPHHP' },
  { value: 'physical-therapy', label: 'Physical Therapy', college: 'SPHHP' },
  { value: 'public-health', label: 'Public Health', college: 'SPHHP' },

  // School of Nursing
  { value: 'nursing', label: 'Nursing', college: 'SON' },

  // School of Pharmacy and Pharmaceutical Sciences
  { value: 'pharmaceutical-sciences', label: 'Pharmaceutical Sciences', college: 'SPPS' },
  { value: 'pharmacy', label: 'Pharmacy', college: 'SPPS' },

  // School of Social Work
  { value: 'social-work', label: 'Social Work', college: 'SSW' },

  // Graduate School of Education
  { value: 'childhood-education', label: 'Childhood Education', college: 'GSE' },
  { value: 'early-childhood-education', label: 'Early Childhood Education', college: 'GSE' },
  { value: 'educational-psychology', label: 'Educational Psychology', college: 'GSE' },
  { value: 'special-education', label: 'Special Education', college: 'GSE' },

  // Law School
  { value: 'legal-studies', label: 'Legal Studies', college: 'LAW' },
  { value: 'law', label: 'Law (JD)', college: 'LAW' },

  // School of Medicine
  { value: 'biomedical-sciences', label: 'Biomedical Sciences', college: 'JSMBS' },
  { value: 'medicine', label: 'Medicine (MD)', college: 'JSMBS' },
  { value: 'medical-technology', label: 'Medical Technology', college: 'JSMBS' },

  // School of Dental Medicine
  { value: 'dental-medicine', label: 'Dental Medicine', college: 'SDM' },

  // Interdisciplinary Programs
  { value: 'disability-studies', label: 'Disability Studies', college: 'INTER' },
  { value: 'entrepreneurship', label: 'Entrepreneurship', college: 'INTER' },
  { value: 'game-studies', label: 'Game Studies', college: 'INTER' },
  { value: 'health-humanities', label: 'Health Humanities', college: 'INTER' },
  { value: 'indigenous-studies', label: 'Indigenous Studies', college: 'INTER' },
  { value: 'latina-latino-studies', label: 'Latina/Latino Studies', college: 'INTER' },
  { value: 'neuroscience', label: 'Neuroscience', college: 'INTER' },
  { value: 'robotics', label: 'Robotics', college: 'INTER' },
  { value: 'undecided', label: 'Undecided/Exploratory', college: 'OTHER' },
  { value: 'other', label: 'Other/Custom', college: 'OTHER' }
].sort((a, b) => a.label.localeCompare(b.label));

// Student Interests - Expanded and categorized
export const UB_INTERESTS = {
  academic: [
    'Research Projects',
    'Study Groups',
    'Tutoring',
    'Academic Competitions',
    'Conferences',
    'Publishing Papers',
    'Lab Work',
    'Field Studies',
    'Case Competitions',
    'Hackathons',
    'Design Challenges',
    'Mock Trials',
    'Debate Team',
    'Model UN',
    'Science Olympiad'
  ],
  
  career: [
    'Internships',
    'Co-ops',
    'Job Search',
    'Networking',
    'Resume Building',
    'Interview Prep',
    'Career Fairs',
    'Industry Talks',
    'Startups',
    'Entrepreneurship',
    'Consulting',
    'Finance',
    'Tech Industry',
    'Healthcare',
    'Public Service'
  ],
  
  clubs: [
    'Student Government',
    'Professional Societies',
    'Honor Societies',
    'Cultural Clubs',
    'Academic Clubs',
    'Service Organizations',
    'Religious Groups',
    'Political Groups',
    'Environmental Groups',
    'Social Justice',
    'Advocacy Groups',
    'Special Interest',
    'Gaming Clubs',
    'Film Club',
    'Book Club'
  ],
  
  greekLife: [
    'Fraternities',
    'Sororities',
    'Professional Fraternities',
    'Service Fraternities',
    'Honor Fraternities',
    'Multicultural Greeks',
    'Greek Events',
    'Philanthropy',
    'Greek Leadership'
  ],
  
  sports: [
    'Intramural Sports',
    'Club Sports',
    'Varsity Athletics',
    'Basketball',
    'Soccer',
    'Football',
    'Hockey',
    'Volleyball',
    'Tennis',
    'Swimming',
    'Track & Field',
    'Cross Country',
    'Baseball',
    'Softball',
    'Lacrosse',
    'Rugby',
    'Wrestling',
    'Golf',
    'Rowing',
    'Esports',
    'Rock Climbing',
    'Martial Arts',
    'Dance',
    'Yoga',
    'Fitness Training'
  ],
  
  arts: [
    'Music Performance',
    'Theater',
    'Dance',
    'Visual Arts',
    'Photography',
    'Film Making',
    'Creative Writing',
    'Poetry',
    'Digital Art',
    'Graphic Design',
    'Fashion',
    'Sculpture',
    'Painting',
    'Drawing',
    'Ceramics',
    'Orchestra',
    'Choir',
    'Band',
    'A Cappella',
    'Stand-up Comedy'
  ],
  
  technology: [
    'Programming',
    'Web Development',
    'App Development',
    'Game Development',
    'AI/Machine Learning',
    'Cybersecurity',
    'Data Science',
    'Robotics',
    'VR/AR',
    '3D Printing',
    'Electronics',
    'Hardware Hacking',
    'Open Source',
    'Tech Talks',
    'Coding Bootcamps'
  ],
  
  social: [
    'Parties',
    'Social Events',
    'Meetups',
    'Networking Events',
    'Dating',
    'Friend Groups',
    'Study Buddies',
    'Roommate Activities',
    'Dorm Events',
    'Campus Tours',
    'Orientation',
    'Welcome Week',
    'Homecoming',
    'Spring Fest',
    'Fall Fest'
  ],
  
  wellness: [
    'Mental Health',
    'Meditation',
    'Mindfulness',
    'Stress Management',
    'Nutrition',
    'Cooking',
    'Sleep Health',
    'Work-Life Balance',
    'Self Care',
    'Support Groups',
    'Counseling',
    'Peer Support',
    'Wellness Workshops'
  ],
  
  community: [
    'Volunteering',
    'Community Service',
    'Fundraising',
    'Charity Events',
    'Blood Drives',
    'Food Drives',
    'Habitat for Humanity',
    'Tutoring Kids',
    'Elder Care',
    'Animal Shelters',
    'Environmental Cleanup',
    'Social Impact',
    'Local Outreach'
  ],
  
  culture: [
    'International Students',
    'Study Abroad',
    'Language Exchange',
    'Cultural Events',
    'Food & Cuisine',
    'Music & Dance',
    'Festivals',
    'Heritage Months',
    'Cultural Awareness',
    'Diversity Programs',
    'Multicultural Affairs'
  ],
  
  hobbies: [
    'Reading',
    'Writing',
    'Blogging',
    'Podcasting',
    'Video Creation',
    'Streaming',
    'Board Games',
    'Card Games',
    'Video Games',
    'Anime',
    'Comics',
    'Collecting',
    'Crafts',
    'DIY Projects',
    'Gardening',
    'Cooking & Baking',
    'Cars & Motorcycles',
    'Fashion & Style',
    'Travel',
    'Outdoor Adventures'
  ]
};

// Flatten interests for easier selection
export const ALL_INTERESTS = Object.values(UB_INTERESTS).flat().sort();

// Living situations specific to UB
export const UB_LIVING_SITUATIONS = [
  // North Campus Dorms
  { value: 'ellicott-complex', label: 'Ellicott Complex', campus: 'North' },
  { value: 'governors-complex', label: 'Governors Complex', campus: 'North' },
  { value: 'greiner-hall', label: 'Greiner Hall', campus: 'North' },
  { value: 'creekside-village', label: 'Creekside Village', campus: 'North' },
  { value: 'flint-village', label: 'Flint Village', campus: 'North' },
  { value: 'hadley-village', label: 'Hadley Village', campus: 'North' },
  { value: 'south-lake-village', label: 'South Lake Village', campus: 'North' },
  
  // South Campus Dorms
  { value: 'clement-hall', label: 'Clement Hall', campus: 'South' },
  { value: 'goodyear-hall', label: 'Goodyear Hall', campus: 'South' },
  { value: 'michael-hall', label: 'Michael Hall', campus: 'South' },
  { value: 'university-apartments', label: 'University Apartments', campus: 'South' },
  
  // Off-Campus Areas
  { value: 'off-campus-amherst', label: 'Off Campus - Amherst', campus: 'Off' },
  { value: 'off-campus-north-buffalo', label: 'Off Campus - North Buffalo', campus: 'Off' },
  { value: 'off-campus-south-buffalo', label: 'Off Campus - South Buffalo', campus: 'Off' },
  { value: 'off-campus-university-heights', label: 'Off Campus - University Heights', campus: 'Off' },
  { value: 'off-campus-kenmore', label: 'Off Campus - Kenmore', campus: 'Off' },
  { value: 'off-campus-tonawanda', label: 'Off Campus - Tonawanda', campus: 'Off' },
  { value: 'off-campus-williamsville', label: 'Off Campus - Williamsville', campus: 'Off' },
  
  // Other
  { value: 'commuter', label: 'Commuter (Living with Family)', campus: 'Commuter' },
  { value: 'commuter-independent', label: 'Commuter (Own Place)', campus: 'Commuter' },
  { value: 'other', label: 'Other', campus: 'Other' }
];

// Graduation years (current year to 8 years out for various programs)
export const getGraduationYears = () => {
  const startYear = 2026; // Starting from 2026
  const years = [];
  
  // Generate years from 2026 onwards
  for (let i = 0; i <= 8; i++) {
    const year = startYear + i;
    let label = String(year);
    
    // Add helpful labels based on current year
    const currentYear = new Date().getFullYear();
    const diff = year - currentYear;
    
    if (diff === 1) label += ' (Senior)';
    else if (diff === 2) label += ' (Junior)';
    else if (diff === 3) label += ' (Sophomore)';
    else if (diff === 4) label += ' (Freshman)';
    else if (diff >= 5 && diff <= 6) label += ' (Future Student)';
    else if (diff >= 7) label += ' (Long-term Planning)';
    
    years.push({ value: String(year), label });
  }
  
  return years;
};

// Initial spaces to join
export const UB_INITIAL_SPACES = [
  { 
    id: 'ub-general', 
    name: 'UB General', 
    description: 'Campus-wide discussions and announcements',
    memberCount: '15,000+',
    category: 'general'
  },
  { 
    id: 'class-2025', 
    name: 'Class of 2025', 
    description: 'Connect with your graduating class',
    memberCount: '3,200+',
    category: 'academic'
  },
  { 
    id: 'class-2026', 
    name: 'Class of 2026', 
    description: 'Connect with your graduating class',
    memberCount: '3,500+',
    category: 'academic'
  },
  { 
    id: 'class-2027', 
    name: 'Class of 2027', 
    description: 'Connect with your graduating class',
    memberCount: '3,800+',
    category: 'academic'
  },
  { 
    id: 'class-2028', 
    name: 'Class of 2028', 
    description: 'Connect with your graduating class',
    memberCount: '4,100+',
    category: 'academic'
  },
  { 
    id: 'study-groups', 
    name: 'Study Groups Hub', 
    description: 'Find study partners for any class',
    memberCount: '8,500+',
    category: 'academic'
  },
  { 
    id: 'campus-events', 
    name: 'Campus Events', 
    description: 'Never miss what\'s happening on campus',
    memberCount: '12,000+',
    category: 'social'
  },
  { 
    id: 'housing-roommates', 
    name: 'Housing & Roommates', 
    description: 'Find roommates and housing info',
    memberCount: '6,200+',
    category: 'living'
  },
  { 
    id: 'career-network', 
    name: 'Career Network', 
    description: 'Jobs, internships, and career advice',
    memberCount: '9,800+',
    category: 'career'
  },
  { 
    id: 'student-orgs', 
    name: 'Student Organizations', 
    description: 'Discover and join campus clubs',
    memberCount: '7,500+',
    category: 'clubs'
  },
  { 
    id: 'ub-sports', 
    name: 'UB Sports & Recreation', 
    description: 'Intramurals, club sports, and Bulls athletics',
    memberCount: '5,400+',
    category: 'sports'
  },
  { 
    id: 'international-students', 
    name: 'International Students', 
    description: 'Support and community for international Bulls',
    memberCount: '3,100+',
    category: 'culture'
  },
  { 
    id: 'commuter-students', 
    name: 'Commuter Students', 
    description: 'Resources and connections for commuters',
    memberCount: '4,700+',
    category: 'living'
  },
  { 
    id: 'research-opportunities', 
    name: 'Research Opportunities', 
    description: 'Find research positions and collaborators',
    memberCount: '2,800+',
    category: 'academic'
  },
  { 
    id: 'greek-life', 
    name: 'Greek Life', 
    description: 'Fraternities and sororities at UB',
    memberCount: '1,900+',
    category: 'social'
  }
];

// Campus goals and objectives
export const UB_CAMPUS_GOALS = [
  'Make new friends',
  'Find study partners',
  'Join student organizations',
  'Improve GPA',
  'Get research experience',
  'Find internships',
  'Land a full-time job',
  'Build professional network',
  'Learn new skills',
  'Get involved on campus',
  'Attend more events',
  'Improve work-life balance',
  'Find mentorship',
  'Start a club/organization',
  'Run for student government',
  'Study abroad',
  'Complete a minor',
  'Graduate with honors',
  'Get into grad school',
  'Build a startup',
  'Make Dean\'s List',
  'Publish research',
  'Win competitions',
  'Get leadership experience',
  'Volunteer regularly',
  'Improve mental health',
  'Stay physically active',
  'Explore Buffalo',
  'Save money',
  'Have more fun'
];