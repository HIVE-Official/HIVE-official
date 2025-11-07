import type { Meta, StoryObj } from '@storybook/react';
import { HiveCard, HiveCardContent, HiveCardDescription, HiveCardHeader, HiveCardTitle } from './hive-card';
import { Users, Activity, Database, AlertTriangle } from 'lucide-react';
import { Badge } from './badge';

const meta: Meta<typeof HiveCard> = {
  title: 'HIVE/Atoms/HiveCard',
  component: HiveCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Admin dashboard cards for displaying system metrics and information.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicHiveCard: Story = {
  render: () => (
    <HiveCard className="w-80">
      <HiveCardHeader>
        <HiveCardTitle>Basic HiveCard</HiveCardTitle>
        <HiveCardDescription>This is a basic card component.</HiveCardDescription>
      </HiveCardHeader>
      <HiveCardContent>
        <p>HiveCard content goes here.</p>
      </HiveCardContent>
    </HiveCard>
  ),
};

export const AdminMetricHiveCard: Story = {
  render: () => (
    <HiveCard className="w-80">
      <HiveCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <HiveCardTitle className="text-sm font-medium">Total Users</HiveCardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </HiveCardHeader>
      <HiveCardContent>
        <div className="text-2xl font-bold">2,847</div>
        <p className="text-xs text-muted-foreground">
          +15% from last month
        </p>
      </HiveCardContent>
    </HiveCard>
  ),
};

export const SystemStatusHiveCard: Story = {
  render: () => (
    <HiveCard className="w-80">
      <HiveCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <HiveCardTitle className="text-sm font-medium">System Status</HiveCardTitle>
        <Database className="h-4 w-4 text-muted-foreground" />
      </HiveCardHeader>
      <HiveCardContent>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm font-medium">Healthy</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Uptime: 99.9%
        </p>
      </HiveCardContent>
    </HiveCard>
  ),
};

export const AlertHiveCard: Story = {
  render: () => (
    <HiveCard className="w-80 border-red-500/30 bg-red-500/10">
      <HiveCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <HiveCardTitle className="text-sm font-medium">Critical Alerts</HiveCardTitle>
        <AlertTriangle className="h-4 w-4 text-red-500" />
      </HiveCardHeader>
      <HiveCardContent>
        <div className="text-2xl font-bold text-red-500">3</div>
        <p className="text-xs text-red-400">
          Require immediate attention
        </p>
      </HiveCardContent>
    </HiveCard>
  ),
};

export const AdminDashboard: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <HiveCard>
        <HiveCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <HiveCardTitle className="text-sm font-medium">Total Users</HiveCardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </HiveCardHeader>
        <HiveCardContent>
          <div className="text-2xl font-bold">2,847</div>
          <p className="text-xs text-muted-foreground">
            1,420 active • 1,427 inactive
          </p>
        </HiveCardContent>
      </HiveCard>

      <HiveCard>
        <HiveCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <HiveCardTitle className="text-sm font-medium">Active Spaces</HiveCardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </HiveCardHeader>
        <HiveCardContent>
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-muted-foreground">
            87% activation rate
          </p>
        </HiveCardContent>
      </HiveCard>

      <HiveCard>
        <HiveCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <HiveCardTitle className="text-sm font-medium">System Health</HiveCardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </HiveCardHeader>
        <HiveCardContent>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium">Operational</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All systems running
          </p>
        </HiveCardContent>
      </HiveCard>

      <HiveCard className="border-yellow-500/30 bg-yellow-500/10">
        <HiveCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <HiveCardTitle className="text-sm font-medium">Pending Reviews</HiveCardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </HiveCardHeader>
        <HiveCardContent>
          <div className="text-2xl font-bold text-yellow-500">12</div>
          <p className="text-xs text-yellow-400">
            Content moderation queue
          </p>
        </HiveCardContent>
      </HiveCard>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete admin dashboard metrics overview showing system health and key statistics.',
      },
    },
  },
};