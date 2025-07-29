import React from 'react';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: 'default' | 'outline' | 'filled' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    maxLength?: number;
    showCount?: boolean;
    fullWidth?: boolean;
}
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=textarea.d.ts.map