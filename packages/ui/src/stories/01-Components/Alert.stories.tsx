import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription, AlertIcon } from '../../components/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/alert-dialog';
import { Button } from '../../components/button';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Trash2, LogOut, Settings } from 'lucide-react';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# HIVE Alert System

Clean, accessible alert components for tech social platform with minimal gold usage.

## Design Principles:
- **Monochrome + Gold**: Following HIVE design system colors
- **Clear Hierarchy**: Title, description, and icon support
- **Accessible**: Proper ARIA roles and screen reader support
- **Consistent**: Matches Button, Input, Card styling patterns

## Components:
- **Alert**: Static notification component with variants
- **AlertDialog**: Modal confirmation dialogs with actions
- **AlertIcon**: Contextual icons for different alert types
- **AlertTitle/Description**: Structured content components

## Variants:
- **Default**: Standard informational alerts
- **Success**: Positive feedback with gold accent
- **Warning**: Caution messages
- **Destructive**: Error or dangerous action alerts
- **Info**: Neutral information
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <div className="flex items-start gap-3">
        <AlertIcon variant="primary" />
        <div>
          <AlertTitle>Campus Update</AlertTitle>
          <AlertDescription>
            New features have been added to your campus dashboard. Check out the updated tools section.
          </AlertDescription>
        </div>
      </div>
    ),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <div className="flex items-start gap-3">
        <AlertIcon variant="success" />
        <div>
          <AlertTitle>Successfully Connected!</AlertTitle>
          <AlertDescription>
            You've successfully joined the CS Study Hub. Welcome to the community!
          </AlertDescription>
        </div>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">HIVE Alert System</h1>
          <p className="text-white/60">Clean notifications and confirmation dialogs</p>
        </div>

        {/* Static Alerts */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Alert Variants</h2>
          
          <div className="space-y-4">
            <Alert variant="primary">
              <div className="flex items-start gap-3">
                <AlertIcon variant="primary" />
                <div>
                  <AlertTitle>Campus Notification</AlertTitle>
                  <AlertDescription>
                    The library will be open 24/7 during finals week. Study spaces are available on floors 2-4.
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <Alert variant="success">
              <div className="flex items-start gap-3">
                <AlertIcon variant="success" />
                <div>
                  <AlertTitle>Space Created Successfully</AlertTitle>
                  <AlertDescription>
                    Your new study group "Advanced Algorithms" has been created and is now live for other students to join.
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <Alert variant="warning">
              <div className="flex items-start gap-3">
                <AlertIcon variant="warning" />
                <div>
                  <AlertTitle>Maintenance Scheduled</AlertTitle>
                  <AlertDescription>
                    The campus network will undergo maintenance tonight from 2-4 AM. Some features may be temporarily unavailable.
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <Alert variant="destructive">
              <div className="flex items-start gap-3">
                <AlertIcon variant="destructive" />
                <div>
                  <AlertTitle>Connection Error</AlertTitle>
                  <AlertDescription>
                    Unable to connect to the campus network. Please check your connection and try again.
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <Alert variant="info">
              <div className="flex items-start gap-3">
                <AlertIcon variant="info" />
                <div>
                  <AlertTitle>Campus Energy Update</AlertTitle>
                  <AlertDescription>
                    Current campus activity is at 87% with peak energy in the CS Building and Main Library.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>
        </div>

        {/* Simple Alerts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Simple Alerts</h2>
          
          <div className="space-y-3">
            <Alert variant="success">
              <AlertDescription>
                ✓ Successfully joined the study group!
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertDescription>
                ⚠ Your session expires in 5 minutes. Please save your work.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertDescription>
                × Failed to load campus data. Please refresh the page.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Alert Dialogs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Alert Dialogs</h2>
          <p className="text-white/60 text-sm">Interactive confirmation dialogs</p>
          
          <div className="flex flex-wrap gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Space
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent variant="destructive">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Study Space</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "CS Study Hub"? This action cannot be undone. 
                    All members will be removed and chat history will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    Delete Space
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary">
                  <LogOut className="w-4 h-4 mr-2" />
                  Leave Campus
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Leave Campus Network</AlertDialogTitle>
                  <AlertDialogDescription>
                    You're about to leave your campus network. You'll need to re-verify your 
                    student status to rejoin. Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay Connected</AlertDialogCancel>
                  <AlertDialogAction variant="primary">
                    Leave Campus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="accent">
                  <Settings className="w-4 h-4 mr-2" />
                  Reset Settings
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent variant="success">
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Campus Settings</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset your campus preferences, notification settings, and space memberships 
                    to their default values. Your profile and connection history will remain unchanged.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Settings</AlertDialogCancel>
                  <AlertDialogAction variant="accent">
                    Reset to Defaults
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Campus Use Cases */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Campus Scenarios</h2>
          
          <div className="space-y-4">
            <Alert variant="success">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <AlertTitle>Ritual Completed!</AlertTitle>
                  <AlertDescription>
                    You've successfully completed the "Weekly Campus Energy" ritual. 
                    Your participation helps build campus community spirit.
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <Alert variant="info">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <AlertTitle>New Space Available</AlertTitle>
                  <AlertDescription>
                    "Machine Learning Study Group" is now accepting members. 
                    Join 23 other CS students exploring neural networks and deep learning.
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <Alert variant="warning">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <div>
                  <AlertTitle>Campus Energy Low</AlertTitle>
                  <AlertDescription>
                    Activity levels are below average today. Consider starting a study session 
                    or organizing a campus event to boost community engagement.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AlertDialogVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Alert Dialog Variants</h1>
          <p className="text-white/60">Different styles for different actions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Default Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" className="w-full">
                Default Dialog
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                <AlertDialogDescription>
                  This is a standard confirmation dialog with default styling.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Destructive Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Destructive Dialog
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="destructive">
              <AlertDialogHeader>
                <AlertDialogTitle>Dangerous Action</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is destructive and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Success Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="accent" className="w-full">
                Success Dialog
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="success">
              <AlertDialogHeader>
                <AlertDialogTitle>Positive Action</AlertDialogTitle>
                <AlertDialogDescription>
                  This dialog has a success variant with gold accent styling.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Maybe Later</AlertDialogCancel>
                <AlertDialogAction variant="accent">
                  Complete Action
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Single Action Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-full">
                Single Action
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Information</AlertDialogTitle>
                <AlertDialogDescription>
                  This is an informational dialog with only one action.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Got it</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  ),
};