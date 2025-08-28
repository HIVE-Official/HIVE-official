import type { Meta, StoryObj } from '@storybook/react';
import { SimpleToolBuilder as ToolBuilder } from '../../../components/tools/simple-tool-builder';

const meta: Meta<typeof ToolBuilder> = {
  title: '🛠️ Tools/Builder/ToolBuilder',
  component: ToolBuilder,
  parameters: {
    docs: {
      description: {
        component: 'Simple tool creation interface for building campus utility tools.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolBuilder>;

export const Default: Story = {
  args: {
    spaceId: 'cs-department',
    spaceName: 'UB Computer Science',
  },
};

export const StudyGroupTool: Story = {
  name: 'Study Group Matcher',
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <ToolBuilder
        spaceId="cs-250-study"
        spaceName="CS 250 Study Group"
        prefilledConfig={{
          name: 'Study Group Matcher',
          description: 'Automatically match students based on availability and study preferences',
          category: 'Academic',
          elements: [
            {
              type: 'text-input',
              label: 'Your Name',
              placeholder: 'Enter your name',
              required: true,
            },
            {
              type: 'select',
              label: 'Available Times',
              options: ['Morning', 'Afternoon', 'Evening', 'Weekend'],
              multiple: true,
            },
            {
              type: 'text-input',
              label: 'Strengths',
              placeholder: 'What topics are you strong in?',
            },
            {
              type: 'text-input',
              label: 'Need Help With',
              placeholder: 'What topics do you need help with?',
            },
            {
              type: 'submit-button',
              label: 'Find My Study Partner',
            },
          ],
        }}
      />
    </div>
  ),
};

export const LaundryTracker: Story = {
  name: 'Dorm Laundry Tracker',
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <ToolBuilder
        spaceId="governors-5th"
        spaceName="Governors 5th Floor"
        prefilledConfig={{
          name: 'Laundry Status Tracker',
          description: 'Check washing machine and dryer availability in real-time',
          category: 'Dorm Life',
          elements: [
            {
              type: 'display-text',
              content: 'Current Machine Status',
              style: 'heading',
            },
            {
              type: 'status-grid',
              items: [
                { label: 'Washer 1', status: 'available', time: null },
                { label: 'Washer 2', status: 'in-use', time: '45 min remaining' },
                { label: 'Dryer 1', status: 'available', time: null },
                { label: 'Dryer 2', status: 'in-use', time: '30 min remaining' },
              ],
            },
            {
              type: 'notification-signup',
              label: 'Get notified when machines are free',
              placeholder: 'Your phone number',
            },
          ],
        }}
      />
    </div>
  ),
};

export const EventRSVP: Story = {
  name: 'Event RSVP Tool',
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <ToolBuilder
        spaceId="robotics-club"
        spaceName="UB Robotics Club"
        prefilledConfig={{
          name: 'Workshop RSVP System',
          description: 'Sign up for upcoming robotics workshops and track attendance',
          category: 'Events',
          elements: [
            {
              type: 'display-text',
              content: 'Arduino Programming Workshop',
              style: 'title',
            },
            {
              type: 'display-text',
              content: 'Saturday, March 15th • 2:00 PM - 5:00 PM • Davis Hall 101',
              style: 'subtitle',
            },
            {
              type: 'text-input',
              label: 'Full Name',
              placeholder: 'Enter your name',
              required: true,
            },
            {
              type: 'text-input',
              label: 'Email',
              placeholder: 'your.email@buffalo.edu',
              required: true,
            },
            {
              type: 'select',
              label: 'Experience Level',
              options: ['Beginner', 'Intermediate', 'Advanced'],
            },
            {
              type: 'checkbox',
              label: 'I have my own Arduino kit',
            },
            {
              type: 'submit-button',
              label: 'Reserve My Spot',
            },
          ],
        }}
      />
    </div>
  ),
};

export const CampusToolTemplates: Story = {
  name: 'Campus Tool Templates',
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Popular Campus Tool Templates</h2>
        <p className="text-gray-600 mb-6">Start with proven templates used by other UB students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-bold mb-2">Study Group Matcher</h3>
          <p className="text-sm text-gray-600 mb-3">Match students by schedule and study needs</p>
          <div className="text-xs text-gray-500">Used by 23 spaces</div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🧺</div>
          <h3 className="font-bold mb-2">Laundry Tracker</h3>
          <p className="text-sm text-gray-600 mb-3">Real-time washing machine availability</p>
          <div className="text-xs text-gray-500">Used by 8 dorm floors</div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🎫</div>
          <h3 className="font-bold mb-2">Event RSVP</h3>
          <p className="text-sm text-gray-600 mb-3">Collect signups for events and workshops</p>
          <div className="text-xs text-gray-500">Used by 15 clubs</div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🍕</div>
          <h3 className="font-bold mb-2">Food Order Coordinator</h3>
          <p className="text-sm text-gray-600 mb-3">Organize group food orders for better deals</p>
          <div className="text-xs text-gray-500">Used by 12 spaces</div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🚗</div>
          <h3 className="font-bold mb-2">Ride Share Board</h3>
          <p className="text-sm text-gray-600 mb-3">Share rides home for breaks and weekends</p>
          <div className="text-xs text-gray-500">Used by 6 spaces</div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-bold mb-2">Quick Survey</h3>
          <p className="text-sm text-gray-600 mb-3">Gather feedback and opinions quickly</p>
          <div className="text-xs text-gray-500">Used by 31 spaces</div>
        </div>
      </div>
    </div>
  ),
};