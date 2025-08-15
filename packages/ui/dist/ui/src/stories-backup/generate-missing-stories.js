#!/usr/bin/env tsx
/**
 * HIVE Storybook Story Generator
 * Automatically generates comprehensive stories for all atomic design system components
 * Run with: npx tsx src/stories/generate-missing-stories.ts
 */
import { promises as fs } from 'fs';
import path from 'path';
const ATOMIC_PATHS = {
    atoms: '../atomic/atoms',
    molecules: '../atomic/molecules',
    organisms: '../atomic/organisms',
    templates: '../atomic/templates',
};
const STORY_PATHS = {
    atoms: './01-atoms',
    molecules: './02-molecules',
    organisms: './03-organisms',
    templates: './04-templates',
};
// Template for generating comprehensive stories
const generateStoryTemplate = (componentName, category, importPath) => {
    const componentDisplayName = componentName.replace(/([A-Z])/g, ' $1').trim();
    const storyTitle = `${category === 'atoms' ? '01-Atoms' : category === 'molecules' ? '02-Molecules' : category === 'organisms' ? '03-Organisms' : '04-Templates'}/${componentDisplayName}`;
    return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '${importPath}';

const meta: Meta<typeof ${componentName}> = {
  title: '${storyTitle}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE ${componentDisplayName} component with comprehensive variants and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Add component-specific arg types here
    children: {
      control: 'text',
      description: 'Content to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Component variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Component size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    children: '${componentDisplayName}',
  },
};

// Variants
export const Primary: Story = {
  args: {
    children: '${componentDisplayName}',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: '${componentDisplayName}',
    variant: 'secondary',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: '${componentDisplayName}',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: '${componentDisplayName}',
    size: 'lg',
  },
};

// States
export const Disabled: Story = {
  args: {
    children: '${componentDisplayName}',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: '${componentDisplayName}',
    // Add loading state props as needed
  },
};

// Interactive states
export const Interactive: Story = {
  args: {
    children: '${componentDisplayName}',
  },
  play: async ({ canvasElement }) => {
    // Add interaction tests here using @storybook/testing-library
  },
};

// Campus-specific scenarios
export const CampusScenario: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-hive-background-primary">
      <h3 className="text-lg font-semibold text-hive-text-primary">Campus Use Cases</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <${componentName}>Student View</${componentName}>
        <${componentName} variant="primary">Faculty View</${componentName}>
        <${componentName} variant="secondary">Admin View</${componentName}>
        <${componentName} size="sm">Mobile Optimized</${componentName}>
      </div>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-hive-text-primary">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <${componentName}>Default</${componentName}>
          <${componentName} variant="primary">Primary</${componentName}>
          <${componentName} variant="secondary">Secondary</${componentName}>
          <${componentName} variant="success">Success</${componentName}>
          <${componentName} variant="warning">Warning</${componentName}>
          <${componentName} variant="error">Error</${componentName}>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-hive-text-primary">Sizes</h3>
        <div className="flex items-center gap-3">
          <${componentName} size="sm">Small</${componentName}>
          <${componentName} size="md">Medium</${componentName}>
          <${componentName} size="lg">Large</${componentName}>
          <${componentName} size="xl">Extra Large</${componentName}>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-hive-text-primary">States</h3>
        <div className="flex gap-3">
          <${componentName}>Normal</${componentName}>
          <${componentName} disabled>Disabled</${componentName}>
        </div>
      </div>
    </div>
  ),
};

// Responsive showcase
export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-hive-text-primary">Mobile View</h3>
      <${componentName} className="w-full">${componentDisplayName}</${componentName}>
    </div>
  ),
};

// Dark theme (default)
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'hive-dark' },
  },
  args: {
    children: '${componentDisplayName}',
  },
};

// Accessibility showcase
export const Accessibility: Story = {
  args: {
    children: '${componentDisplayName}',
    'aria-label': '${componentDisplayName} for accessibility testing',
    tabIndex: 0,
  },
  play: async ({ canvasElement }) => {
    // Add accessibility tests here
  },
};
`;
};
async function findComponents() {
    const components = [];
    for (const [category, atomicPath] of Object.entries(ATOMIC_PATHS)) {
        try {
            const fullPath = path.resolve(__dirname, atomicPath);
            const files = await fs.readdir(fullPath);
            for (const file of files) {
                if (file.endsWith('.tsx') && !file.endsWith('.test.tsx') && !file.endsWith('.stories.tsx')) {
                    const componentName = path.basename(file, '.tsx');
                    const pascalCaseName = componentName
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join('');
                    // Check if story already exists
                    const storyPath = path.resolve(__dirname, STORY_PATHS[category], `${file.replace('.tsx', '.stories.tsx')}`);
                    let hasStory = false;
                    try {
                        await fs.access(storyPath);
                        hasStory = true;
                    }
                    catch {
                        hasStory = false;
                    }
                    components.push({
                        name: pascalCaseName,
                        path: file,
                        category: category,
                        hasStory,
                    });
                }
            }
        }
        catch (error) {
            console.warn(`Could not read directory ${atomicPath}:`, error);
        }
    }
    return components;
}
async function generateMissingStories(components) {
    const missingStories = components.filter(comp => !comp.hasStory);
    console.log(`Found ${components.length} components, ${missingStories.length} missing stories`);
    for (const component of missingStories) {
        const storyDir = path.resolve(__dirname, STORY_PATHS[component.category]);
        const storyPath = path.join(storyDir, `${component.path.replace('.tsx', '.stories.tsx')}`);
        const importPath = `../../atomic/${component.category}/${component.path.replace('.tsx', '')}`;
        // Ensure directory exists
        await fs.mkdir(storyDir, { recursive: true });
        // Generate story content
        const storyContent = generateStoryTemplate(component.name, component.category, importPath);
        // Write story file
        await fs.writeFile(storyPath, storyContent, 'utf8');
        console.log(`✅ Generated story for ${component.name} at ${storyPath}`);
    }
}
async function main() {
    try {
        console.log('🔍 Scanning HIVE atomic design system components...');
        const components = await findComponents();
        console.log('📝 Generating missing stories...');
        await generateMissingStories(components);
        console.log('✨ Story generation complete!');
        console.log('\n📊 Component Coverage:');
        const coverage = {
            atoms: components.filter(c => c.category === 'atoms'),
            molecules: components.filter(c => c.category === 'molecules'),
            organisms: components.filter(c => c.category === 'organisms'),
            templates: components.filter(c => c.category === 'templates'),
        };
        for (const [category, comps] of Object.entries(coverage)) {
            const withStories = comps.filter(c => c.hasStory).length;
            const total = comps.length;
            const percentage = total > 0 ? Math.round((withStories / total) * 100) : 0;
            console.log(`  ${category}: ${withStories}/${total} (${percentage}%)`);
        }
        console.log('\n🚀 Run "npm run storybook" to see your comprehensive design system!');
    }
    catch (error) {
        console.error('❌ Error generating stories:', error);
        process.exit(1);
    }
}
// Run if called directly
if (require.main === module) {
    main();
}
export { findComponents, generateMissingStories };
//# sourceMappingURL=generate-missing-stories.js.map