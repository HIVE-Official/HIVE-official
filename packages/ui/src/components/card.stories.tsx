import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Stack } from '.';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    radius: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const Radii: Story = {
    render: (args) => (
        <Stack direction="row" gap={4}>
            <Card {...args} radius="sm"><CardTitle>Small</CardTitle></Card>
            <Card {...args} radius="default"><CardTitle>Default</CardTitle></Card>
            <Card {...args} radius="lg"><CardTitle>Large</CardTitle></Card>
            <Card {...args} radius="full"><CardTitle>Full</CardTitle></Card>
        </Stack>
    ),
}; 
