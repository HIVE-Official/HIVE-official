#!/usr/bin/env npx tsx

/**
 * Campus Isolation Security Test Script
 * Run this to verify campus isolation is properly enforced
 *
 * Usage: npx tsx scripts/test-campus-isolation.ts
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), 'apps/web/.env.local') });

// Test results tracking
interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
}

const results: TestResult[] = [];

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')!
  })
});

const db = getFirestore(app);

// Test helper functions
function logTest(test: string, status: TestResult['status'], message: string) {
  const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${emoji} ${test}: ${message}`);
  results.push({ test, status, message });
}

async function testSpacesCampusIsolation() {
  console.log('\n🔍 Testing Spaces Campus Isolation...\n');

  try {
    // Test 1: Check if spaces without campusId exist
    const spacesWithoutCampus = await db.collection('spaces')
      .where('campusId', '==', null)
      .limit(5)
      .get();

    if (!spacesWithoutCampus.empty) {
      logTest(
        'Spaces Campus Field',
        'FAIL',
        `Found ${spacesWithoutCampus.size} spaces without campusId!`
      );
      spacesWithoutCampus.docs.forEach(doc => {
        console.log(`  - Space ${doc.id}: ${doc.data().name}`);
      });
    } else {
      logTest('Spaces Campus Field', 'PASS', 'All spaces have campusId');
    }

    // Test 2: Check for non-UB campus IDs
    const nonUBSpaces = await db.collection('spaces')
      .where('campusId', '!=', 'ub-buffalo')
      .limit(5)
      .get();

    if (!nonUBSpaces.empty) {
      logTest(
        'UB Campus Isolation',
        'WARN',
        `Found ${nonUBSpaces.size} spaces from other campuses`
      );
      nonUBSpaces.docs.forEach(doc => {
        console.log(`  - Space ${doc.id}: campus=${doc.data().campusId}`);
      });
    } else {
      logTest('UB Campus Isolation', 'PASS', 'All spaces are UB-only');
    }

    // Test 3: Check space creation includes campus
    const recentSpaces = await db.collection('spaces')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    let missingCampusCount = 0;
    recentSpaces.docs.forEach(doc => {
      if (!doc.data().campusId) {
        missingCampusCount++;
      }
    });

    if (missingCampusCount > 0) {
      logTest(
        'Recent Spaces Campus',
        'FAIL',
        `${missingCampusCount}/10 recent spaces missing campusId`
      );
    } else {
      logTest('Recent Spaces Campus', 'PASS', 'All recent spaces have campus ID');
    }

  } catch (error) {
    logTest('Spaces Campus Test', 'FAIL', `Error: ${error}`);
  }
}

async function testUsersCampusIsolation() {
  console.log('\n🔍 Testing Users Campus Isolation...\n');

  try {
    // Test 1: Check users have schoolId
    const usersWithoutSchool = await db.collection('users')
      .where('schoolId', '==', null)
      .limit(5)
      .get();

    if (!usersWithoutSchool.empty) {
      logTest(
        'Users School Field',
        'WARN',
        `Found ${usersWithoutSchool.size} users without schoolId`
      );
    } else {
      logTest('Users School Field', 'PASS', 'All users have schoolId');
    }

    // Test 2: Check for non-UB users
    const nonUBUsers = await db.collection('users')
      .where('schoolId', '!=', 'ub-buffalo')
      .where('schoolId', '!=', 'ub') // Legacy format
      .limit(5)
      .get();

    if (!nonUBUsers.empty) {
      logTest(
        'UB User Isolation',
        'WARN',
        `Found ${nonUBUsers.size} users from other schools`
      );
    } else {
      logTest('UB User Isolation', 'PASS', 'All users are UB students');
    }

    // Test 3: Verify email domains
    const allUsers = await db.collection('users')
      .limit(20)
      .get();

    let nonEduEmails = 0;
    allUsers.docs.forEach(doc => {
      const email = doc.data().email;
      if (email && !email.endsWith('@buffalo.edu') && !email.endsWith('.edu')) {
        nonEduEmails++;
        console.log(`  - Non-edu email: ${email.replace(/(.{3}).*@/, '$1***@')}`);
      }
    });

    if (nonEduEmails > 0) {
      logTest(
        'Email Domain Validation',
        'FAIL',
        `Found ${nonEduEmails} non-educational emails`
      );
    } else {
      logTest('Email Domain Validation', 'PASS', 'All emails are .edu domains');
    }

  } catch (error) {
    logTest('Users Campus Test', 'FAIL', `Error: ${error}`);
  }
}

async function testPostsCampusIsolation() {
  console.log('\n🔍 Testing Posts Campus Isolation...\n');

  try {
    // Get a sample of spaces
    const spaces = await db.collection('spaces')
      .where('campusId', '==', 'ub-buffalo')
      .limit(5)
      .get();

    let postsWithoutCampus = 0;
    let totalPosts = 0;

    for (const spaceDoc of spaces.docs) {
      const posts = await db.collection('spaces')
        .doc(spaceDoc.id)
        .collection('posts')
        .limit(10)
        .get();

      posts.docs.forEach(postDoc => {
        totalPosts++;
        if (!postDoc.data().campusId) {
          postsWithoutCampus++;
        }
      });
    }

    if (postsWithoutCampus > 0) {
      logTest(
        'Posts Campus Field',
        'WARN',
        `${postsWithoutCampus}/${totalPosts} posts missing campusId`
      );
    } else if (totalPosts > 0) {
      logTest('Posts Campus Field', 'PASS', `All ${totalPosts} posts have campus ID`);
    } else {
      logTest('Posts Campus Field', 'WARN', 'No posts found to test');
    }

  } catch (error) {
    logTest('Posts Campus Test', 'FAIL', `Error: ${error}`);
  }
}

async function testCollectionGroupQueries() {
  console.log('\n🔍 Testing Collection Group Queries...\n');

  try {
    // Test dangerous collection group query
    const allMembers = await db.collectionGroup('members')
      .limit(20)
      .get();

    // Check if we're seeing members from multiple campuses
    const spaceIds = new Set<string>();
    allMembers.docs.forEach(doc => {
      const spaceId = doc.ref.parent.parent?.id;
      if (spaceId) spaceIds.add(spaceId);
    });

    // Verify these spaces are all from UB
    let nonUBSpaceCount = 0;
    for (const spaceId of spaceIds) {
      const space = await db.collection('spaces').doc(spaceId).get();
      if (space.exists && space.data()?.campusId !== 'ub-buffalo') {
        nonUBSpaceCount++;
      }
    }

    if (nonUBSpaceCount > 0) {
      logTest(
        'Collection Group Isolation',
        'FAIL',
        `Collection group query returned ${nonUBSpaceCount} non-UB spaces!`
      );
    } else {
      logTest(
        'Collection Group Isolation',
        'PASS',
        'Collection group queries properly filtered'
      );
    }

  } catch (error) {
    logTest('Collection Group Test', 'FAIL', `Error: ${error}`);
  }
}

async function testSecurityRuleEnforcement() {
  console.log('\n🔍 Testing Security Rule Enforcement...\n');

  // This would require Firebase client SDK with test credentials
  // For now, we'll check if the security rules file exists and is recent

  const fs = await import('fs');
  const securityRulesPath = path.join(process.cwd(), 'firestore.security.rules');

  if (fs.existsSync(securityRulesPath)) {
    const stats = fs.statSync(securityRulesPath);
    const hoursSinceUpdate = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);

    if (hoursSinceUpdate < 24) {
      logTest('Security Rules', 'PASS', 'Security rules recently updated');
    } else {
      logTest('Security Rules', 'WARN', `Security rules not updated in ${Math.floor(hoursSinceUpdate)} hours`);
    }

    // Check if rules contain campus validation
    const rulesContent = fs.readFileSync(securityRulesPath, 'utf-8');
    if (rulesContent.includes('campusId') && rulesContent.includes('getUserCampus')) {
      logTest('Campus Rules', 'PASS', 'Security rules contain campus validation');
    } else {
      logTest('Campus Rules', 'FAIL', 'Security rules missing campus validation!');
    }
  } else {
    logTest('Security Rules', 'FAIL', 'Security rules file not found!');
  }
}

// Main test runner
async function runTests() {
  console.log('🏫 HIVE Campus Isolation Security Test');
  console.log('======================================');

  await testSpacesCampusIsolation();
  await testUsersCampusIsolation();
  await testPostsCampusIsolation();
  await testCollectionGroupQueries();
  await testSecurityRuleEnforcement();

  // Summary
  console.log('\n📊 Test Summary');
  console.log('===============');

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const warned = results.filter(r => r.status === 'WARN').length;

  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warned}`);

  if (failed > 0) {
    console.log('\n⚠️  SECURITY RISK: Campus isolation has failures!');
    console.log('Fix these issues before launching to prevent data leaks.');
    process.exit(1);
  } else if (warned > 0) {
    console.log('\n⚠️  Some warnings detected. Review before launch.');
    process.exit(0);
  } else {
    console.log('\n✅ All campus isolation tests passed!');
    process.exit(0);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});