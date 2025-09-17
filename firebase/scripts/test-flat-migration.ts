#!/usr/bin/env ts-node

/**
 * TEST: Verify flat structure migration integrity
 * 
 * This script tests the migrated flat structure to ensure:
 * 1. All data was migrated correctly
 * 2. Relationships are preserved
 * 3. Categories are properly assigned
 * 4. No data corruption occurred
 */

import * as admin from "firebase-admin";
import { applicationDefault } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
// Uses Application Default Credentials in production
// or GOOGLE_APPLICATION_CREDENTIALS environment variable
admin.initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID || 'hive-9265c'
});

const db = admin.firestore();

// Test results
interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  details?: any;
}

const testResults: TestResult[] = [];

/**
 * Test 1: Verify all spaces have categories
 */
async function testSpaceCategories(): Promise<void> {
  const testName = "Space Categories";
  console.log(`\n🧪 Testing: ${testName}`);
  
  try {
    const spacesSnapshot = await db.collection('spaces').get();
    const spacesWithoutCategory: string[] = [];
    const categoryDistribution: Record<string, number> = {};
    
    spacesSnapshot.forEach(doc => {
      const data = doc.data();
      const category = data.category || data.spaceType;
      
      if (!category) {
        spacesWithoutCategory.push(doc.id);
      } else {
        categoryDistribution[category] = (categoryDistribution[category] || 0) + 1;
      }
    });
    
    const passed = spacesWithoutCategory.length === 0;
    
    testResults.push({
      name: testName,
      passed,
      message: passed 
        ? `✅ All ${spacesSnapshot.size} spaces have categories`
        : `❌ ${spacesWithoutCategory.length} spaces missing categories`,
      details: {
        totalSpaces: spacesSnapshot.size,
        spacesWithoutCategory,
        categoryDistribution
      }
    });
    
    console.log(`  Result: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    if (!passed) {
      console.log(`  Missing categories for: ${spacesWithoutCategory.join(', ')}`);
    }
    console.log(`  Category distribution:`, categoryDistribution);
    
  } catch (error) {
    testResults.push({
      name: testName,
      passed: false,
      message: `❌ Test error: ${error}`,
      details: { error }
    });
    console.log(`  Result: ❌ ERROR - ${error}`);
  }
}

/**
 * Test 2: Verify member composite keys
 */
async function testMemberCompositeKeys(): Promise<void> {
  const testName = "Member Composite Keys";
  console.log(`\n🧪 Testing: ${testName}`);
  
  try {
    const membersSnapshot = await db.collection('spaceMembers').limit(100).get();
    const invalidKeys: string[] = [];
    const keyPattern = /^[^_]+_[^_]+$/; // spaceId_userId format
    
    membersSnapshot.forEach(doc => {
      const compositeKey = doc.id;
      const data = doc.data();
      
      // Check key format
      if (!keyPattern.test(compositeKey)) {
        invalidKeys.push(compositeKey);
      }
      
      // Check key matches data
      const [spaceId, userId] = compositeKey.split('_');
      if (data.spaceId !== spaceId || data.userId !== userId) {
        invalidKeys.push(`${compositeKey} (data mismatch)`);
      }
    });
    
    const passed = invalidKeys.length === 0;
    
    testResults.push({
      name: testName,
      passed,
      message: passed
        ? `✅ All ${membersSnapshot.size} member keys valid`
        : `❌ ${invalidKeys.length} invalid composite keys found`,
      details: {
        totalChecked: membersSnapshot.size,
        invalidKeys
      }
    });
    
    console.log(`  Result: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    if (!passed) {
      console.log(`  Invalid keys:`, invalidKeys.slice(0, 5));
    }
    
  } catch (error) {
    testResults.push({
      name: testName,
      passed: false,
      message: `❌ Test error: ${error}`,
      details: { error }
    });
    console.log(`  Result: ❌ ERROR - ${error}`);
  }
}

/**
 * Test 3: Verify posts have space references
 */
async function testPostSpaceReferences(): Promise<void> {
  const testName = "Post Space References";
  console.log(`\n🧪 Testing: ${testName}`);
  
  try {
    const postsSnapshot = await db.collection('spacePosts').limit(100).get();
    const postsWithoutSpace: string[] = [];
    const postsWithoutCategory: string[] = [];
    
    for (const doc of postsSnapshot.docs) {
      const data = doc.data();
      
      if (!data.spaceId) {
        postsWithoutSpace.push(doc.id);
      }
      
      if (!data.spaceCategory) {
        postsWithoutCategory.push(doc.id);
      }
      
      // Verify space exists
      if (data.spaceId) {
        const spaceDoc = await db.collection('spaces').doc(data.spaceId).get();
        if (!spaceDoc.exists) {
          postsWithoutSpace.push(`${doc.id} (space ${data.spaceId} not found)`);
        }
      }
    }
    
    const passed = postsWithoutSpace.length === 0 && postsWithoutCategory.length === 0;
    
    testResults.push({
      name: testName,
      passed,
      message: passed
        ? `✅ All ${postsSnapshot.size} posts have valid space references`
        : `❌ ${postsWithoutSpace.length} posts missing spaces, ${postsWithoutCategory.length} missing categories`,
      details: {
        totalChecked: postsSnapshot.size,
        postsWithoutSpace,
        postsWithoutCategory
      }
    });
    
    console.log(`  Result: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    if (!passed) {
      console.log(`  Missing spaces: ${postsWithoutSpace.length}`);
      console.log(`  Missing categories: ${postsWithoutCategory.length}`);
    }
    
  } catch (error) {
    testResults.push({
      name: testName,
      passed: false,
      message: `❌ Test error: ${error}`,
      details: { error }
    });
    console.log(`  Result: ❌ ERROR - ${error}`);
  }
}

/**
 * Test 4: Verify no nested structures remain
 */
async function testNoNestedStructures(): Promise<void> {
  const testName = "No Nested Structures";
  console.log(`\n🧪 Testing: ${testName}`);
  
  try {
    const categories = [
      'campus_living',
      'academic_programs', 
      'student_organizations',
      'greek_life',
      'university_organizations',
      'interest_based',
      'social'
    ];
    
    const nestedFound: string[] = [];
    
    for (const category of categories) {
      // Check for nested spaces
      const nestedSpaces = await db
        .collection('spaces')
        .doc(category)
        .collection('spaces')
        .limit(1)
        .get();
      
      if (!nestedSpaces.empty) {
        nestedFound.push(`spaces/${category}/spaces (${nestedSpaces.size} found)`);
      }
    }
    
    // Check for any nested members in flat spaces
    const flatSpaces = await db.collection('spaces').limit(10).get();
    
    for (const spaceDoc of flatSpaces.docs) {
      const nestedMembers = await spaceDoc.ref.collection('members').limit(1).get();
      if (!nestedMembers.empty) {
        nestedFound.push(`spaces/${spaceDoc.id}/members (${nestedMembers.size} found)`);
      }
      
      const nestedPosts = await spaceDoc.ref.collection('posts').limit(1).get();
      if (!nestedPosts.empty) {
        nestedFound.push(`spaces/${spaceDoc.id}/posts (${nestedPosts.size} found)`);
      }
      
      const nestedEvents = await spaceDoc.ref.collection('events').limit(1).get();
      if (!nestedEvents.empty) {
        nestedFound.push(`spaces/${spaceDoc.id}/events (${nestedEvents.size} found)`);
      }
    }
    
    const passed = nestedFound.length === 0;
    
    testResults.push({
      name: testName,
      passed,
      message: passed
        ? `✅ No nested structures found`
        : `❌ ${nestedFound.length} nested structures still exist`,
      details: {
        nestedFound
      }
    });
    
    console.log(`  Result: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    if (!passed) {
      console.log(`  Nested structures found:`, nestedFound);
    }
    
  } catch (error) {
    testResults.push({
      name: testName,
      passed: false,
      message: `❌ Test error: ${error}`,
      details: { error }
    });
    console.log(`  Result: ❌ ERROR - ${error}`);
  }
}

/**
 * Test 5: Verify member counts match
 */
async function testMemberCounts(): Promise<void> {
  const testName = "Member Count Integrity";
  console.log(`\n🧪 Testing: ${testName}`);
  
  try {
    const spacesSnapshot = await db.collection('spaces').limit(10).get();
    const mismatches: string[] = [];
    
    for (const spaceDoc of spacesSnapshot.docs) {
      const spaceData = spaceDoc.data();
      const spaceId = spaceDoc.id;
      const storedCount = spaceData.memberCount || 0;
      
      // Count actual members
      const actualMembersQuery = await db
        .collection('spaceMembers')
        .where('spaceId', '==', spaceId)
        .get();
      
      const actualCount = actualMembersQuery.size;
      
      if (storedCount !== actualCount) {
        mismatches.push(`${spaceId}: stored=${storedCount}, actual=${actualCount}`);
      }
    }
    
    const passed = mismatches.length === 0;
    
    testResults.push({
      name: testName,
      passed,
      message: passed
        ? `✅ All member counts match`
        : `❌ ${mismatches.length} member count mismatches found`,
      details: {
        spacesChecked: spacesSnapshot.size,
        mismatches
      }
    });
    
    console.log(`  Result: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    if (!passed) {
      console.log(`  Mismatches:`, mismatches);
    }
    
  } catch (error) {
    testResults.push({
      name: testName,
      passed: false,
      message: `❌ Test error: ${error}`,
      details: { error }
    });
    console.log(`  Result: ❌ ERROR - ${error}`);
  }
}

/**
 * Generate test report
 */
function generateReport(): void {
  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION TEST REPORT');
  console.log('='.repeat(60));
  
  const passed = testResults.filter(t => t.passed).length;
  const failed = testResults.filter(t => !t.passed).length;
  const total = testResults.length;
  
  console.log(`\nTests Run: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`);
  
  // List all test results
  testResults.forEach((result, index) => {
    console.log(`${index + 1}. ${result.name}: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`   ${result.message}`);
  });
  
  // Overall status
  console.log('\n' + '='.repeat(60));
  if (failed === 0) {
    console.log('✅ ALL TESTS PASSED - Migration successful!');
    console.log('Safe to proceed with deployment.');
  } else {
    console.log('❌ TESTS FAILED - Migration has issues!');
    console.log('Do NOT deploy until all tests pass.');
    console.log('\nFailed tests require attention:');
    testResults
      .filter(t => !t.passed)
      .forEach(t => console.log(`  - ${t.name}: ${t.message}`));
  }
  console.log('='.repeat(60));
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('🧪 FLAT STRUCTURE MIGRATION TESTS');
  console.log('==================================');
  console.log(`Started at: ${new Date().toISOString()}`);
  
  try {
    // Run all tests
    await testSpaceCategories();
    await testMemberCompositeKeys();
    await testPostSpaceReferences();
    await testNoNestedStructures();
    await testMemberCounts();
    
    // Generate report
    generateReport();
    
    console.log(`\nCompleted at: ${new Date().toISOString()}`);
    
    // Exit with appropriate code
    const failed = testResults.filter(t => !t.passed).length;
    process.exit(failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error);
    process.exit(1);
  }
}

// Run tests
if (require.main === module) {
  runTests();
}

export { runTests };