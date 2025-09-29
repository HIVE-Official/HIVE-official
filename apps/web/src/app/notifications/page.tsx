'use client';

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
// Temporarily using temp-stubs to avoid SSG useRef errors in chunk 2073
// import { Card, Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@hive/ui';
const Card = ({ children, className = "", ...props }: any) => <div className={`border rounded-lg p-4 ${className}`} {...props}>{children}</div>;
const Button = ({ children, variant = "default", size = "default", className = "", ...props }: any) => <button className={`px-4 py-2 rounded ${className}`} {...props}>{children}</button>;
const Badge = ({ children, variant = "default", className = "", ...props }: any) => <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${className}`} {...props}>{children}</span>;
const Tabs = ({ children, ...props }: any) => <div {...props}>{children}</div>;
const TabsList = ({ children, className = "", ...props }: any) => <div className={`flex space-x-1 ${className}`} {...props}>{children}</div>;
const TabsTrigger = ({ children, value, className = "", ...props }: any) => <button className={`px-3 py-1 rounded ${className}`} data-value={value} {...props}>{children}</button>;
const TabsContent = ({ children, value, className = "", ...props }: any) => <div className={`${className}`} data-value={value} {...props}>{children}</div>;
import {
  Bell,
  Heart,
  MessageCircle,
  Users,
  Calendar,
  Zap,
  Settings,
  CheckCheck,
  Trash2,
  Filter
} from 'lucide-react';

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

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
              <Bell className="w-6 h-6 text-hive-gold" />
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <Badge variant="secondary" className="bg-hive-gold text-black">
                3
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="w-full">
          <div className="grid w-full grid-cols-5 bg-gray-900 border-gray-700 mb-6">
            <button className="px-3 py-1 rounded bg-hive-gold text-black">
              All
            </button>
            <button className="px-3 py-1 rounded">
              Mentions
            </button>
            <button className="px-3 py-1 rounded">
              Likes
            </button>
            <button className="px-3 py-1 rounded">
              Follows
            </button>
            <button className="px-3 py-1 rounded">
              Events
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {/* Notification Items */}
            <Card className="p-4 bg-gray-900 border-gray-800 border-l-4 border-l-hive-gold">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    <span className="text-hive-gold">@sarah</span> liked your post
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    "Just finished my first week at UB! The campus is amazing..."
                  </p>
                  <p className="text-gray-500 text-xs mt-2">2 minutes ago</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-gray-900 border-gray-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    <span className="text-hive-gold">@mike</span> commented on your post
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    "Welcome to UB! Let me know if you need help finding anything"
                  </p>
                  <p className="text-gray-500 text-xs mt-2">5 minutes ago</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-gray-900 border-gray-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    <span className="text-hive-gold">@alex</span> started following you
                  </p>
                  <p className="text-gray-500 text-xs mt-2">1 hour ago</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Empty State */}
            <Card className="p-8 text-center bg-gray-900 border-gray-800">
              <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">All caught up!</h3>
              <p className="text-gray-400">
                You're all up to date with your notifications
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}