import { z } from 'zod';
export declare const ToolStatus: z.ZodEnum<["draft", "published", "archived"]>;
export type ToolStatus = z.infer<typeof ToolStatus>;
export declare const ToolVersionSchema: z.ZodDefault<z.ZodString>;
export declare const ToolConfigSchema: z.ZodAny;
export declare const ToolMetadataSchema: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
export declare const ToolSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    version: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived"]>>;
    config: z.ZodOptional<z.ZodAny>;
    metadata: z.ZodOptional<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    version?: string;
    status?: "draft" | "published" | "archived";
    metadata?: Record<string, any>;
    config?: any;
}, {
    id?: string;
    name?: string;
    version?: string;
    status?: "draft" | "published" | "archived";
    metadata?: Record<string, any>;
    config?: any;
}>;
export type Tool = z.infer<typeof ToolSchema>;
export declare const CreateToolSchema: z.ZodObject<{
    name: z.ZodString;
    config: z.ZodOptional<z.ZodOptional<z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    config?: any;
}, {
    name?: string;
    config?: any;
}>;
export declare const UpdateToolSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodString>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "published", "archived"]>>>;
    config: z.ZodOptional<z.ZodOptional<z.ZodAny>>;
    metadata: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>>>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    version?: string;
    status?: "draft" | "published" | "archived";
    metadata?: Record<string, any>;
    config?: any;
}, {
    id?: string;
    name?: string;
    version?: string;
    status?: "draft" | "published" | "archived";
    metadata?: Record<string, any>;
    config?: any;
}>;
export declare const ShareToolSchema: z.ZodObject<{
    toolId: z.ZodString;
    expiresAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    toolId?: string;
    expiresAt?: Date;
}, {
    toolId?: string;
    expiresAt?: Date;
}>;
export declare function createToolDefaults(partial?: Partial<Tool>): Tool;
export declare function generateShareToken(): string;
export declare function canUserEditTool(_userId: string, _tool: Tool): boolean;
export declare function canUserViewTool(_userId: string, _tool: Tool): boolean;
export declare function getNextVersion(current?: string): string;
export type ChangeType = 'major' | 'minor' | 'patch';
export declare function determineChangeType(_from: string, _to: string): ChangeType;
export declare function validateToolStructure(input: unknown): {
    success: boolean;
    error?: unknown;
};
//# sourceMappingURL=tool.d.ts.map