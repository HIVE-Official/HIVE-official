import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Container } from '../../components/ui/container';
import { Text as Typography } from '../../atomic/atoms/text';

/**
 * # 🏠 Spaces & Communities Feature Slice
 * 
 * Functional communities where CS majors share interview prep, dorms coordinate events, and clubs get things done.
 * 
 * ## Spaces Philosophy
 * 
 * Traditional social groups are just discussion forums. HIVE Spaces are **functional communities** - 
 * where students collaborate around real problems and coordinate actual activities.
 * 
 * ## Core Components
 * 
 * - **Space Discovery**: Find communities solving problems you care about
 * - **Space Management**: Tools for space leaders to coordinate and organize  
 * - **Member Directory**: Connect with students who can help or collaborate
 * - **Space Analytics**: Understand community engagement and impact
 * - **Campus Integration**: UB-specific spaces and templates
 */

const SpacesCommunitiesOverview = () => {
  const spaceTypes = [
    {
      title: "Academic Spaces",
      description: "Study groups, major-specific communities, and academic collaboration",
      examples: ["CS 250 Study Group", "Pre-Med Study Circle", "Engineering Project Teams"],
      color: "hive-blue",
      icon: "🎓"
    },
    {
      title: "Campus Living",
      description: "Dorm floors, residential communities, and campus life coordination",
      examples: ["Ellicott Complex Floor 3", "South Campus Events", "Commuter Students"],
      color: "hive-green", 
      icon: "🏠"
    },
    {
      title: "Student Organizations",
      description: "Official and unofficial student clubs, societies, and interest groups",
      examples: ["UB CS Club", "Debate Society", "Intramural Soccer"],
      color: "hive-purple",
      icon: "🎯"
    },
    {
      title: "Career & Professional",
      description: "Career prep, interview practice, networking, and professional development",
      examples: ["Tech Interview Prep", "Business Case Practice", "Graduate School Prep"],
      color: "hive-orange",
      icon: "💼"
    }
  ];

  const components = [
    {
      title: "Space Category Browser",
      description: "Discover spaces by category with smart filtering and recommendations",
      status: "Production Ready"
    },
    {
      title: "Space Dashboard",
      description: "Management interface for space coordinators and members",
      status: "Production Ready"
    },
    {
      title: "Space Explore Hub",
      description: "Personalized space discovery with campus context and social proof",
      status: "Production Ready"
    },
    {
      title: "Member Directory",
      description: "Find and connect with space members based on skills and availability",
      status: "Production Ready"
    },
    {
      title: "Campus Identity Header",
      description: "UB-specific space branding and campus context integration",
      status: "Production Ready"
    },
    {
      title: "Campus Activity Feed",
      description: "Real-time activity stream for space coordination and updates",
      status: "Production Ready"
    }
  ];

  return (
    <Container className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <Typography variant="h1" className="text-4xl font-bold">
          🏠 Spaces & Communities
        </Typography>
        <Typography variant="body1" className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Functional communities where CS majors share interview prep, dorms coordinate events, 
          and clubs actually get things done. Not just discussion - coordination.
        </Typography>
        <div className="flex justify-center gap-2">
          <Badge variant="default">4 Space Types</Badge>
          <Badge variant="secondary">Campus Focused</Badge>
          <Badge variant="outline">Problem Solving</Badge>
        </div>
      </div>

      {/* Spaces Philosophy */}
      <Card className="border-hive-green/20 bg-gradient-to-r from-hive-green/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-hive-green">Functional Communities</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="body1" className="mb-4">
            HIVE Spaces aren't just chat rooms - they're coordination engines where UB students:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm">
              <li>• <strong>Solve Problems Together</strong> - Study groups, project teams</li>
              <li>• <strong>Coordinate Events</strong> - Floor activities, club meetings</li>
              <li>• <strong>Share Resources</strong> - Notes, tools, opportunities</li>
              <li>• <strong>Build Skills</strong> - Peer learning and mentorship</li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Make Connections</strong> - Meet people with shared goals</li>
              <li>• <strong>Get Things Done</strong> - Action-oriented communities</li>
              <li>• <strong>Support Each Other</strong> - Academic and social support</li>
              <li>• <strong>Create Impact</strong> - Make campus life better</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Space Types */}
      <div>
        <Typography variant="h2" className="text-2xl font-bold mb-6">Types of Campus Spaces</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaceTypes.map((type, index) => (
            <Card key={index} className={`border-${type.color}/20 hover:border-${type.color}/40 transition-colors`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{type.icon}</div>
                  <div>
                    <CardTitle className={`text-${type.color}`}>{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Typography variant="body2" className="font-medium">Example Spaces:</Typography>
                  <div className="space-y-1">
                    {type.examples.map((example, i) => (
                      <div key={i} className="text-sm text-muted-foreground">• {example}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sample Space Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Space: "CS 250 Study Group"</CardTitle>
          <CardDescription>How a functional academic space works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Space Header */}
          <div className="p-4 border rounded-lg bg-gradient-to-r from-hive-blue/5 to-transparent">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Typography variant="h4" className="font-semibold">CS 250 Study Group</Typography>
                <Typography variant="body2" className="text-muted-foreground">
                  Active study group • 23 members • Lockwood Library
                </Typography>
              </div>
              <div className="flex gap-2">
                <Badge variant="default">Study Group</Badge>
                <Badge variant="secondary">CS Major</Badge>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
            <Typography variant="body2">
              Collaborative study group for CS 250 (Data Structures). We meet MWF after class, 
              share notes, practice problems together, and help each other succeed.
            </Typography>
          </div>

          {/* Space Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <Typography variant="body2" className="font-medium mb-2">📅 Upcoming Sessions</Typography>
              <div className="space-y-1 text-sm">
                <div>Today 3:00 PM • Lockwood 3rd Floor</div>
                <div>Wed 3:00 PM • Online Review</div>
                <div>Fri 3:00 PM • Practice Problems</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <Typography variant="body2" className="font-medium mb-2">🎯 Current Focus</Typography>
              <div className="space-y-1 text-sm">
                <div>Exam 2 Prep (Trees & Recursion)</div>
                <div>Practice Problem Sets</div>
                <div>Group Project Planning</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <Typography variant="body2" className="font-medium mb-2">👥 Active Members</Typography>
              <div className="space-y-1 text-sm">
                <div>Jake R. • Study Leader</div>
                <div>Sarah M. • Note Taker</div>
                <div>Alex K. • Problem Creator</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component System */}
      <div>
        <Typography variant="h2" className="text-2xl font-bold mb-6">Spaces Component System</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{component.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">{component.status}</Badge>
                </div>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle>Campus-First Space Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-green/10 text-hive-green rounded-lg flex items-center justify-center mx-auto mb-3">
                🎯
              </div>
              <Typography variant="body2" className="font-medium">Problem-Focused</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Communities form around solving real challenges
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-blue/10 text-hive-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                📍
              </div>
              <Typography variant="body2" className="font-medium">Campus Located</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Integrated with UB locations and schedules
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-orange/10 text-hive-orange rounded-lg flex items-center justify-center mx-auto mb-3">
                ⚡
              </div>
              <Typography variant="body2" className="font-medium">Action Oriented</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Coordination tools for getting things done
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-hive-purple/10 text-hive-purple rounded-lg flex items-center justify-center mx-auto mb-3">
                🤝
              </div>
              <Typography variant="body2" className="font-medium">Collaboration</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Tools for working together effectively
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const meta: Meta<typeof SpacesCommunitiesOverview> = {
  title: '13 Spaces Communities/Overview',
  component: SpacesCommunitiesOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Spaces & Communities Feature Slice

Functional communities where CS majors share interview prep, dorms coordinate events, and clubs actually get things done.

This feature slice includes all components needed to create, manage, and participate in campus communities that solve real problems.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: 'Spaces & Communities Overview',
  render: () => <SpacesCommunitiesOverview />,
};