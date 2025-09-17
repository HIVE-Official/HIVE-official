import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const hiveModalVariants = cva(
  '',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full'
      },
      variant: {
        default: '',
        destructive: '',
        success: '',
        premium: ''
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    }
  }
);

export interface HiveModalProps extends 
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>,
  VariantProps<typeof hiveModalVariants> {
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

const HiveModal = forwardRef<HTMLDivElement, HiveModalProps>(
  ({ 
    className,
    isOpen,
    open,
    onClose,
    onOpenChange,
    title,
    description,
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    size,
    variant,
    children,
    ...props 
  }, ref) => {
    const isVisible = open ?? isOpen ?? false;
    
    const handleClose = () => {
      onClose?.();
      onOpenChange?.(false);
    };

    React.useEffect(() => {
      if (!isVisible || !closeOnEscape) return;
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isVisible, closeOnEscape]);

    if (!isVisible) return null;

    return (
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeOnBackdropClick ? handleClose : undefined}
          aria-hidden="true"
        />
        
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            ref={ref}
            className={cn(
              'relative w-full bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] rounded-lg shadow-xl mx-auto',
              hiveModalVariants({ size, variant }),
              className
            )}
            {...props}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between p-6 border-b border-[var(--hive-border-primary)]">
                {title && (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
                      {title}
                    </h2>
                    {description && (
                      <p className="mt-1 text-sm text-[var(--hive-text-secondary)]">
                        {description}
                      </p>
                    )}
                  </div>
                )}
                {showCloseButton && (
                  <button
                    onClick={handleClose}
                    className="ml-auto p-1 rounded-md hover:bg-[var(--hive-interactive-hover)] transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5 text-[var(--hive-text-secondary)]" />
                  </button>
                )}
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

HiveModal.displayName = 'HiveModal';

// Confirm Modal variant
interface HiveConfirmModalProps extends Omit<HiveModalProps, 'children'> {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmVariant?: 'default' | 'destructive' | 'premium';
  loading?: boolean;
}

const HiveConfirmModal = forwardRef<HTMLDivElement, HiveConfirmModalProps>(
  ({ 
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    confirmVariant = 'default',
    loading = false,
    ...props 
  }, ref) => {
    const handleCancel = () => {
      onCancel?.();
      props.onClose?.();
      props.onOpenChange?.(false);
    };

    return (
      <HiveModal ref={ref} {...props}>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-[var(--hive-text-secondary)] hover:bg-[var(--hive-interactive-hover)] rounded-md transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              confirmVariant === 'destructive' && "bg-red-600 text-white hover:bg-red-700",
              confirmVariant === 'premium' && "bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary-hover)]",
              confirmVariant === 'default' && "bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)] hover:opacity-90"
            )}
          >
            {loading ? 'Loading...' : confirmText}
          </button>
        </div>
      </HiveModal>
    );
  }
);

HiveConfirmModal.displayName = 'HiveConfirmModal';

// Alert Modal variant
interface HiveAlertModalProps extends Omit<HiveModalProps, 'children'> {
  message: string;
  actionText?: string;
}

const HiveAlertModal = forwardRef<HTMLDivElement, HiveAlertModalProps>(
  ({ message, actionText = 'OK', ...props }, ref) => {
    return (
      <HiveModal ref={ref} {...props}>
        <div>
          <p className="text-[var(--hive-text-primary)]">{message}</p>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                props.onClose?.();
                props.onOpenChange?.(false);
              }}
              className="px-4 py-2 text-sm font-medium bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)] hover:opacity-90 rounded-md transition-colors"
            >
              {actionText}
            </button>
          </div>
        </div>
      </HiveModal>
    );
  }
);

HiveAlertModal.displayName = 'HiveAlertModal';

export { HiveModal, HiveConfirmModal, HiveAlertModal, hiveModalVariants };