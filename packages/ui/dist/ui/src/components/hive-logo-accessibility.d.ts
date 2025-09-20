import React from 'react';
interface AccessibilitySettings {
    complianceLevel?: 'A' | 'AA' | 'AAA';
    highContrast?: boolean;
    reducedMotion?: boolean;
    enlargeText?: boolean;
    colorBlindnessSupport?: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'none';
    screenReaderOptimized?: boolean;
    announceChanges?: boolean;
    describeLogo?: boolean;
    keyboardNavigation?: boolean;
    skipToContent?: boolean;
    customTabOrder?: number;
    focusRing?: 'default' | 'enhanced' | 'custom';
    focusIndicatorStyle?: 'outline' | 'shadow' | 'background' | 'border';
    minTouchTarget?: number;
    hapticFeedback?: boolean;
    simpleMode?: boolean;
    noAnimations?: boolean;
    clearLabels?: boolean;
}
interface AccessibilityLogoProps {
    variant?: 'primary' | 'gold' | 'inverted' | 'monochrome';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    accessibility?: AccessibilitySettings;
    ariaLabel?: string;
    ariaDescription?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    role?: 'img' | 'button' | 'link' | 'banner' | 'navigation';
    semanticPurpose?: 'logo' | 'navigation' | 'branding' | 'decoration';
    interactive?: boolean;
    onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    context?: 'header' | 'footer' | 'sidebar' | 'main' | 'navigation';
    landmarks?: boolean;
    className?: string;
}
declare const ColorBlindnessFilters: React.FC;
export declare const HiveLogoAccessible: React.NamedExoticComponent<AccessibilityLogoProps>, role: interactive;
export declare const HiveSkipLink: React.FC<{
    href: string;
    children: React.ReactNode;
    className?: string;
}>;
export declare const HiveLogoAccessibilityTest: React.FC<{
    className?: string;
}>;
export { ColorBlindnessFilters, };
//# sourceMappingURL=hive-logo-accessibility.d.ts.map