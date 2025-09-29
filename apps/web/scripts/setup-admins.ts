#!/usr/bin/env tsx
/**
 * Admin Setup Script
 * Sets up admin roles for specified users in Firebase
 *
 * Usage: pnpm tsx apps/web/scripts/setup-admins.ts
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });

// Admin users configuration
const ADMIN_USERS = [
  {
    email: 'jwrhineh@buffalo.edu',
    name: 'Jacob Rhinehart',
    role: 'super_admin',
    permissions: ['all']
  },
  {
    email: 'noahowsh@gmail.com',
    name: 'Noah',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'moderate', 'manage_users', 'manage_spaces', 'feature_flags']
  }
];

// Initialize Firebase Admin if not already initialized
function initFirebaseAdmin() {
  if (getApps().length > 0) {
    console.log('✓ Firebase Admin already initialized');
    return;
  }

  // Check for service account key
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS ||
                            path.resolve(process.cwd(), 'firebase-service-account.json');

  try {
    const serviceAccount = require(serviceAccountPath);
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id
    });
    console.log('✓ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin');
    console.error('   Please ensure firebase-service-account.json exists or GOOGLE_APPLICATION_CREDENTIALS is set');
    process.exit(1);
  }
}

async function setupAdminUsers() {
  console.log('\n🔧 Setting up admin users...\n');

  const auth = getAuth();
  const db = getFirestore();

  for (const adminConfig of ADMIN_USERS) {
    try {
      console.log(`\nProcessing ${adminConfig.email}...`);

      // Get user by email
      let user;
      try {
        user = await auth.getUserByEmail(adminConfig.email);
        console.log(`  ✓ Found existing user: ${user.uid}`);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          console.log(`  ⚠️  User not found, they need to sign up first`);
          console.log(`      User will be granted admin on first login`);

          // Store pending admin grant in Firestore
          await db.collection('pendingAdminGrants').doc(adminConfig.email).set({
            email: adminConfig.email,
            name: adminConfig.name,
            role: adminConfig.role,
            permissions: adminConfig.permissions,
            grantedAt: new Date().toISOString(),
            grantedBy: 'setup-script',
            status: 'pending'
          });

          console.log(`  ✓ Added to pending admin grants`);
          continue;
        }
        throw error;
      }

      // Set custom claims for existing user
      const customClaims = {
        role: adminConfig.role,
        permissions: adminConfig.permissions,
        isAdmin: true,
        adminSince: new Date().toISOString()
      };

      await auth.setCustomUserClaims(user.uid, customClaims);
      console.log(`  ✓ Set admin claims for ${user.uid}`);

      // Update user document in Firestore
      await db.collection('users').doc(user.uid).set({
        isAdmin: true,
        adminRole: adminConfig.role,
        adminPermissions: adminConfig.permissions,
        adminGrantedAt: new Date().toISOString(),
        adminGrantedBy: 'setup-script'
      }, { merge: true });

      console.log(`  ✓ Updated user document in Firestore`);

      // Add to admins collection for easy lookup
      await db.collection('admins').doc(user.uid).set({
        uid: user.uid,
        email: adminConfig.email,
        name: adminConfig.name,
        role: adminConfig.role,
        permissions: adminConfig.permissions,
        active: true,
        createdAt: new Date().toISOString()
      });

      console.log(`  ✓ Added to admins collection`);

    } catch (error) {
      console.error(`❌ Error processing ${adminConfig.email}:`, error);
    }
  }

  console.log('\n✅ Admin setup complete!\n');
  console.log('📝 Summary:');
  console.log('  - Users with accounts: Admin rights granted immediately');
  console.log('  - Users without accounts: Will receive admin on first sign-in');
  console.log('  - Both users can now access /admin dashboard\n');
}

async function main() {
  try {
    initFirebaseAdmin();
    await setupAdminUsers();

    console.log('🎉 Admin configuration successful!\n');
    console.log('Next steps:');
    console.log('1. Have users sign in at https://hive.college/auth/login');
    console.log('2. Navigate to https://hive.college/admin');
    console.log('3. Full admin access will be available\n');

    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the setup
main().catch(console.error);