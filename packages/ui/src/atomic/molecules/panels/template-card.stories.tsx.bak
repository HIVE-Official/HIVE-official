import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TemplateCard, type ToolTemplate } from './template-card';

/**
 * # Template Card
 *
 * Card showing a pre-built tool template in the template browser.
 * Users can browse templates, preview them, and use them to start building.
 *
 * ## Features
 * - Thumbnail image with hover preview
 * - Category badge
 * - Usage count badge (for popular templates)
 * - Template name and description
 * - Tags (max 3 visible)
 * - Element and page count
 * - Preview button (on hover)
 * - Use button (always visible)
 * - Author attribution
 * - Selection state
 * - Hover effects (shadow, scale)
 *
 * ## Usage
 * ```tsx
 * <TemplateCard
 *   template={template}
 *   onUse={(template) => createFromTemplate(template)}
 *   onPreview={(template) => showPreview(template)}
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Panels/TemplateCard',
  component: TemplateCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TemplateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample templates
const sampleTemplate: ToolTemplate = {
  id: 'simple-poll',
  name: 'Simple Poll',
  description: 'Quick poll with multiple choice options and live results',
  category: 'Feedback',
  elementCount: 8,
  pageCount: 2,
  usageCount: 45,
  tags: ['poll', 'voting', 'feedback'],
  createdBy: 'HIVE Team',
};

/**
 * Default template
 */
export const Default: Story = {
  args: {
    template: sampleTemplate,
  },
  render: (args) => (
    <div className="w-[320px]">
      <TemplateCard {...args} />
    </div>
  ),
};

/**
 * Selected state
 */
export const Selected: Story = {
  args: {
    template: sampleTemplate,
    isSelected: true,
  },
  render: (args) => (
    <div className="w-[320px]">
      <TemplateCard {...args} />
    </div>
  ),
};

/**
 * Without thumbnail
 */
export const WithoutThumbnail: Story = {
  args: {
    template: {
      ...sampleTemplate,
      thumbnail: undefined,
    },
  },
  render: (args) => (
    <div className="w-[320px]">
      <TemplateCard {...args} />
    </div>
  ),
};

/**
 * Different categories
 */
export const DifferentCategories: Story = {
  render: () => {
    const templates: ToolTemplate[] = [
      {
        id: '1',
        name: 'Event Signup',
        description: 'Collect attendee information for campus events',
        category: 'Events',
        elementCount: 12,
        pageCount: 3,
        usageCount: 78,
        tags: ['events', 'signup', 'rsvp'],
      },
      {
        id: '2',
        name: 'Anonymous Feedback',
        description: 'Gather anonymous feedback from community members',
        category: 'Feedback',
        elementCount: 6,
        pageCount: 1,
        usageCount: 23,
        tags: ['anonymous', 'feedback', 'survey'],
      },
      {
        id: '3',
        name: 'Marketplace Listing',
        description: 'List items for sale or trade in your community',
        category: 'Marketplace',
        elementCount: 15,
        pageCount: 4,
        usageCount: 56,
        tags: ['buy', 'sell', 'trade', 'marketplace'],
      },
      {
        id: '4',
        name: 'Study Group Finder',
        description: 'Find and join study groups for your classes',
        category: 'Academic',
        elementCount: 10,
        pageCount: 2,
        usageCount: 34,
        tags: ['study', 'academic', 'groups'],
      },
    ];

    return (
      <div className="grid grid-cols-2 gap-4 w-[680px]">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    );
  },
};

/**
 * Interactive use and preview
 */
