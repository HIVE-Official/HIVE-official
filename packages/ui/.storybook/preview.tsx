import React from "react";
import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/styles.css";
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
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div
          className="font-sans bg-background text-foreground dark"
          style={
            {
              "--font-display":
                "General Sans, -apple-system, BlinkMacSystemFont, sans-serif",
              "--font-sans":
                "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              backgroundColor: "#0A0A0A",
              color: "#ffffff",
            } as React.CSSProperties
          }
        >
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
