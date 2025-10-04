/**
 * Tool Aggregate
 * HiveLab no-code builder - custom tools created by space leaders
 *
 * From SPEC.md: "HiveLab = How to make things happen"
 * Purpose: Empower space leaders to build custom tools for their communities
 */

import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { ToolId } from '../value-objects/tool-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { SpaceId } from '../../spaces/value-objects/space-id.value';
import { ToolCreatedEvent } from '../events/tool-created.event';
import { ToolPublishedEvent } from '../events/tool-published.event';
import { ToolForkedEvent } from '../events/tool-forked.event';
import { ToolDeployedEvent } from '../events/tool-deployed.event';
import { ToolUsedEvent } from '../events/tool-used.event';
import { ToolArchivedEvent } from '../events/tool-archived.event';

// Tool Status Lifecycle
export type ToolStatus = 'draft' | 'published' | 'archived';

// Tool Visibility Levels
export type ToolVisibility = 'private' | 'space' | 'campus' | 'public';

/**
 * Element Instance - Components in the visual builder
 */
export interface ElementInstance {
  id: string;
  type: string;                  // form_field, button, display, chart, etc.
  config: Record<string, any>;   // Element-specific configuration
  position: { x: number; y: number };
  connections: {
    inputs: string[];            // IDs of elements feeding data to this one
    outputs: string[];           // IDs of elements receiving data from this one
  };
}

/**
 * Tool Permissions - Who can do what
 */
export interface ToolPermissions {
  canFork: boolean;              // Allow others to fork this tool
  canEdit: ProfileId[];          // User IDs with edit access
  requiresApproval: boolean;     // Submissions need review
}

/**
 * Tool Analytics - Usage metrics
 */
export interface ToolAnalytics {
  uses: number;                  // Total times tool was used
  forks: number;                 // Times tool was forked
  rating: number;                // Average rating (0-5)
  submissions: number;           // Total submissions (if applicable)
}

export interface ToolProps {
  toolId: ToolId;
  name: string;
  description: string;
  icon?: string;

  // Creator
  createdBy: ProfileId;
  spaceId?: SpaceId;             // Associated space (if space-specific)
  forkedFrom?: ToolId;           // Original tool if this is a fork

  // Structure
  elements: ElementInstance[];
  version: string;               // Semantic versioning (1.0.0)

  // Deployment
  status: ToolStatus;
  visibility: ToolVisibility;
  deployedTo: SpaceId[];         // Spaces where this tool is deployed

  // Analytics
  analytics: ToolAnalytics;

  // Permissions
  permissions: ToolPermissions;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

/**
 * Tool Aggregate
 * Represents a no-code tool built in HiveLab
 */
export class Tool extends AggregateRoot<ToolProps> {

  private constructor(props: ToolProps, id?: string) {
    super(props, id);
  }

