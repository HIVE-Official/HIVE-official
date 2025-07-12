import type { Meta, StoryObj } from '@storybook/react';
import { MinimalCard } from '../../components/visual-improvements/card-options';

const meta = {
  title: 'Visual Improvements/Card Test',
  component: MinimalCard,
  tags: ['autodocs'],
} satisfies Meta<typeof MinimalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleCard: Story = {
  render: () => (
    <div className="bg-black text-white p-8">
      <MinimalCard variant="default" padding="md">
        <h3 className="font-semibold mb-2">Simple Test Card</h3>
        <p className="text-white/80 text-sm">
          This is a simple test to verify the card component works.
        </p>
      </MinimalCard>
    </div>
  ),
};