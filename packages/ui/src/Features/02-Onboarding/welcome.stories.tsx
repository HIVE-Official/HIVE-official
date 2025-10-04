import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atomic/atoms/button";
import { Badge } from "../../atomic/atoms/badge";
import { Progress } from "../../atomic/atoms/progress";

const meta = {
  title: "02-Onboarding/Welcome",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 border-b border-border/20 backdrop-blur-sm transition-all duration-smooth ease-liquid">
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">HIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 pt-24 relative z-10">
          <div className="w-full max-w-2xl">
            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl shadow-lg overflow-hidden transition-all duration-smooth ease-liquid">
              {/* Progress Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="transition-all duration-quick ease-liquid">
                    Step 1 of 7
                  </Badge>
                  <span className="text-sm text-muted-foreground">14% complete</span>
                </div>
                <Progress value={14} className="transition-all duration-smooth ease-liquid" />
              </div>

              {/* Step Content */}
              <div className="p-6 pt-2">
                <div className="text-center space-y-8 py-6">
                  {/* Logo/Icon with pulse */}
                  <div className="mx-auto w-32 h-32 rounded-full bg-primary/20 backdrop-blur-xl flex items-center justify-center relative overflow-hidden transition-all duration-flowing ease-spring">
                    <div className="text-5xl">🐝</div>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold">
                      Welcome to <span className="text-primary">HIVE</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Your digital campus awaits
                    </p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      We'll walk you through a few quick steps to set up your profile.
                      This should only take a couple of minutes.
                    </p>

                    <Button size="lg" className="px-8 transition-all duration-smooth ease-liquid">
                      Get Started
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
