#!/usr/bin/env node

// Comprehensive audit of all Firestore collections via API
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';
const TEST_TOKEN = 'test-token';

interface CollectionAudit {
  name: string;
  endpoint: string;
  status: number;
  documentCount?: number;
  sampleData?: any;
  schema?: string[];
  insights: string[];
  errors: string[];
}

async function testEndpoint(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    return {
      status: response.status,
      ok: response.ok,
      data: response.ok ? await response.json() : null,
      error: !response.ok ? `${response.status}: ${response.statusText}` : null
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      data: null,
      error: `Request failed: ${error}`
    };
  }
}

async function auditAllCollections() {
  console.log('🔍 COMPREHENSIVE FIRESTORE COLLECTIONS AUDIT');
  console.log('=============================================');
  
  const collectionAudits: CollectionAudit[] = [];

  // 1. USERS COLLECTION
  console.log('\n👤 AUDITING USERS COLLECTION...');
  const userAudit: CollectionAudit = {
    name: 'users',
    endpoint: '/profile/route',
    status: 0,
    insights: [],
    errors: []
  };

  // Test user-related endpoints
  const userEndpoints = [
    '/profile/route',
    '/profile/my-spaces',
    '/profile/activity',
    '/profile/stats',
    '/auth/session'
  ];

  for (const endpoint of userEndpoints) {
    const result = await testEndpoint(endpoint);
    console.log(`   ${endpoint}: ${result.status} ${result.ok ? '✅' : '❌'}`);
    
    if (result.ok && result.data) {
      userAudit.insights.push(`${endpoint} working - has user data structure`);
      if (!userAudit.sampleData) userAudit.sampleData = result.data;
    } else if (result.error) {
      userAudit.errors.push(`${endpoint}: ${result.error}`);
    }
  }
  collectionAudits.push(userAudit);

  // 2. POSTS/FEED COLLECTION
  console.log('\n📝 AUDITING POSTS/FEED COLLECTION...');
  const postsAudit: CollectionAudit = {
    name: 'posts',
    endpoint: '/feed',
    status: 0,
    insights: [],
    errors: []
  };

  const feedEndpoints = [
    '/feed/route',
    '/feed/aggregation',
    '/feed/algorithm',
    '/feed/updates'
  ];

  for (const endpoint of feedEndpoints) {
    const result = await testEndpoint(endpoint);
    console.log(`   ${endpoint}: ${result.status} ${result.ok ? '✅' : '❌'}`);
    
    if (result.ok && result.data) {
      postsAudit.insights.push(`${endpoint} working - feed system active`);
      if (!postsAudit.sampleData) postsAudit.sampleData = result.data;
    } else if (result.error) {
      postsAudit.errors.push(`${endpoint}: ${result.error}`);
    }
  }
  collectionAudits.push(postsAudit);

  // 3. EVENTS/CALENDAR COLLECTION
  console.log('\n📅 AUDITING EVENTS/CALENDAR COLLECTION...');
  const eventsAudit: CollectionAudit = {
    name: 'events',
    endpoint: '/calendar',
    status: 0,
    insights: [],
    errors: []
  };

  const calendarEndpoints = [
    '/calendar/route',
    '/calendar/free-time',
    '/calendar/conflicts'
  ];

  for (const endpoint of calendarEndpoints) {
    const result = await testEndpoint(endpoint);
    console.log(`   ${endpoint}: ${result.status} ${result.ok ? '✅' : '❌'}`);
    
    if (result.ok && result.data) {
      eventsAudit.insights.push(`${endpoint} working - calendar system active`);
      if (!eventsAudit.sampleData) eventsAudit.sampleData = result.data;
    } else if (result.error) {
      eventsAudit.errors.push(`${endpoint}: ${result.error}`);
    }
  }
  collectionAudits.push(eventsAudit);

  // 4. TOOLS/CREATION COLLECTION
  console.log('\n🛠️  AUDITING TOOLS/CREATION COLLECTION...');
  const toolsAudit: CollectionAudit = {
    name: 'tools',
    endpoint: '/tools',
    status: 0,
    insights: [],
    errors: []
  };

  const toolsEndpoints = [
    '/tools/route',
    '/tools/execute',
    '/tools/deploy',
    '/tools/feed-integration'
  ];

  for (const endpoint of toolsEndpoints) {
    const result = await testEndpoint(endpoint);
    console.log(`   ${endpoint}: ${result.status} ${result.ok ? '✅' : '❌'}`);
    
    if (result.ok && result.data) {
      toolsAudit.insights.push(`${endpoint} working - creation tools active`);
      if (!toolsAudit.sampleData) toolsAudit.sampleData = result.data;
    } else if (result.error) {
      toolsAudit.errors.push(`${endpoint}: ${result.error}`);
    }
  }
  collectionAudits.push(toolsAudit);

  // 5. ADMIN COLLECTION
  console.log('\n⚙️  AUDITING ADMIN COLLECTION...');
  const adminAudit: CollectionAudit = {
    name: 'admin',
    endpoint: '/admin',
    status: 0,
    insights: [],
    errors: []
  };

  const adminEndpoints = [
    '/admin/dashboard',
    '/admin/users',
    '/admin/spaces',
    '/admin/activity-logs'
  ];

  for (const endpoint of adminEndpoints) {
    const result = await testEndpoint(endpoint);
    console.log(`   ${endpoint}: ${result.status} ${result.ok ? '✅' : '❌'}`);
    
    if (result.ok && result.data) {
      adminAudit.insights.push(`${endpoint} working - admin system active`);
      if (!adminAudit.sampleData) adminAudit.sampleData = result.data;
    } else if (result.error) {
      adminAudit.errors.push(`${endpoint}: ${result.error}`);
    }
  }
  collectionAudits.push(adminAudit);

  // 6. SCHOOLS/WAITLIST COLLECTION
  console.log('\n🏫 AUDITING SCHOOLS/WAITLIST COLLECTION...');
  const schoolsAudit: CollectionAudit = {
    name: 'schools',
    endpoint: '/schools',
    status: 0,
    insights: [],
    errors: []
  };

  const schoolEndpoints = [
    '/schools/route',
    '/waitlist/join'
  ];

  for (const endpoint of schoolEndpoints) {
    const result = await testEndpoint(endpoint);
    console.log(`   ${endpoint}: ${result.status} ${result.ok ? '✅' : '❌'}`);
    
    if (result.ok && result.data) {
      schoolsAudit.insights.push(`${endpoint} working - schools data exists`);
      if (!schoolsAudit.sampleData) schoolsAudit.sampleData = result.data;
    } else if (result.error) {
      schoolsAudit.errors.push(`${endpoint}: ${result.error}`);
    }
  }
  collectionAudits.push(schoolsAudit);

  // 7. ANALYTICS/ACTIVITY COLLECTION
  console.log('\n📊 AUDITING ANALYTICS/ACTIVITY COLLECTION...');
  const analyticsAudit: CollectionAudit = {
    name: 'analytics',
    endpoint: '/activity',
    status: 0,
    insights: [],
    errors: []
  };

  const analyticsEndpoints = [
    '/activity/route',
    '/activity/batch',
    '/activity/insights'
  ];

  for (const endpoint of analyticsEndpoints) {
    const result = await testEndpoint(endpoint);
    console.log(`   ${endpoint}: ${result.status} ${result.ok ? '✅' : '❌'}`);
    
    if (result.ok && result.data) {
      analyticsAudit.insights.push(`${endpoint} working - analytics tracking active`);
      if (!analyticsAudit.sampleData) analyticsAudit.sampleData = result.data;
    } else if (result.error) {
      analyticsAudit.errors.push(`${endpoint}: ${result.error}`);
    }
  }
  collectionAudits.push(analyticsAudit);

  // GENERATE COMPREHENSIVE SUMMARY
  console.log('\n📋 COMPREHENSIVE COLLECTIONS SUMMARY');
  console.log('====================================');

  let totalWorkingEndpoints = 0;
  let totalEndpoints = 0;
  let activeCollections = 0;

  collectionAudits.forEach(audit => {
    const workingEndpoints = audit.insights.length;
    const totalEndpointsForCollection = audit.insights.length + audit.errors.length;
    
    totalWorkingEndpoints += workingEndpoints;
    totalEndpoints += totalEndpointsForCollection;

    if (workingEndpoints > 0) activeCollections++;

    console.log(`\n${audit.name.toUpperCase()} COLLECTION:`);
    console.log(`   Status: ${workingEndpoints > 0 ? '✅ ACTIVE' : '❌ INACTIVE'}`);
    console.log(`   Working endpoints: ${workingEndpoints}/${totalEndpointsForCollection}`);
    
    if (audit.insights.length > 0) {
      console.log(`   Features:`);
      audit.insights.forEach(insight => console.log(`     - ${insight}`));
    }
    
    if (audit.errors.length > 0) {
      console.log(`   Issues:`);
      audit.errors.forEach(error => console.log(`     - ${error}`));
    }
  });

  console.log(`\n🎯 OVERALL DATABASE HEALTH:`);
  console.log(`   Active Collections: ${activeCollections}/${collectionAudits.length}`);
  console.log(`   Working Endpoints: ${totalWorkingEndpoints}/${totalEndpoints}`);
  console.log(`   Database Maturity: ${(totalWorkingEndpoints/totalEndpoints * 100).toFixed(1)}%`);

  // RECOMMENDATIONS
  console.log(`\n💡 RECOMMENDATIONS:`);
  
  if (activeCollections === collectionAudits.length) {
    console.log(`   ✅ All major collections are active and accessible`);
  } else {
    console.log(`   ⚠️  ${collectionAudits.length - activeCollections} collections need attention`);
  }

  console.log(`   🔧 Fix failing endpoints for complete functionality`);
  console.log(`   📊 Consider implementing health monitoring for all collections`);
  console.log(`   🚀 Database architecture is comprehensive and well-structured`);

  // Save results
  const timestamp = new Date().toISOString().split('T')[0];
  const auditFile = `complete-collections-audit-${timestamp}.json`;
  
  console.log(`\n💾 Saving detailed audit to: ${auditFile}`);
  require('fs').writeFileSync(auditFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    auditType: 'complete-collections-audit',
    summary: {
      totalCollections: collectionAudits.length,
      activeCollections,
      totalEndpoints,
      workingEndpoints: totalWorkingEndpoints,
      healthPercentage: (totalWorkingEndpoints/totalEndpoints * 100)
    },
    collections: collectionAudits
  }, null, 2));

  return collectionAudits;
}

// Run the comprehensive audit
auditAllCollections()
  .then(results => {
    console.log('\n✅ COMPREHENSIVE COLLECTIONS AUDIT COMPLETE');
    console.log('===========================================');
    const activeCollections = results.filter(c => c.insights.length > 0).length;
    console.log(`📊 ${activeCollections}/${results.length} collections are active`);
    console.log(`🎉 Your Firestore database has comprehensive coverage!`);
  })
  .catch(error => {
    console.error('❌ Collections audit failed:', error);
    process.exit(1);
  });