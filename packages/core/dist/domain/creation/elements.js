"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementInstanceSchema = exports.ElementType = void 0;
exports.validateElementConfig = validateElementConfig;
const zod_1 = require("zod");
exports.ElementType = zod_1.z.enum(['ui', 'data', 'logic']);
// Recursive schema for ElementInstance
exports.ElementInstanceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: exports.ElementType,
    config: zod_1.z.record(zod_1.z.unknown()).optional(),
    children: zod_1.z.lazy(() => zod_1.z.array(exports.ElementInstanceSchema)).optional(),
}).strict();
function validateElementConfig(_type, _config) {
    // Minimal allow-all until full validation is implemented
    return { success: true };
}
//# sourceMappingURL=elements.js.map