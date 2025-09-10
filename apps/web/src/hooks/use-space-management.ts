import { useState } from 'react';
import { authenticatedFetch } from '@/lib/auth-utils';
import { logger } from '@/lib/structured-logger';

export interface SpaceSettings {
  name?: string;
  description?: string;
  bannerUrl?: string;
  tags?: Array<{
    type: string;
    sub_type: string;
  }>;
  settings?: {
    allowMemberPosts?: boolean;
    requireApproval?: boolean;
    allowGuestView?: boolean;
    maxMembers?: number;
  };
  // Additional settings for leader tools
  primaryColor?: string;
  rules?: string[];
  coordinationTypes?: string[];
  enabledTools?: string[];
}

interface UseSpaceManagementResult {
  updateSettings: (settings: SpaceSettings) => Promise<void>;
  changeUserRole: (userId: string, newRole: 'admin' | 'moderator' | 'member') => Promise<void>;
  removeMember: (userId: string) => Promise<void>;
  blockMember: (userId: string, action: 'suspend' | 'unsuspend') => Promise<void>;
  inviteMember: (userId: string, role?: string) => Promise<void>;
  updating: boolean;
  error: Error | null;
}

export function useSpaceManagement(spaceId: string | undefined): UseSpaceManagementResult {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Update space settings
  const updateSettings = async (settings: SpaceSettings): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    try {
      setUpdating(true);
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update space settings: ${response.statusText}`);
      }

      logger.info('Successfully updated space settings', { 
        spaceId,
        updatedFields: Object.keys(settings)
      });
    } catch (err) {
      logger.error('Error updating space settings', { 
        error: err, 
        spaceId 
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  // Change a member's role
  const changeUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'member'): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    try {
      setUpdating(true);
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/members`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          role: newRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to change member role: ${response.statusText}`);
      }

      logger.info('Successfully changed member role', { 
        spaceId,
        userId,
        newRole 
      });
    } catch (err) {
      logger.error('Error changing member role', { 
        error: err, 
        spaceId,
        userId,
        newRole
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  // Remove a member from the space
  const removeMember = async (userId: string): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    try {
      setUpdating(true);
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/members?userId=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to remove member: ${response.statusText}`);
      }

      logger.info('Successfully removed member', { 
        spaceId,
        userId 
      });
    } catch (err) {
      logger.error('Error removing member', { 
        error: err, 
        spaceId,
        userId
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  // Suspend or unsuspend a member
  const blockMember = async (userId: string, action: 'suspend' | 'unsuspend'): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    try {
      setUpdating(true);
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/members`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          action,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${action} member: ${response.statusText}`);
      }

      logger.info(`Successfully ${action}ed member`, { 
        spaceId,
        userId,
        action 
      });
    } catch (err) {
      logger.error(`Error ${action}ing member`, { 
        error: err, 
        spaceId,
        userId,
        action
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  // Invite a new member to the space
  const inviteMember = async (userId: string, role: string = 'member'): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    try {
      setUpdating(true);
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to invite member: ${response.statusText}`);
      }

      logger.info('Successfully invited member', { 
        spaceId,
        userId,
        role 
      });
    } catch (err) {
      logger.error('Error inviting member', { 
        error: err, 
        spaceId,
        userId,
        role
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    updateSettings,
    changeUserRole,
    removeMember,
    blockMember,
    inviteMember,
    updating,
    error
  };
}