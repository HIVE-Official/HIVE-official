/**
 * Detect any fake/mock data in Firebase spaces
 * Run with: node apps/web/scripts/detect-fake-data.js
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

async function detectFakeData() {
  const _app = initializeFirebase();
  const db = admin.firestore();
  
  console.log('🔍 DETECTING FAKE/MOCK DATA IN FIREBASE');
  console.log('═'.repeat(60));
  
  const suspiciousPatterns = [
    // Generic/placeholder descriptions
    'lorem ipsum',
    'test space',
    'sample space',
    'demo space',
    'example space',
    'mock space',
    'fake space',
    'placeholder',
    'coming soon',
    'tbd',
    'to be determined',
    'description goes here',
    'your description here',
    
    // Generic repeated descriptions
    'university committees focused on campus-wide initiatives and support',
    'university services focused on campus-wide initiatives and support',
    'university programs focused on campus-wide initiatives and support',
    
    // Test/development patterns
    'test-',
    'demo-',
    'sample-',
    'mock-',
    'fake-',
    
    // Duplicate detection patterns
    'upper hall',
    'lower hall',
    'north commons',
    'south commons',
    'east commons',
    'west commons'
  ];
  
  const spaceTypes = [
    'student_organizations',
    'fraternity_and_sorority',
    'campus_living',
    'university_organizations'
  ];
  
  const findings = {
    duplicates: [],
    genericDescriptions: [],
    suspiciousNames: [],
    emptyData: [],
    testData: []
  };
  
  // Track names for duplicate detection
  const nameTracker = {};
  
  for (const spaceType of spaceTypes) {
    console.log(`\n📁 Checking: /spaces/${spaceType}/spaces`);
    console.log('─'.repeat(60));
    
    try {
      const spacesSnapshot = await db
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
      
      console.log(`Analyzing ${spacesSnapshot.size} spaces...`);
      
      for (const doc of spacesSnapshot.docs) {
        const data = doc.data();
        const name = data.name || '';
        const description = data.description || '';
        const nameLower = name.toLowerCase();
        const descLower = description.toLowerCase();
        
        // Check for duplicates
        if (nameTracker[nameLower]) {
          findings.duplicates.push({
            name: name,
            locations: [
              `${nameTracker[nameLower].type}/${nameTracker[nameLower].id}`,
              `${spaceType}/${doc.id}`
            ]
          });
        } else {
          nameTracker[nameLower] = { type: spaceType, id: doc.id };
        }
        
        // Check for generic/repeated descriptions
        if (description && (
          description === 'University committees focused on campus-wide initiatives and support.' ||
          description === 'University services focused on campus-wide initiatives and support.' ||
          description === 'University programs focused on campus-wide initiatives and support.'
        )) {
          findings.genericDescriptions.push({
            id: doc.id,
            name: name,
            type: spaceType,
            description: description.substring(0, 50) + '...'
          });
        }
        
        // Check for suspicious patterns
        for (const pattern of suspiciousPatterns) {
          if (nameLower.includes(pattern) || descLower.includes(pattern)) {
            findings.suspiciousNames.push({
              id: doc.id,
              name: name,
              type: spaceType,
              pattern: pattern,
              field: nameLower.includes(pattern) ? 'name' : 'description'
            });
            break;
          }
        }
        
        // Check for empty/minimal data
        if (!name || !description || description.length < 10) {
          findings.emptyData.push({
            id: doc.id,
            name: name || '[NO NAME]',
            type: spaceType,
            issue: !name ? 'no name' : 'minimal description'
          });
        }
        
        // Check for test data patterns
        if (doc.id.startsWith('test-') || doc.id.startsWith('mock-') || 
            nameLower.includes('test') || nameLower.includes('mock')) {
          findings.testData.push({
            id: doc.id,
            name: name,
            type: spaceType
          });
        }
      }
    } catch (error) {
      console.error(`Error checking ${spaceType}:`, error.message);
    }
  }
  
  // Report findings
  console.log('\n\n📊 ANALYSIS RESULTS');
  console.log('═'.repeat(60));
  
  console.log('\n🔄 DUPLICATE SPACES:');
  if (findings.duplicates.length > 0) {
    findings.duplicates.forEach(dup => {
      console.log(`  ⚠️  "${dup.name}" appears in:`);
      dup.locations.forEach(loc => console.log(`      - ${loc}`));
    });
  } else {
    console.log('  ✅ No exact duplicates found');
  }
  
  console.log('\n📝 GENERIC/REPEATED DESCRIPTIONS:');
  if (findings.genericDescriptions.length > 0) {
    console.log(`  ⚠️  Found ${findings.genericDescriptions.length} spaces with generic descriptions`);
    // Group by description
    const grouped = {};
    findings.genericDescriptions.forEach(item => {
      const desc = item.description;
      if (!grouped[desc]) grouped[desc] = [];
      grouped[desc].push(item.name);
    });
    
    Object.entries(grouped).forEach(([desc, names]) => {
      console.log(`\n  Description: "${desc}"`);
      console.log(`  Used by ${names.length} spaces:`);
      names.slice(0, 5).forEach(name => console.log(`    - ${name}`));
      if (names.length > 5) console.log(`    ... and ${names.length - 5} more`);
    });
  } else {
    console.log('  ✅ No generic descriptions found');
  }
  
  console.log('\n🚨 SUSPICIOUS PATTERNS:');
  if (findings.suspiciousNames.length > 0) {
    // Group by pattern
    const byPattern = {};
    findings.suspiciousNames.forEach(item => {
      if (!byPattern[item.pattern]) byPattern[item.pattern] = [];
      byPattern[item.pattern].push(item);
    });
    
    Object.entries(byPattern).forEach(([pattern, items]) => {
      console.log(`\n  Pattern "${pattern}" found in ${items.length} spaces:`);
      items.slice(0, 3).forEach(item => {
        console.log(`    - ${item.name} (${item.type}) - in ${item.field}`);
      });
      if (items.length > 3) console.log(`    ... and ${items.length - 3} more`);
    });
  } else {
    console.log('  ✅ No suspicious patterns found');
  }
  
  console.log('\n📭 EMPTY/MINIMAL DATA:');
  if (findings.emptyData.length > 0) {
    console.log(`  ⚠️  Found ${findings.emptyData.length} spaces with missing/minimal data`);
    findings.emptyData.slice(0, 5).forEach(item => {
      console.log(`    - ${item.name} (${item.type}): ${item.issue}`);
    });
    if (findings.emptyData.length > 5) {
      console.log(`    ... and ${findings.emptyData.length - 5} more`);
    }
  } else {
    console.log('  ✅ All spaces have adequate data');
  }
  
  console.log('\n🧪 TEST DATA:');
  if (findings.testData.length > 0) {
    console.log(`  ⚠️  Found ${findings.testData.length} potential test spaces:`);
    findings.testData.forEach(item => {
      console.log(`    - ${item.name} (${item.type}/${item.id})`);
    });
  } else {
    console.log('  ✅ No obvious test data found');
  }
  
  // Summary
  console.log('\n\n📈 SUMMARY');
  console.log('═'.repeat(60));
  const totalIssues = 
    findings.duplicates.length + 
    findings.genericDescriptions.length + 
    findings.suspiciousNames.length +
    findings.emptyData.length +
    findings.testData.length;
    
  if (totalIssues === 0) {
    console.log('✅ No fake or problematic data detected!');
  } else {
    console.log(`⚠️  Found ${totalIssues} potential issues:`);
    console.log(`  - ${findings.duplicates.length} duplicates`);
    console.log(`  - ${findings.genericDescriptions.length} generic descriptions`);
    console.log(`  - ${findings.suspiciousNames.length} suspicious patterns`);
    console.log(`  - ${findings.emptyData.length} empty/minimal data`);
    console.log(`  - ${findings.testData.length} test data`);
    
    console.log('\nMost concerning findings:');
    if (findings.genericDescriptions.length > 10) {
      console.log('  🔴 Many university organizations have identical generic descriptions');
    }
    if (findings.duplicates.length > 0) {
      console.log('  🟡 Some organizations appear multiple times');
    }
  }
}

// Run the detection
detectFakeData()
  .then(() => {
    console.log('\n✅ Analysis complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Analysis failed:', error);
    process.exit(1);
  });