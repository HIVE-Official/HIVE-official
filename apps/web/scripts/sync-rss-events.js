/**
 * Sync RSS events to Firebase spaces
 * Run with: node apps/web/scripts/sync-rss-events.js
 */

require('dotenv').config({ path: './apps/web/.env.local' });
const admin = require('firebase-admin');
const https = require('https');

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
    
    return _app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

// Fetch RSS feed
async function fetchRSSFeed(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'HIVE Campus Integration/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

// Parse RSS XML
function parseRSSItems(xmlContent) {
  const items = [];
  const itemMatches = xmlContent.match(/<item>([\s\S]*?)<\/item>/gi) || [];
  
  for (const itemXml of itemMatches) {
    const title = extractXMLTag(itemXml, 'title');
    const description = extractXMLTag(itemXml, 'description');
    const link = extractXMLTag(itemXml, 'link');
    const pubDate = extractXMLTag(itemXml, 'pubDate');
    const guid = extractXMLTag(itemXml, 'guid');
    const category = extractXMLTag(itemXml, 'category');
    
    if (title) {
      items.push({
        title: cleanXMLContent(title),
        description: description ? cleanXMLContent(description) : '',
        link: link ? cleanXMLContent(link) : '',
        pubDate: pubDate ? new Date(cleanXMLContent(pubDate)) : new Date(),
        guid: guid ? cleanXMLContent(guid) : link,
        category: category ? cleanXMLContent(category) : '',
        organizer: extractOrganizer(itemXml)
      });
    }
  }
  
  return items;
}

function extractXMLTag(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1] : '';
}

