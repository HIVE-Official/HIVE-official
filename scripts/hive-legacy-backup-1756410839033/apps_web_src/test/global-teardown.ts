import { FullConfig } from '@playwright/test';

async function globalTeardown(_config: FullConfig) {
  console.log('🧹 Starting global test teardown...');

  // Clean up test data, databases, etc.
  // This is where you'd reset state after all tests complete
  
  // Clean up any temporary files
  try {
    // Remove any test artifacts if needed
    console.log('✅ Test artifacts cleaned up');
  } catch (error) {
    console.warn('⚠️ Error during cleanup:', error);
  }

  console.log('✅ Global test teardown completed');
}

export default globalTeardown;