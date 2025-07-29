// HIVE Complete Atomic Design System - Foundation Components
// All atoms use enhanced HIVE design tokens and follow mobile-first responsive design
// ✅ API CONSISTENCY: All components use standardized size, color, and variant props

// === DESIGN SYSTEM CONSISTENCY ===
export * from './color-system';
export * from './variant-system';

// === CORE FOUNDATION ATOMS (Use Enhanced Versions Only) ===
export * from './button-enhanced';
export * from './input-enhanced';
export * from './select-radix'; // Radix-based Select with full compatibility
export * from './textarea-enhanced';
export * from './checkbox-enhanced';
export * from './radio-enhanced';
export * from './switch-enhanced';
export * from './spacing-enhanced';

// === OTHER ATOMS ===
export * from './avatar';
export * from './badge';
// export * from './button'; // Use button-enhanced instead
// export * from './checkbox'; // Use checkbox-enhanced instead
// Export with specific names to avoid conflicts
export { Container } from './container';
export type { ContainerProps } from './container';
export * from './file-input';
// Export HIVE brand components explicitly to avoid conflicts
export { 
  Icon as HiveBrandIcon, 
  Image as HiveBrandImage,
  PlatformIcons as HivePlatformIcons,
  Code as HiveBrandCode
} from './hive-brand';
export type { IconProps as HiveBrandIconProps } from './hive-brand';
export { Icon } from './icon';
export type { IconProps } from './icon';
export { Image } from './image';
export { PlatformIcons } from './platform-icons';
// export * from './input'; // Use input-enhanced instead
export * from './label';
// Export with specific names to avoid conflicts with hive-brand
export { Link } from './link';
export type { LinkProps } from './link';
export * from './nav-bar';
export * from './progress';
export * from './profile-action';
export * from './profile-avatar';
export * from './profile-badge';
export * from './profile-statistic';
// export * from './radio'; // Use radio-enhanced instead
// export * from './select'; // Use select-enhanced instead
// export * from './separator'; // Conflicts with spacing-enhanced Separator
export * from './sidebar';
export * from './skeleton';
export * from './slider';
// Export with specific names to avoid conflicts with spacing-enhanced
export { Spacer } from './spacer';
export type { SpacerProps } from './spacer';
export * from './spinner';
export * from './status-indicator';
// export * from './switch'; // Use switch-enhanced instead
export * from './tag';
// Export with specific names to avoid conflicts
export { Text } from './text';
export type { TextProps } from './text';
// export * from './textarea'; // Use textarea-enhanced instead
export * from './tooltip';
export * from './typography';