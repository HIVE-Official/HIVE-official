/**
 * HIVE Color System
 * Semantic color tokens for campus-first design
 */
export declare const colors: {
    readonly brand: {
        readonly primary: "var(--hive-brand-primary)";
        readonly secondary: "var(--hive-brand-secondary)";
        readonly tertiary: "var(--hive-brand-tertiary)";
    };
    readonly background: {
        readonly primary: "var(--hive-background-primary)";
        readonly secondary: "var(--hive-background-secondary)";
        readonly tertiary: "var(--hive-background-tertiary)";
        readonly elevated: "var(--hive-background-elevated)";
        readonly 'elevated-strong': "var(--hive-background-elevated-strong)";
        readonly disabled: "var(--hive-background-disabled)";
    };
    readonly text: {
        readonly primary: "var(--hive-text-primary)";
        readonly secondary: "var(--hive-text-secondary)";
        readonly tertiary: "var(--hive-text-tertiary)";
        readonly placeholder: "var(--hive-text-placeholder)";
        readonly disabled: "var(--hive-text-disabled)";
    };
    readonly border: {
        readonly primary: "var(--hive-border-primary)";
        readonly secondary: "var(--hive-border-secondary)";
        readonly subtle: "var(--hive-border-subtle)";
        readonly disabled: "var(--hive-border-disabled)";
    };
    readonly interactive: {
        readonly hover: "var(--hive-interactive-hover)";
        readonly pressed: "var(--hive-interactive-pressed)";
        readonly focus: "var(--hive-interactive-focus)";
    };
    readonly status: {
        readonly success: "var(--hive-status-success)";
        readonly warning: "var(--hive-status-warning)";
        readonly error: "var(--hive-status-error)";
        readonly info: "var(--hive-status-info)";
    };
};
export type ColorToken = keyof typeof colors;
export type BrandColor = keyof typeof colors.brand;
export type BackgroundColor = keyof typeof colors.background;
export type TextColor = keyof typeof colors.text;
export type BorderColor = keyof typeof colors.border;
export type InteractiveColor = keyof typeof colors.interactive;
export type StatusColor = keyof typeof colors.status;
//# sourceMappingURL=colors.d.ts.map