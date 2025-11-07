import * as React from "react";
export type Step = {
    id: string;
    label: string;
    description?: string;
};
export interface ProgressStepsProps extends React.HTMLAttributes<HTMLDivElement> {
    steps: Step[];
    currentIndex: number;
    onStepClick?: (index: number) => void;
    variant?: "stepper" | "segmented";
}
export declare function ProgressSteps({ steps, currentIndex, onStepClick, variant, className, ...props }: ProgressStepsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=progress-steps.d.ts.map