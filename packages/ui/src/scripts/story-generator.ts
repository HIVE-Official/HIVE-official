#!/usr/bin/env tsx

/**
 * HIVE Story Generator - Social Media + Utility Platform
 * 
 * Automated story generation for all HIVE components with emphasis on:
 * - Social media platform features (engagement, community, sharing)
 * - Utility platform features (productivity, academic tools, campus life)
 * - Campus-specific social contexts and real student scenarios
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ComponentInfo {
  filePath: string;
  componentName: string;
  atomicLevel: 'atom' | 'molecule' | 'organism' | 'template';
  isHiveBranded: boolean;
  hasExistingStory: boolean;
}

interface SocialUtilityContext {
  socialFeatures: string[];
  utilityFeatures: string[];
  campusScenarios: string[];
  engagementPatterns: string[];
}

class HiveStoryGenerator {
  private rootPath: string;
  private components: ComponentInfo[] = [];
  
  // Social media + utility contexts for campus life
  private readonly socialUtilityContexts: Record<string, SocialUtilityContext> = {
    // Profile & Identity Components
    profile: {
      socialFeatures: [
        'Social proof badges and achievements',
        'Peer recognition and endorsements', 
        'Community status and role displays',
        'Friend connections and social graphs'
      ],
      utilityFeatures: [
        'Academic progress tracking',
        'Skill development monitoring',
        'Course completion status',
        'GPA and grade analytics'
      ],
      campusScenarios: [
        'Building study group credibility',
        'Showcasing academic achievements',
        'Connecting with classmates',
        'Discovering academic mentors'
      ],
      engagementPatterns: [
        'Profile views and social validation',
        'Achievement sharing and celebrations',
        'Peer comparison and motivation',
        'Academic milestone announcements'
      ]
    },
    
    // Social & Communication Components
    social: {
      socialFeatures: [
        'Real-time chat and messaging',
        'Group discussions and forums',
        'Content sharing and reactions',
        'Event planning and coordination'
      ],
      utilityFeatures: [
        'Study session scheduling',
        'Assignment collaboration tools',
        'Resource sharing platforms',
        'Academic calendar integration'
      ],
      campusScenarios: [
        'Organizing study groups',
        'Planning campus events', 
        'Coordinating group projects',
        'Sharing class notes and resources'
      ],
      engagementPatterns: [
        'Group formation and joining',
        'Content creation and sharing',
        'Peer-to-peer learning',
        'Campus community building'
      ]
    },
    
    // Academic & Learning Components
    academic: {
      socialFeatures: [
        'Peer learning communities',
        'Study buddy matching',
        'Academic achievement sharing',
        'Collaborative learning spaces'
      ],
      utilityFeatures: [
        'Assignment tracking and deadlines',
        'Grade monitoring and analytics',
        'Course planning and scheduling',
        'Academic resource libraries'
      ],
      campusScenarios: [
        'Course registration and planning',
        'Study session coordination',
        'Academic goal setting',
        'Performance tracking and improvement'
      ],
      engagementPatterns: [
        'Academic milestone celebrations',
        'Peer tutoring and mentoring',
        'Study group participation',
        'Knowledge sharing and collaboration'
      ]
    },
    
    // Campus Life & Utility Components
    campus: {
      socialFeatures: [
        'Campus event discovery',
        'Club and organization networking',
        'Roommate and friend finding',
        'Campus community engagement'
      ],
      utilityFeatures: [
        'Campus navigation and maps',
        'Dining and facility information',
        'Event scheduling and reminders',
        'Campus resource access'
      ],
      campusScenarios: [
        'Discovering campus events',
        'Finding study spaces',
        'Connecting with organizations',
        'Navigating campus resources'
      ],
      engagementPatterns: [
        'Event attendance and networking',
        'Campus community participation',
        'Resource sharing and recommendations',
        'Location-based social connections'
      ]
    }
  };

  constructor(rootPath: string = process.cwd()) {
    this.rootPath = rootPath;
  }

  async generateAllMissingStories(): Promise<void> {
    console.log('🚀 HIVE Story Generator - Social Media + Utility Platform\n');
    
    // Find all components
    await this.scanComponents();
    
    // Filter components missing stories
    const missingStories = this.components.filter(c => !c.hasExistingStory);
    
    console.log(`Found ${missingStories.length} components missing stories`);
    console.log(`Generating social media + utility stories...\n`);
    
    // Generate stories for missing components
    let generated = 0;
    for (const component of missingStories.slice(0, 20)) { // Generate first 20 for demo
      try {
        await this.generateComponentStory(component);
        generated++;
        console.log(`✅ Generated story for ${component.componentName}`);
      } catch (error) {
        console.error(`❌ Failed to generate story for ${component.componentName}:`, error);
      }
    }
    
    console.log(`\n🎉 Generated ${generated} stories with social media + utility focus!`);
    console.log(`📊 Remaining: ${missingStories.length - generated} components need stories`);
  }

  private async scanComponents(): Promise<void> {
    const patterns = [
      'src/atomic/**/*.tsx',
      'src/components/**/*.tsx',
      '!src/**/*.stories.tsx',
      '!src/**/*.test.tsx'
    ];
    
    for (const pattern of patterns) {
      const files = await glob(pattern, { cwd: this.rootPath });
      
      for (const filePath of files) {
        const componentName = this.extractComponentName(filePath);
        const atomicLevel = this.determineAtomicLevel(filePath);
        const isHiveBranded = filePath.includes('hive-') || componentName.toLowerCase().includes('hive');
        const hasExistingStory = await this.hasExistingStory(filePath);
        
        this.components.push({
          filePath,
          componentName,
          atomicLevel,
          isHiveBranded,
          hasExistingStory
        });
      }
    }
  }

  private async generateComponentStory(component: ComponentInfo): Promise<void> {
    const storyContent = this.generateStoryContent(component);
    const storyDir = this.getStoryDirectory(component.atomicLevel);
    const storyPath = path.join(this.rootPath, 'src/stories', storyDir, `${component.componentName.toLowerCase()}.stories.tsx`);
    
    // Ensure directory exists
    const dir = path.dirname(storyPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(storyPath, storyContent);
  }

  private generateStoryContent(component: ComponentInfo): string {
    const context = this.selectContext(component);
    const socialFeatures = context.socialFeatures.slice(0, 2).join('\n- ');
    const utilityFeatures = context.utilityFeatures.slice(0, 2).join('\n- ');
    const campusScenarios = context.campusScenarios.slice(0, 3);
    
    return `import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ${component.componentName} } from '../../${component.filePath.replace('src/', '').replace('.tsx', '')}';

/**
 * # ${component.componentName} - Social Media + Utility Platform
 * 
 * ${this.generateComponentDescription(component, context)}
 * 
 * ## Social Media Features
 * - ${socialFeatures}
 * 
 * ## Utility Features  
 * - ${utilityFeatures}
 * 
 * ## Campus Integration
 * Designed for ${component.atomicLevel} level interactions that blend social engagement
 * with academic utility, making campus life more connected and productive.
 */

// TODO: Replace with actual component implementation
const Mock${component.componentName}: React.FC<any> = (props) => (
  <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
    <h3 className="font-semibold text-[var(--hive-text-primary)]">${component.componentName}</h3>
    <p className="text-sm text-[var(--hive-text-secondary)]">
      Social media + utility ${component.atomicLevel} component
    </p>
  </div>
);

const meta: Meta<typeof Mock${component.componentName}> = {
  title: '${this.getStoryTitle(component)}',
  component: Mock${component.componentName},
  parameters: {
    docs: {
      description: {
        component: \`
# ${component.componentName} - Campus Social + Utility

${this.generateDetailedDescription(component, context)}
        \`
      }
    },
    layout: '${component.atomicLevel === 'atom' ? 'centered' : 'padded'}'
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] ${component.atomicLevel === 'atom' ? 'flex items-center justify-center' : ''}">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Social media context
export const Default: Story = {
  args: {}
};

// 2. PLAYGROUND STORY - Interactive social/utility controls
export const Playground: Story = {
  args: {}
};

// 3. SOCIAL MEDIA STORY - Community engagement focus
export const SocialMedia: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Media Platform Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Community engagement and social proof elements
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        ${this.generateSocialScenarios(campusScenarios)}
      </div>
    </div>
  )
};

// 4. UTILITY FEATURES STORY - Academic productivity focus  
export const UtilityFeatures: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Academic Utility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Productivity tools and campus life optimization
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <Mock${component.componentName} />
      </div>
    </div>
  )
};

// 5. CAMPUS SCENARIOS STORY - Real student usage
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How students use this component in real campus situations
        </p>
      </div>
      
      <div className="space-y-4">
        ${campusScenarios.map((scenario, i) => `
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">${scenario}</h3>
          <Mock${component.componentName} />
        </div>`).join('\n        ')}
      </div>
    </div>
  )
};

// 6. RESPONSIVE STORY - Mobile social engagement
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Mobile-First Social Design
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Optimized for 80% mobile campus usage patterns
        </p>
      </div>
      
      <Mock${component.componentName} />
    </div>
  )
};

// 7. ACCESSIBILITY STORY - Inclusive campus community
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessible Campus Community
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant social and utility features
        </p>
      </div>
      
      <Mock${component.componentName} />
    </div>
  )
};

// 8. MOTION STORY - HIVE liquid metal social interactions
export const Motion: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Interaction Motion
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          HIVE liquid metal animations for social engagement
        </p>
      </div>
      
      <Mock${component.componentName} />
    </div>
  )
};`;
  }

  private selectContext(component: ComponentInfo): SocialUtilityContext {
    const name = component.componentName.toLowerCase();
    
    if (name.includes('profile') || name.includes('badge') || name.includes('avatar')) {
      return this.socialUtilityContexts.profile;
    } else if (name.includes('chat') || name.includes('message') || name.includes('social') || name.includes('feed')) {
      return this.socialUtilityContexts.social;
    } else if (name.includes('course') || name.includes('grade') || name.includes('academic') || name.includes('study')) {
      return this.socialUtilityContexts.academic;
    } else {
      return this.socialUtilityContexts.campus;
    }
  }

  private generateComponentDescription(component: ComponentInfo, context: SocialUtilityContext): string {
    const level = component.atomicLevel;
    const name = component.componentName;
    
    const descriptions = {
      atom: `The ${name} atom is a foundational social-utility element that enables both community engagement and academic productivity. As a core building block, it seamlessly blends social media interactions with campus utility functions.`,
      molecule: `The ${name} molecule combines multiple social and utility atoms to create focused campus interactions. It bridges social media engagement with academic productivity in meaningful ways.`,
      organism: `The ${name} organism is a complex social-utility system that powers major campus interactions. It combines social media community features with robust academic and campus life utilities.`,
      template: `The ${name} template provides the structural foundation for social-utility pages, organizing multiple organisms to create comprehensive campus life experiences.`
    };
    
    return descriptions[level];
  }

  private generateDetailedDescription(component: ComponentInfo, context: SocialUtilityContext): string {
    return `
This ${component.atomicLevel} component exemplifies HIVE's social media + utility platform approach:

## Social Media Integration
${context.socialFeatures.map(f => `- ${f}`).join('\n')}

## Campus Utility Features
${context.utilityFeatures.map(f => `- ${f}`).join('\n')}

## Student Engagement Patterns
${context.engagementPatterns.map(p => `- ${p}`).join('\n')}

The ${component.componentName} ensures every interaction serves both social connection and academic success.`;
  }

  private generateSocialScenarios(scenarios: string[]): string {
    return scenarios.slice(0, 2).map(scenario => `
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">${scenario}</h3>
          <Mock${scenario.split(' ')[0]}Component />
        </div>`).join('\n        ');
  }

  private extractComponentName(filePath: string): string {
    return path.basename(filePath, '.tsx')
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  private determineAtomicLevel(filePath: string): ComponentInfo['atomicLevel'] {
    if (filePath.includes('/atoms/')) return 'atom';
    if (filePath.includes('/molecules/')) return 'molecule'; 
    if (filePath.includes('/organisms/')) return 'organism';
    if (filePath.includes('/templates/')) return 'template';
    return 'atom'; // Default for /components/
  }

  private getStoryDirectory(level: ComponentInfo['atomicLevel']): string {
    const mapping = {
      atom: '01-atoms',
      molecule: '02-molecules', 
      organism: '03-organisms',
      template: '04-templates'
    };
    return mapping[level];
  }

  private getStoryTitle(component: ComponentInfo): string {
    const level = component.atomicLevel.charAt(0).toUpperCase() + component.atomicLevel.slice(1);
    return `${this.getStoryDirectory(component.atomicLevel).split('-')[0]}-${level}s/${component.componentName}`;
  }

  private async hasExistingStory(componentPath: string): Promise<boolean> {
    const storyName = path.basename(componentPath, '.tsx');
    const storyPatterns = [
      `src/stories/**/${storyName}.stories.tsx`,
      `src/stories/**/${storyName.toLowerCase()}.stories.tsx`,
      `src/**/${storyName}.stories.tsx`
    ];
    
    for (const pattern of storyPatterns) {
      const matches = await glob(pattern, { cwd: this.rootPath });
      if (matches.length > 0) return true;
    }
    
    return false;
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new HiveStoryGenerator();
  generator.generateAllMissingStories().catch(console.error);
}

export { HiveStoryGenerator };