/**
 * Tool Builder - Utilities for creating and composing tools
 */
import { Tool, ToolComposition, Variable, Action, LayoutConfig, ThemeConfig, ToolType, ToolCategory, ToolVisibility } from './tool';
/**
 * Tool Builder Class - Main builder for creating tools
 */
export declare class ToolBuilder {
    private tool;
    private composition;
    private registry;
    constructor(name: string, description: string);
    setType(type: ToolType): ToolBuilder;
    setCategory(category: ToolCategory): ToolBuilder;
    setVisibility(visibility: ToolVisibility): ToolBuilder;
    setAuthor(author: Tool['author']): ToolBuilder;
    setMetadata(metadata: Partial<Tool['metadata']>): ToolBuilder;
    addElement(elementId: string, config?: Record<string, unknown>, position?: {
        x: number;
        y: number;
    }): string;
    removeElement(instanceId: string): ToolBuilder;
    connect(fromInstanceId: string, fromPort: string, toInstanceId: string, toPort: string): ToolBuilder;
    addVariable(name: string, type: Variable['type'], defaultValue?: unknown): ToolBuilder;
    addTrigger(name: string, event: string, actions: Action[], condition?: string): ToolBuilder;
    setLayout(layout: LayoutConfig): ToolBuilder;
    setTheme(theme: ThemeConfig): ToolBuilder;
    validate(): ValidationResult;
    private hasCircularDependency;
    build(): {
        tool: Tool;
        composition: ToolComposition;
    };
    private generateDataSchema;
    clone(): ToolBuilder;
    export(): string;
    static import(json: string): ToolBuilder;
}
/**
 * Validation Result Interface
 */
export interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}
/**
 * Tool Template Factory - Pre-built tool templates
 */
export declare class ToolTemplateFactory {
    static createPollTool(question: string, options: string[]): ToolBuilder;
    static createFormTool(fields: Array<{
        name: string;
        type: string;
    }>): ToolBuilder;
    static createSchedulerTool(): ToolBuilder;
}
//# sourceMappingURL=tool-builder.d.ts.map