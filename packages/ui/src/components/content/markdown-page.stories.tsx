import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownPage } from "./markdown-page";

const meta: Meta<typeof MarkdownPage> = {
  title: "Global/Content/MarkdownPage",
  component: MarkdownPage,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MarkdownPage>;

const sampleContent = `
# The Hive Platform: A Manifesto

This is a **bold statement** about our vision for a new kind of social platform. We believe in connecting students through shared experiences, not just shared connections.

## Core Principles

1.  **Rituals over Routines:** We encourage structured, meaningful interactions.
2.  **Campus as a Garden:** Cultivate your local community, both online and off.
3.  **Creative Tools for All:** Empowering students to build and share.

### Our Technology

We use modern, robust technologies to deliver a seamless experience.

- Next.js & React
- Firebase for our backend
- Tailwind CSS for styling

[Learn More About HIVE](https://hive.com)

---

> "The future of social is local, creative, and authentic." - The HIVE Team
`;

export const Default: Story = {
  args: {
    content: sampleContent,
  },
};

export const CustomStyled: Story = {
  args: {
    content: sampleContent,
    className: "prose-xl mx-auto p-8 bg-surface-02 rounded-lg",
  },
};
