import * as React from 'react';
import { type Post } from '@hive/core/src/domain/firestore/post';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
// import { Button } from '@/components/button';
import { MoreHorizontal } from 'lucide-react';

// A simple utility to format time since a post was created
function timeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "min";
    return Math.floor(seconds) + "s";
}


interface PostCardProps {
  post: Post;
  authorProfileUrl: string;
  // This would be the current user's ID to determine if they can edit/delete
  currentUserId?: string;
}

export function PostCard({ post, authorProfileUrl, currentUserId }: PostCardProps) {
  const postDate = (post.createdAt as any).toDate ? (post.createdAt as any).toDate() : new Date();
  const isAuthor = currentUserId === post.authorId;

  return (
    <div className="flex space-x-4 rounded-lg bg-neutral-900 p-4">
      <a href={authorProfileUrl}>
        {/* <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={`${post.author.name}'s avatar`} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar> */}
        <div className="h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center text-white">
            {post.author?.fullName?.charAt(0) || '?'}
        </div>
      </a>
      <div className="flex-1">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
                <a href={authorProfileUrl} className="font-bold text-white hover:underline">
                    {post.author?.fullName || 'Unknown User'}
                </a>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-500">{timeAgo(postDate)}</span>
            </div>
            {isAuthor && (
                <button className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            )}
        </div>
        <p className="mt-2 text-white/90">{post.content}</p>
      </div>
    </div>
  );
} 
