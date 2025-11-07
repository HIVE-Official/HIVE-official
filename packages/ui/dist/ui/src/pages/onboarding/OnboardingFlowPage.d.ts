export interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    status: "complete" | "current" | "upcoming";
}
export interface OnboardingFlowPageProps {
    campusName?: string;
    steps?: OnboardingStep[];
    interests?: string[];
    selectedInterests?: string[];
    onSelectInterest?: (interest: string) => void;
}
export declare function OnboardingFlowPage({ campusName, steps, interests, selectedInterests, onSelectInterest, }: OnboardingFlowPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=OnboardingFlowPage.d.ts.map