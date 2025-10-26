// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../index";

import type { ComponentProps } from "react";

type AccordionProps = ComponentProps<typeof Accordion>;

const meta: Meta<typeof Accordion> = {
  title: "Molecules/Accordion",
  component: Accordion,
  args: {
    type: "single",
    collapsible: true
  },
  parameters: {
    layout: "centered",
    controls: { exclude: ["children"] }
  }
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args: AccordionProps) => (
    <div className="w-full max-w-md">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>What makes this accordion production-ready?</AccordionTrigger>
          <AccordionContent>
            Our Radix-backed primitive uses semantic markup, keyboard interactions, and the
            token-driven animation system for smooth transitions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I theme it with Tailwind tokens?</AccordionTrigger>
          <AccordionContent>
            Yes. It consumes the design tokens exposed in `@hive/tokens`, so Storybook previews
            match the application runtime.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Does it support multiple open items?</AccordionTrigger>
          <AccordionContent>
            Switch the `type` control to `"multiple"` and the component immediately adapts without
            code changes, showcasing enterprise-ready flexibility.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};
