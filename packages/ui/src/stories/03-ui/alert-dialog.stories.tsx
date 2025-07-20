import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '../../components/ui/alert-dialog';
import { HiveButton } from '../../components/hive-button';

const meta: Meta<typeof AlertDialog> = {
  title: '03-UI/Alert Dialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Modal dialog for important confirmations and alerts**

Alert dialog component for critical user decisions with HIVE's premium styling. Used for destructive actions, important confirmations, and system alerts.

## When to Use
- Destructive actions (delete tool, leave space)
- Important confirmations (publish tool, activate space)
- System alerts and warnings
- Critical user decisions that need focus

## Design Principles
- **Clear Intent**: Obvious action outcomes with clear language
- **Premium Feel**: HIVE's matte obsidian glass aesthetic
- **Focused Interaction**: Blocks other actions until resolved
- **Campus Context**: Messages relevant to university platform usage

## Dialog Types
- **Destructive**: Red accent for dangerous actions
- **Warning**: Yellow accent for caution
- **Info**: Blue accent for information
- **Success**: Green accent for positive confirmations

## Accessibility
- WCAG 2.1 AA compliant modal behavior
- Focus trap within dialog
- Screen reader friendly content structure
- Escape key to cancel/close
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning'],
      description: 'Alert dialog style variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HiveButton>Show Dialog</HiveButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};

export const DeleteTool: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HiveButton variant="destructive">Delete Tool</HiveButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "Study Timer Pro"?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your tool and remove it from all Spaces where it's planted. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Tool</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete Tool</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};

export const LeaveSpace: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HiveButton variant="outline">Leave Space</HiveButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave Computer Science Space?</AlertDialogTitle>
          <AlertDialogDescription>
            You'll lose access to Space tools, discussions, and events. You can rejoin later, 
            but your activity history in this Space will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay in Space</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Leave Space</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};

export const PublishTool: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HiveButton>Publish Tool</HiveButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish "GPA Calculator" to Computer Science Space?</AlertDialogTitle>
          <AlertDialogDescription>
            This will make your tool available to all 2,156 members of the Computer Science Space. 
            You can unpublish it later, but usage analytics will be shared with the community.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Private</AlertDialogCancel>
          <AlertDialogAction>Publish Tool</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};

export const SystemAlert: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HiveButton variant="outline">System Alert</HiveButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>🔄 New Elements Available</AlertDialogTitle>
          <AlertDialogDescription>
            This week's Element drop includes 3 new components: Advanced Chart, PDF Generator, and Voice Recorder. 
            Update your tools in HiveLAB to access these new capabilities.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Later</AlertDialogCancel>
          <AlertDialogAction>Open HiveLAB</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};

export const UnsavedChanges: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HiveButton variant="outline">Exit Builder</HiveButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>⚠️ Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes to your tool. If you leave now, your progress will be lost. 
            Would you like to save your work first?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Editing</AlertDialogCancel>
          <AlertDialogAction variant="outline">Exit Without Saving</AlertDialogAction>
          <AlertDialogAction>Save & Exit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};

export const SpaceActivation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HiveButton>Activate Space</HiveButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>🚀 Ready to Activate "Engineering" Space?</AlertDialogTitle>
          <AlertDialogDescription>
            This will make the Engineering Space discoverable to all verified Stanford students. 
            As the Space Builder, you'll be responsible for moderating content and managing the community.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not Yet</AlertDialogCancel>
          <AlertDialogAction>Activate Space</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};

export const InteractiveDemo: Story = {
  render: () => {
    const [result, setResult] = useState('');

    return (
      <div className="space-y-4">
        <div className="text-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <HiveButton>Interactive Demo</HiveButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Test Alert Dialog</AlertDialogTitle>
                <AlertDialogDescription>
                  Click an action below to see the result displayed outside the dialog.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setResult('User cancelled')}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => setResult('User confirmed')}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        {result && (
          <div className="text-center p-4 bg-hive-background-card border border-hive-border rounded-lg">
            <div className="text-sm text-hive-foreground-muted">Result:</div>
            <div className="font-medium">{result}</div>
          </div>
        )}
      </div>
    );
  }
};