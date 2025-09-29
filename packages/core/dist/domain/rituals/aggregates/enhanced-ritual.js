"use strict";
/**
 * EnhancedRitual Aggregate
 * Represents a campus-wide ritual or campaign with gamification
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedRitual = void 0;
const AggregateRoot_base_1 = require("../../shared/base/AggregateRoot.base");
const Result_1 = require("../../shared/base/Result");
const profile_id_value_1 = require("../../profile/value-objects/profile-id.value");
class EnhancedRitual extends AggregateRoot_base_1.AggregateRoot {
    get ritualId() {
        return this.props.ritualId;
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    get type() {
        return this.props.type;
    }
    get campusId() {
        return this.props.campusId;
    }
    get participants() {
        return this.props.participants.length;
    }
    get isActive() {
        return this.props.isActive;
    }
    get settings() {
        return this.props.settings;
    }
    get startDate() {
        return this.props.startDate;
    }
    get endDate() {
        return this.props.endDate;
    }
    get milestones() {
        return this.props.milestones;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    constructor(props, id) {
        super(props, id || `ritual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(props, id) {
        if (!props.name || props.name.trim().length === 0) {
            return Result_1.Result.fail('Ritual name is required');
        }
        if (!props.description || props.description.trim().length === 0) {
            return Result_1.Result.fail('Ritual description is required');
        }
        const defaultSettings = {
            isVisible: true,
            allowLateJoin: true,
            requiresApproval: false,
            autoStart: false,
            autoEnd: false,
            ...props.settings
        };
        const ritualProps = {
            ritualId: props.ritualId,
            name: props.name,
            description: props.description,
            type: props.type,
            campusId: props.campusId,
            createdBy: props.createdBy,
            milestones: props.milestones || [],
            participants: [],
            settings: defaultSettings,
            startDate: props.startDate,
            endDate: props.endDate,
            isActive: true,
            completedCount: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return Result_1.Result.ok(new EnhancedRitual(ritualProps, id));
    }
    addParticipant(profileId) {
        const id = typeof profileId === 'string' ? profileId : profileId.value;
        // Check if already participating
        if (this.props.participants.some(p => (typeof p === 'string' ? p : p.value) === id)) {
            return Result_1.Result.fail('User is already participating');
        }
        // Check max participants
        if (this.props.settings.maxParticipants &&
            this.props.participants.length >= this.props.settings.maxParticipants) {
            return Result_1.Result.fail('Ritual has reached maximum participants');
        }
        // Check if late join is allowed
        if (!this.props.settings.allowLateJoin && this.props.startDate) {
            if (new Date() > this.props.startDate) {
                return Result_1.Result.fail('Late join is not allowed for this ritual');
            }
        }
        // Add the participant
        const participantId = typeof profileId === 'string'
            ? profile_id_value_1.ProfileId.create(profileId).getValue()
            : profileId;
        this.props.participants.push(participantId);
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    removeParticipant(profileId) {
        const index = this.props.participants.findIndex(p => (typeof p === 'string' ? p : p.value) === profileId.value);
        if (index === -1) {
            return Result_1.Result.fail('User is not participating');
        }
        this.props.participants.splice(index, 1);
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    updateMilestoneProgress(milestoneId, progress) {
        const milestone = this.props.milestones.find(m => m.id === milestoneId);
        if (!milestone) {
            return Result_1.Result.fail('Milestone not found');
        }
        milestone.currentValue = progress;
        if (progress >= milestone.targetValue && !milestone.isCompleted) {
            milestone.isCompleted = true;
            this.props.completedCount++;
        }
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    activate() {
        this.props.isActive = true;
        this.props.updatedAt = new Date();
    }
    deactivate() {
        this.props.isActive = false;
        this.props.updatedAt = new Date();
    }
    hasStarted() {
        if (!this.props.startDate)
            return true;
        return new Date() >= this.props.startDate;
    }
    hasEnded() {
        if (!this.props.endDate)
            return false;
        return new Date() > this.props.endDate;
    }
    isInProgress() {
        return this.hasStarted() && !this.hasEnded() && this.props.isActive;
    }
    getCompletionPercentage() {
        if (this.props.milestones.length === 0)
            return 0;
        const completed = this.props.milestones.filter(m => m.isCompleted).length;
        return (completed / this.props.milestones.length) * 100;
    }
    getParticipant(profileId) {
        return this.props.participants.find(p => (typeof p === 'string' ? p : p.value) === profileId);
    }
    getParticipants() {
        return this.props.participants;
    }
    getTotalProgress() {
        if (this.props.milestones.length === 0)
            return 0;
        const totalProgress = this.props.milestones.reduce((sum, milestone) => {
            return sum + Math.min(milestone.currentValue / milestone.targetValue, 1);
        }, 0);
        return (totalProgress / this.props.milestones.length) * 100;
    }
    getParticipantCount() {
        return this.props.participants.length;
    }
    getTotalActivities() {
        return this.props.milestones.reduce((sum, milestone) => sum + milestone.currentValue, 0);
    }
    get rewards() {
        return this.props.milestones.flatMap(milestone => milestone.rewards);
    }
    // Temporary setters for repository layer - should be removed once proper construction is implemented
    setCreatedAt(date) {
        this.props.createdAt = date;
    }
    setUpdatedAt(date) {
        this.props.updatedAt = date;
    }
    setMilestones(milestones) {
        this.props.milestones = milestones;
    }
    toData() {
        return {
            id: this.id,
            ritualId: this.props.ritualId,
            name: this.props.name,
            description: this.props.description,
            type: this.props.type,
            campusId: this.props.campusId,
            createdBy: this.props.createdBy,
            milestones: this.props.milestones,
            participants: this.props.participants.length,
            settings: this.props.settings,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            isActive: this.props.isActive,
            completedCount: this.props.completedCount,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt
        };
    }
}
exports.EnhancedRitual = EnhancedRitual;
//# sourceMappingURL=enhanced-ritual.js.map