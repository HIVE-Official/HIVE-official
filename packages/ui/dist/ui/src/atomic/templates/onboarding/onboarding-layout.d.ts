import { type ReactNode } from "react";
export interface HiveOnboardingLayoutProps {
    step: number;
    totalSteps: number;
    title: string;
    description?: string;
    children: ReactNode;
    sidebar?: ReactNode;
    onBack?: () => void;
    onContinue?: () => void;
    canContinue?: boolean;
    continueLabel?: string;
    backLabel?: string;
    isProcessing?: boolean;
    className?: string;
}
export declare function HiveOnboardingLayout({ step, totalSteps, title, description, children, sidebar, onBack, onContinue, canContinue, continueLabel, backLabel, isProcessing, className, }: HiveOnboardingLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=onboarding-layout.d.ts.map