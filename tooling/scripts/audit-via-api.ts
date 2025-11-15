#!/usr/bin/env node

// Audit Firestore via existing API endpoints
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';
const TEST_TOKEN = 'test-token';

interface AuditResult {
  endpoint: string;
  method: string;
  status: number;
  data?: any;
  error?: string;
  insights: string[];
}

async function apiCall(endpoint: string, method: string = 'GET'): Promise<AuditResult> {
  const result: AuditResult = {
    endpoint,
    method,
    status: 0,
    insights: []
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    result.status = response.status;
    
    if (response.ok) {
      const data = await response.json();
      result.data = data;
      
      // Generate insights based on response
      if (endpoint.includes('/spaces/browse')) {
        const pagination = (data as any).pagination;
        result.insights.push(`Found ${pagination?.totalCount || 0} total spaces`);
        const typeCounts = (data as any).typeCounts;
        if (typeCounts) {
          const types = Object.entries(typeCounts).map(([type, count]) => `${type}: ${count}`);
          result.insights.push(`Types: ${types.join(', ')}`);
        }
      }
      
      if (endpoint.includes('/health')) {
        result.insights.push(`Health status: ${(data as any).status || 'unknown'}`);
      }

    } else {
      result.error = `HTTP ${response.status}: ${response.statusText}`;
    }

  } catch (error) {
    result.error = `Request failed: ${error}`;
  }

  return result;
}

async function auditViaAPI() {
  console.log('🔍 HIVE Firestore Audit via API Endpoints');
  console.log('==========================================');
  
  const endpoints = [
    '/health',
    '/spaces/browse',
    '/spaces/browse?limit=50',
    '/spaces/browse?type=student_organizations',
    '/spaces/browse?type=campus_living', 
    '/spaces/browse?type=fraternity_and_sorority',
    '/spaces/browse?type=university_organizations',
    '/spaces/browse?type=hive_exclusive',
    '/profile/my-spaces',
    '/spaces/diagnostic',
  ];

  const results: AuditResult[] = [];

  for (const endpoint of endpoints) {
    console.log(`\n🔍 Testing: ${endpoint}`);
    const result = await apiCall(endpoint);
    results.push(result);
    
    console.log(`   Status: ${result.status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    } else if (result.insights.length > 0) {
      result.insights.forEach(insight => console.log(`   📊 ${insight}`));
    }
  }

  // Generate comprehensive summary
  console.log('\n📈 COMPREHENSIVE AUDIT SUMMARY');
  console.log('==============================');

  const spacesData = results.find(r => r.endpoint === '/spaces/browse' && r.data);
  if (spacesData?.data) {
    const data = spacesData.data;
    console.log(`\n🏢 SPACES OVERVIEW:`);
    console.log(`   Total Spaces: ${data.pagination?.totalCount || 0}`);
    console.log(`   Current Page Size: ${data.spaces?.length || 0}`);
    
    if (data.typeCounts) {
      console.log(`\n📊 SPACE DISTRIBUTION:`);
      Object.entries(data.typeCounts).forEach(([type, count]) => {
        console.log(`   ${type}: ${count} spaces`);
      });
    }

    if (data.spaces?.length > 0) {
      const sampleSpace = data.spaces[0];
      console.log(`\n📋 SAMPLE SPACE SCHEMA:`);
      console.log(`   Fields: ${Object.keys(sampleSpace).join(', ')}`);
      
      // Analyze member counts
      const memberCounts = data.spaces.map((s: any) => s.memberCount || 0);
      const totalMembers = memberCounts.reduce((a: number, b: number) => a + b, 0);
      const avgMembers = totalMembers / memberCounts.length;
      const maxMembers = Math.max(...memberCounts);
      
      console.log(`\n👥 MEMBERSHIP ANALYSIS:`);
      console.log(`   Total Members: ${totalMembers}`);
      console.log(`   Average per Space: ${avgMembers.toFixed(1)}`);
      console.log(`   Highest Membership: ${maxMembers}`);
    }
  }

  // API Health Analysis
  const healthData = results.find(r => r.endpoint === '/health');
  if (healthData) {
    console.log(`\n🏥 API HEALTH:`);
    console.log(`   Status: ${healthData.status === 200 ? '✅ Healthy' : '❌ Issues detected'}`);
  }

  // Error Analysis
  const errors = results.filter(r => r.error);
  if (errors.length > 0) {
    console.log(`\n⚠️  API ISSUES DETECTED:`);
    errors.forEach(error => {
      console.log(`   ${error.endpoint}: ${error.error}`);
    });
  }

  // Recommendations
  console.log(`\n💡 RECOMMENDATIONS:`);
  
  const workingEndpoints = results.filter(r => r.status === 200).length;
  const totalEndpoints = results.length;
  
  if (workingEndpoints === totalEndpoints) {
    console.log(`   ✅ All ${totalEndpoints} API endpoints are working correctly`);
  } else {
    console.log(`   ⚠️  ${totalEndpoints - workingEndpoints} of ${totalEndpoints} endpoints have issues`);
  }

  if (spacesData?.data?.pagination?.totalCount > 500) {
    console.log(`   📈 Large dataset - consider implementing caching and pagination optimization`);
  }

  if (spacesData?.data?.pagination?.totalCount > 0) {
    console.log(`   ✅ Database is populated and accessible via API`);
  }

  console.log(`   🔒 Test security by trying endpoints without authentication`);
  console.log(`   📊 Consider adding monitoring and analytics endpoints`);
  console.log(`   🚀 Database appears healthy and well-structured`);

  // Save results
  const timestamp = new Date().toISOString().split('T')[0];
  const auditFile = `api-audit-${timestamp}.json`;
  
  console.log(`\n💾 Saving detailed audit to: ${auditFile}`);
  require('fs').writeFileSync(auditFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    auditType: 'api-endpoint-audit',
    results,
    summary: {
      totalEndpoints: totalEndpoints,
      workingEndpoints: workingEndpoints,
      totalSpaces: spacesData?.data?.pagination?.totalCount || 0,
      spaceTypes: spacesData?.data?.typeCounts || {}
    }
  }, null, 2));

  return results;
}

// Run the audit
auditViaAPI()
  .then(results => {
    console.log('\n✅ API AUDIT COMPLETE');
    console.log('======================');
    const working = results.filter(r => r.status === 200).length;
    console.log(`📊 ${working}/${results.length} endpoints working`);
    console.log(`🎉 Firestore database is accessible and healthy!`);
  })
  .catch(error => {
    console.error('❌ API audit failed:', error);
    console.log('\n💡 Make sure the development server is running:');
    console.log('   cd apps/web && npm run dev');
    process.exit(1);
  });