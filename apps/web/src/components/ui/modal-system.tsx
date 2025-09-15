"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { logger } from '@hive/core/utils/logger';

import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
// Using native button element instead of UI package button due to import issues

// Modal types and interfaces
interface BaseModalProps {
  id: string;
  title: string;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeable?: boolean;
}

interface ConfirmModalData {
  type: 'confirm';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive' | 'warning';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface CustomModalData {
  type: 'custom';
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  size?: BaseModalProps['size'];
}

interface FormModalData {
  type: 'form';
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  size?: BaseModalProps['size'];
  onSubmit?: (data: any) => void | Promise<void>;
}

type ModalData = ConfirmModalData | CustomModalData | FormModalData;

interface ModalContextType {
  openModal: (data: ModalData) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

// Modal provider component
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<Map<string, ModalData & { id: string }>>(new Map());

  const openModal = useCallback((data: ModalData): string => {
    const id = `modal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setModals(prev => new Map(prev).set(id, { ...data, id }));
    return id;
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals(prev => {
      const newModals = new Map(prev);
      newModals.delete(id);
      return newModals;
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModals(new Map());
  }, []);

  const contextValue: ModalContextType = {
    openModal,
    closeModal,
    closeAllModals
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {Array.from(modals.values()).map(modal => (
        <ModalRenderer key={modal.id} modal={modal} onClose={() => closeModal(modal.id)} />
      ))}
    </ModalContext.Provider>
  );
}

// Modal renderer component
function ModalRenderer({ modal, onClose }: { modal: ModalData & { id: string }; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmAction = async (action?: () => void | Promise<void>) => {
    if (!action) return;
    
    try {
      setIsLoading(true);
      await action();
      onClose();
    } catch (error) {
      logger.error('Modal action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getModalSize = (size?: BaseModalProps['size']) => {
    switch (size) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      case 'full': return 'max-w-full mx-4';
      default: return 'max-w-md';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-hive-background-primary border border-hive-border-primary rounded-2xl w-full ${getModalSize(modal.size)} max-h-[90vh] overflow-hidden shadow-2xl`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-hive-border-subtle">
          <h2 className="text-xl font-semibold text-hive-text-primary">{modal.title}</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 text-hive-text-secondary hover:text-hive-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {modal.type === 'confirm' && (
            <ConfirmModalContent 
              modal={modal} 
              onConfirm={() => handleConfirmAction(modal.onConfirm)}
              onCancel={() => {
                modal.onCancel?.();
                onClose();
              }}
              isLoading={isLoading}
            />
          )}
          
          {modal.type === 'custom' && (
            <CustomModalContent modal={modal} onClose={onClose} />
          )}
          
          {modal.type === 'form' && (
            <FormModalContent 
              modal={modal} 
              onSubmit={(data) => handleConfirmAction(() => modal.onSubmit?.(data))}
              onClose={onClose}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Confirm modal content
function ConfirmModalContent({ 
  modal, 
  onConfirm, 
  onCancel, 
  isLoading 
}: { 
  modal: ConfirmModalData; 
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const getIcon = () => {
    switch (modal.variant) {
      case 'destructive': return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case 'warning': return <AlertCircle className="w-6 h-6 text-yellow-400" />;
      default: return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  const getConfirmbuttonClass = () => {
    switch (modal.variant) {
      case 'destructive': return 'bg-red-600 hover:bg-red-700 text-[var(--hive-text-inverse)]';
      case 'warning': return 'bg-yellow-600 hover:bg-yellow-700 text-[var(--hive-text-inverse)]';
      default: return 'bg-hive-brand-primary hover:bg-hive-interactive-hover text-hive-background-primary';
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        {getIcon()}
      </div>
      
      <p className="text-hive-text-secondary leading-relaxed">
        {modal.message}
      </p>
      
      <div className="flex gap-3 justify-center">
        <button
          onClick={onCancel}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-hive-border-secondary text-hive-text-secondary hover:bg-hive-background-elevated"
          disabled={isLoading}
        >
          {modal.cancelText || 'Cancel'}
        </button>
        
        <button
          onClick={onConfirm}
          className={getConfirmbuttonClass()}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : (modal.confirmText || 'Confirm')}
        </button>
      </div>
    </div>
  );
}

// Custom modal content
function CustomModalContent({ modal, onClose }: { modal: CustomModalData; onClose: () => void }) {
  const Component = modal.component;
  return <Component {...(modal.props || {})} onClose={onClose} />;
}

// Form modal content
function FormModalContent({ 
  modal, 
  onSubmit, 
  onClose, 
  isLoading 
}: { 
  modal: FormModalData; 
  onSubmit: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
}) {
  const Component = modal.component;
  return (
    <Component 
      {...(modal.props || {})} 
      onSubmit={onSubmit}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
}

// Hook to use the modal system
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

// Helper functions for common modal types
export const useModalHelpers = () => {
  const { openModal, closeModal } = useModal();

  const confirmModal = useCallback((options: Omit<ConfirmModalData, 'type'>) => {
    return openModal({ type: 'confirm', ...options });
  }, [openModal]);

  const customModal = useCallback((options: Omit<CustomModalData, 'type'>) => {
    return openModal({ type: 'custom', ...options });
  }, [openModal]);

  const formModal = useCallback((options: Omit<FormModalData, 'type'>) => {
    return openModal({ type: 'form', ...options });
  }, [openModal]);

  return {
    confirm: confirmModal,
    custom: customModal,
    form: formModal,
    close: closeModal
  };
};