import { dbAdmin } from '@/lib/firebase-admin';

/**
 * HIVE Rituals Framework - Platform-Wide Experiences
 * 
 * Philosophy: Create genuine campus culture through shared moments that feel
 * organic, meaningful, and uniquely HIVE. Not gamification - but genuine
 * community formation through collective experiences.
 */

// Core ritual types
export type RitualType = 
  | 'onboarding'        // Week 1-2: First experiences
  | 'seasonal'          // Recurring campus moments
  | 'achievement'       // Milestone celebrations
  | 'community'         // Space interactions
  | 'creative'          // Tool/content creation
  | 'emergency'         // Spontaneous campus-wide moments
  | 'legacy';           // Long-term campus traditions

// Ritual status lifecycle
export type RitualStatus = 
  | 'draft'             // Being designed
  | 'scheduled'         // Planned for future
  | 'active'            // Currently running
  | 'completed'         // Finished successfully
  | 'paused'            // Temporarily halted
  | 'cancelled'         // Ended without completion
  | 'archived';         // Historical record

// Participation requirement types
export type ParticipationType = 
  | 'individual'        // Single user actions
  | 'collective'        // Group achievements
  | 'progressive'       // Building over time
  | 'competitive'       // Space vs space
  | 'collaborative'     // Cross-space cooperation
  | 'creative'          // Content/tool creation
  | 'social';           // Interaction-based

// Feature unlock scopes
export type UnlockScope = 
  | 'user'              // Individual user unlock
  | 'space'             // Entire space unlock
  | 'campus'            // University-wide unlock
  | 'platform';         // All universities unlock

/**
 * Core Ritual Definition
 */
export interface Ritual {
  id: string;
  
  // Identity
  name: string;
  title: string;                    // Display title
  description: string;
  tagline: string;                  // Short memorable phrase
  
  // Classification
  type: RitualType;
  category: string;                 // Custom category for grouping
  tags: string[];
  
  // Timing
  status: RitualStatus;
  startTime: Date;
  endTime?: Date;
  duration?: number;                // Minutes for timed rituals
  timezone: string;                 // Campus timezone
  
  // Scope
  universities: string[];           // Which campuses participate
  isGlobal: boolean;               // Cross-campus ritual
  
  // Participation
  participationType: ParticipationType;
  maxParticipants?: number;
  minParticipants?: number;
  requiresInvitation: boolean;
  
  // Requirements
  prerequisites: {
    minSpaceMemberships?: number;
    requiredFeatures?: string[];
    completedRituals?: string[];
    accountAge?: number;            // Days since signup
    academicStatus?: string[];      // freshman, sophomore, etc.
  };
  
  // Mechanics
  actions: RitualAction[];
  milestones: RitualMilestone[];
  rewards: RitualReward[];
  
  // Features to unlock
  featureUnlocks: FeatureUnlock[];
  
  // Analytics
  metrics: {
    participationRate: number;
    completionRate: number;
    engagementScore: number;
    socialImpact: number;
  };
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

/**
 * Ritual Action - Something participants can do
 */
export interface RitualAction {
  id: string;
  type: 'post' | 'join_space' | 'create_tool' | 'interact' | 'vote' | 'share' | 'comment' | 'attend';
  name: string;
  description: string;
  
  // Requirements
  isRequired: boolean;
  weight: number;                   // Contribution to completion (0-100)
  
  // Constraints
  maxOccurrences?: number;          // How many times can be done
  timeLimit?: number;               // Minutes to complete
  
  // Context
  targetType?: string;              // What to interact with
  requiredContent?: string[];       // Keywords/tags required
  
  // Validation
  validationRules: {
    minLength?: number;
    requiresMedia?: boolean;
    mustMentionUsers?: boolean;
    bannedWords?: string[];
  };
}

/**
 * Ritual Milestone - Progress checkpoints
 */
export interface RitualMilestone {
  id: string;
  name: string;
  description: string;
  
  // Criteria
  participantThreshold: number;     // Number of participants needed
  progressThreshold: number;        // Percentage complete (0-100)
  timeThreshold?: Date;             // Must be reached by this time
  
  // Rewards
  unlocks?: string[];               // Features unlocked at this milestone
  celebration?: {
    message: string;
    animation?: string;
    badgeAwarded?: string;
  };
  
