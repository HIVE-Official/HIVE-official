import * as React from "react";
/**
 * Inline Tools Widget
 *
 * SPEC-compliant tools system:
 * - 📅 Event: Create space event (leaders only)
 * - 📊 Poll: Quick poll (all members)
 * - 📋 Task: Assign task (leaders only)
 * - 📚 Resource: Upload resource (members after 7 days)
 *
 * These are NOT separate views - they open inline creation forms.
 */
export interface InlineToolsWidgetProps {
    /** Is the current user a leader? */
    isLeader?: boolean;
    /** Is the current user a new member? (< 7 days) */
    isNewMember?: boolean;
    /** Tool click handlers */
    onCreateEvent?: () => void;
    onCreatePoll?: () => void;
    onCreateTask?: () => void;
    onUploadResource?: () => void;
}
export declare const InlineToolsWidget: React.ForwardRefExoticComponent<InlineToolsWidgetProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=inline-tools-widget.d.ts.map