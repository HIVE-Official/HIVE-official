import { z } from "zod";
import {
  RitualSchema,
  RitualParticipationSchema,
  RitualRewardSchema,
  RitualConfigSchema,
  RitualAnalyticsSchema,
  RitualAnnouncementSchema,
  RitualTypeSchema,
  RitualStatusSchema,
  type Ritual,
  type RitualParticipation,
  type RitualReward,
  type RitualConfig,
  type RitualAnalytics,
  type RitualAnnouncement,
  type RitualType,
  type RitualStatus
} from "@hive/validation";

// Re-export validation schemas
export {
  RitualSchema,
  RitualParticipationSchema,
  RitualRewardSchema,
  RitualConfigSchema,
  RitualAnalyticsSchema,
  RitualAnnouncementSchema,
  RitualTypeSchema,
  RitualStatusSchema,
  type Ritual,
  type RitualParticipation,
  type RitualReward,
  type RitualConfig,
  type RitualAnalytics,
  type RitualAnnouncement,
  type RitualType,
  type RitualStatus
};

// Firestore-specific helpers
export const RitualConverter = {
  toFirestore: (ritual: Ritual) => ({
    ...ritual,
    scheduledStart: ritual.scheduledStart,
    scheduledEnd: ritual.scheduledEnd,
    actualStart: ritual.actualStart,
    actualEnd: ritual.actualEnd,
    createdAt: ritual.createdAt,
    updatedAt: ritual.updatedAt
  }),
  
  fromFirestore: (data: any): Ritual => {
    return RitualSchema.parse({
      ...data,
      scheduledStart: data.scheduledStart?.toDate?.() || data.scheduledStart,
      scheduledEnd: data.scheduledEnd?.toDate?.() || data.scheduledEnd,
      actualStart: data.actualStart?.toDate?.() || data.actualStart,
      actualEnd: data.actualEnd?.toDate?.() || data.actualEnd,
      createdAt: data.createdAt?.toDate?.() || data.createdAt,
      updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
    });
  }
};

export const RitualParticipationConverter = {
  toFirestore: (participation: RitualParticipation) => ({
    ...participation,
    completedAt: participation.completedAt,
    featuredAt: participation.featuredAt,
    createdAt: participation.createdAt
  }),
  
  fromFirestore: (data: any): RitualParticipation => {
    return RitualParticipationSchema.parse({
      ...data,
      completedAt: data.completedAt?.toDate?.() || data.completedAt,
      featuredAt: data.featuredAt?.toDate?.() || data.featuredAt,
      createdAt: data.createdAt?.toDate?.() || data.createdAt
    });
  }
};

// Collection paths
export const RITUAL_COLLECTIONS = {
  RITUALS: 'rituals',
  PARTICIPATION: (ritualId: string) => `rituals/${ritualId}/participants`,
  ANALYTICS: (ritualId: string) => `rituals/${ritualId}/analytics`,
  ANNOUNCEMENTS: 'ritual_announcements'
} as const;

// Ritual utility functions
export const RitualUtils = {
  isActive: (ritual: Ritual): boolean => {
    const now = new Date();
    return ritual.status === 'active' && 
           ritual.scheduledStart <= now && 
           ritual.scheduledEnd >= now;
  },
  
  canParticipate: (ritual: Ritual, userId: string): boolean => {
    if (!RitualUtils.isActive(ritual)) return false;
    if (ritual.config.maxParticipants && ritual.totalParticipants >= ritual.config.maxParticipants) return false;
    // Add more participation rules as needed
    return true;
  },
  
  calculateProgress: (ritual: Ritual): number => {
    if (ritual.totalParticipants === 0) return 0;
    return (ritual.completedParticipants / ritual.totalParticipants) * 100;
  },
  
  getTimeRemaining: (ritual: Ritual): number => {
    const now = new Date();
    return Math.max(0, ritual.scheduledEnd.getTime() - now.getTime());
  }
};