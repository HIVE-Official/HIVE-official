/**
 * @deprecated This file has been deprecated.
 *
 * DEPRECATION REASON:
 * This 20/50/30 three-zone adaptive layout does not match SPEC.md requirements.
 *
 * SPEC requires:
 * - 60/40 split (Chat Board + Universal Widgets Sidebar)
 * - Side panels that expand with hash URLs (#events, #members, #resources)
 * - Inline tools (📅📊📋📚) not separate views
 *
 * USE INSTEAD: space-layout.tsx
 *
 * This file is kept for reference only. Do not use in production.
 */
import * as React from "react";
import { SpacePost } from "../organisms/space-post-feed";
import { CalendarEvent } from "../organisms/events-calendar";
import type { SpaceData, SpaceActionHandler } from "../../types/space.types";
/**
 * Space Layout - Three-Zone Adaptive Architecture
 *
 * LEFT (20%): Quick Access Panel - Launcher-style navigation
 * CENTER (50%): Adaptive Canvas - Content area that transforms
 * RIGHT (30%): Ambient Context - Live presence and contextual info
 *
 * Key Principles:
 * - No rigid tabs - fluid context switching
 * - Tools are first-class (equal to Stream)
 * - Center adapts to focus (stream, tool, event, etc)
 * - Right sidebar shows ambient awareness (who's here, what's happening)
 * - Everything is contextual
 */
export type SpaceView = 'stream' | 'pinned' | 'tools' | 'events' | 'files' | 'members';
export interface SpaceTool {
    id: string;
    name: string;
    icon: string;
    description: string;
    usageCount: number;
}
export interface SpaceLayoutAdaptiveProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space data (canonical type) */
    space: SpaceData;
    /** Posts for stream view */
    posts?: SpacePost[];
    /** Pinned posts */
    pinnedPosts?: SpacePost[];
    /** Space tools (HiveLab) */
    tools?: SpaceTool[];
    /** Events */
    events?: CalendarEvent[];
    /** Files/Resources count */
    filesCount?: number;
    /** Members for presence */
    members?: Array<{
        userId: string;
        name: string;
        isOnline: boolean;
        avatar?: string;
    }>;
    /** Online members count */
    onlineCount?: number;
    /** Initial view */
    initialView?: SpaceView;
    /** Action handler */
    onAction?: SpaceActionHandler;
}
declare const SpaceLayoutAdaptive: React.ForwardRefExoticComponent<SpaceLayoutAdaptiveProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceLayoutAdaptive };
//# sourceMappingURL=space-layout-adaptive.deprecated.d.ts.map