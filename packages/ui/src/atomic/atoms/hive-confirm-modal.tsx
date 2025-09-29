'use client';

import React from 'react';
import { HiveModal, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalContent, HiveModalFooter } from './hive-modal';
import { HiveButton } from './hive-button';

export interface HiveConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'danger';
  isLoading?: boolean;
}

export function HiveConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
  isLoading = false
}: HiveConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <HiveModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
    >
      <HiveModalHeader onClose={() => onOpenChange(false)}>
        <HiveModalTitle>{title}</HiveModalTitle>
        {description && (
          <HiveModalDescription>{description}</HiveModalDescription>
        )}
      </HiveModalHeader>

      <HiveModalFooter>
        <div className="flex justify-end space-x-3">
          <HiveButton
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelText}
          </HiveButton>
          <HiveButton
            variant={variant === 'danger' ? 'destructive' : 'brand'}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : confirmText}
          </HiveButton>
        </div>
      </HiveModalFooter>
    </HiveModal>
  );
}