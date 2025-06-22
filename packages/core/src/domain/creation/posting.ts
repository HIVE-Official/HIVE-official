// Content processing utilities
export class ContentProcessor {
  static processText(text: string): string {
    return text.trim();
  }

  static extractMentions(text: string): string[] {
    const mentions = text.match(/@[\w]+/g) || [];
    return mentions.map((mention) => mention.slice(1));
  }

  static extractHashtags(text: string): string[] {
    const hashtags = text.match(/#[\w]+/g) || [];
    return hashtags.map((tag) => tag.slice(1));
  }

  static sanitizeContent(content: string): string {
    return content.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  }
}

// Post validation utilities
export class PostValidator {
  static validateContent(content: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

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

  static validatePost(post: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

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
  static saveDraft(content: string, key: string = "default"): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(`hive_draft_${key}`, content);
    }
  }

  static loadDraft(key: string = "default"): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`hive_draft_${key}`);
    }
    return null;
  }

  static clearDraft(key: string = "default"): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`hive_draft_${key}`);
    }
  }

  static generateDraftId(): string {
    return `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getDraftKey(userId?: string): string {
    return userId ? `user_${userId}_draft` : "anonymous_draft";
  }
}
