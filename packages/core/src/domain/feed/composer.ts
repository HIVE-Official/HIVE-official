import { z } from "zod";

/**
 * Composer modes following the user specifications
 */
export enum ComposerMode {
  INLINE = "inline", // Default, always visible - low-friction PromptPost
  MODAL = "modal", // Triggered from FAB - structured tools (Pulse, EventCard)
  EXPANDED_INLINE = "expanded_inline", // Inline → Modal transition for long content
}

/**
 * Available composer tools
 */
export enum ComposerTool {
  PROMPT_POST = "prompt_post", // Quick reflection posts
  PULSE = "pulse", // Mood/status updates
  EVENT_CARD = "event_card", // Event announcements
  JOIN_FORM = "join_form", // Group join requests
  POLL = "poll", // Simple polls
  MEDIA_POST = "media_post", // Image/video posts
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
  expandThreshold: number; // Character count to trigger expand suggestion
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
  options?: Array<{ value: string; label: string }>;
  validation?: z.ZodSchema;
}

/**
 * Composer behavior and state management
 */
export class ComposerEngine {
  private static readonly EXPAND_THRESHOLD = 140; // Characters before suggesting modal
  private static readonly INLINE_TOOLS = [ComposerTool.PROMPT_POST];
  private static readonly MODAL_TOOLS = [
    ComposerTool.PULSE,
    ComposerTool.EVENT_CARD,
    ComposerTool.JOIN_FORM,
    ComposerTool.POLL,
    ComposerTool.MEDIA_POST,
  ];

  /**
   * Get default composer state
   */
  static getDefaultState(): ComposerState {
    return {
      mode: ComposerMode.INLINE,
      selectedTool: ComposerTool.PROMPT_POST,
      isExpanded: false,
      content: "",
      metadata: {},
      isDragging: false,
      expandThreshold: this.EXPAND_THRESHOLD,
    };
  }

  /**
   * Check if content should trigger expand suggestion
   */
  static shouldSuggestExpand(
    content: string,
    currentMode: ComposerMode
  ): boolean {
    return (
      currentMode === ComposerMode.INLINE &&
      content.length > this.EXPAND_THRESHOLD &&
      content.split("\n").length > 3 // Or has multiple paragraphs
    );
  }

  /**
   * Handle mode transitions
   */
  static transitionMode(
    currentState: ComposerState,
    targetMode: ComposerMode,
    selectedTool?: ComposerTool
  ): ComposerState {
    const newState: ComposerState = {
      ...currentState,
      mode: targetMode,
    };

    switch (targetMode) {
      case ComposerMode.INLINE:
        newState.selectedTool = ComposerTool.PROMPT_POST;
        newState.isExpanded = false;
        break;

      case ComposerMode.MODAL:
        newState.selectedTool = selectedTool || ComposerTool.PULSE;
        newState.isExpanded = true;
        break;

      case ComposerMode.EXPANDED_INLINE:
        // Keep current tool but expand the interface
        newState.isExpanded = true;
        break;
    }

    return newState;
  }

  /**
   * Get available tools for current mode
   */
  static getAvailableTools(mode: ComposerMode): ComposerTool[] {
    switch (mode) {
      case ComposerMode.INLINE:
      case ComposerMode.EXPANDED_INLINE:
        return this.INLINE_TOOLS;
      case ComposerMode.MODAL:
        return this.MODAL_TOOLS;
      default:
        return [];
    }
  }

  /**
   * Validate composer content based on selected tool
   */
  static validateContent(state: ComposerState): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const { selectedTool, content, metadata } = state;

    if (!selectedTool) {
      errors.push("No tool selected");
      return { isValid: false, errors };
    }

    const toolConfig = this.getToolConfig(selectedTool);

    // Check content length
    if (toolConfig.maxCharacters && content.length > toolConfig.maxCharacters) {
      errors.push(`Content exceeds ${toolConfig.maxCharacters} characters`);
    }

    // Check required fields
    toolConfig.fields
      .filter((field: any) => field.required)
      .forEach((field: any) => {
        if (!metadata[field.id] && field.id !== "content") {
          errors.push(`${field.label} is required`);
        }
      });

