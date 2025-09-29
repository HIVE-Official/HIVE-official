export declare const prdRadius: {
    readonly none: "0px";
    readonly sm: "12px";
    readonly md: "16px";
    readonly lg: "20px";
    readonly xl: "24px";
    readonly '2xl': "32px";
    readonly '3xl': "40px";
    readonly full: "9999px";
};
export declare const prdComponentRadius: {
    readonly button: "16px";
    readonly input: "16px";
    readonly select: "16px";
    readonly card: "20px";
    readonly modal: "32px";
    readonly widget: "24px";
    readonly image: "20px";
    readonly avatar: "9999px";
    readonly badge: "9999px";
    readonly container: "20px";
    readonly surface: "24px";
    readonly overlay: "32px";
};
export declare const prdResponsiveRadius: {
    readonly mobile: {
        readonly button: "18px";
        readonly input: "18px";
        readonly card: "24px";
        readonly modal: "40px";
    };
    readonly desktop: {
        readonly button: "16px";
        readonly input: "16px";
        readonly select: "16px";
        readonly card: "20px";
        readonly modal: "32px";
        readonly widget: "24px";
        readonly image: "20px";
        readonly avatar: "9999px";
        readonly badge: "9999px";
        readonly container: "20px";
        readonly surface: "24px";
        readonly overlay: "32px";
    };
};
export declare const prdRadiusCSSVariables: string;
export declare const prdTailwindRadius: {
    'hive-sm': "12px";
    'hive-md': "16px";
    'hive-lg': "20px";
    'hive-xl': "24px";
    'hive-2xl': "32px";
    'hive-3xl': "40px";
    'hive-button': "16px";
    'hive-input': "16px";
    'hive-card': "20px";
    'hive-modal': "32px";
    'hive-widget': "24px";
};
export declare const radiusMigrationMapping: {
    readonly 'rounded-sm': "rounded-hive-sm";
    readonly 'rounded-md': "rounded-hive-md";
    readonly 'rounded-lg': "rounded-hive-lg";
    readonly 'rounded-xl': "rounded-hive-xl";
    readonly 'rounded-2xl': "rounded-hive-2xl";
    readonly 'rounded-button': "rounded-hive-button";
    readonly 'rounded-card': "rounded-hive-card";
    readonly 'rounded-modal': "rounded-hive-modal";
};
export declare const prdRadiusGuidelines: {
    readonly buttons: "Use 16px (md) for consistent touch targets across desktop and mobile";
    readonly cards: "Use 20px (lg) for softer, more premium container feel";
    readonly modals: "Use 32px (2xl) for sophisticated dialog appearance";
    readonly images: "Use 20px (lg) to soften media while maintaining clarity";
    readonly interactive: "Maintain consistent radius across related interactive elements";
    readonly mobile: "Increase radius slightly on mobile for better touch experience";
    readonly nesting: "Use smaller radius for nested elements (card > button = lg > md)";
};
export declare const radiusDesignPrinciples: {
    readonly hierarchy: "Larger elements get larger radius values";
    readonly consistency: "Related elements should share radius values";
    readonly touch: "Mobile targets get slightly more generous radius";
    readonly nesting: "Nested elements use smaller radius than their containers";
    readonly premium: "Generous radius conveys quality and sophistication";
    readonly accessibility: "Larger radius improves touch targets for accessibility";
};
export type PRDRadiusToken = keyof typeof prdRadius;
export type PRDComponentRadiusToken = keyof typeof prdComponentRadius;
export type RadiusMigrationToken = keyof typeof radiusMigrationMapping;
//# sourceMappingURL=radius-prd-aligned.d.ts.map