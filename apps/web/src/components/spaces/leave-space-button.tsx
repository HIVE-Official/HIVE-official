"use client";

import { useState } from 'react';
import { Button } from "@hive/ui";
import { LogOut, Loader2 } from "lucide-react";

// State Management
import { 
  useLeaveSpace,
  useUIStore,
  useAuthStore
} from '@hive/hooks';

interface LeaveSpaceButtonMigratedProps {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  userRole?: string;
  onLeave?: () => void;
  className?: string;
}

// Export both names for compatibility
export function LeaveSpaceButton({
  spaceId,
  spaceName,
  spaceType,
  userRole = 'member',
  onLeave,
  className
}: LeaveSpaceButtonMigratedProps) {
  // Global state
  const { addToast, showConfirm } = useUIStore();
  const { user } = useAuthStore();
  
  // React Query mutations
  const leaveSpace = useLeaveSpace();

  const isGreekLife = spaceType === 'greek_life';
  const isImportantRole = userRole === 'owner' || userRole === 'admin';

  const handleLeaveClick = () => {
    const variant = isGreekLife || isImportantRole ? 'warning' : 'default';
    
    let message = `Are you sure you want to leave "${spaceName}"?`;
    
    if (isGreekLife) {
      message += '\n\nAs this is a Greek Life organization, you may need special permission to rejoin.';
    }
    
    if (isImportantRole) {
      message += `\n\nYou are currently ${userRole === 'owner' ? 'the owner' : 'an admin'} of this space. Consider transferring your role before leaving.`;
    }

    showConfirm({
      title: 'Leave Space',
      message,
      confirmText: 'Leave Space',
      cancelText: 'Stay',
      variant,
      onConfirm: handleConfirmLeave
    });
  };

  const handleConfirmLeave = async () => {
    if (!user) {
      addToast({
        title: 'Authentication Required',
        description: 'Please log in to leave this space',
        type: 'error',
      });
      return;
    }
    
    leaveSpace.mutate(spaceId, {
      onSuccess: () => {
        addToast({
          title: 'Left Space',
          description: `You have successfully left ${spaceName}`,
          type: 'success',
        });
        
        // Call onLeave callback if provided
        onLeave?.();
        
        // Redirect to spaces page
        window.location.href = '/spaces';
      },
      onError: (error: any) => {
        addToast({
          title: 'Failed to leave space',
          description: error.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
  };

  const getWarningMessage = () => {
    if (isGreekLife) {
      return "Leaving this Greek life organization will allow you to join a different one. This action cannot be undone.";
    }
    
    if (isImportantRole) {
      return `As a ${userRole}, leaving this space may affect its management. Consider transferring your role first.`;
    }
    
    return "Are you sure you want to leave this space? You can rejoin later if the space allows it.";
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLeaveClick}
      className={`border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 ${className}`}
      disabled={leaveSpace.isPending}
    >
      {leaveSpace.isPending ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Leaving...
        </>
      ) : (
        <>
          <LogOut className="h-4 w-4 mr-2" />
          Leave Space
        </>
      )}
    </Button>
  );
}