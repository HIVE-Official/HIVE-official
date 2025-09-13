/**
 * Ritual Participation Tracker
 * 
 * Manages participation tracking for HIVE rituals (recurring community events).
 * Rituals are regular campus activities like study groups, club meetings, 
 * traditions, and recurring social events that build community engagement.
 * 
 * Features:
 * - Track member participation and attendance
 * - Calculate engagement scores
 * - Manage streaks and achievements
 * - Handle check-ins and validations
 * - Generate participation reports
 */

import { db } from '../firebase-client';
import { adminDb } from '../firebase-admin';
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
  increment,
  Timestamp,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { logger } from '../structured-logger';

/**
 * Ritual participation status
 */
export type ParticipationStatus = 
  | 'registered'    // Signed up but not attended
  | 'checked_in'    // Attended and checked in
  | 'completed'     // Fully participated
  | 'partial'       // Partially attended
  | 'absent'        // Registered but didn't attend
  | 'cancelled';    // Cancelled participation

/**
 * Ritual participant role
 */
export type ParticipantRole = 
  | 'organizer'
  | 'leader'
  | 'member'
  | 'guest'
  | 'observer';

/**
 * Participation record
 */
export interface ParticipationRecord {
  id?: string;
  ritualId: string;
  ritualInstanceId?: string; // For specific occurrence of recurring ritual
  userId: string;
  userName?: string;
  role: ParticipantRole;
  status: ParticipationStatus;
  checkInTime?: Timestamp;
  checkOutTime?: Timestamp;
  duration?: number; // Minutes participated
  contribution?: {
    type: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
  };
  feedback?: {
    rating: number; // 1-5
    comment?: string;
    tags?: string[];
  };
  points?: number;
  achievements?: string[];
  metadata?: Record<string, any>;
  createdAt: Timestamp | ReturnType<typeof serverTimestamp>;
  updatedAt?: Timestamp | ReturnType<typeof serverTimestamp>;
}

/**
 * Participation statistics
 */
export interface ParticipationStats {
  userId: string;
  totalRituals: number;
  attendedRituals: number;
  completedRituals: number;
  attendanceRate: number;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  averageRating: number;
  favoriteRituals: Array<{
    ritualId: string;
    name: string;
    count: number;
  }>;
  achievements: Array<{
    id: string;
    name: string;
    earnedAt: Date;
  }>;
  recentActivity: ParticipationRecord[];
}

/**
 * Ritual engagement metrics
 */
export interface RitualEngagement {
  ritualId: string;
  totalParticipants: number;
  activeParticipants: number;
  averageAttendance: number;
  completionRate: number;
  satisfactionScore: number;
  topContributors: Array<{
    userId: string;
    name: string;
    score: number;
  }>;
  trends: {
    weekly: number[];
    monthly: number[];
  };
}

/**
 * Check-in validation rules
 */
export interface CheckInRules {
  requireLocation?: boolean;
  locationRadius?: number; // meters
  requireQRCode?: boolean;
  requirePhoto?: boolean;
  timeWindow?: {
    before: number; // minutes before start
    after: number;  // minutes after start
  };
}

/**
 * Ritual Participation Tracker Class
 */
export class RitualParticipationTracker {
  private readonly participationCollection = 'ritual_participation';
  private readonly statsCollection = 'user_ritual_stats';
  private readonly achievementsCollection = 'ritual_achievements';

  /**
   * Register a participant for a ritual
   */
  async registerParticipant(
    ritualId: string,
    userId: string,
    role: ParticipantRole = 'member',
    metadata?: Record<string, any>
  ): Promise<string> {
    try {
      // Check if already registered
      const existing = await this.getParticipation(ritualId, userId);
      if (existing) {
        throw new Error('Already registered for this ritual');
      }

      // Create participation record
      const record: Omit<ParticipationRecord, 'id'> = {
        ritualId,
        userId,
        role,
        status: 'registered',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        metadata
      };

      const docRef = await addDoc(
        collection(db, this.participationCollection),
        record
      );

      logger.info('Participant registered', {
        participationId: docRef.id,
        ritualId,
        userId,
        role
      });

      // Update ritual participant count
      await this.updateRitualCount(ritualId, 1);

      return docRef.id;
    } catch (error) {
      logger.error('Failed to register participant', error as Error);
      throw new Error('Failed to register for ritual');
    }
  }

  /**
   * Check in a participant
   */
  async checkIn(
    ritualId: string,
    userId: string,
    validation?: {
      location?: { lat: number; lng: number };
      qrCode?: string;
      photoUrl?: string;
    }
  ): Promise<void> {
    try {
      // Get participation record
      const participation = await this.getParticipation(ritualId, userId);
      if (!participation) {
        throw new Error('Not registered for this ritual');
      }

      // Validate check-in if rules exist
      const ritual = await this.getRitualDetails(ritualId);
      if (ritual?.checkInRules) {
        await this.validateCheckIn(ritual.checkInRules, validation);
      }

      // Update participation status
      const participationRef = doc(db, this.participationCollection, participation.id!);
      await updateDoc(participationRef, {
        status: 'checked_in',
        checkInTime: serverTimestamp(),
        updatedAt: serverTimestamp(),
        validation
      });

      // Award check-in points
      await this.awardPoints(userId, 10, 'check_in', ritualId);

      logger.info('Participant checked in', {
        ritualId,
        userId,
        participationId: participation.id
      });

      // Check for streaks
      await this.updateStreaks(userId, ritualId);
    } catch (error) {
      logger.error('Check-in failed', error as Error);
      throw new Error('Failed to check in');
    }
  }

