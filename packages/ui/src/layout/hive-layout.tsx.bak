import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { darkLuxury, luxuryShadows, luxuryRadius, luxurySpacing } from '../theme/dark-luxury';
import { HiveMagneticHover, HiveCascade } from '../components/hive-motion-wrapper';

// HIVE Layout System - Soft Brutalism
// Strong geometric shapes with approachable rounded corners

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Main Layout Container - Refined Density
export const HiveLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div 
      className={cn('min-h-screen', className)}
      style={{ 
        backgroundColor: darkLuxury.obsidian,
        background: `linear-gradient(135deg, ${darkLuxury.obsidian} 0%, ${darkLuxury.charcoal} 100%)`,
      }}
    >
      {children}
    </div>
  );
};

// Bento Grid System - Flexible card layouts
interface BentoGridProps extends LayoutProps {
  cols?: number;
  gap?: keyof typeof luxurySpacing;
  cascade?: boolean;
}

export const HiveBentoGrid: React.FC<BentoGridProps> = ({ 
  children, 
  className, 
  cols = 3, 
  gap = 'lg',
  cascade = false 
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
  };

  const gapClass = `gap-${gap}`;
  
  const gridContent = (
    <div 
      className={cn('grid', gridCols[cols as keyof typeof gridCols], gapClass, className)}
      style={{ gap: luxurySpacing[gap] }}
    >
      {children}
    </div>
  );

  return cascade ? (
    <HiveCascade>{gridContent}</HiveCascade>
  ) : (
    gridContent
  );
};

// Bento Card - Individual grid items with soft brutalism
interface BentoCardProps extends LayoutProps {
  span?: number;
  aspect?: 'square' | 'wide' | 'tall' | 'auto';
  elevated?: boolean;
  interactive?: boolean;
  glow?: boolean;
}

export const HiveBentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  span = 1,
  aspect = 'auto',
  elevated = false,
  interactive = false,
  glow = false,
}) => {
  const spanClass = span > 1 ? `col-span-${span}` : '';
  
  const aspectClasses = {
    square: 'aspect-square',
    wide: 'aspect-[2/1]',
    tall: 'aspect-[1/2]',
    auto: '',
  };

  const cardStyles = {
    backgroundColor: elevated ? darkLuxury.graphite : darkLuxury.charcoal,
    borderRadius: luxuryRadius.large,
    border: `1px solid ${darkLuxury.steel}`,
    boxShadow: elevated ? luxuryShadows.level3 : luxuryShadows.level2,
    ...(glow && { boxShadow: luxuryShadows.goldGlow }),
  };

  const card = (
    <div
      className={cn(
        'p-6 transition-all duration-300',
        spanClass,
        aspectClasses[aspect],
        className
      )}
      style={cardStyles}
    >
      {children}
    </div>
  );

  return interactive ? (
    <HiveMagneticHover intensity="medium">{card}</HiveMagneticHover>
  ) : (
    card
  );
};

// Sidebar Layout - Discord-style navigation
interface SidebarLayoutProps extends LayoutProps {
  sidebar: React.ReactNode;
  sidebarWidth?: string;
  collapsible?: boolean;
}

export const HiveSidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  sidebar,
  className,
  sidebarWidth = '240px',
  collapsible = false,
}) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className={cn('flex h-screen', className)}>
      {/* Sidebar */}
      <motion.aside
        className="flex-shrink-0 border-r"
        style={{
          backgroundColor: darkLuxury.charcoal,
          borderColor: darkLuxury.steel,
          width: collapsed ? '60px' : sidebarWidth,
        }}
        animate={{ width: collapsed ? '60px' : sidebarWidth }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {collapsible && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full p-4 text-left text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/5 transition-colors"
          >
            {collapsed ? '→' : '←'}
          </button>
        )}
        <div className={collapsed ? 'overflow-hidden' : ''}>
          {sidebar}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

// Split Panel Layout - GitHub-style panels
interface SplitPanelProps extends LayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  leftWidth?: string;
  resizable?: boolean;
}

