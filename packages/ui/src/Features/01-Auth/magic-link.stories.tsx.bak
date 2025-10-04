import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../atomic/atoms/form";
import { Input } from "../../atomic/atoms/input";
import { Button } from "../../atomic/atoms/button";
import { Alert, AlertDescription } from "../../atomic/atoms/alert";
import { useForm } from "react-hook-form";
import { EnvelopeClosedIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

const meta = {
  title: "01-Auth/Magic Link",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailInput: Story = {
  render: () => {
    const form = useForm();
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />

        <div className="relative z-10 border-b border-border backdrop-blur-xl transition-all duration-smooth ease-liquid">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-quick ease-liquid group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-smooth ease-liquid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to schools</span>
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">HIVE</span>
                </div>
              </div>
              <div className="w-32" />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Sign in to HIVE
              </h1>
              <p className="text-lg text-muted-foreground">
                Join <span className="text-primary font-semibold">University at Buffalo</span> on HIVE
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg transition-all duration-smooth ease-liquid hover:shadow-xl">
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School email address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your @buffalo.edu address"
                            className="transition-all duration-smooth ease-liquid"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Send magic link
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const form = useForm();
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 border-b border-border backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">HIVE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Sign in to HIVE</h1>
              <p className="text-lg text-muted-foreground">
                Join <span className="text-primary font-semibold">University at Buffalo</span> on HIVE
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg transition-all duration-smooth ease-liquid">
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School email address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your @buffalo.edu address"
                            className="border-destructive focus-visible:ring-destructive transition-all duration-smooth ease-liquid"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>Please use your @buffalo.edu email address</FormMessage>
                      </FormItem>
                    )}
                  />
                  <Alert variant="destructive" className="transition-all duration-smooth ease-liquid">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertDescription>
                      This email is not authorized for University at Buffalo. Please use your @buffalo.edu email address.
                    </AlertDescription>
                  </Alert>
                  <Button type="submit" className="w-full" disabled>
                    Send magic link
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const SendingLink: Story = {
  render: () => {
    const form = useForm();
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg transition-all duration-smooth ease-liquid">
            <Form {...form}>
              <form className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your @buffalo.edu address"
                          disabled
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending magic link...</span>
                  </div>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  },
};

export const LinkSent: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg text-center space-y-6 transition-all duration-smooth ease-liquid">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center transition-all duration-flowing ease-spring">
              <EnvelopeClosedIcon className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Check your inbox!</h3>
              <p className="text-muted-foreground">We've sent a magic link to:</p>
              <p className="text-primary font-semibold break-all">john.doe@buffalo.edu</p>
              <p className="text-xs text-muted-foreground">The link will expire in 1 hour</p>
            </div>

            <div className="space-y-3 pt-2">
              <Button className="w-full">Close</Button>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Didn't receive the email?</p>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-quick ease-liquid">
                  Request a new magic link →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const DevModeLink: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center transition-all duration-flowing ease-spring">
              <EnvelopeClosedIcon className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Check your inbox!</h3>
              <p className="text-muted-foreground">We've sent a magic link to:</p>
              <p className="text-primary font-semibold break-all">test@test.edu</p>
              <p className="text-xs text-muted-foreground">The link will expire in 1 hour</p>

              {/* Dev mode magic link */}
              <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-left transition-all duration-smooth ease-liquid">
                <p className="text-xs text-primary font-medium mb-2">🛠️ Development Mode - Magic Link:</p>
                <a
                  href="#"
                  className="text-xs text-primary hover:underline break-all transition-all duration-quick ease-liquid"
                >
                  http://localhost:3000/auth/verify?token=dev_abc123...
                </a>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Button className="w-full">Use Dev Magic Link</Button>
              <Button variant="outline" className="w-full">Close</Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
