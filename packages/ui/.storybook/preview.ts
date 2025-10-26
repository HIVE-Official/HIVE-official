// Bounded Context Owner: Design System Guild
import React from "react";
import type { Decorator, Preview } from "@storybook/react";
// Load tokens + base styles first
import "../src/styles.css";
// Brand tokens (Hive + Chromium)
import "../src/brand/brand.css";
import "../src/styles/storybook-hive.css";
import "../src/styles/tokens.css";
// Real Geist fonts via Fontsource (variable weights)
// Sans: 400 (base), 500 (medium), 600 (semibold)
import "@fontsource/geist/index.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
// Mono: 400 is sufficient for code snippets
import "@fontsource/geist-mono/index.css";
// Radix tooltip provider (global for stories)
import { TooltipProvider } from "../src/components/ui/tooltip";

export const globalTypes = {
  themeSet: { name: "Tokens", description: "Token set", defaultValue: "vNext", toolbar: { icon: "mirror", items: ["current", "vNext"] } },
  theme: { name: "Theme", description: "Global theme", defaultValue: "dark", toolbar: { icon: "circlehollow", items: ["dark", "light"] } },
  radius: { name: "Radius", description: "[M 12] | [L 16] | [XL 20]", defaultValue: "xl", toolbar: { icon: "circle", items: [{ value: "m", title: "M (12)" }, { value: "l", title: "L (16)" }, { value: "xl", title: "XL (20)" }] } },
  elevation: { name: "Elevation", description: "Flat | Soft | Medium", defaultValue: "soft", toolbar: { icon: "arrowdown", items: [{ value: "flat", title: "Flat" }, { value: "soft", title: "Soft" }, { value: "medium", title: "Medium" }] } },
  density: { name: "Density", description: "Cozy | Comfy | Airy", defaultValue: "comfy", toolbar: { icon: "globe", items: [{ value: "cozy", title: "Cozy" }, { value: "comfy", title: "Comfy" }, { value: "airy", title: "Airy" }] } },
  contrast: { name: "Contrast", description: "Low | Medium | High", defaultValue: "high", toolbar: { icon: "contrast", items: [{ value: "low", title: "Low" }, { value: "medium", title: "Medium" }, { value: "high", title: "High" }] } },
  glass: { name: "Glass", description: "Off | Subtle | On", defaultValue: "subtle", toolbar: { icon: "contrast", items: [{ value: "off", title: "Off" }, { value: "subtle", title: "Subtle" }, { value: "on", title: "On" }] } },
  stroke: { name: "Stroke", description: "Hairline | 1px | 2px", defaultValue: "hairline", toolbar: { icon: "border", items: [{ value: "hairline", title: "Hairline" }, { value: "1", title: "1px" }, { value: "2", title: "2px" }] } },
  goldUsage: { name: "Gold", description: "CTA-only | CTA+Badges | CTA+Timers", defaultValue: "cta-only", toolbar: { icon: "paintbrush", items: [{ value: "cta-only", title: "CTA-only" }, { value: "cta-badges", title: "CTA+Badges" }, { value: "cta-timers", title: "CTA+Timers" }] } },
  motion: { name: "Motion", description: "Minimal | Standard | Expressive", defaultValue: "standard", toolbar: { icon: "play", items: [{ value: "minimal", title: "Minimal" }, { value: "standard", title: "Standard" }, { value: "expressive", title: "Expressive" }] } },
  reducedMotion: { name: "Reduced Motion", description: "Simulate prefers-reduced-motion", defaultValue: "auto", toolbar: { icon: "sync", items: [{ value: "auto", title: "Follow OS" }, { value: "off", title: "Force Off" }, { value: "on", title: "Force On" }] } },
  perf: { name: "Perf Mode", description: "Glass performance mode", defaultValue: "normal", toolbar: { icon: "lightning", items: [{ value: "normal", title: "Normal" }, { value: "performance", title: "Performance" }] } }
};

