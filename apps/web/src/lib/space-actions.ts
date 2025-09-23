// Space action utilities for joining, leaving, and managing spaces

export interface SpaceActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Get auth token from session (utility for space actions)
 * WARNING: This is a temporary utility - should use useAuth in components
 */
async function getAuthTokenFromSession(): Promise<string> {
  // This is a temporary utility function for non-component contexts
  // Components should use useAuth().getAuthToken() instead
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      if (!session.token) {
        throw new Error('No valid authentication token found');
      }
      return session.token;
    }
    throw new Error('No session found');
  } catch (error) {
    throw new Error('Authentication required');
  }
}

/**
 * Join a space
 */
export async function joinSpace(spaceId: string): Promise<SpaceActionResult> {
  try {
    const authToken = await getAuthTokenFromSession();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    };

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
    console.error('Join space error:', error);
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
    const authToken = await getAuthTokenFromSession();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    };

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
    console.error('Leave space error:', error);
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
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    const authToken = await getAuthTokenFromSession();
    headers.Authorization = `Bearer ${authToken}`;

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
    console.error('Toggle pin error:', error);
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
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    const authToken = await getAuthTokenFromSession();
    headers.Authorization = `Bearer ${authToken}`;

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
    console.error('Mark visited error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}