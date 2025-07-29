import React from 'react';
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'defaultValue'> {
    min?: number;
    max?: number;
    step?: number;
    value?: number | [number, number];
    defaultValue?: number | [number, number];
    range?: boolean;
    marks?: Record<number, string | React.ReactNode>;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outline' | 'ghost';
    color?: 'primary' | 'success' | 'warning' | 'error' | 'gold' | 'emerald' | 'sapphire';
    showValue?: boolean;
    showMarks?: boolean;
    vertical?: boolean;
    disabled?: boolean;
    label?: string;
    formatValue?: (value: number) => string;
    onChange?: (value: number | [number, number]) => void;
    onChangeEnd?: (value: number | [number, number]) => void;
}
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>>;
export declare const RangeSlider: React.FC<Omit<SliderProps, 'range'>>;
export declare const VerticalSlider: React.FC<Omit<SliderProps, 'vertical'>>;
export declare const PrimarySlider: React.FC<Omit<SliderProps, 'color'>>;
export declare const SuccessSlider: React.FC<Omit<SliderProps, 'color'>>;
export declare const WarningSlider: React.FC<Omit<SliderProps, 'color'>>;
export declare const ErrorSlider: React.FC<Omit<SliderProps, 'color'>>;
//# sourceMappingURL=slider.d.ts.map