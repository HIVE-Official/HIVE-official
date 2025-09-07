import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './query-client';

// Types
interface Space {
  id: string;
  name: string;
  handle: string;
  description: string;
  category: string;
  memberCount: number;
  isPublic: boolean;
  isMember: boolean;
  role?: 'member' | 'moderator' | 'admin' | 'owner';
  campusId: string;
  createdAt: Date;
  updatedAt: Date;
  metrics?: {
    activeMembers: number;
    totalPosts: number;
    totalEvents: number;
    totalTools: number;
  };
}

interface SpaceMember {
  id: string;
  userId: string;
  spaceId: string;
  role: 'member' | 'moderator' | 'admin' | 'owner';
  joinedAt: Date;
}

// API functions (these would be imported from your API client)
const fetchSpaces = async (): Promise<Space[]> => {
  const response = await fetch('/api/spaces');
  if (!response.ok) throw new Error('Failed to fetch spaces');
  return response.json();
};

const fetchSpace = async (spaceId: string): Promise<Space> => {
  const response = await fetch(`/api/spaces/${spaceId}`);
  if (!response.ok) throw new Error('Failed to fetch space');
  return response.json();
};

const fetchSpaceMembers = async (spaceId: string): Promise<SpaceMember[]> => {
  const response = await fetch(`/api/spaces/${spaceId}/members`);
  if (!response.ok) throw new Error('Failed to fetch members');
  return response.json();
};

const joinSpaceApi = async (spaceId: string): Promise<Space> => {
  const response = await fetch(`/api/spaces/${spaceId}/join`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to join space');
  return response.json();
};

const leaveSpaceApi = async (spaceId: string): Promise<void> => {
  const response = await fetch(`/api/spaces/${spaceId}/leave`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to leave space');
};

const createPostApi = async (postData: {
  spaceId: string;
  type: string;
  content: string;
  title?: string;
  linkUrl?: string;
  pollOptions?: string[];
}): Promise<{ id: string; success: boolean }> => {
  const { spaceId, ...data } = postData;
  const response = await fetch(`/api/spaces/${spaceId}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
};

// Query Hooks
export function useSpaces() {
  return useQuery({
    queryKey: queryKeys.spaces(),
    queryFn: fetchSpaces,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSpace(spaceId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.space(spaceId!),
    queryFn: () => fetchSpace(spaceId!),
    enabled: !!spaceId,
  });
}

export function useSpaceMembers(spaceId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.spaceMembers(spaceId!),
    queryFn: () => fetchSpaceMembers(spaceId!),
    enabled: !!spaceId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Mutation Hooks with Optimistic Updates
export function useJoinSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinSpaceApi,
    
    // Optimistic update
    onMutate: async (spaceId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.spaces() });
      await queryClient.cancelQueries({ queryKey: queryKeys.space(spaceId) });

      // Snapshot the previous values
      const previousSpaces = queryClient.getQueryData(queryKeys.spaces());
      const previousSpace = queryClient.getQueryData(queryKeys.space(spaceId));

      // Optimistically update spaces list
      queryClient.setQueryData<Space[]>(queryKeys.spaces(), (old) => {
        if (!old) return old;
        return old.map((space) =>
          space.id === spaceId
            ? { ...space, isMember: true, memberCount: space.memberCount + 1 }
            : space
        );
      });

      // Optimistically update single space
      queryClient.setQueryData<Space>(queryKeys.space(spaceId), (old) => {
        if (!old) return old;
        return { ...old, isMember: true, memberCount: old.memberCount + 1 };
      });

      // Return context for rollback
      return { previousSpaces, previousSpace };
    },

    // Rollback on error
    onError: (err, spaceId, context) => {
      if (context?.previousSpaces) {
        queryClient.setQueryData(queryKeys.spaces(), context.previousSpaces);
      }
      if (context?.previousSpace) {
        queryClient.setQueryData(queryKeys.space(spaceId), context.previousSpace);
      }
    },

    // Always refetch after error or success
    onSettled: (data, error, spaceId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.spaces() });
      queryClient.invalidateQueries({ queryKey: queryKeys.space(spaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.spaceMembers(spaceId) });
    },
  });
}

export function useLeaveSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveSpaceApi,
    
    // Optimistic update
    onMutate: async (spaceId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.spaces() });
      await queryClient.cancelQueries({ queryKey: queryKeys.space(spaceId) });

      const previousSpaces = queryClient.getQueryData(queryKeys.spaces());
      const previousSpace = queryClient.getQueryData(queryKeys.space(spaceId));

      // Optimistically update
      queryClient.setQueryData<Space[]>(queryKeys.spaces(), (old) => {
        if (!old) return old;
        return old.map((space) =>
          space.id === spaceId
            ? { ...space, isMember: false, memberCount: Math.max(0, space.memberCount - 1) }
            : space
        );
      });

      queryClient.setQueryData<Space>(queryKeys.space(spaceId), (old) => {
        if (!old) return old;
        return { ...old, isMember: false, memberCount: Math.max(0, old.memberCount - 1) };
      });

      return { previousSpaces, previousSpace };
    },

    onError: (err, spaceId, context) => {
      if (context?.previousSpaces) {
        queryClient.setQueryData(queryKeys.spaces(), context.previousSpaces);
      }
      if (context?.previousSpace) {
        queryClient.setQueryData(queryKeys.space(spaceId), context.previousSpace);
      }
    },

    onSettled: (data, error, spaceId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.spaces() });
      queryClient.invalidateQueries({ queryKey: queryKeys.space(spaceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.spaceMembers(spaceId) });
    },
  });
}

// Additional API functions for space management
const updateSpaceSettingsApi = async (spaceId: string, updates: Partial<Space>): Promise<Space> => {
  const response = await fetch(`/api/spaces/${spaceId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update space settings');
  return response.json();
};

const updateMemberRoleApi = async (spaceId: string, memberId: string, role: string): Promise<void> => {
  const response = await fetch(`/api/spaces/${spaceId}/members`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberId, role }),
  });
  if (!response.ok) throw new Error('Failed to update member role');
};

const removeMemberApi = async (spaceId: string, memberId: string): Promise<void> => {
  const response = await fetch(`/api/spaces/${spaceId}/members`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberId }),
  });
  if (!response.ok) throw new Error('Failed to remove member');
};

