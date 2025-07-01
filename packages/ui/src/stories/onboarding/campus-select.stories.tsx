import type { Meta, StoryObj } from '@storybook/react';
import { CampusSelector } from '../../components/onboarding/campus-select/campus-selector';
import { CampusCard } from '../../components/onboarding/campus-select/campus-card';
import { SearchInput } from '../../components/onboarding/campus-select/search-input';

const meta = {
  title: 'Onboarding/Campus Selection',
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta;

export default meta;

// Mock data
const mockCampuses = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'active' as const,
    remainingSpots: 50,
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    domain: 'harvard.edu',
    status: 'coming_soon' as const,
  },
  {
    id: 'mit',
    name: 'MIT',
    domain: 'mit.edu',
    status: 'active' as const,
    remainingSpots: 25,
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    domain: 'stanford.edu',
    status: 'coming_soon' as const,
  },
];

// Storybook action mock
const mockAction = (value: unknown) => {
  // Use console.warn which is allowed by ESLint
  console.warn('Storybook action:', value);
};

// CampusSelector Stories
export const FullSelector: StoryObj<typeof CampusSelector> = {
  render: () => (
    <div className="w-[600px] p-6">
      <CampusSelector
        campuses={mockCampuses}
        onSelect={mockAction}
      />
    </div>
  ),
};

export const WithSelection: StoryObj<typeof CampusSelector> = {
  render: () => (
    <div className="w-[600px] p-6">
      <CampusSelector
        campuses={mockCampuses}
        selectedCampusId="ub"
        onSelect={mockAction}
      />
    </div>
  ),
};

// Individual Component Stories
export const SearchInputStory: StoryObj<typeof SearchInput> = {
  render: () => (
    <div className="w-[400px]">
      <SearchInput
        value=""
        onChange={mockAction}
      />
    </div>
  ),
};

// CampusCard Stories
export const ActiveCampusCard: StoryObj<typeof CampusCard> = {
  render: () => (
    <div className="w-[400px]">
      <CampusCard
        id="ub"
        name="University at Buffalo"
        domain="buffalo.edu"
        status="active"
        remainingSpots={50}
      />
    </div>
  ),
};

export const ComingSoonCampusCard: StoryObj<typeof CampusCard> = {
  render: () => (
    <div className="w-[400px]">
      <CampusCard
        id="harvard"
        name="Harvard University"
        domain="harvard.edu"
        status="coming_soon"
      />
    </div>
  ),
};

export const SelectedCampusCard: StoryObj<typeof CampusCard> = {
  render: () => (
    <div className="w-[400px]">
      <CampusCard
        id="ub"
        name="University at Buffalo"
        domain="buffalo.edu"
        status="active"
        remainingSpots={50}
        selected
      />
    </div>
  ),
}; 