// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Heading, Text, Eyebrow } from "../index";

const meta: Meta = {
  title: "Atoms/Typography",
  parameters: { layout: "centered" }
};

export default meta;

type Story = StoryObj;

export const Roles: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl text-foreground">
      <Eyebrow>Section Label</Eyebrow>
      <Heading level="display">Display Heading</Heading>
      <Heading level="h1">Heading 1</Heading>
      <Heading level="h2">Heading 2</Heading>
      <Heading level="h3">Heading 3</Heading>
      <Heading level="h4">Heading 4</Heading>
      <Text variant="body">Body text — default role for copy.</Text>
      <Text variant="bodySm">Small body for dense UIs.</Text>
      <Text variant="caption">Caption for supportive notes.</Text>
      <Text variant="muted">Muted explanatory copy.</Text>
    </div>
  )
};

