#!/usr/bin/env node

/**
 * Deploy Firestore Indexes Script
 *
 * This script deploys the Firestore indexes configuration to production.
 * It uses the Firebase CLI to apply the indexes defined in firestore.indexes.json
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const INDEXES_FILE = path.join(PROJECT_ROOT, 'firestore.indexes.json');

console.log('🔥 HIVE Firestore Index Deployment Script');
console.log('=========================================\n');

// Validate that indexes file exists
if (!fs.existsSync(INDEXES_FILE)) {
  console.error('❌ Error: firestore.indexes.json not found at:', INDEXES_FILE);
  process.exit(1);
}

// Read and validate indexes configuration
let indexesConfig;
try {
  const indexesContent = fs.readFileSync(INDEXES_FILE, 'utf8');
  indexesConfig = JSON.parse(indexesContent);
  console.log('✅ Loaded indexes configuration');
  console.log(`   - ${indexesConfig.indexes.length} composite indexes`);
  console.log(`   - ${indexesConfig.fieldOverrides.length} field overrides`);
} catch (error) {
  console.error('❌ Error parsing firestore.indexes.json:', error.message);
  process.exit(1);
}

// Validate campus isolation in indexes
console.log('\n🔍 Validating Campus Isolation...');
const campusIsolatedCollections = ['users', 'spaces', 'rituals', 'feed', 'presence', 'tools', 'analytics_metrics'];
let isolationValid = true;

campusIsolatedCollections.forEach(collection => {
  const collectionIndexes = indexesConfig.indexes.filter(idx => idx.collectionGroup === collection);
  const hasCampusIndex = collectionIndexes.some(idx =>
    idx.fields.some(field => field.fieldPath === 'campusId')
  );

  if (!hasCampusIndex && collectionIndexes.length > 0) {
    console.warn(`⚠️  Warning: ${collection} has indexes but no campus isolation`);
    isolationValid = false;
  }
});

if (isolationValid) {
  console.log('✅ Campus isolation validated for critical collections');
} else {
  console.log('⚠️  Some collections may need campus isolation review');
}

// Get deployment environment
const environment = process.argv[2] || 'staging';
const validEnvironments = ['staging', 'production'];

if (!validEnvironments.includes(environment)) {
  console.error(`❌ Invalid environment: ${environment}`);
  console.error(`   Valid environments: ${validEnvironments.join(', ')}`);
  process.exit(1);
}

console.log(`\n🚀 Deploying to: ${environment}`);

// Set Firebase project based on environment
const firebaseProjects = {
  staging: 'hive-staging', // Update with actual project ID
  production: 'hive-production' // Update with actual project ID
};

const projectId = firebaseProjects[environment];
console.log(`   Firebase Project: ${projectId}`);

try {
  // Set the active Firebase project
  console.log('\n📡 Setting Firebase project...');
  execSync(`firebase use ${projectId}`, { stdio: 'inherit', cwd: PROJECT_ROOT });

  // Deploy indexes
  console.log('\n📚 Deploying Firestore indexes...');
  execSync('firebase deploy --only firestore:indexes', {
    stdio: 'inherit',
    cwd: PROJECT_ROOT
  });

  console.log('\n✅ Firestore indexes deployed successfully!');
  console.log('\n📋 Post-deployment checklist:');
  console.log('   □ Verify indexes in Firebase Console');
  console.log('   □ Test critical queries work as expected');
  console.log('   □ Monitor query performance');
  console.log('   □ Check for any failed index builds');

} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.error('\n🔧 Troubleshooting steps:');
  console.error('   1. Ensure Firebase CLI is installed and authenticated');
  console.error('   2. Check that the project ID is correct');
  console.error('   3. Verify indexes configuration is valid');
  console.error('   4. Check Firebase project permissions');
  process.exit(1);
}

// Display index summary
console.log('\n📊 Index Summary:');
console.log('================');

const indexesByCollection = {};
indexesConfig.indexes.forEach(index => {
  if (!indexesByCollection[index.collectionGroup]) {
    indexesByCollection[index.collectionGroup] = [];
  }
  indexesByCollection[index.collectionGroup].push(index);
});

Object.keys(indexesByCollection).sort().forEach(collection => {
  const count = indexesByCollection[collection].length;
  console.log(`   ${collection}: ${count} indexes`);
});

console.log('\n🎉 Deployment complete!');