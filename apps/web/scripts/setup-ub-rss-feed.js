/**
 * Setup UB RSS feed for events
 * Run with: node apps/web/scripts/setup-ub-rss-feed.js
 */

require('dotenv').config({ path: './apps/web/.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin
function initializeFirebase() {
  try {
    if (admin.apps?.length > 0) {
      return admin.app();
    }

    let credential;
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      credential = admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
    }

    const _app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

async function setupUBRSSFeed() {
  const _app = initializeFirebase();
  const db = admin.firestore();
  
  console.log('🔧 Setting up UB RSS Feed for Events');
  console.log('═'.repeat(60));
  
  // UB RSS Feed configuration
  // Note: This is the typical RSS feed URL for UB events
  // You may need to provide the actual RSS feed URL from buffalo.campuslabs.com
  const ubRSSFeed = {
    name: 'UB Campus Events',
    url: 'https://buffalo.campuslabs.com/engage/events.rss', // Common pattern for Campus Labs RSS
    description: 'University at Buffalo campus events and activities RSS feed',
    university: 'University at Buffalo',
    category: 'events',
    spaceTypes: ['student_organizations', 'university_organizations', 'fraternity_and_sorority'],
    isActive: true,
    importFrequency: 6, // Check every 6 hours
    maxItemsPerImport: 50,
    contentFilters: {
      keywords: [], // No keyword filtering - import all events
      excludeKeywords: ['test', 'demo', 'example'], // Exclude test events
      minWordCount: 5
    },
    keywordMapping: {}, // Will be populated as we discover spaces
    autoCreate: true, // Auto-create events in matching spaces
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  try {
    // Check if RSS feed already exists
    const existingFeed = await db.collection('rss_feeds')
      .where('url', '==', ubRSSFeed.url)
      .limit(1)
      .get();
    
    if (!existingFeed.empty) {
      console.log('⚠️  RSS feed already exists');
      const feedDoc = existingFeed.docs[0];
      console.log(`ID: ${feedDoc.id}`);
      console.log(`Name: ${feedDoc.data().name}`);
      console.log(`URL: ${feedDoc.data().url}`);
      console.log(`Active: ${feedDoc.data().isActive}`);
      
      // Update to ensure it's active
      await feedDoc.ref.update({
        isActive: true,
        updatedAt: new Date()
      });
      console.log('✅ Updated feed to ensure it\'s active');
      
      return feedDoc.id;
    }
    
    // Create new RSS feed configuration
    const feedRef = await db.collection('rss_feeds').add(ubRSSFeed);
    console.log('✅ Created RSS feed configuration');
    console.log(`Feed ID: ${feedRef.id}`);
    console.log(`URL: ${ubRSSFeed.url}`);
    
    // Also check for alternative RSS feed URLs
    console.log('\n📋 Alternative RSS feed URLs to try if the main one doesn\'t work:');
    console.log('1. https://buffalo.campuslabs.com/engage/events/feed');
    console.log('2. https://buffalo.campuslabs.com/engage/api/discovery/event/rss');
    console.log('3. https://buffalo.campuslabs.com/engage/events?format=rss');
    console.log('4. https://www.buffalo.edu/calendar/events.rss');
    console.log('5. https://www.buffalo.edu/studentlife/life-on-campus/clubs-and-activities/search/events.rss');
    
    console.log('\n💡 If you have the actual RSS feed URL, update it using:');
    console.log(`db.collection('rss_feeds').doc('${feedRef.id}').update({ url: 'YOUR_RSS_URL' })`);
    
    return feedRef.id;
    
  } catch (error) {
    console.error('❌ Error setting up RSS feed:', error);
    throw error;
  }
}

async function testRSSFeed(url) {
  console.log(`\n🧪 Testing RSS feed: ${url}`);
  console.log('─'.repeat(60));
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'HIVE Campus Integration/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      }
    });
    
    if (!response.ok) {
      console.log(`❌ HTTP ${response.status}: ${response.statusText}`);
      return false;
    }
    
    const contentType = response.headers.get('content-type');
    console.log(`Content-Type: ${contentType}`);
    
    const text = await response.text();
    
    // Check if it looks like RSS/XML
    if (text.includes('<rss') || text.includes('<feed') || text.includes('<channel>')) {
      console.log('✅ Valid RSS/XML feed detected');
      
      // Count items
      const itemCount = (text.match(/<item>/g) || []).length;
      console.log(`Found ${itemCount} items in feed`);
      
      // Show first item title if available
      const titleMatch = text.match(/<item>[\s\S]*?<title>(.*?)<\/title>/);
      if (titleMatch) {
        console.log(`First item: ${titleMatch[1].substring(0, 100)}`);
      }
      
      return true;
    } else {
      console.log('❌ Response doesn\'t look like RSS/XML');
      console.log('First 200 chars:', text.substring(0, 200));
      return false;
    }
    
  } catch (error) {
    console.log(`❌ Error fetching feed: ${error.message}`);
    return false;
  }
}

// Run setup
setupUBRSSFeed()
  .then(async (feedId) => {
    console.log('\n📡 Testing RSS feed connectivity...');
    
    // Test various possible RSS URLs
    const urlsToTest = [
      'https://buffalo.campuslabs.com/engage/events.rss',
      'https://buffalo.campuslabs.com/engage/events/feed',
      'https://www.buffalo.edu/calendar/events.rss'
    ];
    
    let workingUrl = null;
    for (const url of urlsToTest) {
      if (await testRSSFeed(url)) {
        workingUrl = url;
        break;
      }
    }
    
    if (workingUrl) {
      console.log(`\n✅ Found working RSS feed: ${workingUrl}`);
      console.log('\n🚀 RSS feed is ready for importing events!');
      console.log('Run sync using the API: PUT /api/spaces/rss-integration/sync');
    } else {
      console.log('\n⚠️  Could not find a working RSS feed URL');
      console.log('Please provide the correct RSS feed URL from UB');
    }
    
    process.exit(0);
  })
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });