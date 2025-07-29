import React from "react";
interface DropdownMenuProps {
    children: React.ReactNode;
}
interface DropdownMenuTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}
interface DropdownMenuContentProps {
    children: React.ReactNode;
    className?: string;
    align?: "start" | "center" | "end";
}
interface DropdownMenuItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}
interface DropdownMenuSeparatorProps {
    className?: string;
}
interface DropdownMenuLabelProps {
    children: React.ReactNode;
    className?: string;
}
export declare const DropdownMenu: React.FC<DropdownMenuProps>;
export declare const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps>;
export declare const DropdownMenuContent: React.FC<DropdownMenuContentProps>;
export declare const DropdownMenuItem: React.FC<DropdownMenuItemProps>;
export declare const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps>;
export declare const DropdownMenuLabel: React.FC<DropdownMenuLabelProps>;
export declare const DropdownMenuShortcut: React.FC<{
    className?: string;
    children: React.ReactNode;
}>;
export declare const DropdownMenuCheckboxItem: React.FC<{
    children: React.ReactNode;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    className?: string;
}>;
export declare const DropdownMenuRadioGroup: React.FC<{
    children: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
}>;
export declare const DropdownMenuRadioItem: React.FC<{
    children: React.ReactNode;
    value: string;
    className?: string;
}>;
export declare const DropdownMenuSub: React.FC<{
    children: React.ReactNode;
}>;
export declare const DropdownMenuSubTrigger: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const DropdownMenuSubContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export {};
//# sourceMappingURL=dropdown-menu.d.ts.map