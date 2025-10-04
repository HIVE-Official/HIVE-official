import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "../../atomic/atoms/aspect-ratio";

const meta = {
  title: "11-Shared/AspectRatio",
  component: AspectRatio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full items-center justify-center rounded-md bg-muted">16:9 Aspect Ratio</div>
      </AspectRatio>
    </div>
  ),
};

export const Image: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
        <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" alt="Photo" className="h-full w-full object-cover" />
      </AspectRatio>
    </div>
  ),
};

export const Ratios: Story = {
  render: () => (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      {[
        { ratio: 16 / 9, label: "16:9 (Video)" },
        { ratio: 4 / 3, label: "4:3 (Classic)" },
        { ratio: 1, label: "1:1 (Square)" },
        { ratio: 21 / 9, label: "21:9 (Ultrawide)" },
      ].map(({ ratio, label }) => (
        <div key={label} className="w-full">
          <p className="mb-2 text-sm text-muted-foreground">{label}</p>
          <AspectRatio ratio={ratio}>
            <div className="flex h-full items-center justify-center rounded-lg bg-muted text-sm">{label}</div>
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};
