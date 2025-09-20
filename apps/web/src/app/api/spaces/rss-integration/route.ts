import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from "@/lib/structured-logger";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';

// RSS Feed Configuration Schema
const RSSFeedConfigSchema = z.object({
  url: z.string().url(),
  name: z.string().min(1),
  description: z.string().optional(),
  spaceTypes: z.array(z.string()).default(['university_organizations']),
  keywordMapping: z.record(z.array(z.string())).optional(), // space keywords -> RSS keywords
  autoCreate: z.boolean().default(false), // Auto-create events from RSS
  isActive: z.boolean().default(true),
});

const RSSItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string().optional(),
  pubDate: z.string().optional(),
  guid: z.string().optional(),
  category: z.array(z.string()).optional(),
  content: z.string().optional(),
});

// RSS Parser - Basic implementation
async function parseRSSFeed(url: string): Promise<any[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'HIVE-Campus-Integration/1.0',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    
    // Basic XML parsing - in production, use a proper XML parser like 'fast-xml-parser'
    const items: any[] = [];
    
    // Extract RSS items using regex (simplified approach)
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;
    
    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemXml = match[1];
      
      const title = extractXMLTag(itemXml, 'title');
      const description = extractXMLTag(itemXml, 'description');
      const link = extractXMLTag(itemXml, 'link');
      const pubDate = extractXMLTag(itemXml, 'pubDate');
      const guid = extractXMLTag(itemXml, 'guid');
      
      if (title) {
        items.push({
          title: cleanXMLContent(title),
          description: description ? cleanXMLContent(description) : undefined,
          link: link ? cleanXMLContent(link) : undefined,
          pubDate: pubDate ? cleanXMLContent(pubDate) : undefined,
          guid: guid ? cleanXMLContent(guid) : undefined,
          category: [],
          content: description ? cleanXMLContent(description) : undefined,
        });
      }
    }
    
    return items;
  } catch (error) {
    logger.error('Failed to parse RSS feed', { url, error });
    throw new Error(`Failed to parse RSS feed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function extractXMLTag(xml: string, tag: string): string | undefined {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'is');
  const match = xml.match(regex);
  return match ? match[1] : undefined;
}

function cleanXMLContent(content: string): string {
  return content
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, '')
    .trim();
}

// Match RSS items to spaces based on keywords and categories
function matchRSSItemsToSpaces(items: any[], spaces: any[], keywordMapping: Record<string, string[]> = {}): Record<string, any[]> {
  const spaceMatches: Record<string, any[]> = {};
  
  for (const space of spaces) {
    spaceMatches[space.id] = [];
    
    // Get keywords for this space
    const spaceKeywords = [
      space.name.toLowerCase(),
      ...(space.tags?.map((tag: any) => tag.name?.toLowerCase() || tag.toLowerCase()) || []),
      ...(space.description?.toLowerCase().split(' ') || []),
      ...(keywordMapping[space.id] || []),
    ].filter(Boolean);
    
    // Match items to this space
    for (const item of items) {
      const itemText = `${item.title} ${item.description || ''} ${item.category?.join(' ') || ''}`.toLowerCase();
      
      const hasMatch = spaceKeywords.some(keyword => 
        itemText.includes(keyword.toLowerCase())
      );
      
      if (hasMatch) {
        spaceMatches[space.id].push({
          ...item,
          matchedKeywords: spaceKeywords.filter(keyword => 
            itemText.includes(keyword.toLowerCase())
          ),
        });
      }
    }
  }
  
  return spaceMatches;
}

// Convert RSS item to HIVE event format
function convertRSSItemToEvent(item: any, spaceId: string, organizerId: string) {
  const now = new Date();
  const pubDate = item.pubDate ? new Date(item.pubDate) : now;
  
  // Try to extract date/time from title or description
  let eventDate = pubDate;
  const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}|\w+ \d{1,2}, \d{4})/g;
  const timeRegex = /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/g;
  
  const dateMatch = item.title?.match(dateRegex) || item.description?.match(dateRegex);
  const timeMatch = item.title?.match(timeRegex) || item.description?.match(timeRegex);
  
  if (dateMatch) {
    try {
      eventDate = new Date(dateMatch[0]);
      if (timeMatch) {
        // Combine date and time - simplified
        const timeStr = timeMatch[0];
        eventDate = new Date(`${dateMatch[0]} ${timeStr}`);
      }
    } catch (e) {
      // Keep original pubDate if parsing fails
    }
  }
  
  return {
    title: item.title,
    description: item.description || '',
    startDate: eventDate,
    endDate: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000), // Default 2 hours
    location: 'See event details',
    virtualLink: item.link,
    organizerId,
    type: 'academic', // Default type for RSS events
    isFromRSS: true,
    rssSource: item.guid || item.link,
    rssItemData: item,
    createdAt: now,
    updatedAt: now,
  };
}

// GET /api/spaces/rss-integration - Get RSS integration status and feeds
export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  // Check if user is admin
  const userId = getUserId(request);
  const userDoc = await dbAdmin.collection('users').doc(userId).get();
  const userData = userDoc.data();
  if (!userDoc.exists || !userData?.isAdmin) {
    return respond.error("Admin access required", "FORBIDDEN", 403);
  }

  // Get RSS feed configurations
  const feedsSnapshot = await dbAdmin.collection('rss_feeds').get();
  const feeds = feedsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Get recent RSS integration logs
  const logsSnapshot = await dbAdmin
    .collection('rss_integration_logs')
    .orderBy('timestamp', 'desc')
    .limit(50)
    .get();

  const logs = logsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate?.()?.toISOString(),
  }));

  return respond.success({
    feeds,
    logs,
    summary: {
      totalFeeds: feeds.length,
      activeFeeds: feeds.filter((f: any) => f.isActive).length,
      lastSync: logs[0]?.timestamp || null,
    }
  });
});

// POST /api/spaces/rss-integration - Create RSS feed configuration
export const POST = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  // Check if user is admin
  const userId = getUserId(request);
  const userDoc = await dbAdmin.collection('users').doc(userId).get();
  const userData = userDoc.data();
  if (!userDoc.exists || !userData?.isAdmin) {
    return respond.error("Admin access required", "FORBIDDEN", 403);
  }

  const body = await request.json();
  const validatedData = RSSFeedConfigSchema.parse(body);

  // Test the RSS feed first
  try {
    const testItems = await parseRSSFeed(validatedData.url);
    if (testItems.length === 0) {
      return respond.error("RSS feed appears to be empty or invalid", "INVALID_INPUT", 400);
    }
  } catch (error) {
    return respond.error(`Invalid RSS feed: ${error instanceof Error ? error.message : 'Unknown error'}`, "INVALID_INPUT", 400);
  }

  // Create RSS feed configuration
  const feedData = {
    ...validatedData,
    createdBy: userId,
    createdAt: new Date(),
    lastSyncAt: null,
    lastSyncStatus: 'pending',
    totalEventsSynced: 0,
  };

  const feedRef = await dbAdmin.collection('rss_feeds').add(feedData);

  return respond.success({
    feedId: feedRef.id,
    ...feedData,
    createdAt: feedData.createdAt.toISOString(),
  }, 201);
});

// PUT /api/spaces/rss-integration/sync - Trigger RSS sync
export const PUT = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  // Check if user is admin
  const userId = getUserId(request);
  const userDoc = await dbAdmin.collection('users').doc(userId).get();
  const userData = userDoc.data();
  if (!userDoc.exists || !userData?.isAdmin) {
    return respond.error("Admin access required", "FORBIDDEN", 403);
  }

    const { feedId } = await request.json();

    let feedsToSync: any[] = [];

    if (feedId) {
      // Sync specific feed
      const feedDoc = await dbAdmin.collection('rss_feeds').doc(feedId).get();
      if (!feedDoc.exists) {
        return respond.error("RSS feed not found", "RESOURCE_NOT_FOUND", 404);
      }
      feedsToSync = [{ id: feedDoc.id, ...feedDoc.data() }];
    } else {
      // Sync all active feeds
      const feedsSnapshot = await dbAdmin.collection('rss_feeds').where('isActive', '==', true).get();
      feedsToSync = feedsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    const syncResults = [];

    for (const feed of feedsToSync) {
      try {
        logger.info('Starting RSS sync', { feedId: feed.id, feedName: feed.name });

        // Parse RSS feed
        const rssItems = await parseRSSFeed(feed.url);
        
        // Get relevant spaces for this feed
        const spacesSnapshot = await dbAdmin
          .collection('spaces')
          .where('type', 'in', feed.spaceTypes || ['university_organizations'])
          .get();
        
        const spaces = spacesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Match RSS items to spaces
        const spaceMatches = matchRSSItemsToSpaces(rssItems, spaces, feed.keywordMapping);
        
        let eventsCreated = 0;
        let eventsUpdated = 0;

        // Process matches for each space
        for (const [spaceId, matchedItems] of Object.entries(spaceMatches)) {
          if (matchedItems.length === 0) continue;

          for (const item of matchedItems) {
            try {
              // Check if event already exists (by RSS source)
              const existingEventSnapshot = await dbAdmin
                .collection('spaces')
                .doc(spaceId)
                .collection('events')
                .where('rssSource', '==', item.guid || item.link)
                .limit(1)
                .get();

              if (!existingEventSnapshot.empty) {
                // Update existing event
                const eventDoc = existingEventSnapshot.docs[0];
                await eventDoc.ref.update({
                  title: item.title,
                  description: item.description || '',
                  updatedAt: new Date(),
                  rssItemData: item,
                });
                eventsUpdated++;
              } else if (feed.autoCreate) {
                // Create new event
                const eventData = convertRSSItemToEvent(item, spaceId, userId);
                
                await dbAdmin
                  .collection('spaces')
                  .doc(spaceId)
                  .collection('events')
                  .add(eventData);
                
                eventsCreated++;
              }
            } catch (itemError) {
              logger.warn('Failed to process RSS item', { 
                feedId: feed.id, 
                spaceId, 
                itemTitle: item.title,
                error: itemError 
              });
            }
          }
        }

        // Update feed sync status
        await dbAdmin.collection('rss_feeds').doc(feed.id).update({
          lastSyncAt: new Date(),
          lastSyncStatus: 'success',
          totalEventsSynced: (feed.totalEventsSynced || 0) + eventsCreated,
        });

        // Log sync result
        await dbAdmin.collection('rss_integration_logs').add({
          feedId: feed.id,
          feedName: feed.name,
          timestamp: new Date(),
          status: 'success',
          itemsProcessed: rssItems.length,
          eventsCreated,
          eventsUpdated,
          spacesMatched: Object.keys(spaceMatches).filter(spaceId => spaceMatches[spaceId].length > 0).length,
          syncTriggeredBy: userId,
        });

        syncResults.push({
          feedId: feed.id,
          feedName: feed.name,
          status: 'success',
          itemsProcessed: rssItems.length,
          eventsCreated,
          eventsUpdated,
        });

      } catch (feedError) {
        logger.error('RSS feed sync failed', { feedId: feed.id, error: feedError });

        // Update feed sync status
        await dbAdmin.collection('rss_feeds').doc(feed.id).update({
          lastSyncAt: new Date(),
          lastSyncStatus: 'error',
        });

        // Log sync error
        await dbAdmin.collection('rss_integration_logs').add({
          feedId: feed.id,
          feedName: feed.name,
          timestamp: new Date(),
          status: 'error',
          error: feedError instanceof Error ? feedError.message : 'Unknown error',
          syncTriggeredBy: userId,
        });

        syncResults.push({
          feedId: feed.id,
          feedName: feed.name,
          status: 'error',
          error: feedError instanceof Error ? feedError.message : 'Unknown error',
        });
      }
    }

  return respond.success({
    syncResults,
    summary: {
      totalFeeds: syncResults.length,
      successfulFeeds: syncResults.filter(r => r.status === 'success').length,
      failedFeeds: syncResults.filter(r => r.status === 'error').length,
      totalEventsCreated: syncResults.reduce((sum, r) => sum + (r.eventsCreated || 0), 0),
      totalEventsUpdated: syncResults.reduce((sum, r) => sum + (r.eventsUpdated || 0), 0),
    }
  });
});