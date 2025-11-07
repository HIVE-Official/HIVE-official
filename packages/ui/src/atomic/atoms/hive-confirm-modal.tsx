'use client';

import React from 'react';
import { HiveModal, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalFooter } from './hive-modal';
import { Button } from './button';

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
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'brand'}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : confirmText}
          </Button>
        </div>
      </HiveModalFooter>
    </HiveModal>
  );
}
