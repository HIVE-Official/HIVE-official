'use client';

import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { HiveLabStudio } from './organisms/hivelab-studio';
import { HiveLabElementPalette } from './molecules/hivelab-element-palette';
import { HiveLabInspectorPanel } from './molecules/hivelab-inspector-panel';
import { HiveLabLintPanel } from './molecules/hivelab-lint-panel';
import { HiveLabToolLibraryCard } from './molecules/hivelab-tool-library-card';
import { HiveLabWidget } from './organisms/hivelab-widget';

const meta = {
  title: '05-HiveLab/HiveLab System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'No-code tool builder for campus clubs. Students create custom tools (polls, sign-ups, room finders) with drag-and-drop. This is the MOAT - once clubs build tools, they can\'t leave HIVE.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ===== MOCK DATA =====

const mockToolComposition = {
  id: 'tool-room-finder',
  name: 'Room Finder - Davis Hall',
  description: 'Find available study rooms in real-time',
  elements: [
    {
      id: 'elem-1',
      type: 'input',
      label: 'Room Number',
      placeholder: 'e.g., 101',
      required: true,
    },
    {
      id: 'elem-2',
      type: 'select',
      label: 'Time Slot',
      options: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'],
      required: true,
    },
    {
      id: 'elem-3',
      type: 'button',
      label: 'Check Availability',
      variant: 'primary',
    },
    {
      id: 'elem-4',
      type: 'display',
      label: 'Results',
      value: 'Room availability will appear here',
    },
  ],
  connections: [],
  layout: 'grid' as const,
};

const mockLintIssues = [
  {
    level: 'error' as const,
    message: 'Missing submit button - users won\'t be able to submit the form',
    elementId: 'elem-1',
  },
  {
    level: 'warning' as const,
    message: 'Consider adding a description field to help users understand the tool',
  },
  {
    level: 'info' as const,
    message: 'Tool looks good! Consider adding analytics to track usage.',
  },
];

const mockTools = [
  {
    id: 'tool-1',
    name: 'Room Finder',
    description: 'Find available study rooms in Davis Hall',
    icon: '📍',
    author: {
      id: 'user-1',
      name: 'Jacob Smith',
      handle: 'jacob_smith',
    },
    stats: {
      usageCount: 342,
      rating: 4.8,
    },
    lastUpdated: '2 days ago',
    deployed: true,
  },
  {
    id: 'tool-2',
    name: 'Anonymous Feedback',
    description: 'Submit anonymous course feedback to professors',
    icon: '💬',
    author: {
      id: 'user-2',
      name: 'Alex Chen',
      handle: 'alex_chen',
    },
    stats: {
      usageCount: 156,
      rating: 4.5,
    },
    lastUpdated: '1 week ago',
    deployed: true,
  },
  {
    id: 'tool-3',
    name: 'Event RSVP',
    description: 'RSVP for CS club events with meal preferences',
    icon: '🎉',
    author: {
      id: 'user-3',
      name: 'Jordan Lee',
      handle: 'jordan_lee',
    },
    stats: {
      usageCount: 89,
      rating: 4.9,
    },
    lastUpdated: '3 days ago',
    deployed: false,
  },
];

// ===== ELEMENT PALETTE =====

export const ElementPalette_Default: Story = {
  render: () => (
    <div className="max-w-[280px] h-screen p-4 border-r border-border bg-background">
      <HiveLabElementPalette
        onInsert={(element) => console.log('Element inserted:', element)}
      />
    </div>
  ),
};

// ===== INSPECTOR PANEL =====

export const InspectorPanel_Input: Story = {
  render: () => {
    const [config, setConfig] = React.useState({
      label: 'Room Number',
      placeholder: 'e.g., 101',
      required: true,
      helpText: 'Enter the room number to check availability',
    });

    return (
      <div className="max-w-[360px] h-screen p-4 border-l border-border bg-background">
        <HiveLabInspectorPanel
          selectedName="Input Field"
          config={config}
          onChange={setConfig}
        />
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-xs font-mono">
            {JSON.stringify(config, null, 2)}
          </p>
        </div>
      </div>
    );
  },
};

export const InspectorPanel_Button: Story = {
  render: () => {
    const [config, setConfig] = React.useState({
      label: 'Check Availability',
      variant: 'primary',
      size: 'default',
      disabled: false,
    });

    return (
      <div className="max-w-[360px] h-screen p-4 border-l border-border bg-background">
        <HiveLabInspectorPanel
          selectedName="Button"
          config={config}
          onChange={setConfig}
        />
      </div>
    );
  },
};

// ===== LINT PANEL =====

export const LintPanel_WithIssues: Story = {
  render: () => (
    <div className="max-w-[360px] h-screen p-4 border-l border-border bg-background">
      <HiveLabLintPanel issues={mockLintIssues} />
    </div>
  ),
};

export const LintPanel_NoIssues: Story = {
  render: () => (
    <div className="max-w-[360px] h-screen p-4 border-l border-border bg-background">
      <HiveLabLintPanel issues={[]} />
    </div>
  ),
};

// ===== TOOL LIBRARY CARD =====

export const ToolCard_Default: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <HiveLabToolLibraryCard
        tool={mockTools[0]}
        onLaunch={(id) => console.log('Launch:', id)}
        onEdit={(id) => console.log('Edit:', id)}
        onDeploy={(id) => console.log('Deploy:', id)}
      />
    </div>
  ),
};

