#!/usr/bin/env node

/**
 * Development utility to reset a magic link token for testing
 * Usage: node scripts/reset-magic-link.js <token>
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'hive-builder-development',
  });
}

const db = admin.firestore();

async function resetMagicLink(token) {
  try {
    if (!token || token === 'latest') {
      // Get the most recent token
      const snapshot = await db.collection('magicLinks')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        console.log('🔄 Resetting most recent token:', doc.id.substring(0, 8) + '...');
        await doc.ref.update({
          used: false,
          usedAt: null
        });
        console.log('✅ Token reset successfully!');
        console.log('📧 Email:', doc.data().email);
        console.log('🔗 Token:', doc.id);
      } else {
        console.log('❌ No magic link tokens found');
      }
    } else {
      // Reset specific token
      const docRef = db.collection('magicLinks').doc(token);
      const doc = await docRef.get();
      
      if (doc.exists) {
        await docRef.update({
          used: false,
          usedAt: null
        });
        console.log('✅ Token reset successfully!');
        console.log('📧 Email:', doc.data().email);
      } else {
        console.log('❌ Token not found:', token.substring(0, 8) + '...');
      }
    }
  } catch (error) {
    console.error('❌ Error resetting token:', error);
  }
  
  process.exit(0);
}

// Get token from command line or use 'latest'
const token = process.argv[2] || 'latest';
resetMagicLink(token);