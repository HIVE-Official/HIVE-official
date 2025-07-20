import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components';

const meta: Meta<typeof Tabs> = {
  title: '03-UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Overview Content</h3>
          <p className="text-sm text-muted-foreground">
            Here's an overview of your dashboard metrics and activity.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Detailed analytics and insights about your data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate and view comprehensive reports.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};