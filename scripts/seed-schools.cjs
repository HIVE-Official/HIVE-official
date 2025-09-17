#!/usr/bin/env node

/**
 * Seed Schools Data for HIVE Development
 * 
 * Adds the University at Buffalo school data to Firestore
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '../apps/web/.env.local');
require('dotenv').config({ path: serviceAccountPath });

// Initialize Firebase Admin using individual env vars (development pattern)
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

  console.log('🔥 Firebase Admin initialized for school seeding');
}

const db = admin.firestore();

async function seedSchools() {
  try {
    console.log('🌱 Starting school data seeding...');

    // University at Buffalo data
    const ubData = {
      id: 'ub-buffalo',
      name: 'University at Buffalo',
      domain: 'buffalo.edu',
      active: true,
      type: 'university',
      state: 'NY',
      country: 'US',
      campusId: 'ub-buffalo',
      settings: {
        enableMagicLink: true,
        enableOnboarding: true,
        requireEmailVerification: true
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add UB school
    await db.collection('schools').doc('ub-buffalo').set(ubData);
    console.log('✅ Added University at Buffalo school data');

    // Verify the data was added
    const doc = await db.collection('schools').doc('ub-buffalo').get();
    if (doc.exists) {
      console.log('✅ School data verified:', {
        id: doc.data().id,
        name: doc.data().name,
        domain: doc.data().domain,
        active: doc.data().active
      });
    }

    console.log('🎉 School seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ School seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding
seedSchools();