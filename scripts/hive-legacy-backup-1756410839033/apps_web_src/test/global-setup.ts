import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(_config: FullConfig) {
  console.log('🧪 Starting global test setup...');

  // Pre-warm critical pages to trigger Next.js compilation
  console.log('🔥 Pre-warming critical pages for faster tests...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Pre-compile the slowest pages first
    const criticalPages = [
      'http://localhost:3003/',
      'http://localhost:3003/schools', 
      'http://localhost:3003/auth/login?schoolId=test&schoolName=Test',
      'http://localhost:3003/profile'
    ];
    
    for (const url of criticalPages) {
      console.log(`🔥 Pre-warming: ${url}`);
      try {
        await page.goto(url, { 
          waitUntil: 'networkidle',
          timeout: 60000 // Allow for slow compilation
        });
        console.log(`✅ Warmed: ${url}`);
      } catch (error) {
        console.warn(`⚠️ Failed to warm ${url}:`, error.message);
      }
    }
    
    // Set up development authentication state
    await page.addInitScript(() => {
      window.localStorage.setItem('dev_auth_mode', 'true');
      window.localStorage.setItem('hive_session', JSON.stringify({
        userId: 'test-setup-user',
        email: 'test@test.edu',
        schoolId: 'test-university',
        needsOnboarding: false,
        verifiedAt: new Date().toISOString(),
        handle: 'testuser',
        role: 'student',
        onboardingCompleted: true,
      }));
    });
    
    console.log('✅ Development authentication state prepared');
  } catch (error) {
    console.warn('⚠️ Could not complete setup:', error);
  } finally {
    await browser.close();
  }

  console.log('✅ Global test setup completed with page pre-warming');
}

export default globalSetup;