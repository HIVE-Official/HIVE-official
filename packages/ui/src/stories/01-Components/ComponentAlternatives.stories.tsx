import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card';
import { Badge } from '../../components/badge';
import { Button } from '../../components/button';
import { CountdownSplashScreen, AnimatedSplashScreen } from '../../components';
import { useState } from 'react';
import { fn } from '@storybook/test';

const meta = {
  component: React.Fragment,
  title: 'Components/🎯 Alternatives Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Component Alternatives System

This story documents all maintained component alternatives and when to use each approach.

## Philosophy: Multiple Subjective Options

Rather than forcing single "correct" solutions, HIVE maintains multiple thoughtful alternatives for key components. This allows for:

- **A/B Testing**: Test different approaches with real users
- **Context-Specific Solutions**: Different UX patterns for different scenarios  
- **Design Evolution**: Gradually converge on winners through user feedback
- **Team Preferences**: Accommodate different design philosophies

## Current Alternatives

### Onboarding Components
- **Academic Step**: Motion-first vs Card-first approaches
- **Interest Selection**: Category-first vs Tag-first approaches
- **Welcome Step**: Hero-first vs Role-first approaches

### Splash Screens
- **Countdown**: Pre-launch anticipation building
- **Animated**: Brand experience with smooth transitions

See the individual stories below for detailed comparisons and selection guides.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlternativesOverview: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">HIVE Component Alternatives</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Multiple subjective approaches maintained in parallel for A/B testing and context-specific solutions
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">A/B Testing Ready</Badge>
          <Badge variant="secondary">Context-Specific</Badge>
          <Badge variant="primary">User-Driven Decisions</Badge>
        </div>
      </div>

      {/* Onboarding Alternatives */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">🎓 Onboarding Component Alternatives</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Step */}
          <Card variant="featured">
            <CardHeader>
              <CardTitle>Academic Information Step</CardTitle>
              <CardDescription>Two approaches to collecting academic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Alternative A: Motion-First</h4>
                <p className="text-sm text-muted-foreground">
                  <code>academic-step.tsx</code> - Smooth animations, minimal cards, focus on flow
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">Mobile-First</Badge>
                  <Badge size="sm">Minimal UI</Badge>
                  <Badge size="sm">Smooth Animations</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Alternative B: Card-First</h4>
                <p className="text-sm text-muted-foreground">
                  <code>academic-card-step.tsx</code> - Information density, card-based, familiar patterns
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">Information Dense</Badge>
                  <Badge size="sm">Card-Based</Badge>
                  <Badge size="sm">Familiar Patterns</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interest Selection */}
          <Card variant="featured">
            <CardHeader>
              <CardTitle>Interest Selection Step</CardTitle>
              <CardDescription>Category-based vs Tag-based selection patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Alternative A: Category-First</h4>
                <p className="text-sm text-muted-foreground">
                  <code>interests-step.tsx</code> - Hierarchical selection, academic organization
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">Hierarchical</Badge>
                  <Badge size="sm">Academic Feel</Badge>
                  <Badge size="sm">Organized</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Alternative B: Tag-First</h4>
                <p className="text-sm text-muted-foreground">
                  <code>interests-selection-step.tsx</code> - Social discovery, flexible selection
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">Social Discovery</Badge>
                  <Badge size="sm">Flexible</Badge>
                  <Badge size="sm">Modern Feel</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Welcome Step */}
          <Card variant="featured">
            <CardHeader>
              <CardTitle>Welcome Step</CardTitle>
              <CardDescription>Hero moment vs immediate utility approaches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Alternative A: Hero-First</h4>
                <p className="text-sm text-muted-foreground">
                  <code>welcome-step.tsx</code> - Brand introduction, excitement building
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">Brand Focus</Badge>
                  <Badge size="sm">Excitement</Badge>
                  <Badge size="sm">Hero Moment</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Alternative B: Role-First</h4>
                <p className="text-sm text-muted-foreground">
                  <code>welcome-role-step.tsx</code> - Immediate utility, get-to-value quickly
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">Utility First</Badge>
                  <Badge size="sm">Get-to-Value</Badge>
                  <Badge size="sm">Role-Based</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Splash Screen */}
          <Card variant="featured">
            <CardHeader>
              <CardTitle>Splash Screen</CardTitle>
              <CardDescription>Countdown vs Animation-focused approaches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Alternative A: Countdown-First</h4>
                <p className="text-sm text-muted-foreground">
                  <code>auth/splash-screen.tsx</code> - Launch anticipation, scarcity messaging
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">Pre-Launch</Badge>
                  <Badge size="sm">Scarcity</Badge>
                  <Badge size="sm">Countdown</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Alternative B: Animation-First</h4>
                <p className="text-sm text-muted-foreground">
                  <code>brand/splash-screen.tsx</code> - Premium brand experience, smooth transitions
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">Premium</Badge>
                  <Badge size="sm">Brand Experience</Badge>
                  <Badge size="sm">Smooth Animations</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selection Guide */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">🎯 Selection Decision Framework</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="secondary">
            <CardHeader>
              <CardTitle>Quick Decision Guide</CardTitle>
              <CardDescription>When to use each alternative</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">For Mobile-First Experience:</h4>
                <p className="text-sm text-muted-foreground">
                  Use <code>*-step.tsx</code> variants - smooth animations, minimal UI
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">For Information Density:</h4>
                <p className="text-sm text-muted-foreground">
                  Use <code>*-card-step.tsx</code> variants - familiar patterns, more data
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">For Academic Context:</h4>
                <p className="text-sm text-muted-foreground">
                  Use category-first, hero-first approaches
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">For Social Context:</h4>
                <p className="text-sm text-muted-foreground">
                  Use tag-first, role-first approaches
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="secondary">
            <CardHeader>
              <CardTitle>A/B Testing Recommendations</CardTitle>
              <CardDescription>High-impact tests to run</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Academic Step Testing:</h4>
                <p className="text-sm text-muted-foreground">
                  Test motion vs card for completion rates
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Interest Selection Testing:</h4>
                <p className="text-sm text-muted-foreground">
                  Test category vs tag for engagement
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Welcome Step Testing:</h4>
                <p className="text-sm text-muted-foreground">
                  Test hero vs role for user activation
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Success Metrics:</h4>
                <p className="text-sm text-muted-foreground">
                  Completion rates, time to complete, satisfaction scores
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">🔧 Implementation Guide</h2>
        
        <Card variant="secondary">
          <CardHeader>
            <CardTitle>Usage in Application Code</CardTitle>
            <CardDescription>How to choose alternatives in your components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Import Both Alternatives:</h4>
              <code className="text-sm bg-surface p-2 rounded block">
                {`import { AcademicStep, AcademicCardStep } from "@hive/ui";`}
              </code>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Use Feature Flags for A/B Testing:</h4>
              <code className="text-sm bg-surface p-2 rounded block">
                {`const useCardApproach = useFeatureFlag('onboarding-card-approach');
const AcademicComponent = useCardApproach ? AcademicCardStep : AcademicStep;`}
              </code>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Context-Based Selection:</h4>
              <code className="text-sm bg-surface p-2 rounded block">
                {`const isMobile = useMediaQuery('(max-width: 768px)');
const AcademicComponent = isMobile ? AcademicStep : AcademicCardStep;`}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">🚀 Rollout Strategy</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="surface">
            <CardHeader>
              <CardTitle>Phase 1: Documentation</CardTitle>
              <CardDescription>Current phase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">✅</Badge>
                <span className="text-sm">Document all alternatives</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">✅</Badge>
                <span className="text-sm">Create selection guidelines</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">✅</Badge>
                <span className="text-sm">Set up A/B testing framework</span>
              </div>
            </CardContent>
          </Card>

          <Card variant="surface">
            <CardHeader>
              <CardTitle>Phase 2: Experimentation</CardTitle>
              <CardDescription>vBETA period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">🧪</Badge>
                <span className="text-sm">A/B test key alternatives</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">📊</Badge>
                <span className="text-sm">Collect user feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">🎯</Badge>
                <span className="text-sm">Identify winning approaches</span>
              </div>
            </CardContent>
          </Card>

          <Card variant="surface">
            <CardHeader>
              <CardTitle>Phase 3: Consolidation</CardTitle>
              <CardDescription>Post-vBETA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="ghost" size="sm">🏆</Badge>
                <span className="text-sm">Promote winners to primary</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="ghost" size="sm">📚</Badge>
                <span className="text-sm">Keep runners-up documented</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="ghost" size="sm">🔄</Badge>
                <span className="text-sm">Ongoing experimentation</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-border space-y-4">
        <p className="text-sm text-muted-foreground">
          📋 <strong>Documentation:</strong> See <code>/packages/ui/COMPONENT_ALTERNATIVES.md</code> for complete details
        </p>
        <p className="text-sm text-muted-foreground">
          🎯 <strong>Philosophy:</strong> Multiple subjective options enable user-driven decisions through A/B testing
        </p>
        <Button variant="secondary">
          View Complete Documentation
        </Button>
      </div>
    </div>
  ),
};

