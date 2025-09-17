/**
 * Seed script to populate initial spaces in Firebase
 * Run with: node apps/web/scripts/seed-spaces.js
 */

require('dotenv').config({ path: './apps/web/.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin
function initializeFirebase() {
  try {
    // Check if already initialized
    if (admin.apps?.length > 0) {
      console.log('✅ Using existing Firebase app');
      return admin.app();
    }

    let credential;

    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      credential = admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      console.log('✅ Using individual env vars for credentials');
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString()
      );
      credential = admin.credential.cert(serviceAccount);
      console.log('✅ Using base64 service account');
    } else {
      console.error('❌ No Firebase admin credentials found');
      throw new Error('No Firebase admin credentials found');
    }

    const _app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    console.log('✅ Firebase Admin initialized for project:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    return _app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

// UB Spaces to seed
const UB_SPACES = [
  {
    id: 'ub-cs-club',
    name: 'UB Computer Science Club',
    description: 'Building the future of tech at UB, one line of code at a time',
    memberCount: 342,
    isVerified: true,
    isActive: true,
    tags: ['technology', 'programming', 'hackathons'],
    category: 'academic',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'ub-acm',
    name: 'Association for Computing Machinery',
    description: 'UB Chapter of ACM - Competitive programming and tech talks',
    memberCount: 189,
    isVerified: true,
    isActive: true,
    tags: ['programming', 'competitions', 'networking'],
    category: 'academic',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'pre-med-society',
    name: 'Pre-Med Society',
    description: 'Supporting future doctors through MCAT prep, volunteering, and mentorship',
    memberCount: 428,
    isVerified: true,
    isActive: true,
    tags: ['medicine', 'healthcare', 'mcat'],
    category: 'academic',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'ub-dance-team',
    name: 'UB Dance Team',
    description: 'From hip hop to contemporary, we move as one',
    memberCount: 85,
    isVerified: true,
    isActive: true,
    tags: ['dance', 'performance', 'arts'],
    category: 'cultural',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'ub-robotics',
    name: 'UB Robotics Club',
    description: 'Building autonomous systems and competing nationally',
    memberCount: 67,
    isVerified: true,
    isActive: true,
    tags: ['robotics', 'engineering', 'AI'],
    category: 'academic',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'rocket-league-esports',
    name: 'Rocket League Esports',
    description: 'Competitive gaming at its finest - join our ranked team',
    memberCount: 156,
    isVerified: false,
    isActive: true,
    tags: ['gaming', 'esports', 'competition'],
    category: 'recreational',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'chess-club',
    name: 'Chess Club',
    description: 'Strategic minds unite - from beginners to grandmasters',
    memberCount: 93,
    isVerified: false,
    isActive: true,
    tags: ['chess', 'strategy', 'competition'],
    category: 'recreational',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'ub-film-society',
    name: 'Film Society',
    description: 'Creating, watching, and discussing cinema',
    memberCount: 178,
    isVerified: true,
    isActive: true,
    tags: ['film', 'cinema', 'production'],
    category: 'cultural',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'startup-incubator',
    name: 'Startup Incubator',
    description: 'Turn your ideas into reality with mentorship and resources',
    memberCount: 234,
    isVerified: true,
    isActive: true,
    tags: ['entrepreneurship', 'business', 'innovation'],
    category: 'professional',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
  {
    id: 'ub-volleyball-club',
    name: 'Volleyball Club',
    description: 'Bump, set, spike - competitive and recreational teams',
    memberCount: 112,
    isVerified: false,
    isActive: true,
    tags: ['sports', 'volleyball', 'fitness'],
    category: 'recreational',
    type: 'student_organizations',
    schoolId: 'ub-buffalo',
  },
];

async function seedSpaces() {
  try {
    console.log('🚀 Starting spaces seed...\n');
    
    const _app = initializeFirebase();
    const db = admin.firestore();
    
    console.log('📁 Creating flat spaces collection...\n');
    
    for (const space of UB_SPACES) {
      try {
        // Add to flat collection for easy searching
        await db.collection('spaces_flat').doc(space.id).set({
          ...space,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        console.log(`  ✅ Created: ${space.name} (${space.memberCount} members)`);
      } catch (error) {
        console.error(`  ❌ Failed to create ${space.name}:`, error.message);
      }
    }
    
    console.log(`\n✨ Successfully seeded ${UB_SPACES.length} spaces!`);
    
  } catch (error) {
    console.error('❌ Error seeding spaces:', error);
    process.exit(1);
  }
}

// Run the seed
seedSpaces()
  .then(() => {
    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to seed:', error);
    process.exit(1);
  });