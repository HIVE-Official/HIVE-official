#!/usr/bin/env node

// Import the properly configured Firebase admin from web app
import { dbAdmin } from '../apps/web/src/lib/firebase-admin';

async function analyzeRealFirestore() {
  console.log('📊 HIVE Firestore Real Database Analysis');
  console.log('=========================================');
  
  const currentSpaceTypes = [
    'campus_living',
    'fraternity_and_sorority', 
    'hive_exclusive',
    'student_organizations',
    'university_organizations'
  ];
  
  // Also check legacy types in case they still exist
  const legacySpaceTypes = [
    'academics',
    'student',
    'university', 
    'residential',
    'greek_life'
  ];
  
  let totalSpaces = 0;
  const spacesByType: Record<string, number> = {};
  const spaceDetails: any[] = [];
  
  console.log('\n🔍 Checking Current Space Types...');
  for (const spaceType of currentSpaceTypes) {
    try {
      console.log(`   Checking ${spaceType}...`);
      
      const spacesSnapshot = await dbAdmin.collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
        
      const count = spacesSnapshot.size;
      spacesByType[spaceType] = count;
      totalSpaces += count;
      
      console.log(`     Found ${count} spaces`);
      
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
          tags: data.tags || [],
          _path: `spaces/${spaceType}/spaces/${doc.id}`
        });
      });
      
    } catch (error) {
      console.error(`❌ Error checking ${spaceType}:`, error);
      spacesByType[spaceType] = 0;
    }
  }
  
  console.log('\n🔍 Checking Legacy Space Types...');
  for (const spaceType of legacySpaceTypes) {
    try {
      console.log(`   Checking legacy ${spaceType}...`);
      
      const spacesSnapshot = await dbAdmin.collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
        
      const count = spacesSnapshot.size;
      if (count > 0) {
        spacesByType[`${spaceType} (legacy)`] = count;
        totalSpaces += count;
        
        console.log(`     Found ${count} legacy spaces`);
        
        // Get details for legacy spaces too
        spacesSnapshot.docs.forEach(doc => {
          const data = doc.data();
          spaceDetails.push({
            id: doc.id,
            type: `${spaceType} (legacy)`,
            name: data.name,
            description: data.description,
            memberCount: data.metrics?.memberCount || 0,
            isPrivate: data.isPrivate || false,
            createdAt: data.createdAt,
            tags: data.tags || [],
            _path: `spaces/${spaceType}/spaces/${doc.id}`
          });
        });
      } else {
        console.log(`     No legacy ${spaceType} spaces found`);
      }
      
    } catch (error) {
      console.log(`     Legacy ${spaceType} collection doesn't exist (expected)`);
    }
  }
  
  // Check for flat structure spaces (very old format)
  console.log('\n🔍 Checking for flat structure spaces...');
  try {
    const flatSpaces = await dbAdmin.collection('spaces').get();
    let actualSpaces = 0;
    
    flatSpaces.docs.forEach(doc => {
      const data = doc.data();
      // If it has a 'name' field, it's likely a space, not a type container
      if (data.name) {
        actualSpaces++;
        spaceDetails.push({
          id: doc.id,
          type: 'flat (very old)',
          name: data.name,
          description: data.description,
          memberCount: data.metrics?.memberCount || 0,
          isPrivate: data.isPrivate || false,
          createdAt: data.createdAt,
          tags: data.tags || [],
          _path: `spaces/${doc.id}`
        });
      }
    });
    
    if (actualSpaces > 0) {
      console.log(`   Found ${actualSpaces} flat structure spaces`);
      spacesByType['flat (very old)'] = actualSpaces;
      totalSpaces += actualSpaces;
    } else {
      console.log(`   Found ${flatSpaces.size} space type containers (expected)`);
    }
    
  } catch (error) {
    console.error('❌ Error checking flat spaces:', error);
  }
  
  console.log('\n📈 REAL DATABASE SUMMARY');
  console.log('=======================');
  console.log(`Total Spaces: ${totalSpaces}`);
  console.log('\nSpaces by Type:');
  Object.entries(spacesByType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  
  if (spaceDetails.length > 0) {
    console.log('\n📝 ALL SPACE DETAILS');
    console.log('===================');
    spaceDetails
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(space => {
        console.log(`\n${space.name} (${space.id})`);
        console.log(`  Type: ${space.type}`);
        console.log(`  Path: ${space._path}`);
        console.log(`  Description: ${space.description || 'No description'}`);
        console.log(`  Members: ${space.memberCount}`);
        console.log(`  Private: ${space.isPrivate}`);
        console.log(`  Tags: ${space.tags.join(', ') || 'None'}`);
        if (space.createdAt) {
          const date = space.createdAt.toDate ? space.createdAt.toDate() : new Date(space.createdAt);
          console.log(`  Created: ${date.toLocaleString()}`);
        }
      });
  } else {
    console.log('\n⚠️  NO SPACES FOUND IN DATABASE');
    console.log('This could mean:');
    console.log('1. Database is truly empty');
    console.log('2. Firebase credentials are not properly configured');
    console.log('3. Database structure is different than expected');
  }
  
  return {
    totalSpaces,
    spacesByType,
    spaceDetails,
    summary: {
      currentFormatSpaces: currentSpaceTypes.reduce((sum, type) => sum + (spacesByType[type] || 0), 0),
      legacyFormatSpaces: legacySpaceTypes.reduce((sum, type) => sum + (spacesByType[`${type} (legacy)`] || 0), 0),
      flatFormatSpaces: spacesByType['flat (very old)'] || 0
    }
  };
}

// Run the analysis
analyzeRealFirestore()
  .then(results => {
    console.log('\n✅ ANALYSIS COMPLETE!');
    console.log('====================');
    console.log(`📊 Total: ${results.totalSpaces} spaces found`);
    console.log(`🆕 Current format: ${results.summary.currentFormatSpaces} spaces`);
    console.log(`🔄 Legacy format: ${results.summary.legacyFormatSpaces} spaces`);  
    console.log(`📁 Flat format: ${results.summary.flatFormatSpaces} spaces`);
    
    if (results.totalSpaces === 0) {
      console.log('\n🚨 NO SPACES FOUND - Database may be empty or credentials issue');
    } else {
      console.log('\n🎉 Successfully found spaces in your Firestore database!');
    }
  })
  .catch(error => {
    console.error('❌ Analysis failed:', error);
    if (error.message.includes('Firebase Admin not configured')) {
      console.log('\n💡 SOLUTION: Set up Firebase environment variables in apps/web/.env.local:');
      console.log('   FIREBASE_PROJECT_ID=your-project-id');
      console.log('   FIREBASE_CLIENT_EMAIL=your-service-account-email');
      console.log('   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n..."');
    }
    process.exit(1);
  });