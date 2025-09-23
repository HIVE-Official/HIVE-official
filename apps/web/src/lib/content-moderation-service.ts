/**
 * Content Moderation Service
 * Comprehensive content reporting, flagging, and automated moderation system
 */

import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from '@/lib/logger';
import { sseRealtimeService } from '@/lib/sse-realtime-service';

// Content types that can be reported
export type ContentType = 
  | 'post' 
  | 'comment' 
  | 'message' 
  | 'tool' 
  | 'space' 
  | 'profile' 
  | 'event';

// Report categories
export type ReportCategory = 
  | 'spam'
  | 'harassment' 
  | 'hate_speech' 
  | 'inappropriate_content' 
  | 'misinformation' 
  | 'copyright' 
  | 'privacy_violation' 
  | 'violence' 
  | 'self_harm' 
  | 'impersonation' 
  | 'other';

// Severity levels
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

// Moderation actions
export type ModerationAction = 
  | 'no_action' 
  | 'warn_user' 
  | 'hide_content' 
  | 'remove_content' 
  | 'suspend_user' 
  | 'ban_user' 
  | 'escalate_human';

// Report status
export type ReportStatus = 
  | 'pending' 
  | 'under_review' 
  | 'resolved' 
  | 'dismissed' 
  | 'escalated';

export interface ContentReport {
  id: string;
  reporterId: string;
  reporterInfo: {
    name: string;
    email: string;
    trustScore: number;
  };
  contentId: string;
  contentType: ContentType;
  contentOwnerId: string;
  spaceId?: string;
  category: ReportCategory;
  subCategory?: string;
  severity: SeverityLevel;
  description: string;
  evidence?: {
    screenshots: string[];
    urls: string[];
    additionalContext: string;
  };
  metadata: {
    userAgent: string;
    ipAddress?: string;
    timestamp: string;
    contentSnapshot: any;
    reporterHistory: {
      totalReports: number;
      accurateReports: number;
      falseReports: number;
    };
  };
  status: ReportStatus;
  assignedModerator?: string;
  moderationHistory: ModerationEvent[];
  resolution?: {
    action: ModerationAction;
    reason: string;
    moderator: string;
    timestamp: string;
    appealable: boolean;
  };
  aiAnalysis?: AIAnalysisResult;
  createdAt: string;
  updatedAt: string;
}

export interface ModerationEvent {
  id: string;
  action: string;
  moderator: string;
  timestamp: string;
  reason: string;
  previousStatus: ReportStatus;
  newStatus: ReportStatus;
  notes?: string;
}

export interface AIAnalysisResult {
  confidence: number;
  suggestedAction: ModerationAction;
  riskScore: number;
  categories: {
    category: ReportCategory;
    confidence: number;
  }[];
  languageAnalysis: {
    toxicity: number;
    threat: number;
    profanity: number;
    identity_attack: number;
  };
  contextualFactors: {
    userHistory: number;
    contentPopularity: number;
    spaceContext: number;
  };
  flags: string[];
  reasoning: string;
  processingTime: number;
  modelVersion: string;
}

export interface ModerationQueue {
  id: string;
  name: string;
  description: string;
  priority: number;
  filters: {
    categories: ReportCategory[];
    severities: SeverityLevel[];
    contentTypes: ContentType[];
    ageRange: {
      min: number; // hours
      max: number; // hours
    };
    aiConfidence: {
      min: number;
      max: number;
    };
  };
  assignedModerators: string[];
  autoAssignment: boolean;
  maxConcurrentReports: number;
  isActive: boolean;
  statistics: {
    totalReports: number;
    pendingReports: number;
    processedToday: number;
    averageResolutionTime: number; // minutes
  };
}

export interface ModerationRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  priority: number;
  conditions: {
    categories: ReportCategory[];
    severities: SeverityLevel[];
    aiConfidence: number;
    reporterTrustScore: number;
    multipleReports: number;
    contentAge: number; // hours
  };
  actions: {
    automatic: ModerationAction[];
    requireHumanReview: boolean;
    notifyModerators: boolean;
    escalateImmediately: boolean;
  };
  statistics: {
    triggered: number;
    accuracy: number;
    lastTriggered?: string;
  };
}

export class ContentModerationService {
  
