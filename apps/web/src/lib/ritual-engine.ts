import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from '@/lib/logger';
import type { 
  Ritual, 
  RitualParticipant, 
  RitualInstance,
  RitualAction,
  RitualMilestone,
  RitualStatus 
} from './rituals-framework';

/**
 * HIVE Ritual Engine - Core execution system for campus-wide experiences
 */
export class RitualEngine {
  /**
   * Create a new ritual instance
   */
  static async createRitual(ritual: Omit<Ritual, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const ritualDoc = await dbAdmin.collection('rituals').add({
        ...ritual,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });

      logger.info('Ritual created', { ritualId: ritualDoc.id, name: ritual.name });
      return ritualDoc.id;
    } catch (error) {
      logger.error('Failed to create ritual', { error, ritual: ritual.name });
      throw new Error('Failed to create ritual');
    }
  }

  /**
   * Start an active ritual
   */
  static async startRitual(ritualId: string): Promise<void> {
    try {
      const ritualRef = dbAdmin.collection('rituals').doc(ritualId);
      const ritualDoc = await ritualRef.get();

      if (!ritualDoc.exists) {
        throw new Error('Ritual not found');
      }

      const ritual = ritualDoc.data() as Ritual;
      
      // Validate ritual can be started
      if (ritual.status !== 'scheduled' && ritual.status !== 'draft') {
        throw new Error(`Cannot start ritual in ${ritual.status} status`);
      }

      // Update ritual status
      await ritualRef.update({
        status: 'active',
        actualStartTime: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });

      // Create ritual instance for tracking
      await dbAdmin.collection('ritualInstances').add({
        ritualId,
        startedAt: FieldValue.serverTimestamp(),
        participants: [],
        completedActions: [],
        currentMilestone: 0,
        status: 'running'
      });

      // Send notifications to eligible participants
      await this.notifyEligibleParticipants(ritualId, ritual);

      logger.info('Ritual started', { ritualId, name: ritual.name });
    } catch (error) {
      logger.error('Failed to start ritual', { error, ritualId });
      throw error;
    }
  }

  /**
   * Handle user joining a ritual
   */
  static async joinRitual(ritualId: string, userId: string): Promise<boolean> {
    try {
      const ritualRef = dbAdmin.collection('rituals').doc(ritualId);
      const ritualDoc = await ritualRef.get();

      if (!ritualDoc.exists) {
        throw new Error('Ritual not found');
      }

      const ritual = ritualDoc.data() as Ritual;

      // Check if ritual is active
      if (ritual.status !== 'active') {
        return false;
      }

      // Check prerequisites
      const isEligible = await this.checkEligibility(userId, ritual);
      if (!isEligible) {
        return false;
      }

      // Check participant limits
      if (ritual.maxParticipants) {
        const instanceQuery = await dbAdmin.collection('ritualInstances')
          .where('ritualId', '==', ritualId)
          .where('status', '==', 'running')
          .limit(1)
          .get();

        if (!instanceQuery.empty) {
          const instance = instanceQuery.docs[0].data();
          if (instance.participants.length >= ritual.maxParticipants) {
            return false;
          }
        }
      }

      // Add participant to ritual instance
      const participantData: RitualParticipant = {
        userId,
        joinedAt: new Date(),
        status: 'active',
        progress: {
          completedActions: [],
          currentMilestone: 0,
          lastActivity: new Date()
        }
      };

      // Update ritual instance with new participant
      const instanceQuery = await dbAdmin.collection('ritualInstances')
        .where('ritualId', '==', ritualId)
        .where('status', '==', 'running')
        .limit(1)
        .get();

      if (!instanceQuery.empty) {
        const instanceRef = instanceQuery.docs[0].ref;
        await instanceRef.update({
          participants: FieldValue.arrayUnion(participantData),
          updatedAt: FieldValue.serverTimestamp()
        });
      }

      // Track participation in user's profile
      await dbAdmin.collection('users').doc(userId).update({
        [`rituals.${ritualId}`]: {
          joinedAt: FieldValue.serverTimestamp(),
          status: 'active'
        },
        updatedAt: FieldValue.serverTimestamp()
      });

      logger.info('User joined ritual', { ritualId, userId });
      return true;
    } catch (error) {
      logger.error('Failed to join ritual', { error, ritualId, userId });
      return false;
    }
  }

  /**
   * Process ritual action completion
   */
  static async completeAction(
    ritualId: string, 
    userId: string, 
    actionId: string, 
    data?: any
  ): Promise<void> {
    try {
      // Get ritual and validate
      const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
      if (!ritualDoc.exists) {
        throw new Error('Ritual not found');
      }

      const ritual = ritualDoc.data() as Ritual;
      const action = ritual.actions.find(a => a.id === actionId);
      if (!action) {
        throw new Error('Action not found');
      }

      // Get ritual instance
      const instanceQuery = await dbAdmin.collection('ritualInstances')
        .where('ritualId', '==', ritualId)
        .where('status', '==', 'running')
        .limit(1)
        .get();

      if (instanceQuery.empty) {
        throw new Error('No active ritual instance found');
      }

      const instanceRef = instanceQuery.docs[0].ref;
      const instance = instanceQuery.docs[0].data();

      // Update participant progress
      const updatedParticipants = instance.participants.map((p: RitualParticipant) => {
        if (p.userId === userId) {
          return {
            ...p,
            progress: {
              ...p.progress,
              completedActions: [...p.progress.completedActions, {
                actionId,
                completedAt: new Date(),
                data
              }],
              lastActivity: new Date()
            }
          };
        }
        return p;
      });

      await instanceRef.update({
        participants: updatedParticipants,
        updatedAt: FieldValue.serverTimestamp()
      });

      // Check for milestone completion
      await this.checkMilestones(ritualId, instanceRef.id);

      logger.info('Ritual action completed', { ritualId, userId, actionId });
    } catch (error) {
      logger.error('Failed to complete ritual action', { error, ritualId, userId, actionId });
      throw error;
    }
  }

  /**
   * Check if user meets ritual prerequisites
   */
  private static async checkEligibility(userId: string, ritual: Ritual): Promise<boolean> {
    try {
      const userDoc = await dbAdmin.collection('users').doc(userId).get();
      if (!userDoc.exists) return false;

      const userData = userDoc.data();
      const { prerequisites } = ritual;

      // Check minimum space memberships
      if (prerequisites.minSpaceMemberships) {
        const spacesQuery = await dbAdmin.collection('spaceMembers')
          .where('userId', '==', userId)
          .get();
        
        if (spacesQuery.size < prerequisites.minSpaceMemberships) {
          return false;
        }
      }

      // Check account age
      if (prerequisites.accountAge) {
        const accountCreated = userData.createdAt?.toDate();
        if (accountCreated) {
          const daysSinceCreation = (Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24);
          if (daysSinceCreation < prerequisites.accountAge) {
            return false;
          }
        }
      }

      // Check completed rituals
      if (prerequisites.completedRituals && prerequisites.completedRituals.length > 0) {
        const userRituals = userData.rituals || {};
        for (const requiredRitual of prerequisites.completedRituals) {
          if (!userRituals[requiredRitual] || userRituals[requiredRitual].status !== 'completed') {
            return false;
          }
        }
      }

      // Check academic status
      if (prerequisites.academicStatus && prerequisites.academicStatus.length > 0) {
        const userAcademicLevel = userData.academicLevel;
        if (!userAcademicLevel || !prerequisites.academicStatus.includes(userAcademicLevel)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      logger.error('Failed to check ritual eligibility', { error, userId, ritualId: ritual.id });
      return false;
    }
  }

  /**
   * Check and process milestone completions
   */
  private static async checkMilestones(ritualId: string, instanceId: string): Promise<void> {
    try {
      const [ritualDoc, instanceDoc] = await Promise.all([
        dbAdmin.collection('rituals').doc(ritualId).get(),
        dbAdmin.collection('ritualInstances').doc(instanceId).get()
      ]);

      if (!ritualDoc.exists || !instanceDoc.exists) return;

      const ritual = ritualDoc.data() as Ritual;
      const instance = instanceDoc.data();

      for (const milestone of ritual.milestones) {
        if (instance.completedMilestones?.includes(milestone.id)) continue;

        const isCompleted = await this.evaluateMilestone(milestone, instance, ritual);
        
        if (isCompleted) {
          // Mark milestone as completed
          await dbAdmin.collection('ritualInstances').doc(instanceId).update({
            completedMilestones: FieldValue.arrayUnion(milestone.id),
            [`milestones.${milestone.id}.completedAt`]: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
          });

          // Distribute rewards
          await this.distributeRewards(milestone.rewards || [], instance.participants, ritualId);

          logger.info('Ritual milestone completed', { 
            ritualId, 
            milestoneId: milestone.id, 
            participantCount: instance.participants.length 
          });
        }
      }
    } catch (error) {
      logger.error('Failed to check milestones', { error, ritualId, instanceId });
    }
  }

  /**
   * Evaluate if a milestone is completed
   */
  private static async evaluateMilestone(
    milestone: RitualMilestone, 
    instance: any, 
    ritual: Ritual
  ): Promise<boolean> {
    const { condition } = milestone;

    switch (condition.type) {
      case 'participant_count':
        return instance.participants.length >= condition.target;
      
      case 'action_completions':
        const actionCompletions = instance.participants.reduce((count: number, p: any) => {
          return count + p.progress.completedActions.filter((a: any) => 
            condition.actionIds ? condition.actionIds.includes(a.actionId) : true
          ).length;
        }, 0);
        return actionCompletions >= condition.target;
      
      case 'time_elapsed':
        const startTime = instance.startedAt?.toDate();
        if (!startTime) return false;
        const elapsed = (Date.now() - startTime.getTime()) / (1000 * 60); // minutes
        return elapsed >= condition.target;
      
      case 'collective_goal':
        // Custom logic for collective achievements
        return this.evaluateCollectiveGoal(condition, instance);
      
      default:
        return false;
    }
  }

  /**
   * Evaluate collective goals
   */
  private static evaluateCollectiveGoal(condition: any, instance: any): boolean {
    // This would contain specific logic for different types of collective goals
    // For example: total posts created, spaces joined, connections made, etc.
    return false;
  }

  /**
   * Distribute rewards to participants
   */
  private static async distributeRewards(
    rewards: any[], 
    participants: RitualParticipant[], 
    ritualId: string
  ): Promise<void> {
    for (const reward of rewards) {
      for (const participant of participants) {
        if (participant.status !== 'active') continue;

        try {
          switch (reward.type) {
            case 'feature_unlock':
              await this.unlockFeature(participant.userId, reward.feature, reward.scope);
              break;
            
            case 'badge':
              await this.awardBadge(participant.userId, reward.badge);
              break;
            
            case 'space_access':
              await this.grantSpaceAccess(participant.userId, reward.spaceId);
              break;
            
            default:
              logger.warn('Unknown reward type', { type: reward.type, ritualId });
          }
        } catch (error) {
          logger.error('Failed to distribute reward', { 
            error, 
            userId: participant.userId, 
            rewardType: reward.type,
            ritualId 
          });
        }
      }
    }
  }

  /**
   * Unlock platform feature for user
   */
  private static async unlockFeature(userId: string, feature: string, scope: string): Promise<void> {
    await dbAdmin.collection('users').doc(userId).update({
      [`featureUnlocks.${feature}`]: {
        unlockedAt: FieldValue.serverTimestamp(),
        scope,
        source: 'ritual'
      },
      updatedAt: FieldValue.serverTimestamp()
    });
  }

  /**
   * Award badge to user
   */
  private static async awardBadge(userId: string, badge: any): Promise<void> {
    await dbAdmin.collection('users').doc(userId).update({
      [`badges.${badge.id}`]: {
        ...badge,
        earnedAt: FieldValue.serverTimestamp()
      },
      updatedAt: FieldValue.serverTimestamp()
    });
  }

  /**
   * Grant access to exclusive space
   */
  private static async grantSpaceAccess(userId: string, spaceId: string): Promise<void> {
    await dbAdmin.collection('spaceMembers').add({
      spaceId,
      userId,
      role: 'member',
      joinedAt: FieldValue.serverTimestamp(),
      source: 'ritual_unlock'
    });
  }

  /**
   * Send notifications to eligible participants
   */
  private static async notifyEligibleParticipants(ritualId: string, ritual: Ritual): Promise<void> {
    // Implementation would query eligible users and send notifications
    // This would integrate with the notification system we created earlier
    logger.info('Notifying eligible participants', { ritualId, name: ritual.name });
  }

  /**
   * Complete a ritual
   */
  static async completeRitual(ritualId: string): Promise<void> {
    try {
      // Update ritual status
      await dbAdmin.collection('rituals').doc(ritualId).update({
        status: 'completed',
        completedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });

      // Update all instances
      const instancesQuery = await dbAdmin.collection('ritualInstances')
        .where('ritualId', '==', ritualId)
        .where('status', '==', 'running')
        .get();

      const batch = dbAdmin.batch();
      instancesQuery.docs.forEach(doc => {
        batch.update(doc.ref, {
          status: 'completed',
          completedAt: FieldValue.serverTimestamp()
        });
      });
      
      await batch.commit();

      logger.info('Ritual completed', { ritualId });
    } catch (error) {
      logger.error('Failed to complete ritual', { error, ritualId });
      throw error;
    }
  }
}