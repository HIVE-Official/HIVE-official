// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Switch } from "../index";

const meta: Meta = {
  title: "Atoms/Switch",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Toggle built on Hive gold/black/white tokens with smooth transitions."
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
      <label className="flex items-center gap-3">
        <Switch checked={checked ?? true} onCheckedChange={(state) => updateArgs({ checked: state })} />
        <span className="text-body-sm font-body-sm">Enable campus-wide alerts</span>
      </label>
    );
  }
};

export const Labeled: Story = {
  render: () => {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <div className="flex items-center gap-2">
        <span className="text-caption font-caption text-muted-foreground">Off</span>
        <Switch checked={checked ?? false} onCheckedChange={(state) => updateArgs({ checked: state })} aria-labelledby="switch-labeled" />
        <span id="switch-labeled" className="text-caption font-caption text-muted-foreground">
          On
        </span>
      </div>
    );
  }
};

export const Disabled: Story = {
  render: () => (
    <label className="flex items-center gap-3 opacity-60">
      <Switch disabled defaultChecked />
      <span className="text-body-sm font-body-sm">Auto-renew managed by admin</span>
    </label>
  )
};
