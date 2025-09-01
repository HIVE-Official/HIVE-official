import { dbAdmin } from '@/lib/firebase-admin';
import { type CampusEvent } from '@/lib/feed-aggregation';

/**
 * RSS Import System for Campus Events
 * 
 * Strategy:
 * 1. Import from university RSS feeds (events, announcements)
 * 2. Process and validate imported content
 * 3. Store as campus events with source tracking
 * 4. Schedule regular imports (daily)
 */

// RSS feed configuration
export interface RSSFeedConfig {
  id: string;
  name: string;
  url: string;
  university: string;
  category: 'events' | 'announcements' | 'news' | 'academics';
  isActive: boolean;
  lastImportTime?: Date;
  importFrequency: number; // hours
  maxItemsPerImport: number;
  contentFilters: {
    keywords: string[];
    excludeKeywords: string[];
    minWordCount: number;
  };
}

// RSS import result
export interface ImportResult {
  feedId: string;
  success: boolean;
  itemsProcessed: number;
  itemsImported: number;
  itemsSkipped: number;
  errors: string[];
  lastImportTime: Date;
}

// RSS item data structure
interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  category?: string;
  author?: string;
  content?: string;
}

/**
 * RSS Import Manager
 */
export class RSSImportManager {
  private userAgent = 'HIVE Campus Feed Bot 1.0';
  
  /**
   * Import content from an RSS feed
   */
  async importFromFeed(feedConfig: RSSFeedConfig): Promise<ImportResult> {
    const result: ImportResult = {
      feedId: feedConfig.id,
      success: false,
      itemsProcessed: 0,
      itemsImported: 0,
      itemsSkipped: 0,
      errors: [],
      lastImportTime: new Date()
    };

    try {
      
      
      // Fetch RSS feed
      const response = await fetch(feedConfig.url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'application/rss+xml, application/xml, text/xml'
        },
        timeout: 30000 // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xmlContent = await response.text();
      
      // Parse RSS XML
      const rssItems = this.parseRSSXML(xmlContent);
      result.itemsProcessed = rssItems.length;

      

      // Process each item
      for (const item of rssItems) {
        try {
          // Check if item should be imported
          if (!this.shouldImportItem(item, feedConfig)) {
            result.itemsSkipped++;
            continue;
          }

          // Check if item already exists
          if (await this.itemExists(item, feedConfig)) {
            result.itemsSkipped++;
            continue;
          }

          // Convert RSS item to campus event
          const campusEvent = this.convertToCampusEvent(item, feedConfig);
          
          // Save to database
          await this.saveCampusEvent(campusEvent);
          result.itemsImported++;

        } catch (itemError) {
          console.error(`Error processing RSS item: ${item.title}`, itemError);
          result.errors.push(`Item "${item.title}": ${itemError.message}`);
        }
      }

      // Update feed config with last import time
      await this.updateFeedLastImport(feedConfig.id, result.lastImportTime);

      result.success = true;
      

    } catch (error: any) {
      console.error(`❌ RSS import failed for ${feedConfig.name}:`, error);
      result.errors.push(error.message);
    }

    return result;
  }

