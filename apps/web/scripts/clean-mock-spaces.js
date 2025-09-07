/**
 * Clean up mock spaces we added, keeping only real RSS feed data
 * Run with: node apps/web/scripts/clean-mock-spaces.js
 */

require('dotenv').config({ path: './apps/web/.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin
function initializeFirebase() {
  try {
    if (admin.apps?.length > 0) {
      return admin.app();
    }

    let credential;
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      credential = admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString()
      );
      credential = admin.credential.cert(serviceAccount);
    }

    const app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

// Mock space IDs we added earlier
const MOCK_SPACE_IDS = [
  'ub-cs-club',
  'ub-acm',
  'pre-med-society',
  'ub-dance-team',
  'ub-robotics',
  'rocket-league-esports',
  'chess-club',
  'ub-film-society',
  'startup-incubator',
  'ub-volleyball-club',
  'music-production-collective'
];

async function cleanMockSpaces() {
  try {
    console.log('🧹 Cleaning up mock spaces...\n');
    
    const app = initializeFirebase();
    const db = admin.firestore();
    
    console.log('📁 Removing from spaces_flat collection...\n');
    
    for (const spaceId of MOCK_SPACE_IDS) {
      try {
        await db.collection('spaces_flat').doc(spaceId).delete();
        console.log(`  ✅ Removed: ${spaceId}`);
      } catch (error) {
        console.log(`  ⏭️  Skipped ${spaceId} (may not exist)`);
      }
    }
    
    console.log(`\n✨ Cleanup complete! Kept all real RSS feed spaces.`);
    
  } catch (error) {
    console.error('❌ Error cleaning spaces:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanMockSpaces()
  .then(() => {
    console.log('\n🎉 Cleanup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to clean:', error);
    process.exit(1);
  });