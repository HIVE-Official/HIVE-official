import * as React from "react";
import { SpacePost } from "../organisms/space-post-feed";
import { SpaceEvent } from "../organisms/space-events-panel";
import { SpaceResource } from "../organisms/space-resources-panel";
import { SpaceMemberPreview } from "../organisms/space-members-panel";
import type { SpaceData, SpaceActionHandler, ContextPanelState } from "../../types/space.types";
/**
 * Space Layout Template
 *
 * Demonstrates full composition architecture with:
 * - Canonical SpaceData type
 * - Single SpaceActionHandler for all events
 * - Controlled context panel state
 * - 60/40 responsive layout
 */
export interface SpaceLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
    /** Space data (canonical type) */
    space: SpaceData;
    /** Posts for main feed */
    posts?: SpacePost[];
    /** Hot threads (10+ replies) shown as tabs */
    hotThreads?: Array<{
        id: string;
        title: string;
        replyCount: number;
        posts: SpacePost[];
    }>;
    /** Events for sidebar */
    events?: SpaceEvent[];
    /** Resources for sidebar */
    resources?: SpaceResource[];
    /** Members for sidebar preview */
    members?: SpaceMemberPreview[];
    /** Context panel state (controlled) */
    contextPanel?: ContextPanelState;
    /** Context panel change handler */
    onContextPanelChange?: (state: ContextPanelState) => void;
    /** Loading states */
    isLoadingPosts?: boolean;
    isLoadingEvents?: boolean;
    isLoadingResources?: boolean;
    isLoadingMembers?: boolean;
    /** Has more posts to load */
    hasMorePosts?: boolean;
    /** Layout mode */
    layoutMode?: "sidebar" | "fullwidth";
    /** Action handler (aggregated - routes all actions) */
    onAction?: SpaceActionHandler;
    /** @deprecated Legacy handlers (for backward compatibility) */
    onCreatePost?: (content: string) => void;
    onPostClick?: (post: SpacePost) => void;
    onLikePost?: (postId: string) => void;
    onCommentPost?: (postId: string) => void;
    onSharePost?: (postId: string) => void;
    onLoadMore?: () => void;
    onEditDescription?: () => void;
    onEditRules?: () => void;
    onCreateEvent?: () => void;
    onEventClick?: (event: SpaceEvent) => void;
    onRSVP?: (eventId: string, attending: boolean) => void;
    onAddResource?: () => void;
    onResourceClick?: (resource: SpaceResource) => void;
    onInviteMembers?: () => void;
    onViewAllMembers?: () => void;
    onMemberClick?: (member: SpaceMemberPreview) => void;
}
declare const SpaceLayout: React.ForwardRefExoticComponent<SpaceLayoutProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceLayout };
//# sourceMappingURL=space-layout.d.ts.map