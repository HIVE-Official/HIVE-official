import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from '../../components/shell/app-shell';

const meta: Meta<typeof AppShell> = {
  title: '05-Shell/Simple Shell Test',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Simple test of basic shell functionality without complex dependencies'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
  id: '1',
  name: 'Jacob Smith',
  handle: 'jacob_smith',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  builderStatus: 'active' as const,
};

export const BasicShellTest: Story = {
  args: {
    user: mockUser,
    currentSection: 'profile',
    layoutType: 'dashboard',
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-4">
          Basic Shell Test
        </h1>
        <p className="text-gray-300">
          This is a simple test to verify the basic shell component works in Storybook.
        </p>
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-semibold text-white mb-2">Shell Features</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Header navigation</li>
            <li>• Sidebar menu</li>
            <li>• User context</li>
            <li>• Layout structure</li>
          </ul>
        </div>
      </div>
    ),
  },
};