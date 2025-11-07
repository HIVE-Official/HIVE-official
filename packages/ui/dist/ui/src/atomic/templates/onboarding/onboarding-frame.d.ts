import type { ReactNode } from "react";
export interface OnboardingFrameProps {
    step: number;
    totalSteps: number;
    title: string;
    description?: string;
    children: ReactNode;
    mode?: "calm" | "warm" | "celebrate";
    onBack?: () => void;
    onContinue?: () => void;
    continueLabel?: string;
    continueDisabled?: boolean;
    isSubmitting?: boolean;
    saveExitSlot?: ReactNode;
    className?: string;
}
export declare function OnboardingFrame({ step, totalSteps, title, description, children, mode, onBack, onContinue, continueLabel, continueDisabled, isSubmitting, saveExitSlot, className, }: OnboardingFrameProps): import("react/jsx-runtime").JSX.Element;
export default OnboardingFrame;
//# sourceMappingURL=onboarding-frame.d.ts.map