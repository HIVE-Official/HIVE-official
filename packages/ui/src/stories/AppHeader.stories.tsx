/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
 
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppHeader } from '../components/AppHeader';
import { Button } from '../components/button';
import { HiveLogo } from '../components/HiveLogo';
import * as React from 'react';

const meta: Meta<typeof AppHeader.Root> = {
  title: 'UI/AppHeader',
  component: AppHeader.Root,
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
    Content: AppHeader.Content,
    Logo: AppHeader.Logo,
    Nav: AppHeader.Nav,
    Actions: AppHeader.Actions,
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AppHeader.Root>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof AppHeader.Root>) => (
    <AppHeader.Root {...args}>
      <AppHeader.Content>
        <AppHeader.Logo>
          <HiveLogo />
          <span className="ml-2 font-bold">HIVE</span>
        </AppHeader.Logo>
        <AppHeader.Nav>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Feed</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Campus</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Spaces</a>
        </AppHeader.Nav>
        <AppHeader.Actions>
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
        </AppHeader.Actions>
      </AppHeader.Content>
    </AppHeader.Root>
  ),
}; 