import { z } from 'zod';
// Element categories for organization
export const ElementCategory = z.enum([
    'Display & Layout',
    'Inputs & Choices',
    'Logic & Dynamics'
]);
// Element versioning - immutable IDs like "button-v1", "button-v2"
export const ElementId = z.string().regex(/^[a-z][a-zA-Z0-9]*-v\d+$/, 'Element ID must follow format: elementName-v1');
// Base element types
export const ElementType = z.enum([
    // Display & Layout
    'textBlock',
    'imageBlock',
    'divider',
    'stack',
    // Inputs & Choices
    'button',
    'choiceSelect',
    'textInput',
    'ratingStars',
    // Logic & Dynamics
    'countdownTimer',
    'progressBar',
    'conditionGate',
    'pingTrigger'
]);
// Common style configuration schema
export const StyleConfigSchema = z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    borderColor: z.string().optional(),
    borderWidth: z.number().min(0).max(10).optional(),
    borderRadius: z.number().min(0).max(50).optional(),
    padding: z.number().min(0).max(100).optional(),
    margin: z.number().min(0).max(100).optional(),
    fontSize: z.enum(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl']).optional(),
    fontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).optional(),
    textAlign: z.enum(['left', 'center', 'right']).optional(),
    width: z.union([z.number(), z.enum(['auto', 'full'])]).optional(),
    height: z.union([z.number(), z.enum(['auto', 'full'])]).optional(),
});
// Conditional rules for dynamic behavior
export const ConditionalRuleSchema = z.object({
    id: z.string(),
    condition: z.object({
        type: z.enum(['equals', 'notEquals', 'contains', 'greaterThan', 'lessThan', 'isEmpty', 'isNotEmpty']),
        sourceElementId: z.string(),
        sourceProperty: z.string(),
        value: z.union([z.string(), z.number(), z.boolean()]).optional(),
    }),
    actions: z.array(z.object({
        type: z.enum(['show', 'hide', 'setValue', 'setStyle', 'trigger']),
        targetElementId: z.string().optional(),
        targetProperty: z.string().optional(),
        value: z.any().optional(),
    })),
});
// Element configuration schemas for each type
export const TextBlockConfigSchema = z.object({
    text: z.string().max(1000),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const ImageBlockConfigSchema = z.object({
    src: z.string().url(),
    alt: z.string().max(200),
    caption: z.string().max(300).optional(),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const DividerConfigSchema = z.object({
    thickness: z.number().min(1).max(10).default(1),
    color: z.string().default('#e5e7eb'),
    style: z.enum(['solid', 'dashed', 'dotted']).default('solid'),
    margin: z.number().min(0).max(50).default(16),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const StackConfigSchema = z.object({
    direction: z.enum(['vertical', 'horizontal']).default('vertical'),
    spacing: z.number().min(0).max(50).default(8),
    alignment: z.enum(['start', 'center', 'end', 'stretch']).default('start'),
    wrap: z.boolean().default(false),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const ButtonConfigSchema = z.object({
    text: z.string().max(100),
    variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).default('primary'),
    size: z.enum(['sm', 'md', 'lg']).default('md'),
    disabled: z.boolean().default(false),
    onClick: z.object({
        type: z.enum(['navigate', 'submit', 'reset', 'custom']),
        target: z.string().optional(),
        data: z.record(z.any()).optional(),
    }).optional(),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const ChoiceSelectConfigSchema = z.object({
    label: z.string().max(200),
    options: z.array(z.object({
        value: z.string(),
        label: z.string().max(100),
        disabled: z.boolean().default(false),
    })).min(1).max(20),
    multiple: z.boolean().default(false),
    required: z.boolean().default(false),
    placeholder: z.string().max(100).optional(),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const TextInputConfigSchema = z.object({
    label: z.string().max(200),
    placeholder: z.string().max(100).optional(),
    type: z.enum(['text', 'email', 'password', 'number', 'tel', 'url']).default('text'),
    required: z.boolean().default(false),
    minLength: z.number().min(0).optional(),
    maxLength: z.number().min(1).max(1000).optional(),
    pattern: z.string().optional(),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const RatingStarsConfigSchema = z.object({
    label: z.string().max(200),
    maxRating: z.number().min(3).max(10).default(5),
    allowHalf: z.boolean().default(false),
    required: z.boolean().default(false),
    size: z.enum(['sm', 'md', 'lg']).default('md'),
    color: z.string().default('#fbbf24'),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const CountdownTimerConfigSchema = z.object({
    label: z.string().max(200).optional(),
    targetDate: z.string().datetime(),
    format: z.enum(['days', 'hours', 'minutes', 'seconds', 'dhms']).default('dhms'),
    onComplete: z.object({
        type: z.enum(['message', 'redirect', 'trigger']),
        value: z.string(),
    }).optional(),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const ProgressBarConfigSchema = z.object({
    label: z.string().max(200).optional(),
    value: z.number().min(0).max(100).default(0),
    max: z.number().min(1).default(100),
    showPercentage: z.boolean().default(true),
    color: z.string().default('#3b82f6'),
    backgroundColor: z.string().default('#e5e7eb'),
    height: z.number().min(4).max(50).default(8),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const ConditionGateConfigSchema = z.object({
    conditions: z.array(z.object({
        sourceElementId: z.string(),
        sourceProperty: z.string(),
        operator: z.enum(['equals', 'notEquals', 'contains', 'greaterThan', 'lessThan']),
        value: z.union([z.string(), z.number(), z.boolean()]),
    })).min(1),
    logic: z.enum(['and', 'or']).default('and'),
    onTrue: z.array(z.object({
        type: z.enum(['show', 'hide', 'setValue', 'trigger']),
        targetElementId: z.string(),
        value: z.any().optional(),
    })),
    onFalse: z.array(z.object({
        type: z.enum(['show', 'hide', 'setValue', 'trigger']),
        targetElementId: z.string(),
        value: z.any().optional(),
    })).optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
export const PingTriggerConfigSchema = z.object({
    label: z.string().max(200),
    triggerOn: z.enum(['click', 'hover', 'focus', 'timer']),
    delay: z.number().min(0).max(10000).default(0), // milliseconds
    target: z.object({
        type: z.enum(['element', 'external', 'analytics']),
        elementId: z.string().optional(),
        url: z.string().url().optional(),
        event: z.string().optional(),
        data: z.record(z.any()).optional(),
    }),
    style: StyleConfigSchema.optional(),
    conditionalRules: z.array(ConditionalRuleSchema).optional(),
});
// Union of all element configurations
export const ElementConfigSchema = z.discriminatedUnion('type', [
    z.object({ type: z.literal('textBlock'), config: TextBlockConfigSchema }),
    z.object({ type: z.literal('imageBlock'), config: ImageBlockConfigSchema }),
    z.object({ type: z.literal('divider'), config: DividerConfigSchema }),
    z.object({ type: z.literal('stack'), config: StackConfigSchema }),
    z.object({ type: z.literal('button'), config: ButtonConfigSchema }),
    z.object({ type: z.literal('choiceSelect'), config: ChoiceSelectConfigSchema }),
    z.object({ type: z.literal('textInput'), config: TextInputConfigSchema }),
    z.object({ type: z.literal('ratingStars'), config: RatingStarsConfigSchema }),
    z.object({ type: z.literal('countdownTimer'), config: CountdownTimerConfigSchema }),
    z.object({ type: z.literal('progressBar'), config: ProgressBarConfigSchema }),
    z.object({ type: z.literal('conditionGate'), config: ConditionGateConfigSchema }),
    z.object({ type: z.literal('pingTrigger'), config: PingTriggerConfigSchema }),
]);
// Element preset system
export const ElementPresetSchema = z.object({
    id: z.string(),
    name: z.string().max(100),
    description: z.string().max(300),
    elementType: ElementType,
    config: z.any(), // Will be validated against specific element config schema
    tags: z.array(z.string()).optional(),
    popularity: z.number().min(0).default(0),
});
// Main Element definition
export const ElementSchema = z.object({
    id: ElementId,
    name: z.string().max(100),
    type: ElementType,
    category: ElementCategory,
    description: z.string().max(500),
    icon: z.string().max(50), // Icon name from icon library
    version: z.number().min(1),
    // JSON schema for configuration validation
    configSchema: z.string(), // Stringified JSON schema
    defaultConfig: z.any(), // Default configuration object
    // Presets for common configurations
    presets: z.array(ElementPresetSchema).optional(),
    // Metadata
    isOfficial: z.boolean().default(true), // Official HIVE elements vs. community
    isDeprecated: z.boolean().default(false),
    deprecationMessage: z.string().optional(),
    // Analytics
    usageCount: z.number().min(0).default(0),
    // Timestamps
    createdAt: z.date(),
    updatedAt: z.date(),
});
// Element instance in a tool
export const ElementInstanceSchema = z.object({
    id: z.string(), // Unique instance ID within the tool
    elementId: ElementId, // Reference to element definition
    config: z.any(), // Configuration object (validated against element's schema)
    position: z.object({
        x: z.number(),
        y: z.number(),
        width: z.number().optional(),
        height: z.number().optional(),
    }),
    parentId: z.string().optional(), // For nested elements (max depth 3)
    order: z.number(), // Display order within parent
    isVisible: z.boolean().default(true),
    isLocked: z.boolean().default(false), // Prevent editing in builder
});
// Utility functions
export const parseElementId = (elementId) => {
    const match = elementId.match(/^([a-z][a-zA-Z0-9]*)-v(\d+)$/);
    if (!match)
        throw new Error(`Invalid element ID format: ${elementId}`);
    return { name: match[1], version: parseInt(match[2]) };
};
export const createElementId = (name, version) => {
    const id = `${name}-v${version}`;
    return ElementId.parse(id);
};
export const getLatestElementVersion = (elements, baseName) => {
    const matching = elements.filter(el => parseElementId(el.id).name === baseName);
    if (matching.length === 0)
        return null;
    return matching.reduce((latest, current) => {
        const latestVersion = parseElementId(latest.id).version;
        const currentVersion = parseElementId(current.id).version;
        return currentVersion > latestVersion ? current : latest;
    });
};
export const validateElementConfig = (element, config) => {
    try {
        const schema = JSON.parse(element.configSchema);
        // In a real implementation, we'd use a JSON schema validator here
        // For now, we'll use the Zod schemas we defined above
        const configWithType = { type: element.type, config };
        ElementConfigSchema.parse(configWithType);
        return true;
    }
    catch (error) {
        console.error('Element config validation failed:', error);
        return false;
    }
};
// Element limits and constraints
export const ELEMENT_LIMITS = {
    MAX_ELEMENTS_PER_TOOL: 50,
    MAX_NESTING_DEPTH: 3,
    MAX_CONFIG_SIZE_KB: 10,
    RENDER_TIMEOUT_MS: 1000,
};
//# sourceMappingURL=element.js.map