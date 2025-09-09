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
    height?: number | "full" | "auto" | undefined;
    width?: number | "full" | "auto" | undefined;
    fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
    fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
    backgroundColor?: string | undefined;
    textAlign?: "left" | "center" | "right" | undefined;
    borderColor?: string | undefined;
    borderRadius?: number | undefined;
    borderWidth?: number | undefined;
    margin?: number | undefined;
    padding?: number | undefined;
    textColor?: string | undefined;
}, {
    height?: number | "full" | "auto" | undefined;
    width?: number | "full" | "auto" | undefined;
    fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
    fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
    backgroundColor?: string | undefined;
    textAlign?: "left" | "center" | "right" | undefined;
    borderColor?: string | undefined;
    borderRadius?: number | undefined;
    borderWidth?: number | undefined;
    margin?: number | undefined;
    padding?: number | undefined;
    textColor?: string | undefined;
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
        type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
        value?: unknown;
        targetElementId?: string | undefined;
        targetProperty?: string | undefined;
    }, {
        type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
        value?: unknown;
        targetElementId?: string | undefined;
        targetProperty?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    actions: {
        type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
        value?: unknown;
        targetElementId?: string | undefined;
        targetProperty?: string | undefined;
    }[];
    condition: {
        type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
        sourceElementId: string;
        sourceProperty: string;
        value?: string | number | boolean | undefined;
    };
}, {
    id: string;
    actions: {
        type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
        value?: unknown;
        targetElementId?: string | undefined;
        targetProperty?: string | undefined;
    }[];
    condition: {
        type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
        sourceElementId: string;
        sourceProperty: string;
        value?: string | number | boolean | undefined;
    };
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    text: string;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    text: string;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    alt: string;
    src: string;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    caption?: string | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    alt: string;
    src: string;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    caption?: string | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    style: "dashed" | "dotted" | "solid";
    color: string;
    margin: number;
    thickness: number;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    style?: "dashed" | "dotted" | "solid" | undefined;
    color?: string | undefined;
    margin?: number | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
    thickness?: number | undefined;
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    spacing: number;
    direction: "horizontal" | "vertical";
    wrap: boolean;
    alignment: "end" | "center" | "start" | "stretch";
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    spacing?: number | undefined;
    direction?: "horizontal" | "vertical" | undefined;
    wrap?: boolean | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
    alignment?: "end" | "center" | "start" | "stretch" | undefined;
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
        type: "submit" | "reset" | "custom" | "navigate";
        target?: string | undefined;
        data?: Record<string, unknown> | undefined;
    }, {
        type: "submit" | "reset" | "custom" | "navigate";
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    variant: "primary" | "secondary" | "ghost" | "outline";
    size: "sm" | "md" | "lg";
    disabled: boolean;
    text: string;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    onClick?: {
        type: "submit" | "reset" | "custom" | "navigate";
        target?: string | undefined;
        data?: Record<string, unknown> | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    text: string;
    variant?: "primary" | "secondary" | "ghost" | "outline" | undefined;
    size?: "sm" | "md" | "lg" | undefined;
    disabled?: boolean | undefined;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    onClick?: {
        type: "submit" | "reset" | "custom" | "navigate";
        target?: string | undefined;
        data?: Record<string, unknown> | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    multiple: boolean;
    required: boolean;
    label: string;
    options: {
        value: string;
        disabled: boolean;
        label: string;
    }[];
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    placeholder?: string | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    label: string;
    options: {
        value: string;
        label: string;
        disabled?: boolean | undefined;
    }[];
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    multiple?: boolean | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "number" | "email" | "text" | "tel" | "url" | "password";
    required: boolean;
    label: string;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    label: string;
    type?: "number" | "email" | "text" | "tel" | "url" | "password" | undefined;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    size: "sm" | "md" | "lg";
    color: string;
    required: boolean;
    label: string;
    maxRating: number;
    allowHalf: boolean;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    label: string;
    size?: "sm" | "md" | "lg" | undefined;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    color?: string | undefined;
    required?: boolean | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    format: "days" | "hours" | "minutes" | "seconds" | "dhms";
    targetDate: string;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    label?: string | undefined;
    onComplete?: {
        value: string;
        type: "message" | "trigger" | "redirect";
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    targetDate: string;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    format?: "days" | "hours" | "minutes" | "seconds" | "dhms" | undefined;
    label?: string | undefined;
    onComplete?: {
        value: string;
        type: "message" | "trigger" | "redirect";
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    value: number;
    color: string;
    height: number;
    max: number;
    backgroundColor: string;
    showPercentage: boolean;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    label?: string | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    value?: number | undefined;
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    color?: string | undefined;
    height?: number | undefined;
    max?: number | undefined;
    label?: string | undefined;
    backgroundColor?: string | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
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
        operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        sourceElementId: string;
        sourceProperty: string;
    }, {
        value: string | number | boolean;
        operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        sourceElementId: string;
        sourceProperty: string;
    }>, "many">;
    logic: z.ZodDefault<z.ZodEnum<["and", "or"]>>;
    onTrue: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
        targetElementId: z.ZodString;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type: "show" | "hide" | "trigger" | "setValue";
        targetElementId: string;
        value?: unknown;
    }, {
        type: "show" | "hide" | "trigger" | "setValue";
        targetElementId: string;
        value?: unknown;
    }>, "many">;
    onFalse: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
        targetElementId: z.ZodString;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type: "show" | "hide" | "trigger" | "setValue";
        targetElementId: string;
        value?: unknown;
    }, {
        type: "show" | "hide" | "trigger" | "setValue";
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    conditions: {
        value: string | number | boolean;
        operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        sourceElementId: string;
        sourceProperty: string;
    }[];
    logic: "and" | "or";
    onTrue: {
        type: "show" | "hide" | "trigger" | "setValue";
        targetElementId: string;
        value?: unknown;
    }[];
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
    onFalse?: {
        type: "show" | "hide" | "trigger" | "setValue";
        targetElementId: string;
        value?: unknown;
    }[] | undefined;
}, {
    conditions: {
        value: string | number | boolean;
        operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
        sourceElementId: string;
        sourceProperty: string;
    }[];
    onTrue: {
        type: "show" | "hide" | "trigger" | "setValue";
        targetElementId: string;
        value?: unknown;
    }[];
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
    logic?: "and" | "or" | undefined;
    onFalse?: {
        type: "show" | "hide" | "trigger" | "setValue";
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
        url?: string | undefined;
        data?: Record<string, unknown> | undefined;
        event?: string | undefined;
        elementId?: string | undefined;
    }, {
        type: "element" | "external" | "analytics";
        url?: string | undefined;
        data?: Record<string, unknown> | undefined;
        event?: string | undefined;
        elementId?: string | undefined;
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
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    }, {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
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
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }, {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }, {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    target: {
        type: "element" | "external" | "analytics";
        url?: string | undefined;
        data?: Record<string, unknown> | undefined;
        event?: string | undefined;
        elementId?: string | undefined;
    };
    label: string;
    delay: number;
    triggerOn: "timer" | "click" | "focus" | "hover";
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
}, {
    target: {
        type: "element" | "external" | "analytics";
        url?: string | undefined;
        data?: Record<string, unknown> | undefined;
        event?: string | undefined;
        elementId?: string | undefined;
    };
    label: string;
    triggerOn: "timer" | "click" | "focus" | "hover";
    style?: {
        height?: number | "full" | "auto" | undefined;
        width?: number | "full" | "auto" | undefined;
        fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
        fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
        backgroundColor?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        borderColor?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        margin?: number | undefined;
        padding?: number | undefined;
        textColor?: string | undefined;
    } | undefined;
    delay?: number | undefined;
    conditionalRules?: {
        id: string;
        actions: {
            type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string | undefined;
            targetProperty?: string | undefined;
        }[];
        condition: {
            type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            sourceElementId: string;
            sourceProperty: string;
            value?: string | number | boolean | undefined;
        };
    }[] | undefined;
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        text: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "textBlock";
    config: {
        text: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "textBlock";
    config: {
        text: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        alt: string;
        src: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        caption?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        alt: string;
        src: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        caption?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "imageBlock";
    config: {
        alt: string;
        src: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        caption?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "imageBlock";
    config: {
        alt: string;
        src: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        caption?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        style: "dashed" | "dotted" | "solid";
        color: string;
        margin: number;
        thickness: number;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        style?: "dashed" | "dotted" | "solid" | undefined;
        color?: string | undefined;
        margin?: number | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        thickness?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "divider";
    config: {
        style: "dashed" | "dotted" | "solid";
        color: string;
        margin: number;
        thickness: number;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "divider";
    config: {
        style?: "dashed" | "dotted" | "solid" | undefined;
        color?: string | undefined;
        margin?: number | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        thickness?: number | undefined;
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        spacing: number;
        direction: "horizontal" | "vertical";
        wrap: boolean;
        alignment: "end" | "center" | "start" | "stretch";
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        spacing?: number | undefined;
        direction?: "horizontal" | "vertical" | undefined;
        wrap?: boolean | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        alignment?: "end" | "center" | "start" | "stretch" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "stack";
    config: {
        spacing: number;
        direction: "horizontal" | "vertical";
        wrap: boolean;
        alignment: "end" | "center" | "start" | "stretch";
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "stack";
    config: {
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        spacing?: number | undefined;
        direction?: "horizontal" | "vertical" | undefined;
        wrap?: boolean | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        alignment?: "end" | "center" | "start" | "stretch" | undefined;
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
            type: "submit" | "reset" | "custom" | "navigate";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        }, {
            type: "submit" | "reset" | "custom" | "navigate";
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        variant: "primary" | "secondary" | "ghost" | "outline";
        size: "sm" | "md" | "lg";
        disabled: boolean;
        text: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        onClick?: {
            type: "submit" | "reset" | "custom" | "navigate";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        text: string;
        variant?: "primary" | "secondary" | "ghost" | "outline" | undefined;
        size?: "sm" | "md" | "lg" | undefined;
        disabled?: boolean | undefined;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        onClick?: {
            type: "submit" | "reset" | "custom" | "navigate";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "button";
    config: {
        variant: "primary" | "secondary" | "ghost" | "outline";
        size: "sm" | "md" | "lg";
        disabled: boolean;
        text: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        onClick?: {
            type: "submit" | "reset" | "custom" | "navigate";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "button";
    config: {
        text: string;
        variant?: "primary" | "secondary" | "ghost" | "outline" | undefined;
        size?: "sm" | "md" | "lg" | undefined;
        disabled?: boolean | undefined;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        onClick?: {
            type: "submit" | "reset" | "custom" | "navigate";
            target?: string | undefined;
            data?: Record<string, unknown> | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        multiple: boolean;
        required: boolean;
        label: string;
        options: {
            value: string;
            disabled: boolean;
            label: string;
        }[];
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        placeholder?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        label: string;
        options: {
            value: string;
            label: string;
            disabled?: boolean | undefined;
        }[];
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        multiple?: boolean | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "choiceSelect";
    config: {
        multiple: boolean;
        required: boolean;
        label: string;
        options: {
            value: string;
            disabled: boolean;
            label: string;
        }[];
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        placeholder?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "choiceSelect";
    config: {
        label: string;
        options: {
            value: string;
            label: string;
            disabled?: boolean | undefined;
        }[];
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        multiple?: boolean | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "email" | "text" | "tel" | "url" | "password";
        required: boolean;
        label: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        pattern?: string | undefined;
        placeholder?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        label: string;
        type?: "number" | "email" | "text" | "tel" | "url" | "password" | undefined;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        pattern?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "textInput";
    config: {
        type: "number" | "email" | "text" | "tel" | "url" | "password";
        required: boolean;
        label: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        pattern?: string | undefined;
        placeholder?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "textInput";
    config: {
        label: string;
        type?: "number" | "email" | "text" | "tel" | "url" | "password" | undefined;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        pattern?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        size: "sm" | "md" | "lg";
        color: string;
        required: boolean;
        label: string;
        maxRating: number;
        allowHalf: boolean;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        label: string;
        size?: "sm" | "md" | "lg" | undefined;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        color?: string | undefined;
        required?: boolean | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        maxRating?: number | undefined;
        allowHalf?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "ratingStars";
    config: {
        size: "sm" | "md" | "lg";
        color: string;
        required: boolean;
        label: string;
        maxRating: number;
        allowHalf: boolean;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "ratingStars";
    config: {
        label: string;
        size?: "sm" | "md" | "lg" | undefined;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        color?: string | undefined;
        required?: boolean | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        format: "days" | "hours" | "minutes" | "seconds" | "dhms";
        targetDate: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        label?: string | undefined;
        onComplete?: {
            value: string;
            type: "message" | "trigger" | "redirect";
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        targetDate: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms" | undefined;
        label?: string | undefined;
        onComplete?: {
            value: string;
            type: "message" | "trigger" | "redirect";
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "countdownTimer";
    config: {
        format: "days" | "hours" | "minutes" | "seconds" | "dhms";
        targetDate: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        label?: string | undefined;
        onComplete?: {
            value: string;
            type: "message" | "trigger" | "redirect";
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "countdownTimer";
    config: {
        targetDate: string;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms" | undefined;
        label?: string | undefined;
        onComplete?: {
            value: string;
            type: "message" | "trigger" | "redirect";
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        color: string;
        height: number;
        max: number;
        backgroundColor: string;
        showPercentage: boolean;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        label?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        value?: number | undefined;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        color?: string | undefined;
        height?: number | undefined;
        max?: number | undefined;
        label?: string | undefined;
        backgroundColor?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        showPercentage?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "progressBar";
    config: {
        value: number;
        color: string;
        height: number;
        max: number;
        backgroundColor: string;
        showPercentage: boolean;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        label?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "progressBar";
    config: {
        value?: number | undefined;
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        color?: string | undefined;
        height?: number | undefined;
        max?: number | undefined;
        label?: string | undefined;
        backgroundColor?: string | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
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
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
            sourceElementId: string;
            sourceProperty: string;
        }, {
            value: string | number | boolean;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
            sourceElementId: string;
            sourceProperty: string;
        }>, "many">;
        logic: z.ZodDefault<z.ZodEnum<["and", "or"]>>;
        onTrue: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
            targetElementId: z.ZodString;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }, {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }>, "many">;
        onFalse: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
            targetElementId: z.ZodString;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }, {
            type: "show" | "hide" | "trigger" | "setValue";
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            value: string | number | boolean;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
            sourceElementId: string;
            sourceProperty: string;
        }[];
        logic: "and" | "or";
        onTrue: {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }[];
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        onFalse?: {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }[] | undefined;
    }, {
        conditions: {
            value: string | number | boolean;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
            sourceElementId: string;
            sourceProperty: string;
        }[];
        onTrue: {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }[];
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        logic?: "and" | "or" | undefined;
        onFalse?: {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "conditionGate";
    config: {
        conditions: {
            value: string | number | boolean;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
            sourceElementId: string;
            sourceProperty: string;
        }[];
        logic: "and" | "or";
        onTrue: {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }[];
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        onFalse?: {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }[] | undefined;
    };
}, {
    type: "conditionGate";
    config: {
        conditions: {
            value: string | number | boolean;
            operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
            sourceElementId: string;
            sourceProperty: string;
        }[];
        onTrue: {
            type: "show" | "hide" | "trigger" | "setValue";
            targetElementId: string;
            value?: unknown;
        }[];
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
        logic?: "and" | "or" | undefined;
        onFalse?: {
            type: "show" | "hide" | "trigger" | "setValue";
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
            url?: string | undefined;
            data?: Record<string, unknown> | undefined;
            event?: string | undefined;
            elementId?: string | undefined;
        }, {
            type: "element" | "external" | "analytics";
            url?: string | undefined;
            data?: Record<string, unknown> | undefined;
            event?: string | undefined;
            elementId?: string | undefined;
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
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        }, {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
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
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }, {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }, {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        target: {
            type: "element" | "external" | "analytics";
            url?: string | undefined;
            data?: Record<string, unknown> | undefined;
            event?: string | undefined;
            elementId?: string | undefined;
        };
        label: string;
        delay: number;
        triggerOn: "timer" | "click" | "focus" | "hover";
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }, {
        target: {
            type: "element" | "external" | "analytics";
            url?: string | undefined;
            data?: Record<string, unknown> | undefined;
            event?: string | undefined;
            elementId?: string | undefined;
        };
        label: string;
        triggerOn: "timer" | "click" | "focus" | "hover";
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        delay?: number | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "pingTrigger";
    config: {
        target: {
            type: "element" | "external" | "analytics";
            url?: string | undefined;
            data?: Record<string, unknown> | undefined;
            event?: string | undefined;
            elementId?: string | undefined;
        };
        label: string;
        delay: number;
        triggerOn: "timer" | "click" | "focus" | "hover";
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
    };
}, {
    type: "pingTrigger";
    config: {
        target: {
            type: "element" | "external" | "analytics";
            url?: string | undefined;
            data?: Record<string, unknown> | undefined;
            event?: string | undefined;
            elementId?: string | undefined;
        };
        label: string;
        triggerOn: "timer" | "click" | "focus" | "hover";
        style?: {
            height?: number | "full" | "auto" | undefined;
            width?: number | "full" | "auto" | undefined;
            fontSize?: "xs" | "sm" | "lg" | "xl" | "base" | "2xl" | "3xl" | undefined;
            fontWeight?: "bold" | "normal" | "medium" | "semibold" | undefined;
            backgroundColor?: string | undefined;
            textAlign?: "left" | "center" | "right" | undefined;
            borderColor?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            margin?: number | undefined;
            padding?: number | undefined;
            textColor?: string | undefined;
        } | undefined;
        delay?: number | undefined;
        conditionalRules?: {
            id: string;
            actions: {
                type: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string | undefined;
                targetProperty?: string | undefined;
            }[];
            condition: {
                type: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
                sourceElementId: string;
                sourceProperty: string;
                value?: string | number | boolean | undefined;
            };
        }[] | undefined;
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
    popularity: number;
    elementType: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    config?: unknown;
    tags?: string[] | undefined;
}, {
    id: string;
    name: string;
    description: string;
    elementType: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    config?: unknown;
    popularity?: number | undefined;
    tags?: string[] | undefined;
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
        popularity: number;
        elementType: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        config?: unknown;
        tags?: string[] | undefined;
    }, {
        id: string;
        name: string;
        description: string;
        elementType: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        config?: unknown;
        popularity?: number | undefined;
        tags?: string[] | undefined;
    }>, "many">>;
    isOfficial: z.ZodDefault<z.ZodBoolean>;
    isDeprecated: z.ZodDefault<z.ZodBoolean>;
    deprecationMessage: z.ZodOptional<z.ZodString>;
    usageCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    icon: string;
    type: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    description: string;
    version: number;
    category: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
    usageCount: number;
    updatedAt: Date;
    configSchema: string;
    isOfficial: boolean;
    isDeprecated: boolean;
    createdAt: Date;
    defaultConfig?: unknown;
    presets?: {
        id: string;
        name: string;
        description: string;
        popularity: number;
        elementType: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        config?: unknown;
        tags?: string[] | undefined;
    }[] | undefined;
    deprecationMessage?: string | undefined;
}, {
    id: string;
    name: string;
    icon: string;
    type: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    description: string;
    version: number;
    category: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
    updatedAt: Date;
    configSchema: string;
    createdAt: Date;
    usageCount?: number | undefined;
    defaultConfig?: unknown;
    presets?: {
        id: string;
        name: string;
        description: string;
        elementType: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        config?: unknown;
        popularity?: number | undefined;
        tags?: string[] | undefined;
    }[] | undefined;
    isOfficial?: boolean | undefined;
    isDeprecated?: boolean | undefined;
    deprecationMessage?: string | undefined;
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
        height?: number | undefined;
        width?: number | undefined;
    }, {
        x: number;
        y: number;
        height?: number | undefined;
        width?: number | undefined;
    }>;
    parentId: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
    isVisible: z.ZodDefault<z.ZodBoolean>;
    isLocked: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    order: number;
    position: {
        x: number;
        y: number;
        height?: number | undefined;
        width?: number | undefined;
    };
    isVisible: boolean;
    isLocked: boolean;
    elementId: string;
    config?: unknown;
    parentId?: string | undefined;
}, {
    id: string;
    order: number;
    position: {
        x: number;
        y: number;
        height?: number | undefined;
        width?: number | undefined;
    };
    elementId: string;
    isVisible?: boolean | undefined;
    config?: unknown;
    isLocked?: boolean | undefined;
    parentId?: string | undefined;
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