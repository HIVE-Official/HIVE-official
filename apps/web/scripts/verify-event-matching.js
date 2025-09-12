/**
 * Verify RSS events are going to the correct spaces
 * Run with: node apps/web/scripts/verify-event-matching.js
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
    }

    const _app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

async function verifyEventMatching() {
  const _app = initializeFirebase();
  const db = admin.firestore();
  
  console.log('🔍 VERIFYING RSS EVENT MATCHING');
  console.log('═'.repeat(70));
  console.log('Checking if events are going to the correct spaces...\n');
  
  const mismatches = [];
  const correctMatches = [];
  const eventSamples = [];
  
  // Check all space types
  const spaceTypes = [
    'student_organizations',
    'fraternity_and_sorority',
    'campus_living',
    'university_organizations'
  ];
  
  for (const spaceType of spaceTypes) {
    try {
      const spacesSnapshot = await db
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
      
      for (const spaceDoc of spacesSnapshot.docs) {
        const spaceData = spaceDoc.data();
        const spaceName = spaceData.name;
        
        // Check events in this space
        const eventsSnapshot = await db
          .collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .doc(spaceDoc.id)
          .collection('events')
          .where('isFromRSS', '==', true)
          .limit(10)
          .get();
        
        if (!eventsSnapshot.empty) {
          console.log(`\n📁 Space: ${spaceName} (${spaceType})`);
          console.log(`   Found ${eventsSnapshot.size} RSS events`);
          console.log('   Sample events:');
          
          eventsSnapshot.docs.forEach(eventDoc => {
            const eventData = eventDoc.data();
            const eventTitle = eventData.title;
            const eventOrganizer = eventData.organizer || 'Unknown';
            
            console.log(`   - "${eventTitle.substring(0, 50)}..."`);
            console.log(`     Organizer: ${eventOrganizer}`);
            
            // Check if this looks like a match
            const spaceNameLower = spaceName.toLowerCase();
            const organizerLower = eventOrganizer.toLowerCase();
            const titleLower = eventTitle.toLowerCase();
            
            let matchReason = '';
            let isGoodMatch = false;
            
            // Check various matching criteria
            if (organizerLower.includes(spaceNameLower) || spaceNameLower.includes(organizerLower)) {
              matchReason = 'Organizer matches space name';
              isGoodMatch = true;
            } else if (titleLower.includes(spaceNameLower)) {
              matchReason = 'Space name in event title';
              isGoodMatch = true;
            } else {
              matchReason = '⚠️  POSSIBLE MISMATCH - No clear connection';
              mismatches.push({
                space: spaceName,
                event: eventTitle,
                organizer: eventOrganizer,
                reason: 'No clear connection between space and event'
              });
            }
            
            console.log(`     Match: ${matchReason}`);
            
            if (eventSamples.length < 20) {
              eventSamples.push({
                space: spaceName,
                spaceType: spaceType,
                event: eventTitle,
                organizer: eventOrganizer,
                matchReason: matchReason,
                isGoodMatch: isGoodMatch
              });
            }
          });
        }
      }
    } catch (error) {
      console.error(`Error checking ${spaceType}:`, error.message);
    }
  }
  
  // Summary report
  console.log('\n\n📊 MATCHING ANALYSIS');
  console.log('═'.repeat(70));
  
  if (mismatches.length > 0) {
    console.log('\n❌ POTENTIAL MISMATCHES FOUND:');
    console.log('These events may be in the wrong spaces:\n');
    
    mismatches.slice(0, 10).forEach((mismatch, index) => {
      console.log(`${index + 1}. Event: "${mismatch.event.substring(0, 50)}..."`);
      console.log(`   In Space: ${mismatch.space}`);
      console.log(`   Organizer: ${mismatch.organizer}`);
      console.log(`   Issue: ${mismatch.reason}`);
      console.log('');
    });
    
    if (mismatches.length > 10) {
      console.log(`... and ${mismatches.length - 10} more potential mismatches`);
    }
  }
  
  console.log('\n📋 SAMPLE EVENT ASSIGNMENTS:');
  console.log('Showing how events were matched to spaces:\n');
  
  const goodMatches = eventSamples.filter(s => s.isGoodMatch);
  const badMatches = eventSamples.filter(s => !s.isGoodMatch);
  
  if (goodMatches.length > 0) {
    console.log('✅ GOOD MATCHES:');
    goodMatches.slice(0, 5).forEach(sample => {
      console.log(`• "${sample.event.substring(0, 40)}..." → ${sample.space}`);
      console.log(`  Reason: ${sample.matchReason}`);
    });
  }
  
  if (badMatches.length > 0) {
    console.log('\n⚠️  QUESTIONABLE MATCHES:');
    badMatches.slice(0, 5).forEach(sample => {
      console.log(`• "${sample.event.substring(0, 40)}..." → ${sample.space}`);
      console.log(`  Organizer: ${sample.organizer}`);
      console.log(`  Issue: ${sample.matchReason}`);
    });
  }
  
  // Overall statistics
  const totalSamples = eventSamples.length;
  const goodMatchCount = goodMatches.length;
  const badMatchCount = badMatches.length;
  const matchRate = totalSamples > 0 ? (goodMatchCount / totalSamples * 100).toFixed(1) : 0;
  
  console.log('\n\n📈 OVERALL STATISTICS:');
  console.log('═'.repeat(70));
  console.log(`Total Events Checked: ${totalSamples}`);
  console.log(`Good Matches: ${goodMatchCount} (${matchRate}%)`);
  console.log(`Questionable Matches: ${badMatchCount}`);
  
  if (badMatchCount > goodMatchCount) {
    console.log('\n🚨 WARNING: The matching algorithm appears to be incorrect!');
    console.log('Most events are NOT going to the right spaces.');
    console.log('The matching logic needs to be fixed to properly parse organizer info from RSS.');
  } else if (badMatchCount > 0) {
    console.log('\n⚠️  Some events may be mismatched. Review the matching algorithm.');
  } else {
    console.log('\n✅ Events appear to be correctly matched to their spaces!');
  }
}

// Run verification
verifyEventMatching()
  .then(() => {
    console.log('\n✅ Verification complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Verification failed:', error);
    process.exit(1);
  });