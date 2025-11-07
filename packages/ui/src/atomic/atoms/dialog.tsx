/**
 * Dialog Component - Compatibility layer for components expecting Dialog
 * Maps to our HiveModal components for consistency
 */

import React from 'react';
import {
  HiveModal,
  HiveModalHeader,
  HiveModalTitle,
  HiveModalDescription,
  HiveModalContent,
  HiveModalFooter
} from './hive-modal';

// Dialog is just an alias for HiveModal
export const Dialog = HiveModal;

// DialogContent wraps the entire modal content
export const DialogContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const props: { className?: string } = {}
  if (className !== undefined) props.className = className
  return <HiveModalContent {...props}>{children}</HiveModalContent>;
};

// DialogHeader maps to HiveModalHeader
export const DialogHeader = HiveModalHeader;

// DialogTitle maps to HiveModalTitle
export const DialogTitle = HiveModalTitle;

// DialogDescription maps to HiveModalDescription
export const DialogDescription = HiveModalDescription;

// DialogFooter maps to HiveModalFooter
export const DialogFooter = HiveModalFooter;

// DialogTrigger is a button that opens the dialog
export const DialogTrigger = ({ children, asChild: _asChild, ..._props }: {
  children: React.ReactNode;
  asChild?: boolean;
  [key: string]: any;
}) => {
  // In a real implementation, this would integrate with Dialog state
  // For now, it's just a passthrough
  return <>{children}</>;
};
