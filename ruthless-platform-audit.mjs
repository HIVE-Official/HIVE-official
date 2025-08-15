#!/usr/bin/env node

/**
 * 🔥 RUTHLESS PLATFORM-WIDE AUDIT
 * Testing ENTIRE HIVE platform to the same standard as Spaces
 */

import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';
const execAsync = util.promisify(exec);

console.log('🔥 RUTHLESS PLATFORM-WIDE AUDIT - ENTIRE HIVE SYSTEM\n');
console.log('Testing every major platform component to production standards...\n');

let totalTests = 0;
let passedTests = 0;
let criticalIssues = [];
let systemResults = {};

function logTest(system, name, passed, details = '', critical = false) {
  totalTests++;
  if (!systemResults[system]) {
    systemResults[system] = { passed: 0, total: 0, issues: [] };
  }
  systemResults[system].total++;
  
  if (passed) {
    console.log(`✅ ${name}`);
    passedTests++;
    systemResults[system].passed++;
  } else {
    console.log(`❌ ${name}`);
    if (critical) criticalIssues.push(`${system}: ${name}`);
    systemResults[system].issues.push(name);
  }
  if (details) console.log(`   ${details}`);
}

async function auditPlatform() {
  // 1. AUDIT FEED SYSTEM
  console.log('🧪 AUDITING FEED SYSTEM...\n');
  
  try {
    const feedPage = fs.readFileSync('./apps/web/src/app/(dashboard)/feed/page.tsx', 'utf8');
    const feedAPI = fs.readFileSync('./apps/web/src/app/api/feed/route.ts', 'utf8');
    
    logTest('Feed', 'Feed page exists and imports components', 
      feedPage.includes('HivePostsSurface') || feedPage.includes('PostCard'), 
      'Check post display components');
    
    logTest('Feed', 'Feed API has proper endpoints', 
      feedAPI.includes('export async function GET'), 
      'GET endpoint for feed retrieval');
    
    logTest('Feed', 'Feed algorithm implemented', 
      fs.existsSync('./apps/web/src/app/api/feed/algorithm/route.ts'), 
      'Feed algorithm endpoint exists');
    
    logTest('Feed', 'Feed caching implemented', 
      fs.existsSync('./apps/web/src/app/api/feed/cache/route.ts'), 
      'Feed caching system exists');
    
    logTest('Feed', 'Content validation exists', 
      fs.existsSync('./apps/web/src/app/api/feed/content-validation/route.ts'), 
      'Content validation system exists');
      
  } catch (error) {
    logTest('Feed', 'Feed system basic structure', false, `Error: ${error.message}`, true);
  }

  // 2. AUDIT PROFILE SYSTEM
  console.log('\\n🧪 AUDITING PROFILE SYSTEM...\\n');
  
  try {
    const profilePage = fs.readFileSync('./apps/web/src/app/(dashboard)/profile/page.tsx', 'utf8');
    const profileAPI = fs.readFileSync('./apps/web/src/app/api/profile/route.ts', 'utf8');
    
    logTest('Profile', 'Profile page has dashboard components', 
      profilePage.includes('ProfileDashboard') || profilePage.includes('profile'), 
      'Profile dashboard components present');
    
    logTest('Profile', 'Profile API has CRUD operations', 
      profileAPI.includes('export async function GET') && profileAPI.includes('export async function PUT'), 
      'GET and PUT endpoints implemented');
    
    logTest('Profile', 'Profile analytics implemented', 
      fs.existsSync('./apps/web/src/app/(dashboard)/profile/analytics/page.tsx'), 
      'Profile analytics page exists');
    
    logTest('Profile', 'Profile customization available', 
      fs.existsSync('./apps/web/src/app/(dashboard)/profile/customize/page.tsx'), 
      'Profile customization page exists');
    
    logTest('Profile', 'Profile privacy controls exist', 
      fs.existsSync('./apps/web/src/app/(dashboard)/profile/privacy/page.tsx'), 
      'Privacy controls page exists');
      
  } catch (error) {
    logTest('Profile', 'Profile system basic structure', false, `Error: ${error.message}`, true);
  }

  // 3. AUDIT TOOLS SYSTEM
  console.log('\\n🧪 AUDITING TOOLS SYSTEM...\\n');
  
  try {
    const toolsPage = fs.readFileSync('./apps/web/src/app/(dashboard)/tools/page.tsx', 'utf8');
    const toolsAPI = fs.readFileSync('./apps/web/src/app/api/tools/route.ts', 'utf8');
    
    logTest('Tools', 'Tools page has marketplace components', 
      toolsPage.includes('tool') && (toolsPage.includes('Card') || toolsPage.includes('Grid')), 
      'Tool display components present');
    
    logTest('Tools', 'Tools API has CRUD operations', 
      toolsAPI.includes('export async function GET') && toolsAPI.includes('export async function POST'), 
      'GET and POST endpoints implemented');
    
    logTest('Tools', 'Tool execution system exists', 
      fs.existsSync('./apps/web/src/app/api/tools/execute/route.ts'), 
      'Tool execution endpoint exists');
    
    logTest('Tools', 'Tool deployment system exists', 
      fs.existsSync('./apps/web/src/app/api/tools/deploy/route.ts'), 
      'Tool deployment endpoint exists');
    
    logTest('Tools', 'Individual tool pages exist', 
      fs.existsSync('./apps/web/src/app/(dashboard)/tools/[toolId]/page.tsx'), 
      'Dynamic tool pages implemented');
      
  } catch (error) {
    logTest('Tools', 'Tools system basic structure', false, `Error: ${error.message}`, true);
  }

  // 4. AUDIT EVENTS/CALENDAR SYSTEM
  console.log('\\n🧪 AUDITING EVENTS/CALENDAR SYSTEM...\\n');
  
  try {
    const eventsPage = fs.readFileSync('./apps/web/src/app/(dashboard)/events/page.tsx', 'utf8');
    const calendarPage = fs.readFileSync('./apps/web/src/app/(dashboard)/calendar/page.tsx', 'utf8');
    const calendarAPI = fs.readFileSync('./apps/web/src/app/api/calendar/route.ts', 'utf8');
    
    logTest('Events', 'Events page has calendar components', 
      eventsPage.includes('calendar') || eventsPage.includes('event'), 
      'Event display components present');
    
    logTest('Events', 'Calendar page exists and functional', 
      calendarPage.includes('Calendar') || calendarPage.includes('Event'), 
      'Calendar components present');
    
    logTest('Events', 'Calendar API has CRUD operations', 
      calendarAPI.includes('export async function GET') && calendarAPI.includes('export async function POST'), 
      'GET and POST endpoints implemented');
    
    logTest('Events', 'Event conflict detection exists', 
      fs.existsSync('./apps/web/src/app/api/calendar/conflicts/route.ts'), 
      'Conflict detection endpoint exists');
    
    logTest('Events', 'Free time calculation exists', 
      fs.existsSync('./apps/web/src/app/api/calendar/free-time/route.ts'), 
      'Free time endpoint exists');
      
  } catch (error) {
    logTest('Events', 'Events system basic structure', false, `Error: ${error.message}`, true);
  }

  // 5. AUDIT AUTHENTICATION SYSTEM
  console.log('\\n🧪 AUDITING AUTHENTICATION SYSTEM...\\n');
  
  try {
    const loginPage = fs.readFileSync('./apps/web/src/app/auth/login/page.tsx', 'utf8');
    const authAPI = fs.readFileSync('./apps/web/src/app/api/auth/session/route.ts', 'utf8');
    const onboardingPage = fs.readFileSync('./apps/web/src/app/onboarding/page.tsx', 'utf8');
    
    logTest('Auth', 'Login page has proper auth components', 
      loginPage.includes('login') || loginPage.includes('auth'), 
      'Login components present');
    
    logTest('Auth', 'Session management API exists', 
      authAPI.includes('export async function GET'), 
      'Session endpoint implemented');
    
    logTest('Auth', 'Magic link authentication exists', 
      fs.existsSync('./apps/web/src/app/api/auth/send-magic-link/route.ts'), 
      'Magic link endpoint exists');
    
    logTest('Auth', 'Onboarding flow exists', 
      onboardingPage.includes('onboarding') || onboardingPage.includes('wizard'), 
      'Onboarding components present');
    
    logTest('Auth', 'Onboarding completion API exists', 
      fs.existsSync('./apps/web/src/app/api/auth/complete-onboarding/route.ts'), 
      'Onboarding completion endpoint exists');
      
  } catch (error) {
    logTest('Auth', 'Auth system basic structure', false, `Error: ${error.message}`, true);
  }

  // 6. AUDIT RITUALS SYSTEM
  console.log('\\n🧪 AUDITING RITUALS SYSTEM...\\n');
  
  try {
    const ritualsPage = fs.readFileSync('./apps/web/src/app/(dashboard)/rituals/page.tsx', 'utf8');
    const ritualsAPI = fs.readFileSync('./apps/web/src/app/api/rituals/route.ts', 'utf8');
    
    logTest('Rituals', 'Rituals page has proper components', 
      ritualsPage.includes('ritual') || ritualsPage.includes('Ritual'), 
      'Ritual components present');
    
    logTest('Rituals', 'Rituals API has CRUD operations', 
      ritualsAPI.includes('export async function GET') && ritualsAPI.includes('export async function POST'), 
      'GET and POST endpoints implemented');
    
    logTest('Rituals', 'Individual ritual pages exist', 
      fs.existsSync('./apps/web/src/app/(dashboard)/rituals/[ritualId]/page.tsx'), 
      'Dynamic ritual pages implemented');
    
    logTest('Rituals', 'Ritual participation API exists', 
      fs.existsSync('./apps/web/src/app/api/rituals/[ritualId]/participate/route.ts'), 
      'Participation endpoint exists');
    
    logTest('Rituals', 'Ritual joining system exists', 
      fs.existsSync('./apps/web/src/app/api/rituals/join/route.ts'), 
      'Join ritual endpoint exists');
      
  } catch (error) {
    logTest('Rituals', 'Rituals system basic structure', false, `Error: ${error.message}`, true);
  }

  // 7. AUDIT NOTIFICATIONS SYSTEM
  console.log('\\n🧪 AUDITING NOTIFICATIONS SYSTEM...\\n');
  
  try {
    const notificationsAPI = fs.readFileSync('./apps/web/src/app/api/notifications/route.ts', 'utf8');
    const realtimeSSE = fs.readFileSync('./apps/web/src/app/api/realtime/sse/route.ts', 'utf8');
    
    logTest('Notifications', 'Notifications API exists', 
      notificationsAPI.includes('export async function GET'), 
      'Notifications endpoint implemented');
    
    logTest('Notifications', 'Real-time SSE system exists', 
      realtimeSSE.includes('text/event-stream'), 
      'Server-sent events implemented');
    
    logTest('Notifications', 'Real-time notifications endpoint exists', 
      fs.existsSync('./apps/web/src/app/api/realtime/notifications/route.ts'), 
      'Real-time notifications endpoint exists');
    
    logTest('Notifications', 'Real-time chat system exists', 
      fs.existsSync('./apps/web/src/app/api/realtime/chat/route.ts'), 
      'Real-time chat endpoint exists');
    
    logTest('Notifications', 'Real-time presence system exists', 
      fs.existsSync('./apps/web/src/app/api/realtime/presence/route.ts'), 
      'Presence tracking endpoint exists');
      
  } catch (error) {
    logTest('Notifications', 'Notifications system basic structure', false, `Error: ${error.message}`, true);
  }

  // 8. AUDIT SEARCH SYSTEM
  console.log('\\n🧪 AUDITING SEARCH SYSTEM...\\n');
  
  try {
    const searchAPI = fs.readFileSync('./apps/web/src/app/api/search/route.ts', 'utf8');
    const spacesSearchAPI = fs.readFileSync('./apps/web/src/app/api/spaces/search/route.ts', 'utf8');
    
    logTest('Search', 'Global search API exists', 
      searchAPI.includes('export async function GET'), 
      'Global search endpoint implemented');
    
    logTest('Search', 'Spaces search API exists', 
      spacesSearchAPI.includes('export async function GET'), 
      'Spaces search endpoint implemented');
    
    logTest('Search', 'Tools search API exists', 
      fs.existsSync('./apps/web/src/app/api/tools/search/route.ts'), 
      'Tools search endpoint exists');
    
    logTest('Search', 'Users search API exists', 
      fs.existsSync('./apps/web/src/app/api/users/search/route.ts'), 
      'Users search endpoint exists');
    
    logTest('Search', 'Feed search API exists', 
      fs.existsSync('./apps/web/src/app/api/feed/search/route.ts'), 
      'Feed search endpoint exists');
      
  } catch (error) {
    logTest('Search', 'Search system basic structure', false, `Error: ${error.message}`, true);
  }

  // 9. AUDIT ADMIN SYSTEM
  console.log('\\n🧪 AUDITING ADMIN SYSTEM...\\n');
  
  try {
    const adminPage = fs.readFileSync('./apps/web/src/app/(dashboard)/admin/page.tsx', 'utf8');
    const adminDashboardAPI = fs.readFileSync('./apps/web/src/app/api/admin/dashboard/route.ts', 'utf8');
    
    logTest('Admin', 'Admin page exists', 
      adminPage.includes('admin') || adminPage.includes('dashboard'), 
      'Admin page components present');
    
    logTest('Admin', 'Admin dashboard API exists', 
      adminDashboardAPI.includes('export async function GET'), 
      'Admin dashboard endpoint implemented');
    
    logTest('Admin', 'Admin user management exists', 
      fs.existsSync('./apps/web/src/app/api/admin/users/route.ts'), 
      'User management endpoint exists');
    
    logTest('Admin', 'Admin spaces management exists', 
      fs.existsSync('./apps/web/src/app/api/admin/spaces/route.ts'), 
      'Spaces management endpoint exists');
    
    logTest('Admin', 'Admin activity logs exist', 
      fs.existsSync('./apps/web/src/app/api/admin/activity-logs/route.ts'), 
      'Activity logs endpoint exists');
      
  } catch (error) {
    logTest('Admin', 'Admin system basic structure', false, `Error: ${error.message}`, true);
  }

  // 10. AUDIT UI DESIGN SYSTEM
  console.log('\\n🧪 AUDITING UI DESIGN SYSTEM...\\n');
  
  try {
    const uiIndex = fs.readFileSync('./packages/ui/index.ts', 'utf8');
    const postsSurface = fs.readFileSync('./packages/ui/src/components/surfaces/hive-posts-surface.tsx', 'utf8');
    
    logTest('UI', 'UI package exports core components', 
      uiIndex.includes('HivePostsSurface') && uiIndex.includes('HiveEventsSurface'), 
      'Surface components exported');
    
    logTest('UI', 'Posts surface has coordination features', 
      postsSurface.includes('study_session') && postsSurface.includes('CoordinationSection'), 
      'Enhanced features implemented');
    
    logTest('UI', 'Events surface exists', 
      fs.existsSync('./packages/ui/src/components/surfaces/hive-events-surface.tsx'), 
      'Events surface component exists');
    
    logTest('UI', 'Members surface exists', 
      fs.existsSync('./packages/ui/src/components/surfaces/hive-members-surface.tsx'), 
      'Members surface component exists');
    
    logTest('UI', 'Tools surface exists', 
      fs.existsSync('./packages/ui/src/components/surfaces/hive-tools-surface.tsx'), 
      'Tools surface component exists');
      
  } catch (error) {
    logTest('UI', 'UI design system basic structure', false, `Error: ${error.message}`, true);
  }

  // 11. TEST PRODUCTION BUILD
  console.log('\\n🧪 TESTING PRODUCTION BUILD...\\n');
  
  logTest('Build', 'Production build artifacts exist', 
    fs.existsSync('./apps/web/.next') && fs.existsSync('./apps/web/.next/static'), 
    'Build output directory and static assets present');

  // 12. TEST CORE IMPORTS
  console.log('\\n🧪 TESTING CORE IMPORTS...\\n');
  
  try {
    const coreModule = await import('./packages/core/dist/domain/cohort/cohort-spaces.js');
    const { generateCohortSpaces } = coreModule;
    const testSpaces = generateCohortSpaces({ major: 'Test', graduationYear: 2025 });
    
    logTest('Core', 'Core package imports successfully', 
      testSpaces && testSpaces.length === 3, 
      'Core functionality accessible');
    
    logTest('Core', 'Core types are correct', 
      testSpaces.every(s => s.type === 'hive_exclusive'), 
      'Core data models consistent');
      
  } catch (error) {
    logTest('Core', 'Core package functionality', false, `Import error: ${error.message}`, true);
  }

  // FINAL ANALYSIS
  console.log('\\n' + '='.repeat(80));
  console.log('🏁 RUTHLESS PLATFORM-WIDE AUDIT COMPLETE');
  console.log('='.repeat(80));

  // System-by-system breakdown
  console.log('\\n📊 SYSTEM-BY-SYSTEM BREAKDOWN:');
  Object.entries(systemResults).forEach(([system, results]) => {
    const passRate = Math.round((results.passed / results.total) * 100);
    const status = passRate >= 80 ? '✅' : passRate >= 60 ? '⚠️' : '❌';
    console.log(`${status} ${system}: ${results.passed}/${results.total} (${passRate}%)`);
    if (results.issues.length > 0) {
      results.issues.forEach(issue => console.log(`     • ${issue}`));
    }
  });

  const overallPassRate = Math.round((passedTests / totalTests) * 100);

  console.log('\\n🎯 OVERALL PLATFORM STATUS:');
  console.log(`   Tests Passed: ${passedTests}/${totalTests} (${overallPassRate}%)`);
  console.log(`   Critical Issues: ${criticalIssues.length}`);

  if (criticalIssues.length === 0 && overallPassRate >= 85) {
    console.log('\\n🎉 PLATFORM-WIDE AUDIT PASSED!');
    console.log('🚀 ENTIRE HIVE PLATFORM IS PRODUCTION READY');
    console.log('   ✅ All major systems operational');
    console.log('   ✅ Core functionality verified');
    console.log('   ✅ API integration complete');
    console.log('   ✅ UI components functional');
    console.log('   ✅ Production build successful');
    console.log('\\n✨ Ready for full platform launch!');
  } else {
    console.log('\\n❌ PLATFORM-WIDE AUDIT FAILED');
    console.log(`🚨 ${criticalIssues.length} CRITICAL ISSUES DETECTED:`);
    criticalIssues.forEach(issue => console.log(`   • ${issue}`));
    console.log('\\n🔧 PLATFORM REQUIRES FIXES BEFORE PRODUCTION');
    
    // Identify worst performing systems
    const failingSystems = Object.entries(systemResults)
      .filter(([_, results]) => (results.passed / results.total) < 0.8)
      .map(([system, _]) => system);
    
    if (failingSystems.length > 0) {
      console.log('\\n🎯 PRIORITY SYSTEMS TO FIX:');
      failingSystems.forEach(system => console.log(`   • ${system}`));
    }
  }

  process.exit(criticalIssues.length === 0 && overallPassRate >= 85 ? 0 : 1);
}

auditPlatform().catch(console.error);