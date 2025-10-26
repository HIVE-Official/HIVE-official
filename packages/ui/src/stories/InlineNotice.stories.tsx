// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { InlineNotice, Button } from "../index";

const meta: Meta = { title: "Molecules/InlineNotice" };
export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => (
    <div className="space-y-3">
      <InlineNotice heading="Heads up" variant="neutral">This is a neutral message.</InlineNotice>
      <InlineNotice heading="Information" variant="info">Here’s some context for your task.</InlineNotice>
      <InlineNotice heading="Success" variant="success">Everything looks good.</InlineNotice>
      <InlineNotice heading="Warning" variant="warning">Double-check your selections.</InlineNotice>
      <InlineNotice heading="Error" variant="destructive" action={<Button size="sm" variant="outline">Retry</Button>}>
        Something went wrong.
      </InlineNotice>
    </div>
  )
};
