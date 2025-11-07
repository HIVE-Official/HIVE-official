import { z, type ZodType } from 'zod';
export declare const ElementType: z.ZodEnum<["ui", "data", "logic"]>;
export type ElementType = z.infer<typeof ElementType>;
export interface ElementInstance {
    id: string;
    type: ElementType;
    config?: Record<string, unknown>;
    children?: ElementInstance[];
}
export declare const ElementInstanceSchema: ZodType<ElementInstance>;
export declare function validateElementConfig(_type: ElementType, _config: unknown): {
    success: boolean;
    error?: unknown;
};
//# sourceMappingURL=elements.d.ts.map