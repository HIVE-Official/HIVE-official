import { z } from "zod";

// Represents a user's explicit action to follow another user or a space
export const FollowSchema = z.object({
    id: z.string(), // ID of the followed entity (user or space)
    type: z.enum(["user", "space"]),
    followedAt: z.any(), // Firestore Timestamp
});

// Represents a user's action to mute another user or a space from their feed
export const MuteSchema = z.object({
    id: z.string(), // ID of the muted entity (user or space)
    type: z.enum(["user", "space"]),
    mutedAt: z.any(), // Firestore Timestamp
});

// Represents a user's "like" on a specific piece of content
export const LikeSchema = z.object({
    userId: z.string(),
    likedAt: z.any(), // Firestore Timestamp
});

export const FeedCardSchema = z.object({
    id: z.string(),
    type: z.enum([
        "featured_spaces", 
        "tool_buzz", 
        "upcoming_event", 
        "app_news", 
        "new_content", 
        "builder_spotlight", 
        "campus_tip"
    ]),
    sourceId: z.string(), // The ID of the original document
    sourceType: z.string(), // e.g., 'event', 'post', 'tool'
    timestamp: z.any(), // Firestore Timestamp, for sorting
    expiresAt: z.any().optional(), // Firestore Timestamp, for TTL
    pinned: z.boolean().default(false),
    content: z.record(z.any()), // The actual data for the card, will vary by type
    interactionData: z.object({
        likes: z.number().default(0),
        comments: z.number().default(0),
    }).default({}),
});

export type Follow = z.infer<typeof FollowSchema>;
export type Mute = z.infer<typeof MuteSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type FeedCard = z.infer<typeof FeedCardSchema>; 
 