export interface LoginLinkSentCardProps {
    email: string;
    canResend?: boolean;
    resendCountdownMs?: number;
    devMagicLink?: string | null;
    error?: string | null;
    isSubmitting?: boolean;
    onResend?: () => void;
    onUseDifferentEmail?: () => void;
}
export declare function LoginLinkSentCard({ email, canResend, resendCountdownMs, devMagicLink, error, isSubmitting, onResend, onUseDifferentEmail, }: LoginLinkSentCardProps): import("react/jsx-runtime").JSX.Element;
export default LoginLinkSentCard;
//# sourceMappingURL=LoginLinkSentCard.d.ts.map