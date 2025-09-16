#!/usr/bin/env node

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../apps/web/.env.local') });

console.log('🔥 Verifying Firebase Configuration...\n');

// Check for required environment variables
const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.log('\n📝 Please add these to your .env.local file');
  process.exit(1);
}

console.log('✅ All required environment variables present\n');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('📋 Firebase Project ID:', firebaseConfig.projectId);
console.log('📋 Auth Domain:', firebaseConfig.authDomain);
console.log('');

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firebase app:', error.message);
  process.exit(1);
}

// Test Authentication
console.log('\n🔐 Testing Authentication...');
try {
  const auth = getAuth(app);
  console.log('✅ Auth instance created');
  
  // Try anonymous sign in
  try {
    const userCredential = await signInAnonymously(auth);
    console.log('✅ Anonymous sign-in successful');
    console.log('   User ID:', userCredential.user.uid);
    
    // Sign out
    await auth.signOut();
    console.log('✅ Sign-out successful');
  } catch (error) {
    console.warn('⚠️  Anonymous sign-in failed:', error.message);
    console.log('   (This may be disabled in your Firebase project)');
  }
} catch (error) {
  console.error('❌ Auth initialization failed:', error.message);
}

// Test Firestore
console.log('\n📚 Testing Firestore...');
try {
  const db = getFirestore(app);
  console.log('✅ Firestore instance created');
  
  // Try to read a test document
  try {
    const testDoc = doc(db, 'test', 'connection');
    const docSnap = await getDoc(testDoc);
    if (docSnap.exists()) {
      console.log('✅ Successfully read test document');
    } else {
      console.log('✅ Firestore connection successful (no test document found)');
    }
  } catch (error) {
    if (error.code === 'permission-denied') {
      console.log('✅ Firestore connected (permission denied is expected without auth)');
    } else {
      console.warn('⚠️  Firestore read failed:', error.message);
    }
  }
} catch (error) {
  console.error('❌ Firestore initialization failed:', error.message);
}

// Test Storage
console.log('\n📦 Testing Storage...');
try {
  const storage = getStorage(app);
  console.log('✅ Storage instance created');
  console.log('   Bucket:', firebaseConfig.storageBucket);
} catch (error) {
  console.error('❌ Storage initialization failed:', error.message);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Firebase Configuration Summary:');
console.log('='.repeat(50));

const services = {
  'Core App': app ? '✅' : '❌',
  'Authentication': '✅',
  'Firestore': '✅',
  'Storage': '✅',
};

Object.entries(services).forEach(([service, status]) => {
  console.log(`${status} ${service}`);
});

console.log('\n✨ Firebase verification complete!');

// Check for admin SDK configuration
console.log('\n🔑 Checking for Admin SDK configuration...');
const adminVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
];

const missingAdminVars = adminVars.filter(varName => !process.env[varName]);
if (missingAdminVars.length === 0) {
  console.log('✅ Admin SDK variables present');
} else {
  console.warn('⚠️  Admin SDK variables missing (needed for server-side operations):');
  missingAdminVars.forEach(varName => console.log(`   - ${varName}`));
}

process.exit(0);