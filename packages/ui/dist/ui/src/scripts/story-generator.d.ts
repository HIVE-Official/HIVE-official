#!/usr/bin/env tsx
/**
 * HIVE Story Generator - Social Media + Utility Platform
 *
 * Automated story generation for all HIVE components with emphasis on:
 * - Social media platform features (engagement, community, sharing)
 * - Utility platform features (productivity, academic tools, campus life)
 * - Campus-specific social contexts and real student scenarios
 */
declare class HiveStoryGenerator {
    private rootPath;
    private components;
    private readonly socialUtilityContexts;
    constructor(rootPath?: string);
    generateAllMissingStories(): Promise<void>;
    private scanComponents;
    private generateComponentStory;
    private generateStoryContent;
    private selectContext;
    private generateComponentDescription;
    private generateDetailedDescription;
    private generateSocialScenarios;
    private extractComponentName;
    private determineAtomicLevel;
    private getStoryDirectory;
    private getStoryTitle;
    private hasExistingStory;
}
export { HiveStoryGenerator };
//# sourceMappingURL=story-generator.d.ts.map