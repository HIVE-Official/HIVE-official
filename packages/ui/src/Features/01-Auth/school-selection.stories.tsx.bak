import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atomic/atoms/button";
import { Badge } from "../../atomic/atoms/badge";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const meta = {
  title: "01-Auth/School Selection",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const schools = [
  {
    id: "ub",
    name: "University at Buffalo",
    domain: "buffalo.edu",
    location: "Buffalo, NY",
  },
  {
    id: "test-university",
    name: "Test University (Development)",
    domain: "test.edu",
    location: "Development, NY",
  },
];

export const Default: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.05)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,hsl(var(--primary)/0.08)_0%,transparent_50%)]" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all duration-dramatic ease-liquid" />
        <div className="absolute bottom-40 right-[15%] w-40 h-40 bg-primary/8 rounded-full blur-3xl transition-all duration-dramatic ease-liquid" />

        {/* Header */}
        <div className="relative z-10 border-b border-border backdrop-blur-xl transition-all duration-smooth ease-liquid">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-quick ease-liquid group">
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-smooth ease-liquid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to home</span>
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

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight transition-all duration-smooth ease-liquid">
                Welcome to HIVE
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your university to continue
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg transition-all duration-smooth ease-liquid hover:shadow-xl">
              <div className="space-y-3">
                {schools.map((school) => (
                  <button
                    key={school.id}
                    className="w-full p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 hover:bg-accent transition-all duration-smooth ease-liquid group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-quick ease-liquid">
                          {school.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{school.location}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1 font-mono">@{school.domain}</p>
                      </div>
                      <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-quick ease-liquid" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithDevModeBadge: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 border-b border-border backdrop-blur-xl transition-all duration-smooth ease-liquid">
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
            {/* Dev Mode Badge */}
            <div className="rounded-lg border border-primary/30 bg-primary/10 backdrop-blur-xl p-4 transition-all duration-smooth ease-liquid">
              <p className="text-sm text-primary font-medium text-center">
                🛠️ Development Mode Active
              </p>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Welcome to HIVE
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your university to continue
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg transition-all duration-smooth ease-liquid">
              <div className="space-y-3">
                {schools.map((school) => (
                  <button
                    key={school.id}
                    className="w-full p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 hover:bg-accent transition-all duration-smooth ease-liquid group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="font-semibold group-hover:text-primary transition-colors duration-quick ease-liquid">
                          {school.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{school.location}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1 font-mono">@{school.domain}</p>
                      </div>
                      <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-quick ease-liquid" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
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
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Welcome to HIVE
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your university to continue
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin transition-all duration-dramatic ease-liquid" />
                </div>
                <p className="text-sm text-muted-foreground text-center">Loading universities...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
