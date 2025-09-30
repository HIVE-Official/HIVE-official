#!/usr/bin/env node

/**
 * Firestore Indexes Configuration Checker
 *
 * Validates the firestore.indexes.json file structure and provides
 * deployment instructions.
 *
 * Usage:
 *   node scripts/check-firestore-indexes.js
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function validateIndexesFile() {
  const indexesPath = path.join(__dirname, '../firebase/firestore.indexes.json');

  log(colors.cyan, '\n🔍 Validating Firestore Indexes Configuration...\n');

  // Check if file exists
  if (!fs.existsSync(indexesPath)) {
    log(colors.red, '❌ ERROR: firestore.indexes.json not found!');
    log(colors.yellow, `   Expected path: ${indexesPath}`);
    process.exit(1);
  }

  // Parse and validate JSON
  let indexesConfig;
  try {
    const fileContent = fs.readFileSync(indexesPath, 'utf8');
    indexesConfig = JSON.parse(fileContent);
  } catch (error) {
    log(colors.red, '❌ ERROR: Invalid JSON in firestore.indexes.json');
    log(colors.yellow, `   ${error.message}`);
    process.exit(1);
  }

  // Validate structure
  if (!indexesConfig.indexes || !Array.isArray(indexesConfig.indexes)) {
    log(colors.red, '❌ ERROR: indexes array not found or invalid');
    process.exit(1);
  }

  log(colors.green, `✅ Found ${indexesConfig.indexes.length} index definitions\n`);

  // Analyze indexes by collection
  const collectionIndexes = {};
  const collectionGroupIndexes = {};
  const warnings = [];

  indexesConfig.indexes.forEach((index, i) => {
    // Validate index structure
    if (!index.collectionGroup) {
      warnings.push(`Index ${i}: Missing collectionGroup`);
      return;
    }

    if (!index.fields || !Array.isArray(index.fields)) {
      warnings.push(`Index ${i}: Invalid fields array`);
      return;
    }

    if (index.fields.length < 2) {
      warnings.push(`Index ${i} (${index.collectionGroup}): Single field indexes are automatic`);
    }

    // Categorize by scope
    const scope = index.queryScope || 'COLLECTION';
    const collection = index.collectionGroup;

    if (scope === 'COLLECTION_GROUP') {
      if (!collectionGroupIndexes[collection]) {
        collectionGroupIndexes[collection] = [];
      }
      collectionGroupIndexes[collection].push(index);
    } else {
      if (!collectionIndexes[collection]) {
        collectionIndexes[collection] = [];
      }
      collectionIndexes[collection].push(index);
    }
  });

  // Print summary
  log(colors.bright + colors.blue, '📊 Index Summary by Collection:\n');

  Object.keys(collectionIndexes).sort().forEach(collection => {
    const indexes = collectionIndexes[collection];
    log(colors.cyan, `  ${collection} (${indexes.length} ${indexes.length === 1 ? 'index' : 'indexes'})`);
    indexes.forEach(index => {
      const fields = index.fields.map(f => `${f.fieldPath}:${f.order}`).join(', ');
      log(colors.reset, `    - ${fields}`);
    });
  });

  if (Object.keys(collectionGroupIndexes).length > 0) {
    log(colors.bright + colors.magenta, '\n📊 Collection Group Indexes:\n');
    Object.keys(collectionGroupIndexes).sort().forEach(collection => {
      const indexes = collectionGroupIndexes[collection];
      log(colors.magenta, `  ${collection} (${indexes.length} ${indexes.length === 1 ? 'index' : 'indexes'})`);
      indexes.forEach(index => {
        const fields = index.fields.map(f => `${f.fieldPath}:${f.order}`).join(', ');
        log(colors.reset, `    - ${fields}`);
      });
    });
  }

  // Show warnings if any
  if (warnings.length > 0) {
    log(colors.bright + colors.yellow, '\n⚠️  Warnings:\n');
    warnings.forEach(w => log(colors.yellow, `  ${w}`));
  }

  return {
    totalIndexes: indexesConfig.indexes.length,
    collectionCount: Object.keys(collectionIndexes).length,
    collectionGroupCount: Object.keys(collectionGroupIndexes).length,
    warnings: warnings.length,
  };
}

function printDeploymentInstructions(stats) {
  log(colors.bright + colors.green, '\n✅ Validation Complete!\n');

  log(colors.cyan, '📦 Deployment Instructions:\n');

  log(colors.reset, '1. Ensure Firebase CLI is installed:');
  log(colors.yellow, '   npm install -g firebase-tools\n');

  log(colors.reset, '2. Login to Firebase (if not already):');
  log(colors.yellow, '   firebase login\n');

  log(colors.reset, '3. Set the correct project:');
  log(colors.yellow, '   firebase use <project-id>');
  log(colors.yellow, '   # Or for HIVE: firebase use hive-production\n');

  log(colors.reset, '4. Deploy indexes:');
  log(colors.yellow, '   firebase deploy --only firestore:indexes\n');

  log(colors.reset, '5. Monitor deployment:');
  log(colors.yellow, '   Firebase Console → Firestore → Indexes tab');
  log(colors.yellow, '   https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/indexes\n');

  log(colors.bright + colors.blue, '📝 Important Notes:\n');
  log(colors.reset, '  • Index creation can take 5-15 minutes for complex indexes');
  log(colors.reset, '  • Indexes on large collections (10k+ docs) may take longer');
  log(colors.reset, '  • Queries will FAIL until indexes finish building');
  log(colors.reset, '  • Monitor the Firebase Console for build status');
  log(colors.reset, '  • You can deploy rules and indexes together with:');
  log(colors.yellow, '    firebase deploy --only firestore\n');

  log(colors.bright + colors.green, `📊 Summary:\n`);
  log(colors.reset, `  • ${stats.totalIndexes} total indexes`);
  log(colors.reset, `  • ${stats.collectionCount} regular collections`);
  log(colors.reset, `  • ${stats.collectionGroupCount} collection groups`);
  if (stats.warnings > 0) {
    log(colors.yellow, `  • ${stats.warnings} warnings (review recommended)`);
  }
  log(colors.reset, '');
}

// Main execution
try {
  const stats = validateIndexesFile();
  printDeploymentInstructions(stats);

  log(colors.green, '✅ Configuration is valid and ready to deploy!\n');
  process.exit(0);
} catch (error) {
  log(colors.red, `\n❌ Validation failed: ${error.message}\n`);
  process.exit(1);
}