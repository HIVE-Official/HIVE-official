import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from '../../components/shell/app-shell';

const meta: Meta<typeof AppShell> = {
  title: '11-Shell/App Shell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main application shell providing layout structure and navigation.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Hive</h1>
        <p className="text-muted-foreground">
          This is the main content area within the app shell.
        </p>
      </div>
    ),
  },
};

export const WithSidebar: Story = {
  args: {
    showSidebar: true,
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Metric 1</h3>
            <p className="text-2xl font-bold">123</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Metric 2</h3>
            <p className="text-2xl font-bold">456</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Metric 3</h3>
            <p className="text-2xl font-bold">789</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    ),
  },
};