const withGlobals: Decorator = (Story, context) => {
  const { themeSet, theme, radius, elevation, density, contrast, glass, stroke, goldUsage, motion, reducedMotion, perf } = context.globals as any;

  const root = document.documentElement;
  root.setAttribute("data-theme-set", themeSet === "vNext" ? "vnext" : "current");
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme === "dark");
  // Wire font-family variables so Tailwind uses real Geist faces
  // Primary variables consumed by tokens/tailwind preset
  root.style.setProperty("--font-sans", '"Geist"');
  root.style.setProperty("--font-mono", '"Geist Mono"');
  // Back-compat aliases (some code references these indirectly)
  root.style.setProperty("--font-geist-sans", '"Geist"');
  root.style.setProperty("--font-geist-mono", '"Geist Mono"');

  // Contrast mapping
  root.classList.toggle("high-contrast", contrast === "high");
  root.classList.toggle("low-contrast", contrast === "low");

  // Motion mapping + reduced motion override
  root.classList.toggle("motion-minimal", motion === "minimal");
  root.classList.toggle("motion-standard", motion === "standard");
  root.classList.toggle("motion-expressive", motion === "expressive");
  if (reducedMotion === "off") {
    root.classList.remove("reduce-motion");
    root.dataset.storybookReducedMotion = "off";
  } else if (reducedMotion === "on") {
    root.classList.add("reduce-motion");
    root.dataset.storybookReducedMotion = "on";
  } else {
    root.classList.remove("reduce-motion");
    delete root.dataset.storybookReducedMotion;
  }

  const themeClass = themeSet === "vNext" ? "brand-hive" : "brand-chromium";

  const classes = [
    themeClass,
    theme === "dark" ? "dark" : "",
    density === "cozy" ? "density-compact" : density === "airy" ? "density-spacious" : "density-default",
    radius === "m" ? "radius-m" : radius === "l" ? "radius-l" : "radius-xl",
    `elev-${elevation}`,
    glass === "off" ? "no-glass" : glass === "on" ? "glass-on" : "",
    `stroke-${stroke}`,
    `gold-${goldUsage}`
  ]
    .filter(Boolean)
    .join(" ");

  const story = Story();
  // Return without JSX to avoid TSX in .ts file
  return React.createElement(
    TooltipProvider,
    null,
    React.createElement(
      "div",
      { className: classes, style: { padding: 24 }, "data-gold-usage": goldUsage as any, "data-glass-mode": perf === 'performance' ? 'performance' : undefined },
      story
    )
  );
};

const preview: Preview = {
  decorators: [withGlobals],
  parameters: {
    layout: "padded",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true, matchers: { color: /(background|color)$/i, date: /Date$/ } },
    options: {
      storySort: {
        order: [
          "Plan",
          "Foundation",
          "Brand",
          "Atoms",
          "Molecules",
          "Organisms",
          "Layouts",
          "Templates",
          "Pages",
          "Reference",
          "A11y",
          "States"
        ]
      }
    },
    viewport: { viewports: { mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } }, desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } } } }
  }
};

export default preview;

// Lightweight fetch interceptor for HiveLab stories (simulates MSW without extra deps)
// Only patches in the browser and only once.
if (typeof window !== "undefined" && typeof window.fetch === "function") {
  const originalFetch = window.fetch.bind(window);
  const alreadyPatched = (window as any).__hive_fetch_patched__;
  if (!alreadyPatched) {
    (window as any).__hive_fetch_patched__ = true;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      try {
        const url = typeof input === "string" ? input : (input as any).url ?? String(input);
        // Attachables
        if (/\/api\/tools\/.+\/elements\/.+\/attachable-events/.test(url)) {
          const now = Date.now();
          const data = {
            success: true,
            data: {
              events: [
                { id: "ev-1", title: "General Body Meeting", startAt: new Date(now + 86400000).toISOString(), endAt: new Date(now + 90000000).toISOString(), location: "Davis 101" },
                { id: "ev-2", title: "Workshop Night", startAt: new Date(now + 172800000).toISOString(), endAt: new Date(now + 180000000).toISOString(), location: "Ketter 2" }
              ],
              window: { start: new Date().toISOString(), end: new Date(now + 7 * 86400000).toISOString() },
              nextCursor: null
            }
          };
          return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
        }
        // Persist attach
        if (/\/api\/tools\/.+\/elements\/.+\/attach(\?|$)/.test(url) && (init?.method ?? "GET").toUpperCase() === "POST") {
          return new Response(JSON.stringify({ success: true, data: { id: "tool-demo", authoring: { elements: [{ id: "slots_shifts", attachedEventId: "ev-1" }] } } }), { status: 200, headers: { "Content-Type": "application/json" } });
        }
        // Run Test
        if (/\/api\/tools\/.+\/test$/.test(url) && (init?.method ?? "GET").toUpperCase() === "POST") {
          return new Response(JSON.stringify({ success: true, data: { lastRunAt: new Date().toISOString(), health: "looks_good", issues: [], tool: { id: "tool-demo" } } }), { status: 200, headers: { "Content-Type": "application/json" } });
        }
        // Publish
        if (/\/api\/tools\/.+\/publish$/.test(url) && (init?.method ?? "GET").toUpperCase() === "POST") {
          return new Response(JSON.stringify({ success: true, data: { id: "tool-demo", status: "limited_run", limitedRunEndsAt: new Date(Date.now() + 14*86400000).toISOString() } }), { status: 200, headers: { "Content-Type": "application/json" } });
        }
        // Visibility
        if (/\/api\/tools\/.+\/visibility$/.test(url) && (init?.method ?? "GET").toUpperCase() === "POST") {
          return new Response(JSON.stringify({ success: true, data: { id: "tool-demo", visibility: "public" } }), { status: 200, headers: { "Content-Type": "application/json" } });
        }
        // Execute
        if (/\/api\/lab\/spaces\/.+\/tools\/.+\/execute$/.test(url) && (init?.method ?? "GET").toUpperCase() === "POST") {
          return new Response(JSON.stringify({ success: true, data: { id: "post-1", spaceId: "space-robotics", toolContext: { toolId: "tool-demo", placementId: "board:input" }, createdAt: new Date().toISOString() } }), { status: 201, headers: { "Content-Type": "application/json" } });
        }
      } catch {
        // fallthrough
      }
      return originalFetch(input as any, init);
    };
  }
}
