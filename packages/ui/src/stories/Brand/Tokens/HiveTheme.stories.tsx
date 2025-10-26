import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/atoms/card";
import { brand } from "@/brand/classnames";
import { hiveTokens } from "@/brand/tokens";

type Story = StoryObj;

const meta: Meta = {
  title: "Brand/Tokens/Hive",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Canonical Hive gold/black/white token set. Applies the `brand-hive` theme and renders color, spacing, typography, and motion previews."
      }
    }
  }
};

export default meta;

export const Overview: Story = {
  render: () => {
    const colorSwatches = [
      { name: "Gold", value: hiveTokens.colors.gold },
      { name: "Gold Soft", value: hiveTokens.colors.goldSoft },
      { name: "Gold Deep", value: hiveTokens.colors.goldDeep },
      { name: "Black", value: hiveTokens.colors.black },
      { name: "White", value: hiveTokens.colors.white }
    ];

    const spacingEntries = Object.entries(hiveTokens.spacing);
    const typeEntries = Object.entries(hiveTokens.typography.scale);
    const motionDurations = Object.entries(hiveTokens.motion.duration);
    const motionEasing = Object.entries(hiveTokens.motion.easing);

    return (
      <div className={brand.theme.hive()} style={{ padding: "var(--pad-app-desktop)", display: "grid", gap: "3rem" }}>
        <section>
          <h1 style={{ fontSize: "var(--type-700)", fontWeight: hiveTokens.typography.weight.bold }}>Hive Design Tokens</h1>
          <p style={{ marginTop: "var(--space-xs)", color: "hsl(var(--muted-foreground))" }}>
            Core palette and rhythm for the campus OS UI. Gold is reserved for momentum highlights, call-to-action, and proof markers.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--type-600)", fontWeight: hiveTokens.typography.weight.semibold }}>Palette</h2>
          <div style={{ marginTop: "var(--space-md)", display: "flex", flexWrap: "wrap", gap: "var(--space-md)" }}>
            {colorSwatches.map((swatch) => (
              <Card key={swatch.name} className="border-border border brand-outline bg-card text-card-foreground" style={{ width: "200px", padding: "var(--space-md)" }}>
                <div style={{ borderRadius: "var(--radius-md)", height: "90px", backgroundColor: swatch.value }} />
                <div style={{ marginTop: "var(--space-sm)", fontWeight: hiveTokens.typography.weight.medium }}>{swatch.name}</div>
                <div style={{ marginTop: "var(--space-xs)", color: "hsl(var(--muted-foreground))", fontSize: "var(--type-300)" }}>
                  {swatch.value.toUpperCase()}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--type-600)", fontWeight: hiveTokens.typography.weight.semibold }}>Spacing</h2>
          <div style={{ marginTop: "var(--space-md)", display: "grid", gap: "var(--space-sm)", maxWidth: "420px" }}>
            {spacingEntries.map(([token, rem]) => (
              <Card key={token} className="border-border border brand-outline bg-card text-card-foreground" style={{ padding: "var(--space-sm)" }}>
                <div style={{ fontWeight: hiveTokens.typography.weight.medium }}>space-{token}</div>
                <div style={{ fontSize: "var(--type-300)", color: "hsl(var(--muted-foreground))" }}>{rem}rem</div>
                <div style={{ marginTop: "var(--space-sm)", height: "10px", borderRadius: "var(--radius-pill)", backgroundColor: hiveTokens.colors.gold, width: `${rem * 4}rem` }} />
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--type-600)", fontWeight: hiveTokens.typography.weight.semibold }}>Type Scale</h2>
          <div style={{ marginTop: "var(--space-md)", display: "grid", gap: "var(--space-sm)" }}>
            {typeEntries.map(([token, rem]) => (
              <Card key={token} className="border-border border brand-outline bg-card text-card-foreground" style={{ padding: "var(--space-md)" }}>
                <div style={{ fontSize: "var(--type-300)", color: "hsl(var(--muted-foreground))" }}>TYPE {token}</div>
                <div style={{ fontSize: `${rem}rem`, lineHeight: hiveTokens.typography.lineHeight.tight, fontWeight: hiveTokens.typography.weight.semibold }}>
                  Finally, my campus.
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--type-600)", fontWeight: hiveTokens.typography.weight.semibold }}>Motion</h2>
          <div style={{ marginTop: "var(--space-md)", display: "flex", flexWrap: "wrap", gap: "var(--space-md)" }}>
            {motionDurations.map(([token, value]) => (
              <Card key={token} className="border-border border brand-outline bg-card text-card-foreground" style={{ width: "200px", padding: "var(--space-sm)" }}>
                <div style={{ fontWeight: hiveTokens.typography.weight.medium }}>motion.{token}</div>
                <div style={{ fontSize: "var(--type-300)", color: "hsl(var(--muted-foreground))" }}>{value}</div>
              </Card>
            ))}
            {motionEasing.map(([token, value]) => (
              <Card key={token} className="border-border border brand-outline bg-card text-card-foreground" style={{ width: "240px", padding: "var(--space-sm)" }}>
                <div style={{ fontWeight: hiveTokens.typography.weight.medium }}>ease.{token}</div>
                <div style={{ fontSize: "var(--type-300)", color: "hsl(var(--muted-foreground))" }}>{value}</div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  }
};
