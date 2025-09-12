/**
 * Tool Runtime Engine - Executes tool compositions
 */
import { Tool, ToolComposition, ToolInstance } from './tool';
/**
 * Runtime Context - Manages execution state
 */
interface RuntimeVariable {
    value: unknown;
    type?: string;
}
interface ElementState {
    data?: unknown;
    status?: 'idle' | 'loading' | 'error';
    visible?: boolean;
    config?: Record<string, unknown>;
    [key: string]: unknown;
}
interface RuntimeSnapshot {
    instanceId: string;
    variables: Record<string, RuntimeVariable>;
    elementStates: Record<string, ElementState>;
    errors: string[];
}
type EventHandler = (...args: unknown[]) => void;
export declare class RuntimeContext {
    private instanceId;
    private composition;
    private variables;
    private elementStates;
    private eventHandlers;
    private errors;
    constructor(instanceId: string, composition: ToolComposition, initialVariables?: Record<string, unknown>);
    getVariable(id: string): unknown;
    setVariable(id: string, value: unknown): void;
    getElementState(instanceId: string): ElementState;
    setElementState(instanceId: string, state: ElementState): void;
    updateElementState(instanceId: string, updates: Partial<ElementState>): void;
    on(event: string, handler: EventHandler): void;
    off(event: string, handler: EventHandler): void;
    emit(event: string, data?: unknown): void;
    addError(error: Error): void;
    getErrors(): Error[];
    clearErrors(): void;
    hasErrors(): boolean;
    snapshot(): RuntimeSnapshot;
    static restore(composition: ToolComposition, snapshot: RuntimeSnapshot): RuntimeContext;
}
/**
 * Tool Runtime Engine - Main execution engine
 */
export declare class ToolRuntimeEngine {
    private static instance;
    private registry;
    private instances;
    private contexts;
    private executionQueue;
    private isProcessing;
    private constructor();
    static getInstance(): ToolRuntimeEngine;
    /**
     * Create and start a new tool instance
     */
    createInstance(tool: Tool, composition: ToolComposition, userId: string, spaceId: string, initialData?: Record<string, unknown>): Promise<ToolInstance>;
    /**
     * Execute a tool instance
     */
    execute(instanceId: string): Promise<void>;
    /**
     * Process data flow through connected elements
     */
    private processDataFlow;
    /**
     * Process a single element
     */
    private processElement;
    /**
     * Execute element-specific logic
     */
    private executeElementLogic;
    /**
     * Helper methods
     */
    private applyTransform;
    private evaluateCondition;
    private validateRule;
    private evaluateOperator;
    private calculate;
    private setupEventListeners;
    private executeAction;
    private initializeElements;
    private getComposition;
    /**
     * Instance management methods
     */
    getInstance(instanceId: string): ToolInstance | undefined;
    pauseInstance(instanceId: string): void;
    resumeInstance(instanceId: string): void;
    stopInstance(instanceId: string): void;
    getActiveInstances(): ToolInstance[];
}
export {};
//# sourceMappingURL=tool-runtime.d.ts.map