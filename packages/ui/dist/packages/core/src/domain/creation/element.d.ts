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
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
    fontWeight?: "bold" | "medium" | "normal" | "semibold";
    height?: number | "auto" | "full";
    margin?: number;
    padding?: number;
    textAlign?: "center" | "left" | "right";
    width?: number | "auto" | "full";
    textColor?: string;
}, {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
    fontWeight?: "bold" | "medium" | "normal" | "semibold";
    height?: number | "auto" | "full";
    margin?: number;
    padding?: number;
    textAlign?: "center" | "left" | "right";
    width?: number | "auto" | "full";
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    caption?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    alt?: string;
    src?: string;
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
    caption?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    alt?: string;
    src?: string;
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
    color?: string;
    margin?: number;
    style?: "dashed" | "dotted" | "solid";
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
    color?: string;
    margin?: number;
    style?: "dashed" | "dotted" | "solid";
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    direction?: "horizontal" | "vertical";
    spacing?: number;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
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
    direction?: "horizontal" | "vertical";
    spacing?: number;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
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
        type?: "custom" | "reset" | "submit" | "navigate";
        data?: Record<string, unknown>;
        target?: string;
    }, {
        type?: "custom" | "reset" | "submit" | "navigate";
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    size?: "sm" | "lg" | "md";
    disabled?: boolean;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    text?: string;
    onClick?: {
        type?: "custom" | "reset" | "submit" | "navigate";
        data?: Record<string, unknown>;
        target?: string;
    };
    variant?: "outline" | "primary" | "secondary" | "ghost";
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
    size?: "sm" | "lg" | "md";
    disabled?: boolean;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    text?: string;
    onClick?: {
        type?: "custom" | "reset" | "submit" | "navigate";
        data?: Record<string, unknown>;
        target?: string;
    };
    variant?: "outline" | "primary" | "secondary" | "ghost";
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
        label?: string;
        value?: string;
    }, {
        disabled?: boolean;
        label?: string;
        value?: string;
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    multiple?: boolean;
    placeholder?: string;
    required?: boolean;
    options?: {
        disabled?: boolean;
        label?: string;
        value?: string;
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
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    multiple?: boolean;
    placeholder?: string;
    required?: boolean;
    options?: {
        disabled?: boolean;
        label?: string;
        value?: string;
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    pattern?: string;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    required?: boolean;
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
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    pattern?: string;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    required?: boolean;
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    size?: "sm" | "lg" | "md";
    color?: string;
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    required?: boolean;
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
    size?: "sm" | "lg" | "md";
    color?: string;
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    required?: boolean;
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
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
    onComplete?: {
        type?: "message" | "trigger" | "redirect";
        value?: string;
    };
}, {
    format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
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
    onComplete?: {
        type?: "message" | "trigger" | "redirect";
        value?: string;
    };
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    backgroundColor?: string;
    color?: string;
    height?: number;
    max?: number;
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    value?: number;
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
    backgroundColor?: string;
    color?: string;
    height?: number;
    max?: number;
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    value?: number;
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
        operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
        value?: string | number | boolean;
        sourceElementId?: string;
        sourceProperty?: string;
    }, {
        operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
        value?: string | number | boolean;
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
        operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
        value?: string | number | boolean;
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
        operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
        value?: string | number | boolean;
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
        type?: "analytics" | "element" | "external";
        data?: Record<string, unknown>;
        url?: string;
        elementId?: string;
        event?: string;
    }, {
        type?: "analytics" | "element" | "external";
        data?: Record<string, unknown>;
        url?: string;
        elementId?: string;
        event?: string;
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
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    }, {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
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
    delay?: number;
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    target?: {
        type?: "analytics" | "element" | "external";
        data?: Record<string, unknown>;
        url?: string;
        elementId?: string;
        event?: string;
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
    triggerOn?: "hover" | "click" | "focus" | "timer";
}, {
    delay?: number;
    label?: string;
    style?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
        fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
        fontWeight?: "bold" | "medium" | "normal" | "semibold";
        height?: number | "auto" | "full";
        margin?: number;
        padding?: number;
        textAlign?: "center" | "left" | "right";
        width?: number | "auto" | "full";
        textColor?: string;
    };
    target?: {
        type?: "analytics" | "element" | "external";
        data?: Record<string, unknown>;
        url?: string;
        elementId?: string;
        event?: string;
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
    triggerOn?: "hover" | "click" | "focus" | "timer";
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        caption?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        alt?: string;
        src?: string;
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
        caption?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        alt?: string;
        src?: string;
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
        caption?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        alt?: string;
        src?: string;
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
        caption?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        alt?: string;
        src?: string;
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
        color?: string;
        margin?: number;
        style?: "dashed" | "dotted" | "solid";
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
        color?: string;
        margin?: number;
        style?: "dashed" | "dotted" | "solid";
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
        color?: string;
        margin?: number;
        style?: "dashed" | "dotted" | "solid";
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
        color?: string;
        margin?: number;
        style?: "dashed" | "dotted" | "solid";
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        direction?: "horizontal" | "vertical";
        spacing?: number;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
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
        direction?: "horizontal" | "vertical";
        spacing?: number;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
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
        direction?: "horizontal" | "vertical";
        spacing?: number;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
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
        direction?: "horizontal" | "vertical";
        spacing?: number;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
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
            type?: "custom" | "reset" | "submit" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        }, {
            type?: "custom" | "reset" | "submit" | "navigate";
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        size?: "sm" | "lg" | "md";
        disabled?: boolean;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        text?: string;
        onClick?: {
            type?: "custom" | "reset" | "submit" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        };
        variant?: "outline" | "primary" | "secondary" | "ghost";
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
        size?: "sm" | "lg" | "md";
        disabled?: boolean;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        text?: string;
        onClick?: {
            type?: "custom" | "reset" | "submit" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        };
        variant?: "outline" | "primary" | "secondary" | "ghost";
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
        size?: "sm" | "lg" | "md";
        disabled?: boolean;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        text?: string;
        onClick?: {
            type?: "custom" | "reset" | "submit" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        };
        variant?: "outline" | "primary" | "secondary" | "ghost";
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
        size?: "sm" | "lg" | "md";
        disabled?: boolean;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        text?: string;
        onClick?: {
            type?: "custom" | "reset" | "submit" | "navigate";
            data?: Record<string, unknown>;
            target?: string;
        };
        variant?: "outline" | "primary" | "secondary" | "ghost";
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
            label?: string;
            value?: string;
        }, {
            disabled?: boolean;
            label?: string;
            value?: string;
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        multiple?: boolean;
        placeholder?: string;
        required?: boolean;
        options?: {
            disabled?: boolean;
            label?: string;
            value?: string;
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
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        multiple?: boolean;
        placeholder?: string;
        required?: boolean;
        options?: {
            disabled?: boolean;
            label?: string;
            value?: string;
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
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        multiple?: boolean;
        placeholder?: string;
        required?: boolean;
        options?: {
            disabled?: boolean;
            label?: string;
            value?: string;
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
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        multiple?: boolean;
        placeholder?: string;
        required?: boolean;
        options?: {
            disabled?: boolean;
            label?: string;
            value?: string;
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        pattern?: string;
        maxLength?: number;
        minLength?: number;
        placeholder?: string;
        required?: boolean;
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
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        pattern?: string;
        maxLength?: number;
        minLength?: number;
        placeholder?: string;
        required?: boolean;
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
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        pattern?: string;
        maxLength?: number;
        minLength?: number;
        placeholder?: string;
        required?: boolean;
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
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        pattern?: string;
        maxLength?: number;
        minLength?: number;
        placeholder?: string;
        required?: boolean;
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        size?: "sm" | "lg" | "md";
        color?: string;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        required?: boolean;
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
        size?: "sm" | "lg" | "md";
        color?: string;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        required?: boolean;
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
        size?: "sm" | "lg" | "md";
        color?: string;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        required?: boolean;
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
        size?: "sm" | "lg" | "md";
        color?: string;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        required?: boolean;
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
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
        onComplete?: {
            type?: "message" | "trigger" | "redirect";
            value?: string;
        };
    }, {
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
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
        onComplete?: {
            type?: "message" | "trigger" | "redirect";
            value?: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "countdownTimer";
    config?: {
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
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
        onComplete?: {
            type?: "message" | "trigger" | "redirect";
            value?: string;
        };
    };
}, {
    type?: "countdownTimer";
    config?: {
        format?: "days" | "hours" | "minutes" | "seconds" | "dhms";
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
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
        onComplete?: {
            type?: "message" | "trigger" | "redirect";
            value?: string;
        };
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        backgroundColor?: string;
        color?: string;
        height?: number;
        max?: number;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        value?: number;
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
        backgroundColor?: string;
        color?: string;
        height?: number;
        max?: number;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        value?: number;
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
        backgroundColor?: string;
        color?: string;
        height?: number;
        max?: number;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        value?: number;
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
        backgroundColor?: string;
        color?: string;
        height?: number;
        max?: number;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        value?: number;
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
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            value?: string | number | boolean;
            sourceElementId?: string;
            sourceProperty?: string;
        }, {
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            value?: string | number | boolean;
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
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            value?: string | number | boolean;
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
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            value?: string | number | boolean;
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
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            value?: string | number | boolean;
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
            operator?: "equals" | "contains" | "greaterThan" | "lessThan" | "notEquals";
            value?: string | number | boolean;
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
            type?: "analytics" | "element" | "external";
            data?: Record<string, unknown>;
            url?: string;
            elementId?: string;
            event?: string;
        }, {
            type?: "analytics" | "element" | "external";
            data?: Record<string, unknown>;
            url?: string;
            elementId?: string;
            event?: string;
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
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        }, {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
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
        delay?: number;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        target?: {
            type?: "analytics" | "element" | "external";
            data?: Record<string, unknown>;
            url?: string;
            elementId?: string;
            event?: string;
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
        triggerOn?: "hover" | "click" | "focus" | "timer";
    }, {
        delay?: number;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        target?: {
            type?: "analytics" | "element" | "external";
            data?: Record<string, unknown>;
            url?: string;
            elementId?: string;
            event?: string;
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
        triggerOn?: "hover" | "click" | "focus" | "timer";
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "pingTrigger";
    config?: {
        delay?: number;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        target?: {
            type?: "analytics" | "element" | "external";
            data?: Record<string, unknown>;
            url?: string;
            elementId?: string;
            event?: string;
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
        triggerOn?: "hover" | "click" | "focus" | "timer";
    };
}, {
    type?: "pingTrigger";
    config?: {
        delay?: number;
        label?: string;
        style?: {
            backgroundColor?: string;
            borderColor?: string;
            borderRadius?: number;
            borderWidth?: number;
            fontSize?: "base" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
            fontWeight?: "bold" | "medium" | "normal" | "semibold";
            height?: number | "auto" | "full";
            margin?: number;
            padding?: number;
            textAlign?: "center" | "left" | "right";
            width?: number | "auto" | "full";
            textColor?: string;
        };
        target?: {
            type?: "analytics" | "element" | "external";
            data?: Record<string, unknown>;
            url?: string;
            elementId?: string;
            event?: string;
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
        triggerOn?: "hover" | "click" | "focus" | "timer";
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
    id?: string;
    name?: string;
    description?: string;
    config?: unknown;
    elementType?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    tags?: string[];
    popularity?: number;
}, {
    id?: string;
    name?: string;
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
        id?: string;
        name?: string;
        description?: string;
        config?: unknown;
        elementType?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
        tags?: string[];
        popularity?: number;
    }, {
        id?: string;
        name?: string;
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
    version?: number;
    type?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    id?: string;
    icon?: string;
    name?: string;
    updatedAt?: Date;
    description?: string;
    category?: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
    configSchema?: string;
    defaultConfig?: unknown;
    presets?: {
        id?: string;
        name?: string;
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
}, {
    version?: number;
    type?: "button" | "textBlock" | "imageBlock" | "divider" | "stack" | "choiceSelect" | "textInput" | "ratingStars" | "countdownTimer" | "progressBar" | "conditionGate" | "pingTrigger";
    id?: string;
    icon?: string;
    name?: string;
    updatedAt?: Date;
    description?: string;
    category?: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
    configSchema?: string;
    defaultConfig?: unknown;
    presets?: {
        id?: string;
        name?: string;
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
        x?: number;
        y?: number;
        height?: number;
        width?: number;
    }, {
        x?: number;
        y?: number;
        height?: number;
        width?: number;
    }>;
    parentId: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
    isVisible: z.ZodDefault<z.ZodBoolean>;
    isLocked: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    order?: number;
    position?: {
        x?: number;
        y?: number;
        height?: number;
        width?: number;
    };
    id?: string;
    elementId?: string;
    config?: unknown;
    parentId?: string;
    isVisible?: boolean;
    isLocked?: boolean;
}, {
    order?: number;
    position?: {
        x?: number;
        y?: number;
        height?: number;
        width?: number;
    };
    id?: string;
    elementId?: string;
    config?: unknown;
    parentId?: string;
    isVisible?: boolean;
    isLocked?: boolean;
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