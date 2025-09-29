#!/usr/bin/env npx tsx

/**
 * Quick Campus ID Status Check
 * Shows current state of campus IDs in your database
 *
 * Usage: npx tsx scripts/check-campus-status.ts
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), 'apps/web/.env.local') });

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')!
  })
});

const db = getFirestore(app);

// Color codes for terminal
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

async function checkCollection(name: string, campusField: string = 'campusId') {
  console.log(`\n${colors.blue}Checking ${name}...${colors.reset}`);

  try {
    const snapshot = await db.collection(name).limit(100).get();

    if (snapshot.empty) {
      console.log(`  ${colors.yellow}No documents found${colors.reset}`);
      return;
    }

    let withCampus = 0;
    let withoutCampus = 0;
    let wrongCampus = 0;
    const campusCounts: Record<string, number> = {};

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const campus = data[campusField];

      if (!campus) {
        withoutCampus++;
      } else {
        withCampus++;
        campusCounts[campus] = (campusCounts[campus] || 0) + 1;

        if (campus !== 'ub-buffalo') {
          wrongCampus++;
        }
      }
    });

    const total = snapshot.size;
    const percentage = ((withCampus / total) * 100).toFixed(1);

    console.log(`  Total sampled: ${total}`);
    console.log(`  ${colors.green}✓ With ${campusField}: ${withCampus} (${percentage}%)${colors.reset}`);

    if (withoutCampus > 0) {
      console.log(`  ${colors.red}✗ Missing ${campusField}: ${withoutCampus}${colors.reset}`);
    }

    if (wrongCampus > 0) {
      console.log(`  ${colors.yellow}⚠ Non-UB campus: ${wrongCampus}${colors.reset}`);
    }

    if (Object.keys(campusCounts).length > 0) {
      console.log('  Campus breakdown:');
      Object.entries(campusCounts).forEach(([campus, count]) => {
        const emoji = campus === 'ub-buffalo' ? '✓' : '⚠';
        console.log(`    ${emoji} ${campus}: ${count}`);
      });
    }

    // Check a subcollection if it's spaces
    if (name === 'spaces' && withCampus > 0) {
      const spaceWithCampus = snapshot.docs.find(d => d.data().campusId);
      if (spaceWithCampus) {
        const postsSnapshot = await db
          .collection('spaces')
          .doc(spaceWithCampus.id)
          .collection('posts')
          .limit(10)
          .get();

        if (!postsSnapshot.empty) {
          let postsWithCampus = 0;
          postsSnapshot.docs.forEach(doc => {
            if (doc.data().campusId) postsWithCampus++;
          });

          console.log(`  Posts in sample space:`);
          const postsPercentage = ((postsWithCampus / postsSnapshot.size) * 100).toFixed(1);
          console.log(`    ${colors.green}✓ With campusId: ${postsWithCampus}/${postsSnapshot.size} (${postsPercentage}%)${colors.reset}`);
        }
      }
    }

  } catch (error) {
    console.log(`  ${colors.red}Error: ${error}${colors.reset}`);
  }
}

async function checkDangerousQueries() {
  console.log(`\n${colors.yellow}🔍 Testing Dangerous Queries...${colors.reset}`);

  try {
    // Test collection group query
    console.log('  Testing collection group query (members)...');
    const membersSnapshot = await db.collectionGroup('members').limit(20).get();

    const spaceIds = new Set<string>();
    membersSnapshot.docs.forEach(doc => {
      const spaceId = doc.ref.parent.parent?.id;
      if (spaceId) spaceIds.add(spaceId);
    });

    let campusCount: Record<string, number> = {};
    for (const spaceId of spaceIds) {
      const space = await db.collection('spaces').doc(spaceId).get();
      if (space.exists) {
        const campus = space.data()?.campusId || 'no-campus';
        campusCount[campus] = (campusCount[campus] || 0) + 1;
      }
    }

    console.log('  Collection group results:');
    Object.entries(campusCount).forEach(([campus, count]) => {
      const color = campus === 'ub-buffalo' ? colors.green : colors.red;
      console.log(`    ${color}${campus}: ${count} spaces${colors.reset}`);
    });

    if (campusCount['no-campus']) {
      console.log(`  ${colors.red}⚠️  DANGER: Collection group returning spaces without campus!${colors.reset}`);
    }

  } catch (error) {
    console.log(`  ${colors.red}Error testing queries: ${error}${colors.reset}`);
  }
}

async function main() {
  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}    HIVE Campus ID Status Check${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);

  // Check main collections
  await checkCollection('spaces', 'campusId');
  await checkCollection('users', 'schoolId');
  await checkCollection('tools', 'campusId');
  await checkCollection('rituals', 'campusId');

  // Check dangerous queries
  await checkDangerousQueries();

  // Summary
  console.log(`\n${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.yellow}📊 Summary:${colors.reset}`);
  console.log('If you see missing campus IDs above, run:');
  console.log(`  ${colors.green}npx tsx scripts/migrate-campus-ids.ts --dry-run${colors.reset}`);
  console.log('Then if everything looks good:');
  console.log(`  ${colors.green}npx tsx scripts/migrate-campus-ids.ts --execute${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}\n`);
}

main().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});