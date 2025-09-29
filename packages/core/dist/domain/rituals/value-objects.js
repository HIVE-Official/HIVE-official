"use strict";
/**
 * Rituals Domain Value Objects
 * Based on SPEC.md rituals system - campus-wide behavioral campaigns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualStatus = exports.Points = exports.ActivityType = exports.ParticipationId = exports.Milestone = exports.CampusGoal = exports.RitualDescription = exports.RitualTitle = exports.RitualType = exports.RitualId = exports.Result = void 0;
class Result {
    constructor(isSuccess, error, value) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
    }
    getValue() {
        if (!this.isSuccess) {
            throw new Error('Cannot get value from failed result');
        }
        return this._value;
    }
    static ok(value) {
        return new Result(true, undefined, value);
    }
    static fail(error) {
        return new Result(false, error);
    }
}
exports.Result = Result;
/**
 * Ritual ID
 */
class RitualId {
    constructor(value) {
        this.value = value;
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result.fail('Ritual ID cannot be empty');
        }
        return Result.ok(new RitualId(id));
    }
    static generate() {
        const id = `ritual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return new RitualId(id);
    }
    get id() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.RitualId = RitualId;
class RitualType {
    constructor(value) {
        this.value = value;
    }
    static create(type) {
        const validTypes = ['onboarding', 'seasonal', 'challenge', 'emergency'];
        if (!validTypes.includes(type)) {
            return Result.fail('Invalid ritual type. Must be: onboarding, seasonal, challenge, or emergency');
        }
        return Result.ok(new RitualType(type));
    }
    static onboarding() {
        return new RitualType('onboarding');
    }
    static seasonal() {
        return new RitualType('seasonal');
    }
    static challenge() {
        return new RitualType('challenge');
    }
    static emergency() {
        return new RitualType('emergency');
    }
    get type() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.RitualType = RitualType;
/**
 * Ritual Title
 */
class RitualTitle {
    constructor(value) {
        this.value = value;
    }
    static create(title) {
        if (!title || title.trim().length === 0) {
            return Result.fail('Ritual title cannot be empty');
        }
        if (title.length > 100) {
            return Result.fail('Ritual title cannot exceed 100 characters');
        }
        return Result.ok(new RitualTitle(title.trim()));
    }
    get title() {
        return this.value;
    }
}
exports.RitualTitle = RitualTitle;
/**
 * Ritual Description
 */
class RitualDescription {
    constructor(value) {
        this.value = value;
    }
    static create(description) {
        if (description.length > 1000) {
            return Result.fail('Ritual description cannot exceed 1000 characters');
        }
        return Result.ok(new RitualDescription(description));
    }
    get description() {
        return this.value;
    }
}
exports.RitualDescription = RitualDescription;
/**
 * Campus Goal - what the entire campus is trying to achieve
 */
class CampusGoal {
    constructor(targetValue, currentValue, _unit) {
        this.targetValue = targetValue;
        this.currentValue = currentValue;
        this._unit = _unit;
    }
    static create(targetValue, unit, currentValue = 0) {
        if (targetValue <= 0) {
            return Result.fail('Target value must be positive');
        }
        if (currentValue < 0) {
            return Result.fail('Current value cannot be negative');
        }
        if (!unit || unit.trim().length === 0) {
            return Result.fail('Unit cannot be empty');
        }
        return Result.ok(new CampusGoal(targetValue, currentValue, unit.trim()));
    }
    get target() {
        return this.targetValue;
    }
    get current() {
        return this.currentValue;
    }
    get unit() {
        return this._unit;
    }
    get progressPercentage() {
        return Math.min(100, (this.currentValue / this.targetValue) * 100);
    }
    get isComplete() {
        return this.currentValue >= this.targetValue;
    }
    updateProgress(newValue) {
        if (newValue < 0) {
            return Result.fail('Progress value cannot be negative');
        }
        return Result.ok(new CampusGoal(this.targetValue, newValue, this._unit));
    }
}
exports.CampusGoal = CampusGoal;
/**
 * Milestone - checkpoints in ritual progress
 */
class Milestone {
    constructor(_name, _description, _threshold, _reward, isUnlocked = false) {
        this._name = _name;
        this._description = _description;
        this._threshold = _threshold;
        this._reward = _reward;
        this.isUnlocked = isUnlocked;
    }
    static create(name, description, threshold, reward) {
        if (!name || name.trim().length === 0) {
            return Result.fail('Milestone name cannot be empty');
        }
        if (threshold < 0) {
            return Result.fail('Milestone threshold cannot be negative');
        }
        if (!reward || reward.trim().length === 0) {
            return Result.fail('Milestone reward cannot be empty');
        }
        return Result.ok(new Milestone(name.trim(), description, threshold, reward.trim()));
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get threshold() {
        return this._threshold;
    }
    get reward() {
        return this._reward;
    }
    get unlocked() {
        return this.isUnlocked;
    }
    unlock() {
        return new Milestone(this.name, this.description, this.threshold, this.reward, true);
    }
    canUnlock(currentProgress) {
        return !this.isUnlocked && currentProgress >= this.threshold;
    }
}
exports.Milestone = Milestone;
/**
 * Participation ID
 */
class ParticipationId {
    constructor(value) {
        this.value = value;
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result.fail('Participation ID cannot be empty');
        }
        return Result.ok(new ParticipationId(id));
    }
    static generate() {
        const id = `participation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return new ParticipationId(id);
    }
    get id() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.ParticipationId = ParticipationId;
