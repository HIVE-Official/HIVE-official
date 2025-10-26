// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Banner,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxGroup,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Countdown,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  EmptyState,
  FormField,
  FormFieldControl,
  FormFieldHint,
  HiveLogo,
  Input,
  Radio,
  SelectNative,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TagInput,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Toaster,
  StepperHeader,
  useToast
} from "@hive/ui";

export default function UIShowcase(): JSX.Element {
  const [checked, setChecked] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(["design", "events"]);
  const [groupValues, setGroupValues] = useState<string[]>(["cs", "math"]);
  const [themeChecked, setThemeChecked] = useState(false);
  const { toast } = useToast();

  const checkboxOptions = useMemo(
    () => [
      { value: "cs", label: "Computer Science", group: "STEM" },
      { value: "math", label: "Mathematics", group: "STEM" },
      { value: "history", label: "History", group: "Humanities" },
      { value: "music", label: "Music", group: "Arts" }
    ],
    []
  );

  const countdownTarget = useMemo(() => {
    const t = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
    return t;
  }, []);

  return (
    <main className="mx-auto max-w-6xl space-y-10 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">UI Kitchen Sink</h1>
        <HiveLogo size={28} variant="white" showText wrapperClassName="gap-2" wordmarkClassName="text-sm tracking-[0.2em]" />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Atoms</CardTitle>
          <CardDescription>Primitive components and controls</CardDescription>
        </CardHeader>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Input</label>
            <Input placeholder="Type here" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Textarea</label>
            <FormField>
              <FormFieldControl>
                <textarea className="w-full rounded-card border border-input bg-background/95 p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" rows={3} />
              </FormFieldControl>
              <FormFieldHint>Helper text</FormFieldHint>
            </FormField>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Checkbox / Radio / Switch</label>
            <div className="flex items-center gap-4">
              <Checkbox checked={checked} onChange={setChecked} label="Accept" />
              <Radio name="r" defaultChecked />
              <Switch checked={themeChecked} onCheckedChange={setThemeChecked} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Badges</label>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="muted">Muted</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Select</label>
            <SelectNative>
              <option>Alpha</option>
              <option>Beta</option>
              <option>Gamma</option>
            </SelectNative>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Skeleton</label>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Molecules</CardTitle>
          <CardDescription>Composite patterns</CardDescription>
        </CardHeader>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <FormField label="Tag input">
              <FormFieldControl>
                <TagInput value={tags} onChange={setTags} placeholder="Add tag" suggestions={[{ value: "clubs" }, { value: "tech" }]} />
              </FormFieldControl>
              <FormFieldHint type="description">Press Enter to add</FormFieldHint>
            </FormField>
            <CheckboxGroup values={groupValues} onChange={setGroupValues} options={checkboxOptions} />
          </div>
          <div className="space-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="a">
                <AccordionTrigger>Accordion A</AccordionTrigger>
                <AccordionContent>Content A</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Accordion B</AccordionTrigger>
                <AccordionContent>Content B</AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex flex-wrap items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>Tooltip content</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>Small description for dialog.</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet title</SheetTitle>
                    <SheetDescription>Some details in a side sheet</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Item One</DropdownMenuItem>
                    <DropdownMenuItem>Item Two</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Deep item</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organisms & Utilities</CardTitle>
          <CardDescription>Larger patterns and helpers</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          <Tabs defaultValue="one">
            <TabsList>
              <TabsTrigger value="one">One</TabsTrigger>
              <TabsTrigger value="two">Two</TabsTrigger>
            </TabsList>
            <TabsContent value="one">Tab one content</TabsContent>
            <TabsContent value="two">Tab two content</TabsContent>
          </Tabs>

          <StepperHeader
            steps={[
              { id: "s1", title: "Start", description: "Begin" },
              { id: "s2", title: "Profile", description: "Fill details" },
              { id: "s3", title: "Finish", description: "Confirm" }
            ]}
            activeStepId="s2"
            completedStepIds={["s1"]}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => toast({ title: "Saved", description: "Your changes were saved." })}>Toast</Button>
            <Button variant="outline" onClick={() => setCmdOpen(true)}>
              Command
            </Button>
            <Banner variant="info" title="Heads up" description="This is a neutral info banner." />
            <EmptyState title="Nothing here" description="Try adding some items." />
            <Countdown target={countdownTarget} />
          </div>
        </div>
      </Card>

      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Type a command" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="General">
            <CommandItem>Show help</CommandItem>
            <CommandItem>Open settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Toaster also mounted in root layout; include here to ensure scoped rendering works */}
      <Toaster />
    </main>
  );
}
