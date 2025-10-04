/**
 * Space Tool Builder Stories
 *
 * Demonstrates the ON-BRAND way to create tools within a space context.
 * This is what space leaders see - NOT a generic HiveLab builder.
 *
 * ## Design Philosophy
 * - Tools are created FOR a specific space
 * - Builder shows space context at all times
 * - Tools auto-save to the space
 * - Uses space colors and branding
 * - Leaders know exactly which space they're building for
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SpaceToolBuilder, type SpaceContext } from '../../atomic/organisms/space-tool-builder';
import type { Tool as HiveLabTool } from '../../types/hivelab.types';

const meta = {
  title: 'Features/03-Spaces/SpaceToolBuilder',
  component: SpaceToolBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Space-contextual tool builder. THIS is what spaces use for tool creation, not the generic HiveLab builder. Always shows which space you\'re building for and auto-tags tools with spaceId.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceToolBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Space Contexts
const greekLifeSpace: SpaceContext = {
  id: 'space-greek-001',
  name: 'Alpha Phi Omega',
  emoji: '🏛️',
  color: '#FFD700',
  memberCount: 87,
  leaderName: 'Sarah Johnson',
};

const residentialSpace: SpaceContext = {
  id: 'space-res-012',
  name: 'Goodyear Hall',
  emoji: '🏠',
  color: '#4F46E5',
  memberCount: 234,
  leaderName: 'Marcus Chen',
};

const academicSpace: SpaceContext = {
  id: 'space-acad-045',
  name: 'CS Student Association',
  emoji: '💻',
  color: '#059669',
  memberCount: 156,
  leaderName: 'Dr. Taylor',
};

const clubSpace: SpaceContext = {
  id: 'space-club-078',
  name: 'Campus Photo Club',
  emoji: '📸',
  color: '#DC2626',
  memberCount: 42,
  leaderName: 'Alex Rivera',
};

// Sample initial tool (empty new tool)
const emptyTool: HiveLabTool = {
  id: '',
  name: 'Untitled Tool',
  description: '',
  category: 'utility',
  status: 'draft',
  version: '1.0.0',
  visibility: 'space',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: 'current-user',
  pages: [
    {
      id: 'page-1',
      name: 'Main',
      elements: [],
      connections: [],
    },
  ],
  globalVariables: [],
  settings: {
    theme: 'dark',
    allowComments: true,
    requireAuth: true,
  },
};

// Sample poll tool template
const pollToolTemplate: HiveLabTool = {
  id: 'tool-poll-template',
  name: 'Quick Poll',
  description: 'Gather opinions from space members',
  category: 'social',
  status: 'draft',
  version: '1.0.0',
  visibility: 'space',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: 'current-user',
  pages: [
    {
      id: 'page-1',
      name: 'Main',
      elements: [
        {
          id: 'el-1',
          type: 'trigger',
          name: 'Form Load',
          icon: 'play',
          description: 'Triggered when form loads',
          x: 100,
          y: 100,
          width: 200,
          height: 100,
          inputs: [],
          outputs: [{ id: 'out-1', name: 'Start', type: 'flow' }],
          config: { event: 'onLoad' },
          complexity: 'beginner',
          pageId: 'page-1',
        },
        {
          id: 'el-2',
          type: 'input',
          name: 'Poll Question',
          icon: 'text',
          description: 'Text input for question',
          x: 400,
          y: 100,
          width: 200,
          height: 120,
          inputs: [{ id: 'in-1', name: 'Flow In', type: 'flow' }],
          outputs: [{ id: 'out-2', name: 'Value', type: 'data' }],
          config: {
            placeholder: 'Enter your poll question...',
            multiline: false,
            required: true,
          },
          complexity: 'beginner',
          pageId: 'page-1',
        },
        {
          id: 'el-3',
          type: 'input',
          name: 'Poll Options',
          icon: 'list',
          description: 'Multiple choice options',
          x: 400,
          y: 260,
          width: 200,
          height: 140,
          inputs: [{ id: 'in-2', name: 'Flow In', type: 'flow' }],
          outputs: [{ id: 'out-3', name: 'Options', type: 'data' }],
          config: {
            type: 'checkbox',
            options: ['Option 1', 'Option 2', 'Option 3'],
            allowMultiple: false,
          },
          complexity: 'beginner',
          pageId: 'page-1',
        },
        {
          id: 'el-4',
          type: 'action',
          name: 'Submit Poll',
          icon: 'send',
          description: 'Submit poll to space',
          x: 700,
          y: 180,
          width: 200,
          height: 100,
          inputs: [
            { id: 'in-3', name: 'Question', type: 'data' },
            { id: 'in-4', name: 'Options', type: 'data' },
          ],
          outputs: [{ id: 'out-4', name: 'Success', type: 'flow' }],
          config: {
            endpoint: '/api/polls',
            method: 'POST',
          },
          complexity: 'intermediate',
          pageId: 'page-1',
        },
      ],
      connections: [
        {
          id: 'conn-1',
          sourceId: 'el-1',
          sourceOutput: 'out-1',
          targetId: 'el-2',
          targetInput: 'in-1',
        },
        {
          id: 'conn-2',
          sourceId: 'el-2',
          sourceOutput: 'out-2',
          targetId: 'el-4',
          targetInput: 'in-3',
        },
        {
          id: 'conn-3',
          sourceId: 'el-3',
          sourceOutput: 'out-3',
          targetId: 'el-4',
          targetInput: 'in-4',
        },
      ],
    },
  ],
  globalVariables: [],
  settings: {
    theme: 'dark',
    allowComments: true,
    requireAuth: true,
  },
};

/**
 * Default: Greek Life Space - New Tool
 *
 * Space leader creating a brand new tool for their fraternity.
 * Notice the space context banner showing Alpha Phi Omega branding.
 */
