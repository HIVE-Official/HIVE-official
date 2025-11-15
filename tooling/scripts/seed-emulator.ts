#!/usr/bin/env tsx
/**
 * Seed Firebase Emulator with Test Data
 *
 * Run with: pnpm tsx scripts/seed-emulator.ts
 *
 * Prerequisites:
 * 1. Firebase emulator must be running: firebase emulators:start
 * 2. Emulator must be on default ports (Firestore: 8080, Auth: 9099)
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  connectFirestoreEmulator
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

// Firebase config (emulator doesn't need real config)
const app = initializeApp({
  projectId: 'hive-official',
  apiKey: 'fake-api-key',
  authDomain: 'localhost',
});

const db = getFirestore(app);
const auth = getAuth(app);

// Connect to emulator
connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });

console.log('🔌 Connected to Firebase Emulator');
console.log('   Firestore: localhost:8080');
console.log('   Auth: localhost:9099');
console.log('');

// ==================== SEED DATA DEFINITIONS ====================

const TEST_USER = {
  email: 'test@buffalo.edu',
  password: 'password123',
  profile: {
    campusId: 'ub-buffalo',
    handle: 'testuser',
    name: 'Test User',
    major: 'Computer Science',
    year: 3,
    bio: 'CS student testing HIVE',
    connections: [],
    friends: [],
  },
};

const SEED_SPACES = [
  {
    name: 'CS Study Buddies',
    slug: 'cs-study-buddies',
    campusId: 'ub-buffalo',
    category: 'student_org',
    tags: ['study', 'computer science'],
    visibility: 'public',
    joinPolicy: 'open',
    activityLevel: 'very_active',
    memberCount: 120,
    isActive: true,
    description: 'Find partners, pass exams.',
  },
  {
    name: 'Club Soccer',
    slug: 'club-soccer',
    campusId: 'ub-buffalo',
    category: 'sports',
    tags: ['soccer', 'fitness'],
    visibility: 'public',
    joinPolicy: 'approval',
    activityLevel: 'active',
    memberCount: 58,
    isActive: true,
    description: 'Play weekly, compete regionally.',
  },
  {
    name: 'Makers Lab',
    slug: 'makers-lab',
    campusId: 'ub-buffalo',
    category: 'builders',
    tags: ['hardware', 'ai', 'robotics'],
    visibility: 'public',
    joinPolicy: 'open',
    activityLevel: 'active',
    memberCount: 77,
    isActive: true,
    description: 'Build hardware projects, learn robotics.',
  },
  {
    name: 'Greek Alpha',
    slug: 'greek-alpha',
    campusId: 'ub-buffalo',
    category: 'greek_life',
    tags: ['greek', 'events'],
    visibility: 'members_only',
    joinPolicy: 'invite_only',
    activityLevel: 'active',
    memberCount: 38,
    isActive: true,
  },
  {
    name: 'Quiet Reading',
    slug: 'quiet-reading',
    campusId: 'ub-buffalo',
    category: 'hobby',
    tags: ['books', 'reading'],
    visibility: 'public',
    joinPolicy: 'open',
    activityLevel: 'quiet',
    memberCount: 22,
    isActive: true,
    description: 'Book club for quiet readers.',
  },
];

const SEED_RITUALS = [
  // Active
  {
    name: '7-Day Study Streak',
    description: 'Study for at least 30 minutes every day for a week. Build a consistent study habit.',
    icon: '📚',
    progress: 42,
    participantCount: 347,
    duration: '7 days',
    endDate: 'Nov 7',
    frequency: 'Daily',
    status: 'active',
  },
  {
    name: 'Morning Workout Challenge',
    description: 'Complete a 20-minute workout before 9am every day.',
    icon: '💪',
    progress: 67,
    participantCount: 589,
    duration: '14 days',
    endDate: 'Nov 14',
    frequency: 'Daily',
    status: 'active',
  },
  {
    name: 'Gratitude Journal',
    description: 'Write down 3 things you\'re grateful for each morning.',
    icon: '✨',
    progress: 28,
    participantCount: 234,
    duration: '21 days',
    endDate: 'Nov 21',
    frequency: 'Daily',
    status: 'active',
  },
  {
    name: 'Hydration Challenge',
    description: 'Drink 8 glasses of water every day.',
    icon: '💧',
    progress: 55,
    participantCount: 412,
    duration: '10 days',
    endDate: 'Nov 10',
    frequency: 'Daily',
    status: 'active',
  },
  {
    name: 'No Social Media Week',
    description: 'Stay off social media for an entire week.',
    icon: '📵',
    progress: 89,
    participantCount: 891,
    duration: '7 days',
    endDate: 'Nov 5',
    frequency: 'Daily',
    status: 'active',
  },
  // Upcoming
  {
    name: 'Campus Clean-Up Month',
    description: 'Pick up litter around campus every day for a month.',
    icon: '🌱',
    progress: 0,
    participantCount: 1247,
    duration: '30 days',
    startDate: 'Dec 1',
    frequency: 'Daily',
    status: 'upcoming',
  },
  {
    name: 'Holiday Kindness',
    description: 'Do one random act of kindness every day.',
    icon: '💝',
    progress: 0,
    participantCount: 567,
    duration: '14 days',
    startDate: 'Dec 15',
    frequency: 'Daily',
    status: 'upcoming',
  },
  // Completed
  {
    name: 'Meditation Week',
    description: 'Practice 10 minutes of meditation every morning.',
    icon: '🧘',
    progress: 100,
    participantCount: 678,
    duration: '7 days',
    frequency: 'Daily',
    isCompleted: true,
    status: 'completed',
  },
  {
    name: 'Early Bird Challenge',
    description: 'Wake up before 7am every day.',
    icon: '🌅',
    progress: 100,
    participantCount: 234,
    duration: '7 days',
    frequency: 'Daily',
    isCompleted: true,
    status: 'completed',
  },
];

// ==================== SEEDING FUNCTIONS ====================

async function seedUser() {
  console.log('👤 Creating test user...');

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      TEST_USER.email,
      TEST_USER.password
    );

    const userId = userCredential.user.uid;
    console.log(`   ✅ Created user: ${TEST_USER.email} (${userId})`);

    // Create profile document
    await setDoc(doc(db, 'profiles', userId), {
      id: userId,
      email: TEST_USER.email,
      ...TEST_USER.profile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log(`   ✅ Created profile document`);
    return userId;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`   ℹ️  User already exists: ${TEST_USER.email}`);
      // Sign in to get user ID
      const signInModule = await import('firebase/auth');
      const userCredential = await signInModule.signInWithEmailAndPassword(
        auth,
        TEST_USER.email,
        TEST_USER.password
      );
      return userCredential.user.uid;
    }
    throw error;
  }
}

async function seedSpaces(userId: string) {
  console.log('🏢 Creating spaces...');

  const spaceIds: string[] = [];

  for (const space of SEED_SPACES) {
    const docRef = await addDoc(collection(db, 'spaces'), {
      ...space,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    spaceIds.push(docRef.id);
    console.log(`   ✅ Created: ${space.name} (${docRef.id})`);

    // Add user as member
    await setDoc(doc(db, 'spaces', docRef.id, 'members', userId), {
      userId,
      role: 'member',
      joinedAt: new Date().toISOString(),
    });
  }

  return spaceIds;
}

async function seedPosts(userId: string, spaceIds: string[]) {
  console.log('📝 Creating posts...');

  const posts = [
    { content: 'Exam prep session 7pm @ Capen 201', spaceIndex: 0 },
    { content: 'Laser cutter training tomorrow', spaceIndex: 2 },
    { content: 'Pickup game Saturday 10am', spaceIndex: 1 },
    { content: 'Who wants to study for the midterm?', spaceIndex: 0 },
    { content: 'New 3D printer arrived!', spaceIndex: 2 },
  ];

  for (const post of posts) {
    await addDoc(collection(db, 'posts'), {
      content: post.content,
      authorId: userId,
      spaceId: spaceIds[post.spaceIndex],
      campusId: 'ub-buffalo',
      type: 'text',
      visibility: 'space',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Random within last day
      updatedAt: new Date().toISOString(),
      engagement: {
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10),
        views: Math.floor(Math.random() * 500),
      },
      userInteractions: {
        hasLiked: false,
        hasBookmarked: false,
      },
    });

    console.log(`   ✅ Created post in space ${spaceIds[post.spaceIndex]}`);
  }
}

// Bulk seed many posts to stress-test virtualization
async function seedBulkPosts(userId: string, spaceIds: string[], count: number) {
  if (count <= 0) return;
  console.log(`🚀 Bulk creating ${count} posts for virtualization test...`);

  const types = ['text', 'image', 'link', 'announcement'] as const;
  const sampleBodies = [
    'Study tip: Pomodoro 25/5 changed my focus.',
    'Anyone up for a study group tonight?',
    'New tool in Makers Lab — come try it!',
    'Reminder: Club soccer practice moved to Alumni Arena.',
    'Looking for a calculus tutor for next week.',
  ];

  for (let i = 0; i < count; i++) {
    const spaceId = spaceIds[i % spaceIds.length];
    const type = types[i % types.length];
    const content = sampleBodies[i % sampleBodies.length];

    await addDoc(collection(db, 'posts'), {
      content,
      authorId: userId,
      spaceId,
      campusId: 'ub-buffalo',
      type,
      visibility: 'space',
      isActive: true,
      isDeleted: false,
      createdAt: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      engagement: {
        likes: Math.floor(Math.random() * 30),
        comments: Math.floor(Math.random() * 10),
        shares: Math.floor(Math.random() * 5),
        views: Math.floor(Math.random() * 1000),
      },
      userInteractions: {
        hasLiked: false,
        hasBookmarked: false,
      },
      attachments: type === 'image' ? [
        {
          id: `att_${i}`,
          type: 'image',
          url: 'https://picsum.photos/seed/' + i + '/800/450',
          thumbnailUrl: 'https://picsum.photos/seed/' + i + '/400/225',
        }
      ] : [],
    });

    if ((i + 1) % 200 === 0) {
      console.log(`   ✓ ${i + 1} posts created...`);
    }
  }
}

async function seedRituals() {
  console.log('🎯 Creating rituals...');

  for (const ritual of SEED_RITUALS) {
    await addDoc(collection(db, 'rituals'), {
      ...ritual,
      campusId: 'ub-buffalo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log(`   ✅ Created: ${ritual.name} (${ritual.status})`);
  }
}

async function seedSpaceLeaders(spaceIds: string[], userId: string) {
  console.log('👥 Adding space leaders...');

  // Add test user as leader to first space
  await setDoc(doc(db, 'spaces', spaceIds[0], 'leaders', userId), {
    userId,
    role: 'admin',
    addedAt: new Date().toISOString(),
  });

  console.log(`   ✅ Added test user as leader to ${SEED_SPACES[0].name}`);
}

async function seedPinnedPosts(spaceIds: string[], userId: string) {
  console.log('📌 Creating pinned posts...');

  // Pinned post for CS Study Buddies
  await addDoc(collection(db, 'spaces', spaceIds[0], 'pinnedPosts'), {
    title: 'Welcome to CS Study Buddies!',
    content: 'Guidelines: Be respectful, share resources, help each other succeed.',
    authorId: userId,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
  });

  console.log(`   ✅ Added pinned post to ${SEED_SPACES[0].name}`);
}

// ==================== MAIN ====================

async function main() {
  try {
    console.log('🌱 Starting Firebase Emulator seed...');
    console.log('');

    // 1. Create user and profile
    const userId = await seedUser();
    console.log('');

    // 2. Create spaces
    const spaceIds = await seedSpaces(userId);
    console.log('');

    // 3. Create posts
    await seedPosts(userId, spaceIds);
    // Optional: bulk seed for feed virtualization test (set SEED_POSTS env)
    const bulkCount = Number(process.env.SEED_POSTS || 0);
    if (!Number.isNaN(bulkCount) && bulkCount > 0) {
      await seedBulkPosts(userId, spaceIds, bulkCount);
    }
    console.log('');

    // 4. Create rituals
    await seedRituals();
    console.log('');

    // 5. Add space leaders
    await seedSpaceLeaders(spaceIds, userId);
    console.log('');

    // 6. Add pinned posts
    await seedPinnedPosts(spaceIds, userId);
    console.log('');

    console.log('✅ Seeding complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Users: 1 (${TEST_USER.email})`);
    console.log(`   Spaces: ${SEED_SPACES.length}`);
    console.log(`   Posts: ${5 + (Number(process.env.SEED_POSTS || 0) || 0)}`);
    console.log(`   Rituals: ${SEED_RITUALS.length}`);
    console.log('');
    console.log('🎯 Next steps:');
    console.log('   1. Start app: pnpm dev');
    console.log('   2. Login with: test@buffalo.edu / password123');
    console.log('   3. (Optional) Bulk posts: SEED_POSTS=1200 pnpm tsx scripts/seed-emulator.ts');
    console.log('   4. View Emulator UI: http://localhost:4000');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Seeding failed:', error);
    console.error('');
    console.error('Troubleshooting:');
    console.error('  1. Is emulator running? firebase emulators:start');
    console.error('  2. Are ports available? (8080, 9099)');
    console.error('  3. Check emulator UI: http://localhost:4000');
    console.error('');
    process.exit(1);
  }
}

main();
