import type { Meta, StoryObj } from '@storybook/react';
import { SpaceExploreHub } from './space-explore-hub';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SpaceExploreHub> = {
  title: 'HIVE/Spaces/Organisms/SpaceExploreHub',
  component: SpaceExploreHub,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main Space Discovery hub that serves as the entry point for exploring campus spaces. Features category cards, search functionality, and platform statistics.',
      },
    },
  },
  argTypes: {
    onCategoryClick: { action: 'category-clicked' },
    onSearch: { action: 'search-performed' },
    onShowFilters: { action: 'filters-opened' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceExploreHub>;

const defaultStats = {
  totalSpaces: 526,
  totalMembers: 8432,
  activeToday: 347,
  newThisWeek: 23,
};

const defaultCategories = [
  {
    type: 'university' as const,
    count: 247,
    trending: true,
    recentActivity: 89,
  },
  {
    type: 'residential' as const,
    count: 89,
    trending: false,
    recentActivity: 45,
  },
  {
    type: 'greek' as const,
    count: 34,
    trending: true,
    recentActivity: 23,
  },
  {
    type: 'student' as const,
    count: 156,
    trending: false,
    recentActivity: 67,
  },
];

export const Default: Story = {
  args: {
    stats: defaultStats,
    categories: defaultCategories,
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened'),
  },
};

export const WithSearchQuery: Story = {
  args: {
    stats: defaultStats,
    categories: defaultCategories,
    searchQuery: 'Computer Science',
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Hub with a pre-filled search query, useful for showing search state.',
      },
    },
  },
};

export const SmallCampus: Story = {
  args: {
    stats: {
      totalSpaces: 127,
      totalMembers: 2341,
      activeToday: 89,
      newThisWeek: 8,
    },
    categories: [
      {
        type: 'university' as const,
        count: 67,
        trending: false,
        recentActivity: 23,
      },
      {
        type: 'residential' as const,
        count: 23,
        trending: true,
        recentActivity: 12,
      },
      {
        type: 'greek' as const,
        count: 8,
        trending: false,
        recentActivity: 3,
      },
      {
        type: 'student' as const,
        count: 29,
        trending: false,
        recentActivity: 15,
      },
    ],
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Hub configuration for a smaller campus with fewer spaces and members.',
      },
    },
  },
};

export const LargeCampus: Story = {
  args: {
    stats: {
      totalSpaces: 1247,
      totalMembers: 28567,
      activeToday: 1893,
      newThisWeek: 67,
    },
    categories: [
      {
        type: 'university' as const,
        count: 689,
        trending: true,
        recentActivity: 234,
      },
      {
        type: 'residential' as const,
        count: 156,
        trending: false,
        recentActivity: 89,
      },
      {
        type: 'greek' as const,
        count: 89,
        trending: true,
        recentActivity: 45,
      },
      {
        type: 'student' as const,
        count: 313,
        trending: false,
        recentActivity: 134,
      },
    ],
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Hub configuration for a large campus with many spaces and high activity.',
      },
    },
  },
};

export const NoGreekLife: Story = {
  args: {
    stats: {
      totalSpaces: 423,
      totalMembers: 6789,
      activeToday: 289,
      newThisWeek: 19,
    },
    categories: [
      {
        type: 'university' as const,
        count: 198,
        trending: true,
        recentActivity: 67,
      },
      {
        type: 'residential' as const,
        count: 78,
        trending: false,
        recentActivity: 34,
      },
      {
        type: 'greek' as const,
        count: 0,
        trending: false,
        recentActivity: 0,
      },
      {
        type: 'student' as const,
        count: 147,
        trending: false,
        recentActivity: 56,
      },
    ],
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Hub for a campus without Greek life organizations.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    stats: defaultStats,
    categories: defaultCategories,
    isLoading: true,
    onCategoryClick: action('category-clicked'),
    onSearch: action('search-performed'),
    onShowFilters: action('filters-opened'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with skeleton placeholders.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <SpaceExploreHub;
          stats={defaultStats}}
          categories={defaultCategories}
          searchQuery={searchQuery}
          onCategoryClick={(type) => {
            action('category-clicked')(type);
            console.log(`Navigating to ${type} spaces`);
          }}
          onSearch={(query) => {
            action('search-performed')(query);
            setSearchQuery(query);
            console.log(`Searching for: ${query}`);
          }}
          onShowFilters={action('filters-opened')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with state management for search functionality.',
      },
    },
  },
};