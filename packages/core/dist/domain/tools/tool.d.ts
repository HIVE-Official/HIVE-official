/**
 * HIVE Tools Domain Model
 * Complete type definitions for the Tools & HiveLab vertical slice
 */
export interface Tool {
    id: string;
    name: string;
    description: string;
    type: ToolType;
    category: ToolCategory;
    author: ToolAuthor;
    version: string;
    status: ToolStatus;
    visibility: ToolVisibility;
    pricing: ToolPricing;
    metadata: ToolMetadata;
    configuration: ToolConfiguration;
    permissions: ToolPermissions;
    analytics: ToolAnalytics;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}
export type ToolType = 'form' | 'poll' | 'scheduler' | 'resource' | 'automation' | 'dashboard' | 'game' | 'calculator' | 'tracker' | 'custom';
export type ToolCategory = 'productivity' | 'academic' | 'social' | 'organization' | 'entertainment' | 'utility' | 'analytics' | 'communication';
export type ToolStatus = 'draft' | 'testing' | 'published' | 'deprecated' | 'archived';
export type ToolVisibility = 'private' | 'space' | 'campus' | 'public';
export interface Element {
    id: string;
    type: ElementType;
    category: ElementCategory;
    name: string;
    description: string;
    icon: string;
    version: string;
    configSchema: ElementConfigSchema;
    defaultConfig: Record<string, unknown>;
    inputs?: ElementPort[];
    outputs?: ElementPort[];
    events?: ElementEvent[];
    validations?: ElementValidation[];
    rendering: ElementRendering;
}
export type ElementType = 'text-input' | 'number-input' | 'date-picker' | 'time-picker' | 'dropdown' | 'checkbox' | 'radio' | 'slider' | 'file-upload' | 'rich-text' | 'display-text' | 'display-number' | 'display-image' | 'display-chart' | 'display-table' | 'display-map' | 'button' | 'link' | 'timer' | 'counter' | 'condition' | 'loop' | 'calculation' | 'api-call' | 'database-query' | 'container' | 'grid' | 'tabs' | 'modal' | 'drawer';
export type ElementCategory = 'input' | 'display' | 'action' | 'logic' | 'data' | 'layout';
export interface ElementPort {
    id: string;
    name: string;
    type: DataType;
    required?: boolean;
    multiple?: boolean;
    description?: string;
}
export interface ElementEvent {
    id: string;
    name: string;
    payload?: DataType;
    description?: string;
}
export interface ElementValidation {
    type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
    value?: unknown;
    message?: string;
    condition?: string;
}
export interface ElementRendering {
    component?: string;
    template?: string;
    styles?: Record<string, unknown>;
    responsive?: ResponsiveConfig;
}
export interface ElementConfigSchema {
    properties: Record<string, ConfigProperty>;
    required?: string[];
    dependencies?: Record<string, string[]>;
}
export interface ConfigProperty {
    type: DataType;
    label: string;
    description?: string;
    default?: unknown;
    enum?: unknown[];
    min?: number;
    max?: number;
    pattern?: string;
    placeholder?: string;
}
export type DataType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'file' | 'any';
export interface ToolComposition {
    id: string;
    toolId: string;
    name: string;
    description: string;
    elements: ComposedElement[];
    connections: ElementConnection[];
    layout: LayoutConfig;
    variables: Variable[];
    triggers: Trigger[];
    theme?: ThemeConfig;
}
export interface ComposedElement {
    instanceId: string;
    elementId: string;
    config: Record<string, unknown>;
    position: Position;
    size: Size;
    visibility?: VisibilityRule;
    validation?: ValidationRule[];
}
export interface ElementConnection {
    id: string;
    from: ConnectionPort;
    to: ConnectionPort;
    transform?: DataTransform;
    condition?: string;
}
export interface ConnectionPort {
    instanceId: string;
    portId: string;
}
export interface Position {
    x: number;
    y: number;
    z?: number;
}
export interface Size {
    width: number;
    height: number;
}
export interface LayoutConfig {
    type: 'grid' | 'flow' | 'absolute' | 'responsive';
    columns?: number;
    rows?: number;
    gap?: number;
    padding?: number;
    breakpoints?: ResponsiveConfig;
}
export interface ResponsiveConfig {
    mobile?: unknown;
    tablet?: unknown;
    desktop?: unknown;
}
export interface Variable {
    id: string;
    name: string;
    type: DataType;
    defaultValue?: unknown;
    scope: 'local' | 'global' | 'session';
}
export interface Trigger {
    id: string;
    name: string;
    event: string;
    condition?: string;
    actions: Action[];
}
export interface Action {
    type: 'set-variable' | 'call-api' | 'navigate' | 'show-modal' | 'custom';
    target?: string;
    payload?: unknown;
}
export interface DataTransform {
    type: 'map' | 'filter' | 'reduce' | 'custom';
    function?: string;
}
export interface VisibilityRule {
    condition: string;
    animate?: boolean;
}
export interface ValidationRule {
    type: string;
    value?: unknown;
    message: string;
}
export interface ThemeConfig {
    colors?: Record<string, string>;
    fonts?: Record<string, string>;
    spacing?: Record<string, number>;
    borderRadius?: Record<string, number>;
}
export interface ToolAuthor {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    verified?: boolean;
}
export interface ToolMetadata {
    tags: string[];
    keywords: string[];
    screenshots: string[];
    icon?: string;
    banner?: string;
    documentation?: string;
    changelog?: string;
    requirements?: string[];
    compatibleWith?: string[];
}
export interface ToolConfiguration {
    defaultSettings: Record<string, unknown>;
    customizableFields: string[];
    webhooks?: WebhookConfig[];
    integrations?: IntegrationConfig[];
    dataSchema?: DataSchema;
}
export interface WebhookConfig {
    id: string;
    event: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
}
export interface IntegrationConfig {
    id: string;
    type: 'firebase' | 'api' | 'database' | 'storage';
    config: Record<string, unknown>;
}
export interface DataSchema {
    inputs?: Record<string, DataType>;
    outputs?: Record<string, DataType>;
    storage?: Record<string, DataType>;
}
export interface ToolPermissions {
    canEdit: string[];
    canView: string[];
    canUse: string[];
    canShare: string[];
    isPublic: boolean;
}
export interface ToolPricing {
    model: 'free' | 'freemium' | 'paid' | 'subscription';
    price?: number;
    currency?: string;
    features?: string[];
}
export interface ToolAnalytics {
    deployments: number;
    totalUsers: number;
    activeUsers: number;
    rating: number;
    reviews: number;
    usage: UsageMetrics;
    performance: PerformanceMetrics;
}
export interface UsageMetrics {
    daily: number;
    weekly: number;
    monthly: number;
    allTime: number;
    bySpace: Record<string, number>;
    byUser: Record<string, number>;
}
export interface PerformanceMetrics {
    averageLoadTime: number;
    errorRate: number;
    completionRate: number;
    userSatisfaction: number;
}
export interface MarketplaceListing {
    toolId: string;
    featured: boolean;
    trending: boolean;
    editorChoice: boolean;
    installCount: number;
    lastUpdated: Date;
    reviews: ToolReview[];
    similar: string[];
}
export interface ToolReview {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    helpful: number;
    createdAt: Date;
}
export interface ToolInstance {
    id: string;
    toolId: string;
    spaceId: string;
    userId: string;
    state: InstanceState;
    data: Record<string, unknown>;
    config: Record<string, unknown>;
    startedAt: Date;
    lastActivity: Date;
}
export interface InstanceState {
    status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
    currentStep?: string;
    variables: Record<string, unknown>;
    errors?: Error[];
}
export interface ToolVersion {
    id: string;
    toolId: string;
    version: string;
    changes: VersionChange[];
    compatibility: CompatibilityInfo;
    createdAt: Date;
    createdBy: string;
}
export interface VersionChange {
    type: 'feature' | 'fix' | 'breaking' | 'deprecation';
    description: string;
    elements?: string[];
}
export interface CompatibilityInfo {
    minVersion?: string;
    maxVersion?: string;
    breaking?: boolean;
    migration?: string;
}
export interface BuildSession {
    id: string;
    toolId: string;
    participants: Participant[];
    changes: BuildChange[];
    chat: ChatMessage[];
    startedAt: Date;
    endedAt?: Date;
}
export interface Participant {
    userId: string;
    name: string;
    role: 'owner' | 'editor' | 'viewer';
    cursor?: CursorPosition;
    selection?: string[];
    color: string;
}
export interface BuildChange {
    id: string;
    userId: string;
    type: 'add' | 'remove' | 'modify' | 'connect' | 'disconnect';
    target: string;
    before?: unknown;
    after?: unknown;
    timestamp: Date;
}
export interface ChatMessage {
    id: string;
    userId: string;
    message: string;
    timestamp: Date;
}
export interface CursorPosition {
    x: number;
    y: number;
    elementId?: string;
}
//# sourceMappingURL=tool.d.ts.map