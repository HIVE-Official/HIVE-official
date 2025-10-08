import * as React from "react";
export type ProfileRelationship = "own" | "connected" | "stranger";
export interface ProfileActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Relationship to the profile owner */
    relationship: ProfileRelationship;
    /** User's name (for share text) */
    userName: string;
    /** User's handle (for share URL) */
    userHandle: string;
    /** Back button label */
    backLabel?: string;
    /** Callbacks */
    onBack?: () => void;
    onEdit?: () => void;
    onMessage?: () => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onShare?: () => void;
    onSettings?: () => void;
    /** Loading states */
    isConnecting?: boolean;
    isDisconnecting?: boolean;
}
/**
 * Profile Action Bar
 *
 * Context-aware action bar that shows different buttons based on relationship:
 * - Own Profile: Back, Edit, Settings, Share
 * - Connected: Back, Message, Disconnect, Share
 * - Stranger: Back, Connect (primary), Share
 *
 * Design Pattern: Modal-first IA
 * - Actions trigger modals/sheets (not route changes)
 * - Back button preserves navigation context
 * - Primary action is visually prominent
 */
declare const ProfileActionBar: React.ForwardRefExoticComponent<ProfileActionBarProps & React.RefAttributes<HTMLDivElement>>;
export { ProfileActionBar };
//# sourceMappingURL=profile-action-bar.d.ts.map