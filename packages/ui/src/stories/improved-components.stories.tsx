import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { EmptyState } from "../components/ui/empty-state";
import { WaitlistForm } from "../components/waitlist-form";
import { Badge } from "../components/ui/badge";
import { Heading, Text } from "../components/ui/typography";
import { Mail, Search, Plus, Settings, Users } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Foundation/Improved Components",
  component: Button,
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

export const ButtonVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Heading level={3} className="text-white">
          Button Variants
        </Heading>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Delete Account</Button>
          <Button variant="link">Learn More</Button>
        </div>
      </div>

      <div className="space-y-4">
        <Heading level={3} className="text-white">
          Button Sizes
        </Heading>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Heading level={3} className="text-white">
          Button States
        </Heading>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading...</Button>
          <Button disabled>Disabled</Button>
          <Button width="wide">Wide Button</Button>
          <Button width="full">Full Width Button</Button>
        </div>
      </div>
    </div>
  ),
};

export const InputVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div className="space-y-4">
        <Heading level={3} className="text-white">
          Input Variants
        </Heading>
        <div className="space-y-4">
          <Input placeholder="Regular input" />
          <Input
            placeholder="Search..."
            prefixIcon={<Search className="h-4 w-4" />}
          />
          <Input
            type="email"
            placeholder="Email address"
            suffixIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            placeholder="Error state"
            error
            defaultValue="invalid@example"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Heading level={3} className="text-white">
          Input Sizes
        </Heading>
        <div className="space-y-4">
          <Input inputSize="sm" placeholder="Small input" />
          <Input inputSize="md" placeholder="Medium input (default)" />
          <Input inputSize="lg" placeholder="Large input" />
        </div>
      </div>
    </div>
  ),
};

export const ImprovedCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Welcome to HIVE</CardTitle>
          <CardDescription>
            Your campus community awaits. Connect, collaborate, and create.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-white/80">
            Join thousands of students already building the future together.
          </Text>
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="w-full">
            Get Started
          </Button>
        </CardFooter>
      </Card>

      <Card className="cursor-pointer hover:bg-white/5 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Interactive Card</CardTitle>
            <Badge variant="gold">New</Badge>
          </div>
          <CardDescription>
            This card responds to hover and demonstrates interactive states.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-accent-gold">
            <Users className="h-4 w-4" />
            <Text size="sm">127 members active</Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const EmptyStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
      <EmptyState
        icon={Users}
        title="No spaces yet"
        description="Create your first space to start collaborating with your peers."
        action={{
          children: "Create Space",
          variant: "primary",
        }}
      />

      <EmptyState
        icon={Search}
        title="No results found"
        description="Try adjusting your search terms or browse popular content."
        size="lg"
        action={{
          children: "Browse All",
          variant: "secondary",
        }}
      />
    </div>
  ),
};

export const WaitlistFormExample: Story = {
  render: () => (
    <div className="flex justify-center">
      <WaitlistForm
        onSubmit={async (email) => {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000));
          console.log("Submitted:", email);
        }}
      />
    </div>
  ),
};
