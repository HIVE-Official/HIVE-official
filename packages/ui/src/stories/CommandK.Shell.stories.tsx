// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CommandK } from "../index";
import { getHiveNav } from "../organisms/nav-config";

const meta: Meta = {
  title: "Reference/CommandK — Shell Palette",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Press ⌘K / Ctrl+K to open the palette.</p>
      <CommandK navItems={getHiveNav(true)} />
    </div>
  )
};

