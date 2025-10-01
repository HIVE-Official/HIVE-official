import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../../atomic/atoms/dialog';
import { Button } from '../../atomic/atoms/button';
import { Input } from '../../atomic/atoms/input';
import { Label } from '../../atomic/atoms/label';
import { Badge } from '../../atomic/atoms/badge';

/**
 * # Dialog (shadcn/ui)
 *
 * **Compound Modal Component** - Radix UI Dialog primitive with HIVE styling
 *
 * ## Features
 * - ✅ Full keyboard navigation (Escape to close, Tab trap)
 * - ✅ Focus management with automatic return
 * - ✅ Portal rendering for proper stacking
 * - ✅ Animated overlay and content
 * - ✅ WCAG 2.1 ARIA dialog pattern
 * - ✅ Mobile-optimized with responsive sizing
 *
 * ## Composition
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Description</DialogDescription>
 *     </DialogHeader>
 *     {children}
 *     <DialogFooter>
 *       <Button>Action</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 *
 * ## Accessibility
 * - Escape key closes dialog
 * - Focus trap keeps focus within dialog
 * - Focus returns to trigger on close
 * - Screen reader announces dialog role and label
 */
const meta = {
  title: '11-Shared/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui Dialog built on Radix UI Dialog primitive. Provides accessible modal overlays with focus management, keyboard navigation, and animations. Use DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, and DialogFooter for proper composition.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic dialog with title and description
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to HIVE</DialogTitle>
          <DialogDescription>
            Connect with your campus community through spaces, rituals, and shared experiences.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            HIVE is your campus social platform for authentic connections and community building.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Get Started</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Confirmation dialog pattern
 */
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Space</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the "ACM Club" space and
            remove all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete Space</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Confirmation pattern for destructive actions. Use destructive button for trigger and action.',
      },
    },
  },
};

/**
 * Form dialog pattern
 */
export const FormDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Space</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Space</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new community space.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Space Name</Label>
            <Input id="name" placeholder="ACM Club" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Weekly coding challenges and tech talks"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" placeholder="Technology" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Create Space</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Form dialog with input fields. Use proper Label + Input pairing for accessibility.',
      },
    },
  },
};

/**
 * Info/announcement dialog
 */
export const Announcement: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="mr-2">🎉</span>
          View Announcement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>New Feature: Rituals</DialogTitle>
            <Badge>New</Badge>
          </div>
          <DialogDescription>
            Create campus-wide behavioral campaigns and track engagement
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <p className="text-sm">
            Rituals help you build new habits and participate in campus-wide challenges.
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Track daily check-ins</li>
            <li>• See community participation</li>
            <li>• Earn badges and recognition</li>
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full">Try Rituals Now</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Informational dialog for announcements or feature introductions.',
      },
    },
  },
};

/**
 * Without close button
 */
export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Required Action</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please add a profile photo to continue using HIVE
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg border-border">
            <p className="text-sm text-muted-foreground">Upload photo area</p>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full">Upload Photo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Dialog without close button (showCloseButton={false}). Use for required actions. User can still close with Escape key.',
      },
    },
  },
};

/**
 * Multiple dialogs (nested)
 */
export const NestedDialogs: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account settings</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm">Choose a setting to configure:</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                Privacy Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Privacy Settings</DialogTitle>
                <DialogDescription>Control who can see your profile</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-2">
                <p className="text-sm">Privacy options would go here</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Save Changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nested dialogs for multi-level interactions. Each dialog manages its own state.',
      },
    },
  },
};

/**
 * Custom width sizing
 */
export const CustomSizes: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Small</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[320px]">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>Compact content area</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Small dialog for brief messages</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Default</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Default Dialog</DialogTitle>
            <DialogDescription>Standard content area</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Default dialog size (425px)</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Large</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>Expanded content area</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Large dialog for complex content</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Custom widths using className="sm:max-w-[size]". Default is 425px. Always responsive on mobile.',
      },
    },
  },
};

/**
 * Scrollable content
 */
export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Terms</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>Please review our terms and conditions</DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-sm text-muted-foreground">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <p className="text-sm text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
          <p className="text-sm text-muted-foreground">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-sm text-muted-foreground">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Decline</Button>
          </DialogClose>
          <Button>Accept Terms</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Long content with scrollable area. Use max-h-[height] overflow-y-auto pattern.',
      },
    },
  },
};

/**
 * Real-world: Join Space confirmation
 */
export const RealWorldExample: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join ACM Club</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join ACM Club?</DialogTitle>
          <DialogDescription>
            You'll be able to post, comment, and participate in club events
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-lg">🖥️</span>
            </div>
            <div>
              <p className="font-semibold">ACM Club</p>
              <p className="text-sm text-muted-foreground">247 members</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Tech</Badge>
            <Badge variant="secondary">Coding</Badge>
            <Badge variant="secondary">Events</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Weekly coding challenges, tech talks, and hackathons. Connect with fellow CS students
            and build real projects.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Join Space</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world space join confirmation with space preview and action buttons.',
      },
    },
  },
};

/**
 * Dark theme (HIVE default)
 */
export const DarkTheme: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dark Theme Dialog</DialogTitle>
          <DialogDescription>On true black background with subtle borders</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            HIVE uses true black (#000) backgrounds with subtle borders (rgba 0.08) for depth.
            Dialogs use #171717 background for subtle elevation.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Dialog optimized for true black backgrounds with subtle elevation.',
      },
    },
  },
};
