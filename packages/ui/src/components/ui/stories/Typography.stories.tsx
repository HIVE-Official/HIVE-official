import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// Typography showcase component
const Typography = () => {
  return (
    <div className="space-y-8 p-6 bg-background text-foreground">
      {/* Font Families Section */}
      <section className="space-y-4">
        <h2 className="text-h2 font-display text-accent mb-4">Font Families</h2>

        <div className="space-y-2">
          <div className="font-display text-h3">
            Space Grotesk Display - Headlines
          </div>
          <div className="font-sans text-body">Inter Sans - Body Text</div>
          <div className="font-mono text-code">JetBrains Mono - Code</div>
        </div>
      </section>

      {/* Color System Section */}
      <section className="space-y-4">
        <h2 className="text-h2 font-display text-accent mb-4">Color System</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-12 bg-background border border-border rounded"></div>
            <div className="text-caption">Background #0A0A0A</div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-12 bg-surface border border-border rounded"></div>
            <div className="text-caption">Surface #111111</div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-12 bg-accent border border-border rounded"></div>
            <div className="text-caption">Accent #FFD700</div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-12 bg-muted border border-border rounded"></div>
            <div className="text-caption">Muted</div>
          </div>
        </div>
      </section>

      {/* Typography Scale Section */}
      <section className="space-y-4">
        <h2 className="text-h2 font-display text-accent mb-4">
          Typography Scale
        </h2>

        <div className="space-y-4">
          <div>
            <div className="text-display font-display">Display Text (48px)</div>
            <div className="text-caption text-muted">
              Space Grotesk Variable, 600 weight
            </div>
          </div>

          <div>
            <div className="text-h1 font-display">Heading 1 (32px)</div>
            <div className="text-caption text-muted">
              Space Grotesk Variable, 600 weight
            </div>
          </div>

          <div>
            <div className="text-h2 font-display">Heading 2 (24px)</div>
            <div className="text-caption text-muted">
              Space Grotesk Variable, 600 weight
            </div>
          </div>

          <div>
            <div className="text-h3 font-display">Heading 3 (20px)</div>
            <div className="text-caption text-muted">
              Space Grotesk Variable, 600 weight
            </div>
          </div>

          <div>
            <div className="text-h4 font-display">Heading 4 (18px)</div>
            <div className="text-caption text-muted">
              Space Grotesk Variable, 600 weight
            </div>
          </div>

          <div>
            <div className="text-body font-sans">
              Body text (16px) - Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
            <div className="text-caption text-muted">Inter, 400 weight</div>
          </div>

          <div>
            <div className="text-body-sm font-sans">
              Body Small (14px) - Smaller body text for supporting content and
              captions.
            </div>
            <div className="text-caption text-muted">Inter, 400 weight</div>
          </div>

          <div>
            <div className="text-caption font-sans">
              Caption (12px) - Labels, metadata, micro-copy
            </div>
            <div className="text-caption text-muted">Inter, 400 weight</div>
          </div>

          <div>
            <div className="text-button font-sans font-medium">
              Button Text (14px)
            </div>
            <div className="text-caption text-muted">Inter, 500 weight</div>
          </div>

          <div>
            <div className="text-code font-mono">
              const code = &quot;JetBrains Mono (14px)&quot;;
            </div>
            <div className="text-caption text-muted">
              JetBrains Mono, 400 weight
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Elements */}
      <section className="space-y-4">
        <h2 className="text-h2 font-display text-accent mb-4">
          Interactive Elements
        </h2>

        <div className="space-y-4">
          <div className="text-body font-sans">
            This is a paragraph with{" "}
            <span className="text-accent">accent colored text</span> and
            <span className="text-muted"> muted secondary text</span>. It
            demonstrates how our typography works in real content scenarios.
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg">
            <h3 className="text-h3 font-display mb-2">Card Title</h3>
            <p className="text-body font-sans text-muted">
              Card content using the body text style. This shows how our
              typography system works within component contexts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta = {
  title: "Foundation/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MobilePreviews: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
