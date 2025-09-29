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

  try {
    // Check if app is already initialized
    const apps = getApps();
    let app;

    if (apps.length > 0) {
      app = apps[0];
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

    // Test 1: Check if email provider is enabled
    try {
      const testEmail = 'test@buffalo.edu';
      const actionCodeSettings = {
        url: 'http://localhost:3000/auth/verify',
        handleCodeInApp: true
      };

      // Try to generate a test link
      const link = await auth.generateSignInWithEmailLink(testEmail, actionCodeSettings);
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
      } else {
      }
    }

    // Test 2: Check authorized domains

    // Test 3: List recent users
    try {
      const listUsersResult = await auth.listUsers(5);
      if (listUsersResult.users.length > 0) {
        listUsersResult.users.forEach(user => {
        });
      } else {
      }
    } catch (error: any) {
    }

    // Test 4: Check custom claims capability
    try {
      // Try to set custom claims on a test user (won't actually create if email auth is disabled)
      const testUid = 'test-user-' + Date.now();
      const claims = { role: 'student', campus: 'ub-buffalo' };

      // This will fail if the user doesn't exist, which is fine for our test
    } catch (error) {
    }

    // Summary


    process.exit(0);

  } catch (error: any) {
    process.exit(1);
  }
}

// Run the test
testFirebaseAuth().catch(console.error);