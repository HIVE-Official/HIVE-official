"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button, HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from "../../atoms";
export function VerifyLinkStatusCard({ status, message, onRetry, onContinue, onStartOver, }) {
    const renderIcon = () => {
        switch (status) {
            case "loading":
                return _jsx(Loader2, { className: "h-8 w-8 animate-spin text-[var(--hive-brand-primary)]" });
            case "success-existing":
            case "success-new":
                return _jsx(CheckCircle2, { className: "h-8 w-8 text-[var(--hive-brand-primary)]" });
            case "expired":
            case "error":
                return _jsx(AlertTriangle, { className: "h-8 w-8 text-[var(--hive-status-error)]" });
        }
    };
    const renderActions = () => {
        if (status === "loading") {
            return null;
        }
        if (status === "success-existing" && onContinue) {
            return (_jsx(Button, { className: "w-full", onClick: onContinue, children: "Go to your feed" }));
        }
        if (status === "success-new" && onContinue) {
            return (_jsx(Button, { className: "w-full", onClick: onContinue, children: "Finish onboarding" }));
        }
        if (status === "expired" || status === "error") {
            return (_jsxs("div", { className: "space-y-2", children: [onRetry && (_jsx(Button, { className: "w-full", onClick: onRetry, children: "Send a new magic link" })), onStartOver && (_jsx(Button, { variant: "ghost", className: "w-full", onClick: onStartOver, children: "Start over" }))] }));
        }
        return null;
    };
    const getTitle = () => {
        switch (status) {
            case "loading":
                return "Verifying your access";
            case "success-existing":
                return "Welcome back";
            case "success-new":
                return "You're in!";
            case "expired":
                return "Link expired";
            case "error":
                return "Verification failed";
        }
    };
    return (_jsxs(HiveCard, { children: [_jsxs(HiveCardHeader, { className: "text-center", children: [_jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--hive-background-elevated)]", children: renderIcon() }), _jsx(HiveCardTitle, { children: getTitle() })] }), _jsxs(HiveCardContent, { className: "space-y-4 text-center", children: [_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: message ?? defaultMessageForStatus(status) }), renderActions()] })] }));
}
function defaultMessageForStatus(status) {
    switch (status) {
        case "loading":
            return "Please wait while we verify your magic link.";
        case "success-existing":
            return "Your session is ready. Taking you to your digital campus.";
        case "success-new":
            return "You're verified! Let's finish setting up your profile.";
        case "expired":
            return "This magic link has expired. Request another to continue.";
        case "error":
            return "We couldn't verify the link. Please try again or start over.";
    }
}
export default VerifyLinkStatusCard;
//# sourceMappingURL=VerifyLinkStatusCard.js.map