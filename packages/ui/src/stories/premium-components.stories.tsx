import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Slider } from "../components/ui/slider";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ScrollArea } from "../components/ui/scroll-area";
import { Heading, Text } from "../components/ui/typography";
import { Button } from "../components/ui/button";
import { Star, Crown, Zap, Shield, Sparkles } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Foundation/Premium Components - Apple/Vercel Quality",
  component: Badge,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PremiumBadgeShowcase: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level={2} className="text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent-gold" />
            Premium Badge Collection
          </Heading>
          <Text className="text-white/60">
            Apple/Vercel-grade design with sophisticated glassmorphism and
            motion
          </Text>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Text size="sm" className="text-white/80 font-medium">
              Core Variants
            </Text>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="gold">Premium Gold</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="solid">Solid</Badge>
              <Badge variant="ghost">Ghost</Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Text size="sm" className="text-white/80 font-medium">
              Enhanced with Icons & Indicators
            </Text>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="gold"
                size="sm"
                prefix={<Crown className="h-3 w-3" />}
              >
                VIP Member
              </Badge>
              <Badge variant="success" size="md" dot>
                Live Stream
              </Badge>
              <Badge
                variant="error"
                size="lg"
                suffix={<Zap className="h-3 w-3" />}
              >
                Critical Alert
              </Badge>
              <Badge
                variant="outline"
                prefix={<Shield className="h-3 w-3" />}
                suffix="99+"
              >
                Security
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SophisticatedFormControls: Story = {
  render: () => (
    <div className="space-y-12 max-w-2xl">
      <div className="space-y-2">
        <Heading level={2} className="text-white">
          Sophisticated Form Controls
        </Heading>
        <Text className="text-white/60">
          Premium interaction design with fluid animations and perfect visual
          feedback
        </Text>
      </div>

      {/* Premium Checkboxes */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level={4} className="text-white">
            Premium Checkboxes
          </Heading>
          <Text size="sm" className="text-white/60">
            Glass morphism with scale animations and gold accents
          </Text>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Checkbox id="small" size="sm" />
              <Label htmlFor="small" size="sm">
                Small
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medium" size="md" defaultChecked />
              <Label htmlFor="medium">Medium (Checked)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="large" size="lg" />
              <Label htmlFor="large" size="lg">
                Large
              </Label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="indeterminate" size="md" checked="indeterminate" />
            <Label htmlFor="indeterminate">Indeterminate State</Label>
          </div>
        </div>
      </div>

      {/* Elegant Radio Groups */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level={4} className="text-white">
            Elegant Radio Groups
          </Heading>
          <Text size="sm" className="text-white/60">
            Sophisticated selection with gold indicators and scale feedback
          </Text>
        </div>
        <RadioGroup defaultValue="premium" className="space-y-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="premium" id="premium" size="md" />
            <div className="space-y-1">
              <Label htmlFor="premium">Premium Plan</Label>
              <Text size="sm" className="text-white/60">
                Full access with priority support
              </Text>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="basic" id="basic" size="md" />
            <div className="space-y-1">
              <Label htmlFor="basic">Basic Plan</Label>
              <Text size="sm" className="text-white/60">
                Essential features included
              </Text>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="disabled" id="disabled" size="md" disabled />
            <div className="space-y-1">
              <Label htmlFor="disabled">Enterprise (Coming Soon)</Label>
              <Text size="sm" className="text-white/60">
                Advanced features in development
              </Text>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Fluid Switch Animations */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level={4} className="text-white">
            Fluid Switch Animations
          </Heading>
          <Text size="sm" className="text-white/60">
            iOS-quality switches with 300ms fluid transitions and gold gradients
          </Text>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push Notifications</Label>
              <Text size="sm" className="text-white/60">
                Receive updates about your account
              </Text>
            </div>
            <Switch size="md" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Dark Mode</Label>
              <Text size="sm" className="text-white/60">
                Use dark theme across the app
              </Text>
            </div>
            <Switch size="md" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Analytics</Label>
              <Text size="sm" className="text-white/60">
                Help improve our service
              </Text>
            </div>
            <Switch size="lg" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AdvancedControls: Story = {
  render: () => (
    <div className="space-y-12 max-w-2xl">
      <div className="space-y-2">
        <Heading level={2} className="text-white">
          Advanced Form Controls
        </Heading>
        <Text className="text-white/60">
          Professional-grade inputs with sophisticated design and interaction
          patterns
        </Text>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Premium Textarea</Label>
            <Text size="sm" className="text-white/60">
              Sophisticated text input with glass morphism
            </Text>
          </div>
          <Textarea
            placeholder="Share your thoughts about the new design system..."
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Sophisticated Slider</Label>
            <Text size="sm" className="text-white/60">
              Precise value selection with touch-optimized design
            </Text>
          </div>
          <div className="space-y-3">
            <Slider defaultValue={[75]} max={100} step={1} />
            <div className="flex justify-between text-xs text-white/60">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Elegant Select</Label>
            <Text size="sm" className="text-white/60">
              Beautiful dropdown with smooth animations
            </Text>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose your preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light Theme</SelectItem>
              <SelectItem value="dark">Dark Theme</SelectItem>
              <SelectItem value="system">System Default</SelectItem>
              <SelectItem value="auto">Auto (Time-based)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveElements: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div className="space-y-2">
        <Heading level={2} className="text-white">
          Interactive Elements
        </Heading>
        <Text className="text-white/60">
          Sophisticated dialogs and menus with professional animations
        </Text>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Open Premium Dialog
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sophisticated Alert Dialog</AlertDialogTitle>
                <AlertDialogDescription>
                  This dialog showcases the refined design quality with proper
                  glassmorphism, backdrop blur, and elegant motion. Notice the
                  attention to detail in spacing, typography, and interaction
                  feedback.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <Crown className="mr-2 h-4 w-4" />
                Premium Dropdown Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Add to Favorites
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Security Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Zap className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        <div className="space-y-4">
          <Heading level={4} className="text-white">
            Tab Navigation
          </Heading>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Text className="text-white/80">
                Overview content with premium design and spacing. Notice the
                sophisticated tab animations and transitions.
              </Text>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4 mt-4">
              <Text className="text-white/80">
                Analytics dashboard content would go here with beautiful data
                visualization.
              </Text>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4 mt-4">
              <Text className="text-white/80">
                Settings panel with all the premium form controls we've
                designed.
              </Text>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  ),
};
