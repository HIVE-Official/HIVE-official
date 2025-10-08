"use client";

import { useState } from 'react';
import { Button } from "@hive/ui";
import { LogOut } from "lucide-react";
import { useConfirm } from '@hive/ui';
import { useAuth } from "@hive/auth-logic";

interface LeaveSpaceButtonProps {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  userRole?: string;
  onLeave?: () => void;
  className?: string;
}

export function LeaveSpaceButton({
  spaceId,
  spaceName,
  spaceType,
  userRole = 'member',
  onLeave,
  className
}: LeaveSpaceButtonProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const confirm = useConfirm();
  const { user } = useAuth();

  const isGreekLife = spaceType === 'greek_life';
  const isImportantRole = userRole === 'owner' || userRole === 'admin';

  const handleLeaveClick = async () => {
    const variant = isGreekLife || isImportantRole ? 'warning' : 'info';

    let message = `Are you sure you want to leave "${spaceName}"?`;

    if (isGreekLife) {
      message += '\n\nAs this is a Greek Life organization, you may need special permission to rejoin.';
    }

    if (isImportantRole) {
      message += `\n\nYou are currently ${userRole === 'owner' ? 'the owner' : 'an admin'} of this space. Consider transferring your role before leaving.`;
    }

    const confirmed = await confirm({
      title: 'Leave Space',
      message,
      confirmLabel: 'Leave Space',
      cancelLabel: 'Stay',
      variant
    });

    if (confirmed) {
      handleConfirmLeave();
    }
  };

  const handleConfirmLeave = async () => {
    if (!user) return;
    
    setIsLeaving(true);
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.id === 'dev_user_123' ? 'test-token' : 'user-token'}`
      };

      const response = await fetch('/api/spaces/leave', {
        method: 'POST',
        headers,
        body: JSON.stringify({ spaceId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to leave space');
      }

      // Call onLeave callback if provided
      onLeave?.();
      
      // Redirect to spaces page
      window.location.href = '/spaces';
    } catch (error: any) {
      // Use alert for now, could use toast notification system later
      alert(error.message || 'Failed to leave space');
    } finally {
      setIsLeaving(false);
    }
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
    <>
      <Button
        variant="outline"
        className={`max-w-sm border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 ${className}`}
        onClick={handleLeaveClick}
        disabled={isLeaving}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Leave Space
      </Button>

    </>
  );
}
