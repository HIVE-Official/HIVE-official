import React from "react";
import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import only the HIVE globals CSS (not styles.css which has old variables)
import "../src/globals.css";

// Create a query client for stories that need server state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "hive-dark",
      values: [
        { name: "hive-dark", value: "#0A0A0A" },
        { name: "hive-card", value: "#141417" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
    layout: "centered",
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(
          "div",
          {
            className:
              "font-sans bg-hive-canvas text-hive-white dark min-h-screen",
            style: {
              fontFamily:
                "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              backgroundColor: "#0A0A0A",
              color: "#ffffff",
              minHeight: "100vh",
              padding: "1rem",
            } as React.CSSProperties,
          },
          React.createElement(Story)
        )
      );
    },
  ],
  globalTypes: {
    theme: {
      description: "HIVE Theme",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark (Default)" },
          { value: "light", title: "Light (Testing)" },
        ],
        dynamicTitle: true,
      },
    },
    motion: {
      description: "Motion Preferences",
      defaultValue: "full",
      toolbar: {
        title: "Motion",
        icon: "play",
        items: [
          { value: "full", title: "Full Motion" },
          { value: "reduced", title: "Reduced Motion" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
