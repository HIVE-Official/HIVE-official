import type { ReactNode } from "react";
export type AuthOnboardingLayoutMode = "calm" | "warm" | "celebrate";
export interface AuthOnboardingLayoutProps {
    children: ReactNode;
    headerSlot?: ReactNode;
    footerSlot?: ReactNode;
    mode?: AuthOnboardingLayoutMode;
    className?: string;
}
/**
 * Chrome-free layout used by authentication + onboarding flows.
 * Renders a three-row grid with safe-area padding and supports emotion modes.
 */
export declare function AuthOnboardingLayout({ children, headerSlot, footerSlot, mode, className, }: AuthOnboardingLayoutProps): import("react/jsx-runtime").JSX.Element;
export default AuthOnboardingLayout;
//# sourceMappingURL=auth-onboarding-layout.d.ts.map