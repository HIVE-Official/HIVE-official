import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveRichTextEditor, CampusLink, CollaborativeUser } from '../../components';
import { 
  Hash, 
  AtSign, 
  Users, 
  BookOpen, 
  Code, 
  GraduationCap,
  Building,
  Zap,
  Lightbulb,
  Palette,
  Camera,
  Globe
} from 'lucide-react';

const meta: Meta<typeof HiveRichTextEditor> = {
  title: '04-HIVE/Rich Text Editor',
  component: HiveRichTextEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Comprehensive rich text editor with markdown support, campus integrations, and collaborative features. Perfect for tool building, documentation, and content creation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'premium', 'elevated', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    mode: {
      control: 'select',
      options: ['edit', 'preview', 'split'],
    },
    showToolbar: {
      control: 'boolean',
    },
    showPreview: {
      control: 'boolean',
    },
    showWordCount: {
      control: 'boolean',
    },
    showCollaborators: {
      control: 'boolean',
    },
    syntaxHighlight: {
      control: 'boolean',
    },
    autosave: {
      control: 'boolean',
    },
    creatable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample campus links for stories
const sampleCampusLinks: CampusLink[] = [
  { type: 'space', id: 'cs-lounge', name: 'CS Lounge', url: '/spaces/cs-lounge' },
  { type: 'space', id: 'engineering-lab', name: 'Engineering Lab', url: '/spaces/engineering-lab' },
  { type: 'space', id: 'design-studio', name: 'Design Studio', url: '/spaces/design-studio' },
  { type: 'student', id: 'jane-doe', name: 'Jane Doe', url: '/students/jane-doe' },
  { type: 'student', id: 'john-smith', name: 'John Smith', url: '/students/john-smith' },
  { type: 'course', id: 'cs-101', name: 'Intro to Computer Science', url: '/courses/cs-101' },
  { type: 'course', id: 'eng-201', name: 'Engineering Design', url: '/courses/eng-201' },
  { type: 'tool', id: 'task-manager', name: 'Campus Task Manager', url: '/tools/task-manager' },
];

// Sample collaborators
const sampleCollaborators: CollaborativeUser[] = [
  { id: '1', name: 'Alex Chen', avatar: '/avatars/alex.jpg' },
  { id: '2', name: 'Maria Rodriguez', avatar: '/avatars/maria.jpg' },
  { id: '3', name: 'David Kim', avatar: '/avatars/david.jpg' },
  { id: '4', name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
];

// Sample markdown content
const sampleMarkdown = `# Campus Project Documentation

## Overview
This is a comprehensive guide for building tools on the HIVE platform. Students can create, collaborate, and share their projects with the campus community.

### Key Features
- **Markdown Support**: Write with familiar syntax
- **Campus Links**: Connect to [#CS Lounge](/spaces/cs-lounge) and [@Jane Doe](/students/jane-doe)
- **Collaborative Editing**: Work together in real-time
- **Code Blocks**: Share your implementations

\`\`\`javascript
function buildTool() {
  return {
    name: 'Campus Builder',
    platform: 'HIVE',
    collaborative: true
  };
}
\`\`\`

> "Students as builders, not just users" - HIVE Philosophy

### Next Steps
1. Design your tool interface
2. Implement core functionality
3. Test with campus community
4. Deploy to production

---

*Created by students, for students* 🎓`;

// Basic Rich Text Editor
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Tool Documentation</h3>
        <HiveRichTextEditor
          value={value}
          onChange={setValue}
          placeholder="Start writing your documentation..."
          showWordCount
          syntaxHighlight
          autosave
          onSave={(content) => console.log('Saved:', content)}
        />
      </div>
    );
  },
};

