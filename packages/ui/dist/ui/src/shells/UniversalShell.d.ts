/**
 * 🎯 HIVE Universal Shell Component
 * The Premium App Shell with Buttery Smooth Interactions
 *
 * DESIGN SYSTEM COMPLIANCE:
 * ✅ Gold (#FFD700) signature brand color
 * ✅ Framer Motion with HIVE easing curves
 * ✅ Glass morphism effects
 * ✅ Geist Sans typography (font-sans)
 * ✅ Mobile-first with 44px touch targets
 * ✅ Dark luxury aesthetic
 */
import React from 'react';
interface ShellContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isMobile: boolean;
    currentSlice: string;
    shellReady: boolean;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    notificationCount: number;
    messageCount: number;
}
export declare const useShell: () => ShellContextType;
export declare const UniversalShell: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: 'full' | 'minimal';
}>;
export default UniversalShell;
//# sourceMappingURL=UniversalShell.d.ts.map