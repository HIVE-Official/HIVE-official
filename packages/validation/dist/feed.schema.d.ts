import { z } from "zod";
export declare const FollowSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["user", "space"]>;
    followedAt: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "user" | "space";
    followedAt?: any;
}, {
    id: string;
    type: "user" | "space";
    followedAt?: any;
}>;
export declare const MuteSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["user", "space"]>;
    mutedAt: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "user" | "space";
    mutedAt?: any;
}, {
    id: string;
    type: "user" | "space";
    mutedAt?: any;
}>;
export declare const LikeSchema: z.ZodObject<{
    userId: z.ZodString;
    likedAt: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    userId: string;
    likedAt?: any;
}, {
    userId: string;
    likedAt?: any;
}>;
export declare const FeedCardSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["featured_spaces", "tool_buzz", "upcoming_event", "app_news", "new_content", "builder_spotlight", "campus_tip"]>;
    sourceId: z.ZodString;
    sourceType: z.ZodString;
    timestamp: z.ZodAny;
    expiresAt: z.ZodOptional<z.ZodAny>;
    pinned: z.ZodDefault<z.ZodBoolean>;
    content: z.ZodRecord<z.ZodString, z.ZodAny>;
    interactionData: z.ZodDefault<z.ZodObject<{
        likes: z.ZodDefault<z.ZodNumber>;
        comments: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        likes: number;
        comments: number;
    }, {
        likes?: number | undefined;
        comments?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "featured_spaces" | "tool_buzz" | "upcoming_event" | "app_news" | "new_content" | "builder_spotlight" | "campus_tip";
    sourceId: string;
    sourceType: string;
    pinned: boolean;
    content: Record<string, any>;
    interactionData: {
        likes: number;
        comments: number;
    };
    timestamp?: any;
    expiresAt?: any;
}, {
    id: string;
    type: "featured_spaces" | "tool_buzz" | "upcoming_event" | "app_news" | "new_content" | "builder_spotlight" | "campus_tip";
    sourceId: string;
    sourceType: string;
    content: Record<string, any>;
    timestamp?: any;
    expiresAt?: any;
    pinned?: boolean | undefined;
    interactionData?: {
        likes?: number | undefined;
        comments?: number | undefined;
    } | undefined;
}>;
export type Follow = z.infer<typeof FollowSchema>;
export type Mute = z.infer<typeof MuteSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type FeedCard = z.infer<typeof FeedCardSchema>;
//# sourceMappingURL=feed.schema.d.ts.map