import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text, Muted } from './Typography';
import { Stack } from './Stack';

const meta: Meta<typeof Text> = {
  title: 'Components/Typography',
  component: Text,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  render: () => (
    <Stack>
      <Heading level={1}>Display 1 (H1)</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Text>
        This is a paragraph of body text. It uses the Inter font and is designed for maximum readability.
        The quick brown fox jumps over the lazy dog.
      </Text>
      <Muted>This is muted text, for captions and less important information.</Muted>
    </Stack>
  ),
}; 