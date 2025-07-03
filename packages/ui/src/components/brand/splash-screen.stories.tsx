import type { Meta, StoryObj } from '@storybook/react';
import { SplashScreen } from './splash-screen';

const meta: Meta<typeof SplashScreen> = {
  title: 'Brand/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {
  args: {},
};

export const CustomTagline: Story = {
  args: {
    tagline: 'Your Community Awaits.',
  },
}; 