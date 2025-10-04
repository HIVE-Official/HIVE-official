import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../../atomic/atoms/context-menu";

const meta = {
  title: "11-Shared/ContextMenu",
  component: ContextMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-border text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuItem>Cut</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
