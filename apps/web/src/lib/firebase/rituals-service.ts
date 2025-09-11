import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase-client';

// Ritual interfaces
export interface Ritual {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  type: 'daily' | 'weekly' | 'seasonal' | 'achievement' | 'community';
  category: 'academic' | 'social' | 'wellness' | 'creative';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'archived';
  startTime: Timestamp;
  endTime?: Timestamp;
  recurrence?: {
    pattern: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[];
    timeOfDay?: string;
  };
  participationType: 'individual' | 'collaborative' | 'competitive';
  requirements: {
    minParticipants?: number;
    maxParticipants?: number;
    prerequisites?: string[];
  };
  actions: Array<{
    id: string;
    type: string;
    description: string;
    points: number;
    required: boolean;
  }>;
  milestones: Array<{
    threshold: number;
    reward: string;
    unlocks?: string[];
  }>;
  stats: {
    totalParticipants: number;
    activeParticipants: number;
    completionRate: number;
    averageProgress: number;
  };
  schoolId: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RitualParticipation {
  id: string;
  ritualId: string;
  userId: string;
  status: 'registered' | 'active' | 'paused' | 'completed' | 'dropped';
  progress: number;
  currentStreak: number;
  longestStreak: number;
  completedActions: string[];
  earnedRewards: string[];
  unlockedMilestones: number[];
  lastActivityAt: Timestamp;
  totalTimeSpent: number;
  joinedAt: Timestamp;
  completedAt?: Timestamp;
  droppedAt?: Timestamp;
}

class RitualsService {
  // Get active rituals
  async getActiveRituals(schoolId: string = 'ub-buffalo'): Promise<Ritual[]> {
    try {
      const q = query(
        collection(db, 'rituals'),
        where('schoolId', '==', schoolId),
        where('status', '==', 'active'),
        orderBy('stats.activeParticipants', 'desc'),
        limit(10)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Ritual));
    } catch (error) {
      console.error('Error fetching active rituals:', error);
      return [];
    }
  }

  // Get user's ritual participation
  async getUserRituals(userId: string): Promise<RitualParticipation[]> {
    try {
      const q = query(
        collection(db, 'ritualParticipation'),
        where('userId', '==', userId),
        where('status', 'in', ['active', 'registered'])
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as RitualParticipation));
    } catch (error) {
      console.error('Error fetching user rituals:', error);
      return [];
    }
  }

  // Join a ritual
  async joinRitual(ritualId: string, userId: string): Promise<string> {
    try {
      const participationId = `${ritualId}_${userId}`;
      
      const participation = {
        ritualId,
        userId,
        status: 'registered',
        progress: 0,
        currentStreak: 0,
        longestStreak: 0,
        completedActions: [],
        earnedRewards: [],
        unlockedMilestones: [],
        lastActivityAt: serverTimestamp(),
        totalTimeSpent: 0,
        joinedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'ritualParticipation'), participation);
      
      // Update ritual stats
      await updateDoc(doc(db, 'rituals', ritualId), {
        'stats.totalParticipants': increment(1)
      });
      
      return participationId;
    } catch (error) {
      console.error('Error joining ritual:', error);
      throw error;
    }
  }

  // Update ritual progress
  async updateProgress(
    participationId: string, 
    progress: number,
    completedActionId?: string
  ): Promise<void> {
    try {
      const updates: any = {
        progress,
        lastActivityAt: serverTimestamp()
      };
      
      if (completedActionId) {
        // This would need arrayUnion import
        updates.completedActions = [completedActionId];
      }
      
      if (progress >= 100) {
        updates.status = 'completed';
        updates.completedAt = serverTimestamp();
      }
      
      await updateDoc(
        doc(db, 'ritualParticipation', participationId),
        updates
      );
    } catch (error) {
      console.error('Error updating ritual progress:', error);
      throw error;
    }
  }

  // Subscribe to ritual updates
  subscribeToRitual(
    ritualId: string,
    callback: (ritual: Ritual) => void
  ): () => void {
    const unsubscribe = onSnapshot(
      doc(db, 'rituals', ritualId),
      (snapshot: any) => {
        if (snapshot.exists()) {
          callback({
            id: snapshot.id,
            ...snapshot.data()
          } as Ritual);
        }
      },
      (error: any) => {
        console.error('Error in ritual subscription:', error);
      }
    );
    
    return unsubscribe;
  }

  // Get trending rituals
  async getTrendingRituals(limit: number = 5): Promise<Ritual[]> {
    try {
      const q = query(
        collection(db, 'rituals'),
        where('status', '==', 'active'),
        orderBy('stats.activeParticipants', 'desc'),
        orderBy('stats.completionRate', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.slice(0, limit).map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Ritual));
    } catch (error) {
      console.error('Error fetching trending rituals:', error);
      return [];
    }
  }

  // Create a new ritual (for admins/builders)
  async createRitual(ritualData: Partial<Ritual>): Promise<string> {
    try {
      const ritual = {
        ...ritualData,
        status: 'draft',
        stats: {
          totalParticipants: 0,
          activeParticipants: 0,
          completionRate: 0,
          averageProgress: 0
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'rituals'), ritual);
      return docRef.id;
    } catch (error) {
      console.error('Error creating ritual:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const ritualsService = new RitualsService();