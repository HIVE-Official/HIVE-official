import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const TypographyGeistComparison = () => (
    <div>Typography Geist Comparison</div>
);

const meta: Meta = {
    title: 'Brand/Typography Geist Comparison',
    component: TypographyGeistComparison,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'hive-dark',
            values: [{ name: 'hive-dark', value: '#0A0A0A' }],
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Comparison: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div className="text-sm text-muted-foreground">
        Side-by-side comparison of headline typefaces.
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2 text-accent">Space Grotesk (Current)</h2>
        <p
          style={{
            fontFamily:
              'var(--font-display), Space Grotesk, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '40px',
          }}
          className="mb-4"
        >
          Build anything. Remix everything.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2 text-accent">Geist Sans Variable (Preview)</h2>
        <p
          style={{
            fontFamily:
              'Geist Sans Variable, Geist Sans, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '40px',
          }}
        >
          Build anything. Remix everything.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8 text-base">
        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">Body – Inter</h3>
          <p className="font-sans text-base leading-7">
            HIVE empowers students to create, iterate, and collaborate on ideas
            that push the campus forward. From hackathons to art shows, every
            project finds its hive.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">Body – Geist Sans</h3>
          <p
            style={{
              fontFamily:
                'Geist Sans Variable, Geist Sans, system-ui, sans-serif',
            }}
            className="text-base leading-7"
          >
            HIVE empowers students to create, iterate, and collaborate on ideas
            that push the campus forward. From hackathons to art shows, every
            project finds its hive.
          </p>
        </div>
      </div>
    </div>
  ),
}; 