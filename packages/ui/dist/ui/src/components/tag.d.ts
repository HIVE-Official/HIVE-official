import React from 'react';
export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'filled' | 'ghost' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'gold' | 'ruby' | 'emerald' | 'sapphire';
    removable?: boolean;
    disabled?: boolean;
    interactive?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRemove?: () => void;
    children: React.ReactNode;
}
export declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLDivElement>>;
export declare const PrimaryTag: React.FC<Omit<TagProps, 'color'>>;
export declare const SuccessTag: React.FC<Omit<TagProps, 'color'>>;
export declare const WarningTag: React.FC<Omit<TagProps, 'color'>>;
export declare const ErrorTag: React.FC<Omit<TagProps, 'color'>>;
export declare const RemovableTag: React.FC<Omit<TagProps, 'removable'>>;
export declare const InteractiveTag: React.FC<Omit<TagProps, 'interactive'>>;
export declare const OutlineTag: React.FC<Omit<TagProps, 'variant'>>;
export declare const GhostTag: React.FC<Omit<TagProps, 'variant'>>;
export declare const GradientTag: React.FC<Omit<TagProps, 'variant'>>;
//# sourceMappingURL=tag.d.ts.map