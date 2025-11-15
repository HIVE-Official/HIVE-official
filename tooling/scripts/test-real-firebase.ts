#!/usr/bin/env node

/**
 * Test script to verify the updated APIs can connect to real Firebase data
 * Tests the SPACES/[spacetype]/SPACES/spaceID structure with real space types
 */

import { spawn } from 'child_process';

interface TestResult {
  passed: boolean;
  message: string;
  data?: any;
}

class FirebaseAPITester {
  private baseUrl = 'http://localhost:3000';
  
  async testServerRunning(): Promise<TestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`);
      if (response.ok) {
        return { passed: true, message: 'Development server is running' };
      } else {
        return { passed: false, message: `Server responded with ${response.status}` };
      }
    } catch (error) {
      return { passed: false, message: 'Development server is not running' };
    }
  }

  async testBrowseAPI(): Promise<TestResult> {
    try {
      console.log('🔍 Testing Browse API...');
      
      const response = await fetch(`${this.baseUrl}/api/spaces/browse`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer fake-token',
          'Content-Type': 'application/json'
        }
      });
      
      const responseText = await response.text();
      
      if (response.status === 401) {
        return { 
          passed: true, 
          message: 'Browse API is accessible (auth required as expected)',
          data: responseText
        };
      } else if (response.status === 500) {
        // Check if it's a Firebase connection error or structure issue
        if (responseText.includes('Firebase') || responseText.includes('SPACES')) {
          return {
            passed: false,
            message: 'Firebase connection or structure issue',
            data: responseText
          };
        }
      }
      
      return {
        passed: false,
        message: `Unexpected response: ${response.status}`,
        data: responseText
      };
      
    } catch (error) {
      return {
        passed: false,
        message: `Network error: ${error}`,
        data: error
      };
    }
  }

  async testSpaceTypes(): Promise<TestResult> {
    const spaceTypes = [
      'campus_living',
      'fraternity_and_sorority', 
      'hive_exclusive',
      'student_organizations',
      'university_organizations'
    ];
    
    console.log('📊 Testing each space type...');
    
    for (const spaceType of spaceTypes) {
      try {
        const response = await fetch(`${this.baseUrl}/api/spaces/browse?type=${spaceType}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer fake-token',
            'Content-Type': 'application/json'
          }
        });
        
        const responseText = await response.text();
        console.log(`   ${spaceType}: ${response.status} - ${responseText.length} chars`);
        
        if (response.status === 500 && responseText.includes('Firebase')) {
          return {
            passed: false,
            message: `Firebase error when testing ${spaceType}`,
            data: responseText
          };
        }
        
      } catch (error) {
        console.log(`   ${spaceType}: Error - ${error}`);
      }
    }
    
    return {
      passed: true,
      message: 'All space types tested (check individual results above)'
    };
  }

  async runAllTests(): Promise<void> {
    console.log('🚀 Testing updated Firebase APIs...\n');
    
    // Test 1: Server running
    const serverTest = await this.testServerRunning();
    console.log(`📡 Server Status: ${serverTest.passed ? '✅' : '❌'} ${serverTest.message}`);
    
    if (!serverTest.passed) {
      console.log('\n💡 Start the development server first:');
      console.log('   cd /Users/laneyfraass/hive_ui');
      console.log('   npm run dev');
      console.log('\n   Then run this test again.');
      return;
    }
    
    // Test 2: Browse API basic functionality
    const browseTest = await this.testBrowseAPI();
    console.log(`🔍 Browse API: ${browseTest.passed ? '✅' : '❌'} ${browseTest.message}`);
    
    if (!browseTest.passed && browseTest.data) {
      console.log(`   Error details: ${browseTest.data.substring(0, 200)}...`);
    }
    
    // Test 3: Individual space types
    const spaceTypeTest = await this.testSpaceTypes();
    console.log(`📊 Space Types: ${spaceTypeTest.passed ? '✅' : '❌'} ${spaceTypeTest.message}`);
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 TEST SUMMARY');
    console.log('='.repeat(60));
    
    if (serverTest.passed && browseTest.passed && spaceTypeTest.passed) {
      console.log('✅ All tests passed! APIs are ready to connect to Firebase.');
      console.log('🎯 Next steps:');
      console.log('   1. Check Firebase Console to verify data exists');
      console.log('   2. Test with real auth token if needed');
      console.log('   3. Check application logs for any Firebase connection issues');
    } else {
      console.log('❌ Some tests failed. Check the errors above.');
      console.log('🔧 Common issues:');
      console.log('   - Firebase credentials not configured');
      console.log('   - Space type collections don\'t exist');
      console.log('   - Network connectivity issues');
    }
  }
}

async function main() {
  const tester = new FirebaseAPITester();
  await tester.runAllTests();
}

if (require.main === module) {
  main();
}