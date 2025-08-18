import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Container } from '../../components/ui/container';
import { Text as Typography } from '../../atomic/atoms/text';

/**
 * # 🔧 Tools & Creation Feature Slice
 * 
 * Solutions you build and share with your community - creating connections around solving real problems together.
 * 
 * ## Tools Philosophy
 * 
 * Traditional productivity apps are built for individual use. HIVE Tools are **collaborative solutions** - 
 * where students build utilities together and share them with their campus communities.
 * 
 * ## Core Systems
 * 
 * - **Simple Tool Builder**: Visual interface for creating campus utilities
 * - **Tool Library**: Discover and use tools created by other students
 * - **HiveLab Integration**: Advanced tool building and collaboration
 * - **Campus Deployment**: Share tools with spaces and communities
 * - **Usage Analytics**: Understand tool impact and effectiveness
 */

const ToolsCreationOverview = () => {
  const toolCategories = [
    {
      title: "Academic Tools",
      description: "Study aids, course management, and academic productivity",
      examples: ["Study Schedule Planner", "Group Project Tracker", "Exam Prep Quiz Builder"],
      color: "hive-blue",
      icon: "🎓"
    },
    {
      title: "Social Coordination",
      description: "Event planning, group coordination, and social organization",
      examples: ["Event RSVP Manager", "Study Group Scheduler", "Floor Activity Planner"],
      color: "hive-green",
      icon: "📅"
    },
    {
      title: "Campus Life",
      description: "Daily campus utilities and quality of life improvements", 
      examples: ["Dining Hall Wait Times", "Laundry Tracker", "Library Space Finder"],
      color: "hive-orange",
      icon: "🏫"
    },
    {
      title: "Skill Building",
      description: "Learning tools, practice systems, and skill development",
      examples: ["Interview Practice Bot", "Coding Challenge Creator", "Language Learning Cards"],
      color: "hive-purple",
      icon: "⚡"
    }
  ];

  const components = [
    {
      title: "Simple Tool Builder",
      description: "Visual drag-and-drop interface for creating campus utilities without coding",
      status: "Production Ready",
      features: ["Form Builder", "Logic Engine", "Campus Templates", "One-Click Deploy"]
    },
    {
      title: "Tool Configuration Panel",
      description: "Advanced settings and customization for tool creators",
      status: "Production Ready", 
      features: ["Permissions", "Integrations", "Analytics", "Collaboration"]
    },
    {
      title: "Tool Library Modal",
      description: "Discover, preview, and install tools created by the campus community",
      status: "Production Ready",
      features: ["Search & Filter", "Previews", "Ratings", "Quick Install"]
    },
    {
      title: "HiveLab Integration",
      description: "Advanced tool building environment for complex campus solutions",
      status: "Production Ready",
      features: ["Code Editor", "Team Collaboration", "Version Control", "Testing"]
    },
    {
      title: "Campus Deployment",
      description: "Share tools with specific spaces, communities, or the entire campus",
      status: "Production Ready",
      features: ["Space Integration", "Permission Control", "Usage Tracking", "Updates"]
    },
    {
      title: "Usage Analytics",
      description: "Understand how your tools are being used and their campus impact",
      status: "Production Ready",
      features: ["Usage Stats", "User Feedback", "Performance Metrics", "Impact Reports"]
    }
  ];

  return (
    <Container className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <Typography variant="h1" className="text-4xl font-bold">
          🔧 Tools & Creation
        </Typography>
        <Typography variant="body1" className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Solutions you build and share with your community. Creating connections around 
          solving real problems together at University at Buffalo.
        </Typography>
        <div className="flex justify-center gap-2">
          <Badge variant="default">Visual Builder</Badge>
          <Badge variant="secondary">Community Driven</Badge>
          <Badge variant="outline">Problem Solving</Badge>
        </div>
      </div>

      {/* Tools Philosophy */}
      <Card className="border-hive-purple/20 bg-gradient-to-r from-hive-purple/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-hive-purple">Collaborative Solutions</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="body1" className="mb-4">
            HIVE Tools aren't just personal productivity apps - they're community solutions where students:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm">
              <li>• <strong>Identify Problems</strong> - Campus pain points and inefficiencies</li>
              <li>• <strong>Build Solutions</strong> - Custom tools for specific needs</li>
              <li>• <strong>Share Widely</strong> - Deploy to spaces and communities</li>
              <li>• <strong>Iterate Together</strong> - Improve based on community feedback</li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Learn by Building</strong> - Develop technical and design skills</li>
              <li>• <strong>Help Others</strong> - Create tools that benefit the community</li>
              <li>• <strong>Connect Through Making</strong> - Bond over shared problem-solving</li>
              <li>• <strong>Build Portfolio</strong> - Showcase your campus impact</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tool Categories */}
      <div>
        <Typography variant="h2" className="text-2xl font-bold mb-6">Categories of Campus Tools</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolCategories.map((category, index) => (
            <Card key={index} className={`border-${category.color}/20 hover:border-${category.color}/40 transition-colors`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <CardTitle className={`text-${category.color}`}>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Typography variant="body2" className="font-medium">Popular Tools:</Typography>
                  <div className="space-y-1">
                    {category.examples.map((example, i) => (
                      <div key={i} className="text-sm text-muted-foreground">• {example}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tool Creation Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Tool Creation Flow</CardTitle>
          <CardDescription>How students go from idea to deployed campus tool</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-purple text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
              <Typography variant="body2" className="font-medium">Identify Problem</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Campus pain point or inefficiency
              </Typography>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-purple text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
              <Typography variant="body2" className="font-medium">Design Solution</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Plan the tool functionality
              </Typography>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-purple text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
              <Typography variant="body2" className="font-medium">Build Tool</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Use visual builder or HiveLab
              </Typography>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-purple text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
              <Typography variant="body2" className="font-medium">Test & Iterate</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Get feedback from early users
              </Typography>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-purple text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">5</div>
              <Typography variant="body2" className="font-medium">Deploy & Share</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Launch to campus communities
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Tool */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Tool: "Study Group Scheduler"</CardTitle>
          <CardDescription>How a student-built campus tool works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-gradient-to-r from-hive-orange/5 to-transparent">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Typography variant="h4" className="font-semibold">Study Group Scheduler</Typography>
                <Typography variant="body2" className="text-muted-foreground">
                  Created by Sarah M. • Used by 156 students • 4.8/5 rating
                </Typography>
              </div>
              <div className="flex gap-2">
                <Badge variant="default">Academic</Badge>
                <Badge variant="secondary">Popular</Badge>
              </div>
            </div>
            <Typography variant="body2" className="mb-4">
              Helps study groups find the best times to meet by collecting everyone's availability 
              and suggesting optimal meeting times based on location and preferences.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-background border rounded">
                <Typography variant="body2" className="font-medium">✨ Key Features</Typography>
                <div className="text-xs text-muted-foreground mt-1">
                  • Calendar integration<br/>
                  • Location optimization<br/>
                  • Automated reminders
                </div>
              </div>
              <div className="p-3 bg-background border rounded">
                <Typography variant="body2" className="font-medium">📊 Usage Stats</Typography>
                <div className="text-xs text-muted-foreground mt-1">
                  • 156 active users<br/>
                  • 1,240 sessions scheduled<br/>
                  • 4.8/5 average rating
                </div>
              </div>
              <div className="p-3 bg-background border rounded">
                <Typography variant="body2" className="font-medium">🏠 Used In</Typography>
                <div className="text-xs text-muted-foreground mt-1">
                  • 23 study groups<br/>
                  • 8 project teams<br/>
                  • 5 student organizations
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component System */}
      <div>
        <Typography variant="h2" className="text-2xl font-bold mb-6">Tools Component System</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map((component, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{component.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">{component.status}</Badge>
                </div>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {component.features.map((feature, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{feature}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle>Campus-First Tool Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-purple/10 text-hive-purple rounded-lg flex items-center justify-center mx-auto mb-3">
                🎨
              </div>
              <Typography variant="body2" className="font-medium">Visual Builder</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                No coding required for basic tools
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-orange/10 text-hive-orange rounded-lg flex items-center justify-center mx-auto mb-3">
                🚀
              </div>
              <Typography variant="body2" className="font-medium">One-Click Deploy</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Instantly share with spaces and groups
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-blue/10 text-hive-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                🎓
              </div>
              <Typography variant="body2" className="font-medium">Campus Templates</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                UB-specific tool templates and patterns
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-green/10 text-hive-green rounded-lg flex items-center justify-center mx-auto mb-3">
                📈
              </div>
              <Typography variant="body2" className="font-medium">Impact Tracking</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                See how your tools help the community
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const meta: Meta<typeof ToolsCreationOverview> = {
  title: '15 Tools Creation/Overview',
  component: ToolsCreationOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Tools & Creation Feature Slice

Solutions you build and share with your community - creating connections around solving real problems together.

This feature slice includes all components needed for students to create, deploy, and share campus utilities that solve real problems.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: 'Tools & Creation Overview',
  render: () => <ToolsCreationOverview />,
};