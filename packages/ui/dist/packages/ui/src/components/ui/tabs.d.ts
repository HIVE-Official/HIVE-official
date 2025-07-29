import React from "react";
interface TabsProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}
export declare const Tabs: React.FC<TabsProps>;
interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}
export declare const TabsList: React.FC<TabsListProps>;
interface TabsTriggerProps {
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
export {};
//# sourceMappingURL=tabs.d.ts.map