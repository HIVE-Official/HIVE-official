import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/button';
import { Badge } from '../../components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Switch } from '../../components/switch';
import { Checkbox } from '../../components/checkbox';
import { Textarea } from '../../components/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/select';
import { Avatar } from '../../components/avatar';
import { LoadingSpinner } from '../../components/loading-spinner';
import { Progress } from '../../components/progress';
import { Skeleton } from '../../components/skeleton';
import { RadioGroup, RadioGroupItem } from '../../components/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog';
import { HiveLogo } from '../../components/HiveLogo';
import { Heart, Star, Plus, Settings, User, Search } from 'lucide-react';

const meta = {
  title: 'Components/UI Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE UI Components

Complete collection of all HIVE UI components following the design system principles.

## Philosophy
- **Minimal Surface. Maximal Spark**: Clean interfaces with strategic gold accents
- **Campus Energy**: Components adapt to student life cycles
- **Consistent Interaction**: All components follow HIVE motion and spacing systems
- **Mobile-First**: Optimized for mobile and desktop experiences

## Component Categories
- **Form Components**: Input, Select, Checkbox, Switch, Textarea
- **Display Components**: Badge, Avatar, Progress, Skeleton
- **Navigation Components**: Button variants and interactions
- **Layout Components**: Card system with multiple variants
- **Feedback Components**: Loading states, dialogs, toasts
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <HiveLogo className="h-8 w-auto mx-auto" />
        <h1 className="text-3xl font-bold text-foreground">HIVE UI Components</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete collection of components following HIVE design system principles
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Buttons</CardTitle>
              <CardDescription>Main action buttons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Default</Button>
              <Button variant="secondary" className="w-full">
                <Star className="mr-2 h-4 w-4" />
                Accent
              </Button>
              <Button variant="primary" className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Ritual
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secondary Buttons</CardTitle>
              <CardDescription>Secondary actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="secondary" className="w-full">Outline</Button>
              <Button variant="ghost" className="w-full">Ghost</Button>
              <Button variant="surface" className="w-full">Surface</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specialized Buttons</CardTitle>
              <CardDescription>Special use cases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" className="w-full">Destructive</Button>
              <Button variant="link" className="w-full">Link</Button>
              <Button size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Components */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Form Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
              <CardDescription>Text input variations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input-default">Default Input</Label>
                <Input id="input-default" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input-accent">Accent Input</Label>
                <Input id="input-accent" variant="secondary" placeholder="Accent style" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input-icon">With Icon</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="input-icon" placeholder="Search..." className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select & Textarea</CardTitle>
              <CardDescription>Selection and multi-line inputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Option</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textarea">Textarea</Label>
                <Textarea id="textarea" placeholder="Multi-line text..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkboxes & Switches</CardTitle>
              <CardDescription>Boolean inputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox1" />
                <Label htmlFor="checkbox1">Checkbox option</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox2" defaultChecked />
                <Label htmlFor="checkbox2">Checked option</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch1" />
                <Label htmlFor="switch1">Toggle switch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch2" defaultChecked />
                <Label htmlFor="switch2">Enabled switch</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radio Groups</CardTitle>
              <CardDescription>Single selection options</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="radio1" />
                  <Label htmlFor="radio1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="radio2" />
                  <Label htmlFor="radio2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="radio3" />
                  <Label htmlFor="radio3">Option 3</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Display Components */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Display Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status and labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Outline</Badge>
                <Badge variant="secondary">Accent</Badge>
                <Badge variant="primary">
                  <Star className="mr-1 h-3 w-3" />
                  Ritual
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>User profile images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <User className="h-5 w-5" />
                </Avatar>
                <Avatar className="h-12 w-12">
                  <User className="h-6 w-6" />
                </Avatar>
                <Avatar className="h-16 w-16">
                  <User className="h-8 w-8" />
                </Avatar>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress & Loading</CardTitle>
              <CardDescription>Progress indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Progress</Label>
                <Progress value={65} />
              </div>
              <div className="space-y-2">
                <Label>Loading Spinner</Label>
                <LoadingSpinner />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skeleton Loading</CardTitle>
              <CardDescription>Loading placeholders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog Example */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Dialog Components</h2>
        <Card>
          <CardHeader>
            <CardTitle>Dialog Example</CardTitle>
            <CardDescription>Modal dialog with form</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Example Dialog</DialogTitle>
                  <DialogDescription>
                    This is an example dialog following HIVE design principles.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="dialog-input">Name</Label>
                    <Input id="dialog-input" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dialog-textarea">Message</Label>
                    <Textarea id="dialog-textarea" placeholder="Enter your message" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="secondary">Cancel</Button>
                  <Button variant="secondary">Submit</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const ComponentShowcase: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Component Showcase</h1>
        <p className="text-muted-foreground">Key components in action</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card variant="interactive">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <User className="h-5 w-5" />
              </Avatar>
              <div>
                <CardTitle className="text-lg">Sarah Chen</CardTitle>
                <CardDescription>CS Major • Junior</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                <Star className="mr-1 h-3 w-3" />
                Verified
              </Badge>
              <Button size="sm" variant="secondary">
                <Plus className="mr-1 h-3 w-3" />
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Group Card */}
        <Card variant="featured">
          <CardHeader>
            <CardTitle>Study Group Tonight</CardTitle>
            <CardDescription>Computer Science 101</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>7:00 PM - 9:00 PM</span>
              <span>•</span>
              <span>Library Room 204</span>
            </div>
            <Progress value={75} />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">6/8 spots filled</span>
              <Button variant="secondary" size="sm">Join Group</Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Push Notifications</Label>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="location">Share Location</Label>
              <Switch id="location" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};