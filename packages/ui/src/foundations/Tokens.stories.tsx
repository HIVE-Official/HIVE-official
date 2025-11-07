import type { Meta, StoryObj } from '@storybook/react';
import {
  colors,
  overlay,
  gradients,
  semantic,
  spacing,
  layoutSizes,
  typography,
  radius,
  motion,
} from '@hive/tokens';
import React from 'react';

const meta: Meta = {
  title: '00-Foundations/Tokens/Overview',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;

type Story = StoryObj;

const surfaceStyle: React.CSSProperties = {
  background: '#0A0A0B',
  color: '#E5E5E7',
  fontFamily: "'Geist Sans', system-ui, sans-serif",
  padding: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
};

const Section = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <header>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
      {description && (
        <p style={{ marginTop: '0.25rem', color: 'rgba(229, 229, 231, 0.7)', fontSize: '0.9rem', maxWidth: 720 }}>{description}</p>
      )}
    </header>
    {children}
  </section>
);

const ColorGrid = ({ palette }: { palette: Record<string, string> }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
    {Object.entries(palette).map(([name, value]) => (
      <div key={name} style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ height: '96px', background: value }} />
        <div style={{ padding: '0.75rem', fontSize: '0.85rem', background: 'rgba(17,17,19,0.8)', display: 'grid', gap: '0.25rem' }}>
          <span style={{ fontWeight: 600 }}>{name}</span>
          <code style={{ color: 'rgba(229, 229, 231, 0.7)' }}>{value}</code>
        </div>
      </div>
    ))}
  </div>
);

const flattenColorObject = (object: Record<string, unknown>, prefix = ''): Record<string, string> => {
  return Object.entries(object).reduce<Record<string, string>>((acc, [key, value]) => {
    const token = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      acc[token] = value;
    } else if (value && typeof value === 'object') {
      Object.assign(acc, flattenColorObject(value as Record<string, unknown>, token));
    }
    return acc;
  }, {});
};

const SpacingList = () => (
  <div style={{ display: 'grid', gap: '0.75rem' }}>
    {Object.entries(spacing).map(([key, raw]) => {
      const px = parseSpacing(raw);
      return (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <code style={{ minWidth: '56px', color: 'rgba(229,229,231,0.7)' }}>{key}</code>
          <div style={{ flex: 1, height: '12px', background: 'rgba(229,229,231,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: Math.min(px, 320), height: '100%', background: 'rgba(255,215,0,0.6)' }} />
          </div>
          <code style={{ minWidth: '72px', textAlign: 'right', color: 'rgba(229,229,231,0.6)' }}>{formatSpacing(raw)}</code>
        </div>
      );
    })}
  </div>
);

const parseSpacing = (value: string): number => {
  if (value === '0') return 0;
  if (value.endsWith('rem')) {
    return parseFloat(value) * 16;
  }
  if (value.endsWith('px')) {
    return parseFloat(value);
  }
  return 0;
};

const formatSpacing = (value: string): string => {
  if (value === '0') return '0px';
  if (value.endsWith('rem')) {
    return `${parseFloat(value) * 16}px`;
  }
  return value;
};

const TypographyScale = () => (
  <div style={{ display: 'grid', gap: '1rem' }}>
    {Object.entries(typography.fontSize).map(([token, size]) => (
      <div key={token} style={{ display: 'grid', gap: '0.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'rgba(229,229,231,0.7)' }}>
          <code>{token}</code>
          <span>{size}</span>
        </div>
        <div style={{ fontSize: size as React.CSSProperties['fontSize'], fontWeight: 500, lineHeight: 1.3 }}>
          The quick brown fox jumps over the lazy dog.
        </div>
      </div>
    ))}
  </div>
);

const RadiusRow = () => (
  <div style={{ display: 'grid', gap: '0.75rem' }}>
    {Object.entries(radius).map(([token, value]) => (
      <div key={token} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <code style={{ minWidth: '72px', color: 'rgba(229,229,231,0.7)' }}>{token}</code>
        <div style={{ width: '120px', height: '60px', background: 'rgba(229,229,231,0.08)', borderRadius: value }} />
        <code style={{ color: 'rgba(229,229,231,0.6)' }}>{value}</code>
      </div>
    ))}
  </div>
);

const MotionTable = () => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Durations</h3>
      <table style={tableStyle}>
        <tbody>
          {Object.entries(motion.duration).map(([token, value]) => (
            <tr key={token}>
              <td><code>{token}</code></td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Easing</h3>
      <table style={tableStyle}>
        <tbody>
          {Object.entries(motion.easing).map(([token, value]) => (
            <tr key={token}>
              <td><code>{token}</code></td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.85rem',
  background: 'rgba(17,17,19,0.6)',
};

const TokensOverview = () => (
  <div style={surfaceStyle}>
    <header style={{ display: 'grid', gap: '0.75rem', maxWidth: 960 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>HIVE Token Overview</h1>
      <p style={{ color: 'rgba(229,229,231,0.75)', fontSize: '1rem' }}>
        Use this catalog to reference the canonical design tokens for color, typography, spacing, motion, and foundational styles.
        Gold (`#FFD700`) is reserved for focus rings, verification, and Celebrate/Warm accents—never primary buttons.
      </p>
    </header>

    <Section title="Core Palette" description="Monochrome base with accent gold. Includes semantic groupings for background, text, brand, and status tokens.">
      <ColorGrid palette={flattenColorObject({ colors, overlay, gradients, semantic })} />
    </Section>

    <Section title="Spacing Scale" description="4px grid expressed in rem for responsive layouts. Bars show pixel equivalent.">
      <SpacingList />
    </Section>

    <Section title="Typography Scale" description="Font size tokens for headings, body copy, and display text using Geist Sans / Space Grotesk stack.">
      <TypographyScale />
    </Section>

    <Section title="Radius" description="Rounded corner tokens—default 6px radius for cards, pills for circular elements.">
      <RadiusRow />
    </Section>

    <Section title="Motion" description="Timing and easing primitives for calm interactions. Respect reduced-motion preferences in components.">
      <MotionTable />
    </Section>

    <Section title="Layout Sizes" description="Common width/height dimensions referenced across layouts.">
      <table style={tableStyle}>
        <tbody>
          {Object.entries(layoutSizes).flatMap(([dimension, tokens]) =>
            Object.entries(tokens).map(([token, value]) => (
              <tr key={`${dimension}-${token}`}>
                <td><code>{dimension}.{token}</code></td>
                <td>{value}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Section>

    <footer style={{ fontSize: '0.8rem', color: 'rgba(229,229,231,0.55)' }}>
      Generated from `@hive/tokens`. Update tokens there to keep Storybook in sync.
    </footer>
  </div>
);

export const Overview: Story = {
  render: () => <TokensOverview />,
};
