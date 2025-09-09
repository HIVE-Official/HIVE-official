/**
 * Tool Runtime Engine - Executes tool compositions
 */
import { Tool, ToolComposition, ToolInstance } from './tool';
/**
 * Runtime Context - Manages execution state
 */
export declare class RuntimeContext {
    private instanceId;
    private composition;
    private variables;
    private elementStates;
    private eventHandlers;
    private errors;
    constructor(instanceId: string, composition: ToolComposition, initialVariables?: Record<string, any>);
    getVariable(id: string): any;
    setVariable(id: string, value: any): void;
    getElementState(instanceId: string): any;
    setElementState(instanceId: string, state: any): void;
    updateElementState(instanceId: string, updates: any): void;
    on(event: string, handler: Function): void;
    off(event: string, handler: Function): void;
    emit(event: string, data?: any): void;
    addError(error: Error): void;
    getErrors(): Error[];
    clearErrors(): void;
    hasErrors(): boolean;
    snapshot(): any;
    static restore(composition: ToolComposition, snapshot: any): RuntimeContext;
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
    createInstance(tool: Tool, composition: ToolComposition, userId: string, spaceId: string, initialData?: Record<string, any>): Promise<ToolInstance>;
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
//# sourceMappingURL=tool-runtime.d.ts.map