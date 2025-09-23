/**
 * Modal and Toast System
 * Global notification and dialog infrastructure for HIVE
 */

"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';

// Modal Types
export interface ModalConfig {
  id: string;
  title?: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlay?: boolean;
  closeButton?: boolean;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }>;
}

// Toast Types
export interface ToastConfig {
  id: string;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Modal Context
interface ModalContextType {
  modals: ModalConfig[];
  openModal: (modal: Omit<ModalConfig, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType>({
  modals: [],
  openModal: () => '',
  closeModal: () => {},
  closeAllModals: () => {},
});

export const useModal = () => useContext(ModalContext);

// Toast Context
interface ToastContextType {
  toasts: ToastConfig[];
  showToast: (toast: Omit<ToastConfig, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  showToast: () => '',
  removeToast: () => {},
  clearToasts: () => {},
});

export const useToast = () => useContext(ToastContext);

// Modal Provider
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const openModal = useCallback((modal: Omit<ModalConfig, 'id'>) => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    const newModal = { ...modal, id };
    setModals(prev => [...prev, newModal]);
    return id;
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals(prev => prev.filter(m => m.id !== id));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, closeAllModals }}>
      {children}
      {modals.map(modal => (
        <ModalRenderer key={modal.id} modal={modal} onClose={() => closeModal(modal.id)} />
      ))}
    </ModalContext.Provider>
  );
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const showToast = useCallback((toast: Omit<ToastConfig, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Modal Renderer Component
const ModalRenderer: React.FC<{
  modal: ModalConfig;
  onClose: () => void;
}> = ({ modal, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.closeOnOverlay !== false) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [modal.closeOnOverlay, onClose]);

  if (!mounted) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={modal.closeOnOverlay !== false ? onClose : undefined}
      />

      {/* Modal */}
      <div className={cn(
        'relative w-full bg-black border border-white/10 rounded-xl shadow-2xl',
        'animate-in fade-in zoom-in-95 duration-200',
        sizes[modal.size || 'md']
      )}>
        {/* Header */}
        {(modal.title || modal.closeButton !== false) && (
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            {modal.title && (
              <h2 className="text-xl font-bold text-white">{modal.title}</h2>
            )}
            {modal.closeButton !== false && (
              <button
                onClick={onClose}
                className="ml-auto p-2 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {modal.content}
        </div>

        {/* Actions */}
        {modal.actions && modal.actions.length > 0 && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
            {modal.actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  action.variant === 'primary' && 'bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary-hover)]',
                  action.variant === 'secondary' && 'bg-white/10 text-white hover:bg-white/20',
                  action.variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',
                  !action.variant && 'bg-white/10 text-white hover:bg-white/20'
                )}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById('modal-root') || document.body);
};

// Toast Container Component
const ToastContainer: React.FC<{
  toasts: ToastConfig[];
  onRemove: (id: string) => void;
}> = ({ toasts, onRemove }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const container = (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
      ))}
    </div>
  );

  return createPortal(container, document.getElementById('toast-root') || document.body);
};

// Individual Toast Component
const ToastItem: React.FC<{
  toast: ToastConfig;
  onRemove: () => void;
}> = ({ toast, onRemove }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(onRemove, 200);
  };

  const typeStyles = {
    success: 'border-green-500 bg-green-500/10',
    error: 'border-red-500 bg-red-500/10',
    warning: 'border-orange-500 bg-orange-500/10',
    info: 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10',
  };

  const typeIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={cn(
        'pointer-events-auto min-w- max-w- p-4 rounded-lg',
        'bg-black border shadow-xl',
        'animate-in slide-in-from-right fade-in duration-200',
        isLeaving && 'animate-out slide-out-to-right fade-out duration-200',
        typeStyles[toast.type || 'info']
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span className={cn(
          'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold',
          toast.type === 'success' && 'bg-green-500 text-white',
          toast.type === 'error' && 'bg-red-500 text-white',
          toast.type === 'warning' && 'bg-orange-500 text-white',
          (!toast.type || toast.type === 'info') && 'bg-[var(--hive-brand-secondary)] text-black'
        )}>
          {typeIcons[toast.type || 'info']}
        </span>

        {/* Content */}
        <div className="flex-1">
          {toast.title && (
            <h4 className="font-semibold text-white mb-1">{toast.title}</h4>
          )}
          <p className="text-sm text-white/80">{toast.message}</p>
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary-hover)] transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleRemove}
          className="flex-shrink-0 p-1 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Combined Provider
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModalProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ModalProvider>
  );
};

// Utility Hooks
export const useConfirm = () => {
  const { openModal, closeModal } = useModal();

  const confirm = useCallback((options: {
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info';
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      const modalId = openModal({
        title: options.title || 'Confirm',
        content: (
          <div className="text-white/80">
            {options.message}
          </div>
        ),
        size: 'sm',
        actions: [
          {
            label: options.cancelLabel || 'Cancel',
            variant: 'secondary',
            onClick: () => {
              closeModal(modalId);
              resolve(false);
            },
          },
          {
            label: options.confirmLabel || 'Confirm',
            variant: options.variant === 'danger' ? 'danger' : 'primary',
            onClick: () => {
              closeModal(modalId);
              resolve(true);
            },
          },
        ],
      });
    });
  }, [openModal, closeModal]);

  return confirm;
};

export default {
  ModalProvider,
  ToastProvider,
  NotificationProvider,
  useModal,
  useToast,
  useConfirm,
};