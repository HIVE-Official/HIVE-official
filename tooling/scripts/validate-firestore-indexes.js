#!/usr/bin/env node

/**
 * Firestore Index Validation Script
 *
 * This script validates that all critical Firestore indexes are working correctly
 * by testing representative queries from each major collection.
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin (assumes service account key is available)
if (!admin.apps.length) {
  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
    if (serviceAccountPath) {
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      // Use default credentials in production
      admin.initializeApp();
    }
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error.message);
    process.exit(1);
  }
}

const db = admin.firestore();
const CAMPUS_ID = 'ub-buffalo';

console.log('🔍 HIVE Firestore Index Validation');
console.log('==================================\n');

// Test queries that should be optimized by our indexes
const testQueries = [
  {
    name: 'Users - Campus Active Users',
    collection: 'users',
    query: () => db.collection('users')
      .where('campusId', '==', CAMPUS_ID)
      .where('isActive', '==', true)
      .orderBy('lastActive', 'desc')
      .limit(5),
    expectedIndex: 'campusId + isActive + lastActive'
  },
  {
    name: 'Spaces - Popular Spaces',
    collection: 'spaces',
    query: () => db.collection('spaces')
      .where('campusId', '==', CAMPUS_ID)
      .where('isActive', '==', true)
      .orderBy('memberCount', 'desc')
      .limit(10),
    expectedIndex: 'campusId + isActive + memberCount'
  },
  {
    name: 'Posts - Recent Posts',
    collection: 'posts',
    query: () => db.collectionGroup('posts')
      .where('isDeleted', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(20),
    expectedIndex: 'isDeleted + createdAt'
  },
  {
    name: 'Events - Campus Public Events',
    collection: 'events',
    query: () => db.collectionGroup('events')
      .where('campusId', '==', CAMPUS_ID)
      .where('isPublic', '==', true)
      .orderBy('startTime', 'asc')
      .limit(10),
    expectedIndex: 'campusId + isPublic + startTime'
  },
  {
    name: 'Feed - Behavioral Feed',
    collection: 'feed',
    query: () => db.collection('feed')
      .where('campusId', '==', CAMPUS_ID)
      .where('isActive', '==', true)
      .orderBy('feedScore', 'desc')
      .limit(15),
    expectedIndex: 'campusId + isActive + feedScore'
  },
  {
    name: 'Rituals - Active Campus Rituals',
    collection: 'rituals',
    query: () => db.collection('rituals')
      .where('campusId', '==', CAMPUS_ID)
      .where('isActive', '==', true)
      .orderBy('priority', 'desc')
      .limit(5),
    expectedIndex: 'campusId + isActive + priority'
  },
  {
    name: 'Members - User Memberships',
    collection: 'members',
    query: () => db.collectionGroup('members')
      .where('userId', '==', 'test-user-id')
      .where('isActive', '==', true)
      .orderBy('lastActiveAt', 'desc')
      .limit(20),
    expectedIndex: 'userId + isActive + lastActiveAt'
  }
];

async function validateQuery(test) {
  const startTime = Date.now();

  try {
    console.log(`🔎 Testing: ${test.name}`);
    console.log(`   Query: ${test.collection} collection`);
    console.log(`   Expected Index: ${test.expectedIndex}`);

    const querySnapshot = await test.query().get();
    const executionTime = Date.now() - startTime;

    if (executionTime > 3000) {
      console.log(`   ⚠️  SLOW: ${executionTime}ms (expected <3000ms)`);
      return { name: test.name, status: 'slow', time: executionTime };
    } else if (executionTime > 1000) {
      console.log(`   ⚡ OK: ${executionTime}ms (could be faster)`);
      return { name: test.name, status: 'ok', time: executionTime };
    } else {
      console.log(`   ✅ FAST: ${executionTime}ms`);
      return { name: test.name, status: 'fast', time: executionTime };
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);

    if (error.message.includes('index')) {
      console.log(`   💡 Likely missing index: ${test.expectedIndex}`);
      return { name: test.name, status: 'missing_index', error: error.message };
    } else {
      return { name: test.name, status: 'error', error: error.message };
    }
  }

  console.log('');
}

async function validateAllIndexes() {
  console.log(`📊 Testing ${testQueries.length} critical queries...\n`);

  const results = [];

  for (const test of testQueries) {
    const result = await validateQuery(test);
    results.push(result);

    // Add small delay to avoid overwhelming Firestore
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n📋 Validation Summary');
  console.log('====================');

  const fast = results.filter(r => r.status === 'fast');
  const ok = results.filter(r => r.status === 'ok');
  const slow = results.filter(r => r.status === 'slow');
  const errors = results.filter(r => r.status === 'error');
  const missingIndexes = results.filter(r => r.status === 'missing_index');

  console.log(`✅ Fast queries (< 1s): ${fast.length}`);
  console.log(`⚡ OK queries (1-3s): ${ok.length}`);
  console.log(`⚠️  Slow queries (> 3s): ${slow.length}`);
  console.log(`❌ Error queries: ${errors.length}`);
  console.log(`🔍 Missing indexes: ${missingIndexes.length}`);

  if (slow.length > 0) {
    console.log('\n⚠️  Slow Queries:');
    slow.forEach(q => console.log(`   - ${q.name}: ${q.time}ms`));
  }

  if (errors.length > 0) {
    console.log('\n❌ Failed Queries:');
    errors.forEach(q => console.log(`   - ${q.name}: ${q.error}`));
  }

  if (missingIndexes.length > 0) {
    console.log('\n🔍 Missing Indexes:');
    missingIndexes.forEach(q => console.log(`   - ${q.name}`));
    console.log('\n💡 Run: firebase deploy --only firestore:indexes');
  }

  // Overall status
  const totalIssues = slow.length + errors.length + missingIndexes.length;

  if (totalIssues === 0) {
    console.log('\n🎉 All indexes are working optimally!');
    return true;
  } else {
    console.log(`\n⚠️  Found ${totalIssues} issues that need attention.`);
    return false;
  }
}

// Additional validation for campus isolation
async function validateCampusIsolation() {
  console.log('\n🔒 Validating Campus Isolation');
  console.log('==============================');

  const criticalCollections = ['users', 'spaces', 'feed', 'rituals'];
  let isolationValid = true;

  for (const collection of criticalCollections) {
    try {
      console.log(`🔎 Testing ${collection} isolation...`);

      // Query without campus filter (should be fast due to small test dataset)
      const startTime = Date.now();
      const allDocsSnapshot = await db.collection(collection).limit(5).get();
      const queryTime = Date.now() - startTime;

      // Check if documents have campusId field
      let hasCampusId = 0;
      allDocsSnapshot.forEach(doc => {
        if (doc.data().campusId) hasCampusId++;
      });

      if (hasCampusId === allDocsSnapshot.size && allDocsSnapshot.size > 0) {
        console.log(`   ✅ ${collection}: All documents have campusId`);
      } else if (allDocsSnapshot.size === 0) {
        console.log(`   ℹ️  ${collection}: No documents found (empty collection)`);
      } else {
        console.log(`   ⚠️  ${collection}: ${hasCampusId}/${allDocsSnapshot.size} docs have campusId`);
        isolationValid = false;
      }

    } catch (error) {
      console.log(`   ❌ ${collection}: Error - ${error.message}`);
      isolationValid = false;
    }
  }

  if (isolationValid) {
    console.log('\n✅ Campus isolation is properly implemented');
  } else {
    console.log('\n⚠️  Campus isolation needs review');
  }

  return isolationValid;
}

// Main execution
async function main() {
  try {
    const indexValidation = await validateAllIndexes();
    const isolationValidation = await validateCampusIsolation();

    console.log('\n🏁 Final Status');
    console.log('===============');

    if (indexValidation && isolationValidation) {
      console.log('✅ All validations passed - production ready!');
      process.exit(0);
    } else {
      console.log('⚠️  Some validations failed - review needed');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n💥 Validation script failed:', error.message);
    process.exit(1);
  }
}

// Handle script interruption
process.on('SIGINT', () => {
  console.log('\n\n⏹️  Validation interrupted');
  process.exit(1);
});

// Run the validation
main();