// Space Management Mutation Hooks
export function useUpdateSpaceSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spaceId, updates }: { spaceId: string; updates: Partial<Space> }) =>
      updateSpaceSettingsApi(spaceId, updates),
    
    onSuccess: (updatedSpace, { spaceId }) => {
      // Update space cache
      queryClient.setQueryData(queryKeys.space(spaceId), updatedSpace);
      
      // Update spaces list
      queryClient.setQueryData<Space[]>(queryKeys.spaces(), (old) => {
        if (!old) return old;
        return old.map((space) =>
          space.id === spaceId ? { ...space, ...updatedSpace } : space
        );
      });
      
      queryClient.invalidateQueries({ queryKey: queryKeys.spaces() });
    },
  });
}

export function useUpdateMemberRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spaceId, memberId, role }: { spaceId: string; memberId: string; role: string }) =>
      updateMemberRoleApi(spaceId, memberId, role),
    
    onSuccess: (_, { spaceId, memberId, role }) => {
      // Update members cache
      queryClient.setQueryData<SpaceMember[]>(queryKeys.spaceMembers(spaceId), (old) => {
        if (!old) return old;
        return old.map((member) =>
          member.id === memberId 
            ? { ...member, role: role as 'member' | 'moderator' | 'admin' | 'owner' }
            : member
        );
      });
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spaceId, memberId }: { spaceId: string; memberId: string }) =>
      removeMemberApi(spaceId, memberId),
    
    onSuccess: (_, { spaceId, memberId }) => {
      // Remove member from cache
      queryClient.setQueryData<SpaceMember[]>(queryKeys.spaceMembers(spaceId), (old) => {
        if (!old) return old;
        return old.filter((member) => member.id !== memberId);
      });

      // Update member count in space
      queryClient.setQueryData<Space>(queryKeys.space(spaceId), (old) => {
        if (!old) return old;
        return { ...old, memberCount: Math.max(0, old.memberCount - 1) };
      });

      // Update spaces list
      queryClient.setQueryData<Space[]>(queryKeys.spaces(), (old) => {
        if (!old) return old;
        return old.map((space) =>
          space.id === spaceId 
            ? { ...space, memberCount: Math.max(0, space.memberCount - 1) }
            : space
        );
      });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostApi,
    
    onSuccess: (newPost, { spaceId }) => {
      // Invalidate space posts
      queryClient.invalidateQueries({ queryKey: ['space-posts', spaceId] });
      
      // Update space metrics if available
      queryClient.setQueryData<Space>(queryKeys.space(spaceId), (old) => {
        if (!old) return old;
        return {
          ...old,
          metrics: old.metrics ? {
            ...old.metrics,
            totalPosts: old.metrics.totalPosts + 1,
          } : undefined,
        };
      });

      // Update spaces list metrics
      queryClient.setQueryData<Space[]>(queryKeys.spaces(), (old) => {
        if (!old) return old;
        return old.map((space) =>
          space.id === spaceId && space.metrics
            ? {
                ...space,
                metrics: {
                  ...space.metrics,
                  totalPosts: space.metrics.totalPosts + 1,
                },
              }
            : space
        );
      });
    },
  });
}

// Prefetch function for hover interactions
export function usePrefetchSpace() {
  const queryClient = useQueryClient();

  return (spaceId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.space(spaceId),
      queryFn: () => fetchSpace(spaceId),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };
}