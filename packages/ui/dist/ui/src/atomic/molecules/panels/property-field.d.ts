/**
 * Property Field Component
 *
 * Single configuration field in the properties panel.
 * Supports multiple field types: text, number, boolean, select, etc.
 */
export type PropertyFieldType = 'text' | 'number' | 'boolean' | 'select' | 'textarea' | 'color' | 'date';
export interface PropertyFieldProps {
    /** Field label */
    label: string;
    /** Field type */
    type: PropertyFieldType;
    /** Current value */
    value: any;
    /** Change handler */
    onChange: (value: any) => void;
    /** Is this field required? */
    required?: boolean;
    /** Help text */
    helpText?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Options (for select type) */
    options?: Array<{
        value: string;
        label: string;
    }>;
    /** Min value (for number type) */
    min?: number;
    /** Max value (for number type) */
    max?: number;
    /** Is field disabled? */
    disabled?: boolean;
    /** Additional class names */
    className?: string;
}
export declare function PropertyField({ label, type, value, onChange, required, helpText, placeholder, options, min, max, disabled, className, }: PropertyFieldProps): import("react/jsx-runtime").JSX.Element;
export declare namespace PropertyField {
    var displayName: string;
}
//# sourceMappingURL=property-field.d.ts.map