export const Interactive: Story = {
  render: () => {
    const [used, setUsed] = useState<string | null>(null);
    const [previewed, setPreview] = useState<string | null>(null);

    const template = sampleTemplate;

    return (
      <div className="space-y-4">
        <div className="w-[320px]">
          <TemplateCard
            template={template}
            onUse={(t) => setUsed(t.id)}
            onPreview={(t) => setPreview(t.id)}
          />
        </div>

        <div className="bg-muted px-4 py-3 rounded-md w-[320px]">
          <p className="text-sm font-semibold mb-2">Actions</p>
          <p className="text-xs">Last used: {used || 'None'}</p>
          <p className="text-xs">Last previewed: {previewed || 'None'}</p>
        </div>
      </div>
    );
  },
};

/**
 * Template grid
 */
export const TemplateGrid: Story = {
  render: () => {
    const templates: ToolTemplate[] = [
      {
        id: '1',
        name: 'Simple Poll',
        description: 'Quick poll with multiple choice options',
        category: 'Feedback',
        elementCount: 8,
        pageCount: 2,
        usageCount: 145,
        tags: ['poll', 'voting'],
      },
      {
        id: '2',
        name: 'Event RSVP',
        description: 'Collect RSVPs for your event',
        category: 'Events',
        elementCount: 10,
        pageCount: 2,
        usageCount: 89,
        tags: ['rsvp', 'events'],
      },
      {
        id: '3',
        name: 'Ride Share Board',
        description: 'Find rides or offer rides to campus',
        category: 'Transportation',
        elementCount: 12,
        pageCount: 3,
        usageCount: 67,
        tags: ['rides', 'carpool'],
      },
      {
        id: '4',
        name: 'Lost & Found',
        description: 'Report lost items or claim found ones',
        category: 'Community',
        elementCount: 9,
        pageCount: 2,
        usageCount: 45,
        tags: ['lost', 'found'],
      },
      {
        id: '5',
        name: 'Room Swap',
        description: 'Find someone to swap dorm rooms with',
        category: 'Housing',
        elementCount: 11,
        pageCount: 3,
        usageCount: 34,
        tags: ['housing', 'swap'],
      },
      {
        id: '6',
        name: 'Group Project Matcher',
        description: 'Find group members for class projects',
        category: 'Academic',
        elementCount: 14,
        pageCount: 4,
        usageCount: 78,
        tags: ['groups', 'academic'],
      },
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} className="w-[280px]" />
        ))}
      </div>
    );
  },
};

/**
 * With selection
 */
export const WithSelection: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const templates: ToolTemplate[] = [
      {
        id: '1',
        name: 'Simple Poll',
        description: 'Quick poll with multiple choice',
        category: 'Feedback',
        elementCount: 8,
        pageCount: 2,
        tags: ['poll'],
      },
      {
        id: '2',
        name: 'Event Signup',
        description: 'Collect event RSVPs',
        category: 'Events',
        elementCount: 12,
        pageCount: 3,
        tags: ['events'],
      },
      {
        id: '3',
        name: 'Marketplace',
        description: 'Buy and sell items',
        category: 'Commerce',
        elementCount: 15,
        pageCount: 4,
        tags: ['marketplace'],
      },
    ];

    return (
      <div className="space-y-4">
        <p className="text-sm font-semibold">
          Click to select • Selected: {selectedId || 'None'}
        </p>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedId === template.id}
              onClick={(t) => setSelectedId(t.id)}
              className="w-[280px]"
            />
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Popular templates (high usage)
 */
export const PopularTemplates: Story = {
  render: () => {
    const templates: ToolTemplate[] = [
      {
        id: '1',
        name: 'Anonymous Feedback',
        description: 'Collect anonymous feedback from your community',
        category: 'Feedback',
        elementCount: 6,
        pageCount: 1,
        usageCount: 234,
        tags: ['feedback', 'anonymous'],
      },
      {
        id: '2',
        name: 'Event Registration',
        description: 'Full featured event signup with waitlist',
        category: 'Events',
        elementCount: 18,
        pageCount: 5,
        usageCount: 189,
        tags: ['events', 'registration', 'waitlist'],
      },
      {
        id: '3',
        name: 'Campus Poll',
        description: 'Create polls for your entire campus',
        category: 'Engagement',
        elementCount: 10,
        pageCount: 2,
        usageCount: 167,
        tags: ['poll', 'campus-wide'],
      },
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} className="w-[280px]" />
        ))}
      </div>
    );
  },
};

