"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, liquidFlow } from '../motion/hive-motion-system';
import { X } from 'lucide-react';

// HIVE Modal System - Matte Obsidian Glass with Liquid Metal Motion;
// Premium modal components that feel like sophisticated hardware interfaces;
const hiveModalVariants = cva(
  // Base modal styles - matte obsidian glass with heavy radius;
  "relative bg-[var(--hive-background-primary)]/60 backdrop-blur-2xl border rounded-2xl shadow-2xl max-w-lg w-full mx-4",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-lg", 
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-7xl",
      },
      
      variant: {
        // Standard modal - matte obsidian glass;
        default: "border-white/20 shadow-black/40",
        
        // Premium modal - gold accent;
        premium: "border-yellow-500/30 shadow-yellow-500/10",
        
        // Destructive modal - red accent;
        destructive: "border-red-500/30 shadow-red-500/10",
        
        // Success modal - green accent;
        success: "border-green-500/30 shadow-green-500/10",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

// Backdrop animation variants;
const backdropVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  visible: {
    opacity: 1,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  }
};

// Modal content animation variants;
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
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
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

export interface HiveModalProps;
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>,
    VariantProps<typeof hiveModalVariants> {
  // Support both patterns for compatibility;
  isOpen?: boolean;
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}

const HiveModal = React.forwardRef<HTMLDivElement, HiveModalProps>(
  ({ 
    className,
    variant,
    size,
    isOpen,
    open,
    onClose,
    onOpenChange,
    title,
    description,
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    children,
    ...props;
  }, ref) => {
    
    // Support both prop patterns;
    const modalIsOpen = open ?? isOpen ?? false;
    const handleClose = onOpenChange ? () => onOpenChange(false) : onClose ?? (() => {});
    
    // Handle escape key;
    useEffect(() => {
      if (!closeOnEscape) return;
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && modalIsOpen) {
          handleClose()
        }}
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape)
    }, [modalIsOpen, handleClose, closeOnEscape]);
    
    // Prevent body scroll when modal is open;
    useEffect(() => {
      if (modalIsOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
      
      return () => {
        document.body.style.overflow = 'unset'
      }}
    }, [modalIsOpen]);
    
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnBackdropClick) {
        handleClose()
      }}
    };
    
    return (
      <AnimatePresence mode="wait">
        {modalIsOpen && (
          <motion.div;
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Backdrop */}
            <motion.div;
              className="absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm"
              variants={backdropVariants}
              onClick={handleBackdropClick}
            />
            
            {/* Modal Content */}
            <motion.div;
              ref={ref}
              className={cn(hiveModalVariants({variant, size, className)})}
              variants={modalVariants}
              {...(props as any)}
            >
              {/* Header */}
              {(title || description || showCloseButton) && (
                <div className="flex items-start justify-between p-8 pb-4">
                  <div className="space-y-2">
                    {title && (
                      <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                  
                  {showCloseButton && (
                    <motion.button;
                      className="text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors p-2 -mt-2 -mr-2"
                      onClick={handleClose}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  )}
                </div>
              )}
              
              {/* Body */}
              <div className={cn(
                "px-8",
                (title || description || showCloseButton) ? "pb-8" : "py-8"
              )}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
);

HiveModal.displayName = "HiveModal";

// Pre-built Modal Variants for common use cases;
interface HiveConfirmModalProps extends Omit<HiveModalProps, 'children'> {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmVariant?: 'default' | 'destructive' | 'premium';
  loading?: boolean;
}

const HiveConfirmModal = React.forwardRef<HTMLDivElement, HiveConfirmModalProps>(
  ({ 
    confirmText = "Confirm",
    cancelText = "Cancel", 
    onConfirm,
    onCancel,
    confirmVariant = 'default',
    loading = false,
    onClose,
    ...props;
  }, ref) => {
    
    const handleCancel = () => {
      onCancel?.();
      onClose()
    };
    
    const handleConfirm = () => {
      onConfirm();
      if (!loading) {
        onClose()
      }}
    };
    
    const confirmButtonClass = {
      default: "bg-[var(--hive-text-primary)]/10 hover:bg-[var(--hive-text-primary)]/20 text-[var(--hive-text-primary)] border-white/20",
      destructive: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30",
      premium: "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30"
    }[confirmVariant];
    
    return (
      <HiveModal ref={ref} onClose={onClose} {...props}>
        <div className="flex justify-end space-x-4 mt-8">
          <motion.button;
            className="px-6 py-3 rounded-xl bg-[var(--hive-text-primary)]/5 hover:bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/80 border border-white/10 transition-all"
            onClick={handleCancel}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cancelText}
          </motion.button>
          
          <motion.button;
            className={cn(
              "px-6 py-3 rounded-xl border transition-all",
              confirmButtonClass,
              loading && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleConfirm}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <motion.div;
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Loading...</span>
              </div>
            ) : (
              confirmText;
            )}
          </motion.button>
        </div>
      </HiveModal>
    )
  }
);

HiveConfirmModal.displayName = "HiveConfirmModal";

// Alert Modal for notifications;
interface HiveAlertModalProps extends Omit<HiveModalProps, 'children'> {
  message: string;
  actionText?: string;
}

const HiveAlertModal = React.forwardRef<HTMLDivElement, HiveAlertModalProps>(
  ({ 
    message,
    actionText = "OK",
    onClose,
    ...props;
  }, ref) => {
    return (
      <HiveModal ref={ref} onClose={onClose} {...props}>
        <div className="text-center">
          <p className="text-gray-300 leading-relaxed mb-8">
            {message}
          </p>
          
          <motion.button;
            className="px-8 py-3 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 transition-all"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {actionText}
          </motion.button>
        </div>
      </HiveModal>
    )
  }
);

HiveAlertModal.displayName = "HiveAlertModal";

export { 
  HiveModal,
  HiveConfirmModal,
  HiveAlertModal,
  hiveModalVariants;
};