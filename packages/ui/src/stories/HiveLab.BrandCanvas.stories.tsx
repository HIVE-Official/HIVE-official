import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BrandCanvas } from "../organisms/hivelab";

const meta = {
  title: "Organisms/HiveLab/Canvas/BrandCanvas",
  parameters: { layout: "fullscreen" }
} satisfies Meta<typeof BrandCanvas>;

export default meta;

type Story = StoryObj<typeof BrandCanvas>;

export const Empty: Story = {
  render: () => <BrandCanvas />
};

export const WithPlaceholder: Story = {
  render: () => (
    <BrandCanvas>
      <div className="grid min-h-[520px] place-items-center rounded-2xl border border-dashed border-border/40 bg-card/60 text-muted-foreground">
        Canvas
      </div>
    </BrandCanvas>
  )
};
