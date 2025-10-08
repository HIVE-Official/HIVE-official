import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atomic/atoms/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const meta = {
  title: "02-Onboarding/Completion",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg text-center space-y-6 transition-all duration-smooth ease-liquid">
            {/* Success Icon with pulse */}
            <div className="mx-auto w-32 h-32 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center relative overflow-hidden transition-all duration-flowing ease-spring">
              <div className="text-5xl">🎉</div>
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDuration: '2s' }} />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold">
                Welcome to HIVE, Sarah!
              </h2>
              <p className="text-xl text-muted-foreground">
                Your profile is ready. Taking you to your new digital campus...
              </p>
            </div>

            {/* Floating particles */}
            <div className="relative h-12">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/60 rounded-full"
                  style={{
                    left: `${20 + i * 12}%`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
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

export const ProfileReady: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-lg">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg transition-all duration-smooth ease-liquid">
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center transition-all duration-flowing ease-spring">
                <CheckCircledIcon className="h-10 w-10 text-green-500" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold">You're all set!</h2>
                <p className="text-muted-foreground">
                  Welcome to HIVE. Let's explore your campus community.
                </p>
              </div>

              <div className="grid gap-3 text-left">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4 transition-all duration-smooth ease-liquid">
                  <CheckCircledIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Profile completed</p>
                    <p className="text-xs text-muted-foreground">Others can now find and connect with you</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4 transition-all duration-smooth ease-liquid">
                  <CheckCircledIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Interests selected</p>
                    <p className="text-xs text-muted-foreground">We'll recommend relevant spaces and content</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4 transition-all duration-smooth ease-liquid">
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Join your first space</p>
                    <p className="text-xs text-muted-foreground">Connect with communities that interest you</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full transition-all duration-smooth ease-liquid">
                Explore HIVE
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const CreatingProfile: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 text-center space-y-4">
          <div className="h-12 w-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto transition-all duration-dramatic ease-liquid" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Setting up your profile...</h2>
            <p className="text-muted-foreground">Creating your personalized campus experience</p>
          </div>
        </div>
      </div>
    );
  },
};

export const WithTermsAcceptance: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-2xl">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg transition-all duration-smooth ease-liquid">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">One last thing...</h2>
                <p className="text-muted-foreground">
                  Please review and accept our terms to continue
                </p>
              </div>

              <div className="space-y-4 rounded-lg border border-border bg-muted/50 p-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-border transition-all duration-quick ease-liquid"
                  />
                  <div className="flex-1 text-sm">
                    <span className="text-foreground">I agree to the </span>
                    <a href="#" className="text-primary hover:underline transition-all duration-quick ease-liquid">Terms of Service</a>
                    <span className="text-foreground"> and </span>
                    <a href="#" className="text-primary hover:underline transition-all duration-quick ease-liquid">Privacy Policy</a>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-border transition-all duration-quick ease-liquid"
                  />
                  <span className="text-sm text-foreground">
                    I consent to HIVE collecting and using my data as described in the Privacy Policy
                  </span>
                </label>
              </div>

              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">
                  By continuing, you agree that you're a current student, alumni, or faculty member at your selected university.
                  HIVE is a campus-only platform designed to build authentic college communities.
                </p>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" size="lg">
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Button>
                <Button size="lg" disabled>
                  Enter HIVE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
