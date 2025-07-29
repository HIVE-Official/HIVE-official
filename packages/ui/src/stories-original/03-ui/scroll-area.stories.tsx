import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';

const meta: Meta<typeof ScrollArea> = {
  title: '03-UI/Scroll Area',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A custom scrollable area component with styled scrollbars.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Basic: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border p-4">
      <div className="space-y-3">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="text-sm">
            Item {i + 1} - This is a scrollable item that demonstrates the scroll area component.
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithSeparators: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>
            <div className="text-sm py-2">
              v1.2.{i}
            </div>
            {i < 49 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="shrink-0 rounded-md border w-[150px] h-[100px] flex items-center justify-center bg-muted"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <ScrollArea className="h-72 w-64 rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm">Feature {i + 1}</span>
            <Badge variant={i % 3 === 0 ? 'default' : i % 3 === 1 ? 'secondary' : 'outline'}>
              {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Draft'}
            </Badge>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const LargeContent: Story = {
  render: () => (
    <ScrollArea className="h-100 w-150 rounded-md border p-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Large Content Area</h2>
        <p className="text-sm text-muted-foreground">
          This scroll area contains a lot of content to demonstrate scrolling behavior.
        </p>
        
        {Array.from({ length: 10 }, (_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2">
            <h3 className="text-md font-medium">Section {sectionIndex + 1}</h3>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 8 }, (_, itemIndex) => (
                <div key={itemIndex} className="p-3 border rounded-md bg-muted/50">
                  <h4 className="font-medium">Item {itemIndex + 1}</h4>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              ))}
            </div>
            {sectionIndex < 9 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const KitchenSink: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      {/* Vertical Scroll */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Vertical Scroll</h3>
        <ScrollArea className="h-48 w-full rounded-md border p-4">
          <div className="space-y-2">
            {Array.from({ length: 25 }, (_, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                <span className="text-sm">Item {i + 1}</span>
                <Badge variant="outline">Tag</Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Horizontal Scroll */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Horizontal Scroll</h3>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="shrink-0 w-32 h-20 rounded border flex items-center justify-center bg-muted">
                <span className="text-sm">Card {i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mixed Content */}
      <div className="col-span-2 space-y-2">
        <h3 className="text-sm font-medium">Mixed Content Scroll</h3>
        <ScrollArea className="h-64 w-full rounded-md border p-4">
          <div className="space-y-4">
            {/* Text content */}
            <div>
              <h4 className="font-medium mb-2">Text Section</h4>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris.
              </p>
            </div>
            
            <Separator />
            
            {/* List items */}
            <div>
              <h4 className="font-medium mb-2">List Items</h4>
              <div className="space-y-1">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">List item {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Cards */}
            <div>
              <h4 className="font-medium mb-2">Card Grid</h4>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="p-3 border rounded bg-muted/30">
                    <h5 className="font-medium text-sm">Card {i + 1}</h5>
                    <p className="text-xs text-muted-foreground">Card description</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  ),
};