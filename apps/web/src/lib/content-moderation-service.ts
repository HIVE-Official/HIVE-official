/**
 * Content Moderation Service
 * 
 * Provides comprehensive content moderation capabilities for the HIVE platform.
 * This service handles content filtering, user reports, automated moderation,
 * and manual review processes to maintain a safe community environment.
 * 
 * Features:
 * - Profanity filtering with customizable word lists
 * - Spam detection
 * - User reporting system
 * - Moderation queue management
 * - Automated content scoring
 * - Manual review workflows
 * - Audit logging for all moderation actions
 */

import { db } from './firebase-client';
import { adminDb } from './firebase-admin';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc,
  getDocs,
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { logger } from './structured-logger';

/**
 * Content report types
 */
export type ReportType = 
  | 'inappropriate'
  | 'spam'
  | 'harassment'
  | 'hate_speech'
  | 'violence'
  | 'self_harm'
  | 'false_information'
  | 'copyright'
  | 'other';

/**
 * Content types that can be moderated
 */
export type ContentType = 
  | 'post'
  | 'comment'
  | 'message'
  | 'profile'
  | 'space'
  | 'event'
  | 'tool';

/**
 * Moderation action types
 */
export type ModerationAction = 
  | 'approve'
  | 'reject'
  | 'delete'
  | 'hide'
  | 'warn'
  | 'ban_user'
  | 'require_edit'
  | 'escalate';

/**
 * Moderation status
 */
export type ModerationStatus = 
  | 'pending'
  | 'reviewing'
  | 'approved'
  | 'rejected'
  | 'escalated';

/**
 * Content report interface
 */
export interface ContentReport {
  id?: string;
  contentId: string;
  contentType: ContentType;
  reportType: ReportType;
  reporterId: string;
  reporterEmail?: string;
  description: string;
  contentSnapshot?: any;
  status: ModerationStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  createdAt: Timestamp | ReturnType<typeof serverTimestamp>;
  updatedAt?: Timestamp | ReturnType<typeof serverTimestamp>;
  resolvedAt?: Timestamp;
  resolution?: {
    action: ModerationAction;
    moderatorId: string;
    notes?: string;
  };
}

/**
 * Moderation queue filter
 */
export interface ModerationQueueFilter {
  status?: ModerationStatus;
  contentType?: ContentType;
  reportType?: ReportType;
  priority?: string;
  assignedTo?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

/**
 * Content moderation configuration
 */
interface ModerationConfig {
  enableAutoModeration: boolean;
  profanityThreshold: number;
  spamThreshold: number;
  customBlockedWords: string[];
  trustedUsers: string[];
  moderatorIds: string[];
}

/**
 * Content Moderation Service Class
 */
class ContentModerationService {
  private readonly reportsCollection = 'content_reports';
  private readonly configCollection = 'moderation_config';
  private config: ModerationConfig;
  
  // Default blocked words (basic list - expand as needed)
  private defaultBlockedWords = [
    // This would contain actual profanity in production
    // Keeping it clean for this implementation
    'spam',
    'scam',
    'phishing'
  ];

  constructor() {
    this.config = {
      enableAutoModeration: true,
      profanityThreshold: 0.7,
      spamThreshold: 0.8,
      customBlockedWords: [],
      trustedUsers: [],
      moderatorIds: []
    };
    
    // Load configuration on initialization
    this.loadConfiguration();
  }

  /**
   * Load moderation configuration from database
   */
  private async loadConfiguration(): Promise<void> {
    try {
      const configDoc = await getDoc(doc(db, this.configCollection, 'default'));
      if (configDoc.exists()) {
        this.config = {
          ...this.config,
          ...configDoc.data()
        };
      }
    } catch (error) {
      logger.error('Failed to load moderation config', error as Error);
    }
  }

