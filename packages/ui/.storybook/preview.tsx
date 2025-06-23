import React from "react";
import type { Preview } from "@storybook/react";
import "../src/globals.css";
import "../src/force-white-inputs.css";

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
  },
  decorators: [
    (Story) => (
      <div className="dark font-sans antialiased bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
};

export default preview;