    // Tool-specific validation
    switch (selectedTool) {
      case ComposerTool.PROMPT_POST:
        if (content.trim().length === 0) {
          errors.push("Post content cannot be empty");
        }
        break;

      case ComposerTool.EVENT_CARD:
        if (!metadata.eventDate) {
          errors.push("Event date is required");
        }
        if (!metadata.eventTitle) {
          errors.push("Event title is required");
        }
        break;

      case ComposerTool.POLL: {
        const options = (metadata.pollOptions as string[]) || [];
        if (options.length < 2) {
          errors.push("Poll must have at least 2 options");
        }
        break;
      }
    }

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Get tool configuration
   */
  static getToolConfig(tool: ComposerTool): ComposerToolConfig {
    const configs: Record<ComposerTool, ComposerToolConfig> = {
      [ComposerTool.PROMPT_POST]: {
        tool: ComposerTool.PROMPT_POST,
        displayName: "Quick Post",
        description: "Share a thought or reflection",
        icon: "✍️",
        supportsInline: true,
        requiresModal: false,
        maxCharacters: 500,
        placeholder: "What's on your mind?",
        fields: [
          {
            id: "content",
            type: "textarea",
            label: "Post Content",
            placeholder: "What's on your mind?",
            required: true,
          },
        ],
      },

      [ComposerTool.PULSE]: {
        tool: ComposerTool.PULSE,
        displayName: "Pulse",
        description: "Share your current mood or status",
        icon: "📊",
        supportsInline: false,
        requiresModal: true,
        placeholder: "How are you feeling?",
        fields: [
          {
            id: "mood",
            type: "select",
            label: "Current Mood",
            required: true,
            options: [
              { value: "focused", label: "🎯 Focused" },
              { value: "stressed", label: "😤 Stressed" },
              { value: "excited", label: "🚀 Excited" },
              { value: "tired", label: "😴 Tired" },
              { value: "creative", label: "🎨 Creative" },
            ],
          },
          {
            id: "content",
            type: "textarea",
            label: "Details (optional)",
            placeholder: "What's driving this feeling?",
            required: false,
          },
        ],
      },

      [ComposerTool.EVENT_CARD]: {
        tool: ComposerTool.EVENT_CARD,
        displayName: "Event",
        description: "Announce an upcoming event",
        icon: "📅",
        supportsInline: false,
        requiresModal: true,
        placeholder: "Event title",
        fields: [
          {
            id: "eventTitle",
            type: "text",
            label: "Event Title",
            placeholder: "What's happening?",
            required: true,
          },
          {
            id: "eventDate",
            type: "date",
            label: "Event Date",
            required: true,
          },
          {
            id: "eventTime",
            type: "time",
            label: "Event Time",
            required: false,
          },
          {
            id: "location",
            type: "text",
            label: "Location",
            placeholder: "Where is it happening?",
            required: false,
          },
          {
            id: "description",
            type: "textarea",
            label: "Description",
            placeholder: "Tell people more about the event...",
            required: false,
          },
        ],
      },

      [ComposerTool.JOIN_FORM]: {
        tool: ComposerTool.JOIN_FORM,
        displayName: "Join Request",
        description: "Invite people to join a group",
        icon: "🤝",
        supportsInline: false,
        requiresModal: true,
        placeholder: "What are you inviting people to join?",
        fields: [
          {
            id: "joinTitle",
            type: "text",
            label: "Group/Activity Title",
            placeholder: "Study group, intramural team, etc.",
            required: true,
          },
          {
            id: "requirements",
            type: "textarea",
            label: "Requirements",
            placeholder: "What are you looking for in participants?",
            required: false,
          },
          {
            id: "deadline",
            type: "date",
            label: "Join Deadline",
            required: false,
          },
        ],
      },

      [ComposerTool.POLL]: {
        tool: ComposerTool.POLL,
        displayName: "Poll",
        description: "Ask the community to choose",
        icon: "📊",
        supportsInline: false,
        requiresModal: true,
        placeholder: "What should we vote on?",
        fields: [
          {
            id: "question",
            type: "text",
            label: "Poll Question",
            placeholder: "What should we vote on?",
            required: true,
          },
          {
            id: "pollOptions",
            type: "textarea", // Special handling for array of options
            label: "Options (one per line)",
            placeholder: "Option 1\nOption 2\nOption 3",
            required: true,
          },
          {
            id: "allowMultiple",
            type: "select",
            label: "Allow Multiple Choices",
            options: [
              { value: "false", label: "Single choice only" },
              { value: "true", label: "Allow multiple choices" },
            ],
            required: false,
          },
        ],
      },

      [ComposerTool.MEDIA_POST]: {
        tool: ComposerTool.MEDIA_POST,
        displayName: "Media Post",
        description: "Share photos or videos",
        icon: "📸",
        supportsInline: false,
        requiresModal: true,
        placeholder: "Add a caption...",
        fields: [
          {
            id: "media",
            type: "file",
            label: "Upload Media",
            required: true,
          },
          {
            id: "caption",
            type: "textarea",
            label: "Caption",
            placeholder: "Add a caption...",
            required: false,
          },
        ],
      },
    };

    return configs[tool];
  }

  /**
   * Handle drag-to-expand gesture detection
   */
  static handleDragGesture(
    startY: number,
    currentY: number,
    _state: ComposerState
  ): { shouldExpand: boolean; dragProgress: number } {
    const dragDistance = startY - currentY; // Positive = dragging up
    const expandThreshold = 50; // Pixels to drag before expanding

    const dragProgress = Math.min(
      Math.max(dragDistance / expandThreshold, 0),
      1
    );
    const shouldExpand = dragDistance > expandThreshold;

    return { shouldExpand, dragProgress };
  }

  /**
   * Generate post data from composer state
   */
  static generatePostData(state: ComposerState): Record<string, unknown> {
    const { selectedTool, content, metadata, targetSpaceId } = state;

    const baseData = {
      type: selectedTool,
      content: content.trim(),
      spaceId: targetSpaceId,
      createdAt: new Date(),
      metadata,
    };

    // Tool-specific data processing
    switch (selectedTool) {
      case ComposerTool.POLL:
        return {
          ...baseData,
          pollOptions:
            typeof metadata.pollOptions === "string"
              ? (metadata.pollOptions as string)
                  .split("\n")
                  .filter((opt: any) => opt.trim())
              : metadata.pollOptions,
          allowMultiple: metadata.allowMultiple === "true",
        };

      case ComposerTool.EVENT_CARD:
        return {
          ...baseData,
          eventDate: metadata.eventDate,
          eventTime: metadata.eventTime,
          location: metadata.location,
          eventTitle: metadata.eventTitle,
        };

      default:
        return baseData;
    }
  }
}

/**
 * Zod schemas for validation
 */
export const ComposerStateSchema = z.object({
  mode: z.nativeEnum(ComposerMode),
  selectedTool: z.nativeEnum(ComposerTool).nullable(),
  isExpanded: z.boolean(),
  content: z.string(),
  metadata: z.record(z.unknown()),
  targetSpaceId: z.string().optional(),
  isDragging: z.boolean(),
  expandThreshold: z.number(),
});

export const ComposerFieldSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "textarea", "select", "date", "time", "file", "emoji"]),
  label: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean(),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});
