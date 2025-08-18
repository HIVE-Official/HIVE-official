import React from 'react';
interface EmailVerificationProps {
    email: string;
    schoolName: string;
    onBack?: () => void;
    onResend?: () => Promise<void>;
    className?: string;
    expirationMinutes?: number;
}
export declare const EmailVerification: React.FC<EmailVerificationProps>;
export {};
//# sourceMappingURL=email-verification.d.ts.map