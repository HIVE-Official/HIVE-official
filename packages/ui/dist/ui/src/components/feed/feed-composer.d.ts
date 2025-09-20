import React from "react";
import type { CreatePost } from "@hive/core";
interface FeedComposerProps {
    spaceId: string;
    currentUser: {
        id: string;
        fullName: string;
        handle: string;
        photoURL?: string;
    };
    onPostCreated: (post: CreatePost) => void;
    className?: string;
}
export declare const FeedComposer: React.FC<FeedComposerProps>;
export {};
//# sourceMappingURL=feed-composer.d.ts.map