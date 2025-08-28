import type { Post } from "../firestore/post";
export declare class ContentProcessor {
    static processText(text: string): string;
    static extractMentions(text: string): string[];
    static extractHashtags(text: string): string[];
    static sanitizeContent(content: string): string;
}
export declare class PostValidator {
    static validateContent(content: string): {
        isValid: boolean;
        errors: string[];
    };
    static validatePost(post: Post): {
        isValid: boolean;
        errors: string[];
    };
}
export declare class DraftManager {
    static saveDraft(content: string, key?: string): void;
    static loadDraft(key?: string): string | null;
    static clearDraft(key?: string): void;
    static generateDraftId(): string;
    static getDraftKey(userId?: string): string;
}
//# sourceMappingURL=posting.d.ts.map