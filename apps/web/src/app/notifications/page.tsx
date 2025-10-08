'use client';

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useState, useEffect, type ElementType } from 'react';
// Temporarily using temp-stubs to avoid SSG useRef errors in chunk 2073
// import { Card, Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@hive/ui';
const Card = ({ children, className = "", ...props }: any) => <div className={`border rounded-lg p-4 ${className}`} {...props}>{children}</div>;
const Button = ({ children, variant: _variant = "default", size: _size = "default", className = "", ...props }: any) => <button className={`px-4 py-2 rounded ${className}`} {...props}>{children}</button>;
const Badge = ({ children, variant: _variant = "default", className = "", ...props }: any) => <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${className}`} {...props}>{children}</span>;
import {
  Bell,
  Heart,
  MessageCircle,
  Users,
  Settings,
  CheckCheck,
  Trash2
} from 'lucide-react';

type NotificationCategory = 'all' | 'mentions' | 'likes' | 'follows' | 'events';

type NotificationItem = {
  id: string;
  category: Exclude<NotificationCategory, 'all'>;
  icon: ElementType<{ className?: string }>;
  iconClassName: string;
  actorHandle: string;
  action: string;
  description?: string;
  timestamp: string;
};

const NOTIFICATION_FILTERS: { label: string; value: NotificationCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Mentions', value: 'mentions' },
  { label: 'Likes', value: 'likes' },
  { label: 'Follows', value: 'follows' },
  { label: 'Events', value: 'events' },
];

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'like-1',
    category: 'likes',
    icon: Heart,
    iconClassName: 'text-red-500',
    actorHandle: '@sarah',
    action: 'liked your post',
    description: '"Just finished my first week at UB! The campus is amazing..."',
    timestamp: '2 minutes ago',
  },
  {
    id: 'mention-1',
    category: 'mentions',
    icon: MessageCircle,
    iconClassName: 'text-blue-500',
    actorHandle: '@mike',
    action: 'commented on your post',
    description: '"Welcome to UB! Let me know if you need help finding anything"',
    timestamp: '5 minutes ago',
  },
  {
    id: 'follow-1',
    category: 'follows',
    icon: Users,
    iconClassName: 'text-green-500',
    actorHandle: '@alex',
    action: 'started following you',
    timestamp: '1 hour ago',
  },
];

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredNotifications =
    activeTab === 'all'
      ? MOCK_NOTIFICATIONS
      : MOCK_NOTIFICATIONS.filter((item) => item.category === activeTab);

  // Prevent SSR hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-[var(--hive-brand-primary)]" />
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <Badge variant="secondary" className="bg-[var(--hive-brand-primary)] text-black">
                3
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="max-w-sm">
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
              <Button variant="outline" className="max-w-sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="w-full">
          <div className="grid w-full grid-cols-5 bg-gray-900 border border-gray-800 rounded-lg mb-6 overflow-hidden">
            {NOTIFICATION_FILTERS.map(({ label, value }) => {
              const isActive = activeTab === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveTab(value)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--hive-brand-primary)] text-black'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-4">
            {filteredNotifications.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className={`p-4 bg-gray-900 border border-gray-800 ${
                    item.category === 'likes' ? 'border-l-4 border-l-hive-gold' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon className={`w-6 h-6 ${item.iconClassName}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        <span className="text-[var(--hive-brand-primary)]">{item.actorHandle}</span> {item.action}
                      </p>
                      {item.description && (
                        <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-2">{item.timestamp}</p>
                    </div>
                    <Button variant="outline" className="max-w-sm" type="button">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}

            {filteredNotifications.length === 0 && (
              <Card className="p-8 text-center bg-gray-900 border border-gray-800">
                <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">All caught up!</h3>
                <p className="text-gray-400">
                  You're all up to date with your notifications
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
