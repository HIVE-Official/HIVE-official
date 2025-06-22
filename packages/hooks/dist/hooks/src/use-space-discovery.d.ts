import type { SpaceDiscoveryData, SpaceSection, SpaceStatus, DiscoveryFilters, DiscoveryResult } from "@hive/core";
/**
 * Hook for space discovery with search and filtering
 */
export declare function useSpaceDiscovery(initialFilters?: DiscoveryFilters): {
    result: DiscoveryResult | undefined;
    spaces: SpaceDiscoveryData[];
    sections: {
        section: SpaceSection;
        count: number;
        spaces: SpaceDiscoveryData[];
    }[];
    totalCount: number;
    hasMore: boolean;
    isLoading: boolean;
    error: Error | null;
    filters: DiscoveryFilters;
    search: (query: string) => void;
    updateFilters: (newFilters: Partial<DiscoveryFilters>) => void;
    filterBySection: (section: SpaceSection | null) => void;
    filterByStatus: (status: SpaceStatus[]) => void;
    sortBy: (sortOption: DiscoveryFilters["sortBy"]) => void;
    loadMore: () => void;
    clearFilters: () => void;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<DiscoveryResult, Error>>;
};
/**
 * Hook for space joining operations
 */
export declare function useSpaceJoining(): {
    joinSpace: (spaceId: string) => void;
    requestJoinSpace: (spaceId: string, message?: string) => void;
    isJoining: boolean;
    isRequestingJoin: boolean;
    joinError: Error | null;
    requestJoinError: Error | null;
};
/**
 * Hook for getting trending spaces
 */
export declare function useTrendingSpaces(limit?: number): {
    trendingSpaces: SpaceDiscoveryData[];
    isLoading: boolean;
    error: Error | null;
};
/**
 * Hook for section-specific space discovery
 */
export declare function useSpacesBySection(section: SpaceSection, limit?: number): {
    spaces: SpaceDiscoveryData[];
    isLoading: boolean;
    error: Error | null;
};
/**
 * Hook for combined space discovery functionality
 */
export declare function useCompleteSpaceDiscovery(initialFilters?: DiscoveryFilters): {
    trendingSpaces: SpaceDiscoveryData[];
    isTrendingLoading: boolean;
    trendingError: Error | null;
    joinSpace: (spaceId: string) => void;
    requestJoinSpace: (spaceId: string, message?: string) => void;
    isJoining: boolean;
    isRequestingJoin: boolean;
    joinError: Error | null;
    requestJoinError: Error | null;
    result: DiscoveryResult | undefined;
    spaces: SpaceDiscoveryData[];
    sections: {
        section: SpaceSection;
        count: number;
        spaces: SpaceDiscoveryData[];
    }[];
    totalCount: number;
    hasMore: boolean;
    isLoading: boolean;
    error: Error | null;
    filters: DiscoveryFilters;
    search: (query: string) => void;
    updateFilters: (newFilters: Partial<DiscoveryFilters>) => void;
    filterBySection: (section: SpaceSection | null) => void;
    filterByStatus: (status: SpaceStatus[]) => void;
    sortBy: (sortOption: DiscoveryFilters["sortBy"]) => void;
    loadMore: () => void;
    clearFilters: () => void;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<DiscoveryResult, Error>>;
};
//# sourceMappingURL=use-space-discovery.d.ts.map