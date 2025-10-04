import type { Meta, StoryObj } from "@storybook/react";
import { NavigationShell } from "../../atomic/organisms/navigation-shell";

const meta = {
  title: "08-Navigation/TestSimple",
  component: NavigationShell,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavigationShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
  args: {
    currentUserName: "Test User",
    currentUserHandle: "@test",
    links: [{ label: "Test", href: "/test" }],
    children: <div>Test content</div>,
  },
};
