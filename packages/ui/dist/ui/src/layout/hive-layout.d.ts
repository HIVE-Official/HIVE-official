import React from 'react';
import { luxurySpacing } from '../theme/dark-luxury';
interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}
export declare const HiveLayout: React.FC<LayoutProps>;
interface BentoGridProps extends LayoutProps {
    cols?: number;
    gap?: keyof typeof luxurySpacing;
    cascade?: boolean;
}
export declare const HiveBentoGrid: React.FC<BentoGridProps>;
interface BentoCardProps extends LayoutProps {
    span?: number;
    aspect?: 'square' | 'wide' | 'tall' | 'auto';
    elevated?: boolean;
    interactive?: boolean;
    glow?: boolean;
}
export declare const HiveBentoCard: React.FC<BentoCardProps>;
interface SidebarLayoutProps extends LayoutProps {
    sidebar: React.ReactNode;
    sidebarWidth?: string;
    collapsible?: boolean;
}
export declare const HiveSidebarLayout: React.FC<SidebarLayoutProps>;
interface SplitPanelProps extends LayoutProps {
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    leftWidth?: string;
    resizable?: boolean;
}
export declare const HiveSplitPanel: React.FC<SplitPanelProps>;
interface StackProps extends LayoutProps {
    spacing?: keyof typeof luxurySpacing;
    align?: 'start' | 'center' | 'end' | 'stretch';
    cascade?: boolean;
}
export declare const HiveStack: React.FC<StackProps>;
interface ClusterProps extends LayoutProps {
    spacing?: keyof typeof luxurySpacing;
    align?: 'start' | 'center' | 'end' | 'baseline';
    wrap?: boolean;
}
export declare const HiveCluster: React.FC<ClusterProps>;
interface CoverProps extends LayoutProps {
    minHeight?: string;
    centered?: boolean;
    overlay?: boolean;
}
export declare const HiveCover: React.FC<CoverProps>;
interface FrameProps extends LayoutProps {
    padding?: keyof typeof luxurySpacing;
    maxWidth?: string;
    centered?: boolean;
}
export declare const HiveFrame: React.FC<FrameProps>;
interface GlassPanelProps extends LayoutProps {
    blur?: boolean;
    intensity?: 'light' | 'medium' | 'heavy';
}
export declare const HiveGlassPanel: React.FC<GlassPanelProps>;
export {};
//# sourceMappingURL=hive-layout.d.ts.map