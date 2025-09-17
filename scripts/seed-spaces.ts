#!/usr/bin/env tsx
/**
 * Seed script to populate initial spaces in Firebase
 * Run with: pnpm tsx scripts/seed-spaces.ts
 */

import { config } from 'dotenv';
import { initializeApp, cert, getFirestore, FieldValue } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { Timestamp } from 'firebase-admin/firestore';

// Load environment variables first
config({ path: './apps/web/.env.local' });

let admin: any;

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
      console.error('❌ No Firebase admin credentials found in environment');
      console.log('Available env vars:', Object.keys(process.env).filter(k => k.includes('FIREBASE')));
      throw new Error('No Firebase admin credentials found');
    }

    const app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    console.log('✅ Firebase Admin initialized');
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

// UB Spaces to seed
const UB_SPACES = [
  // Student Organizations
  {
    type: 'student_organizations',
    spaces: [
      {
        id: 'ub-cs-club',
        name: 'UB Computer Science Club',
        description: 'Building the future of tech at UB, one line of code at a time',
        memberCount: 342,
        isVerified: true,
        isActive: true,
        tags: ['technology', 'programming', 'hackathons'],
        category: 'academic',
        createdAt: new Date('2024-08-15'),
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
        createdAt: new Date('2024-08-20'),
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
        createdAt: new Date('2024-08-18'),
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
        createdAt: new Date('2024-09-01'),
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
        createdAt: new Date('2024-08-25'),
        schoolId: 'ub-buffalo',
      },
    ],
  },
  // Fraternity and Sorority
  {
    type: 'fraternity_and_sorority',
    spaces: [
      {
        id: 'alpha-phi-alpha',
        name: 'Alpha Phi Alpha',
        description: 'First of its kind, leaders of tomorrow',
        memberCount: 45,
        isVerified: true,
        isActive: true,
        tags: ['fraternity', 'leadership', 'service'],
        category: 'greek',
        createdAt: new Date('2024-08-10'),
        schoolId: 'ub-buffalo',
      },
      {
        id: 'delta-sigma-theta',
        name: 'Delta Sigma Theta',
        description: 'Sisterhood, scholarship, and service',
        memberCount: 38,
        isVerified: true,
        isActive: true,
        tags: ['sorority', 'community', 'leadership'],
        category: 'greek',
        createdAt: new Date('2024-08-12'),
        schoolId: 'ub-buffalo',
      },
    ],
  },
  // Campus Living
  {
    type: 'campus_living',
    spaces: [
      {
        id: 'ellicott-complex',
        name: 'Ellicott Complex Community',
        description: 'The heart of freshman life at UB',
        memberCount: 1250,
        isVerified: true,
        isActive: true,
        tags: ['housing', 'freshman', 'community'],
        category: 'residential',
        createdAt: new Date('2024-08-01'),
        schoolId: 'ub-buffalo',
      },
      {
        id: 'governors-hall',
        name: 'Governors Hall',
        description: 'Suite-style living with AC',
        memberCount: 420,
        isVerified: true,
        isActive: true,
        tags: ['housing', 'suites', 'upperclassmen'],
        category: 'residential',
        createdAt: new Date('2024-08-05'),
        schoolId: 'ub-buffalo',
      },
    ],
  },
  // HIVE Exclusive
  {
    type: 'hive_exclusive',
    spaces: [
      {
        id: 'hive-builders',
        name: 'HIVE Builders',
        description: 'Creating the future of campus social utility',
        memberCount: 12,
        isVerified: true,
        isActive: true,
        tags: ['development', 'innovation', 'builders'],
        category: 'exclusive',
        createdAt: new Date('2024-07-01'),
        schoolId: 'ub-buffalo',
      },
    ],
  },
];

async function seedSpaces() {
  try {
    console.log('🚀 Starting spaces seed...\n');
    
    const app = initializeFirebase();
    const db = admin.firestore();
    
    let totalCreated = 0;
    
    for (const spaceType of UB_SPACES) {
      console.log(`\n📁 Seeding ${spaceType.type}...`);
      
      // Create the space type document if it doesn't exist
      const spaceTypeRef = db.collection('spaces').doc(spaceType.type);
      await spaceTypeRef.set(
        {
          type: spaceType.type,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      
      // Add spaces to the subcollection
      for (const space of spaceType.spaces) {
        const spaceRef = spaceTypeRef.collection('spaces').doc(space.id);
        
        await spaceRef.set({
          ...space,
          createdAt: admin.firestore.Timestamp.fromDate(space.createdAt),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        console.log(`  ✅ Created: ${space.name} (${space.memberCount} members)`);
        totalCreated++;
      }
    }
    
    // Also create a flat spaces collection for easier searching
    console.log('\n📁 Creating flat spaces collection for search...');
    for (const spaceType of UB_SPACES) {
      for (const space of spaceType.spaces) {
        await db.collection('spaces_flat').doc(space.id).set({
          ...space,
          spaceType: spaceType.type,
          createdAt: admin.firestore.Timestamp.fromDate(space.createdAt),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }
    
    console.log(`\n✨ Successfully seeded ${totalCreated} spaces!`);
    console.log('\nSpace types created:');
    UB_SPACES.forEach(st => {
      console.log(`  - ${st.type}: ${st.spaces.length} spaces`);
    });
    
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