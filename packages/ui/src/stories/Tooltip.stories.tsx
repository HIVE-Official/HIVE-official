// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Button
} from "../index";

const meta: Meta = {
  title: "Atoms/Tooltip",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Hive tooltip with dark glass background and gold accent border."
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">What’s this?</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          Additional context appears on hover or focus.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};

export const FocusFirst: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Focus me</Button>
        </TooltipTrigger>
        <TooltipContent>Appears instantly on focus</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};

export const WithRichContent: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Details</Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs space-y-1">
            <div className="text-body-sm font-body-sm">Access rules</div>
            <div className="text-caption font-caption text-muted-foreground">Only members may invite others.</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};

export const ValidationTooltip: Story = {
  render: () => (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Invalid value</Button>
        </TooltipTrigger>
        <TooltipContent role="tooltip">Please enter a valid .edu email.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};
