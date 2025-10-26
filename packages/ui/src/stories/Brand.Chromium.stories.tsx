// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Button,
  Card,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "../index";

const meta: Meta = { title: "Brand/Chromium Showcase", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

export const Showcase: Story = {
  render: () => (
    <div className="brand-chromium min-h-screen p-6 text-foreground">
      <header className="chrome-glass brand-outline sticky top-0 z-40 mb-6 rounded-xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Hive</div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" className="brand-state">Help</Button>
              </TooltipTrigger>
              <TooltipContent>Get support</TooltipContent>
            </Tooltip>
            <Button className="brand-cta">Start</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        <Card className="brand-card p-4">
          <div className="mb-4 text-sm text-muted-foreground">Controls</div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </Card>

        <Card className="brand-card p-4">
          <div className="mb-4 text-sm text-muted-foreground">Menus & Select</div>
          <div className="flex flex-wrap items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Dropdown</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Item one</DropdownMenuItem>
                <DropdownMenuItem>Item two</DropdownMenuItem>
                <DropdownMenuItem>Item three</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select defaultValue="a">
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Pick one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
                <SelectItem value="c">Option C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="brand-card p-4">
          <div className="mb-4 text-sm text-muted-foreground">Dialog</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="chrome-glass">
              <DialogHeader>
                <DialogTitle>Chromium Aesthetic</DialogTitle>
                <DialogDescription>Glass overlay, hairline border, cool ring.</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">No wrappers; pure shadcn primitives with brand classes.</p>
            </DialogContent>
          </Dialog>
        </Card>

        <Card className="brand-card p-4">
          <div className="mb-4 text-sm text-muted-foreground">Notes</div>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Neutral chrome, hairline strokes, soft elevation.</li>
            <li>Gold is opt-in CTA only; not structural.</li>
            <li>Focus ring set via --ring (cool hue).</li>
          </ul>
        </Card>
      </main>
    </div>
  )
};

