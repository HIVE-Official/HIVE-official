import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveCommandPaletteVariants: (props?: {
    variant?: "default" | "premium";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface CommandItem {
    id: string;
    title: string;
    description?: string;
    icon: React.ReactNode;
    category: string;
    keywords: string[];
    action: () => void;
    shortcut?: string;
}
export interface CommandCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
}
export interface HiveCommandPaletteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>, VariantProps<typeof hiveCommandPaletteVariants> {
    isOpen: boolean;
    onClose: () => void;
    onSelect?: (item: CommandItem) => void;
    items: CommandItem[];
    categories: CommandCategory[];
    placeholder?: string;
    hotkey?: string;
    recentItems?: CommandItem[];
    maxResults?: number;
}
declare const HiveCommandPalette: React.ForwardRefExoticComponent<HiveCommandPaletteProps & React.RefAttributes<HTMLDivElement>>;
export declare function useHiveCommandPalette(hotkey?: string): {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
};
export declare const builderCategories: CommandCategory[];
export { HiveCommandPalette, hiveCommandPaletteVariants };
//# sourceMappingURL=hive-command-palette.d.ts.map