// Core Tool domain model for HiveLab
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  
  // Creator information
  creatorId: string;
  creatorName: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Versioning
  version: string;
  changelog?: string;
  
  // Tool configuration
  elements: ToolElement[];
  configuration: ToolConfiguration;
  permissions: ToolPermissions;
  
  // Marketplace info
  isPublished: boolean;
  publishedAt?: Date;
  installCount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  
  // Analytics
  totalExecutions: number;
  activeInstalls: number;
  lastExecuted?: Date;
  
  // Status
  status: 'draft' | 'testing' | 'published' | 'deprecated';
  isTemplate: boolean;
  templateId?: string;
}

export type ToolCategory = 
  | 'study'
  | 'social' 
  | 'productivity'
  | 'coordination'
  | 'analytics'
  | 'communication'
  | 'resources'
  | 'fun';

export interface ToolElement {
  id: string;
  type: ElementType;
  subType: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: Record<string, any>;
  connections: ElementConnection[];
  validation?: ElementValidation;
}

export type ElementType = 
  | 'input'     // Forms, buttons, toggles
  | 'display'   // Text, images, charts
  | 'action'    // API calls, notifications
  | 'logic'     // Conditions, loops
  | 'data';     // Storage, transformations

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
  custom?: string; // Custom validation logic
}

export interface ToolConfiguration {
  // Execution settings
  runMode: 'manual' | 'automatic' | 'scheduled';
  schedule?: string; // Cron expression
  timeout: number; // Max execution time in ms
  retryPolicy?: {
    maxRetries: number;
    backoffMs: number;
  };
  
  // Data settings
  dataStorage: 'space' | 'tool' | 'none';
  cachePolicy?: {
    enabled: boolean;
    ttlSeconds: number;
  };
  
  // Integration settings
  integrations: ToolIntegration[];
  webhooks: WebhookConfig[];
}

export interface ToolIntegration {
  type: 'space' | 'platform' | 'external';
  service: string; // e.g., 'posts', 'members', 'canvas', 'google'
  permissions: string[];
  configuration: Record<string, any>;
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
  dataAccess: string[]; // Specific data permissions
  
  // Role-based permissions
  roles?: {
    [role: string]: {
      canExecute: boolean;
      canConfigure: boolean;
      canViewData: boolean;
      canEditData: boolean;
    };
  };
}

// Tool instance installed in a Space
export interface ToolInstallation {
  id: string;
  toolId: string;
  toolVersion: string;
  spaceId: string;
  
  // Installation details
  installedBy: string;
  installedAt: Date;
  updatedAt: Date;
  
  // Configuration overrides
  configuration?: Partial<ToolConfiguration>;
  permissions?: Partial<ToolPermissions>;
  
  // Custom settings for this Space
  customSettings: Record<string, any>;
  
  // Status
  isEnabled: boolean;
  isPinned: boolean;
  position?: number; // Display order
  
  // Usage tracking
  executionCount: number;
  lastExecuted?: Date;
  uniqueUsers: number;
}

// Tool execution context
export interface ToolExecution {
  id: string;
  toolId: string;
  installationId: string;
  spaceId: string;
  userId: string;
  
  // Execution details
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  
  // Input/Output
  inputs: Record<string, any>;
  outputs?: Record<string, any>;
  
  // Status
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  error?: {
    message: string;
    code: string;
    details?: any;
  };
  
  // Audit trail
  logs: ExecutionLog[];
  dataAccessed: string[];
  externalCalls: string[];
}

export interface ExecutionLog {
  timestamp: Date;
  level: 'debug' | 'info' | 'warning' | 'error';
  message: string;
  data?: any;
}

// Platform transparency types
export interface PlatformUpdate {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'fix' | 'improvement' | 'security';
  
  // Development tracking
  status: 'planned' | 'in_progress' | 'testing' | 'deployed';
  progress: number; // 0-100
  startedAt?: Date;
  completedAt?: Date;
  
  // Impact and visibility
  impact: 'low' | 'medium' | 'high';
  affectedAreas: string[];
  
  // Community involvement
  proposedBy?: string;
  votes: number;
  comments: number;
  
  // Technical details
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
  
  // Proposer
  proposerId: string;
  proposerName: string;
  proposedAt: Date;
  
  // Voting
  votingStarted?: Date;
  votingEnded?: Date;
  votesFor: number;
  votesAgainst: number;
  totalVoters: number;
  
  // Status
  status: 'draft' | 'voting' | 'approved' | 'rejected' | 'implemented';
  implementationId?: string; // Links to PlatformUpdate
  
  // Discussion
  comments: ProposalComment[];
  tags: string[];
}

export interface ProposalComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  isOfficial: boolean; // From HIVE team
  sentiment?: 'positive' | 'neutral' | 'negative';
}

// Tool marketplace
export interface MarketplaceListing {
  toolId: string;
  tool: Tool;
  
  // Enhanced info
  screenshots: string[];
  videoUrl?: string;
  documentation: string;
  
  // Reviews
  reviews: ToolReview[];
  averageRating: number;
  
  // Compatibility
  minVersion: string;
  maxVersion?: string;
  requirements: string[];
  
  // Promotion
  isFeatured: boolean;
  isVerified: boolean;
  badges: string[];
}

export interface ToolReview {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  helpful: number;
  notHelpful: number;
  
  // Usage context
  spaceType?: string;
  usageFrequency?: 'daily' | 'weekly' | 'monthly' | 'rarely';
}

// Analytics
export interface ToolAnalytics {
  toolId: string;
  period: 'day' | 'week' | 'month' | 'all';
  
  // Usage metrics
  executions: number;
  uniqueUsers: number;
  averageDuration: number;
  errorRate: number;
  
  // Adoption metrics
  newInstalls: number;
  uninstalls: number;
  activeInstalls: number;
  
  // Engagement metrics
  returningUsers: number;
  userSatisfaction: number;
  
  // Performance metrics
  p50Duration: number;
  p95Duration: number;
  p99Duration: number;
  
  // Breakdown
  bySpace: Record<string, number>;
  byUser: Record<string, number>;
  byHour: number[];
}