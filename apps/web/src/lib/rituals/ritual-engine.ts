/**
 * HIVE Ritual Engine
 * 
 * Manages campus-wide and space-specific rituals
 * Horizontal, non-intrusive experiences in the feed
 */

import { 
  collection, 
  doc,
  getDoc,
  getDocs,
  query, 
  where, 
  orderBy,
  updateDoc,
  arrayUnion,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Ritual {
  id: string;
  name: string;
  emoji: string;
  description: string;
  type: 'campus' | 'space' | 'personal';
  
  // Scheduling
  schedule: {
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    time?: string; // HH:MM format
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
    customSchedule?: string; // Cron expression for custom
  };
  
  // Display
  displayDuration: number; // Hours to show in feed
  priority: 'low' | 'medium' | 'high';
  color: string;
  
  // Participation
  participationType: 'quick' | 'detailed' | 'event';
  quickActions?: string[]; // e.g., ['☕', '📚', '🏃', '😴']
  requiresLocation?: boolean;
  requiresPhoto?: boolean;
  
  // Tracking
  createdBy: string;
  spaceId?: string;
  isActive: boolean;
  participantCount: number;
  lastTriggered?: Date;
  nextTrigger?: Date;
  
  // Examples of rituals
  examplePrompts?: string[];
  successMetrics?: {
    targetParticipation: number;
    streakBonus: boolean;
    communityGoal?: number;
  };
}

export interface RitualParticipation {
  id: string;
  ritualId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  
  participatedAt: Date;
  response?: string;
  emoji?: string;
  photoUrl?: string;
  location?: {
    name: string;
    coordinates?: { lat: number; lng: number };
  };
  
  streak: number;
  isAnonymous: boolean;
}

export interface RitualStrip {
  ritual: Ritual;
  isActive: boolean;
  timeRemaining: number; // Minutes
  participations: RitualParticipation[];
  userParticipation?: RitualParticipation;
  canParticipate: boolean;
}

// Predefined campus rituals
export const CAMPUS_RITUALS: Partial<Ritual>[] = [
  {
    name: 'Morning Energy Check',
    emoji: '☀️',
    description: 'How are you starting your day?',
    type: 'campus',
    schedule: { type: 'daily', time: '08:00' },
    displayDuration: 4,
    priority: 'medium',
    color: '#FFE255',
    participationType: 'quick',
    quickActions: ['☕ Caffeinated', '🏃 Energized', '😴 Still Waking Up', '📚 Ready to Learn'],
    examplePrompts: ['Share your morning vibe']
  },
  {
    name: 'Study Spot Share',
    emoji: '📍',
    description: 'Where are you studying right now?',
    type: 'campus',
    schedule: { type: 'daily', time: '14:00' },
    displayDuration: 3,
    priority: 'low',
    color: '#6B46C1',
    participationType: 'quick',
    requiresLocation: true,
    quickActions: ['📚 Library', '☕ Cafe', '🏠 Dorm', '🌳 Outside'],
    examplePrompts: ['Drop your study spot to help others find good locations']
  },
  {
    name: 'Weekend Plans',
    emoji: '🎉',
    description: 'What are you up to this weekend?',
    type: 'campus',
    schedule: { type: 'weekly', dayOfWeek: 5, time: '16:00' }, // Friday 4pm
    displayDuration: 24,
    priority: 'high',
    color: '#FF6B35',
    participationType: 'detailed',
    examplePrompts: ['Share your weekend plans', 'Looking for something to do?']
  },
  {
    name: 'Late Night Thoughts',
    emoji: '🌙',
    description: 'What\'s on your mind?',
    type: 'campus',
    schedule: { type: 'daily', time: '23:00' },
    displayDuration: 2,
    priority: 'low',
    color: '#374151',
    participationType: 'quick',
    quickActions: ['💭 Deep Thoughts', '📖 Studying Late', '🎮 Gaming', '💤 Can\'t Sleep'],
    examplePrompts: ['Share a late night thought']
  },
  {
    name: 'Food Run Rally',
    emoji: '🍕',
    description: 'Anyone want to grab food?',
    type: 'campus',
    schedule: { type: 'daily', time: '18:30' },
    displayDuration: 2,
    priority: 'high',
    color: '#FF6B35',
    participationType: 'event',
    requiresLocation: true,
    examplePrompts: ['Organizing a food run?', 'Join someone for dinner']
  }
];

export class RitualEngine {
  constructor(private userId: string, private userSpaces: string[]) {}

  /**
   * Get active rituals for the feed
   */
  async getActiveRituals(): Promise<RitualStrip[]> {
    const now = new Date();
    
    // Fetch campus rituals
    const campusRitualsQuery = query(
      collection(db, 'rituals'),
      where('type', '==', 'campus'),
      where('isActive', '==', true)
    );
    
    // Fetch space rituals
    const spaceRitualsQuery = query(
      collection(db, 'rituals'),
      where('type', '==', 'space'),
      where('spaceId', 'in', this.userSpaces),
      where('isActive', '==', true)
    );
    
    const [campusSnapshot, spaceSnapshot] = await Promise.all([
      getDocs(campusRitualsQuery),
      getDocs(spaceRitualsQuery)
    ]);
    
    const allRituals = [
      ...campusSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ritual)),
      ...spaceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ritual))
    ];
    
    // Filter to only currently active rituals
    const activeRituals = allRituals.filter(ritual => {
      if (!ritual.lastTriggered) return false;
      
      const triggeredAt = ritual.lastTriggered;
      const hoursElapsed = (now.getTime() - triggeredAt.getTime()) / (1000 * 60 * 60);
      
      return hoursElapsed <= ritual.displayDuration;
    });
    
    // Get participations for active rituals
    const ritualStrips = await Promise.all(
      activeRituals.map(async (ritual) => {
        const participations = await this.getRitualParticipations(ritual.id);
        const userParticipation = participations.find(p => p.userId === this.userId);
        
        const timeRemaining = this.calculateTimeRemaining(ritual);
        
        return {
          ritual,
          isActive: true,
          timeRemaining,
          participations: participations.slice(0, 20), // Show max 20 recent participations
          userParticipation,
          canParticipate: !userParticipation && timeRemaining > 0
        };
      })
    );
    
    // Sort by priority and time remaining
    ritualStrips.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.ritual.priority];
      const bPriority = priorityOrder[b.ritual.priority];
      
      if (aPriority !== bPriority) return bPriority - aPriority;
      return a.timeRemaining - b.timeRemaining; // Less time remaining comes first
    });
    
    return ritualStrips;
  }

  /**
   * Get participations for a ritual
   */
  private async getRitualParticipations(ritualId: string): Promise<RitualParticipation[]> {
    const participationsQuery = query(
      collection(db, 'rituals', ritualId, 'participations'),
      orderBy('participatedAt', 'desc')
    );
    
    const snapshot = await getDocs(participationsQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      participatedAt: doc.data().participatedAt?.toDate()
    } as RitualParticipation));
  }

  /**
   * Participate in a ritual
   */
  async participateInRitual(
    ritualId: string,
    participation: {
      response?: string;
      emoji?: string;
      photoUrl?: string;
      location?: { name: string; coordinates?: { lat: number; lng: number } };
      isAnonymous?: boolean;
    }
  ): Promise<void> {
    // Get user info
    const userDoc = await getDoc(doc(db, 'users', this.userId));
    const userData = userDoc.data();
    
    if (!userData) throw new Error('User not found');
    
    // Check for existing participation today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingQuery = query(
      collection(db, 'rituals', ritualId, 'participations'),
      where('userId', '==', this.userId),
      where('participatedAt', '>=', Timestamp.fromDate(today))
    );
    
    const existing = await getDocs(existingQuery);
    if (!existing.empty) {
      throw new Error('Already participated in this ritual today');
    }
    
    // Calculate streak
    const streak = await this.calculateStreak(ritualId);
    
    // Add participation
    const participationRef = doc(collection(db, 'rituals', ritualId, 'participations'));
    await updateDoc(participationRef, {
      ritualId,
      userId: this.userId,
      userName: participation.isAnonymous ? 'Anonymous' : userData.displayName,
      userAvatar: participation.isAnonymous ? null : userData.photoURL,
      participatedAt: Timestamp.now(),
      response: participation.response,
      emoji: participation.emoji,
      photoUrl: participation.photoUrl,
      location: participation.location,
      streak: streak + 1,
      isAnonymous: participation.isAnonymous || false
    });
    
    // Update ritual participant count
    const ritualRef = doc(db, 'rituals', ritualId);
    await updateDoc(ritualRef, {
      participantCount: arrayUnion(this.userId)
    });
    
    // Track activity
    await this.trackRitualActivity(ritualId, 'participated');
  }

  /**
   * Calculate user's streak for a ritual
   */
  private async calculateStreak(ritualId: string): Promise<number> {
    const participationsQuery = query(
      collection(db, 'rituals', ritualId, 'participations'),
      where('userId', '==', this.userId),
      orderBy('participatedAt', 'desc')
    );
    
    const snapshot = await getDocs(participationsQuery);
    if (snapshot.empty) return 0;
    
    let streak = 0;
    let lastDate: Date | null = null;
    
    snapshot.docs.forEach(doc => {
      const participatedAt = doc.data().participatedAt?.toDate();
      if (!participatedAt) return;
      
      if (!lastDate) {
        streak = 1;
        lastDate = participatedAt;
      } else {
        const dayDiff = Math.floor((lastDate.getTime() - participatedAt.getTime()) / (1000 * 60 * 60 * 24));
        if (dayDiff === 1) {
          streak++;
          lastDate = participatedAt;
        } else {
          return; // Break streak
        }
      }
    });
    
    return streak;
  }

  /**
   * Calculate time remaining for a ritual
   */
  private calculateTimeRemaining(ritual: Ritual): number {
    if (!ritual.lastTriggered) return 0;
    
    const now = new Date();
    const triggered = ritual.lastTriggered;
    const endTime = new Date(triggered.getTime() + (ritual.displayDuration * 60 * 60 * 1000));
    
    const remaining = endTime.getTime() - now.getTime();
    return Math.max(0, Math.floor(remaining / (1000 * 60))); // Return minutes
  }

  /**
   * Track ritual activity for analytics
   */
  private async trackRitualActivity(ritualId: string, action: string): Promise<void> {
    const activityRef = doc(collection(db, 'activityEvents'));
    await updateDoc(activityRef, {
      userId: this.userId,
      eventType: 'ritual_participation',
      ritualId,
      action,
      timestamp: Timestamp.now(),
      metadata: {
        userSpaces: this.userSpaces
      }
    });
  }

  /**
   * Dismiss a ritual strip
   */
  async dismissRitual(ritualId: string): Promise<void> {
    // Store dismissal in user preferences
    const userPrefsRef = doc(db, 'users', this.userId, 'preferences', 'rituals');
    await updateDoc(userPrefsRef, {
      [`dismissed.${ritualId}`]: Timestamp.now()
    });
    
    await this.trackRitualActivity(ritualId, 'dismissed');
  }

  /**
   * Check if it's time to trigger scheduled rituals
   * This would be called by a cron job or cloud function
   */
  static async triggerScheduledRituals(): Promise<void> {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentDay = now.getDay();
    const currentDate = now.getDate();
    
    const ritualsQuery = query(
      collection(db, 'rituals'),
      where('isActive', '==', true)
    );
    
    const snapshot = await getDocs(ritualsQuery);
    
    for (const doc of snapshot.docs) {
      const ritual = { id: doc.id, ...doc.data() } as Ritual;
      
      let shouldTrigger = false;
      
      switch (ritual.schedule.type) {
        case 'daily':
          if (ritual.schedule.time) {
            const [hour, minute] = ritual.schedule.time.split(':').map(Number);
            shouldTrigger = currentHour === hour && currentMinute === minute;
          }
          break;
          
        case 'weekly':
          if (ritual.schedule.dayOfWeek === currentDay && ritual.schedule.time) {
            const [hour, minute] = ritual.schedule.time.split(':').map(Number);
            shouldTrigger = currentHour === hour && currentMinute === minute;
          }
          break;
          
        case 'monthly':
          if (ritual.schedule.dayOfMonth === currentDate && ritual.schedule.time) {
            const [hour, minute] = ritual.schedule.time.split(':').map(Number);
            shouldTrigger = currentHour === hour && currentMinute === minute;
          }
          break;
      }
      
      if (shouldTrigger) {
        await updateDoc(doc.ref, {
          lastTriggered: Timestamp.now(),
          nextTrigger: this.calculateNextTrigger(ritual)
        });
      }
    }
  }

  /**
   * Calculate next trigger time for a ritual
   */
  private static calculateNextTrigger(ritual: Ritual): Timestamp {
    const now = new Date();
    const nextTrigger = new Date(now);
    
    switch (ritual.schedule.type) {
      case 'daily':
        nextTrigger.setDate(nextTrigger.getDate() + 1);
        if (ritual.schedule.time) {
          const [hour, minute] = ritual.schedule.time.split(':').map(Number);
          nextTrigger.setHours(hour, minute, 0, 0);
        }
        break;
        
      case 'weekly':
        nextTrigger.setDate(nextTrigger.getDate() + 7);
        if (ritual.schedule.time) {
          const [hour, minute] = ritual.schedule.time.split(':').map(Number);
          nextTrigger.setHours(hour, minute, 0, 0);
        }
        break;
        
      case 'monthly':
        nextTrigger.setMonth(nextTrigger.getMonth() + 1);
        if (ritual.schedule.dayOfMonth) {
          nextTrigger.setDate(ritual.schedule.dayOfMonth);
        }
        if (ritual.schedule.time) {
          const [hour, minute] = ritual.schedule.time.split(':').map(Number);
          nextTrigger.setHours(hour, minute, 0, 0);
        }
        break;
    }
    
    return Timestamp.fromDate(nextTrigger);
  }
}