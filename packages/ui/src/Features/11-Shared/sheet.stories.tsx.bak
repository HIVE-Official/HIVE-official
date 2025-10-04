import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../atomic/atoms/sheet";
import { Button } from "../../atomic/atoms/button";
import { Label } from "../../atomic/atoms/label";
import { Input } from "../../atomic/atoms/input";

const meta = {
  title: "11-Shared/Sheet",
  component: Sheet,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description goes here</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Sheet from {side}</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>Make changes to your profile</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" />
          </div>
          <Button className="w-full">Save changes</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const ProductionShowcase: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>View Cart (3)</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>3 items in your cart</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 rounded-lg border border-border p-4">
              <div className="h-16 w-16 rounded bg-muted" />
              <div className="flex-1">
                <h4 className="font-medium">Product {i}</h4>
                <p className="text-sm text-muted-foreground">$29.99</p>
              </div>
            </div>
          ))}
          <div className="pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>$89.97</span>
            </div>
            <Button className="mt-4 w-full">Checkout</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
