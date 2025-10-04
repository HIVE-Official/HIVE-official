import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveLabBuilderLayout } from '../../atomic/templates/hivelab';
import { SpaceToolsPanel, type Tool } from '../../atomic/organisms/space-tools-panel';
import type { Tool as HiveLabTool } from '@/types/hivelab.types';
import { Badge } from '../../atomic/atoms/badge';
import { Button } from '../../atomic/atoms/button';
import { X, ArrowLeft } from 'lucide-react';

/**
 * # HiveLab x Spaces Integration
 *
 * **ON-BRAND**: HiveLab isn't a generic builder - it's how space leaders create
 * custom tools FOR THEIR SPACE. This integration shows the builder in context.
 *
 * ## HIVE Flow
 * 1. **Space Tools Panel**: Leader clicks "Create Tool"
 * 2. **Builder Opens**: Full-screen HiveLab with space context
 * 3. **Space Branding**: Banner shows which space you're building for
 * 4. **Save to Space**: Tool automatically saves to this space
 * 5. **Back to Space**: Returns to space with new tool visible
 *
 * ## Why This Matters
 * - **Contextual**: Building for "CS Study Group" not generic "your tool"
 * - **Brand Consistency**: Uses space colors, shows space name
 * - **Natural Flow**: Feels like part of space management, not separate app
 * - **Clear Ownership**: Tools belong to spaces, created by leaders
 *
 * ## Design Pattern
 * ```
 * Space View → [Create Tool] → Builder (with space context) → [Save] → Space View (tool added)
 * ```
 */
