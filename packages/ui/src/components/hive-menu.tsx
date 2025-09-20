"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { ChevronDown, ChevronRight, Check, Circle } from 'lucide-react';

// HIVE Menu System - Magnetic Dropdown Navigation with Liquid Metal Motion
// Sophisticated menu components with magnetic interactions and multi-level support

const hiveMenuVariants = cva(
  // Base menu styles - matte obsidian glass
  "relative inline-block",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
        outline: "",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const menuContentVariants = cva(
  // Menu dropdown styles
  "absolute z-50 min-w-48 bg-[var(--hive-background-primary)]/60 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden",
  {
    variants: {
      position: {
        bottom: "top-full mt-2",
        top: "bottom-full mb-2",
        left: "right-0",
        right: "left-0",
      },
      size: {
        sm: "min-w-32",
        default: "min-w-48",
        lg: "min-w-64",
        xl: "min-w-80",
      }
    },
    defaultVariants: {
      position: "bottom",
      size: "default",
    },
  }
);

// Menu item animation variants
const menuItemVariants = {
  rest: {
    x: 0,
    backgroundColor: 'var(--hive-interactive-hover)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    x: 4,
    backgroundColor: 'var(--hive-interactive-active)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  active: {
    x: 6,
    backgroundColor: 'color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

// Menu dropdown animation
const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      staggerChildren: cascadeTiming.stagger,
    }
  }
};

const menuItemStaggerVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  }
};

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  separator?: boolean;
  children?: MenuItem[];
  selected?: boolean;
  description?: string
}

export interface HiveMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveMenuVariants> {
  items: MenuItem[];
  trigger: React.ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  closeOnSelect?: boolean;
  disabled?: boolean
}

const HiveMenu = React.forwardRef<HTMLDivElement, HiveMenuProps>(
  ({ 
    className,
    variant,
    items,
    trigger,
    position = 'bottom',
    size = 'default',
    closeOnSelect = true,
    disabled = false,
    ...props 
  }, ref) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSubmenus, setExpandedSubmenus] = useState<Set<string>>(new Set());
    const menuRef = useRef<HTMLDivElement>(null);
    
    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setExpandedSubmenus(new Set())
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, []);
    
    // Close on escape
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          setExpandedSubmenus(new Set())
        }
      };
      
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape)
      }
    }, [isOpen]);
    
    const toggleMenu = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) {
          setExpandedSubmenus(new Set())
        }
      }
    };
    
    const toggleSubmenu = (itemId: string) => {
      const newExpanded = new Set(expandedSubmenus);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId)
      } else {
        newExpanded.add(itemId)
      }
      setExpandedSubmenus(newExpanded)
    };
    
    const handleItemClick = (item: MenuItem) => {
      if (item.disabled) return;
      
      if (item.children && item.children.length > 0) {
        toggleSubmenu(item.id)
      } else {
        if (closeOnSelect) {
          setIsOpen(false);
          setExpandedSubmenus(new Set())
        }
        item.onClick?.()
      }
    };
    
    const renderMenuItem = (item: MenuItem, level = 0) => {
      if (item.separator) {
        return (
          <div key={`separator-${item.id}`} className="border-t border-white/10 my-1" />
        )
      }
      
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedSubmenus.has(item.id);
      
      return (
        <div key={item.id}>
          <motion.button
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors",
              level > 0 && "pl-8",
              item.disabled && "opacity-50 cursor-not-allowed",
              item.selected && "text-yellow-400",
              !item.disabled && !item.selected && "text-[var(--hive-text-primary)]/80"
            )}
            variants={menuItemVariants}
            initial="rest"
            animate={item.selected ? "active" : "rest"}
            whileHover={!item.disabled ? "hover" : "rest"}
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {item.icon && (
                <div className={cn(
                  "shrink-0",
                  item.selected ? "text-yellow-400" : "text-[var(--hive-text-primary)]/60"
                )}>
                  {item.icon}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-xs text-[var(--hive-text-primary)]/50 truncate">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 shrink-0">
              {item.selected && (
                <Check size={14} className="text-yellow-400" />
              )}
              
              {item.shortcut && (
                <span className="text-xs font-mono text-[var(--hive-text-primary)]/40 bg-[var(--hive-text-primary)]/5 px-2 py-0.5 rounded border border-white/10">
                  {item.shortcut}
                </span>
              )}
              
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: motionDurations.quick }}
                >
                  <ChevronRight size={14} className="text-[var(--hive-text-primary)]/40" />
                </motion.div>
              )}
            </div>
          </motion.button>
          
          {/* Submenu */}
          <AnimatePresence>
            {hasChildren && isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: motionDurations.smooth,
                  ease: liquidMetal.easing as any,
          }}
                className="overflow-hidden border-l border-white/10 ml-6"
              >
                {item.children?.map(child => renderMenuItem(child, level + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    };
    
    return (
      <div
        ref={menuRef}
        className={cn(hiveMenuVariants({ variant, className }))}
        {...props}
      >
        {/* Menu Trigger */}
        <motion.div
          className={cn(
            "cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={toggleMenu}
          whileHover={!disabled ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
        >
          {trigger}
        </motion.div>
        
        {/* Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={cn(menuContentVariants({ position, size }))}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="py-2">
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    variants={menuItemStaggerVariants}
                  >
                    {renderMenuItem(item)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
);

HiveMenu.displayName = "HiveMenu";

// Menu Button Component for common use cases
interface HiveMenuButtonProps extends Omit<HiveMenuProps, 'trigger'> {
  label: string;
  icon?: React.ReactNode;
  showChevron?: boolean;
  buttonVariant?: 'default' | 'ghost' | 'outline'
}

const HiveMenuButton = React.forwardRef<HTMLDivElement, HiveMenuButtonProps>(
  ({ 
    label,
    icon,
    showChevron = true,
    buttonVariant = 'default',
    ...props 
  }, ref) => {
    
    const buttonClass = {
      default: "bg-[var(--hive-text-primary)]/10 hover:bg-[var(--hive-text-primary)]/20 text-[var(--hive-text-primary)] border border-white/20",
      ghost: "hover:bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/80",
      outline: "border border-white/30 hover:bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-primary)]/80"
    }[buttonVariant];
    
    const trigger = (
      <div className={cn(
        "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all",
        buttonClass
      )}>
        {icon && <span>{icon}</span>}
        <span className="font-medium">{label}</span>
        {showChevron && (
          <ChevronDown size={16} className="text-[var(--hive-text-primary)]/60" />
        )}
      </div>
    );
    
    return (
      <HiveMenu
        ref={ref}
        trigger={trigger}
        {...props}
      />
    )
  }
);

HiveMenuButton.displayName = "HiveMenuButton";

// Context Menu Hook
export function useHiveContextMenu(items: MenuItem[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const openContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    setIsOpen(true)
  };
  
  const closeContextMenu = () => {
    setIsOpen(false)
  };
  
  return {
    isOpen,
    position,
    items,
    openContextMenu,
    closeContextMenu,
    contextMenuProps: {
      onContextMenu: openContextMenu,
    },
  }
}

export { 
  HiveMenu,
  HiveMenuButton,
  hiveMenuVariants
};