// Campus Integration Example
export const CampusIntegration: Story = {
  render: () => {
    const [value, setValue] = useState(sampleMarkdown);
    
    const handleCampusLinkSearch = async (query: string, type: CampusLink['type']) => {
      // Simulate search
      await new Promise(resolve => setTimeout(resolve, 200));
      return sampleCampusLinks.filter(link => 
        link.type === type && link.name.toLowerCase().includes(query.toLowerCase())
      );
    };
    
    return (
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Campus Project Builder</h3>
        <HiveRichTextEditor
          variant="elevated"
          value={value}
          onChange={setValue}
          placeholder="Document your campus project..."
          campusLinks={sampleCampusLinks}
          onCampusLinkSearch={handleCampusLinkSearch}
          showWordCount
          syntaxHighlight
          autosave
          onSave={(content) => console.log('Saved:', content)}
        />
        <div className="mt-4 text-xs text-gray-500">
          Use @ to mention students, # to reference spaces
        </div>
      </div>
    );
  },
};

// Collaborative Editor
export const CollaborativeEditor: Story = {
  render: () => {
    const [value, setValue] = useState('# Team Project\n\nCollaborating on campus innovation...');
    
    return (
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Collaborative Document</h3>
        <HiveRichTextEditor
          variant="premium"
          value={value}
          onChange={setValue}
          placeholder="Start collaborating..."
          collaborators={sampleCollaborators}
          showCollaborators
          showWordCount
          syntaxHighlight
          autosave
          onSave={(content) => console.log('Saved:', content)}
        />
        <div className="mt-4 text-xs text-gray-500">
          Real-time collaboration with campus community
        </div>
      </div>
    );
  },
};

// Split Mode Preview
export const SplitMode: Story = {
  render: () => {
    const [value, setValue] = useState(sampleMarkdown);
    
    return (
      <div className="w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Split View Editor</h3>
        <HiveRichTextEditor
          mode="split"
          size="lg"
          value={value}
          onChange={setValue}
          placeholder="Write and preview simultaneously..."
          showWordCount
          syntaxHighlight
          autosave
          onSave={(content) => console.log('Saved:', content)}
        />
      </div>
    );
  },
};

// Tool Builder Interface
export const ToolBuilder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    const handleImageUpload = async (file: File) => {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      return `/uploads/${file.name}`;
    };
    
    const handleCampusLinkSearch = async (query: string, type: CampusLink['type']) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return sampleCampusLinks.filter(link => 
        link.type === type && link.name.toLowerCase().includes(query.toLowerCase())
      );
    };
    
    return (
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-[var(--hive-brand-primary)] rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-[var(--hive-background-primary)]" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-primary)]">Campus Tool Builder</h3>
            <p className="text-sm text-gray-400">Create documentation for your campus tool</p>
          </div>
        </div>
        
        <HiveRichTextEditor
          variant="elevated"
          size="lg"
          value={value}
          onChange={setValue}
          placeholder="## Tool Name\n\nDescribe your tool and how it helps the campus community..."
          campusLinks={sampleCampusLinks}
          onCampusLinkSearch={handleCampusLinkSearch}
          onImageUpload={handleImageUpload}
          showWordCount
          syntaxHighlight
          autosave
          maxLength={5000}
          onSave={(content) => console.log('Saved:', content)}
        />
      </div>
    );
  },
};

// Size Variations
export const SizeVariations: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({
      sm: '# Small Editor\n\nCompact interface for quick notes.',
      default: '# Default Editor\n\nStandard size for most use cases.',
      lg: '# Large Editor\n\nExpanded interface for detailed documentation.',
      xl: '# Extra Large Editor\n\nMaximum space for comprehensive content creation.'
    });
    
    return (
      <div className="w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-8">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Size Variations</h3>
        
        {(['sm', 'default', 'lg', 'xl'] as const).map(size => (
          <div key={size} className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 capitalize">
              {size} Size
            </label>
            <HiveRichTextEditor
              size={size}
              value={values[size] || ''}
              onChange={(value) => setValues(prev => ({ ...prev, [size]: value }))}
              placeholder={`${size} editor placeholder...`}
              showWordCount
              syntaxHighlight
            />
          </div>
        ))}
      </div>
    );
  },
};

