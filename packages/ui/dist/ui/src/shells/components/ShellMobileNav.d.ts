import type { ShellMobileNavItem } from '../UniversalShell';
export interface ShellMobileNavProps {
    /** Navigation items */
    navItems: ShellMobileNavItem[];
    /** Navigation handler */
    onNavigate: (path?: string) => void;
}
export declare function ShellMobileNav({ navItems, onNavigate }: ShellMobileNavProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ShellMobileNav.d.ts.map