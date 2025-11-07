/**
 * ShellSidebar - CLEAN VERSION
 * Minimal, focused sidebar with reduced clutter
 */
import React from 'react';
import type { ShellNavItem, ShellSpaceSection } from '../UniversalShell';
export interface ShellSidebarProps {
    navItems: ShellNavItem[];
    mySpaces: ShellSpaceSection[];
    onNavigate: (path?: string) => void;
    collapsed: boolean;
    onCollapseChange: (collapsed: boolean) => void;
    isOpen: boolean;
    onToggle: () => void;
    isMobile: boolean;
    headerStyle?: 'default' | 'hidden' | 'minimal';
    variant?: 'full' | 'minimal';
    sidebarStyle?: 'default' | 'sleek';
    renderUserMenu?: (props: {
        variant: 'sidebar' | 'collapsed';
        onNavigate: (path?: string) => void;
    }) => React.ReactNode;
}
export declare function ShellSidebar({ navItems, mySpaces, onNavigate, isOpen, onToggle, isMobile, headerStyle, renderUserMenu, }: ShellSidebarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ShellSidebar.d.ts.map