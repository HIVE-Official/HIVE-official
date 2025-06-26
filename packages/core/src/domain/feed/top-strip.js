import { z } from "zod";
/**
 * Top Strip Tile Types
 * Priority order: Ritual > Campus Unlock > Tool Reveal > Space Opening > Builder Call > Orientation Quest
 */
export var TopStripTileType;
(function (TopStripTileType) {
    TopStripTileType["ACTIVE_RITUAL"] = "active_ritual";
    TopStripTileType["CAMPUS_UNLOCK"] = "campus_unlock";
    TopStripTileType["TOOL_REVEAL"] = "tool_reveal";
    TopStripTileType["SPACE_OPENING"] = "space_opening";
    TopStripTileType["BUILDER_CALL"] = "builder_call";
    TopStripTileType["ORIENTATION_QUEST"] = "orientation_quest";
})(TopStripTileType || (TopStripTileType = {}));
/**
 * Top Strip configuration and display logic
 */
export class TopStripEngine {
    /**
     * Sort tiles by priority and return top N for display
     */
    static sortAndLimitTiles(tiles) {
        const now = new Date();
        // Filter out expired tiles
        const activeTiles = tiles.filter((tile) => tile.expiresAt > now);
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
    static shouldOverride(newTile, existingTiles) {
        // Active rituals always override
        if (newTile.type === TopStripTileType.ACTIVE_RITUAL) {
            return true;
        }
        // Campus unlock overrides everything except rituals
        if (newTile.type === TopStripTileType.CAMPUS_UNLOCK) {
            return !existingTiles.some((tile) => tile.type === TopStripTileType.ACTIVE_RITUAL);
        }
        return false;
    }
    /**
     * Create a tile with proper priority and expiration
     */
    static createTile(type, data, customExpiration) {
        const now = new Date();
        const priority = this.PRIORITY_ORDER.indexOf(type);
        // Default expiration: 24 hours unless ritual is still active
        let expiresAt = customExpiration;
        if (!expiresAt) {
            if (type === TopStripTileType.ACTIVE_RITUAL) {
                // Ritual tiles expire when ritual ends
                expiresAt =
                    data.ritual?.countdown ||
                        new Date(now.getTime() + 24 * 60 * 60 * 1000);
            }
            else {
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
TopStripEngine.DISPLAY_LIMIT = 4; // Only show 2-4 tiles at once
TopStripEngine.PRIORITY_ORDER = [
    TopStripTileType.ACTIVE_RITUAL,
    TopStripTileType.CAMPUS_UNLOCK,
    TopStripTileType.TOOL_REVEAL,
    TopStripTileType.SPACE_OPENING,
    TopStripTileType.BUILDER_CALL,
    TopStripTileType.ORIENTATION_QUEST,
];
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
//# sourceMappingURL=top-strip.js.map