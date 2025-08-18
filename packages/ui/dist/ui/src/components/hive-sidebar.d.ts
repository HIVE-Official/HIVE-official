import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveSidebarVariants: (props?: {
    variant?: "default" | "minimal" | "premium";
    size?: "default" | "sm" | "lg" | "xl";
    position?: "right" | "left";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SidebarSection {
    id: 'spaces' | 'profile' | 'hivelab' | 'feed';
    title: string;
    icon: React.ReactNode;
    items: SidebarItem[];
    quickActions?: QuickAction[];
    badge?: string | number;
    isExpanded?: boolean;
    previewContent?: React.ReactNode;
}
export interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
    badge?: string | number;
    isActive?: boolean;
    isDisabled?: boolean;
    subtitle?: string;
    avatar?: string;
    status?: 'online' | 'offline' | 'busy' | 'away';
    lastActivity?: string;
}
export interface QuickAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'primary' | 'ghost';
}
export interface HiveSidebarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>, VariantProps<typeof hiveSidebarVariants> {
    sections: SidebarSection[];
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
    showCollapseButton?: boolean;
    activeItemId?: string;
    onItemClick?: (item: SidebarItem, sectionId: string) => void;
    onSectionToggle?: (sectionId: string) => void;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    isOverlay?: boolean;
    onOverlayClose?: () => void;
    user?: {
        name: string;
        avatar?: string;
        handle: string;
        status?: 'online' | 'offline' | 'busy' | 'away';
    };
}
declare const HiveSidebar: React.ForwardRefExoticComponent<HiveSidebarProps & React.RefAttributes<HTMLDivElement>>;
export declare function useHiveSidebar(initialCollapsed?: boolean, initialSections?: SidebarSection[]): {
    isCollapsed: boolean;
    activeItemId: string;
    sections: SidebarSection[];
    toggleCollapse: () => void;
    setCollapsed: (collapsed: boolean) => void;
    setActiveItem: (itemId: string) => void;
    setSections: React.Dispatch<React.SetStateAction<SidebarSection[]>>;
    updateSection: (sectionId: string, updates: Partial<SidebarSection>) => void;
    updateSectionItems: (sectionId: string, items: SidebarItem[]) => void;
    addSectionItem: (sectionId: string, item: SidebarItem) => void;
    removeSectionItem: (sectionId: string, itemId: string) => void;
};
export declare function createDefaultHiveSections(): SidebarSection[];
export { HiveSidebar, hiveSidebarVariants };
//# sourceMappingURL=hive-sidebar.d.ts.map