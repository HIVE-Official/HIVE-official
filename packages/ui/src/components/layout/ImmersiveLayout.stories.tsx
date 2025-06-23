import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { motion } from "framer-motion";
import { HiveLogo } from "../brand/hive-logo";
import { cn } from "../../lib/utils";

// --- Components defined directly in the story for simplicity ---

const ImmersiveHeader = () => (
  <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm"
  >
    <div className="flex items-center gap-4">
      <HiveLogo variant="white" size="sm" className="opacity-75" />
      <span className="text-sm font-medium text-muted-foreground">HIVE</span>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-muted" />
    </div>
  </motion.header>
);

const ImmersiveContent = () => (
  <div className="p-8 mt-16">
    <div className="w-full h-64 rounded-lg bg-muted" />
    <div className="w-full h-32 mt-4 rounded-lg bg-muted" />
    <div className="w-2/3 h-32 mt-4 rounded-lg bg-muted" />
  </div>
);

const ImmersiveLayout = () => {
  return (
    <div className="min-h-screen text-white bg-background">
      <ImmersiveHeader />
      <main>
        <ImmersiveContent />
      </main>
    </div>
  );
};

// --- Storybook Meta and Story Definition ---

const meta: Meta<typeof ImmersiveLayout> = {
  title: "Layout/Immersive",
  component: ImmersiveLayout,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "#0A0A0A" }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImmersiveLayout>;

export const Default: Story = {}; 