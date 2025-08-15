import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { 
  HiveButton, 
  HiveCard, 
  HiveInput, 
  Stack, 
  Heading, 
  Text
} from '../../components';
import { HiveLogo } from '../../components/hive-icons';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';

// Wrapper component for UI components showcase
const UIComponentsShowcase = () => null;

const meta: Meta<typeof UIComponentsShowcase> = {
  title: '03-UI/Overview',
  component: UIComponentsShowcase,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Core HIVE Components Showcase
export const HiveComponents: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      {/* Logo */}
      <div className="text-center">
        <HiveLogo size="lg" variant="primary" />
      </div>

      {/* Buttons */}
      <div>
        <Heading level={3} className="mb-4">HIVE Buttons</Heading>
        <div className="flex gap-4 flex-wrap">
          <HiveButton variant="primary">Primary</HiveButton>
          <HiveButton variant="secondary">Secondary</HiveButton>
          <HiveButton variant="gold">Gold</HiveButton>
          <HiveButton variant="outline">Outline</HiveButton>
          <HiveButton variant="ghost">Ghost</HiveButton>
        </div>
      </div>

      {/* Cards */}
      <div>
        <Heading level={3} className="mb-4">HIVE Cards</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HiveCard className="p-6">
            <Stack gap={3}>
              <Heading level={4}>HIVE Card</Heading>
              <Text>This is a HIVE-branded card component with luxury styling.</Text>
              <HiveButton variant="primary" size="sm">Action</HiveButton>
            </Stack>
          </HiveCard>
          <HiveCard className="p-6">
            <Stack gap={3}>
              <Heading level={4}>Another Card</Heading>
              <Text>Cards can contain any content and maintain consistent styling.</Text>
              <HiveButton variant="gold" size="sm">Gold Action</HiveButton>
            </Stack>
          </HiveCard>
        </div>
      </div>

      {/* Form Elements */}
      <div>
        <Heading level={3} className="mb-4">HIVE Form Elements</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Stack gap={3}>
            <HiveInput placeholder="HIVE Input Component" />
            <HiveInput type="email" placeholder="Email input" />
            <HiveInput type="password" placeholder="Password input" />
          </Stack>
          <Stack gap={3}>
            <Text className="text-sm text-muted-foreground">
              HIVE inputs include built-in validation, focus states, and accessibility features.
            </Text>
          </Stack>
        </div>
      </div>

      {/* Typography */}
      <div>
        <Heading level={3} className="mb-4">Typography System</Heading>
        <Stack gap={3}>
          <Heading level={1}>Display Heading (H1)</Heading>
          <Heading level={2}>Section Heading (H2)</Heading>
          <Heading level={3}>Subsection Heading (H3)</Heading>
          <Heading level={4}>Component Heading (H4)</Heading>
          <Text size="lg">Large body text for emphasis</Text>
          <Text>Regular body text for general content</Text>
          <Text size="sm">Small text for secondary information</Text>
        </Stack>
      </div>
    </div>
  ),
};

// Shadcn UI Components Showcase
export const ShadcnComponents: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <Heading level={2}>Shadcn/UI Components</Heading>

      {/* Buttons */}
      <div>
        <Heading level={3} className="mb-4">Buttons</Heading>
        <div className="flex gap-4 flex-wrap">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Cards */}
      <div>
        <Heading level={3} className="mb-4">Cards</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <Stack gap={3}>
              <Heading level={4}>Shadcn Card</Heading>
              <Text>Base shadcn/ui card component.</Text>
              <Button size="sm">Action</Button>
            </Stack>
          </Card>
        </div>
      </div>

      {/* Form Elements */}
      <div>
        <Heading level={3} className="mb-4">Form Elements</Heading>
        <div className="space-y-4">
          <Input placeholder="Shadcn Input" />
          <div className="flex items-center space-x-2">
            <Switch id="example-switch" />
            <Text>Enable notifications</Text>
          </div>
          <Badge>Default Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <Heading level={3} className="mb-4">Tabs</Heading>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-4">
            <Text>Account settings and preferences.</Text>
            <Input placeholder="Username" />
          </TabsContent>
          <TabsContent value="password" className="space-y-4">
            <Text>Change your password here.</Text>
            <Input type="password" placeholder="New password" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Avatar */}
      <div>
        <Heading level={3} className="mb-4">Avatar</Heading>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
};

// Form Composition Example
export const FormExample: Story = {
  render: () => (
    <motion.div 
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <HiveCard className="p-6">
        <Stack gap={6}>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <HiveLogo size="md" variant="primary" />
            <Heading level={2} className="mt-4">Create Account</Heading>
            <Text className="text-muted-foreground">Join the HIVE community</Text>
          </motion.div>

          <Stack gap={4}>
            <HiveInput placeholder="Full Name" />
            <HiveInput type="email" placeholder="University Email" />
            <HiveInput placeholder="Choose Username" />
            
            <div className="flex items-center space-x-2">
              <Switch id="terms" />
              <Text size="sm">I agree to the Terms of Service</Text>
            </div>

            <HiveButton variant="primary" className="w-full">
              Create Account
            </HiveButton>
            
            <HiveButton variant="ghost" className="w-full">
              Already have an account? Sign in
            </HiveButton>
          </Stack>
        </Stack>
      </HiveCard>
    </motion.div>
  ),
};

// Motion System Showcase
export const MotionShowcase: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Heading level={2} className="text-center mb-8">HIVE Motion System</Heading>
        <Text className="text-center text-muted-foreground mb-12">
          Buttery smooth animations and micro-interactions that bring the HIVE experience to life
        </Text>
      </motion.div>

      {/* Interactive Button Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Heading level={3} className="mb-6">Interactive Buttons</Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { variant: "primary", children: "Primary" },
            { variant: "gold", children: "Gold" },
            { variant: "glow", children: "Glow" },
            { variant: "chip", children: "Chip" },
          ].map((btn, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
            >
              <HiveButton variant={btn.variant as any} className="w-full">
                {btn.children}
              </HiveButton>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glass Morphism Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Heading level={3} className="mb-6">Glass Morphism Effects</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="glass p-6 rounded-2xl"
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: "0 5 10 -3 color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)"
              }}
              transition={{ duration: 0.3 }}
            >
              <Stack gap={3}>
                <Heading level={4}>Glass Card {i}</Heading>
                <Text>Beautiful glass morphism effect with backdrop blur and subtle borders.</Text>
                <HiveButton variant="gold" size="sm">Interact</HiveButton>
              </Stack>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Liquid Metal Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <Heading level={3} className="mb-6">Liquid Metal Effects</Heading>
        <motion.div
          className="liquid-metal p-8 rounded-3xl text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <Heading level={4} className="mb-3">Dynamic Background</Heading>
          <Text className="mb-6">Fluid, animated gradients that respond to user interaction</Text>
          <HiveButton variant="primary">Experience the Flow</HiveButton>
        </motion.div>
      </motion.div>

      {/* Stagger Animation Demo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <Heading level={3} className="mb-6">Stagger Animations</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              className="bg-[var(--hive-background-secondary)]/60 backdrop-blur-sm border border-[var(--hive-border-default)] p-4 rounded-xl hive-interactive"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 2.0 + i * 0.1, 
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(17, 17, 19, 0.8)"
              }}
            >
              <Text className="text-center">Item {i}</Text>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  ),
};