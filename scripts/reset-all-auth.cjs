#!/usr/bin/env node

/**
 * HIVE Development Authentication Reset Script
 * 
 * This script resets all authentication data for a clean slate:
 * - Deletes all magic link tokens
 * - Deletes all users from Firestore
 * - Deletes all Firebase Auth users
 * 
 * Usage: node scripts/reset-all-auth.cjs
 */

const admin = require('firebase-admin');
const path = require('path');

// Load environment variables
const serviceAccountPath = path.join(__dirname, '../apps/web/.env.local');
require('dotenv').config({ path: serviceAccountPath });

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();
const auth = admin.auth();

async function resetAllTokens() {
  console.log('🔄 Resetting all magic link tokens...\n');
  
  const snapshot = await db.collection('magicLinks').get();
  
  if (snapshot.empty) {
    console.log('No magic link tokens found');
    return 0;
  }
  
  let count = 0;
  const batch = db.batch();
  
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
    const data = doc.data();
    console.log(`  ❌ Deleting token: ${doc.id.substring(0, 16)}... (${data.email})`);
    count++;
  });
  
  await batch.commit();
  console.log(`\n✅ Deleted ${count} magic link tokens`);
  return count;
}

async function deleteAllUsers() {
  console.log('\n🗑️  Deleting all users from Firestore...\n');
  
  const snapshot = await db.collection('users').get();
  
  if (snapshot.empty) {
    console.log('No users found in Firestore');
    return 0;
  }
  
  let count = 0;
  const batch = db.batch();
  
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
    const data = doc.data();
    console.log(`  ❌ Deleting user: ${doc.id} (${data.email})`);
    count++;
  });
  
  await batch.commit();
  console.log(`\n✅ Deleted ${count} users from Firestore`);
  return count;
}

async function deleteAllAuthUsers() {
  console.log('\n🔥 Deleting all Firebase Auth users...\n');
  
  try {
    let count = 0;
    let nextPageToken;
    
    do {
      // List users in batches
      const listResult = await auth.listUsers(1000, nextPageToken);
      
      if (listResult.users.length === 0) {
        console.log('No Firebase Auth users found');
        return 0;
      }
      
      // Delete each user
      for (const user of listResult.users) {
        try {
          await auth.deleteUser(user.uid);
          console.log(`  ❌ Deleted auth user: ${user.uid} (${user.email})`);
          count++;
        } catch (error) {
          console.error(`  ⚠️  Failed to delete user ${user.uid}: ${error.message}`);
        }
      }
      
      nextPageToken = listResult.pageToken;
    } while (nextPageToken);
    
    console.log(`\n✅ Deleted ${count} Firebase Auth users`);
    return count;
  } catch (error) {
    console.error('Error deleting Firebase Auth users:', error.message);
    return 0;
  }
}

async function main() {
  console.log('🧹 HIVE Authentication Reset Tool\n');
  console.log('This will delete:');
  console.log('  • All magic link tokens');
  console.log('  • All users from Firestore');
  console.log('  • All Firebase Auth users');
  console.log('\nStarting cleanup...\n');
  console.log('='.repeat(50));
  
  try {
    // Reset all tokens
    const tokenCount = await resetAllTokens();
    
    // Delete all Firestore users
    const firestoreUserCount = await deleteAllUsers();
    
    // Delete all Firebase Auth users
    const authUserCount = await deleteAllAuthUsers();
    
    console.log('\n' + '='.repeat(50));
    console.log('\n🎉 CLEANUP COMPLETE!\n');
    console.log('Summary:');
    console.log(`  • ${tokenCount} magic link tokens deleted`);
    console.log(`  • ${firestoreUserCount} Firestore users deleted`);
    console.log(`  • ${authUserCount} Firebase Auth users deleted`);
    console.log('\nYour authentication system is now reset to a clean state.');
    console.log('You can now create fresh test accounts.\n');
    
  } catch (error) {
    console.error('\n❌ Error during cleanup:', error.message);
  }
  
  process.exit(0);
}

main();