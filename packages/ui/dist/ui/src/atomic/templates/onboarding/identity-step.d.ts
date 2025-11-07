import React from 'react';
import type { HandleStatus } from './types';
interface IdentityStepProps {
    firstName: string;
    lastName: string;
    fullName: string;
    handle: string;
    handleLocked: boolean;
    handleStatus: HandleStatus;
    onFirstNameChange: (value: string) => void;
    onLastNameChange: (value: string) => void;
    onHandleChange: (value: string) => void;
    onResetHandle: () => void;
}
export declare const IdentityStep: React.FC<IdentityStepProps>;
export {};
//# sourceMappingURL=identity-step.d.ts.map