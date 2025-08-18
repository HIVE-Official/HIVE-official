"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELEMENT_LIMITS = exports.validateElementConfig = exports.getLatestElementVersion = exports.createElementId = exports.parseElementId = exports.ElementInstanceSchema = exports.ElementSchema = exports.ElementPresetSchema = exports.ElementConfigSchema = exports.PingTriggerConfigSchema = exports.ConditionGateConfigSchema = exports.ProgressBarConfigSchema = exports.CountdownTimerConfigSchema = exports.RatingStarsConfigSchema = exports.TextInputConfigSchema = exports.ChoiceSelectConfigSchema = exports.ButtonConfigSchema = exports.StackConfigSchema = exports.DividerConfigSchema = exports.ImageBlockConfigSchema = exports.TextBlockConfigSchema = exports.ConditionalRuleSchema = exports.StyleConfigSchema = exports.ElementType = exports.ElementId = exports.ElementCategory = void 0;
const zod_1 = require("zod");
// Element categories for organization
exports.ElementCategory = zod_1.z.enum([
    "Display & Layout",
    "Inputs & Choices",
    "Logic & Dynamics",
]);
// Element versioning - immutable IDs like "button-v1", "button-v2"
exports.ElementId = zod_1.z
    .string()
    .regex(/^[a-z][a-zA-Z0-9]*-v\d+$/, "Element ID must follow format: elementName-v1");
