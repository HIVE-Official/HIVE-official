interface Space {
    id: string;
    name: string;
    description?: string;
    memberCount: number;
    isPublic: boolean;
    createdAt: Date;
}
interface UseSpacesReturn {
    spaces: Space[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}
export declare function useSpaces(): UseSpacesReturn;
export {};
//# sourceMappingURL=use-spaces.d.ts.map