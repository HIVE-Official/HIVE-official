import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Container } from '../../atomic/atoms/container';
import { Text as Typography } from '../../atomic/atoms/text';

/**
 * # 📱 Authentication & Onboarding Feature Slice
 * 
 * Complete authentication system and onboarding flow for University at Buffalo students.
 * 
 * ## Components in this Feature Slice
 * 
 * - **Authentication Flow**: UB-only (@buffalo.edu) email authentication
 * - **Onboarding Wizard**: Campus-specific onboarding with UB context
 * - **Profile Setup**: Student profile creation with campus information
 * - **Campus Verification**: UB student verification and validation
 * - **Accessibility Features**: Inclusive design for all students
 */

const AuthOnboardingOverview = () => {
  const features = [
    {
      title: "UB Email Authentication",
      description: "@buffalo.edu only authentication with magic link system",
      status: "Production Ready",
      components: ["Auth Flow", "Auth Flow Enhanced", "Email Validation"]
    },
    {
      title: "Campus Onboarding",
      description: "Comprehensive onboarding with UB-specific context and information",
      status: "Production Ready", 
      components: ["Onboarding Wizard", "Onboarding Enhanced", "Campus Setup"]
    },
    {
      title: "Student Profile Setup",
      description: "Profile creation with major, year, campus location, and preferences",
      status: "Production Ready",
      components: ["Profile Builder", "Campus Information", "Privacy Settings"]
    },
    {
      title: "Mobile Optimization",
      description: "Touch-optimized authentication for students on mobile devices",
      status: "Production Ready",
      components: ["Mobile Auth", "Touch Optimization", "Responsive Design"]
    }
  ];

  return (
    <Container className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <Typography variant="h1" className="text-4xl font-bold">
          📱 Authentication & Onboarding
        </Typography>
        <Typography variant="body1" className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Secure, campus-first authentication and onboarding experience designed specifically 
          for University at Buffalo students.
        </Typography>
        <div className="flex justify-center gap-2">
          <Badge variant="destructive">@buffalo.edu Only</Badge>
          <Badge variant="secondary">Mobile Optimized</Badge>
          <Badge variant="outline">Production Ready</Badge>
        </div>
      </div>

      <Card className="border-hive-blue/20 bg-gradient-to-r from-hive-blue/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-hive-blue">Feature Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="body1" className="mb-4">
            The authentication and onboarding system is designed around the unique needs of UB students:
          </Typography>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Campus Email Only</strong>: Exclusive @buffalo.edu authentication</li>
            <li>• <strong>Mobile-First</strong>: Optimized for students always on their phones</li>
            <li>• <strong>Campus Context</strong>: North/South campus, dorms, majors, year</li>
            <li>• <strong>Quick Setup</strong>: Get started in under 2 minutes</li>
            <li>• <strong>Privacy Control</strong>: Student-controlled visibility and sharing</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <Badge variant="secondary" className="text-xs">{feature.status}</Badge>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Typography variant="body2" className="font-medium">Components:</Typography>
                <div className="flex flex-wrap gap-1">
                  {feature.components.map((comp, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{comp}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
              <Typography variant="body2" className="font-medium">Email Entry</Typography>
              <Typography variant="caption" className="text-muted-foreground">@buffalo.edu only</Typography>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
              <Typography variant="body2" className="font-medium">Magic Link</Typography>
              <Typography variant="caption" className="text-muted-foreground">Secure authentication</Typography>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
              <Typography variant="body2" className="font-medium">Campus Setup</Typography>
              <Typography variant="caption" className="text-muted-foreground">Major, year, location</Typography>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-hive-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
              <Typography variant="body2" className="font-medium">Profile Active</Typography>
              <Typography variant="caption" className="text-muted-foreground">Ready for campus</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const meta: Meta<typeof AuthOnboardingOverview> = {
  title: '10 Auth Onboarding/Overview',
  component: AuthOnboardingOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Authentication & Onboarding Feature Slice

Complete authentication and onboarding system for University at Buffalo students.

This feature slice includes all components needed for secure campus authentication and smooth onboarding.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: 'Auth & Onboarding Overview',
  render: () => <AuthOnboardingOverview />,
};