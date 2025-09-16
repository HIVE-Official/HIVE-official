// Space action utilities for joining, leaving, and managing spaces

export interface SpaceActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

// Import centralized auth utilities
import { getAuthHeaders } from './auth-utils';
import { logger } from '@/lib/logger';


/**
 * Join a space
 */
export async function joinSpace(spaceId: string): Promise<SpaceActionResult> {
  try {
    const headers = getAuthHeaders(true);

    const response = await fetch('/api/spaces/join', {
      method: 'POST',
      headers,
      body: JSON.stringify({ spaceId })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to join space'
      };
    }

    return {
      success: true,
      message: 'Successfully joined space!'
    };

  } catch (error) {
    logger.error('Join space error:', { error: String(error) });
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}

/**
 * Leave a space
 */
export async function leaveSpace(spaceId: string): Promise<SpaceActionResult> {
  try {
    const headers = getAuthHeaders(true);

    const response = await fetch('/api/spaces/leave', {
      method: 'POST',
      headers,
      body: JSON.stringify({ spaceId })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to leave space'
      };
    }

    return {
      success: true,
      message: 'Successfully left space.'
    };

  } catch (error) {
    logger.error('Leave space error:', { error: String(error) });
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}

/**
 * Toggle space pin status
 */
export async function toggleSpacePin(spaceId: string, currentlyPinned: boolean): Promise<SpaceActionResult> {
  try {
    const headers = getAuthHeaders(true);

    const response = await fetch('/api/spaces/my', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ 
        spaceId, 
        action: currentlyPinned ? 'unpin' : 'pin'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to update pin status'
      };
    }

    return {
      success: true,
      message: currentlyPinned ? 'Space unpinned' : 'Space pinned'
    };

  } catch (error) {
    logger.error('Toggle pin error:', { error: String(error) });
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}

/**
 * Mark space as visited (update last visited timestamp)
 */
export async function markSpaceVisited(spaceId: string): Promise<SpaceActionResult> {
  try {
    const headers = getAuthHeaders(true);

    const response = await fetch('/api/spaces/my', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ 
        spaceId, 
        action: 'mark_visited'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to mark as visited'
      };
    }

    return {
      success: true,
      message: 'Marked as visited'
    };

  } catch (error) {
    logger.error('Mark visited error:', { error: String(error) });
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}