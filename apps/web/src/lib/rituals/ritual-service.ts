/**
 * Simplified Ritual Service
 * Handles ritual CRUD operations and participation tracking
 */
import { db } from "@/lib/firebase";
import { dbAdmin } from "@/lib/firebase-admin";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  addDoc,
  updateDoc,
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";
export interface Ritual {
  id: string;
  name: string;
  description: string;
  spaceId?: string;
  frequency: "daily" | "weekly" | "biweekly" | "monthly";
  startDate: Date;
  endDate?: Date;
  time?: string;
  location?: string;
  maxParticipants?: number;
  currentParticipants: number;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: "active" | "upcoming" | "completed" | "cancelled";
  category: string;
  rewards?: {
    points: number;
    badges?: string[];
  };
}
export interface RitualParticipation {
  id: string;
  ritualId: string;
  userId: string;
  status: "joined" | "active" | "completed" | "dropped";
  progress: number;
  streakDays: number;
  lastActiveAt: Timestamp;
  joinedAt: Timestamp;
}
export class RitualService {
  /**
   * Get all rituals for a user's spaces
   */
  static async getUserRituals(userId: string): Promise<Ritual[]> {
    try {
      // Get user's spaces first
      const spacesQuery = query(
        collection(db, "spaces"),
        where("members", "array-contains", userId)
      );
      const spacesSnapshot = await getDocs(spacesQuery);
      const spaceIds = spacesSnapshot.docs.map(doc => doc.id);
      if (spaceIds.length === 0) return [];
      // Get rituals from those spaces
      const ritualsQuery = query(
        collection(db, "rituals"),
        where("spaceId", "in", spaceIds),
        where("status", "in", ["active", "upcoming"]),
        orderBy("startDate", "asc")
      );
      const ritualsSnapshot = await getDocs(ritualsQuery);
      return ritualsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Ritual));
    } catch (error) {
      return [];
    }
  }
  /**
   * Create a new ritual
   */
  static async createRitual(ritual: Omit<Ritual, "id" | "createdAt" | "updatedAt">): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "rituals"), {
        ...ritual,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        currentParticipants: 0
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Join a ritual
   */
  static async joinRitual(ritualId: string, userId: string): Promise<void> {
    try {
      // Check if already joined
      const participationQuery = query(
        collection(db, "ritualParticipations"),
        where("ritualId", "==", ritualId),
        where("userId", "==", userId)
      );
      const existing = await getDocs(participationQuery);
      if (!existing.empty) {
        throw new Error("Already joined this ritual");
      }
      // Create participation record
      await addDoc(collection(db, "ritualParticipations"), {
        ritualId,
        userId,
        status: "joined",
        progress: 0,
        streakDays: 0,
        joinedAt: serverTimestamp(),
        lastActiveAt: serverTimestamp()
      });
      // Update participant count
      const ritualRef = doc(db, "rituals", ritualId);
      const ritualDoc = await getDoc(ritualRef);
      if (ritualDoc.exists()) {
        await updateDoc(ritualRef, {
          currentParticipants: (ritualDoc.data().currentParticipants || 0) + 1,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      throw error;
    }
  }
  /**
   * Track ritual participation
   */
  static async trackParticipation(
    ritualId: string, 
    userId: string, 
    action: string
  ): Promise<void> {
    try {
      const participationQuery = query(
        collection(db, "ritualParticipations"),
        where("ritualId", "==", ritualId),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(participationQuery);
      if (snapshot.empty) {
        throw new Error("Not participating in this ritual");
      }
      const participationDoc = snapshot.docs[0];
      const data = participationDoc.data();
      // Update participation
      await updateDoc(doc(db, "ritualParticipations", participationDoc.id), {
        progress: Math.min(100, data.progress + 10),
        streakDays: data.streakDays + 1,
        lastActiveAt: serverTimestamp(),
        status: "active"
      });
      // Log the action
      await addDoc(collection(db, "ritualActions"), {
        ritualId,
        userId,
        action,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * Get ritual leaderboard
   */
  static async getLeaderboard(ritualId: string): Promise<any[]> {
    try {
      const participationQuery = query(
        collection(db, "ritualParticipations"),
        where("ritualId", "==", ritualId),
        orderBy("progress", "desc"),
        orderBy("streakDays", "desc")
      );
      const snapshot = await getDocs(participationQuery);
      return snapshot.docs.map((doc,_index) => ({
        rank: index + 1,
        userId: doc.data().userId,
        progress: doc.data().progress,
        streakDays: doc.data().streakDays
      }));
    } catch (error) {
      return [];
    }
  }
}