import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const tabsListVariants: (props?: {
    variant?: "default" | "underline" | "pills";
} & import("class-variance-authority/types").ClassProp) => string;
declare const tabsTriggerVariants: (props?: {
    variant?: "default" | "underline" | "pills";
} & import("class-variance-authority/types").ClassProp) => string;
declare const tabsContentVariants: (props?: {
    variant?: "default" | "card";
} & import("class-variance-authority/types").ClassProp) => string;
export interface TabsProps extends VariantProps<typeof tabsListVariants> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}
declare function Tabs({ value, defaultValue, onValueChange, variant, children, className }: TabsProps): import("react/jsx-runtime").JSX.Element;
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsListVariants> {
}
declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof tabsTriggerVariants> {
    value: string;
}
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsContentVariants> {
    value: string;
}
declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants, };
//# sourceMappingURL=tabs.d.ts.map