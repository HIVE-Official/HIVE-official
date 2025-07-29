"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, magneticHover } from '../motion/hive-motion-system';
import { ChevronRight, Home, ArrowRight } from 'lucide-react';

// HIVE Breadcrumbs - Magnetic Navigation Trail with Liquid Metal Motion
// Sophisticated breadcrumb navigation with magnetic hover effects and smooth transitions

const hiveBreadcrumbsVariants = cva(
  // Base breadcrumb styles
  "flex items-center space-x-1 text-sm",
  {
    variants: {
      variant: {
        default: "",
        minimal: "text-xs",
        prominent: "text-base",
      },
      
      separator: {
        chevron: "",
        arrow: "",
        slash: "",
        dot: "",
      }
    },
    defaultVariants: {
      variant: "default",
      separator: "chevron",
    },
  }
);

// Breadcrumb item animation variants
const breadcrumbItemVariants = {
  rest: {
    x: 0,
    scale: 1,
    color: 'color-mix(in_srgb,var(--hive-text-primary)_60%,transparent)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    x: 2,
    scale: 1.02,
    color: 'color-mix(in_srgb,var(--hive-text-primary)_90%,transparent)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  active: {
    x: 0,
    scale: 1,
    color: 'var(--hive-brand-secondary)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

const separatorVariants = {
  rest: {
    opacity: 0.4,
    scale: 1,
    transition: {
      duration: motionDurations.quick,
    }
  },
  hover: {
    opacity: 0.6,
    scale: 1.1,
    transition: {
      duration: motionDurations.quick,
    }
  }
};

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isClickable?: boolean;
}

export interface HiveBreadcrumbsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveBreadcrumbsVariants> {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeIcon?: React.ReactNode;
  onHomeClick?: () => void;
  maxItems?: number;
  showOverflow?: boolean;
}

const HiveBreadcrumbs = React.forwardRef<HTMLDivElement, HiveBreadcrumbsProps>(
  ({ 
    className,
    variant,
    separator: separatorProp,
    items,
    showHome = true,
    homeIcon = <Home size={16} />,
    onHomeClick,
    maxItems = 5,
    showOverflow = true,
    ...props 
  }, ref) => {
    
    // Prepare items with overflow handling
    const displayItems = React.useMemo(() => {
      if (!showOverflow || items.length <= maxItems) {
        return items;
      }
      
      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 2));
      
      return [
        firstItem,
        { id: 'overflow', label: '...', isClickable: false },
        ...lastItems
      ];
    }, [items, maxItems, showOverflow]);
    
    const getSeparatorIcon = () => {
      switch (separatorProp) {
        case 'arrow':
          return <ArrowRight size={14} />;
        case 'slash':
          return <span className="text-[var(--hive-text-primary)]/40">/</span>;
        case 'dot':
          return <span className="text-[var(--hive-text-primary)]/40">•</span>;
        case 'chevron':
        default:
          return <ChevronRight size={14} />;
      }
    };
    
    const handleItemClick = (item: BreadcrumbItem) => {
      if (item.isClickable !== false && (item.onClick || item.href)) {
        item.onClick?.();
      }
    };
    
    return (
      <nav
        ref={ref}
        className={cn(hiveBreadcrumbsVariants({ variant, separator: separatorProp, className }))}
        aria-label="Breadcrumb"
        {...props}
      >
        {/* Home Button */}
        {showHome && (
          <>
            <motion.button
              className="flex items-center space-x-1 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/90 transition-colors"
              variants={breadcrumbItemVariants}
              initial="rest"
              whileHover="hover"
              onClick={onHomeClick}
            >
              {homeIcon}
              <span className="sr-only">Home</span>
            </motion.button>
            
            {displayItems.length > 0 && (
              <motion.div
                className="text-[var(--hive-text-primary)]/40"
                variants={separatorVariants}
                initial="rest"
                whileHover="hover"
              >
                {getSeparatorIcon()}
              </motion.div>
            )}
          </>
        )}
        
        {/* Breadcrumb Items */}
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isClickable = item.isClickable !== false && (item.onClick || item.href);
          const isOverflow = item.id === 'overflow';
          
          return (
            <React.Fragment key={item.id}>
              <motion.div
                className={cn(
                  "flex items-center space-x-2",
                  isClickable && "cursor-pointer",
                  isOverflow && "cursor-default"
                )}
                variants={breadcrumbItemVariants}
                initial="rest"
                animate={isLast ? "active" : "rest"}
                whileHover={isClickable ? "hover" : "rest"}
                onClick={() => handleItemClick(item)}
              >
                {item.icon && (
                  <span className="shrink-0">
                    {item.icon}
                  </span>
                )}
                <span className={cn(
                  "truncate font-medium",
                  isLast && "text-yellow-400",
                  !isLast && !isOverflow && "text-[var(--hive-text-primary)]/60",
                  isOverflow && "text-[var(--hive-text-primary)]/40"
                )}>
                  {item.label}
                </span>
              </motion.div>
              
              {!isLast && (
                <motion.div
                  className="text-[var(--hive-text-primary)]/40 shrink-0"
                  variants={separatorVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  {getSeparatorIcon()}
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }
);

HiveBreadcrumbs.displayName = "HiveBreadcrumbs";

// Breadcrumb Hook for easy state management
export function useHiveBreadcrumbs(initialItems: BreadcrumbItem[] = []) {
  const [items, setItems] = React.useState<BreadcrumbItem[]>(initialItems);
  
  const pushItem = (item: BreadcrumbItem) => {
    setItems(prev => [...prev, item]);
  };
  
  const popItem = () => {
    setItems(prev => prev.slice(0, -1));
  };
  
  const replaceItems = (newItems: BreadcrumbItem[]) => {
    setItems(newItems);
  };
  
  const navigateToIndex = (index: number) => {
    setItems(prev => prev.slice(0, index + 1));
  };
  
  return {
    items,
    pushItem,
    popItem,
    replaceItems,
    navigateToIndex,
    setItems,
  };
}

export { 
  HiveBreadcrumbs,
  hiveBreadcrumbsVariants
};