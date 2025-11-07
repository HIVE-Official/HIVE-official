"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../../lib/utils.js";
/**
 * Chrome-free layout used by authentication + onboarding flows.
 * Renders a three-row grid with safe-area padding and supports emotion modes.
 */
export function AuthOnboardingLayout({ children, headerSlot, footerSlot, mode = "calm", className, }) {
    return (_jsxs("main", { "data-mode": mode, className: cn("min-h-dvh bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]", "grid grid-rows-[auto,1fr,auto]", "pt-[max(env(safe-area-inset-top),24px)] pb-[max(env(safe-area-inset-bottom),24px)]", className), children: [_jsx("div", { className: "mx-auto w-full max-w-[560px] px-4", children: headerSlot }), _jsx("div", { className: "mx-auto flex w-full max-w-[560px] px-4", children: children }), _jsx("div", { className: "mx-auto w-full max-w-[560px] px-4 text-[var(--hive-text-muted)]", children: footerSlot })] }));
}
export default AuthOnboardingLayout;
//# sourceMappingURL=auth-onboarding-layout.js.map