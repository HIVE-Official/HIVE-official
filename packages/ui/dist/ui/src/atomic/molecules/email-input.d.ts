import React from 'react';
export interface EmailInputProps {
    value?: string;
    onChange?: (value: string) => void;
    domain?: string;
    placeholder?: string;
    label?: string;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare const EmailInput: React.ForwardRefExoticComponent<EmailInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=email-input.d.ts.map