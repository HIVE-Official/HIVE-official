/**
 * Automated Moderation Workflows
 * Handles automated content moderation triggers, escalation rules, and batch processing
 */

import { dbAdmin } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from './structured-logger';
import { contentModerationService } from './content-moderation-service';
import { sseRealtimeService } from './sse-realtime-service';

export interface AutomatedWorkflow {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  priority: number;
  triggers: {
    reportCount: number;
    timeWindow: number; // minutes
    aiConfidenceThreshold: number;
    severityLevels: string[];
    contentTypes: string[];
    reporterTrustThreshold: number;
  };
  actions: {
    immediate: AutomatedAction[];
    delayed: DelayedAction[];
    escalation: EscalationRule[];
  };
  conditions: {
    requireMultipleReports: boolean;
    requireAIConfirmation: boolean;
    requireHumanApproval: boolean;
    businessHoursOnly: boolean;
  };
  statistics: {
    triggeredCount: number;
    successCount: number;
    errorCount: number;
    lastTriggered?: string;
    averageProcessingTime: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AutomatedAction {
  type: 'hide_content' | 'remove_content' | 'warn_user' | 'suspend_user' | 'ban_user' | 'notify_moderators';
  parameters?: {
    duration?: number; // for suspensions
    message?: string;
    notificationTemplate?: string;
  };
  delayMinutes?: number;
}

export interface DelayedAction {
  action: AutomatedAction;
  executeAt: string;
  conditions: {
    noModerationAction: boolean;
    reportStillActive: boolean;
  };
}

// Type for creating workflows without executeAt (will be added during creation)
export interface DelayedActionInput {
  action: AutomatedAction;
  conditions: {
    noModerationAction: boolean;
    reportStillActive: boolean;
  };
}

// Type for workflow creation input
export interface AutomatedWorkflowInput extends Omit<AutomatedWorkflow, 'id' | 'statistics' | 'createdAt' | 'updatedAt' | 'actions'> {
  actions: {
    immediate: AutomatedAction[];
    delayed: DelayedActionInput[];
    escalation: EscalationRule[];
  };
}

export interface EscalationRule {
  condition: 'time_passed' | 'multiple_reports' | 'ai_confidence' | 'user_appeal';
  threshold: number;
  action: 'assign_human' | 'notify_admin' | 'priority_queue';
  parameters?: any;
}

export interface ModerationBatch {
  id: string;
  workflowId: string;
  reportIds: string[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  results: {
    processed: number;
    succeeded: number;
    failed: number;
    errors: string[];
  };
}

export class AutomatedModerationWorkflows {
  private processingQueue: Map<string, ModerationBatch> = new Map();
  private workflowInterval: NodeJS.Timeout;

  constructor() {
    // Run workflow checks every 5 minutes
    this.workflowInterval = setInterval(() => {
      this.processWorkflows();
    }, 5 * 60 * 1000);
  }

  /**
   * Process all active workflows
   */
  async processWorkflows(): Promise<void> {
    try {
      const activeWorkflows = await this.getActiveWorkflows();
      
      for (const workflow of activeWorkflows) {
        try {
          await this.processWorkflow(workflow);
        } catch (error) {
          logger.error('Error processing workflow', { error: error instanceof Error ? error.message : String(error), workflowId: workflow.id });
          await this.updateWorkflowStats(workflow.id, 'error');
        }
      }
      
      // Process delayed actions
      await this.processDelayedActions();
      
      // Process escalations
      await this.processEscalations();
      
    } catch (error) {
      logger.error('Error in automated moderation workflows', { error: error instanceof Error ? error.message : String(error) });
    }
  }

  /**
   * Process a specific workflow
   */
  private async processWorkflow(workflow: AutomatedWorkflow): Promise<void> {
    const now = Date.now();
    const windowStart = new Date(now - workflow.triggers.timeWindow * 60 * 1000);

    // Find reports that match workflow triggers
    const matchingReports = await this.findMatchingReports(workflow, windowStart);

    if (matchingReports.length === 0) return;

    logger.info('Processing automated workflow', {
      workflowId: workflow.id,
      metadata: { matchingReports: matchingReports.length }
    });

    // Group reports by content/user for batch processing
    const batches = this.groupReportsForBatching(matchingReports, workflow);

    for (const batch of batches) {
      await this.processBatch(workflow, batch);
    }

    await this.updateWorkflowStats(workflow.id, 'success');
  }

  /**
   * Find reports matching workflow criteria
   */
  private async findMatchingReports(workflow: AutomatedWorkflow, windowStart: Date): Promise<any[]> {
    try {
      let query = dbAdmin.collection('contentReports')
        .where('createdAt', '>=', windowStart.toISOString())
        .where('status', 'in', ['pending', 'under_review']);

      // Apply content type filters
      if (workflow.triggers.contentTypes.length > 0) {
        query = query.where('contentType', 'in', workflow.triggers.contentTypes);
      }

      const snapshot = await query.get();
      const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

      // Apply additional filters
      return reports.filter(report => {
        // Cast report to any to access properties
        const r = report as any;

        // AI confidence check
        if (r.aiAnalysis && r.aiAnalysis.confidence < workflow.triggers.aiConfidenceThreshold) {
          return false;
        }

        // Severity check
        if (!workflow.triggers.severityLevels.includes(r.severity)) {
          return false;
        }

        // Reporter trust score check
        if (r.reporterInfo?.trustScore < workflow.triggers.reporterTrustThreshold) {
          return false;
        }

        // Business hours check
        if (workflow.conditions.businessHoursOnly && !this.isBusinessHours()) {
          return false;
        }

        return true;
      });

    } catch (error) {
      logger.error('Error finding matching reports', { error: error instanceof Error ? error.message : String(error), workflowId: workflow.id });
      return [];
    }
  }

  /**
   * Group reports for efficient batch processing
   */
  private groupReportsForBatching(reports: any[], workflow: AutomatedWorkflow): any[][] {
    const batches: any[][] = [];
    const contentGroups = new Map<string, any[]>();
    const userGroups = new Map<string, any[]>();

    // Group by content or user
    for (const report of reports) {
      // Group by content ID for content-based actions
      if (!contentGroups.has(report.contentId)) {
        contentGroups.set(report.contentId, []);
      }
      contentGroups.get(report.contentId)!.push(report);

      // Group by content owner for user-based actions
      if (!userGroups.has(report.contentOwnerId)) {
        userGroups.set(report.contentOwnerId, []);
      }
      userGroups.get(report.contentOwnerId)!.push(report);
    }

    // Create batches based on content groups (for content actions)
    for (const contentReports of contentGroups.values()) {
      if (contentReports.length >= workflow.triggers.reportCount) {
        batches.push(contentReports);
      }
    }

    // Create batches based on user groups (for user actions)
    for (const userReports of userGroups.values()) {
      if (userReports.length >= workflow.triggers.reportCount) {
        batches.push(userReports);
      }
    }

    return batches;
  }

  /**
   * Process a batch of reports
   */
  private async processBatch(workflow: AutomatedWorkflow, reports: any[]): Promise<void> {
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
    
    const batch: ModerationBatch = {
      id: batchId,
      workflowId: workflow.id,
      reportIds: reports.map(r => r.id),
      status: 'processing',
      startedAt: new Date().toISOString(),
      results: {
        processed: 0,
        succeeded: 0,
        failed: 0,
        errors: []
      }
    };

    this.processingQueue.set(batchId, batch);

    try {
      // Execute immediate actions
      for (const action of workflow.actions.immediate) {
        try {
          await this.executeAutomatedAction(action, reports, workflow);
          batch.results.succeeded++;
        } catch (error) {
          batch.results.failed++;
          const errorMessage = error instanceof Error ? error.message : String(error);
          batch.results.errors.push(`Action ${action.type} failed: ${errorMessage}`);
          logger.error('Automated action failed', { error: error instanceof Error ? error.message : String(error), action: action.type, metadata: { batchId } });
        }
        batch.results.processed++;
      }

      // Schedule delayed actions
      for (const delayedAction of workflow.actions.delayed) {
        await this.scheduleDelayedAction(delayedAction, reports, workflow);
      }

      // Set up escalation rules
      for (const escalation of workflow.actions.escalation) {
        await this.setupEscalation(escalation, reports, workflow);
      }

      batch.status = 'completed';
      batch.completedAt = new Date().toISOString();

      logger.info('Batch processing completed', {
        workflowId: workflow.id,
        metadata: { batchId, results: batch.results }
      });

    } catch (error) {
      batch.status = 'failed';
      const errorMessage = error instanceof Error ? error.message : String(error);
      batch.results.errors.push(`Batch processing failed: ${errorMessage}`);
      logger.error('Batch processing failed', { error: errorMessage, metadata: { batchId } });
    }

    // Store batch results
    await dbAdmin.collection('moderationBatches').doc(batchId).set(batch);
    this.processingQueue.delete(batchId);
  }

  /**
   * Execute an automated action
   */
  private async executeAutomatedAction(
    action: AutomatedAction, 
    reports: any[], 
    workflow: AutomatedWorkflow
  ): Promise<void> {
    const representativeReport = reports[0]; // Use first report as representative

    switch (action.type) {
      case 'hide_content':
        await contentModerationService.processModerationAction(
          representativeReport.id,
          'system_automated',
          'hide_content',
          `Automated action triggered by workflow: ${workflow.name}`,
          `Multiple reports (${reports.length}) triggered automated content hiding`
        );
        break;

      case 'remove_content':
        await contentModerationService.processModerationAction(
          representativeReport.id,
          'system_automated',
          'remove_content',
          `Automated action triggered by workflow: ${workflow.name}`,
          `Multiple reports (${reports.length}) triggered automated content removal`
        );
        break;

      case 'warn_user':
        await contentModerationService.processModerationAction(
          representativeReport.id,
          'system_automated',
          'warn_user',
          `Automated warning triggered by workflow: ${workflow.name}`,
          `Multiple reports (${reports.length}) triggered automated user warning`
        );
        break;

      case 'suspend_user': {
        const suspensionDays = action.parameters?.duration || 7;
        await contentModerationService.processModerationAction(
          representativeReport.id,
          'system_automated',
          'suspend_user',
          `Automated ${suspensionDays}-day suspension triggered by workflow: ${workflow.name}`,
          `Multiple reports (${reports.length}) triggered automated user suspension`
        );
        break;
      }

      case 'ban_user':
        await contentModerationService.processModerationAction(
          representativeReport.id,
          'system_automated',
          'ban_user',
          `Automated ban triggered by workflow: ${workflow.name}`,
          `Multiple reports (${reports.length}) triggered automated user ban`
        );
        break;

      case 'notify_moderators':
        await this.notifyModerators(reports, workflow, action);
        break;
    }
  }

  /**
   * Schedule a delayed action
   */
  private async scheduleDelayedAction(
    delayedAction: DelayedAction,
    reports: any[],
    workflow: AutomatedWorkflow
  ): Promise<void> {
    const executeAt = new Date(Date.now() + delayedAction.action.delayMinutes! * 60 * 1000);

    const scheduledAction = {
      id: `delayed_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      workflowId: workflow.id,
      action: delayedAction.action,
      reportIds: reports.map(r => r.id),
      executeAt: executeAt.toISOString(),
      conditions: delayedAction.conditions,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    await dbAdmin.collection('delayedModerationActions').doc(scheduledAction.id).set(scheduledAction);
  }

  /**
   * Set up escalation rule
   */
  private async setupEscalation(
    escalation: EscalationRule,
    reports: any[],
    workflow: AutomatedWorkflow
  ): Promise<void> {
    const escalationRecord = {
      id: `escalation_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      workflowId: workflow.id,
      rule: escalation,
      reportIds: reports.map(r => r.id),
      status: 'active',
      createdAt: new Date().toISOString(),
      checkAfter: this.calculateEscalationCheckTime(escalation)
    };

    await dbAdmin.collection('escalationRules').doc(escalationRecord.id).set(escalationRecord);
  }

  /**
   * Process scheduled delayed actions
   */
  private async processDelayedActions(): Promise<void> {
    try {
      const now = new Date();
      const dueActions = await dbAdmin.collection('delayedModerationActions')
        .where('status', '==', 'scheduled')
        .where('executeAt', '<=', now.toISOString())
        .get();

      for (const actionDoc of dueActions.docs) {
        const action = actionDoc.data();
        
        try {
          // Check if conditions are still met
          if (await this.checkDelayedActionConditions(action)) {
            const reports = await this.getReportsByIds(action.reportIds);
            const workflow = await this.getWorkflow(action.workflowId);
            
            if (reports.length > 0 && workflow) {
              await this.executeAutomatedAction(action.action, reports, workflow);
              
              await dbAdmin.collection('delayedModerationActions').doc(action.id).update({
                status: 'executed',
                executedAt: new Date().toISOString()
              });
            }
          } else {
            await dbAdmin.collection('delayedModerationActions').doc(action.id).update({
              status: 'cancelled',
              cancelledAt: new Date().toISOString(),
              cancelReason: 'Conditions no longer met'
            });
          }
        } catch (error) {
          logger.error('Error executing delayed action', { error: error instanceof Error ? error.message : String(error), action: action.id });
          await dbAdmin.collection('delayedModerationActions').doc(action.id).update({
            status: 'failed',
            failedAt: new Date().toISOString(),
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
    } catch (error) {
      logger.error('Error processing delayed actions', { error: error instanceof Error ? error.message : String(error) });
    }
  }

  /**
   * Process escalation rules
   */
  private async processEscalations(): Promise<void> {
    try {
      const now = new Date();
      const activeEscalations = await dbAdmin.collection('escalationRules')
        .where('status', '==', 'active')
        .where('checkAfter', '<=', now.toISOString())
        .get();

      for (const escalationDoc of activeEscalations.docs) {
        const escalation = escalationDoc.data();
        
        try {
          if (await this.checkEscalationCondition(escalation)) {
            await this.executeEscalation(escalation);
            
            await dbAdmin.collection('escalationRules').doc(escalation.id).update({
              status: 'triggered',
              triggeredAt: new Date().toISOString()
            });
          } else {
            // Update check time for next evaluation
            await dbAdmin.collection('escalationRules').doc(escalation.id).update({
              checkAfter: this.calculateEscalationCheckTime(escalation.rule)
            });
          }
        } catch (error) {
          logger.error('Error processing escalation', { error: error instanceof Error ? error.message : String(error), metadata: { escalationId: escalation.id } });
        }
      }
    } catch (error) {
      logger.error('Error processing escalations', { error: error instanceof Error ? error.message : String(error) });
    }
  }

  /**
   * Notify moderators about automated actions
   */
  private async notifyModerators(reports: any[], workflow: AutomatedWorkflow, action: AutomatedAction): Promise<void> {
    const message = action.parameters?.message || 
      `Automated workflow "${workflow.name}" triggered with ${reports.length} reports requiring attention.`;

    // Get active moderators
    const moderators = await this.getActiveModerators();

    for (const moderator of moderators) {
      await sseRealtimeService.sendNotification(moderator.id, {
        title: 'Automated Moderation Alert',
        message,
        type: 'warning',
        actionUrl: '/admin/moderation?workflow=' + workflow.id
      });
    }
  }

  // Helper methods
  private async getActiveWorkflows(): Promise<AutomatedWorkflow[]> {
    const snapshot = await dbAdmin.collection('automatedWorkflows')
      .where('isActive', '==', true)
      .orderBy('priority', 'desc')
      .get();
    
    return snapshot.docs.map(doc => doc.data() as AutomatedWorkflow);
  }

  private async getWorkflow(workflowId: string): Promise<AutomatedWorkflow | null> {
    const doc = await dbAdmin.collection('automatedWorkflows').doc(workflowId).get();
    return doc.exists ? doc.data() as AutomatedWorkflow : null;
  }

  private async getReportsByIds(reportIds: string[]): Promise<any[]> {
    const reports = [];
    for (const reportId of reportIds) {
      const doc = await dbAdmin.collection('contentReports').doc(reportId).get();
      if (doc.exists) {
        reports.push({ id: doc.id, ...doc.data() });
      }
    }
    return reports;
  }

  private async getActiveModerators(): Promise<any[]> {
    const snapshot = await dbAdmin.collection('users')
      .where('role', 'in', ['admin', 'moderator'])
      .where('isActive', '==', true)
      .get();
    
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  }

  private async checkDelayedActionConditions(action: any): Promise<boolean> {
    // Check if no moderation action has been taken
    if (action.conditions.noModerationAction) {
      for (const reportId of action.reportIds) {
        const report = await dbAdmin.collection('contentReports').doc(reportId).get();
        const reportData = report.data();
        if (report.exists && reportData?.status !== 'pending') {
          return false;
        }
      }
    }

    // Check if reports are still active
    if (action.conditions.reportStillActive) {
      for (const reportId of action.reportIds) {
        const report = await dbAdmin.collection('contentReports').doc(reportId).get();
        if (!report.exists || report.data()?.status === 'dismissed') {
          return false;
        }
      }
    }

    return true;
  }

  private async checkEscalationCondition(escalation: any): Promise<boolean> {
    switch (escalation.rule.condition) {
      case 'time_passed': {
        const timePassed = Date.now() - new Date(escalation.createdAt).getTime();
        return timePassed >= escalation.rule.threshold * 60 * 1000; // threshold in minutes
      }

      case 'multiple_reports':
        // Count additional reports for the same content
        return true; // Implementation depends on specific requirements

      case 'ai_confidence':
        // Check if AI confidence has changed
        return true; // Implementation depends on specific requirements

      case 'user_appeal':
        // Check if user has appealed
        return true; // Implementation depends on specific requirements

      default:
        return false;
    }
  }

  private async executeEscalation(escalation: any): Promise<void> {
    // Get reports for escalation processing
    await this.getReportsByIds(escalation.reportIds);

    switch (escalation.rule.action) {
      case 'assign_human': {
        // Assign reports to human moderators
        for (const reportId of escalation.reportIds) {
          await dbAdmin.collection('contentReports').doc(reportId).update({
            status: 'under_review',
            escalatedAt: new Date().toISOString(),
            escalationReason: `Escalated by rule: ${escalation.rule.condition}`
          });
        }
        break;
      }
      case 'notify_admin': {
        const admins = await dbAdmin.collection('users')
          .where('role', '==', 'admin')
          .get();
        
        for (const admin of admins.docs) {
          await sseRealtimeService.sendNotification(admin.id, {
            title: 'Escalation Alert',
            message: `Reports escalated: ${escalation.reportIds.length} items require admin attention`,
            type: 'error',
            actionUrl: '/admin/moderation/escalated'
          });
        }
        break;
      }
      case 'priority_queue': {
        // Move to priority queue
        for (const reportId of escalation.reportIds) {
          await dbAdmin.collection('contentReports').doc(reportId).update({
            priority: 'high',
            escalatedAt: new Date().toISOString()
          });
        }
        break;
      }
    }
  }

  private calculateEscalationCheckTime(rule: EscalationRule): string {
    const checkInterval = rule.condition === 'time_passed' ? rule.threshold : 30; // Default 30 minutes
    return new Date(Date.now() + checkInterval * 60 * 1000).toISOString();
  }

  private async updateWorkflowStats(workflowId: string, result: 'success' | 'error'): Promise<void> {
    const updateData: any = {
      'statistics.lastTriggered': new Date().toISOString(),
      'statistics.triggeredCount': FieldValue.increment(1)
    };

    if (result === 'success') {
      updateData['statistics.successCount'] = FieldValue.increment(1);
    } else {
      updateData['statistics.errorCount'] = FieldValue.increment(1);
    }

    await dbAdmin.collection('automatedWorkflows').doc(workflowId).update(updateData);
  }

  private isBusinessHours(): boolean {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Monday to Friday, 9 AM to 5 PM
    return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
  }

  /**
   * Create a new automated workflow
   */
  async createWorkflow(workflowData: AutomatedWorkflowInput): Promise<string> {
    // Transform delayed actions to include executeAt placeholder
    const transformedActions = {
      ...workflowData.actions,
      delayed: workflowData.actions.delayed.map(delayedAction => ({
        ...delayedAction,
        executeAt: '' // Will be set when action is scheduled
      }))
    };

    const workflow: AutomatedWorkflow = {
      ...workflowData,
      actions: transformedActions,
      id: `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      statistics: {
        triggeredCount: 0,
        successCount: 0,
        errorCount: 0,
        averageProcessingTime: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dbAdmin.collection('automatedWorkflows').doc(workflow.id).set(workflow);
    
    logger.info('Automated workflow created', { workflowId: workflow.id });
    return workflow.id;
  }

  /**
   * Update an existing workflow
   */
  async updateWorkflow(workflowId: string, updates: Partial<AutomatedWorkflowInput>): Promise<void> {
    // Transform delayed actions if provided in updates
    const transformedUpdates: any = { ...updates };
    if (updates.actions?.delayed) {
      transformedUpdates.actions = {
        ...updates.actions,
        delayed: updates.actions.delayed.map(delayedAction => ({
          ...delayedAction,
          executeAt: '' // Will be set when action is scheduled
        }))
      };
    }

    await dbAdmin.collection('automatedWorkflows').doc(workflowId).update({
      ...transformedUpdates,
      updatedAt: new Date().toISOString()
    });

    logger.info('Automated workflow updated', { workflowId });
  }

  /**
   * Get workflow statistics
   */
  async getWorkflowStatistics(): Promise<any> {
    const workflows = await dbAdmin.collection('automatedWorkflows').get();
    const batches = await dbAdmin.collection('moderationBatches').get();
    
    const stats = {
      totalWorkflows: workflows.size,
      activeWorkflows: 0,
      totalBatches: batches.size,
      processingBatches: this.processingQueue.size,
      successfulBatches: 0,
      failedBatches: 0
    };

    workflows.docs.forEach(doc => {
      const workflow = doc.data();
      if (workflow.isActive) stats.activeWorkflows++;
    });

    batches.docs.forEach(doc => {
      const batch = doc.data();
      if (batch.status === 'completed') stats.successfulBatches++;
      if (batch.status === 'failed') stats.failedBatches++;
    });

    return stats;
  }

  /**
   * Cleanup old batch records
   */
  async cleanupOldBatches(): Promise<void> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const oldBatches = await dbAdmin.collection('moderationBatches')
      .where('completedAt', '<=', thirtyDaysAgo.toISOString())
      .get();

    const batch = dbAdmin.batch();
    oldBatches.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    logger.info('Cleaned up old moderation batches', { count: oldBatches.size });
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.workflowInterval) {
      clearInterval(this.workflowInterval);
    }
    this.processingQueue.clear();
  }
}

// Export singleton instance
export const automatedModerationWorkflows = new AutomatedModerationWorkflows();