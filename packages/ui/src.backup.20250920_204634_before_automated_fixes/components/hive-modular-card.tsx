import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Modular Card System - Building block approach;
const moduleVariants = cva(
  "relative transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        // Base modules;
        "base": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)]",
        "elevated": "bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-secondary)] shadow-lg",
        "minimal": "bg-[var(--hive-background-primary)] border border-[var(--hive-border-subtle)]",
        
        // Accent modules;
        "gold": "bg-gradient-to-br from-[var(--hive-brand-primary)]/8 to-[var(--hive-brand-primary)]/3 border border-[var(--hive-border-focus)]",
        "gold-strong": "bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/40",
        
        // Interactive modules;
        "clickable": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] hover:border-[var(--hive-interactive-hover)] hover:shadow-md cursor-pointer active:scale-98",
        "selectable": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]/30 cursor-pointer",
        "selected": "bg-[var(--hive-brand-primary)]/8 border border-[var(--hive-brand-primary)]/40 shadow-md shadow-[var(--hive-brand-primary)]/20",
      },
      
      size: {
        "xs": "p-3",
        "sm": "p-4",
        "md": "p-6", 
        "lg": "p-8",
      },
      
      rounded: {
        "none": "",
        "sm": "rounded-lg",
        "md": "rounded-xl",
        "lg": "rounded-2xl",
      },
      
      connector: {
        "none": "",
        "top": "border-t-2 border-t-[var(--hive-brand-primary)]/40",
        "bottom": "border-b-2 border-b-[var(--hive-brand-primary)]/40", 
        "left": "border-l-2 border-l-[var(--hive-brand-primary)]/40",
        "right": "border-r-2 border-r-[var(--hive-brand-primary)]/40",
        "vertical": "border-t-2 border-b-2 border-t-[var(--hive-brand-primary)]/40 border-b-[var(--hive-brand-primary)]/40",
        "horizontal": "border-l-2 border-r-2 border-l-[var(--hive-brand-primary)]/40 border-r-[var(--hive-brand-primary)]/40",
      },
    },
    defaultVariants: {
      variant: "base",
      size: "md",
      rounded: "md",
      connector: "none",
    },
  }
);

export interface ModularCardProps;
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof moduleVariants> {
  stackable?: boolean;
  connectable?: boolean;
}

