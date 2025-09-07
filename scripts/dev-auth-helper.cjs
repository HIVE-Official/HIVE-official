#!/usr/bin/env node

/**
 * HIVE Development Authentication Helper
 * 
 * This script helps with testing magic link authentication in development
 * 
 * Usage:
 *   node scripts/dev-auth-helper.cjs              # Show recent magic links
 *   node scripts/dev-auth-helper.cjs reset <token> # Reset a used token
 *   node scripts/dev-auth-helper.cjs list          # List all tokens
 *   node scripts/dev-auth-helper.cjs clean         # Clean up expired tokens
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

// Helper functions
async function listRecentTokens() {
  console.log('\n📋 Recent Magic Link Tokens:\n');
  
  const snapshot = await db.collection('magicLinks')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .get();
  
  if (snapshot.empty) {
    console.log('No magic link tokens found');
    return;
  }
  
  snapshot.forEach(doc => {
    const data = doc.data();
    const createdAt = data.createdAt?.toDate() || new Date();
    const expiresAt = data.expiresAt?.toDate() || new Date();
    const isExpired = expiresAt < new Date();
    const isUsed = data.used;
    
    console.log(`Token: ${doc.id.substring(0, 16)}...`);
    console.log(`  Email: ${data.email}`);
    console.log(`  School: ${data.schoolId || 'Not specified'}`);
    console.log(`  Status: ${isUsed ? '❌ Used' : isExpired ? '⏰ Expired' : '✅ Valid'}`);
    console.log(`  Created: ${createdAt.toLocaleString()}`);
    console.log(`  Expires: ${expiresAt.toLocaleString()}`);
    
    if (!isUsed && !isExpired) {
      const magicLink = `http://localhost:3000/auth/verify?token=${doc.id}&email=${encodeURIComponent(data.email)}${data.schoolId ? `&schoolId=${data.schoolId}` : ''}`;
      console.log(`  🔗 Link: ${magicLink}`);
    }
    console.log('');
  });
}

async function resetToken(tokenId) {
  if (!tokenId) {
    console.error('❌ Please provide a token ID');
    return;
  }
  
  // If only partial token provided, try to find it
  if (tokenId.length < 64) {
    const snapshot = await db.collection('magicLinks')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();
    
    const matches = snapshot.docs.filter(doc => doc.id.startsWith(tokenId));
    
    if (matches.length === 0) {
      console.error(`❌ No token found starting with: ${tokenId}`);
      return;
    }
    
    if (matches.length > 1) {
      console.error(`❌ Multiple tokens found starting with: ${tokenId}`);
      console.log('Matches:');
      matches.forEach(doc => {
        console.log(`  - ${doc.id.substring(0, 16)}... (${doc.data().email})`);
      });
      return;
    }
    
    tokenId = matches[0].id;
  }
  
  const docRef = db.collection('magicLinks').doc(tokenId);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    console.error(`❌ Token not found: ${tokenId.substring(0, 16)}...`);
    return;
  }
  
  await docRef.update({
    used: false,
    usedAt: null,
    usedByUid: null
  });
  
  const data = doc.data();
  console.log('✅ Token reset successfully!');
  console.log(`  Email: ${data.email}`);
  console.log(`  Token: ${tokenId.substring(0, 16)}...`);
  
  const magicLink = `http://localhost:3000/auth/verify?token=${tokenId}&email=${encodeURIComponent(data.email)}${data.schoolId ? `&schoolId=${data.schoolId}` : ''}`;
  console.log(`\n🔗 Magic Link:\n${magicLink}\n`);
}

async function cleanExpiredTokens() {
  console.log('\n🧹 Cleaning expired tokens...\n');
  
  const now = new Date();
  const snapshot = await db.collection('magicLinks').get();
  
  let cleaned = 0;
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const expiresAt = data.expiresAt?.toDate();
    
    if (expiresAt && expiresAt < now) {
      await doc.ref.delete();
      console.log(`  Deleted expired token: ${doc.id.substring(0, 16)}... (${data.email})`);
      cleaned++;
    }
  }
  
  console.log(`\n✅ Cleaned ${cleaned} expired tokens`);
}

async function createTestToken(email) {
  const crypto = require('crypto');
  const magicLinkToken = crypto.randomBytes(32).toString('hex');
  
  // Auto-detect school from email
  let schoolId = null;
  const emailDomain = email.split('@')[1];
  
  if (emailDomain === 'buffalo.edu') {
    schoolId = 'ub-buffalo';
  }
  
  const tokenData = {
    email: email,
    schoolId: schoolId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt: new Date(Date.now() + 3600000), // 1 hour
    used: false,
    token: magicLinkToken
  };
  
  await db.collection('magicLinks').doc(magicLinkToken).set(tokenData);
  
  const magicLink = `http://localhost:3000/auth/verify?token=${magicLinkToken}&email=${encodeURIComponent(email)}${schoolId ? `&schoolId=${schoolId}` : ''}`;
  
  console.log('\n✅ Test token created!');
  console.log(`  Email: ${email}`);
  console.log(`  School: ${schoolId || 'Auto-detect'}`);
  console.log(`  Token: ${magicLinkToken.substring(0, 16)}...`);
  console.log(`\n🔗 Magic Link:\n${magicLink}\n`);
}

// Main command handler
async function main() {
  const command = process.argv[2];
  const arg = process.argv[3];
  
  console.log('🔥 HIVE Development Auth Helper\n');
  
  try {
    switch (command) {
      case 'reset':
        await resetToken(arg);
        break;
      
      case 'list':
        await listRecentTokens();
        break;
      
      case 'clean':
        await cleanExpiredTokens();
        break;
      
      case 'create':
        if (!arg || !arg.includes('@')) {
          console.error('❌ Please provide an email address');
          console.log('Usage: node scripts/dev-auth-helper.cjs create test@buffalo.edu');
        } else {
          await createTestToken(arg);
        }
        break;
      
      default:
        // Show recent tokens by default
        await listRecentTokens();
        console.log('📖 Other commands:');
        console.log('  reset <token>  - Reset a used token');
        console.log('  list           - List all recent tokens');
        console.log('  clean          - Clean expired tokens');
        console.log('  create <email> - Create a test token');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

main();