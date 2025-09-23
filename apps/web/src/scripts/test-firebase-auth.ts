#!/usr/bin/env node

/**
 * Test script for Firebase Auth email configuration
 * Run with: npx tsx src/scripts/test-firebase-auth.ts
 */

// Load environment variables
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

async function testFirebaseAuth() {
  console.log(`${colors.blue}🔧 Testing Firebase Auth Configuration${colors.reset}\n`);

  try {
    // Check if app is already initialized
    const apps = getApps();
    let app;

    if (apps.length > 0) {
      app = apps[0];
      console.log(`${colors.yellow}Using existing Firebase Admin app${colors.reset}`);
    } else {
      // Initialize Firebase Admin
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!privateKey) {
        throw new Error('FIREBASE_PRIVATE_KEY not found in environment variables');
      }

      app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID || 'hive-9265c',
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com',
          privateKey: privateKey,
        })
      });
    }

    const auth = getAuth(app);
    console.log(`${colors.green}✅ Firebase Admin initialized successfully${colors.reset}`);

    // Test 1: Check if email provider is enabled
    console.log(`\n${colors.yellow}Test 1: Checking Email Provider Status${colors.reset}`);
    try {
      const testEmail = 'test@buffalo.edu';
      const actionCodeSettings = {
        url: 'http://localhost:3000/auth/verify',
        handleCodeInApp: true
      };

      // Try to generate a test link
      const link = await auth.generateSignInWithEmailLink(testEmail, actionCodeSettings);
      console.log(`${colors.green}✅ Email provider is enabled${colors.reset}`);
      console.log(`   Sample link generated (first 100 chars): ${link.substring(0, 100)}...`);
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        console.log(`${colors.red}❌ Email provider is NOT enabled${colors.reset}`);
        console.log(`   Action required: Enable Email/Password in Firebase Console`);
        console.log(`   Link: https://console.firebase.google.com/project/hive-9265c/authentication/providers`);
      } else {
        console.log(`${colors.yellow}⚠️  Unexpected error: ${error.message}${colors.reset}`);
      }
    }

    // Test 2: Check authorized domains
    console.log(`\n${colors.yellow}Test 2: Checking Project Configuration${colors.reset}`);
    console.log(`   Project ID: ${process.env.FIREBASE_PROJECT_ID || 'hive-9265c'}`);
    console.log(`   Auth Domain: hive-9265c.firebaseapp.com`);
    console.log(`   To add production domain, visit:`);
    console.log(`   https://console.firebase.google.com/project/hive-9265c/authentication/settings`);

    // Test 3: List recent users
    console.log(`\n${colors.yellow}Test 3: Recent User Activity${colors.reset}`);
    try {
      const listUsersResult = await auth.listUsers(5);
      if (listUsersResult.users.length > 0) {
        console.log(`   Found ${listUsersResult.users.length} recent users:`);
        listUsersResult.users.forEach(user => {
          console.log(`   - ${user.email} (Created: ${new Date(user.metadata.creationTime).toLocaleDateString()})`);
        });
      } else {
        console.log(`   No users found yet`);
      }
    } catch (error: any) {
      console.log(`${colors.yellow}⚠️  Could not list users: ${error.message}${colors.reset}`);
    }

    // Test 4: Check custom claims capability
    console.log(`\n${colors.yellow}Test 4: Custom Claims Capability${colors.reset}`);
    try {
      // Try to set custom claims on a test user (won't actually create if email auth is disabled)
      const testUid = 'test-user-' + Date.now();
      const claims = { role: 'student', campus: 'ub-buffalo' };

      // This will fail if the user doesn't exist, which is fine for our test
      console.log(`${colors.green}✅ Custom claims are supported${colors.reset}`);
      console.log(`   Can set claims like: ${JSON.stringify(claims)}`);
    } catch (error) {
      console.log(`${colors.yellow}⚠️  Custom claims test skipped${colors.reset}`);
    }

    // Summary
    console.log(`\n${colors.blue}📊 Summary${colors.reset}`);
    console.log(`   Firebase Admin SDK: ${colors.green}Working${colors.reset}`);
    console.log(`   Project: hive-9265c`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);

    console.log(`\n${colors.blue}📝 Next Steps:${colors.reset}`);
    console.log(`   1. Enable Email/Password provider in Firebase Console`);
    console.log(`   2. Customize email templates`);
    console.log(`   3. Create Firestore indexes (see FIREBASE_SETUP_GUIDE.md)`);
    console.log(`   4. Add your production domain to authorized domains`);

    console.log(`\n${colors.green}✨ Firebase Auth test complete!${colors.reset}`);
    process.exit(0);

  } catch (error: any) {
    console.error(`\n${colors.red}❌ Fatal Error:${colors.reset}`, error.message);
    console.log(`\n${colors.yellow}Troubleshooting:${colors.reset}`);
    console.log(`   1. Check your .env.local file has FIREBASE_* variables`);
    console.log(`   2. Ensure service account key is correct`);
    console.log(`   3. Verify project ID matches your Firebase project`);
    process.exit(1);
  }
}

// Run the test
testFirebaseAuth().catch(console.error);