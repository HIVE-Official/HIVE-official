import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../../atomic/atoms/slider";
import { Label } from "../../atomic/atoms/label";
import { useState } from "react";

/**
 * # Slider
 *
 * Input control for selecting numeric values within a range.
 * Built on @radix-ui/react-slider with HIVE motion system.
 *
 * ## HIVE Motion System
 * - Thumb uses `duration-smooth ease-liquid` for buttery interactions
 * - Smooth drag animations with GPU-accelerated transforms
 *
 * ## Usage
 * ```tsx
 * <Slider
 *   defaultValue={[50]}
 *   max={100}
 *   step={1}
 * />
 * ```
 */
const meta = {
  title: "10-Forms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default slider with single value
 */
export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

/**
 * Slider with label and value display
 */
export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div className="w-[300px] space-y-3">
        <div className="flex items-center justify-between">
          <Label>Volume</Label>
          <span className="text-sm text-muted-foreground">{value}%</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
        />
      </div>
    );
  },
};

/**
 * Range slider with two values
 */
export const RangeSlider: Story = {
  render: () => {
    const [value, setValue] = useState([25, 75]);

    return (
      <div className="w-[300px] space-y-3">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
        />
      </div>
    );
  },
};

/**
 * Different step values
 */
export const Steps: Story = {
  render: () => (
    <div className="w-[300px] space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Step: 1 (Fine control)</Label>
          <span className="text-sm text-muted-foreground">50</span>
        </div>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Step: 10 (Coarse control)</Label>
          <span className="text-sm text-muted-foreground">50</span>
        </div>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Step: 25 (Quarters)</Label>
          <span className="text-sm text-muted-foreground">50</span>
        </div>
        <Slider defaultValue={[50]} max={100} step={25} />
      </div>
    </div>
  ),
};

/**
 * Different ranges
 */
export const CustomRanges: Story = {
  render: () => (
    <div className="w-[300px] space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">0-100 (Default)</Label>
          <span className="text-sm text-muted-foreground">50</span>
        </div>
        <Slider defaultValue={[50]} min={0} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">0-10 (Rating)</Label>
          <span className="text-sm text-muted-foreground">5</span>
        </div>
        <Slider defaultValue={[5]} min={0} max={10} step={1} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">-50 to 50 (Offset)</Label>
          <span className="text-sm text-muted-foreground">0</span>
        </div>
        <Slider defaultValue={[0]} min={-50} max={50} step={5} />
      </div>
    </div>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <div className="w-[300px] space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-muted-foreground">Disabled slider</Label>
        <span className="text-sm text-muted-foreground">50</span>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  ),
};

/**
 * Volume control pattern
 */
export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState([70]);

    return (
      <div className="w-[300px] space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="w-12 text-right text-sm text-foreground">
            {volume}%
          </span>
        </div>
      </div>
    );
  },
};

/**
 * Brightness control with visual feedback
 */
export const BrightnessControl: Story = {
  render: () => {
    const [brightness, setBrightness] = useState([75]);

    return (
      <div className="w-[300px] space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <Label>Brightness</Label>
          <span className="text-sm text-foreground">{brightness}%</span>
        </div>
        <div
          className="flex h-24 items-center justify-center rounded-md border border-border transition-smooth ease-liquid"
          style={{
            backgroundColor: `rgba(255, 255, 255, ${brightness[0] / 100})`,
          }}
        >
          <svg
            className="h-8 w-8"
            style={{ opacity: brightness[0] / 100 }}
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <Slider
          value={brightness}
          onValueChange={setBrightness}
          max={100}
          step={1}
        />
      </div>
    );
  },
};

/**
 * Price range filter
 */
export const PriceRangeFilter: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([200, 800]);
    const min = 0;
    const max = 1000;

    return (
      <div className="w-[350px] space-y-4 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm font-medium text-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>

        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={min}
          max={max}
          step={10}
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${min}</span>
          <span>${max}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <button className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm transition-smooth ease-liquid hover:bg-accent">
            Reset
          </button>
          <button className="flex-1 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
            Apply Filter
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Production showcase: Settings panel
 */
export const ProductionShowcase: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      volume: [75],
      brightness: [60],
      notifications: [80],
      autoSave: [30],
    });

    return (
      <div className="w-[400px] space-y-6 rounded-lg border border-border bg-card p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            Settings
          </h3>
          <p className="text-sm text-muted-foreground">
            Customize your preferences
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-3 rounded-lg border border-border bg-background p-4 transition-smooth ease-liquid hover:border-primary/50">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Volume</Label>
                <p className="text-xs text-muted-foreground">
                  Control master volume
                </p>
              </div>
              <span className="text-sm font-medium text-foreground">
                {settings.volume}%
              </span>
            </div>
            <Slider
              value={settings.volume}
              onValueChange={(value) =>
                setSettings({ ...settings, volume: value })
              }
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-background p-4 transition-smooth ease-liquid hover:border-primary/50">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Display Brightness</Label>
                <p className="text-xs text-muted-foreground">
                  Adjust screen brightness
                </p>
              </div>
              <span className="text-sm font-medium text-foreground">
                {settings.brightness}%
              </span>
            </div>
            <Slider
              value={settings.brightness}
              onValueChange={(value) =>
                setSettings({ ...settings, brightness: value })
              }
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-background p-4 transition-smooth ease-liquid hover:border-primary/50">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notification Frequency</Label>
                <p className="text-xs text-muted-foreground">
                  How often to show notifications
                </p>
              </div>
              <span className="text-sm font-medium text-foreground">
                {settings.notifications}%
              </span>
            </div>
            <Slider
              value={settings.notifications}
              onValueChange={(value) =>
                setSettings({ ...settings, notifications: value })
              }
              max={100}
              step={10}
            />
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-background p-4 transition-smooth ease-liquid hover:border-primary/50">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-save Interval</Label>
                <p className="text-xs text-muted-foreground">
                  Minutes between auto-saves
                </p>
              </div>
              <span className="text-sm font-medium text-foreground">
                {settings.autoSave} min
              </span>
            </div>
            <Slider
              value={settings.autoSave}
              onValueChange={(value) =>
                setSettings({ ...settings, autoSave: value })
              }
              min={5}
              max={60}
              step={5}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm transition-smooth ease-liquid hover:bg-accent">
            Reset to Defaults
          </button>
          <button className="flex-1 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
            Save Changes
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};
