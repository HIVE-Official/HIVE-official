import type { Meta, StoryObj } from '@storybook/react';
import { HiveMenu } from '../../components/hive-menu';

const meta: Meta<typeof HiveMenu> = {
  title: '04-Hive/HiveMenu',
  component: HiveMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Menu component for campus-first dropdown menus and contextual actions.',
      },
    },
  },
  argTypes: {
    trigger: {
      control: 'text',
      description: 'The trigger element for the menu',
    },
    position: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Student profile menu
export const StudentProfile: Story = {
  args: {
    trigger: '👤 Alex Chen',
    items: [
      { label: '👤 View Profile', action: () => console.log('View profile') },
      { label: '⚙️ Settings', action: () => console.log('Settings') },
      { label: '📊 Academic Progress', action: () => console.log('Academic progress') },
      { type: 'separator' },
      { label: '🔔 Notifications', action: () => console.log('Notifications'), badge: '3' },
      { label: '📚 My Courses', action: () => console.log('My courses') },
      { type: 'separator' },
      { label: '🚪 Sign Out', action: () => console.log('Sign out'), destructive: true },
    ],
  },
};

// Course actions menu
export const CourseActions: Story = {
  args: {
    trigger: '⋯ CS 101 Actions',
    size: 'sm',
    items: [
      { label: '📝 View Syllabus', action: () => console.log('View syllabus') },
      { label: '📊 Check Grades', action: () => console.log('Check grades') },
      { label: '💬 Discussion Board', action: () => console.log('Discussion board') },
      { type: 'separator' },
      { label: '👥 Study Group', action: () => console.log('Study group') },
      { label: '📅 Office Hours', action: () => console.log('Office hours') },
      { type: 'separator' },
      { label: '🔔 Enable Notifications', action: () => console.log('Enable notifications') },
      { label: '❌ Drop Course', action: () => console.log('Drop course'), destructive: true },
    ],
  },
};

// Campus navigation menu
export const CampusNavigation: Story = {
  args: {
    trigger: '🗺️ Campus',
    position: 'bottom-start',
    items: [
      { label: '🏢 Academic Buildings', action: () => console.log('Academic buildings') },
      { label: '🏠 Residence Halls', action: () => console.log('Residence halls') },
      { label: '🍽️ Dining Locations', action: () => console.log('Dining locations') },
      { type: 'separator' },
      { label: '📚 Libraries', action: () => console.log('Libraries') },
      { label: '🏋️ Recreation Centers', action: () => console.log('Recreation centers') },
      { label: '🚌 Transportation', action: () => console.log('Transportation') },
      { type: 'separator' },
      { label: '🚨 Emergency Services', action: () => console.log('Emergency services') },
    ],
  },
};

// Quick actions menu
export const QuickActions: Story = {
  args: {
    trigger: '⚡ Quick Actions',
    size: 'lg',
    position: 'bottom-end',
    items: [
      { label: '📝 Create Study Group', action: () => console.log('Create study group'), icon: '➕' },
      { label: '📅 Schedule Event', action: () => console.log('Schedule event'), icon: '📅' },
      { label: '🛠️ Deploy Tool', action: () => console.log('Deploy tool'), icon: '🚀' },
      { type: 'separator' },
      { label: '💬 Start Discussion', action: () => console.log('Start discussion'), icon: '💭' },
      { label: '📊 View Analytics', action: () => console.log('View analytics'), icon: '📈' },
      { type: 'separator' },
      { label: '❓ Help & Support', action: () => console.log('Help & support'), icon: '❓' },
    ],
  },
};

// Event management menu
export const EventManagement: Story = {
  args: {
    trigger: '🎯 Manage Event',
    items: [
      { label: '✏️ Edit Details', action: () => console.log('Edit details') },
      { label: '👥 Manage Attendees', action: () => console.log('Manage attendees'), badge: '24' },
      { label: '📧 Send Updates', action: () => console.log('Send updates') },
      { type: 'separator' },
      { label: '📊 View Analytics', action: () => console.log('View analytics') },
      { label: '📋 Export Data', action: () => console.log('Export data') },
      { type: 'separator' },
      { label: '🗂️ Archive Event', action: () => console.log('Archive event') },
      { label: '🗑️ Delete Event', action: () => console.log('Delete event'), destructive: true },
    ],
  },
};

// Tool builder menu
export const ToolBuilder: Story = {
  args: {
    trigger: '🛠️ Tool Options',
    position: 'top-start',
    items: [
      { label: '💾 Save Draft', action: () => console.log('Save draft') },
      { label: '👁️ Preview', action: () => console.log('Preview') },
      { label: '🚀 Deploy', action: () => console.log('Deploy'), highlight: true },
      { type: 'separator' },
      { label: '📋 Duplicate', action: () => console.log('Duplicate') },
      { label: '📤 Export', action: () => console.log('Export') },
      { label: '📥 Import Template', action: () => console.log('Import template') },
      { type: 'separator' },
      { label: '🔄 Version History', action: () => console.log('Version history') },
      { label: '🗑️ Delete', action: () => console.log('Delete'), destructive: true },
    ],
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <HiveMenu
        trigger="Small Menu"
        size="sm"
        items={[
          { label: 'Option 1', action: () => console.log('Option 1') },
          { label: 'Option 2', action: () => console.log('Option 2') },
        ]}
      />
      <HiveMenu
        trigger="Medium Menu"
        size="md"
        items={[
          { label: 'Option 1', action: () => console.log('Option 1') },
          { label: 'Option 2', action: () => console.log('Option 2') },
        ]}
      />
      <HiveMenu
        trigger="Large Menu"
        size="lg"
        items={[
          { label: 'Option 1', action: () => console.log('Option 1') },
          { label: 'Option 2', action: () => console.log('Option 2') },
        ]}
      />
    </div>
  ),
};

// Different positions
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <HiveMenu
        trigger="Bottom Start"
        position="bottom-start"
        items={[
          { label: 'Option 1', action: () => console.log('Option 1') },
          { label: 'Option 2', action: () => console.log('Option 2') },
          { label: 'Option 3', action: () => console.log('Option 3') },
        ]}
      />
      <HiveMenu
        trigger="Bottom End"
        position="bottom-end"
        items={[
          { label: 'Option 1', action: () => console.log('Option 1') },
          { label: 'Option 2', action: () => console.log('Option 2') },
          { label: 'Option 3', action: () => console.log('Option 3') },
        ]}
      />
      <HiveMenu
        trigger="Top Start"
        position="top-start"
        items={[
          { label: 'Option 1', action: () => console.log('Option 1') },
          { label: 'Option 2', action: () => console.log('Option 2') },
          { label: 'Option 3', action: () => console.log('Option 3') },
        ]}
      />
      <HiveMenu
        trigger="Top End"
        position="top-end"
        items={[
          { label: 'Option 1', action: () => console.log('Option 1') },
          { label: 'Option 2', action: () => console.log('Option 2') },
          { label: 'Option 3', action: () => console.log('Option 3') },
        ]}
      />
    </div>
  ),
};