// Variant Showcase
export const VariantShowcase: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({
      default: '# Default Style\n\nStandard HIVE editor styling.',
      premium: '# Premium Style\n\nEnhanced with gold accents and premium features.',
      elevated: '# Elevated Style\n\nRaised appearance with enhanced borders.',
      minimal: '# Minimal Style\n\nClean, minimal interface for focused writing.'
    });
    
    return (
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-8">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Variant Showcase</h3>
        
        {(['default', 'premium', 'elevated', 'minimal'] as const).map(variant => (
          <div key={variant} className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 capitalize">
              {variant} Variant
            </label>
            <HiveRichTextEditor
              variant={variant}
              value={values[variant] || ''}
              onChange={(value) => setValues(prev => ({ ...prev, [variant]: value }))}
              placeholder={`${variant} editor...`}
              showWordCount
              syntaxHighlight
            />
          </div>
        ))}
      </div>
    );
  },
};

// States and Edge Cases
export const StatesAndEdgeCases: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState('# Normal State\n\nFully functional editor.');
    const [readOnlyValue] = useState('# Read-Only Content\n\nThis content cannot be edited.');
    const [errorValue, setErrorValue] = useState('');
    
    return (
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg space-y-8">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">States & Edge Cases</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Normal State</label>
          <HiveRichTextEditor
            value={normalValue}
            onChange={setNormalValue}
            placeholder="Normal editor state..."
            showWordCount
            syntaxHighlight
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Read-Only State</label>
          <HiveRichTextEditor
            value={readOnlyValue}
            readOnly
            placeholder="Read-only content..."
            showWordCount
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Error State</label>
          <HiveRichTextEditor
            value={errorValue}
            onChange={setErrorValue}
            placeholder="Required field..."
            error="Content is required"
            showWordCount
          />
          <div className="text-red-400 text-xs">Please provide some content</div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Disabled State</label>
          <HiveRichTextEditor
            value="# Disabled Content\n\nThis editor is disabled."
            disabled
            placeholder="Disabled editor..."
            showWordCount
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Character Limit</label>
          <HiveRichTextEditor
            value="Short content with character limit."
            onChange={(value) => console.log('Content:', value)}
            maxLength={100}
            placeholder="Maximum 100 characters..."
            showWordCount
          />
          <div className="text-yellow-400 text-xs">Character limit: 100</div>
        </div>
      </div>
    );
  },
};

// Comprehensive Feature Demo
export const ComprehensiveDemo: Story = {
  render: () => {
    const [value, setValue] = useState(sampleMarkdown);
    
    const handleImageUpload = async (file: File) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return `/uploads/${file.name}`;
    };
    
    const handleCampusLinkSearch = async (query: string, type: CampusLink['type']) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return sampleCampusLinks.filter(link => 
        link.type === type && link.name.toLowerCase().includes(query.toLowerCase())
      );
    };
    
    return (
      <div className="w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">HIVE Rich Text Editor</h2>
          <p className="text-gray-400">Full-featured editor with campus integration</p>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[var(--hive-background-primary)]/20 rounded-lg border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-primary)] mb-1">
                {value.split(/\s+/).filter(w => w.length > 0).length}
              </div>
              <div className="text-xs text-gray-400">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-primary)] mb-1">
                {value.length}
              </div>
              <div className="text-xs text-gray-400">Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-primary)] mb-1">
                {sampleCollaborators.length}
              </div>
              <div className="text-xs text-gray-400">Collaborators</div>
            </div>
          </div>
          
          <HiveRichTextEditor
            variant="premium"
            size="lg"
            mode="split"
            value={value}
            onChange={setValue}
            placeholder="Create something amazing for your campus..."
            campusLinks={sampleCampusLinks}
            collaborators={sampleCollaborators}
            onCampusLinkSearch={handleCampusLinkSearch}
            onImageUpload={handleImageUpload}
            showWordCount
            showCollaborators
            syntaxHighlight
            spellCheck
            autosave
            autosaveInterval={3000}
            maxLength={10000}
            onSave={(content) => console.log('Auto-saved:', content)}
          />
        </div>
      </div>
    );
  },
};