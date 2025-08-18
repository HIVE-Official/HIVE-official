import React from "react";
import type { Post } from "@hive/core";
interface FeedUser {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string;
    role?: "member" | "builder" | "admin";
}
interface FeedPost extends Post {
    author: FeedUser;
}
interface SpaceFeedProps {
    spaceId: string;
    currentUser: FeedUser;
    className?: string;
    posts?: FeedPost[];
}
export declare const SpaceFeed: React.FC<SpaceFeedProps>;
export {};
//# sourceMappingURL=space-feed.d.ts.map