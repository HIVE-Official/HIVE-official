import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Container } from '../../ui/container';
import { Text as Typography } from '../../ui/text';
import { Avatar } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';

/**
 * # 👤 Profile System Feature Slice
 * 
 * Your campus command center - not a highlight reel, but your personalized dashboard that actually runs your life.
 * 
 * ## Profile Philosophy
 * 
 * Traditional social profiles are performance spaces. HIVE profiles are **utility dashboards** - 
 * where your calendar, tools, communities, and goals connect to actually help you succeed at UB.
 * 
 * ## Widget System
 * 
 * - **Profile Dashboard**: Customizable widget-based dashboard
 * - **Calendar Integration**: Your schedule and availability
 * - **Tools & Projects**: Things you're building and sharing  
 * - **Spaces & Communities**: Groups you're part of
 * - **Activity & Stats**: Campus engagement and progress
 * - **Privacy Controls**: Ghost mode and visibility settings
 */

const ProfileSystemOverview = () => {
  const widgets = [
    {
      title: "Profile Avatar Widget",
      description: "Smart avatar system with campus context and status indicators",
      status: "Production Ready",
      features: ["Custom avatars", "Status indicators", "Campus context", "Privacy modes"]
    },
    {
      title: "Profile Stats Widget", 
      description: "Campus engagement metrics and achievement tracking",
      status: "Production Ready",
      features: ["Engagement stats", "Achievement badges", "Progress tracking", "Goal setting"]
    },
    {
      title: "Calendar Widget",
      description: "Integrated campus calendar with availability and coordination",
      status: "Production Ready", 
      features: ["Class schedule", "Study groups", "Events", "Availability"]
    },
    {
      title: "Spaces Widget",
      description: "Quick access to your communities and coordination spaces",
      status: "Production Ready",
      features: ["Active spaces", "Recent activity", "Quick actions", "Member status"]
    },
    {
      title: "Tools Widget",
      description: "Personal tools you've created and tools you use regularly",
      status: "Production Ready",
      features: ["Created tools", "Favorited tools", "Recent usage", "Quick launch"]
    },
    {
      title: "HiveLab Widget",
      description: "Tool building progress and creative projects dashboard",
      status: "Production Ready",
      features: ["Active projects", "Build progress", "Collaboration", "Publishing"]
    },
    {
      title: "Activity Widget",
      description: "Recent campus activity and social coordination",
      status: "Production Ready",
      features: ["Recent posts", "Mentions", "Collaborations", "Achievements"]
    },
    {
      title: "Ghost Mode Widget",
      description: "Privacy controls and visibility settings for campus life",
      status: "Production Ready",
      features: ["Visibility toggle", "Privacy levels", "Anonymous modes", "Selective sharing"]
    }
  ];

  return (
    <Container className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <Typography variant="h1" className="text-4xl font-bold">
          👤 Profile System
        </Typography>
        <Typography variant="body1" className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your campus command center. Not a highlight reel, but your personalized dashboard 
          that actually runs your life at University at Buffalo.
        </Typography>
        <div className="flex justify-center gap-2">
          <Badge variant="default">8 Widgets</Badge>
          <Badge variant="secondary">Customizable</Badge>
          <Badge variant="outline">Campus Utility</Badge>
        </div>
      </div>

      {/* Profile Philosophy */}
      <Card className="border-hive-orange/20 bg-gradient-to-r from-hive-orange/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-hive-orange">Campus Command Center</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="body1" className="mb-4">
            Your HIVE profile isn't about showing off - it's about getting things done. It connects your:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm">
              <li>• <strong>Calendar</strong> - Classes, study groups, events</li>
              <li>• <strong>Tools</strong> - Things you build and use</li>
              <li>• <strong>Communities</strong> - Spaces you're active in</li>
              <li>• <strong>Goals</strong> - Academic and social progress</li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Availability</strong> - When you're free to collaborate</li>
              <li>• <strong>Interests</strong> - What you're working on</li>
              <li>• <strong>Skills</strong> - How you can help others</li>
              <li>• <strong>Privacy</strong> - Control who sees what</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Demo Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Profile Dashboard</CardTitle>
          <CardDescription>How a UB student's profile command center looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Avatar className="w-16 h-16" />
            <div className="flex-1">
              <Typography variant="h4" className="font-semibold">Jake Rodriguez</Typography>
              <Typography variant="body2" className="text-muted-foreground">CS Junior • North Campus • Available until 2 PM</Typography>
              <div className="flex gap-2 mt-2">
                <Badge variant="default">Study Group Leader</Badge>
                <Badge variant="secondary">Tool Builder</Badge>
                <Badge variant="outline">CS Club</Badge>
              </div>
            </div>
            <div className="text-right">
              <Typography variant="body2" className="font-medium">Campus Engagement</Typography>
              <Progress value={75} className="w-24 mt-1" />
              <Typography variant="caption" className="text-muted-foreground">75% this week</Typography>
            </div>
          </div>

          {/* Widget Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <Typography variant="body2" className="font-medium mb-2">📅 This Week</Typography>
              <div className="space-y-1 text-xs">
                <div>CSE 250 • MWF 10:00</div>
                <div>Study Group • Today 3 PM</div>
                <div>CS Club Meeting • Thu 7 PM</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <Typography variant="body2" className="font-medium mb-2">🏠 Active Spaces</Typography>
              <div className="space-y-1 text-xs">
                <div>CS 250 Study Group</div>
                <div>Ellicott Floor Events</div>
                <div>UB CS Club</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <Typography variant="body2" className="font-medium mb-2">🔧 Recent Tools</Typography>
              <div className="space-y-1 text-xs">
                <div>Exam Study Scheduler</div>
                <div>Group Project Tracker</div>
                <div>Interview Prep Quiz</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Widget System */}
      <div>
        <Typography variant="h2" className="text-2xl font-bold mb-6">Profile Widget System</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {widgets.map((widget, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{widget.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">{widget.status}</Badge>
                </div>
                <CardDescription>{widget.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {widget.features.map((feature, i) => (
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
          <CardTitle>Campus-First Profile Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-orange/10 text-hive-orange rounded-lg flex items-center justify-center mx-auto mb-3">
                📱
              </div>
              <Typography variant="body2" className="font-medium">Mobile Optimized</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Perfect for walking between classes
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-blue/10 text-hive-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                🎓
              </div>
              <Typography variant="body2" className="font-medium">Campus Context</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                UB-specific features and integrations
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-green/10 text-hive-green rounded-lg flex items-center justify-center mx-auto mb-3">
                🔐
              </div>
              <Typography variant="body2" className="font-medium">Privacy Control</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Control what's visible to who
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-purple/10 text-hive-purple rounded-lg flex items-center justify-center mx-auto mb-3">
                ⚡
              </div>
              <Typography variant="body2" className="font-medium">Real Utility</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Actually helps you succeed
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const meta: Meta<typeof ProfileSystemOverview> = {
  title: '12 Profile System/Overview', 
  component: ProfileSystemOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Profile System Feature Slice

Your campus command center - not a highlight reel, but your personalized dashboard that actually runs your life.

The Profile System includes 8 specialized widgets that create a comprehensive campus utility dashboard for UB students.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: 'Profile System Overview',
  render: () => <ProfileSystemOverview />,
};