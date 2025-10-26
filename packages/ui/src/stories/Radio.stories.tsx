// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { RadioGroup, RadioGroupItem } from "../index";

const meta: Meta = {
  title: "Atoms/Radio",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Circle radio buttons styled with Hive gold accents and smooth transitions."
      }
    }
  }
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [{ value }, updateArgs] = useArgs();
    const current = (value as string) ?? "student";
    return (
      <RadioGroup value={current} onValueChange={(v) => updateArgs({ value: v })} className="grid gap-3">
        {[
          { label: "Student", value: "student", description: "Access student-run spaces" },
          { label: "Faculty", value: "faculty", description: "Advisor tools and reports" },
          { label: "Community", value: "community", description: "Guests and alumni" }
        ].map((opt) => (
          <label key={opt.value} className="flex items-start gap-3">
            <RadioGroupItem value={opt.value} id={`radio-${opt.value}`} />
            <span className="flex flex-col">
              <span className="font-medium text-foreground">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.description}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    );
  }
};

export const Inline: Story = {
  render: () => (
    <RadioGroup defaultValue="morning" className="flex items-center gap-6">
      {["Morning", "Afternoon", "Evening"].map((label) => (
        <label key={label} className="inline-flex cursor-pointer items-center gap-2">
          <RadioGroupItem value={label.toLowerCase()} />
          <span>{label}</span>
        </label>
      ))}
    </RadioGroup>
  )
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="yearly" className="grid gap-2 opacity-60" disabled>
      {["Monthly", "Yearly", "Lifetime"].map((label) => (
        <label key={label} className="flex items-center gap-3">
          <RadioGroupItem value={label.toLowerCase()} />
          <span>{label}</span>
        </label>
      ))}
    </RadioGroup>
  )
};
