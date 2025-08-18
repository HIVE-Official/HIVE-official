#!/usr/bin/env node

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.log('🔑 Using application default credentials');
  initializeApp();
} else {
  const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

async function analyzeCurrentFirestore() {
  console.log('📊 HIVE Firestore Current Analysis');
  console.log('==================================');
  
  const spaceTypes = [
    'campus_living',
    'fraternity_and_sorority', 
    'hive_exclusive',
    'student_organizations',
    'university_organizations'
  ];
  
  let totalSpaces = 0;
  const spacesByType: Record<string, number> = {};
  const spaceDetails: any[] = [];
  
  for (const spaceType of spaceTypes) {
    try {
      console.log(`\n🔍 Checking ${spaceType}...`);
      
      const spacesSnapshot = await db.collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
        
      const count = spacesSnapshot.size;
      spacesByType[spaceType] = count;
      totalSpaces += count;
      
      console.log(`   Found ${count} spaces`);
      
      // Get details for each space
      spacesSnapshot.docs.forEach(doc => {
        const data = doc.data();
        spaceDetails.push({
          id: doc.id,
          type: spaceType,
          name: data.name,
          description: data.description,
          memberCount: data.metrics?.memberCount || 0,
          isPrivate: data.isPrivate || false,
          createdAt: data.createdAt,
          tags: data.tags || []
        });
      });
      
    } catch (error) {
      console.error(`❌ Error checking ${spaceType}:`, error);
      spacesByType[spaceType] = 0;
    }
  }
  
  console.log('\n📈 SUMMARY');
  console.log('==========');
  console.log(`Total Spaces: ${totalSpaces}`);
  console.log('\nSpaces by Type:');
  Object.entries(spacesByType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  
  if (spaceDetails.length > 0) {
    console.log('\n📝 SPACE DETAILS');
    console.log('===============');
    spaceDetails.forEach(space => {
      console.log(`\n${space.name} (${space.id})`);
      console.log(`  Type: ${space.type}`);
      console.log(`  Description: ${space.description}`);
      console.log(`  Members: ${space.memberCount}`);
      console.log(`  Private: ${space.isPrivate}`);
      console.log(`  Tags: ${space.tags.join(', ') || 'None'}`);
    });
  }
  
  // Check for any legacy flat structure spaces too
  console.log('\n🔍 Checking for legacy flat spaces...');
  try {
    const legacySpaces = await db.collection('spaces').get();
    console.log(`Found ${legacySpaces.size} documents in root spaces collection`);
    
    // These should be the space type documents, not actual spaces
    legacySpaces.docs.forEach(doc => {
      console.log(`  Document: ${doc.id} (likely space type container)`);
    });
  } catch (error) {
    console.error('❌ Error checking legacy spaces:', error);
  }
  
  return {
    totalSpaces,
    spacesByType,
    spaceDetails
  };
}

// Run the analysis
analyzeCurrentFirestore()
  .then(results => {
    console.log('\n✅ Analysis complete!');
    console.log(`📊 Found ${results.totalSpaces} total spaces across ${Object.keys(results.spacesByType).length} space types`);
  })
  .catch(error => {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  });