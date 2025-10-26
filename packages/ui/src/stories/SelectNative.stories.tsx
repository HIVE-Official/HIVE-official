// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { SelectNative, type SelectNativeProps } from "../index";

const meta: Meta<SelectNativeProps> = {
  title: "Atoms/SelectNative",
  parameters: { layout: "centered" }
};

export default meta;

type Story = StoryObj<SelectNativeProps>;

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="">Select an option</option>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </>
    )
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <option value="">Disabled select</option>
        <option value="x">Item X</option>
      </>
    )
  }
};

