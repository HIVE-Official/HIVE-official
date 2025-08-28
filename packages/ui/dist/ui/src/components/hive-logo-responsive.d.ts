import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const responsiveVariants: (props?: {
    breakpoint?: "mobile" | "desktop" | "tablet" | "wide";
    layout?: "icon" | "horizontal" | "vertical";
    theme?: "auto" | "gold" | "dark" | "light" | "brand";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveResponsiveProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'>, VariantProps<typeof responsiveVariants> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    showWordmark?: boolean;
    adaptToContext?: boolean;
    theme?: 'light' | 'dark' | 'auto' | 'gold' | 'brand';
    userPreferences?: {
        reducedMotion?: boolean;
        highContrast?: boolean;
        fontSize?: 'small' | 'medium' | 'large';
    };
}
export declare const HiveLogoResponsive: ({ showWordmark, adaptToContext, theme: propTheme, userPreferences, className, ...props }: HiveResponsiveProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoNavigation: ({ isScrolled, isMenuOpen, className, ...props }: HiveResponsiveProps & {
    isScrolled?: boolean;
    isMenuOpen?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogofavicon: ({ size, context, className, ...props }: Omit<HiveResponsiveProps, "size"> & {
    size?: 16 | 32 | 64 | 128;
    context?: "default" | "notification" | "activity" | "error";
}) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoThemeAdaptive: ({ className, ...props }: HiveResponsiveProps) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoLoading: ({ progress, message, className, ...props }: HiveResponsiveProps & {
    progress?: number;
    message?: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoUserStatus: ({ status, size, showStatus, className, ...props }: HiveResponsiveProps & {
    status?: "online" | "away" | "busy" | "offline";
    showStatus?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export declare const HiveLogoApp: ({ appSection, className, ...props }: HiveResponsiveProps & {
    appSection?: "dashboard" | "spaces" | "profile" | "settings" | "tools";
}) => import("react/jsx-runtime").JSX.Element;
export { HiveLogoResponsive as ResponsiveLogo, HiveLogoNavigation as NavigationLogo, HiveLogofavicon as FaviconLogo, HiveLogoThemeAdaptive as ThemeAdaptiveLogo, HiveLogoLoading as LoadingLogo, HiveLogoUserStatus as UserStatusLogo, HiveLogoApp as AppLogo, };
//# sourceMappingURL=hive-logo-responsive.d.ts.map