  /**
   * Submit a content report
   */
  async submitReport(report: Omit<ContentReport, 'id' | 'createdAt' | 'status'>): Promise<string> {
    try {
      // Auto-assign priority based on report type
      const priority = this.calculatePriority(report.reportType);
      
      // Create the report document
      const reportData: Omit<ContentReport, 'id'> = {
        ...report,
        status: 'pending',
        priority,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Save to Firestore
      const docRef = await addDoc(
        collection(db, this.reportsCollection),
        reportData
      );

      // Log the report
      logger.info('Content report submitted', {
        reportId: docRef.id,
        contentType: report.contentType,
        reportType: report.reportType
      });

      // If high priority, notify moderators
      if (priority === 'high' || priority === 'critical') {
        await this.notifyModerators(docRef.id, report);
      }

      // Run auto-moderation if enabled
      if (this.config.enableAutoModeration) {
        await this.runAutoModeration(docRef.id, report);
      }

      return docRef.id;
    } catch (error) {
      logger.error('Failed to submit report', error as Error);
      throw new Error('Failed to submit content report');
    }
  }

  /**
   * Get moderation queue with filters
   */
  async getModerationQueue(
    filter: ModerationQueueFilter = {}
  ): Promise<ContentReport[]> {
    try {
      let q = query(collection(db, this.reportsCollection));

      // Apply filters
      if (filter.status) {
        q = query(q, where('status', '==', filter.status));
      }
      if (filter.contentType) {
        q = query(q, where('contentType', '==', filter.contentType));
      }
      if (filter.reportType) {
        q = query(q, where('reportType', '==', filter.reportType));
      }
      if (filter.priority) {
        q = query(q, where('priority', '==', filter.priority));
      }
      if (filter.assignedTo) {
        q = query(q, where('assignedTo', '==', filter.assignedTo));
      }

      // Order by priority and creation date
      q = query(q, orderBy('priority', 'desc'), orderBy('createdAt', 'desc'));

      // Apply limit
      if (filter.limit) {
        q = query(q, limit(filter.limit));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ContentReport));
    } catch (error) {
      logger.error('Failed to get moderation queue', error as Error);
      throw new Error('Failed to retrieve moderation queue');
    }
  }

