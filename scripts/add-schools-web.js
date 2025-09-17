#!/usr/bin/env node

/**
 * Add schools using Firebase Web SDK (no auth required for local setup)
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDoc, serverTimestamp } = require('firebase/firestore');

// Firebase config (using emulator)
const firebaseConfig = {
  projectId: 'hive-9265c'
};

// Use emulator
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Schools data
const schools = [
  {
    id: 'university-at-buffalo',
    name: 'University at Buffalo',
    shortName: 'UB',
    domain: 'buffalo.edu',
    status: 'open',
    studentsUntilOpen: 0,
    waitlistCount: 0,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    website: 'https://www.buffalo.edu',
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: false,
    hasDormitories: true,
    dormitoryList: [
      'Governors Complex',
      'Ellicott Complex', 
      'South Campus',
      'Creekside Village'
    ]
  },
  {
    id: 'buffalo-state',
    name: 'Buffalo State University',
    shortName: 'Buffalo State',
    domain: 'buffalostate.edu',
    status: 'waitlist',
    studentsUntilOpen: 25,
    waitlistCount: 0,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    website: 'https://www.buffalostate.edu',
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: false,
    hasDormitories: true,
    dormitoryList: ['Porter Hall', 'Neumann Hall', 'Bishop Hall']
  }
];

async function addSchoolsToEmulator() {
  console.log('🔥 Adding schools to Firebase emulator...');
  console.log('📍 Make sure Firebase emulator is running: firebase emulators:start');
  
  try {
    for (const school of schools) {
      const schoolRef = doc(db, 'schools', school.id);
      
      // Check if exists
      const existing = await getDoc(schoolRef);
      if (existing.exists()) {
        console.log(`  ⏭️  ${school.name} already exists`);
        continue;
      }
      
      // Add school
      const schoolData = {
        ...school,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...(school.status === 'open' ? { launchedAt: serverTimestamp() } : {})
      };
      
      await setDoc(schoolRef, schoolData);
      console.log(`  ✅ Added ${school.name}`);
      
      // Add metrics
      const metricsRef = doc(db, 'school_metrics', school.id);
      await setDoc(metricsRef, {
        schoolId: school.id,
        totalUsers: 0,
        activeUsers: 0,
        totalSpaces: 0,
        activeSpaces: 0,
        lastUpdated: serverTimestamp()
      });
      console.log(`  📊 Added metrics for ${school.name}`);
    }
    
    console.log('🎉 Schools added to emulator successfully!');
    console.log('🌐 View at: http://localhost:4000/firestore');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('💡 Start emulator with: firebase emulators:start');
  }
}

addSchoolsToEmulator();