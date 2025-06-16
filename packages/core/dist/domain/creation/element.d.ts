import { z } from "zod";
export declare const ElementCategory: z.ZodEnum<["Display & Layout", "Inputs & Choices", "Logic & Dynamics"]>;
export type ElementCategory = z.infer<typeof ElementCategory>;
export declare const ElementId: z.ZodString;
export type ElementId = z.infer<typeof ElementId>;
export declare const ElementType: z.ZodEnum<["textBlock", "imageBlock", "divider", "stack", "button", "choiceSelect", "textInput", "ratingStars", "countdownTimer", "progressBar", "conditionGate", "pingTrigger"]>;
export type ElementType = z.infer<typeof ElementType>;
export declare const StyleConfigSchema: z.ZodObject<{
    backgroundColor: z.ZodOptional<z.ZodString>;
    textColor: z.ZodOptional<z.ZodString>;
    borderColor: z.ZodOptional<z.ZodString>;
    borderWidth: z.ZodOptional<z.ZodNumber>;
    borderRadius: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodNumber>;
    margin: z.ZodOptional<z.ZodNumber>;
    fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
    fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
}, "strip", z.ZodTypeAny, {
    backgroundColor?: string | undefined;
    textColor?: string | undefined;
    borderColor?: string | undefined;
    borderWidth?: number | undefined;
    borderRadius?: number | undefined;
    padding?: number | undefined;
    margin?: number | undefined;
    fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
    fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
    textAlign?: "left" | "center" | "right" | undefined;
    width?: number | "auto" | "full" | undefined;
    height?: number | "auto" | "full" | undefined;
}, {
    backgroundColor?: string | undefined;
    textColor?: string | undefined;
    borderColor?: string | undefined;
    borderWidth?: number | undefined;
    borderRadius?: number | undefined;
    padding?: number | undefined;
    margin?: number | undefined;
    fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
    fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
    textAlign?: "left" | "center" | "right" | undefined;
    width?: number | "auto" | "full" | undefined;
    height?: number | "auto" | "full" | undefined;
}>;
export declare const ConditionalRuleSchema: z.ZodObject<{
    id: z.ZodString;
    condition: z.ZodObject<{
        type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
        sourceElementId: z.ZodString;
        sourceProperty: z.ZodString;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
    }, "strip", z.ZodTypeAny, {
        type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
        sourceElementId: string;
        sourceProperty: string;
        value?: string | number | boolean | undefined;
    }, {
        type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
        sourceElementId: string;
        sourceProperty: string;
        value?: string | number | boolean | undefined;
    }>;
    actions: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
        targetElementId: z.ZodOptional<z.ZodString>;
        targetProperty: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
        value?: unknown;
        targetElementId?: string | undefined;
        targetProperty?: string | undefined;
    }, {
        type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
        value?: unknown;
        targetElementId?: string | undefined;
        targetProperty?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    condition: {
        type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
        sourceElementId: string;
        sourceProperty: string;
        value?: string | number | boolean | undefined;
    };
    actions: {
        type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
        value?: unknown;
        targetElementId?: string | undefined;
        targetProperty?: string | undefined;
    }[];
}, {
    id: string;
    condition: {
        type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
        sourceElementId: string;
        sourceProperty: string;
        value?: string | number | boolean | undefined;
    };
    actions: {
        type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
        value?: unknown;
        targetElementId?: string | undefined;
        targetProperty?: string | undefined;
    }[];
}>;
export declare const TextBlockConfigSchema: z.ZodObject<{
    text: z.ZodString;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    text: string;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
}, {
    text: string;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
}>;
export declare const ImageBlockConfigSchema: z.ZodObject<{
    src: z.ZodString;
    alt: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    src: string;
    alt: string;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    caption?: string | undefined;
}, {
    src: string;
    alt: string;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    caption?: string | undefined;
}>;
export declare const DividerConfigSchema: z.ZodObject<{
    thickness: z.ZodDefault<z.ZodNumber>;
    color: z.ZodDefault<z.ZodString>;
    style: z.ZodDefault<z.ZodEnum<["solid", "dashed", "dotted"]>>;
    margin: z.ZodDefault<z.ZodNumber>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    margin: number;
    style: "solid" | "dashed" | "dotted";
    thickness: number;
    color: string;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
}, {
    margin?: number | undefined;
    style?: "solid" | "dashed" | "dotted" | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    thickness?: number | undefined;
    color?: string | undefined;
}>;
export declare const StackConfigSchema: z.ZodObject<{
    direction: z.ZodDefault<z.ZodEnum<["vertical", "horizontal"]>>;
    spacing: z.ZodDefault<z.ZodNumber>;
    alignment: z.ZodDefault<z.ZodEnum<["start", "center", "end", "stretch"]>>;
    wrap: z.ZodDefault<z.ZodBoolean>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    direction: "vertical" | "horizontal";
    spacing: number;
    alignment: "center" | "start" | "end" | "stretch";
    wrap: boolean;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
}, {
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    direction?: "vertical" | "horizontal" | undefined;
    spacing?: number | undefined;
    alignment?: "center" | "start" | "end" | "stretch" | undefined;
    wrap?: boolean | undefined;
}>;
export declare const ButtonConfigSchema: z.ZodObject<{
    text: z.ZodString;
    variant: z.ZodDefault<z.ZodEnum<["primary", "secondary", "outline", "ghost"]>>;
    size: z.ZodDefault<z.ZodEnum<["sm", "md", "lg"]>>;
    disabled: z.ZodDefault<z.ZodBoolean>;
    onClick: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["navigate", "submit", "reset", "custom"]>;
        target: z.ZodOptional<z.ZodString>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        type: "custom" | "navigate" | "submit" | "reset";
        target?: string | undefined;
        data?: Record<string, unknown> | undefined;
    }, {
        type: "custom" | "navigate" | "submit" | "reset";
        target?: string | undefined;
        data?: Record<string, unknown> | undefined;
    }>>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    text: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
    size: "sm" | "lg" | "md";
    disabled: boolean;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    onClick?: {
        type: "custom" | "navigate" | "submit" | "reset";
        target?: string | undefined;
        data?: Record<string, unknown> | undefined;
    } | undefined;
}, {
    text: string;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    variant?: "primary" | "secondary" | "outline" | "ghost" | undefined;
    size?: "sm" | "lg" | "md" | undefined;
    disabled?: boolean | undefined;
    onClick?: {
        type: "custom" | "navigate" | "submit" | "reset";
        target?: string | undefined;
        data?: Record<string, unknown> | undefined;
    } | undefined;
}>;
export declare const ChoiceSelectConfigSchema: z.ZodObject<{
    label: z.ZodString;
    options: z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        label: z.ZodString;
        disabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        disabled: boolean;
        label: string;
    }, {
        value: string;
        label: string;
        disabled?: boolean | undefined;
    }>, "many">;
    multiple: z.ZodDefault<z.ZodBoolean>;
    required: z.ZodDefault<z.ZodBoolean>;
    placeholder: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    options: {
        value: string;
        disabled: boolean;
        label: string;
    }[];
    label: string;
    multiple: boolean;
    required: boolean;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    placeholder?: string | undefined;
}, {
    options: {
        value: string;
        label: string;
        disabled?: boolean | undefined;
    }[];
    label: string;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    multiple?: boolean | undefined;
    required?: boolean | undefined;
    placeholder?: string | undefined;
}>;
export declare const TextInputConfigSchema: z.ZodObject<{
    label: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<["text", "email", "password", "number", "tel", "url"]>>;
    required: z.ZodDefault<z.ZodBoolean>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    pattern: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "number" | "text" | "email" | "password" | "tel" | "url";
    label: string;
    required: boolean;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    placeholder?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    pattern?: string | undefined;
}, {
    label: string;
    type?: "number" | "text" | "email" | "password" | "tel" | "url" | undefined;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    required?: boolean | undefined;
    placeholder?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    pattern?: string | undefined;
}>;
export declare const RatingStarsConfigSchema: z.ZodObject<{
    label: z.ZodString;
    maxRating: z.ZodDefault<z.ZodNumber>;
    allowHalf: z.ZodDefault<z.ZodBoolean>;
    required: z.ZodDefault<z.ZodBoolean>;
    size: z.ZodDefault<z.ZodEnum<["sm", "md", "lg"]>>;
    color: z.ZodDefault<z.ZodString>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    color: string;
    size: "sm" | "lg" | "md";
    label: string;
    required: boolean;
    maxRating: number;
    allowHalf: boolean;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
}, {
    label: string;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    color?: string | undefined;
    size?: "sm" | "lg" | "md" | undefined;
    required?: boolean | undefined;
    maxRating?: number | undefined;
    allowHalf?: boolean | undefined;
}>;
export declare const CountdownTimerConfigSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    targetDate: z.ZodString;
    format: z.ZodDefault<z.ZodEnum<["days", "hours", "minutes", "seconds", "dhms"]>>;
    onComplete: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["message", "redirect", "trigger"]>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: "message" | "trigger" | "redirect";
    }, {
        value: string;
        type: "message" | "trigger" | "redirect";
    }>>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    targetDate: string;
    format: "days" | "hours" | "minutes" | "seconds" | "dhms";
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    label?: string | undefined;
    onComplete?: {
        value: string;
        type: "message" | "trigger" | "redirect";
    } | undefined;
}, {
    targetDate: string;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    label?: string | undefined;
    format?: "days" | "hours" | "minutes" | "seconds" | "dhms" | undefined;
    onComplete?: {
        value: string;
        type: "message" | "trigger" | "redirect";
    } | undefined;
}>;
export declare const ProgressBarConfigSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    value: z.ZodDefault<z.ZodNumber>;
    max: z.ZodDefault<z.ZodNumber>;
    showPercentage: z.ZodDefault<z.ZodBoolean>;
    color: z.ZodDefault<z.ZodString>;
    backgroundColor: z.ZodDefault<z.ZodString>;
    height: z.ZodDefault<z.ZodNumber>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    value: number;
    backgroundColor: string;
    height: number;
    color: string;
    max: number;
    showPercentage: boolean;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    label?: string | undefined;
}, {
    value?: number | undefined;
    backgroundColor?: string | undefined;
    height?: number | undefined;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    color?: string | undefined;
    label?: string | undefined;
    max?: number | undefined;
    showPercentage?: boolean | undefined;
}>;
export declare const ConditionGateConfigSchema: z.ZodObject<{
    conditions: z.ZodArray<z.ZodObject<{
        sourceElementId: z.ZodString;
        sourceProperty: z.ZodString;
        operator: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan"]>;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
    }, "strip", z.ZodTypeAny, {
        value: string | number | boolean;
        sourceElementId: string;
        sourceProperty: string;
        operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
    }, {
        value: string | number | boolean;
        sourceElementId: string;
        sourceProperty: string;
        operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
    }>, "many">;
    logic: z.ZodDefault<z.ZodEnum<["and", "or"]>>;
    onTrue: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
        targetElementId: z.ZodString;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type: "show" | "hide" | "setValue" | "trigger";
        targetElementId: string;
        value?: unknown;
    }, {
        type: "show" | "hide" | "setValue" | "trigger";
        targetElementId: string;
        value?: unknown;
    }>, "many">;
    onFalse: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
        targetElementId: z.ZodString;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type: "show" | "hide" | "setValue" | "trigger";
        targetElementId: string;
        value?: unknown;
    }, {
        type: "show" | "hide" | "setValue" | "trigger";
        targetElementId: string;
        value?: unknown;
    }>, "many">>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    conditions: {
        value: string | number | boolean;
        sourceElementId: string;
        sourceProperty: string;
        operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
    }[];
    logic: "and" | "or";
    onTrue: {
        type: "show" | "hide" | "setValue" | "trigger";
        targetElementId: string;
        value?: unknown;
    }[];
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    onFalse?: {
        type: "show" | "hide" | "setValue" | "trigger";
        targetElementId: string;
        value?: unknown;
    }[] | undefined;
}, {
    conditions: {
        value: string | number | boolean;
        sourceElementId: string;
        sourceProperty: string;
        operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
    }[];
    onTrue: {
        type: "show" | "hide" | "setValue" | "trigger";
        targetElementId: string;
        value?: unknown;
    }[];
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    logic?: "and" | "or" | undefined;
    onFalse?: {
        type: "show" | "hide" | "setValue" | "trigger";
        targetElementId: string;
        value?: unknown;
    }[] | undefined;
}>;
export declare const PingTriggerConfigSchema: z.ZodObject<{
    label: z.ZodString;
    triggerOn: z.ZodEnum<["click", "hover", "focus", "timer"]>;
    delay: z.ZodDefault<z.ZodNumber>;
    target: z.ZodObject<{
        type: z.ZodEnum<["element", "external", "analytics"]>;
        elementId: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        event: z.ZodOptional<z.ZodString>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        type: "element" | "external" | "analytics";
        data?: Record<string, unknown> | undefined;
        url?: string | undefined;
        elementId?: string | undefined;
        event?: string | undefined;
    }, {
        type: "element" | "external" | "analytics";
        data?: Record<string, unknown> | undefined;
        url?: string | undefined;
        elementId?: string | undefined;
        event?: string | undefined;
    }>;
    style: z.ZodOptional<z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        textColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodNumber>;
        fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
        fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }, {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }, {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    target: {
        type: "element" | "external" | "analytics";
        data?: Record<string, unknown> | undefined;
        url?: string | undefined;
        elementId?: string | undefined;
        event?: string | undefined;
    };
    label: string;
    triggerOn: "click" | "hover" | "focus" | "timer";
    delay: number;
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
}, {
    target: {
        type: "element" | "external" | "analytics";
        data?: Record<string, unknown> | undefined;
        url?: string | undefined;
        elementId?: string | undefined;
        event?: string | undefined;
    };
    label: string;
    triggerOn: "click" | "hover" | "focus" | "timer";
    style?: {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        borderColor?: string | undefined;
        borderWidth?: number | undefined;
        borderRadius?: number | undefined;
        padding?: number | undefined;
        margin?: number | undefined;
        fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        width?: number | "auto" | "full" | undefined;
        height?: number | "auto" | "full" | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
        actions: {
            type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
    }[] | undefined;
    delay?: number | undefined;
}>;
export declare const ElementConfigSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"textBlock">;
    config: z.ZodObject<{
        text: z.ZodString;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    }, {
        text: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "textBlock";
    config: {
        text: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    };
}, {
    type: "textBlock";
    config: {
        text: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"imageBlock">;
    config: z.ZodObject<{
        src: z.ZodString;
        alt: z.ZodString;
        caption: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        alt: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        caption?: string | undefined;
    }, {
        src: string;
        alt: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        caption?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "imageBlock";
    config: {
        src: string;
        alt: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        caption?: string | undefined;
    };
}, {
    type: "imageBlock";
    config: {
        src: string;
        alt: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        caption?: string | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"divider">;
    config: z.ZodObject<{
        thickness: z.ZodDefault<z.ZodNumber>;
        color: z.ZodDefault<z.ZodString>;
        style: z.ZodDefault<z.ZodEnum<["solid", "dashed", "dotted"]>>;
        margin: z.ZodDefault<z.ZodNumber>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        margin: number;
        style: "solid" | "dashed" | "dotted";
        thickness: number;
        color: string;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    }, {
        margin?: number | undefined;
        style?: "solid" | "dashed" | "dotted" | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        thickness?: number | undefined;
        color?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "divider";
    config: {
        margin: number;
        style: "solid" | "dashed" | "dotted";
        thickness: number;
        color: string;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    };
}, {
    type: "divider";
    config: {
        margin?: number | undefined;
        style?: "solid" | "dashed" | "dotted" | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        thickness?: number | undefined;
        color?: string | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"stack">;
    config: z.ZodObject<{
        direction: z.ZodDefault<z.ZodEnum<["vertical", "horizontal"]>>;
        spacing: z.ZodDefault<z.ZodNumber>;
        alignment: z.ZodDefault<z.ZodEnum<["start", "center", "end", "stretch"]>>;
        wrap: z.ZodDefault<z.ZodBoolean>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        direction: "vertical" | "horizontal";
        spacing: number;
        alignment: "center" | "start" | "end" | "stretch";
        wrap: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    }, {
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        direction?: "vertical" | "horizontal" | undefined;
        spacing?: number | undefined;
        alignment?: "center" | "start" | "end" | "stretch" | undefined;
        wrap?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "stack";
    config: {
        direction: "vertical" | "horizontal";
        spacing: number;
        alignment: "center" | "start" | "end" | "stretch";
        wrap: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    };
}, {
    type: "stack";
    config: {
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        direction?: "vertical" | "horizontal" | undefined;
        spacing?: number | undefined;
        alignment?: "center" | "start" | "end" | "stretch" | undefined;
        wrap?: boolean | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"button">;
    config: z.ZodObject<{
        text: z.ZodString;
        variant: z.ZodDefault<z.ZodEnum<["primary", "secondary", "outline", "ghost"]>>;
        size: z.ZodDefault<z.ZodEnum<["sm", "md", "lg"]>>;
        disabled: z.ZodDefault<z.ZodBoolean>;
        onClick: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<["navigate", "submit", "reset", "custom"]>;
            target: z.ZodOptional<z.ZodString>;
            data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            type: "custom" | "navigate" | "submit" | "reset";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        }, {
            type: "custom" | "navigate" | "submit" | "reset";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        }>>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        variant: "primary" | "secondary" | "outline" | "ghost";
        size: "sm" | "lg" | "md";
        disabled: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        onClick?: {
            type: "custom" | "navigate" | "submit" | "reset";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        } | undefined;
    }, {
        text: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        variant?: "primary" | "secondary" | "outline" | "ghost" | undefined;
        size?: "sm" | "lg" | "md" | undefined;
        disabled?: boolean | undefined;
        onClick?: {
            type: "custom" | "navigate" | "submit" | "reset";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "button";
    config: {
        text: string;
        variant: "primary" | "secondary" | "outline" | "ghost";
        size: "sm" | "lg" | "md";
        disabled: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        onClick?: {
            type: "custom" | "navigate" | "submit" | "reset";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        } | undefined;
    };
}, {
    type: "button";
    config: {
        text: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        variant?: "primary" | "secondary" | "outline" | "ghost" | undefined;
        size?: "sm" | "lg" | "md" | undefined;
        disabled?: boolean | undefined;
        onClick?: {
            type: "custom" | "navigate" | "submit" | "reset";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        } | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"choiceSelect">;
    config: z.ZodObject<{
        label: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            label: z.ZodString;
            disabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            disabled: boolean;
            label: string;
        }, {
            value: string;
            label: string;
            disabled?: boolean | undefined;
        }>, "many">;
        multiple: z.ZodDefault<z.ZodBoolean>;
        required: z.ZodDefault<z.ZodBoolean>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        options: {
            value: string;
            disabled: boolean;
            label: string;
        }[];
        label: string;
        multiple: boolean;
        required: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        placeholder?: string | undefined;
    }, {
        options: {
            value: string;
            label: string;
            disabled?: boolean | undefined;
        }[];
        label: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        multiple?: boolean | undefined;
        required?: boolean | undefined;
        placeholder?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "choiceSelect";
    config: {
        options: {
            value: string;
            disabled: boolean;
            label: string;
        }[];
        label: string;
        multiple: boolean;
        required: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        placeholder?: string | undefined;
    };
}, {
    type: "choiceSelect";
    config: {
        options: {
            value: string;
            label: string;
            disabled?: boolean | undefined;
        }[];
        label: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        multiple?: boolean | undefined;
        required?: boolean | undefined;
        placeholder?: string | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"textInput">;
    config: z.ZodObject<{
        label: z.ZodString;
        placeholder: z.ZodOptional<z.ZodString>;
        type: z.ZodDefault<z.ZodEnum<["text", "email", "password", "number", "tel", "url"]>>;
        required: z.ZodDefault<z.ZodBoolean>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        pattern: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "text" | "email" | "password" | "tel" | "url";
        label: string;
        required: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        placeholder?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | undefined;
    }, {
        label: string;
        type?: "number" | "text" | "email" | "password" | "tel" | "url" | undefined;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        required?: boolean | undefined;
        placeholder?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "textInput";
    config: {
        type: "number" | "text" | "email" | "password" | "tel" | "url";
        label: string;
        required: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        placeholder?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | undefined;
    };
}, {
    type: "textInput";
    config: {
        label: string;
        type?: "number" | "text" | "email" | "password" | "tel" | "url" | undefined;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        required?: boolean | undefined;
        placeholder?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"ratingStars">;
    config: z.ZodObject<{
        label: z.ZodString;
        maxRating: z.ZodDefault<z.ZodNumber>;
        allowHalf: z.ZodDefault<z.ZodBoolean>;
        required: z.ZodDefault<z.ZodBoolean>;
        size: z.ZodDefault<z.ZodEnum<["sm", "md", "lg"]>>;
        color: z.ZodDefault<z.ZodString>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        color: string;
        size: "sm" | "lg" | "md";
        label: string;
        required: boolean;
        maxRating: number;
        allowHalf: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    }, {
        label: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        color?: string | undefined;
        size?: "sm" | "lg" | "md" | undefined;
        required?: boolean | undefined;
        maxRating?: number | undefined;
        allowHalf?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "ratingStars";
    config: {
        color: string;
        size: "sm" | "lg" | "md";
        label: string;
        required: boolean;
        maxRating: number;
        allowHalf: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    };
}, {
    type: "ratingStars";
    config: {
        label: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        color?: string | undefined;
        size?: "sm" | "lg" | "md" | undefined;
        required?: boolean | undefined;
        maxRating?: number | undefined;
        allowHalf?: boolean | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"countdownTimer">;
    config: z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        targetDate: z.ZodString;
        format: z.ZodDefault<z.ZodEnum<["days", "hours", "minutes", "seconds", "dhms"]>>;
        onComplete: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<["message", "redirect", "trigger"]>;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            type: "message" | "trigger" | "redirect";
        }, {
            value: string;
            type: "message" | "trigger" | "redirect";
        }>>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        targetDate: string;
        format: "days" | "hours" | "minutes" | "seconds" | "dhms";
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        label?: string | undefined;
        onComplete?: {
            value: string;
            type: "message" | "trigger" | "redirect";
        } | undefined;
    }, {
        targetDate: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        label?: string | undefined;
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms" | undefined;
        onComplete?: {
            value: string;
            type: "message" | "trigger" | "redirect";
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "countdownTimer";
    config: {
        targetDate: string;
        format: "days" | "hours" | "minutes" | "seconds" | "dhms";
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        label?: string | undefined;
        onComplete?: {
            value: string;
            type: "message" | "trigger" | "redirect";
        } | undefined;
    };
}, {
    type: "countdownTimer";
    config: {
        targetDate: string;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        label?: string | undefined;
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms" | undefined;
        onComplete?: {
            value: string;
            type: "message" | "trigger" | "redirect";
        } | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"progressBar">;
    config: z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        value: z.ZodDefault<z.ZodNumber>;
        max: z.ZodDefault<z.ZodNumber>;
        showPercentage: z.ZodDefault<z.ZodBoolean>;
        color: z.ZodDefault<z.ZodString>;
        backgroundColor: z.ZodDefault<z.ZodString>;
        height: z.ZodDefault<z.ZodNumber>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        backgroundColor: string;
        height: number;
        color: string;
        max: number;
        showPercentage: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        label?: string | undefined;
    }, {
        value?: number | undefined;
        backgroundColor?: string | undefined;
        height?: number | undefined;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        color?: string | undefined;
        label?: string | undefined;
        max?: number | undefined;
        showPercentage?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "progressBar";
    config: {
        value: number;
        backgroundColor: string;
        height: number;
        color: string;
        max: number;
        showPercentage: boolean;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        label?: string | undefined;
    };
}, {
    type: "progressBar";
    config: {
        value?: number | undefined;
        backgroundColor?: string | undefined;
        height?: number | undefined;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        color?: string | undefined;
        label?: string | undefined;
        max?: number | undefined;
        showPercentage?: boolean | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"conditionGate">;
    config: z.ZodObject<{
        conditions: z.ZodArray<z.ZodObject<{
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            operator: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan"]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean;
            sourceElementId: string;
            sourceProperty: string;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        }, {
            value: string | number | boolean;
            sourceElementId: string;
            sourceProperty: string;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        }>, "many">;
        logic: z.ZodDefault<z.ZodEnum<["and", "or"]>>;
        onTrue: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
            targetElementId: z.ZodString;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }, {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }>, "many">;
        onFalse: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
            targetElementId: z.ZodString;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }, {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }>, "many">>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            value: string | number | boolean;
            sourceElementId: string;
            sourceProperty: string;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        }[];
        logic: "and" | "or";
        onTrue: {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }[];
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        onFalse?: {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }[] | undefined;
    }, {
        conditions: {
            value: string | number | boolean;
            sourceElementId: string;
            sourceProperty: string;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        }[];
        onTrue: {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }[];
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        logic?: "and" | "or" | undefined;
        onFalse?: {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "conditionGate";
    config: {
        conditions: {
            value: string | number | boolean;
            sourceElementId: string;
            sourceProperty: string;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        }[];
        logic: "and" | "or";
        onTrue: {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }[];
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        onFalse?: {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }[] | undefined;
    };
}, {
    type: "conditionGate";
    config: {
        conditions: {
            value: string | number | boolean;
            sourceElementId: string;
            sourceProperty: string;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        }[];
        onTrue: {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }[];
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        logic?: "and" | "or" | undefined;
        onFalse?: {
            type: "show" | "hide" | "setValue" | "trigger";
            targetElementId: string;
            value?: unknown;
        }[] | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"pingTrigger">;
    config: z.ZodObject<{
        label: z.ZodString;
        triggerOn: z.ZodEnum<["click", "hover", "focus", "timer"]>;
        delay: z.ZodDefault<z.ZodNumber>;
        target: z.ZodObject<{
            type: z.ZodEnum<["element", "external", "analytics"]>;
            elementId: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            event: z.ZodOptional<z.ZodString>;
            data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            type: "element" | "external" | "analytics";
            data?: Record<string, unknown> | undefined;
            url?: string | undefined;
            elementId?: string | undefined;
            event?: string | undefined;
        }, {
            type: "element" | "external" | "analytics";
            data?: Record<string, unknown> | undefined;
            url?: string | undefined;
            elementId?: string | undefined;
            event?: string | undefined;
        }>;
        style: z.ZodOptional<z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodNumber>;
            margin: z.ZodOptional<z.ZodNumber>;
            fontSize: z.ZodOptional<z.ZodEnum<["xs", "sm", "base", "lg", "xl", "2xl", "3xl"]>>;
            fontWeight: z.ZodOptional<z.ZodEnum<["normal", "medium", "semibold", "bold"]>>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["auto", "full"]>]>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }, {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }, {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }, {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        target: {
            type: "element" | "external" | "analytics";
            data?: Record<string, unknown> | undefined;
            url?: string | undefined;
            elementId?: string | undefined;
            event?: string | undefined;
        };
        label: string;
        triggerOn: "click" | "hover" | "focus" | "timer";
        delay: number;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    }, {
        target: {
            type: "element" | "external" | "analytics";
            data?: Record<string, unknown> | undefined;
            url?: string | undefined;
            elementId?: string | undefined;
            event?: string | undefined;
        };
        label: string;
        triggerOn: "click" | "hover" | "focus" | "timer";
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        delay?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "pingTrigger";
    config: {
        target: {
            type: "element" | "external" | "analytics";
            data?: Record<string, unknown> | undefined;
            url?: string | undefined;
            elementId?: string | undefined;
            event?: string | undefined;
        };
        label: string;
        triggerOn: "click" | "hover" | "focus" | "timer";
        delay: number;
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
    };
}, {
    type: "pingTrigger";
    config: {
        target: {
            type: "element" | "external" | "analytics";
            data?: Record<string, unknown> | undefined;
            url?: string | undefined;
            elementId?: string | undefined;
            event?: string | undefined;
        };
        label: string;
        triggerOn: "click" | "hover" | "focus" | "timer";
        style?: {
            backgroundColor?: string | undefined;
            textColor?: string | undefined;
            borderColor?: string | undefined;
            borderWidth?: number | undefined;
            borderRadius?: number | undefined;
            padding?: number | undefined;
            margin?: number | undefined;
            fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            width?: number | "auto" | "full" | undefined;
            height?: number | "auto" | "full" | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
            actions: {
                type: "show" | "hide" | "setValue" | "setStyle" | "trigger";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
        }[] | undefined;
        delay?: number | undefined;
    };
}>]>;
export declare const ElementPresetSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    elementType: z.ZodEnum<["textBlock", "imageBlock", "divider", "stack", "button", "choiceSelect", "textInput", "ratingStars", "countdownTimer", "progressBar", "conditionGate", "pingTrigger"]>;
    config: z.ZodUnknown;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    popularity: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    description: string;
    elementType: "textBlock" | "imageBlock" | "divider" | "stack" | "button" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    popularity: number;
    config?: unknown;
    tags?: string[] | undefined;
}, {
    id: string;
    name: string;
    description: string;
    elementType: "textBlock" | "imageBlock" | "divider" | "stack" | "button" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    config?: unknown;
    tags?: string[] | undefined;
    popularity?: number | undefined;
}>;
export declare const ElementSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["textBlock", "imageBlock", "divider", "stack", "button", "choiceSelect", "textInput", "ratingStars", "countdownTimer", "progressBar", "conditionGate", "pingTrigger"]>;
    category: z.ZodEnum<["Display & Layout", "Inputs & Choices", "Logic & Dynamics"]>;
    description: z.ZodString;
    icon: z.ZodString;
    version: z.ZodNumber;
    configSchema: z.ZodString;
    defaultConfig: z.ZodUnknown;
    presets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        elementType: z.ZodEnum<["textBlock", "imageBlock", "divider", "stack", "button", "choiceSelect", "textInput", "ratingStars", "countdownTimer", "progressBar", "conditionGate", "pingTrigger"]>;
        config: z.ZodUnknown;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        popularity: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        description: string;
        elementType: "textBlock" | "imageBlock" | "divider" | "stack" | "button" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        popularity: number;
        config?: unknown;
        tags?: string[] | undefined;
    }, {
        id: string;
        name: string;
        description: string;
        elementType: "textBlock" | "imageBlock" | "divider" | "stack" | "button" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        config?: unknown;
        tags?: string[] | undefined;
        popularity?: number | undefined;
    }>, "many">>;
    isOfficial: z.ZodDefault<z.ZodBoolean>;
    isDeprecated: z.ZodDefault<z.ZodBoolean>;
    deprecationMessage: z.ZodOptional<z.ZodString>;
    usageCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    type: "textBlock" | "imageBlock" | "divider" | "stack" | "button" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    id: string;
    name: string;
    description: string;
    category: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
    icon: string;
    version: number;
    configSchema: string;
    isOfficial: boolean;
    isDeprecated: boolean;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
    defaultConfig?: unknown;
    presets?: {
        id: string;
        name: string;
        description: string;
        elementType: "textBlock" | "imageBlock" | "divider" | "stack" | "button" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        popularity: number;
        config?: unknown;
        tags?: string[] | undefined;
    }[] | undefined;
    deprecationMessage?: string | undefined;
}, {
    type: "textBlock" | "imageBlock" | "divider" | "stack" | "button" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    id: string;
    name: string;
    description: string;
    category: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
    icon: string;
    version: number;
    configSchema: string;
    createdAt: Date;
    updatedAt: Date;
    defaultConfig?: unknown;
    presets?: {
        id: string;
        name: string;
        description: string;
        elementType: "textBlock" | "imageBlock" | "divider" | "stack" | "button" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        config?: unknown;
        tags?: string[] | undefined;
        popularity?: number | undefined;
    }[] | undefined;
    isOfficial?: boolean | undefined;
    isDeprecated?: boolean | undefined;
    deprecationMessage?: string | undefined;
    usageCount?: number | undefined;
}>;
export type Element = z.infer<typeof ElementSchema>;
export type ElementConfig = z.infer<typeof ElementConfigSchema>;
export type ElementPreset = z.infer<typeof ElementPresetSchema>;
export declare const ElementInstanceSchema: z.ZodObject<{
    id: z.ZodString;
    elementId: z.ZodString;
    config: z.ZodUnknown;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
        width?: number | undefined;
        height?: number | undefined;
    }, {
        x: number;
        y: number;
        width?: number | undefined;
        height?: number | undefined;
    }>;
    parentId: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
    isVisible: z.ZodDefault<z.ZodBoolean>;
    isLocked: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    elementId: string;
    position: {
        x: number;
        y: number;
        width?: number | undefined;
        height?: number | undefined;
    };
    order: number;
    isVisible: boolean;
    isLocked: boolean;
    config?: unknown;
    parentId?: string | undefined;
}, {
    id: string;
    elementId: string;
    position: {
        x: number;
        y: number;
        width?: number | undefined;
        height?: number | undefined;
    };
    order: number;
    config?: unknown;
    parentId?: string | undefined;
    isVisible?: boolean | undefined;
    isLocked?: boolean | undefined;
}>;
export type ElementInstance = z.infer<typeof ElementInstanceSchema>;
export declare const parseElementId: (elementId: ElementId) => {
    name: string;
    version: number;
};
export declare const createElementId: (name: string, version: number) => ElementId;
export declare const getLatestElementVersion: (elements: Element[], baseName: string) => Element | null;
export declare const validateElementConfig: (element: Element, config: unknown) => boolean;
export declare const ELEMENT_LIMITS: {
    readonly MAX_ELEMENTS_PER_TOOL: 50;
    readonly MAX_NESTING_DEPTH: 3;
    readonly MAX_CONFIG_SIZE_KB: 10;
    readonly RENDER_TIMEOUT_MS: 1000;
};
//# sourceMappingURL=element.d.ts.map