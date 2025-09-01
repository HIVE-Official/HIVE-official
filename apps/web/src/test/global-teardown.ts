import { FullConfig } from '@playwright/test';

async function globalTeardown(_config: FullConfig) {
  console.log('🧹 Starting HIVE E2E Test Cleanup...');

  try {
    // Clean up any test data
    await cleanupTestData();
    
    // Clean up screenshots older than 7 days
    await cleanupOldScreenshots();
    
    // Log test summary
    await logTestSummary();

    console.log('✅ HIVE E2E Test Cleanup Complete');
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw - teardown failures shouldn't fail the test run
  }
}

async function cleanupTestData() {
  console.log('🗄️ Cleaning up test data...');
  
  // In a real implementation, you might:
  // - Clean up test users from Firebase
  // - Clear Redis test data
  // - Reset database to known state
  
  console.log('✅ Test data cleanup complete');
}

async function cleanupOldScreenshots() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
    
    if (fs.existsSync(screenshotDir)) {
      const files = fs.readdirSync(screenshotDir);
      const now = Date.now();
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      
      let cleanedCount = 0;
      
      for (const file of files) {
        const filePath = path.join(screenshotDir, file);
        const stats = fs.statSync(filePath);
        
        if (now - stats.mtime.getTime() > sevenDaysMs) {
          fs.unlinkSync(filePath);
          cleanedCount++;
        }
      }
      
      if (cleanedCount > 0) {
        console.log(`🗑️ Cleaned up ${cleanedCount} old screenshots`);
      }
    }
  } catch (error) {
    console.log('⚠️ Could not clean up screenshots:', error.message);
  }
}

async function logTestSummary() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    // Read test results if available
    const resultsPath = path.join(process.cwd(), 'test-results', 'e2e-results.json');
    
    if (fs.existsSync(resultsPath)) {
      const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
      
      const summary = {
        totalTests: results.stats?.total || 0,
        passed: results.stats?.passed || 0,
        failed: results.stats?.failed || 0,
        skipped: results.stats?.skipped || 0,
        duration: results.stats?.duration || 0
      };
      
      console.log('📊 Test Summary:');
      console.log(`   Total: ${summary.totalTests}`);
      console.log(`   Passed: ${summary.passed}`);
      console.log(`   Failed: ${summary.failed}`);
      console.log(`   Skipped: ${summary.skipped}`);
      console.log(`   Duration: ${Math.round(summary.duration / 1000)}s`);
      
      if (summary.failed > 0) {
        console.log('❌ Some tests failed - check the HTML report for details');
      } else {
        console.log('🎉 All tests passed!');
      }
    }
  } catch (error) {
    console.log('⚠️ Could not read test results for summary');
  }
}

export default globalTeardown;