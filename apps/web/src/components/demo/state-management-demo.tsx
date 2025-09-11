'use client';

import React from 'react';
import { 
  useAuthStore, 
  useUIStore, 
  useHiveStore,
  useSpaces,
  useJoinSpace,
  useLeaveSpace 
} from '@hive/hooks';
import { Button } from '@hive/ui';

export function StateManagementDemo() {
  // Zustand stores
  const { user, isAuthenticated, setUser } = useAuthStore();
  const { sidebarOpen, toggleSidebar, addToast } = useUIStore();
  const { activeSpace, setActiveSpace, feedFilter, setFeedFilter } = useHiveStore();
  
  // React Query hooks
  const { data: spaces, isLoading, error } = useSpaces();
  const joinSpace = useJoinSpace();
  const leaveSpace = useLeaveSpace();

  const handleJoinSpace = (spaceId: string) => {
    joinSpace.mutate(spaceId, {
      onSuccess: () => {
        addToast({
          title: 'Joined Space!',
          description: 'You have successfully joined the space.',
          type: 'success',
        });
      },
      onError: () => {
        addToast({
          title: 'Failed to join',
          description: 'There was an error joining the space.',
          type: 'error',
        });
      },
    });
  };

  const handleLeaveSpace = (spaceId: string) => {
    leaveSpace.mutate(spaceId, {
      onSuccess: () => {
        addToast({
          title: 'Left Space',
          description: 'You have left the space.',
          type: 'info',
        });
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">State Management Demo</h2>
        
        {/* Auth State */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Auth State (Zustand)</h3>
          <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>User: {user?.email || 'Not logged in'}</p>
          <Button
            onClick={() => setUser(isAuthenticated ? null : { email: 'demo@hive.com' } as any)}
            className="mt-2"
          >
            {isAuthenticated ? 'Logout' : 'Mock Login'}
          </Button>
        </div>

        {/* UI State */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">UI State (Zustand)</h3>
          <p>Sidebar: {sidebarOpen ? 'Open' : 'Closed'}</p>
          <Button onClick={toggleSidebar} className="mt-2">
            Toggle Sidebar
          </Button>
          <Button 
            onClick={() => addToast({ 
              title: 'Test Toast', 
              description: 'This is a test notification',
              type: 'info' 
            })}
            className="mt-2 ml-2"
          >
            Show Toast
          </Button>
        </div>

        {/* Feed Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Feed Filter (Zustand)</h3>
          <p>Current Filter: {feedFilter}</p>
          <div className="space-x-2 mt-2">
            {['all', 'spaces', 'following', 'rituals'].map((filter: any) => (
              <Button
                key={filter}
                onClick={() => setFeedFilter(filter as any)}
                variant={feedFilter === filter ? 'default' : 'outline'}
                size="sm"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Spaces with React Query */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Spaces (React Query)</h3>
          {isLoading && <p>Loading spaces...</p>}
          {error && <p className="text-red-500">Error loading spaces</p>}
          {spaces && (
            <div className="space-y-2 mt-2">
              {spaces.slice(0, 3).map((space: any) => (
                <div key={space.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{space.name}</p>
                    <p className="text-sm text-gray-500">
                      {space.memberCount} members • {space.isMember ? 'Joined' : 'Not joined'}
                    </p>
                  </div>
                  <Button
                    onClick={() => 
                      space.isMember 
                        ? handleLeaveSpace(space.id)
                        : handleJoinSpace(space.id)
                    }
                    variant={space.isMember ? 'outline' : 'default'}
                    size="sm"
                    disabled={joinSpace.isPending || leaveSpace.isPending}
                  >
                    {space.isMember ? 'Leave' : 'Join'}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}