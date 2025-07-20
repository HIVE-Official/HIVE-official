#!/usr/bin/env node

/**
 * Test script to verify nested Firebase structure is accessible
 * Tests the SPACES/[spacetype]/SPACES/spaceID structure
 */

import { dbAdmin } from '../packages/core/src/firebase-admin';

interface SpaceTestResult {
  spaceType: string;
  spaceCount: number;
  sampleSpaces: any[];
  errors: string[];
}

class NestedSpacesTest {
  private results: SpaceTestResult[] = [];

  async testAllSpaceTypes(): Promise<void> {
    console.log('🔍 Testing nested Firebase structure: SPACES/[spacetype]/SPACES/spaceID');
    
    const spaceTypes = ['student', 'university', 'residential', 'academics', 'greek_life'];
    
    for (const spaceType of spaceTypes) {
      console.log(`\n📊 Testing space type: ${spaceType}`);
      
      try {
        // Test if the space type collection exists
        const spaceTypeDoc = await dbAdmin.collection('SPACES').doc(spaceType).get();
        
        if (!spaceTypeDoc.exists) {
          console.log(`   ❌ Space type collection ${spaceType} does not exist`);
          this.results.push({
            spaceType,
            spaceCount: 0,
            sampleSpaces: [],
            errors: [`Space type collection ${spaceType} does not exist`]
          });
          continue;
        }
        
        // Test if the SPACES subcollection exists and has data
        const spacesSnapshot = await dbAdmin
          .collection('SPACES')
          .doc(spaceType)
          .collection('SPACES')
          .limit(5)
          .get();
          
        console.log(`   📋 Found ${spacesSnapshot.size} spaces in ${spaceType}`);
        
        const sampleSpaces = spacesSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || 'No name',
          schoolId: doc.data().schoolId || 'No school',
          status: doc.data().status || 'No status',
          memberCount: doc.data().memberCount || 0,
        }));
        
        // Display sample spaces
        if (sampleSpaces.length > 0) {
          console.log(`   📝 Sample spaces:`);
          sampleSpaces.forEach(space => {
            console.log(`      - ${space.name} (${space.id}) - ${space.memberCount} members`);
          });
        } else {
          console.log(`   📝 No spaces found in ${spaceType}`);
        }
        
        this.results.push({
          spaceType,
          spaceCount: spacesSnapshot.size,
          sampleSpaces,
          errors: []
        });
        
      } catch (error) {
        console.error(`   ❌ Error testing ${spaceType}:`, error);
        this.results.push({
          spaceType,
          spaceCount: 0,
          sampleSpaces: [],
          errors: [`Error testing ${spaceType}: ${error}`]
        });
      }
    }
  }

  async testSpecificSpace(spaceType: string, spaceId: string): Promise<void> {
    console.log(`\n🔍 Testing specific space: ${spaceType}/${spaceId}`);
    
    try {
      const spaceDoc = await dbAdmin
        .collection('SPACES')
        .doc(spaceType)
        .collection('SPACES')
        .doc(spaceId)
        .get();
        
      if (spaceDoc.exists) {
        const spaceData = spaceDoc.data();
        console.log(`   ✅ Space found: ${spaceData?.name || 'No name'}`);
        console.log(`   📊 Data:`, JSON.stringify(spaceData, null, 2));
        
        // Test members subcollection
        const membersSnapshot = await dbAdmin
          .collection('SPACES')
          .doc(spaceType)
          .collection('SPACES')
          .doc(spaceId)
          .collection('members')
          .limit(3)
          .get();
          
        console.log(`   👥 Members: ${membersSnapshot.size}`);
        
      } else {
        console.log(`   ❌ Space not found: ${spaceType}/${spaceId}`);
      }
      
    } catch (error) {
      console.error(`   ❌ Error testing specific space:`, error);
    }
  }

  async testCollectionStructure(): Promise<void> {
    console.log('\n🏗️ Testing collection structure...');
    
    try {
      // Test if SPACES collection exists
      const spacesCollection = await dbAdmin.collection('SPACES').listDocuments();
      console.log(`   📋 SPACES collection has ${spacesCollection.length} documents`);
      
      for (const doc of spacesCollection) {
        console.log(`   📁 Found space type: ${doc.id}`);
      }
      
    } catch (error) {
      console.error('   ❌ Error testing collection structure:', error);
    }
  }

  printSummary(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 NESTED SPACES TEST SUMMARY');
    console.log('='.repeat(60));
    
    let totalSpaces = 0;
    let workingTypes = 0;
    let errorTypes = 0;
    
    for (const result of this.results) {
      totalSpaces += result.spaceCount;
      
      if (result.errors.length === 0 && result.spaceCount > 0) {
        workingTypes++;
        console.log(`✅ ${result.spaceType}: ${result.spaceCount} spaces`);
      } else if (result.errors.length === 0 && result.spaceCount === 0) {
        console.log(`⚠️  ${result.spaceType}: 0 spaces (empty collection)`);
      } else {
        errorTypes++;
        console.log(`❌ ${result.spaceType}: ${result.errors.join(', ')}`);
      }
    }
    
    console.log(`\n📊 TOTALS:`);
    console.log(`   Total Spaces: ${totalSpaces}`);
    console.log(`   Working Types: ${workingTypes}/5`);
    console.log(`   Error Types: ${errorTypes}/5`);
    
    if (totalSpaces > 0) {
      console.log(`\n✅ SUCCESS: Found ${totalSpaces} spaces in nested structure!`);
    } else {
      console.log(`\n❌ ISSUE: No spaces found in nested structure`);
    }
    
    console.log('\n' + '='.repeat(60));
  }
}

async function main() {
  try {
    console.log('🚀 Testing nested Firebase structure...');
    
    const tester = new NestedSpacesTest();
    
    // Test collection structure
    await tester.testCollectionStructure();
    
    // Test all space types
    await tester.testAllSpaceTypes();
    
    // Test a specific space if we want to dive deeper
    // await tester.testSpecificSpace('academics', 'some-space-id');
    
    tester.printSummary();
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}