import * as React from "react";
export interface RitualAction {
    id: string;
    name: string;
    description: string;
    type: "manual" | "upload" | "text" | "number";
    required?: boolean;
    placeholder?: string;
    reward?: string;
}
export interface RitualActionModalProps {
    /** Whether modal is open */
    open: boolean;
    /** Close handler */
    onClose: () => void;
    /** Action to complete */
    action: RitualAction;
    /** Ritual name (for context) */
    ritualName?: string;
    /** Completion handler */
    onComplete: (data: Record<string, any>) => void | Promise<void>;
    /** Loading state */
    isLoading?: boolean;
}
declare const RitualActionModal: React.ForwardRefExoticComponent<RitualActionModalProps & React.RefAttributes<HTMLDivElement>>;
export { RitualActionModal };
//# sourceMappingURL=ritual-action-modal.d.ts.map