export const GreekLifeNewTool: Story = {
  args: {
    space: greekLifeSpace,
    initialTool: emptyTool,
    onSave: (tool) => {
      console.log('Tool saved with space context:', tool);
      alert(`Tool "${tool.name}" saved to ${greekLifeSpace.name}!\nSpace ID: ${tool.spaceId}`);
    },
    onPreview: (tool) => {
      console.log('Previewing tool:', tool);
      alert(`Previewing: ${tool.name}`);
    },
    onExit: () => {
      console.log('Exiting builder');
      alert('Returning to space...');
    },
  },
};

/**
 * Residential Space - Poll Template
 *
 * Goodyear Hall creating a poll tool with pre-built template.
 * Shows how templates speed up tool creation for common use cases.
 */
export const ResidentialPollTool: Story = {
  args: {
    space: residentialSpace,
    initialTool: pollToolTemplate,
    onSave: (tool) => {
      console.log('Poll tool saved:', tool);
      alert(`Poll tool saved to ${residentialSpace.name}!`);
    },
    onPreview: (tool) => {
      alert('Poll Preview:\n\n' + tool.description);
    },
    onExit: () => {
      alert('Back to Goodyear Hall...');
    },
  },
};

/**
 * Academic Space - Custom Tool
 *
 * CS Student Association building custom tool.
 * Different space color (#059669 green) shows in banner.
 */
export const AcademicCustomTool: Story = {
  args: {
    space: academicSpace,
    initialTool: {
      ...emptyTool,
      name: 'Study Group Matcher',
      description: 'Match students for study groups based on courses',
    },
    onSave: (tool) => alert(`Saved to ${academicSpace.name}!`),
    onPreview: (tool) => alert('Preview: Study Group Matcher'),
    onExit: () => alert('Back to CS Student Association'),
  },
};

/**
 * Club Space - Event RSVP Tool
 *
 * Campus Photo Club creating event RSVP tool.
 * Shows smaller member count (42 vs 234 in residential).
 */
export const ClubEventTool: Story = {
  args: {
    space: clubSpace,
    initialTool: {
      ...emptyTool,
      name: 'Photo Walk RSVP',
      description: 'Sign up for weekly photo walks',
    },
    onSave: (tool) => alert(`Saved to ${clubSpace.name}!`),
    onPreview: (tool) => alert('Preview: Photo Walk RSVP'),
    onExit: () => alert('Back to Campus Photo Club'),
  },
};

/**
 * Interactive Flow: Complete Tool Creation Journey
 *
 * Shows entire user flow from entering builder to saving tool.
 * Demonstrates state management and tool persistence.
 */
