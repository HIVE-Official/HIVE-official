/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomNavBar } from '../components/BottomNavBar';
import { Home, Compass, MessageSquare } from 'lucide-react';
import * as React from 'react';

const meta: Meta<typeof BottomNavBar.Root> = {
  title: 'UI/BottomNavBar',
  component: BottomNavBar.Root,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1A1A1A' },
        { name: 'light', value: '#F8F8F8' },
      ],
    },
  },
  subcomponents: {
    Content: BottomNavBar.Content,
    Item: BottomNavBar.Item,
    Icon: BottomNavBar.Icon,
    Label: BottomNavBar.Label,
    Indicator: BottomNavBar.Indicator,
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BottomNavBar.Root>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof BottomNavBar.Root>) => (
    <div style={{ height: '200px', position: 'relative', width: '100%' }}>
        <BottomNavBar.Root {...args}>
        <BottomNavBar.Content>
            <BottomNavBar.Item isActive>
                <BottomNavBar.Indicator />
                <BottomNavBar.Icon><Home /></BottomNavBar.Icon>
                <BottomNavBar.Label>Home</BottomNavBar.Label>
            </BottomNavBar.Item>
            <BottomNavBar.Item>
                <BottomNavBar.Icon><Compass /></BottomNavBar.Icon>
                <BottomNavBar.Label>Explore</BottomNavBar.Label>
            </BottomNavBar.Item>
            <BottomNavBar.Item>
                <BottomNavBar.Icon><MessageSquare /></BottomNavBar.Icon>
                <BottomNavBar.Label>Messages</BottomNavBar.Label>
            </BottomNavBar.Item>
        </BottomNavBar.Content>
        </BottomNavBar.Root>
    </div>
  ),
}; 