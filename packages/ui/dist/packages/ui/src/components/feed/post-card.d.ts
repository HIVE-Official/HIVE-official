import React from "react";
import type { Post } from "@hive/core";
interface PostCardProps {
    post: Post & {
        author: {
            id: string;
            fullName: string;
            handle: string;
            photoURL?: string;
            role?: "member" | "builder" | "admin";
        };
    };
    currentUser: {
        id: string;
        role?: "member" | "builder" | "admin";
    };
    onReact: (postId: string, reaction: "heart", action: "add" | "remove") => Promise<void>;
    onEdit?: (postId: string) => void;
    onDelete: (postId: string) => Promise<void>;
    onPin?: (postId: string, pin: boolean) => Promise<void>;
    onFlag?: (postId: string, reason?: string) => Promise<void>;
    className?: string;
}
export declare const PostCard: React.FC<PostCardProps>;
export {};
//# sourceMappingURL=post-card.d.ts.map