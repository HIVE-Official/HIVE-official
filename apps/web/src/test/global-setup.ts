import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🎭 Starting HIVE E2E Test Setup...');

  // Create a browser instance for setup
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Wait for the dev server to be ready
    console.log('⏳ Waiting for dev server...');
    const baseURL = config.projects[0].use.baseURL || 'http://localhost:3003';
    
    let retries = 0;
    const maxRetries = 30;
    
    while (retries < maxRetries) {
      try {
        const response = await page.goto(`${baseURL}/api/health`, { 
          waitUntil: 'domcontentloaded',
          timeout: 5000 
        });
        
        if (response && response.status() === 200) {
          console.log('✅ Dev server is ready');
          break;
        }
      } catch (error) {
        retries++;
        console.log(`⏳ Waiting for dev server... (${retries}/${maxRetries})`);
        await page.waitForTimeout(2000);
      }
    }

    if (retries >= maxRetries) {
      // Try fallback health check on main page
      try {
        await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 10000 });
        console.log('✅ Dev server responding (fallback check)');
      } catch (error) {
        throw new Error(`Dev server not responding after ${maxRetries} attempts`);
      }
    }

    // Setup test database state if needed
    await setupTestData(page, baseURL);

    // Create screenshots directory
    const fs = require('fs');
    const path = require('path');
    const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    console.log('🎯 HIVE E2E Test Setup Complete');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function setupTestData(page: any, baseURL: string) {
  console.log('🗄️ Setting up test data...');

  // Setup mock Redis for magic link testing
  await page.evaluate(() => {
    // Mock localStorage for test data
    window.__testSetup = {
      mockMagicLinks: new Map(),
      mockUsers: new Map(),
      mockHandles: new Set(['taken-handle', 'admin', 'root', 'test'])
    };
  });

  // Check if we can access the auth endpoints
  try {
    const healthResponse = await fetch(`${baseURL}/api/auth/session`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(`🔐 Auth endpoints status: ${healthResponse.status}`);
  } catch (error) {
    console.log('⚠️ Auth endpoints not accessible (this may be expected in some environments)');
  }

  console.log('✅ Test data setup complete');
}

export default globalSetup;