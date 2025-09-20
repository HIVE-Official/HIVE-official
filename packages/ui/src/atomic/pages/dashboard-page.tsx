'use client';

import React from 'react';
import { PageLayout } from '../templates/page-layout';
import { Card, CardContent, CardHeader } from '../molecules/card';
import { Button } from '../atoms/button';
import { Text } from '../atoms/text';
import { Plus, Users, TrendingUp, Zap } from 'lucide-react';

export interface DashboardPageProps {
  user?: {
    name: string;
    firstName?: string
  };
  loading?: boolean;
  error?: string
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  loading,
  error
}) => {
  const firstName = user?.firstName || user?.name?.split(' ')[0];
  
  return (
    <PageLayout
      title={`Welcome back${firstName ? `, ${firstName}` : ''}!`}
      subtitle="Your personalized HIVE dashboard"
      actions={
        <Button 
          variant="primary" 
          icon={<Plus className="h-4 w-4" />}
        >
          Create
        </Button>
      }
      loading={loading}
      error={error}
      maxWidth="xl"
    >
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card variant="interactive" hoverable>
          <CardContent>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-[var(--hive-background-primary)]" />
              </div>
              <Text variant="heading-md" color="primary">
                Build a Tool
              </Text>
            </div>
            <Text variant="body-sm" color="mutedLight">
              Create powerful tools for your space with HiveLab's visual builder.
            </Text>
            <div className="mt-4 flex items-center text-[var(--hive-brand-secondary)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Start Building
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" hoverable>
          <CardContent>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-hive-background-tertiary rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-hive-text-primary" />
              </div>
              <Text variant="heading-md" color="primary">
                Join a Space
              </Text>
            </div>
            <Text variant="body-sm" color="mutedLight">
              Discover communities and connect with builders at your campus.
            </Text>
          </CardContent>
        </Card>

        <Card variant="interactive" hoverable>
          <CardContent>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-hive-background-tertiary rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-hive-text-primary" />
              </div>
              <Text variant="heading-md" color="primary">
                Explore Trending
              </Text>
            </div>
            <Text variant="body-sm" color="mutedLight">
              See what's popular and trending across HIVE communities.
            </Text>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="elevated">
          <CardContent>
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 text-hive-sapphire">
                <Users className="h-8 w-8" />
              </div>
              <Text variant="heading-lg" color="primary">
                12
              </Text>
              <Text variant="body-xs" color="secondary">
                Connections
              </Text>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent>
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 text-hive-emerald">
                <TrendingUp className="h-8 w-8" />
              </div>
              <Text variant="heading-lg" color="primary">
                8
              </Text>
              <Text variant="body-xs" color="secondary">
                Spaces Joined
              </Text>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent>
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 text-[var(--hive-brand-secondary)]">
                <Zap className="h-8 w-8" />
              </div>
              <Text variant="heading-lg" color="primary">
                23
              </Text>
              <Text variant="body-xs" color="secondary">
                Tools Used
              </Text>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent>
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 text-hive-ruby">
                <TrendingUp className="h-8 w-8" />
              </div>
              <Text variant="heading-lg" color="primary">
                5
              </Text>
              <Text variant="body-xs" color="secondary">
                Tools Created
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <Text variant="heading-lg" color="primary">
            Recent Activity
          </Text>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <div className="text-center py-8">
              <Text variant="body-md" color="secondary">
                No recent activity
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
};