import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atomic/atoms/button";
import { CheckCircledIcon, Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";

const meta = {
  title: "01-Auth/Verification",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verifying: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 max-w-md text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center transition-all duration-flowing ease-spring">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Verifying your access</h2>
            <p className="text-muted-foreground">
              Please wait while we verify your magic link
            </p>
          </div>
        </div>
      </div>
    );
  },
};

export const Success: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />

        <div className="relative z-10 max-w-md text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center transition-all duration-flowing ease-spring">
            <CheckCircledIcon className="h-10 w-10 text-green-500" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Welcome to HIVE!</h2>
            <p className="text-muted-foreground">
              You've been successfully signed in. Taking you to your digital campus...
            </p>
          </div>

          {/* Floating particles effect */}
          <div className="relative h-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/60 rounded-full transition-all duration-dramatic ease-liquid"
                style={{
                  left: `${20 + i * 12}%`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(0); opacity: 0; }
            50% { transform: translateY(-20px) scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/20 border border-destructive/30 flex items-center justify-center transition-all duration-flowing ease-spring">
              <Cross2Icon className="h-8 w-8 text-destructive" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Verification Failed</h2>
              <p className="text-muted-foreground">
                Unable to verify your magic link. The link may have expired or been used already.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-4 text-left">
              <p className="text-xs text-muted-foreground">
                Magic links expire after 1 hour for security. Request a new link to continue.
              </p>
            </div>

            <Button className="w-full">
              Get a new magic link
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const ExpiredLink: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/20 border border-destructive/30 flex items-center justify-center">
              <svg className="h-8 w-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Link expired</h2>
              <p className="text-muted-foreground">
                This magic link has expired
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-4 text-left">
              <p className="text-xs text-muted-foreground">
                Magic links expire after 1 hour for security. Request a new one to continue.
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full">
                Request new magic link
              </Button>
              <Button variant="ghost" className="w-full">
                Start over
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const NetworkError: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/20 border border-destructive/30 flex items-center justify-center">
              <svg className="h-8 w-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Connection Error</h2>
              <p className="text-muted-foreground">
                Unable to connect to the server. Please check your internet connection and try again.
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full">
                <ReloadIcon className="mr-2 h-4 w-4" />
                Retry
              </Button>
              <Button variant="outline" className="w-full">
                Back to login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
