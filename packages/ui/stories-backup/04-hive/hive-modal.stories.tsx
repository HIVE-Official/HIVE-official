import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveModal } from '../../components/hive-modal';
import { HiveButton } from '../../components/hive-button';

const meta: Meta<typeof HiveModal> = {
  title: '04-Hive/Modal System',
  component: HiveModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Modal System - Campus-First Interactions**

Premium modal components built with HIVE's foundation systems for accessibility, mobile optimization, and semantic design tokens.

## When to Use
- Tool configuration and settings
- Space creation and management workflows
- Academic calendar integration dialogs
- Campus profile and privacy settings
- Confirmation dialogs for critical actions

## Foundation Features
- **Mobile-First Design**: Touch-optimized interactions and responsive sizing
- **Accessibility Built-In**: WCAG 2.1 AA compliance with focus management
- **HIVE Motion System**: Liquid metal entrance and exit animations
- **Semantic Design Tokens**: Consistent with HIVE brand system

## Modal Types
- **Default**: Standard campus interactions and forms
- **Premium**: Enhanced tool creation and builder workflows
- **Destructive**: Account deletion and critical confirmations
- **Success**: Achievement unlocks and completion states

## Campus Context
All modals are optimized for university workflows, academic calendar integration, and student/builder productivity patterns.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'Modal size optimized for different campus workflows'
    },
    variant: {
      control: 'select',
      options: ['default', 'premium', 'destructive', 'success'],
      description: 'Modal variant with semantic design tokens'
    },
    isOpen: {
      control: 'boolean',
      description: 'Modal visibility state'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Display close button in modal header'
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Allow closing modal by clicking backdrop'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Allow closing modal with Escape key'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
const ModalWrapper = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-4">
      <HiveButton onClick={() => setIsOpen(true)}>
        Open Modal
      </HiveButton>
      <HiveModal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </HiveModal>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">
          Campus Settings
        </h2>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          Configure your HIVE experience for your university workflow.
        </p>
        <div className="flex justify-end gap-3">
          <HiveButton variant="ghost">Cancel</HiveButton>
          <HiveButton variant="primary">Save Changes</HiveButton>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'default',
    variant: 'default'
  }
};

export const Playground: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">
          Interactive Modal Playground
        </h2>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          Experiment with different modal configurations and interactions.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Campus Email
            </label>
            <input 
              className="w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
              placeholder="student@university.edu"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <HiveButton variant="ghost">Cancel</HiveButton>
            <HiveButton variant="primary">Update Profile</HiveButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'default',
    variant: 'default',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true
  }
};

export const ToolCreation: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Create New Tool
        </h2>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          Build a new tool to share with your campus community.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Tool Name
            </label>
            <input 
              className="w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
              placeholder="Study Timer Pro"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Description
            </label>
            <textarea 
              className="w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] h-24"
              placeholder="Help students focus with customizable study sessions..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <HiveButton variant="ghost">Save Draft</HiveButton>
            <HiveButton variant="premium">Create Tool</HiveButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'lg',
    variant: 'premium'
  }
};

export const SpaceManagement: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Manage CS Study Group
        </h2>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          Configure your space settings and member permissions.
        </p>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                Privacy Level
              </label>
              <select className="w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]">
                <option>Public</option>
                <option>CS Majors Only</option>
                <option>Invite Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                Max Members
              </label>
              <input 
                type="number"
                className="w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
                placeholder="25"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Study Schedule
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Mon', 'Wed', 'Fri'].map(day => (
                <button 
                  key={day}
                  className="px-3 py-2 bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 rounded-lg text-[var(--hive-brand-primary)] text-sm hover:bg-[var(--hive-brand-primary)]/30"
                >
                  {day} 7-9PM
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <HiveButton variant="ghost">Cancel</HiveButton>
            <HiveButton variant="primary">Update Space</HiveButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'lg',
    variant: 'default'
  }
};

