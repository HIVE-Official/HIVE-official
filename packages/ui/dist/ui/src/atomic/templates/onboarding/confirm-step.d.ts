import React from 'react';
import type { OnboardingState } from './types';
interface ConfirmStepProps {
    state: OnboardingState;
    academicLabel?: string;
    livingLabel?: string;
    consentError: boolean;
    onConsentChange: (field: 'hasConsented' | 'acceptedPrivacy' | 'acceptedGuidelines', value: boolean) => void;
}
export declare const ConfirmStep: React.FC<ConfirmStepProps>;
export {};
//# sourceMappingURL=confirm-step.d.ts.map