import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export type ValidationRule = {
    type: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'custom';
    value?: any;
    message: string;
    validator?: (value: any) => boolean | Promise<boolean>;
};
export type FieldError = {
    type: string;
    message: string;
};
export type FormFieldState = {
    value: any;
    errors: FieldError[];
    touched: boolean;
    validating: boolean;
    valid: boolean;
};
export type FormState = {
    values: Record<string, any>;
    errors: Record<string, FieldError[]>;
    touched: Record<string, boolean>;
    validating: Record<string, boolean>;
    valid: boolean;
    submitting: boolean;
};
interface FormContextType {
    state: FormState;
    setValue: (name: string, value: any) => void;
    setError: (name: string, error: FieldError | null) => void;
    setTouched: (name: string, touched: boolean) => void;
    setValidating: (name: string, validating: boolean) => void;
    validateField: (name: string, value: any, rules: ValidationRule[]) => Promise<void>;
    resetForm: () => void;
    submitForm: () => Promise<void>;
    getFieldState: (name: string) => FormFieldState;
}
declare const FormContext: React.Context<FormContextType>;
declare const hiveFormFieldVariants: (props?: {
    variant?: "default" | "premium" | "minimal";
    state?: "default" | "success" | "error" | "validating";
} & import("class-variance-authority/types").ClassProp) => string;
declare const formInputVariants: (props?: {
    variant?: "default" | "premium" | "minimal";
    state?: "default" | "success" | "error" | "validating";
    size?: "default" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveFormProps {
    children: React.ReactNode;
    initialValues?: Record<string, any>;
    onSubmit?: (values: Record<string, any>) => Promise<void> | void;
    validationMode?: 'onChange' | 'onBlur' | 'onSubmit';
    className?: string;
}
export declare const HiveForm: React.FC<HiveFormProps>;
export declare function useFormField(name: string): {
    setValue: (value: any) => void;
    setError: (error: FieldError | null) => void;
    setTouched: (touched: boolean) => void;
    validate: (rules: ValidationRule[]) => Promise<void>;
    value: any;
    errors: FieldError[];
    touched: boolean;
    validating: boolean;
    valid: boolean;
};
export interface HiveFormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof formInputVariants> {
    name: string;
    label?: string;
    description?: string;
    rules?: ValidationRule[];
    showPasswordToggle?: boolean;
}
export declare const HiveFormInput: React.ForwardRefExoticComponent<HiveFormInputProps & React.RefAttributes<HTMLInputElement>>;
export interface HiveFormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label?: string;
    description?: string;
    rules?: ValidationRule[];
    variant?: 'default' | 'premium' | 'minimal';
}
export declare const HiveFormTextarea: React.ForwardRefExoticComponent<HiveFormTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export declare const validationRules: {
    required: (message?: string) => ValidationRule;
    minLength: (length: number, message?: string) => ValidationRule;
    maxLength: (length: number, message?: string) => ValidationRule;
    email: (message?: string) => ValidationRule;
    pattern: (regex: RegExp, message: string) => ValidationRule;
    custom: (validator: (value: any) => boolean | Promise<boolean>, message: string) => ValidationRule;
};
export { FormContext, hiveFormFieldVariants, formInputVariants };
//# sourceMappingURL=hive-form.d.ts.map