  // Getters
  get toolId(): ToolId {
    return this.props.toolId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get icon(): string | undefined {
    return this.props.icon;
  }

  get createdBy(): ProfileId {
    return this.props.createdBy;
  }

  get spaceId(): SpaceId | undefined {
    return this.props.spaceId;
  }

  get forkedFrom(): ToolId | undefined {
    return this.props.forkedFrom;
  }

  get elements(): ElementInstance[] {
    return this.props.elements;
  }

  get version(): string {
    return this.props.version;
  }

  get status(): ToolStatus {
    return this.props.status;
  }

  get visibility(): ToolVisibility {
    return this.props.visibility;
  }

  get deployedTo(): SpaceId[] {
    return this.props.deployedTo;
  }

  get analytics(): ToolAnalytics {
    return this.props.analytics;
  }

  get permissions(): ToolPermissions {
    return this.props.permissions;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get publishedAt(): Date | undefined {
    return this.props.publishedAt;
  }

  get isPublished(): boolean {
    return this.props.status === 'published';
  }

  get isDraft(): boolean {
    return this.props.status === 'draft';
  }

  get isArchived(): boolean {
    return this.props.status === 'archived';
  }

  // Factory Method
  public static create(
    props: Omit<ToolProps, 'toolId' | 'createdAt' | 'updatedAt' | 'deployedTo' | 'analytics'> & {
      toolId?: ToolId;
    },
    id?: string
  ): Result<Tool> {
    // Validation
    if (!props.name || props.name.trim().length === 0) {
      return Result.fail<Tool>('Tool name is required');
    }

    if (!props.description || props.description.trim().length === 0) {
      return Result.fail<Tool>('Tool description is required');
    }

    if (!props.elements || props.elements.length === 0) {
      return Result.fail<Tool>('Tool must have at least one element');
    }

    // Create tool ID if not provided
    const toolId = props.toolId || ToolId.create().getValue();

    const toolProps: ToolProps = {
      ...props,
      toolId,
      deployedTo: [],
      analytics: {
        uses: 0,
        forks: 0,
        rating: 0,
        submissions: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const tool = new Tool(toolProps, id);

    // Fire domain event
    tool.addDomainEvent(
      new ToolCreatedEvent(
        tool.id,
        props.name,
        props.createdBy.value,
        props.spaceId?.value
      )
    );

    return Result.ok<Tool>(tool);
  }

  /**
   * Publish Tool - Make it available to others
   */
  public publish(): Result<void> {
    if (this.props.status !== 'draft') {
      return Result.fail<void>('Only draft tools can be published');
    }

    // Business Rule: Must have at least one element
    if (this.props.elements.length === 0) {
      return Result.fail<void>('Cannot publish tool with no elements');
    }

    this.props.status = 'published';
    this.props.publishedAt = new Date();
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(
      new ToolPublishedEvent(this.id, this.props.name, this.props.visibility)
    );

    return Result.ok<void>();
  }

  /**
   * Archive Tool - Remove from active use
   */
  public archive(): Result<void> {
    if (this.props.status === 'archived') {
      return Result.fail<void>('Tool is already archived');
    }

    this.props.status = 'archived';
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(
      new ToolArchivedEvent(this.id, this.props.name)
    );

    return Result.ok<void>();
  }

  /**
   * Fork Tool - Create a copy with modifications
   */
  public fork(
    newName: string,
    newCreator: ProfileId,
    newSpaceId?: SpaceId
  ): Result<Tool> {
    // Business Rule: Tool must be forkable
    if (!this.props.permissions.canFork) {
      return Result.fail<Tool>('This tool cannot be forked');
    }

    // Business Rule: Published tools are more trustworthy to fork
    if (this.props.status !== 'published') {
      return Result.fail<Tool>('Only published tools can be forked');
    }

    // Create forked tool
    const forkedTool = Tool.create({
      name: newName,
      description: `Forked from: ${this.props.name}`,
      icon: this.props.icon,
      createdBy: newCreator,
      spaceId: newSpaceId,
      forkedFrom: this.props.toolId,
      elements: JSON.parse(JSON.stringify(this.props.elements)), // Deep clone
      version: '1.0.0',  // Reset version for fork
      status: 'draft',   // Forks start as drafts
      visibility: 'private',
      permissions: {
        canFork: true,
        canEdit: [newCreator],
        requiresApproval: this.props.permissions.requiresApproval
      }
    });

    if (forkedTool.isFailure) {
      return forkedTool;
    }

    // Increment fork count on original
    this.props.analytics.forks++;
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(
      new ToolForkedEvent(
        this.id,
        forkedTool.getValue().id,
        newCreator.value,
        this.props.analytics.forks
      )
    );

    return forkedTool;
  }

  /**
   * Deploy Tool to Spaces
   */
  public deployToSpaces(spaceIds: SpaceId[]): Result<void> {
    // Business Rule: Only published tools can be deployed
    if (this.props.status !== 'published') {
      return Result.fail<void>('Only published tools can be deployed');
    }

    // Add new deployment targets (avoid duplicates)
    spaceIds.forEach(spaceId => {
      if (!this.props.deployedTo.some(s => s.value === spaceId.value)) {
        this.props.deployedTo.push(spaceId);
      }
    });

    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(
      new ToolDeployedEvent(
        this.id,
        this.props.name,
        spaceIds.map(s => s.value),
        this.props.deployedTo.length
      )
    );

    return Result.ok<void>();
  }

  /**
   * Undeploy Tool from Space
   */
  public undeployFromSpace(spaceId: SpaceId): Result<void> {
    const index = this.props.deployedTo.findIndex(s => s.value === spaceId.value);
    if (index === -1) {
      return Result.fail<void>('Tool is not deployed to this space');
    }

    this.props.deployedTo.splice(index, 1);
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Record Tool Usage
   */
  public recordUse(userId: ProfileId): Result<void> {
    // Business Rule: Only published tools can be used
    if (this.props.status !== 'published') {
      return Result.fail<void>('Only published tools can be used');
    }

    this.props.analytics.uses++;
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(
      new ToolUsedEvent(this.id, this.props.name, userId.value, this.props.analytics.uses)
    );

    return Result.ok<void>();
  }

  /**
   * Record Submission (for form-based tools)
   */
  public recordSubmission(): Result<void> {
    this.props.analytics.submissions++;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  /**
   * Update Rating
   */
  public updateRating(newRating: number): Result<void> {
    if (newRating < 0 || newRating > 5) {
      return Result.fail<void>('Rating must be between 0 and 5');
    }

    this.props.analytics.rating = newRating;
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Update Elements (for builder)
   */
  public updateElements(elements: ElementInstance[]): Result<void> {
    if (this.props.status === 'published') {
      return Result.fail<void>('Cannot modify elements of published tool. Create new version or unpublish first.');
    }

    if (elements.length === 0) {
      return Result.fail<void>('Tool must have at least one element');
    }

    this.props.elements = elements;
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Update Visibility
   */
  public updateVisibility(visibility: ToolVisibility): Result<void> {
    this.props.visibility = visibility;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  /**
   * Grant Edit Access
   */
  public grantEditAccess(profileId: ProfileId): Result<void> {
    if (this.props.permissions.canEdit.some(p => p.value === profileId.value)) {
      return Result.fail<void>('User already has edit access');
    }

    this.props.permissions.canEdit.push(profileId);
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Revoke Edit Access
   */
  public revokeEditAccess(profileId: ProfileId): Result<void> {
    // Business Rule: Creator cannot be removed
    if (profileId.value === this.props.createdBy.value) {
      return Result.fail<void>('Cannot revoke creator access');
    }

    const index = this.props.permissions.canEdit.findIndex(p => p.value === profileId.value);
    if (index === -1) {
      return Result.fail<void>('User does not have edit access');
    }

    this.props.permissions.canEdit.splice(index, 1);
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  /**
   * Check if user can edit this tool
   */
  public canUserEdit(profileId: ProfileId): boolean {
    return this.props.createdBy.value === profileId.value ||
           this.props.permissions.canEdit.some(p => p.value === profileId.value);
  }

  /**
   * Check if user can use this tool
   */
  public canUserUse(profileId: ProfileId): boolean {
    // Published tools with appropriate visibility
    if (this.props.status !== 'published') return false;

    switch (this.props.visibility) {
      case 'public':
      case 'campus':
        return true;
      case 'space':
        // Would need to check space membership (application layer concern)
        return true;
      case 'private':
        return this.canUserEdit(profileId);
      default:
        return false;
    }
  }

  /**
   * Increment Version (semantic versioning)
   */
  public incrementVersion(type: 'major' | 'minor' | 'patch'): Result<void> {
    const [major, minor, patch] = this.props.version.split('.').map(Number);

    switch (type) {
      case 'major':
        this.props.version = `${major + 1}.0.0`;
        break;
      case 'minor':
        this.props.version = `${major}.${minor + 1}.0`;
        break;
      case 'patch':
        this.props.version = `${major}.${minor}.${patch + 1}`;
        break;
    }

    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  // Setters for repository mapping
  public setCreatedAt(date: Date): void {
    this.props.createdAt = date;
  }

  public setUpdatedAt(date: Date): void {
    this.props.updatedAt = date;
  }

  public setPublishedAt(date: Date | undefined): void {
    this.props.publishedAt = date;
  }

  public setAnalytics(analytics: ToolAnalytics): void {
    this.props.analytics = analytics;
  }

  public setDeployedTo(deployedTo: SpaceId[]): void {
    this.props.deployedTo = deployedTo;
  }
}
