export type SpaceMembershipState = 'not_joined' | 'joined' | 'pending' | 'loading';
export interface SpaceHeaderSpace {
    /** Unique identifier */
    id?: string;
    /** Display name (required - drives monogram fallback) */
    name: string;
    /** Optional icon image */
    iconUrl?: string;
    /** Present but intentionally hidden in UI (available for a11y/use cases) */
    handle?: string;
    /** Present but intentionally hidden in UI */
    category?: string;
}
export interface SpaceHeaderProps {
    /** Core space metadata */
    space: SpaceHeaderSpace;
    /** Total member count */
    memberCount: number;
    /** Number of members currently online (optional) */
    onlineCount?: number;
    /** Membership state for the current user */
    membershipState: SpaceMembershipState;
    /** Whether the viewer is a leader (unlocks settings menu) */
    isLeader?: boolean;
    /** Force the compact/mobile layout */
    compact?: boolean;
    /** Trigger when the viewer wants to join the space */
    onJoin?: () => void;
    /** Trigger when the viewer wants to leave the space */
    onLeave?: () => void;
    /** Trigger for leader settings menu */
    onSettings?: () => void;
    /** Trigger share action */
    onShare?: () => void;
    /** Optional className passthrough */
    className?: string;
}
export declare function SpaceHeader({ space, memberCount, onlineCount, membershipState, isLeader, compact, onJoin, onLeave, onSettings, onShare, className, }: SpaceHeaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=space-header.d.ts.map