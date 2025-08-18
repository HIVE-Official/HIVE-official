import React from 'react';
interface UnifiedHeaderProps {
    variant?: 'landing' | 'dashboard' | 'auth' | 'schools';
    showBackButton?: boolean;
    backHref?: string;
    rightAction?: React.ReactNode;
    className?: string;
}
export declare function UnifiedHeader({ variant, showBackButton, backHref, rightAction, className }: UnifiedHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function LandingPageHeader(): import("react/jsx-runtime").JSX.Element;
export declare function SchoolsPageHeader({ onComingSoonClick }: {
    onComingSoonClick?: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function AuthPageHeader(): import("react/jsx-runtime").JSX.Element;
export declare function DashboardPageHeader(): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=unified-header.d.ts.map