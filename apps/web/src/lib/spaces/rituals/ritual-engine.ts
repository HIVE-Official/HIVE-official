import { dbClient, dbAdmin } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  getDoc,
  getDocs,
  query, 
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  writeBatch,
  increment
} from 'firebase/firestore';
import { logger } from '@/lib/logger';
import { RitualParticipationTracker } from '@/lib/rituals/ritual-participation';
import { RitualScheduler } from '@/lib/rituals/ritual-scheduler';
import { Ritual, RitualInstance, RitualType, RitualImpact } from '@/lib/spaces/rituals/rituals-framework';

export interface RitualEngineConfig {
  autoSchedule: boolean;
  notificationsEnabled: boolean;
  analyticsEnabled: boolean;
  maxConcurrentRituals: number;
  defaultDuration: number; // minutes
}

export interface RitualExecution {
  instanceId: string;
  startTime: Date;
  endTime?: Date;
  status: 'preparing' | 'active' | 'completing' | 'completed' | 'failed';
  participantCount: number;
  checkInsCount: number;
  completionsCount: number;
  metrics: Record<string, any>;
}

export interface RitualAnalytics {
  totalRituals: number;
  activeRituals: number;
  completedInstances: number;
  totalParticipants: number;
  averageEngagement: number;
  topRituals: Array<{ ritualId: string; name: string; participation: number }>;
  impactMetrics: RitualImpact;
}

/**
 * Core engine for managing ritual lifecycle and execution
 */
export class RitualEngine {
  private config: RitualEngineConfig;
  private participationTracker: RitualParticipationTracker;
  private scheduler: RitualScheduler;
  private activeExecutions: Map<string, RitualExecution> = new Map();

  constructor(config?: Partial<RitualEngineConfig>) {
    this.config = {
      autoSchedule: true,
      notificationsEnabled: true,
      analyticsEnabled: true,
      maxConcurrentRituals: 10,
      defaultDuration: 60,
      ...config
    };
    
    this.participationTracker = new RitualParticipationTracker();
    this.scheduler = new RitualScheduler();
    
    if (this.config.autoSchedule) {
      this.scheduler.startAutoProcessing();
    }
  }

