/**
 * HIVE Design System Validation Utilities
 * Tools to ensure components comply with HIVE design standards
 */
export declare const HIVE_COLORS: {
    readonly primaryBlack: "#0A0A0A";
    readonly surface: "#111111";
    readonly border: "#2A2A2A";
    readonly mutedText: "#6B7280";
    readonly goldAccent: "#FFD700";
    readonly white: "#FFFFFF";
    readonly success: "#10B981";
    readonly warning: "#F59E0B";
    readonly error: "#EF4444";
    readonly info: "#3B82F6";
};
export declare const TOUCH_TARGETS: {
    readonly minimum: 44;
    readonly comfortable: 48;
    readonly large: 52;
};
export interface DesignValidationRule {
    name: string;
    description: string;
    check: (element: HTMLElement) => boolean;
    severity: 'error' | 'warning' | 'info';
    fix?: string;
}
export declare const hiveDesignRules: DesignValidationRule[];
export declare function validateElement(element: HTMLElement): DesignValidationResult[];
export declare function validatePage(): DesignValidationReport;
export declare function validateComponent(componentName: string): DesignValidationResult[];
export interface DesignValidationResult {
    rule: string;
    description: string;
    passed: boolean;
    severity: 'error' | 'warning' | 'info';
    fix?: string;
    element: string;
}
export interface DesignValidationReport {
    totalElements: number;
    totalIssues: number;
    errors: number;
    warnings: number;
    infos: number;
    results: Record<string, DesignValidationResult[]>;
    compliance: number;
}
export declare function reportValidationResults(report: DesignValidationReport): void;
export declare function enableContinuousValidation(): void;
export declare const designValidation: {
    validateElement: typeof validateElement;
    validatePage: typeof validatePage;
    validateComponent: typeof validateComponent;
    reportValidationResults: typeof reportValidationResults;
    enableContinuousValidation: typeof enableContinuousValidation;
    rules: DesignValidationRule[];
    colors: {
        readonly primaryBlack: "#0A0A0A";
        readonly surface: "#111111";
        readonly border: "#2A2A2A";
        readonly mutedText: "#6B7280";
        readonly goldAccent: "#FFD700";
        readonly white: "#FFFFFF";
        readonly success: "#10B981";
        readonly warning: "#F59E0B";
        readonly error: "#EF4444";
        readonly info: "#3B82F6";
    };
    touchTargets: {
        readonly minimum: 44;
        readonly comfortable: 48;
        readonly large: 52;
    };
};
//# sourceMappingURL=design-validation.d.ts.map