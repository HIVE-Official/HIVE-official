import type { Meta, StoryObj } from '@storybook/react';
import { logger } from '../../utils/logger';

import { PostCreationModal, PostCreationData } from './post-creation-modal';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

const meta: Meta<typeof PostCreationModal> = {
  title: 'HIVE/Spaces/Organisms/PostCreationModal',
  component: PostCreationModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal for creating different types of posts in spaces. Supports text posts, events, polls, and announcements with form validation and role-based permissions.',
      },
    },
  },
  argTypes: {
    spaceType: {
      control: { type: 'select' },
      options: ['university', 'residential', 'greek', 'student'],
    },
    userRole: {
      control: { type: 'select' },
      options: ['leader', 'co_leader', 'member'],
    },
    initialType: {
      control: { type: 'select' },
      options: ['text', 'event', 'poll', 'announcement'],
    },
    isSubmitting: { control: { type: 'boolean' } },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostCreationModal>;

const mockSubmit = async (data: PostCreationData) => {
  action('submit')(data);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
};

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'member',
  },
};

export const AsLeader: Story = {
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'leader',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal as viewed by a space leader with access to announcement creation.',
      },
    },
  },
};

export const EventCreation: Story = {
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'member',
    initialType: 'event',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal pre-configured for event creation with date/time pickers and RSVP options.',
      },
    },
  },
};

export const PollCreation: Story = {
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'student',
    userRole: 'member',
    initialType: 'poll',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal configured for poll creation with dynamic option management.',
      },
    },
  },
};

export const AnnouncementCreation: Story = {
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'leader',
    initialType: 'announcement',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal for creating announcements with priority levels and pinning options.',
      },
    },
  },
};

export const ResidentialSpace: Story = {
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'residential',
    userRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in the context of a residential space (dorm/floor).',
      },
    },
  },
};

export const GreekSpace: Story = {
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'greek',
    userRole: 'co_leader',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in the context of a Greek life space with co-leader permissions.',
      },
    },
  },
};

export const SubmittingState: Story = {
  args: {
    isOpen: true,
    onClose: action('close'),
    onSubmit: mockSubmit,
    spaceType: 'university',
    userRole: 'member',
    isSubmitting: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in submitting state showing loading indicators.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: PostCreationData) => {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        action('submit')(data);

        setIsOpen(false);
      } catch (error) {
        logger.error('Failed to create post:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleClose = () => {
      setIsOpen(false);
      action('close')();
    };

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        {!isOpen && (
          <div className="text-center">
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300"
            >
              Create Post
            </button>
          </div>
        )}

        <PostCreationModal
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          spaceType="university"
          userRole="leader"
          isSubmitting={isSubmitting}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with state management and realistic submission flow.',
      },
    },
  },
};

export const FormValidation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleSubmit = async (data: PostCreationData) => {
      // This will trigger validation since we're not providing required fields
      action('submit')(data);
    };

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <PostCreationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          spaceType="university"
          userRole="member"
          initialType="event"
        />
        
        {!isOpen && (
          <div className="text-center">
            <p className="text-[var(--hive-text-secondary)] mb-4">
              Modal closed. Try submitting without filling required fields to see validation.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300"
            >
              Reopen Modal
            </button>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing form validation with error states and required field handling.',
      },
    },
  },
};

export const AllPostTypes: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentType, setCurrentType] = useState<'text' | 'event' | 'poll' | 'announcement'>('text');
    
    const postTypes = [
      { type: 'text' as const, label: 'Text Post' },
      { type: 'event' as const, label: 'Event' },
      { type: 'poll' as const, label: 'Poll' },
      { type: 'announcement' as const, label: 'Announcement' },
    ];

    const handleSubmit = async (data: PostCreationData) => {
      action('submit')(data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsOpen(false);
    };

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        {!isOpen && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
              Create Different Post Types
            </h2>
            <div className="flex justify-center gap-4">
              {postTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => {
                    setCurrentType(type.type);
                    setIsOpen(true);
                  }}
                  className="px-4 py-2 bg-[var(--hive-background-secondary)]/60 text-[var(--hive-text-primary)] border border-[var(--hive-border-primary)]/30 rounded-xl hover:bg-[var(--hive-brand-primary)]/10 hover:border-[var(--hive-brand-primary)]/30 transition-all duration-300"
                >
                  Create {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <PostCreationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          spaceType="university"
          userRole="leader"
          initialType={currentType}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing all different post types with the ability to switch between them.',
      },
    },
  },
};