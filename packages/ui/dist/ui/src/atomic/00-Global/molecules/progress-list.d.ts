import * as React from "react";
export type ProgressListState = "upcoming" | "active" | "done" | "blocked";
export interface ProgressListStep {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    state?: ProgressListState;
}
export interface ProgressListProps extends React.HTMLAttributes<HTMLUListElement> {
    steps: ProgressListStep[];
    compact?: boolean;
}
export declare const ProgressList: React.ForwardRefExoticComponent<ProgressListProps & React.RefAttributes<HTMLUListElement>>;
//# sourceMappingURL=progress-list.d.ts.map