  // Status
  isReached: boolean;
  reachedAt?: Date;
}

/**
 * Ritual Reward - What participants earn
 */
export interface RitualReward {
  id: string;
  type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization';
  name: string;
  description: string;
  
  // Eligibility
  requiresCompletion: boolean;      // Must complete entire ritual
  minimumParticipation: number;     // Percentage participation required (0-100)
  
  // Value
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  isTimeLimited: boolean;
  expiresAt?: Date;
  
  // Content
  iconUrl?: string;
  animationUrl?: string;
  specialEffects?: string[];
  
  // Scope
  unlockScope: UnlockScope;
}

/**
 * Feature Unlock - New capabilities revealed
 */
export interface FeatureUnlock {
  id: string;
  featureId: string;               // Internal feature identifier
  name: string;
  description: string;
  
  // Unlock conditions
  participationThreshold: number;   // % of eligible users must participate
  scope: UnlockScope;
  isReversible: boolean;           // Can be locked again if participation drops
  
  // Timing
  unlockDelay?: number;            // Minutes after threshold is met
  announceDelay?: number;          // Minutes before announcing unlock
  
  // Content
  revealAnimation?: string;
  announcementText?: string;
  tutorialUrl?: string;
}

/**
 * User Participation Record
 */
export interface RitualParticipation {
  id: string;
  ritualId: string;
  userId: string;
  
  // Status
  status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
  joinedAt: Date;
  completedAt?: Date;
  lastActiveAt: Date;
  
  // Progress
  actionsCompleted: string[];       // Action IDs completed
  progressPercentage: number;       // 0-100
  
  // Engagement
  timeSpent: number;               // Minutes actively participating
  interactionCount: number;        // Number of ritual-related actions
  socialScore: number;             // How much they engaged with others
  
  // Rewards earned
  rewardsEarned: string[];         // Reward IDs
  badgesAwarded: string[];         // Badge IDs
  featuresUnlocked: string[];      // Feature IDs
  
  // Analytics
  entryPoint: string;              // How they discovered this ritual
  deviceType: string;              // mobile, desktop, tablet
  completionQuality: number;       // 0-100 based on engagement depth
}

/**
 * Campus Ritual State - University-wide progress
 */
export interface CampusRitualState {
  ritualId: string;
  university: string;
  
  // Participation
  totalEligible: number;           // Students who can participate
  totalParticipants: number;       // Students who joined
  totalCompleted: number;          // Students who finished
  
  // Progress
  overallProgress: number;         // 0-100 percentage complete
  milestonesReached: string[];     // Milestone IDs achieved
  
  // Timing
  startedAt: Date;
  expectedEndAt?: Date;
  actualEndAt?: Date;
  
  // Social dynamics
  viralityScore: number;           // How organically it spread (0-100)
  crossSpaceEngagement: number;    // Interaction between different spaces
  retentionRate: number;           // % who stayed active throughout
  
  // Outcomes
  featuresUnlocked: string[];      // Features unlocked for this campus
  culturalImpact: number;          // Long-term engagement boost (0-100)
  
  // Status
  isSuccessful: boolean;           // Met minimum success criteria
  successMessage?: string;         // Campus-specific celebration message
}

/**
 * Ritual Framework Manager
 */
export class RitualFramework {
  
