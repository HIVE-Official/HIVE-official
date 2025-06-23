import type { Meta, StoryObj } from '@storybook/react'
import { SpaceHeader } from '@/components/spaces/SpaceHeader'

const meta: Meta<typeof SpaceHeader> = {
  title: 'Components/Spaces/SpaceHeader',
  component: SpaceHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    spaceName: { control: 'text' },
    avatarUrl: { control: 'text' },
    bannerUrl: { control: 'text' },
    memberCount: { control: 'number' },
    membershipStatus: {
      control: 'radio',
      options: ['member', 'admin', 'not_member'],
    },
    isLoading: { control: 'boolean' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SpaceHeader>

export const Default: Story = {
  args: {
    spaceName: 'Quantum Entanglement Club',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    memberCount: 1234,
    membershipStatus: 'not_member',
    isLoading: false,
    description:
      'A place to discuss the spooky action at a distance and other quantum phenomena.',
    bannerUrl: 'https://picsum.photos/seed/space-banner/1600/400',
  },
}

export const MemberView: Story = {
  args: {
    ...Default.args,
    membershipStatus: 'member',
  },
}

export const AdminView: Story = {
  args: {
    ...Default.args,
    membershipStatus: 'admin',
  },
}

export const NoBanner: Story = {
  args: {
    ...Default.args,
    bannerUrl: undefined,
  },
}

export const LongText: Story = {
  args: {
    ...Default.args,
    spaceName:
      'The International Interdisciplinary Consortium for the Advancement of Extremely Long and Unwieldy Space Names',
    description:
      'This is a very, very, very long description designed to test how the component handles text wrapping, truncation, and overall layout when faced with a significant amount of content. We need to ensure that it remains visually appealing and functional across all screen sizes, from mobile devices to large desktop monitors, without breaking the established design patterns or compromising readability. It just keeps going and going and going, much like a run-on sentence in a story about component development.',
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
} 