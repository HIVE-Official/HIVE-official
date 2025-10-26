/* Bounded Context Owner: Design System Guild */
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Sheet,
  SheetTrigger,
  SheetContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "../index";

const meta = {
  title: "Reference/Shadcn/Smoke",
  parameters: { layout: "centered" }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTheBasics: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [sheetOpen, setSheetOpen] = React.useState(false);
    const [value, setValue] = React.useState<string | undefined>("apple");
    return (
      <TooltipProvider>
      <div className="max-w-2xl w-full space-y-6 p-6 bg-card/70 border border-border rounded-xl text-foreground">
        <div className="flex items-center gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Works</DialogTitle>
                <DialogDescription>Shadcn + Radix primitives render correctly.</DialogDescription>
              </DialogHeader>
              <div className="text-sm text-muted-foreground">Close me to continue.</div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item one</DropdownMenuItem>
              <DropdownMenuItem>Item two</DropdownMenuItem>
              <DropdownMenuItem>Item three</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip OK</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-3">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>Open Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right">Side sheet content.</SheetContent>
          </Sheet>

          {/* Radix Select */}
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>

          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">A</TabsTrigger>
              <TabsTrigger value="b">B</TabsTrigger>
            </TabsList>
            <TabsContent value="a" className="text-sm text-muted-foreground">Tab A content</TabsContent>
            <TabsContent value="b" className="text-sm text-muted-foreground">Tab B content</TabsContent>
          </Tabs>
        </div>
      </div>
      </TooltipProvider>
    );
  }
};
