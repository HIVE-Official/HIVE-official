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
    height?: number | "full" | "auto";
    width?: number | "full" | "auto";
    fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
    fontWeight?: "bold" | "normal" | "medium" | "semibold";
    padding?: number;
    backgroundColor?: string;
    textAlign?: "center" | "right" | "left";
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    margin?: number;
    textColor?: string;
}, {
    height?: number | "full" | "auto";
    width?: number | "full" | "auto";
    fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
    fontWeight?: "bold" | "normal" | "medium" | "semibold";
    padding?: number;
    backgroundColor?: string;
    textAlign?: "center" | "right" | "left";
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    margin?: number;
    textColor?: string;
}>;
export declare const ConditionalRuleSchema: z.ZodObject<{
    id: z.ZodString;
    condition: z.ZodObject<{
        type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
        sourceElementId: z.ZodString;
        sourceProperty: z.ZodString;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
    }, "strip", z.ZodTypeAny, {
        type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
        value?: string | number | boolean;
        sourceElementId?: string;
        sourceProperty?: string;
    }, {
        type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
        value?: string | number | boolean;
        sourceElementId?: string;
        sourceProperty?: string;
    }>;
    actions: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
        targetElementId: z.ZodOptional<z.ZodString>;
        targetProperty: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
        value?: unknown;
        targetElementId?: string;
        targetProperty?: string;
    }, {
        type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
        value?: unknown;
        targetElementId?: string;
        targetProperty?: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id?: string;
    actions?: {
        type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
        value?: unknown;
        targetElementId?: string;
        targetProperty?: string;
    }[];
    condition?: {
        type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
        value?: string | number | boolean;
        sourceElementId?: string;
        sourceProperty?: string;
    };
}, {
    id?: string;
    actions?: {
        type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
        value?: unknown;
        targetElementId?: string;
        targetProperty?: string;
    }[];
    condition?: {
        type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
        value?: string | number | boolean;
        sourceElementId?: string;
        sourceProperty?: string;
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    text?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
}, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    text?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    alt?: string;
    src?: string;
    caption?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
}, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    alt?: string;
    src?: string;
    caption?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
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
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    style?: "solid" | "dashed" | "dotted";
    color?: string;
    margin?: number;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    thickness?: number;
}, {
    style?: "solid" | "dashed" | "dotted";
    color?: string;
    margin?: number;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    thickness?: number;
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    spacing?: number;
    direction?: "horizontal" | "vertical";
    wrap?: boolean;
    alignment?: "center" | "end" | "start" | "stretch";
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
}, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    spacing?: number;
    direction?: "horizontal" | "vertical";
    wrap?: boolean;
    alignment?: "center" | "end" | "start" | "stretch";
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
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
        type?: "submit" | "reset" | "custom" | "navigate";
        data?: Record<string, unknown>;
        target?: string;
    }, {
        type?: "submit" | "reset" | "custom" | "navigate";
        data?: Record<string, unknown>;
        target?: string;
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    onClick?: {
        type?: "submit" | "reset" | "custom" | "navigate";
        data?: Record<string, unknown>;
        target?: string;
    };
    text?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
}, {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    onClick?: {
        type?: "submit" | "reset" | "custom" | "navigate";
        data?: Record<string, unknown>;
        target?: string;
    };
    text?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
}>;
export declare const ChoiceSelectConfigSchema: z.ZodObject<{
    label: z.ZodString;
    options: z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        label: z.ZodString;
        disabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        disabled?: boolean;
        value?: string;
        label?: string;
    }, {
        disabled?: boolean;
        value?: string;
        label?: string;
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    multiple?: boolean;
    placeholder?: string;
    required?: boolean;
    label?: string;
    options?: {
        disabled?: boolean;
        value?: string;
        label?: string;
    }[];
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
}, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    multiple?: boolean;
    placeholder?: string;
    required?: boolean;
    label?: string;
    options?: {
        disabled?: boolean;
        value?: string;
        label?: string;
    }[];
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    type?: "number" | "text" | "tel" | "url" | "email" | "password";
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
}, {
    type?: "number" | "text" | "tel" | "url" | "email" | "password";
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    size?: "sm" | "md" | "lg";
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    color?: string;
    required?: boolean;
    label?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    maxRating?: number;
    allowHalf?: boolean;
}, {
    size?: "sm" | "md" | "lg";
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    color?: string;
    required?: boolean;
    label?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    maxRating?: number;
    allowHalf?: boolean;
}>;
export declare const CountdownTimerConfigSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    targetDate: z.ZodString;
    format: z.ZodDefault<z.ZodEnum<["days", "hours", "minutes", "seconds", "dhms"]>>;
    onComplete: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["message", "redirect", "trigger"]>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type?: "message" | "trigger" | "redirect";
        value?: string;
    }, {
        type?: "message" | "trigger" | "redirect";
        value?: string;
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    label?: string;
    format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
    onComplete?: {
        type?: "message" | "trigger" | "redirect";
        value?: string;
    };
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    targetDate?: string;
}, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    label?: string;
    format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
    onComplete?: {
        type?: "message" | "trigger" | "redirect";
        value?: string;
    };
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    targetDate?: string;
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    value?: number;
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    color?: string;
    height?: number;
    max?: number;
    label?: string;
    backgroundColor?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    showPercentage?: boolean;
}, {
    value?: number;
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    color?: string;
    height?: number;
    max?: number;
    label?: string;
    backgroundColor?: string;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    showPercentage?: boolean;
}>;
export declare const ConditionGateConfigSchema: z.ZodObject<{
    conditions: z.ZodArray<z.ZodObject<{
        sourceElementId: z.ZodString;
        sourceProperty: z.ZodString;
        operator: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan"]>;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
    }, "strip", z.ZodTypeAny, {
        value?: string | number | boolean;
        operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
        sourceElementId?: string;
        sourceProperty?: string;
    }, {
        value?: string | number | boolean;
        operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
        sourceElementId?: string;
        sourceProperty?: string;
    }>, "many">;
    logic: z.ZodDefault<z.ZodEnum<["and", "or"]>>;
    onTrue: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
        targetElementId: z.ZodString;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type?: "show" | "hide" | "trigger" | "setValue";
        value?: unknown;
        targetElementId?: string;
    }, {
        type?: "show" | "hide" | "trigger" | "setValue";
        value?: unknown;
        targetElementId?: string;
    }>, "many">;
    onFalse: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
        targetElementId: z.ZodString;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type?: "show" | "hide" | "trigger" | "setValue";
        value?: unknown;
        targetElementId?: string;
    }, {
        type?: "show" | "hide" | "trigger" | "setValue";
        value?: unknown;
        targetElementId?: string;
    }>, "many">>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    conditions?: {
        value?: string | number | boolean;
        operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
        sourceElementId?: string;
        sourceProperty?: string;
    }[];
    logic?: "and" | "or";
    onTrue?: {
        type?: "show" | "hide" | "trigger" | "setValue";
        value?: unknown;
        targetElementId?: string;
    }[];
    onFalse?: {
        type?: "show" | "hide" | "trigger" | "setValue";
        value?: unknown;
        targetElementId?: string;
    }[];
}, {
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    conditions?: {
        value?: string | number | boolean;
        operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
        sourceElementId?: string;
        sourceProperty?: string;
    }[];
    logic?: "and" | "or";
    onTrue?: {
        type?: "show" | "hide" | "trigger" | "setValue";
        value?: unknown;
        targetElementId?: string;
    }[];
    onFalse?: {
        type?: "show" | "hide" | "trigger" | "setValue";
        value?: unknown;
        targetElementId?: string;
    }[];
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
        type?: "element" | "external" | "analytics";
        url?: string;
        data?: Record<string, unknown>;
        event?: string;
        elementId?: string;
    }, {
        type?: "element" | "external" | "analytics";
        url?: string;
        data?: Record<string, unknown>;
        event?: string;
        elementId?: string;
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
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }, {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    }>>;
    conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        condition: z.ZodObject<{
            type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
            sourceElementId: z.ZodString;
            sourceProperty: z.ZodString;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        }, "strip", z.ZodTypeAny, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
            targetElementId: z.ZodOptional<z.ZodString>;
            targetProperty: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }, {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    label?: string;
    target?: {
        type?: "element" | "external" | "analytics";
        url?: string;
        data?: Record<string, unknown>;
        event?: string;
        elementId?: string;
    };
    delay?: number;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    triggerOn?: "timer" | "click" | "focus" | "hover";
}, {
    style?: {
        height?: number | "full" | "auto";
        width?: number | "full" | "auto";
        fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
        fontWeight?: "bold" | "normal" | "medium" | "semibold";
        padding?: number;
        backgroundColor?: string;
        textAlign?: "center" | "right" | "left";
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        margin?: number;
        textColor?: string;
    };
    label?: string;
    target?: {
        type?: "element" | "external" | "analytics";
        url?: string;
        data?: Record<string, unknown>;
        event?: string;
        elementId?: string;
    };
    delay?: number;
    conditionalRules?: {
        id?: string;
        actions?: {
            type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
            value?: unknown;
            targetElementId?: string;
            targetProperty?: string;
        }[];
        condition?: {
            type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        };
    }[];
    triggerOn?: "timer" | "click" | "focus" | "hover";
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        text?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        text?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "textBlock";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        text?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    };
}, {
    type?: "textBlock";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        text?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        alt?: string;
        src?: string;
        caption?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        alt?: string;
        src?: string;
        caption?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "imageBlock";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        alt?: string;
        src?: string;
        caption?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    };
}, {
    type?: "imageBlock";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        alt?: string;
        src?: string;
        caption?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
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
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        style?: "solid" | "dashed" | "dotted";
        color?: string;
        margin?: number;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        thickness?: number;
    }, {
        style?: "solid" | "dashed" | "dotted";
        color?: string;
        margin?: number;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        thickness?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "divider";
    config?: {
        style?: "solid" | "dashed" | "dotted";
        color?: string;
        margin?: number;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        thickness?: number;
    };
}, {
    type?: "divider";
    config?: {
        style?: "solid" | "dashed" | "dotted";
        color?: string;
        margin?: number;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        thickness?: number;
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        spacing?: number;
        direction?: "horizontal" | "vertical";
        wrap?: boolean;
        alignment?: "center" | "end" | "start" | "stretch";
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        spacing?: number;
        direction?: "horizontal" | "vertical";
        wrap?: boolean;
        alignment?: "center" | "end" | "start" | "stretch";
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "stack";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        spacing?: number;
        direction?: "horizontal" | "vertical";
        wrap?: boolean;
        alignment?: "center" | "end" | "start" | "stretch";
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    };
}, {
    type?: "stack";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        spacing?: number;
        direction?: "horizontal" | "vertical";
        wrap?: boolean;
        alignment?: "center" | "end" | "start" | "stretch";
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
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
            type?: "submit" | "reset" | "custom" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        }, {
            type?: "submit" | "reset" | "custom" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        variant?: "primary" | "secondary" | "outline" | "ghost";
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        onClick?: {
            type?: "submit" | "reset" | "custom" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        };
        text?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }, {
        variant?: "primary" | "secondary" | "outline" | "ghost";
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        onClick?: {
            type?: "submit" | "reset" | "custom" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        };
        text?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "button";
    config?: {
        variant?: "primary" | "secondary" | "outline" | "ghost";
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        onClick?: {
            type?: "submit" | "reset" | "custom" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        };
        text?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    };
}, {
    type?: "button";
    config?: {
        variant?: "primary" | "secondary" | "outline" | "ghost";
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        onClick?: {
            type?: "submit" | "reset" | "custom" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        };
        text?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
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
            disabled?: boolean;
            value?: string;
            label?: string;
        }, {
            disabled?: boolean;
            value?: string;
            label?: string;
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        multiple?: boolean;
        placeholder?: string;
        required?: boolean;
        label?: string;
        options?: {
            disabled?: boolean;
            value?: string;
            label?: string;
        }[];
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        multiple?: boolean;
        placeholder?: string;
        required?: boolean;
        label?: string;
        options?: {
            disabled?: boolean;
            value?: string;
            label?: string;
        }[];
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "choiceSelect";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        multiple?: boolean;
        placeholder?: string;
        required?: boolean;
        label?: string;
        options?: {
            disabled?: boolean;
            value?: string;
            label?: string;
        }[];
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    };
}, {
    type?: "choiceSelect";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        multiple?: boolean;
        placeholder?: string;
        required?: boolean;
        label?: string;
        options?: {
            disabled?: boolean;
            value?: string;
            label?: string;
        }[];
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        type?: "number" | "text" | "tel" | "url" | "email" | "password";
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        placeholder?: string;
        required?: boolean;
        label?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }, {
        type?: "number" | "text" | "tel" | "url" | "email" | "password";
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        placeholder?: string;
        required?: boolean;
        label?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "textInput";
    config?: {
        type?: "number" | "text" | "tel" | "url" | "email" | "password";
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        placeholder?: string;
        required?: boolean;
        label?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
    };
}, {
    type?: "textInput";
    config?: {
        type?: "number" | "text" | "tel" | "url" | "email" | "password";
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        placeholder?: string;
        required?: boolean;
        label?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        size?: "sm" | "md" | "lg";
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        color?: string;
        required?: boolean;
        label?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        maxRating?: number;
        allowHalf?: boolean;
    }, {
        size?: "sm" | "md" | "lg";
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        color?: string;
        required?: boolean;
        label?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        maxRating?: number;
        allowHalf?: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "ratingStars";
    config?: {
        size?: "sm" | "md" | "lg";
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        color?: string;
        required?: boolean;
        label?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        maxRating?: number;
        allowHalf?: boolean;
    };
}, {
    type?: "ratingStars";
    config?: {
        size?: "sm" | "md" | "lg";
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        color?: string;
        required?: boolean;
        label?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        maxRating?: number;
        allowHalf?: boolean;
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
            type?: "message" | "trigger" | "redirect";
            value?: string;
        }, {
            type?: "message" | "trigger" | "redirect";
            value?: string;
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        label?: string;
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
        onComplete?: {
            type?: "message" | "trigger" | "redirect";
            value?: string;
        };
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        targetDate?: string;
    }, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        label?: string;
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
        onComplete?: {
            type?: "message" | "trigger" | "redirect";
            value?: string;
        };
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        targetDate?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "countdownTimer";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        label?: string;
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
        onComplete?: {
            type?: "message" | "trigger" | "redirect";
            value?: string;
        };
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        targetDate?: string;
    };
}, {
    type?: "countdownTimer";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        label?: string;
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
        onComplete?: {
            type?: "message" | "trigger" | "redirect";
            value?: string;
        };
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        targetDate?: string;
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        value?: number;
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        color?: string;
        height?: number;
        max?: number;
        label?: string;
        backgroundColor?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        showPercentage?: boolean;
    }, {
        value?: number;
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        color?: string;
        height?: number;
        max?: number;
        label?: string;
        backgroundColor?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        showPercentage?: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "progressBar";
    config?: {
        value?: number;
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        color?: string;
        height?: number;
        max?: number;
        label?: string;
        backgroundColor?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        showPercentage?: boolean;
    };
}, {
    type?: "progressBar";
    config?: {
        value?: number;
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        color?: string;
        height?: number;
        max?: number;
        label?: string;
        backgroundColor?: string;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        showPercentage?: boolean;
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
            value?: string | number | boolean;
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            value?: string | number | boolean;
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            sourceElementId?: string;
            sourceProperty?: string;
        }>, "many">;
        logic: z.ZodDefault<z.ZodEnum<["and", "or"]>>;
        onTrue: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
            targetElementId: z.ZodString;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }>, "many">;
        onFalse: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["show", "hide", "setValue", "trigger"]>;
            targetElementId: z.ZodString;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }, {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }>, "many">>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        conditions?: {
            value?: string | number | boolean;
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            sourceElementId?: string;
            sourceProperty?: string;
        }[];
        logic?: "and" | "or";
        onTrue?: {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }[];
        onFalse?: {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }[];
    }, {
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        conditions?: {
            value?: string | number | boolean;
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            sourceElementId?: string;
            sourceProperty?: string;
        }[];
        logic?: "and" | "or";
        onTrue?: {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }[];
        onFalse?: {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "conditionGate";
    config?: {
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        conditions?: {
            value?: string | number | boolean;
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            sourceElementId?: string;
            sourceProperty?: string;
        }[];
        logic?: "and" | "or";
        onTrue?: {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }[];
        onFalse?: {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }[];
    };
}, {
    type?: "conditionGate";
    config?: {
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        conditions?: {
            value?: string | number | boolean;
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            sourceElementId?: string;
            sourceProperty?: string;
        }[];
        logic?: "and" | "or";
        onTrue?: {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }[];
        onFalse?: {
            type?: "show" | "hide" | "trigger" | "setValue";
            value?: unknown;
            targetElementId?: string;
        }[];
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
            type?: "element" | "external" | "analytics";
            url?: string;
            data?: Record<string, unknown>;
            event?: string;
            elementId?: string;
        }, {
            type?: "element" | "external" | "analytics";
            url?: string;
            data?: Record<string, unknown>;
            event?: string;
            elementId?: string;
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
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }, {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        }>>;
        conditionalRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            condition: z.ZodObject<{
                type: z.ZodEnum<["equals", "notEquals", "contains", "greaterThan", "lessThan", "isEmpty", "isNotEmpty"]>;
                sourceElementId: z.ZodString;
                sourceProperty: z.ZodString;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }, {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["show", "hide", "setValue", "setStyle", "trigger"]>;
                targetElementId: z.ZodOptional<z.ZodString>;
                targetProperty: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }, {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }, {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        label?: string;
        target?: {
            type?: "element" | "external" | "analytics";
            url?: string;
            data?: Record<string, unknown>;
            event?: string;
            elementId?: string;
        };
        delay?: number;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        triggerOn?: "timer" | "click" | "focus" | "hover";
    }, {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        label?: string;
        target?: {
            type?: "element" | "external" | "analytics";
            url?: string;
            data?: Record<string, unknown>;
            event?: string;
            elementId?: string;
        };
        delay?: number;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        triggerOn?: "timer" | "click" | "focus" | "hover";
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "pingTrigger";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        label?: string;
        target?: {
            type?: "element" | "external" | "analytics";
            url?: string;
            data?: Record<string, unknown>;
            event?: string;
            elementId?: string;
        };
        delay?: number;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        triggerOn?: "timer" | "click" | "focus" | "hover";
    };
}, {
    type?: "pingTrigger";
    config?: {
        style?: {
            height?: number | "full" | "auto";
            width?: number | "full" | "auto";
            fontSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "base" | "3xl";
            fontWeight?: "bold" | "normal" | "medium" | "semibold";
            padding?: number;
            backgroundColor?: string;
            textAlign?: "center" | "right" | "left";
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            margin?: number;
            textColor?: string;
        };
        label?: string;
        target?: {
            type?: "element" | "external" | "analytics";
            url?: string;
            data?: Record<string, unknown>;
            event?: string;
            elementId?: string;
        };
        delay?: number;
        conditionalRules?: {
            id?: string;
            actions?: {
                type?: "show" | "hide" | "trigger" | "setValue" | "setStyle";
                value?: unknown;
                targetElementId?: string;
                targetProperty?: string;
            }[];
            condition?: {
                type?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals" | "isEmpty" | "isNotEmpty";
                value?: string | number | boolean;
                sourceElementId?: string;
                sourceProperty?: string;
            };
        }[];
        triggerOn?: "timer" | "click" | "focus" | "hover";
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
    name?: string;
    id?: string;
    description?: string;
    config?: unknown;
    elementType?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    tags?: string[];
    popularity?: number;
}, {
    name?: string;
    id?: string;
    description?: string;
    config?: unknown;
    elementType?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    tags?: string[];
    popularity?: number;
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
        name?: string;
        id?: string;
        description?: string;
        config?: unknown;
        elementType?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        tags?: string[];
        popularity?: number;
    }, {
        name?: string;
        id?: string;
        description?: string;
        config?: unknown;
        elementType?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        tags?: string[];
        popularity?: number;
    }>, "many">>;
    isOfficial: z.ZodDefault<z.ZodBoolean>;
    isDeprecated: z.ZodDefault<z.ZodBoolean>;
    deprecationMessage: z.ZodOptional<z.ZodString>;
    usageCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    icon?: string;
    name?: string;
    type?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    id?: string;
    version?: number;
    description?: string;
    category?: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
    configSchema?: string;
    defaultConfig?: unknown;
    presets?: {
        name?: string;
        id?: string;
        description?: string;
        config?: unknown;
        elementType?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        tags?: string[];
        popularity?: number;
    }[];
    isOfficial?: boolean;
    isDeprecated?: boolean;
    deprecationMessage?: string;
    usageCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}, {
    icon?: string;
    name?: string;
    type?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    id?: string;
    version?: number;
    description?: string;
    category?: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
    configSchema?: string;
    defaultConfig?: unknown;
    presets?: {
        name?: string;
        id?: string;
        description?: string;
        config?: unknown;
        elementType?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        tags?: string[];
        popularity?: number;
    }[];
    isOfficial?: boolean;
    isDeprecated?: boolean;
    deprecationMessage?: string;
    usageCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
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
        height?: number;
        width?: number;
        x?: number;
        y?: number;
    }, {
        height?: number;
        width?: number;
        x?: number;
        y?: number;
    }>;
    parentId: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
    isVisible: z.ZodDefault<z.ZodBoolean>;
    isLocked: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    position?: {
        height?: number;
        width?: number;
        x?: number;
        y?: number;
    };
    order?: number;
    isVisible?: boolean;
    isLocked?: boolean;
    config?: unknown;
    elementId?: string;
    parentId?: string;
}, {
    id?: string;
    position?: {
        height?: number;
        width?: number;
        x?: number;
        y?: number;
    };
    order?: number;
    isVisible?: boolean;
    isLocked?: boolean;
    config?: unknown;
    elementId?: string;
    parentId?: string;
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