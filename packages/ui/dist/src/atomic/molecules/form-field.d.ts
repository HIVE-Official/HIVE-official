import * as React from "react";
export interface FormFieldProps {
    children: React.ReactNode;
    className?: string;
}
declare const FormField: React.ForwardRefExoticComponent<FormFieldProps & React.RefAttributes<HTMLDivElement>>;
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
}
declare const FormLabel: React.ForwardRefExoticComponent<FormLabelProps & React.RefAttributes<HTMLLabelElement>>;
export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const FormControl: React.ForwardRefExoticComponent<FormControlProps & React.RefAttributes<HTMLDivElement>>;
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
declare const FormDescription: React.ForwardRefExoticComponent<FormDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
declare const FormMessage: React.ForwardRefExoticComponent<FormMessageProps & React.RefAttributes<HTMLParagraphElement>>;
export { FormField, FormLabel, FormControl, FormDescription, FormMessage, };
//# sourceMappingURL=form-field.d.ts.map