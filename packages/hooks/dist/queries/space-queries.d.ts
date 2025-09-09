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
export declare function useSpaces(): import("@tanstack/react-query").UseQueryResult<Space[], Error>;
export declare function useSpace(spaceId: string | undefined): import("@tanstack/react-query").UseQueryResult<Space, Error>;
export declare function useSpaceMembers(spaceId: string | undefined): import("@tanstack/react-query").UseQueryResult<SpaceMember[], Error>;
export declare function useJoinSpace(): import("@tanstack/react-query").UseMutationResult<Space, Error, string, {
    previousSpaces: unknown;
    previousSpace: unknown;
}>;
export declare function useLeaveSpace(): import("@tanstack/react-query").UseMutationResult<void, Error, string, {
    previousSpaces: unknown;
    previousSpace: unknown;
}>;
export declare function useUpdateSpaceSettings(): import("@tanstack/react-query").UseMutationResult<Space, Error, {
    spaceId: string;
    updates: Partial<Space>;
}, unknown>;
export declare function useUpdateMemberRole(): import("@tanstack/react-query").UseMutationResult<void, Error, {
    spaceId: string;
    memberId: string;
    role: string;
}, unknown>;
export declare function useRemoveMember(): import("@tanstack/react-query").UseMutationResult<void, Error, {
    spaceId: string;
    memberId: string;
}, unknown>;
export declare function useCreatePost(): import("@tanstack/react-query").UseMutationResult<{
    id: string;
    success: boolean;
}, Error, {
    spaceId: string;
    type: string;
    content: string;
    title?: string;
    images?: string[];
    linkUrl?: string;
    pollOptions?: string[];
}, unknown>;
export declare function usePrefetchSpace(): (spaceId: string) => void;
export {};
//# sourceMappingURL=space-queries.d.ts.map