import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../atomic/atoms/badge';

const meta: Meta<typeof Badge> = {
  title: '01-Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE badge component for status indicators, labels, and campus roles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'error', 'outline'],
      description: 'Badge variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const CampusRoles: Story = {
  render: () => (
    <div className="space-y-4 p-6">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-3">User Roles</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Student</Badge>
          <Badge variant="secondary">Builder</Badge>
          <Badge variant="success">Faculty</Badge>
          <Badge variant="warning">TA</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-3">Space Roles</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Leader</Badge>
          <Badge variant="secondary">Admin</Badge>
          <Badge variant="default">Member</Badge>
          <Badge variant="outline">Invited</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-3">Tool Status</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Published</Badge>
          <Badge variant="warning">Draft</Badge>
          <Badge variant="error">Deprecated</Badge>
          <Badge variant="outline">Beta</Badge>
        </div>
      </div>
    </div>
  ),
};