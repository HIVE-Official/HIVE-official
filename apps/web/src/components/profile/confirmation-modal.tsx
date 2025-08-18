"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { AlertTriangle, Trash2, Shield } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'destructive' | 'warning' | 'default';
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false
}: ConfirmationModalProps) {
  const getVariantIcon = () => {
    switch (variant) {
      case 'destructive':
        return <Trash2 className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <Shield className="h-5 w-5 text-blue-400" />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return {
          headerBg: 'bg-gradient-to-r from-red-500/10 to-red-600/10',
          border: 'border-red-500/20',
          buttonClass: 'bg-red-500 hover:bg-red-600 text-white'
        };
      case 'warning':
        return {
          headerBg: 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10',
          border: 'border-yellow-500/20',
          buttonClass: 'bg-yellow-500 hover:bg-yellow-600 text-black'
        };
      default:
        return {
          headerBg: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10',
          border: 'border-blue-500/20',
          buttonClass: 'bg-hive-gold hover:bg-hive-champagne text-hive-obsidian'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className={`max-w-md ${styles.border}`}>
        <AlertDialogHeader className={`p-4 rounded-t-lg ${styles.headerBg}`}>
          <AlertDialogTitle className="flex items-center space-x-3">
            {getVariantIcon()}
            <span className="text-white">{title}</span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        <div className="p-6">
          <AlertDialogDescription className="text-hive-text-mutedLight leading-relaxed">
            {description}
          </AlertDialogDescription>
        </div>
        
        <AlertDialogFooter className="p-6 pt-0">
          <AlertDialogCancel 
            onClick={onClose}
            disabled={isLoading}
            className="border-hive-border-default hover:bg-hive-background-secondary"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className={styles.buttonClass}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Preset confirmation modals for common actions
export function DeleteAccountModal(props: Omit<ConfirmationModalProps, 'title' | 'description' | 'variant' | 'confirmText'>) {
  return (
    <ConfirmationModal
      {...props}
      title="Delete Account"
      description="This action cannot be undone. Your profile, posts, and all associated data will be permanently deleted from HIVE."
      confirmText="Delete Account"
      variant="destructive"
    />
  );
}

export function DisconnectIntegrationModal(props: Omit<ConfirmationModalProps, 'title' | 'description' | 'variant' | 'confirmText'> & { integrationName: string }) {
  return (
    <ConfirmationModal
      {...props}
      title={`Disconnect ${props.integrationName}`}
      description={`This will remove access to your ${props.integrationName} data and disable related features. You can reconnect at any time.`}
      confirmText="Disconnect"
      variant="warning"
    />
  );
}

export function EnableGhostModeModal(props: Omit<ConfirmationModalProps, 'title' | 'description' | 'confirmText'>) {
  return (
    <ConfirmationModal
      {...props}
      title="Enable Ghost Mode"
      description="Ghost mode will hide your activity and presence from other users. Your profile will be less discoverable, but you can still use all HIVE features."
      confirmText="Enable Ghost Mode"
    />
  );
}

export function LeaveSpaceModal(props: Omit<ConfirmationModalProps, 'title' | 'description' | 'variant' | 'confirmText'> & { spaceName: string }) {
  return (
    <ConfirmationModal
      {...props}
      title={`Leave ${props.spaceName}`}
      description="You'll lose access to this space's posts, events, and tools. You can rejoin later if the space is public."
      confirmText="Leave Space"
      variant="warning"
    />
  );
}

export function ResetLayoutModal(props: Omit<ConfirmationModalProps, 'title' | 'description' | 'confirmText'>) {
  return (
    <ConfirmationModal
      {...props}
      title="Reset Layout"
      description="This will restore your profile layout to the default configuration. Your custom layout will be lost."
      confirmText="Reset Layout"
    />
  );
}