class ActivityType {
    constructor(value) {
        this.value = value;
    }
    static create(type) {
        const validTypes = [
            'space_join', 'post_create', 'event_attend', 'connection_make', 'profile_complete'
        ];
        if (!validTypes.includes(type)) {
            return Result.fail('Invalid activity type');
        }
        return Result.ok(new ActivityType(type));
    }
    static spaceJoin() {
        return new ActivityType('space_join');
    }
    static postCreate() {
        return new ActivityType('post_create');
    }
    static eventAttend() {
        return new ActivityType('event_attend');
    }
    static connectionMake() {
        return new ActivityType('connection_make');
    }
    static profileComplete() {
        return new ActivityType('profile_complete');
    }
    get type() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.ActivityType = ActivityType;
/**
 * Points - reward system for participation
 */
class Points {
    constructor(_value) {
        this._value = _value;
    }
    static create(points) {
        if (points < 0) {
            return Result.fail('Points cannot be negative');
        }
        return Result.ok(new Points(points));
    }
    static zero() {
        return new Points(0);
    }
    get value() {
        return this._value;
    }
    add(other) {
        return new Points(this._value + other._value);
    }
    subtract(other) {
        const newValue = this._value - other._value;
        if (newValue < 0) {
            return Result.fail('Cannot subtract more points than available');
        }
        return Result.ok(new Points(newValue));
    }
    isGreaterThan(other) {
        return this._value > other._value;
    }
    equals(other) {
        return this._value === other._value;
    }
}
exports.Points = Points;
class RitualStatus {
    constructor(value) {
        this.value = value;
    }
    static create(status) {
        const validStatuses = ['upcoming', 'active', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return Result.fail('Invalid ritual status');
        }
        return Result.ok(new RitualStatus(status));
    }
    static upcoming() {
        return new RitualStatus('upcoming');
    }
    static active() {
        return new RitualStatus('active');
    }
    static completed() {
        return new RitualStatus('completed');
    }
    static cancelled() {
        return new RitualStatus('cancelled');
    }
    get status() {
        return this.value;
    }
    isActive() {
        return this.value === 'active';
    }
    isCompleted() {
        return this.value === 'completed';
    }
    canParticipate() {
        return this.value === 'active';
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.RitualStatus = RitualStatus;
//# sourceMappingURL=value-objects.js.map