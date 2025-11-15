export type VerifyLinkStatus = "loading" | "success-existing" | "success-new" | "expired" | "error";
export interface VerifyLinkStatusCardProps {
    status: VerifyLinkStatus;
    message?: string;
    onRetry?: () => void;
    onContinue?: () => void;
    onStartOver?: () => void;
}
export declare function VerifyLinkStatusCard({ status, message, onRetry, onContinue, onStartOver, }: VerifyLinkStatusCardProps): import("react/jsx-runtime").JSX.Element;
export default VerifyLinkStatusCard;
//# sourceMappingURL=VerifyLinkStatusCard.d.ts.map