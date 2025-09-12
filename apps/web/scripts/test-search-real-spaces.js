/**
 * Test searching real RSS feed spaces
 * Run with: node apps/web/scripts/test-search-real-spaces.js
 */

require('dotenv').config({ path: './apps/web/.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin
function initializeFirebase() {
  try {
    if (admin.apps?.length > 0) {
      return admin.app();
    }

    let credential;
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      credential = admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString()
      );
      credential = admin.credential.cert(serviceAccount);
    }

    const _app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

async function testSearch(query) {
  const _app = initializeFirebase();
  const db = admin.firestore();
  
  console.log(`\n🔍 Searching for: "${query}"`);
  console.log('='.repeat(50));
  
  const spaceTypes = [
    'student_organizations',
    'fraternity_and_sorority', 
    'campus_living',
    'university_organizations'
  ];
  
  const results = [];
  const queryLower = query.toLowerCase();
  
  for (const spaceType of spaceTypes) {
    try {
      const spacesSnapshot = await db
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
      
      for (const doc of spacesSnapshot.docs) {
        const data = doc.data();
        const name = (data.name || '').toLowerCase();
        const description = (data.description || '').toLowerCase();
        const tags = (data.tags || []).map(tag => tag.toLowerCase());
        
        // Check if query matches
        const nameMatch = name.includes(queryLower);
        const descriptionMatch = description.includes(queryLower);
        const tagMatch = tags.some(tag => tag.includes(queryLower));
        
        if (nameMatch || descriptionMatch || tagMatch) {
          results.push({
            id: doc.id,
            name: data.name,
            type: spaceType,
            matchType: nameMatch ? 'name' : descriptionMatch ? 'description' : 'tag',
            description: data.description?.substring(0, 100) + '...'
          });
        }
      }
    } catch (error) {
      console.error(`Error searching ${spaceType}:`, error.message);
    }
  }
  
  if (results.length === 0) {
    console.log('❌ No spaces found matching your query');
  } else {
    console.log(`✅ Found ${results.length} spaces:\n`);
    results.forEach((space, index) => {
      console.log(`${index + 1}. ${space.name}`);
      console.log(`   ID: ${space.id}`);
      console.log(`   Type: ${space.type}`);
      console.log(`   Match: ${space.matchType}`);
      if (space.description) {
        console.log(`   Description: ${space.description}`);
      }
      console.log('');
    });
  }
  
  return results;
}

async function runTests() {
  try {
    console.log('🧪 Testing real spaces search functionality...\n');
    
    // Test different search queries
    const testQueries = [
      'academic',      // Should find Academic Bowl
      'tennis',        // Should find Aces Club Tennis
      'pharmacy',      // Should find Academy of Managed Care Pharmacy
      'african',       // Should find African SA
      'engineering',   // Should find engineering clubs
      'dance',         // Should find dance-related clubs
      'alpha',         // Should find Alpha Kappa Alpha
      'campus',        // Should find Campus Living spaces
      'board'          // Should find Campus Programming Board
    ];
    
    for (const query of testQueries) {
      await testSearch(query);
    }
    
    console.log('\n✨ Search test completed!');
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
    process.exit(1);
  }
}

// Run the tests
runTests()
  .then(() => {
    console.log('\n🎉 All tests completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });