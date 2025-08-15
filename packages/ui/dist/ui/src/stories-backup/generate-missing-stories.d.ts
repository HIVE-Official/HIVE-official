#!/usr/bin/env tsx
/**
 * HIVE Storybook Story Generator
 * Automatically generates comprehensive stories for all atomic design system components
 * Run with: npx tsx src/stories/generate-missing-stories.ts
 */
interface ComponentInfo {
    name: string;
    path: string;
    category: 'atoms' | 'molecules' | 'organisms' | 'templates';
    hasStory: boolean;
}
declare function findComponents(): Promise<ComponentInfo[]>;
declare function generateMissingStories(components: ComponentInfo[]): Promise<void>;
export { findComponents, generateMissingStories };
//# sourceMappingURL=generate-missing-stories.d.ts.map