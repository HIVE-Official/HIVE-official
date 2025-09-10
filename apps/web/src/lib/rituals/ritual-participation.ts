import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { logger } from '@/lib/logger';

export interface RitualParticipant {
  id: string;
  ritualId: string;
  userId: string;
  joinedAt: Date;
  lastActiveAt: Date;
  progress: number; // 0-100
  completedActions: string[];
  milestonesReached: string[];
  status: 'active' | 'completed' | 'abandoned';
  score: number;
  rank?: number;
  rewards: string[];
}

export interface RitualAction {
  id: string;
  participantId: string;
  ritualId: string;
  actionType: string;
  actionData: any;
  timestamp: Date;
  points: number;
  validated: boolean;
}

export class RitualParticipationTracker {
  /**
   * Track user joining a ritual
   */
  static async joinRitual(ritualId: string, userId: string): Promise<string> {
    try {
      // Check if user is already participating
      const existingParticipation = await dbAdmin
        .collection('rituals')
        .doc(ritualId)
        .collection('participants')
        .where('userId', '==', userId)
        .get();

      if (!existingParticipation.empty) {
        logger.info('User already participating in ritual', { ritualId, userId });
        return existingParticipation.docs[0].id;
      }

      // Create new participation
      const participantDoc = await dbAdmin
        .collection('rituals')
        .doc(ritualId)
        .collection('participants')
        .add({
          userId,
          joinedAt: FieldValue.serverTimestamp(),
          lastActiveAt: FieldValue.serverTimestamp(),
          progress: 0,
          completedActions: [],
          milestonesReached: [],
          status: 'active',
          score: 0,
          rewards: [],
          isActive: true
        });

      // Update ritual participant count
      await dbAdmin.collection('rituals').doc(ritualId).update({
        participantCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp()
      });

      logger.info('User joined ritual', { 
        participantId: participantDoc.id, 
        ritualId, 
        userId 
      });

      return participantDoc.id;

    } catch (error) {
      logger.error('Failed to join ritual', { error, ritualId, userId });
      throw error;
    }
  }

  /**
   * Track a ritual action
   */
  static async trackAction(
    ritualId: string,
    userId: string,
    actionType: string,
    actionData: any
  ): Promise<void> {
    try {
      // Get participant record
      const participantQuery = await dbAdmin
        .collection('rituals')
        .doc(ritualId)
        .collection('participants')
        .where('userId', '==', userId)
        .where('status', '==', 'active')
        .limit(1)
        .get();

      if (participantQuery.empty) {
        logger.warn('No active participation found', { ritualId, userId });
        return;
      }

      const participantDoc = participantQuery.docs[0];
      const participantId = participantDoc.id;
      const participant = participantDoc.data();

      // Get ritual configuration
      const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
      if (!ritualDoc.exists) {
        throw new Error('Ritual not found');
      }

      const ritual = ritualDoc.data();
      
      // Validate action is part of ritual
      const ritualAction = ritual.actions?.find((a: any) => a.type === actionType);
      if (!ritualAction) {
        logger.warn('Action not part of ritual', { ritualId, actionType });
        return;
      }

      // Calculate points for this action
      const points = ritualAction.weight || 10;

      // Record the action
      const actionDoc = await dbAdmin
        .collection('ritualActions')
        .add({
          participantId,
          ritualId,
          userId,
          actionType,
          actionData,
          timestamp: FieldValue.serverTimestamp(),
          points,
          validated: true
        });

      // Update participant progress
      const updatedActions = [...(participant.completedActions || []), ritualAction.id];
      const newProgress = this.calculateProgress(updatedActions, ritual.actions || []);
      const newScore = (participant.score || 0) + points;

      // Check for milestone completion
      const newMilestones = this.checkMilestones(
        newProgress,
        newScore,
        ritual.milestones || [],
        participant.milestonesReached || []
      );

      // Update participant record
      await participantDoc.ref.update({
        completedActions: updatedActions,
        progress: newProgress,
        score: newScore,
        milestonesReached: [...(participant.milestonesReached || []), ...newMilestones],
        lastActiveAt: FieldValue.serverTimestamp(),
        status: newProgress >= 100 ? 'completed' : 'active'
      });

      // Award rewards if ritual completed
      if (newProgress >= 100) {
        await this.awardRewards(ritualId, userId, ritual.rewards || []);
      }

      // Trigger milestone celebrations
      for (const milestoneId of newMilestones) {
        await this.triggerMilestoneCelebration(ritualId, userId, milestoneId);
      }

      logger.info('Ritual action tracked', {
        actionId: actionDoc.id,
        ritualId,
        userId,
        actionType,
        points,
        newProgress
      });

    } catch (error) {
      logger.error('Failed to track ritual action', { 
        error, 
        ritualId, 
        userId, 
        actionType 
      });
    }
  }

  /**
   * Calculate progress percentage
   */
  private static calculateProgress(completedActions: string[], allActions: any[]): number {
    if (!allActions.length) return 0;
    
    const requiredActions = allActions.filter(a => a.isRequired);
    const completedRequired = completedActions.filter(id => 
      requiredActions.some(a => a.id === id)
    );

    // If there are required actions, progress is based on those
    if (requiredActions.length > 0) {
      return Math.round((completedRequired.length / requiredActions.length) * 100);
    }

    // Otherwise, progress is based on all actions
    return Math.round((completedActions.length / allActions.length) * 100);
  }