  /**
   * Create and register a new ritual
   */
  async createRitual(ritual: Omit<Ritual, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const ritualId = `ritual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const fullRitual: Ritual = {
        ...ritual,
        id: ritualId,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        metrics: {
          totalInstances: 0,
          totalParticipants: 0,
          averageCompletion: 0,
          lastUpdated: new Date()
        }
      };

      // Validate ritual configuration
      this.validateRitual(fullRitual);

      // Store in database
      await setDoc(doc(dbClient, 'rituals', ritualId), {
        ...fullRitual,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Schedule if active
      if (fullRitual.status === 'active' && this.config.autoSchedule) {
        await this.scheduler.scheduleRitual(fullRitual);
      }

      logger.info('Ritual created', { ritualId, name: ritual.name });
      return ritualId;
    } catch (error) {
      logger.error('Failed to create ritual', { error, ritual });
      throw error;
    }
  }

  /**
   * Validate ritual configuration
   */
  private validateRitual(ritual: Ritual): void {
    if (!ritual.name || ritual.name.length < 3) {
      throw new Error('Ritual name must be at least 3 characters');
    }

    if (!ritual.type || !['daily', 'weekly', 'event', 'achievement', 'social'].includes(ritual.type)) {
      throw new Error('Invalid ritual type');
    }

    if (!ritual.recurrence || !ritual.recurrence.frequency) {
      throw new Error('Ritual must have a recurrence pattern');
    }

    if (ritual.participation.minParticipants > ritual.participation.maxParticipants) {
      throw new Error('Min participants cannot exceed max participants');
    }

    if (ritual.rewards && ritual.rewards.points < 0) {
      throw new Error('Reward points cannot be negative');
    }
  }

  /**
   * Start a ritual instance
   */
  async startRitualInstance(instanceId: string): Promise<void> {
    try {
      // Check if already executing
      if (this.activeExecutions.has(instanceId)) {
        throw new Error('Instance already executing');
      }

      // Check concurrent limit
      if (this.activeExecutions.size >= this.config.maxConcurrentRituals) {
        throw new Error('Maximum concurrent rituals reached');
      }

      // Get instance details
      const instanceDoc = await getDoc(doc(dbClient, 'ritualInstances', instanceId));
      if (!instanceDoc.exists()) {
        throw new Error('Instance not found');
      }

      const instance = instanceDoc.data() as RitualInstance;
      
      // Get ritual details
      const ritualDoc = await getDoc(doc(dbClient, 'rituals', instance.ritualId));
      if (!ritualDoc.exists()) {
        throw new Error('Ritual not found');
      }

      const ritual = ritualDoc.data() as Ritual;

      // Create execution record
      const execution: RitualExecution = {
        instanceId,
        startTime: new Date(),
        status: 'preparing',
        participantCount: 0,
        checkInsCount: 0,
        completionsCount: 0,
        metrics: {}
      };

      this.activeExecutions.set(instanceId, execution);

      // Update instance status
      await updateDoc(doc(dbClient, 'ritualInstances', instanceId), {
        status: 'in_progress',
        startedAt: serverTimestamp(),
        execution: {
          startTime: serverTimestamp(),
          status: 'active'
        }
      });

      // Initialize participation tracking
      await this.participationTracker.initializeInstance(instanceId, ritual);

      // Send start notifications
      if (this.config.notificationsEnabled) {
        await this.sendStartNotifications(ritual, instance);
      }

      // Update execution status
      execution.status = 'active';

      // Set automatic completion timer
      const duration = ritual.duration || this.config.defaultDuration;
      setTimeout(() => {
        this.completeRitualInstance(instanceId);
      }, duration * 60 * 1000);

      logger.info('Ritual instance started', { instanceId, ritualId: instance.ritualId });
    } catch (error) {
      logger.error('Failed to start ritual instance', { error, instanceId });
      this.activeExecutions.delete(instanceId);
      throw error;
    }
  }

  /**
   * Complete a ritual instance
   */
  async completeRitualInstance(instanceId: string): Promise<void> {
    try {
      const execution = this.activeExecutions.get(instanceId);
      if (!execution) {
        throw new Error('Instance not executing');
      }

      execution.status = 'completing';
      execution.endTime = new Date();

      // Get final participation stats
      const stats = await this.participationTracker.getInstanceStats(instanceId);
      
      execution.participantCount = stats.totalParticipants;
      execution.checkInsCount = stats.checkIns;
      execution.completionsCount = stats.completions;
      execution.metrics = stats.metrics;

      // Calculate completion rate
      const completionRate = stats.totalParticipants > 0 
        ? stats.completions / stats.totalParticipants 
        : 0;

      // Update instance in database
      await updateDoc(doc(dbClient, 'ritualInstances', instanceId), {
        status: 'completed',
        completedAt: serverTimestamp(),
        participantCount: execution.participantCount,
        completionRate,
        execution: {
          ...execution,
          endTime: serverTimestamp()
        },
        metrics: execution.metrics
      });

      // Update ritual metrics
      await this.updateRitualMetrics(instanceId, stats);

      // Distribute rewards
      await this.distributeRewards(instanceId);

      // Send completion notifications
      if (this.config.notificationsEnabled) {
        await this.sendCompletionNotifications(instanceId, stats);
      }

      // Clean up
      this.activeExecutions.delete(instanceId);
      execution.status = 'completed';

      logger.info('Ritual instance completed', { 
        instanceId, 
        participants: execution.participantCount,
        completions: execution.completionsCount 
      });
    } catch (error) {
      logger.error('Failed to complete ritual instance', { error, instanceId });
      const execution = this.activeExecutions.get(instanceId);
      if (execution) {
        execution.status = 'failed';
      }
      throw error;
    }
  }

  /**
   * Register participant for a ritual
   */
  async registerParticipant(
    instanceId: string, 
    userId: string, 
    role: 'participant' | 'leader' | 'observer' = 'participant'
  ): Promise<void> {
    try {
      const execution = this.activeExecutions.get(instanceId);
      if (!execution || execution.status !== 'active') {
        throw new Error('Instance not active');
      }

      await this.participationTracker.registerParticipant(instanceId, userId, role);
      execution.participantCount++;

      logger.info('Participant registered', { instanceId, userId, role });
    } catch (error) {
      logger.error('Failed to register participant', { error, instanceId, userId });
      throw error;
    }
  }

  /**
   * Record participant check-in
   */
  async checkInParticipant(instanceId: string, userId: string, validation?: any): Promise<void> {
    try {
      const execution = this.activeExecutions.get(instanceId);
      if (!execution || execution.status !== 'active') {
        throw new Error('Instance not active');
      }

      await this.participationTracker.checkIn(instanceId, userId, validation);
      execution.checkInsCount++;

      logger.info('Participant checked in', { instanceId, userId });
    } catch (error) {
      logger.error('Failed to check in participant', { error, instanceId, userId });
      throw error;
    }
  }

  /**
   * Update ritual metrics after instance completion
   */
  private async updateRitualMetrics(instanceId: string, stats: any): Promise<void> {
    try {
      const instanceDoc = await getDoc(doc(dbClient, 'ritualInstances', instanceId));
      if (!instanceDoc.exists()) return;

      const instance = instanceDoc.data() as RitualInstance;
      
      await updateDoc(doc(dbClient, 'rituals', instance.ritualId), {
        'metrics.totalInstances': increment(1),
        'metrics.totalParticipants': increment(stats.totalParticipants),
        'metrics.averageCompletion': increment(stats.completions),
        'metrics.lastUpdated': serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      logger.error('Failed to update ritual metrics', { error, instanceId });
    }
  }

  /**
   * Distribute rewards to participants
   */
  private async distributeRewards(instanceId: string): Promise<void> {
    try {
      const instanceDoc = await getDoc(doc(dbClient, 'ritualInstances', instanceId));
      if (!instanceDoc.exists()) return;

      const instance = instanceDoc.data() as RitualInstance;
      
      const ritualDoc = await getDoc(doc(dbClient, 'rituals', instance.ritualId));
      if (!ritualDoc.exists()) return;

      const ritual = ritualDoc.data() as Ritual;
      
      if (!ritual.rewards) return;

      // Get completed participants
      const participants = await this.participationTracker.getCompletedParticipants(instanceId);
      
      const batch = writeBatch(dbClient);
      for (const participantId of participants) {
        // Add points
        if (ritual.rewards.points) {
          const userRef = doc(dbClient, 'users', participantId);
          batch.update(userRef, {
            'points.ritual': increment(ritual.rewards.points),
            'points.total': increment(ritual.rewards.points)
          });
        }

        // Add achievements
        if (ritual.rewards.achievements) {
          for (const achievement of ritual.rewards.achievements) {
            const achievementRef = doc(dbClient, 'userAchievements', `${participantId}_${achievement}`);
            batch.set(achievementRef, {
              userId: participantId,
              achievementId: achievement,
              earnedAt: serverTimestamp(),
              ritualId: ritual.id,
              instanceId
            }, { merge: true });
          }
        }

        // Add badge
        if (ritual.rewards.badge) {
          const badgeRef = doc(dbClient, 'userBadges', `${participantId}_${ritual.rewards.badge}`);
          batch.set(badgeRef, {
            userId: participantId,
            badgeId: ritual.rewards.badge,
            earnedAt: serverTimestamp(),
            ritualId: ritual.id,
            instanceId
          }, { merge: true });
        }
      }

      await batch.commit();
      logger.info('Rewards distributed', { instanceId, participantCount: participants.length });
    } catch (error) {
      logger.error('Failed to distribute rewards', { error, instanceId });
    }
  }

  /**
   * Send start notifications
   */
  private async sendStartNotifications(ritual: Ritual, instance: RitualInstance): Promise<void> {
    // Implementation would send push notifications, emails, etc.
    logger.info('Sending start notifications', { 
      ritualId: ritual.id, 
      instanceId: instance.id 
    });
  }

  /**
   * Send completion notifications
   */
  private async sendCompletionNotifications(instanceId: string, stats: any): Promise<void> {
    // Implementation would send push notifications with results
    logger.info('Sending completion notifications', { 
      instanceId, 
      participants: stats.totalParticipants 
    });
  }

  /**
   * Get analytics for rituals
   */
  async getAnalytics(spaceId?: string, timeRange?: { start: Date; end: Date }): Promise<RitualAnalytics> {
    try {
      let ritualsQuery = collection(dbClient, 'rituals');
      let instancesQuery = collection(dbClient, 'ritualInstances');
      
      if (spaceId) {
        ritualsQuery = query(ritualsQuery, where('spaceId', '==', spaceId)) as any;
        instancesQuery = query(instancesQuery, where('spaceId', '==', spaceId)) as any;
      }

      const [ritualsSnapshot, instancesSnapshot] = await Promise.all([
        getDocs(ritualsQuery),
        getDocs(instancesQuery)
      ]);

      const totalRituals = ritualsSnapshot.size;
      const activeRituals = ritualsSnapshot.docs.filter(doc => 
        doc.data().status === 'active'
      ).length;

      let completedInstances = 0;
      let totalParticipants = 0;
      let totalEngagement = 0;
      const ritualParticipation: Record<string, { name: string; count: number }> = {};

      instancesSnapshot.forEach(doc => {
        const instance = doc.data();
        if (instance.status === 'completed') {
          completedInstances++;
          totalParticipants += instance.participantCount || 0;
          totalEngagement += instance.completionRate || 0;
          
          if (ritualParticipation[instance.ritualId]) {
            ritualParticipation[instance.ritualId].count += instance.participantCount || 0;
          } else {
            ritualParticipation[instance.ritualId] = {
              name: instance.ritualName || 'Unknown',
              count: instance.participantCount || 0
            };
          }
        }
      });

      const averageEngagement = completedInstances > 0 
        ? totalEngagement / completedInstances 
        : 0;

      const topRituals = Object.entries(ritualParticipation)
        .map(([ritualId, data]) => ({
          ritualId,
          name: data.name,
          participation: data.count
        }))
        .sort((a, b) => b.participation - a.participation)
        .slice(0, 5);

      const impactMetrics: RitualImpact = {
        participationGrowth: 0, // Would calculate from historical data
        engagementScore: averageEngagement,
        communityReach: totalParticipants,
        retentionRate: 0 // Would calculate from repeat participation
      };

      return {
        totalRituals,
        activeRituals,
        completedInstances,
        totalParticipants,
        averageEngagement,
        topRituals,
        impactMetrics
      };
    } catch (error) {
      logger.error('Failed to get analytics', { error, spaceId });
      throw error;
    }
  }

  /**
   * Get active executions
   */
  getActiveExecutions(): RitualExecution[] {
    return Array.from(this.activeExecutions.values());
  }

  /**
   * Shutdown the engine
   */
  shutdown(): void {
    this.scheduler.stopAutoProcessing();
    
    // Complete any active executions
    for (const [instanceId, execution] of this.activeExecutions) {
      if (execution.status === 'active') {
        this.completeRitualInstance(instanceId).catch(error => {
          logger.error('Failed to complete instance during shutdown', { error, instanceId });
        });
      }
    }
  }
}

// Export singleton instance
export const ritualEngine = new RitualEngine();