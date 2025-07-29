import type { Element } from "@hive/core";
export type ConfigValue = string | number | boolean | null | undefined;
export type ConfigObject = Record<string, ConfigValue | ConfigValue[]>;
export interface PropertySchema {
    /** Property key in the config object */
    key: string;
    /** Display label for the property */
    label: string;
    /** Input type for editing */
    type: "text" | "textarea" | "number" | "boolean" | "select" | "color" | "url";
    /** Default value if not set */
    defaultValue?: ConfigValue;
    /** Whether this property is required */
    required?: boolean;
    /** Placeholder text for inputs */
    placeholder?: string;
    /** Options for select type */
    options?: Array<{
        label: string;
        value: ConfigValue;
    }>;
    /** Minimum value for number type */
    min?: number;
    /** Maximum value for number type */
    max?: number;
    /** Help text to display */
    helpText?: string;
    /** Validation function */
    validate?: (value: ConfigValue) => string | null;
}
export interface ElementConfigSchema {
    /** Element type this schema applies to */
    elementType: string;
    /** Display name for this element type */
    displayName: string;
    /** Property configurations */
    properties: PropertySchema[];
    /** Configuration presets */
    presets?: Array<{
        name: string;
        description: string;
        config: ConfigObject;
    }>;
}
export interface ElementConfigPanelProps {
    /** The currently selected element instance */
    selectedElement?: {
        id: string;
        elementId: string;
        elementType: string;
        config: ConfigObject;
    } | null;
    /** Available element definitions */
    elements: Element[];
    /** Callback when element config changes */
    onConfigChange: (elementId: string, config: ConfigObject) => void;
    /** Whether the panel is in preview mode */
    isPreview?: boolean;
    /** Optional CSS class name */
    className?: string;
}
export interface PropertyInputProps {
    /** Property schema definition */
    property: PropertySchema;
    /** Current value */
    value: ConfigValue;
    /** Callback when value changes */
    onChange: (value: ConfigValue) => void;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Optional CSS class name */
    className?: string;
}
export interface ConfigPresetProps {
    /** Available presets for this element type */
    presets: Array<{
        name: string;
        description: string;
        config: ConfigObject;
    }>;
    /** Callback when preset is selected */
    onPresetSelect: (config: ConfigObject) => void;
    /** Optional CSS class name */
    className?: string;
}
//# sourceMappingURL=types.d.ts.map