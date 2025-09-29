"use strict";
/**
 * FeedItem Entity
 * Represents an item in a user's feed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedItem = void 0;
const Entity_base_1 = require("../shared/base/Entity.base");
const Result_1 = require("../shared/base/Result");
class FeedItem extends Entity_base_1.Entity {
    get itemId() {
        return this.props.itemId;
    }
    get content() {
        return this.props.content;
    }
    get source() {
        return this.props.source;
    }
    get relevanceScore() {
        return this.props.relevanceScore;
    }
    get interactions() {
        return this.props.interactions;
    }
    get isVisible() {
        return this.props.isVisible;
    }
    get isTrending() {
        return this.props.isTrending;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    constructor(props, id) {
        super(props, id || `feeditem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(props, id) {
        if (!props.content.text || props.content.text.trim().length === 0) {
            return Result_1.Result.fail('Feed item content text is required');
        }
        const itemProps = {
            itemId: props.itemId,
            content: props.content,
            source: props.source,
            relevanceScore: props.relevanceScore || 1.0,
            interactions: [],
            createdAt: new Date(),
            isVisible: props.isVisible !== false,
            isTrending: props.isTrending || false,
            isPinned: props.isPinned || false,
            expiresAt: props.expiresAt
        };
        return Result_1.Result.ok(new FeedItem(itemProps, id));
    }
    addInteraction(interaction) {
        // Avoid duplicate interactions
        const exists = this.props.interactions.some(i => i.type === interaction.type &&
            i.userId.value === interaction.userId.value);
        if (!exists) {
            this.props.interactions.push(interaction);
            this.updateRelevanceScore();
        }
    }
    removeInteraction(userId, type) {
        this.props.interactions = this.props.interactions.filter(i => !(i.userId.value === userId.value && i.type === type));
        this.updateRelevanceScore();
    }
    setVisibility(isVisible) {
        this.props.isVisible = isVisible;
    }
    setTrending(isTrending) {
        this.props.isTrending = isTrending;
    }
    setPinned(isPinned) {
        this.props.isPinned = isPinned;
    }
    isExpired() {
        if (!this.props.expiresAt)
            return false;
        return new Date() > this.props.expiresAt;
    }
    updateRelevanceScore() {
        // Simple relevance scoring based on interactions
        const likes = this.props.interactions.filter(i => i.type === 'like').length;
        const comments = this.props.interactions.filter(i => i.type === 'comment').length;
        const shares = this.props.interactions.filter(i => i.type === 'share').length;
        this.props.relevanceScore = 1.0 + (likes * 0.1) + (comments * 0.3) + (shares * 0.5);
        // Boost for trending items
        if (this.props.isTrending) {
            this.props.relevanceScore *= 1.5;
        }
        // Decay based on age
        const ageInHours = (Date.now() - this.props.createdAt.getTime()) / (1000 * 60 * 60);
        this.props.relevanceScore *= Math.exp(-ageInHours / 24); // Exponential decay over 24 hours
    }
    toData() {
        return {
            id: this.id,
            itemId: this.props.itemId.value,
            content: this.props.content,
            source: this.props.source,
            relevanceScore: this.props.relevanceScore,
            interactions: this.props.interactions.map(i => ({
                type: i.type,
                userId: i.userId.value,
                timestamp: i.timestamp
            })),
            createdAt: this.props.createdAt,
            isVisible: this.props.isVisible,
            isTrending: this.props.isTrending,
            isPinned: this.props.isPinned,
            expiresAt: this.props.expiresAt
        };
    }
}
exports.FeedItem = FeedItem;
//# sourceMappingURL=feed-item.js.map