// Base element types
exports.ElementType = zod_1.z.enum([
    // Display & Layout
    "textBlock",
    "imageBlock",
    "divider",
    "stack",
    // Inputs & Choices
    "button",
    "choiceSelect",
    "textInput",
    "ratingStars",
    // Logic & Dynamics
    "countdownTimer",
    "progressBar",
    "conditionGate",
    "pingTrigger",
]);
// Common style configuration schema
exports.StyleConfigSchema = zod_1.z.object({
    backgroundColor: zod_1.z.string().optional(),
    textColor: zod_1.z.string().optional(),
    borderColor: zod_1.z.string().optional(),
    borderWidth: zod_1.z.number().min(0).max(10).optional(),
    borderRadius: zod_1.z.number().min(0).max(50).optional(),
    padding: zod_1.z.number().min(0).max(100).optional(),
    margin: zod_1.z.number().min(0).max(100).optional(),
    fontSize: zod_1.z.enum(["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]).optional(),
    fontWeight: zod_1.z.enum(["normal", "medium", "semibold", "bold"]).optional(),
    textAlign: zod_1.z.enum(["left", "center", "right"]).optional(),
    width: zod_1.z.union([zod_1.z.number(), zod_1.z.enum(["auto", "full"])]).optional(),
    height: zod_1.z.union([zod_1.z.number(), zod_1.z.enum(["auto", "full"])]).optional(),
});
// Conditional rules for dynamic behavior
exports.ConditionalRuleSchema = zod_1.z.object({
    id: zod_1.z.string(),
    condition: zod_1.z.object({
        type: zod_1.z.enum([
            "equals",
            "notEquals",
            "contains",
            "greaterThan",
            "lessThan",
            "isEmpty",
            "isNotEmpty",
        ]),
        sourceElementId: zod_1.z.string(),
        sourceProperty: zod_1.z.string(),
        value: zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean()]).optional(),
    }),
    actions: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.enum(["show", "hide", "setValue", "setStyle", "trigger"]),
        targetElementId: zod_1.z.string().optional(),
        targetProperty: zod_1.z.string().optional(),
        value: zod_1.z.unknown().optional(),
    })),
});
// Element configuration schemas for each type
exports.TextBlockConfigSchema = zod_1.z.object({
    text: zod_1.z.string().max(1000),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.ImageBlockConfigSchema = zod_1.z.object({
    src: zod_1.z.string().url(),
    alt: zod_1.z.string().max(200),
    caption: zod_1.z.string().max(300).optional(),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.DividerConfigSchema = zod_1.z.object({
    thickness: zod_1.z.number().min(1).max(10).default(1),
    color: zod_1.z.string().default("#e5e7eb"),
    style: zod_1.z.enum(["solid", "dashed", "dotted"]).default("solid"),
    margin: zod_1.z.number().min(0).max(50).default(16),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.StackConfigSchema = zod_1.z.object({
    direction: zod_1.z.enum(["vertical", "horizontal"]).default("vertical"),
    spacing: zod_1.z.number().min(0).max(50).default(8),
    alignment: zod_1.z.enum(["start", "center", "end", "stretch"]).default("start"),
    wrap: zod_1.z.boolean().default(false),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.ButtonConfigSchema = zod_1.z.object({
    text: zod_1.z.string().max(100),
    variant: zod_1.z
        .enum(["primary", "secondary", "outline", "ghost"])
        .default("primary"),
    size: zod_1.z.enum(["sm", "md", "lg"]).default("md"),
    disabled: zod_1.z.boolean().default(false),
    onClick: zod_1.z
        .object({
        type: zod_1.z.enum(["navigate", "submit", "reset", "custom"]),
        target: zod_1.z.string().optional(),
        data: zod_1.z.record(zod_1.z.unknown()).optional(),
    })
        .optional(),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.ChoiceSelectConfigSchema = zod_1.z.object({
    label: zod_1.z.string().max(200),
    options: zod_1.z
        .array(zod_1.z.object({
        value: zod_1.z.string(),
        label: zod_1.z.string().max(100),
        disabled: zod_1.z.boolean().default(false),
    }))
        .min(1)
        .max(20),
    multiple: zod_1.z.boolean().default(false),
    required: zod_1.z.boolean().default(false),
    placeholder: zod_1.z.string().max(100).optional(),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.TextInputConfigSchema = zod_1.z.object({
    label: zod_1.z.string().max(200),
    placeholder: zod_1.z.string().max(100).optional(),
    type: zod_1.z
        .enum(["text", "email", "password", "number", "tel", "url"])
        .default("text"),
    required: zod_1.z.boolean().default(false),
    minLength: zod_1.z.number().min(0).optional(),
    maxLength: zod_1.z.number().min(1).max(1000).optional(),
    pattern: zod_1.z.string().optional(),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.RatingStarsConfigSchema = zod_1.z.object({
    label: zod_1.z.string().max(200),
    maxRating: zod_1.z.number().min(3).max(10).default(5),
    allowHalf: zod_1.z.boolean().default(false),
    required: zod_1.z.boolean().default(false),
    size: zod_1.z.enum(["sm", "md", "lg"]).default("md"),
    color: zod_1.z.string().default("#fbbf24"),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.CountdownTimerConfigSchema = zod_1.z.object({
    label: zod_1.z.string().max(200).optional(),
    targetDate: zod_1.z.string().datetime(),
    format: zod_1.z
        .enum(["days", "hours", "minutes", "seconds", "dhms"])
        .default("dhms"),
    onComplete: zod_1.z
        .object({
        type: zod_1.z.enum(["message", "redirect", "trigger"]),
        value: zod_1.z.string(),
    })
        .optional(),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.ProgressBarConfigSchema = zod_1.z.object({
    label: zod_1.z.string().max(200).optional(),
    value: zod_1.z.number().min(0).max(100).default(0),
    max: zod_1.z.number().min(1).default(100),
    showPercentage: zod_1.z.boolean().default(true),
    color: zod_1.z.string().default("#3b82f6"),
    backgroundColor: zod_1.z.string().default("#e5e7eb"),
    height: zod_1.z.number().min(4).max(50).default(8),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.ConditionGateConfigSchema = zod_1.z.object({
    conditions: zod_1.z
        .array(zod_1.z.object({
        sourceElementId: zod_1.z.string(),
        sourceProperty: zod_1.z.string(),
        operator: zod_1.z.enum([
            "equals",
            "notEquals",
            "contains",
            "greaterThan",
            "lessThan",
        ]),
        value: zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean()]),
    }))
        .min(1),
    logic: zod_1.z.enum(["and", "or"]).default("and"),
    onTrue: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.enum(["show", "hide", "setValue", "trigger"]),
        targetElementId: zod_1.z.string(),
        value: zod_1.z.unknown().optional(),
    })),
    onFalse: zod_1.z
        .array(zod_1.z.object({
        type: zod_1.z.enum(["show", "hide", "setValue", "trigger"]),
        targetElementId: zod_1.z.string(),
        value: zod_1.z.unknown().optional(),
    }))
        .optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
exports.PingTriggerConfigSchema = zod_1.z.object({
    label: zod_1.z.string().max(200),
    triggerOn: zod_1.z.enum(["click", "hover", "focus", "timer"]),
    delay: zod_1.z.number().min(0).max(10000).default(0), // milliseconds
    target: zod_1.z.object({
        type: zod_1.z.enum(["element", "external", "analytics"]),
        elementId: zod_1.z.string().optional(),
        url: zod_1.z.string().url().optional(),
        event: zod_1.z.string().optional(),
        data: zod_1.z.record(zod_1.z.unknown()).optional(),
    }),
    style: exports.StyleConfigSchema.optional(),
    conditionalRules: zod_1.z.array(exports.ConditionalRuleSchema).optional(),
});
// Union of all element configurations
exports.ElementConfigSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({ type: zod_1.z.literal("textBlock"), config: exports.TextBlockConfigSchema }),
    zod_1.z.object({ type: zod_1.z.literal("imageBlock"), config: exports.ImageBlockConfigSchema }),
    zod_1.z.object({ type: zod_1.z.literal("divider"), config: exports.DividerConfigSchema }),
    zod_1.z.object({ type: zod_1.z.literal("stack"), config: exports.StackConfigSchema }),
    zod_1.z.object({ type: zod_1.z.literal("button"), config: exports.ButtonConfigSchema }),
    zod_1.z.object({
        type: zod_1.z.literal("choiceSelect"),
        config: exports.ChoiceSelectConfigSchema,
    }),
    zod_1.z.object({ type: zod_1.z.literal("textInput"), config: exports.TextInputConfigSchema }),
    zod_1.z.object({ type: zod_1.z.literal("ratingStars"), config: exports.RatingStarsConfigSchema }),
    zod_1.z.object({
        type: zod_1.z.literal("countdownTimer"),
        config: exports.CountdownTimerConfigSchema,
    }),
    zod_1.z.object({ type: zod_1.z.literal("progressBar"), config: exports.ProgressBarConfigSchema }),
    zod_1.z.object({
        type: zod_1.z.literal("conditionGate"),
        config: exports.ConditionGateConfigSchema,
    }),
    zod_1.z.object({ type: zod_1.z.literal("pingTrigger"), config: exports.PingTriggerConfigSchema }),
]);
// Element preset system
exports.ElementPresetSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().max(100),
    description: zod_1.z.string().max(300),
    elementType: exports.ElementType,
    config: zod_1.z.unknown(), // Will be validated against specific element config schema
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    popularity: zod_1.z.number().min(0).default(0),
});
// Main Element definition
exports.ElementSchema = zod_1.z.object({
    id: exports.ElementId,
    name: zod_1.z.string().max(100),
    type: exports.ElementType,
    category: exports.ElementCategory,
    description: zod_1.z.string().max(500),
    icon: zod_1.z.string().max(50), // Icon name from icon library
    version: zod_1.z.number().min(1),
    // JSON schema for configuration validation
    configSchema: zod_1.z.string(), // Stringified JSON schema
    defaultConfig: zod_1.z.unknown(), // Default configuration object
    // Presets for common configurations
    presets: zod_1.z.array(exports.ElementPresetSchema).optional(),
    // Metadata
    isOfficial: zod_1.z.boolean().default(true), // Official HIVE elements vs. community
    isDeprecated: zod_1.z.boolean().default(false),
    deprecationMessage: zod_1.z.string().optional(),
    // Analytics
    usageCount: zod_1.z.number().min(0).default(0),
    // Timestamps
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Element instance in a tool
exports.ElementInstanceSchema = zod_1.z.object({
    id: zod_1.z.string(), // Unique instance ID within the tool
    elementId: exports.ElementId, // Reference to element definition
    config: zod_1.z.unknown(), // Configuration object (validated against element's schema)
    position: zod_1.z.object({
        x: zod_1.z.number(),
        y: zod_1.z.number(),
        width: zod_1.z.number().optional(),
        height: zod_1.z.number().optional(),
    }),
    parentId: zod_1.z.string().optional(), // For nested elements (max depth 3)
    order: zod_1.z.number(), // Display order within parent
    isVisible: zod_1.z.boolean().default(true),
    isLocked: zod_1.z.boolean().default(false), // Prevent editing in builder
});
// Utility functions
const parseElementId = (elementId) => {
    const match = elementId.match(/^([a-z][a-zA-Z0-9]*)-v(\d+)$/);
    if (!match)
        throw new Error(`Invalid element ID format: ${elementId}`);
    return { name: match[1], version: parseInt(match[2]) };
};
exports.parseElementId = parseElementId;
const createElementId = (name, version) => {
    const id = `${name}-v${version}`;
    return exports.ElementId.parse(id);
};
exports.createElementId = createElementId;
const getLatestElementVersion = (elements, baseName) => {
    const matching = elements.filter((el) => (0, exports.parseElementId)(el.id).name === baseName);
    if (matching.length === 0)
        return null;
    return matching.reduce((latest, current) => {
        const latestVersion = (0, exports.parseElementId)(latest.id).version;
        const currentVersion = (0, exports.parseElementId)(current.id).version;
        return currentVersion > latestVersion ? current : latest;
    });
};
exports.getLatestElementVersion = getLatestElementVersion;
const validateElementConfig = (element, config) => {
    try {
        // const schema = JSON.parse(element.configSchema);
        // In a real implementation, we'd use a JSON schema validator here
        // For now, we'll use the Zod schemas we defined above
        const configWithType = { type: element.type, config };
        exports.ElementConfigSchema.parse(configWithType);
        return true;
    }
    catch (error) {
        console.error("Element config validation failed:", error);
        return false;
    }
};
exports.validateElementConfig = validateElementConfig;
// Element limits and constraints
exports.ELEMENT_LIMITS = {
    MAX_ELEMENTS_PER_TOOL: 50,
    MAX_NESTING_DEPTH: 3,
    MAX_CONFIG_SIZE_KB: 10,
    RENDER_TIMEOUT_MS: 1000,
};
//# sourceMappingURL=element.js.map