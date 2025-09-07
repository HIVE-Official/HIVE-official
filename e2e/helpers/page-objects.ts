import { Page, Locator } from '@playwright/test';

/**
 * HIVE Page Objects
 * Reusable page element selectors and actions
 */

export class NavigationHelper {
  constructor(private page: Page) {}

  async navigateToSpaces() {
    await this.page.click('[data-testid="nav-spaces"]');
    await this.page.waitForURL('**/spaces');
  }

  async navigateToProfile() {
    await this.page.click('[data-testid="nav-profile"]');
    await this.page.waitForURL('**/profile/**');
  }

  async navigateToFeed() {
    await this.page.click('[data-testid="nav-feed"]');
    await this.page.waitForURL('**/feed');
  }

  async navigateToTools() {
    await this.page.click('[data-testid="nav-tools"]');
    await this.page.waitForURL('**/tools');
  }

  async openCommandPalette() {
    await this.page.keyboard.press('Meta+K');
    await this.page.waitForSelector('[data-testid="command-palette"]');
  }
}

export class SpaceHelper {
  constructor(private page: Page) {}

  async createSpace(spaceName: string, description: string) {
    await this.page.click('[data-testid="create-space-button"]');
    await this.page.fill('[data-testid="space-name-input"]', spaceName);
    await this.page.fill('[data-testid="space-description-input"]', description);
    await this.page.click('[data-testid="create-space-submit"]');
    await this.page.waitForSelector(`text="${spaceName}"`);
  }

  async joinSpace(spaceName: string) {
    await this.page.click(`[data-testid="space-card-${spaceName}"]`);
    await this.page.click('[data-testid="join-space-button"]');
    await this.page.waitForSelector('[data-testid="space-member-badge"]');
  }

  async searchSpaces(query: string) {
    await this.page.fill('[data-testid="space-search-input"]', query);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async filterByCategory(category: string) {
    await this.page.click(`[data-testid="space-category-${category}"]`);
    await this.page.waitForLoadState('networkidle');
  }
}

export class ProfileHelper {
  constructor(private page: Page) {}

  async updateProfileField(field: string, value: string) {
    await this.page.click('[data-testid="edit-profile-button"]');
    await this.page.fill(`[data-testid="profile-${field}-input"]`, value);
    await this.page.click('[data-testid="save-profile-button"]');
    await this.page.waitForSelector('[data-testid="profile-saved-toast"]');
  }

  async uploadAvatar(filePath: string) {
    await this.page.setInputFiles('[data-testid="avatar-upload-input"]', filePath);
    await this.page.waitForSelector('[data-testid="avatar-uploaded-toast"]');
  }

  async togglePrivacySetting(setting: string) {
    await this.page.click('[data-testid="privacy-settings-button"]');
    await this.page.click(`[data-testid="privacy-${setting}-toggle"]`);
    await this.page.click('[data-testid="save-privacy-settings"]');
  }

  async enableGhostMode() {
    await this.page.click('[data-testid="ghost-mode-toggle"]');
    await this.page.waitForSelector('[data-testid="ghost-mode-active"]');
  }
}

export class FeedHelper {
  constructor(private page: Page) {}

  async createPost(title: string, content: string) {
    await this.page.click('[data-testid="create-post-button"]');
    await this.page.fill('[data-testid="post-title-input"]', title);
    await this.page.fill('[data-testid="post-content-input"]', content);
    await this.page.click('[data-testid="publish-post-button"]');
    await this.page.waitForSelector(`text="${title}"`);
  }

  async likePost(postId: string) {
    await this.page.click(`[data-testid="like-button-${postId}"]`);
    await this.page.waitForSelector(`[data-testid="liked-${postId}"]`);
  }

  async commentOnPost(postId: string, comment: string) {
    await this.page.click(`[data-testid="comment-button-${postId}"]`);
    await this.page.fill('[data-testid="comment-input"]', comment);
    await this.page.click('[data-testid="submit-comment"]');
    await this.page.waitForSelector(`text="${comment}"`);
  }
}

export class ToolHelper {
  constructor(private page: Page) {}

  async createTool(name: string, description: string) {
    await this.page.click('[data-testid="create-tool-button"]');
    await this.page.fill('[data-testid="tool-name-input"]', name);
    await this.page.fill('[data-testid="tool-description-input"]', description);
    await this.page.click('[data-testid="save-tool-button"]');
    await this.page.waitForSelector(`text="${name}"`);
  }

  async deployTool(toolId: string, spaceId: string) {
    await this.page.click(`[data-testid="tool-${toolId}"]`);
    await this.page.click('[data-testid="deploy-tool-button"]');
    await this.page.selectOption('[data-testid="deploy-space-select"]', spaceId);
    await this.page.click('[data-testid="confirm-deploy"]');
    await this.page.waitForSelector('[data-testid="deploy-success-toast"]');
  }

  async useTool(toolId: string) {
    await this.page.click(`[data-testid="tool-${toolId}"]`);
    await this.page.click('[data-testid="run-tool-button"]');
    await this.page.waitForSelector('[data-testid="tool-output"]');
  }
}