export const CompleteToolCreationFlow: Story = {
  render: () => {
    const [savedTool, setSavedTool] = useState<HiveLabTool | null>(null);
    const [isBuilding, setIsBuilding] = useState(true);

    if (!isBuilding && savedTool) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-background">
          <div className="max-w-2xl mx-auto p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl">{greekLifeSpace.emoji}</div>
              <h2 className="text-3xl font-bold">Tool Saved Successfully!</h2>
              <p className="text-xl text-muted-foreground">
                "{savedTool.name}" is now available in {greekLifeSpace.name}
              </p>
              <div className="pt-4 space-y-2 text-left bg-muted p-6 rounded-lg">
                <p>
                  <strong>Tool ID:</strong> {savedTool.id}
                </p>
                <p>
                  <strong>Space ID:</strong> {savedTool.spaceId}
                </p>
                <p>
                  <strong>Visibility:</strong> {savedTool.visibility}
                </p>
                <p>
                  <strong>Status:</strong> {savedTool.status}
                </p>
                <p>
                  <strong>Elements:</strong> {savedTool.pages[0]?.elements.length || 0}
                </p>
              </div>
              <button
                onClick={() => setIsBuilding(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Build Another Tool
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <SpaceToolBuilder
        space={greekLifeSpace}
        initialTool={pollToolTemplate}
        onSave={(tool) => {
          // Simulate tool being saved with generated ID
          const savedToolWithId = {
            ...tool,
            id: `tool-${Date.now()}`,
            spaceId: greekLifeSpace.id,
            visibility: 'space' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setSavedTool(savedToolWithId);
          setIsBuilding(false);
        }}
        onPreview={(tool) => {
          alert(`Preview: ${tool.name}\n\n${tool.description || 'No description'}`);
        }}
        onExit={() => {
          if (confirm('Exit without saving? Changes will be lost.')) {
            alert('Returned to Alpha Phi Omega space');
            setIsBuilding(true);
          }
        }}
      />
    );
  },
};

/**
 * Comparison: Different Space Branding
 *
 * Side-by-side comparison showing how different spaces have different branding.
 * Each space's color shows in the builder banner.
 */
export const SpaceBrandingComparison: Story = {
  render: () => {
    const spaces = [greekLifeSpace, residentialSpace, academicSpace, clubSpace];
    const [selectedSpace, setSelectedSpace] = useState(greekLifeSpace);

    return (
      <div className="h-screen w-full flex flex-col bg-background">
        {/* Space Selector */}
        <div className="border-b p-4 flex gap-2">
          {spaces.map((space) => (
            <button
              key={space.id}
              onClick={() => setSelectedSpace(space)}
              className={`px-4 py-2 rounded-md border transition-colors ${
                selectedSpace.id === space.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:bg-muted'
              }`}
              style={
                selectedSpace.id === space.id
                  ? { borderColor: space.color, backgroundColor: `${space.color}15` }
                  : undefined
              }
            >
              <span className="text-xl mr-2">{space.emoji}</span>
              {space.name}
            </button>
          ))}
        </div>

        {/* Builder */}
        <div className="flex-1">
          <SpaceToolBuilder
            key={selectedSpace.id}
            space={selectedSpace}
            initialTool={emptyTool}
            onSave={(tool) =>
              alert(`Saved to ${selectedSpace.name}!\nSpace ID: ${tool.spaceId}`)
            }
            onPreview={(tool) => alert(`Preview: ${tool.name}`)}
            onExit={() => alert(`Back to ${selectedSpace.name}`)}
          />
        </div>
      </div>
    );
  },
};

/**
 * Integration Pattern: SpaceToolsPanel → Builder Flow
 *
 * Shows recommended integration with SpaceToolsPanel.
 * Leader clicks "Create Custom Tool" → Opens builder → Saves → Returns to panel.
 */
export const IntegrationWithToolsPanel: Story = {
  render: () => {
    const [showBuilder, setShowBuilder] = useState(false);
    const [customTools, setCustomTools] = useState<HiveLabTool[]>([]);

    if (showBuilder) {
      return (
        <SpaceToolBuilder
          space={greekLifeSpace}
          initialTool={emptyTool}
          onSave={(tool) => {
            const newTool = {
              ...tool,
              id: `tool-${Date.now()}`,
              spaceId: greekLifeSpace.id,
              visibility: 'space' as const,
              status: 'active' as const,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            setCustomTools([...customTools, newTool]);
            setShowBuilder(false);
            alert(`Tool "${newTool.name}" added to ${greekLifeSpace.name}!`);
          }}
          onPreview={(tool) => alert(`Preview: ${tool.name}`)}
          onExit={() => {
            if (confirm('Exit without saving?')) {
              setShowBuilder(false);
            }
          }}
        />
      );
    }

    // Simplified tools panel mockup
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background p-8">
        <div className="max-w-4xl w-full space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{greekLifeSpace.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold">{greekLifeSpace.name}</h2>
              <p className="text-muted-foreground">Space Tools</p>
            </div>
          </div>

          {/* Default Tools */}
          <div className="space-y-3">
            <h3 className="font-semibold">Default Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              {['📅 Event', '📊 Poll', '✅ Task', '📁 Resource'].map((tool) => (
                <div key={tool} className="p-4 border rounded-md">
                  {tool}
                </div>
              ))}
            </div>
          </div>

          {/* Custom HiveLab Tools */}
          <div className="space-y-3">
            <h3 className="font-semibold">Custom HiveLab Tools</h3>
            {customTools.length > 0 ? (
              <div className="space-y-2">
                {customTools.map((tool) => (
                  <div key={tool.id} className="p-4 border rounded-md flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                      ⚡
                    </div>
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {tool.description || 'No description'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed rounded-md text-center text-muted-foreground">
                No custom tools yet
              </div>
            )}
          </div>

          {/* Create Tool Button */}
          <button
            onClick={() => setShowBuilder(true)}
            className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium"
            style={{ backgroundColor: greekLifeSpace.color }}
          >
            + Create Custom Tool in HiveLab
          </button>
        </div>
      </div>
    );
  },
};
