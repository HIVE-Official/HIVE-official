const puppeteer = require('puppeteer');

async function testNavigation() {
  console.log('🚀 Testing HIVE Navigation System...');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1200, height: 800 }
    });

    const page = await browser.newPage();

    // Navigate to the feed page
    console.log('📍 Navigating to http://localhost:3000/feed');
    await page.goto('http://localhost:3000/feed', {
      waitUntil: 'networkidle0',
      timeout: 10000
    });

    // Wait for navigation to load
    await page.waitForTimeout(3000);

    // Check for navigation shell
    console.log('🔍 Checking for NavigationShell...');
    const navShell = await page.$('nav');
    if (navShell) {
      console.log('✅ Navigation shell found!');
    } else {
      console.log('❌ Navigation shell not found');
    }

    // Check for top bar navigation items
    console.log('🔍 Checking for navigation items...');
    const navItems = await page.$$('[role="button"], button, a');
    console.log(`✅ Found ${navItems.length} interactive elements`);

    // Check for HIVE logo
    console.log('🔍 Checking for HIVE logo...');
    const logo = await page.$('text=HIVE');
    if (logo) {
      console.log('✅ HIVE logo found!');
    }

    // Test responsive behavior
    console.log('📱 Testing mobile responsive behavior...');
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    // Check for mobile menu
    const mobileMenu = await page.$('button[aria-label*="menu"], button[aria-label*="Menu"]');
    if (mobileMenu) {
      console.log('✅ Mobile menu button found!');
    }

    // Test desktop view
    console.log('🖥️ Testing desktop view...');
    await page.setViewport({ width: 1200, height: 800 });
    await page.waitForTimeout(1000);

    // Take screenshot
    console.log('📸 Taking screenshot...');
    await page.screenshot({
      path: 'navigation-test.png',
      fullPage: true
    });

    console.log('✅ Navigation system test completed successfully!');
    console.log('📸 Screenshot saved as navigation-test.png');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testNavigation();