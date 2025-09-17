/**
 * TypeScript script to add schoolId: "ub" to all existing spaces in Firestore
 * Run with: npx tsx scripts/update-spaces-school-id.ts
 */

import { dbAdmin } from '../apps/web/src/lib/firebase-admin';
import { logger } from '@hive/core';

async function updateSpacesWithSchoolId() {
  const spaceTypes = ["major", "residential", "interest", "creative", "organization"];
  let totalUpdated = 0;

  console.log('🔧 Starting to update spaces with schoolId: "ub"...\n');

  for (const type of spaceTypes) {
    console.log(`📁 Processing ${type} spaces...`);
    
    try {
      const spacesRef = dbAdmin.collection("spaces").doc(type).collection("spaces");
      const snapshot = await spacesRef.get();
      
      console.log(`   Found ${snapshot.size} spaces in ${type} collection`);
      
      if (snapshot.empty) {
        console.log(`   ⚠️  No spaces found in ${type} collection\n`);
        continue;
      }

      let updatedInType = 0;

      for (const doc of snapshot.docs) {
        const spaceData = doc.data();
        
        // Check if schoolId already exists
        if (!spaceData.schoolId) {
          try {
            // Update the space with schoolId
            await doc.ref.update({ 
              schoolId: "ub",
              updatedAt: new Date()
            });
            
            updatedInType++;
            console.log(`   ✅ Updated: ${spaceData.name || doc.id}`);
            
          } catch (updateError) {
            console.error(`   ❌ Failed to update ${doc.id}:`, updateError);
          }
        } else {
          console.log(`   ⏭️  Space already has schoolId: ${spaceData.name || doc.id} (${spaceData.schoolId})`);
        }
      }

      console.log(`   🎉 Successfully updated ${updatedInType} spaces in ${type} collection`);
      totalUpdated += updatedInType;
      console.log(''); // Empty line for readability
      
    } catch (error) {
      console.error(`❌ Error processing ${type} spaces:`, error);
    }
  }

  console.log(`\n🎊 Migration complete! Updated ${totalUpdated} spaces total.`);
  
  // Verify the updates
  console.log('\n🔍 Verifying updates...');
  await verifyUpdates();
}

async function verifyUpdates() {
  const spaceTypes = ["major", "residential", "interest", "creative", "organization"];
  
  for (const type of spaceTypes) {
    try {
      const spacesRef = dbAdmin.collection("spaces").doc(type).collection("spaces");
      const snapshot = await spacesRef.where("schoolId", "==", "ub").get();
      
      console.log(`   ✅ ${type}: ${snapshot.size} spaces now have schoolId: "ub"`);
      
      // Show some sample space names
      if (snapshot.size > 0) {
        const sampleSpaces = snapshot.docs.slice(0, 3).map(doc => doc.data().name || doc.id);
        console.log(`      Sample spaces: ${sampleSpaces.join(', ')}`);
      }
      
    } catch (error) {
      console.error(`❌ Error verifying ${type}:`, error);
    }
  }
}

// Run the migration
if (require.main === module) {
  updateSpacesWithSchoolId()
    .then(() => {
      console.log('\n✨ All done! You can now test the space claiming feature.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    });
}