export const HiveSplitPanel: React.FC<SplitPanelProps> = ({
  leftPanel,
  rightPanel,
  className,
  leftWidth = '50%',
  resizable = false,
}) => {
  return (
    <div className={cn('flex h-full', className)}>
      {/* Left Panel */}
      <div
        className="border-r overflow-auto"
        style={{
          backgroundColor: darkLuxury.charcoal,
          borderColor: darkLuxury.steel,
          width: leftWidth,
        }}
      >
        {leftPanel}
      </div>

      {/* Right Panel */}
      <div className="flex-1 overflow-auto">
        {rightPanel}
      </div>
    </div>
  );
};

// Stack Layout - Vertical composition
interface StackProps extends LayoutProps {
  spacing?: keyof typeof luxurySpacing;
  align?: 'start' | 'center' | 'end' | 'stretch';
  cascade?: boolean;
}

export const HiveStack: React.FC<StackProps> = ({
  children,
  className,
  spacing = 'lg',
  align = 'stretch',
  cascade = false,
}) => {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const stackContent = (
    <div
      className={cn('flex flex-col', alignClasses[align], className)}
      style={{ gap: luxurySpacing[spacing] }}
    >
      {children}
    </div>
  );

  return cascade ? (
    <HiveCascade>{stackContent}</HiveCascade>
  ) : (
    stackContent
  );
};

// Cluster Layout - Horizontal grouping
interface ClusterProps extends LayoutProps {
  spacing?: keyof typeof luxurySpacing;
  align?: 'start' | 'center' | 'end' | 'baseline';
  wrap?: boolean;
}

export const HiveCluster: React.FC<ClusterProps> = ({
  children,
  className,
  spacing = 'md',
  align = 'center',
  wrap = false,
}) => {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
  };

  return (
    <div
      className={cn(
        'flex',
        alignClasses[align],
        wrap && 'flex-wrap',
        className
      )}
      style={{ gap: luxurySpacing[spacing] }}
    >
      {children}
    </div>
  );
};

// Cover Layout - Hero sections
interface CoverProps extends LayoutProps {
  minHeight?: string;
  centered?: boolean;
  overlay?: boolean;
}

export const HiveCover: React.FC<CoverProps> = ({
  children,
  className,
  minHeight = '60vh',
  centered = true,
  overlay = false,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col',
        centered && 'items-center justify-center text-center',
        className
      )}
      style={{
        minHeight,
        backgroundColor: darkLuxury.obsidian,
        ...(overlay && {
          background: `linear-gradient(135deg, ${darkLuxury.obsidian}DD 0%, ${darkLuxury.charcoal}DD 100%)`,
        }),
      }}
    >
      {children}
    </div>
  );
};

// Frame Layout - Consistent padding wrapper
interface FrameProps extends LayoutProps {
  padding?: keyof typeof luxurySpacing;
  maxWidth?: string;
  centered?: boolean;
}

export const HiveFrame: React.FC<FrameProps> = ({
  children,
  className,
  padding = '2xl',
  maxWidth = '1200px',
  centered = true,
}) => {
  return (
    <div
      className={cn(centered && 'mx-auto', className)}
      style={{
        padding: luxurySpacing[padding],
        maxWidth,
      }}
    >
      {children}
    </div>
  );
};

// Glass Panel - Translucent overlays
interface GlassPanelProps extends LayoutProps {
  blur?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

export const HiveGlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  blur = true,
  intensity = 'medium',
}) => {
  const intensityMap = {
    light: {
      backdropFilter: 'blur(2)',
      backgroundColor: 'color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)',
      border: '1px solid color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)',
    },
    medium: {
      backdropFilter: 'blur(3) saturate(180%)',
      backgroundColor: 'var(--hive-interactive-hover)',
      border: '1px solid var(--hive-interactive-active)',
    },
    heavy: {
      backdropFilter: 'blur(4) saturate(200%)',
      backgroundColor: 'color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)',
      border: '1px solid color-mix(in_srgb,var(--hive-border-hover)_75%,transparent)',
    },
  };

  return (
    <div
      className={cn('rounded-lg', className)}
      style={{
        borderRadius: luxuryRadius.large,
        ...(blur ? intensityMap[intensity] : { backgroundColor: darkLuxury.charcoal }),
      }}
    >
      {children}
    </div>
  );
};