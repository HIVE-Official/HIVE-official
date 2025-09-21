// HIVE Standard Color System for Atomic Components;
// This ensures consistency across all atoms;
export type HiveColorVariant = 
  | 'default'
  | 'primary' 
  | 'secondary'
  | 'success'
  | 'warning' 
  | 'error'
  | 'gold'
  | 'ruby'
  | 'emerald'
  | 'sapphire'
  | 'muted';

export const hiveColors = {
  default: {
    bg: 'bg-hive-background-secondary',
    text: 'text-hive-text-primary',
    border: 'border-hive-border-default',
    hover: 'hover:bg-hive-background-interactive',
    focus: 'focus:border-hive-gold focus:ring-hive-gold/20'
  },
  primary: {
    bg: 'bg-[var(--hive-brand-secondary)]',
    text: 'text-[var(--hive-background-primary)]',
    border: 'border-hive-gold',
    hover: 'hover:bg-hive-amber',
    focus: 'focus:border-hive-gold focus:ring-hive-gold/20'
  },
  secondary: {
    bg: 'bg-hive-background-tertiary',
    text: 'text-hive-text-primary',
    border: 'border-hive-border-default',
    hover: 'hover:bg-hive-background-interactive',
    focus: 'focus:border-hive-gold focus:ring-hive-gold/20'
  },
  success: {
    bg: 'bg-hive-emerald',
    text: 'text-[var(--hive-text-primary)]',
    border: 'border-hive-emerald',
    hover: 'hover:bg-green-400',
    focus: 'focus:border-hive-emerald focus:ring-hive-emerald/20'
  },
  warning: {
    bg: 'bg-[var(--hive-brand-secondary)]',
    text: 'text-[var(--hive-background-primary)]',
    border: 'border-hive-gold',
    hover: 'hover:bg-orange-400',
    focus: 'focus:border-hive-gold focus:ring-hive-gold/20'
  },
  error: {
    bg: 'bg-hive-ruby',
    text: 'text-[var(--hive-text-primary)]',
    border: 'border-hive-ruby',
    hover: 'hover:bg-red-400',
    focus: 'focus:border-hive-ruby focus:ring-hive-ruby/20'
  },
  gold: {
    bg: 'bg-[var(--hive-brand-secondary)]',
    text: 'text-[var(--hive-background-primary)]',
    border: 'border-hive-gold',
    hover: 'hover:bg-hive-amber',
    focus: 'focus:border-hive-gold focus:ring-hive-gold/20'
  },
  ruby: {
    bg: 'bg-hive-ruby',
    text: 'text-[var(--hive-text-primary)]',
    border: 'border-hive-ruby',
    hover: 'hover:bg-red-400',
    focus: 'focus:border-hive-ruby focus:ring-hive-ruby/20'
  },
  emerald: {
    bg: 'bg-hive-emerald',
    text: 'text-[var(--hive-text-primary)]',
    border: 'border-hive-emerald',
    hover: 'hover:bg-green-400',
    focus: 'focus:border-hive-emerald focus:ring-hive-emerald/20'
  },
  sapphire: {
    bg: 'bg-hive-sapphire',
    text: 'text-[var(--hive-text-primary)]',
    border: 'border-hive-sapphire',
    hover: 'hover:bg-blue-400',
    focus: 'focus:border-hive-sapphire focus:ring-hive-sapphire/20'
  },
  muted: {
    bg: 'bg-hive-background-tertiary',
    text: 'text-hive-text-secondary',
    border: 'border-hive-border-subtle',
    hover: 'hover:bg-hive-background-interactive',
    focus: 'focus:border-hive-gold focus:ring-hive-gold/20'
  }
} as const;