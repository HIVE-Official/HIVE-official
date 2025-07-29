/**
 * HIVE Accessibility Foundation System
 * Centralized accessibility utilities for WCAG 2.1 AA compliance
 * University platform accessibility requirements
 */
export declare const ariaPatterns: {
    readonly navigation: {
        readonly main: "main";
        readonly nav: "navigation";
        readonly banner: "banner";
        readonly contentinfo: "contentinfo";
        readonly search: "search";
    };
    readonly interactive: {
        readonly button: "button";
        readonly link: "link";
        readonly tab: "tab";
        readonly tabpanel: "tabpanel";
        readonly tablist: "tablist";
        readonly menuitem: "menuitem";
        readonly menu: "menu";
        readonly menubar: "menubar";
    };
    readonly content: {
        readonly article: "article";
        readonly section: "region";
        readonly heading: "heading";
        readonly list: "list";
        readonly listitem: "listitem";
        readonly grid: "grid";
        readonly gridcell: "gridcell";
    };
    readonly form: {
        readonly form: "form";
        readonly textbox: "textbox";
        readonly combobox: "combobox";
        readonly checkbox: "checkbox";
        readonly radio: "radio";
        readonly radiogroup: "radiogroup";
        readonly slider: "slider";
    };
    readonly modal: {
        readonly dialog: "dialog";
        readonly alertdialog: "alertdialog";
        readonly tooltip: "tooltip";
        readonly alert: "alert";
        readonly status: "status";
    };
};
export declare const focusStyles: (props?: {
    type?: "subtle" | "strong" | "default" | "skipLink";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export declare const screenReader: {
    readonly only: "sr-only";
    readonly focusable: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--hive-background-primary)] focus:text-[var(--hive-text-primary)]";
    readonly liveRegion: "sr-only";
    readonly livePoliteness: {
        readonly polite: "sr-only [&[aria-live=\"polite\"]]:not-sr-only";
        readonly assertive: "sr-only [&[aria-live=\"assertive\"]]:not-sr-only";
    };
};
export declare const highContrast: {
    readonly border: "contrast-more:border-2 contrast-more:border-current";
    readonly text: "contrast-more:font-semibold";
    readonly background: "contrast-more:bg-[var(--hive-background-primary)] contrast-more:text-[var(--hive-text-primary)]";
};
export declare const reducedMotion: {
    readonly safe: "motion-safe:transition-all motion-safe:duration-300";
    readonly transform: "motion-safe:transform motion-safe:transition-transform";
    readonly disable: "motion-reduce:transition-none motion-reduce:transform-none";
};
export declare const colorContrast: {
    readonly textOnLight: "text-gray-900";
    readonly textOnDark: "text-white";
    readonly interactive: "text-[var(--hive-brand-primary)]";
    readonly success: "text-green-700 dark:text-green-300";
    readonly warning: "text-amber-700 dark:text-amber-300";
    readonly error: "text-red-700 dark:text-red-300";
    readonly info: "text-blue-700 dark:text-blue-300";
};
export declare const universityA11y: {
    readonly academicContent: {
        readonly courseTitle: "role=\"heading\" aria-level=\"2\"";
        readonly assignment: "role=\"article\" aria-labelledby";
        readonly grade: "role=\"status\" aria-live=\"polite\"";
        readonly deadline: "role=\"timer\" aria-label";
    };
    readonly campusNav: {
        readonly building: "role=\"button\" aria-expanded aria-controls";
        readonly floor: "role=\"option\" aria-selected";
        readonly room: "role=\"link\" aria-describedby";
    };
    readonly social: {
        readonly post: "role=\"article\" aria-labelledby";
        readonly comment: "role=\"comment\" aria-label";
        readonly reaction: "role=\"button\" aria-pressed aria-label";
        readonly share: "role=\"button\" aria-haspopup=\"menu\"";
    };
};
/**
 * Get standard accessibility props for interactive elements
 */
export declare function getInteractiveA11yProps(type: keyof typeof ariaPatterns.interactive, label?: string): {
    role: "button" | "link" | "menu" | "menuitem" | "menubar" | "tab" | "tablist" | "tabpanel";
    className: string;
} | {
    'aria-label': string;
    role: "button" | "link" | "menu" | "menuitem" | "menubar" | "tab" | "tablist" | "tabpanel";
    className: string;
};
/**
 * Get form accessibility props
 */
export declare function getFormA11yProps(id: string, label: string, description?: string, error?: string, required?: boolean): Record<string, any>;
/**
 * Get live region props for dynamic content
 */
export declare function getLiveRegionProps(politeness?: 'polite' | 'assertive'): {
    'aria-live': "assertive" | "polite";
    'aria-atomic': string;
    className: "sr-only";
};
/**
 * Get modal accessibility props
 */
export declare function getModalA11yProps(titleId: string, descriptionId?: string): {
    role: string;
    'aria-modal': string;
    'aria-labelledby': string;
    className: string;
} | {
    'aria-describedby': string;
    role: string;
    'aria-modal': string;
    'aria-labelledby': string;
    className: string;
};
/**
 * Generate skip link for keyboard navigation
 */
export declare function createSkipLink(target: string, label: string): {
    href: string;
    className: string;
    children: string;
};
//# sourceMappingURL=accessibility-foundation.d.ts.map