  /**
   * Create and schedule a new ritual
   */
  async createRitual(ritual: Omit<Ritual, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Promise<string> {
    const ritualDoc = {
      ...ritual,
      campusId: this.resolveCampusId((ritual.universities && ritual.universities[0]) || 'buffalo'),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      metrics: {
        participationRate: 0,
        completionRate: 0,
        engagementScore: 0,
        socialImpact: 0
      }
    };
    
    const docRef = await dbAdmin.collection('rituals').add(ritualDoc);
    
    // Initialize campus states for participating universities
    await this.initializeCampusStates(docRef.id, ritual.universities);
    
    return docRef.id;
  }
  
  /**
   * Start a ritual (activate it)
   */
  async startRitual(ritualId: string): Promise<void> {
    const ritual = await this.getRitual(ritualId);
    if (!ritual) throw new Error('Ritual not found');
    
    // Update ritual status
    await dbAdmin.collection('rituals').doc(ritualId).update({
      status: 'active',
      startTime: new Date(),
      updatedAt: new Date()
    });
    
    // Initialize participation tracking
    await this.initializeParticipationTracking(ritualId, ritual.universities);
    
    // Send campus-wide notifications
    await this.broadcastRitualStart(ritualId, ritual);
    
  }
  
  /**
   * Register user participation in a ritual
   */
  async joinRitual(ritualId: string, userId: string, entryPoint = 'direct', deviceType: 'web' | 'mobile' | 'desktop' = 'web'): Promise<boolean> {
    const ritual = await this.getRitual(ritualId);
    if (!ritual || ritual.status !== 'active') return false;
    
    // Check if user meets prerequisites
    const meetsRequirements = await this.checkUserEligibility(userId, ritual);
    if (!meetsRequirements) return false;
    
    // Check if already participating
    const existingParticipation = await this.getUserParticipation(ritualId, userId);
    if (existingParticipation) return false;
    
    // Create participation record
    const participation: Omit<RitualParticipation, 'id'> = {
      ritualId,
      userId,
      campusId: this.resolveCampusId((ritual.universities && ritual.universities[0]) || 'buffalo'),
      status: 'joined',
      joinedAt: new Date(),
      lastActiveAt: new Date(),
      actionsCompleted: [],
      progressPercentage: 0,
      timeSpent: 0,
      interactionCount: 0,
      socialScore: 0,
      rewardsEarned: [],
      badgesAwarded: [],
      featuresUnlocked: [],
      entryPoint,
      deviceType,
      completionQuality: 0
    };
    
    await dbAdmin.collection('ritual_participation').add(participation);
    
    // Update campus state
    await this.updateCampusParticipation(ritualId, ritual.universities, 'joined');
    
    return true;
  }
  
  /**
   * Record ritual action completion
   */
  async recordAction(
    ritualId: string, 
    userId: string, 
    actionId: string
  ): Promise<void> {
    const participation = await this.getUserParticipation(ritualId, userId);
    if (!participation) throw new Error('User not participating in ritual');
    
    // Validate action
    const ritual = await this.getRitual(ritualId);
    if (!ritual) throw new Error('Ritual not found');
    
    const action = ritual.actions.find(a => a.id === actionId);
    if (!action) throw new Error('Action not found');
    
    // Check if already completed (for single-completion actions)
    if (action.maxOccurrences === 1 && participation.actionsCompleted.includes(actionId)) {
      return; // Already completed
    }
    
    // Update participation record
    const updatedActions = [...participation.actionsCompleted, actionId];
    const newProgress = this.calculateProgress(ritual, updatedActions);
    
    await dbAdmin.collection('ritual_participation').doc(participation.id).update({
      actionsCompleted: updatedActions,
      progressPercentage: newProgress,
      lastActiveAt: new Date(),
      interactionCount: participation.interactionCount + 1
    });
    
    // Check for completion
    if (newProgress >= 100) {
      await this.completeUserParticipation(ritualId, userId);
    }
    
    // Check for milestone achievements
    await this.checkMilestones(ritualId);
    
  }
  
  /**
   * Get ritual by ID
   */
  private async getRitual(ritualId: string): Promise<Ritual | null> {
    const doc = await dbAdmin.collection('rituals').doc(ritualId).get();
    if (!doc.exists) return null;
    
    return { id: doc.id, ...doc.data() } as Ritual;
  }
  
  /**
   * Get user's participation in a ritual
   */
  private async getUserParticipation(ritualId: string, userId: string): Promise<RitualParticipation | null> {
    const snapshot = await dbAdmin.collection('ritual_participation')
      .where('ritualId', '==', ritualId)
      .where('userId', '==', userId)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as RitualParticipation;
  }
  
  /**
   * Check if user meets ritual prerequisites
   */
  private async checkUserEligibility(userId: string, ritual: Ritual): Promise<boolean> {
    try {
      // Fetch user doc
      const userDoc = await dbAdmin.collection('users').doc(userId).get();
      const userData = userDoc.exists ? userDoc.data() || {} : {};

      // 1) Account age check
      if (ritual.prerequisites?.accountAge && userData?.createdAt) {
        const created = userData.createdAt?.toDate?.() || new Date(userData.createdAt);
        const days = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
        if (days < ritual.prerequisites.accountAge) return false;
      }

      // 2) Minimum space memberships
      if (ritual.prerequisites?.minSpaceMemberships) {
        const memberships = await dbAdmin.collection('members')
          .where('userId', '==', userId)
          .where('status', '==', 'active')
          .get();
        if (memberships.size < ritual.prerequisites.minSpaceMemberships) return false;
      }

      // 3) Completed rituals prerequisite
      if (ritual.prerequisites?.completedRituals && ritual.prerequisites.completedRituals.length > 0) {
        const completedSnap = await dbAdmin.collection('ritual_participation')
          .where('userId', '==', userId)
          .where('status', '==', 'completed')
          .get();
        const completedIds = new Set(completedSnap.docs.map(d => d.data().ritualId));
        for (const req of ritual.prerequisites.completedRituals) {
          if (!completedIds.has(req)) return false;
        }
      }

      // 4) Academic status
      if (ritual.prerequisites?.academicStatus && ritual.prerequisites.academicStatus.length > 0) {
        const status = (userData?.academicStatus || '').toString().toLowerCase();
        const allowed = ritual.prerequisites.academicStatus.map((s: string) => s.toLowerCase());
        if (status && !allowed.includes(status)) return false;
      }

      // 5) Required features (user-level unlocks)
      if (ritual.prerequisites?.requiredFeatures && ritual.prerequisites.requiredFeatures.length > 0) {
        const { featureRevealSystem } = await import('./feature-reveal-system');
        for (const featureId of ritual.prerequisites.requiredFeatures) {
          const hasAccess = await featureRevealSystem.hasFeatureAccess(featureId, userId);
          if (!hasAccess) return false;
        }
      }

      return true;
    } catch {
      // On error, be permissive rather than blocking
      return true;
    }
  }
  
  /**
   * Calculate progress percentage based on completed actions
   */
  private calculateProgress(ritual: Ritual, completedActions: string[]): number {
    if (ritual.actions.length === 0) return 100;
    
    const totalWeight = ritual.actions.reduce((sum, action) => sum + action.weight, 0);
    const completedWeight = ritual.actions
      .filter(action => completedActions.includes(action.id))
      .reduce((sum, action) => sum + action.weight, 0);
    
    return Math.min(100, (completedWeight / totalWeight) * 100);
  }
  
  /**
   * Initialize campus states for participating universities
   */
  private async initializeCampusStates(ritualId: string, universities: string[]): Promise<void> {
    const batch = dbAdmin.batch();
    
    for (const university of universities) {
      const campusState: Omit<CampusRitualState, 'ritualId' | 'university'> = {
        totalEligible: 0, // Will be calculated when ritual starts
        totalParticipants: 0,
        totalCompleted: 0,
        overallProgress: 0,
        milestonesReached: [],
        startedAt: new Date(),
        viralityScore: 0,
        crossSpaceEngagement: 0,
        retentionRate: 0,
        featuresUnlocked: [],
        culturalImpact: 0,
        isSuccessful: false
      };
      
      const ref = dbAdmin.collection('campus_ritual_states').doc(`${ritualId}_${university}`);
      batch.set(ref, { ritualId, university, ...campusState });
    }
    
    await batch.commit();
  }
  
  /**
   * Initialize participation tracking when ritual starts
   */
  private async initializeParticipationTracking(ritualId: string, universities: string[]): Promise<void> {
    // Calculate eligible participants per university and update campus state
    for (const uni of universities) {
      const campusId = this.resolveCampusId(uni);
      // Count eligible users by campusId
      const usersSnap = await dbAdmin.collection('users')
        .where('campusId', '==', campusId)
        .get();

      const ref = dbAdmin.collection('campus_ritual_states').doc(`${ritualId}_${uni}`);
      await ref.set({
        ritualId,
        university: uni,
        totalEligible: usersSnap.size,
        startedAt: new Date(),
        updatedAt: new Date()
      }, { merge: true });
    }
  }
  
  /**
   * Send campus-wide ritual start notifications
   */
  private async broadcastRitualStart(ritualId: string, ritual: Ritual): Promise<void> {
    // Minimal campus announcement record
    const title = `Ritual started: ${ritual.title}`;
    const message = ritual.tagline || ritual.description || 'A new campus ritual has begun.';

    for (const uni of ritual.universities) {
      await dbAdmin.collection('announcements').add({
        type: 'system_announcement',
        title,
        message,
        ritualId,
        university: uni,
        campusId: this.resolveCampusId(uni),
        createdAt: new Date(),
        priority: 'normal'
      });
    }
  }
  
  /**
   * Update campus participation counters
   */
  private async updateCampusParticipation(
    ritualId: string, 
    universities: string[], 
    action: 'joined' | 'completed'
  ): Promise<void> {
    for (const uni of universities) {
      const docRef = dbAdmin.collection('campus_ritual_states').doc(`${ritualId}_${uni}`);
      const update: Record<string, any> = { updatedAt: new Date() };
      if (action === 'joined') update.totalParticipants = (await docRef.get()).data()?.totalParticipants || 0 + 1;
      if (action === 'completed') update.totalCompleted = (await docRef.get()).data()?.totalCompleted || 0 + 1;
      await docRef.set(update, { merge: true });
    }
  }
  
  /**
   * Complete user's ritual participation
   */
  private async completeUserParticipation(ritualId: string, userId: string): Promise<void> {
    const participation = await this.getUserParticipation(ritualId, userId);
    if (!participation) return;
    
    await dbAdmin.collection('ritual_participation').doc(participation.id).update({
      status: 'completed',
      completedAt: new Date(),
      progressPercentage: 100
    });
    
    // Award rewards
    await this.awardRitualRewards(ritualId, userId);
    
  }
  
  /**
   * Award rewards to user for ritual completion
   */
  private async awardRitualRewards(ritualId: string, userId: string): Promise<void> {
    const ritual = await this.getRitual(ritualId);
    if (!ritual) return;

    // Record rewards for the user
    for (const reward of ritual.rewards || []) {
      // For now, award all completion-gated rewards upon completion
      if (reward.requiresCompletion) {
        await dbAdmin.collection('user_rewards').add({
          userId,
          ritualId,
          rewardId: reward.id,
          type: reward.type,
          awardedAt: new Date(),
          metadata: { name: reward.name, rarity: reward.rarity }
        });

        // If reward is a feature, unlock at user scope
        if (reward.type === 'feature') {
          const { featureRevealSystem } = await import('./feature-reveal-system');
          await featureRevealSystem.unlockFeature(reward.id, 'user', userId, { unlockedBy: 'ritual', sourceId: ritualId });
        }
      }
    }
  }
  
  /**
   * Check and trigger milestone achievements
   */
  private async checkMilestones(ritualId: string): Promise<void> {
    // Check simple milestone thresholds based on participant counts and average progress
    const ritual = await this.getRitual(ritualId);
    if (!ritual) return;

    // Aggregate participation
    const partsSnap = await dbAdmin.collection('ritual_participation')
      .where('ritualId', '==', ritualId)
      .get();
    const participantCount = partsSnap.size;
    let avgProgress = 0;
    if (participantCount > 0) {
      const sum = partsSnap.docs.reduce((acc, d) => acc + (d.data().progressPercentage || 0), 0);
      avgProgress = sum / participantCount;
    }

    // Update subcollection milestones if present
    const milestonesSnap = await dbAdmin.collection('rituals').doc(ritualId).collection('milestones').get();
    for (const mDoc of milestonesSnap.docs) {
      const m = mDoc.data();
      if (!m.isReached) {
        const reachedByParticipants = typeof m.participantThreshold === 'number' && participantCount >= m.participantThreshold;
        const reachedByProgress = typeof m.progressThreshold === 'number' && avgProgress >= m.progressThreshold;
        if (reachedByParticipants || reachedByProgress) {
          await mDoc.ref.set({
            isReached: true,
            reachedAt: new Date(),
            participantsCompleted: participantCount
          }, { merge: true });
        }
      }
    }

    // Optionally check feature unlocks via campus participation
    const { featureRevealSystem } = await import('./feature-reveal-system');
    for (const uni of ritual.universities) {
      const campusRef = dbAdmin.collection('campus_ritual_states').doc(`${ritualId}_${uni}`);
      const state = (await campusRef.get()).data() as any | undefined;
      if (state && state.totalEligible > 0) {
        const participationRate = (state.totalParticipants / state.totalEligible) * 100;
        await featureRevealSystem.checkRitualFeatureUnlocks(ritualId, uni, {
          totalParticipants: state.totalParticipants || 0,
          totalEligible: state.totalEligible || 0,
          participationRate
        });
      }
    }
  }

  private resolveCampusId(university: string): string {
    // Simple mapping for UB; extend as multi-campus rolls out
    const u = university.toLowerCase();
    if (u.includes('buffalo') || u.includes('ub')) return 'ub-buffalo';
    return university;
  }
}

/**
 * Global ritual framework instance
 */
export const ritualFramework = new RitualFramework();
