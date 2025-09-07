"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSpaces = useSpaces;
exports.useSpace = useSpace;
exports.useSpaceMembers = useSpaceMembers;
exports.useJoinSpace = useJoinSpace;
exports.useLeaveSpace = useLeaveSpace;
exports.useUpdateSpaceSettings = useUpdateSpaceSettings;
exports.useUpdateMemberRole = useUpdateMemberRole;
exports.useRemoveMember = useRemoveMember;
exports.useCreatePost = useCreatePost;
exports.usePrefetchSpace = usePrefetchSpace;
const react_query_1 = require("@tanstack/react-query");
const query_client_1 = require("./query-client");
// API functions (these would be imported from your API client)
const fetchSpaces = async () => {
    const response = await fetch('/api/spaces');
    if (!response.ok)
        throw new Error('Failed to fetch spaces');
    return response.json();
};
const fetchSpace = async (spaceId) => {
    const response = await fetch(`/api/spaces/${spaceId}`);
    if (!response.ok)
        throw new Error('Failed to fetch space');
    return response.json();
};
const fetchSpaceMembers = async (spaceId) => {
    const response = await fetch(`/api/spaces/${spaceId}/members`);
    if (!response.ok)
        throw new Error('Failed to fetch members');
    return response.json();
};
const joinSpaceApi = async (spaceId) => {
    const response = await fetch(`/api/spaces/${spaceId}/join`, {
        method: 'POST',
    });
    if (!response.ok)
        throw new Error('Failed to join space');
    return response.json();
};
const leaveSpaceApi = async (spaceId) => {
    const response = await fetch(`/api/spaces/${spaceId}/leave`, {
        method: 'POST',
    });
    if (!response.ok)
        throw new Error('Failed to leave space');
};
const createPostApi = async (postData) => {
    const { spaceId, ...data } = postData;
    const response = await fetch(`/api/spaces/${spaceId}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok)
        throw new Error('Failed to create post');
    return response.json();
};
// Query Hooks
function useSpaces() {
    return (0, react_query_1.useQuery)({
        queryKey: query_client_1.queryKeys.spaces(),
        queryFn: fetchSpaces,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
function useSpace(spaceId) {
    return (0, react_query_1.useQuery)({
        queryKey: query_client_1.queryKeys.space(spaceId),
        queryFn: () => fetchSpace(spaceId),
        enabled: !!spaceId,
    });
}
function useSpaceMembers(spaceId) {
    return (0, react_query_1.useQuery)({
        queryKey: query_client_1.queryKeys.spaceMembers(spaceId),
        queryFn: () => fetchSpaceMembers(spaceId),
        enabled: !!spaceId,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}
// Mutation Hooks with Optimistic Updates
function useJoinSpace() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: joinSpaceApi,
        // Optimistic update
        onMutate: async (spaceId) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: query_client_1.queryKeys.spaces() });
            await queryClient.cancelQueries({ queryKey: query_client_1.queryKeys.space(spaceId) });
            // Snapshot the previous values
            const previousSpaces = queryClient.getQueryData(query_client_1.queryKeys.spaces());
            const previousSpace = queryClient.getQueryData(query_client_1.queryKeys.space(spaceId));
            // Optimistically update spaces list
            queryClient.setQueryData(query_client_1.queryKeys.spaces(), (old) => {
                if (!old)
                    return old;
                return old.map((space) => space.id === spaceId
                    ? { ...space, isMember: true, memberCount: space.memberCount + 1 }
                    : space);
            });
            // Optimistically update single space
            queryClient.setQueryData(query_client_1.queryKeys.space(spaceId), (old) => {
                if (!old)
                    return old;
                return { ...old, isMember: true, memberCount: old.memberCount + 1 };
            });
            // Return context for rollback
            return { previousSpaces, previousSpace };
        },
        // Rollback on error
        onError: (err, spaceId, context) => {
            if (context?.previousSpaces) {
                queryClient.setQueryData(query_client_1.queryKeys.spaces(), context.previousSpaces);
            }
            if (context?.previousSpace) {
                queryClient.setQueryData(query_client_1.queryKeys.space(spaceId), context.previousSpace);
            }
        },
        // Always refetch after error or success
        onSettled: (data, error, spaceId) => {
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.spaces() });
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.space(spaceId) });
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.spaceMembers(spaceId) });
        },
    });
}
function useLeaveSpace() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: leaveSpaceApi,
        // Optimistic update
        onMutate: async (spaceId) => {
            await queryClient.cancelQueries({ queryKey: query_client_1.queryKeys.spaces() });
            await queryClient.cancelQueries({ queryKey: query_client_1.queryKeys.space(spaceId) });
            const previousSpaces = queryClient.getQueryData(query_client_1.queryKeys.spaces());
            const previousSpace = queryClient.getQueryData(query_client_1.queryKeys.space(spaceId));
            // Optimistically update
            queryClient.setQueryData(query_client_1.queryKeys.spaces(), (old) => {
                if (!old)
                    return old;
                return old.map((space) => space.id === spaceId
                    ? { ...space, isMember: false, memberCount: Math.max(0, space.memberCount - 1) }
                    : space);
            });
            queryClient.setQueryData(query_client_1.queryKeys.space(spaceId), (old) => {
                if (!old)
                    return old;
                return { ...old, isMember: false, memberCount: Math.max(0, old.memberCount - 1) };
            });
            return { previousSpaces, previousSpace };
        },
        onError: (err, spaceId, context) => {
            if (context?.previousSpaces) {
                queryClient.setQueryData(query_client_1.queryKeys.spaces(), context.previousSpaces);
            }
            if (context?.previousSpace) {
                queryClient.setQueryData(query_client_1.queryKeys.space(spaceId), context.previousSpace);
            }
        },
        onSettled: (data, error, spaceId) => {
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.spaces() });
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.space(spaceId) });
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.spaceMembers(spaceId) });
        },
    });
}
// Additional API functions for space management
const updateSpaceSettingsApi = async (spaceId, updates) => {
    const response = await fetch(`/api/spaces/${spaceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!response.ok)
        throw new Error('Failed to update space settings');
    return response.json();
};
const updateMemberRoleApi = async (spaceId, memberId, role) => {
    const response = await fetch(`/api/spaces/${spaceId}/members`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, role }),
    });
    if (!response.ok)
        throw new Error('Failed to update member role');
};
const removeMemberApi = async (spaceId, memberId) => {
    const response = await fetch(`/api/spaces/${spaceId}/members`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
    });
    if (!response.ok)
        throw new Error('Failed to remove member');
};
// Space Management Mutation Hooks
function useUpdateSpaceSettings() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: ({ spaceId, updates }) => updateSpaceSettingsApi(spaceId, updates),
        onSuccess: (updatedSpace, { spaceId }) => {
            // Update space cache
            queryClient.setQueryData(query_client_1.queryKeys.space(spaceId), updatedSpace);
            // Update spaces list
            queryClient.setQueryData(query_client_1.queryKeys.spaces(), (old) => {
                if (!old)
                    return old;
                return old.map((space) => space.id === spaceId ? { ...space, ...updatedSpace } : space);
            });
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.spaces() });
        },
    });
}
function useUpdateMemberRole() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: ({ spaceId, memberId, role }) => updateMemberRoleApi(spaceId, memberId, role),
        onSuccess: (_, { spaceId, memberId, role }) => {
            // Update members cache
            queryClient.setQueryData(query_client_1.queryKeys.spaceMembers(spaceId), (old) => {
                if (!old)
                    return old;
                return old.map((member) => member.id === memberId
                    ? { ...member, role: role }
                    : member);
            });
        },
    });
}
function useRemoveMember() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: ({ spaceId, memberId }) => removeMemberApi(spaceId, memberId),
        onSuccess: (_, { spaceId, memberId }) => {
            // Remove member from cache
            queryClient.setQueryData(query_client_1.queryKeys.spaceMembers(spaceId), (old) => {
                if (!old)
                    return old;
                return old.filter((member) => member.id !== memberId);
            });
            // Update member count in space
            queryClient.setQueryData(query_client_1.queryKeys.space(spaceId), (old) => {
                if (!old)
                    return old;
                return { ...old, memberCount: Math.max(0, old.memberCount - 1) };
            });
            // Update spaces list
            queryClient.setQueryData(query_client_1.queryKeys.spaces(), (old) => {
                if (!old)
                    return old;
                return old.map((space) => space.id === spaceId
                    ? { ...space, memberCount: Math.max(0, space.memberCount - 1) }
                    : space);
            });
        },
    });
}
function useCreatePost() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: createPostApi,
        onSuccess: (newPost, { spaceId }) => {
            // Invalidate space posts
            queryClient.invalidateQueries({ queryKey: ['space-posts', spaceId] });
            // Update space metrics if available
            queryClient.setQueryData(query_client_1.queryKeys.space(spaceId), (old) => {
                if (!old)
                    return old;
                return {
                    ...old,
                    metrics: old.metrics ? {
                        ...old.metrics,
                        totalPosts: old.metrics.totalPosts + 1,
                    } : undefined,
                };
            });
            // Update spaces list metrics
            queryClient.setQueryData(query_client_1.queryKeys.spaces(), (old) => {
                if (!old)
                    return old;
                return old.map((space) => space.id === spaceId && space.metrics
                    ? {
                        ...space,
                        metrics: {
                            ...space.metrics,
                            totalPosts: space.metrics.totalPosts + 1,
                        },
                    }
                    : space);
            });
        },
    });
}
// Prefetch function for hover interactions
function usePrefetchSpace() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (spaceId) => {
        queryClient.prefetchQuery({
            queryKey: query_client_1.queryKeys.space(spaceId),
            queryFn: () => fetchSpace(spaceId),
            staleTime: 10 * 60 * 1000, // 10 minutes
        });
    };
}
//# sourceMappingURL=space-queries.js.map