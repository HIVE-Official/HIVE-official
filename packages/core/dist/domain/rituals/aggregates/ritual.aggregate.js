"use strict";
/**
 * Ritual Aggregate
 * Campus-wide behavioral campaigns based on SPEC.md Complete Ritual Specifications
 *
 * Three Types:
 * - Short (1 week): Feature introduction or themed celebration
 * - Anticipatory (variable): Build excitement for feature reveals
 * - Yearbook (3 weeks): Tournament-style competitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ritual = void 0;
const AggregateRoot_base_1 = require("../../shared/base/AggregateRoot.base");
const Result_1 = require("../../shared/base/Result");
const ritual_id_value_1 = require("../value-objects/ritual-id.value");
const profile_id_value_1 = require("../../profile/value-objects/profile-id.value");
const ritual_created_event_1 = require("../events/ritual-created.event");
const participant_joined_event_1 = require("../events/participant-joined.event");
const participant_left_event_1 = require("../events/participant-left.event");
const milestone_completed_event_1 = require("../events/milestone-completed.event");
const ritual_activated_event_1 = require("../events/ritual-activated.event");
const ritual_deactivated_event_1 = require("../events/ritual-deactivated.event");
/**
 * Ritual Aggregate
 * Manages campus-wide behavioral campaigns
 */
