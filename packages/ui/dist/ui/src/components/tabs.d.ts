import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type VariantProps } from "class-variance-authority";
declare const tabsListVariants: (props?: {
    variant?: "default" | "minimal" | "underline" | "pills";
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
declare const tabsTriggerVariants: (props?: {
    variant?: "default" | "minimal" | "underline" | "pills";
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & VariantProps<(props?: {
    variant?: "default" | "minimal" | "underline" | "pills";
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string> & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: {
    variant?: "default" | "minimal" | "underline" | "pills";
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string> & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
//# sourceMappingURL=tabs.d.ts.map