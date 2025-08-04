// LEGACY UI COMPONENTS - Most moved to atomic enhanced versions
// Only keeping components that don't have atomic equivalents yet

export * from './alert';
export * from './alert-dialog';
export * from './avatar';
export * from './badge';
export * from './card';
export * from './dropdown-menu';
export * from './label';
export * from './popover';
export * from './resizable';
export * from './scroll-area';
export * from './skeleton';
export * from './slider';
export * from './tabs';
export * from './toast';
export * from './tooltip';

// BRIDGE COMPONENTS - Temporary bridges to atomic enhanced versions for LiveToolRuntime
export * from './button';
export * from './input';
export * from './select';
export * from './checkbox';
export * from './radio-group';

// REMOVED (now use atomic enhanced versions):
// - textarea.tsx → Use Textarea from atomic/atoms/textarea-enhanced.tsx
// - switch.tsx → Use Switch from atomic/atoms/switch-enhanced.tsx
// - separator.tsx → Use Separator from atomic/atoms/spacing-enhanced.tsx