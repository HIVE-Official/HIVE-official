// Bounded Context Owner: Rituals Guild
// Defines core types for Rituals across the platform.

export type RitualCadence = "daily" | "weekly";

export interface RitualParticipant {
  readonly profileId: string;
  readonly joinedAt: Date;
}

export interface RitualSchedule {
  readonly cadence: RitualCadence;
  // 24h time, local to campus or viewer, e.g. "07:30"
  readonly timeOfDay: string;
  // For weekly cadence, days of week as numbers 0-6 (Sun-Sat)
  readonly daysOfWeek?: readonly number[];
}

export interface RitualSnapshot {
  readonly id: string;
  readonly campusId: string;
  readonly spaceId?: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description: string;
  readonly schedule: RitualSchedule;
  readonly participants: readonly RitualParticipant[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

