import { z } from "zod";
/**
 * Top Strip Tile Types
 * Priority order: Ritual > Campus Unlock > Tool Reveal > Space Opening > Builder Call > Orientation Quest
 */
export declare enum TopStripTileType {
    ACTIVE_RITUAL = "active_ritual",// Priority 1: countdown ≤ 24h
    CAMPUS_UNLOCK = "campus_unlock",// Priority 2: 300 user threshold hit
    TOOL_REVEAL = "tool_reveal",// Priority 3: first usage of new tool
    SPACE_OPENING = "space_opening",// Priority 4: dorm/major spaces with posts/events
    BUILDER_CALL = "builder_call",// Priority 5: platform needs Builder help
    ORIENTATION_QUEST = "orientation_quest"
}
/**
 * Base tile interface
 */
export interface BaseTopStripTile {
    id: string;
    type: TopStripTileType;
    priority: number;
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
        countdown: Date;
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
        threshold: number;
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
        firstUsedBy: string;
        firstUsedIn: string;
        batchId: string;
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
export type TopStripTile = ActiveRitualTile | CampusUnlockTile | ToolRevealTile | SpaceOpeningTile | BuilderCallTile | OrientationQuestTile;
/**
 * Top Strip configuration and display logic
 */
export declare class TopStripEngine {
    private static readonly DISPLAY_LIMIT;
    private static readonly PRIORITY_ORDER;
    /**
     * Sort tiles by priority and return top N for display
     */
    static sortAndLimitTiles(tiles: TopStripTile[]): TopStripTile[];
    /**
     * Check if a tile should override others based on urgency
     */
    static shouldOverride(newTile: TopStripTile, existingTiles: TopStripTile[]): boolean;
    /**
     * Create a tile with proper priority and expiration
     */
    static createTile(type: TopStripTileType, data: Partial<TopStripTile>, customExpiration?: Date): Partial<TopStripTile>;
}
/**
 * Zod schemas for validation
 */
export declare const TopStripTileSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<TopStripTileType.ACTIVE_RITUAL>;
    id: z.ZodString;
    priority: z.ZodNumber;
    expiresAt: z.ZodDate;
    createdAt: z.ZodDate;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    ritual: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        countdown: z.ZodDate;
        participantCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        description: string;
        countdown: Date;
        participantCount: number;
    }, {
        id: string;
        name: string;
        description: string;
        countdown: Date;
        participantCount: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type: TopStripTileType.ACTIVE_RITUAL;
    id: string;
    createdAt: Date;
    metadata: Record<string, unknown>;
    expiresAt: Date;
    ritual: {
        id: string;
        name: string;
        description: string;
        countdown: Date;
        participantCount: number;
    };
    priority: number;
}, {
    type: TopStripTileType.ACTIVE_RITUAL;
    id: string;
    createdAt: Date;
    metadata: Record<string, unknown>;
    expiresAt: Date;
    ritual: {
        id: string;
        name: string;
        description: string;
        countdown: Date;
        participantCount: number;
    };
    priority: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<TopStripTileType.CAMPUS_UNLOCK>;
    id: z.ZodString;
    priority: z.ZodNumber;
    expiresAt: z.ZodDate;
    createdAt: z.ZodDate;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    campus: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        memberCount: z.ZodNumber;
        threshold: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        memberCount: number;
        threshold: number;
    }, {
        id: string;
        name: string;
        memberCount: number;
        threshold: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type: TopStripTileType.CAMPUS_UNLOCK;
    id: string;
    createdAt: Date;
    metadata: Record<string, unknown>;
    expiresAt: Date;
    priority: number;
    campus: {
        id: string;
        name: string;
        memberCount: number;
        threshold: number;
    };
}, {
    type: TopStripTileType.CAMPUS_UNLOCK;
    id: string;
    createdAt: Date;
    metadata: Record<string, unknown>;
    expiresAt: Date;
    priority: number;
    campus: {
        id: string;
        name: string;
        memberCount: number;
        threshold: number;
    };
}>]>;
//# sourceMappingURL=top-strip.d.ts.map