  /**
   * Process a moderation action
   */
  async processModerationAction(
    reportId: string,
    action: ModerationAction,
    moderatorId: string,
    notes?: string
  ): Promise<void> {
    try {
      // Get the report
      const reportRef = doc(db, this.reportsCollection, reportId);
      const reportDoc = await getDoc(reportRef);
      
      if (!reportDoc.exists()) {
        throw new Error('Report not found');
      }

      const report = reportDoc.data() as ContentReport;

      // Update report with resolution
      await updateDoc(reportRef, {
        status: action === 'escalate' ? 'escalated' : 'resolved',
        resolution: {
          action,
          moderatorId,
          notes,
          timestamp: serverTimestamp()
        },
        resolvedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Execute the action
      await this.executeAction(report, action, moderatorId);

      // Log the action
      logger.info('Moderation action processed', {
        reportId,
        action,
        moderatorId,
        contentType: report.contentType,
        contentId: report.contentId
      });
    } catch (error) {
      logger.error('Failed to process moderation action', error as Error);
      throw new Error('Failed to process moderation action');
    }
  }

  /**
   * Check content for moderation issues
   */
  async checkContent(content: string): Promise<{
    isClean: boolean;
    issues: string[];
    score: number;
  }> {
    const issues: string[] = [];
    let score = 0;

    // Check for profanity
    const profanityScore = this.checkProfanity(content);
    if (profanityScore > this.config.profanityThreshold) {
      issues.push('profanity');
      score = Math.max(score, profanityScore);
    }

    // Check for spam
    const spamScore = this.checkSpam(content);
    if (spamScore > this.config.spamThreshold) {
      issues.push('spam');
      score = Math.max(score, spamScore);
    }

    // Check for blocked words
    const hasBlockedWords = this.checkBlockedWords(content);
    if (hasBlockedWords) {
      issues.push('blocked_words');
      score = 1.0;
    }

    return {
      isClean: issues.length === 0,
      issues,
      score
    };
  }

  /**
   * Check for profanity
   */
  private checkProfanity(content: string): number {
    const lowerContent = content.toLowerCase();
    const allBlockedWords = [
      ...this.defaultBlockedWords,
      ...this.config.customBlockedWords
    ];

    let matches = 0;
    for (const word of allBlockedWords) {
      if (lowerContent.includes(word.toLowerCase())) {
        matches++;
      }
    }

    // Calculate score based on matches
    return Math.min(matches * 0.3, 1.0);
  }

  /**
   * Check for spam patterns
   */
  private checkSpam(content: string): number {
    let score = 0;

    // Check for excessive caps
    const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (capsRatio > 0.5) score += 0.3;

    // Check for excessive punctuation
    const punctuationRatio = (content.match(/[!?]{2,}/g) || []).length;
    if (punctuationRatio > 2) score += 0.3;

    // Check for suspicious URLs
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const urls = content.match(urlPattern) || [];
    if (urls.length > 3) score += 0.4;

    // Check for repetitive content
    const words = content.split(/\s+/);
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size < words.length * 0.5) {
      score += 0.3;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Check for blocked words
   */
  private checkBlockedWords(content: string): boolean {
    const lowerContent = content.toLowerCase();
    const allBlockedWords = [
      ...this.defaultBlockedWords,
      ...this.config.customBlockedWords
    ];

    return allBlockedWords.some(word => 
      lowerContent.includes(word.toLowerCase())
    );
  }

  /**
   * Calculate priority based on report type
   */
  private calculatePriority(reportType: ReportType): ContentReport['priority'] {
    switch (reportType) {
      case 'self_harm':
      case 'violence':
        return 'critical';
      case 'hate_speech':
      case 'harassment':
        return 'high';
      case 'inappropriate':
      case 'false_information':
        return 'medium';
      default:
        return 'low';
    }
  }

  /**
   * Run automated moderation
   */
  private async runAutoModeration(
    reportId: string,
    report: Omit<ContentReport, 'id' | 'createdAt' | 'status'>
  ): Promise<void> {
    try {
      // Check if content should be auto-moderated
      if (report.contentSnapshot) {
        const check = await this.checkContent(report.contentSnapshot);
        
        if (check.score > 0.9) {
          // Auto-hide content with very high score
          await this.processModerationAction(
            reportId,
            'hide',
            'auto-moderator',
            `Automated action: High risk score ${check.score}. Issues: ${check.issues.join(', ')}`
          );
        }
      }
    } catch (error) {
      logger.error('Auto-moderation failed', error as Error, { reportId });
    }
  }

  /**
   * Execute moderation action
   */
  private async executeAction(
    report: ContentReport,
    action: ModerationAction,
    moderatorId: string
  ): Promise<void> {
    // This would implement the actual action based on content type
    // For example, hiding a post, banning a user, etc.
    // Implementation depends on your specific data structure
    
    switch (action) {
      case 'delete':
      case 'hide':
        // Update the content status in the appropriate collection
        await this.hideContent(report.contentType, report.contentId);
        break;
      case 'ban_user':
        // Implement user banning logic
        await this.banUser(report.reporterId);
        break;
      case 'warn':
        // Send warning to content creator
        await this.sendWarning(report.contentId, report.contentType);
        break;
      default:
        // Log action for manual processing
        logger.info('Manual moderation action required', {
          action,
          contentType: report.contentType,
          contentId: report.contentId
        });
    }
  }

  /**
   * Hide content
   */
  private async hideContent(contentType: ContentType, contentId: string): Promise<void> {
    // Update content visibility in the appropriate collection
    const collectionName = this.getCollectionName(contentType);
    if (collectionName) {
      await updateDoc(doc(db, collectionName, contentId), {
        hidden: true,
        hiddenAt: serverTimestamp(),
        moderationStatus: 'hidden'
      });
    }
  }

  /**
   * Ban user
   */
  private async banUser(userId: string): Promise<void> {
    // Update user status
    await updateDoc(doc(db, 'users', userId), {
      banned: true,
      bannedAt: serverTimestamp()
    });
  }

  /**
   * Send warning to user
   */
  private async sendWarning(contentId: string, contentType: ContentType): Promise<void> {
    // Create a warning notification
    // Implementation depends on your notification system
    logger.info('Warning sent', { contentId, contentType });
  }

  /**
   * Get collection name for content type
   */
  private getCollectionName(contentType: ContentType): string | null {
    const mapping: Record<ContentType, string> = {
      post: 'posts',
      comment: 'comments',
      message: 'messages',
      profile: 'users',
      space: 'spaces',
      event: 'events',
      tool: 'tools'
    };
    
    return mapping[contentType] || null;
  }

  /**
   * Notify moderators of high-priority report
   */
  private async notifyModerators(
    reportId: string,
    report: Omit<ContentReport, 'id' | 'createdAt' | 'status'>
  ): Promise<void> {
    // Send notifications to moderators
    // Implementation depends on your notification system
    logger.info('Moderators notified', {
      reportId,
      priority: this.calculatePriority(report.reportType)
    });
  }
}

// Export singleton instance
export const contentModerationService = new ContentModerationService();