"use strict";
/**
 * Enhanced Ritual with Campus Isolation and Rewards
 * Quick additions to make Rituals domain complete
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedRitual = void 0;
const ritual_1 = require("./ritual");
const campus_id_1 = require("../profile/value-objects/campus-id");
const value_objects_1 = require("./value-objects");
class EnhancedRitual extends ritual_1.Ritual {
    static createWithCampus(props) {
        const baseRitual = super.create(props);
        if (baseRitual.isFailure) {
            return value_objects_1.Result.fail(baseRitual.error);
        }
        const campusId = campus_id_1.CampusId.create(props.campusId || 'ub-buffalo');
        if (campusId.isFailure) {
            return value_objects_1.Result.fail(campusId.error);
        }
        const ritual = baseRitual.getValue();
        const baseData = ritual.toData();
        ritual.enhancedData = {
            ...baseData,
            campusId: campusId.getValue(),
            badges: [],
            rewards: [],
            visuals: props.visuals || {},
            isFeatured: false
        };
        // Add default badges based on ritual type
        ritual.addDefaultBadges();
        return value_objects_1.Result.ok(ritual);
    }
    // Add badge to ritual
    addBadge(badge) {
        const existing = this.enhancedData.badges.find(b => b.id === badge.id);
        if (existing) {
            return value_objects_1.Result.fail('Badge already exists');
        }
        this.enhancedData.badges.push(badge);
        return value_objects_1.Result.ok();
    }
    // Add reward
    addReward(reward) {
        const existing = this.enhancedData.rewards.find(r => r.id === reward.id);
        if (existing) {
            return value_objects_1.Result.fail('Reward already exists');
        }
        this.enhancedData.rewards.push(reward);
        return value_objects_1.Result.ok();
    }
    // Award badge to participant
    awardBadge(participantId, badgeId) {
        const badge = this.enhancedData.badges.find(b => b.id === badgeId);
        if (!badge) {
            return value_objects_1.Result.fail('Badge not found');
        }
        const participation = this.getParticipantProgress({ id: participantId, equals: () => false });
        if (!participation) {
            return value_objects_1.Result.fail('Participant not found');
        }
        // Award badge (would update participant record)
        badge.unlockedAt = new Date();
        return value_objects_1.Result.ok(badge);
    }
    // Feature the ritual
    feature() {
        this.enhancedData.isFeatured = true;
        this.enhancedData.updatedAt = new Date();
    }
    unfeature() {
        this.enhancedData.isFeatured = false;
        this.enhancedData.updatedAt = new Date();
    }
    // Update visuals
    updateVisuals(visuals) {
        this.enhancedData.visuals = {
            ...this.enhancedData.visuals,
            ...visuals
        };
        this.enhancedData.updatedAt = new Date();
    }
    // Check campus match
    belongsToCampus(campusId) {
        return this.enhancedData.campusId.equals(campusId);
    }
    // Get badges for points threshold
    getAvailableBadges(points) {
        return this.enhancedData.badges.filter(badge => {
            const reward = this.enhancedData.rewards.find(r => r.type === 'badge' && r.value.id === badge.id);
            return reward && reward.requiredPoints && reward.requiredPoints <= points;
        });
    }
    // Private helper to add default badges
    addDefaultBadges() {
        const typeStr = this.type.type;
        switch (typeStr) {
            case 'onboarding':
                this.enhancedData.badges.push({
                    id: 'first_steps',
                    name: 'First Steps',
                    description: 'Completed profile setup',
                    imageUrl: '/badges/first-steps.png',
                    rarity: 'common'
                }, {
                    id: 'social_butterfly',
                    name: 'Social Butterfly',
                    description: 'Joined 5 spaces',
                    imageUrl: '/badges/social-butterfly.png',
                    rarity: 'rare'
                });
                break;
            case 'challenge':
                this.enhancedData.badges.push({
                    id: 'challenger',
                    name: 'Challenger',
                    description: 'Participated in campus challenge',
                    imageUrl: '/badges/challenger.png',
                    rarity: 'common'
                }, {
                    id: 'champion',
                    name: 'Champion',
                    description: 'Top 10 in challenge',
                    imageUrl: '/badges/champion.png',
                    rarity: 'legendary'
                });
                break;
            case 'seasonal':
                this.enhancedData.badges.push({
                    id: 'seasonal_spirit',
                    name: 'Seasonal Spirit',
                    description: 'Participated in seasonal event',
                    imageUrl: '/badges/seasonal.png',
                    rarity: 'common'
                });
                break;
        }
    }
    // Generate feed update for ritual progress
    generateFeedUpdate() {
        return {
            type: 'ritual_update',
            title: this.title.title,
            description: `${this.participantCount} students participating • ${this.progressPercentage}% complete`,
            progress: this.progressPercentage,
            featured: this.enhancedData.isFeatured,
            visual: this.enhancedData.visuals.bannerUrl
        };
    }
    // Getters
    get campusId() {
        return this.enhancedData.campusId;
    }
    get badges() {
        return [...this.enhancedData.badges];
    }
    get rewards() {
        return [...this.enhancedData.rewards];
    }
    get isFeatured() {
        return this.enhancedData.isFeatured;
    }
    get visuals() {
        return { ...this.enhancedData.visuals };
    }
    toEnhancedData() {
        return {
            ...this.enhancedData,
            badges: [...this.enhancedData.badges],
            rewards: [...this.enhancedData.rewards]
        };
    }
}
exports.EnhancedRitual = EnhancedRitual;
//# sourceMappingURL=enhanced-ritual.js.map