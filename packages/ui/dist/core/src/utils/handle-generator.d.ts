/**
 * Handle Generation Utilities
 * Automatically generates unique handles from display names with randomization and filtering
 */
export declare function generateBaseHandle(displayName: string): string;
export declare function generateNameBasedHandles(displayName: string): string[];
export declare function containsBadWords(text: string): boolean;
export declare function generateHandleVariants(baseHandle: string): string[];
export declare function findAvailableHandle(displayName: string, checkAvailability: (handle: string) => Promise<boolean>): Promise<string>;
export declare function validateHandle(handle: string): {
    valid: boolean;
    error?: string;
};
export declare function generateHandleSuggestions(displayName: string, count?: number): string[];
//# sourceMappingURL=handle-generator.d.ts.map