function cleanXMLContent(content) {
  return content
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

function extractOrganizer(itemXml) {
  // Try to extract organizer from various possible fields
  const author = extractXMLTag(itemXml, 'author');
  const creator = extractXMLTag(itemXml, 'dc:creator');
  const organizer = extractXMLTag(itemXml, 'organizer');
  
  return cleanXMLContent(author || creator || organizer || 'Campus Organization');
}

// Match event to spaces based on organizer name
async function matchEventToSpaces(event, db) {
  const matchedSpaces = [];
  const organizerLower = event.organizer.toLowerCase();
  const titleLower = event.title.toLowerCase();
  const descLower = event.description.toLowerCase();
  
  // Search all space types
  const spaceTypes = [
    'student_organizations',
    'fraternity_and_sorority',
    'campus_living',
    'university_organizations'
  ];
  
  for (const spaceType of spaceTypes) {
    try {
      const spacesSnapshot = await db
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
      
      for (const spaceDoc of spacesSnapshot.docs) {
        const spaceData = spaceDoc.data();
        const spaceName = (spaceData.name || '').toLowerCase();
        
        // Check if event matches this space
        let isMatch = false;
        
        // Direct name match
        if (organizerLower.includes(spaceName) || spaceName.includes(organizerLower)) {
          isMatch = true;
        }
        
        // Check if space name appears in title or description
        if (!isMatch && (titleLower.includes(spaceName) || descLower.includes(spaceName))) {
          isMatch = true;
        }
        
        // Check for acronym matches (e.g., "SA" for "Student Association")
        const spaceAcronym = spaceName.split(' ').map(word => word[0]).join('').toLowerCase();
        if (!isMatch && spaceAcronym.length > 1 && 
            (organizerLower.includes(spaceAcronym) || titleLower.includes(spaceAcronym))) {
          isMatch = true;
        }
        
        if (isMatch) {
          matchedSpaces.push({
            id: spaceDoc.id,
            name: spaceData.name,
            type: spaceType,
            path: `/spaces/${spaceType}/spaces/${spaceDoc.id}`
          });
        }
      }
    } catch (error) {
      console.error(`Error searching ${spaceType}:`, error.message);
    }
  }
  
  return matchedSpaces;
}

// Create or update event in space
async function saveEventToSpace(event, space, db) {
  try {
    // Check if event already exists (by guid or link)
    const existingEvents = await db
      .collection('spaces')
      .doc(space.type)
      .collection('spaces')
      .doc(space.id)
      .collection('events')
      .where('rssGuid', '==', event.guid)
      .limit(1)
      .get();
    
    const eventData = {
      title: event.title,
      description: event.description,
      startDate: event.pubDate,
      endDate: new Date(event.pubDate.getTime() + 2 * 60 * 60 * 1000), // Default 2 hours
      link: event.link,
      organizer: event.organizer,
      category: event.category,
      rssGuid: event.guid,
      isFromRSS: true,
      updatedAt: new Date()
    };
    
    if (!existingEvents.empty) {
      // Update existing event
      await existingEvents.docs[0].ref.update(eventData);
      return 'updated';
    } else {
      // Create new event
      await db
        .collection('spaces')
        .doc(space.type)
        .collection('spaces')
        .doc(space.id)
        .collection('events')
        .add({
          ...eventData,
          createdAt: new Date()
        });
      return 'created';
    }
  } catch (error) {
    console.error(`Error saving event to space ${space.name}:`, error.message);
    return 'error';
  }
}

async function syncRSSEvents() {
  const _app = initializeFirebase();
  const db = admin.firestore();
  
  console.log('🔄 Syncing RSS Events to Firebase Spaces');
  console.log('═'.repeat(60));
  
  try {
    // Get RSS feed configuration
    const feedSnapshot = await db.collection('rss_feeds')
      .where('isActive', '==', true)
      .limit(1)
      .get();
    
    if (feedSnapshot.empty) {
      console.log('❌ No active RSS feed found');
      console.log('Run setup-ub-rss-feed.js first');
      return;
    }
    
    const feedDoc = feedSnapshot.docs[0];
    const feedData = feedDoc.data();
    
    console.log(`📡 Fetching RSS feed: ${feedData.url}`);
    console.log(`Feed: ${feedData.name}`);
    
    // Fetch RSS feed
    const xmlContent = await fetchRSSFeed(feedData.url);
    console.log('✅ RSS feed fetched successfully');
    
    // Parse RSS items
    const events = parseRSSItems(xmlContent);
    console.log(`📊 Found ${events.length} events in RSS feed`);
    
    // Limit to recent events for initial sync
    const recentEvents = events
      .filter(e => e.pubDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
      .slice(0, 100); // Limit to 100 events for testing
    
    console.log(`🎯 Processing ${recentEvents.length} recent events`);
    console.log('');
    
    const stats = {
      processed: 0,
      matched: 0,
      created: 0,
      updated: 0,
      errors: 0
    };
    
    // Process each event
    for (const event of recentEvents) {
      stats.processed++;
      
      // Show progress every 10 events
      if (stats.processed % 10 === 0) {
        console.log(`Progress: ${stats.processed}/${recentEvents.length} events processed`);
      }
      
      // Match event to spaces
      const matchedSpaces = await matchEventToSpaces(event, db);
      
      if (matchedSpaces.length > 0) {
        stats.matched++;
        
        // Save to first matched space (could be improved to save to all matches)
        const primarySpace = matchedSpaces[0];
        const result = await saveEventToSpace(event, primarySpace, db);
        
        if (result === 'created') {
          stats.created++;
          console.log(`✅ Created: "${event.title.substring(0, 50)}..." → ${primarySpace.name}`);
        } else if (result === 'updated') {
          stats.updated++;
        } else {
          stats.errors++;
        }
      }
    }
    
    // Update feed last sync time
    await db.collection('rss_feeds').doc(feedDoc.id).update({
      lastSyncAt: new Date(),
      lastSyncStatus: 'success',
      lastSyncStats: stats
    });
    
    // Log sync result
    await db.collection('rss_sync_logs').add({
      feedId: feedDoc.id,
      feedName: feedData.name,
      timestamp: new Date(),
      status: 'success',
      stats: stats
    });
    
    console.log('\n📊 SYNC SUMMARY');
    console.log('═'.repeat(60));
    console.log(`Events Processed: ${stats.processed}`);
    console.log(`Events Matched to Spaces: ${stats.matched}`);
    console.log(`New Events Created: ${stats.created}`);
    console.log(`Events Updated: ${stats.updated}`);
    console.log(`Errors: ${stats.errors}`);
    console.log(`Match Rate: ${((stats.matched / stats.processed) * 100).toFixed(1)}%`);
    
    if (stats.created > 0) {
      console.log('\n✨ Sample of created events:');
      // Would show sample here
    }
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
}

// Run sync
syncRSSEvents()
  .then(() => {
    console.log('\n✅ RSS event sync completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Sync failed:', error);
    process.exit(1);
  });