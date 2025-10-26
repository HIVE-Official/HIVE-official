// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../index";

const meta: Meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  args: {
    className: "h-12 w-64"
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const ProfilePlaceholder: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
};
