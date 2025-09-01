import * as React from "react";
import { type InputProps } from "../ui/input";
export interface FormFieldProps extends Omit<InputProps, 'id'> {
    id?: string;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    required?: boolean;
    showOptional?: boolean;
    success?: boolean;
}
export declare const FormField: React.ForwardRefExoticComponent<Omit<FormFieldProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export declare const FormFieldPresets: {
    EmailField: (props: Omit<FormFieldProps, "type" | "placeholder" | "label">) => import("react/jsx-runtime").JSX.Element;
    PasswordField: (props: Omit<FormFieldProps, "type" | "label">) => import("react/jsx-runtime").JSX.Element;
    RequiredTextField: (props: Omit<FormFieldProps, "required">) => import("react/jsx-runtime").JSX.Element;
    SearchField: (props: Omit<FormFieldProps, "type" | "placeholder">) => import("react/jsx-runtime").JSX.Element;
};
export { FormField as FormFieldMolecule };
//# sourceMappingURL=form-field.d.ts.map