import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../atomic/atoms/collapsible";
import { Button } from "../../atomic/atoms/button";
import { useState } from "react";

const meta = {
  title: "11-Shared/Collapsible",
  component: Collapsible,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px]">
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2 space-y-2">
          {["@radix-ui/primitives", "@radix-ui/colors", "@stitches/react"].map((repo) => (
            <div key={repo} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm">{repo}</div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const FAQ: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      {[
        { q: "What is HIVE?", a: "HIVE is a campus-focused social platform for university students." },
        { q: "How do I join?", a: "Sign up with your university email address to get started." },
        { q: "Is it free?", a: "Yes, HIVE is completely free for all students." },
      ].map((faq) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
          <Collapsible key={faq.q} open={isOpen} onOpenChange={setIsOpen}>
            <div className="rounded-lg border border-border bg-card">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left transition-smooth ease-liquid hover:bg-accent">
                <h4 className="font-medium">{faq.q}</h4>
                <svg className="h-4 w-4 transition-smooth ease-liquid" style={{ transform: isOpen ? "rotate(180deg)" : "" }} fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</CollapsibleContent>
            </div>
          </Collapsible>
        );
      })}
    </div>
  ),
  parameters: { layout: "padded" },
};
