import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const moduleVariants: (props?: {
    variant?: "base" | "gold" | "minimal" | "selected" | "elevated" | "clickable" | "selectable" | "gold-strong";
    size?: "sm" | "md" | "lg" | "xs";
    rounded?: "sm" | "md" | "lg" | "none";
    connector?: "none" | "bottom" | "left" | "right" | "top" | "horizontal" | "vertical";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ModularCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof moduleVariants> {
    stackable?: boolean;
    connectable?: boolean;
}
declare const ModularCard: React.ForwardRefExoticComponent<ModularCardProps & React.RefAttributes<HTMLDivElement>>;
declare const HeaderModule: ({ children, ...props }: ModularCardProps) => import("react/jsx-runtime").JSX.Element;
declare const ContentModule: ({ children, ...props }: ModularCardProps) => import("react/jsx-runtime").JSX.Element;
declare const FooterModule: ({ children, ...props }: ModularCardProps) => import("react/jsx-runtime").JSX.Element;
declare const AccentModule: ({ children, ...props }: ModularCardProps) => import("react/jsx-runtime").JSX.Element;
declare const ActionModule: ({ children, ...props }: ModularCardProps) => import("react/jsx-runtime").JSX.Element;
declare const ModularStack: ({ children, gap, direction }: {
    children: React.ReactNode;
    gap?: string;
    direction?: "vertical" | "horizontal";
}) => import("react/jsx-runtime").JSX.Element;
declare const ModularGrid: ({ children, columns, gap }: {
    children: React.ReactNode;
    columns?: number;
    gap?: string;
}) => import("react/jsx-runtime").JSX.Element;
export interface HiveModularCardProps extends ModularCardProps {
    modules?: {
        header?: any;
        content?: any;
        media?: any;
        stats?: any;
        actions?: any;
        footer?: any;
    };
    layout?: 'vertical' | 'horizontal' | 'grid' | 'flexible';
    loading?: boolean;
    error?: any;
    skeleton?: any;
    draggable?: boolean;
    compact?: boolean;
    premium?: boolean;
    interactive?: boolean;
    onModuleClick?: (moduleType: string) => void;
    onActionClick?: (action: string) => void;
    onCardHover?: (hovered: boolean) => void;
}
export declare const HiveModularCard: React.FC<HiveModularCardProps>;
export { ModularCard, moduleVariants, HeaderModule, ContentModule, FooterModule, AccentModule, ActionModule, ModularStack, ModularGrid };
//# sourceMappingURL=hive-modular-card.d.ts.map