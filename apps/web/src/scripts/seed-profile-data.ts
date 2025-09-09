/**
 * Seed Firebase with realistic profile data for testing
 * Run with: npm run seed:profiles
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  Timestamp,
  writeBatch,
  getDocs,
  query,
  limit
} from 'firebase/firestore';

// Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

if (!firebaseConfig.apiKey) {
  console.error('❌ Firebase configuration not found. Please check your .env.local file.');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test data
const TEST_USERS = [
  {
    email: 'sarah.chen@buffalo.edu',
    fullName: 'Sarah Chen',
    handle: 'sarahchen',
    major: 'Computer Science',
    year: 'Junior',
    bio: 'CS major, AI enthusiast. Love hackathons and coffee runs!',
    dormBuilding: 'Ellicott Complex',
    pronouns: 'she/her',
    status: { emoji: '💻', text: 'Coding', availability: 'busy' }
  },
  {
    email: 'mike.johnson@buffalo.edu',
    fullName: 'Mike Johnson',
    handle: 'mikej',
    major: 'Mechanical Engineering',
    year: 'Senior',
    bio: 'Building robots and looking for study partners',
    dormBuilding: 'Governors Complex',
    pronouns: 'he/him',
    status: { emoji: '🔧', text: 'In the lab', availability: 'available' }
  },
  {
    email: 'emily.davis@buffalo.edu',
    fullName: 'Emily Davis',
    handle: 'emilyd',
    major: 'Psychology',
    year: 'Sophomore',
    bio: 'Psych major, research assistant, always down for Tim Hortons',
    dormBuilding: 'South Campus',
    pronouns: 'she/they',
    status: { emoji: '📚', text: 'Studying', availability: 'dnd' }
  },
  {
    email: 'alex.kim@buffalo.edu',
    fullName: 'Alex Kim',
    handle: 'alexk',
    major: 'Business Administration',
    year: 'Junior',
    bio: 'Entrepreneur in the making. Let\'s connect!',
    dormBuilding: 'Creekside Village',
    pronouns: 'they/them',
    status: { emoji: '🚀', text: 'Networking', availability: 'available' }
  },
  {
    email: 'jessica.liu@buffalo.edu',
    fullName: 'Jessica Liu',
    handle: 'jessicaliu',
    major: 'Biomedical Engineering',
    year: 'Freshman',
    bio: 'BME freshman, pre-med track, looking for study groups',
    dormBuilding: 'Ellicott Complex',
    pronouns: 'she/her',
    status: { emoji: '🧬', text: 'Lab work', availability: 'busy' }
  }
];

const TEST_SPACES = [
  {
    id: 'cs-220-fall-2024',
    name: 'CS 220 - Systems Programming',
    type: 'academic',
    description: 'Course space for CS 220 Fall 2024',
    memberCount: 45,
    isActive: true
  },
  {
    id: 'ellicott-complex',
    name: 'Ellicott Complex',
    type: 'residential',
    description: 'Community space for Ellicott residents',
    memberCount: 320,
    isActive: true
  },
  {
    id: 'ub-robotics-club',
    name: 'UB Robotics Club',
    type: 'organization',
    description: 'Build robots, compete, and have fun!',
    memberCount: 85,
    isActive: true
  },
  {
    id: 'study-buddies',
    name: 'Study Buddies',
    type: 'social',
    description: 'Find study partners across all majors',
    memberCount: 156,
    isActive: true
  },
  {
    id: 'ub-coffee-lovers',
    name: 'Coffee Lovers @ UB',
    type: 'social',
    description: 'Best coffee spots on and off campus',
    memberCount: 234,
    isActive: true
  }
];

async function seedProfiles() {
  console.log('🌱 Seeding user profiles...');
  const batch = writeBatch(db);
  const userIds: string[] = [];
  
  for (const userData of TEST_USERS) {
    // Create a unique ID for each user
    const userId = `user_${userData.handle}`;
    userIds.push(userId);
    
    const profileData = {
      uid: userId,
      email: userData.email,
      handle: userData.handle,
      fullName: userData.fullName,
      displayName: userData.fullName.split(' ')[0],
      
      // Academic
      campus: 'ub-buffalo',
      major: userData.major,
      year: userData.year,
      graduationYear: 2025,
      
      // Personal
      pronouns: userData.pronouns,
      bio: userData.bio,
      dormBuilding: userData.dormBuilding,
      hometown: 'Buffalo, NY',
      
      // Photos
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.handle}`,
      photos: [],
      
      // Status
      currentStatus: {
        ...userData.status,
        duration: 120,
        updatedAt: Timestamp.now(),
        expiresAt: Timestamp.fromDate(new Date(Date.now() + 2 * 60 * 60 * 1000))
      },
      
      // Verification
      isVerified: true,
      verifiedAt: Timestamp.now(),
      verificationMethod: 'email',
      
      // Stats
      stats: {
        profileViews: Math.floor(Math.random() * 100),
        connections: Math.floor(Math.random() * 30),
        friends: Math.floor(Math.random() * 10),
        spacesJoined: 3 + Math.floor(Math.random() * 5),
        postsCreated: Math.floor(Math.random() * 20),
        toolsCreated: Math.floor(Math.random() * 5)
      },
      
      // Achievements
      achievements: ['early_adopter', 'verified_student'],
      unlocks: {
        tools: Math.random() > 0.5,
        customization: true,
        analytics: true,
        ghostMode: false
      },
      
      // Privacy
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showLocation: true,
        showActivity: true,
        ghostMode: false,
        allowMessages: 'everyone'
      },
      
      // Metadata
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastActive: Timestamp.now(),
      completionPercentage: 75 + Math.floor(Math.random() * 25)
    };
    
    batch.set(doc(db, 'users', userId), profileData);
  }
  
  await batch.commit();
  console.log('✅ Created', userIds.length, 'user profiles');
  return userIds;
}

async function seedSpaces() {
  console.log('🏠 Seeding spaces...');
  const batch = writeBatch(db);
  
  for (const spaceData of TEST_SPACES) {
    batch.set(doc(db, 'spaces', spaceData.id), {
      ...spaceData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      settings: {
        joinApproval: false,
        postApproval: false,
        visibility: 'public'
      }
    });
  }
  
  await batch.commit();
  console.log('✅ Created', TEST_SPACES.length, 'spaces');
  return TEST_SPACES.map(s => s.id);
}

async function seedSpaceMemberships(userIds: string[], spaceIds: string[]) {
  console.log('👥 Creating space memberships...');
  const batch = writeBatch(db);
  let membershipCount = 0;
  
  for (const userId of userIds) {
    // Each user joins 2-4 spaces
    const numSpaces = 2 + Math.floor(Math.random() * 3);
    const userSpaces = spaceIds
      .sort(() => Math.random() - 0.5)
      .slice(0, numSpaces);
    
    for (const spaceId of userSpaces) {
      const membershipId = `${userId}_${spaceId}`;
      const space = TEST_SPACES.find(s => s.id === spaceId);
      
      batch.set(doc(db, 'spaceMembers', membershipId), {
        userId,
        spaceId,
        spaceName: space?.name || 'Unknown Space',
        spaceType: space?.type || 'general',
        role: Math.random() > 0.8 ? 'moderator' : 'member',
        joinedAt: Timestamp.now(),
        lastActivity: Timestamp.now(),
        activityLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        postsCount: Math.floor(Math.random() * 10),
        reactionsCount: Math.floor(Math.random() * 20),
        notificationSettings: {
          posts: true,
          events: true,
          mentions: true
        },
        unreadCount: Math.floor(Math.random() * 5),
        lastRead: Timestamp.now()
      });
      membershipCount++;
    }
  }
  
  await batch.commit();
  console.log('✅ Created', membershipCount, 'space memberships');
}

async function seedConnections(userIds: string[]) {
  console.log('🤝 Creating connections...');
  const batch = writeBatch(db);
  let connectionCount = 0;
  
  // Create connections between users
  for (let i = 0; i < userIds.length; i++) {
    for (let j = i + 1; j < userIds.length; j++) {
      // 60% chance of connection
      if (Math.random() < 0.6) {
        const connectionId = `conn_${userIds[i]}_${userIds[j]}`;
        const isFriend = Math.random() > 0.7;
        
        batch.set(doc(db, 'connections', connectionId), {
          user1: userIds[i],
          user2: userIds[j],
          status: 'connected',
          type: isFriend ? 'friend' : 'connection',
          connectedAt: Timestamp.now(),
          friendsSince: isFriend ? Timestamp.now() : null,
          connectionSource: 'space',
          lastInteraction: Timestamp.now(),
          interactionCount: Math.floor(Math.random() * 20),
          mutualSpaces: ['study-buddies'],
          mutualFriends: []
        });
        connectionCount++;
      }
    }
  }
  
  await batch.commit();
  console.log('✅ Created', connectionCount, 'connections');
}

async function seedEvents(userIds: string[]) {
  console.log('📅 Creating calendar events...');
  const batch = writeBatch(db);
  let eventCount = 0;
  
  const eventTemplates = [
    { title: 'CS 220 Study Session', type: 'study', location: 'Capen Library' },
    { title: 'Coffee Run', type: 'social', location: 'Tim Hortons' },
    { title: 'Robotics Club Meeting', type: 'meeting', location: 'Engineering Building' },
    { title: 'Calculus Review', type: 'study', location: 'Math Building' },
    { title: 'Campus Tour', type: 'social', location: 'Student Union' }
  ];
  
  for (const userId of userIds) {
    // Each user has 1-3 upcoming events
    const numEvents = 1 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numEvents; i++) {
      const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      const eventId = `event_${userId}_${Date.now()}_${i}`;
      const startDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      
      batch.set(doc(db, 'calendarEvents', eventId), {
        userId,
        title: template.title,
        description: `Join us for ${template.title.toLowerCase()}`,
        type: template.type,
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(new Date(startDate.getTime() + 2 * 60 * 60 * 1000)),
        allDay: false,
        location: template.location,
        isVirtual: false,
        attendees: [userId],
        friendsAttending: [],
        source: 'manual',
        createdBy: userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      eventCount++;
    }
  }
  
  await batch.commit();
  console.log('✅ Created', eventCount, 'calendar events');
}

async function seedPosts(userIds: string[], spaceIds: string[]) {
  console.log('📝 Creating posts...');
  const batch = writeBatch(db);
  let postCount = 0;
  
  const postTemplates = [
    'Anyone want to study for the midterm together?',
    'Lost my calculator in the library, has anyone seen it?',
    'Who\'s going to the basketball game tonight?',
    'Need a ride to Wegmans this weekend',
    'Starting a study group for CS 220, DM if interested',
    'Best coffee on campus? Wrong answers only 😂',
    'Anyone else struggling with the homework?',
    'Forming a team for the hackathon, need 2 more people'
  ];
  
  for (const spaceId of spaceIds.slice(0, 3)) { // Limit to 3 spaces
    for (let i = 0; i < 5; i++) { // 5 posts per space
      const authorId = userIds[Math.floor(Math.random() * userIds.length)];
      const postId = `post_${spaceId}_${Date.now()}_${i}`;
      
      batch.set(doc(db, 'posts', postId), {
        spaceId,
        authorId,
        content: postTemplates[Math.floor(Math.random() * postTemplates.length)],
        type: 'text',
        tags: ['general'],
        likes: Math.floor(Math.random() * 20),
        comments: Math.floor(Math.random() * 10),
        shares: Math.floor(Math.random() * 5),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isEdited: false,
        isPinned: false
      });
      postCount++;
    }
  }
  
  await batch.commit();
  console.log('✅ Created', postCount, 'posts');
}

async function main() {
  try {
    console.log('🚀 Starting HIVE profile data seeding...\n');
    
    // Check if data already exists
    const existingUsers = await getDocs(query(collection(db, 'users'), limit(1)));
    if (!existingUsers.empty) {
      console.log('⚠️  Data already exists. Skipping seed to prevent duplicates.');
      console.log('   To reseed, clear your Firebase collections first.\n');
      return;
    }
    
    // Seed all data
    const userIds = await seedProfiles();
    const spaceIds = await seedSpaces();
    await seedSpaceMemberships(userIds, spaceIds);
    await seedConnections(userIds);
    await seedEvents(userIds);
    await seedPosts(userIds, spaceIds);
    
    console.log('\n✨ Seeding complete! Your HIVE profile system now has:');
    console.log('   -', userIds.length, 'user profiles');
    console.log('   -', spaceIds.length, 'spaces');
    console.log('   - Space memberships');
    console.log('   - User connections');
    console.log('   - Calendar events');
    console.log('   - Posts in spaces\n');
    
    console.log('🎉 Profile system is ready with real data!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seeding
main();