import { z } from "zod";

/**
 * Top Strip Tile Types
 * Priority order: Ritual > Campus Unlock > Tool Reveal > Space Opening > Builder Call > Orientation Quest
 */
export enum TopStripTileType {
  ACTIVE_RITUAL = "active_ritual", // Priority 1: countdown ≤ 24h
  CAMPUS_UNLOCK = "campus_unlock", // Priority 2: 300 user threshold hit
  TOOL_REVEAL = "tool_reveal", // Priority 3: first usage of new tool
  SPACE_OPENING = "space_opening", // Priority 4: dorm/major spaces with posts/events
  BUILDER_CALL = "builder_call", // Priority 5: platform needs Builder help
  ORIENTATION_QUEST = "orientation_quest", // Priority 6: new users first 7 days,
}

/**
 * Base tile interface
 */
export interface BaseTopStripTile {
  id: string;
  type: TopStripTileType;
  priority: number; // Lower number = higher priority
  expiresAt: Date;
  createdAt: Date;
  metadata: Record<string, unknown>;
}

/**
 * Active Ritual Tile - Must be topmost, temporal + system-triggered
 */
export interface ActiveRitualTile extends BaseTopStripTile {
  type: TopStripTileType.ACTIVE_RITUAL;
  ritual: {
    id: string;
    name: string;
    description: string;
    countdown: Date; // When ritual starts/ends
    participantCount: number;
  };
}

/**
 * Campus Unlock Banner - Tied to viral moments (300 threshold)
 */
export interface CampusUnlockTile extends BaseTopStripTile {
  type: TopStripTileType.CAMPUS_UNLOCK;
  campus: {
    id: string;
    name: string;
    memberCount: number;
    threshold: number; // 300
  };
}

/**
 * Tool Reveal - First usage of a new Tool from a batch
 */
export interface ToolRevealTile extends BaseTopStripTile {
  type: TopStripTileType.TOOL_REVEAL;
  tool: {
    id: string;
    name: string;
    description: string;
    firstUsedBy: string; // User ID
    firstUsedIn: string; // Space ID
    batchId: string; // Tool batch identifier
  };
}

/**
 * Space Opening - Only trigger when dorm/major spaces open with posts/events
 */
export interface SpaceOpeningTile extends BaseTopStripTile {
  type: TopStripTileType.SPACE_OPENING;
  space: {
    id: string;
    name: string;
    type: "residential" | "academic" | "student_org";
    memberCount: number;
    firstPostCount: number;
  };
}

/**
 * Builder Call - Platform-suggested "help needed" for dormant spaces
 */
export interface BuilderCallTile extends BaseTopStripTile {
  type: TopStripTileType.BUILDER_CALL;
  call: {
    spaceId: string;
    spaceName: string;
    callType: "claim_space" | "add_content" | "moderate" | "activate";
    urgencyLevel: "low" | "medium" | "high";
    estimatedTimeMinutes: number;
  };
}

/**
 * Orientation Quest - Only visible for new users in first 7 days
 */
export interface OrientationQuestTile extends BaseTopStripTile {
  type: TopStripTileType.ORIENTATION_QUEST;
  quest: {
    id: string;
    name: string;
    description: string;
    stepNumber: number;
    totalSteps: number;
    completedAt?: Date;
    rewardType?: string;
  };
}

/**
 * Union type for all tile types
 */
export type TopStripTile =
  | ActiveRitualTile
  | CampusUnlockTile
  | ToolRevealTile
  | SpaceOpeningTile
  | BuilderCallTile
  | OrientationQuestTile;

/**
 * Top Strip configuration and display logic
 */
export class TopStripEngine {
  private static readonly DISPLAY_LIMIT = 4; // Only show 2-4 tiles at once
  private static readonly PRIORITY_ORDER = [
    TopStripTileType.ACTIVE_RITUAL,
    TopStripTileType.CAMPUS_UNLOCK,
    TopStripTileType.TOOL_REVEAL,
    TopStripTileType.SPACE_OPENING,
    TopStripTileType.BUILDER_CALL,
    TopStripTileType.ORIENTATION_QUEST,
  ];

  /**
   * Sort tiles by priority and return top N for display
   */
  static sortAndLimitTiles(tiles: TopStripTile[]): TopStripTile[] {
    const now = new Date();

    // Filter out expired tiles
    const activeTiles = tiles.filter((tile: TopStripTile) => tile.expiresAt > now);

    // Sort by priority (type) then by creation time (newest first)
    const sortedTiles = activeTiles.sort((a, b) => {
      const aPriority = this.PRIORITY_ORDER.indexOf(a.type);
      const bPriority = this.PRIORITY_ORDER.indexOf(b.type);

      if (aPriority !== bPriority) {
        return aPriority - bPriority; // Lower index = higher priority
      }

      // Same priority, sort by creation time (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return sortedTiles.slice(0, this.DISPLAY_LIMIT);
  }

  /**
   * Check if a tile should override others based on urgency
   */
  static shouldOverride(
    newTile: TopStripTile,
    existingTiles: TopStripTile[]
  ): boolean {
    // Active rituals always override
    if (newTile.type === TopStripTileType.ACTIVE_RITUAL) {
      return true;
    }

    // Campus unlock overrides everything except rituals
    if (newTile.type === TopStripTileType.CAMPUS_UNLOCK) {
      return !existingTiles.some(
        (tile: TopStripTile) => tile.type === TopStripTileType.ACTIVE_RITUAL
      );
    }

    return false;
  }

  /**
   * Create a tile with proper priority and expiration
   */
  static createTile(
    type: TopStripTileType,
    data: Partial<TopStripTile>,
    customExpiration?: Date
  ): Partial<TopStripTile> {
    const now = new Date();
    const priority = this.PRIORITY_ORDER.indexOf(type);

    // Default expiration: 24 hours unless ritual is still active
    let expiresAt = customExpiration;
    if (!expiresAt) {
      if (type === TopStripTileType.ACTIVE_RITUAL) {
        // Ritual tiles expire when ritual ends
        expiresAt =
          (data as Partial<ActiveRitualTile>).ritual?.countdown ||
          new Date(now.getTime() + 24 * 60 * 60 * 1000);
      } else {
        expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
      }
    }

    return {
      ...data,
      type,
      priority,
      createdAt: now,
      expiresAt,
    };
  }
}

/**
 * Zod schemas for validation
 */
export const TopStripTileSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(TopStripTileType.ACTIVE_RITUAL),
    id: z.string(),
    priority: z.number(),
    expiresAt: z.date(),
    createdAt: z.date(),
    metadata: z.record(z.unknown()),
    ritual: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      countdown: z.date(),
      participantCount: z.number(),
    }),
  }),
  z.object({
    type: z.literal(TopStripTileType.CAMPUS_UNLOCK),
    id: z.string(),
    priority: z.number(),
    expiresAt: z.date(),
    createdAt: z.date(),
    metadata: z.record(z.unknown()),
    campus: z.object({
      id: z.string(),
      name: z.string(),
      memberCount: z.number(),
      threshold: z.number(),
    }),
  }),
  // Add other tile schemas as needed
]);
