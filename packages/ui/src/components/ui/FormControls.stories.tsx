import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Input, SearchInput, PasswordInput } from "./input";
import { Textarea } from "./textarea";
import { Checkbox } from "./checkbox";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Switch } from "./switch";
import { Label } from "./label";
import { FormField, FormLabel, FormControl, FormDescription } from "./form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";

const FormControls = () => <div>Form Controls</div>;

const meta: Meta = {
  title: "UI/Form Controls",
  component: FormControls,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "#0A0A0A" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// FORM CONTROLS SHOWCASE
// ============================================================================

export const FormControlsShowcase: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      name: "",
      bio: "",
      notifications: true,
      theme: "dark",
      role: "",
      skills: [] as string[],
      newsletter: false,
    });

    return (
      <div className="w-full max-w-4xl mx-auto space-y-8 p-6 bg-background">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-display font-bold text-foreground">
            HIVE Form Controls
          </h1>
          <p className="text-body text-muted">
            Brand-consistent form components with dark-first design and gold
            accents
          </p>
        </div>

        {/* Form Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Controls */}
          <Card className="bg-surface border-[#2A2A2A]">
            <CardHeader>
              <CardTitle className="text-h3 text-foreground flex items-center gap-2">
                Input Controls
                <Badge variant="secondary" className="text-xs">
                  Interactive
                </Badge>
              </CardTitle>
              <CardDescription className="text-muted">
                Text inputs with HIVE brand styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Standard Input */}
              <FormField name="email">
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Your email will be used for account notifications
                </FormDescription>
              </FormField>

              {/* Password Input */}
              <FormField name="password">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </FormControl>
              </FormField>

              {/* Search Input */}
              <FormField name="search">
                <FormLabel htmlFor="search">Search</FormLabel>
                <FormControl>
                  <SearchInput
                    id="search"
                    placeholder="Search for anything..."
                  />
                </FormControl>
              </FormField>

              {/* Textarea */}
              <FormField name="bio">
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    rows={3}
                  />
                </FormControl>
              </FormField>
            </CardContent>
          </Card>

          {/* Selection Controls */}
          <Card className="bg-surface border-[#2A2A2A]">
            <CardHeader>
              <CardTitle className="text-h3 text-foreground flex items-center gap-2">
                Selection Controls
                <Badge variant="secondary" className="text-xs">
                  Interactive
                </Badge>
              </CardTitle>
              <CardDescription className="text-muted">
                Choice inputs with gold accent states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Checkbox */}
              <FormField name="newsletter">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        newsletter: !!checked,
                      }))
                    }
                  />
                  <FormLabel htmlFor="newsletter" className="text-body">
                    Subscribe to newsletter
                  </FormLabel>
                </div>
                <FormDescription>
                  Get updates about new features and content
                </FormDescription>
              </FormField>

              {/* Switch */}
              <FormField name="notifications">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel htmlFor="notifications">
                      Push Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive notifications on your device
                    </FormDescription>
                  </div>
                  <Switch
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        notifications: checked,
                      }))
                    }
                  />
                </div>
              </FormField>

              {/* Radio Group */}
              <FormField name="theme">
                <FormLabel>Theme Preference</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={formData.theme}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, theme: value }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <FormLabel htmlFor="dark">Dark Mode</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <FormLabel htmlFor="light">Light Mode</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <FormLabel htmlFor="system">System</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormField>

              {/* Select */}
              <FormField name="role">
                <FormLabel htmlFor="role">Role</FormLabel>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <FormControl>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </CardContent>
          </Card>
        </div>

        {/* Form Actions */}
        <Card className="bg-surface border-[#2A2A2A]">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button variant="outline" size="lg">
                Cancel
              </Button>
              <Button variant="default" size="lg">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Brand Guidelines */}
        <Card className="bg-surface border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-h3 text-foreground">
              HIVE Brand Guidelines
            </CardTitle>
            <CardDescription className="text-muted">
              Design principles for form controls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-body font-medium text-foreground">
                  Color System
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent"></div>
                  <span className="text-body-sm text-muted">
                    Gold accent (#FFD700)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-surface border border-[#2A2A2A]"></div>
                  <span className="text-body-sm text-muted">Dark surfaces</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-body font-medium text-foreground">
                  Motion
                </h4>
                <ul className="text-body-sm text-muted space-y-1">
                  <li>• 90ms micro-interactions</li>
                  <li>• Subtle scale effects (1.02x, 1.05x)</li>
                  <li>• Smooth easing curves</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
};

// ============================================================================
// INDIVIDUAL COMPONENT EXAMPLES
// ============================================================================

export const BasicInputs: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-background">
      <h2 className="text-h2 font-bold text-foreground">Basic Inputs</h2>
      <p className="text-body text-muted">
        Essential input components with HIVE brand styling
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text Inputs */}
        <Card className="bg-surface border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-h4">Text Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <PasswordInput placeholder="Enter password" />
            </div>

            <div className="space-y-2">
              <Label>Search</Label>
              <SearchInput placeholder="Search..." />
            </div>
          </CardContent>
        </Card>

        {/* Selection Inputs */}
        <Card className="bg-surface border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-h4">Selection Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Dropdown</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Radio Group</Label>
              <RadioGroup defaultValue="a">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="a" id="a" />
                  <Label htmlFor="a">Option A</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b" id="b" />
                  <Label htmlFor="b">Option B</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const InputVariants: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-background">
      <h2 className="text-h2 font-bold text-foreground">Input Variants</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Standard Input</Label>
          <Input placeholder="Enter text..." />
        </div>

        <div className="space-y-2">
          <Label>Search Input</Label>
          <SearchInput placeholder="Search..." />
        </div>

        <div className="space-y-2">
          <Label>Password Input</Label>
          <PasswordInput placeholder="Password..." />
        </div>

        <div className="space-y-2">
          <Label>Error State</Label>
          <Input placeholder="Invalid input" error shake />
        </div>
      </div>
    </div>
  ),
};

export const SelectionControls: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-background">
      <h2 className="text-h2 font-bold text-foreground">Selection Controls</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Checkboxes */}
        <Card className="bg-surface border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-h4">Checkboxes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="c1" />
              <Label htmlFor="c1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="c2" defaultChecked />
              <Label htmlFor="c2">Option 2 (checked)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="c3" disabled />
              <Label htmlFor="c3">Option 3 (disabled)</Label>
            </div>
          </CardContent>
        </Card>

        {/* Radio Buttons */}
        <Card className="bg-surface border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-h4">Radio Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="option1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="r1" />
                <Label htmlFor="r1">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="r2" />
                <Label htmlFor="r2">Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option3" id="r3" />
                <Label htmlFor="r3">Option 3</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Switches */}
        <Card className="bg-surface border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-h4">Switches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="s1">Notifications</Label>
              <Switch id="s1" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="s2">Dark Mode</Label>
              <Switch id="s2" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="s3">Disabled</Label>
              <Switch id="s3" disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};
