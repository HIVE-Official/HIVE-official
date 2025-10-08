import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../atomic/atoms/form";
import { Input } from "../../atomic/atoms/input";
import { Button } from "../../atomic/atoms/button";
import { Alert, AlertDescription } from "../../atomic/atoms/alert";
import { Badge } from "../../atomic/atoms/badge";
import { useForm } from "react-hook-form";
import { Mail, AlertCircle, CheckCircle2, Loader2, ArrowLeft, Shield } from "lucide-react";

/**
 * Complete Authentication Flow (SPEC.md aligned)
 *
 * Based on SPEC.md Authentication System:
 * - Method: Magic Link (passwordless)
 * - Provider: Firebase Auth
 * - Validation: Educational domain only (.edu)
 * - Campus Verification: Domain matching (e.g., @buffalo.edu → UB Buffalo)
 * - Session: Custom JWT with campus claims (7-day duration)
 * - Storage: HttpOnly secure cookies
 */

const meta = {
  title: "01-Auth/Complete Auth Flow",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Authentication Architecture

### Primary Flow
1. **Email Verification**: Educational domain validation (.edu required)
2. **Magic Link Generation**: Secure, time-limited tokens (1-hour expiry)
3. **Campus Assignment**: Automatic campus isolation based on email domain
4. **Session Creation**: JWT with campus claims and permissions
5. **Continuous Validation**: Session integrity checks

### Authorization Levels
- **Student**: Basic platform access, same-campus interactions
- **Space Admin**: Moderate specific spaces, manage membership
- **Campus Moderator**: Campus-wide moderation, user management
- **Platform Admin**: System administration, cross-campus oversight

### Security Features
- Magic link (no passwords)
- Domain verification (@buffalo.edu only for vBETA)
- Campus isolation (database-level)
- HttpOnly cookies (XSS protection)
- 7-day session with sliding window
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Step 1: School Selection (from /auth/login)
 * User selects University at Buffalo from school list
 */
export const SchoolSelection: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />

        {/* Header */}
        <div className="relative z-10 border-b border-border backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="text-2xl font-bold text-center">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">HIVE</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Join your campus
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your school to get started
              </p>
            </div>

            <div className="space-y-3">
              {/* Selected school */}
              <button className="w-full rounded-lg border-2 border-primary bg-primary/10 p-6 text-left hover:bg-primary/15 transition-all duration-smooth">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">University at Buffalo</p>
                    <p className="text-sm text-muted-foreground">@buffalo.edu</p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
              </button>

              {/* Other schools (disabled) */}
              <div className="rounded-lg border border-border bg-muted/20 p-6 opacity-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Other Schools</p>
                    <p className="text-sm text-muted-foreground">Coming soon</p>
                  </div>
                  <Badge variant="secondary">Waitlist</Badge>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full">
              Continue
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Step 2: Email Input (.edu validation)
 * User enters their @buffalo.edu email for magic link
 */
export const EmailInput: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "",
      },
    });

    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        {/* Header with back button */}
        <div className="relative z-10 border-b border-border backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
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

        {/* Main content */}
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

            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg">
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School email address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="Enter your @buffalo.edu address"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          We'll send you a magic link to sign in
                        </p>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full">
                    Send magic link
                  </Button>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>
                        By continuing, you agree to HIVE's Terms of Service and Privacy Policy.
                        Your data is campus-isolated and never shared.
                      </p>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Step 3: Invalid Email Domain
 * Error state when user enters non-.edu email
 */
export const InvalidEmailDomain: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "john@gmail.com",
      },
    });

    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 border-b border-border backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="text-2xl font-bold text-center">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">HIVE</span>
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

            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg">
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School email address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              className="pl-10 border-destructive focus-visible:ring-destructive"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage>Please use your @buffalo.edu email address</FormMessage>
                      </FormItem>
                    )}
                  />

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This email is not authorized for University at Buffalo. Please use your @buffalo.edu email address.
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" size="lg" className="w-full" disabled>
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

/**
 * Step 4: Sending Magic Link
 * Loading state while generating and sending magic link
 */
export const SendingMagicLink: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "john.doe@buffalo.edu",
      },
    });

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg">
            <Form {...form}>
              <form className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School email address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            className="pl-10"
                            disabled
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full" disabled>
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
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

/**
 * Step 5: Magic Link Sent (Success)
 * User receives confirmation and instructions
 */
export const MagicLinkSent: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg text-center space-y-6">
            {/* Success icon with animation */}
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center relative">
              <Mail className="w-8 h-8 text-primary" />
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Check your inbox!</h3>
              <p className="text-muted-foreground">We've sent a magic link to:</p>
              <p className="text-primary font-semibold break-all text-lg">john.doe@buffalo.edu</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Link expires in 1 hour</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Button size="lg" className="w-full">Close</Button>

              <div className="pt-4 border-t border-border space-y-3">
                <p className="text-sm text-muted-foreground">Didn't receive the email?</p>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>• Check your spam folder</p>
                  <p>• Make sure you entered the correct email</p>
                  <p>• Wait a few minutes for the email to arrive</p>
                </div>
                <Button variant="link" className="text-primary hover:text-primary/80">
                  Request a new magic link →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Step 6: Verification (Magic Link Clicked)
 * Loading state when user clicks magic link from email
 */
export const VerifyingLink: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Verifying your link...</h3>
            <p className="text-muted-foreground">
              Please wait while we verify your authentication
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secure campus-isolated session</span>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Step 7: Expired Link
 * Error state when magic link is expired (>1 hour old)
 */
export const ExpiredLink: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border border-destructive/50 bg-card/50 backdrop-blur-xl p-8 shadow-lg text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/20 border border-destructive/30 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Link expired</h3>
              <p className="text-muted-foreground">
                This magic link has expired for security reasons.
              </p>
              <p className="text-sm text-muted-foreground">
                Magic links are valid for 1 hour after being sent.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button size="lg" className="w-full">
                Request a new magic link
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Back to sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Step 8: New User - Redirect to Onboarding
 * Success state for first-time users (needs onboarding)
 */
export const NewUserRedirect: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center relative">
            <CheckCircle2 className="w-8 h-8 text-primary" />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Welcome to HIVE!</h3>
            <p className="text-muted-foreground">
              Let's set up your profile
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Redirecting to onboarding...</span>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Step 9: Returning User - Redirect to Feed
 * Success state for returning users (skip onboarding)
 */
export const ReturningUserRedirect: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center relative">
            <CheckCircle2 className="w-8 h-8 text-primary" />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Welcome back!</h3>
            <p className="text-muted-foreground">
              Redirecting to your feed...
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Loading your campus...</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs text-primary">
            <Shield className="h-3 w-3" />
            <span>Session: 7 days</span>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Development Mode: Magic Link Preview
 * Special dev mode showing the actual magic link URL
 */
export const DevModeMagicLink: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Check your inbox!</h3>
              <p className="text-muted-foreground">We've sent a magic link to:</p>
              <p className="text-primary font-semibold break-all">test@test.edu</p>
              <p className="text-xs text-muted-foreground">The link will expire in 1 hour</p>

              {/* Dev mode magic link */}
              <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4 text-left mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-orange-500 text-orange-500">
                    🛠️ Dev Mode
                  </Badge>
                </div>
                <p className="text-xs text-orange-400 font-medium mb-2">Magic Link URL:</p>
                <a
                  href="#"
                  className="text-xs text-orange-400 hover:underline break-all block"
                >
                  http://localhost:3000/auth/verify?token=dev_abc123xyz789...
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

// Import Clock for expired link story
import { Clock } from "lucide-react";
