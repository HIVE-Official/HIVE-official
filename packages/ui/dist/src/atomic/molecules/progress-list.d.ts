import * as React from "react";
export type ProgressStepState = "done" | "active" | "blocked" | "upcoming";
export interface ProgressStep {
    id: string;
    label: string;
    description?: string;
    state?: ProgressStepState;
}
export interface ProgressListProps extends React.HTMLAttributes<HTMLUListElement> {
    steps: ProgressStep[];
    compact?: boolean;
}
/** Vertical step list with accessible current state semantics */
export declare function ProgressList({ steps, compact, className, ...props }: ProgressListProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=progress-list.d.ts.map