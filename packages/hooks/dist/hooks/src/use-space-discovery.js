import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
/**
 * React hooks for Space Discovery functionality
 * Includes search, filtering, joining, and trending spaces
 */
/**
 * API client for space discovery
 */
const spaceDiscoveryApi = {
    /**
     * Discover spaces with filters
     */
    async discoverSpaces(filters = {}) {
        const params = new URLSearchParams();
        if (filters.section)
            params.append("section", filters.section);
        if (filters.search)
            params.append("search", filters.search);
        if (filters.status)
            filters.status.forEach((status) => params.append("status", status));
        if (filters.sortBy)
            params.append("sortBy", filters.sortBy);
        if (filters.limit)
            params.append("limit", filters.limit.toString());
        if (filters.offset)
            params.append("offset", filters.offset.toString());
        if (filters.hasActivity)
            params.append("hasActivity", "true");
        if (filters.isJoinable)
            params.append("isJoinable", "true");
        const response = await fetch(`/api/spaces/discovery?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Discovery failed: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error || "Discovery failed");
        }
        return data;
    },
    /**
     * Join a space
     */
    async joinSpace(spaceId) {
        const response = await fetch(`/api/spaces/${spaceId}/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to join space: ${response.statusText}`);
        }
        return response.json();
    },
    /**
     * Request to join a space
     */
    async requestJoinSpace(spaceId, message) {
        const response = await fetch(`/api/spaces/${spaceId}/request-join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
        if (!response.ok) {
            throw new Error(`Failed to request join: ${response.statusText}`);
        }
        return response.json();
    },
    /**
     * Get trending spaces
     */
    async getTrendingSpaces(limit = 5) {
        const response = await fetch(`/api/spaces/trending?limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Failed to get trending spaces: ${response.statusText}`);
        }
        const data = await response.json();
        return data.spaces || [];
    },
};
/**
 * Hook for space discovery with search and filtering
 */
export function useSpaceDiscovery(initialFilters = {}) {
    const [filters, setFilters] = useState(initialFilters);
    const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);
    // Debounce filter changes to reduce API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 300);
        return () => clearTimeout(timer);
    }, [filters]);
    // Query for discovering spaces
    const { data: result, isLoading, error, refetch, } = useQuery({
        queryKey: ["space-discovery", debouncedFilters],
        queryFn: () => spaceDiscoveryApi.discoverSpaces(debouncedFilters),
        staleTime: 30 * 1000, // 30 seconds
    });
    // Update filters
    const updateFilters = useCallback((newFilters) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
            // Reset pagination when filters change
            offset: newFilters.offset !== undefined ? newFilters.offset : 0,
        }));
    }, []);
    // Search handler
    const search = useCallback((query) => {
        updateFilters({ search: query });
    }, [updateFilters]);
    // Section filter handler
    const filterBySection = useCallback((section) => {
        updateFilters({ section: section || undefined });
    }, [updateFilters]);
    // Status filter handler
    const filterByStatus = useCallback((status) => {
        updateFilters({ status: status.length > 0 ? status : undefined });
    }, [updateFilters]);
    // Sort handler
    const sortBy = useCallback((sortOption) => {
        updateFilters({ sortBy: sortOption });
    }, [updateFilters]);
    // Load more handler for pagination
    const loadMore = useCallback(() => {
        if (result?.hasMore) {
            const currentOffset = filters.offset || 0;
            const currentLimit = filters.limit || 20;
            updateFilters({ offset: currentOffset + currentLimit });
        }
    }, [result?.hasMore, filters.offset, filters.limit, updateFilters]);
    // Clear filters
    const clearFilters = useCallback(() => {
        setFilters({});
    }, []);
    return {
        // Data
        result,
        spaces: result?.spaces || [],
        sections: result?.sections || [],
        totalCount: result?.totalCount || 0,
        hasMore: result?.hasMore || false,
        // State
        isLoading,
        error: error,
        filters,
        // Actions
        search,
        updateFilters,
        filterBySection,
        filterByStatus,
        sortBy,
        loadMore,
        clearFilters,
        refetch,
    };
}
/**
 * Hook for space joining operations
 */
export function useSpaceJoining() {
    const queryClient = useQueryClient();
    // Join space mutation
    const joinSpaceMutation = useMutation({
        mutationFn: spaceDiscoveryApi.joinSpace,
        onSuccess: (_, spaceId) => {
            // Invalidate discovery queries to update join status
            queryClient.invalidateQueries({ queryKey: ["space-discovery"] });
            queryClient.invalidateQueries({ queryKey: ["user-spaces"] });
            // Could also show success toast here
            console.log(`Successfully joined space ${spaceId}`);
        },
        onError: (error) => {
            console.error("Failed to join space:", error);
            // Could show error toast here
        },
    });
    // Request join mutation
    const requestJoinMutation = useMutation({
        mutationFn: ({ spaceId, message }) => spaceDiscoveryApi.requestJoinSpace(spaceId, message),
        onSuccess: (_, { spaceId }) => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ["space-discovery"] });
            console.log(`Successfully requested to join space ${spaceId}`);
        },
        onError: (error) => {
            console.error("Failed to request join space:", error);
        },
    });
    const joinSpace = useCallback((spaceId) => {
        joinSpaceMutation.mutate(spaceId);
    }, [joinSpaceMutation]);
    const requestJoinSpace = useCallback((spaceId, message) => {
        requestJoinMutation.mutate({ spaceId, message });
    }, [requestJoinMutation]);
    return {
        joinSpace,
        requestJoinSpace,
        // Loading states
        isJoining: joinSpaceMutation.isPending,
        isRequestingJoin: requestJoinMutation.isPending,
        // Error states
        joinError: joinSpaceMutation.error,
        requestJoinError: requestJoinMutation.error,
    };
}
/**
 * Hook for getting trending spaces
 */
export function useTrendingSpaces(limit = 5) {
    const { data: trendingSpaces, isLoading, error, } = useQuery({
        queryKey: ["trending-spaces", limit],
        queryFn: () => spaceDiscoveryApi.getTrendingSpaces(limit),
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
    return {
        trendingSpaces: trendingSpaces || [],
        isLoading,
        error: error,
    };
}
/**
 * Hook for section-specific space discovery
 */
export function useSpacesBySection(section, limit = 10) {
    const filters = useMemo(() => ({
        section,
        limit,
        sortBy: "relevance",
    }), [section, limit]);
    const { data: result, isLoading, error, } = useQuery({
        queryKey: ["spaces-by-section", section, limit],
        queryFn: () => spaceDiscoveryApi.discoverSpaces(filters),
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
    return {
        spaces: result?.spaces || [],
        isLoading,
        error: error,
    };
}
/**
 * Hook for combined space discovery functionality
 */
export function useCompleteSpaceDiscovery(initialFilters = {}) {
    const discovery = useSpaceDiscovery(initialFilters);
    const joining = useSpaceJoining();
    const trending = useTrendingSpaces();
    return {
        ...discovery,
        ...joining,
        trendingSpaces: trending.trendingSpaces,
        isTrendingLoading: trending.isLoading,
        trendingError: trending.error,
    };
}
//# sourceMappingURL=use-space-discovery.js.map