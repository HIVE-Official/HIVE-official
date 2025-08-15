#!/usr/bin/env node
/**
 * HIVE Storybook Kitchen Sink Rebuild
 * Complete systematic rebuild of all stories with correct imports
 */

import { promises as fs } from 'fs';
import path from 'path';

interface ComponentFile {
  filePath: string;
  componentName: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates' | 'pages';
  exports: string[];
}

// Comprehensive component discovery
async function discoverAllComponents(): Promise<ComponentFile[]> {
  const components: ComponentFile[] = [];
  const categories = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];
  
  for (const category of categories) {
    const categoryPath = path.join(__dirname, 'src/atomic', category);
    
    try {
      const files = await fs.readdir(categoryPath);
      
      for (const file of files) {
        if (file.endsWith('.tsx') && !file.includes('.stories.') && !file.includes('.test.')) {
          const filePath = path.join(categoryPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Extract exports
          const exports = extractExports(content);
          const componentName = path.basename(file, '.tsx');
          
          components.push({
            filePath: path.relative(path.join(__dirname, 'src'), filePath),
            componentName,
            category: category as 'atoms' | 'molecules' | 'organisms' | 'templates' | 'pages',
            exports
          });
        }
      }
    } catch (error) {
      console.warn(`Could not scan ${category}:`, error);
    }
  }
  
  return components;
}

function extractExports(content: string): string[] {
  const exports: string[] = [];
  
  // Match export const/function/class ComponentName
  const exportMatches = content.match(/export\s+(const|function|class)\s+([A-Z][A-Za-z0-9]+)/g);
  if (exportMatches) {
    exportMatches.forEach(match => {
      const name = match.split(/\s+/).pop();
      if (name) exports.push(name);
    });
  }
  
  // Match export { ComponentName }
  const namedExports = content.match(/export\s*\{\s*([^}]+)\s*\}/g);
  if (namedExports) {
    namedExports.forEach(match => {
      const names = match.replace(/export\s*\{\s*/, '').replace(/\s*\}/, '').split(',');
      names.forEach(name => {
        const cleanName = name.trim().split(/\s+as\s+/)[0].trim();
        if (cleanName && /^[A-Z]/.test(cleanName)) {
          exports.push(cleanName);
        }
      });
    });
  }
  
  return exports;
}

function generateStoryContent(component: ComponentFile): string {
  const { componentName, category, exports: componentExports, filePath } = component;
  const importPath = `../../${filePath.replace('.tsx', '')}`;
  const mainExport = componentExports[0] || componentName;
  
  const categoryMap = {
    atoms: '01-Atoms',
    molecules: '02-Molecules', 
    organisms: '03-Organisms',
    templates: '04-Templates',
    pages: '05-Pages'
  };
  
  const storyTitle = `${categoryMap[category]}/${componentName.replace(/([A-Z])/g, ' $1').trim()}`;
  
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentExports.join(', ')} } from '${importPath}';

const meta: Meta<typeof ${mainExport}> = {
  title: '${storyTitle}',
  component: ${mainExport},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE ${componentName} component - comprehensive documentation with all variants and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'Content to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    children: '${componentName}',
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    children: '${componentName}',
  },
};

// Kitchen sink - all variants
export const KitchenSink: Story = {
  render: () => (
    <div className="p-6 space-y-6 bg-hive-background-primary">
      <h3 className="text-lg font-semibold text-hive-text-primary">${componentName} Variants</h3>
      <div className="grid gap-4">
        <${mainExport}>Default ${componentName}</${mainExport}>
        <${mainExport} className="border-hive-gold">With Custom Styling</${mainExport}>
      </div>
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => (
    <div className="p-6 space-y-6 bg-hive-background-primary">
      <h3 className="text-lg font-semibold text-hive-text-primary">Campus Use Cases</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium text-hive-text-primary">Student View</h4>
          <${mainExport}>Student ${componentName}</${mainExport}>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-hive-text-primary">Builder View</h4>
          <${mainExport}>Builder ${componentName}</${mainExport}>
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
    <div className="p-4">
      <${mainExport} className="w-full">Mobile ${componentName}</${mainExport}>
    </div>
  ),
};
`;
}

async function cleanAndRebuildStories() {
  console.log('🧹 Cleaning existing stories...');
  
  // Clean up stories directory but keep structure
  const storiesPath = path.join(__dirname, 'src/stories');
  const categories = ['01-atoms', '02-molecules', '03-organisms', '04-templates', '05-pages'];
  
  for (const category of categories) {
    const categoryPath = path.join(storiesPath, category);
    
    try {
      const files = await fs.readdir(categoryPath);
      for (const file of files) {
        if (file.endsWith('.stories.tsx')) {
          await fs.unlink(path.join(categoryPath, file));
        }
      }
    } catch {
      // Directory might not exist
      await fs.mkdir(categoryPath, { recursive: true });
    }
  }
  
  console.log('🔍 Discovering all components...');
  const components = await discoverAllComponents();
  
  console.log(`📝 Generating stories for ${components.length} components...`);
  
  for (const component of components) {
    const storyContent = generateStoryContent(component);
    const categoryMap = {
      atoms: '01-atoms',
      molecules: '02-molecules',
      organisms: '03-organisms', 
      templates: '04-templates',
      pages: '05-pages'
    };
    
    const storyPath = path.join(
      storiesPath,
      categoryMap[component.category],
      `${component.componentName}.stories.tsx`
    );
    
    await fs.writeFile(storyPath, storyContent);
    console.log(`✅ Generated: ${component.category}/${component.componentName}`);
  }
  
  console.log('🎉 Storybook rebuild complete!');
  console.log(`📊 Generated ${components.length} comprehensive stories`);
}

// Run if called directly
if (require.main === module) {
  cleanAndRebuildStories().catch(console.error);
}

export { cleanAndRebuildStories, discoverAllComponents };