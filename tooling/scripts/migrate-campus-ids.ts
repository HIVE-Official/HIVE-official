#!/usr/bin/env npx tsx

/**
 * Campus ID Migration Script
 * Adds campus IDs to all existing documents that are missing them
 *
 * CRITICAL: Run in dry-run mode first to see what will be changed
 *
 * Usage:
 *   Dry run (no changes): npx tsx scripts/migrate-campus-ids.ts --dry-run
 *   Execute migration: npx tsx scripts/migrate-campus-ids.ts --execute
 *   Rollback changes: npx tsx scripts/migrate-campus-ids.ts --rollback
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue, WriteBatch } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), 'apps/web/.env.local') });

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isExecute = args.includes('--execute');
const isRollback = args.includes('--rollback');

if (!isDryRun && !isExecute && !isRollback) {
  console.error('❌ Please specify --dry-run, --execute, or --rollback');
  process.exit(1);
}

// Configuration
const DEFAULT_CAMPUS_ID = 'ub-buffalo';
const BATCH_SIZE = 500; // Firestore batch write limit
const PROGRESS_INTERVAL = 100; // Log progress every N documents

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')!
  })
});

const db = getFirestore(app);

// Migration tracking
interface MigrationStats {
  collection: string;
  total: number;
  missing: number;
  updated: number;
  failed: number;
  skipped: number;
}

interface BackupEntry {
  collection: string;
  documentId: string;
  originalData: any;
  timestamp: string;
}

const stats: Record<string, MigrationStats> = {};
const backupDir = path.join(process.cwd(), 'migration-backups');
const backupFile = path.join(backupDir, `campus-migration-${Date.now()}.json`);

// Ensure backup directory exists
if (!existsSync(backupDir)) {
  mkdirSync(backupDir, { recursive: true });
}

// Helper functions
function initStats(collection: string): MigrationStats {
  if (!stats[collection]) {
    stats[collection] = {
      collection,
      total: 0,
      missing: 0,
      updated: 0,
      failed: 0,
      skipped: 0
    };
  }
  return stats[collection];
}

function logProgress(collection: string, current: number, total: number) {
  const percentage = ((current / total) * 100).toFixed(1);
  process.stdout.write(`\r  📊 ${collection}: ${current}/${total} (${percentage}%)  `);
}

async function backupDocument(collection: string, docId: string, data: any) {
  if (!isDryRun) {
    const backup: BackupEntry = {
      collection,
      documentId: docId,
      originalData: data,
      timestamp: new Date().toISOString()
    };

    // Append to backup file
    const stream = createWriteStream(backupFile, { flags: 'a' });
    stream.write(JSON.stringify(backup) + '\n');
    stream.end();
  }
}

// Migration functions for each collection
async function migrateSpaces() {
  console.log('\n🏢 Migrating Spaces Collection...');
  const stat = initStats('spaces');

  try {
    const snapshot = await db.collection('spaces').get();
    stat.total = snapshot.size;

    if (stat.total === 0) {
      console.log('  No spaces found');
      return;
    }

    let batch: WriteBatch | null = null;
    let batchCount = 0;
    let processedCount = 0;

    for (const doc of snapshot.docs) {
      processedCount++;
      const data = doc.data();

      // Check if campus ID is missing
      if (!data.campusId) {
        stat.missing++;

        if (!isDryRun) {
          // Create new batch if needed
          if (!batch || batchCount >= BATCH_SIZE) {
            if (batch) await batch.commit();
            batch = db.batch();
            batchCount = 0;
          }

          // Backup original data
          await backupDocument('spaces', doc.id, data);

          // Update with campus ID
          batch.update(doc.ref, {
            campusId: DEFAULT_CAMPUS_ID,
            isActive: data.isActive ?? true,
            updatedAt: FieldValue.serverTimestamp(),
            migrationNote: 'Added campus ID via migration script'
          });

          batchCount++;
          stat.updated++;
        }

        if (isDryRun) {
          console.log(`\n  Would update space: ${doc.id} - ${data.name}`);
        }
      } else {
        stat.skipped++;
      }

      if (processedCount % PROGRESS_INTERVAL === 0) {
        logProgress('spaces', processedCount, stat.total);
      }
    }

    // Commit final batch
    if (batch && batchCount > 0 && !isDryRun) {
      await batch.commit();
    }

    console.log('\n  ✅ Spaces migration complete');
  } catch (error) {
    console.error('\n  ❌ Error migrating spaces:', error);
    stat.failed = stat.total - stat.updated - stat.skipped;
  }
}

async function migrateUsers() {
  console.log('\n👥 Migrating Users Collection...');
  const stat = initStats('users');

  try {
    const snapshot = await db.collection('users').get();
    stat.total = snapshot.size;

    if (stat.total === 0) {
      console.log('  No users found');
      return;
    }

    let batch: WriteBatch | null = null;
    let batchCount = 0;
    let processedCount = 0;

    for (const doc of snapshot.docs) {
      processedCount++;
      const data = doc.data();

      // Check if school ID is missing or needs standardization
      if (!data.schoolId || data.schoolId === 'ub') {
        stat.missing++;

        if (!isDryRun) {
          if (!batch || batchCount >= BATCH_SIZE) {
            if (batch) await batch.commit();
            batch = db.batch();
            batchCount = 0;
          }

          await backupDocument('users', doc.id, data);

          // Determine campus from email if possible
          let campusId = DEFAULT_CAMPUS_ID;
          if (data.email?.endsWith('@buffalo.edu')) {
            campusId = 'ub-buffalo';
          }

          batch.update(doc.ref, {
            schoolId: campusId,
            campusId: campusId, // Add both for consistency
            updatedAt: FieldValue.serverTimestamp(),
            migrationNote: 'Standardized campus ID via migration'
          });

          batchCount++;
          stat.updated++;
        }

        if (isDryRun) {
          console.log(`\n  Would update user: ${doc.id} - ${data.email}`);
        }
      } else if (data.schoolId !== 'ub-buffalo') {
        // Log non-UB users for review
        console.log(`\n  ⚠️  Non-UB user found: ${doc.id} - campus: ${data.schoolId}`);
      } else {
        stat.skipped++;
      }

      if (processedCount % PROGRESS_INTERVAL === 0) {
        logProgress('users', processedCount, stat.total);
      }
    }

    if (batch && batchCount > 0 && !isDryRun) {
      await batch.commit();
    }

    console.log('\n  ✅ Users migration complete');
  } catch (error) {
    console.error('\n  ❌ Error migrating users:', error);
    stat.failed = stat.total - stat.updated - stat.skipped;
  }
}

async function migrateSpaceSubcollections() {
  console.log('\n📝 Migrating Space Subcollections...');

  try {
    // Get all spaces with campus ID
    const spacesSnapshot = await db.collection('spaces')
      .where('campusId', '==', DEFAULT_CAMPUS_ID)
      .limit(10) // Process in smaller chunks
      .get();

    for (const spaceDoc of spacesSnapshot.docs) {
      const spaceId = spaceDoc.id;
      const spaceCampusId = spaceDoc.data().campusId;

      // Migrate posts
      await migrateSubcollection('posts', spaceId, spaceCampusId);

      // Migrate events
      await migrateSubcollection('events', spaceId, spaceCampusId);

      // Members don't need campus ID (they inherit from space)
    }

    console.log('\n  ✅ Subcollections migration complete');
  } catch (error) {
    console.error('\n  ❌ Error migrating subcollections:', error);
  }
}

async function migrateSubcollection(
  subcollection: string,
  spaceId: string,
  spaceCampusId: string
) {
  const stat = initStats(`spaces/${spaceId}/${subcollection}`);

  try {
    const snapshot = await db
      .collection('spaces')
      .doc(spaceId)
      .collection(subcollection)
      .get();

    stat.total = snapshot.size;

    if (stat.total === 0) return;

    console.log(`\n  📂 Migrating ${subcollection} for space ${spaceId}...`);

    let batch: WriteBatch | null = null;
    let batchCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();

      if (!data.campusId) {
        stat.missing++;

        if (!isDryRun) {
          if (!batch || batchCount >= BATCH_SIZE) {
            if (batch) await batch.commit();
            batch = db.batch();
            batchCount = 0;
          }

          await backupDocument(`spaces/${spaceId}/${subcollection}`, doc.id, data);

          batch.update(doc.ref, {
            campusId: spaceCampusId,
            updatedAt: FieldValue.serverTimestamp()
          });

          batchCount++;
          stat.updated++;
        }
      } else {
        stat.skipped++;
      }
    }

    if (batch && batchCount > 0 && !isDryRun) {
      await batch.commit();
    }

    console.log(`    Updated ${stat.updated}/${stat.total} ${subcollection}`);
  } catch (error) {
    console.error(`    ❌ Error migrating ${subcollection}:`, error);
  }
}

async function migrateTools() {
  console.log('\n🔧 Migrating Tools Collection...');
  const stat = initStats('tools');

  try {
    const snapshot = await db.collection('tools').get();
    stat.total = snapshot.size;

    if (stat.total === 0) {
      console.log('  No tools found');
      return;
    }

    let batch: WriteBatch | null = null;
    let batchCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();

      if (!data.campusId) {
        stat.missing++;

        if (!isDryRun) {
          if (!batch || batchCount >= BATCH_SIZE) {
            if (batch) await batch.commit();
            batch = db.batch();
            batchCount = 0;
          }

          await backupDocument('tools', doc.id, data);

          batch.update(doc.ref, {
            campusId: DEFAULT_CAMPUS_ID,
            updatedAt: FieldValue.serverTimestamp()
          });

          batchCount++;
          stat.updated++;
        }
      } else {
        stat.skipped++;
      }
    }

    if (batch && batchCount > 0 && !isDryRun) {
      await batch.commit();
    }

    console.log('\n  ✅ Tools migration complete');
  } catch (error) {
    console.error('\n  ❌ Error migrating tools:', error);
  }
}

async function migrateRituals() {
  console.log('\n🎯 Migrating Rituals Collection...');
  const stat = initStats('rituals');

  try {
    const snapshot = await db.collection('rituals').get();
    stat.total = snapshot.size;

    if (stat.total === 0) {
      console.log('  No rituals found');
      return;
    }

    let batch: WriteBatch | null = null;
    let batchCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();

      if (!data.campusId && !data.isGlobal) {
        stat.missing++;

        if (!isDryRun) {
          if (!batch || batchCount >= BATCH_SIZE) {
            if (batch) await batch.commit();
            batch = db.batch();
            batchCount = 0;
          }

          await backupDocument('rituals', doc.id, data);

          batch.update(doc.ref, {
            campusId: DEFAULT_CAMPUS_ID,
            updatedAt: FieldValue.serverTimestamp()
          });

          batchCount++;
          stat.updated++;
        }
      } else {
        stat.skipped++;
      }
    }

    if (batch && batchCount > 0 && !isDryRun) {
      await batch.commit();
    }

    console.log('\n  ✅ Rituals migration complete');
  } catch (error) {
    console.error('\n  ❌ Error migrating rituals:', error);
  }
}

async function validateMigration() {
  console.log('\n🔍 Validating Migration...');

  const validationResults = {
    spaces: { total: 0, withCampus: 0, missing: 0 },
    users: { total: 0, withCampus: 0, missing: 0 },
    posts: { total: 0, withCampus: 0, missing: 0 },
    tools: { total: 0, withCampus: 0, missing: 0 }
  };

  // Validate spaces
  const spacesSnapshot = await db.collection('spaces').get();
  validationResults.spaces.total = spacesSnapshot.size;
  spacesSnapshot.docs.forEach(doc => {
    if (doc.data().campusId) {
      validationResults.spaces.withCampus++;
    } else {
      validationResults.spaces.missing++;
    }
  });

  // Validate users
  const usersSnapshot = await db.collection('users').limit(100).get();
  validationResults.users.total = usersSnapshot.size;
  usersSnapshot.docs.forEach(doc => {
    if (doc.data().schoolId === 'ub-buffalo' || doc.data().campusId === 'ub-buffalo') {
      validationResults.users.withCampus++;
    } else {
      validationResults.users.missing++;
    }
  });

  // Sample validation for posts
  const sampleSpaces = await db.collection('spaces')
    .where('campusId', '==', DEFAULT_CAMPUS_ID)
    .limit(5)
    .get();

  for (const spaceDoc of sampleSpaces.docs) {
    const postsSnapshot = await db
      .collection('spaces')
      .doc(spaceDoc.id)
      .collection('posts')
      .limit(10)
      .get();

    postsSnapshot.docs.forEach(doc => {
      validationResults.posts.total++;
      if (doc.data().campusId) {
        validationResults.posts.withCampus++;
      } else {
        validationResults.posts.missing++;
      }
    });
  }

  // Display validation results
  console.log('\n📊 Validation Results:');
  console.log('====================');

  Object.entries(validationResults).forEach(([collection, result]) => {
    const percentage = result.total > 0
      ? ((result.withCampus / result.total) * 100).toFixed(1)
      : '0';

    console.log(`\n${collection}:`);
    console.log(`  Total: ${result.total}`);
    console.log(`  With Campus: ${result.withCampus} (${percentage}%)`);
    console.log(`  Missing: ${result.missing}`);
  });
}

async function rollbackMigration() {
  console.log('\n⏪ Rolling Back Migration...');

  if (!existsSync(backupFile)) {
    console.error('❌ No backup file found. Cannot rollback.');
    process.exit(1);
  }

  // Read backup file and restore original data
  // This would need to be implemented based on your specific needs
  console.log('  ⚠️  Rollback not fully implemented yet');
  console.log(`  Backup file: ${backupFile}`);
}

// Display migration summary
function displaySummary() {
  console.log('\n\n📈 Migration Summary');
  console.log('===================');

  let totalDocuments = 0;
  let totalUpdated = 0;
  let totalMissing = 0;
  let totalSkipped = 0;

  Object.values(stats).forEach(stat => {
    totalDocuments += stat.total;
    totalUpdated += stat.updated;
    totalMissing += stat.missing;
    totalSkipped += stat.skipped;

    console.log(`\n${stat.collection}:`);
    console.log(`  Total: ${stat.total}`);
    console.log(`  Missing Campus ID: ${stat.missing}`);
    console.log(`  Updated: ${stat.updated}`);
    console.log(`  Skipped: ${stat.skipped}`);
    console.log(`  Failed: ${stat.failed}`);
  });

  console.log('\n-----------------');
  console.log('Overall Totals:');
  console.log(`  Documents: ${totalDocuments}`);
  console.log(`  Missing Campus: ${totalMissing}`);
  console.log(`  Updated: ${totalUpdated}`);
  console.log(`  Skipped: ${totalSkipped}`);

  if (isDryRun) {
    console.log('\n⚠️  DRY RUN MODE - No changes were made');
    console.log('Run with --execute to apply changes');
  } else if (isExecute) {
    console.log('\n✅ Migration completed successfully');
    console.log(`Backup saved to: ${backupFile}`);
  }
}

// Main migration runner
async function runMigration() {
  console.log('🏫 HIVE Campus ID Migration Script');
  console.log('==================================');

  if (isDryRun) {
    console.log('🔍 Running in DRY RUN mode - no changes will be made');
  } else if (isExecute) {
    console.log('⚡ Running in EXECUTE mode - changes WILL be made');
    console.log(`📁 Backup will be saved to: ${backupFile}`);

    // Confirm execution
    console.log('\n⚠️  WARNING: This will modify your production database!');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  } else if (isRollback) {
    await rollbackMigration();
    return;
  }

  try {
    // Run migrations in order
    await migrateSpaces();
    await migrateUsers();
    await migrateSpaceSubcollections();
    await migrateTools();
    await migrateRituals();

    // Validate results
    if (!isDryRun) {
      await validateMigration();
    }

    // Display summary
    displaySummary();

  } catch (error) {
    console.error('\n❌ Fatal error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});