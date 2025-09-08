"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTools = useTools;
exports.useTool = useTool;
exports.useCreateTool = useCreateTool;
exports.useUpdateTool = useUpdateTool;
exports.useDeleteTool = useDeleteTool;
exports.useExecuteTool = useExecuteTool;
exports.useToolTemplates = useToolTemplates;
exports.useRateTool = useRateTool;
exports.useUpdateToolPermissions = useUpdateToolPermissions;
exports.useShareTool = useShareTool;
exports.useToolAnalytics = useToolAnalytics;
const react_query_1 = require("@tanstack/react-query");
const firestore_1 = require("firebase/firestore");
const core_1 = require("@hive/core");
// Tool CRUD operations
function useTools(spaceId, options) {
    return (0, react_query_1.useQuery)({
        queryKey: ['tools', spaceId],
        queryFn: async () => {
            try {
                const toolsRef = (0, firestore_1.collection)(db, 'tools');
                const q = spaceId
                    ? (0, firestore_1.query)(toolsRef, (0, firestore_1.where)('spaceId', '==', spaceId), (0, firestore_1.orderBy)('createdAt', 'desc'))
                    : (0, firestore_1.query)(toolsRef, (0, firestore_1.orderBy)('createdAt', 'desc'));
                const snapshot = await (0, firestore_1.getDocs)(q);
                return snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            }
            catch (error) {
                core_1.logger.error('Failed to fetch tools', { error });
                throw error;
            }
        },
        ...options
    });
}
function useTool(toolId, options) {
    return (0, react_query_1.useQuery)({
        queryKey: ['tool', toolId],
        queryFn: async () => {
            if (!toolId)
                return null;
            try {
                const toolDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(db, 'tools', toolId));
                if (!toolDoc.exists())
                    return null;
                return {
                    id: toolDoc.id,
                    ...toolDoc.data()
                };
            }
            catch (error) {
                core_1.logger.error('Failed to fetch tool', { error, toolId });
                throw error;
            }
        },
        enabled: !!toolId,
        ...options
    });
}
function useCreateTool() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (tool) => {
            const toolDoc = (0, firestore_1.doc)((0, firestore_1.collection)(db, 'tools'));
            const toolData = {
                ...tool,
                createdAt: (0, firestore_1.serverTimestamp)(),
                updatedAt: (0, firestore_1.serverTimestamp)(),
                executionCount: 0,
                rating: 0,
                ratingCount: 0
            };
            await (0, firestore_1.setDoc)(toolDoc, toolData);
            // Return with actual date strings since serverTimestamp is a placeholder
            return {
                id: toolDoc.id,
                ...tool,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                executionCount: 0,
                rating: 0,
                ratingCount: 0
            };
        },
        onSuccess: (newTool) => {
            // Invalidate tools list
            queryClient.invalidateQueries({ queryKey: ['tools'] });
            // Add to cache
            queryClient.setQueryData(['tool', newTool.id], newTool);
            core_1.logger.info('Tool created successfully', { toolId: newTool.id });
        },
        onError: (error) => {
            core_1.logger.error('Failed to create tool', { error });
        }
    });
}
function useUpdateTool() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ toolId, updates }) => {
            const toolRef = (0, firestore_1.doc)(db, 'tools', toolId);
            const updateData = {
                ...updates,
                updatedAt: (0, firestore_1.serverTimestamp)()
            };
            await (0, firestore_1.updateDoc)(toolRef, updateData);
            return { toolId, updates: updateData };
        },
        onMutate: async ({ toolId, updates }) => {
            // Cancel queries
            await queryClient.cancelQueries({ queryKey: ['tool', toolId] });
            // Optimistic update
            const previousTool = queryClient.getQueryData(['tool', toolId]);
            if (previousTool) {
                queryClient.setQueryData(['tool', toolId], {
                    ...previousTool,
                    ...updates
                });
            }
            return { previousTool };
        },
        onError: (error, variables, context) => {
            // Rollback on error
            if (context?.previousTool) {
                queryClient.setQueryData(['tool', variables.toolId], context.previousTool);
            }
            core_1.logger.error('Failed to update tool', { error });
        },
        onSettled: (data) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: ['tool', data.toolId] });
                queryClient.invalidateQueries({ queryKey: ['tools'] });
            }
        }
    });
}
function useDeleteTool() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (toolId) => {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(db, 'tools', toolId));
            return toolId;
        },
        onSuccess: (toolId) => {
            // Remove from cache
            queryClient.removeQueries({ queryKey: ['tool', toolId] });
            queryClient.invalidateQueries({ queryKey: ['tools'] });
            core_1.logger.info('Tool deleted successfully', { toolId });
        },
        onError: (error) => {
            core_1.logger.error('Failed to delete tool', { error });
        }
    });
}
// Tool execution
function useExecuteTool() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ toolId, inputs, userId }) => {
            // Create execution record
            const executionRef = (0, firestore_1.doc)((0, firestore_1.collection)(db, 'tool_executions'));
            const execution = {
                id: executionRef.id,
                toolId,
                userId,
                inputs,
                outputs: {},
                status: 'running',
                startedAt: new Date().toISOString(),
                completedAt: null
            };
            await (0, firestore_1.setDoc)(executionRef, execution);
            // Update tool execution count
            await (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, 'tools', toolId), {
                executionCount: (0, firestore_1.increment)(1),
                lastExecutedAt: (0, firestore_1.serverTimestamp)()
            });
            // Here you would integrate with your actual tool execution backend
            // For now, we'll simulate execution
            const outputs = await simulateToolExecution(toolId, inputs);
            // Update execution with results
            await (0, firestore_1.updateDoc)(executionRef, {
                outputs,
                status: 'completed',
                completedAt: (0, firestore_1.serverTimestamp)()
            });
            return {
                ...execution,
                outputs,
                status: 'completed'
            };
        },
        onSuccess: (execution) => {
            // Invalidate tool to update execution count
            queryClient.invalidateQueries({ queryKey: ['tool', execution.toolId] });
            queryClient.invalidateQueries({ queryKey: ['tool-executions', execution.toolId] });
            core_1.logger.info('Tool executed successfully', {
                toolId: execution.toolId,
                executionId: execution.id
            });
        },
        onError: (error) => {
            core_1.logger.error('Failed to execute tool', { error });
        }
    });
}
// Tool templates
function useToolTemplates(options) {
    return (0, react_query_1.useQuery)({
        queryKey: ['tool-templates'],
        queryFn: async () => {
            try {
                const templatesRef = (0, firestore_1.collection)(db, 'tool_templates');
                const q = (0, firestore_1.query)(templatesRef, (0, firestore_1.orderBy)('category'), (0, firestore_1.orderBy)('name'));
                const snapshot = await (0, firestore_1.getDocs)(q);
                return snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            }
            catch (error) {
                core_1.logger.error('Failed to fetch tool templates', { error });
                throw error;
            }
        },
        ...options
    });
}
// Tool ratings
function useRateTool() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ toolId, rating, userId }) => {
            // Store individual rating
            const ratingRef = (0, firestore_1.doc)(db, 'tool_ratings', `${toolId}_${userId}`);
            await (0, firestore_1.setDoc)(ratingRef, {
                toolId,
                userId,
                rating,
                createdAt: (0, firestore_1.serverTimestamp)()
            });
            // Update tool aggregate rating
            // In production, this would be done via Cloud Function for accuracy
            await (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, 'tools', toolId), {
                ratingCount: (0, firestore_1.increment)(1),
                // This is simplified - real implementation would recalculate average
                rating: (0, firestore_1.increment)(rating / 100)
            });
            return { toolId, rating };
        },
        onSuccess: ({ toolId }) => {
            queryClient.invalidateQueries({ queryKey: ['tool', toolId] });
            core_1.logger.info('Tool rated successfully', { toolId });
        },
        onError: (error) => {
            core_1.logger.error('Failed to rate tool', { error });
        }
    });
}
// Tool permissions
function useUpdateToolPermissions() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ toolId, permissions }) => {
            await (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, 'tools', toolId), {
                permissions,
                updatedAt: (0, firestore_1.serverTimestamp)()
            });
            return { toolId, permissions };
        },
        onSuccess: ({ toolId }) => {
            queryClient.invalidateQueries({ queryKey: ['tool', toolId] });
            core_1.logger.info('Tool permissions updated', { toolId });
        },
        onError: (error) => {
            core_1.logger.error('Failed to update tool permissions', { error });
        }
    });
}
// Tool sharing
function useShareTool() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ toolId, spaceIds }) => {
            await (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, 'tools', toolId), {
                sharedSpaceIds: (0, firestore_1.arrayUnion)(...spaceIds),
                updatedAt: (0, firestore_1.serverTimestamp)()
            });
            return { toolId, spaceIds };
        },
        onSuccess: ({ toolId }) => {
            queryClient.invalidateQueries({ queryKey: ['tool', toolId] });
            core_1.logger.info('Tool shared successfully', { toolId });
        },
        onError: (error) => {
            core_1.logger.error('Failed to share tool', { error });
        }
    });
}
// Helper function to simulate tool execution
async function simulateToolExecution(toolId, inputs) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Return mock outputs based on tool type
    return {
        result: 'Tool executed successfully',
        processedInputs: inputs,
        timestamp: new Date().toISOString()
    };
}
// Tool analytics
function useToolAnalytics(toolId, options) {
    return (0, react_query_1.useQuery)({
        queryKey: ['tool-analytics', toolId],
        queryFn: async () => {
            try {
                // Fetch execution history
                const executionsRef = (0, firestore_1.collection)(db, 'tool_executions');
                const q = (0, firestore_1.query)(executionsRef, (0, firestore_1.where)('toolId', '==', toolId), (0, firestore_1.orderBy)('startedAt', 'desc'), (0, firestore_1.limit)(100));
                const snapshot = await (0, firestore_1.getDocs)(q);
                const executions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Calculate analytics
                const totalExecutions = executions.length;
                const successRate = executions.filter(e => e.status === 'completed').length / totalExecutions;
                const avgExecutionTime = executions.reduce((acc, e) => {
                    if (e.completedAt && e.startedAt) {
                        return acc + (new Date(e.completedAt).getTime() - new Date(e.startedAt).getTime());
                    }
                    return acc;
                }, 0) / totalExecutions;
                return {
                    totalExecutions,
                    successRate,
                    avgExecutionTime,
                    recentExecutions: executions.slice(0, 10)
                };
            }
            catch (error) {
                core_1.logger.error('Failed to fetch tool analytics', { error, toolId });
                throw error;
            }
        },
        enabled: !!toolId,
        ...options
    });
}
//# sourceMappingURL=tool-queries.js.map