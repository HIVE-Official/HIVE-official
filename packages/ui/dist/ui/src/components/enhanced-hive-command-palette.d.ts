import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const enhancedCommandPaletteVariants: (props?: {
    variant?: "default" | "premium";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SearchableItem {
    id: string;
    title: string;
    description?: string;
    icon: React.ReactNode;
    category: string;
    type: 'space' | 'tool' | 'person' | 'event' | 'post' | 'navigation' | 'action';
    keywords: string[];
    action: () => void;
    shortcut?: string;
    metadata?: {
        memberCount?: number;
        rating?: number;
        creator?: string;
        date?: string;
        status?: string;
    };
}
export interface SearchCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    searchEndpoint?: string;
}
export interface EnhancedCommandPaletteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>, VariantProps<typeof enhancedCommandPaletteVariants> {
    isOpen: boolean;
    onClose: () => void;
    onSelect?: (item: SearchableItem) => void;
    onSearch?: (query: string, category?: string) => Promise<SearchableItem[]>;
    staticItems?: SearchableItem[];
    categories: SearchCategory[];
    placeholder?: string;
    hotkey?: string;
    recentItems?: SearchableItem[];
    maxResults?: number;
    enableLiveSearch?: boolean;
}
declare const EnhancedHiveCommandPalette: React.ForwardRefExoticComponent<EnhancedCommandPaletteProps & React.RefAttributes<HTMLDivElement>>;
export declare const comprehensiveSearchCategories: SearchCategory[];
export declare const defaultSearchItems: SearchableItem[];
export { EnhancedHiveCommandPalette, enhancedCommandPaletteVariants };
//# sourceMappingURL=enhanced-hive-command-palette.d.ts.map