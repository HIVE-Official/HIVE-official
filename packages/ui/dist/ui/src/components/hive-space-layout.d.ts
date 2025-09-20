import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
import { type PinnedContent, type Post, type Event, type Tool, type ChatMessage, type Member } from './surfaces';
export type SurfaceType = 'pinned' | 'posts' | 'events' | 'tools' | 'chat' | 'members';
declare const surfaceConfig: {
    readonly pinned: {
        readonly label: "Pinned";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Intro blocks, links, banners";
        readonly defaultState: "visible";
        readonly color: "text-yellow-400";
        readonly order: 1;
    };
    readonly posts: {
        readonly label: "Posts";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Threads & quick polls";
        readonly defaultState: "hidden_until_tool";
        readonly color: "text-blue-400";
        readonly order: 2;
    };
    readonly events: {
        readonly label: "Events";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Calendar cards with RSVP";
        readonly defaultState: "hidden_until_tool";
        readonly color: "text-green-400";
        readonly order: 3;
    };
    readonly tools: {
        readonly label: "Tools Stack";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Running list of live Tools";
        readonly defaultState: "empty";
        readonly color: "text-purple-400";
        readonly order: 4;
    };
    readonly chat: {
        readonly label: "Chat";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Real-time thread";
        readonly defaultState: "locked_until_v0_1_1";
        readonly color: "text-orange-400";
        readonly order: 5;
    };
    readonly members: {
        readonly label: "Members";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Grid of joined profiles";
        readonly defaultState: "auto_generated";
        readonly color: "text-gray-400";
        readonly order: 6;
    };
};
declare const hiveSpaceLayoutVariants: (props?: {
    mode?: "builder" | "view" | "edit";
    layout?: "expanded" | "compact" | "standard";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceSurface {
    type: SurfaceType;
    visible: boolean;
    locked: boolean;
    hasContent: boolean;
    toolCount?: number;
    lastActivity?: Date;
    customTitle?: string;
}
export interface HiveSpaceLayoutProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveSpaceLayoutVariants> {
    space: Space;
    surfaces: SpaceSurface[];
    isBuilder?: boolean;
    canEdit?: boolean;
    onSurfaceToggle?: (surface: SurfaceType) => void;
    onSurfaceSettings?: (surface: SurfaceType) => void;
    onBuilderMode?: () => void;
    onSpaceSettings?: () => void;
    onBackToDirectory?: () => void;
    children?: React.ReactNode;
    renderPinnedSurface?: () => React.ReactNode;
    renderPostsSurface?: () => React.ReactNode;
    renderEventsSurface?: () => React.ReactNode;
    renderToolsSurface?: () => React.ReactNode;
    renderChatSurface?: () => React.ReactNode;
    renderMembersSurface?: () => React.ReactNode;
    pinnedContent?: PinnedContent[];
    posts?: Post[];
    events?: Event[];
    tools?: Tool[];
    messages?: ChatMessage[];
    members?: Member[];
    currentUserId?: string;
    chatIsLocked?: boolean;
    canCreateContent?: boolean;
    canModerate?: boolean;
    showBuilderHints?: boolean;
    builderOnboarding?: {
        step: number;
        total: number;
        checklist: Array<{
            completed: boolean;
            label: string;
        }>;
    };
}
export declare const HiveSpaceLayout: any, surfaces: any;
export { hiveSpaceLayoutVariants, surfaceConfig };
//# sourceMappingURL=hive-space-layout.d.ts.map