  /**
   * Import from all active RSS feeds
   */
  async importFromAllFeeds(): Promise<ImportResult[]> {
    const feedConfigs = await this.getActiveFeedConfigs();
    const results: ImportResult[] = [];

    

    // Process feeds in parallel with limited concurrency
    const concurrency = 3;
    for (let i = 0; i < feedConfigs.length; i += concurrency) {
      const batch = feedConfigs.slice(i, i + concurrency);
      
      const batchPromises = batch.map(config => this.importFromFeed(config));
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          console.error(`Failed to import from ${batch[index].name}:`, result.reason);
          results.push({
            feedId: batch[index].id,
            success: false,
            itemsProcessed: 0,
            itemsImported: 0,
            itemsSkipped: 0,
            errors: [result.reason.message || 'Unknown error'],
            lastImportTime: new Date()
          });
        }
      });

      // Small delay between batches to avoid overwhelming servers
      if (i + concurrency < feedConfigs.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const totalImported = results.reduce((sum, r) => sum + r.itemsImported, 0);
    

    return results;
  }

  /**
   * Parse RSS XML content
   */
  private parseRSSXML(xmlContent: string): RSSItem[] {
    // Note: In production, use a proper XML parser like 'fast-xml-parser'
    // This is a simplified parser for demonstration
    
    const items: RSSItem[] = [];
    
    try {
      // Extract items using regex (simplified approach)
      const itemMatches = xmlContent.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];
      
      for (const itemXml of itemMatches) {
        const item: RSSItem = {
          title: this.extractXMLValue(itemXml, 'title') || 'Untitled',
          description: this.extractXMLValue(itemXml, 'description') || '',
          link: this.extractXMLValue(itemXml, 'link') || '',
          pubDate: this.parseDate(this.extractXMLValue(itemXml, 'pubDate')),
          category: this.extractXMLValue(itemXml, 'category'),
          author: this.extractXMLValue(itemXml, 'author'),
          content: this.extractXMLValue(itemXml, 'content:encoded')
        };
        
        items.push(item);
      }
      
    } catch (error) {
      console.error('Error parsing RSS XML:', error);
    }
    
    return items;
  }

  /**
   * Extract value from XML using tag name
   */
  private extractXMLValue(xml: string, tagName: string): string | undefined {
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
    const match = xml.match(regex);
    return match ? match[1].trim().replace(/<!\[CDATA\[|\]\]>/g, '') : undefined;
  }

  /**
   * Parse date string to Date object
   */
  private parseDate(dateString?: string): Date {
    if (!dateString) return new Date();
    
    // Try to parse various date formats
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  }

  /**
   * Check if RSS item should be imported based on filters
   */
  private shouldImportItem(item: RSSItem, feedConfig: RSSFeedConfig): boolean {
    const { contentFilters } = feedConfig;
    
    // Check minimum word count
    const wordCount = (item.title + ' ' + item.description).split(/\s+/).length;
    if (wordCount < contentFilters.minWordCount) {
      return false;
    }

    const content = (item.title + ' ' + item.description + ' ' + (item.content || '')).toLowerCase();

    // Check exclude keywords
    if (contentFilters.excludeKeywords.some(keyword => content.includes(keyword.toLowerCase()))) {
      return false;
    }

    // Check include keywords (if any specified)
    if (contentFilters.keywords.length > 0) {
      if (!contentFilters.keywords.some(keyword => content.includes(keyword.toLowerCase()))) {
        return false;
      }
    }

    // Check if content is too old (more than 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    if (item.pubDate < thirtyDaysAgo) {
      return false;
    }

    return true;
  }

  /**
   * Check if RSS item already exists in database
   */
  private async itemExists(item: RSSItem, feedConfig: RSSFeedConfig): Promise<boolean> {
    try {
      // Check by link (most reliable identifier)
      if (item.link) {
        const existingByLink = await dbAdmin.collection('campus_events')
          .where('importSource', '==', feedConfig.id)
          .where('originalLink', '==', item.link)
          .limit(1)
          .get();
        
        if (!existingByLink.empty) return true;
      }

      // Check by title and date (fallback)
      const existingByTitle = await dbAdmin.collection('campus_events')
        .where('importSource', '==', feedConfig.id)
        .where('title', '==', item.title)
        .where('createdAt', '>=', new Date(item.pubDate.getTime() - 60000)) // 1 minute tolerance
        .where('createdAt', '<=', new Date(item.pubDate.getTime() + 60000))
        .limit(1)
        .get();

      return !existingByTitle.empty;

    } catch (error) {
      console.error('Error checking if item exists:', error);
      return false; // If we can't check, assume it doesn't exist
    }
  }

  /**
   * Convert RSS item to campus event
   */
  private convertToCampusEvent(item: RSSItem, feedConfig: RSSFeedConfig): CampusEvent {
    // Extract potential event date from content
    const eventDate = this.extractEventDate(item) || item.pubDate;
    
    return {
      id: '', // Will be set by Firestore
      title: this.cleanTitle(item.title),
      description: this.cleanDescription(item.description),
      category: item.category || feedConfig.category,
      startDate: eventDate,
      location: this.extractLocation(item),
      organizer: item.author || feedConfig.university,
      tags: this.extractTags(item, feedConfig),
      importSource: feedConfig.id,
      isPublic: true,
      createdAt: new Date(),
      originalLink: item.link,
      university: feedConfig.university
    } as CampusEvent & { originalLink: string; university: string };
  }

  /**
   * Save campus event to database
   */
  private async saveCampusEvent(event: CampusEvent): Promise<void> {
    await dbAdmin.collection('campus_events').add({
      ...event,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  /**
   * Get active RSS feed configurations
   */
  private async getActiveFeedConfigs(): Promise<RSSFeedConfig[]> {
    try {
      const snapshot = await dbAdmin.collection('rss_feeds')
        .where('isActive', '==', true)
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RSSFeedConfig[];

    } catch (error) {
      console.error('Error getting RSS feed configs:', error);
      return [];
    }
  }

  /**
   * Update feed's last import time
   */
  private async updateFeedLastImport(feedId: string, lastImportTime: Date): Promise<void> {
    try {
      await dbAdmin.collection('rss_feeds').doc(feedId).update({
        lastImportTime,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating feed last import time:', error);
    }
  }

  /**
   * Extract event date from content (look for date patterns)
   */
  private extractEventDate(item: RSSItem): Date | null {
    const content = item.title + ' ' + item.description;
    
    // Look for date patterns like "March 15", "3/15/2024", etc.
    const datePatterns = [
      /(\w+\s+\d{1,2},?\s+\d{4})/g, // March 15, 2024
      /(\d{1,2}\/\d{1,2}\/\d{4})/g, // 3/15/2024
      /(\d{1,2}-\d{1,2}-\d{4})/g    // 3-15-2024
    ];

    for (const pattern of datePatterns) {
      const matches = content.match(pattern);
      if (matches) {
        const date = new Date(matches[0]);
        if (!isNaN(date.getTime()) && date > new Date()) {
          return date;
        }
      }
    }

    return null;
  }

  /**
   * Extract location from content
   */
  private extractLocation(item: RSSItem): string | undefined {
    const content = item.title + ' ' + item.description;
    
    // Look for location patterns
    const locationPatterns = [
      /(?:at|in|location:?)\s+([^,.!?]+)/i,
      /room\s+(\w+)/i,
      /building\s+(\w+)/i
    ];

    for (const pattern of locationPatterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return undefined;
  }

  /**
   * Extract tags from content
   */
  private extractTags(item: RSSItem, feedConfig: RSSFeedConfig): string[] {
    const tags = [feedConfig.category];
    
    if (item.category) {
      tags.push(item.category.toLowerCase());
    }

    // Add university tag
    tags.push(feedConfig.university.toLowerCase());

    return [...new Set(tags)]; // Remove duplicates
  }

  /**
   * Clean and format title
   */
  private cleanTitle(title: string): string {
    return title
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&[^;]+;/g, ' ') // Remove HTML entities
      .trim()
      .substring(0, 200); // Limit length
  }

  /**
   * Clean and format description
   */
  private cleanDescription(description: string): string {
    return description
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&[^;]+;/g, ' ') // Remove HTML entities
      .trim()
      .substring(0, 1000); // Limit length
  }
}

/**
 * Global RSS import manager instance
 */
export const rssImportManager = new RSSImportManager();

/**
 * Background job to run RSS imports
 */
export async function runScheduledRSSImports(): Promise<ImportResult[]> {
  
  
  try {
    const results = await rssImportManager.importFromAllFeeds();
    
    const totalImported = results.reduce((sum, r) => sum + r.itemsImported, 0);
    const successfulFeeds = results.filter(r => r.success).length;
    
    
    
    return results;
  } catch (error) {
    console.error('❌ Scheduled RSS imports failed:', error);
    throw error;
  }
}