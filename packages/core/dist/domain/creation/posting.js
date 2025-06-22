// Content processing utilities
export class ContentProcessor {
    static processText(text) {
        return text.trim();
    }
    static extractMentions(text) {
        const mentions = text.match(/@[\w]+/g) || [];
        return mentions.map((mention) => mention.slice(1));
    }
    static extractHashtags(text) {
        const hashtags = text.match(/#[\w]+/g) || [];
        return hashtags.map((tag) => tag.slice(1));
    }
    static sanitizeContent(content) {
        return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    }
}
// Post validation utilities
export class PostValidator {
    static validateContent(content) {
        const errors = [];
        if (!content.trim()) {
            errors.push("Content cannot be empty");
        }
        if (content.length > 2000) {
            errors.push("Content exceeds maximum length of 2000 characters");
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    static validatePost(post) {
        const errors = [];
        if (!post.content) {
            errors.push("Post must have content");
        }
        if (!post.authorId) {
            errors.push("Post must have an author");
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}
// Draft management
export class DraftManager {
    static saveDraft(content, key = "default") {
        if (typeof window !== "undefined") {
            localStorage.setItem(`hive_draft_${key}`, content);
        }
    }
    static loadDraft(key = "default") {
        if (typeof window !== "undefined") {
            return localStorage.getItem(`hive_draft_${key}`);
        }
        return null;
    }
    static clearDraft(key = "default") {
        if (typeof window !== "undefined") {
            localStorage.removeItem(`hive_draft_${key}`);
        }
    }
    static generateDraftId() {
        return `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    static getDraftKey(userId) {
        return userId ? `user_${userId}_draft` : "anonymous_draft";
    }
}
//# sourceMappingURL=posting.js.map