import type { Meta, StoryObj } from '@storybook/react';
import { ToolLibraryModal } from './tool-library-modal';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

const meta: Meta<typeof ToolLibraryModal> = {
  title: 'HIVE/Tools/Organisms/ToolLibraryModal',
  component: ToolLibraryModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal interface for browsing and planting tools in spaces. Features search, filtering, and detailed tool information.',
      },
    },
  },
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
    spaceType: { 
      control: { type: 'select' },
      options: ['university', 'residential', 'greek', 'student']
    },
    isPlanting: { control: { type: 'boolean' } },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToolLibraryModal>;

const sampleTools = [
  {
    id: 'event-management',
    name: 'Event Management',
    description: 'Create, manage, and track events with RSVP functionality, calendar integration, and automatic reminders.',
    icon: '📅',
    category: 'coordination' as const,
    version: '2.1.0',
    author: 'HIVE Team',
    rating: 4.8,
    installations: 1247,
    lastUpdated: '2024-01-15T08:00:00Z',
    features: [
      'Create and schedule events',
      'RSVP tracking and management',
      'Calendar integration',
      'Automatic reminders',
      'Event analytics',
      'Recurring events support'
    ],
    tags: ['events', 'calendar', 'rsvp', 'coordination'],
    isOfficial: true,
  },
  {
    id: 'assignment-tracker',
    name: 'Assignment Tracker',
    description: 'Track assignments, due dates, and submission status for academic courses and study groups.',
    icon: '📝',
    category: 'academic' as const,
    version: '1.5.2',
    author: 'HIVE Team',
    rating: 4.6,
    installations: 892,
    lastUpdated: '2024-01-10T12:00:00Z',
    features: [
      'Assignment creation and tracking',
      'Due date reminders',
      'Progress tracking',
      'Grade management',
      'Group assignments',
      'Export to calendar'
    ],
    tags: ['assignments', 'academic', 'deadlines', 'tracking'],
    isOfficial: true,
  },
  {
    id: 'poll-creator',
    name: 'Poll Creator',
    description: 'Create polls and surveys to gather input from your community on decisions and preferences.',
    icon: '📊',
    category: 'social' as const,
    version: '1.2.0',
    author: 'HIVE Team',
    rating: 4.4,
    installations: 634,
    lastUpdated: '2024-01-08T14:30:00Z',
    features: [
      'Multiple choice polls',
      'Anonymous voting options',
      'Real-time results',
      'Time-limited polls',
      'Result analytics',
      'Export poll data'
    ],
    tags: ['polls', 'surveys', 'voting', 'decisions'],
    isOfficial: true,
  },
  {
    id: 'study-scheduler',
    name: 'Study Scheduler',
    description: 'Coordinate study sessions, book rooms, and organize group study activities.',
    icon: '📚',
    category: 'academic' as const,
    version: '1.0.5',
    author: 'HIVE Team',
    rating: 4.2,
    installations: 423,
    lastUpdated: '2024-01-05T10:15:00Z',
    features: [
      'Schedule study sessions',
      'Room booking integration',
      'Study group formation',
      'Resource sharing',
      'Progress tracking',
      'Study reminders'
    ],
    tags: ['study', 'scheduling', 'groups', 'academic'],
    isOfficial: true,
  },
  {
    id: 'laundry-tracker',
    name: 'Laundry Tracker',
    description: 'Track washer and dryer availability in residential buildings with real-time updates.',
    icon: '👕',
    category: 'coordination' as const,
    version: '2.0.1',
    author: 'HIVE Team',
    rating: 4.7,
    installations: 567,
    lastUpdated: '2024-01-12T16:45:00Z',
    features: [
      'Real-time machine status',
      'Availability notifications',
      'Queue management',
      'Usage history',
      'Maintenance alerts',
      'Multiple building support'
    ],
    tags: ['laundry', 'residential', 'tracking', 'utilities'],
    isOfficial: true,
  },
  {
    id: 'meal-planner',
    name: 'Meal Planner',
    description: 'Plan and coordinate group meals, orders, and dining activities.',
    icon: '🍕',
    category: 'social' as const,
    version: '1.3.0',
    author: 'Community Dev',
    rating: 4.1,
    installations: 289,
    lastUpdated: '2024-01-03T11:20:00Z',
    features: [
      'Group meal planning',
      'Order coordination',
      'Cost splitting',
      'Restaurant suggestions',
      'Dietary preferences',
      'Order tracking'
    ],
    tags: ['food', 'meals', 'coordination', 'social'],
    isOfficial: false,
  },
  {
    id: 'workout-buddy',
    name: 'Workout Buddy',
    description: 'Find workout partners, schedule gym sessions, and track fitness goals together.',
    icon: '💪',
    category: 'social' as const,
    version: '1.1.3',
    author: 'FitnessDev',
    rating: 3.9,
    installations: 156,
    lastUpdated: '2023-12-28T09:30:00Z',
    features: [
      'Partner matching',
      'Workout scheduling',
      'Goal tracking',
      'Progress sharing',
      'Gym check-ins',
      'Fitness challenges'
    ],
    tags: ['fitness', 'workout', 'social', 'health'],
    isOfficial: false,
  },
  {
    id: 'expense-splitter',
    name: 'Expense Splitter',
    description: 'Split bills, track group expenses, and manage shared costs within your community.',
    icon: '💰',
    category: 'productivity' as const,
    version: '1.4.1',
    author: 'MoneyMgmt',
    rating: 4.3,
    installations: 334,
    lastUpdated: '2024-01-01T14:00:00Z',
    features: [
      'Bill splitting',
      'Expense tracking',
      'Payment reminders',
      'Receipt scanning',
      'Group budgets',
      'Settlement tracking'
    ],
    tags: ['expenses', 'money', 'bills', 'splitting'],
    isOfficial: false,
  },
];

