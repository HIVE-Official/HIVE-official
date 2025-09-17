#!/usr/bin/env ts-node

/**
 * CHECK FOR MOCK/GENERATED SPACES
 */

import * as admin from 'firebase-admin';

const serviceAccount = require('/Users/laneyfraass/Downloads/hive-9265c-firebase-adminsdk-fbsvc-c39fd9a2a6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'hive-9265c'
});

const db = admin.firestore();

// Indicators of mock/generated data
const MOCK_INDICATORS = [
  'mock',
  'test',
  'sample',
  'demo',
  'fake',
  'generated',
  'seed',
  'example',
  'dummy',
  'temp',
  'placeholder'
];

async function checkForMockSpaces() {
  console.log('🔍 CHECKING FOR MOCK/GENERATED SPACES');
  console.log('===================================\n');
  
  const spacesSnapshot = await db.collection('spaces').get();
  
  let realSpaces = 0;
  let suspiciousSpaces = 0;
  let mockSpaces = 0;
  
  const mockList: string[] = [];
  const suspiciousList: string[] = [];
  const realList: string[] = [];
  
  for (const doc of spacesSnapshot.docs) {
    const data = doc.data();
    const spaceId = doc.id;
    const name = data.name || '';
    const description = data.description || '';
    
    // Check for mock indicators in ID, name, or description
    const combinedText = `${spaceId} ${name} ${description}`.toLowerCase();
    
    const hasMockIndicator = MOCK_INDICATORS.some(indicator => 
      combinedText.includes(indicator)
    );
    
    // Check for other suspicious patterns
    const hasGeneratedId = spaceId.length > 20 && /^[a-zA-Z0-9]+$/.test(spaceId);
    const hasMinimalData = !description || description.length < 10;
    const hasDefaultValues = name === 'Unnamed Space' || name === 'New Space';
    
    if (hasMockIndicator) {
      mockSpaces++;
      mockList.push(`${name} (${spaceId}) - Contains: ${MOCK_INDICATORS.find(i => combinedText.includes(i))}`);
    } else if (hasGeneratedId && hasMinimalData) {
      suspiciousSpaces++;
      suspiciousList.push(`${name} (${spaceId}) - Generated ID + minimal data`);
    } else if (hasDefaultValues) {
      suspiciousSpaces++;
      suspiciousList.push(`${name} (${spaceId}) - Default values`);
    } else {
      realSpaces++;
      realList.push(`${name} (${data.category || 'no category'})`);
    }
  }
  
  console.log('📊 ANALYSIS RESULTS:');
  console.log(`Total Spaces: ${spacesSnapshot.size}`);
  console.log(`Real Spaces: ${realSpaces}`);
  console.log(`Suspicious/Generated: ${suspiciousSpaces}`);
  console.log(`Clearly Mock: ${mockSpaces}\n`);
  
  if (mockList.length > 0) {
    console.log('🚨 CLEARLY MOCK SPACES:');
    mockList.forEach(space => console.log(`  - ${space}`));
    console.log('');
  }
  
  if (suspiciousList.length > 0) {
    console.log('⚠️  SUSPICIOUS SPACES (might be generated):');
    suspiciousList.slice(0, 20).forEach(space => console.log(`  - ${space}`));
    if (suspiciousList.length > 20) {
      console.log(`  ... and ${suspiciousList.length - 20} more\n`);
    }
  }
  
  console.log('✅ SAMPLE REAL SPACES:');
  realList.slice(0, 15).forEach(space => console.log(`  - ${space}`));
  if (realList.length > 15) {
    console.log(`  ... and ${realList.length - 15} more`);
  }
  
  // Check creation patterns
  console.log('\n🕒 CHECKING CREATION PATTERNS:');
  
  const spacesWithTimestamps = [];
  for (const doc of spacesSnapshot.docs) {
    const data = doc.data();
    if (data.createdAt) {
      spacesWithTimestamps.push({
        name: data.name || doc.id,
        createdAt: data.createdAt.toDate(),
        migratedAt: data.migratedAt?.toDate()
      });
    }
  }
  
  // Group by creation date
  const creationDates = new Map();
  spacesWithTimestamps.forEach(space => {
    const dateStr = space.createdAt.toDateString();
    if (!creationDates.has(dateStr)) {
      creationDates.set(dateStr, []);
    }
    creationDates.get(dateStr).push(space);
  });
  
  console.log('\nSpaces created by date:');
  Array.from(creationDates.entries())
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .forEach(([date, spaces]) => {
      console.log(`  ${date}: ${spaces.length} spaces`);
      if (spaces.length > 10) {
        console.log(`    (Possible bulk generation)`);
      }
    });
  
  // Check for recent migration
  const recentlyMigrated = spacesWithTimestamps.filter(space => 
    space.migratedAt && 
    (Date.now() - space.migratedAt.getTime()) < 24 * 60 * 60 * 1000 // Last 24 hours
  );
  
  if (recentlyMigrated.length > 0) {
    console.log(`\n📥 ${recentlyMigrated.length} spaces migrated in the last 24 hours`);
  }
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  if (mockSpaces > 0) {
    console.log(`  ❌ Delete ${mockSpaces} clearly mock spaces`);
  }
  if (suspiciousSpaces > realSpaces) {
    console.log(`  ⚠️  Review suspicious spaces - might be auto-generated`);
  }
  if (realSpaces > 0) {
    console.log(`  ✅ Keep ${realSpaces} real spaces`);
  }
}

// Run
checkForMockSpaces().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Check failed:', err);
  process.exit(1);
});