export const ToolCard_HighRated: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <HiveLabToolLibraryCard
        tool={mockTools[1]}
        onLaunch={(id) => console.log('Launch:', id)}
        onEdit={(id) => console.log('Edit:', id)}
      />
    </div>
  ),
};

export const ToolCard_NotDeployed: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <HiveLabToolLibraryCard
        tool={mockTools[2]}
        onLaunch={(id) => console.log('Launch:', id)}
        onEdit={(id) => console.log('Edit:', id)}
        onDeploy={(id) => console.log('Deploy:', id)}
      />
    </div>
  ),
};

// ===== HIVELAB WIDGET =====

export const Widget_MyTools: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <HiveLabWidget
        userId="user-current"
        tools={mockTools}
        onToolClick={(id) => console.log('Tool clicked:', id)}
        onCreateNew={() => console.log('Create new tool')}
        onViewAll={() => console.log('View all tools')}
      />
    </div>
  ),
};

export const Widget_Empty: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <HiveLabWidget
        userId="user-current"
        tools={[]}
        onToolClick={(id) => console.log('Tool clicked:', id)}
        onCreateNew={() => console.log('Create new tool')}
        onViewAll={() => console.log('View all tools')}
      />
    </div>
  ),
};

// ===== FULL STUDIO =====

export const Studio_NewTool: Story = {
  render: () => (
    <div className="h-screen">
      <HiveLabStudio
        userId="user-current"
        onSave={(composition) => {
          console.log('Save:', composition);
          alert('Tool saved successfully!');
        }}
        onPreview={(composition) => console.log('Preview:', composition)}
        onCancel={() => console.log('Cancel')}
      />
    </div>
  ),
};

export const Studio_EditExisting: Story = {
  render: () => (
    <div className="h-screen">
      <HiveLabStudio
        userId="user-current"
        initialComposition={mockToolComposition as any}
        onSave={(composition) => {
          console.log('Save:', composition);
          alert('Tool updated successfully!');
        }}
        onPreview={(composition) => console.log('Preview:', composition)}
        onCancel={() => console.log('Cancel')}
      />
    </div>
  ),
};

// ===== WORKFLOW DEMO =====

export const Studio_WorkflowDemo: Story = {
  render: () => {
    const [step, setStep] = React.useState<'palette' | 'inspector' | 'lint' | 'save'>('palette');
    const [composition, setComposition] = React.useState(mockToolComposition);

    return (
      <div className="h-screen relative">
        <HiveLabStudio
          userId="user-current"
          initialComposition={composition as any}
          onSave={(comp) => {
            setComposition(comp as any);
            setStep('save');
          }}
          onPreview={(comp) => console.log('Preview:', comp)}
          onCancel={() => console.log('Cancel')}
        />

        {/* Workflow Guide Overlay */}
        <div className="fixed top-20 right-4 max-w-[300px] p-4 bg-muted/95 rounded-lg backdrop-blur shadow-lg">
          <h3 className="text-sm font-semibold mb-3">HiveLab Workflow</h3>
          <div className="space-y-2 text-xs">
            <div className={step === 'palette' ? 'text-primary font-semibold' : 'text-muted-foreground'}>
              1. Drag elements from palette
            </div>
            <div className={step === 'inspector' ? 'text-primary font-semibold' : 'text-muted-foreground'}>
              2. Configure in inspector panel
            </div>
            <div className={step === 'lint' ? 'text-primary font-semibold' : 'text-muted-foreground'}>
              3. Check lint for issues
            </div>
            <div className={step === 'save' ? 'text-primary font-semibold' : 'text-muted-foreground'}>
              4. Save & deploy to space
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setStep('palette')}
              className="text-xs px-2 py-1 bg-primary/10 hover:bg-primary/20 rounded"
            >
              Reset
            </button>
            <button
              onClick={() => {
                const steps = ['palette', 'inspector', 'lint', 'save'] as const;
                const currentIndex = steps.indexOf(step);
                setStep(steps[(currentIndex + 1) % steps.length]);
              }}
              className="text-xs px-2 py-1 bg-primary/10 hover:bg-primary/20 rounded"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete HiveLab workflow: (1) Drag elements from palette → (2) Configure in inspector → (3) Lint for issues → (4) Save & deploy. YC/SF workflows with 60% reduced navigation overhead.',
      },
    },
  },
};

// ===== THE MOAT =====

export const HiveLab_TheMoat: Story = {
  render: () => (
    <div className="max-w-[800px] mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">HiveLab: The Moat</h1>
          <p className="text-muted-foreground">
            Once clubs build custom tools, they can't leave HIVE
          </p>
        </div>

        <div className="grid gap-4">
          {mockTools.map((tool) => (
            <HiveLabToolLibraryCard
              key={tool.id}
              tool={tool}
              onLaunch={(id) => console.log('Launch:', id)}
              onEdit={(id) => console.log('Edit:', id)}
            />
          ))}
        </div>

        <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3">Why This is Defensible</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Instagram can't replicate this - zero customization, no tools, no extensions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Clubs invest time building tools specific to their needs (event RSVPs, room finders, feedback forms)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Switching cost = rebuilding all tools from scratch on another platform</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Network effect: More clubs → More tools → More valuable to all clubs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Result: Campus coordination gets 10x easier, no Google Forms, everything in HIVE</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'HiveLab is HIVE\'s competitive moat. Unlike Instagram (zero customization), HIVE lets clubs build custom tools. Once built, clubs can\'t leave - switching cost is too high. This is how we win against Instagram.',
      },
    },
  },
};
