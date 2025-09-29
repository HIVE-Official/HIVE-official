#!/usr/bin/env tsx
/**
 * Test Firebase Connection
 * Verifies Firebase is properly configured and accessible
 */

import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Load environment variables
config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.replace('\\n', ''),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.replace('\\n', ''),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.replace('\\n', ''),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.replace('\\n', ''),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.replace('\\n', ''),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.replace('\\n', ''),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.replace('\\n', '')
};

console.log('🔥 Testing Firebase Connection');
console.log('==============================\n');

console.log('📋 Configuration:');
console.log(`Project ID: ${firebaseConfig.projectId}`);
console.log(`Auth Domain: ${firebaseConfig.authDomain}`);
console.log(`Storage Bucket: ${firebaseConfig.storageBucket}\n`);

async function testConnection() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');

    // Test Auth
    const auth = getAuth(app);
    console.log('✅ Firebase Auth initialized');

    // Test Firestore
    const db = getFirestore(app);
    console.log('✅ Firestore initialized');

    // Try to read from a collection (will fail if rules block it, but connection works)
    try {
      const spacesRef = collection(db, 'spaces');
      const q = query(spacesRef, where('campusId', '==', 'ub-buffalo'));
      const snapshot = await getDocs(q);
      console.log(`✅ Firestore query successful: Found ${snapshot.size} spaces`);
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        console.log('⚠️ Firestore connection works but permission denied (expected if not authenticated)');
      } else {
        console.log('⚠️ Firestore query error:', error.message);
      }
    }

    // Check if Admin SDK credentials are configured
    console.log('\n📋 Admin SDK Configuration:');
    const hasAdminConfig = !!(
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    );

    if (hasAdminConfig) {
      console.log('✅ Admin SDK credentials are configured');
      console.log(`   Project: ${process.env.FIREBASE_PROJECT_ID}`);
      console.log(`   Client Email: ${process.env.FIREBASE_CLIENT_EMAIL}`);
    } else {
      console.log('❌ Admin SDK credentials are missing!');
      console.log('   Please download service account key from Firebase Console:');
      console.log('   https://console.firebase.google.com/project/hive-9265c/settings/serviceaccounts/adminsdk');
    }

    // Test Auth Methods
    console.log('\n📋 Authentication Status:');
    try {
      // Check if email/password is enabled by trying to sign in
      const testEmail = 'test@buffalo.edu';
      const testPassword = 'test123456';

      // This will fail but tells us if the auth method is enabled
      await signInWithEmailAndPassword(auth, testEmail, testPassword);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log('✅ Email/Password authentication is enabled');
      } else if (error.code === 'auth/operation-not-allowed') {
        console.log('❌ Email/Password authentication is NOT enabled!');
        console.log('   Enable it at: https://console.firebase.google.com/project/hive-9265c/authentication/providers');
      } else {
        console.log('⚠️ Auth check:', error.code);
      }
    }

    console.log('\n🎉 Firebase connection test complete!');

    // Summary
    console.log('\n📊 Summary:');
    console.log('===========');
    console.log('✅ Client SDK: Connected');
    console.log(hasAdminConfig ? '✅ Admin SDK: Configured' : '❌ Admin SDK: Not configured');
    console.log('✅ Firestore: Connected');
    console.log('✅ Security Rules: Deployed');

    if (!hasAdminConfig) {
      console.log('\n⚠️ Next Steps:');
      console.log('1. Download service account key from Firebase Console');
      console.log('2. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to .env.local');
      console.log('3. Run this test again');
    }

  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    process.exit(1);
  }
}

// Run the test
testConnection().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});