  /**
   * Mark participation as complete
   */
  async completeParticipation(
    ritualId: string,
    userId: string,
    feedback?: ParticipationRecord['feedback']
  ): Promise<void> {
    try {
      const participation = await this.getParticipation(ritualId, userId);
      if (!participation) {
        throw new Error('No participation record found');
      }

      // Calculate duration if checked in
      let duration = 0;
      if (participation.checkInTime) {
        const checkOut = Timestamp.now();
        duration = Math.floor(
          (checkOut.toMillis() - participation.checkInTime.toMillis()) / 60000
        );
      }

      // Update participation
      const participationRef = doc(db, this.participationCollection, participation.id!);
      await updateDoc(participationRef, {
        status: 'completed',
        checkOutTime: serverTimestamp(),
        duration,
        feedback,
        updatedAt: serverTimestamp()
      });

      // Award completion points
      const points = this.calculatePoints(duration, participation.role, feedback?.rating);
      await this.awardPoints(userId, points, 'completion', ritualId);

      // Check for achievements
      await this.checkAchievements(userId, ritualId);

      logger.info('Participation completed', {
        ritualId,
        userId,
        duration,
        points
      });
    } catch (error) {
      logger.error('Failed to complete participation', error as Error);
      throw new Error('Failed to complete participation');
    }
  }