  /**
   * Check for newly reached milestones
   */
  private static checkMilestones(
    progress: number,
    score: number,
    milestones: any[],
    alreadyReached: string[]
  ): string[] {
    const newMilestones: string[] = [];

    for (const milestone of milestones) {
      // Skip if already reached
      if (alreadyReached.includes(milestone.id)) continue;

      // Check if milestone conditions are met
      let isMet = false;

      if (milestone.progressThreshold && progress >= milestone.progressThreshold) {
        isMet = true;
      }

      if (milestone.scoreThreshold && score >= milestone.scoreThreshold) {
        isMet = true;
      }

      if (isMet) {
        newMilestones.push(milestone.id);
      }
    }

    return newMilestones;
  }

  /**
   * Award rewards for completing ritual
   */
  private static async awardRewards(ritualId: string, userId: string, rewards: any[]): Promise<void> {
    try {
      const batch = dbAdmin.batch();

      for (const reward of rewards) {
        // Add reward to user's profile
        const rewardRef = dbAdmin
          .collection('users')
          .doc(userId)
          .collection('rewards')
          .doc();

        batch.set(rewardRef, {
          ...reward,
          ritualId,
          awardedAt: FieldValue.serverTimestamp()
        });

        // Handle specific reward types
        switch (reward.type) {
          case 'badge':
            // Add badge to user's collection
            const badgeRef = dbAdmin
              .collection('users')
              .doc(userId)
              .collection('badges')
              .doc(reward.id);

            batch.set(badgeRef, {
              name: reward.name,
              description: reward.description,
              imageUrl: reward.imageUrl,
              ritualId,
              awardedAt: FieldValue.serverTimestamp()
            });
            break;

          case 'feature':
            // Unlock feature for user
            batch.update(dbAdmin.collection('users').doc(userId), {
              [`unlockedFeatures.${reward.featureId}`]: true,
              updatedAt: FieldValue.serverTimestamp()
            });
            break;

          case 'access':
            // Grant access to exclusive space/content
            if (reward.spaceId) {
              const memberRef = dbAdmin
                .collection('spaces')
                .doc(reward.spaceId)
                .collection('members')
                .doc(userId);

              batch.set(memberRef, {
                userId,
                role: 'member',
                joinedAt: FieldValue.serverTimestamp(),
                joinedVia: `ritual_${ritualId}`
              }, { merge: true });
            }
            break;
        }
      }

      await batch.commit();
      logger.info('Rewards awarded', { ritualId, userId, count: rewards.length });

    } catch (error) {
      logger.error('Failed to award rewards', { error, ritualId, userId });
    }
  }

  /**
   * Trigger milestone celebration
   */
  private static async triggerMilestoneCelebration(
    ritualId: string,
    userId: string,
    milestoneId: string
  ): Promise<void> {
    try {
      // Get ritual and milestone details
      const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
      if (!ritualDoc.exists) return;

      const ritual = ritualDoc.data();
      const milestone = ritual.milestones?.find((m: any) => m.id === milestoneId);
      if (!milestone) return;

      // Create celebration notification
      await dbAdmin
        .collection('users')
        .doc(userId)
        .collection('notifications')
        .add({
          type: 'milestone_celebration',
          title: '🎉 Milestone Reached!',
          message: milestone.celebration?.message || `You've reached the "${milestone.name}" milestone!`,
          ritualId,
          milestoneId,
          animation: milestone.celebration?.animation,
          badge: milestone.celebration?.badgeAwarded,
          read: false,
          createdAt: FieldValue.serverTimestamp()
        });

      // Create celebration post in ritual space (if configured)
      if (ritual.celebrationSpaceId) {
        await dbAdmin
          .collection('spaces')
          .doc(ritual.celebrationSpaceId)
          .collection('posts')
          .add({
            type: 'celebration',
            content: `🎉 ${userId} reached the "${milestone.name}" milestone in ${ritual.name}!`,
            authorId: 'system',
            ritualId,
            milestoneId,
            userId,
            createdAt: FieldValue.serverTimestamp(),
            isPinned: false,
            reactions: {}
          });
      }

      logger.info('Milestone celebration triggered', { 
        ritualId, 
        userId, 
        milestoneId,
        milestoneName: milestone.name 
      });

    } catch (error) {
      logger.error('Failed to trigger celebration', { 
        error, 
        ritualId, 
        userId, 
        milestoneId 
      });
    }
  }

  /**
   * Get user's ritual participation history
   */
  static async getUserRitualHistory(userId: string): Promise<any[]> {
    try {
      const participations = await dbAdmin
        .collectionGroup('participants')
        .where('userId', '==', userId)
        .orderBy('joinedAt', 'desc')
        .get();

      const history = [];
      for (const doc of participations.docs) {
        const data = doc.data();
        const ritualId = doc.ref.parent.parent?.id;
        
        if (ritualId) {
          const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
          if (ritualDoc.exists) {
            history.push({
              ...data,
              participantId: doc.id,
              ritual: {
                id: ritualId,
                ...ritualDoc.data()
              }
            });
          }
        }
      }

      return history;

    } catch (error) {
      logger.error('Failed to get ritual history', { error, userId });
      return [];
    }
  }
}