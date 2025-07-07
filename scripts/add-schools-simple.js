#!/usr/bin/env node

/**
 * Simple script to add Buffalo schools to Firestore
 * Uses Firebase CLI authentication
 */

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

// Initialize with CLI credentials
const app = initializeApp({
  credential: applicationDefault(),
  projectId: 'hive-9265c'
});

const db = getFirestore(app);

// Buffalo schools data (simplified)
const schools = [
  {
    id: 'university-at-buffalo',
    name: 'University at Buffalo',
    shortName: 'UB',
    domain: 'buffalo.edu',
    status: 'open',
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    allowsAutoJoin: true,
    hasDormitories: true
  },
  {
    id: 'buffalo-state',
    name: 'Buffalo State University',
    shortName: 'Buffalo State',
    domain: 'buffalostate.edu',
    status: 'waitlist',
    studentsUntilOpen: 25,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    allowsAutoJoin: true,
    hasDormitories: true
  },
  {
    id: 'canisius-university',
    name: 'Canisius University',
    shortName: 'Canisius',
    domain: 'canisius.edu',
    status: 'coming-soon',
    studentsUntilOpen: 50,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    allowsAutoJoin: true,
    hasDormitories: true
  }
];

async function addSchools() {
  console.log('🎓 Adding Buffalo area schools...');
  
  try {
    for (const school of schools) {
      const schoolRef = db.collection('schools').doc(school.id);
      
      // Check if exists
      const existing = await schoolRef.get();
      if (existing.exists) {
        console.log(`  ⏭️  ${school.name} already exists`);
        continue;
      }
      
      // Add school with timestamps
      const schoolData = {
        ...school,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        ...(school.status === 'open' ? { launchedAt: Timestamp.now() } : {})
      };
      
      await schoolRef.set(schoolData);
      console.log(`  ✅ Added ${school.name}`);
      
      // Add metrics
      await db.collection('school_metrics').doc(school.id).set({
        schoolId: school.id,
        totalUsers: 0,
        activeUsers: 0,
        totalSpaces: 0,
        activeSpaces: 0,
        lastUpdated: Timestamp.now()
      });
      console.log(`  📊 Added metrics for ${school.name}`);
    }
    
    console.log('🎉 Schools added successfully!');
    
  } catch (error) {
    console.error('❌ Error adding schools:', error.message);
    process.exit(1);
  }
}

// Run it
addSchools()
  .then(() => process.exit(0))
  .catch(console.error);