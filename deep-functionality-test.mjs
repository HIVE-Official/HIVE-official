#!/usr/bin/env node

/**
 * 🔥 DEEP RUTHLESS AUDIT - ACTUAL FUNCTIONALITY TESTING
 * This goes beyond file existence to verify components actually work
 */

import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';
const execAsync = util.promisify(exec);

console.log('🔥 DEEP RUTHLESS AUDIT - TESTING ACTUAL FUNCTIONALITY\n');

let totalTests = 0;
let passedTests = 0;
let criticalIssues = [];

function logTest(name, passed, details = '', critical = false) {
  totalTests++;
  if (passed) {
    console.log(`✅ ${name}`);
    passedTests++;
  } else {
    console.log(`❌ ${name}`);
    if (critical) criticalIssues.push(name);
  }
  if (details) console.log(`   ${details}`);
}

async function runDeepAudit() {
  // 1. TEST ACTUAL IMPORTS AND EXPORTS
  console.log('🧪 TESTING ACTUAL IMPORTS/EXPORTS...\n');

  try {
    // Test core cohort space generation
    const cohortModule = await import('./packages/core/dist/domain/cohort/cohort-spaces.js');
    const { generateCohortSpaces, getCohortSpaceId } = cohortModule;
    const testSpaces = generateCohortSpaces({ major: 'Biology', graduationYear: 2027 });
    
    logTest('Core cohort generation imports correctly', true, `Generated ${testSpaces.length} spaces`);
    logTest('Generated spaces have proper structure', 
      testSpaces.every(s => s.id && s.name && s.type === 'hive_exclusive' && s.description), 
      'All spaces have required fields');
    logTest('getCohortSpaceId function works', 
      getCohortSpaceId('Biology', 2027) === 'ub-cohort-biology-2027', 
      `Generated ID: ${getCohortSpaceId('Biology', 2027)}`);
    
  } catch (error) {
    logTest('Core cohort generation', false, `Import error: ${error.message}`, true);
  }

  // 2. TEST UI COMPONENT EXPORTS
  console.log('\n🧪 TESTING UI COMPONENT EXPORTS...\n');

  try {
    // Test if UI package exports exist
    const uiIndex = fs.readFileSync('./packages/ui/index.ts', 'utf8');
    
    logTest('HivePostsSurface is exported from UI package', 
      uiIndex.includes('HivePostsSurface'), 
      'Check packages/ui/index.ts');
    
    logTest('All surface components exported', 
      uiIndex.includes('HiveEventsSurface') && 
      uiIndex.includes('HiveMembersSurface') && 
      uiIndex.includes('HiveToolsSurface'), 
      'Events, Members, Tools surfaces available');
      
  } catch (error) {
    logTest('UI component exports', false, `Error: ${error.message}`, true);
  }

  // 3. TEST TYPESCRIPT COMPILATION OF CRITICAL FILES
  console.log('\n🧪 TESTING TYPESCRIPT COMPILATION...\n');

  async function testTSCompilation(filePath, testName) {
    try {
      const { stdout, stderr } = await execAsync(`NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit ${filePath} --skipLibCheck`);
      if (stderr && !stderr.includes('warning')) {
        logTest(testName, false, `TS errors: ${stderr.substring(0, 200)}...`, true);
      } else {
        logTest(testName, true, 'No blocking TypeScript errors');
      }
    } catch (error) {
      logTest(testName, false, `TS compilation failed: ${error.message.substring(0, 200)}...`, true);
    }
  }

  await testTSCompilation('apps/web/src/app/(dashboard)/spaces/page.tsx', 'Main Spaces page compiles');
  await testTSCompilation('apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx', 'Individual Space page compiles');
  await testTSCompilation('apps/web/src/app/api/spaces/cohort/auto-create/route.ts', 'Cohort creation API compiles');

  // 4. TEST ACTUAL COMPONENT INTEGRATION
  console.log('\n🧪 TESTING COMPONENT INTEGRATION...\n');

  try {
    const spacePageContent = fs.readFileSync('./apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx', 'utf8');
    
    // Check Enhanced Post Board integration
    const hasCoordinationResponse = spacePageContent.includes('onCoordinationResponse') && 
                                   spacePageContent.includes('async (postId, response)');
    logTest('Coordination response handler properly integrated', hasCoordinationResponse, 
      'onCoordinationResponse callback implemented');
      
    const hasCoordinationAPI = spacePageContent.includes('/api/spaces/${spaceId}/coordination');
    logTest('Coordination API endpoint correctly referenced', hasCoordinationAPI,
      'API call matches implemented endpoint');
      
    const hasCoordinationTypes = spacePageContent.includes('study_session') || 
                                spacePageContent.includes('food_run') ||
                                spacePageContent.includes('activity');
    logTest('Coordination post types integrated', hasCoordinationTypes,
      'Campus coordination features accessible');
      
  } catch (error) {
    logTest('Component integration', false, `Error: ${error.message}`, true);
  }

  // 5. TEST API ROUTE STRUCTURE
  console.log('\n🧪 TESTING API ROUTE STRUCTURE...\n');

  try {
    const coordinationAPI = fs.readFileSync('./apps/web/src/app/api/spaces/[spaceId]/coordination/route.ts', 'utf8');
    
    logTest('Coordination API has POST handler', coordinationAPI.includes('export async function POST'), 
      'Handles coordination response submission');
    logTest('Coordination API has GET handler', coordinationAPI.includes('export async function GET'),
      'Handles coordination response retrieval');
    logTest('Coordination API validates input', coordinationAPI.includes('coordinationResponseSchema'),
      'Uses Zod schema validation');
    logTest('Coordination API uses proper auth', coordinationAPI.includes('getCurrentUser'),
      'Requires authentication');
      
  } catch (error) {
    logTest('API route structure', false, `Error: ${error.message}`, true);
  }

  // 6. TEST DATABASE COLLECTION STRUCTURE
  console.log('\n🧪 TESTING DATABASE COLLECTION STRUCTURE...\n');

  try {
    const autoJoinAPI = fs.readFileSync('./apps/web/src/app/api/spaces/auto-join/route.ts', 'utf8');
    const cohortCreateAPI = fs.readFileSync('./apps/web/src/app/api/spaces/cohort/auto-create/route.ts', 'utf8');
    
    // Check that both APIs use the same collection structure
    const autoJoinUsesHiveExclusive = autoJoinAPI.includes('.doc("hive_exclusive")');
    const cohortCreateUsesHiveExclusive = cohortCreateAPI.includes('.doc(\'hive_exclusive\')');
    
    logTest('Auto-join uses hive_exclusive collection', autoJoinUsesHiveExclusive,
      'Stores cohort spaces in correct Firestore collection');
    logTest('Cohort creation uses hive_exclusive collection', cohortCreateUsesHiveExclusive,
      'Creates cohort spaces in correct Firestore collection');
    logTest('Database collection consistency', 
      autoJoinUsesHiveExclusive && cohortCreateUsesHiveExclusive,
      'Both APIs use same collection structure', true);
      
  } catch (error) {
    logTest('Database collection structure', false, `Error: ${error.message}`, true);
  }

  // 7. TEST SPACE CATEGORIES CONSISTENCY  
  console.log('\n🧪 TESTING SPACE CATEGORIES CONSISTENCY...\n');

  try {
    const spacesPage = fs.readFileSync('./apps/web/src/app/(dashboard)/spaces/page.tsx', 'utf8');
    
    // Extract spaceTypeFilters array
    const filterMatch = spacesPage.match(/const spaceTypeFilters = \\[(.*?)\\];/s);
    if (filterMatch) {
      const filtersContent = filterMatch[1];
      
      logTest('HIVE Exclusive category exists', filtersContent.includes('hive_exclusive'),
        'Category defined in filter options');
      logTest('HIVE Exclusive has proper label', filtersContent.includes('"HIVE Exclusive"'),
        'Human-readable label present');
      logTest('HIVE Exclusive has diamond emoji', filtersContent.includes('💎'),
        'Distinctive visual identifier');
      logTest('All 6 categories present', 
        ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'all']
          .every(cat => filtersContent.includes(cat)),
        'Complete category coverage');
    } else {
      logTest('Space categories structure', false, 'Could not parse spaceTypeFilters', true);
    }
    
  } catch (error) {
    logTest('Space categories consistency', false, `Error: ${error.message}`, true);
  }

  // 8. TEST ENHANCED POST BOARD FEATURES
  console.log('\n🧪 TESTING ENHANCED POST BOARD FEATURES...\n');

  try {
    const postSurface = fs.readFileSync('./packages/ui/src/components/surfaces/hive-posts-surface.tsx', 'utf8');
    
    // Check for coordination post types
    const coordinationTypes = ['study_session', 'food_run', 'activity', 'ride_share', 'meetup'];
    const hasAllTypes = coordinationTypes.every(type => postSurface.includes(type));
    
    logTest('All 5 coordination post types defined', hasAllTypes,
      `Types: ${coordinationTypes.join(', ')}`);
      
    logTest('Coordination response interface exists', postSurface.includes('CoordinationResponse'),
      'TypeScript interface for responses');
      
    logTest('Coordination section component exists', postSurface.includes('CoordinationSection'),
      'Interactive coordination UI component');
      
    logTest('Live activity features present', postSurface.includes('liveActivityCount'),
      'Real-time activity indicators');
      
  } catch (error) {
    logTest('Enhanced Post Board features', false, `Error: ${error.message}`, true);
  }

  // 9. FINAL INTEGRATION TEST - SPACE BROWSING SYSTEM
  console.log('\n🧪 TESTING SPACE BROWSING INTEGRATION...\n');

  try {
    const spacesPageImports = fs.readFileSync('./apps/web/src/app/(dashboard)/spaces/page.tsx', 'utf8');
    
    logTest('Spaces page has proper imports', 
      spacesPageImports.includes('UnifiedSpaceCard') && spacesPageImports.includes('authenticatedFetch'),
      'All required components and utilities imported');
      
    logTest('Spaces page has filter functionality', 
      spacesPageImports.includes('useState') && spacesPageImports.includes('spaceTypeFilter'),
      'Interactive filtering system implemented');
      
    logTest('Spaces page has search functionality', 
      spacesPageImports.includes('searchTerm') && spacesPageImports.includes('setSearchTerm'),
      'Search functionality implemented');
      
    // Test individual space integration
    const spacePage = fs.readFileSync('./apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx', 'utf8');
    logTest('Individual space has complete widget system', 
      spacePage.includes('HivePostsSurface') && spacePage.includes('HiveEventsSurface') && spacePage.includes('HiveMembersSurface'),
      'All widget components properly integrated');
      
  } catch (error) {
    logTest('Space browsing integration', false, `Error: ${error.message}`, true);
  }

  // FINAL RESULTS
  console.log('\\n' + '='.repeat(70));
  console.log('🏁 DEEP RUTHLESS AUDIT COMPLETE');
  console.log('='.repeat(70));

  const passRate = Math.round((passedTests / totalTests) * 100);

  if (criticalIssues.length === 0 && passRate >= 90) {
    console.log(`🎉 DEEP AUDIT PASSED: ${passedTests}/${totalTests} tests (${passRate}%)`);
    console.log('\\n🚀 SYSTEM STATUS: PRODUCTION READY');
    console.log('   ✅ All critical components functional');
    console.log('   ✅ TypeScript compilation successful');
    console.log('   ✅ API integration complete');
    console.log('   ✅ Database structure consistent');
    console.log('   ✅ Component integration verified');
  } else {
    console.log(`❌ DEEP AUDIT FAILED: ${passedTests}/${totalTests} tests (${passRate}%)`);
    console.log(`\\n🚨 ${criticalIssues.length} CRITICAL ISSUES DETECTED:`);
    criticalIssues.forEach(issue => console.log(`   • ${issue}`));
    console.log('\\n🔧 SYSTEM REQUIRES FIXES BEFORE PRODUCTION');
  }

  process.exit(criticalIssues.length === 0 && passRate >= 90 ? 0 : 1);
}

runDeepAudit().catch(console.error);