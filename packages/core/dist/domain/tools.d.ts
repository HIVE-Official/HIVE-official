export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: ToolCategory;
    creatorId: string;
    creatorName: string;
    createdAt: Date;
    updatedAt: Date;
    version: string;
    changelog?: string;
    elements: ToolElement[];
    configuration: ToolConfiguration;
    permissions: ToolPermissions;
    isPublished: boolean;
    publishedAt?: Date;
    installCount: number;
    rating: number;
    ratingCount: number;
    tags: string[];
    totalExecutions: number;
    activeInstalls: number;
    lastExecuted?: Date;
    status: 'draft' | 'testing' | 'published' | 'deprecated';
    isTemplate: boolean;
    templateId?: string;
}
export type ToolCategory = 'study' | 'social' | 'productivity' | 'coordination' | 'analytics' | 'communication' | 'resources' | 'fun';
export interface ToolElement {
    id: string;
    type: ElementType;
    subType: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    properties: Record<string, unknown>;
    connections: ElementConnection[];
    validation?: ElementValidation;
}
export type ElementType = 'input' | 'display' | 'action' | 'logic' | 'data';
export interface ElementConnection {
    fromId: string;
    toId: string;
    type: 'data' | 'trigger' | 'condition';
    mapping?: Record<string, string>;
}
export interface ElementValidation {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string;
}
export interface ToolConfiguration {
    runMode: 'manual' | 'automatic' | 'scheduled';
    schedule?: string;
    timeout: number;
    retryPolicy?: {
        maxRetries: number;
        backoffMs: number;
    };
    dataStorage: 'space' | 'tool' | 'none';
    cachePolicy?: {
        enabled: boolean;
        ttlSeconds: number;
    };
    integrations: ToolIntegration[];
    webhooks: WebhookConfig[];
}
export interface ToolIntegration {
    type: 'space' | 'platform' | 'external';
    service: string;
    permissions: string[];
    configuration: Record<string, unknown>;
}
export interface WebhookConfig {
    url: string;
    events: string[];
    secret?: string;
    headers?: Record<string, string>;
}
export interface ToolPermissions {
    visibility: 'public' | 'space' | 'private';
    installation: 'anyone' | 'leaders' | 'owner';
    execution: 'anyone' | 'members' | 'leaders' | 'configured';
    dataAccess: string[];
    roles?: {
        [role: string]: {
            canExecute: boolean;
            canConfigure: boolean;
            canViewData: boolean;
            canEditData: boolean;
        };
    };
}
export interface ToolInstallation {
    id: string;
    toolId: string;
    toolVersion: string;
    spaceId: string;
    installedBy: string;
    installedAt: Date;
    updatedAt: Date;
    configuration?: Partial<ToolConfiguration>;
    permissions?: Partial<ToolPermissions>;
    customSettings: Record<string, unknown>;
    isEnabled: boolean;
    isPinned: boolean;
    position?: number;
    executionCount: number;
    lastExecuted?: Date;
    uniqueUsers: number;
}
export interface ToolExecution {
    id: string;
    toolId: string;
    installationId: string;
    spaceId: string;
    userId: string;
    startedAt: Date;
    completedAt?: Date;
    duration?: number;
    inputs: Record<string, unknown>;
    outputs?: Record<string, unknown>;
    status: 'running' | 'completed' | 'failed' | 'cancelled';
    error?: {
        message: string;
        code: string;
        details?: unknown;
    };
    logs: ExecutionLog[];
    dataAccessed: string[];
    externalCalls: string[];
}
export interface ExecutionLog {
    timestamp: Date;
    level: 'debug' | 'info' | 'warning' | 'error';
    message: string;
    data?: unknown;
}
export interface PlatformUpdate {
    id: string;
    title: string;
    description: string;
    type: 'feature' | 'fix' | 'improvement' | 'security';
    status: 'planned' | 'in_progress' | 'testing' | 'deployed';
    progress: number;
    startedAt?: Date;
    completedAt?: Date;
    impact: 'low' | 'medium' | 'high';
    affectedAreas: string[];
    proposedBy?: string;
    votes: number;
    comments: number;
    commits?: string[];
    pullRequest?: string;
    documentation?: string;
}
export interface FeatureProposal {
    id: string;
    title: string;
    description: string;
    problem: string;
    solution: string;
    proposerId: string;
    proposerName: string;
    proposedAt: Date;
    votingStarted?: Date;
    votingEnded?: Date;
    votesFor: number;
    votesAgainst: number;
    totalVoters: number;
    status: 'draft' | 'voting' | 'approved' | 'rejected' | 'implemented';
    implementationId?: string;
    comments: ProposalComment[];
    tags: string[];
}
export interface ProposalComment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: Date;
    isOfficial: boolean;
    sentiment?: 'positive' | 'neutral' | 'negative';
}
export interface MarketplaceListing {
    toolId: string;
    tool: Tool;
    screenshots: string[];
    videoUrl?: string;
    documentation: string;
    reviews: ToolReview[];
    averageRating: number;
    minVersion: string;
    maxVersion?: string;
    requirements: string[];
    isFeatured: boolean;
    isVerified: boolean;
    badges: string[];
}
export interface ToolReview {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
    helpful: number;
    notHelpful: number;
    spaceType?: string;
    usageFrequency?: 'daily' | 'weekly' | 'monthly' | 'rarely';
}
export interface ToolAnalytics {
    toolId: string;
    period: 'day' | 'week' | 'month' | 'all';
    executions: number;
    uniqueUsers: number;
    averageDuration: number;
    errorRate: number;
    newInstalls: number;
    uninstalls: number;
    activeInstalls: number;
    returningUsers: number;
    userSatisfaction: number;
    p50Duration: number;
    p95Duration: number;
    p99Duration: number;
    bySpace: Record<string, number>;
    byUser: Record<string, number>;
    byHour: number[];
}
//# sourceMappingURL=tools.d.ts.map