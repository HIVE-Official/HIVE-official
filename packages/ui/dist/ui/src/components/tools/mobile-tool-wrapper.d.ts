/**
 * Mobile Tool Wrapper - Responsive Layout for Tools
 *
 * Ensures all HIVE tools work beautifully on mobile devices with:
 * - Touch-optimized interactions
 * - Responsive grid layouts
 * - Mobile-first component sizing
 * - Swipe gestures for navigation
 */
import React from 'react';
interface MobileToolWrapperProps {
    children: React.ReactNode;
    toolName: string;
    onBack?: () => void;
    showMobileMenu?: boolean;
    className?: string;
}
export declare function MobileToolWrapper({ children, toolName, onBack, showMobileMenu, className }: MobileToolWrapperProps): import("react/jsx-runtime").JSX.Element;
export default MobileToolWrapper;
//# sourceMappingURL=mobile-tool-wrapper.d.ts.map