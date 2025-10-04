import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "../../atomic/atoms/scroll-area";

const meta = {
  title: "11-Shared/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border border-border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-sm">
            This is line {i + 1} of scrollable content. Scroll down to see more.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border border-border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-[100px] w-[200px] shrink-0 rounded-md bg-muted" />
        ))}
      </div>
    </ScrollArea>
  ),
};
