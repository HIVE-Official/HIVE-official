import type { LucideIcon } from 'lucide-react';
export interface Element {
    id: string;
    name: string;
    description: string;
    category: ElementCategory;
    icon: LucideIcon;
    color: string;
    version: string;
    isDeprecated: boolean;
    schema: ElementSchema;
    defaultConfig: Record<string, any>;
    previewComponent: string;
    runtimeComponent: string;
    configComponent: string;
    tags: string[];
    documentation: ElementDocumentation;
    createdAt: Date;
    updatedAt: Date;
}
export interface ElementSchema {
    config: Record<string, ConfigProperty>;
    events: string[];
    props: string[];
    validation: Record<string, ValidationRule>;
}
export interface ConfigProperty {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'function';
    default: any;
    required?: boolean;
    options?: any[];
    min?: number;
    max?: number;
    validation?: ValidationRule;
}
export interface ValidationRule {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => boolean | string;
}
export interface ElementDocumentation {
    description: string;
    examples: Array<{
        name: string;
        config: Record<string, any>;
    }>;
    properties?: Record<string, string>;
    events?: Record<string, string>;
}
export type ElementCategory = 'basic' | 'input' | 'layout' | 'media' | 'social' | 'advanced' | 'campus';
export interface ElementInstance {
    id: string;
    elementId: string;
    name?: string;
    position: Position;
    size: Size;
    config: Record<string, any>;
    style: ElementStyle;
    conditions: Condition[];
    events: EventHandler[];
    children?: string[];
    parentId?: string;
    zIndex: number;
    isLocked: boolean;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Position {
    x: number;
    y: number;
}
export interface Size {
    width: number | 'auto' | string;
    height: number | 'auto' | string;
}
export interface ElementStyle {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    padding?: Spacing;
    margin?: Spacing;
    textColor?: string;
    fontSize?: number;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    opacity?: number;
    transform?: string;
    boxShadow?: string;
}
export interface Spacing {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface Tool {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    collaborators: Collaborator[];
    status: ToolStatus;
    currentVersion: string;
    versions: ToolVersion[];
    elements: ElementInstance[];
    config: ToolConfig;
    metadata: ToolMetadata;
    isPublic: boolean;
    forkCount: number;
    viewCount: number;
    useCount: number;
    ratingCount: number;
    isSpaceTool: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Collaborator {
    userId: string;
    role: 'viewer' | 'editor' | 'admin';
    addedAt: Date;
}
export type ToolStatus = 'draft' | 'published' | 'archived' | 'deprecated';
export interface ToolVersion {
    version: string;
    changelog: string;
    elements: ElementInstance[];
    publishedAt: Date;
    publishedBy: string;
}
export interface ToolConfig {
    theme: 'auto' | 'light' | 'dark';
    primaryColor: string;
    backgroundColor: string;
    allowMultipleSubmissions: boolean;
    requireAuthentication: boolean;
    showProgressBar: boolean;
    autoSave: boolean;
    dataRetentionDays: number;
    notifyOnSubmission: boolean;
    trackingEnabled: boolean;
    allowAnalyticsOptOut: boolean;
}
export interface ToolMetadata {
    templateId?: string;
    toolType: 'visual' | 'template' | 'wizard';
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: ToolCategory;
    language: string;
    estimatedBuildTime?: number;
    requiredElements?: string[];
}
export type ToolCategory = 'productivity' | 'communication' | 'education' | 'social' | 'analytics' | 'campus-life' | 'academic' | 'greek-life' | 'events' | 'resources';
export interface ToolBuilder {
    tool: Tool;
    selectedElement?: ElementInstance;
    canvas: CanvasState;
    history: HistoryState;
    clipboard?: ElementInstance[];
    isPreviewMode: boolean;
    isDirty: boolean;
}
export interface CanvasState {
    zoom: number;
    offset: Position;
    gridSize: number;
    showGrid: boolean;
    snapToGrid: boolean;
    rulers: boolean;
    guides: Guide[];
    selection: string[];
}
export interface Guide {
    id: string;
    type: 'horizontal' | 'vertical';
    position: number;
    color: string;
}
export interface HistoryState {
    past: HistoryEntry[];
    present: HistoryEntry;
    future: HistoryEntry[];
    maxEntries: number;
}
export interface HistoryEntry {
    timestamp: Date;
    action: string;
    elements: ElementInstance[];
    selectedElement?: string;
}
export type BuilderMode = 'visual' | 'template' | 'wizard';
export interface VisualBuilderProps {
    tool: Tool;
    elements: Element[];
    onChange: (tool: Tool) => void;
    onSave: (tool: Tool) => void;
    onPreview: (tool: Tool) => void;
    isLoading?: boolean;
}
export interface TemplateBuilderProps {
    tool: Tool;
    templates: ToolTemplate[];
    onChange: (tool: Tool) => void;
    onSave: (tool: Tool) => void;
    onPreview: (tool: Tool) => void;
    isLoading?: boolean;
}
export interface WizardBuilderProps {
    tool: Tool;
    onChange: (tool: Tool) => void;
    onSave: (tool: Tool) => void;
    onPreview: (tool: Tool) => void;
    isLoading?: boolean;
}
export interface ToolTemplate {
    id: string;
    name: string;
    description: string;
    category: ToolCategory;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    thumbnail: string;
    elements: ElementInstance[];
    config: Partial<ToolConfig>;
    metadata: Partial<ToolMetadata>;
    tags: string[];
    useCount: number;
    rating: number;
    isPremium: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface EventHandler {
    id: string;
    event: string;
    action: EventAction;
    conditions?: Condition[];
    parameters?: Record<string, any>;
}
export interface EventAction {
    type: 'navigate' | 'submit' | 'show' | 'hide' | 'update' | 'custom';
    target?: string;
    parameters: Record<string, any>;
}
export interface Condition {
    id: string;
    type: 'visibility' | 'validation' | 'logic';
    operator: 'equals' | 'not_equals' | 'greater' | 'less' | 'contains' | 'not_contains';
    leftOperand: string;
    rightOperand: any;
    logicalOperator?: 'and' | 'or';
}
export interface DeploymentOptions {
    deployTo: 'personal' | 'space' | 'marketplace';
    targetId: string;
    permissions: DeploymentPermissions;
    settings: DeploymentSettings;
}
export interface DeploymentPermissions {
    canView: 'public' | 'authenticated' | 'members' | 'specific';
    canEdit: 'owner' | 'collaborators' | 'members';
    canFork: boolean;
    canComment: boolean;
    specificUsers?: string[];
}
export interface DeploymentSettings {
    customDomain?: string;
    embedAllowed: boolean;
    analyticsEnabled: boolean;
    dataRetention: number;
    requireLogin: boolean;
    allowSubmissions: boolean;
    submissionNotifications: boolean;
}
export interface ElementPickerProps {
    elements: Element[];
    selectedCategory?: ElementCategory;
    onElementSelect: (element: Element) => void;
    searchQuery?: string;
}
export interface ElementConfigProps {
    element: Element;
    instance: ElementInstance;
    onChange: (config: Record<string, any>) => void;
}
export interface ToolPreviewProps {
    tool: Tool;
    mode?: 'desktop' | 'tablet' | 'mobile';
    onClose: () => void;
}
export type BuilderAction = {
    type: 'ADD_ELEMENT';
    element: Element;
    position: Position;
} | {
    type: 'UPDATE_ELEMENT';
    elementId: string;
    changes: Partial<ElementInstance>;
} | {
    type: 'DELETE_ELEMENT';
    elementId: string;
} | {
    type: 'SELECT_ELEMENT';
    elementId: string | null;
} | {
    type: 'DUPLICATE_ELEMENT';
    elementId: string;
} | {
    type: 'MOVE_ELEMENT';
    elementId: string;
    position: Position;
} | {
    type: 'RESIZE_ELEMENT';
    elementId: string;
    size: Size;
} | {
    type: 'REORDER_ELEMENT';
    elementId: string;
    newIndex: number;
} | {
    type: 'UNDO';
} | {
    type: 'REDO';
} | {
    type: 'CLEAR_SELECTION';
} | {
    type: 'SELECT_MULTIPLE';
    elementIds: string[];
} | {
    type: 'UPDATE_CANVAS';
    canvas: Partial<CanvasState>;
} | {
    type: 'UPDATE_TOOL_CONFIG';
    config: Partial<ToolConfig>;
} | {
    type: 'UPDATE_TOOL_METADATA';
    metadata: Partial<ToolMetadata>;
};
export interface BuilderContextType {
    state: ToolBuilder;
    dispatch: (action: BuilderAction) => void;
    elements: Element[];
    templates: ToolTemplate[];
}
export interface CampusToolExtensions {
    spaceIntegration?: {
        allowSpaceDeployment: boolean;
        requiredSpaceTypes?: string[];
        spacePermissions?: 'members' | 'admins';
    };
    academicIntegration?: {
        linkToCourses: boolean;
        semesterBased: boolean;
        gradePassback: boolean;
    };
    socialFeatures?: {
        allowComments: boolean;
        allowReactions: boolean;
        showAuthor: boolean;
        enableCollaboration: boolean;
    };
}
export type { Element as HiveElement, ElementInstance as HiveElementInstance, Tool as HiveTool, ToolTemplate as HiveToolTemplate, BuilderMode as HiveBuilderMode, DeploymentOptions as HiveDeploymentOptions, };
//# sourceMappingURL=types.d.ts.map