import React from 'react';
import { Input as Input } from '../atoms/input-enhanced';
export interface FormFieldProps {
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    children: React.ReactElement;
    className?: string;
}
export declare const FormField: React.FC<FormFieldProps>;
export declare const TextFormField: React.FC<Omit<FormFieldProps, 'children'> & React.ComponentProps<typeof Input>>;
export declare const EmailFormField: React.FC<Omit<FormFieldProps, 'children'> & Omit<React.ComponentProps<typeof Input>, 'type'>>;
export declare const PasswordFormField: React.FC<Omit<FormFieldProps, 'children'> & Omit<React.ComponentProps<typeof Input>, 'type'>>;
//# sourceMappingURL=form-field.d.ts.map