import type { Meta, StoryObj } from '@storybook/react';
import { 
  Checkbox,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Skeleton,
  Slider,
  Toast,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { Info, Settings } from 'lucide-react';

const meta: Meta = {
  title: '03-UI/Missing UI Components',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Additional UI components that complete the base component library.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const CheckboxExamples: StoryObj = {
  render: () => (
    <div className="space-y-4 p-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Checkbox Components</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="notifications" defaultChecked />
          <Label htmlFor="notifications">Enable notifications</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled">Disabled option</Label>
        </div>
      </div>
    </div>
  ),
};

export const PopoverExample: StoryObj = {
  render: () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Popover Component</h3>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Open Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Settings</h4>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <input id="username" className="w-full p-2 rounded border" placeholder="Enter username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <input id="email" className="w-full p-2 rounded border" placeholder="Enter email" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const RadioGroupExample: StoryObj = {
  render: () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Radio Group</h3>
      
      <RadioGroup defaultValue="option-one" className="space-y-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="option-three" />
          <Label htmlFor="option-three">Option Three</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const SkeletonExample: StoryObj = {
  render: () => (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Skeleton Loading</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-50" />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  ),
};

export const SliderExample: StoryObj = {
  render: () => {
    const [value, setValue] = useState([50]);
    
    return (
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Slider Component</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Volume: {value[0]}%</Label>
            <Slider
              value={value}
              onValueChange={setValue}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label>Range Slider</Label>
            <Slider
              defaultValue={[20, 80]}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    );
  },
};

export const TooltipExample: StoryObj = {
  render: () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Tooltip Component</h3>
      
      <div className="space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Info className="w-4 h-4 mr-2" />
                Hover me
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a helpful tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  ),
};

export const SeparatorExample: StoryObj = {
  render: () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Separator Component</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-300">Section One</p>
        </div>
        
        <Separator />
        
        <div>
          <p className="text-gray-300">Section Two</p>
        </div>
        
        <Separator orientation="vertical" className="h-12 mx-4 inline-block" />
        
        <div>
          <p className="text-gray-300">Vertical separator example</p>
        </div>
      </div>
    </div>
  ),
};