export const Default: Story = {
  args: {
    isOpen: true,
    availableTools: sampleTools,
    onClose: action('modal-closed'),
    onPlantTool: action('tool-planted'),
    spaceType: 'university',
  },
};

export const ResidentialSpace: Story = {
  args: {
    isOpen: true,
    availableTools: sampleTools.filter(tool => 
      tool.tags.includes('residential') || 
      tool.category === 'coordination' || 
      tool.category === 'social'
    ),
    onClose: action('modal-closed'),
    onPlantTool: action('tool-planted'),
    spaceType: 'residential',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool library filtered for residential spaces, showing coordination and social tools.',
      },
    },
  },
};

export const AcademicFocus: Story = {
  args: {
    isOpen: true,
    availableTools: sampleTools.filter(tool => tool.category === 'academic'),
    onClose: action('modal-closed'),
    onPlantTool: action('tool-planted'),
    spaceType: 'university',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool library showing only academic-focused tools.',
      },
    },
  },
};

export const PlantingInProgress: Story = {
  args: {
    isOpen: true,
    availableTools: sampleTools,
    onClose: action('modal-closed'),
    onPlantTool: action('tool-planted'),
    spaceType: 'university',
    isPlanting: true,
    plantingToolId: 'event-management',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal state while a tool is being planted, showing loading state.',
      },
    },
  },
};

export const EmptyLibrary: Story = {
  args: {
    isOpen: true,
    availableTools: [],
    onClose: action('modal-closed'),
    onPlantTool: action('tool-planted'),
    spaceType: 'student',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no tools are available or match current filters.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isPlanting, setIsPlanting] = useState(false);
    const [plantingToolId, setPlantingToolId] = useState<string>('');

    const handlePlantTool = async (tool: any) => {
      setIsPlanting(true);
      setPlantingToolId(tool.id);
      
      // Simulate planting delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      action('tool-planted')(tool);
      setIsPlanting(false);
      setPlantingToolId('');
      setIsOpen(false)
    };

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300"
        >
          Open Tool Library
        </button>

        <ToolLibraryModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          availableTools={sampleTools}
          onPlantTool={handlePlantTool}
          spaceType="university"
          isPlanting={isPlanting}
          plantingToolId={plantingToolId}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with state management for planting workflow.',
      },
    },
  },
};