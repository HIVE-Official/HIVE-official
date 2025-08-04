import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCategoryCard, SPACE_CATEGORIES, SpaceCategoryType } from './space-category-card';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SpaceCategoryCard> = {
  title: 'HIVE/Spaces/Atoms/SpaceCategoryCard',
  component: SpaceCategoryCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Category launch cards for the four main space types in HIVE. These cards serve as the entry points in the Space Discovery hub, allowing users to browse specific types of spaces.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'featured'],
      description: 'Visual variant of the card',
    },
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceCategoryCard>;

// Create category data with sample counts
const createCategoryWithCount = (type: SpaceCategoryType, count: number) => ({
  ...SPACE_CATEGORIES[type],
  count,
});

export const University: Story = {
  args: {
    category: createCategoryWithCount('university', 247),
    onClick: action('university-clicked'),
  },
};

export const Residential: Story = {
  args: {
    category: createCategoryWithCount('residential', 89),
    onClick: action('residential-clicked'),
  },
};

export const Greek: Story = {
  args: {
    category: createCategoryWithCount('greek', 34),
    onClick: action('greek-clicked'),
  },
};

export const Student: Story = {
  args: {
    category: createCategoryWithCount('student', 156),
    onClick: action('student-clicked'),
  },
};

export const Featured: Story = {
  args: {
    category: createCategoryWithCount('university', 247),
    variant: 'featured',
    onClick: action('featured-clicked'),
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-4xl">
      <SpaceCategoryCard
        category={createCategoryWithCount('university', 247)}
        onClick={action('university-clicked')}
      />
      <SpaceCategoryCard
        category={createCategoryWithCount('residential', 89)}
        onClick={action('residential-clicked')}
      />
      <SpaceCategoryCard
        category={createCategoryWithCount('greek', 34)}
        onClick={action('greek-clicked')}
      />
      <SpaceCategoryCard
        category={createCategoryWithCount('student', 156)}
        onClick={action('student-clicked')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive grid showing all four space category types as they would appear in the Space Discovery hub.',
      },
    },
  },
};

export const ZeroSpaces: Story = {
  args: {
    category: createCategoryWithCount('greek', 0),
    onClick: action('empty-category-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Category card with zero spaces - useful for schools that might not have certain space types.',
      },
    },
  },
};

export const LargeNumbers: Story = {
  args: {
    category: createCategoryWithCount('university', 1247),
    onClick: action('large-count-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Category card with large space counts - tests number formatting.',
      },
    },
  },
};