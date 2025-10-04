import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../atomic/atoms/badge";
import { Button } from "../../atomic/atoms/button";
import { Progress } from "../../atomic/atoms/progress";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const meta = {
  title: "02-Onboarding/Interests",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const interestCategories = [
  {
    id: "academic",
    title: "Academic (The Grind)",
    emoji: "📚",
    interests: [
      "CS major (actually cool unlike at other schools)",
      "Pre-med stress case",
      "Engineering survivor",
      "Business school networking",
      "Liberal arts defender",
      "Study abroad flexer",
    ],
  },
  {
    id: "social",
    title: "Social (IRL Connections)",
    emoji: "🎉",
    interests: [
      "Party legend",
      "Social coordinator",
      "Introvert by choice",
      "Greek life recruit",
      "Wing person duties",
      "Professional networker",
    ],
  },
  {
    id: "food",
    title: "Food & Survival",
    emoji: "🍕",
    interests: [
      "Ramen connoisseur",
      "Coffee addict (obviously)",
      "Dining hall regular",
      "Food truck hunter",
      "Midnight snack specialist",
      "Pizza ordering champion",
    ],
  },
  {
    id: "buffalo",
    title: "Buffalo Culture",
    emoji: "🏙️",
    interests: [
      "Bills Mafia member",
      "Wings expert (not mild)",
      "Beef on weck lover",
      "Elmwood Village explorer",
      "Snow day champion",
      "Lake effect veteran",
    ],
  },
];

export const Default: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 border-b border-border/20 backdrop-blur-sm">
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
          <div className="w-full max-w-3xl">
            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl shadow-lg overflow-hidden transition-all duration-smooth ease-liquid">
              {/* Progress Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Step 6 of 7</Badge>
                    <h2 className="text-lg font-semibold">Your Interests</h2>
                  </div>
                  <span className="text-sm text-muted-foreground">86% complete</span>
                </div>
                <Progress value={86} className="transition-all duration-smooth ease-liquid" />
              </div>

              {/* Step Content */}
              <div className="p-6 pt-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Select 3-6 interests to help us recommend spaces and connections
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">3 selected</span> • Select at least 3 to continue
                    </p>
                  </div>

                  {/* Scrollable interests */}
                  <div className="max-h-[500px] overflow-y-auto pr-2 space-y-6">
                    {interestCategories.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <div className="flex items-center gap-2 sticky top-0 bg-card/90 backdrop-blur-sm py-2 z-10">
                          <span className="text-2xl">{category.emoji}</span>
                          <h3 className="text-sm font-semibold">{category.title}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {category.interests.map((interest, index) => (
                            <button
                              key={interest}
                              className={`
                                flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium text-left
                                transition-all duration-quick ease-liquid
                                ${index % 3 === 0
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "bg-background border-border hover:bg-accent hover:border-primary/50"
                                }
                              `}
                            >
                              <span className="flex-1 line-clamp-1">{interest}</span>
                              {index % 3 === 0 && (
                                <CheckCircledIcon className="h-4 w-4 flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t border-border">
                    <Button variant="outline" size="lg">
                      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </Button>
                    <Button size="lg">
                      Continue
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

        {/* Sidebar */}
        <div className="hidden lg:block w-80 p-6 pt-24 relative z-10">
          <div className="sticky top-6 space-y-6">
            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-4">
              <h3 className="text-lg font-semibold mb-4">Building your profile...</h3>

              <div className="relative space-y-3">
                {/* Profile Photo Card */}
                <div className="w-20 h-24 rounded-lg border border-border bg-muted/50 flex items-center justify-center">
                  <div className="text-2xl">👤</div>
                </div>

                {/* Info Cards with rotation */}
                <div className="relative -ml-2 space-y-2">
                  <div className="rounded-lg border border-border bg-card p-3 rotate-1 transition-all duration-smooth ease-liquid">
                    <div className="text-xs text-muted-foreground mb-1">Name</div>
                    <div className="text-sm font-semibold">Sarah Chen</div>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-3 -rotate-1 relative -mt-1 transition-all duration-smooth ease-liquid">
                    <div className="text-xs text-muted-foreground mb-1">Handle</div>
                    <div className="text-sm text-primary font-medium">@sarahc</div>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-3 rotate-1 relative -mt-1 transition-all duration-smooth ease-liquid">
                    <div className="text-xs text-muted-foreground mb-1">Major</div>
                    <div className="text-sm">Computer Science</div>
                  </div>

                  {/* Interests Badge */}
                  <div className="rounded-lg border border-primary/50 bg-primary/10 p-2 -rotate-1 relative -mt-1 transition-all duration-smooth ease-liquid">
                    <div className="flex items-center text-primary text-xs">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>3 interests selected</span>
                    </div>
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

export const NoneSelected: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

        <div className="relative z-10 w-full max-w-3xl">
          <div className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">What are you interested in?</h2>
                <p className="text-muted-foreground">
                  Select 3-6 interests to help us recommend spaces and connections
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-destructive font-medium">0 selected</span> • Select at least 3 to continue
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📚</span>
                    <h3 className="text-sm font-semibold">Academic (The Grind)</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {interestCategories[0].interests.map((interest) => (
                      <button
                        key={interest}
                        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-left hover:bg-accent hover:border-primary/50 transition-all duration-quick ease-liquid"
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border">
                <Button variant="outline" size="lg">Back</Button>
                <Button size="lg" disabled>
                  Continue (select 3-6)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
