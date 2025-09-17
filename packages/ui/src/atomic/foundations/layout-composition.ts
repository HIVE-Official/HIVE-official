/**
 * HIVE Layout Composition System - PRODUCTION READY
 * Practical layout patterns for building campus social platform
 * 
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */

// === SPACING SYSTEM (Use existing tokens) ===
export const spacing = {
  // Mathematical 4px scale - consistent naming
  0: 'var(--hive-space-0)',      // 0px
  1: 'var(--hive-space-1)',      // 4px  
  2: 'var(--hive-space-2)',      // 8px
  3: 'var(--hive-space-3)',      // 12px
  4: 'var(--hive-space-4)',      // 16px
  5: 'var(--hive-space-5)',      // 20px
  6: 'var(--hive-space-6)',      // 24px
  8: 'var(--hive-space-8)',      // 32px
  10: 'var(--hive-space-10)',    // 40px
  12: 'var(--hive-space-12)',    // 48px
  16: 'var(--hive-space-16)'     // 64px
} as const;

// === CONTAINER WIDTHS ===
export const containers = {
  // Standard container sizes
  sm: '640px',      // Small forms, settings
  md: '768px',      // Regular content
  lg: '1024px',     // Wide content
  xl: '1200px',     // Dashboard layouts
  full: '100%',     // Full width
  
  // Campus-specific containers
  feed: '680px',    // Social feed optimal width
  profile: '900px', // Profile dashboard
  tools: '100%'     // Tool builder needs full width
} as const;

// === GRID SYSTEMS ===
export const grids = {
  // Systematic card grids (based on 280px minimum readable card width)
  cards: 'repeat(auto-fill, minmax(280px, 1fr))',     // Standard cards
  wide: 'repeat(auto-fill, minmax(320px, 1fr))',      // Wide cards (profile bento)
  narrow: 'repeat(auto-fill, minmax(240px, 1fr))',    // Narrow cards (tools)
  
  // Column layouts  
  sidebar: '1fr 280px',              // Main + sidebar (280px min readable)
  twoCol: '1fr 1fr',                 // Equal columns
  threeCol: '1fr 1fr 1fr',           // Equal columns
  asymmetric: '2fr 1fr'              // 2/3 + 1/3 split
} as const;

// === LAYOUT UTILITIES ===
export const utils = {
  // Flex patterns
  flex: {
    row: 'flex flex-row',
    col: 'flex flex-col', 
    wrap: 'flex flex-wrap',
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-start',
    end: 'flex items-end'
  },
  
  // Grid patterns
  grid: {
    cols1: 'grid grid-cols-1',
    cols2: 'grid grid-cols-2',
    cols3: 'grid grid-cols-3',
    auto: 'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'
  },
  
  // Spacing
  gap: {
    1: 'gap-1',     // 4px
    2: 'gap-2',     // 8px  
    3: 'gap-3',     // 12px
    4: 'gap-4',     // 16px
    6: 'gap-6',     // 24px
    8: 'gap-8'      // 32px
  },
  
  // Padding
  p: {
    2: 'p-2',       // 8px
    3: 'p-3',       // 12px
    4: 'p-4',       // 16px
    5: 'p-5',       // 20px
    6: 'p-6'        // 24px
  }
} as const;

// === LAYOUT PATTERNS ===
export const layouts = {
  // Feed - mobile-first
  feed: {
    container: `max-w-[680px] mx-auto p-4 ${utils.flex.col} ${utils.gap[4]}`,
    post: `p-5 ${utils.flex.col} ${utils.gap[3]}`
  },

  // Spaces - responsive grid
  spaces: {
    grid: `${utils.grid.auto} ${utils.gap[4]} ${utils.p[4]}`,
    card: `${utils.p[5]} ${utils.flex.col} ${utils.gap[2]}`
  },

  // Profile - bento grid
  profile: {
    container: `max-w-[900px] mx-auto ${utils.p[4]}`,
    header: `${utils.flex.between} mb-6 flex-col md:flex-row md:items-center`,
    bento: `grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] ${utils.gap[4]} auto-rows-[minmax(200px,auto)]`
  },

  // Tools - full width builder
  tools: {
    builder: `grid grid-cols-1 lg:grid-cols-[320px_1fr] h-screen`,
    marketplace: `grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] ${utils.gap[4]} ${utils.p[4]}`
  },

  // Page - standard container
  page: {
    main: `max-w-[1200px] mx-auto ${utils.p[4]}`,
    sidebar: `grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8`
  }
} as const;

// === BREAKPOINTS (Tailwind standard) ===
export const breakpoints = {
  sm: '640px',    // Small devices
  md: '768px',    // Medium devices  
  lg: '1024px',   // Large devices
  xl: '1280px'    // Extra large devices
} as const;

// === RESPONSIVE PATTERNS ===
export const responsive = {
  // Visibility
  mobileOnly: 'md:hidden',
  desktopOnly: 'hidden md:block',
  
  // Stack patterns (mobile-first)
  stack: 'flex flex-col md:flex-row',
  stackReverse: 'flex flex-col-reverse md:flex-row',
  
  // Grid patterns (mobile-first)
  grid: {
    1: 'grid grid-cols-1',
    2: 'grid grid-cols-1 md:grid-cols-2',
    3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }
} as const;

// === TOUCH TARGETS (Mobile) ===
export const touch = {
  // Minimum touch sizes
  minHeight: '44px',
  minWidth: '44px',
  comfortable: '48px',
  large: '56px',
  
  // Touch spacing
  padding: spacing[3],     // 12px around touch elements
  gap: spacing[4]          // 16px between touch targets
} as const;

// === COMPREHENSIVE EXPORT ===
export const layoutComposition = {
  spacing,
  containers,
  grids,
  utils,
  layouts,
  breakpoints,
  responsive,
  touch
} as const;

export type LayoutComposition = typeof layoutComposition;
export type Spacing = typeof spacing;
export type Containers = typeof containers;
export type Utils = typeof utils;
export type Layouts = typeof layouts;