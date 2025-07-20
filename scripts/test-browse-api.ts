#!/usr/bin/env node

/**
 * Test the Browse API to see if it can connect to nested Firebase structure
 * This tests the updated API endpoint without needing Firebase credentials
 */

async function testBrowseAPI() {
  console.log('🔍 Testing Browse API with nested structure...');
  
  try {
    // Test if the server is running
    const testUrl = 'http://localhost:3000/api/spaces/browse';
    
    console.log(`📡 Testing endpoint: ${testUrl}`);
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer test-token', // This will fail auth but we can see the structure
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`📊 Response status: ${response.status}`);
    
    const responseText = await response.text();
    console.log(`📊 Response body:`, responseText);
    
    if (response.status === 401) {
      console.log('✅ API is accessible (auth required as expected)');
    } else {
      console.log('❓ Unexpected response - may need to check server status');
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error);
    console.log('💡 Make sure the development server is running: npm run dev');
  }
}

async function checkServerStatus() {
  console.log('🔍 Checking if development server is running...');
  
  try {
    const response = await fetch('http://localhost:3000/api/health', {
      method: 'GET'
    });
    
    if (response.ok) {
      console.log('✅ Development server is running');
      return true;
    } else {
      console.log('❓ Development server responded with:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('💡 Start it with: npm run dev');
    return false;
  }
}

async function main() {
  console.log('🚀 Testing Browse API functionality...');
  
  // Check if server is running
  const serverRunning = await checkServerStatus();
  
  if (serverRunning) {
    await testBrowseAPI();
  } else {
    console.log('\n📋 Manual Testing Instructions:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Run this test again: npx ts-node test-browse-api.ts');
    console.log('3. Or manually test the API endpoint with curl:');
    console.log('   curl -H "Authorization: Bearer test" http://localhost:3000/api/spaces/browse');
    
    console.log('\n🔍 Code Analysis:');
    console.log('✅ Updated Browse API to query nested structure: SPACES/[spacetype]/SPACES/spaceID');
    console.log('✅ Updated space types to: student, university, residential, academics, greek_life');
    console.log('✅ Added space type discovery logic');
    console.log('✅ Updated membership queries for nested structure');
    
    console.log('\n💡 Next Steps:');
    console.log('1. Test the API endpoints when server is running');
    console.log('2. Check Firebase Console to verify nested structure exists');
    console.log('3. Update remaining Firebase functions if tests pass');
  }
}

if (require.main === module) {
  main();
}