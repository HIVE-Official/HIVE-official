#!/usr/bin/env npx tsx
/**
 * Test Firebase Authentication Email Configuration
 * Run with: npm run test:firebase-auth
 */

import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env.local') });

async function testFirebaseAuth() {
  console.log('\n🔍 Testing Firebase Authentication Configuration...\n');

  try {
    // Initialize Firebase Admin
    const app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });

    const auth = getAuth(app);

    // Test 1: Check if Firebase Auth is accessible
    console.log('✅ Firebase Admin SDK initialized successfully');

    // Test 2: Generate a test magic link
    const testEmail = 'test@buffalo.edu';
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify?schoolId=ub`,
      handleCodeInApp: true,
    };

    console.log('\n📧 Attempting to generate magic link for:', testEmail);
    console.log('   Continue URL:', actionCodeSettings.url);

    try {
      const link = await auth.generateSignInWithEmailLink(testEmail, actionCodeSettings);
      console.log('✅ Magic link generated successfully!');
      console.log('\n📎 Magic Link (for testing only):');
      console.log(link);

      // Parse the link to show details
      const url = new URL(link);
      console.log('\n📊 Link Analysis:');
      console.log('   - Mode:', url.searchParams.get('mode'));
      console.log('   - API Key:', url.searchParams.get('apiKey')?.substring(0, 10) + '...');
      console.log('   - Continue URL:', url.searchParams.get('continueUrl'));

    } catch (error: any) {
      console.error('❌ Failed to generate magic link:', error.message);

      if (error.message?.includes('CONFIGURATION_NOT_FOUND')) {
        console.log('\n⚠️  Email/Password provider not enabled in Firebase Console');
        console.log('   Go to: https://console.firebase.google.com');
        console.log('   Navigate to: Authentication → Sign-in method');
        console.log('   Enable: Email/Password AND Email link (passwordless)');
      } else if (error.message?.includes('DYNAMIC_LINK_NOT_ACTIVATED')) {
        console.log('\n⚠️  Firebase Dynamic Links not configured');
        console.log('   This is OK for development - the app will use fallback links');
      }
    }

    // Test 3: Check email configuration
    console.log('\n🔧 Checking email provider configuration...');
    try {
      // This would check if email templates are configured
      // But Firebase Admin SDK doesn't expose this directly
      console.log('ℹ️  Email templates must be configured in Firebase Console:');
      console.log('   Authentication → Templates → Email address verification');
    } catch (error) {
      console.error('Could not check email templates');
    }

    // Test 4: List authorized domains (if possible)
    console.log('\n🌐 Authorized domains should include:');
    console.log('   - localhost (for development)');
    console.log('   - hive.college (for production)');
    console.log('   - *.vercel.app (for preview deployments)');
    console.log('\n   Check in: Authentication → Settings → Authorized domains');

    console.log('\n✨ Firebase Auth configuration test complete!\n');

  } catch (error: any) {
    console.error('\n❌ Firebase Auth test failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check your .env.local has Firebase Admin credentials');
    console.log('2. Enable Email/Password in Firebase Console');
    console.log('3. Enable "Email link (passwordless sign-in)" option');
    console.log('4. Add authorized domains in Firebase Console\n');
    process.exit(1);
  }
}

// Run the test
testFirebaseAuth().catch(console.error);