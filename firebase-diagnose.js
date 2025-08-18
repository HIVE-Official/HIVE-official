#!/usr/bin/env node

// Firebase project diagnostic and fix script
const admin = require('firebase-admin');

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQw5AuSdfnzLxY
tH4qIzCcGXwYAmzq+FWG8++sPmDdHnHM/0eVQWzhELBI0gNeBTjLUFYxM59VBvQ8
WfKK6d+kzZSfq5XSl5c2L75uufPw507NTMi29ShlZeviSgkGpg6KSTptbvdzskVm
tW6G+qOGqUU5hrtaUmYhK5e4baWNrRbw5Prq9rPDx+Y7137wYu7Tbwh8etIwHgNe
e2C8dYVF+TqgB3iwIWC5AqLye7RkgHq0HCll8JMfqrOOXqAal8KNTu8Tkzo0HMLn
ZkbSBssh7KgIOhQISHl52kV+9sFWDopIrn02N47bEE34IMIGnuqs607TreNKIAzM
7iAcxp5vAgMBAAECggEAOVgGXpeou20p9Ld2vKlY4ZTkx7v6Oi+p7X3mpGPHSf/7
01kSGYkjoJnUQtxSMiW+ZCdMJUxOIsfQ6rE0txtCmI1JAODexd9/qhrKhCEMBRMT
b5apcXP2jwgLIwXxwlz4KIYua1gIFJ/7Bt76y+Qv77FQtyNsRrCaPSx/+rIQYOil
swmk3QUCkHXAcg86mG5vh86eqi3z04aUajil3xqyUy5dB+JfPY86IrWWB1s7VtXR
hPT3awaTt8WSLbXxCotwJfEFdlcX+YPp2C1BOwi2E7pqL6HIHeRiOAzd7AJY3Huw
0Y3lP/Ysv6fVjekhV8bjrLn4OkZBqOPso6uUY6n+eQKBgQDG+dOHBWaK3P6FsZ3l
S73y5NNtH5wfwLmyHS1rYkQ01RrD/sgOK7xbsAP07fjaPdQaBqhTbCP0F/fhzCRH
BJKyOND6OEiJXGubWqQ8Ysu3xe0JAPtJ6WtnYx6ZgfRCDFN8gsLb2e7onQkCOfFy
BNZVQlDr011OH6ZXr80V31wj6QKBgQC6QGRmkBfNxSbwxA3M55ipuiy5P7ljKWN6
06DcLKIuOBJqKbeIiP7B/WpqTUERDB7lfVIHNmalEk5mJC/v5HpGuapkRiV/FQoL
TT3NySFgXFLy2jg6u6aSbp/iKCE9lwHHoiWlMqffEZpvzXuIG54O2GVBYJWSY3jR
1p1nMsvwlwKBgD2GuMLSh6++wDFFB+cEMbsuyLXAhX1IEeOipA3FeAPCNaGPYfsH
yRms5rxQ7ZdGcRSPJHOPR9rNooe+oSUYo+faK7yDtOJMorWKJKjLf+TWngIfvJRR
SjXQ74BWL9pQh2xD3s8up3JkRIncsu0n08LPW8hgNkTXAo+wu8DcrVgpAoGBALlL
8Nc9CgGU4F3un1A5JV/OskoHBPiLp8X+H+6MlTloXaGzKT40FUiIR0PE4jQEnARy
/pXgYJRftxHVdL+0zpXoh4XFZ+6bzudZjGBcdtE4aOnlgsWkBV9voa9Nf2yX/JRR
VCSbVfoOuFf81aae20wnq+00GvqN7hjN7MFL/yu3AoGBAJC8vRRuLKf9amXmF0XZ
hX6qqWfaknNsOjcSMwEYQ/DKUYFpLqE/iOyd/ijNg1zKwx2PCrXMYlax7clxBpxB
XNxjOwgLawc5Xve5JCAPqZYZ5fhsQXia+q7RXMErHH7pHZJzsS6skazweWkQ337M
hWucTx4sSgJ1JIUi6q/e69jV
-----END PRIVATE KEY-----`;

async function diagnoseFirebase() {
  console.log('🔥 FIREBASE PROJECT DIAGNOSIS & REPAIR SCRIPT');
  console.log('===========================================');
  
  try {
    // Initialize Firebase Admin
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: 'hive-9265c',
          clientEmail: 'firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com',
          privateKey: privateKey
        }),
        databaseURL: 'https://hive-9265c-default-rtdb.firebaseio.com'
      });
    }
    
    console.log('✅ Firebase Admin SDK initialized successfully');
    
    // Test Firestore access
    console.log('\n📊 Testing Firestore access...');
    const db = admin.firestore();
    const testDoc = await db.collection('test').doc('admin-test').set({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      test: 'Firebase Admin access confirmed'
    });
    console.log('✅ Firestore write access: WORKING');
    
    // Test reading data
    const usersSnapshot = await db.collection('users').limit(5).get();
    console.log(`✅ Firestore read access: WORKING (${usersSnapshot.size} users found)`);
    
    // Test Real-time Database
    console.log('\n🔄 Testing Real-time Database...');
    try {
      const rtdb = admin.database();
      await rtdb.ref('test/admin-connection').set({
        timestamp: admin.database.ServerValue.TIMESTAMP,
        status: 'admin-test-successful'
      });
      console.log('✅ Real-time Database write: WORKING');
      
      const snapshot = await rtdb.ref('test/admin-connection').once('value');
      if (snapshot.exists()) {
        console.log('✅ Real-time Database read: WORKING');
      }
    } catch (rtdbError) {
      console.log('❌ Real-time Database error:', rtdbError.message);
      console.log('💡 SOLUTION: Real-time Database needs to be enabled in Firebase Console');
      console.log('   1. Go to https://console.firebase.google.com/project/hive-9265c');
      console.log('   2. Navigate to Realtime Database');
      console.log('   3. Click "Create Database" if not exists');
      console.log('   4. Choose your security rules');
    }
    
    // Check Firestore Security Rules
    console.log('\n🔒 Checking security configuration...');
    console.log('Firebase project: hive-9265c');
    console.log('Admin access: ✅ WORKING');
    console.log('Service account: firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com');
    
    // Suggest Firestore rules for client access
    console.log('\n📋 RECOMMENDED FIRESTORE SECURITY RULES:');
    console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read spaces they're members of
    match /spaces/{spaceType}/spaces/{spaceId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        resource.data.members[request.auth.uid] != null;
    }
    
    // Feature flags - read only for authenticated users
    match /featureFlags/{flagId} {
      allow read: if request.auth != null;
      allow write: if false; // Admin only via server
    }
    
    // Public read for school data
    match /schools/{schoolId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
    `);
    
    console.log('\n🎯 NEXT STEPS TO FIX ALL ISSUES:');
    console.log('1. Enable Real-time Database in Firebase Console');
    console.log('2. Update Firestore security rules (shown above)');
    console.log('3. Configure Authentication providers');
    console.log('4. Test client-side access');
    
  } catch (error) {
    console.error('❌ Firebase diagnosis failed:', error.message);
  }
}

diagnoseFirebase();