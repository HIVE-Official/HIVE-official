/**
 * HIVE Comprehensive Card Molecule
 * Campus-optimized card system combining header, content, and actions with complete foundation integration
 * 
 * Built using all foundation systems:
 * - Typography: Consistent card text hierarchy with campus font stack
 * - Color: Campus semantic colors and contextual background variants
 * - Layout: Systematic spacing between header, content, and action sections
 * - Icon: Contextual icons for card actions and status indicators
 * - Interaction: Hover states, click feedback, and keyboard navigation
 * - Shadow: Dynamic elevation system for card states and interactions
 * - Border: Consistent radius system and semantic border colors
 * - Motion: Liquid card animations with spring physics and morphing effects
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Foundation system imports
import { typographyComposition } from '../foundations/typography-composition';
import { colorComposition } from '../foundations/color-composition';
import { layoutComposition } from '../foundations/layout-composition';
import { 
  iconComposition,
  MoreVertical,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  Clock,
  Users
} from '../foundations/icon-composition';
import { interactionComposition } from '../foundations/interaction-composition';
import { shadowComposition } from '../foundations/shadow-composition';
import { borderComposition } from '../foundations/border-composition';
import { motionComposition } from '../foundations/motion-composition';

// === CARD VARIANTS ===
const comprehensiveCardVariants = cva(
  // Base card styles using foundation systems
  [
    // Layout foundation
    'relative flex flex-col',
    'w-full',
    
    // Border foundation
    'rounded-lg',
    'border',
    'border-[var(--hive-border-subtle)]',
    
    // Background using color foundation
    'bg-[var(--hive-bg-secondary)]',
    
    // Shadow foundation
    `shadow-[${shadowComposition.scale.raised.shadow}]`,
    
    // Motion foundation
    'transition-all',
    `duration-[${motionComposition.durations.standard.ms}]`,
    
    // Campus social context
    'group'
  ].join(' '),
  {
    variants: {
      variant: {
        // Default campus card
        default: '',
        
        // Elevated with stronger shadow
        elevated: [
          `shadow-[${shadowComposition.scale.floating.shadow}]`,
          'hover:shadow-[var(--hive-shadow-xl)]'
        ].join(' '),
        
        // Interactive card with hover effects
        interactive: [
          'cursor-pointer',
          'hover:bg-[var(--hive-bg-interactive)]',
          'hover:border-[var(--hive-border-glass-strong)]',
          shadowComposition.interactive.cards.interactive.hover,
          'active:scale-[0.98]',
          // Focus ring using border foundation
          'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20'
        ].join(' '),
        
        // Glass morphism effect
        glass: [
          'bg-[var(--hive-bg-tertiary)]/80',
          'backdrop-blur-lg',
          'border-[var(--hive-border-glass)]'
        ].join(' '),
        
        // Campus notification card
        notification: [
          'bg-[var(--hive-info-background)]',
          'border-[var(--hive-info-border)]',
          'border-l-4',
          'border-l-[var(--hive-info-primary)]'
        ].join(' '),
        
        // Campus announcement card
        announcement: [
          'bg-[var(--hive-gold-background)]',
          'border-[var(--hive-gold-border)]',
          'border-l-4',
          'border-l-[var(--hive-gold-primary)]'
        ].join(' ')
      },
      
      size: {
        compact: [
          // Padding using layout foundation
          'p-4',
          layoutComposition.utils.gap[3], // 12px internal gap
          // Header sizing
          '[&_.hive-card-header]:gap-2',
          // Content sizing
          '[&_.hive-card-content]:gap-2'
        ],
        comfortable: [
          // Padding
          'p-5',
          layoutComposition.utils.gap[4], // 16px internal gap
          // Header sizing
          '[&_.hive-card-header]:gap-3',
          // Content sizing
          '[&_.hive-card-content]:gap-3'
        ],
        spacious: [
          // Padding
          'p-6',
          layoutComposition.utils.gap[4], // 16px internal gap
          // Header sizing
          '[&_.hive-card-header]:gap-4',
          // Content sizing
          '[&_.hive-card-content]:gap-4'
        ]
      },
      
      campus: {
        // Standard campus context
        default: '',
        
        // Space card styling
        space: [
          'border-[var(--hive-info-border)]',
          'hover:border-[var(--hive-info-primary)]/50'
        ].join(' '),
        
        // Tool card styling
        tool: [
          'border-[var(--hive-success-border)]',
          'hover:border-[var(--hive-success-primary)]/50'
        ].join(' '),
        
        // Event card styling
        event: [
          'border-[var(--hive-warning-border)]',
          'hover:border-[var(--hive-warning-primary)]/50'
        ].join(' '),
        
        // Profile card styling
        profile: [
          'border-[var(--hive-gold-border)]',
          'hover:border-[var(--hive-gold-primary)]/50'
        ].join(' ')
      }
    },
    
    defaultVariants: {
      variant: 'default',
      size: 'comfortable',
      campus: 'default'
    }
  }
);

// === COMPONENT PROPS ===
export interface ComprehensiveCardProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof comprehensiveCardVariants> {
  
  // Card content sections
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  
  // Header configuration
  title?: string;
  subtitle?: string;
  avatar?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  timestamp?: string;
  
  // Action configuration
  actions?: CardAction[];
  menuActions?: CardMenuAction[];
  
  // Campus context
  campusOptimized?: boolean;
  
  // Interaction
  onClick?: () => void;
  onActionClick?: (actionId: string) => void;
}

// === ACTION TYPES ===
export interface CardAction {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardMenuAction {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

// === CARD HEADER COMPONENT ===
interface CardHeaderComponentProps {
  title?: string;
  subtitle?: string;
  avatar?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  timestamp?: string;
  menuActions?: CardMenuAction[];
  onMenuActionClick?: (actionId: string) => void;
  className?: string;
}

const CardHeaderComponent = React.forwardRef<HTMLDivElement, CardHeaderComponentProps>(
  ({ title, subtitle, avatar, icon: IconComponent, badge, timestamp, menuActions, onMenuActionClick, className }, ref) => {
    const [showMenu, setShowMenu] = React.useState(false);
    
    if (!title && !subtitle && !avatar && !IconComponent) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          'hive-card-header',
          'flex items-start justify-between',
          className
        )}
      >
        {/* Left Content */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Avatar or Icon */}
          {avatar && (
            <img
              src={avatar}
              alt={title || 'Card avatar'}
              className={cn(
                'w-10 h-10 rounded-full object-cover',
                'border border-[var(--hive-border-subtle)]',
                `shadow-[${shadowComposition.scale.raised.shadow}]`
              )}
            />
          )}
          
          {IconComponent && !avatar && (
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              'bg-[var(--hive-bg-subtle)]',
              'border border-[var(--hive-border-subtle)]'
            )}>
              <IconComponent className={cn(
                iconComposition.sizes.base.className,
                'text-[var(--hive-text-secondary)]'
              )} />
            </div>
          )}
          
          {/* Text Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {title && (
                <h3 className={cn(
                  'font-[var(--hive-font-family-primary)]',
                  'font-semibold',
                  `text-[${typographyComposition.scale.base.size}]`,
                  'text-[var(--hive-text-primary)]',
                  'truncate'
                )}>
                  {title}
                </h3>
              )}
              
              {badge && (
                <span className={cn(
                  'inline-flex items-center px-2 py-0.5',
                  'rounded-full',
                  'font-[var(--hive-font-family-primary)]',
                  'font-medium',
                  `text-[${typographyComposition.scale.caption.size}]`,
                  'bg-[var(--hive-gold-background)]',
                  'text-[var(--hive-gold-primary)]',
                  'border border-[var(--hive-gold-border)]'
                )}>
                  {badge}
                </span>
              )}
            </div>
            
            {subtitle && (
              <p className={cn(
                'font-[var(--hive-font-family-primary)]',
                `text-[${typographyComposition.scale.small.size}]`,
                'text-[var(--hive-text-secondary)]',
                'truncate'
              )}>
                {subtitle}
              </p>
            )}
            
            {timestamp && (
              <div className="flex items-center gap-1 mt-1">
                <Clock className={cn(
                  iconComposition.sizes.micro.className,
                  'text-[var(--hive-text-muted)]'
                )} />
                <span className={cn(
                  'font-[var(--hive-font-family-primary)]',
                  `text-[${typographyComposition.scale.caption.size}]`,
                  'text-[var(--hive-text-muted)]'
                )}>
                  {timestamp}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Menu Actions */}
        {menuActions && menuActions.length > 0 && (
          <div className="relative">
            <button
              className={cn(
                'p-1.5 rounded-md',
                'text-[var(--hive-text-muted)]',
                'hover:text-[var(--hive-text-primary)]',
                'hover:bg-[var(--hive-bg-subtle)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20',
                `transition-colors duration-[${motionComposition.durations.fast.ms}]`
              )}
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Card menu"
            >
              <MoreVertical className={iconComposition.sizes.base.className} />
            </button>
            
            {/* Menu Dropdown */}
            {showMenu && (
              <div className={cn(
                'absolute top-full right-0 mt-1 z-10',
                'min-w-[160px]',
                'bg-[var(--hive-bg-tertiary)]',
                'border border-[var(--hive-border-glass)]',
                'rounded-lg',
                `shadow-[${shadowComposition.scale.floating.shadow}]`,
                'backdrop-blur-lg',
                'p-1',
                'animate-in slide-in-from-top-1 fade-in-50'
              )}>
                {menuActions.map(action => (
                  <button
                    key={action.id}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2',
                      'rounded-md',
                      'font-[var(--hive-font-family-primary)]',
                      `text-[${typographyComposition.scale.small.size}]`,
                      'text-left',
                      action.destructive 
                        ? 'text-[var(--hive-error-primary)] hover:bg-[var(--hive-error-background)]'
                        : 'text-[var(--hive-text-primary)] hover:bg-[var(--hive-bg-subtle)]',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      `transition-colors duration-[${motionComposition.durations.fast.ms}]`
                    )}
                    disabled={action.disabled}
                    onClick={() => {
                      action.onClick?.();
                      onMenuActionClick?.(action.id);
                      setShowMenu(false);
                    }}
                  >
                    {action.icon && (
                      <action.icon className={iconComposition.sizes.small.className} />
                    )}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

CardHeaderComponent.displayName = 'CardHeaderComponent';

// === CARD ACTIONS COMPONENT ===
interface CardActionsComponentProps {
  actions?: CardAction[];
  onActionClick?: (actionId: string) => void;
  className?: string;
}

const CardActionsComponent = React.forwardRef<HTMLDivElement, CardActionsComponentProps>(
  ({ actions, onActionClick, className }, ref) => {
    if (!actions || actions.length === 0) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          'hive-card-actions',
          'flex items-center justify-between',
          'pt-4 border-t border-[var(--hive-border-subtle)]',
          className
        )}
      >
        <div className="flex items-center gap-2">
          {actions.map(action => {
            const IconComponent = action.icon;
            
            return (
              <button
                key={action.id}
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5',
                  'rounded-lg',
                  'font-[var(--hive-font-family-primary)]',
                  'font-medium',
                  `text-[${typographyComposition.scale.small.size}]`,
                  'border',
                  // Variant styling
                  action.variant === 'primary' && [
                    'bg-[var(--hive-gold-background)]',
                    'text-[var(--hive-gold-primary)]',
                    'border-[var(--hive-gold-border)]',
                    'hover:bg-[var(--hive-gold-primary)]',
                    'hover:text-[var(--hive-bg-primary)]'
                  ].join(' '),
                  action.variant === 'secondary' && [
                    'bg-[var(--hive-bg-tertiary)]',
                    'text-[var(--hive-text-primary)]',
                    'border-[var(--hive-border-subtle)]',
                    'hover:bg-[var(--hive-bg-subtle)]'
                  ].join(' '),
                  (!action.variant || action.variant === 'ghost') && [
                    'bg-transparent',
                    'text-[var(--hive-text-secondary)]',
                    'border-transparent',
                    'hover:bg-[var(--hive-bg-subtle)]',
                    'hover:text-[var(--hive-text-primary)]'
                  ].join(' '),
                  // States
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20',
                  `transition-all duration-[${motionComposition.durations.fast.ms}]`
                )}
                disabled={action.disabled}
                onClick={() => {
                  action.onClick?.();
                  onActionClick?.(action.id);
                }}
              >
                {IconComponent && (
                  <IconComponent className={iconComposition.sizes.small.className} />
                )}
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

CardActionsComponent.displayName = 'CardActionsComponent';

// === MAIN COMPONENT ===
export const ComprehensiveCard = React.forwardRef<HTMLDivElement, ComprehensiveCardProps>(
  ({
    className,
    variant,
    size,
    campus,
    header,
    content,
    footer,
    title,
    subtitle,
    avatar,
    icon,
    badge,
    timestamp,
    actions,
    menuActions,
    campusOptimized = false,
    onClick,
    onActionClick,
    children,
    ...props
  }, ref) => {
    
    return (
      <div
        ref={ref}
        className={cn(
          comprehensiveCardVariants({ variant, size, campus }),
          // Campus optimizations
          campusOptimized && [
            // Enhanced mobile touch targets
            '[&_button]:min-h-[44px]',
            // Improved mobile spacing
            'gap-3 sm:gap-4',
            // Better mobile borders
            'border-2 sm:border'
          ].join(' '),
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        {...props}
      >
        {/* Header Section */}
        {(header || title || subtitle || avatar || icon) && (
          <CardHeaderComponent
            title={title}
            subtitle={subtitle}
            avatar={avatar}
            icon={icon}
            badge={badge}
            timestamp={timestamp}
            menuActions={menuActions}
            onMenuActionClick={onActionClick}
          />
        )}
        
        {header && (
          <div className="hive-card-header">
            {header}
          </div>
        )}
        
        {/* Content Section */}
        {(content || children) && (
          <div className="hive-card-content flex-1">
            {content || children}
          </div>
        )}
        
        {/* Footer Section */}
        {footer && (
          <div className="hive-card-footer">
            {footer}
          </div>
        )}
        
        {/* Actions Section */}
        <CardActionsComponent
          actions={actions}
          onActionClick={onActionClick}
        />
      </div>
    );
  }
);

ComprehensiveCard.displayName = 'ComprehensiveCard';

// === CAMPUS CARD PRESETS ===
export const campusCardPresets = {
  // Space card preset
  spaceCard: {
    variant: 'interactive' as const,
    campus: 'space' as const,
    actions: [
      { id: 'join', label: 'Join Space', variant: 'primary' as const, icon: Users },
      { id: 'bookmark', label: 'Bookmark', icon: Bookmark }
    ]
  },
  
  // Tool card preset
  toolCard: {
    variant: 'interactive' as const,
    campus: 'tool' as const,
    actions: [
      { id: 'use', label: 'Use Tool', variant: 'primary' as const, icon: ExternalLink },
      { id: 'like', label: 'Like', icon: Heart },
      { id: 'share', label: 'Share', icon: Share2 }
    ]
  },
  
  // Event card preset
  eventCard: {
    variant: 'elevated' as const,
    campus: 'event' as const,
    actions: [
      { id: 'rsvp', label: 'RSVP', variant: 'primary' as const },
      { id: 'share', label: 'Share Event', icon: Share2 }
    ]
  },
  
  // Profile card preset
  profileCard: {
    variant: 'glass' as const,
    campus: 'profile' as const,
    actions: [
      { id: 'connect', label: 'Connect', variant: 'primary' as const },
      { id: 'message', label: 'Message', icon: MessageCircle }
    ]
  }
} as const;

// Types already exported inline above
export { comprehensiveCardVariants };