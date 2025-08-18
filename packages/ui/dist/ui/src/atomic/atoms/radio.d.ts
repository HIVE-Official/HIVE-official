import React from 'react';
export interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}
export interface RadioProps {
    name: string;
    options: RadioOption[];
    value?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'card';
    orientation?: 'vertical' | 'horizontal';
    error?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}
export interface SingleRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'card';
    error?: string;
}
export declare const SingleRadio: React.ForwardRefExoticComponent<SingleRadioProps & React.RefAttributes<HTMLInputElement>>;
export declare const Radio: React.FC<RadioProps>;
//# sourceMappingURL=radio.d.ts.map