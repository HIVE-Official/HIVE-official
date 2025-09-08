import { type UseQueryOptions } from '@tanstack/react-query';
interface Tool {
    id: string;
    name: string;
    description: string;
    spaceId?: string;
    createdBy: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    executionCount: number;
    rating: number;
    ratingCount: number;
    permissions?: string[];
    sharedSpaceIds?: string[];
    inputs?: Record<string, unknown>;
    outputs?: Record<string, unknown>;
}
interface ToolExecution {
    id: string;
    toolId: string;
    userId: string;
    inputs: Record<string, unknown>;
    outputs: Record<string, unknown>;
    status: 'running' | 'completed' | 'failed';
    startedAt: string;
    completedAt: string | null;
}
interface ToolTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    template: Record<string, unknown>;
}
export declare function useTools(spaceId?: string, options?: UseQueryOptions<Tool[]>): import("@tanstack/react-query").UseQueryResult<Tool[], Error>;
export declare function useTool(toolId: string, options?: UseQueryOptions<Tool | null>): import("@tanstack/react-query").UseQueryResult<Tool | null, Error>;
export declare function useCreateTool(): import("@tanstack/react-query").UseMutationResult<Tool, Error, Omit<Tool, "id" | "createdAt" | "updatedAt">, unknown>;
export declare function useUpdateTool(): import("@tanstack/react-query").UseMutationResult<{
    toolId: string;
    updates: {
        updatedAt: import("@firebase/firestore").FieldValue;
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        spaceId?: string | undefined;
        createdBy?: string | undefined;
        createdAt?: string | Date | undefined;
        executionCount?: number | undefined;
        rating?: number | undefined;
        ratingCount?: number | undefined;
        permissions?: string[] | undefined;
        sharedSpaceIds?: string[] | undefined;
        inputs?: Record<string, unknown> | undefined;
        outputs?: Record<string, unknown> | undefined;
    };
}, Error, {
    toolId: string;
    updates: Partial<Tool>;
}, {
    previousTool: Tool | undefined;
}>;
export declare function useDeleteTool(): import("@tanstack/react-query").UseMutationResult<string, Error, string, unknown>;
export declare function useExecuteTool(): import("@tanstack/react-query").UseMutationResult<{
    outputs: Record<string, unknown>;
    status: string;
    id: string;
    toolId: string;
    userId: string;
    inputs: Record<string, unknown>;
    startedAt: string;
    completedAt: string | null;
}, Error, {
    toolId: string;
    inputs: Record<string, unknown>;
    userId: string;
}, unknown>;
export declare function useToolTemplates(options?: UseQueryOptions<ToolTemplate[]>): import("@tanstack/react-query").UseQueryResult<ToolTemplate[], Error>;
export declare function useRateTool(): import("@tanstack/react-query").UseMutationResult<{
    toolId: string;
    rating: number;
}, Error, {
    toolId: string;
    rating: number;
    userId: string;
}, unknown>;
export declare function useUpdateToolPermissions(): import("@tanstack/react-query").UseMutationResult<{
    toolId: string;
    permissions: string[];
}, Error, {
    toolId: string;
    permissions: string[];
}, unknown>;
export declare function useShareTool(): import("@tanstack/react-query").UseMutationResult<{
    toolId: string;
    spaceIds: string[];
}, Error, {
    toolId: string;
    spaceIds: string[];
}, unknown>;
export declare function useToolAnalytics(toolId: string, options?: UseQueryOptions<{
    totalExecutions: number;
    successRate: number;
    avgExecutionTime: number;
    recentExecutions: ToolExecution[];
}>): import("@tanstack/react-query").UseQueryResult<{
    totalExecutions: number;
    successRate: number;
    avgExecutionTime: number;
    recentExecutions: ToolExecution[];
}, Error>;
export {};
//# sourceMappingURL=tool-queries.d.ts.map