  /**
   * Get participation statistics for a user
   */
  async getUserStats(userId: string): Promise<ParticipationStats> {
    try {
      // Get all participations
      const q = query(
        collection(db, this.participationCollection),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const participations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ParticipationRecord));

      // Calculate statistics
      const stats: ParticipationStats = {
        userId,
        totalRituals: participations.length,
        attendedRituals: participations.filter(p => 
          ['checked_in', 'completed', 'partial'].includes(p.status)
        ).length,
        completedRituals: participations.filter(p => p.status === 'completed').length,
        attendanceRate: 0,
        currentStreak: await this.getCurrentStreak(userId),
        longestStreak: await this.getLongestStreak(userId),
        totalPoints: await this.getTotalPoints(userId),
        averageRating: this.calculateAverageRating(participations),
        favoriteRituals: await this.getFavoriteRituals(userId),
        achievements: await this.getUserAchievements(userId),
        recentActivity: participations.slice(0, 5)
      };

      // Calculate attendance rate
      if (stats.totalRituals > 0) {
        stats.attendanceRate = (stats.attendedRituals / stats.totalRituals) * 100;
      }

      return stats;
    } catch (error) {
      logger.error('Failed to get user stats', error as Error);
      throw new Error('Failed to retrieve participation statistics');
    }
  }

  /**
   * Get ritual engagement metrics
   */
  async getRitualEngagement(ritualId: string): Promise<RitualEngagement> {
    try {
      // Get all participations for this ritual
      const q = query(
        collection(db, this.participationCollection),
        where('ritualId', '==', ritualId)
      );

      const snapshot = await getDocs(q);
      const participations = snapshot.docs.map(doc => doc.data() as ParticipationRecord);

      // Calculate metrics
      const engagement: RitualEngagement = {
        ritualId,
        totalParticipants: participations.length,
        activeParticipants: participations.filter(p => 
          p.status === 'checked_in' || p.status === 'completed'
        ).length,
        averageAttendance: 0,
        completionRate: 0,
        satisfactionScore: 0,
        topContributors: await this.getTopContributors(ritualId),
        trends: {
          weekly: await this.getWeeklyTrends(ritualId),
          monthly: await this.getMonthlyTrends(ritualId)
        }
      };

      // Calculate rates
      if (engagement.totalParticipants > 0) {
        engagement.completionRate = 
          (participations.filter(p => p.status === 'completed').length / 
           engagement.totalParticipants) * 100;
        
        const ratings = participations
          .filter(p => p.feedback?.rating)
          .map(p => p.feedback!.rating);
        
        if (ratings.length > 0) {
          engagement.satisfactionScore = 
            ratings.reduce((a, b) => a + b, 0) / ratings.length;
        }
      }

      return engagement;
    } catch (error) {
      logger.error('Failed to get ritual engagement', error as Error);
      throw new Error('Failed to retrieve engagement metrics');
    }
  }

  /**
   * Track participation for analytics
   */
  async trackParticipation(
    ritualId: string,
    userId: string,
    event: string,
    data?: Record<string, any>
  ): Promise<void> {
    try {
      await addDoc(collection(db, 'ritual_analytics'), {
        ritualId,
        userId,
        event,
        data,
        timestamp: serverTimestamp()
      });

      logger.debug('Participation tracked', {
        ritualId,
        userId,
        event
      });
    } catch (error) {
      logger.error('Failed to track participation', error as Error);
    }
  }

  /**
   * Private: Get participation record
   */
  private async getParticipation(
    ritualId: string,
    userId: string
  ): Promise<ParticipationRecord | null> {
    const q = query(
      collection(db, this.participationCollection),
      where('ritualId', '==', ritualId),
      where('userId', '==', userId),
      limit(1)
    );

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } as ParticipationRecord;
  }

  /**
   * Private: Get ritual details
   */
  private async getRitualDetails(ritualId: string): Promise<any> {
    try {
      const ritualDoc = await getDoc(doc(db, 'rituals', ritualId));
      return ritualDoc.exists() ? ritualDoc.data() : null;
    } catch (error) {
      logger.error('Failed to get ritual details', error as Error);
      return null;
    }
  }

  /**
   * Private: Validate check-in
   */
  private async validateCheckIn(
    rules: CheckInRules,
    validation?: any
  ): Promise<void> {
    if (rules.requireLocation && !validation?.location) {
      throw new Error('Location required for check-in');
    }
    if (rules.requireQRCode && !validation?.qrCode) {
      throw new Error('QR code required for check-in');
    }
    if (rules.requirePhoto && !validation?.photoUrl) {
      throw new Error('Photo required for check-in');
    }
    // Add more validation as needed
  }

  /**
   * Private: Calculate points
   */
  private calculatePoints(
    duration: number,
    role: ParticipantRole,
    rating?: number
  ): number {
    let points = 10; // Base points
    
    // Duration bonus (1 point per 10 minutes)
    points += Math.floor(duration / 10);
    
    // Role multiplier
    const roleMultipliers: Record<ParticipantRole, number> = {
      organizer: 3,
      leader: 2,
      member: 1,
      guest: 0.5,
      observer: 0.3
    };
    points *= roleMultipliers[role];
    
    // Rating bonus
    if (rating) {
      points += rating * 2;
    }
    
    return Math.round(points);
  }

  /**
   * Private: Award points to user
   */
  private async awardPoints(
    userId: string,
    points: number,
    reason: string,
    ritualId: string
  ): Promise<void> {
    try {
      const statsRef = doc(db, this.statsCollection, userId);
      
      // Update or create stats document
      const statsDoc = await getDoc(statsRef);
      
      if (statsDoc.exists()) {
        await updateDoc(statsRef, {
          totalPoints: increment(points),
          lastUpdated: serverTimestamp()
        });
      } else {
        await updateDoc(statsRef, {
          userId,
          totalPoints: points,
          lastUpdated: serverTimestamp()
        });
      }

      // Log points award
      await addDoc(collection(db, 'points_log'), {
        userId,
        points,
        reason,
        ritualId,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      logger.error('Failed to award points', error as Error);
    }
  }

  /**
   * Private: Update ritual participant count
   */
  private async updateRitualCount(ritualId: string, delta: number): Promise<void> {
    try {
      const ritualRef = doc(db, 'rituals', ritualId);
      await updateDoc(ritualRef, {
        participantCount: increment(delta),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      logger.error('Failed to update ritual count', error as Error);
    }
  }

  /**
   * Private: Update user streaks
   */
  private async updateStreaks(userId: string, ritualId: string): Promise<void> {
    // Implement streak tracking logic
    logger.debug('Updating streaks', { userId, ritualId });
  }

  /**
   * Private: Check for achievements
   */
  private async checkAchievements(userId: string, ritualId: string): Promise<void> {
    // Implement achievement checking logic
    logger.debug('Checking achievements', { userId, ritualId });
  }

  /**
   * Private: Helper methods for statistics
   */
  private async getCurrentStreak(userId: string): Promise<number> {
    // Implement streak calculation
    return 0;
  }

  private async getLongestStreak(userId: string): Promise<number> {
    // Implement longest streak calculation
    return 0;
  }

  private async getTotalPoints(userId: string): Promise<number> {
    try {
      const statsDoc = await getDoc(doc(db, this.statsCollection, userId));
      return statsDoc.exists() ? statsDoc.data().totalPoints || 0 : 0;
    } catch {
      return 0;
    }
  }

  private calculateAverageRating(participations: ParticipationRecord[]): number {
    const ratings = participations
      .filter(p => p.feedback?.rating)
      .map(p => p.feedback!.rating);
    
    if (ratings.length === 0) return 0;
    
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }

  private async getFavoriteRituals(userId: string): Promise<any[]> {
    // Implement favorite rituals calculation
    return [];
  }

  private async getUserAchievements(userId: string): Promise<any[]> {
    // Implement achievements retrieval
    return [];
  }

  private async getTopContributors(ritualId: string): Promise<any[]> {
    // Implement top contributors calculation
    return [];
  }

  private async getWeeklyTrends(ritualId: string): Promise<number[]> {
    // Implement weekly trends calculation
    return Array(7).fill(0);
  }

  private async getMonthlyTrends(ritualId: string): Promise<number[]> {
    // Implement monthly trends calculation
    return Array(30).fill(0);
  }
}

// Export singleton instance
export const ritualParticipationTracker = new RitualParticipationTracker();