import type { Meta, StoryObj } from "@storybook/react";
import { Mail, ChevronRight, Loader2 } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const meta: Meta = {
  title: "UI Primitives/Forms",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// --- BUTTON STORIES ---

export const Buttons: StoryObj = {
    render: () => (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center">
        <Button variant="default" size="lg">Gold Button</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        
        <Button><Mail className="mr-2 h-4 w-4" /> With Icon</Button>
        <Button>With Right Icon <ChevronRight className="ml-2 h-4 w-4" /></Button>
        
        <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
        </Button>
        
        <Button variant="default" size="sm">Small</Button>
        <Button variant="default" size="icon"><Mail className="h-4 w-4" /></Button>
      </div>
    ),
  };
  
// --- INPUT STORIES ---

export const Inputs: StoryObj = {
    render: () => (
      <div className="space-y-4 w-80">
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Default Input</label>
          <Input type="email" placeholder="your.edu@school.edu" />
        </div>
        <div>
          <label className="text-sm font-medium leading-none">Subtle Input</label>
          <Input variant="subtle" type="email" placeholder="A cleaner look..." />
        </div>
        <div>
          <label className="text-sm font-medium leading-none">With Left Icon</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input className="pl-10" placeholder="your.edu@school.edu" />
          </div>
        </div>
         <div>
          <label className="text-sm font-medium leading-none">Disabled</label>
          <Input type="email" placeholder="disabled@example.com" disabled />
        </div>
      </div>
    ),
    parameters: {
        component: Input,
    }
}; 