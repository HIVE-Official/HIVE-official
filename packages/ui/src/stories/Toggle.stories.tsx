// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Toggle } from "../index";
import { Bold, Italic, Underline } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Command-button toggle with Hive gold selected state and smooth motion."
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: (args) => {
    const [{ pressed }, updateArgs] = useArgs();
    return (
      <Toggle
        {...args}
        pressed={pressed ?? false}
        onPressedChange={(next) => updateArgs({ pressed: next })}
      >
        Bold
      </Toggle>
    );
  }
};

export const WithIcon: Story = {
  render: () => {
    const [{ bold }, updateArgs] = useArgs();
    return (
      <div className="flex items-center gap-2">
        <Toggle pressed={bold === "bold"} onPressedChange={(state) => updateArgs({ bold: state ? "bold" : undefined })}>
          <Bold />
        </Toggle>
        <Toggle pressed={bold === "italic"} onPressedChange={(state) => updateArgs({ bold: state ? "italic" : undefined })}>
          <Italic />
        </Toggle>
        <Toggle pressed={bold === "underline"} onPressedChange={(state) => updateArgs({ bold: state ? "underline" : undefined })}>
          <Underline />
        </Toggle>
      </div>
    );
  }
};

export const OutlineVariant: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Toggle {...args} pressed>
      Outline
    </Toggle>
  )
};

export const Disabled: Story = {
  render: () => (
    <Toggle disabled pressed>
      Disabled
    </Toggle>
  )
};
