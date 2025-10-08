import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../atomic/atoms/tooltip";
import { Button } from "../../atomic/atoms/button";

/**
 * # Tooltip
 *
 * Contextual information that appears on hover or focus.
 * Built on @radix-ui/react-tooltip with smooth animations.
 *
 * ## Usage
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Helpful information</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
const meta = {
  title: "11-Shared/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tooltip on button
 */
export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Different positions
 */
export const Positions: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Tooltip on top</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tooltip on right</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tooltip on bottom</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Tooltip on left</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * With icons and formatting
 */
export const WithIcons: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-md border border-input bg-background p-2 transition-smooth ease-liquid hover:bg-accent">
              <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">Help & Information</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-md border border-input bg-background p-2 transition-smooth ease-liquid hover:bg-accent">
              <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-md border border-input bg-background p-2 transition-smooth ease-liquid hover:bg-accent">
              <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>3 new notifications</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Keyboard shortcuts
 */
export const KeyboardShortcuts: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Save</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Save changes{" "}
              <kbd className="ml-2 rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                ⌘S
              </kbd>
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Undo</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Undo{" "}
              <kbd className="ml-2 rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                ⌘Z
              </kbd>
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Redo</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Redo{" "}
              <kbd className="ml-2 rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                ⌘⇧Z
              </kbd>
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Multiline content
 */
export const Multiline: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Learn more</Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">
            This feature allows you to customize your workspace with advanced
            settings and preferences. Click to explore all available options.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Custom delay
 */
export const CustomDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={100}>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Fast (100ms)</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Shows quickly</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Production showcase: Toolbar with tooltips
 */
export const ProductionShowcase: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            Text Editor
          </h3>
          <p className="text-sm text-muted-foreground">
            Hover over toolbar icons for shortcuts
          </p>
        </div>

        <div className="flex gap-1 rounded-lg border border-border bg-background p-1">
          {[
            { icon: "B", label: "Bold", shortcut: "⌘B" },
            { icon: "I", label: "Italic", shortcut: "⌘I" },
            { icon: "U", label: "Underline", shortcut: "⌘U" },
            { icon: "S", label: "Strikethrough", shortcut: "⌘⇧X" },
          ].map((tool) => (
            <Tooltip key={tool.label}>
              <TooltipTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-md font-semibold transition-smooth ease-liquid hover:bg-accent hover:text-accent-foreground">
                  {tool.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {tool.label}{" "}
                  <kbd className="ml-2 rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                    {tool.shortcut}
                  </kbd>
                </p>
              </TooltipContent>
            </Tooltip>
          ))}

          <div className="mx-2 w-px bg-border" />

          {[
            {
              icon: (
                <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              ),
              label: "Insert Link",
              shortcut: "⌘K",
            },
            {
              icon: (
                <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              label: "Insert Image",
              shortcut: "⌘⇧I",
            },
            {
              icon: (
                <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              label: "Insert Code Block",
              shortcut: "⌘⇧C",
            },
          ].map((tool) => (
            <Tooltip key={tool.label}>
              <TooltipTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-md transition-smooth ease-liquid hover:bg-accent hover:text-accent-foreground">
                  {tool.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {tool.label}{" "}
                  <kbd className="ml-2 rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                    {tool.shortcut}
                  </kbd>
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">
            Start typing your content here...
          </p>
        </div>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    layout: "padded",
  },
};
