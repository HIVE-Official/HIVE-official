import type { Meta, StoryObj } from "@storybook/react"
import { User } from "lucide-react"
import { Avatar } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    status: {
      control: { type: "select" },
      options: ["online", "offline", undefined],
    },
    src: {
      control: { type: "text" },
    },
    fallback: {
      control: { type: "text" },
    },
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "#0A0A0A" }],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    size: "md",
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
  args: {
    ...Default.args,
  },
}

export const Fallback: Story = {
  args: {
    size: "md",
    src: "https://broken.link/to.image.png",
    alt: "HIVE User",
    fallback: "HU",
  },
}

export const FallbackWithIcon: Story = {
  args: {
    ...Fallback.args,
    fallback: <User className="h-5 w-5" />,
  },
}

export const OnlineStatus: Story = {
  args: {
    ...Default.args,
    status: "online",
  },
}

export const AllStatuses: Story = {
  render: (args) => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Avatar {...args} status="online" />
        <span className="text-xs text-muted">Online</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar {...args} status="offline" />
        <span className="text-xs text-muted">Offline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar {...args} />
        <span className="text-xs text-muted">No Status</span>
      </div>
    </div>
  ),
  args: {
    ...Default.args,
  },
} 