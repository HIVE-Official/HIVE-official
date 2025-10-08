"use strict";
/**
 * Tool Aggregate
 * HiveLab no-code builder - custom tools created by space leaders
 *
 * From SPEC.md: "HiveLab = How to make things happen"
 * Purpose: Empower space leaders to build custom tools for their communities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = void 0;
const AggregateRoot_base_1 = require("../../shared/base/AggregateRoot.base");
const Result_1 = require("../../shared/base/Result");
const tool_id_value_1 = require("../value-objects/tool-id.value");
const tool_created_event_1 = require("../events/tool-created.event");
const tool_published_event_1 = require("../events/tool-published.event");
const tool_forked_event_1 = require("../events/tool-forked.event");
const tool_deployed_event_1 = require("../events/tool-deployed.event");
const tool_used_event_1 = require("../events/tool-used.event");
const tool_archived_event_1 = require("../events/tool-archived.event");
/**
 * Tool Aggregate
 * Represents a no-code tool built in HiveLab
 */
class Tool extends AggregateRoot_base_1.AggregateRoot {
    constructor(props, id) {
        super(props, id || props.toolId.value);
    }
    // Getters
    get toolId() {
        return this.props.toolId;
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    get icon() {
        return this.props.icon;
    }
    get createdBy() {
        return this.props.createdBy;
    }
    get spaceId() {
        return this.props.spaceId;
    }
    get forkedFrom() {
        return this.props.forkedFrom;
    }
    get elements() {
        return this.props.elements;
    }
    get version() {
        return this.props.version;
    }
    get status() {
        return this.props.status;
    }
    get visibility() {
        return this.props.visibility;
    }
    get deployedTo() {
        return this.props.deployedTo;
    }
    get analytics() {
        return this.props.analytics;
    }
    get permissions() {
        return this.props.permissions;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get publishedAt() {
        return this.props.publishedAt;
    }
    get isPublished() {
        return this.props.status === 'published';
    }
    get isDraft() {
        return this.props.status === 'draft';
    }
    get isArchived() {
        return this.props.status === 'archived';
    }
    // Factory Method
    static create(props, id) {
        // Validation
        if (!props.name || props.name.trim().length === 0) {
            return Result_1.Result.fail('Tool name is required');
        }
        if (!props.description || props.description.trim().length === 0) {
            return Result_1.Result.fail('Tool description is required');
        }
        if (!props.elements || props.elements.length === 0) {
            return Result_1.Result.fail('Tool must have at least one element');
        }
        // Create tool ID if not provided
        const toolId = props.toolId || tool_id_value_1.ToolId.create().getValue();
        const toolProps = {
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
        tool.addDomainEvent(new tool_created_event_1.ToolCreatedEvent(tool.id, props.name, props.createdBy.value, props.spaceId?.value));
        return Result_1.Result.ok(tool);
    }
    /**
     * Publish Tool - Make it available to others
     */
    publish() {
        if (this.props.status !== 'draft') {
            return Result_1.Result.fail('Only draft tools can be published');
        }
        // Business Rule: Must have at least one element
        if (this.props.elements.length === 0) {
            return Result_1.Result.fail('Cannot publish tool with no elements');
        }
        this.props.status = 'published';
        this.props.publishedAt = new Date();
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new tool_published_event_1.ToolPublishedEvent(this.id, this.props.name, this.props.visibility));
        return Result_1.Result.ok();
    }
    /**
     * Archive Tool - Remove from active use
     */
    archive() {
        if (this.props.status === 'archived') {
            return Result_1.Result.fail('Tool is already archived');
        }
        this.props.status = 'archived';
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new tool_archived_event_1.ToolArchivedEvent(this.id, this.props.name));
        return Result_1.Result.ok();
    }
    /**
     * Fork Tool - Create a copy with modifications
     */
    fork(newName, newCreator, newSpaceId) {
        // Business Rule: Tool must be forkable
        if (!this.props.permissions.canFork) {
            return Result_1.Result.fail('This tool cannot be forked');
        }
        // Business Rule: Published tools are more trustworthy to fork
        if (this.props.status !== 'published') {
            return Result_1.Result.fail('Only published tools can be forked');
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
            version: '1.0.0', // Reset version for fork
            status: 'draft', // Forks start as drafts
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
        this.addDomainEvent(new tool_forked_event_1.ToolForkedEvent(this.id, forkedTool.getValue().id, newCreator.value, this.props.analytics.forks));
        return forkedTool;
    }
    /**
     * Deploy Tool to Spaces
     */
    deployToSpaces(spaceIds) {
        // Business Rule: Only published tools can be deployed
        if (this.props.status !== 'published') {
            return Result_1.Result.fail('Only published tools can be deployed');
        }
        // Add new deployment targets (avoid duplicates)
        spaceIds.forEach(spaceId => {
            if (!this.props.deployedTo.some(s => s.value === spaceId.value)) {
                this.props.deployedTo.push(spaceId);
            }
        });
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new tool_deployed_event_1.ToolDeployedEvent(this.id, this.props.name, spaceIds.map(s => s.value), this.props.deployedTo.length));
        return Result_1.Result.ok();
    }
    /**
     * Undeploy Tool from Space
     */
    undeployFromSpace(spaceId) {
        const index = this.props.deployedTo.findIndex(s => s.value === spaceId.value);
        if (index === -1) {
            return Result_1.Result.fail('Tool is not deployed to this space');
        }
        this.props.deployedTo.splice(index, 1);
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Record Tool Usage
     */
    recordUse(userId) {
        // Business Rule: Only published tools can be used
        if (this.props.status !== 'published') {
            return Result_1.Result.fail('Only published tools can be used');
        }
        this.props.analytics.uses++;
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new tool_used_event_1.ToolUsedEvent(this.id, this.props.name, userId.value, this.props.analytics.uses));
        return Result_1.Result.ok();
    }
    /**
     * Record Submission (for form-based tools)
     */
    recordSubmission() {
        this.props.analytics.submissions++;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Update Rating
     */
    updateRating(newRating) {
        if (newRating < 0 || newRating > 5) {
            return Result_1.Result.fail('Rating must be between 0 and 5');
        }
        this.props.analytics.rating = newRating;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Update Elements (for builder)
     */
    updateElements(elements) {
        if (this.props.status === 'published') {
            return Result_1.Result.fail('Cannot modify elements of published tool. Create new version or unpublish first.');
        }
        if (elements.length === 0) {
            return Result_1.Result.fail('Tool must have at least one element');
        }
        this.props.elements = elements;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Update Visibility
     */
    updateVisibility(visibility) {
        const restrictedVisibilities = ['public', 'campus'];
        if (restrictedVisibilities.includes(visibility) && this.props.status !== 'published') {
            return Result_1.Result.fail('Only published tools can use campus or public visibility');
        }
        this.props.visibility = visibility;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Grant Edit Access
     */
    grantEditAccess(profileId) {
        if (this.props.permissions.canEdit.some(p => p.value === profileId.value)) {
            return Result_1.Result.fail('User already has edit access');
        }
        this.props.permissions.canEdit.push(profileId);
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Revoke Edit Access
     */
    revokeEditAccess(profileId) {
        // Business Rule: Creator cannot be removed
        if (profileId.value === this.props.createdBy.value) {
            return Result_1.Result.fail('Cannot revoke creator access');
        }
        const index = this.props.permissions.canEdit.findIndex(p => p.value === profileId.value);
        if (index === -1) {
            return Result_1.Result.fail('User does not have edit access');
        }
        this.props.permissions.canEdit.splice(index, 1);
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Check if user can edit this tool
     */
    canUserEdit(profileId) {
        return this.props.createdBy.value === profileId.value ||
            this.props.permissions.canEdit.some(p => p.value === profileId.value);
    }
    /**
     * Check if user can use this tool
     */
    canUserUse(profileId) {
        // Published tools with appropriate visibility
        if (this.props.status !== 'published')
            return false;
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
    incrementVersion(type) {
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
        return Result_1.Result.ok();
    }
    // Setters for repository mapping
    setCreatedAt(date) {
        this.props.createdAt = date;
    }
    setUpdatedAt(date) {
        this.props.updatedAt = date;
    }
    setPublishedAt(date) {
        this.props.publishedAt = date;
    }
    setAnalytics(analytics) {
        this.props.analytics = analytics;
    }
    setDeployedTo(deployedTo) {
        this.props.deployedTo = deployedTo;
    }
}
exports.Tool = Tool;
//# sourceMappingURL=tool.aggregate.js.map