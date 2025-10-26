// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../index";
import { ArrowRight, Check } from "lucide-react";

const meta: Meta = {
  title: "Atoms/Button Motion",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Demonstrates Hover/Press motion specs for Hive buttons: Hover lift ±2px @ 0.16s, Gold ripple 0.48s, icon motion per btn-anim-icons, reduced-motion safe."
      }
    }
  }
};

export default meta;
type Story = StoryObj;

const Section = ({
  title,
  spec,
  children
}: {
  title: string;
  spec: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-3">
    <header className="space-y-1">
      <p className="text-sm uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{spec}</p>
    </header>
    <div className="flex flex-wrap items-center gap-4">{children}</div>
  </section>
);

export const MotionShowcase: Story = {
  render: () => (
    <div className="grid gap-10">
      <Section title="Primary gold CTA" spec="Hover: -1px lift · Press ripple 480ms · Icon drift 3px">
        <Button variant="gold" className="w-48 btn-anim-icons">
          Join Ritual <ArrowRight className="icon-motion-rotate" />
        </Button>
        <Button variant="gold" size="lg" className="w-56 btn-anim-icons">
          RSVP Now <Check className="icon-motion-pop" />
        </Button>
      </Section>
      <Section title="Secondary / Ghost" spec="button-hover utility · ±2px translate · 0.16s ease">
        <Button variant="secondary" className="button-hover w-40">
          Schedule
        </Button>
        <Button variant="ghost" className="button-hover w-32">
          Details
        </Button>
        <Button variant="outline" className="button-hover w-36">
          Share
        </Button>
      </Section>
      <Section title="Icon buttons" spec="pressable 120ms · icon-motion-pop 150ms">
        <Button variant="secondary" size="icon" className="button-hover btn-anim-icons">
          <ArrowRight className="icon-motion-pop" />
        </Button>
        <Button variant="ghost" size="icon" className="button-hover btn-anim-icons">
          <Check className="icon-motion-rotate" />
        </Button>
      </Section>
      <Section title="Loading / Disabled" spec="Press ripple suppressed; pointer-events none">
        <Button variant="gold" isLoading loadingText="Joining…" className="w-44" />
        <Button variant="secondary" disabled className="w-40">
          Disabled
        </Button>
      </Section>
    </div>
  )
};
