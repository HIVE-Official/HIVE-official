import React from 'react';
interface EmailGateProps {
    schoolName: string;
    schoolDomain: string;
    schoolId: string;
    onBack?: () => void;
    className?: string;
    onDevContinue?: () => void;
    onSuccess?: (email: string) => void;
    showTermsAndPrivacy?: boolean;
    backLinkHref?: string;
}
export declare const EmailGate: React.FC<EmailGateProps>;
export {};
//# sourceMappingURL=email-gate.d.ts.map