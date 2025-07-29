import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveMenuVariants: (props?: {
    variant?: "outline" | "default" | "ghost";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface MenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    separator?: boolean;
    children?: MenuItem[];
    selected?: boolean;
    description?: string;
}
export interface HiveMenuProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveMenuVariants> {
    items: MenuItem[];
    trigger: React.ReactNode;
    position?: 'bottom' | 'top' | 'left' | 'right';
    size?: 'sm' | 'default' | 'lg' | 'xl';
    closeOnSelect?: boolean;
    disabled?: boolean;
}
declare const HiveMenu: React.ForwardRefExoticComponent<HiveMenuProps & React.RefAttributes<HTMLDivElement>>;
interface HiveMenuButtonProps extends Omit<HiveMenuProps, 'trigger'> {
    label: string;
    icon?: React.ReactNode;
    showChevron?: boolean;
    buttonVariant?: 'default' | 'ghost' | 'outline';
}
declare const HiveMenuButton: React.ForwardRefExoticComponent<HiveMenuButtonProps & React.RefAttributes<HTMLDivElement>>;
export declare function useHiveContextMenu(items: MenuItem[]): {
    isOpen: boolean;
    position: {
        x: number;
        y: number;
    };
    items: MenuItem[];
    openContextMenu: (event: React.MouseEvent) => void;
    closeContextMenu: () => void;
    contextMenuProps: {
        onContextMenu: (event: React.MouseEvent) => void;
    };
};
export { HiveMenu, HiveMenuButton, hiveMenuVariants };
//# sourceMappingURL=hive-menu.d.ts.map