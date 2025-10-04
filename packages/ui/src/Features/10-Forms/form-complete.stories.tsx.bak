import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../atomic/atoms/form";
import { Input } from "../../atomic/atoms/input";
import { Textarea } from "../../atomic/atoms/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../atomic/atoms/select";
import { Checkbox } from "../../atomic/atoms/checkbox";
import { Button } from "../../atomic/atoms/button";
import { useForm } from "react-hook-form";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const meta = {
  title: "10-Forms/Form Complete",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileEditForm: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        displayName: "Sarah Chen",
        handle: "sarahc",
        bio: "CS major • Coffee enthusiast • Always down for a study session",
        major: "computer-science",
        graduationYear: "2027",
      },
    });

    return (
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-smooth ease-liquid hover:shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <p className="text-sm text-muted-foreground mt-1">Update your public profile information</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} className="transition-all duration-smooth ease-liquid" />
                  </FormControl>
                  <FormDescription>This is your public display name on HIVE</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                      <Input placeholder="username" {...field} className="pl-7 transition-all duration-smooth ease-liquid" />
                    </div>
                  </FormControl>
                  <FormDescription>Your unique username on HIVE</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      className="resize-none transition-all duration-smooth ease-liquid"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Brief description for your profile (optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="transition-all duration-smooth ease-liquid">
                          <SelectValue placeholder="Select major" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="psychology">Psychology</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="graduationYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="transition-all duration-smooth ease-liquid">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  },
};

export const CreateSpaceForm: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        spaceName: "",
        description: "",
        category: "",
        privacy: "public",
        termsAccepted: false,
      },
    });

    return (
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-smooth ease-liquid">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Create a Space</h2>
          <p className="text-sm text-muted-foreground mt-1">Start a new community on campus</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
            <FormField
              control={form.control}
              name="spaceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Space Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CS Study Group" {...field} className="transition-all duration-smooth ease-liquid" />
                  </FormControl>
                  <FormDescription>Choose a clear, descriptive name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's this space about?"
                      className="resize-none min-h-[100px] transition-all duration-smooth ease-liquid"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Help others understand your community's purpose</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="transition-all duration-smooth ease-liquid">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="sports">Sports & Recreation</SelectItem>
                      <SelectItem value="arts">Arts & Culture</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 transition-all duration-smooth ease-liquid">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I agree to the Community Guidelines</FormLabel>
                    <FormDescription>
                      All spaces must follow HIVE's community standards
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={!form.watch("termsAccepted")}>
              Create Space
            </Button>
          </form>
        </Form>
      </div>
    );
  },
};

export const WithValidationErrors: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "invalid-email",
        password: "123",
        confirmPassword: "456",
      },
    });

    // Simulate validation errors
    form.setError("email", { message: "Please enter a valid @buffalo.edu email address" });
    form.setError("password", { message: "Password must be at least 8 characters" });
    form.setError("confirmPassword", { message: "Passwords do not match" });

    return (
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-smooth ease-liquid">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="text-sm text-muted-foreground mt-1">Create your HIVE account</p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campus Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@buffalo.edu"
                      {...field}
                      className="border-destructive focus-visible:ring-destructive transition-all duration-smooth ease-liquid"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="border-destructive focus-visible:ring-destructive transition-all duration-smooth ease-liquid"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="border-destructive focus-visible:ring-destructive transition-all duration-smooth ease-liquid"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled>
              Create Account
            </Button>
          </form>
        </Form>
      </div>
    );
  },
};

export const WithSuccessState: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        displayName: "Sarah Chen",
        email: "sarah.chen@buffalo.edu",
      },
    });

    return (
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-smooth ease-liquid">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Profile Updated!</h2>
          <p className="text-sm text-muted-foreground mt-1">Your changes have been saved</p>
        </div>

        <div className="mb-6 rounded-lg border border-green-500/50 bg-green-500/10 p-4 transition-all duration-smooth ease-liquid">
          <div className="flex items-center gap-2">
            <CheckCircledIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              Profile successfully updated
            </p>
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-green-500 focus-visible:ring-green-500 transition-all duration-smooth ease-liquid"
                      disabled
                    />
                  </FormControl>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <CheckCircledIcon className="h-3 w-3" />
                    <span>Saved</span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-green-500 focus-visible:ring-green-500 transition-all duration-smooth ease-liquid"
                      disabled
                    />
                  </FormControl>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <CheckCircledIcon className="h-3 w-3" />
                    <span>Saved</span>
                  </div>
                </FormItem>
              )}
            />

            <Button className="w-full" variant="outline">
              Done
            </Button>
          </form>
        </Form>
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        message: "Hey! Are you going to the game tonight?",
      },
    });

    return (
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-smooth ease-liquid">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Post to Feed</h2>
          <p className="text-sm text-muted-foreground mt-1">Share with your campus community</p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's on your mind?</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none min-h-[100px] transition-all duration-smooth ease-liquid"
                      disabled
                    />
                  </FormControl>
                  <FormDescription>Share your thoughts with the community</FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Posting...</span>
              </div>
            </Button>
          </form>
        </Form>
      </div>
    );
  },
};
