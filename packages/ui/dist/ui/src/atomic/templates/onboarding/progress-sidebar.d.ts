import React from 'react';
import type { StepConfig, StepId } from './types';
interface ProgressSidebarProps {
    steps: StepConfig[];
    currentStep: StepId;
}
export declare const ProgressSidebar: React.FC<ProgressSidebarProps>;
interface MobileProgressProps {
    stepTitle: string;
    stepCopy: string;
    fractionLabel: string;
    progressValue: number;
}
export declare const MobileProgressBadge: React.FC<MobileProgressProps>;
export {};
//# sourceMappingURL=progress-sidebar.d.ts.map