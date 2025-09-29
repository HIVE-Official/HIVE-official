"use strict";
/**
 * Spaces Domain Value Objects
 * Based on SPEC.md spaces and community requirements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRole = exports.RSSFeedUrl = exports.PostContent = exports.PostId = exports.SpaceType = exports.SpaceDescription = exports.SpaceName = exports.SpaceId = exports.Result = void 0;
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
 * Space ID
 */
class SpaceId {
    constructor(value) {
        this.value = value;
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result.fail('Space ID cannot be empty');
        }
        return Result.ok(new SpaceId(id));
    }
    static generate() {
        const id = `space_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return new SpaceId(id);
    }
    get id() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.SpaceId = SpaceId;
/**
 * Space Name - must be unique per campus
 */
class SpaceName {
    constructor(value) {
        this.value = value;
    }
    static create(name) {
        if (!name || name.trim().length === 0) {
            return Result.fail('Space name cannot be empty');
        }
        if (name.length > 100) {
            return Result.fail('Space name cannot exceed 100 characters');
        }
        return Result.ok(new SpaceName(name.trim()));
    }
    get name() {
        return this.value;
    }
    equals(other) {
        return this.value.toLowerCase() === other.value.toLowerCase();
    }
}
exports.SpaceName = SpaceName;
/**
 * Space Description
 */
class SpaceDescription {
    constructor(value) {
        this.value = value;
    }
    static create(description) {
        if (description.length > 500) {
            return Result.fail('Space description cannot exceed 500 characters');
        }
        return Result.ok(new SpaceDescription(description));
    }
    get description() {
        return this.value;
    }
}
exports.SpaceDescription = SpaceDescription;
class SpaceType {
    constructor(value) {
        this.value = value;
    }
    static create(type) {
        const validTypes = ['dorm', 'academic', 'interest', 'event', 'general'];
        if (!validTypes.includes(type)) {
            return Result.fail('Invalid space type. Must be: dorm, academic, interest, event, or general');
        }
        return Result.ok(new SpaceType(type));
    }
    get type() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.SpaceType = SpaceType;
/**
 * Post ID
 */
class PostId {
    constructor(value) {
        this.value = value;
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result.fail('Post ID cannot be empty');
        }
        return Result.ok(new PostId(id));
    }
    static generate() {
        const id = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return new PostId(id);
    }
    get id() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.PostId = PostId;
/**
 * Post Content
 */
class PostContent {
    constructor(_text, _mediaUrls = []) {
        this._text = _text;
        this._mediaUrls = _mediaUrls;
    }
    static create(text, mediaUrls = []) {
        if (!text || text.trim().length === 0) {
            return Result.fail('Post content cannot be empty');
        }
        if (text.length > 2000) {
            return Result.fail('Post content cannot exceed 2000 characters');
        }
        // Validate media URLs
        for (const url of mediaUrls) {
            try {
                new URL(url);
            }
            catch {
                return Result.fail('Invalid media URL');
            }
        }
        if (mediaUrls.length > 10) {
            return Result.fail('Cannot attach more than 10 media files');
        }
        return Result.ok(new PostContent(text.trim(), [...mediaUrls]));
    }
    get text() {
        return this._text;
    }
    get mediaUrls() {
        return [...this._mediaUrls];
    }
    get hasMedia() {
        return this._mediaUrls.length > 0;
    }
}
exports.PostContent = PostContent;
/**
 * RSS Feed URL for space integration
 */
class RSSFeedUrl {
    constructor(value) {
        this.value = value;
    }
    static create(url) {
        if (!url || url.trim().length === 0) {
            return Result.fail('RSS feed URL cannot be empty');
        }
        try {
            const parsedUrl = new URL(url);
            // Basic RSS URL validation
            if (!parsedUrl.protocol.startsWith('http')) {
                return Result.fail('RSS feed URL must use HTTP or HTTPS');
            }
        }
        catch {
            return Result.fail('Invalid RSS feed URL');
        }
        return Result.ok(new RSSFeedUrl(url));
    }
    get url() {
        return this.value;
    }
}
exports.RSSFeedUrl = RSSFeedUrl;
class MemberRole {
    constructor(value) {
        this.value = value;
    }
    static create(role) {
        const validRoles = ['leader', 'moderator', 'member'];
        if (!validRoles.includes(role)) {
            return Result.fail('Invalid member role. Must be: leader, moderator, or member');
        }
        return Result.ok(new MemberRole(role));
    }
    static leader() {
        return new MemberRole('leader');
    }
    static moderator() {
        return new MemberRole('moderator');
    }
    static member() {
        return new MemberRole('member');
    }
    get role() {
        return this.value;
    }
    canModerate() {
        return this.value === 'leader' || this.value === 'moderator';
    }
    canManageSpace() {
        return this.value === 'leader';
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.MemberRole = MemberRole;
//# sourceMappingURL=value-objects.js.map