export const SplashScreenComparison: Story = {
  render: () => {
    const [activeAlternative, setActiveAlternative] = useState<'countdown' | 'animated'>('countdown');

    return (
      <div className="min-h-screen bg-background p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Splash Screen Alternatives</h1>
          <div className="flex justify-center gap-2">
            <Button 
              variant={activeAlternative === 'countdown' ? 'accent' : 'outline'}
              onClick={() => setActiveAlternative('countdown')}
            >
              Countdown-First
            </Button>
            <Button 
              variant={activeAlternative === 'animated' ? 'accent' : 'outline'}
              onClick={() => setActiveAlternative('animated')}
            >
              Animation-First
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeAlternative === 'countdown' ? (
            <Card variant="featured">
              <CardHeader>
                <CardTitle>Alternative A: Countdown-First</CardTitle>
                <CardDescription>Pre-launch anticipation with countdown timer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-surface">
                  <CountdownSplashScreen onGetInside={fn()} />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm"><strong>Use When:</strong> Pre-launch, scarcity messaging, time-sensitive campaigns</p>
                  <p className="text-sm"><strong>Characteristics:</strong> Countdown timer, anticipation building, launch-focused</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card variant="featured">
              <CardHeader>
                <CardTitle>Alternative B: Animation-First</CardTitle>
                <CardDescription>Premium brand experience with smooth animations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-surface">
                  <AnimatedSplashScreen />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm"><strong>Use When:</strong> Premium brand experience, smooth onboarding, post-launch</p>
                  <p className="text-sm"><strong>Characteristics:</strong> Framer Motion, brand storytelling, emotional connection</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  },
};