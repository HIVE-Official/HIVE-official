'use client';

import { useState } from 'react';
import { Button, Card, Badge, Input, Avatar } from '@hive/ui';
import { useRealtimeFeed } from '@/hooks/use-realtime-feed';
import { useRealtimeSpaces } from '@/hooks/use-realtime-spaces';
import { useRealtimeComments } from '@/hooks/use-realtime-comments';
import { usePresence, useOnlineUsers } from '@/hooks/use-presence';
import { useNotifications } from '@/hooks/use-notifications';
import { Bell, Users, MessageSquare, Activity, Wifi, WifiOff } from 'lucide-react';

/**
 * Demo Component showing all real-time features
 * This demonstrates Firebase real-time capabilities
 */
export function RealtimeDemo() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Real-time hooks
  const { isOnline } = usePresence();
  const { onlineUsers } = useOnlineUsers();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { posts, isLoading, connectionStatus, liveUpdatesCount, mergeRealtimeItems } = useRealtimeFeed({
    limit: 10,
    enableRealtime: true
  });
  const { spaces } = useRealtimeSpaces({ limitCount: 5 });
  const { comments, addComment, totalCount: commentCount } = useRealtimeComments(selectedPostId);

  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    if (commentText.trim() && selectedPostId) {
      const success = await addComment(commentText);
      if (success) {
        setCommentText('');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Connection Status Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <>
                  <Wifi className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 font-medium">Offline</span>
                </>
              )}
            </div>
            <Badge variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              {connectionStatus}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            {/* Online Users */}
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                {onlineUsers.length} online
              </span>
              <div className="flex -space-x-2">
                {onlineUsers.slice(0, 3).map((user) => (
                  <Avatar
                    key={user.userId}
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 border-2 border-white"
                  />
                ))}
                {onlineUsers.length > 3 && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-gray-600">
                      +{onlineUsers.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={markAllAsRead}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Live Updates Alert */}
        {liveUpdatesCount > 0 && (
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={mergeRealtimeItems}
              className="w-full"
            >
              <Activity className="h-4 w-4 mr-2" />
              {liveUpdatesCount} new updates - Click to load
            </Button>
          </div>
        )}
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spaces Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Active Spaces</h3>
            <div className="space-y-2">
              {spaces.map((space) => (
                <div
                  key={space.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{space.name}</p>
                      <p className="text-sm text-gray-500">
                        {space.memberCount} members
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {space.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Notifications */}
          <Card className="p-4 mt-4">
            <h3 className="font-semibold mb-3">Recent Notifications</h3>
            <div className="space-y-2">
              {notifications.slice(0, 5).map((notif) => (
                <div
                  key={notif.id}
                  className={`p-2 rounded ${
                    notif.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <p className="text-sm font-medium">{notif.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notif.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Feed */}
        <div className="lg:col-span-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Live Feed</h3>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading feed...
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No posts yet. Be the first to post!
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 border rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{post.title}</h4>
                        {post.content && (
                          <p className="text-gray-600 mt-1">{post.content}</p>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span>👍 {post.engagement.likes}</span>
                          <button
                            className="flex items-center gap-1 hover:text-blue-600"
                            onClick={() => setSelectedPostId(post.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            {post.engagement.comments}
                          </button>
                          <span>👁 {post.engagement.views}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleTimeString()}
                      </span>
                    </div>

                    {/* Comments Section */}
                    {selectedPostId === post.id && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="space-y-2 mb-4">
                          {comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 p-2 rounded">
                              <p className="text-sm">{comment.content}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">
                                  {comment.authorName}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {new Date(comment.createdAt).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment();
                              }
                            }}
                          />
                          <Button size="sm" onClick={handleAddComment}>
                            Post
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Real-time Status Footer */}
      <div className="text-center text-sm text-gray-500">
        <p>
          🔥 Real-time powered by Firebase Firestore
        </p>
        <p className="mt-1">
          Updates appear instantly across all connected devices
        </p>
      </div>
    </div>
  );
}