// Campus-specific use cases
export const CampusUseCases: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
      <div className="space-y-4">
        <h3 className="font-semibold text-hive-neutral-800">Academic Menus</h3>
        <div className="flex flex-col gap-3">
          <HiveMenu
            trigger="📚 My Courses"
            items={[
              { label: 'CS 101 - Programming', action: () => console.log('CS 101') },
              { label: 'MATH 201 - Calculus', action: () => console.log('MATH 201') },
              { label: 'ENG 102 - Composition', action: () => console.log('ENG 102') },
              { type: 'separator' },
              { label: '➕ Add Course', action: () => console.log('Add course') },
            ]}
          />
          <HiveMenu
            trigger="🎓 Academic Tools"
            items={[
              { label: '📊 GPA Calculator', action: () => console.log('GPA Calculator') },
              { label: '📅 Class Scheduler', action: () => console.log('Class Scheduler') },
              { label: '📝 Assignment Tracker', action: () => console.log('Assignment Tracker') },
            ]}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-hive-neutral-800">Social Menus</h3>
        <div className="flex flex-col gap-3">
          <HiveMenu
            trigger="👥 My Groups"
            items={[
              { label: 'CS Study Group', action: () => console.log('CS Study Group'), badge: '5' },
              { label: 'Intramural Soccer', action: () => console.log('Soccer'), badge: '12' },
              { label: 'Photography Club', action: () => console.log('Photography') },
              { type: 'separator' },
              { label: '🔍 Find Groups', action: () => console.log('Find groups') },
            ]}
          />
          <HiveMenu
            trigger="🎉 Campus Events"
            items={[
              { label: 'Spring Formal', action: () => console.log('Spring Formal'), badge: 'RSVP' },
              { label: 'Career Fair', action: () => console.log('Career Fair') },
              { label: 'Study Break', action: () => console.log('Study Break') },
              { type: 'separator' },
              { label: '➕ Create Event', action: () => console.log('Create event') },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};