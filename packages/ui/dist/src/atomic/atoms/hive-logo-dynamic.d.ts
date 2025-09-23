import React from 'react';
/**
 * HIVE Dynamic Logo Component
 * Automatically selects the right logo variant based on context
 */
export interface HiveLogoDynamicProps {
    /** Explicitly set variant (auto-detect if not provided) */
    variant?: 'gold' | 'black' | 'white' | 'auto';
    /** Size of the logo */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Custom className for additional styling */
    className?: string;
    /** Alt text for accessibility */
    alt?: string;
    /** Whether to add glow effect (for gold variant) */
    glow?: boolean;
    /** Whether to animate on hover */
    animated?: boolean;
}
export declare const HiveLogoDynamic: React.FC<HiveLogoDynamicProps>;
/**
 * Logo with text lockup
 */
export declare const HiveLogoLockup: React.FC<{
    variant?: 'gold' | 'black' | 'white' | 'auto';
    size?: 'sm' | 'md' | 'lg';
    orientation?: 'horizontal' | 'vertical';
    tagline?: string;
}>;
/**
 * Animated logo for loading states
 */
export declare const HiveLogoSpinner: React.FC<{
    size?: 'sm' | 'md' | 'lg';
}>;
/**
 * Logo usage examples
 */
export declare const LogoUsageExamples: React.FC;
export default HiveLogoDynamic;
//# sourceMappingURL=hive-logo-dynamic.d.ts.map