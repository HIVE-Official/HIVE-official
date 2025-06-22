import { z } from "zod";
/**
 * Composer modes following the user specifications
 */
export declare enum ComposerMode {
    INLINE = "inline",// Default, always visible - low-friction PromptPost
    MODAL = "modal",// Triggered from FAB - structured tools (Pulse, EventCard)
    EXPANDED_INLINE = "expanded_inline"
}
/**
 * Available composer tools
 */
export declare enum ComposerTool {
    PROMPT_POST = "prompt_post",// Quick reflection posts
    PULSE = "pulse",// Mood/status updates
    EVENT_CARD = "event_card",// Event announcements
    JOIN_FORM = "join_form",// Group join requests
    POLL = "poll",// Simple polls
    MEDIA_POST = "media_post"
}
/**
 * Composer state configuration
 */
export interface ComposerState {
    mode: ComposerMode;
    selectedTool: ComposerTool | null;
    isExpanded: boolean;
    content: string;
    metadata: Record<string, unknown>;
    targetSpaceId?: string;
    isDragging: boolean;
    expandThreshold: number;
}
/**
 * Tool configuration for different composer tools
 */
export interface ComposerToolConfig {
    tool: ComposerTool;
    displayName: string;
    description: string;
    icon: string;
    supportsInline: boolean;
    requiresModal: boolean;
    maxCharacters?: number;
    placeholder: string;
    fields: ComposerField[];
}
/**
 * Field configuration for structured tools
 */
export interface ComposerField {
    id: string;
    type: "text" | "textarea" | "select" | "date" | "time" | "file" | "emoji";
    label: string;
    placeholder?: string;
    required: boolean;
    options?: Array<{
        value: string;
        label: string;
    }>;
    validation?: z.ZodSchema;
}
/**
 * Composer behavior and state management
 */
export declare class ComposerEngine {
    private static readonly EXPAND_THRESHOLD;
    private static readonly INLINE_TOOLS;
    private static readonly MODAL_TOOLS;
    /**
     * Get default composer state
     */
    static getDefaultState(): ComposerState;
    /**
     * Check if content should trigger expand suggestion
     */
    static shouldSuggestExpand(content: string, currentMode: ComposerMode): boolean;
    /**
     * Handle mode transitions
     */
    static transitionMode(currentState: ComposerState, targetMode: ComposerMode, selectedTool?: ComposerTool): ComposerState;
    /**
     * Get available tools for current mode
     */
    static getAvailableTools(mode: ComposerMode): ComposerTool[];
    /**
     * Validate composer content based on selected tool
     */
    static validateContent(state: ComposerState): {
        isValid: boolean;
        errors: string[];
    };
    /**
     * Get tool configuration
     */
    static getToolConfig(tool: ComposerTool): ComposerToolConfig;
    /**
     * Handle drag-to-expand gesture detection
     */
    static handleDragGesture(startY: number, currentY: number, state: ComposerState): {
        shouldExpand: boolean;
        dragProgress: number;
    };
    /**
     * Generate post data from composer state
     */
    static generatePostData(state: ComposerState): Record<string, unknown>;
}
/**
 * Zod schemas for validation
 */
export declare const ComposerStateSchema: z.ZodObject<{
    mode: z.ZodNativeEnum<typeof ComposerMode>;
    selectedTool: z.ZodNullable<z.ZodNativeEnum<typeof ComposerTool>>;
    isExpanded: z.ZodBoolean;
    content: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    targetSpaceId: z.ZodOptional<z.ZodString>;
    isDragging: z.ZodBoolean;
    expandThreshold: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    content: string;
    selectedTool: ComposerTool | null;
    mode: ComposerMode;
    isExpanded: boolean;
    isDragging: boolean;
    expandThreshold: number;
    targetSpaceId?: string | undefined;
}, {
    metadata: Record<string, unknown>;
    content: string;
    selectedTool: ComposerTool | null;
    mode: ComposerMode;
    isExpanded: boolean;
    isDragging: boolean;
    expandThreshold: number;
    targetSpaceId?: string | undefined;
}>;
export declare const ComposerFieldSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["text", "textarea", "select", "date", "time", "file", "emoji"]>;
    label: z.ZodString;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        label: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        label: string;
    }, {
        value: string;
        label: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "date" | "text" | "select" | "textarea" | "time" | "file" | "emoji";
    id: string;
    label: string;
    required: boolean;
    options?: {
        value: string;
        label: string;
    }[] | undefined;
    placeholder?: string | undefined;
}, {
    type: "date" | "text" | "select" | "textarea" | "time" | "file" | "emoji";
    id: string;
    label: string;
    required: boolean;
    options?: {
        value: string;
        label: string;
    }[] | undefined;
    placeholder?: string | undefined;
}>;
//# sourceMappingURL=composer.d.ts.map