export const ConfirmationDialog: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-[var(--hive-status-error)]/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--hive-status-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Delete Study Group
        </h2>
        <p className="text-[var(--hive-text-secondary)] mb-6 max-w-sm mx-auto">
          This action cannot be undone. All tools, schedules, and member data will be permanently removed.
        </p>
        <div className="flex justify-center gap-3">
          <HiveButton variant="ghost">Keep Space</HiveButton>
          <HiveButton variant="destructive">Delete Forever</HiveButton>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'sm',
    variant: 'destructive'
  }
};

export const SuccessState: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-[var(--hive-status-success)]/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--hive-status-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Tool Published Successfully!
        </h2>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          Your "Grade Calculator Pro" is now live and available to your campus community.
        </p>
        <div className="space-y-3">
          <div className="bg-[var(--hive-background-secondary)] rounded-lg p-3 text-left">
            <div className="text-sm text-[var(--hive-text-secondary)]">Share Link:</div>
            <div className="text-sm text-[var(--hive-brand-primary)] font-mono">hive.university.edu/tools/grade-calc-pro</div>
          </div>
          <div className="flex justify-center gap-3">
            <HiveButton variant="ghost">Share Tool</HiveButton>
            <HiveButton variant="primary">View in HiveLAB</HiveButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'default',
    variant: 'success'
  }
};

export const MobileOptimized: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
          Mobile Modal Experience
        </h2>
        <p className="text-[var(--hive-text-secondary)] mb-4">
          Touch-optimized modal interactions for campus workflows on mobile.
        </p>
        <div className="space-y-4">
          <button className="w-full py-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]">
            Join Study Session
          </button>
          <button className="w-full py-3 bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 rounded-lg text-[var(--hive-brand-primary)]">
            Create New Tool
          </button>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'default',
    variant: 'default'
  }
};

export const AccessibilityDemo: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">
          Accessible Modal Interactions
        </h2>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          Full keyboard navigation, screen reader support, and focus management.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="accessible-input" className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Course Code
            </label>
            <input 
              id="accessible-input"
              className="w-full px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
              placeholder="CS 101"
              aria-describedby="course-help"
            />
            <div id="course-help" className="text-xs text-[var(--hive-text-secondary)] mt-1">
              Enter your course code to join the study space
            </div>
          </div>
          <fieldset className="border border-[var(--hive-border-primary)] rounded-lg p-4">
            <legend className="text-sm font-medium text-[var(--hive-text-primary)] px-2">
              Study Preferences
            </legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-[var(--hive-border-primary)]" />
                <span className="text-sm text-[var(--hive-text-primary)]">Enable study reminders</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-[var(--hive-border-primary)]" />
                <span className="text-sm text-[var(--hive-text-primary)]">Join group sessions</span>
              </label>
            </div>
          </fieldset>
          <div className="flex justify-end gap-3 pt-4">
            <HiveButton variant="ghost">Cancel</HiveButton>
            <HiveButton variant="primary">Join Space</HiveButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'default',
    variant: 'default',
    closeOnEscape: true,
    showCloseButton: true
  }
};

export const AllSizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    const sizes = ['sm', 'default', 'lg', 'xl'] as const;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sizes.map(size => (
            <HiveButton 
              key={size}
              onClick={() => setOpenModal(size)}
              variant="outline"
            >
              {size.charAt(0).toUpperCase() + size.slice(1)} Modal
            </HiveButton>
          ))}
        </div>
        
        {sizes.map(size => (
          <HiveModal
            key={size}
            size={size}
            isOpen={openModal === size}
            onClose={() => setOpenModal(null)}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">
                {size.charAt(0).toUpperCase() + size.slice(1)} Modal
              </h2>
              <p className="text-[var(--hive-text-secondary)] mb-6">
                This demonstrates the {size} modal size for different campus workflow needs.
              </p>
              <HiveButton onClick={() => setOpenModal(null)}>
                Close Modal
              </HiveButton>
            </div>
          </HiveModal>
        ))}
      </div>
    );
  }
};