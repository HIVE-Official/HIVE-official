// HIVE Standard Variant System for Atomic Components
// This ensures consistency across all atoms

// Base variants used by most components
export type HiveBaseVariant = 
  | 'default'
  | 'outline' 
  | 'filled'
  | 'ghost';

// Extended variants for specific component types
export type HiveButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'
  | 'link'
  | 'accent'
  | 'default';

export type HiveBadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost'
  | 'outline'
  | 'builder'
  | 'verified'
  | 'leader'
  | 'ghost-mode'
  | 'achievement'
  | 'streak'
  | 'scholar'
  | 'connector'
  | 'dean'
  | 'developer'
  | 'organizer'
  | 'helper';

export type HiveFormVariant =
  | 'default'
  | 'outline'
  | 'filled'
  | 'ghost';

export type HiveLabelVariant =
  | 'default'
  | 'inline'
  | 'floating';

export type HiveTagVariant =
  | 'default'
  | 'outline'
  | 'filled'
  | 'ghost'
  | 'gradient';

export type HiveTooltipVariant =
  | 'default'
  | 'dark'
  | 'light';

export type HiveProgressVariant =
  | 'default'
  | 'gradient'
  | 'striped'
  | 'circular';

export type HiveStatusVariant =
  | 'dot'
  | 'pulse'
  | 'glow'
  | 'ring';

export type HiveSeparatorVariant =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'gradient';

export type HiveImageVariant =
  | 'default'
  | 'rounded'
  | 'circle'
  | 'square';

export type HiveContainerVariant =
  | 'default'
  | 'card'
  | 'panel'
  | 'section';

// Standard size system used across all components
export type HiveSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Standard responsive breakpoints
export type HiveBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';