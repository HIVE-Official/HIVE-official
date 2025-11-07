import { z, type ZodType } from 'zod';

export const ElementType = z.enum(['ui', 'data', 'logic']);
export type ElementType = z.infer<typeof ElementType>;

export interface ElementInstance {
  id: string;
  type: ElementType;
  config?: Record<string, unknown>;
  children?: ElementInstance[];
}

// Recursive schema for ElementInstance
export const ElementInstanceSchema: ZodType<ElementInstance> = z.object({
  id: z.string(),
  type: ElementType,
  config: z.record(z.unknown()).optional(),
  children: z.lazy(() => z.array(ElementInstanceSchema)).optional(),
}).strict() as unknown as ZodType<ElementInstance>;

export function validateElementConfig(_type: ElementType, _config: unknown): { success: boolean; error?: unknown } {
  // Minimal allow-all until full validation is implemented
  return { success: true };
}
