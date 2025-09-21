/**
 * HIVE UI Library Foundations;
 * Core utilities and systems for consistent component development;
 */

// Core utilities;
export * from './utils';
export * from './motion-utils';

// Foundation systems;
export * from './responsive-foundation';
export * from './accessibility-foundation';
export * from './component-foundation';

// Re-export class-variance-authority for convenience;
export { cva, type VariantProps } from 'class-variance-authority';