class Ritual extends AggregateRoot_base_1.AggregateRoot {
    constructor(props, id) {
        super(props, id || props.ritualId.value);
    }
    // Getters
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
    get category() {
        return this.props.category;
    }
    get status() {
        return this.props.status;
    }
    get duration() {
        return this.props.duration;
    }
    get startDate() {
        return this.props.startDate;
    }
    get endDate() {
        return this.props.endDate;
    }
    get goals() {
        return this.props.goals;
    }
    get requirements() {
        return this.props.requirements;
    }
    get rewards() {
        return this.props.rewards;
    }
    get campusId() {
        return this.props.campusId;
    }
    get targetAudience() {
        return this.props.targetAudience;
    }
    get visibility() {
        return this.props.visibility;
    }
    get participationStats() {
        return this.props.participationStats;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get announcedAt() {
        return this.props.announcedAt;
    }
    get activatedAt() {
        return this.props.activatedAt;
    }
    get launchedAt() {
        return this.props.launchedAt;
    }
    get completedAt() {
        return this.props.completedAt;
    }
    // Factory Method
    static create(props, id) {
        // Validation
        if (!props.name || props.name.trim().length === 0) {
            return Result_1.Result.fail('Ritual name is required');
        }
        if (!props.description || props.description.trim().length === 0) {
            return Result_1.Result.fail('Ritual description is required');
        }
        // Validate ritual type
        const validTypes = ['short', 'anticipatory', 'yearbook'];
        if (!validTypes.includes(props.type)) {
            return Result_1.Result.fail('Invalid ritual type');
        }
        // Validate duration based on type
        if (props.type === 'short' && props.duration !== '1 week') {
            return Result_1.Result.fail('Short rituals must be 1 week duration');
        }
        if (props.type === 'yearbook' && props.duration !== '3 weeks') {
            return Result_1.Result.fail('Yearbook rituals must be 3 weeks duration');
        }
        // Create ritual ID if not provided
        const ritualId = props.ritualId || ritual_id_value_1.RitualId.generate().getValue();
        const ritualProps = {
            ...props,
            ritualId,
            participants: [],
            participationStats: {
                total: 0,
                active: 0,
                completed: 0,
                averageProgress: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const ritual = new Ritual(ritualProps, id);
        // Fire domain event
        ritual.addDomainEvent(new ritual_created_event_1.RitualCreatedEvent(ritual.id, props.name, props.type, props.createdBy.value));
        return Result_1.Result.ok(ritual);
    }
    /**
     * Announce Ritual (48hr preview phase)
     */
    announce() {
        if (this.props.status !== 'draft') {
            return Result_1.Result.fail('Only draft rituals can be announced');
        }
        this.props.status = 'announced';
        this.props.announcedAt = new Date();
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Activate Ritual (start active phase)
     */
    activate() {
        if (this.props.status !== 'announced' && this.props.status !== 'paused') {
            return Result_1.Result.fail('Only announced or paused rituals can be activated');
        }
        this.props.status = 'active';
        this.props.activatedAt = new Date();
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new ritual_activated_event_1.RitualActivatedEvent(this.id));
        return Result_1.Result.ok();
    }
    /**
     * Enter Final Push Phase (last 24 hours)
     */
    enterFinalPush() {
        if (this.props.status !== 'active') {
            return Result_1.Result.fail('Only active rituals can enter final push');
        }
        this.props.status = 'final_push';
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Complete Ritual
     */
    complete() {
        if (this.props.status !== 'active' && this.props.status !== 'final_push') {
            return Result_1.Result.fail('Only active or final push rituals can be completed');
        }
        this.props.status = 'completed';
        this.props.completedAt = new Date();
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Pause Ritual
     */
    pause() {
        if (this.props.status !== 'active') {
            return Result_1.Result.fail('Only active rituals can be paused');
        }
        this.props.status = 'paused';
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new ritual_deactivated_event_1.RitualDeactivatedEvent(this.id));
        return Result_1.Result.ok();
    }
    /**
     * Add Participant
     */
    addParticipant(profileId) {
        const id = typeof profileId === 'string' ? profileId : profileId.value;
        const participantId = typeof profileId === 'string'
            ? profile_id_value_1.ProfileId.create(profileId).getValue()
            : profileId;
        // Business Rule: No duplicate participants
        if (this.props.participants.some(p => p.value === id)) {
            return Result_1.Result.fail('User is already participating in this ritual');
        }
        // Business Rule: Check target participation capacity
        if (this.props.targetParticipation &&
            this.props.participants.length >= this.props.targetParticipation) {
            return Result_1.Result.fail('Ritual has reached maximum participants');
        }
        // Business Rule: Check visibility and audience
        if (this.props.visibility === 'hidden') {
            return Result_1.Result.fail('Cannot join hidden rituals');
        }
        // Add participant
        this.props.participants.push(participantId);
        this.props.participationStats.total++;
        this.props.participationStats.active++;
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new participant_joined_event_1.ParticipantJoinedEvent(this.id, id, this.props.participants.length));
        return Result_1.Result.ok();
    }
    /**
     * Remove Participant
     */
    removeParticipant(profileId) {
        const id = typeof profileId === 'string' ? profileId : profileId.value;
        const index = this.props.participants.findIndex(p => p.value === id);
        if (index === -1) {
            return Result_1.Result.fail('User is not participating in this ritual');
        }
        this.props.participants.splice(index, 1);
        this.props.participationStats.active = Math.max(0, this.props.participationStats.active - 1);
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new participant_left_event_1.ParticipantLeftEvent(this.id, id, this.props.participants.length));
        return Result_1.Result.ok();
    }
    /**
     * Update Goal Progress
     */
    updateGoalProgress(goalId, progress) {
        const goal = this.props.goals.find(g => g.id === goalId);
        if (!goal) {
            return Result_1.Result.fail('Goal not found');
        }
        goal.currentValue = progress;
        // Check if goal is completed
        if (progress >= goal.targetValue && !goal.isCompleted) {
            goal.isCompleted = true;
            goal.completedAt = new Date();
            // Fire domain event
            this.addDomainEvent(new milestone_completed_event_1.MilestoneCompletedEvent(this.id, goal.id, goal.description, [] // Rewards are separate from goals
            ));
        }
        this.props.updatedAt = new Date();
        this.updateParticipationStats();
        return Result_1.Result.ok();
    }
    /**
     * Calculate completion percentage
     */
    getCompletionPercentage() {
        if (this.props.goals.length === 0)
            return 0;
        const completed = this.props.goals.filter(g => g.isCompleted).length;
        return Math.round((completed / this.props.goals.length) * 100);
    }
    /**
     * Calculate total progress across all goals
     */
    getTotalProgress() {
        if (this.props.goals.length === 0)
            return 0;
        const totalProgress = this.props.goals.reduce((sum, goal) => {
            return sum + Math.min(goal.currentValue / goal.targetValue, 1);
        }, 0);
        return Math.round((totalProgress / this.props.goals.length) * 100);
    }
    /**
     * Get participant count
     */
    getParticipantCount() {
        return this.props.participants.length;
    }
    /**
     * Get all participants
     */
    getParticipants() {
        return this.props.participants;
    }
    /**
     * Check if ritual is active
     */
    isActive() {
        return this.props.status === 'active' || this.props.status === 'final_push';
    }
    /**
     * Check if ritual has started
     */
    hasStarted() {
        return new Date() >= this.props.startDate;
    }
    /**
     * Check if ritual has ended
     */
    hasEnded() {
        if (!this.props.endDate)
            return false;
        return new Date() > this.props.endDate;
    }
    /**
     * Check if in final push period (last 24 hours)
     */
    isInFinalPush() {
        if (!this.props.endDate)
            return false;
        const now = new Date();
        const hoursRemaining = (this.props.endDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        return hoursRemaining <= 24 && hoursRemaining > 0;
    }
    /**
     * Update participation statistics
     */
    updateParticipationStats() {
        const totalGoals = this.props.goals.length;
        if (totalGoals === 0) {
            this.props.participationStats.averageProgress = 0;
            return;
        }
        // Calculate average progress across all goals
        const avgProgress = this.props.goals.reduce((sum, goal) => {
            const goalProgress = Math.min((goal.currentValue / goal.targetValue) * 100, 100);
            return sum + goalProgress;
        }, 0) / totalGoals;
        this.props.participationStats.averageProgress = Math.round(avgProgress);
    }
    /**
     * Mark participant as completed
     */
    markParticipantCompleted() {
        this.props.participationStats.completed++;
        this.props.participationStats.active = Math.max(0, this.props.participationStats.active - 1);
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    /**
     * Participation Business Logic (Moved from RitualParticipationService)
     */
    getParticipationWarnings(now = new Date()) {
        const warnings = [];
        // Days until end warning
        if (this.props.endDate) {
            const daysUntilEnd = Math.ceil((this.props.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            if (daysUntilEnd <= 7 && daysUntilEnd > 0) {
                warnings.push(`This ritual ends in ${daysUntilEnd} days`);
            }
        }
        // Spots remaining warning
        if (this.props.targetParticipation) {
            const spotsLeft = this.props.targetParticipation - this.props.participants.length;
            if (spotsLeft <= 10 && spotsLeft > 0) {
                warnings.push(`Only ${spotsLeft} spots remaining`);
            }
        }
        // Late join warning (if ritual has started and doesn't allow late join)
        // Note: This would need a settings field in the future
        // if (!this.props.settings.allowLateJoin && now > this.props.startDate) {
        //   warnings.push('This ritual has already started and doesn\'t allow late joins');
        // }
        return warnings;
    }
    calculateGoalPoints(goalId) {
        const goal = this.props.goals.find(g => g.id === goalId);
        if (!goal)
            return 0;
        // Base points based on target value
        let points = goal.targetValue * 10;
        // Find associated rewards for this goal
        const goalRewards = this.props.rewards.filter(r => r.requirements && r.requirements.includes(goalId));
        // Add bonus for point-type rewards
        goalRewards.forEach(reward => {
            if (reward.type === 'points' && typeof reward.value === 'number') {
                points += reward.value;
            }
        });
        return points;
    }
    getDaysUntilEnd(now = new Date()) {
        if (!this.props.endDate)
            return Infinity;
        return Math.ceil((this.props.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }
    getSpotsRemaining() {
        if (!this.props.targetParticipation)
            return null;
        return Math.max(0, this.props.targetParticipation - this.props.participants.length);
    }
    // Setters for repository mapping
    setCreatedAt(date) {
        this.props.createdAt = date;
    }
    setUpdatedAt(date) {
        this.props.updatedAt = date;
    }
    setGoals(goals) {
        this.props.goals = goals;
    }
    setRequirements(requirements) {
        this.props.requirements = requirements;
    }
    setRewards(rewards) {
        this.props.rewards = rewards;
    }
    toData() {
        return {
            id: this.id,
            ritualId: this.props.ritualId,
            name: this.props.name,
            description: this.props.description,
            type: this.props.type,
            category: this.props.category,
            duration: this.props.duration,
            campusId: this.props.campusId,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            createdBy: this.props.createdBy,
            targetAudience: this.props.targetAudience,
            visibility: this.props.visibility,
            status: this.props.status,
            goals: this.props.goals,
            requirements: this.props.requirements,
            rewards: this.props.rewards,
            participants: this.props.participants || [],
            participationStats: this.props.participationStats,
            targetParticipation: this.props.targetParticipation,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt
        };
    }
}
exports.Ritual = Ritual;
//# sourceMappingURL=ritual.aggregate.js.map