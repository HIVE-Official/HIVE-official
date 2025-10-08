import * as React from "react";
export interface ProgressChecklistItem {
    id: string;
    label: string;
    description?: string;
    completed: boolean;
    weight: number;
    actionLabel?: string;
    onAction?: () => void;
}
export interface ProgressChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Title for the checklist (e.g., "Profile Completion", "Onboarding Progress") */
    title?: string;
    /** Description text */
    description?: string;
    /** Array of completion items */
    items: ProgressChecklistItem[];
    /** Current completion percentage (calculated automatically if not provided) */
    percentage?: number;
    /** Target percentage for "success" state (default: 100) */
    targetPercentage?: number;
    /** Text to show when target is reached */
    targetReachedLabel?: string;
    /** Text to show when target is not reached */
    targetNotReachedLabel?: string;
    /** Variant */
    variant?: "default" | "compact";
    /** Show incomplete items only */
    showIncompleteOnly?: boolean;
}
declare const ProgressChecklist: React.ForwardRefExoticComponent<ProgressChecklistProps & React.RefAttributes<HTMLDivElement>>;
export { ProgressChecklist };
//# sourceMappingURL=progress-checklist.d.ts.map