/**
 * Long descriptions
 */
export const LongDescriptions: Story = {
  render: () => {
    const templates: ToolTemplate[] = [
      {
        id: '1',
        name: 'Comprehensive Event Management System',
        description:
          'A complete event management solution with RSVP tracking, attendee management, ticket sales, capacity limits, waitlist management, and post-event feedback collection',
        category: 'Events',
        elementCount: 28,
        pageCount: 7,
        usageCount: 45,
        tags: ['events', 'management', 'comprehensive', 'enterprise'],
      },
      {
        id: '2',
        name: 'Multi-Step Survey',
        description:
          'Create detailed surveys with conditional logic, skip patterns, and advanced question types including matrix questions and file uploads',
        category: 'Research',
        elementCount: 22,
        pageCount: 6,
        tags: ['survey', 'research', 'advanced'],
      },
    ];

    return (
      <div className="grid grid-cols-2 gap-4 w-[620px]">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    );
  },
};

/**
 * Minimal templates (few elements/pages)
 */
export const MinimalTemplates: Story = {
  render: () => {
    const templates: ToolTemplate[] = [
      {
        id: '1',
        name: 'Quick Poll',
        description: 'Simple yes/no poll',
        category: 'Feedback',
        elementCount: 3,
        pageCount: 1,
        tags: ['poll', 'simple'],
      },
      {
        id: '2',
        name: 'Link Share',
        description: 'Share a link with description',
        category: 'Sharing',
        elementCount: 4,
        pageCount: 1,
        tags: ['link', 'share'],
      },
      {
        id: '3',
        name: 'Contact Form',
        description: 'Basic contact form',
        category: 'Communication',
        elementCount: 5,
        pageCount: 1,
        tags: ['contact', 'form'],
      },
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} className="w-[280px]" />
        ))}
      </div>
    );
  },
};

/**
 * In template browser
 */
export const InTemplateBrowser: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const allTemplates: ToolTemplate[] = [
      {
        id: '1',
        name: 'Simple Poll',
        description: 'Quick poll with multiple choice options',
        category: 'Feedback',
        elementCount: 8,
        pageCount: 2,
        usageCount: 145,
        tags: ['poll', 'voting'],
      },
      {
        id: '2',
        name: 'Event RSVP',
        description: 'Collect RSVPs for your event',
        category: 'Events',
        elementCount: 10,
        pageCount: 2,
        usageCount: 89,
        tags: ['rsvp', 'events'],
      },
      {
        id: '3',
        name: 'Marketplace Listing',
        description: 'List items for sale or trade',
        category: 'Commerce',
        elementCount: 15,
        pageCount: 4,
        usageCount: 67,
        tags: ['buy', 'sell', 'marketplace'],
      },
      {
        id: '4',
        name: 'Anonymous Feedback',
        description: 'Gather anonymous feedback',
        category: 'Feedback',
        elementCount: 6,
        pageCount: 1,
        usageCount: 234,
        tags: ['feedback', 'anonymous'],
      },
    ];

    const categories = ['all', 'Feedback', 'Events', 'Commerce'];

    const filteredTemplates = allTemplates.filter((t) => {
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesSearch =
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return (
      <div className="w-full max-w-4xl bg-background border rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold mb-1">Template Browser</h2>
          <p className="text-sm text-muted-foreground">
            Start from a pre-built template
          </p>
        </div>

        {/* Search and filters */}
        <div className="px-6 py-4 space-y-3 border-b">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-background border rounded-md text-sm"
          />

          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded text-xs font-medium transition-colors',
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                )}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Templates grid */}
        <div className="p-6">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">No templates found</p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
