'use client';

import React from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileBottomNav } from './MobileBottomNav';

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex">
                 <DesktopSidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="block lg:hidden">
                <MobileBottomNav />
            </div>
        </div>
    );
} 