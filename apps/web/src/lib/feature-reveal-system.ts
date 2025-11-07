import { dbAdmin } from '@/lib/firebase-admin';

/**
 * Feature Reveal System
 * 
 * Philosophy: Features should feel like gifts earned through community participation,
 * not arbitrary unlocks. Each reveal should feel like a natural evolution of the
 * platform that the community has "unlocked" together.
 */

// Feature definition
export interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'communication' | 'creation' | 'community' | 'personalization' | 'moderation' | 'analytics';
  
  // Technical details
  component?: string;           // React component to enable
  apiEndpoint?: string;         // API endpoint to activate
  permission?: string;          // Permission to grant
  configFlag?: string;          // Configuration flag to set
  
  // Revelation details
  unlockAnimation?: string;     // Animation for the reveal moment
  tutorialUrl?: string;         // Onboarding for the new feature
  announcementText?: string;    // Campus-wide announcement text
  
  // Dependencies
  dependsOn: string[];          // Other features this requires
  enablesFeatures: string[];    // Features this enables
  
  // Metadata
  isReversible: boolean;        // Can be locked again
  tier: 'basic' | 'advanced' | 'premium' | 'experimental';
  estimatedUsage: number;       // Expected usage percentage (0-100)
  
  createdAt: Date;
  version: string;
}

// Feature unlock record
export interface FeatureUnlockRecord {
  id: string;
  featureId: string;
  scope: 'user' | 'space' | 'campus' | 'platform';
  targetId: string;             // User ID, space ID, university ID, or 'global'
  
  // Unlock context
  unlockedBy: 'ritual' | 'admin' | 'achievement' | 'purchase' | 'beta';
  sourceId?: string;            // Ritual ID, achievement ID, etc.
  
  // Status
  status: 'pending' | 'active' | 'revoked' | 'expired';
  unlockedAt: Date;
  expiresAt?: Date;
  revokedAt?: Date;
  revokedReason?: string;
  
  // Analytics
  usageCount: number;
  firstUsedAt?: Date;
  lastUsedAt?: Date;
  
  // Metadata
  unlockMetadata: Record<string, any>;
}

// Campus feature state
export interface CampusFeatureState {
  university: string;
  featureId: string;
  
  // Unlock progress
  unlockProgress: number;       // 0-100 percentage
  participantsNeeded: number;
  participantsCurrent: number;
  
  // Status
  isUnlocked: boolean;
  unlockedAt?: Date;
  
  // Community impact
  adoptionRate: number;         // % of eligible users using feature
  satisfactionScore: number;    // User feedback score (0-100)
  
  // Unlock conditions
  ritualId?: string;            // Which ritual unlocks this
  thresholdType: 'participation' | 'completion' | 'time' | 'custom';
  threshold: number;
  
  updatedAt: Date;
}

/**
 * Feature Reveal System Manager
 */
export class FeatureRevealSystem {
  
  /**
   * Register a new feature in the system
   */
  async registerFeature(feature: Omit<Feature, 'id' | 'createdAt'>): Promise<string> {
    const featureDoc = {
      ...feature,
      createdAt: new Date(),
      version: '1.0.0'
    };
    
    const docRef = await dbAdmin.collection('features').add(featureDoc);
    
    return docRef.id;
  }
  
  /**
   * Check and trigger feature unlocks for a ritual milestone
   */
  async checkRitualFeatureUnlocks(
    ritualId: string, 
    university: string, 
    participationData: {
      totalParticipants: number;
      totalEligible: number;
      participationRate: number;
    }
  ): Promise<string[]> {
    const unlockedFeatures: string[] = [];
    
    try {
      // Get ritual's feature unlocks
      const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
      if (!ritualDoc.exists) return unlockedFeatures;
      
      const ritual = ritualDoc.data()!;
      const featureUnlocks = ritual.featureUnlocks || [];
      
      for (const unlock of featureUnlocks) {
        const shouldUnlock = this.shouldUnlockFeature(unlock, participationData);
        
        if (shouldUnlock) {
          const unlocked = await this.unlockFeature(
            unlock.featureId,
            unlock.scope,
            unlock.scope === 'campus' ? university : 'global',
            {
              unlockedBy: 'ritual',
              sourceId: ritualId,
              participationRate: participationData.participationRate,
              milestone: unlock.name
            }
          );
          
          if (unlocked) {
            unlockedFeatures.push(unlock.featureId);
            
            // Schedule reveal announcement
            await this.scheduleFeatureReveal(
              unlock.featureId, 
              university, 
              unlock.announceDelay || 0
            );
          }
        }
      }
      
    } catch (error) {
    }
    
    return unlockedFeatures;
  }
  
