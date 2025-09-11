import React from "react";
import { type VariantProps } from "class-variance-authority";
declare const tabsListVariants: (props?: ({
    variant?: "default" | "ghost" | "underline" | "pills" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const tabsTriggerVariants: (props?: ({
    variant?: "default" | "ghost" | "underline" | "pills" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface TabsProps extends VariantProps<typeof tabsListVariants> {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}
export declare const Tabs: React.FC<TabsProps>;
interface TabsListProps extends VariantProps<typeof tabsListVariants> {
    children: React.ReactNode;
    className?: string;
}
export declare const TabsList: React.FC<TabsListProps>;
interface TabsTriggerProps extends VariantProps<typeof tabsTriggerVariants> {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}
export declare const TabsTrigger: React.FC<TabsTriggerProps>;
interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}
export declare const TabsContent: React.FC<TabsContentProps>;
export { tabsListVariants, tabsTriggerVariants };
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };
//# sourceMappingURL=tabs.d.ts.map