import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin with emulator
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'demo-hive'
  });
}

// Connect to Firestore emulator
const db = getFirestore();
db.settings({
  host: 'localhost:8080',
  ssl: false
});

interface School {
  id: string;
  name: string;
  domain: string;
  status: 'open' | 'waitlist' | 'coming-soon';
  spotsLeft?: number;
  isFeatured?: boolean;
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

const schools: Omit<School, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open',
    isFeatured: true
  },
  {
    id: 'buffalo-state',
    name: 'Buffalo State University',
    domain: 'buffalostate.edu',
    status: 'coming-soon',
    spotsLeft: 350
  },
  {
    id: 'stony-brook',
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    status: 'coming-soon',
    spotsLeft: 350
  },
  {
    id: 'binghamton',
    name: 'Binghamton University',
    domain: 'binghamton.edu',
    status: 'coming-soon',
    spotsLeft: 350
  },
  {
    id: 'st-bonaventure',
    name: 'St. Bonaventure University',
    domain: 'sbu.edu',
    status: 'coming-soon',
    spotsLeft: 350
  }
];

async function seedSchools() {
  const batch = db.batch();
  const now = admin.firestore.Timestamp.now();

  for (const school of schools) {
    const schoolRef = db.collection('schools').doc(school.id);
    batch.set(schoolRef, {
      ...school,
      createdAt: now,
      updatedAt: now
    });
  }

  try {
    await batch.commit();
    console.log('✅ Successfully seeded schools');
  } catch (error) {
    console.error('❌ Error seeding schools:', error);
    process.exit(1);
  }
}

// Run the seed script
seedSchools().then(() => process.exit(0)); 