"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Image, Users, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';

interface DashboardStats {
  pendingPhotoReviews: number;
  totalUsers: number;
  recentReports: number;
  avgReviewTime: number; // in minutes
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pendingPhotoReviews: 0,
    totalUsers: 0,
    recentReports: 0,
    avgReviewTime: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      setStats({
        pendingPhotoReviews: 8,
        totalUsers: 1247,
        recentReports: 3,
        avgReviewTime: 45
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Pending Photo Reviews',
      value: stats.pendingPhotoReviews,
      icon: Image,
      color: 'amber',
      href: '/admin/moderation',
      description: 'Profile photos awaiting approval'
    },
    {
      title: 'Total Users', 
      value: stats.totalUsers,
      icon: Users,
      color: 'blue',
      href: '/admin/users',
      description: 'Registered platform users'
    },
    {
      title: 'Recent Reports',
      value: stats.recentReports,
      icon: AlertTriangle,
      color: 'red',
      href: '/admin/reports',
      description: 'Content reports this week'
    },
    {
      title: 'Avg Review Time',
      value: `${stats.avgReviewTime}m`,
      icon: Clock,
      color: 'green', 
      href: '/admin/analytics',
      description: 'Average moderation time'
    }
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-6">
          <div className="h-8 bg-surface-01 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-surface-01 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted font-body mt-1">
          Overview of platform moderation and user activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          
          return (
            <Link
              key={card.title}
              href={card.href}
              className="module-border module-surface module-padding hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted font-body">
                    {card.title}
                  </p>
                  <p className="text-2xl font-display font-semibold text-foreground">
                    {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                  </p>
                  <p className="text-xs text-muted font-body">
                    {card.description}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${
                  card.color === 'amber' ? 'bg-accent/10 text-accent' :
                  card.color === 'blue' ? 'bg-surface-02 text-foreground' :
                  card.color === 'red' ? 'bg-surface-02 text-muted' :
                  'bg-surface-02 text-foreground'
                } group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <div className="module-border module-surface module-padding">
          <h2 className="text-lg font-display font-medium text-foreground mb-4">
            Pending Actions
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-surface-01 rounded-lg">
              <div className="p-2 bg-accent/10 text-accent rounded-lg">
                <Image className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground font-body">
                  Photo Review Queue
                </p>
                <p className="text-xs text-muted font-body">
                  {stats.pendingPhotoReviews} photos awaiting approval
                </p>
              </div>
              <Link
                href="/admin/moderation"
                className="text-xs text-accent hover:underline font-body"
              >
                Review →
              </Link>
            </div>

            {stats.recentReports > 0 && (
              <div className="flex items-center gap-3 p-3 bg-surface-01 rounded-lg">
                <div className="p-2 bg-surface-02 text-muted rounded-lg animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground font-body">
                    Content Reports
                  </p>
                  <p className="text-xs text-muted font-body">
                    {stats.recentReports} new reports this week
                  </p>
                </div>
                <Link
                  href="/admin/reports"
                  className="text-xs text-accent hover:underline font-body"
                >
                  Review →
                </Link>
              </div>
            )}

            {stats.pendingPhotoReviews === 0 && stats.recentReports === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-sm text-muted font-body">
                  No pending actions at the moment
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="module-border module-surface module-padding">
          <h2 className="text-lg font-display font-medium text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/moderation"
              className="flex items-center gap-3 p-3 bg-surface-01 hover:bg-surface-02 rounded-lg transition-colors"
            >
              <div className="p-2 bg-accent/10 text-accent rounded-lg">
                <Image className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground font-body">
                  Review Photos
                </p>
                <p className="text-xs text-muted font-body">
                  Moderate user profile images
                </p>
              </div>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-3 bg-surface-01 hover:bg-surface-02 rounded-lg transition-colors"
            >
              <div className="p-2 bg-accent/10 text-accent rounded-lg">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground font-body">
                  Manage Users
                </p>
                <p className="text-xs text-muted font-body">
                  View and moderate user accounts
                </p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-3 bg-surface-01 hover:bg-surface-02 rounded-lg transition-colors"
            >
              <div className="p-2 bg-accent/10 text-accent rounded-lg">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground font-body">
                  Content Guidelines
                </p>
                <p className="text-xs text-muted font-body">
                  Update moderation rules
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}