import React from 'react';
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    required?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'inline' | 'floating';
    disabled?: boolean;
    children: React.ReactNode;
}
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
//# sourceMappingURL=label.d.ts.map