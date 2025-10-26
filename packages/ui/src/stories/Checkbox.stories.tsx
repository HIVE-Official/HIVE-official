// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Checkbox } from "../index";

const meta: Meta = {
  title: "Atoms/Checkbox",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Circle checkbox with Hive gold states and smooth transitions."
      }
    }
  }
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <Checkbox
        checked={!!checked}
        onCheckedChange={(state) => updateArgs({ checked: state })}
        label="Join the buildlist"
        description="We’ll keep you posted on onboarding progress."
      />
    );
  }
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" as const },
  render: () => {
    const [{ checked = "indeterminate" }, updateArgs] = useArgs();
    return (
      <Checkbox
        checked={checked}
        onCheckedChange={() => {
          const next = checked === "indeterminate" ? true : checked === true ? false : "indeterminate";
          updateArgs({ checked: next });
        }}
        label="Select sub-tasks"
        description="Tap repeatedly to cycle through states."
      />
    );
  }
};

export const Disabled: Story = {
  render: () => (
    <Checkbox
      disabled
      label="Verification required"
      description="Available after campus email verification."
    />
  )
};

export const Checklist: Story = {
  render: () => (
    <div className="divide-y divide-border rounded-3xl border border-border/70 bg-card/50">
      {["Write proposal", "Review with team", "Submit"].map((label, i) => (
        <div key={label} className="flex items-center gap-3 p-4">
          <Checkbox defaultChecked={i === 0} label={label} />
        </div>
      ))}
    </div>
  )
};