  /**
   * Unlock a feature for a specific scope
   */
  async unlockFeature(
    featureId: string,
    scope: 'user' | 'space' | 'campus' | 'platform',
    targetId: string,
    metadata: {
      unlockedBy: 'ritual' | 'admin' | 'achievement' | 'purchase' | 'beta';
      sourceId?: string;
      [key: string]: any;
    }
  ): Promise<boolean> {
    try {
      // Check if already unlocked
      const existingUnlock = await this.getFeatureUnlock(featureId, scope, targetId);
      if (existingUnlock && existingUnlock.status === 'active') {
        return false; // Already unlocked
      }
      
      // Get feature details
      const feature = await this.getFeature(featureId);
      if (!feature) {
        return false;
      }
      
      // Check dependencies
      const dependenciesMet = await this.checkFeatureDependencies(
        feature.dependsOn, 
        scope, 
        targetId
      );
      
      if (!dependenciesMet) {
        return false;
      }
      
      // Create unlock record
      const unlockRecord: Omit<FeatureUnlockRecord, 'id'> = {
        featureId,
        scope,
        targetId,
        unlockedBy: metadata.unlockedBy,
        sourceId: metadata.sourceId,
        status: 'active',
        unlockedAt: new Date(),
        usageCount: 0,
        unlockMetadata: metadata
      };
      
      await dbAdmin.collection('feature_unlocks').add(unlockRecord);
      
      // Update campus feature state if campus-scoped
      if (scope === 'campus') {
        await this.updateCampusFeatureState(featureId, targetId, {
          isUnlocked: true,
          unlockedAt: new Date()
        });
      }
      
      // Trigger dependent features
      await this.checkDependentFeatures(featureId, scope, targetId);
      
      return true;
      
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Check if user/space/campus has access to a feature
   */
  async hasFeatureAccess(
    featureId: string,
    userId: string,
    spaceId?: string,
    university?: string
  ): Promise<boolean> {
    try {
      // Check in order of specificity: user -> space -> campus -> platform
      
      // User-specific unlock
      const userUnlock = await this.getFeatureUnlock(featureId, 'user', userId);
      if (userUnlock && userUnlock.status === 'active') return true;
      
      // Space-specific unlock
      if (spaceId) {
        const spaceUnlock = await this.getFeatureUnlock(featureId, 'space', spaceId);
        if (spaceUnlock && spaceUnlock.status === 'active') return true;
      }
      
      // Campus-wide unlock
      if (university) {
        const campusUnlock = await this.getFeatureUnlock(featureId, 'campus', university);
        if (campusUnlock && campusUnlock.status === 'active') return true;
      }
      
      // Platform-wide unlock
      const platformUnlock = await this.getFeatureUnlock(featureId, 'platform', 'global');
      if (platformUnlock && platformUnlock.status === 'active') return true;
      
      return false;
      
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Record feature usage for analytics
   */
  async recordFeatureUsage(
    featureId: string,
    userId: string,
    context: {
      action: string;
      metadata?: Record<string, any>;
    }
  ): Promise<void> {
    try {
      // Find the unlock record
      const unlockRecord = await this.getUserFeatureUnlock(featureId, userId);
      if (!unlockRecord) return;
      
      // Update usage statistics
      await dbAdmin.collection('feature_unlocks').doc(unlockRecord.id).update({
        usageCount: unlockRecord.usageCount + 1,
        lastUsedAt: new Date(),
        firstUsedAt: unlockRecord.firstUsedAt || new Date()
      });
      
      // Log usage event for analytics
      await dbAdmin.collection('feature_usage_log').add({
        featureId,
        userId,
        action: context.action,
        metadata: context.metadata || {},
        timestamp: new Date()
      });
      
    } catch (error) {
    }
  }
  
  /**
   * Get feature unlock progress for a campus
   */
  async getCampusFeatureProgress(
    university: string,
    featureId?: string
  ): Promise<CampusFeatureState[]> {
    try {
      let query = dbAdmin.collection('campus_feature_states')
        .where('university', '==', university);
      
      if (featureId) {
        query = query.where('featureId', '==', featureId);
      }
      
      const snapshot = await query.get();
      
      return snapshot.docs.map(doc => ({
        ...doc.data(),
        unlockedAt: doc.data().unlockedAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as CampusFeatureState[];
      
    } catch (error) {
      return [];
    }
  }
  
  /**
   * Get all features unlocked for a user
   */
  async getUserUnlockedFeatures(userId: string, university?: string): Promise<Feature[]> {
    try {
      const features: Feature[] = [];
      
      // Get all feature unlock records for this user context
      const unlocks = await dbAdmin.collection('feature_unlocks')
        .where('status', '==', 'active')
        .get();
      
      const relevantUnlocks = unlocks.docs.filter(doc => {
        const data = doc.data();
        return (
          (data.scope === 'user' && data.targetId === userId) ||
          (data.scope === 'campus' && data.targetId === university) ||
          (data.scope === 'platform' && data.targetId === 'global')
        );
      });
      
      // Get feature details for each unlock
      for (const unlockDoc of relevantUnlocks) {
        const feature = await this.getFeature(unlockDoc.data().featureId);
        if (feature) {
          features.push(feature);
        }
      }
      
      return features;
      
    } catch (error) {
      return [];
    }
  }
  
  /**
   * Private helper methods
   */
  
  private async getFeature(featureId: string): Promise<Feature | null> {
    try {
      const doc = await dbAdmin.collection('features').doc(featureId).get();
      if (!doc.exists) return null;
      
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data()!.createdAt?.toDate() || new Date()
      } as Feature;
    } catch (error) {
      return null;
    }
  }
  
  private async getFeatureUnlock(
    featureId: string,
    scope: string,
    targetId: string
  ): Promise<FeatureUnlockRecord | null> {
    try {
      const snapshot = await dbAdmin.collection('feature_unlocks')
        .where('featureId', '==', featureId)
        .where('scope', '==', scope)
        .where('targetId', '==', targetId)
        .where('status', '==', 'active')
        .limit(1)
        .get();
      
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
        unlockedAt: doc.data().unlockedAt?.toDate() || new Date(),
        expiresAt: doc.data().expiresAt?.toDate(),
        revokedAt: doc.data().revokedAt?.toDate(),
        firstUsedAt: doc.data().firstUsedAt?.toDate(),
        lastUsedAt: doc.data().lastUsedAt?.toDate()
      } as FeatureUnlockRecord;
    } catch (error) {
      return null;
    }
  }
  
  private async getUserFeatureUnlock(
    featureId: string,
    userId: string
  ): Promise<FeatureUnlockRecord | null> {
    // Check user-specific unlock first, then broader scopes
    const userUnlock = await this.getFeatureUnlock(featureId, 'user', userId);
    if (userUnlock) return userUnlock;
    
    // TODO: Check space and campus unlocks for this user
    return null;
  }
  
  private shouldUnlockFeature(
    unlock: any,
    participationData: { participationRate: number; totalParticipants: number }
  ): boolean {
    return participationData.participationRate >= unlock.participationThreshold;
  }
  
  private async checkFeatureDependencies(
    dependencies: string[],
    scope: string,
    targetId: string
  ): Promise<boolean> {
    for (const depId of dependencies) {
      const hasAccess = await this.getFeatureUnlock(depId, scope, targetId);
      if (!hasAccess || hasAccess.status !== 'active') {
        return false;
      }
    }
    return true;
  }
  
  private async checkDependentFeatures(
    _featureId: string,
    _scope: string,
    _targetId: string
  ): Promise<void> {
    // TODO: Check if unlocking this feature enables other features
  }
  
  private async updateCampusFeatureState(
    featureId: string,
    university: string,
    updates: Partial<CampusFeatureState>
  ): Promise<void> {
    const docId = `${university}_${featureId}`;
    await dbAdmin.collection('campus_feature_states').doc(docId).update({
      ...updates,
      updatedAt: new Date()
    });
  }
  
  private async scheduleFeatureReveal(
    featureId: string,
    university: string,
    delayMinutes: number
  ): Promise<void> {
    // TODO: Schedule campus-wide announcement
  }
}

/**
 * Pre-defined features that can be unlocked through rituals
 */
export const coreFeatures: Omit<Feature, 'id' | 'createdAt'>[] = [
  {
    name: 'Rich Text Posting',
    description: 'Advanced formatting, mentions, and media in posts',
    category: 'communication',
    component: 'RichTextEditor',
    configFlag: 'rich_text_enabled',
    unlockAnimation: 'text_enhancement',
    tutorialUrl: '/tutorials/rich-text',
    announcementText: 'Your campus has unlocked rich text posting! Express yourself with style. ✨',
    dependsOn: [],
    enablesFeatures: ['advanced_mentions', 'media_embeds'],
    isReversible: false,
    tier: 'basic',
    estimatedUsage: 85,
    version: '1.0.0'
  },
  {
    name: 'Custom Space Themes',
    description: 'Personalize your spaces with custom colors and layouts',
    category: 'personalization',
    component: 'SpaceThemeEditor',
    permission: 'customize_space',
    unlockAnimation: 'theme_reveal',
    announcementText: 'Spaces can now be customized! Make your community visually unique. 🎨',
    dependsOn: ['rich_text_posting'],
    enablesFeatures: ['advanced_layouts'],
    isReversible: false,
    tier: 'advanced',
    estimatedUsage: 45,
    version: '1.0.0'
  },
  {
    name: 'Tool Marketplace',
    description: 'Browse, fork, and share tools created by your campus community',
    category: 'creation',
    component: 'ToolMarketplace',
    apiEndpoint: '/api/tools/marketplace',
    unlockAnimation: 'marketplace_open',
    tutorialUrl: '/tutorials/tool-marketplace',
    announcementText: 'The Tool Marketplace is now open! Discover amazing tools built by your peers. 🛠️',
    dependsOn: [],
    enablesFeatures: ['tool_ratings', 'tool_analytics'],
    isReversible: false,
    tier: 'advanced',
    estimatedUsage: 60,
    version: '1.0.0'
  },
  {
    name: 'Real-time Chat',
    description: 'Live messaging within spaces for immediate conversations',
    category: 'communication',
    component: 'RealtimeChat',
    apiEndpoint: '/api/chat/websocket',
    unlockAnimation: 'chat_activation',
    announcementText: 'Real-time chat is live! Connect instantly with your space members. 💬',
    dependsOn: ['rich_text_posting'],
    enablesFeatures: ['voice_messages', 'file_sharing'],
    isReversible: true,
    tier: 'premium',
    estimatedUsage: 70,
    version: '1.0.0'
  },
  {
    name: 'Advanced Analytics',
    description: 'Detailed insights into space engagement and user behavior',
    category: 'analytics',
    component: 'AnalyticsDashboard',
    permission: 'view_analytics',
    unlockAnimation: 'data_visualization',
    announcementText: 'Advanced analytics unlocked! Understand your community better. 📊',
    dependsOn: ['tool_marketplace'],
    enablesFeatures: ['export_data', 'custom_reports'],
    isReversible: false,
    tier: 'premium',
    estimatedUsage: 25,
    version: '1.0.0'
  }
];

/**
 * Global feature reveal system instance
 */
export const featureRevealSystem = new FeatureRevealSystem();
import 'server-only';
