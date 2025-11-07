import { z } from 'zod';
export const ElementType = z.enum(['ui', 'data', 'logic']);
// Recursive schema for ElementInstance
export const ElementInstanceSchema = z.object({
    id: z.string(),
    type: ElementType,
    config: z.record(z.unknown()).optional(),
    children: z.lazy(() => z.array(ElementInstanceSchema)).optional(),
}).strict();
export function validateElementConfig(_type, _config) {
    // Minimal allow-all until full validation is implemented
    return { success: true };
}
//# sourceMappingURL=elements.js.map