  /**
   * Submit a content report
   */
  async submitReport(reportData: {
    reporterId: string;
    contentId: string;
    contentType: ContentType;
    category: ReportCategory;
    subCategory?: string;
    description: string;
    evidence?: ContentReport['evidence'];
    spaceId?: string;
    userAgent: string;
  }): Promise<string> {
    try {
      const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

      // Get reporter information
      const reporterInfo = await this.getReporterInfo(reportData.reporterId);
      
      // Get content information and snapshot
      const contentInfo = await this.getContentInfo(reportData.contentId, reportData.contentType);
      
      // Calculate initial severity
      const severity = this.calculateSeverity(reportData.category, reporterInfo.trustScore);

      // Create report
      const report: ContentReport = {
        id: reportId,
        reporterId: reportData.reporterId,
        reporterInfo,
        contentId: reportData.contentId,
        contentType: reportData.contentType,
        contentOwnerId: contentInfo.ownerId,
        spaceId: reportData.spaceId,
        category: reportData.category,
        subCategory: reportData.subCategory,
        severity,
        description: reportData.description,
        evidence: reportData.evidence,
        metadata: {
          userAgent: reportData.userAgent,
          timestamp: new Date().toISOString(),
          contentSnapshot: contentInfo.content,
          reporterHistory: await this.getReporterHistory(reportData.reporterId)
        },
        status: 'pending',
        moderationHistory: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Store report
      await dbAdmin.collection('contentReports').doc(reportId).set(report);

      // Trigger AI analysis
      const aiAnalysis = await this.performAIAnalysis(report);
      if (aiAnalysis) {
        await this.updateReport(reportId, { aiAnalysis });
      }

      // Apply automated rules
      await this.applyAutomatedRules(reportId);

      // Assign to moderation queue
      await this.assignToQueue(reportId);

      // Update reporter statistics
      await this.updateReporterStats(reportData.reporterId);

      // Notify relevant parties
      await this.sendReportNotifications(reportId);

      logger.info('Content report submitted', {
        reportId,
        category: reportData.category
      });

      return reportId;
    } catch (error) {
      logger.error('Error submitting content report', { error, postData: reportData });
      throw error;
    }
  }

  /**
   * Process moderation action
   */
  async processModerationAction(
    reportId: string,
    moderatorId: string,
    action: ModerationAction,
    reason: string,
    notes?: string
  ): Promise<void> {
    try {
      const report = await this.getReport(reportId);
      if (!report) {
        throw new Error('Report not found');
      }

      // Create moderation event
      const event: ModerationEvent = {
        id: `event_${Date.now()}`,
        action,
        moderator: moderatorId,
        timestamp: new Date().toISOString(),
        reason,
        previousStatus: report.status,
        newStatus: this.getStatusFromAction(action),
        notes
      };

      // Execute the moderation action
      await this.executeAction(action, report);

      // Update report
      const updates: any = {
        status: event.newStatus,
        assignedModerator: moderatorId,
        moderationHistory: [...report.moderationHistory, event],
        updatedAt: new Date().toISOString()
      };

      if (action !== 'no_action' && action !== 'escalate_human') {
        updates.resolution = {
          action,
          reason,
          moderator: moderatorId,
          timestamp: new Date().toISOString(),
          appealable: this.isActionAppealable(action)
        };
      }

      await this.updateReport(reportId, updates);

      // Update statistics
      await this.updateModerationStats(moderatorId, action);

      // Send notifications
      await this.sendModerationNotifications(reportId, action);

      logger.info('Moderation action processed', { reportId, action, moderatorId });
    } catch (error) {
      logger.error('Error processing moderation action', { error, reportId, action });
      throw error;
    }
  }

  /**
   * Get moderation queue with filters
   */
  async getModerationQueue(
    queueId?: string,
    moderatorId?: string,
    limit: number = 50
  ): Promise<ContentReport[]> {
    try {
      let query = dbAdmin.collection('contentReports')
        .where('status', 'in', ['pending', 'under_review'])
        .orderBy('severity', 'desc')
        .orderBy('createdAt', 'asc')
        .limit(limit);

      // Apply queue filters if specified
      if (queueId) {
        const queue = await this.getQueue(queueId);
        if (queue) {
          query = this.applyQueueFilters(query);
        }
      }

      // Filter by assigned moderator
      if (moderatorId) {
        query = query.where('assignedModerator', '==', moderatorId);
      }

      const snapshot = await query.get();
      return snapshot.docs.map(doc => doc.data() as ContentReport);
    } catch (error) {
      logger.error('Error getting moderation queue', { error });
      throw error;
    }
  }

  /**
   * Perform AI analysis on content
   */
  private async performAIAnalysis(report: ContentReport): Promise<AIAnalysisResult | null> {
    try {
      const startTime = Date.now();

      // This would integrate with actual AI moderation services
      // For now, we'll simulate the analysis
      const mockAnalysis: AIAnalysisResult = {
        confidence: this.calculateAIConfidence(),
        suggestedAction: this.suggestAction(report),
        riskScore: this.calculateRiskScore(),
        categories: [{
          category: report.category,
          confidence: 0.85
        }],
        languageAnalysis: {
          toxicity: Math.random() * 0.5,
          threat: Math.random() * 0.3,
          profanity: Math.random() * 0.4,
          identity_attack: Math.random() * 0.2
        },
        contextualFactors: {
          userHistory: await this.getUserRiskScore(),
          contentPopularity: Math.random(),
          spaceContext: Math.random()
        },
        flags: this.generateFlags(),
        reasoning: this.generateReasoning(report),
        processingTime: Date.now() - startTime,
        modelVersion: '1.0.0'
      };

      return mockAnalysis;
    } catch (error) {
      logger.error('Error performing AI analysis', { error, reportId: report.id });
      return null;
    }
  }

  /**
   * Apply automated moderation rules
   */
  private async applyAutomatedRules(reportId: string): Promise<void> {
    try {
      const report = await this.getReport(reportId);
      if (!report) return;

      const rules = await this.getActiveRules();
      
      for (const rule of rules) {
        if (this.ruleMatches(rule, report)) {
          await this.triggerRule(rule, reportId);
          
          // Update rule statistics
          await this.updateRuleStats(rule.id);
          
          // Break if rule requires immediate action
          if (rule.actions.escalateImmediately) {
            break;
          }
        }
      }
    } catch (error) {
      logger.error('Error applying automated rules', { error, reportId });
    }
  }

  /**
   * Execute moderation action
   */
  private async executeAction(action: ModerationAction, report: ContentReport): Promise<void> {
    try {
      switch (action) {
        case 'hide_content':
          await this.hideContent(report.contentId, report.contentType);
          break;
          
        case 'remove_content':
          await this.removeContent(report.contentId, report.contentType);
          break;
          
        case 'warn_user':
          await this.warnUser(report.contentOwnerId, report.category);
          break;
          
        case 'suspend_user':
          await this.suspendUser(report.contentOwnerId, 7); // 7 days
          break;
          
        case 'ban_user':
          await this.banUser(report.contentOwnerId);
          break;
          
        case 'escalate_human':
          await this.escalateToHuman(report.id);
          break;
          
        case 'no_action':
          // No action needed
          break;
      }
    } catch (error) {
      logger.error('Error executing moderation action', { error, action, reportId: report.id });
      throw error;
    }
  }

  /**
   * Hide content from public view
   */
  private async hideContent(contentId: string, contentType: ContentType): Promise<void> {
    try {
      const collection = this.getContentCollection(contentType);
      await dbAdmin.collection(collection).doc(contentId).update({
        isHidden: true,
        hiddenAt: new Date().toISOString(),
        hiddenReason: 'Content violates community guidelines'
      });
    } catch (error) {
      logger.error('Error hiding content', { error });
      throw error;
    }
  }

  /**
   * Remove content permanently
   */
  private async removeContent(contentId: string, contentType: ContentType): Promise<void> {
    try {
      const collection = this.getContentCollection(contentType);
      
      // Soft delete - mark as deleted but keep for appeals
      await dbAdmin.collection(collection).doc(contentId).update({
        isDeleted: true,
        deletedAt: new Date().toISOString(),
        deletedReason: 'Content violates community guidelines'
      });
      
      // Move to deleted content collection
      const contentDoc = await dbAdmin.collection(collection).doc(contentId).get();
      if (contentDoc.exists) {
        await dbAdmin.collection('deletedContent').doc(contentId).set({
          originalCollection: collection,
          originalData: contentDoc.data(),
          deletedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      logger.error('Error removing content', { error });
      throw error;
    }
  }

  /**
   * Warn user about policy violation
   */
  private async warnUser(userId: string, category: ReportCategory): Promise<void> {
    try {
      const warning = {
        id: `warning_${Date.now()}`,
        userId,
        category,
        message: this.getWarningMessage(category),
        timestamp: new Date().toISOString(),
        acknowledged: false
      };

      await dbAdmin.collection('userWarnings').doc(warning.id).set(warning);
      
      // Send notification to user
      await sseRealtimeService.sendNotification(
        userId,
        {
          title: 'Community Guidelines Warning',
          message: warning.message,
          type: 'warning',
          actionUrl: '/profile/warnings'
        }
      );
    } catch (error) {
      logger.error('Error warning user', { error, userId, category });
      throw error;
    }
  }

  /**
   * Suspend user account
   */
  private async suspendUser(userId: string, days: number): Promise<void> {
    try {
      const suspensionEnd = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      
      await dbAdmin.collection('users').doc(userId).update({
        isSuspended: true,
        suspendedUntil: suspensionEnd.toISOString(),
        suspendedAt: new Date().toISOString()
      });

      // Log suspension
      await dbAdmin.collection('userSuspensions').add({
        userId,
        suspendedAt: new Date().toISOString(),
        suspendedUntil: suspensionEnd.toISOString(),
        reason: 'Community guidelines violation',
        days
      });

      // Notify user
      await sseRealtimeService.sendNotification(
        userId,
        {
          title: 'Account Suspended',
          message: `Your account has been suspended for ${days} days due to community guidelines violations.`,
          type: 'error',
          actionUrl: '/profile/suspension'
        }
      );
    } catch (error) {
      logger.error('Error suspending user', { error, userId });
      throw error;
    }
  }

  /**
   * Ban user account permanently
   */
  private async banUser(userId: string): Promise<void> {
    try {
      await dbAdmin.collection('users').doc(userId).update({
        isBanned: true,
        bannedAt: new Date().toISOString(),
        status: 'banned'
      });

      // Log ban
      await dbAdmin.collection('userBans').add({
        userId,
        bannedAt: new Date().toISOString(),
        reason: 'Severe community guidelines violation',
        permanent: true
      });

      // Notify relevant moderators
      await this.notifyModerators('user_banned', { userId });
    } catch (error) {
      logger.error('Error banning user', { error, userId });
      throw error;
    }
  }

  // Helper methods
  private async getReporterInfo(reporterId: string) {
    const userDoc = await dbAdmin.collection('users').doc(reporterId).get();
    const userData = userDoc.data();
    
    return {
      name: userData?.displayName || 'Anonymous',
      email: userData?.email || '',
      trustScore: userData?.trustScore || 0.5
    };
  }

  private async getContentInfo(contentId: string, contentType: ContentType) {
    const collection = this.getContentCollection(contentType);
    const doc = await dbAdmin.collection(collection).doc(contentId).get();
    const data = doc.data();
    
    return {
      ownerId: data?.userId || data?.authorId || data?.createdBy || 'unknown',
      content: data || {}
    };
  }

  private getContentCollection(contentType: ContentType): string {
    const collections = {
      'post': 'posts',
      'comment': 'comments',
      'message': 'messages',
      'tool': 'tools',
      'space': 'spaces',
      'profile': 'users',
      'event': 'events'
    };
    return collections[contentType];
  }

  private calculateSeverity(category: ReportCategory, trustScore: number): SeverityLevel {
    const baseSeverity = {
      'harassment': 'high',
      'hate_speech': 'critical',
      'violence': 'critical',
      'self_harm': 'critical',
      'spam': 'low',
      'inappropriate_content': 'medium',
      'misinformation': 'medium',
      'copyright': 'medium',
      'privacy_violation': 'high',
      'impersonation': 'high',
      'other': 'low'
    };
    
    let severity = baseSeverity[category] as SeverityLevel;
    
    // Adjust based on reporter trust score
    if (trustScore > 0.8 && severity === 'low') severity = 'medium';
    if (trustScore < 0.3 && severity === 'high') severity = 'medium';
    
    return severity;
  }

  private async getReport(reportId: string): Promise<ContentReport | null> {
    const doc = await dbAdmin.collection('contentReports').doc(reportId).get();
    return doc.exists ? doc.data() as ContentReport : null;
  }

  private async updateReport(reportId: string, updates: Partial<ContentReport>): Promise<void> {
    await dbAdmin.collection('contentReports').doc(reportId).update({
      ...updates,
      updatedAt: new Date().toISOString()
    });
  }

  private getStatusFromAction(action: ModerationAction): ReportStatus {
    const statusMap = {
      'no_action': 'dismissed',
      'warn_user': 'resolved',
      'hide_content': 'resolved',
      'remove_content': 'resolved',
      'suspend_user': 'resolved',
      'ban_user': 'resolved',
      'escalate_human': 'escalated'
    };
    return statusMap[action] as ReportStatus;
  }

  private isActionAppealable(action: ModerationAction): boolean {
    return ['hide_content', 'remove_content', 'suspend_user', 'ban_user'].includes(action);
  }

  private getWarningMessage(category: ReportCategory): string {
    const messages = {
      'spam': 'Please avoid posting repetitive or irrelevant content.',
      'harassment': 'Your behavior has been reported as harassment. Please be respectful to all community members.',
      'hate_speech': 'Content promoting hate speech is not allowed in our community.',
      'inappropriate_content': 'Please ensure your content is appropriate for all community members.',
      'misinformation': 'Please verify information before sharing to maintain community trust.',
      'copyright': 'Please respect intellectual property rights when sharing content.',
      'privacy_violation': 'Please respect other users\' privacy and personal information.',
      'violence': 'Content promoting or depicting violence is not allowed.',
      'self_harm': 'We care about your wellbeing. Please reach out for support if needed.',
      'impersonation': 'Impersonating others is not allowed in our community.',
      'other': 'Your content has been flagged for violating our community guidelines.'
    };
    return messages[category];
  }

  // Mock implementations for remaining methods
  private calculateAIConfidence(): number {
    return Math.random() * 0.5 + 0.5; // 0.5-1.0
  }

  private suggestAction(report: ContentReport): ModerationAction {
    const actions = {
      'critical': 'remove_content',
      'high': 'hide_content', 
      'medium': 'warn_user',
      'low': 'no_action'
    };
    return actions[report.severity] as ModerationAction;
  }

  private calculateRiskScore(): number {
    return Math.random(); // 0-1
  }

  private async getUserRiskScore(): Promise<number> {
    return Math.random(); // 0-1
  }

  private generateFlags(): string[] {
    const possibleFlags = ['repeated_reports', 'high_risk_user', 'viral_content', 'sensitive_space'];
    return possibleFlags.filter(() => Math.random() > 0.7);
  }

  private generateReasoning(report: ContentReport): string {
    return `Content flagged for ${report.category} based on report analysis and user history.`;
  }

  private async getActiveRules(): Promise<ModerationRule[]> {
    const snapshot = await dbAdmin.collection('moderationRules')
      .where('isActive', '==', true)
      .orderBy('priority', 'desc')
      .get();
    return snapshot.docs.map(doc => doc.data() as ModerationRule);
  }

  private ruleMatches(rule: ModerationRule, report: ContentReport): boolean {
    return rule.conditions.categories.includes(report.category) &&
           rule.conditions.severities.includes(report.severity);
  }

  private async triggerRule(rule: ModerationRule, reportId: string): Promise<void> {
    logger.info('Triggering moderation rule', { ruleId: rule.id, reportId });
  }

  private async updateRuleStats(ruleId: string): Promise<void> {
    await dbAdmin.collection('moderationRules').doc(ruleId).update({
      'statistics.triggered': FieldValue.increment(1),
      'statistics.lastTriggered': new Date().toISOString()
    });
  }

  private async assignToQueue(reportId: string): Promise<void> {
    // This would implement queue assignment logic
    logger.info('Assigning report to queue', { reportId });
  }

  private async updateReporterStats(reporterId: string): Promise<void> {
    await dbAdmin.collection('users').doc(reporterId).update({
      'moderationStats.totalReports': FieldValue.increment(1),
      'moderationStats.lastReport': new Date().toISOString()
    });
  }

  private async sendReportNotifications(reportId: string): Promise<void> {
    // Notify moderators of new report
    await this.notifyModerators('new_report', { reportId });
  }

  private async sendModerationNotifications(reportId: string, action: ModerationAction): Promise<void> {
    // Send notifications based on action
    logger.info('Sending moderation notifications', { reportId, action });
  }

  private async updateModerationStats(moderatorId: string, action: ModerationAction): Promise<void> {
    await dbAdmin.collection('users').doc(moderatorId).update({
      'moderationStats.actionsToday': FieldValue.increment(1),
      'moderationStats.lastAction': new Date().toISOString(),
      [`moderationStats.actions.${action}`]: FieldValue.increment(1)
    });
  }

  private async notifyModerators(type: string, data: any): Promise<void> {
    // Get active moderators and send notifications
    logger.info('Notifying moderators', { type, data });
  }

  private async escalateToHuman(reportId: string): Promise<void> {
    await this.updateReport(reportId, { status: 'escalated' });
    await this.notifyModerators('escalated_report', { reportId });
  }

  private async getReporterHistory(reporterId: string) {
    const snapshot = await dbAdmin.collection('contentReports')
      .where('reporterId', '==', reporterId)
      .get();
    
    return {
      totalReports: snapshot.size,
      accurateReports: Math.floor(snapshot.size * 0.8),
      falseReports: Math.floor(snapshot.size * 0.2)
    };
  }

  private async getQueue(queueId: string): Promise<ModerationQueue | null> {
    const doc = await dbAdmin.collection('moderationQueues').doc(queueId).get();
    return doc.exists ? doc.data() as ModerationQueue : null;
  }

  private applyQueueFilters(query: any): any {
    // Apply queue-specific filters
    return query;
  }
}

// Export singleton instance
export const contentModerationService = new ContentModerationService();