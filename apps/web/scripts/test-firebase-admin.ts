import { dbAdmin, authAdmin, environmentInfo } from '../src/lib/firebase/admin/firebase-admin';

async function testFirebaseAdmin() {
  console.log('🔍 Testing Firebase Admin Configuration...\n');
  console.log('Environment Info:', environmentInfo);
  console.log('\n' + '='.repeat(50) + '\n');

  try {
    // Test 1: Check if we can read from Firestore
    console.log('📖 Test 1: Reading from Firestore...');
    const testCollection = dbAdmin.collection('_test');
    const testDoc = await testCollection.doc('connection-test').get();
    console.log('✅ Firestore read successful. Document exists:', testDoc.exists);
    
    // Test 2: Try to write to Firestore
    console.log('\n📝 Test 2: Writing to Firestore...');
    const timestamp = new Date().toISOString();
    await testCollection.doc('connection-test').set({
      tested_at: timestamp,
      environment: environmentInfo.environment,
      message: 'Firebase Admin is working correctly'
    });
    console.log('✅ Firestore write successful');
    
    // Test 3: Read back what we wrote
    console.log('\n🔄 Test 3: Verifying write...');
    const verifyDoc = await testCollection.doc('connection-test').get();
    const data = verifyDoc.data();
    console.log('✅ Data verified:', data);
    
    // Test 4: Check collections
    console.log('\n📚 Test 4: Listing collections...');
    const collections = await dbAdmin.listCollections();
    console.log(`Found ${collections.length} collections:`);
    collections.forEach(col => {
      console.log(`  - ${col.id}`);
    });
    
    // Test 5: Check users collection specifically
    console.log('\n👤 Test 5: Checking users collection...');
    const usersSnapshot = await dbAdmin.collection('users').limit(5).get();
    console.log(`Found ${usersSnapshot.size} users (limited to 5)`);
    
    if (usersSnapshot.size > 0) {
      console.log('Sample user data:');
      usersSnapshot.forEach(doc => {
        const userData = doc.data();
        console.log(`  - ${doc.id}: ${userData.displayName || userData.email || 'No name'}`);
      });
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ All Firebase Admin tests passed!');
    console.log('🚀 Your Firebase Admin is properly configured and working.');
    
  } catch (error) {
    console.error('\n❌ Firebase Admin test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if your service account has the correct permissions');
    console.log('2. Verify the project ID matches: hive-9265c');
    console.log('3. Make sure the private key is correctly formatted');
    console.log('4. Check Firebase Console for any security rules blocking admin access');
    process.exit(1);
  }
}

testFirebaseAdmin().catch(console.error);