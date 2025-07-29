import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const spacerVariants: (props?: {
    size?: "default" | "xs" | "sm" | "lg" | "xl" | "md" | "2xl" | "3xl";
    direction?: "horizontal" | "vertical" | "both";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const containerVariants: (props?: {
    size?: "sm" | "lg" | "xl" | "full" | "md" | "2xl";
    padding?: "default" | "sm" | "lg" | "xl" | "none";
    center?: boolean;
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const stackVariants: (props?: {
    direction?: "horizontal" | "vertical";
    spacing?: "default" | "xs" | "sm" | "lg" | "xl" | "none" | "md" | "2xl" | "3xl";
    align?: "center" | "end" | "start" | "baseline" | "stretch";
    justify?: "center" | "end" | "start" | "between" | "around" | "evenly";
    wrap?: boolean;
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const separatorVariants: (props?: {
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "brand" | "strong" | "muted";
    size?: "default" | "thin" | "thick";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacerVariants> {
}
export declare const Spacer: React.ForwardRefExoticComponent<SpacerProps & React.RefAttributes<HTMLDivElement>>;
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
}
export declare const Container: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>;
export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
}
export declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export interface HStackProps extends Omit<StackProps, 'direction'> {
}
export declare const HStack: React.ForwardRefExoticComponent<HStackProps & React.RefAttributes<HTMLDivElement>>;
export interface VStackProps extends Omit<StackProps, 'direction'> {
}
export declare const VStack: React.ForwardRefExoticComponent<VStackProps & React.RefAttributes<HTMLDivElement>>;
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {
    decorative?: boolean;
}
export declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    gap?: "none" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
    responsive?: boolean;
}
export declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "col" | "row-reverse" | "col-reverse";
    wrap?: boolean;
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
    gap?: "none" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
}
export declare const Flex: React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>>;
export declare const LayoutPresets: {
    PageLayout: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
    CardLayout: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
    FormLayout: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
    HeaderLayout: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
    GridLayout: ({ cols, children, ...props }: GridProps & {
        children: React.ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
};
export { spacerVariants, containerVariants, stackVariants, separatorVariants };
//# sourceMappingURL=spacing-enhanced.d.ts.map