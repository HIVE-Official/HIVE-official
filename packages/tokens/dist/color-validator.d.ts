export interface ColorValidationResult {
    component: string;
    file: string;
    line?: number;
    issue: string;
    severity: 'error' | 'warning' | 'info';
    suggestion: string;
    autoFixable: boolean;
}
export interface ContrastTest {
    foreground: string;
    background: string;
    context: string;
    passes: boolean;
    ratio: number;
    required: number;
}
/**
 * Validate color contrast across all HIVE color combinations
 */
export declare const validateAllContrasts: () => ContrastTest[];
/**
 * Generate contrast report
 */
export declare const generateContrastReport: () => {
    passed: ContrastTest[];
    failed: ContrastTest[];
    summary: {
        total: number;
        passed: number;
        failed: number;
        passRate: number;
    };
};
/**
 * Validate specific color combination
 */
export declare const validateColorCombination: (foreground: string, background: string, _context?: string) => {
    isValid: boolean;
    ratio: number;
    level: "AAA" | "AA" | "FAIL";
    recommendation: string;
};
/**
 * HIVE-specific color rules
 */
export declare const hiveColorRules: {
    /**
     * Validate gold usage
     */
    goldUsage: (context: string, element: string) => ColorValidationResult | null;
    /**
     * Validate semantic token usage
     */
    semanticTokens: (colorValue: string, context: string) => ColorValidationResult | null;
    /**
     * Validate deprecated colors
     */
    deprecatedColors: (colorValue: string, context: string) => ColorValidationResult | null;
};
/**
 * Run complete HIVE color validation
 */
export declare const validateHiveColorSystem: () => {
    isValid: boolean;
    errors: ColorValidationResult[];
    warnings: ColorValidationResult[];
    contrastReport: ReturnType<typeof generateContrastReport>;
};
/**
 * Generate accessibility audit report
 */
export declare const generateAccessibilityAudit: () => {
    score: number;
    grade: "A+" | "A" | "B" | "C" | "D" | "F";
    details: {
        contrastCompliance: number;
        semanticTokenUsage: number;
        colorBlindnessFriendly: number;
        goldUsageAppropriate: number;
    };
    recommendations: string[];
};
/**
 * Export validation utilities for CLI usage
 */
export declare const colorValidatorCLI: {
    validateContrasts: () => ContrastTest[];
    generateReport: () => {
        passed: ContrastTest[];
        failed: ContrastTest[];
        summary: {
            total: number;
            passed: number;
            failed: number;
            passRate: number;
        };
    };
    auditAccessibility: () => {
        score: number;
        grade: "A+" | "A" | "B" | "C" | "D" | "F";
        details: {
            contrastCompliance: number;
            semanticTokenUsage: number;
            colorBlindnessFriendly: number;
            goldUsageAppropriate: number;
        };
        recommendations: string[];
    };
    validateSystem: () => {
        isValid: boolean;
        errors: ColorValidationResult[];
        warnings: ColorValidationResult[];
        contrastReport: ReturnType<typeof generateContrastReport>;
    };
};
//# sourceMappingURL=color-validator.d.ts.map