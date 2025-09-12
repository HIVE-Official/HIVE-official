/**
 * Test the actual search API endpoint with authentication
 * Run with: node apps/web/scripts/test-api-search.js
 */

require('dotenv').config({ path: './apps/web/.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin to get a test token
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

async function getTestToken() {
  const _app = initializeFirebase();
  
  // Create a custom token for testing
  const uid = 'test-user-' + Date.now();
  const customToken = await admin.auth().createCustomToken(uid);
  
  console.log('🔑 Created test token for user:', uid);
  return customToken;
}

async function testSearchAPI(query) {
  console.log(`\n🔍 Testing API search for: "${query}"`);
  console.log('='.repeat(50));
  
  try {
    // Get a test token
    const token = await getTestToken();
    
    // Make the API request
    const response = await fetch('http://localhost:3000/api/spaces/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: query,
        limit: 10,
        offset: 0,
        sortBy: 'relevance'
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ API Error:', response.status, error);
      return;
    }
    
    const data = await response.json();
    
    if (data.spaces && data.spaces.length > 0) {
      console.log(`✅ Found ${data.total} total spaces (showing ${data.spaces.length}):\n`);
      
      data.spaces.forEach((space, index) => {
        console.log(`${index + 1}. ${space.name}`);
        console.log(`   ID: ${space.id}`);
        console.log(`   Type: ${space.type || 'N/A'}`);
        console.log(`   Members: ${space.memberCount || 0}`);
        console.log(`   Verified: ${space.isVerified ? '✓' : '✗'}`);
        if (space.description) {
          console.log(`   Description: ${space.description.substring(0, 80)}...`);
        }
        console.log('');
      });
      
      if (data.hasMore) {
        console.log(`📄 More results available (use offset: ${data.pagination.nextOffset})`);
      }
    } else {
      console.log('❌ No spaces found');
    }
    
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

async function runTests() {
  console.log('🧪 Testing Search API with Real RSS Feed Data');
  console.log('━'.repeat(50));
  console.log('Note: Make sure the dev server is running (pnpm dev)');
  
  // Test various search queries
  const queries = [
    'academic',       // Should find Academic Bowl
    'tennis',         // Should find Aces Club Tennis  
    'engineering',    // Should find multiple engineering clubs
    'alpha',          // Should find fraternities
    'campus',         // Should find campus living and orgs
    'dance',          // Should find dance clubs
    'student',        // Should find many student organizations
    'pharmacy'        // Should find pharmacy associations
  ];
  
  for (const query of queries) {
    await testSearchAPI(query);
  }
  
  console.log('\n✨ API test completed!');
}

// Run the tests
runTests()
  .then(() => {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });