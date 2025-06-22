import type { Meta, StoryObj } from "@storybook/react";
import { Heading, Text, Eyebrow } from "../ui/typography";

const meta: Meta<typeof Heading> = {
  title: "Foundation/Typography",
  component: Heading,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Eyebrow>Eyebrow label</Eyebrow>
      <Heading level={1}>Heading 1 – The quick brown fox</Heading>
      <Heading level={2}>Heading 2 – Jumps over lazy dog</Heading>
      <Heading level={3}>Heading 3 – Quick brown fox</Heading>
      <Heading level={4}>Heading 4 – Quick brown fox</Heading>
      <Heading level={5}>Heading 5 – Quick brown fox</Heading>
      <Heading level={6}>Heading 6 – Quick brown fox</Heading>
      <Text size="xl">
        XL Body – Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text size="lg">
        Large Body – Sed do eiusmod tempor incididunt ut labore et dolore.
      </Text>
      <Text>
        Medium Body – Ut enim ad minim veniam, quis nostrud exercitation.
      </Text>
      <Text size="sm">
        Small Body – Duis aute irure dolor in reprehenderit in voluptate.
      </Text>
    </div>
  ),
};