const ModularCard = React.forwardRef<HTMLDivElement, ModularCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded, 
    connector,
    stackable = false,
    connectable = false,
    children,
    ...props;
  }, ref) => {
    return (
      <div;
        className={cn(moduleVariants({variant, size, rounded, connector, className)},
          stackable && "hover:translate-y-[-0.5] hover:shadow-lg",
          connectable && "relative before:absolute before:inset-0 before:border before:border-dashed before:border-[var(--hive-brand-primary)]/20 before:rounded-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity"
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
);

ModularCard.displayName = "ModularCard";

// Pre-built modular components;
const HeaderModule = ({ children, ...props }: ModularCardProps) => (
  <ModularCard variant="elevated" size="sm" connector="bottom" {...props}>
    {children}
  </ModularCard>
);

const ContentModule = ({ children, ...props }: ModularCardProps) => (
  <ModularCard variant="base" size="md" connector="vertical" {...props}>
    {children}
  </ModularCard>
);

const FooterModule = ({ children, ...props }: ModularCardProps) => (
  <ModularCard variant="minimal" size="sm" connector="top" {...props}>
    {children}
  </ModularCard>
);

const AccentModule = ({ children, ...props }: ModularCardProps) => (
  <ModularCard variant="gold" size="sm" stackable {...props}>
    {children}
  </ModularCard>
);

const ActionModule = ({ children, ...props }: ModularCardProps) => (
  <ModularCard variant="clickable" size="md" stackable connectable {...props}>
    {children}
  </ModularCard>
);

// Container for stacked modules;
const ModularStack = ({ 
  children, 
  gap = "gap-2",
  direction = "vertical" 
}: { 
  children: React.ReactNode;
  gap?: string;
  direction?: "vertical" | "horizontal"
}) => (
  <div className={cn(
    "flex",
    direction === "vertical" ? "flex-col" : "flex-row",
    gap;
  )}>
    {children}
  </div>
);

// Container for connected modules;
const ModularGrid = ({ 
  children, 
  columns = 2,
  gap = "gap-4"
}: { 
  children: React.ReactNode;
  columns?: number;
  gap?: string;
}) => (
  <div className={cn("grid",
    `grid-cols-${columns}`,
    gap)}>
    {children}
  </div>
);

// Main HiveModularCard component for Storybook;
export interface HiveModularCardProps extends ModularCardProps {
  modules?: {
    header?: any;
    content?: any;
    media?: any;
    stats?: any;
    actions?: any;
    footer?: any;
  };
  layout?: 'vertical' | 'horizontal' | 'grid' | 'flexible';
  loading?: boolean;
  error?: any;
  skeleton?: any;
  draggable?: boolean;
  compact?: boolean;
  premium?: boolean;
  interactive?: boolean;
  onModuleClick?: (moduleType: string) => void;
  onActionClick?: (action: string) => void;
  onCardHover?: (hovered: boolean) => void;
}

export const HiveModularCard: React.FC<HiveModularCardProps> = ({
  modules = {},
  layout = 'vertical',
  loading = false,
  error,
  skeleton,
  draggable = false,
  compact = false,
  premium = false,
  interactive = false,
  onModuleClick,
  onActionClick,
  onCardHover,
  variant = 'base',
  ...props;
}) => {
  const handleMouseEnter = () => {
    if (onCardHover) onCardHover(true)
  };

  const handleMouseLeave = () => {
    if (onCardHover) onCardHover(false)
  };

  if (loading) {
    return (
      <ModularCard;
        variant={premium ? 'gold' : variant} 
        className="animate-pulse"
        {...props}
      >
        <div className="space-y-4">
          {skeleton?.header && (
            <div className="space-y-2">
              <div className="h-4 bg-[var(--hive-text-primary)]/10 rounded w-3/4"></div>
              <div className="h-3 bg-[var(--hive-text-primary)]/10 rounded w-1/2"></div>
            </div>
          )}
          {skeleton?.content && (
            <div className="space-y-2">
              <div className="h-3 bg-[var(--hive-text-primary)]/10 rounded"></div>
              <div className="h-3 bg-[var(--hive-text-primary)]/10 rounded w-5/6"></div>
            </div>
          )}
          {skeleton?.stats && (
            <div className="flex space-x-4">
              <div className="h-8 bg-[var(--hive-text-primary)]/10 rounded w-16"></div>
              <div className="h-8 bg-[var(--hive-text-primary)]/10 rounded w-16"></div>
            </div>
          )}
        </div>
      </ModularCard>
    )
  }

  if (error) {
    return (
      <ModularCard variant="base" className="text-center" {...props}>
        <div className="py-8 space-y-4">
          <div className="text-4xl opacity-50">⚠️</div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-[var(--hive-text-primary)]/80">{error.title}</h3>
            <p className="text-sm text-[var(--hive-text-primary)]/60">{error.description}</p>
          </div>
          {error.action && (
            <button;
              className="px-4 py-2 bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/80 rounded-lg hover:bg-[var(--hive-text-primary)]/20 transition-colors"
              onClick={error.action.onClick}
            >
              {error.action.label}
            </button>
          )}
        </div>
      </ModularCard>
    )
  }

  return (
    <ModularCard;
      variant={premium ? 'gold-strong' : interactive ? 'clickable' : variant}
      className={cn(
        layout === 'horizontal' && 'flex flex-row items-start space-x-4',
        compact && 'p-4',
        draggable && 'cursor-move'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className={cn(
        "space-y-4",
        layout === 'grid' && 'grid grid-cols-2 gap-4 space-y-0'
      )}>
        {/* Header Module */}
        {modules.header && (
          <div className="space-y-2" onClick={() => onModuleClick?.('header')}>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">{modules.header.title}</h3>
                {modules.header.subtitle && (
                  <p className="text-sm text-[var(--hive-text-primary)]/60">{modules.header.subtitle}</p>
                )}
              </div>
              {modules.header.badge && (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                  {modules.header.badge}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content Module */}
        {modules.content && (
          <div className="space-y-3" onClick={() => onModuleClick?.('content')}>
            {modules.content.description && (
              <p className="text-[var(--hive-text-primary)]/80 text-sm leading-relaxed">{modules.content.description}</p>
            )}
            {modules.content.tags && (
              <div className="flex flex-wrap gap-2">
                {modules.content.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/70 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats Module */}
        {modules.stats && (
          <div className="flex justify-between items-center py-3 border-t border-white/10" onClick={() => onModuleClick?.('stats')}>
            {modules.stats.items?.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-lg font-semibold text-[var(--hive-text-primary)]">{stat.value}</div>
                <div className="text-xs text-[var(--hive-text-primary)]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Actions Module */}
        {modules.actions && (
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {modules.actions.primary && (
              <button;
                className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                onClick={() => onActionClick?.(modules.actions.primary.label)}
              >
                {modules.actions.primary.label}
              </button>
            )}
            {modules.actions.secondary && (
              <div className="flex items-center space-x-2">
                {modules.actions.secondary.map((action: any, index: number) => (
                  <button;
                    key={index}
                    className="p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded transition-colors"
                    onClick={() => onActionClick?.(action.label)}
                  >
                    {action.icon} {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ModularCard>
  )
};

export { 
  ModularCard, 
  moduleVariants,
  HeaderModule,
  ContentModule, 
  FooterModule,
  AccentModule,
  ActionModule,
  ModularStack,
  ModularGrid;
};