const meta = {
  title: '03-Spaces/HiveLab Integration',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample space data
const sampleSpace = {
  id: 'space-cs-study',
  name: 'CS Study Group',
  emoji: '💻',
  color: '#3b82f6',
  memberCount: 87,
  leaderName: 'Sarah Chen',
};

const existingCustomTools: Tool[] = [
  {
    id: 'study-room-booker',
    name: 'Study Room Booking',
    icon: '📚',
    color: '#3b82f6',
    description: 'Reserve study rooms for group sessions',
    isCustom: true,
    createdBy: 'Sarah Chen',
    usageCount: 45,
    permissions: 'all',
  },
  {
    id: 'code-review-queue',
    name: 'Code Review Queue',
    icon: '👨‍💻',
    color: '#10b981',
    description: 'Submit code for peer review',
    isCustom: true,
    createdBy: 'Alex Morgan',
    usageCount: 89,
    permissions: 'all',
  },
];

// Sample HiveLab tool being created
const newPollTool: HiveLabTool = {
  id: 'tool-new-poll',
  name: 'Quick Poll',
  description: 'Create instant polls for the group',
  icon: '📊',
  version: '1.0.0',
  createdBy: 'sarah-chen-123',
  spaceId: sampleSpace.id,
  pages: [
    {
      id: 'page-main',
      name: 'Main Flow',
      x: 100,
      y: 100,
      width: 1200,
      height: 800,
      type: 'default',
      elements: [],
      connections: [],
    },
  ],
  startPage: 'page-main',
  status: 'draft',
  visibility: 'space',
  deployedTo: [],
  uses: 0,
  forks: 0,
  rating: 0,
  permissions: {
    canFork: true,
    canEdit: ['sarah-chen-123'],
    requiresApproval: false,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Complete flow: Space → Create Tool → Builder → Back to Space
 */
export const CompleteFlow: Story = {
  render: () => {
    const [view, setView] = useState<'space' | 'builder'>('space');
    const [tools, setTools] = useState(existingCustomTools);

    const handleCreateTool = () => {
      setView('builder');
    };

    const handleSaveTool = (tool: HiveLabTool) => {
      // Add tool to space
      const newTool: Tool = {
        id: tool.id,
        name: tool.name,
        icon: tool.icon,
        color: sampleSpace.color,
        description: tool.description,
        isCustom: true,
        createdBy: sampleSpace.leaderName,
        usageCount: 0,
        permissions: 'all',
      };

      setTools([...tools, newTool]);
      setView('space');

      alert(`✅ "${tool.name}" saved to ${sampleSpace.name}!`);
    };

    const handleBackToSpace = () => {
      if (confirm('Exit builder? Unsaved changes will be lost.')) {
        setView('space');
      }
    };

    return (
      <>
        {view === 'space' ? (
          /* Space View with Tools Panel */
          <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto">
              {/* Space Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{sampleSpace.emoji}</span>
                  <h1 className="text-3xl font-bold">{sampleSpace.name}</h1>
                </div>
                <p className="text-muted-foreground">
                  {sampleSpace.memberCount} members • Led by {sampleSpace.leaderName}
                </p>
              </div>

              {/* Tools Panel */}
              <div className="bg-card border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Space Tools</h2>
                <SpaceToolsPanel
                  customTools={tools}
                  isLeader={true}
                  onToolClick={(tool) => alert(`Open tool: ${tool.name}`)}
                  onManageTools={() => alert('Manage all tools')}
                  onCreateTool={handleCreateTool}
                />
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Try it:</strong> Click "Create Tool" to open HiveLab Builder with{' '}
                  <strong>{sampleSpace.name}</strong> context
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* HiveLab Builder with Space Context */
          <div className="h-screen flex flex-col">
            {/* Space Context Banner */}
            <div
              className="px-6 py-3 border-b flex items-center justify-between"
              style={{ backgroundColor: `${sampleSpace.color}15` }}
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToSpace}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Space
                </Button>
                <div className="h-6 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <span className="text-xl">{sampleSpace.emoji}</span>
                  <span className="text-sm font-medium">Building tool for:</span>
                  <span className="text-sm font-semibold">{sampleSpace.name}</span>
                </div>
              </div>
              <Badge style={{ backgroundColor: sampleSpace.color, color: 'white' }}>
                Space Tool
              </Badge>
            </div>

            {/* HiveLab Builder */}
            <div className="flex-1">
              <HiveLabBuilderLayout
                initialTool={newPollTool}
                onSave={handleSaveTool}
                onRun={(tool) => alert(`Preview "${tool.name}" in ${sampleSpace.name}`)}
              />
            </div>
          </div>
        )}
      </>
    );
  },
};

/**
 * Builder with space branding
 */
export const BuilderWithSpaceBranding: Story = {
  render: () => (
    <div className="h-screen flex flex-col">
      {/* Space Context Banner */}
      <div
        className="px-6 py-4 border-b flex items-center justify-between"
        style={{ backgroundColor: `${sampleSpace.color}15` }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{sampleSpace.emoji}</span>
            <div>
              <div className="text-xs text-muted-foreground">Building for</div>
              <div className="text-sm font-semibold">{sampleSpace.name}</div>
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-sm text-muted-foreground">
            Leader: {sampleSpace.leaderName}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline">Draft</Badge>
          <Badge style={{ backgroundColor: sampleSpace.color, color: 'white' }}>
            {sampleSpace.memberCount} members will see this
          </Badge>
        </div>
      </div>

      {/* Builder */}
      <div className="flex-1">
        <HiveLabBuilderLayout
          initialTool={newPollTool}
          onSave={(tool) => alert(`Save to ${sampleSpace.name}`)}
          onRun={(tool) => alert(`Preview in ${sampleSpace.name}`)}
        />
      </div>
    </div>
  ),
};

/**
 * Different space types with their branding
 */
export const DifferentSpaceTypes: Story = {
  render: () => {
    const spaces = [
      {
        id: 'greek-life',
        name: 'Delta Tau Delta',
        emoji: '🏛️',
        color: '#ef4444',
        type: 'Greek Life',
      },
      {
        id: 'residential',
        name: 'Greiner Hall 3rd Floor',
        emoji: '🏠',
        color: '#10b981',
        type: 'Residential',
      },
      {
        id: 'academic',
        name: 'CS Study Group',
        emoji: '💻',
        color: '#3b82f6',
        type: 'Academic',
      },
      {
        id: 'club',
        name: 'Photography Club',
        emoji: '📸',
        color: '#8b5cf6',
        type: 'Club',
      },
    ];

    const [selectedSpace, setSelectedSpace] = useState(spaces[0]);

    return (
      <div className="h-screen flex flex-col">
        {/* Space Selector */}
        <div className="px-6 py-3 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium mr-2">Building for:</span>
            {spaces.map((space) => (
              <button
                key={space.id}
                onClick={() => setSelectedSpace(space)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                  selectedSpace.id === space.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-accent'
                )}
              >
                {space.emoji} {space.name}
              </button>
            ))}
          </div>
        </div>

        {/* Space Banner */}
        <div
          className="px-6 py-3 border-b flex items-center justify-between"
          style={{ backgroundColor: `${selectedSpace.color}15` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedSpace.emoji}</span>
            <div>
              <div className="text-sm font-semibold">{selectedSpace.name}</div>
              <div className="text-xs text-muted-foreground">{selectedSpace.type} Space</div>
            </div>
          </div>
          <Badge style={{ backgroundColor: selectedSpace.color, color: 'white' }}>
            Space Tool
          </Badge>
        </div>

        {/* Builder */}
        <div className="flex-1">
          <HiveLabBuilderLayout
            initialTool={{
              ...newPollTool,
              spaceId: selectedSpace.id,
            }}
            onSave={(tool) => alert(`Save to ${selectedSpace.name}`)}
          />
        </div>
      </div>
    );
  },
};

/**
 * Modal overlay (alternative UX pattern)
 */
export const ModalOverlay: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        {/* Space View */}
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">
                {sampleSpace.emoji} {sampleSpace.name}
              </h1>
              <p className="text-muted-foreground">87 members</p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <SpaceToolsPanel
                customTools={existingCustomTools}
                isLeader={true}
                onToolClick={(tool) => alert(`Open: ${tool.name}`)}
                onCreateTool={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Builder Modal Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-[95vw] h-[95vh] bg-background rounded-lg border shadow-2xl flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b flex items-center justify-between bg-card">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{sampleSpace.emoji}</span>
                  <div>
                    <div className="text-sm font-semibold">Create Tool</div>
                    <div className="text-xs text-muted-foreground">for {sampleSpace.name}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Builder */}
              <div className="flex-1 overflow-hidden">
                <HiveLabBuilderLayout
                  initialTool={newPollTool}
                  onSave={(tool) => {
                    alert(`Saved to ${sampleSpace.name}`);
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
};

/**
 * Documentation: Integration patterns
 */
export const IntegrationPatterns: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">HiveLab x Spaces Integration</h1>
          <p className="text-muted-foreground">
            How HiveLab stays on-brand by being contextual to spaces
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Generic vs Contextual */}
          <div className="border rounded-lg p-6 bg-destructive/5 border-destructive/30">
            <div className="flex items-center gap-2 mb-3">
              <X className="h-5 w-5 text-destructive" />
              <h2 className="text-lg font-semibold">Generic (Wrong)</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>❌ "Build a Tool" (for what?)</li>
              <li>❌ Standalone builder app</li>
              <li>❌ No space context visible</li>
              <li>❌ Unclear where tool goes</li>
              <li>❌ Feels like separate product</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-primary/5 border-primary/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✓</span>
              <h2 className="text-lg font-semibold">Contextual (Right)</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ "Create Tool for CS Study Group"</li>
              <li>✅ Launched from space tools panel</li>
              <li>✅ Space banner always visible</li>
              <li>✅ Auto-saves to this space</li>
              <li>✅ Feels like space feature</li>
            </ul>
          </div>
        </div>

        {/* UX Patterns */}
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Implementation Patterns</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="border rounded p-3">
                <p className="font-semibold mb-2">1. Full Screen</p>
                <p className="text-xs text-muted-foreground">
                  Builder takes over screen with space context banner at top
                </p>
              </div>
              <div className="border rounded p-3">
                <p className="font-semibold mb-2">2. Modal Overlay</p>
                <p className="text-xs text-muted-foreground">
                  Builder opens as large modal over space view
                </p>
              </div>
              <div className="border rounded p-3">
                <p className="font-semibold mb-2">3. Sidebar Slide</p>
                <p className="text-xs text-muted-foreground">
                  Builder slides in from right while space stays visible
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold mb-4">Design Principles</h2>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                1
              </div>
              <div>
                <p className="font-semibold">Always Show Space Context</p>
                <p className="text-xs text-muted-foreground">
                  Space emoji, name, and branding visible throughout builder
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                2
              </div>
              <div>
                <p className="font-semibold">Use Space Colors</p>
                <p className="text-xs text-muted-foreground">
                  Banner background uses space's primary color at 15% opacity
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                3
              </div>
              <div>
                <p className="font-semibold">Clear Exit Path</p>
                <p className="text-xs text-muted-foreground">
                  "Back to [Space Name]" button always visible in top-left
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                4
              </div>
              <div>
                <p className="font-semibold">Tool Ownership Clarity</p>
                <p className="text-xs text-muted-foreground">
                  Badge shows "Space Tool" and member count who will see it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
